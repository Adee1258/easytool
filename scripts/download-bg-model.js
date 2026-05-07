/**
 * Downloads the u2net ONNX model for background removal.
 * Run: node scripts/download-bg-model.js
 */
const fs = require("fs");
const path = require("path");
const https = require("https");

const MODEL_DIR = path.join(__dirname, "..", "public", "models");
const MODEL_PATH = path.join(MODEL_DIR, "u2net.onnx");

// Try sources in order (smaller -> larger)
const SOURCES = [
  {
    url: "https://huggingface.co/BritishWerewolf/U-2-Netp/resolve/main/onnx/model.onnx",
    desc: "U-2-Netp (lightweight ~4MB)",
  },
  {
    url: "https://huggingface.co/Xenova/u2netp/resolve/main/onnx/model.onnx",
    desc: "u2netp (lightweight ~4MB)",
  },
  {
    url: "https://huggingface.co/Xenova/u2net/resolve/main/onnx/model.onnx",
    desc: "u2net (~5MB)",
  },
];

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https
      .get(
        url,
        {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
          },
        },
        (res) => {
          if (res.statusCode === 302 || res.statusCode === 301) {
            // Follow redirect
            downloadFile(res.headers.location, dest)
              .then(resolve)
              .catch(reject);
            file.close();
            return;
          }
          if (res.statusCode !== 200) {
            reject(new Error(`HTTP ${res.statusCode}`));
            file.close();
            return;
          }

          const total = parseInt(res.headers["content-length"] || "0");
          let loaded = 0;

          res.on("data", (chunk) => {
            loaded += chunk.length;
            if (total) {
              process.stdout.write(
                `\rDownloading… ${((loaded / total) * 100).toFixed(1)}%`
              );
            }
          });

          res.pipe(file);
          file.on("finish", () => {
            file.close(() => {
              console.log("\nDone.");
              resolve();
            });
          });
        }
      )
      .on("error", (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
  });
}

async function main() {
  ensureDir(MODEL_DIR);

  if (fs.existsSync(MODEL_PATH)) {
    const sizeMB = (fs.statSync(MODEL_PATH).size / 1024 / 1024).toFixed(1);
    console.log(`Model already exists: ${MODEL_PATH} (${sizeMB} MB)`);
    return;
  }

  for (const src of SOURCES) {
    console.log(`Trying: ${src.desc} (${src.url})`);
    try {
      await downloadFile(src.url, MODEL_PATH);
      const sizeMB = (fs.statSync(MODEL_PATH).size / 1024 / 1024).toFixed(1);
      console.log(`Saved to: ${MODEL_PATH} (${sizeMB} MB)`);
      return;
    } catch (err) {
      console.error(`Failed: ${err.message}`);
    }
  }

  console.error("\nCould not download model automatically.");
  console.error("Please download manually from one of these URLs and place it at:");
  console.error(`  ${MODEL_PATH}\n`);
  for (const src of SOURCES) {
    console.error(`  - ${src.url}`);
  }
  process.exit(1);
}

main();
