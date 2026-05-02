"use client"

import { useState, useCallback, useRef } from "react"
import { useDropzone } from "react-dropzone"
import { Camera, Upload, Download, Crop, Info, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

const PHOTO_SIZES = [
  { id: "passport-pk", label: "Pakistan Passport (35×45mm)", w: 413, h: 531 },
  { id: "passport-us", label: "US Passport (2×2 inch)", w: 600, h: 600 },
  { id: "passport-uk", label: "UK Passport (35×45mm)", w: 413, h: 531 },
  { id: "visa-schengen", label: "Schengen Visa (35×45mm)", w: 413, h: 531 },
  { id: "id-card", label: "ID Card (25×35mm)", w: 295, h: 413 },
  { id: "driving", label: "Driving License (35×45mm)", w: 413, h: 531 },
]

export default function PassportPhotoMaker() {
  const [image, setImage] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState("passport-pk")
  const [processing, setProcessing] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setImage(url)
    setResult(null)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpg", ".jpeg", ".png", ".webp"] },
    multiple: false,
  })

  const processPhoto = () => {
    if (!image || !canvasRef.current) return
    setProcessing(true)

    const size = PHOTO_SIZES.find(s => s.id === selectedSize)!
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")!

    canvas.width = size.w
    canvas.height = size.h

    const img = new Image()
    img.onload = () => {
      // White background
      ctx.fillStyle = "#FFFFFF"
      ctx.fillRect(0, 0, size.w, size.h)

      // Center-crop the image to fill the canvas
      const scale = Math.max(size.w / img.width, size.h / img.height)
      const scaledW = img.width * scale
      const scaledH = img.height * scale
      const offsetX = (size.w - scaledW) / 2
      const offsetY = (size.h - scaledH) / 2

      ctx.drawImage(img, offsetX, offsetY, scaledW, scaledH)

      const dataUrl = canvas.toDataURL("image/jpeg", 0.95)
      setResult(dataUrl)
      setProcessing(false)
      toast.success("Passport photo ready!")
    }
    img.src = image
  }

  const downloadPhoto = () => {
    if (!result) return
    const link = document.createElement("a")
    link.href = result
    link.download = `passport-photo-${selectedSize}.jpg`
    link.click()
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <canvas ref={canvasRef} className="hidden" />

      {!image ? (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-3xl p-16 text-center cursor-pointer transition-all",
            isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/20 hover:border-primary/50 hover:bg-muted/50"
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-5">
            <div className="p-5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600">
              <Camera className="h-12 w-12" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Upload Your Photo</h3>
              <p className="text-muted-foreground">JPG, PNG or WebP — face clearly visible, plain background preferred</p>
            </div>
            <Button size="lg" className="px-8">
              <Upload className="mr-2 h-5 w-5" /> Select Photo
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden border-2 border-primary/10 bg-muted">
              <img src={image} alt="Original" className="w-full h-full object-cover" />
            </div>
            <Button variant="outline" className="w-full" onClick={() => { setImage(null); setResult(null) }}>
              Change Photo
            </Button>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-base font-bold">Photo Size / Country</Label>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PHOTO_SIZES.map(s => (
                    <SelectItem key={s.id} value={s.id}>{s.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button onClick={processPhoto} className="w-full h-14 text-lg font-bold" disabled={processing}>
              <Crop className="mr-2 h-5 w-5" />
              {processing ? "Processing..." : "Create Passport Photo"}
            </Button>

            {result && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden border-2 border-green-500/30 bg-white">
                  <img src={result} alt="Passport photo" className="w-full h-full object-cover" />
                </div>
                <Button onClick={downloadPhoto} className="w-full h-12 font-bold bg-green-600 hover:bg-green-700">
                  <Download className="mr-2 h-5 w-5" /> Download Photo
                </Button>
              </div>
            )}

            <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-4 space-y-2">
                <h4 className="font-bold text-sm text-blue-800 dark:text-blue-300 flex items-center gap-2">
                  <Info className="h-4 w-4" /> Photo Requirements
                </h4>
                {[
                  "Plain white or light grey background",
                  "Face clearly visible, looking straight",
                  "No glasses, no hat",
                  "Neutral expression",
                ].map((req, i) => (
                  <p key={i} className="text-xs text-blue-700 dark:text-blue-400 flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3 flex-shrink-0" /> {req}
                  </p>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
