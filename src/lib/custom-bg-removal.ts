/**
 * Custom Browser-Based Background Removal Engine
 * Uses ONNX Runtime Web with u2net model — runs 100% locally
 * No API keys, no server calls, no usage limits
 */

let ortModule: typeof import("onnxruntime-web") | null = null;
let modelSession: import("onnxruntime-web").InferenceSession | null = null;

const MODEL_URLS = [
  "https://huggingface.co/BritishWerewolf/U-2-Netp/resolve/main/onnx/model.onnx",
  "https://huggingface.co/Xenova/u2netp/resolve/main/onnx/model.onnx",
  "https://huggingface.co/Xenova/u2net/resolve/main/onnx/model.onnx",
];
const LOCAL_MODEL_PATH = "/models/u2net.onnx";
const DB_NAME = "EasyToolBGRemoval";
const STORE_NAME = "models";
const MODEL_KEY = "u2net";
const MODEL_SIZE_FALLBACK = 4_200_000; // ~4.2 MB

/* ── IndexedDB helpers ─────────────────────────────────────────────── */

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE_NAME);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function getCachedModel(): Promise<ArrayBuffer | null> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(MODEL_KEY);
      req.onsuccess = () => resolve((req.result as ArrayBuffer) ?? null);
      req.onerror = () => reject(req.error);
    });
  } catch {
    return null;
  }
}

async function saveModelToCache(buffer: ArrayBuffer): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      store.put(buffer, MODEL_KEY);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (e) {
    console.warn("IndexedDB cache failed:", e);
  }
}

/* ── ONNX Runtime lazy init ────────────────────────────────────────── */

async function getOrt() {
  if (ortModule) return ortModule;
  ortModule = await import("onnxruntime-web");
  // Use single-threaded WASM to avoid SharedArrayBuffer / COEP issues
  ortModule.env.wasm.numThreads = 1;
  ortModule.env.wasm.simd = true;
  ortModule.env.wasm.wasmPaths = "/onnx-wasm/";
  return ortModule;
}

/* ── Model loading ─────────────────────────────────────────────────── */

export async function loadModel(
  onProgress?: (loaded: number, total: number) => void
): Promise<import("onnxruntime-web").InferenceSession> {
  if (modelSession) return modelSession;

  const ort = await getOrt();

  // 1. Try IndexedDB cache
  const cached = await getCachedModel();
  if (cached) {
    modelSession = await ort.InferenceSession.create(cached, {
      executionProviders: ["wasm"],
    });
    return modelSession;
  }

  // 2. Try locally-hosted model file
  try {
    const resp = await fetch(LOCAL_MODEL_PATH);
    if (resp.ok) {
      const buffer = await resp.arrayBuffer();
      await saveModelToCache(buffer);
      modelSession = await ort.InferenceSession.create(buffer, {
        executionProviders: ["wasm"],
      });
      return modelSession;
    }
  } catch {
    /* local file not present */
  }

  // 3. Download from HuggingFace CDN
  for (const url of MODEL_URLS) {
    try {
      const resp = await fetch(url);
      if (!resp.ok) continue;

      const total = parseInt(resp.headers.get("content-length") || "0") || MODEL_SIZE_FALLBACK;
      const reader = resp.body!.getReader();
      const chunks: Uint8Array[] = [];
      let loaded = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        loaded += value.length;
        onProgress?.(loaded, total);
      }

      const blob = new Blob(chunks as unknown as BlobPart[]);
      const buffer = await blob.arrayBuffer();
      await saveModelToCache(buffer);
      modelSession = await ort.InferenceSession.create(buffer, {
        executionProviders: ["wasm"],
      });
      return modelSession;
    } catch (err) {
      console.warn(`Failed to load model from ${url}:`, err);
    }
  }

  throw new Error(
    "Background-removal AI model could not be loaded. Please run 'npm run download:bg-model' first, or check your internet connection."
  );
}

/* ── Image helpers ─────────────────────────────────────────────────── */

async function fileToBitmap(file: File): Promise<ImageBitmap> {
  return createImageBitmap(file);
}

