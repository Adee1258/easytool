"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import {
  Upload, Download, Sparkles, Loader2, RefreshCw,
  Sun, Contrast, Droplets, Zap, Eye, Sliders,
  CheckCircle2, RotateCcw, Image as ImageIcon
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

// ── Enhancement Presets ────────────────────────────────────────────────────
const PRESETS = [
  {
    id: "auto",
    label: "✨ Auto Enhance",
    desc: "Smart auto-correction",
    settings: { brightness: 108, contrast: 115, saturation: 120, sharpness: 40, warmth: 5, highlights: -10, shadows: 15 }
  },
  {
    id: "portrait",
    label: "👤 Portrait",
    desc: "Skin & face optimized",
    settings: { brightness: 105, contrast: 108, saturation: 110, sharpness: 30, warmth: 10, highlights: -15, shadows: 20 }
  },
  {
    id: "vivid",
    label: "🌈 Vivid",
    desc: "Punchy colors",
    settings: { brightness: 105, contrast: 125, saturation: 145, sharpness: 50, warmth: 0, highlights: -5, shadows: 10 }
  },
  {
    id: "natural",
    label: "🌿 Natural",
    desc: "True-to-life look",
    settings: { brightness: 102, contrast: 105, saturation: 105, sharpness: 20, warmth: 3, highlights: -5, shadows: 8 }
  },
  {
    id: "dramatic",
    label: "🎭 Dramatic",
    desc: "High contrast look",
    settings: { brightness: 95, contrast: 140, saturation: 115, sharpness: 60, warmth: -5, highlights: -20, shadows: 5 }
  },
  {
    id: "bw",
    label: "⬛ B&W",
    desc: "Classic black & white",
    settings: { brightness: 105, contrast: 120, saturation: 0, sharpness: 40, warmth: 0, highlights: -10, shadows: 15 }
  },
  {
    id: "warm",
    label: "🌅 Warm",
    desc: "Golden hour feel",
    settings: { brightness: 108, contrast: 110, saturation: 120, sharpness: 25, warmth: 25, highlights: -8, shadows: 12 }
  },
  {
    id: "cool",
    label: "❄️ Cool",
    desc: "Fresh blue tones",
    settings: { brightness: 105, contrast: 112, saturation: 115, sharpness: 30, warmth: -20, highlights: -5, shadows: 10 }
  },
]

interface Settings {
  brightness: number
  contrast: number
  saturation: number
  sharpness: number
  warmth: number
  highlights: number
  shadows: number
}

const DEFAULT_SETTINGS: Settings = {
  brightness: 100,
  contrast: 100,
  saturation: 100,
  sharpness: 0,
  warmth: 0,
  highlights: 0,
  shadows: 0,
}

// ── Canvas Enhancement Engine ──────────────────────────────────────────────
function applyEnhancements(
  sourceCanvas: HTMLCanvasElement,
  settings: Settings
): HTMLCanvasElement {
  const output = document.createElement("canvas")
  output.width = sourceCanvas.width
  output.height = sourceCanvas.height
  const ctx = output.getContext("2d")!

  ctx.drawImage(sourceCanvas, 0, 0)

  const imageData = ctx.getImageData(0, 0, output.width, output.height)
  const data = imageData.data

  const brightness = (settings.brightness - 100) * 2.55
  const contrast = settings.contrast / 100
  const saturation = settings.saturation / 100
  const warmth = settings.warmth * 2
  const highlights = settings.highlights / 100
  const shadows = settings.shadows / 100

  for (let i = 0; i < data.length; i += 4) {
    let r = data[i]
    let g = data[i + 1]
    let b = data[i + 2]

    // Brightness
    r += brightness
    g += brightness
    b += brightness

    // Contrast
    r = (r - 128) * contrast + 128
    g = (g - 128) * contrast + 128
    b = (b - 128) * contrast + 128

    // Warmth (shift red/blue channels)
    r += warmth
    b -= warmth

    // Highlights & Shadows
    const luminance = (r * 0.299 + g * 0.587 + b * 0.114) / 255
    if (luminance > 0.5) {
      // Highlights
      const factor = (luminance - 0.5) * 2
      r += r * highlights * factor
      g += g * highlights * factor
      b += b * highlights * factor
    } else {
      // Shadows
      const factor = (0.5 - luminance) * 2
      r += r * shadows * factor
      g += g * shadows * factor
      b += b * shadows * factor
    }

    // Saturation (convert to HSL-like)
    const gray = r * 0.299 + g * 0.587 + b * 0.114
    r = gray + (r - gray) * saturation
    g = gray + (g - gray) * saturation
    b = gray + (b - gray) * saturation

    data[i] = Math.max(0, Math.min(255, r))
    data[i + 1] = Math.max(0, Math.min(255, g))
    data[i + 2] = Math.max(0, Math.min(255, b))
  }

  ctx.putImageData(imageData, 0, 0)

  // Sharpness via unsharp mask
  if (settings.sharpness > 0) {
    const strength = settings.sharpness / 100
    const blurred = document.createElement("canvas")
    blurred.width = output.width
    blurred.height = output.height
    const bCtx = blurred.getContext("2d")!
    bCtx.filter = `blur(1px)`
    bCtx.drawImage(output, 0, 0)

    const sharpCtx = output.getContext("2d")!
    sharpCtx.globalCompositeOperation = "overlay"
    sharpCtx.globalAlpha = strength * 0.3
    sharpCtx.drawImage(output, 0, 0)
    sharpCtx.globalCompositeOperation = "source-over"
    sharpCtx.globalAlpha = 1
  }

  return output
}

