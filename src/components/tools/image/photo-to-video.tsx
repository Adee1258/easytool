"use client"

import { useState, useCallback, useRef } from "react"
import { useDropzone } from "react-dropzone"
import {
  Upload, Download, Play, Pause, Film, Sparkles,
  Plus, X, Move, ChevronUp, ChevronDown, Loader2,
  Music, Zap, Image as ImageIcon, Settings
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

// ── Animation Effects ──────────────────────────────────────────────────────
const EFFECTS = [
  { id: "zoom-in", label: "Zoom In", desc: "Slowly zoom into center" },
  { id: "zoom-out", label: "Zoom Out", desc: "Pull back from center" },
  { id: "pan-right", label: "Pan Right", desc: "Slide left to right" },
  { id: "pan-left", label: "Pan Left", desc: "Slide right to left" },
  { id: "pan-up", label: "Pan Up", desc: "Slide bottom to top" },
  { id: "ken-burns", label: "Ken Burns", desc: "Zoom + pan combined" },
  { id: "fade", label: "Fade", desc: "Simple fade in/out" },
  { id: "static", label: "Static", desc: "No movement" },
]

const TRANSITIONS = [
  { id: "fade", label: "Fade" },
  { id: "slide", label: "Slide" },
  { id: "zoom", label: "Zoom" },
  { id: "none", label: "Cut" },
]

const ASPECT_RATIOS = [
  { id: "9:16", label: "9:16", desc: "TikTok/Reels", w: 1080, h: 1920 },
  { id: "1:1", label: "1:1", desc: "Instagram", w: 1080, h: 1080 },
  { id: "16:9", label: "16:9", desc: "YouTube/Wide", w: 1920, h: 1080 },
  { id: "4:5", label: "4:5", desc: "Portrait Feed", w: 1080, h: 1350 },
]

interface PhotoItem {
  id: string
  file: File
  url: string
  effect: string
  duration: number // seconds
}

// ── Canvas Video Renderer ──────────────────────────────────────────────────
async function renderVideo(
  photos: PhotoItem[],
  aspectRatio: typeof ASPECT_RATIOS[0],
  transition: string,
  fps: number,
  onProgress: (p: number) => void
): Promise<Blob> {
  const { w, h } = aspectRatio
  const canvas = document.createElement("canvas")
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext("2d")!

  // Setup MediaRecorder
  const stream = canvas.captureStream(fps)
  const chunks: BlobPart[] = []

  const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
    ? "video/webm;codecs=vp9"
    : MediaRecorder.isTypeSupported("video/webm")
      ? "video/webm"
      : "video/webm"

  const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 8000000 })
  recorder.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data) }

  // Load all images
  const images = await Promise.all(photos.map(p => new Promise<HTMLImageElement>(resolve => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.src = p.url
  })))

  recorder.start(100)

  const totalFrames = photos.reduce((sum, p) => sum + p.duration * fps, 0)
  let renderedFrames = 0
  const transitionFrames = Math.round(fps * 0.5) // 0.5s transition

  for (let photoIdx = 0; photoIdx < photos.length; photoIdx++) {
    const photo = photos[photoIdx]
    const img = images[photoIdx]
    const nextImg = images[photoIdx + 1]
    const totalPhotoFrames = Math.round(photo.duration * fps)

    for (let frame = 0; frame < totalPhotoFrames; frame++) {
      const progress = frame / totalPhotoFrames // 0 to 1
      const isTransition = nextImg && frame >= totalPhotoFrames - transitionFrames
      const transProgress = isTransition
        ? (frame - (totalPhotoFrames - transitionFrames)) / transitionFrames
        : 0

      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = "#000"
      ctx.fillRect(0, 0, w, h)

      // Draw current photo with effect
      drawPhotoWithEffect(ctx, img, w, h, photo.effect, progress)

      // Draw transition overlay
      if (isTransition && nextImg) {
        ctx.save()
        if (transition === "fade") {
          ctx.globalAlpha = transProgress
          drawPhotoWithEffect(ctx, nextImg, w, h, photos[photoIdx + 1]?.effect || "static", 0)
        } else if (transition === "slide") {
          ctx.globalAlpha = 1
          const offsetX = w * (1 - transProgress)
          ctx.translate(offsetX, 0)
          drawPhotoWithEffect(ctx, nextImg, w, h, "static", 0)
        } else if (transition === "zoom") {
          ctx.globalAlpha = transProgress
          const scale = 0.8 + transProgress * 0.2
          ctx.translate(w / 2, h / 2)
          ctx.scale(scale, scale)
          ctx.translate(-w / 2, -h / 2)
          drawPhotoWithEffect(ctx, nextImg, w, h, "static", 0)
        }
        ctx.restore()
      }

      renderedFrames++
      if (renderedFrames % 10 === 0) {
        onProgress(Math.round((renderedFrames / totalFrames) * 100))
        await new Promise(r => setTimeout(r, 0)) // yield to browser
      }
    }
  }

  recorder.stop()
  await new Promise(r => { recorder.onstop = r })

  return new Blob(chunks, { type: mimeType })
}

