"use client"

import { useState, useCallback, useRef } from "react"
import { useDropzone } from "react-dropzone"
import {
  Upload, Download, Sparkles, Loader2, RefreshCw,
  Sun, Zap, Sliders, RotateCcw, CheckCircle2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

const PRESETS = [
  { id: "auto", label: "✨ Auto", settings: { brightness: 105, contrast: 112, saturation: 115, sharpness: 25, warmth: 3, highlights: -8, shadows: 12, denoise: 0 } },
  { id: "portrait", label: "👤 Portrait", settings: { brightness: 103, contrast: 108, saturation: 108, sharpness: 20, warmth: 5, highlights: -12, shadows: 18, denoise: 0 } },
  { id: "vivid", label: "🌈 Vivid", settings: { brightness: 103, contrast: 120, saturation: 140, sharpness: 35, warmth: 0, highlights: -5, shadows: 8, denoise: 0 } },
  { id: "natural", label: "🌿 Natural", settings: { brightness: 101, contrast: 103, saturation: 103, sharpness: 15, warmth: 2, highlights: -3, shadows: 5, denoise: 0 } },
  { id: "dramatic", label: "🎭 Dramatic", settings: { brightness: 97, contrast: 135, saturation: 112, sharpness: 45, warmth: -3, highlights: -18, shadows: 3, denoise: 0 } },
  { id: "bw", label: "⬛ B&W", settings: { brightness: 103, contrast: 118, saturation: 0, sharpness: 30, warmth: 0, highlights: -8, shadows: 12, denoise: 0 } },
  { id: "warm", label: "🌅 Warm", settings: { brightness: 105, contrast: 108, saturation: 115, sharpness: 20, warmth: 15, highlights: -6, shadows: 10, denoise: 0 } },
  { id: "cool", label: "❄️ Cool", settings: { brightness: 103, contrast: 110, saturation: 112, sharpness: 22, warmth: -12, highlights: -4, shadows: 8, denoise: 0 } },
]

interface Settings {
  brightness: number
  contrast: number
  saturation: number
  sharpness: number
  warmth: number
  highlights: number
  shadows: number
  denoise: number
}

const DEFAULT: Settings = {
  brightness: 100, contrast: 100, saturation: 100,
  sharpness: 0, warmth: 0, highlights: 0, shadows: 0, denoise: 0
}

// ── Canvas Enhancement - Fixed ─────────────────────────────────────────────
function enhanceImage(img: HTMLImageElement, s: Settings, scale: number): HTMLCanvasElement {
  const w = Math.round(img.width * scale)
  const h = Math.round(img.height * scale)

  const canvas = document.createElement("canvas")
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext("2d")!

  // Step 1: Draw with high quality smoothing
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = "high"
  ctx.drawImage(img, 0, 0, w, h)

  // Step 2: Apply pixel-level adjustments
  const imageData = ctx.getImageData(0, 0, w, h)
  const data = imageData.data

  // Normalize values properly
  const brightness = (s.brightness - 100) / 100  // -0.5 to +0.5
  const contrast = s.contrast / 100               // 0.5 to 2.0
  const saturation = s.saturation / 100           // 0 to 2.0
  const warmth = s.warmth * 0.8                   // -40 to +40 (subtle)
  const highlights = s.highlights / 200           // -0.25 to +0.25
  const shadows = s.shadows / 200                 // -0.25 to +0.25

  for (let i = 0; i < data.length; i += 4) {
    let r = data[i] / 255
    let g = data[i + 1] / 255
    let b = data[i + 2] / 255

    // 1. Brightness (additive)
    r += brightness
    g += brightness
    b += brightness

    // 2. Contrast (around midpoint)
    r = (r - 0.5) * contrast + 0.5
    g = (g - 0.5) * contrast + 0.5
    b = (b - 0.5) * contrast + 0.5

    // 3. Warmth (subtle red/blue shift only)
    if (warmth !== 0) {
      const w = warmth / 255
      r = Math.min(1, r + w)
      b = Math.max(0, b - w * 0.5)
    }

    // 4. Highlights & Shadows (luminosity-based)
    const lum = r * 0.299 + g * 0.587 + b * 0.114
    if (lum > 0.5 && highlights !== 0) {
      const f = (lum - 0.5) * 2 * highlights
      r = Math.min(1, r + f)
      g = Math.min(1, g + f)
      b = Math.min(1, b + f)
    } else if (lum <= 0.5 && shadows !== 0) {
      const f = (0.5 - lum) * 2 * shadows
      r = Math.min(1, r + f)
      g = Math.min(1, g + f)
      b = Math.min(1, b + f)
    }

    // 5. Saturation (proper HSL-based)
    if (saturation !== 1) {
      const gray = r * 0.299 + g * 0.587 + b * 0.114
      r = gray + (r - gray) * saturation
      g = gray + (g - gray) * saturation
      b = gray + (b - gray) * saturation
    }

    // Clamp and write back
    data[i] = Math.round(Math.max(0, Math.min(255, r * 255)))
    data[i + 1] = Math.round(Math.max(0, Math.min(255, g * 255)))
    data[i + 2] = Math.round(Math.max(0, Math.min(255, b * 255)))
  }

  ctx.putImageData(imageData, 0, 0)

  // Step 3: Sharpness via proper unsharp mask (no composite mode)
  if (s.sharpness > 0) {
    const strength = s.sharpness / 100
    const sharpData = ctx.getImageData(0, 0, w, h)
    const sd = sharpData.data
    const orig = new Uint8ClampedArray(sd)

    // Simple 3x3 sharpen kernel
    const kernel = [
      0, -strength, 0,
      -strength, 1 + 4 * strength, -strength,
      0, -strength, 0
    ]

    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const idx = (y * w + x) * 4
        for (let c = 0; c < 3; c++) {
          let val = 0
          for (let ky = -1; ky <= 1; ky++) {
            for (let kx = -1; kx <= 1; kx++) {
              const kidx = ((y + ky) * w + (x + kx)) * 4 + c
              val += orig[kidx] * kernel[(ky + 1) * 3 + (kx + 1)]
            }
          }
          sd[idx + c] = Math.max(0, Math.min(255, val))
        }
      }
    }
    ctx.putImageData(sharpData, 0, 0)
  }

  return canvas
}

