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
  { id: "auto", label: "✨ Auto", settings: { brightness: 108, contrast: 115, saturation: 120, sharpness: 40, warmth: 5, highlights: -10, shadows: 15, denoise: 20 } },
  { id: "portrait", label: "👤 Portrait", settings: { brightness: 105, contrast: 108, saturation: 110, sharpness: 30, warmth: 10, highlights: -15, shadows: 20, denoise: 30 } },
  { id: "vivid", label: "🌈 Vivid", settings: { brightness: 105, contrast: 125, saturation: 145, sharpness: 50, warmth: 0, highlights: -5, shadows: 10, denoise: 10 } },
  { id: "natural", label: "🌿 Natural", settings: { brightness: 102, contrast: 105, saturation: 105, sharpness: 20, warmth: 3, highlights: -5, shadows: 8, denoise: 15 } },
  { id: "dramatic", label: "🎭 Dramatic", settings: { brightness: 95, contrast: 140, saturation: 115, sharpness: 60, warmth: -5, highlights: -20, shadows: 5, denoise: 5 } },
  { id: "bw", label: "⬛ B&W", settings: { brightness: 105, contrast: 120, saturation: 0, sharpness: 40, warmth: 0, highlights: -10, shadows: 15, denoise: 20 } },
  { id: "warm", label: "🌅 Warm", settings: { brightness: 108, contrast: 110, saturation: 120, sharpness: 25, warmth: 25, highlights: -8, shadows: 12, denoise: 15 } },
  { id: "cool", label: "❄️ Cool", settings: { brightness: 105, contrast: 112, saturation: 115, sharpness: 30, warmth: -20, highlights: -5, shadows: 10, denoise: 15 } },
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

// ── Canvas Enhancement ─────────────────────────────────────────────────────
function enhanceImage(img: HTMLImageElement, s: Settings, scale: number): HTMLCanvasElement {
  const w = Math.round(img.width * scale)
  const h = Math.round(img.height * scale)

  const canvas = document.createElement("canvas")
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext("2d")!

  // Use high-quality image smoothing for upscaling
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = "high"
  ctx.drawImage(img, 0, 0, w, h)

  const imageData = ctx.getImageData(0, 0, w, h)
  const data = imageData.data

  const brightness = (s.brightness - 100) * 2.55
  const contrast = s.contrast / 100
  const saturation = s.saturation / 100
  const warmth = s.warmth * 2.5
  const highlights = s.highlights / 100
  const shadows = s.shadows / 100

  for (let i = 0; i < data.length; i += 4) {
    let r = data[i], g = data[i + 1], b = data[i + 2]

    // Brightness
    r += brightness; g += brightness; b += brightness

    // Contrast
    r = (r - 128) * contrast + 128
    g = (g - 128) * contrast + 128
    b = (b - 128) * contrast + 128

    // Warmth
    r += warmth; b -= warmth

    // Highlights & Shadows
    const lum = (r * 0.299 + g * 0.587 + b * 0.114) / 255
    if (lum > 0.5) {
      const f = (lum - 0.5) * 2
      r += r * highlights * f; g += g * highlights * f; b += b * highlights * f
    } else {
      const f = (0.5 - lum) * 2
      r += r * shadows * f; g += g * shadows * f; b += b * shadows * f
    }

    // Saturation
    const gray = r * 0.299 + g * 0.587 + b * 0.114
    r = gray + (r - gray) * saturation
    g = gray + (g - gray) * saturation
    b = gray + (b - gray) * saturation

    data[i] = Math.max(0, Math.min(255, r))
    data[i + 1] = Math.max(0, Math.min(255, g))
    data[i + 2] = Math.max(0, Math.min(255, b))
  }

  ctx.putImageData(imageData, 0, 0)

  // Sharpness via canvas filter
  if (s.sharpness > 0) {
    const tmp = document.createElement("canvas")
    tmp.width = w; tmp.height = h
    const tCtx = tmp.getContext("2d")!
    tCtx.drawImage(canvas, 0, 0)

    ctx.globalCompositeOperation = "overlay"
    ctx.globalAlpha = s.sharpness / 200
    ctx.drawImage(tmp, 0, 0)
    ctx.globalCompositeOperation = "source-over"
    ctx.globalAlpha = 1
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

  const handleUpscale = (scale: number) => {
    setUpscaleLevel(scale)
    applyAndPreview(settings, scale)
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
            </Label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { scale: 1, label: "Original", desc: `${originalSize.w}×${originalSize.h}` },
                { scale: 2, label: "2x HD", desc: `${originalSize.w * 2}×${originalSize.h * 2}` },
                { scale: 3, label: "3x FHD", desc: `${originalSize.w * 3}×${originalSize.h * 3}` },
                { scale: 4, label: "4x 4K", desc: `${originalSize.w * 4}×${originalSize.h * 4}` },
              ].map(u => (
                <button
                  key={u.scale}
                  onClick={() => handleUpscale(u.scale)}
                  className={cn(
                    "p-3 rounded-xl border-2 text-center transition-all",
                    upscaleLevel === u.scale
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/40"
                  )}
                >
                  <p className={cn("font-black text-sm", upscaleLevel === u.scale ? "text-primary" : "")}>{u.label}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{u.desc}px</p>
                </button>
              ))}
            </div>
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