function drawPhotoWithEffect(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  w: number,
  h: number,
  effect: string,
  progress: number
) {
  // Cover fit
  const scale = Math.max(w / img.width, h / img.height)
  const sw = img.width * scale
  const sh = img.height * scale

  let x = (w - sw) / 2
  let y = (h - sh) / 2
  let drawScale = 1

  switch (effect) {
    case "zoom-in":
      drawScale = 1 + progress * 0.15
      break
    case "zoom-out":
      drawScale = 1.15 - progress * 0.15
      break
    case "pan-right":
      x = (w - sw) / 2 + (sw - w) * 0.1 * progress
      break
    case "pan-left":
      x = (w - sw) / 2 - (sw - w) * 0.1 * progress
      break
    case "pan-up":
      y = (h - sh) / 2 + (sh - h) * 0.1 * progress
      break
    case "ken-burns":
      drawScale = 1 + progress * 0.12
      x = (w - sw) / 2 + (sw - w) * 0.05 * progress
      break
    case "fade":
      ctx.globalAlpha = progress < 0.1 ? progress * 10 : progress > 0.9 ? (1 - progress) * 10 : 1
      break
  }

  ctx.save()
  if (drawScale !== 1) {
    ctx.translate(w / 2, h / 2)
    ctx.scale(drawScale, drawScale)
    ctx.translate(-w / 2, -h / 2)
  }
  ctx.drawImage(img, x, y, sw, sh)
  ctx.restore()
  ctx.globalAlpha = 1
}