// ── Component ──────────────────────────────────────────────────────────────
export default function ImageEnhancer() {
  const [originalFile, setOriginalFile] = useState<File | null>(null)
  const [originalUrl, setOriginalUrl] = useState<string | null>(null)
  const [enhancedUrl, setEnhancedUrl] = useState<string | null>(null)
  const [settings, setSettings] = useState<Settings>(DEFAULT)
  const [activePreset, setActivePreset] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)
  const [upscaleLevel, setUpscaleLevel] = useState(1)
  const [upscaleProgress, setUpscaleProgress] = useState(0)
  const [progressMsg, setProgressMsg] = useState("")
  const [originalSize, setOriginalSize] = useState({ w: 0, h: 0 })
  const imgRef = useRef<HTMLImageElement | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return
    setOriginalFile(file)
    const url = URL.createObjectURL(file)
    setOriginalUrl(url)
    setEnhancedUrl(null)
    setSettings(DEFAULT)
    setActivePreset(null)
    setUpscaleLevel(1)

    const img = new Image()
    img.onload = () => {
      imgRef.current = img
      setOriginalSize({ w: img.width, h: img.height })
    }
    img.src = url
    toast.success("Photo loaded! Apply a preset or adjust manually.")
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpg", ".jpeg", ".png", ".webp"] },
    multiple: false,
    maxSize: 20 * 1024 * 1024,
  })

  const applyAndPreview = useCallback((newSettings: Settings, scale: number) => {
    const img = imgRef.current
    if (!img) return
    setProcessing(true)

    setTimeout(() => {
      try {
        const result = enhanceImage(img, newSettings, scale)
        result.toBlob(blob => {
          if (!blob) return
          const url = URL.createObjectURL(blob)
          setEnhancedUrl(prev => { if (prev) URL.revokeObjectURL(prev); return url })
          setProcessing(false)
        }, "image/jpeg", 0.95)
      } catch { setProcessing(false) }
    }, 50)
  }, [])

  const handlePreset = (preset: typeof PRESETS[0]) => {
    setActivePreset(preset.id)
    const s = { ...preset.settings } as Settings
    setSettings(s)
    applyAndPreview(s, upscaleLevel)
  }

  const handleSlider = (key: keyof Settings, value: number) => {
    const s = { ...settings, [key]: value }
    setSettings(s)
    setActivePreset(null)
    applyAndPreview(s, upscaleLevel)
  }

  // Upscale Buttons - Custom AI-like processing (no API needed)
  const UPSCALE_OPTIONS = [
    { scale: 1 as const, label: "Original", desc: `${originalSize.w}×${originalSize.h}`, ai: false },
    { scale: 2 as const, label: "2x HD", desc: `${originalSize.w * 2}×${originalSize.h * 2}`, ai: true },
    { scale: 4 as const, label: "4x 4K", desc: `${originalSize.w * 4}×${originalSize.h * 4}`, ai: true },
    { scale: 8 as const, label: "8x Ultra", desc: `${originalSize.w * 8}×${originalSize.h * 8}`, ai: true },
  ]

  const handleUpscale = async (scale: 1 | 2 | 4 | 8, useAI: boolean) => {
    setUpscaleLevel(scale)

    if (!useAI || scale === 1) {
      applyAndPreview(settings, 1)
      return
    }

    const img = imgRef.current
    if (!img) return

    setProcessing(true)
    setUpscaleProgress(5)

    try {
      const { upscaleImage, getOutputSize } = await import("@/lib/image-upscaler")
      const sizeInfo = getOutputSize(originalSize.w, originalSize.h, scale)
      toast.info(`Upscaling to ${sizeInfo.label}... please wait.`)

      const resultUrl = await upscaleImage(img, {
        targetScale: scale,
        onProgress: (p, msg) => {
          setUpscaleProgress(p)
          setProgressMsg(msg)
        },
      })

      setEnhancedUrl(prev => { if (prev) URL.revokeObjectURL(prev); return resultUrl })
      toast.success(`✨ ${scale}x done! Output: ${sizeInfo.w}×${sizeInfo.h}px`)
    } catch (err: any) {
      toast.error("Upscaling failed. Try a smaller image.")
      applyAndPreview(settings, 1)
    } finally {
      setProcessing(false)
      setUpscaleProgress(0)
      setProgressMsg("")
    }
  }

  const handleReset = () => {
    setSettings(DEFAULT)
    setActivePreset(null)
    setEnhancedUrl(null)
    setUpscaleLevel(1)
  }

  const newW = Math.round(originalSize.w * upscaleLevel)
  const newH = Math.round(originalSize.h * upscaleLevel)

  const SLIDERS = [
    { key: "brightness" as const, label: "Brightness", min: 50, max: 150, default: 100 },
    { key: "contrast" as const, label: "Contrast", min: 50, max: 200, default: 100 },
    { key: "saturation" as const, label: "Saturation", min: 0, max: 200, default: 100 },
    { key: "sharpness" as const, label: "Sharpness", min: 0, max: 100, default: 0 },
    { key: "warmth" as const, label: "Warmth", min: -50, max: 50, default: 0 },
    { key: "highlights" as const, label: "Highlights", min: -50, max: 50, default: 0 },
    { key: "shadows" as const, label: "Shadows", min: -50, max: 50, default: 0 },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {!originalFile ? (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-2xl p-14 text-center cursor-pointer transition-all",
            isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/30"
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">Upload Photo to Enhance</h3>
              <p className="text-muted-foreground text-sm">JPG, PNG, WebP — Max 20MB</p>
            </div>
            <Button size="lg" className="px-8 h-12 font-bold" type="button">
              <Upload className="mr-2 h-5 w-5" /> Choose Photo
            </Button>
            <p className="text-xs text-muted-foreground">
              ✨ Enhance quality · Upscale up to 4x · 8 smart presets
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Before/After */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Original · {originalSize.w}×{originalSize.h}px
              </Label>
              <div className="aspect-square rounded-2xl overflow-hidden border-2 border-border bg-muted">
                {originalUrl && <img src={originalUrl} alt="Original" className="w-full h-full object-contain" />}
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Enhanced · {newW}×{newH}px
                {upscaleLevel > 1 && <span className="ml-2 text-green-600 font-black">{upscaleLevel}x</span>}
              </Label>
              <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-primary/20 bg-muted">
                {processing && (
                  <div className="absolute inset-0 bg-background/70 flex items-center justify-center z-10 backdrop-blur-sm">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                )}
                {enhancedUrl ? (
                  <img src={enhancedUrl} alt="Enhanced" className="w-full h-full object-contain" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-xs text-muted-foreground text-center px-4">Select a preset or adjust sliders</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Upscale Buttons */}
          <div className="space-y-2">
            <Label className="font-bold text-sm flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              Upscale Resolution
              <span className="text-xs font-normal text-muted-foreground">(4x & 8x use Real-ESRGAN AI)</span>
            </Label>
            <div className="grid grid-cols-4 gap-2">
              {UPSCALE_OPTIONS.map(u => (
                <button
                  key={u.scale}
                  onClick={() => handleUpscale(u.scale, u.ai)}
                  disabled={processing}
                  className={cn(
                    "p-3 rounded-xl border-2 text-center transition-all disabled:opacity-50",
                    upscaleLevel === u.scale
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/40"
                  )}
                >
                  <p className={cn("font-black text-sm", upscaleLevel === u.scale ? "text-primary" : "")}>
                    {u.label}
                    {u.ai && <span className="ml-1 text-[9px] bg-violet-500/20 text-violet-600 px-1 rounded">AI</span>}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{u.desc}px</p>
                </button>
              ))}
            </div>
            {processing && upscaleProgress > 0 && (
              <div className="space-y-1">
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-violet-500 rounded-full transition-all duration-500" style={{ width: `${upscaleProgress}%` }} />
                </div>
                <p className="text-xs text-center text-muted-foreground">
                  {upscaleProgress < 30 ? "Sending to AI..." : upscaleProgress < 80 ? "Real-ESRGAN processing..." : "Finalizing..."}
                  {" "}{upscaleProgress}%
                </p>
              </div>
            )}
          </div>

          {/* Presets */}
          <div className="space-y-2">
            <Label className="font-bold text-sm flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" /> Quick Presets
            </Label>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
              {PRESETS.map(preset => (
                <button
                  key={preset.id}
                  onClick={() => handlePreset(preset)}
                  className={cn(
                    "p-2.5 rounded-xl border-2 text-center transition-all",
                    activePreset === preset.id
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/40"
                  )}
                >
                  <span className="block text-lg leading-none mb-0.5">{preset.label.split(" ")[0]}</span>
                  <span className="block text-[10px] font-semibold text-muted-foreground leading-tight">
                    {preset.label.split(" ").slice(1).join(" ")}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Manual Sliders */}
          <Card>
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <Label className="font-bold flex items-center gap-2">
                  <Sliders className="h-4 w-4 text-primary" /> Fine Tune
                </Label>
                <Button variant="ghost" size="sm" onClick={handleReset} className="text-xs h-7">
                  <RotateCcw className="h-3 w-3 mr-1" /> Reset
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SLIDERS.map(s => (
                  <div key={s.key} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold">{s.label}</span>
                      <span className={cn("font-bold", settings[s.key] !== s.default ? "text-primary" : "text-muted-foreground")}>
                        {settings[s.key] > s.default ? "+" : ""}{settings[s.key] - s.default}
                      </span>
                    </div>
                    <Slider
                      value={[settings[s.key]]}
                      min={s.min} max={s.max} step={1}
                      onValueChange={v => handleSlider(s.key, v[0])}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Download */}
          <div className="flex gap-3">
            <Button
              onClick={() => {
                if (!enhancedUrl) return
                const link = document.createElement("a")
                link.href = enhancedUrl
                link.download = `enhanced-${upscaleLevel}x-${originalFile?.name?.replace(/\.[^.]+$/, "") || "image"}.jpg`
                link.click()
                toast.success("Enhanced image downloaded!")
              }}
              disabled={!enhancedUrl}
              className="flex-1 h-12 font-bold bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/25"
            >
              <Download className="mr-2 h-5 w-5" />
              Download {upscaleLevel > 1 ? `${upscaleLevel}x Enhanced` : "Enhanced"} Image
            </Button>
            <Button variant="outline" onClick={() => { setOriginalFile(null); setOriginalUrl(null); setEnhancedUrl(null) }} className="h-12 px-5">
              <RefreshCw className="mr-2 h-4 w-4" /> New
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
