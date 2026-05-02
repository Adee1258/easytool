"use client"

import { useState, useRef } from "react"
import { Download, Upload, Image as ImageIcon, Trash2, Palette, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { useDropzone } from "react-dropzone"
import { toast } from "sonner"

export default function GrayscaleConverter() {
  const [image, setImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImage(e.target?.result as string)
        setProcessedImage(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false
  })

  const convertToGrayscale = () => {
    if (!image) return
    setIsProcessing(true)

    const img = new Image()
    img.src = image
    img.onload = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3
        data[i] = avg     // Red
        data[i + 1] = avg // Green
        data[i + 2] = avg // Blue
      }

      ctx.putImageData(imageData, 0, 0)
      setProcessedImage(canvas.toDataURL("image/png"))
      setIsProcessing(false)
      toast.success("Image converted to grayscale!")
    }
  }

  const downloadImage = () => {
    if (!processedImage) return
    const link = document.createElement("a")
    link.href = processedImage
    link.download = "grayscale-image.png"
    link.click()
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
            Drag & drop your image here, or click to select a file. Support JPG, PNG, WebP.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="overflow-hidden border-2">
            <div className="bg-muted p-3 flex justify-between items-center border-b">
              <span className="text-sm font-semibold flex items-center gap-2">
                <ImageIcon className="h-4 w-4" /> Original
              </span>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => setImage(null)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <CardContent className="p-4 flex items-center justify-center bg-black/5 min-h-[300px]">
              <img src={image} alt="Original" className="max-w-full max-h-[400px] shadow-lg rounded-lg" />
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-2 border-primary/20">
            <div className="bg-primary/5 p-3 flex justify-between items-center border-b">
              <span className="text-sm font-semibold flex items-center gap-2">
                <Palette className="h-4 w-4 text-primary" /> Grayscale
              </span>
              {processedImage && (
                <Button variant="ghost" size="icon" className="h-8 w-8 text-primary" onClick={downloadImage}>
                  <Download className="h-4 w-4" />
                </Button>
              )}
            </div>
            <CardContent className="p-4 flex items-center justify-center bg-black/5 min-h-[300px]">
              {processedImage ? (
                <img src={processedImage} alt="Grayscale" className="max-w-full max-h-[400px] shadow-lg rounded-lg" />
              ) : (
                <div className="text-center space-y-4">
                  <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Palette className="h-8 w-8 text-primary/40" />
                  </div>
                  <Button onClick={convertToGrayscale} disabled={isProcessing} className="gap-2">
                    {isProcessing ? <RefreshCw className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                    Convert to Grayscale
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />

      {processedImage && (
        <div className="flex justify-center gap-4">
          <Button variant="outline" size="lg" onClick={() => { setImage(null); setProcessedImage(null); }} className="gap-2">
            <RefreshCw className="h-5 w-5" /> Start Over
          </Button>
          <Button size="lg" onClick={downloadImage} className="gap-2 bg-primary hover:bg-primary/90">
            <Download className="h-5 w-5" /> Download Result
          </Button>
        </div>
      )}
    </div>
  )
}
