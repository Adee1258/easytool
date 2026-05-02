"use client"

import { useState, useCallback, useRef } from "react"
import { useDropzone } from "react-dropzone"
import {
  Upload, Download, Eraser, Loader2, CheckCircle2,
  RefreshCw, Palette, X, Sparkles, ZoomIn, AlertCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

const BG_COLORS = [
  { id: "transparent", label: "None", value: null },
  { id: "white", label: "White", value: "#FFFFFF" },
  { id: "black", label: "Black", value: "#000000" },
  { id: "gray", label: "Gray", value: "#F3F4F6" },
  { id: "blue", label: "Blue", value: "#3B82F6" },
  { id: "green", label: "Green", value: "#22C55E" },
  { id: "red", label: "Red", value: "#EF4444" },
  { id: "yellow", label: "Yellow", value: "#EAB308" },
  { id: "purple", label: "Purple", value: "#8B5CF6" },
  { id: "pink", label: "Pink", value: "#EC4899" },
]

// Apply background color to a transparent PNG blob
async function applyBackground(
  pngBlob: Blob,
  color: string | null,
  bgImageUrl?: string | null
): Promise<string> {
  const url = URL.createObjectURL(pngBlob)
  const img = new Image()
  img.src = url
  await new Promise(r => { img.onload = r })

  const canvas = document.createElement("canvas")
  canvas.width = img.width
  canvas.height = img.height
  const ctx = canvas.getContext("2d")!

  if (bgImageUrl) {
    const bgImg = new Image()
    bgImg.src = bgImageUrl
    await new Promise(r => { bgImg.onload = r })
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height)
  } else if (color) {
    ctx.fillStyle = color
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  ctx.drawImage(img, 0, 0)
  URL.revokeObjectURL(url)
  return canvas.toDataURL("image/png")
}

export default function BgRemover() {
  const [originalFile, setOriginalFile] = useState<File | null>(null)
  const [originalUrl, setOriginalUrl] = useState<string | null>(null)
  const [removedBlob, setRemovedBlob] = useState<Blob | null>(null)
  const [finalUrl, setFinalUrl] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [progressMsg, setProgressMsg] = useState("")
  const [selectedBg, setSelectedBg] = useState("transparent")
  const [customColor, setCustomColor] = useState("#FF6B6B")
  const [bgImageUrl, setBgImageUrl] = useState<string | null>(null)
  const [showCompare, setShowCompare] = useState(false)
  const bgFileRef = useRef<HTMLInputElement>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return
    setOriginalFile(file)
    setOriginalUrl(URL.createObjectURL(file))
    setRemovedBlob(null)
    setFinalUrl(null)
    setProgress(0)
    toast.success("Photo uploaded! Click Remove Background.")
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpg", ".jpeg", ".png", ".webp"] },
    multiple: false,
    maxSize: 12 * 1024 * 1024,
  })

  const removeBackground = async () => {
    if (!originalFile) return
    setProcessing(true)
    setProgress(10)
    setProgressMsg("Uploading to AI...")

    try {
      // Use remove.bg API via our Next.js API route
      const formData = new FormData()
      formData.append("image_file", originalFile)
      formData.append("size", "auto")

      setProgress(30)
      setProgressMsg("AI removing background...")

      const response = await fetch("/api/remove-bg", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const err = await response.json().catch(() => ({}))
        throw new Error(err.message || "Background removal failed")
      }

      setProgress(80)
      setProgressMsg("Finalizing...")

      const blob = await response.blob()
      setRemovedBlob(blob)

      const url = await applyBackground(blob, null)
      setFinalUrl(url)
      setProgress(100)
      setProcessing(false)
      toast.success("Background removed! ✨")
    } catch (err: any) {
      setProcessing(false)
      setProgress(0)
      toast.error(err.message || "Failed. Please try again.")
    }
  }

  const handleBgChange = async (bgId: string) => {
    setSelectedBg(bgId)
    if (!removedBlob) return
    const preset = BG_COLORS.find(b => b.id === bgId)
    const color = bgId === "custom" ? customColor : (preset?.value ?? null)
    const url = await applyBackground(removedBlob, color, bgId === "image" ? bgImageUrl : null)
    setFinalUrl(url)
  }

  const handleColorChange = async (color: string) => {
    setCustomColor(color)
    if (!removedBlob) return
    const url = await applyBackground(removedBlob, color)
    setFinalUrl(url)
  }

  const handleBgImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !removedBlob) return
    const url = URL.createObjectURL(file)
    setBgImageUrl(url)
    setSelectedBg("image")
    const result = await applyBackground(removedBlob, null, url)
    setFinalUrl(result)
  }

  const download = () => {
    if (!finalUrl) return
    const link = document.createElement("a")
    link.href = finalUrl
    link.download = `bg-removed-${originalFile?.name?.replace(/\.[^.]+$/, "") || "image"}.png`
    link.click()
    toast.success("Downloaded!")
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <input ref={bgFileRef} type="file" accept="image/*" className="hidden" onChange={handleBgImage} />

      {!originalFile ? (
        <div className="space-y-5">
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
                <h3 className="text-xl font-bold mb-1">Remove Background with AI</h3>
                <p className="text-muted-foreground text-sm">JPG, PNG, WebP — Max 12MB</p>
              </div>
              <Button size="lg" className="px-8 h-12 font-bold btn-glow" type="button">
                <Upload className="mr-2 h-5 w-5" /> Choose Image
              </Button>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                <span>Powered by AI — Professional quality, instant results</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Before/After Preview */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Original</Label>
              <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-border bg-muted">
                {originalUrl && <img src={originalUrl} alt="Original" className="w-full h-full object-contain" />}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Result</Label>
                {finalUrl && (
                  <button
                    onMouseEnter={() => setShowCompare(true)}
                    onMouseLeave={() => setShowCompare(false)}
                    className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
                  >
                    <ZoomIn className="h-3 w-3" /> Compare
                  </button>
                )}
              </div>
              <div className={cn(
                "relative aspect-square rounded-2xl overflow-hidden border-2",
                finalUrl ? "border-primary/30" : "border-border",
                selectedBg === "transparent"
                  ? "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZTVlN2ViIi8+PHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNlNWU3ZWIiLz48cmVjdCB4PSIxMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZjlmYWZiIi8+PHJlY3QgeT0iMTAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iI2Y5ZmFmYiIvPjwvc3ZnPg==')] bg-repeat"
                  : "bg-muted"
              )}>
                {processing && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/80 backdrop-blur-sm z-10">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    <div className="w-48 space-y-1.5">
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                      </div>
                      <p className="text-xs text-center text-muted-foreground">{progressMsg}</p>
                    </div>
                  </div>
                )}
                {finalUrl && (
                  <img
                    src={showCompare ? originalUrl! : finalUrl}
                    alt="Result"
                    className="w-full h-full object-contain transition-all duration-200"
                  />
                )}
                {!finalUrl && !processing && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-xs text-muted-foreground">Click Remove Background</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Remove Button */}
          {!removedBlob && (
            <Button
              onClick={removeBackground}
              disabled={processing}
              className="w-full h-14 text-lg font-bold shadow-lg shadow-primary/25 btn-glow"
            >
              {processing ? (
                <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> {progressMsg} {progress}%</>
              ) : (
                <><Sparkles className="mr-2 h-5 w-5" /> Remove Background with AI</>
              )}
            </Button>
          )}

          {/* Background Selector */}
          {removedBlob && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-green-500/8 border border-green-500/20">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                <p className="text-sm font-semibold text-green-700 dark:text-green-400">
                  Background removed! Choose a new background or download.
                </p>
              </div>

              <Card>
                <CardContent className="p-5 space-y-4">
                  <Label className="font-bold text-sm flex items-center gap-2">
                    <Palette className="h-4 w-4 text-primary" /> Choose Background
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {BG_COLORS.map(bg => (
                      <button
                        key={bg.id}
                        onClick={() => handleBgChange(bg.id)}
                        className={cn(
                          "flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition-all",
                          selectedBg === bg.id ? "border-primary scale-105" : "border-border hover:border-primary/40"
                        )}
                      >
                        <div className={cn("w-9 h-9 rounded-lg overflow-hidden", selectedBg === bg.id && "ring-2 ring-primary ring-offset-1")}>
                          {bg.id === "transparent" ? (
                            <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZTVlN2ViIi8+PHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNlNWU3ZWIiLz48cmVjdCB4PSIxMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZjlmYWZiIi8+PHJlY3QgeT0iMTAiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgZmlsbD0iI2Y5ZmFmYiIvPjwvc3ZnPg==')] bg-repeat" />
                          ) : (
                            <div className="w-full h-full" style={{ backgroundColor: bg.value! }} />
                          )}
                        </div>
                        <span className="text-[10px] font-medium">{bg.label}</span>
                      </button>
                    ))}

                    {/* Custom Color */}
                    <button
                      onClick={() => handleBgChange("custom")}
                      className={cn("flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition-all",
                        selectedBg === "custom" ? "border-primary scale-105" : "border-border hover:border-primary/40")}
                    >
                      <div className="w-9 h-9 rounded-lg overflow-hidden">
                        <input type="color" value={customColor}
                          onChange={e => handleColorChange(e.target.value)}
                          className="w-12 h-12 -m-1.5 cursor-pointer border-0" />
                      </div>
                      <span className="text-[10px] font-medium">Custom</span>
                    </button>

                    {/* BG Image */}
                    <button
                      onClick={() => bgFileRef.current?.click()}
                      className={cn("flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition-all",
                        selectedBg === "image" ? "border-primary scale-105" : "border-border hover:border-primary/40")}
                    >
                      <div className="w-9 h-9 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                        {bgImageUrl ? <img src={bgImageUrl} className="w-full h-full object-cover" alt="" /> : <Palette className="h-4 w-4 text-muted-foreground" />}
                      </div>
                      <span className="text-[10px] font-medium">Image</span>
                    </button>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button onClick={download} className="flex-1 h-12 font-bold bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/25">
                  <Download className="mr-2 h-5 w-5" /> Download PNG
                </Button>
                <Button variant="outline" onClick={() => { setOriginalFile(null); setOriginalUrl(null); setRemovedBlob(null); setFinalUrl(null) }} className="h-12 px-5">
                  <RefreshCw className="mr-2 h-4 w-4" /> New
                </Button>
              </div>
            </div>
          )}

          {!removedBlob && !processing && (
            <Button variant="ghost" size="sm" onClick={() => { setOriginalFile(null); setOriginalUrl(null) }} className="w-full text-muted-foreground">
              <X className="mr-2 h-4 w-4" /> Change Image
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
