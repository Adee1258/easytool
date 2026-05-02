"use client"

import { useState, useCallback, useRef } from "react"
import { useDropzone } from "react-dropzone"
import { Camera, Upload, Download, CheckCircle2, Info, ZoomIn, ZoomOut, RotateCw, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

const PHOTO_SIZES = [
  // Pakistan
  { id: "pk-passport", country: "🇵🇰 Pakistan", label: "Passport (35×45mm)", w: 413, h: 531, dpi: 300, flag: "🇵🇰" },
  { id: "pk-id", country: "🇵🇰 Pakistan", label: "CNIC / ID Card (25×35mm)", w: 295, h: 413, dpi: 300, flag: "🇵🇰" },
  { id: "pk-visa", country: "🇵🇰 Pakistan", label: "Visa Photo (35×45mm)", w: 413, h: 531, dpi: 300, flag: "🇵🇰" },
  // USA
  { id: "us-passport", country: "🇺🇸 USA", label: "Passport (2×2 inch)", w: 600, h: 600, dpi: 300, flag: "🇺🇸" },
  { id: "us-visa", country: "🇺🇸 USA", label: "Visa Photo (2×2 inch)", w: 600, h: 600, dpi: 300, flag: "🇺🇸" },
  { id: "us-dl", country: "🇺🇸 USA", label: "Driver License", w: 600, h: 600, dpi: 300, flag: "🇺🇸" },
  // UK
  { id: "uk-passport", country: "🇬🇧 UK", label: "Passport (35×45mm)", w: 413, h: 531, dpi: 300, flag: "🇬🇧" },
  { id: "uk-visa", country: "🇬🇧 UK", label: "Visa Photo (35×45mm)", w: 413, h: 531, dpi: 300, flag: "🇬🇧" },
  // UAE
  { id: "ae-passport", country: "🇦🇪 UAE", label: "Passport (40×60mm)", w: 472, h: 708, dpi: 300, flag: "🇦🇪" },
  { id: "ae-visa", country: "🇦🇪 UAE", label: "Visa Photo (35×45mm)", w: 413, h: 531, dpi: 300, flag: "🇦🇪" },
  // Saudi Arabia
  { id: "sa-passport", country: "🇸🇦 Saudi Arabia", label: "Passport (40×60mm)", w: 472, h: 708, dpi: 300, flag: "🇸🇦" },
  { id: "sa-visa", country: "🇸🇦 Saudi Arabia", label: "Iqama / Visa (40×60mm)", w: 472, h: 708, dpi: 300, flag: "🇸🇦" },
  // India
  { id: "in-passport", country: "🇮🇳 India", label: "Passport (35×45mm)", w: 413, h: 531, dpi: 300, flag: "🇮🇳" },
  { id: "in-visa", country: "🇮🇳 India", label: "Visa Photo (35×45mm)", w: 413, h: 531, dpi: 300, flag: "🇮🇳" },
  // Canada
  { id: "ca-passport", country: "🇨🇦 Canada", label: "Passport (50×70mm)", w: 590, h: 826, dpi: 300, flag: "🇨🇦" },
  // Australia
  { id: "au-passport", country: "🇦🇺 Australia", label: "Passport (35×45mm)", w: 413, h: 531, dpi: 300, flag: "🇦🇺" },
  // Schengen / Europe
  { id: "eu-schengen", country: "🇪🇺 Schengen/EU", label: "Visa Photo (35×45mm)", w: 413, h: 531, dpi: 300, flag: "🇪🇺" },
  { id: "de-passport", country: "🇩🇪 Germany", label: "Passport (35×45mm)", w: 413, h: 531, dpi: 300, flag: "🇩🇪" },
  // China
  { id: "cn-passport", country: "🇨🇳 China", label: "Passport (33×48mm)", w: 390, h: 567, dpi: 300, flag: "🇨🇳" },
  { id: "cn-visa", country: "🇨🇳 China", label: "Visa Photo (33×48mm)", w: 390, h: 567, dpi: 300, flag: "🇨🇳" },
  // Bangladesh
  { id: "bd-passport", country: "🇧🇩 Bangladesh", label: "Passport (35×45mm)", w: 413, h: 531, dpi: 300, flag: "🇧🇩" },
  // Turkey
  { id: "tr-passport", country: "🇹🇷 Turkey", label: "Passport (50×60mm)", w: 590, h: 708, dpi: 300, flag: "🇹🇷" },
]

// Group by country
const grouped = PHOTO_SIZES.reduce((acc, s) => {
  if (!acc[s.country]) acc[s.country] = []
  acc[s.country].push(s)
  return acc
}, {} as Record<string, typeof PHOTO_SIZES>)

export default function PassportPhotoMaker() {
  const [image, setImage] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState("pk-passport")
  const [result, setResult] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)
  const [zoom, setZoom] = useState(1)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const selectedSize = PHOTO_SIZES.find(s => s.id === selectedId)!

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setImage(url)
    setResult(null)
    setZoom(1)
    toast.success("Photo uploaded! Now select size and create.")
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpg", ".jpeg", ".png", ".webp"] },
    multiple: false,
  })

  const processPhoto = () => {
    if (!image || !canvasRef.current) return
    setProcessing(true)

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")!
    canvas.width = selectedSize.w
    canvas.height = selectedSize.h

    const img = new Image()
    img.onload = () => {
      // White background
      ctx.fillStyle = "#FFFFFF"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Center-crop with zoom
      const scale = Math.max(canvas.width / img.width, canvas.height / img.height) * zoom
      const scaledW = img.width * scale
      const scaledH = img.height * scale
      const offsetX = (canvas.width - scaledW) / 2
      const offsetY = (canvas.height - scaledH) / 2

      ctx.drawImage(img, offsetX, offsetY, scaledW, scaledH)

      const dataUrl = canvas.toDataURL("image/jpeg", 0.95)
      setResult(dataUrl)
      setProcessing(false)
      toast.success(`${selectedSize.label} photo ready!`)
    }
    img.src = image
  }

  const downloadPhoto = () => {
    if (!result) return
    const link = document.createElement("a")
    link.href = result
    link.download = `passport-photo-${selectedId}-easytool.jpg`
    link.click()
    toast.success("Photo downloaded!")
  }

  const reset = () => {
    setImage(null)
    setResult(null)
    setZoom(1)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <canvas ref={canvasRef} className="hidden" />

      {/* Size Selector - Always visible */}
      <div className="space-y-3">
        <Label className="text-base font-bold flex items-center gap-2">
          <Camera className="h-4 w-4 text-primary" />
          Select Country & Photo Size
        </Label>
        <select
          value={selectedId}
          onChange={e => { setSelectedId(e.target.value); setResult(null) }}
          className="w-full h-12 px-4 rounded-xl border-2 border-border bg-card text-foreground font-medium text-sm outline-none focus:border-primary transition-colors cursor-pointer"
          style={{ colorScheme: 'auto' }}
        >
          {Object.entries(grouped).map(([country, sizes]) => (
            <optgroup key={country} label={country} className="font-bold bg-card text-foreground">
              {sizes.map(s => (
                <option key={s.id} value={s.id} className="bg-card text-foreground py-2">
                  {s.label} ({s.w}×{s.h}px @ {s.dpi}DPI)
                </option>
              ))}
            </optgroup>
          ))}
        </select>

        {/* Selected size info */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/8 border border-primary/20">
          <span className="text-2xl">{selectedSize.flag}</span>
          <div>
            <p className="font-bold text-sm">{selectedSize.country} — {selectedSize.label}</p>
            <p className="text-xs text-muted-foreground">{selectedSize.w}×{selectedSize.h} pixels at {selectedSize.dpi} DPI</p>
          </div>
        </div>
      </div>

      {/* Upload or Result */}
      {!image ? (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all",
            isDragActive
              ? "border-primary bg-primary/5 scale-[0.99]"
              : "border-border hover:border-primary/50 hover:bg-muted/30"
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center">
              <Camera className="h-8 w-8 text-blue-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">Upload Your Photo</h3>
              <p className="text-muted-foreground text-sm">JPG, PNG or WebP — face clearly visible</p>
            </div>
            <Button size="lg" className="px-8 h-12 font-bold" type="button">
              <Upload className="mr-2 h-5 w-5" />
              Choose Photo
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left - Original + Controls */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="font-bold">Original Photo</Label>
              <Button variant="ghost" size="sm" onClick={reset} className="text-destructive hover:bg-destructive/10 h-8 text-xs">
                <Trash2 className="h-3.5 w-3.5 mr-1" /> Remove
              </Button>
            </div>

            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border-2 border-border bg-muted">
              <img src={image} alt="Original" className="w-full h-full object-cover" />
            </div>

            {/* Zoom Control */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold flex items-center gap-2">
                <ZoomIn className="h-4 w-4" /> Zoom: {Math.round(zoom * 100)}%
              </Label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 flex-shrink-0"
                  onClick={() => setZoom(z => Math.max(0.5, z - 0.1))}
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <input
                  type="range"
                  min={50}
                  max={200}
                  value={Math.round(zoom * 100)}
                  onChange={e => setZoom(Number(e.target.value) / 100)}
                  className="flex-1 accent-violet-600"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 flex-shrink-0"
                  onClick={() => setZoom(z => Math.min(2, z + 0.1))}
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Create Button */}
            <Button
              onClick={processPhoto}
              className="w-full h-12 font-bold text-base bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25"
              disabled={processing}
            >
              {processing ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Create {selectedSize.label}
                </span>
              )}
            </Button>
          </div>

          {/* Right - Result */}
          <div className="space-y-4">
            <Label className="font-bold">
              {result ? "✅ Ready to Download" : "Preview will appear here"}
            </Label>

            <div className={cn(
              "relative rounded-2xl overflow-hidden border-2 bg-muted flex items-center justify-center",
              result ? "border-green-500/40" : "border-dashed border-border",
              selectedSize.w > selectedSize.h ? "aspect-video" : "aspect-[3/4]"
            )}>
              {result ? (
                <img
                  src={result}
                  alt="Passport photo"
                  className="w-full h-full object-contain bg-white"
                />
              ) : (
                <div className="text-center p-8 space-y-2">
                  <Camera className="h-12 w-12 text-muted-foreground/30 mx-auto" />
                  <p className="text-sm text-muted-foreground">Click "Create" to generate your photo</p>
                </div>
              )}
            </div>

            {result && (
              <div className="space-y-3">
                {/* Size info */}
                <div className="p-3 rounded-xl bg-green-500/8 border border-green-500/20 flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-green-700 dark:text-green-400">Photo Ready!</p>
                    <p className="text-xs text-green-600 dark:text-green-500">
                      {selectedSize.w}×{selectedSize.h}px · {selectedSize.dpi} DPI · JPEG
                    </p>
                  </div>
                </div>

                {/* Download Button - Very prominent */}
                <Button
                  onClick={downloadPhoto}
                  className="w-full h-14 font-black text-lg bg-green-600 hover:bg-green-700 text-white shadow-xl shadow-green-600/30 rounded-xl"
                >
                  <Download className="mr-3 h-6 w-6" />
                  Download Photo
                </Button>

                {/* Recreate */}
                <Button
                  variant="outline"
                  onClick={processPhoto}
                  className="w-full h-10 font-semibold text-sm"
                >
                  <RotateCw className="mr-2 h-4 w-4" />
                  Recreate with New Zoom
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Requirements */}
      <Card className="bg-blue-500/5 border-blue-500/20">
        <CardContent className="p-5">
          <h4 className="font-bold text-sm mb-3 flex items-center gap-2 text-blue-700 dark:text-blue-400">
            <Info className="h-4 w-4" />
            Photo Requirements for Best Results
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: "✅", text: "Plain white/light background" },
              { icon: "✅", text: "Face clearly visible, looking straight" },
              { icon: "❌", text: "No glasses or hat" },
              { icon: "✅", text: "Neutral expression, mouth closed" },
            ].map((req, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                <span className="text-base leading-none mt-0.5">{req.icon}</span>
                <span>{req.text}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
