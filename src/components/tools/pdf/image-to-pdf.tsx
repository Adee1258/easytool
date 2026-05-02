"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { jsPDF } from "jspdf"
import { FileImage, Download, X, Plus, FileText, Loader2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import { Reorder } from "framer-motion"

interface ImageFile {
  id: string
  file: File
  preview: string
}

export default function ImageToPDF() {
  const [images, setImages] = useState<ImageFile[]>([])
  const [loading, setLoading] = useState(false)

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
      const filtered = prev.filter(img => img.id !== id)
      // Cleanup preview URL
      const removed = prev.find(img => img.id === id)
      if (removed) URL.revokeObjectURL(removed.preview)
      return filtered
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

      pdf.save("easytoolify-images.pdf")
      toast.success("PDF generated successfully!")
    } catch (err) {
      toast.error("Failed to generate PDF")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer ${
          isDragActive ? "border-primary bg-primary/5 scale-[1.01]" : "border-muted-foreground/20 hover:border-primary/50"
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
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <FileImage className="h-5 w-5" /> Selected Images ({images.length})
            </h3>
            <p className="text-sm text-muted-foreground italic">Drag to reorder</p>
          </div>

          <Reorder.Group axis="y" values={images} onReorder={setImages} className="space-y-3">
            {images.map((img) => (
              <Reorder.Item key={img.id} value={img}>
                <Card className="hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing">
                  <CardContent className="p-3 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded overflow-hidden bg-muted">
                        <img src={img.preview} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate max-w-[200px] md:max-w-md">{img.file.name}</p>
                        <p className="text-xs text-muted-foreground">{(img.file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeImage(img.id)}
                      className="text-destructive hover:bg-destructive/10"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </CardContent>
                </Card>
              </Reorder.Item>
            ))}
          </Reorder.Group>

          <div className="flex justify-center pt-6">
            <Button size="lg" onClick={generatePDF} disabled={loading} className="px-12 h-14 text-lg gap-2">
              {loading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <>
                  <FileText className="h-6 w-6" /> Convert to PDF <ArrowRight className="h-5 w-5" />
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      <Card className="bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-900">
        <CardContent className="p-4 flex gap-3 items-start">
          <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 shrink-0" />
          <div className="text-sm text-yellow-800 dark:text-yellow-200">
            <p className="font-bold">Privacy First:</p>
            <p>Your images are processed entirely in your browser. They are never uploaded to our servers, ensuring 100% security for your private documents.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function AlertCircle(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  )
}
