"use client"

import { useState, useCallback, useRef } from "react"
import { useDropzone } from "react-dropzone"
import {
  Upload, Download, Eraser, Loader2, CheckCircle2,
  RefreshCw, Image as ImageIcon, Palette, X,
  Sparkles, ZoomIn
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

// ── Background presets ─────────────────────────────────────────────────────
const BG_PRESETS = [
  { id: "transparent", label: "Transparent", value: null, preview: "checkered" },
  { id: "white", label: "White", value: "#FFFFFF", preview: "#FFFFFF" },
  { id: "black", label: "Black", value: "#000000", preview: "#000000" },
  { id: "gray", label: "Gray", value: "#F3F4F6", preview: "#F3F4F6" },
  { id: "blue", label: "Blue", value: "#3B82F6", preview: "#3B82F6" },
  { id: "green", label: "Green", value: "#22C55E", preview: "#22C55E" },
  { id: "red", label: "Red", value: "#EF4444", preview: "#EF4444" },
  { id: "yellow", label: "Yellow", value: "#EAB308", preview: "#EAB308" },
  { id: "purple", label: "Purple", value: "#8B5CF6", preview: "#8B5CF6" },
  { id: "pink", label: "Pink", value: "#EC4899", preview: "#EC4899" },
  { id: "custom", label: "Custom", value: "custom", preview: "custom" },
]

type ProcessState = "idle" | "processing" | "done" | "error"

export default function BgRemover() {
  const [originalFile, setOriginalFile] = useState<File | null>(null)
  const [originalUrl, setOriginalUrl] = useState<string | null>(null)
  const [removedBlob, setRemovedBlob] = useState<Blob | null>(null)
  const [finalUrl, setFinalUrl] = useState<string | null>(null)
  const [state, setState] = useState<ProcessState>("idle")
  const [progress, setProgress] = useState(0)
  const [progressMsg, setProgressMsg] = useState("")
  const [selectedBg, setSelectedBg] = useState("transparent")
  const [customColor, setCustomColor] = useState("#FF6B6B")
  const [bgImageUrl, setBgImageUrl] = useState<string | null>(null)
  const [showOriginal, setShowOriginal] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const bgFileRef = useRef<HTMLInputElement>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return
    setOriginalFile(file)
    setOriginalUrl(URL.createObjectURL(file))
    setRemovedBlob(null)
    setFinalUrl(null)
    setState("idle")
    setProgress(0)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpg", ".jpeg", ".png", ".webp"] },
    multiple: false,
    maxSize: 10 * 1024 * 1024,
  })

  const removeBackground = async () => {
    if (!originalFile) return
    setState("processing")
    setProgress(0)

    try {
      setProgressMsg("Loading AI model...")
      setProgress(10)

      const { removeBackground: removeBg } = await import("@imgly/background-removal")

      setProgressMsg("Analyzing image...")
      setProgress(30)

      const blob = await removeBg(originalFile, {
        progress: (key: string, current: number, total: number) => {
          if (key === "compute:inference") {
            const pct = Math.round((current / total) * 60) + 30
            setProgress(Math.min(pct, 90))
            setProgressMsg("Removing background with AI...")
          }
        },
        output: { format: "image/png", quality: 1 },
      })

      setProgress(95)
      setProgressMsg("Finalizing...")
      setRemovedBlob(blob)

      // Apply background
      await applyBackground(blob, selectedBg, customColor, bgImageUrl)

      setProgress(100)
      setState("done")
      toast.success("Background removed successfully!")
    } catch (err: any) {
      console.error(err)
      setState("error")
      toast.error("Failed to remove background. Please try a different image.")
    }
  }

  const applyBackground = async (
    blob: Blob,
    bgId: string,
    color: string,
    bgImg: string | null
  ) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const img = new Image()
    img.src = URL.createObjectURL(blob)
    await new Promise(r => { img.onload = r })

    canvas.width = img.width
    canvas.height = img.height
    const ctx = canvas.getContext("2d")!
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const preset = BG_PRESETS.find(p => p.id === bgId)

    if (bgId === "transparent") {
      // Keep transparent
    } else if (bgImg && bgId === "image") {
      // Custom background image
      const bgImage = new Image()
      bgImage.src = bgImg
      await new Promise(r => { bgImage.onload = r })
      ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height)
    } else {
      // Solid color
      const fillColor = bgId === "custom" ? color : (preset?.value as string) || "#FFFFFF"
      ctx.fillStyle = fillColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    ctx.drawImage(img, 0, 0)

    const finalBlob = await new Promise<Blob>(resolve => {
      canvas.toBlob(b => resolve(b!), "image/png", 1)
    })

    const url = URL.createObjectURL(finalBlob)
    if (finalUrl) URL.revokeObjectURL(finalUrl)
    setFinalUrl(url)
  }

  const handleBgChange = async (bgId: string) => {
    setSelectedBg(bgId)
    if (removedBlob) {
      await applyBackground(removedBlob, bgId, customColor, bgImageUrl)
    }
  }

  const handleColorChange = async (color: string) => {
    setCustomColor(color)
    if (removedBlob && selectedBg === "custom") {
      await applyBackground(removedBlob, "custom", color, bgImageUrl)
    }
  }

  const handleBgImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setBgImageUrl(url)
    setSelectedBg("image")
    if (removedBlob) {
      await applyBackground(removedBlob, "image", customColor, url)
    }
  }

  const downloadImage = () => {
    if (!finalUrl) return
    const ext = selectedBg === "transparent" ? "png" : "png"
    const link = document.createElement("a")
    link.href = finalUrl
    link.download = `bg-removed-${originalFile?.name?.replace(/\.[^.]+$/, "") || "image"}.${ext}`
    link.click()
    toast.success("Image downloaded!")
  }

  const reset = () => {
    setOriginalFile(null)
    setOriginalUrl(null)
    setRemovedBlob(null)
    setFinalUrl(null)
    setState("idle")
    setProgress(0)
    setBgImageUrl(null)
    setSelectedBg("transparent")
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <canvas ref={canvasRef} className="hidden" />
      <input
        ref={bgFileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleBgImageUpload}
      />

      {/* Upload Zone */}
      {!originalFile ? (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-2xl p-14 text-center cursor-pointer transition-all",
            isDragActive ? "border-primary bg-primary/5 scale-[0.99]" : "border-border hover:border-primary/50 hover:bg-muted/30"
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Eraser className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">Upload Image to Remove Background</h3>
              <p className="text-muted-foreground text-sm">JPG, PNG, WebP — Max 10MB</p>
            </div>
            <Button size="lg" className="px-8 h-12 font-bold" type="button">
              <Upload className="mr-2 h-5 w-5" /> Choose Image
            </Button>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>Powered by AI — 100% browser-based, no upload to servers</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Image Preview Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Original */}
            <div className="space-y-2">
              <Label className="text-sm font-bold text-muted-foreground">Original</Label>
              <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-border bg-muted">
                {originalUrl && (
                  <img src={originalUrl} alt="Original" className="w-full h-full object-contain" />
                )}
              </div>
            </div>

            {/* Result */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-bold text-muted-foreground">Result</Label>
                {state === "done" && (
                  <button
                    onMouseEnter={() => setShowOriginal(true)}
                    onMouseLeave={() => setShowOriginal(false)}
                    className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
                  >
                    <ZoomIn className="h-3 w-3" /> Hold to compare
                  </button>
                )}
              </div>
              <div className={cn(
                "relative aspect-square rounded-2xl overflow-hidden border-2 border-border",
                selectedBg === "transparent" ? "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZTVlN2ViIi8+PHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNlNWU3ZWIiLz48cmVjdCB4PSIxMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZjlmYWZiIi8+PHJlY3QgeT0iMTAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iI2Y5ZmFmYiIvPjwvc3ZnPg==')] bg-repeat" : "bg-muted"
              )}>
                {state === "idle" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-sm text-muted-foreground">Result will appear here</p>
                  </div>
                )}
                {state === "processing" && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/80 backdrop-blur-sm">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    <div className="w-48 space-y-2">
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
                      </div>
                      <p className="text-xs text-center text-muted-foreground">{progressMsg} {progress}%</p>
                    </div>
                  </div>
                )}
                {(state === "done" || state === "error") && finalUrl && (
                  <img
                    src={showOriginal ? originalUrl! : finalUrl}
                    alt="Result"
                    className="w-full h-full object-contain transition-all duration-200"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Process Button */}
          {state === "idle" && (
            <Button
              onClick={removeBackground}
              className="w-full h-14 text-lg font-bold shadow-lg shadow-primary/25"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Remove Background with AI
            </Button>
          )}

          {state === "processing" && (
            <Button disabled className="w-full h-14 text-lg font-bold">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing... {progress}%
            </Button>
          )}

          {/* Background Selector - shown after processing */}
          {state === "done" && (
            <div className="space-y-4 animate-in fade-in duration-300">
              {/* Success */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-green-500/8 border border-green-500/20">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                <p className="text-sm font-semibold text-green-700 dark:text-green-400">
                  Background removed! Now choose a new background or download.
                </p>
              </div>

              {/* Background Options */}
              <Card>
                <CardContent className="p-5 space-y-4">
                  <Label className="font-bold flex items-center gap-2">
                    <Palette className="h-4 w-4 text-primary" />
                    Choose Background
                  </Label>

                  <div className="flex flex-wrap gap-2">
                    {BG_PRESETS.map(preset => (
                      <button
                        key={preset.id}
                        onClick={() => preset.id === "custom" ? null : handleBgChange(preset.id)}
                        className={cn(
                          "flex flex-col items-center gap-1.5 p-2 rounded-xl border-2 transition-all",
                          selectedBg === preset.id ? "border-primary" : "border-border hover:border-primary/40"
                        )}
                      >
                        {/* Color Preview */}
                        <div className={cn("w-10 h-10 rounded-lg overflow-hidden flex-shrink-0", selectedBg === preset.id && "ring-2 ring-primary ring-offset-1")}>
                          {preset.preview === "checkered" ? (
                            <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZTVlN2ViIi8+PHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNlNWU3ZWIiLz48cmVjdCB4PSIxMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZjlmYWZiIi8+PHJlY3QgeT0iMTAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iI2Y5ZmFmYiIvPjwvc3ZnPg==')] bg-repeat" />
                          ) : preset.preview === "custom" ? (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-400 to-purple-500">
                              <Palette className="h-4 w-4 text-white" />
                            </div>
                          ) : (
                            <div className="w-full h-full" style={{ backgroundColor: preset.preview }} />
                          )}
                        </div>
                        <span className="text-[10px] font-medium">{preset.label}</span>
                      </button>
                    ))}

                    {/* Upload BG Image */}
                    <button
                      onClick={() => bgFileRef.current?.click()}
                      className={cn(
                        "flex flex-col items-center gap-1.5 p-2 rounded-xl border-2 transition-all",
                        selectedBg === "image" ? "border-primary" : "border-border hover:border-primary/40"
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center bg-muted",
                        selectedBg === "image" && "ring-2 ring-primary ring-offset-1"
                      )}>
                        {bgImageUrl ? (
                          <img src={bgImageUrl} alt="BG" className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      <span className="text-[10px] font-medium">Image</span>
                    </button>
                  </div>

                  {/* Custom Color Picker */}
                  {selectedBg === "custom" && (
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border">
                      <Label className="text-sm font-semibold">Custom Color:</Label>
                      <input
                        type="color"
                        value={customColor}
                        onChange={e => handleColorChange(e.target.value)}
                        className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent"
                      />
                      <span className="text-sm font-mono text-muted-foreground">{customColor}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleBgChange("custom")}
                        className="ml-auto"
                      >
                        Apply
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Download + Reset */}
              <div className="flex gap-3">
                <Button
                  onClick={downloadImage}
                  className="flex-1 h-12 font-bold bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/25"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download PNG
                </Button>
                <Button
                  variant="outline"
                  onClick={reset}
                  className="h-12 px-5 font-semibold"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  New Image
                </Button>
              </div>
            </div>
          )}

          {/* Error */}
          {state === "error" && (
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-red-500/8 border border-red-500/20">
                <p className="text-sm text-red-700 dark:text-red-400">
                  Processing failed. Try a clearer image with good contrast between subject and background.
                </p>
              </div>
              <div className="flex gap-3">
                <Button onClick={removeBackground} className="flex-1 h-11 font-bold">
                  <RefreshCw className="mr-2 h-4 w-4" /> Try Again
                </Button>
                <Button variant="outline" onClick={reset} className="h-11 px-5">
                  <X className="mr-2 h-4 w-4" /> Change Image
                </Button>
              </div>
            </div>
          )}

          {/* Change image button */}
          {state === "idle" && (
            <Button variant="ghost" size="sm" onClick={reset} className="w-full text-muted-foreground">
              <X className="mr-2 h-4 w-4" /> Change Image
            </Button>
          )}
        </div>
      )}

      {/* Features */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: Sparkles, title: "AI Powered", desc: "State-of-the-art ML model" },
          { icon: Eraser, title: "100% Private", desc: "Runs in your browser" },
          { icon: Palette, title: "Custom BG", desc: "Colors, images & more" },
        ].map((f, i) => (
          <div key={i} className="p-4 rounded-xl bg-muted/40 border border-border/60 text-center">
            <f.icon className="h-5 w-5 text-primary mx-auto mb-2" />
            <p className="font-bold text-xs">{f.title}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
