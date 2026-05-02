"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, FileImage, Download, Loader2, Settings, Trash2 } from "lucide-react"
import imageCompression from "browser-image-compression"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export default function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null)
  const [compressedFile, setCompressedFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [quality, setQuality] = useState(0.8)
  const [maxWidth, setMaxWidth] = useState(1920)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0]
    if (selectedFile) {
      setFile(selectedFile)
      setCompressedFile(null)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false
  })

  const compressImage = async () => {
    if (!file) return
    setLoading(true)
    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: maxWidth,
        useWebWorker: true,
        initialQuality: quality,
      }
      const compressed = await imageCompression(file, options)
      setCompressedFile(compressed)
      toast.success("Image compressed successfully!")
    } catch (error) {
      toast.error("Compression failed. Try a different image.")
    } finally {
      setLoading(false)
    }
  }

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
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
            <h3 className="text-xl font-bold">Upload Image</h3>
            <p className="text-muted-foreground">Drag and drop or click to select (JPG, PNG, WebP)</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold flex items-center gap-2">
                    <Settings className="h-4 w-4" /> Settings
                  </h3>
                  <Button variant="ghost" size="sm" onClick={() => setFile(null)} className="text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" /> Remove
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <Label>Quality: {Math.round(quality * 100)}%</Label>
                    </div>
                    <Slider 
                      value={[quality * 100]} 
                      min={1} 
                      max={100} 
                      step={1} 
                      onValueChange={(v) => setQuality(v[0] / 100)} 
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <Label>Max Width: {maxWidth}px</Label>
                    </div>
                    <Slider 
                      value={[maxWidth]} 
                      min={200} 
                      max={4000} 
                      step={100} 
                      onValueChange={(v) => setMaxWidth(v[0])} 
                    />
                  </div>
                </div>

                <Button className="w-full h-12" onClick={compressImage} disabled={loading}>
                  {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <FileImage className="mr-2 h-5 w-5" />}
                  Compress Image
                </Button>
              </CardContent>
            </Card>

            <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
              <h4 className="text-sm font-semibold mb-2">Original File:</h4>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{file.name}</span>
                <span className="font-medium">{formatSize(file.size)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
             <div className="aspect-square relative rounded-2xl overflow-hidden border bg-muted flex items-center justify-center">
                {compressedFile ? (
                   <img 
                    src={URL.createObjectURL(compressedFile)} 
                    alt="Compressed preview" 
                    className="object-contain w-full h-full"
                  />
                ) : (
                  <img 
                    src={URL.createObjectURL(file)} 
                    alt="Original preview" 
                    className="object-contain w-full h-full opacity-50"
                  />
                )}
             </div>

             {compressedFile && (
               <div className="space-y-4">
                  <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-sm font-semibold text-green-700">Compressed File:</h4>
                        <p className="text-lg font-bold text-green-700">{formatSize(compressedFile.size)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-green-600 font-medium">Saved</p>
                        <p className="text-xl font-black text-green-600">
                          {Math.round((1 - compressedFile.size / file.size) * 100)}%
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full h-14 text-lg" asChild>
                    <a href={URL.createObjectURL(compressedFile)} download={`compressed-${file.name}`}>
                      <Download className="mr-2 h-6 w-6" /> Download Compressed Image
                    </a>
                  </Button>
               </div>
             )}
          </div>
        </div>
      )}
    </div>
  )
}
