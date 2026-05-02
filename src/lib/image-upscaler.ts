/**
 * Custom AI-like Image Upscaler
 * Uses multi-pass canvas processing with adaptive sharpening
 * No external API needed - 100% browser-based
 */

// ── Convolution helper ─────────────────────────────────────────────────────
function convolve(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  kernel: number[],
  kernelSize: number
): Uint8ClampedArray {
  const output = new Uint8ClampedArray(data.length)
  const half = Math.floor(kernelSize / 2)

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let r = 0, g = 0, b = 0
      let ki = 0

      for (let ky = -half; ky <= half; ky++) {
        for (let kx = -half; kx <= half; kx++) {
          const px = Math.min(Math.max(x + kx, 0), width - 1)
          const py = Math.min(Math.max(y + ky, 0), height - 1)
          const idx = (py * width + px) * 4
          const k = kernel[ki++]
          r += data[idx] * k
          g += data[idx + 1] * k
          b += data[idx + 2] * k
        }
      }

      const outIdx = (y * width + x) * 4
      output[outIdx] = Math.max(0, Math.min(255, r))
      output[outIdx + 1] = Math.max(0, Math.min(255, g))
      output[outIdx + 2] = Math.max(0, Math.min(255, b))
      output[outIdx + 3] = data[outIdx + 3]
    }
  }
  return output
}

// ── Unsharp Mask ───────────────────────────────────────────────────────────
function unsharpMask(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  strength: number = 0.6,
  radius: number = 1
): Uint8ClampedArray {
  // Gaussian blur kernel 3x3
  const blur = [
    1 / 16, 2 / 16, 1 / 16,
    2 / 16, 4 / 16, 2 / 16,
    1 / 16, 2 / 16, 1 / 16,
  ]

  const blurred = convolve(data, width, height, blur, 3)
  const output = new Uint8ClampedArray(data.length)

  for (let i = 0; i < data.length; i += 4) {
    for (let c = 0; c < 3; c++) {
      const orig = data[i + c]
      const blurVal = blurred[i + c]
      const sharpened = orig + strength * (orig - blurVal)
      output[i + c] = Math.max(0, Math.min(255, sharpened))
    }
    output[i + 3] = data[i + 3]
  }
  return output
}

// ── Edge-Adaptive Sharpening ───────────────────────────────────────────────
function adaptiveSharpen(
  data: Uint8ClampedArray,
  width: number,
  height: number
): Uint8ClampedArray {
  // Sobel edge detection + sharpen only at edges
  const output = new Uint8ClampedArray(data.length)

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = (y * width + x) * 4

      // Sobel X
      const gx =
        -data[((y - 1) * width + (x - 1)) * 4] + data[((y - 1) * width + (x + 1)) * 4] +
        -2 * data[(y * width + (x - 1)) * 4] + 2 * data[(y * width + (x + 1)) * 4] +
        -data[((y + 1) * width + (x - 1)) * 4] + data[((y + 1) * width + (x + 1)) * 4]

      // Sobel Y
      const gy =
        -data[((y - 1) * width + (x - 1)) * 4] - 2 * data[((y - 1) * width + x) * 4] - data[((y - 1) * width + (x + 1)) * 4] +
        data[((y + 1) * width + (x - 1)) * 4] + 2 * data[((y + 1) * width + x) * 4] + data[((y + 1) * width + (x + 1)) * 4]

      const edgeStrength = Math.sqrt(gx * gx + gy * gy) / 255

      // Apply stronger sharpening at edges
      const sharpenAmount = 0.3 + edgeStrength * 0.5

      for (let c = 0; c < 3; c++) {
        const center = data[idx + c]
        const neighbors =
          data[((y - 1) * width + x) * 4 + c] +
          data[((y + 1) * width + x) * 4 + c] +
          data[(y * width + (x - 1)) * 4 + c] +
          data[(y * width + (x + 1)) * 4 + c]
        const laplacian = center * 4 - neighbors
        output[idx + c] = Math.max(0, Math.min(255, center + sharpenAmount * laplacian * 0.25))
      }
      output[idx + 3] = data[idx + 3]
    }
  }

  // Copy border pixels
  for (let x = 0; x < width; x++) {
    for (const y of [0, height - 1]) {
      const idx = (y * width + x) * 4
      output[idx] = data[idx]
      output[idx + 1] = data[idx + 1]
      output[idx + 2] = data[idx + 2]
      output[idx + 3] = data[idx + 3]
    }
  }
  for (let y = 0; y < height; y++) {
    for (const x of [0, width - 1]) {
      const idx = (y * width + x) * 4
      output[idx] = data[idx]
      output[idx + 1] = data[idx + 1]
      output[idx + 2] = data[idx + 2]
      output[idx + 3] = data[idx + 3]
    }
  }

  return output
}

