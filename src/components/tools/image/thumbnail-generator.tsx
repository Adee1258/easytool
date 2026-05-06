"use client"

import { useState, useRef } from "react"
import { Download, Upload, Image as ImageIcon, Trash2, Layout, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { useDropzone } from "react-dropzone"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

const PRESETS = [
  { id: "yt-thumb", name: "YouTube Thumbnail", width: 1280, height: 720 },
  { id: "ig-post", name: "Instagram Post", width: 1080, height: 1080 },
  { id: "ig-story", name: "Instagram Story", width: 1080, height: 1920 },
  { id: "fb-cover", name: "Facebook Cover", width: 851, height: 315 },
  { id: "tw-header", name: "Twitter Header", width: 1500, height: 500 },
]

export default function ThumbnailGenerator() {
  const [image, setImage] = useState<string | null>(null)
  const [selectedPreset, setSelectedPreset] = useState(PRESETS[0].id)
  const [isProcessing, setIsProcessing] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false
  })

  const generateThumbnail = () => {
    if (!image) return
    setIsProcessing(true)

    const preset = PRESETS.find(p => p.id === selectedPreset)!
    const img = new Image()
    img.src = image
    img.onload = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      canvas.width = preset.width
      canvas.height = preset.height

      // Fill background
      ctx.fillStyle = "white"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Calculate aspect ratio and positioning (cover)
      const scale = Math.max(canvas.width / img.width, canvas.height / img.height)
      const x = (canvas.width / 2) - (img.width / 2) * scale
      const y = (canvas.height / 2) - (img.height / 2) * scale

      ctx.drawImage(img, x, y, img.width * scale, img.height * scale)

      const link = document.createElement("a")
      link.href = canvas.toDataURL("image/png")
      link.download = `${preset.name.toLowerCase().replace(/\s+/g, '-')}.png`
      link.click()
      
      setIsProcessing(false)
      toast.success(`${preset.name} generated!`)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {!image ? (
        <div
          {...getRootProps()}
          className={`border-4 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-all duration-300 ${
            isDragActive ? "border-primary bg-primary/5 scale-[0.99]" : "border-muted-foreground/20 hover:border-primary/50 hover:bg-muted/30"
          }`}
        >
          <input {...getInputProps()} />
          <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Upload className="h-10 w-10 text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Upload Image</h3>
          <p className="text-muted-foreground max-w-xs mx-auto">
            Upload an image to generate social media thumbnails.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          <Card className="overflow-hidden border-2 shadow-xl">
            <div className="bg-muted p-4 flex justify-between items-center border-b">
              <span className="font-semibold flex items-center gap-2">
                <ImageIcon className="h-4 w-4" /> Original Image
              </span>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => setImage(null)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <CardContent className="p-8 flex items-center justify-center bg-black/5 min-h-[300px]">
              <img src={image} alt="Original" className="max-w-full max-h-[400px] shadow-lg rounded-lg" />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Layout className="h-4 w-4" /> Select Platform / Size
              </Label>
              <Select value={selectedPreset} onValueChange={setSelectedPreset}>
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PRESETS.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name} ({p.width}x{p.height})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button size="lg" onClick={generateThumbnail} disabled={isProcessing} className="h-12 gap-2 ">
              {isProcessing ? <RefreshCw className="h-5 w-5 animate-spin" /> : <Download className="h-5 w-5" />}
              Generate & Download
            </Button>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t">
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
          <h4 className="font-bold mb-2">Perfect Dimensions</h4>
          <p className="text-sm text-muted-foreground">Pre-configured sizes for YouTube, Instagram, Facebook, and Twitter to ensure your content looks great.</p>
        </div>
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
          <h4 className="font-bold mb-2">Smart Resizing</h4>
          <p className="text-sm text-muted-foreground">Uses high-quality resizing and smart cropping to fit your image into the selected template.</p>
        </div>
      </div>
    </div>
  )
}
