"use client"

import { useState, useCallback, useEffect } from "react"
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
  Upload,
  Zap,
  ShieldCheck,
  Layers,
  XCircle
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
  pageCount?: number
}

export default function MergePDF() {
  const [files, setFiles] = useState<FileWithPreview[]>([])
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [statusMessage, setStatusMessage] = useState("")

  useEffect(() => {
    return () => {
      files.forEach(f => {
        if (f.preview) {
          URL.revokeObjectURL(f.preview)
        }
      })
    }
  }, [])

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`
    }
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`
  }

  const countPDFPages = async (file: File): Promise<number> => {
    try {
      if (file.type === 'application/pdf') {
        const fileBytes = await file.arrayBuffer()
        const pdfDoc = await PDFDocument.load(fileBytes)
        return pdfDoc.getPageCount()
      }
      return 1
    } catch {
      return 1
    }
  }

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const newFiles = await Promise.all(acceptedFiles.map(async file => {
      const fileWithPreview: FileWithPreview = {
        file,
        id: `${file.name}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      }

      if (file.type.startsWith('image/')) {
        fileWithPreview.preview = URL.createObjectURL(file)
      }

      fileWithPreview.pageCount = await countPDFPages(file)
      return fileWithPreview
    }))
    setFiles(prev => [...prev, ...newFiles])
    toast.success(`${acceptedFiles.length} file${acceptedFiles.length > 1 ? 's' : ''} added successfully!`)
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
    toast.info("File removed")
  }

  const clearAllFiles = () => {
    files.forEach(f => {
      if (f.preview) {
        URL.revokeObjectURL(f.preview)
      }
    })
    setFiles([])
    toast.info("All files cleared")
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
        const maxWidth = 1240
        const maxHeight = 1754
        
        let { width, height } = img
        
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height)
          width = Math.round(width * ratio)
          height = Math.round(height * ratio)
        }

        const pdf = new jsPDF({
          orientation: width > height ? 'landscape' : 'portrait',
          unit: 'px',
          format: [width, height]
        })
        pdf.addImage(img, 'JPEG', 0, 0, width, height)
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
    const pageHeight = pdf.internal.pageSize.getHeight()
    const margin = 14
    const lineHeight = 6
    const maxLinesPerPage = Math.floor((pageHeight - margin * 2) / lineHeight)
    
    pdf.setFont('helvetica')
    pdf.setFontSize(12)
    
    const lines = pdf.splitTextToSize(text, 180)
    
    for (let i = 0; i < lines.length; i++) {
      if (i > 0 && i % maxLinesPerPage === 0) {
        pdf.addPage()
      }
      const yPosition = margin + ((i % maxLinesPerPage) * lineHeight)
      pdf.text(lines[i], margin, yPosition)
    }
    
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
      return 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
    } else if (file.type.startsWith('image/')) {
      return 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
    } else if (file.type === 'text/plain') {
      return 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
    }
    return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
  }

  const getTotalPages = () => {
    return files.reduce((sum, f) => sum + (f.pageCount || 1), 0)
  }

  const mergePDFs = async () => {
    if (files.length < 2) {
      toast.error("Please select at least 2 files to merge.")
      return
    }

    setLoading(true)
    setProgress(0)
    setStatusMessage("Preparing files...")

    try {
      const mergedPdf = await PDFDocument.create()
      const totalFiles = files.length

      for (let i = 0; i < files.length; i++) {
        const { file } = files[i]
        let pdfDoc: PDFDocument

        setStatusMessage(`Processing ${file.name}...`)

        try {
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
        } catch (err) {
          console.error(`Error processing ${file.name}:`, err)
          toast.error(`Failed to process ${file.name}. Skipping this file.`)
          continue
        }

        setProgress(Math.round(((i + 1) / totalFiles) * 100))
      }

      setStatusMessage("Generating final PDF...")
      const mergedPdfBytes = await mergedPdf.save()
      const blob = new Blob([mergedPdfBytes as unknown as BlobPart], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.download = `merged-${Date.now()}.pdf`
      link.click()

      URL.revokeObjectURL(url)
      toast.success(`Successfully merged ${files.length} files (${getTotalPages()} pages)!`)
    } catch (error) {
      console.error(error)
      toast.error("Failed to merge files. Please check your files and try again.")
    } finally {
      setLoading(false)
      setProgress(0)
      setStatusMessage("")
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
          Merge PDF Files
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Combine PDFs, images, and text files into a single professional PDF document
        </p>
      </div>

      <div 
        {...getRootProps()} 
        className={cn(
          "border-2 rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 min-h-[320px] flex flex-col items-center justify-center space-y-6 bg-background shadow-sm relative overflow-hidden group",
          isDragActive 
            ? "border-primary bg-primary/5 shadow-md scale-[1.01]" 
            : "border-border hover:border-primary/50 hover:bg-muted/30 hover:shadow-md"
        )}
      >
        <input {...getInputProps()} />
        
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative z-10">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary shadow-inner">
            <Upload className="h-12 w-12" />
          </div>
        </div>

        <div className="space-y-3 relative z-10">
          <h3 className="text-2xl font-bold text-foreground">
            {isDragActive ? "Drop files here" : "Upload your files"}
          </h3>
          <p className="text-muted-foreground">
            Drag and drop files here, or click to browse
          </p>
        </div>
        
        <div className="relative z-10">
          <Button 
            size="lg" 
            className="h-12 px-8 text-base font-semibold shadow-sm hover:shadow-md transition-all duration-300"
          >
            <FilePlus className="mr-2 h-5 w-5" />
            Browse Files
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 justify-center relative z-10">
          <span className="px-3 py-1.5 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 rounded-lg text-sm font-medium">PDF</span>
          <span className="px-3 py-1.5 bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 rounded-lg text-sm font-medium">JPG</span>
          <span className="px-3 py-1.5 bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 rounded-lg text-sm font-medium">PNG</span>
          <span className="px-3 py-1.5 bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 rounded-lg text-sm font-medium">WebP</span>
          <span className="px-3 py-1.5 bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 rounded-lg text-sm font-medium">GIF</span>
          <span className="px-3 py-1.5 bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 rounded-lg text-sm font-medium">BMP</span>
          <span className="px-3 py-1.5 bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 rounded-lg text-sm font-medium">TIFF</span>
          <span className="px-3 py-1.5 bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 rounded-lg text-sm font-medium">TXT</span>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Your Files</h3>
                <p className="text-sm text-muted-foreground">
                  {files.length} file{files.length > 1 ? 's' : ''} • {getTotalPages()} page{getTotalPages() > 1 ? 's' : ''} total
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-muted-foreground text-sm hidden sm:block">
                Drag to reorder • First file appears first
              </p>
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={clearAllFiles}
                className="text-destructive hover:bg-destructive/10"
              >
                <XCircle className="mr-1.5 h-4 w-4" />
                Clear All
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {files.map(({ file, id, preview, pageCount }, index) => (
              <Card 
                key={id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className={cn(
                  "group hover:border-primary/50 transition-all duration-200 overflow-hidden border",
                  draggedIndex === index ? "opacity-50 scale-[0.99]" : "opacity-100"
                )}
              >
                <CardContent className="p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="cursor-grab active:cursor-grabbing text-muted-foreground/30 hover:text-primary transition-colors p-1.5 hover:bg-primary/10 rounded-lg">
                      <GripVertical className="h-5 w-5" />
                    </div>

                    {preview && (
                      <div className="w-12 h-12 rounded-lg overflow-hidden border flex-shrink-0">
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
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)}
                        </span>
                        {pageCount && pageCount > 1 && (
                          <span className="text-xs text-muted-foreground">
                            • {pageCount} pages
                          </span>
                        )}
                        <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium">
                          #{index + 1}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => moveFile(index, 'up')}
                      disabled={index === 0}
                      className="h-8 w-8"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => moveFile(index, 'down')}
                      disabled={index === files.length - 1}
                      className="h-8 w-8"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeFile(index)}
                      className="h-8 w-8 text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {loading && (
            <div className="space-y-3 bg-muted/50 p-5 rounded-xl border">
              <div className="flex justify-between text-sm font-medium">
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  {statusMessage || "Merging files..."}
                </span>
                <span className="text-primary font-bold">{progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-primary via-primary/90 to-primary h-full transition-all duration-300 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          <Button 
            size="lg"
            className="w-full h-14 text-lg font-semibold shadow-sm hover:shadow-md transition-all duration-300"
            onClick={mergePDFs} 
            disabled={loading || files.length < 2}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                {statusMessage || "Merging Files..."}
              </>
            ) : (
              <>
                <Download className="mr-2 h-5 w-5" />
                Merge & Download PDF ({files.length} files • {getTotalPages()} pages)
              </>
            )}
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-6 bg-gradient-to-br from-primary/5 to-background rounded-xl border border-primary/20">
          <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
            <Zap className="h-6 w-6 text-primary" />
          </div>
          <h4 className="font-bold text-lg mb-2">Lightning Fast</h4>
          <p className="text-muted-foreground text-sm">
            All processing happens locally in your browser - no uploads needed
          </p>
        </div>
        
        <div className="p-6 bg-gradient-to-br from-primary/5 to-background rounded-xl border border-primary/20">
          <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
            <ShieldCheck className="h-6 w-6 text-primary" />
          </div>
          <h4 className="font-bold text-lg mb-2">100% Secure</h4>
          <p className="text-muted-foreground text-sm">
            Your files never leave your device. Complete privacy guaranteed
          </p>
        </div>
        
        <div className="p-6 bg-gradient-to-br from-primary/5 to-background rounded-xl border border-primary/20">
          <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
            <Layers className="h-6 w-6 text-primary" />
          </div>
          <h4 className="font-bold text-lg mb-2">Multiple Formats</h4>
          <p className="text-muted-foreground text-sm">
            Supports PDFs, images (JPG, PNG, WebP, GIF, BMP, TIFF), and text files
          </p>
        </div>
      </div>

      <div className="p-8 bg-gradient-to-br from-muted/30 to-background rounded-2xl border">
        <h4 className="font-bold text-xl mb-6 flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          How It Works
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-primary/10 rounded-lg text-primary font-bold shrink-0">1</div>
            <div>
              <h5 className="font-semibold text-foreground mb-1">Upload Files</h5>
              <p className="text-sm text-muted-foreground">
                Select or drag your PDF, image, and text files
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-2 bg-primary/10 rounded-lg text-primary font-bold shrink-0">2</div>
            <div>
              <h5 className="font-semibold text-foreground mb-1">Arrange Order</h5>
              <p className="text-sm text-muted-foreground">
                Drag files to arrange them in your desired sequence
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-2 bg-primary/10 rounded-lg text-primary font-bold shrink-0">3</div>
            <div>
              <h5 className="font-semibold text-foreground mb-1">Download</h5>
              <p className="text-sm text-muted-foreground">
                Click merge and download your combined PDF document
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
