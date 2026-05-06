"use client"

import { useState, useRef } from "react"
import { Download, Upload, Image as ImageIcon, Trash2, Stamp, RefreshCw, Type } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useDropzone } from "react-dropzone"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

export default function ImageWatermark() {
  const [image, setImage] = useState<string | null>(null)
  const [watermarkText, setWatermarkText] = useState("EasyToolify")
  const [opacity, setOpacity] = useState(0.5)
  const [fontSize, setFontSize] = useState(48)
  const [position, setPosition] = useState("bottom-right")
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

  const applyWatermark = () => {
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

      // Set watermark style
      ctx.font = `${fontSize}px sans-serif`
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
      ctx.shadowColor = "rgba(0, 0, 0, 0.5)"
      ctx.shadowBlur = 4

      const textMetrics = ctx.measureText(watermarkText)
      const textWidth = textMetrics.width
      const textHeight = fontSize

      let x = 0, y = 0
      const margin = 20

      switch (position) {
        case "top-left":
          x = margin
          y = margin + textHeight
          break
        case "top-right":
          x = canvas.width - textWidth - margin
          y = margin + textHeight
          break
        case "bottom-left":
          x = margin
          y = canvas.height - margin
          break
        case "bottom-right":
          x = canvas.width - textWidth - margin
          y = canvas.height - margin
          break
        case "center":
          x = (canvas.width / 2) - (textWidth / 2)
          y = (canvas.height / 2) + (textHeight / 2)
          break
      }

      ctx.fillText(watermarkText, x, y)

      const link = document.createElement("a")
      link.href = canvas.toDataURL("image/png")
      link.download = `watermarked-image.png`
      link.click()
      
      setIsProcessing(false)
      toast.success("Watermark applied and image downloaded!")
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
            Upload an image to add a custom text watermark.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 overflow-hidden border-2 shadow-xl">
            <div className="bg-muted p-4 flex justify-between items-center border-b">
              <span className="font-semibold flex items-center gap-2">
                <ImageIcon className="h-4 w-4" /> Preview
              </span>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => setImage(null)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <CardContent className="p-8 flex items-center justify-center bg-black/5 min-h-[400px]">
              <div className="relative shadow-2xl rounded-lg overflow-hidden">
                <img src={image} alt="Preview" className="max-w-full max-h-[500px]" />
                <div 
                  className="absolute pointer-events-none select-none text-white drop-shadow-lg transition-all"
                  style={{
                    opacity: opacity,
                    fontSize: `${fontSize / 4}px`, // Scaled for preview
                    ...(() => {
                      switch (position) {
                        case "top-left": return { top: "5%", left: "5%" }
                        case "top-right": return { top: "5%", right: "5%" }
                        case "bottom-left": return { bottom: "5%", left: "5%" }
                        case "bottom-right": return { bottom: "5%", right: "5%" }
                        case "center": return { top: "50%", left: "50%", transform: "translate(-50%, -50%)" }
                        default: return {}
                      }
                    })()
                  }}
                >
                  {watermarkText}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-6">
              <h4 className="font-bold flex items-center gap-2">
                <Stamp className="h-5 w-5" /> Watermark Settings
              </h4>
              
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-xs">
                  <Type className="h-3 w-3" /> Watermark Text
                </Label>
                <Input
                  value={watermarkText}
                  onChange={(e) => setWatermarkText(e.target.value)}
                  placeholder="Enter text..."
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <Label>Opacity</Label>
                  <span className="font-bold">{(opacity * 100).toFixed(0)}%</span>
                </div>
                <Slider
                  value={[opacity]}
                  min={0.1}
                  max={1}
                  step={0.1}
                  onValueChange={(val) => setOpacity(val[0])}
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <Label>Font Size</Label>
                  <span className="font-bold">{fontSize}px</span>
                </div>
                <Slider
                  value={[fontSize]}
                  min={12}
                  max={200}
                  step={4}
                  onValueChange={(val) => setFontSize(val[0])}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Position</Label>
                <Select value={position} onValueChange={setPosition}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="top-left">Top Left</SelectItem>
                    <SelectItem value="top-right">Top Right</SelectItem>
                    <SelectItem value="bottom-left">Bottom Left</SelectItem>
                    <SelectItem value="bottom-right">Bottom Right</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={applyWatermark} disabled={isProcessing} className="w-full gap-2 h-12 ">
                {isProcessing ? <RefreshCw className="h-5 w-5 animate-spin" /> : <Download className="h-5 w-5" />}
                Download Watermarked
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}