function bitmapToTensor(
  bitmap: ImageBitmap,
  size: number,
  ort: typeof import("onnxruntime-web")
): import("onnxruntime-web").Tensor {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(bitmap, 0, 0, size, size);
  const imageData = ctx.getImageData(0, 0, size, size);

  const floatData = new Float32Array(3 * size * size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const srcIdx = (y * size + x) * 4;
      const dstIdx = y * size + x;
      floatData[dstIdx] = imageData.data[srcIdx] / 255.0; // R
      floatData[dstIdx + size * size] = imageData.data[srcIdx + 1] / 255.0; // G
      floatData[dstIdx + 2 * size * size] = imageData.data[srcIdx + 2] / 255.0; // B
    }
  }

  return new ort.Tensor("float32", floatData, [1, 3, size, size]);
}

function sigmoid(data: Float32Array): Float32Array {
  const out = new Float32Array(data.length);
  for (let i = 0; i < data.length; i++) {
    out[i] = 1 / (1 + Math.exp(-data[i]));
  }
  return out;
}

/* ── Main API ──────────────────────────────────────────────────────── */

export async function removeBackgroundCustom(
  file: File,
  onProgress?: (stage: "download" | "process", loaded: number, total: number) => void
): Promise<Blob> {
  const bitmap = await fileToBitmap(file);
  const origW = bitmap.width;
  const origH = bitmap.height;

  // Load model (report download progress)
  const session = await loadModel((loaded, total) =>
    onProgress?.("download", loaded, total)
  );

  const ort = await getOrt();

  // u2net expects 320x320 input
  const INPUT_SIZE = 320;
  onProgress?.("process", 10, 100);

  const inputTensor = bitmapToTensor(bitmap, INPUT_SIZE, ort);
  onProgress?.("process", 40, 100);

  const feeds: Record<string, import("onnxruntime-web").Tensor> = {};
  feeds[session.inputNames[0]] = inputTensor;

  const results = await session.run(feeds);
  onProgress?.("process", 80, 100);

  const outputName = session.outputNames[0];
  const outputData = results[outputName].data as Float32Array;
  const maskProbs = sigmoid(outputData);

  // Build mask canvas (320x320)
  const maskCanvas = document.createElement("canvas");
  maskCanvas.width = INPUT_SIZE;
  maskCanvas.height = INPUT_SIZE;
  const maskCtx = maskCanvas.getContext("2d")!;
  const maskImgData = maskCtx.createImageData(INPUT_SIZE, INPUT_SIZE);
  for (let i = 0; i < INPUT_SIZE * INPUT_SIZE; i++) {
    const v = Math.round(maskProbs[i] * 255);
    maskImgData.data[i * 4] = v;
    maskImgData.data[i * 4 + 1] = v;
    maskImgData.data[i * 4 + 2] = v;
    maskImgData.data[i * 4 + 3] = 255;
  }
  maskCtx.putImageData(maskImgData, 0, 0);

  // Resize mask to original dimensions
  const maskLarge = document.createElement("canvas");
  maskLarge.width = origW;
  maskLarge.height = origH;
  const maskLargeCtx = maskLarge.getContext("2d")!;
  maskLargeCtx.drawImage(maskCanvas, 0, 0, origW, origH);
  const maskLargeData = maskLargeCtx.getImageData(0, 0, origW, origH);

  // Apply mask to original image
  const outCanvas = document.createElement("canvas");
  outCanvas.width = origW;
  outCanvas.height = origH;
  const outCtx = outCanvas.getContext("2d")!;
  outCtx.drawImage(bitmap, 0, 0);
  const outImgData = outCtx.getImageData(0, 0, origW, origH);

  for (let i = 0; i < outImgData.data.length; i += 4) {
    outImgData.data[i + 3] = maskLargeData.data[i];
  }
  outCtx.putImageData(outImgData, 0, 0);

  bitmap.close();
  onProgress?.("process", 100, 100);

  return new Promise((resolve, reject) => {
    outCanvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Failed to generate output image"));
    }, "image/png");
  });
}

/* Reset cached session (useful for testing / memory cleanup) */
export function clearModelCache() {
  modelSession = null;
}
