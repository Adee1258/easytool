"use client"

import { useState, useRef } from "react"
import { Download, Upload, Image as ImageIcon, Trash2, RotateCw, RotateCcw, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { useDropzone } from "react-dropzone"
import { toast } from "sonner"

export default function ImageRotator() {
  const [image, setImage] = useState<string | null>(null)
  const [rotation, setRotation] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImage(e.target?.result as string)
        setRotation(0)
      }
      reader.readAsDataURL(file)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false
  })

  const rotate = (deg: number) => {
    setRotation((prev) => (prev + deg) % 360)
  }

  const downloadImage = () => {
    if (!image) return
    setIsProcessing(true)

    const img = new Image()
    img.src = image
    img.onload = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Handle rotation dimensions
      if (rotation % 180 === 0) {
        canvas.width = img.width
        canvas.height = img.height
      } else {
        canvas.width = img.height
        canvas.height = img.width
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.translate(canvas.width / 2, canvas.height / 2)
      ctx.rotate((rotation * Math.PI) / 180)
      ctx.drawImage(img, -img.width / 2, -img.height / 2)

      const link = document.createElement("a")
      link.href = canvas.toDataURL("image/png")
      link.download = `rotated-image-${rotation}deg.png`
      link.click()
      setIsProcessing(false)
      toast.success("Image downloaded successfully!")
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
            Upload an image to rotate it 90°, 180°, or 270°.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          <Card className="overflow-hidden border-2 shadow-xl">
            <div className="bg-muted p-4 flex justify-between items-center border-b">
              <span className="font-semibold flex items-center gap-2">
                <ImageIcon className="h-4 w-4" /> Preview
              </span>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => setImage(null)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <CardContent className="p-8 flex items-center justify-center bg-black/5 min-h-[400px]">
              <div 
                className="transition-transform duration-300 ease-in-out shadow-2xl rounded-lg overflow-hidden"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                <img src={image} alt="Preview" className="max-w-full max-h-[500px]" />
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" size="lg" onClick={() => rotate(-90)} className="gap-2 h-14 px-8">
              <RotateCcw className="h-5 w-5" /> Rotate Left
            </Button>
            <Button variant="outline" size="lg" onClick={() => rotate(90)} className="gap-2 h-14 px-8">
              <RotateCw className="h-5 w-5" /> Rotate Right
            </Button>
            <Button size="lg" onClick={downloadImage} disabled={isProcessing} className="gap-2 h-14 px-8 ">
              {isProcessing ? <RefreshCw className="h-5 w-5 animate-spin" /> : <Download className="h-5 w-5" />}
              Download Rotated Image
            </Button>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}
