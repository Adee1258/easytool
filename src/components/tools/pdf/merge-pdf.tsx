"use client"

import { useState, useCallback, useRef } from "react"
import { useDropzone } from "react-dropzone"
import { 
  FilePlus, 
  FileText, 
  Download, 
  Loader2, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Image as ImageIcon,
  File,
  GripVertical
} from "lucide-react"
import { PDFDocument } from "pdf-lib"
import jsPDF from "jspdf"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface FileWithPreview {
  file: File
  id: string
  preview?: string
}

export default function MergePDF() {
  const [files, setFiles] = useState<FileWithPreview[]>([])
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => {
      const fileWithPreview: FileWithPreview = {
        file,
        id: `${file.name}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      }

      if (file.type.startsWith('image/')) {
        fileWithPreview.preview = URL.createObjectURL(file)
      }

      return fileWithPreview
    })
    setFiles(prev => [...prev, ...newFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
      'text/plain': ['.txt']
    },
    multiple: true
  })

  const removeFile = (index: number) => {
    const fileToRemove = files[index]
    if (fileToRemove.preview) {
      URL.revokeObjectURL(fileToRemove.preview)
    }
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const moveFile = (index: number, direction: 'up' | 'down') => {
    const newFiles = [...files]
    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex >= 0 && newIndex < newFiles.length) {
      [newFiles[index], newFiles[newIndex]] = [newFiles[newIndex], newFiles[index]]
      setFiles(newFiles)
    }
  }

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === index) return

    const newFiles = [...files]
    const draggedItem = newFiles[draggedIndex]
    newFiles.splice(draggedIndex, 1)
    newFiles.splice(index, 0, draggedItem)
    setDraggedIndex(index)
    setFiles(newFiles)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
  }

  const convertImageToPDF = async (file: File): Promise<Uint8Array> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => {
        const pdf = new jsPDF({
          orientation: img.width > img.height ? 'landscape' : 'portrait',
          unit: 'px',
          format: [img.width, img.height]
        })
        pdf.addImage(img, 'JPEG', 0, 0, img.width, img.height)
        const pdfBytes = pdf.output('arraybuffer')
        resolve(new Uint8Array(pdfBytes))
      }
      img.onerror = reject
      img.src = URL.createObjectURL(file)
    })
  }

  const convertTextToPDF = async (file: File): Promise<Uint8Array> => {
    const text = await file.text()
    const pdf = new jsPDF()
    const lines = pdf.splitTextToSize(text, 180)
    pdf.setFont('helvetica')
    pdf.setFontSize(12)
    pdf.text(lines, 14, 20)
    const pdfBytes = pdf.output('arraybuffer')
    return new Uint8Array(pdfBytes)
  }

  const getFileIcon = (file: File) => {
    if (file.type === 'application/pdf') {
      return <FileText className="h-5 w-5" />
    } else if (file.type.startsWith('image/')) {
      return <ImageIcon className="h-5 w-5" />
    } else if (file.type === 'text/plain') {
      return <File className="h-5 w-5" />
    }
    return <File className="h-5 w-5" />
  }

  const getFileIconBg = (file: File) => {
    if (file.type === 'application/pdf') {
      return 'bg-red-100 text-red-600'
    } else if (file.type.startsWith('image/')) {
      return 'bg-blue-100 text-blue-600'
    } else if (file.type === 'text/plain') {
      return 'bg-green-100 text-green-600'
    }
    return 'bg-gray-100 text-gray-600'
  }

  const mergePDFs = async () => {
    if (files.length < 2) {
      toast.error("Please select at least 2 files to merge.")
      return
    }

    setLoading(true)
    setProgress(0)

    try {
      const mergedPdf = await PDFDocument.create()
      const totalFiles = files.length

      for (let i = 0; i < files.length; i++) {
        const { file } = files[i]
        let pdfDoc: PDFDocument

        if (file.type === 'application/pdf') {
          const fileBytes = await file.arrayBuffer()
          pdfDoc = await PDFDocument.load(fileBytes)
        } else if (file.type.startsWith('image/')) {
          const pdfBytes = await convertImageToPDF(file)
          pdfDoc = await PDFDocument.load(pdfBytes)
        } else if (file.type === 'text/plain') {
          const pdfBytes = await convertTextToPDF(file)
          pdfDoc = await PDFDocument.load(pdfBytes)
        } else {
          toast.error(`Unsupported file type: ${file.name}`)
          continue
        }

        const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices())
        copiedPages.forEach((page) => mergedPdf.addPage(page))

        setProgress(Math.round(((i + 1) / totalFiles) * 100))
      }

      const mergedPdfBytes = await mergedPdf.save()
      const blob = new Blob([mergedPdfBytes as unknown as BlobPart], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.download = `merged-${Date.now()}.pdf`
      link.click()

      toast.success("Files merged successfully!")
    } catch (error) {
      console.error(error)
      toast.error("Failed to merge files. Please ensure all files are valid.")
    } finally {
      setLoading(false)
      setProgress(0)
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div 
        {...getRootProps()} 
        className={cn(
          "border-3 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-all h-56 flex flex-col items-center justify-center space-y-4 shadow-sm",
          isDragActive 
            ? "border-primary bg-primary/10 scale-[1.02]" 
            : "border-muted-foreground/30 hover:border-primary/50 hover:bg-muted/50"
        )}
      >
        <input {...getInputProps()} />
        <div className="p-5 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 text-primary shadow-inner">
          <FilePlus className="h-10 w-10" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">Add Files</h3>
          <p className="text-muted-foreground max-w-md">
            Drag and drop or click to select PDFs, images, and text files
          </p>
          <div className="flex flex-wrap gap-2 justify-center mt-3">
            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">PDF</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">JPG/PNG</span>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">TXT</span>
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-3">
            {files.map(({ file, id, preview }, index) => (
              <Card 
                key={id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className={cn(
                  "group hover:border-primary transition-all overflow-hidden",
                  draggedIndex === index ? "opacity-50 scale-98" : "opacity-100"
                )}
              >
                <CardContent className="p-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="cursor-grab active:cursor-grabbing text-muted-foreground/50 hover:text-primary transition-colors">
                      <GripVertical className="h-5 w-5" />
                    </div>

                    {preview && (
                      <div className="w-12 h-12 rounded-lg overflow-hidden border border-border flex-shrink-0">
                        <img src={preview} alt={file.name} className="w-full h-full object-cover" />
                      </div>
                    )}

                    {!preview && (
                      <div className={cn("p-2.5 rounded-lg flex-shrink-0", getFileIconBg(file))}>
                        {getFileIcon(file)}
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm line-clamp-1">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB • {index + 1} of {files.length}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => moveFile(index, 'up')}
                      disabled={index === 0}
                      className="h-9 w-9"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => moveFile(index, 'down')}
                      disabled={index === files.length - 1}
                      className="h-9 w-9"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeFile(index)}
                      className="h-9 w-9 text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {loading && (
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div 
                className="bg-primary h-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          <Button 
            className="w-full h-16 text-lg font-bold shadow-lg hover:shadow-xl transition-all" 
            onClick={mergePDFs} 
            disabled={loading || files.length < 2}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                Merging... {progress}%
              </>
            ) : (
              <>
                <Download className="mr-2 h-6 w-6" />
                Merge {files.length} Files
              </>
            )}
          </Button>
        </div>
      )}

      <div className="p-6 bg-gradient-to-br from-muted/50 to-muted/30 rounded-2xl border border-dashed">
        <h4 className="font-bold mb-3 flex items-center gap-2">
          <FileText className="h-4 w-4 text-primary" /> Features
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground">
          <div className="flex items-start gap-2">
            <span className="text-primary mt-0.5">✓</span>
            <span>Supports PDFs, images (JPG/PNG/WebP), and text files</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-primary mt-0.5">✓</span>
            <span>Drag and drop to reorder files</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-primary mt-0.5">✓</span>
            <span>Files are processed 100% in your browser</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-primary mt-0.5">✓</span>
            <span>Your data never leaves your device</span>
          </div>
        </div>
      </div>
    </div>
  )
}
