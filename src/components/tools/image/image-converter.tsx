"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, RefreshCw, Download, Loader2, Settings, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export default function ImageConverter() {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [targetFormat, setTargetFormat] = useState("image/jpeg")

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0]
    if (selectedFile) {
      setFile(selectedFile)
      setPreviewUrl(URL.createObjectURL(selectedFile))
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false
  })

  const convertImage = async () => {
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
      
      canvas.width = img.width
      canvas.height = img.height
      ctx?.drawImage(img, 0, 0)
      
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          const link = document.createElement("a")
          link.href = url
          const extension = targetFormat.split("/")[1]
          link.download = `converted-${file.name.split(".")[0]}.${extension}`
          link.click()
          toast.success(`Image converted to ${extension.toUpperCase()}!`)
        }
        setLoading(false)
      }, targetFormat, 0.9)
    } catch (error) {
      toast.error("Failed to convert image.")
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
            <h3 className="text-xl font-bold">Upload Image to Convert</h3>
            <p className="text-muted-foreground">Change between JPG, PNG, WebP, and more</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold flex items-center gap-2">
                    <Settings className="h-4 w-4" /> Options
                  </h3>
                  <Button variant="ghost" size="sm" onClick={() => { setFile(null); setPreviewUrl(null); }} className="text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" /> Remove
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <Label>Target Format</Label>
                  <Select value={targetFormat} onValueChange={setTargetFormat}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="image/jpeg">JPG / JPEG</SelectItem>
                      <SelectItem value="image/png">PNG</SelectItem>
                      <SelectItem value="image/webp">WebP</SelectItem>
                      <SelectItem value="image/gif">GIF</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full h-12" onClick={convertImage} disabled={loading}>
                  {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <RefreshCw className="mr-2 h-5 w-5" />}
                  Convert and Download
                </Button>
              </CardContent>
            </Card>

            <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 space-y-1">
              <p className="text-sm font-semibold">Source:</p>
              <p className="text-sm text-muted-foreground truncate">{file.name}</p>
              <p className="text-xs text-muted-foreground">Type: {file.type || "unknown"}</p>
            </div>
          </div>

          <div className="aspect-square relative rounded-2xl overflow-hidden border bg-muted flex items-center justify-center">
            {previewUrl && (
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="object-contain w-full h-full"
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
