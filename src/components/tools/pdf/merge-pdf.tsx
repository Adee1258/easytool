"use client"

import { useState, useCallback } from "react"
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
  GripVertical,
  UploadCloud
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
      'image/gif': ['.gif'],
      'image/bmp': ['.bmp'],
      'image/tiff': ['.tiff', '.tif'],
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
      return <FileText className="h-6 w-6" />
    } else if (file.type.startsWith('image/')) {
      return <ImageIcon className="h-6 w-6" />
    } else if (file.type === 'text/plain') {
      return <File className="h-6 w-6" />
    }
    return <File className="h-6 w-6" />
  }

  const getFileIconBg = (file: File) => {
    if (file.type === 'application/pdf') {
      return 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
    } else if (file.type.startsWith('image/')) {
      return 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
    } else if (file.type === 'text/plain') {
      return 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
    }
    return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
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
          "border-4 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-all duration-300 min-h-[300px] flex flex-col items-center justify-center space-y-6 shadow-lg",
          isDragActive
            ? "border-primary bg-primary/15 scale-[1.01] shadow-xl"
            : "border-muted-foreground/25 hover:border-primary/60 hover:bg-muted/50 hover:shadow-xl"
        )}
      >
        <input {...getInputProps()} />
        <div className="p-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 text-primary shadow-inner">
          <UploadCloud className="h-16 w-16" />
        </div>
        <div className="space-y-3">
          <h3 className="text-3xl font-bold">Upload Files</h3>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto">
            Drag and drop your files here, or click to browse
          </p>
        </div>

        <Button
          size="lg"
          className="h-14 px-10 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          <FilePlus className="mr-2 h-6 w-6" />
          Choose Files
        </Button>

        <div className="flex flex-wrap gap-2 justify-center mt-4">
          <span className="px-4 py-2 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 rounded-xl text-sm font-semibold">PDF</span>
          <span className="px-4 py-2 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-xl text-sm font-semibold">JPG</span>
          <span className="px-4 py-2 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-xl text-sm font-semibold">PNG</span>
          <span className="px-4 py-2 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-xl text-sm font-semibold">WebP</span>
          <span className="px-4 py-2 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-xl text-sm font-semibold">GIF</span>
          <span className="px-4 py-2 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-xl text-sm font-semibold">BMP</span>
          <span className="px-4 py-2 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-xl text-sm font-semibold">TIFF</span>
          <span className="px-4 py-2 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 rounded-xl text-sm font-semibold">TXT</span>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              Your Files ({files.length})
            </h3>
            <p className="text-muted-foreground text-sm">
              Drag to reorder • First file will be at the top
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {files.map(({ file, id, preview }, index) => (
              <Card
                key={id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className={cn(
                  "group hover:border-primary transition-all duration-300 overflow-hidden shadow-md hover:shadow-lg",
                  draggedIndex === index ? "opacity-50 scale-98" : "opacity-100"
                )}
              >
                <CardContent className="p-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-5 flex-1 min-w-0">
                    <div className="cursor-grab active:cursor-grabbing text-muted-foreground/40 hover:text-primary transition-colors p-2 hover:bg-primary/10 rounded-lg">
                      <GripVertical className="h-6 w-6" />
                    </div>

                    {preview && (
                      <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-border flex-shrink-0 shadow-sm">
                        <img src={preview} alt={file.name} className="w-full h-full object-cover" />
                      </div>
                    )}

                    {!preview && (
                      <div className={cn("p-3.5 rounded-xl flex-shrink-0 shadow-sm", getFileIconBg(file))}>
                        {getFileIcon(file)}
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-base line-clamp-1">{file.name}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-sm text-muted-foreground">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                        <span className="px-2.5 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium">
                          #{index + 1}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() => moveFile(index, 'up')}
                      disabled={index === 0}
                      className="h-10 w-10"
                    >
                      <ArrowUp className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() => moveFile(index, 'down')}
                      disabled={index === files.length - 1}
                      className="h-10 w-10"
                    >
                      <ArrowDown className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeFile(index)}
                      className="h-10 w-10"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {loading && (
            <div className="space-y-3">
              <div className="flex justify-between text-sm font-medium">
                <span>Merging files...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-4 overflow-hidden shadow-inner">
                <div
                  className="bg-gradient-to-r from-primary to-primary/80 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          <Button
            size="lg"
            className="w-full h-18 text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/95 hover:to-primary/85"
            onClick={mergePDFs}
            disabled={loading || files.length < 2}
          >
            {loading ? (
              <>
                <Loader2 className="mr-3 h-7 w-7 animate-spin" />
                Processing... Please wait
              </>
            ) : (
              <>
                <Download className="mr-3 h-7 w-7" />
                Merge & Download {files.length} Files
              </>
            )}
          </Button>
        </div>
      )}

      <div className="p-8 bg-gradient-to-br from-muted/60 to-muted/30 rounded-3xl border-2 border-dashed border-muted-foreground/20 shadow-lg">
        <h4 className="font-bold text-xl mb-5 flex items-center gap-3">
          <FileText className="h-6 w-6 text-primary" />
          How to Use
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-base text-muted-foreground">
          <div className="flex items-start gap-4 p-4 bg-background rounded-2xl shadow-sm border border-border/50">
            <div className="p-2 bg-primary/10 rounded-lg text-primary font-bold">1</div>
            <div>
              <h5 className="font-semibold text-foreground mb-1">Upload Files</h5>
              <p>Click "Choose Files" button or drag &amp; drop your PDFs, images, and text files</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-background rounded-2xl shadow-sm border border-border/50">
            <div className="p-2 bg-primary/10 rounded-lg text-primary font-bold">2</div>
            <div>
              <h5 className="font-semibold text-foreground mb-1">Reorder Files</h5>
              <p>Drag files to change their order. First file appears at the top</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-background rounded-2xl shadow-sm border border-border/50">
            <div className="p-2 bg-primary/10 rounded-lg text-primary font-bold">3</div>
            <div>
              <h5 className="font-semibold text-foreground mb-1">Merge &amp; Download</h5>
              <p>Click the big "Merge &amp; Download" button to get your combined PDF</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-background rounded-2xl shadow-sm border border-border/50">
            <div className="p-2 bg-green-500/10 rounded-lg text-green-600 font-bold">✓</div>
            <div>
              <h5 className="font-semibold text-foreground mb-1">100% Secure</h5>
              <p>Files stay on your device - never uploaded to any server</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