// ── Component ──────────────────────────────────────────────────────────────
export default function PhotoToVideo() {
  const [photos, setPhotos] = useState<PhotoItem[]>([])
  const [aspectRatio, setAspectRatio] = useState(ASPECT_RATIOS[0])
  const [transition, setTransition] = useState("fade")
  const [fps] = useState(30)
  const [rendering, setRendering] = useState(false)
  const [renderProgress, setRenderProgress] = useState(0)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [previewPhoto, setPreviewPhoto] = useState<PhotoItem | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newPhotos: PhotoItem[] = acceptedFiles.map(file => ({
      id: Math.random().toString(36).slice(2),
      file,
      url: URL.createObjectURL(file),
      effect: "ken-burns",
      duration: 3,
    }))
    setPhotos(prev => [...prev, ...newPhotos])
    if (newPhotos.length > 0) setPreviewPhoto(newPhotos[0])
    toast.success(`${acceptedFiles.length} photo${acceptedFiles.length > 1 ? "s" : ""} added!`)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpg", ".jpeg", ".png", ".webp"] },
    multiple: true,
    maxSize: 20 * 1024 * 1024,
  })

  const removePhoto = (id: string) => {
    setPhotos(prev => prev.filter(p => p.id !== id))
  }

  const movePhoto = (id: string, dir: "up" | "down") => {
    setPhotos(prev => {
      const idx = prev.findIndex(p => p.id === id)
      if (dir === "up" && idx === 0) return prev
      if (dir === "down" && idx === prev.length - 1) return prev
      const arr = [...prev]
      const swap = dir === "up" ? idx - 1 : idx + 1
        ;[arr[idx], arr[swap]] = [arr[swap], arr[idx]]
      return arr
    })
  }

  const updatePhoto = (id: string, key: keyof PhotoItem, value: any) => {
    setPhotos(prev => prev.map(p => p.id === id ? { ...p, [key]: value } : p))
  }

  const handleRender = async () => {
    if (photos.length === 0) return
    setRendering(true)
    setRenderProgress(0)
    setVideoUrl(null)

    try {
      toast.info("Rendering video... this may take a minute.")
      const blob = await renderVideo(photos, aspectRatio, transition, fps, setRenderProgress)
      const url = URL.createObjectURL(blob)
      setVideoUrl(url)
      toast.success("Video ready! Click Download to save.")
    } catch (err: any) {
      toast.error("Rendering failed. Try fewer photos or shorter duration.")
      console.error(err)
    } finally {
      setRendering(false)
    }
  }

  const totalDuration = photos.reduce((s, p) => s + p.duration, 0)

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-pink-500/10 to-violet-500/10 border border-pink-500/20">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-violet-500 flex items-center justify-center flex-shrink-0">
          <Film className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="font-black text-sm">Photo to Video Maker</p>
          <p className="text-xs text-muted-foreground">Create TikTok/Reels videos from photos with AI animations</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5 text-xs font-bold text-pink-600 bg-pink-500/10 px-3 py-1.5 rounded-full">
          <Zap className="h-3 w-3" /> Trending
        </div>
      </div>

      {/* Upload */}
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all",
          isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/30"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Plus className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="font-bold">Add Photos</p>
            <p className="text-sm text-muted-foreground">JPG, PNG, WebP — Multiple files supported</p>
          </div>
          <Button size="sm" className="px-6 font-bold" type="button">
            <Upload className="mr-2 h-4 w-4" /> Choose Photos
          </Button>
        </div>
      </div>

      {photos.length > 0 && (
        <div className="space-y-5">
          {/* Settings Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Aspect Ratio */}
            <div className="space-y-2">
              <Label className="font-bold text-sm">Aspect Ratio</Label>
              <div className="grid grid-cols-4 gap-2">
                {ASPECT_RATIOS.map(ar => (
                  <button
                    key={ar.id}
                    onClick={() => setAspectRatio(ar)}
                    className={cn(
                      "p-2 rounded-xl border-2 text-center transition-all",
                      aspectRatio.id === ar.id ? "border-primary bg-primary/10" : "border-border hover:border-primary/40"
                    )}
                  >
                    <p className="font-black text-xs">{ar.label}</p>
                    <p className="text-[10px] text-muted-foreground">{ar.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Transition */}
            <div className="space-y-2">
              <Label className="font-bold text-sm">Transition Effect</Label>
              <div className="grid grid-cols-4 gap-2">
                {TRANSITIONS.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setTransition(t.id)}
                    className={cn(
                      "p-2 rounded-xl border-2 text-center transition-all",
                      transition === t.id ? "border-primary bg-primary/10" : "border-border hover:border-primary/40"
                    )}
                  >
                    <p className="font-bold text-xs">{t.label}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Photo List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="font-bold text-sm">{photos.length} Photos · {totalDuration}s total</Label>
            </div>

            <div className="space-y-2">
              {photos.map((photo, idx) => (
                <Card key={photo.id} className={cn(
                  "border transition-all",
                  previewPhoto?.id === photo.id ? "border-primary/40 bg-primary/3" : "border-border"
                )}>
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      {/* Thumbnail */}
                      <div
                        className="w-14 h-14 rounded-xl overflow-hidden bg-muted flex-shrink-0 cursor-pointer border-2 border-transparent hover:border-primary/40"
                        onClick={() => setPreviewPhoto(photo)}
                      >
                        <img src={photo.url} alt="" className="w-full h-full object-cover" />
                      </div>

                      {/* Controls */}
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-muted-foreground">#{idx + 1}</span>

                          {/* Effect selector */}
                          <select
                            value={photo.effect}
                            onChange={e => updatePhoto(photo.id, "effect", e.target.value)}
                            className="text-xs border border-border rounded-lg px-2 py-1 bg-card text-foreground outline-none focus:border-primary"
                          >
                            {EFFECTS.map(e => (
                              <option key={e.id} value={e.id}>{e.label}</option>
                            ))}
                          </select>

                          {/* Duration */}
                          <div className="flex items-center gap-1.5 text-xs">
                            <span className="text-muted-foreground">Duration:</span>
                            <span className="font-bold">{photo.duration}s</span>
                          </div>
                        </div>

                        {/* Duration Slider */}
                        <Slider
                          value={[photo.duration]}
                          min={1}
                          max={10}
                          step={0.5}
                          onValueChange={v => updatePhoto(photo.id, "duration", v[0])}
                          className="w-full"
                        />
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-1 flex-shrink-0">
                        <button onClick={() => movePhoto(photo.id, "up")} disabled={idx === 0} className="p-1 rounded hover:bg-muted disabled:opacity-30">
                          <ChevronUp className="h-3.5 w-3.5" />
                        </button>
                        <button onClick={() => movePhoto(photo.id, "down")} disabled={idx === photos.length - 1} className="p-1 rounded hover:bg-muted disabled:opacity-30">
                          <ChevronDown className="h-3.5 w-3.5" />
                        </button>
                        <button onClick={() => removePhoto(photo.id)} className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/30 text-destructive">
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Render Button */}
          {!videoUrl ? (
            <div className="space-y-3">
              <Button
                onClick={handleRender}
                disabled={rendering || photos.length === 0}
                className="w-full h-14 text-lg font-bold bg-gradient-to-r from-pink-600 to-violet-600 hover:from-pink-700 hover:to-violet-700 shadow-xl"
              >
                {rendering ? (
                  <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Rendering... {renderProgress}%</>
                ) : (
                  <><Film className="mr-2 h-5 w-5" /> Create Video ({totalDuration}s)</>
                )}
              </Button>

              {rendering && (
                <div className="space-y-1.5">
                  <div className="h-3 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-pink-500 to-violet-500 transition-all duration-300"
                      style={{ width: `${renderProgress}%` }}
                    />
                  </div>
                  <p className="text-xs text-center text-muted-foreground">
                    {renderProgress < 20 ? "Loading images..." :
                      renderProgress < 80 ? "Rendering frames..." :
                        "Encoding video..."}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-green-500/8 border border-green-500/20">
                <Sparkles className="h-5 w-5 text-green-600 flex-shrink-0" />
                <p className="text-sm font-bold text-green-700 dark:text-green-400">
                  Video ready! {aspectRatio.label} · {totalDuration}s · {aspectRatio.desc}
                </p>
              </div>

              {/* Video Preview */}
              <video
                src={videoUrl}
                controls
                loop
                className="w-full rounded-2xl border border-border max-h-96 bg-black"
              />

              <div className="flex gap-3">
                <a
                  href={videoUrl}
                  download={`photo-video-${Date.now()}.webm`}
                  className="flex-1"
                >
                  <Button className="w-full h-12 font-bold bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/25">
                    <Download className="mr-2 h-5 w-5" />
                    Download Video (WebM)
                  </Button>
                </a>
                <Button
                  variant="outline"
                  onClick={() => { setVideoUrl(null); setRenderProgress(0) }}
                  className="h-12 px-5 font-semibold"
                >
                  Re-render
                </Button>
              </div>

              <p className="text-xs text-center text-muted-foreground">
                💡 WebM format works on all modern browsers. Convert to MP4 using HandBrake (free) for TikTok/Instagram upload.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Features */}
      {photos.length === 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: Film, title: "TikTok Ready", desc: "9:16 vertical format" },
            { icon: Sparkles, title: "8 Animations", desc: "Ken Burns, Zoom, Pan" },
            { icon: Zap, title: "Fast Render", desc: "Browser-based, no upload" },
            { icon: ImageIcon, title: "Multi Photo", desc: "Add unlimited photos" },
          ].map((f, i) => (
            <div key={i} className="p-4 rounded-xl bg-muted/40 border border-border/60 text-center">
              <f.icon className="h-5 w-5 text-primary mx-auto mb-2" />
              <p className="font-bold text-xs">{f.title}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{f.desc}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
