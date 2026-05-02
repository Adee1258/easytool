"use client"

import { useState, useRef, useEffect } from "react"
import { Download, Upload, Sparkles, Trash2, RefreshCw, Sun, Contrast, Droplets } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useDropzone } from "react-dropzone"
import { toast } from "sonner"

export default function ImageEnhancer() {
  const [image, setImage] = useState<string | null>(null)
  const [brightness, setBrightness] = useState(100)
  const [contrast, setContrast] = useState(100)
  const [saturation, setSaturation] = useState(100)
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

  const applyEnhancements = () => {
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

      // Apply filters
      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`
      ctx.drawImage(img, 0, 0)

      const link = document.createElement("a")
      link.href = canvas.toDataURL("image/png")
      link.download = "enhanced-image.png"
      link.click()
      
      setIsProcessing(false)
      toast.success("Image enhanced and downloaded!")
    }
  }

  const resetFilters = () => {
    setBrightness(100)
    setContrast(100)
    setSaturation(100)
    toast.info("Filters reset")
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
          <h3 className="text-2xl font-bold mb-2">Upload Image to Enhance</h3>
          <p className="text-muted-foreground max-w-xs mx-auto">
            Enhance your photos with brightness, contrast, and saturation controls.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 overflow-hidden border-2 shadow-xl">
            <div className="bg-muted p-4 flex justify-between items-center border-b">
              <span className="font-semibold flex items-center gap-2">
                <Sparkles className="h-4 w-4" /> Preview
              </span>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => setImage(null)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <CardContent className="p-8 flex items-center justify-center bg-black/5 min-h-[400px]">
              <img 
                src={image} 
                alt="Preview" 
                className="max-w-full max-h-[500px] shadow-2xl rounded-lg transition-all duration-200"
                style={{
                  filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`
                }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-8">
              <h4 className="font-bold flex items-center gap-2 text-lg">
                <Sparkles className="h-5 w-5 text-primary" /> Adjustments
              </h4>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="flex items-center gap-2">
                    <Sun className="h-4 w-4" /> Brightness
                  </Label>
                  <span className="font-bold text-sm">{brightness}%</span>
                </div>
                <Slider
                  value={[brightness]}
                  min={0}
                  max={200}
                  step={1}
                  onValueChange={(val) => setBrightness(val[0])}
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="flex items-center gap-2">
                    <Contrast className="h-4 w-4" /> Contrast
                  </Label>
                  <span className="font-bold text-sm">{contrast}%</span>
                </div>
                <Slider
                  value={[contrast]}
                  min={0}
                  max={200}
                  step={1}
                  onValueChange={(val) => setContrast(val[0])}
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="flex items-center gap-2">
                    <Droplets className="h-4 w-4" /> Saturation
                  </Label>
                  <span className="font-bold text-sm">{saturation}%</span>
                </div>
                <Slider
                  value={[saturation]}
                  min={0}
                  max={200}
                  step={1}
                  onValueChange={(val) => setSaturation(val[0])}
                />
              </div>

              <div className="flex flex-col gap-3 pt-4">
                <Button variant="outline" onClick={resetFilters} className="w-full">
                  Reset Filters
                </Button>
                <Button onClick={applyEnhancements} disabled={isProcessing} className="w-full h-12 gap-2 bg-primary hover:bg-primary/90 shadow-lg">
                  {isProcessing ? <RefreshCw className="h-5 w-5 animate-spin" /> : <Download className="h-5 w-5" />}
                  Download Enhanced
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}