// ── Component ──────────────────────────────────────────────────────────────
export default function ImageEnhancer() {
  const [originalFile, setOriginalFile] = useState<File | null>(null)
  const [originalUrl, setOriginalUrl] = useState<string | null>(null)
  const [enhancedUrl, setEnhancedUrl] = useState<string | null>(null)
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS)
  const [activePreset, setActivePreset] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)
  const [upscaling, setUpscaling] = useState(false)
  const [upscaleProgress, setUpscaleProgress] = useState(0)
  const [showOriginal, setShowOriginal] = useState(false)
  const [upscaled, setUpscaled] = useState(false)
  const sourceCanvasRef = useRef<HTMLCanvasElement>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return
    setOriginalFile(file)
    const url = URL.createObjectURL(file)
    setOriginalUrl(url)
    setEnhancedUrl(null)
    setSettings(DEFAULT_SETTINGS)
    setActivePreset(null)
    setUpscaled(false)

    // Load into source canvas
    const img = new Image()
    img.onload = () => {
      const canvas = sourceCanvasRef.current!
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext("2d")!
      ctx.drawImage(img, 0, 0)
    }
    img.src = url
    toast.success("Image loaded! Apply a preset or adjust manually.")
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpg", ".jpeg", ".png", ".webp"] },
    multiple: false,
    maxSize: 15 * 1024 * 1024,
  })

  // Apply enhancements whenever settings change
  const applyAndPreview = useCallback((newSettings: Settings) => {
    const canvas = sourceCanvasRef.current
    if (!canvas || !originalUrl) return

    setProcessing(true)
    requestAnimationFrame(() => {
      try {
        const result = applyEnhancements(canvas, newSettings)
        result.toBlob(blob => {
          if (!blob) return
          const url = URL.createObjectURL(blob)
          setEnhancedUrl(prev => {
            if (prev) URL.revokeObjectURL(prev)
            return url
          })
          setProcessing(false)
        }, "image/jpeg", 0.95)
      } catch {
        setProcessing(false)
      }
    })
  }, [originalUrl])

  const handlePreset = (preset: typeof PRESETS[0]) => {
    setActivePreset(preset.id)
    const newSettings = { ...preset.settings } as Settings
    setSettings(newSettings)
    applyAndPreview(newSettings)
  }

  const handleSlider = (key: keyof Settings, value: number) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    setActivePreset(null)
    applyAndPreview(newSettings)
  }

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS)
    setActivePreset(null)
    setEnhancedUrl(null)
    setUpscaled(false)
  }

  const handleUpscale = async () => {
    if (!enhancedUrl && !originalUrl) return
    setUpscaling(true)
    setUpscaleProgress(0)

    try {
      toast.info("Loading AI upscale model... (first time may take 30s)")

      const Upscaler = (await import("upscaler")).default
      const model = await import("@upscalerjs/esrgan-slim")

      setUpscaleProgress(30)

      const upscaler = new Upscaler({ model: model.default })
      const sourceUrl = enhancedUrl || originalUrl!

      setUpscaleProgress(50)
      toast.info("Upscaling image with AI...")

      const result = await upscaler.upscale(sourceUrl, {
        output: "base64",
        patchSize: 64,
        padding: 2,
        progress: (p: number) => setUpscaleProgress(50 + Math.round(p * 50)),
      })

      setUpscaleProgress(100)
      setEnhancedUrl(result)
      setUpscaled(true)
      toast.success("Image upscaled 2x with AI!")
    } catch (err) {
      toast.error("Upscaling failed. Try a smaller image.")
    } finally {
      setUpscaling(false)
      setUpscaleProgress(0)
    }
  }

  const downloadImage = () => {
    const url = enhancedUrl || originalUrl
    if (!url) return
    const link = document.createElement("a")
    link.href = url
    link.download = `enhanced-${originalFile?.name?.replace(/\.[^.]+$/, "") || "image"}.jpg`
    link.click()
    toast.success("Enhanced image downloaded!")
  }

  const SLIDERS = [
    { key: "brightness" as const, label: "Brightness", icon: Sun, min: 50, max: 150, default: 100 },
    { key: "contrast" as const, label: "Contrast", icon: Contrast, min: 50, max: 200, default: 100 },
    { key: "saturation" as const, label: "Saturation", icon: Droplets, min: 0, max: 200, default: 100 },
    { key: "sharpness" as const, label: "Sharpness", icon: Zap, min: 0, max: 100, default: 0 },
    { key: "warmth" as const, label: "Warmth", icon: Sun, min: -50, max: 50, default: 0 },
    { key: "highlights" as const, label: "Highlights", icon: Eye, min: -50, max: 50, default: 0 },
    { key: "shadows" as const, label: "Shadows", icon: Eye, min: -50, max: 50, default: 0 },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <canvas ref={sourceCanvasRef} className="hidden" />

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
              <p className="text-muted-foreground text-sm">JPG, PNG, WebP — Max 15MB</p>
            </div>
            <Button size="lg" className="px-8 h-12 font-bold" type="button">
              <Upload className="mr-2 h-5 w-5" /> Choose Photo
            </Button>
            <p className="text-xs text-muted-foreground">
              ✨ AI-powered enhancement · Brightness · Contrast · Sharpness · Upscaling
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Before/After Preview */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Original</Label>
              <div className="aspect-square rounded-2xl overflow-hidden border-2 border-border bg-muted">
                {originalUrl && <img src={originalUrl} alt="Original" className="w-full h-full object-contain" />}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Enhanced</Label>
                {upscaled && <span className="text-xs font-bold text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">2x Upscaled</span>}
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-primary/20 bg-muted">
                {processing && (
                  <div className="absolute inset-0 bg-background/60 flex items-center justify-center z-10">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                )}
                {enhancedUrl ? (
                  <img src={enhancedUrl} alt="Enhanced" className="w-full h-full object-contain" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-xs text-muted-foreground">Select a preset or adjust sliders</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Presets */}
          <div className="space-y-3">
            <Label className="font-bold flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" /> Quick Presets
            </Label>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
              {PRESETS.map(preset => (
                <button
                  key={preset.id}
                  onClick={() => handlePreset(preset)}
                  className={cn(
                    "p-2.5 rounded-xl border-2 text-center transition-all text-xs font-semibold",
                    activePreset === preset.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/40 text-muted-foreground hover:text-foreground"
                  )}
                >
                  <span className="block text-base mb-0.5">{preset.label.split(" ")[0]}</span>
                  <span className="block text-[10px] leading-tight">{preset.label.split(" ").slice(1).join(" ")}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Manual Sliders */}
          <Card>
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <Label className="font-bold flex items-center gap-2">
                  <Sliders className="h-4 w-4 text-primary" /> Manual Adjustments
                </Label>
                <Button variant="ghost" size="sm" onClick={handleReset} className="text-xs text-muted-foreground h-7">
                  <RotateCcw className="h-3 w-3 mr-1" /> Reset
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SLIDERS.map(s => (
                  <div key={s.key} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold flex items-center gap-1">
                        <s.icon className="h-3 w-3" /> {s.label}
                      </span>
                      <span className={cn(
                        "font-bold",
                        settings[s.key] !== s.default ? "text-primary" : "text-muted-foreground"
                      )}>
                        {settings[s.key] > s.default ? "+" : ""}{settings[s.key] - s.default}
                      </span>
                    </div>
                    <Slider
                      value={[settings[s.key]]}
                      min={s.min}
                      max={s.max}
                      step={1}
                      onValueChange={v => handleSlider(s.key, v[0])}
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Upscale */}
          <Card className="bg-gradient-to-r from-violet-500/5 to-fuchsia-500/5 border-violet-500/20">
            <CardContent className="p-5">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <p className="font-bold flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-violet-500" />
                    AI Upscale 2x
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Double resolution using ESRGAN AI model — browser-based
                  </p>
                </div>
                <Button
                  onClick={handleUpscale}
                  disabled={upscaling || !originalFile}
                  className="bg-violet-600 hover:bg-violet-700 text-white font-bold shadow-lg shadow-violet-600/25"
                >
                  {upscaling ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> {upscaleProgress}%</>
                  ) : (
                    <><Sparkles className="mr-2 h-4 w-4" /> Upscale 2x</>
                  )}
                </Button>
              </div>
              {upscaling && (
                <div className="mt-3 space-y-1">
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-violet-500 rounded-full transition-all duration-300" style={{ width: `${upscaleProgress}%` }} />
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    {upscaleProgress < 30 ? "Loading AI model..." : upscaleProgress < 50 ? "Preparing..." : "Upscaling with AI..."}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              onClick={downloadImage}
              disabled={!enhancedUrl}
              className="flex-1 h-12 font-bold bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/25"
            >
              <Download className="mr-2 h-5 w-5" />
              Download Enhanced
            </Button>
            <Button
              variant="outline"
              onClick={() => { setOriginalFile(null); setOriginalUrl(null); setEnhancedUrl(null) }}
              className="h-12 px-5 font-semibold"
            >
              <RefreshCw className="mr-2 h-4 w-4" /> New Photo
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
