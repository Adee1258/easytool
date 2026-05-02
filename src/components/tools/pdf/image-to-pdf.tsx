"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { jsPDF } from "jspdf"
import { FileImage, Download, X, Plus, FileText, Loader2, ArrowRight, AlertCircle, GripVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"

interface ImageFile {
  id: string
  file: File
  preview: string
}

export default function ImageToPDF() {
  const [images, setImages] = useState<ImageFile[]>([])
  const [loading, setLoading] = useState(false)
  const [dragIndex, setDragIndex] = useState<number | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file)
    }))
    setImages(prev => [...prev, ...newImages])
    toast.success(`${acceptedFiles.length} images added`)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png"] },
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

  const generatePDF = async () => {
    if (images.length === 0) return
    setLoading(true)
    try {
      const pdf = new jsPDF()

      for (let i = 0; i < images.length; i++) {
        const img = images[i]
        const imgData = await new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onload = (e) => resolve(e.target?.result as string)
          reader.readAsDataURL(img.file)
        })

        if (i > 0) pdf.addPage()

        const imgProps = pdf.getImageProperties(imgData)
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = pdf.internal.pageSize.getHeight()
        const ratio = Math.min(pdfWidth / imgProps.width, pdfHeight / imgProps.height)
        const width = imgProps.width * ratio
        const height = imgProps.height * ratio
        const x = (pdfWidth - width) / 2
        const y = (pdfHeight - height) / 2

        pdf.addImage(imgData, imgProps.fileType, x, y, width, height)
      }

      pdf.save("easytool-images.pdf")
      toast.success("PDF generated successfully!")
    } catch (err) {
      toast.error("Failed to generate PDF")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all cursor-pointer ${isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/20 hover:border-primary/50 hover:bg-muted/30"
          }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 rounded-full bg-primary/10 text-primary">
            <Plus className="h-8 w-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Upload Images</h3>
            <p className="text-muted-foreground mt-1">Drag & drop JPG/PNG images or click to browse</p>
          </div>
          <Button variant="outline" type="button">Select Files</Button>
        </div>
      </div>

      {images.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold flex items-center gap-2">
              <FileImage className="h-4 w-4" /> {images.length} Image{images.length > 1 ? "s" : ""} Selected
            </h3>
            <Button variant="ghost" size="sm" onClick={() => setImages([])} className="text-destructive text-xs">
              Clear All
            </Button>
          </div>

          <div className="space-y-2">
            {images.map((img, index) => (
              <Card key={img.id} className="border border-border">
                <CardContent className="p-3 flex items-center gap-3">
                  <GripVertical className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <img src={img.preview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{img.file.name}</p>
                    <p className="text-xs text-muted-foreground">{(img.file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => moveUp(index)} disabled={index === 0}>
                      <span className="text-xs">↑</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => moveDown(index)} disabled={index === images.length - 1}>
                      <span className="text-xs">↓</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => removeImage(img.id)}>
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button size="lg" onClick={generatePDF} disabled={loading} className="w-full h-14 text-lg gap-2">
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <><FileText className="h-5 w-5" /> Convert {images.length} Image{images.length > 1 ? "s" : ""} to PDF</>
            )}
          </Button>
        </div>
      )}

      <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
        <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-amber-700 dark:text-amber-400">
          <strong>Privacy First:</strong> Images are processed in your browser. Never uploaded to any server.
        </p>
      </div>
    </div>
  )
}
