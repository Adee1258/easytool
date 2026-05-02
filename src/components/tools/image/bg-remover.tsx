"use client"

import { useState, useRef, useEffect } from "react"
import { Download, Upload, Eraser, Trash2, RefreshCw, Pipette, Sliders } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useDropzone } from "react-dropzone"
import { toast } from "sonner"

export default function BackgroundRemover() {
  const [image, setImage] = useState<string | null>(null)
  const [tolerance, setTolerance] = useState(30)
  const [targetColor, setTargetColor] = useState({ r: 255, g: 255, b: 255 }) // Default white
  const [isProcessing, setIsProcessing] = useState(false)
  const [isPickingColor, setIsPickingColor] = useState(false)
  
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)

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

  useEffect(() => {
    if (image) {
      updatePreview()
    }
  }, [image, targetColor, tolerance])

  const updatePreview = () => {
    const img = new Image()
    img.src = image!
    img.onload = () => {
      const canvas = previewCanvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Scale down for preview if needed
      const maxDim = 800
      let width = img.width
      let height = img.height
      if (width > maxDim || height > maxDim) {
        const ratio = Math.min(maxDim / width, maxDim / height)
        width *= ratio
        height *= ratio
      }

      canvas.width = width
      canvas.height = height
      ctx.drawImage(img, 0, 0, width, height)

      const imageData = ctx.getImageData(0, 0, width, height)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]

        const diff = Math.sqrt(
          Math.pow(r - targetColor.r, 2) +
          Math.pow(g - targetColor.g, 2) +
          Math.pow(b - targetColor.b, 2)
        )

        if (diff < tolerance) {
          data[i + 3] = 0 // Transparent
        }
      }

      ctx.putImageData(imageData, 0, 0)
    }
  }

  const pickColor = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isPickingColor) return
    const canvas = previewCanvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    // Get actual pixel color from original image hidden canvas
    const img = new Image()
    img.src = image!
    img.onload = () => {
      const tempCanvas = document.createElement("canvas")
      tempCanvas.width = img.width
      tempCanvas.height = img.height
      const tempCtx = tempCanvas.getContext("2d")!
      tempCtx.drawImage(img, 0, 0)
      
      const scaleX = img.width / canvas.width
      const scaleY = img.height / canvas.height
      const pixel = tempCtx.getImageData(x * scaleX, y * scaleY, 1, 1).data
      
      setTargetColor({ r: pixel[0], g: pixel[1], b: pixel[2] })
      setIsPickingColor(false)
      toast.success("Background color selected!")
    }
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

      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        const diff = Math.sqrt(
          Math.pow(data[i] - targetColor.r, 2) +
          Math.pow(data[i+1] - targetColor.g, 2) +
          Math.pow(data[i+2] - targetColor.b, 2)
        )

        if (diff < tolerance) {
          data[i + 3] = 0
        }
      }

      ctx.putImageData(imageData, 0, 0)

      const link = document.createElement("a")
      link.href = canvas.toDataURL("image/png")
      link.download = "no-background.png"
      link.click()
      
      setIsProcessing(false)
      toast.success("Image saved with transparency!")
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
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
            Remove solid backgrounds from your images instantly.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 overflow-hidden border-2 shadow-xl">
            <div className="bg-muted p-4 flex justify-between items-center border-b">
              <span className="font-semibold flex items-center gap-2">
                <Eraser className="h-4 w-4" /> 
                {isPickingColor ? "Click on the background color" : "Preview (Transparent background)"}
              </span>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => setImage(null)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <CardContent className="p-8 flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/checkerboard.png')] min-h-[400px]">
              <canvas 
                ref={previewCanvasRef} 
                onClick={pickColor}
                className={`max-w-full h-auto shadow-2xl rounded-lg cursor-${isPickingColor ? 'crosshair' : 'default'}`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-8">
              <h4 className="font-bold flex items-center gap-2 text-lg">
                <Sliders className="h-5 w-5 text-primary" /> Removal Tools
              </h4>

              <div className="space-y-4">
                <Label className="text-sm">Target Color</Label>
                <div className="flex gap-4 items-center">
                  <div 
                    className="w-12 h-12 rounded-lg border-2 shadow-inner" 
                    style={{ backgroundColor: `rgb(${targetColor.r}, ${targetColor.g}, ${targetColor.b})` }}
                  />
                  <Button 
                    variant={isPickingColor ? "default" : "outline"}
                    className="flex-1 gap-2"
                    onClick={() => setIsPickingColor(!isPickingColor)}
                  >
                    <Pipette className="h-4 w-4" /> 
                    {isPickingColor ? "Cancel" : "Pick Color"}
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Tolerance</Label>
                  <span className="font-bold text-sm">{tolerance}</span>
                </div>
                <Slider
                  value={[tolerance]}
                  min={1}
                  max={150}
                  step={1}
                  onValueChange={(val) => setTolerance(val[0])}
                />
                <p className="text-[10px] text-muted-foreground italic">Increase if background remains, decrease if parts of subject are removed.</p>
              </div>

              <Button onClick={downloadImage} disabled={isProcessing} className="w-full h-14 gap-2 bg-primary hover:bg-primary/90 shadow-xl">
                {isProcessing ? <RefreshCw className="h-5 w-5 animate-spin" /> : <Download className="h-5 w-5" />}
                Download Transparent PNG
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}