// ── Detail Enhancement ─────────────────────────────────────────────────────
function enhanceDetails(
  data: Uint8ClampedArray,
  width: number,
  height: number
): Uint8ClampedArray {
  // High-pass filter to boost fine details
  const highPass = [
    -1, -1, -1,
    -1, 9, -1,
    -1, -1, -1,
  ]
  const sharpened = convolve(data, width, height, highPass, 3)
  const output = new Uint8ClampedArray(data.length)

  for (let i = 0; i < data.length; i += 4) {
    for (let c = 0; c < 3; c++) {
      // Blend original with sharpened (30% sharpen)
      output[i + c] = Math.max(0, Math.min(255,
        data[i + c] * 0.7 + sharpened[i + c] * 0.3
      ))
    }
    output[i + 3] = data[i + 3]
  }
  return output
}

// ── Single Pass 2x Upscale ─────────────────────────────────────────────────
function upscale2x(sourceCanvas: HTMLCanvasElement): HTMLCanvasElement {
  const sw = sourceCanvas.width
  const sh = sourceCanvas.height
  const dw = sw * 2
  const dh = sh * 2

  const output = document.createElement("canvas")
  output.width = dw
  output.height = dh
  const ctx = output.getContext("2d")!

  // Step 1: Draw with high-quality smoothing
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = "high"
  ctx.drawImage(sourceCanvas, 0, 0, dw, dh)

  // Step 2: Get pixel data
  let imageData = ctx.getImageData(0, 0, dw, dh)

  // Step 3: Adaptive sharpening
  imageData.data.set(adaptiveSharpen(imageData.data, dw, dh))

  // Step 4: Unsharp mask for crispness
  imageData.data.set(unsharpMask(imageData.data, dw, dh, 0.5))

  // Step 5: Detail enhancement
  imageData.data.set(enhanceDetails(imageData.data, dw, dh))

  ctx.putImageData(imageData, 0, 0)
  return output
}

// ── Main Upscaler ──────────────────────────────────────────────────────────
export interface UpscaleOptions {
  targetScale: 2 | 4 | 8
  onProgress?: (percent: number, message: string) => void
}

export async function upscaleImage(
  img: HTMLImageElement,
  options: UpscaleOptions
): Promise<string> {
  const { targetScale, onProgress } = options

  const report = (p: number, msg: string) => onProgress?.(p, msg)

  // Create source canvas
  let current = document.createElement("canvas")
  current.width = img.width
  current.height = img.height
  const srcCtx = current.getContext("2d")!
  srcCtx.drawImage(img, 0, 0)

  const passes = targetScale === 2 ? 1 : targetScale === 4 ? 2 : 3

  for (let pass = 0; pass < passes; pass++) {
    const passLabel = passes === 1 ? "" : ` (Pass ${pass + 1}/${passes})`
    report(
      Math.round((pass / passes) * 85),
      `Upscaling 2x${passLabel}...`
    )

    // Yield to browser to prevent UI freeze
    await new Promise(r => setTimeout(r, 10))

    current = upscale2x(current)

    report(
      Math.round(((pass + 1) / passes) * 85),
      pass < passes - 1 ? `Pass ${pass + 1} done, continuing...` : "Finalizing..."
    )

    await new Promise(r => setTimeout(r, 10))
  }

  report(90, "Encoding output...")

  // Final quality pass
  const finalCtx = current.getContext("2d")!
  let finalData = finalCtx.getImageData(0, 0, current.width, current.height)

  // Light final sharpen
  finalData.data.set(unsharpMask(finalData.data, current.width, current.height, 0.3))
  finalCtx.putImageData(finalData, 0, 0)

  report(100, "Done!")

  return new Promise(resolve => {
    current.toBlob(blob => {
      resolve(URL.createObjectURL(blob!))
    }, "image/jpeg", 0.97)
  })
}

export function getOutputSize(
  originalW: number,
  originalH: number,
  scale: 2 | 4 | 8
): { w: number; h: number; label: string } {
  const w = originalW * scale
  const h = originalH * scale
  const mp = (w * h / 1_000_000).toFixed(1)
  const label = w >= 7680 ? "8K" : w >= 3840 ? "4K" : w >= 1920 ? "FHD" : "HD"
  return { w, h, label: `${label} (${mp}MP)` }
}
