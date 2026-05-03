"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import {
  Upload, Download, Trash2, Sparkles, ZoomIn,
  CheckCircle, RefreshCw, Palette, ArrowRightLeft
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

type Stage = "idle" | "uploading" | "scanning" | "processing" | "done" | "error"

const bgColors = [
  { label: 'Transparent', value: 'transparent', class: 'bg-transparent border-2 border-dashed border-border' },
  { label: 'White', value: '#ffffff', class: 'bg-white border border-border' },
  { label: 'Black', value: '#000000', class: 'bg-black' },
  { label: 'Gray', value: '#6b7280', class: 'bg-gray-500' },
  { label: 'Red', value: '#ef4444', class: 'bg-red-500' },
  { label: 'Blue', value: '#3b82f6', class: 'bg-blue-500' },
  { label: 'Green', value: '#22c55e', class: 'bg-green-500' },
  { label: 'Yellow', value: '#eab308', class: 'bg-yellow-500' },
  { label: 'Purple', value: '#a855f7', class: 'bg-purple-500' },
]

export default function BackgroundRemover() {
  const [stage, setStage] = useState<Stage>("idle")
  const [originalUrl, setOriginalUrl] = useState<string | null>(null)
  const [resultUrl, setResultUrl] = useState<string | null>(null)
  const [previewWithBg, setPreviewWithBg] = useState<string | null>(null)
  const [selectedBgColor, setSelectedBgColor] = useState<string>("transparent")
  const [progress, setProgress] = useState(0)
  const [scanLine, setScanLine] = useState(0)
  const [sliderPos, setSliderPos] = useState(50)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [customBgColor, setCustomBgColor] = useState("#ffffff")
  const [downloadFormat, setDownloadFormat] = useState<"png" | "webp">("png")

  const originalFileRef = useRef<File | null>(null)
  const isDragging = useRef(false)
  const scanIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    return () => {
      if (originalUrl) URL.revokeObjectURL(originalUrl)
      if (resultUrl) URL.revokeObjectURL(resultUrl)
      if (scanIntervalRef.current) clearInterval(scanIntervalRef.current)
    }
  }, [originalUrl, resultUrl])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    if (file.size > 20 * 1024 * 1024) {
      toast.error("File too large. Max 20MB allowed.")
      return
    }

    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"]
    if (!validTypes.includes(file.type)) {
      toast.error("Only JPG, PNG, WebP, AVIF supported.")
      return
    }

    originalFileRef.current = file
    setOriginalUrl(URL.createObjectURL(file))
    setResultUrl(null)
    setPreviewWithBg(null)
    setSelectedBgColor("transparent")
    setStage("uploading")
    toast.success("Image uploaded! Click Remove Background.")
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
      "image/avif": [".avif"],
    },
    multiple: false,
    maxSize: 20 * 1024 * 1024,
  })

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items
      if (!items) return

      for (const item of items) {
        if (item.type.indexOf("image") !== -1) {
          const file = item.getAsFile()
          if (file) {
            onDrop([file])
          }
        }
      }
    }

    window.addEventListener("paste", handlePaste)
    return () => window.removeEventListener("paste", handlePaste)
  }, [onDrop])

  const startScan = () => {
    setStage("scanning")
    setScanLine(0)

    let line = 0
    scanIntervalRef.current = setInterval(() => {
      line += 1.5
      setScanLine(line)
      if (line >= 100) {
        if (scanIntervalRef.current) clearInterval(scanIntervalRef.current)
        runAIProcessing()
      }
    }, 20)
  }

  const runAIProcessing = async () => {
    setStage("processing")
    setProgress(0)

    try {
      const { removeBackground } = await import("@imgly/background-removal")

      const config = {
        publicPath: "https://unpkg.com/@imgly/background-removal@1.4.5/dist/",
        model: "medium" as const,
        progress: (p: number) => {
          setProgress(Math.round(p * 100))
        },
      }

      const blob = await removeBackground(originalUrl!, config)
      const url = URL.createObjectURL(blob)
      setResultUrl(url)
      setStage("done")
      toast.success("Background removed! 🎉")
    } catch (err) {
      console.error(err)
      setErrorMsg("Processing failed. Please try a different image.")
      setStage("error")
      toast.error("Processing failed. Please try a different image.")
    }
  }

  const getStatusMessage = () => {
    if (progress < 20) return "Downloading AI model (first time only)..."
    if (progress < 40) return "Loading neural network..."
    if (progress < 60) return "Detecting subject & edges..."
    if (progress < 80) return "Removing background pixels..."
    if (progress < 100) return "Finalizing transparency..."
    return "Done! ✓"
  }

  const applyBackground = (bgColor: string) => {
    if (!resultUrl) return
    const img = new Image()
    img.src = resultUrl
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      const ctx = canvas.getContext('2d')!
      if (bgColor !== 'transparent') {
        ctx.fillStyle = bgColor
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
      ctx.drawImage(img, 0, 0)
      setPreviewWithBg(canvas.toDataURL('image/png'))
    }
  }

  const handleBgColorSelect = (color: string) => {
    setSelectedBgColor(color)
    applyBackground(color)
  }

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value
    setCustomBgColor(color)
    setSelectedBgColor(color)
    applyBackground(color)
  }

  const reset = () => {
    setStage("idle")
    setOriginalUrl(null)
    setResultUrl(null)
    setPreviewWithBg(null)
    setSelectedBgColor("transparent")
    setProgress(0)
    setScanLine(0)
    setSliderPos(50)
    setErrorMsg(null)
    originalFileRef.current = null
  }

  const processAgain = () => {
    startScan()
  }

  const download = () => {
    const url = selectedBgColor !== "transparent" ? previewWithBg : resultUrl
    if (!url) return

    const link = document.createElement("a")
    link.href = url
    const ext = downloadFormat === "png" ? "png" : "webp"
    link.download = `bg-removed-${Date.now()}.${ext}`
    link.click()
    toast.success("Downloaded! 🎉")
  }

  const downloadWithBg = () => {
    if (!previewWithBg) return
    const link = document.createElement("a")
    link.href = previewWithBg
    const ext = downloadFormat === "png" ? "png" : "webp"
    link.download = `bg-removed-with-bg-${Date.now()}.${ext}`
    link.click()
    toast.success("Downloaded! 🎉")
  }

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
    setSliderPos(Math.round((x / rect.width) * 100))
  }

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width))
    setSliderPos(Math.round((x / rect.width) * 100))
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* IDLE STAGE - UPLOAD */}
      {stage === "idle" && (
        <div className="space-y-5">
          <div
            {...getRootProps()}
            className={cn(
              "border-2 border-dashed rounded-2xl p-14 text-center cursor-pointer transition-all",
              isDragActive
                ? "border-primary bg-primary/5 scale-[0.99]"
                : "border-border hover:border-primary/50 hover:bg-muted/30"
            )}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Remove Background with AI</h3>
                <p className="text-muted-foreground text-sm">
                  JPG, PNG, WebP, AVIF — Max 20MB • Paste from clipboard supported
                </p>
              </div>
              <Button size="lg" className="px-8 h-12 font-bold">
                <Upload className="mr-2 h-5 w-5" /> Choose Image
              </Button>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                <span>Powered by AI — Professional quality, 100% browser processing</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* UPLOADING STAGE - IMAGE PREVIEW */}
      {stage === "uploading" && originalUrl && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center overflow-hidden">
                      <img src={originalUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">{originalFileRef.current?.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(originalFileRef.current?.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={reset}>
                    <Trash2 className="h-4 w-4 mr-2" /> Remove
                  </Button>
                </div>
                <Button
                  onClick={startScan}
                  className="w-full h-14 text-lg font-bold shadow-lg shadow-primary/25"
                >
                  <Sparkles className="mr-2 h-5 w-5" /> Remove Background
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* SCANNING STAGE */}
      {stage === "scanning" && originalUrl && (
        <div className="space-y-5">
          <Card>
            <CardContent className="p-6">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-muted">
                <img
                  src={originalUrl}
                  alt="Scanning"
                  className="w-full h-full object-contain transition-transform duration-800"
                  style={{ transform: "scale(1.15)" }}
                />

                <div className="absolute inset-0">
                  <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-xl" />
                  <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-xl" />
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-xl" />
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-xl" />
                </div>

                <div
                  className="absolute left-0 right-0 h-[2px] pointer-events-none"
                  style={{
                    top: `${scanLine}%`,
                    background: 'var(--primary)',
                    boxShadow: '0 0 12px 4px var(--primary), 0 0 30px 8px rgba(59, 130, 246, 0.3)',
                  }}
                />

                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
                  <p className="text-white font-bold text-lg mb-2">
                    Scanning image
                    <span className="inline-block w-2">
                      {scanLine < 33 ? "." : scanLine < 66 ? ".." : "..."}
                    </span>
                  </p>
                  <div className="w-48 h-2 rounded-full bg-white/20 overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${scanLine}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* PROCESSING STAGE */}
      {stage === "processing" && originalUrl && (
        <div className="space-y-5">
          <Card>
            <CardContent className="p-6">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-muted">
                <img
                  src={originalUrl}
                  alt="Processing"
                  className="w-full h-full object-contain blur-sm"
                />
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center">
                  <div className="relative">
                    <Sparkles className="h-16 w-16 text-primary animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-black text-lg">{progress}%</span>
                    </div>
                  </div>
                  <p className="text-white font-bold mt-4">{getStatusMessage()}</p>
                  <div className="w-64 h-2 rounded-full bg-white/20 overflow-hidden mt-3">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-cyan-400 rounded-full animate-pulse"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ERROR STAGE */}
      {stage === "error" && (
        <div className="space-y-5">
          <Card>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <Trash2 className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Something went wrong</h3>
              <p className="text-muted-foreground mb-6">{errorMsg}</p>
              <div className="flex gap-3 justify-center">
                <Button onClick={processAgain} variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4" /> Try Again
                </Button>
                <Button onClick={reset}>
                  <Upload className="mr-2 h-4 w-4" /> New Image
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* DONE STAGE - RESULTS */}
      {stage === "done" && originalUrl && resultUrl && (
        <div className="space-y-6">
          {/* BEFORE/AFTER SLIDER */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div
                  className="relative aspect-video rounded-xl overflow-hidden bg-muted cursor-ew-resize select-none"
                  onMouseDown={() => isDragging.current = true}
                  onMouseUp={() => isDragging.current = false}
                  onMouseLeave={() => isDragging.current = false}
                  onMouseMove={onMouseMove}
                  onTouchStart={() => isDragging.current = true}
                  onTouchEnd={() => isDragging.current = false}
                  onTouchMove={onTouchMove}
                >
                  {/* CHECKERBOARD BACKGROUND */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "linear-gradient(45deg, #e0e0e0 25%, transparent 25%), linear-gradient(-45deg, #e0e0e0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e0e0e0 75%), linear-gradient(-45deg, transparent 75%, #e0e0e0 75%)",
                      backgroundSize: "20px 20px",
                      backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
                    }}
                  />

                  {/* RESULT IMAGE (RIGHT SIDE) */}
                  <img
                    src={selectedBgColor !== "transparent" && previewWithBg ? previewWithBg : resultUrl}
                    alt="Result"
                    className="absolute inset-0 h-full w-full object-contain"
                  />

                  {/* ORIGINAL IMAGE (LEFT CLIPPED) */}
                  <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPos}%` }}>
                    <img
                      src={originalUrl}
                      alt="Original"
                      className="absolute inset-0 h-full object-contain"
                      style={{ width: `${10000 / sliderPos}%`, maxWidth: "none" }}
                    />
                  </div>

                  {/* SLIDER HANDLE */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
                    style={{ left: `${sliderPos}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-xl border-2 border-border flex items-center justify-center">
                      <ArrowRightLeft className="h-5 w-5 text-gray-700" />
                    </div>
                  </div>

                  {/* BADGES */}
                  <Badge className="absolute top-4 left-4 bg-black/70 text-white border-none">Original</Badge>
                  <Badge className="absolute top-4 right-4 bg-green-600 text-white border-none">
                    No Background ✓
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* BACKGROUND COLOR REPLACEMENT */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Palette className="h-5 w-5 text-primary" />
                Add Background Color (Optional)
              </h3>

              <div className="flex flex-wrap gap-3">
                {bgColors.map((bg) => (
                  <button
                    key={bg.value}
                    onClick={() => handleBgColorSelect(bg.value)}
                    className={cn(
                      "w-10 h-10 rounded-xl transition-all hover:scale-110",
                      bg.class,
                      selectedBgColor === bg.value && "ring-2 ring-primary ring-offset-2"
                    )}
                    title={bg.label}
                  />
                ))}

                <div className="relative">
                  <input
                    type="color"
                    value={customBgColor}
                    onChange={handleCustomColorChange}
                    className="w-10 h-10 rounded-xl cursor-pointer border-0 p-0 overflow-hidden"
                  />
                </div>
              </div>

              {selectedBgColor !== "transparent" && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleBgColorSelect("transparent")}
                >
                  <RefreshCw className="mr-2 h-4 w-4" /> Reset to Transparent
                </Button>
              )}
            </CardContent>
          </Card>

          {/* DOWNLOAD OPTIONS */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Format:</span>
                <div className="flex gap-2">
                  <Button
                    variant={downloadFormat === "png" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setDownloadFormat("png")}
                  >
                    PNG (Lossless)
                  </Button>
                  <Button
                    variant={downloadFormat === "webp" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setDownloadFormat("webp")}
                  >
                    WebP (Smaller)
                  </Button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={download}
                  className="flex-1 h-12 font-bold bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/25"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download PNG (Transparent)
                </Button>

                {selectedBgColor !== "transparent" && previewWithBg && (
                  <Button
                    onClick={downloadWithBg}
                    className="flex-1 h-12 font-bold"
                    variant="outline"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download with Background
                  </Button>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <Button variant="ghost" onClick={processAgain} className="flex-1">
                  <RefreshCw className="mr-2 h-4 w-4" /> Process Again
                </Button>
                <Button variant="ghost" onClick={reset} className="flex-1">
                  <Upload className="mr-2 h-4 w-4" /> Try Another Image
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
