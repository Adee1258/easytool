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
  UploadCloud,
  Sparkles
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
          "border-4 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-all duration-500 min-h-[350px] flex flex-col items-center justify-center space-y-8 shadow-2xl relative overflow-hidden",
          isDragActive 
            ? "border-primary bg-primary/10 scale-[1.02] shadow-3xl" 
            : "border-muted-foreground/25 hover:border-primary/60 hover:bg-muted/50 hover:shadow-3xl"
        )}
      >
        <input {...getInputProps()} />
        
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative z-10 group">
          <div className="p-10 rounded-full bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white shadow-2xl group-hover:shadow-3xl transition-all duration-300 group-hover:scale-110">
            <UploadCloud className="h-16 w-16" />
          </div>
          <div className="absolute -bottom-2 -right-2 p-3 bg-yellow-400 text-yellow-900 rounded-full shadow-lg animate-bounce">
            <Sparkles className="h-5 w-5" />
          </div>
        </div>

        <div className="space-y-4 relative z-10">
          <h3 className="text-4xl font-extrabold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Upload Files
          </h3>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto">
            Drag and drop your files here, or click the big button below
          </p>
        </div>
        
        <div className="relative z-10">
          <Button 
            size="lg" 
            className="h-16 px-12 text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/95 hover:to-primary/75 border-0 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
            <div className="flex items-center gap-3 relative z-10">
              <div className="p-2 bg-white/20 rounded-full">
                <FilePlus className="h-6 w-6" />
              </div>
              Choose Files
            </div>
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 justify-center relative z-10">
          <span className="px-5 py-2.5 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 rounded-2xl text-sm font-bold shadow-sm">PDF</span>
          <span className="px-5 py-2.5 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-2xl text-sm font-bold shadow-sm">JPG</span>
          <span className="px-5 py-2.5 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-2xl text-sm font-bold shadow-sm">PNG</span>
          <span className="px-5 py-2.5 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-2xl text-sm font-bold shadow-sm">WebP</span>
          <span className="px-5 py-2.5 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-2xl text-sm font-bold shadow-sm">GIF</span>
          <span className="px-5 py-2.5 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-2xl text-sm font-bold shadow-sm">BMP</span>
          <span className="px-5 py-2.5 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-2xl text-sm font-bold shadow-sm">TIFF</span>
          <span className="px-5 py-2.5 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 rounded-2xl text-sm font-bold shadow-sm">TXT</span>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-extrabold flex items-center gap-3">
              <div className="p-2.5 bg-primary/10 rounded-2xl">
                <FileText className="h-7 w-7 text-primary" />
              </div>
              Your Files ({files.length})
            </h3>
            <p className="text-muted-foreground text-base font-medium">
              Drag to reorder • First file will be at the top
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {files.map(({ file, id, preview }, index) => (
              <Card 
                key={id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className={cn(
                  "group hover:border-primary transition-all duration-300 overflow-hidden shadow-lg hover:shadow-2xl",
                  draggedIndex === index ? "opacity-50 scale-98" : "opacity-100"
                )}
              >
                <CardContent className="p-6 flex items-center justify-between gap-5">
                  <div className="flex items-center gap-6 flex-1 min-w-0">
                    <div className="cursor-grab active:cursor-grabbing text-muted-foreground/40 hover:text-primary transition-colors p-3 hover:bg-primary/10 rounded-2xl">
                      <GripVertical className="h-7 w-7" />
                    </div>

                    {preview && (
                      <div className="w-16 h-16 rounded-2xl overflow-hidden border-3 border-border flex-shrink-0 shadow-md">
                        <img src={preview} alt={file.name} className="w-full h-full object-cover" />
                      </div>
                    )}

                    {!preview && (
                      <div className={cn("p-4 rounded-2xl flex-shrink-0 shadow-md", getFileIconBg(file))}>
                        {getFileIcon(file)}
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-lg line-clamp-1">{file.name}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-base text-muted-foreground">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                        <span className="px-3 py-1 bg-primary/15 text-primary rounded-full text-sm font-bold">
                          #{index + 1}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <Button 
                      variant="secondary" 
                      size="icon" 
                      onClick={() => moveFile(index, 'up')}
                      disabled={index === 0}
                      className="h-12 w-12 rounded-xl shadow-md hover:shadow-lg"
                    >
                      <ArrowUp className="h-6 w-6" />
                    </Button>
                    <Button 
                      variant="secondary" 
                      size="icon" 
                      onClick={() => moveFile(index, 'down')}
                      disabled={index === files.length - 1}
                      className="h-12 w-12 rounded-xl shadow-md hover:shadow-lg"
                    >
                      <ArrowDown className="h-6 w-6" />
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      onClick={() => removeFile(index)}
                      className="h-12 w-12 rounded-xl shadow-md hover:shadow-lg"
                    >
                      <Trash2 className="h-6 w-6" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {loading && (
            <div className="space-y-4 bg-muted/50 p-6 rounded-3xl shadow-lg border border-dashed border-border">
              <div className="flex justify-between text-lg font-bold">
                <span className="flex items-center gap-2">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  Merging files...
                </span>
                <span className="text-primary">{progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-6 overflow-hidden shadow-inner border border-border">
                <div 
                  className="bg-gradient-to-r from-primary via-primary/90 to-primary h-full transition-all duration-500 rounded-full relative overflow-hidden"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                </div>
              </div>
            </div>
          )}

          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-primary/80 to-primary rounded-3xl blur-md opacity-50" />
            <Button 
              size="lg"
              className="relative w-full h-20 text-2xl font-extrabold shadow-2xl hover:shadow-3xl transition-all duration-300 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/95 hover:to-primary/85 border-0 group overflow-hidden"
              onClick={mergePDFs} 
              disabled={loading || files.length < 2}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
              <div className="flex items-center gap-4 relative z-10">
                <div className="p-3 bg-white/20 rounded-2xl">
                  {loading ? (
                    <Loader2 className="h-8 w-8 animate-spin" />
                  ) : (
                    <Download className="h-8 w-8" />
                  )}
                </div>
                {loading ? (
                  <span>Processing... Please Wait</span>
                ) : (
                  <span>Merge & Download {files.length} Files</span>
                )}
              </div>
            </Button>
          </div>
        </div>
      )}

      <div className="p-10 bg-gradient-to-br from-muted/70 to-muted/40 rounded-3xl border-3 border-dashed border-muted-foreground/20 shadow-2xl">
        <h4 className="font-extrabold text-2xl mb-7 flex items-center gap-4">
          <div className="p-3 bg-primary/15 rounded-2xl">
            <FileText className="h-7 w-7 text-primary" />
          </div>
          How to Use
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base text-muted-foreground">
          <div className="flex items-start gap-5 p-6 bg-background rounded-3xl shadow-xl border-2 border-border/60 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl">
            <div className="p-3 bg-primary/15 rounded-2xl text-primary font-extrabold text-xl shrink-0">1</div>
            <div>
              <h5 className="font-bold text-xl text-foreground mb-2">Upload Files</h5>
              <p>Click the big "Choose Files" button or drag &amp; drop your PDFs, images, and text files</p>
            </div>
          </div>
          <div className="flex items-start gap-5 p-6 bg-background rounded-3xl shadow-xl border-2 border-border/60 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl">
            <div className="p-3 bg-primary/15 rounded-2xl text-primary font-extrabold text-xl shrink-0">2</div>
            <div>
              <h5 className="font-bold text-xl text-foreground mb-2">Reorder Files</h5>
              <p>Drag files to change their order. First file appears at the top</p>
            </div>
          </div>
          <div className="flex items-start gap-5 p-6 bg-background rounded-3xl shadow-xl border-2 border-border/60 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl">
            <div className="p-3 bg-primary/15 rounded-2xl text-primary font-extrabold text-xl shrink-0">3</div>
            <div>
              <h5 className="font-bold text-xl text-foreground mb-2">Merge &amp; Download</h5>
              <p>Click the huge gradient "Merge &amp; Download" button to get your combined PDF</p>
            </div>
          </div>
          <div className="flex items-start gap-5 p-6 bg-background rounded-3xl shadow-xl border-2 border-green-500/30 hover:border-green-500/50 transition-all duration-300 hover:shadow-2xl">
            <div className="p-3 bg-green-500/15 rounded-2xl text-green-600 font-extrabold text-xl shrink-0">✓</div>
            <div>
              <h5 className="font-bold text-xl text-foreground mb-2">100% Secure</h5>
              <p>Files stay on your device - never uploaded to any server</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  )
}
