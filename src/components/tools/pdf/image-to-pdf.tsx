"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { jsPDF } from "jspdf"
import { FileImage, Download, X, Plus, FileText, Loader2, ArrowRight, AlertCircle, GripVertical, Settings2, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

interface ImageFile {
  id: string
  file: File
  preview: string
}

type PageSize = "a4" | "letter" | "legal"
type Orientation = "portrait" | "landscape"
type Margin = "none" | "small" | "medium" | "large"

export default function ImageToPDF() {
  const [images, setImages] = useState<ImageFile[]>([])
  const [loading, setLoading] = useState(false)
  const [pageSize, setPageSize] = useState<PageSize>("a4")
  const [orientation, setOrientation] = useState<Orientation>("portrait")
  const [margin, setMargin] = useState<Margin>("small")

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file)
    }))
    setImages(prev => [...prev, ...newImages])
    toast.success(`${acceptedFiles.length} image${acceptedFiles.length > 1 ? "s" : ""} added`)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".webp", ".gif", ".bmp"] },
    multiple: true
  })

  const removeImage = (id: string) => {
    setImages(prev => {
      const removed = prev.find(img => img.id === id)
      if (removed) URL.revokeObjectURL(removed.preview)
      return prev.filter(img => img.id !== id)
    })
  }

  const moveUp = (index: number) => {
    if (index === 0) return
    setImages(prev => {
      const arr = [...prev]
      ;[arr[index - 1], arr[index]] = [arr[index], arr[index - 1]]
      return arr
    })
  }

  const moveDown = (index: number) => {
    if (index === images.length - 1) return
    setImages(prev => {
      const arr = [...prev]
      ;[arr[index], arr[index + 1]] = [arr[index + 1], arr[index]]
      return arr
    })
  }

  const getPageDimensions = () => {
    const sizes: Record<PageSize, { width: number; height: number }> = {
      a4: { width: 210, height: 297 },
      letter: { width: 216, height: 279 },
      legal: { width: 216, height: 356 }
    }
    return sizes[pageSize]
  }

  const getMarginSize = () => {
    const margins: Record<Margin, number> = {
      none: 0,
      small: 5,
      medium: 10,
      large: 20
    }
    return margins[margin]
  }

  const generatePDF = async () => {
    if (images.length === 0) return
    setLoading(true)
    try {
      const { width, height } = getPageDimensions()
      const margin = getMarginSize()
      
      const pdf = new jsPDF({
        orientation: orientation,
        unit: "mm",
        format: pageSize
      })

      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()

      for (let i = 0; i < images.length; i++) {
        const img = images[i]
        const imgData = await new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onload = (e) => resolve(e.target?.result as string)
          reader.readAsDataURL(img.file)
        })

        if (i > 0) pdf.addPage()

        const imgProps = pdf.getImageProperties(imgData)
        
        const availableWidth = pageWidth - (margin * 2)
        const availableHeight = pageHeight - (margin * 2)
        
        const ratio = Math.min(availableWidth / imgProps.width, availableHeight / imgProps.height)
        const imgWidth = imgProps.width * ratio
        const imgHeight = imgProps.height * ratio
        
        const x = margin + (availableWidth - imgWidth) / 2
        const y = margin + (availableHeight - imgHeight) / 2

        pdf.addImage(imgData, imgProps.fileType, x, y, imgWidth, imgHeight)
      }

      pdf.save("easytool-images-to-pdf.pdf")
      toast.success("PDF generated successfully!")
    } catch (err) {
      console.error(err)
      toast.error("Failed to generate PDF")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div
        {...getRootProps()}
        className={`border-4 border-dashed rounded-3xl p-12 md:p-16 text-center transition-all cursor-pointer ${
          isDragActive ? "border-primary bg-primary/5 scale-[0.99]" : "border-primary/20 hover:border-primary/40 hover:bg-muted/50"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-6">
          <div className="p-6 rounded-full bg-primary/10 text-primary">
            <Plus className="h-16 w-16" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">Click or drag images here</h3>
            <p className="text-muted-foreground">Upload JPG, PNG, WebP, GIF, or BMP images</p>
          </div>
          <Button size="lg" className="px-8 rounded-full">Select Images</Button>
        </div>
      </div>

      {images.length > 0 && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <FileImage className="h-5 w-5" /> 
              {images.length} Image{images.length > 1 ? "s" : ""} Selected
            </h3>
            <Button variant="ghost" size="sm" onClick={() => setImages([])} className="text-destructive">
              <X className="mr-2 h-4 w-4" />
              Clear All
            </Button>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 pb-6 border-b">
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <Settings2 className="h-4 w-4" /> Page Size
                  </Label>
                  <Select value={pageSize} onValueChange={(v) => setPageSize(v as PageSize)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="a4">A4 (Standard)</SelectItem>
                      <SelectItem value="letter">Letter (US)</SelectItem>
                      <SelectItem value="legal">Legal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <ImageIcon className="h-4 w-4" /> Orientation
                  </Label>
                  <Select value={orientation} onValueChange={(v) => setOrientation(v as Orientation)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="portrait">Portrait</SelectItem>
                      <SelectItem value="landscape">Landscape</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <Settings2 className="h-4 w-4" /> Margin
                  </Label>
                  <Select value={margin} onValueChange={(v) => setMargin(v as Margin)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Margin</SelectItem>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {images.map((img, index) => (
                  <Card key={img.id} className="border border-border hover:border-primary/30 transition-colors">
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="flex flex-col gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7" 
                          onClick={() => moveUp(index)} 
                          disabled={index === 0}
                        >
                          <span className="text-xs">↑</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7" 
                          onClick={() => moveDown(index)} 
                          disabled={index === images.length - 1}
                        >
                          <span className="text-xs">↓</span>
                        </Button>
                      </div>
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                        <img src={img.preview} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-base truncate">{img.file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(img.file.size / 1024 / 1024).toFixed(2)} MB • Page {index + 1}
                        </p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-10 w-10 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => removeImage(img.id)}
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Button 
            size="lg" 
            onClick={generatePDF} 
            disabled={loading} 
            className="w-full h-16 text-xl font-bold gap-3 rounded-2xl shadow-lg shadow-primary/20"
          >
            {loading ? (
              <>
                <Loader2 className="h-6 w-6 animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <FileText className="h-6 w-6" /> 
                Convert {images.length} Image{images.length > 1 ? "s" : ""} to PDF
              </>
            )}
          </Button>
        </div>
      )}

      <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
        <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-amber-700 dark:text-amber-400">
          <strong>Privacy First:</strong> All images are processed 100% in your browser. Never uploaded to any server.
        </p>
      </div>
    </div>
  )
}
