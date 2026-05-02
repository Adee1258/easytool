"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, Maximize, Download, Loader2, Settings, Trash2, Crop } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export default function ImageResizer() {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [width, setWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true)
  const [originalRatio, setOriginalRatio] = useState<number>(1)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0]
    if (selectedFile) {
      setFile(selectedFile)
      const url = URL.createObjectURL(selectedFile)
      setPreviewUrl(url)
      
      const img = new Image()
      img.onload = () => {
        setWidth(img.width)
        setHeight(img.height)
        setOriginalRatio(img.width / img.height)
      }
      img.src = url
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false
  })

  const handleWidthChange = (val: number) => {
    setWidth(val)
    if (maintainAspectRatio) {
      setHeight(Math.round(val / originalRatio))
    }
  }

  const handleHeightChange = (val: number) => {
    setHeight(val)
    if (maintainAspectRatio) {
      setWidth(Math.round(val * originalRatio))
    }
  }

  const resizeImage = async () => {
    if (!file || !previewUrl) return
    setLoading(true)
    
    try {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      const img = new Image()
      
      await new Promise((resolve, reject) => {
        img.onload = resolve
        img.onerror = reject
        img.src = previewUrl
      })
      
      canvas.width = width
      canvas.height = height
      ctx?.drawImage(img, 0, 0, width, height)
      
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          const link = document.createElement("a")
          link.href = url
          link.download = `resized-${file.name}`
          link.click()
          toast.success("Image resized successfully!")
        }
        setLoading(false)
      }, file.type)
    } catch (error) {
      toast.error("Failed to resize image.")
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {!file ? (
        <div 
          {...getRootProps()} 
          className={cn(
            "border-2 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-all h-64 flex flex-col items-center justify-center space-y-4",
            isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/20 hover:border-primary/50 hover:bg-muted/50"
          )}
        >
          <input {...getInputProps()} />
          <div className="p-4 rounded-full bg-primary/10 text-primary">
            <Upload className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Upload Image to Resize</h3>
            <p className="text-muted-foreground">Drag and drop or click to select (JPG, PNG, WebP)</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold flex items-center gap-2">
                    <Settings className="h-4 w-4" /> Dimensions
                  </h3>
                  <Button variant="ghost" size="sm" onClick={() => { setFile(null); setPreviewUrl(null); }} className="text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" /> Remove
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Width (px)</Label>
                    <Input 
                      type="number" 
                      value={width} 
                      onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Height (px)</Label>
                    <Input 
                      type="number" 
                      value={height} 
                      onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="aspect-ratio" 
                    checked={maintainAspectRatio}
                    onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label htmlFor="aspect-ratio" className="cursor-pointer">Maintain aspect ratio</Label>
                </div>

                <Button className="w-full h-12" onClick={resizeImage} disabled={loading}>
                  {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Maximize className="mr-2 h-5 w-5" />}
                  Resize and Download
                </Button>
              </CardContent>
            </Card>

            <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 space-y-2">
              <h4 className="text-sm font-semibold flex items-center gap-2">
                <Crop className="h-4 w-4" /> Original Size:
              </h4>
              <p className="text-sm text-muted-foreground">
                {file.name} ({(file.size / 1024).toFixed(1)} KB)
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="aspect-square relative rounded-2xl overflow-hidden border bg-muted flex items-center justify-center">
              {previewUrl && (
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="object-contain w-full h-full"
                />
              )}
            </div>
            <p className="text-xs text-center text-muted-foreground">
              Preview may be scaled to fit. Actual resize will use specified dimensions.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
