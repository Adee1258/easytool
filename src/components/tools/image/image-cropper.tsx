"use client"

import { useState, useRef, useEffect } from "react"
import { Download, Upload, Crop, Trash2, RefreshCw, Maximize } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useDropzone } from "react-dropzone"
import { toast } from "sonner"

export default function ImageCropper() {
  const [image, setImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [crop, setCrop] = useState({ x: 10, y: 10, width: 80, height: 80 }) // percentages
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [dragType, setDragType] = useState<"move" | "resize" | null>(null)
  
  const containerRef = useRef<HTMLDivElement>(null)
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

  const handleMouseDown = (e: React.MouseEvent, type: "move" | "resize") => {
    setIsDragging(true)
    setDragType(type)
    setDragStart({ x: e.clientX, y: e.clientY })
    e.stopPropagation()
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const dx = ((e.clientX - dragStart.x) / rect.width) * 100
    const dy = ((e.clientY - dragStart.y) / rect.height) * 100

    if (dragType === "move") {
      setCrop(prev => ({
        ...prev,
        x: Math.max(0, Math.min(100 - prev.width, prev.x + dx)),
        y: Math.max(0, Math.min(100 - prev.height, prev.y + dy))
      }))
    } else if (dragType === "resize") {
      setCrop(prev => ({
        ...prev,
        width: Math.max(10, Math.min(100 - prev.x, prev.width + dx)),
        height: Math.max(10, Math.min(100 - prev.y, prev.height + dy))
      }))
    }

    setDragStart({ x: e.clientX, y: e.clientY })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setDragType(null)
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging])

  const performCrop = () => {
    if (!image) return
    setIsProcessing(true)

    const img = new Image()
    img.src = image
    img.onload = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const sourceX = (crop.x / 100) * img.width
      const sourceY = (crop.y / 100) * img.height
      const sourceWidth = (crop.width / 100) * img.width
      const sourceHeight = (crop.height / 100) * img.height

      canvas.width = sourceWidth
      canvas.height = sourceHeight

      ctx.drawImage(
        img,
        sourceX, sourceY, sourceWidth, sourceHeight,
        0, 0, sourceWidth, sourceHeight
      )

      const link = document.createElement("a")
      link.href = canvas.toDataURL("image/png")
      link.download = "cropped-image.png"
      link.click()
      
      setIsProcessing(false)
      toast.success("Image cropped successfully!")
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
          <h3 className="text-2xl font-bold mb-2">Upload Image to Crop</h3>
          <p className="text-muted-foreground max-w-xs mx-auto">
            Drag & drop an image here, or click to select.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          <Card className="overflow-hidden border-2 shadow-xl">
            <div className="bg-muted p-4 flex justify-between items-center border-b">
              <span className="font-semibold flex items-center gap-2">
                <Crop className="h-4 w-4" /> Drag to adjust crop area
              </span>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => setImage(null)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <CardContent className="p-0 flex items-center justify-center bg-black/10 min-h-[400px]">
              <div 
                ref={containerRef}
                className="relative inline-block max-w-full"
              >
                <img src={image} alt="Crop Source" className="max-w-full max-h-[600px] select-none" />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 pointer-events-none" />
                
                {/* Crop Area */}
                <div 
                  className="absolute border-2 border-white shadow-[0_0_0_9999px_rgba(0,0,0,0.5)] cursor-move"
                  style={{
                    left: `${crop.x}%`,
                    top: `${crop.y}%`,
                    width: `${crop.width}%`,
                    height: `${crop.height}%`
                  }}
                  onMouseDown={(e) => handleMouseDown(e, "move")}
                >
                  {/* Grid Lines */}
                  <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-30 pointer-events-none">
                    <div className="border-r border-b border-white" />
                    <div className="border-r border-b border-white" />
                    <div className="border-b border-white" />
                    <div className="border-r border-b border-white" />
                    <div className="border-r border-b border-white" />
                    <div className="border-b border-white" />
                    <div className="border-r border-white" />
                    <div className="border-r border-white" />
                    <div />
                  </div>
                  
                  {/* Resize Handle */}
                  <div 
                    className="absolute bottom-0 right-0 w-6 h-6 bg-white cursor-nwse-resize flex items-center justify-center shadow-lg"
                    onMouseDown={(e) => handleMouseDown(e, "resize")}
                  >
                    <Maximize className="h-3 w-3 text-black" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center gap-4">
            <Button size="lg" onClick={performCrop} disabled={isProcessing} className="gap-2 h-14 px-12  shadow-xl">
              {isProcessing ? <RefreshCw className="h-5 w-5 animate-spin" /> : <Download className="h-5 w-5" />}
              Crop & Download
            </Button>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t">
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
          <h4 className="font-bold mb-2">Smart UI</h4>
          <p className="text-sm text-muted-foreground">Easily drag to move and resize the crop area with real-time feedback.</p>
        </div>
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
          <h4 className="font-bold mb-2">Private & Fast</h4>
          <p className="text-sm text-muted-foreground">All cropping happens in your browser using high-performance canvas technology.</p>
        </div>
      </div>
    </div>
  )
}
