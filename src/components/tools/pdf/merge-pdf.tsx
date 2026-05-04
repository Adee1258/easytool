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
  Sparkles,
  MousePointerClick
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
          "border-8 border-dashed rounded-[3rem] p-16 text-center cursor-pointer transition-all duration-500 min-h-[450px] flex flex-col items-center justify-center space-y-8 shadow-2xl relative overflow-hidden",
          isDragActive 
            ? "border-primary bg-primary/15 scale-[1.02] shadow-3xl" 
            : "border-primary/60 hover:border-primary hover:bg-primary/5 hover:shadow-3xl"
        )}
      >
        <input {...getInputProps()} />
        
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-8 left-8 w-16 h-16 border-l-4 border-t-4 border-primary rounded-tl-[2rem] opacity-50" />
          <div className="absolute top-8 right-8 w-16 h-16 border-r-4 border-t-4 border-primary rounded-tr-[2rem] opacity-50" />
          <div className="absolute bottom-8 left-8 w-16 h-16 border-l-4 border-b-4 border-primary rounded-bl-[2rem] opacity-50" />
          <div className="absolute bottom-8 right-8 w-16 h-16 border-r-4 border-b-4 border-primary rounded-br-[2rem] opacity-50" />
        </div>

        <div className="relative z-10">
          <div className="p-12 rounded-full bg-gradient-to-br from-primary via-primary/90 to-primary/70 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 animate-pulse">
            <UploadCloud className="h-20 w-20" />
          </div>
          <div className="absolute -bottom-4 -right-4 p-4 bg-yellow-400 text-yellow-900 rounded-full shadow-2xl animate-bounce">
            <Sparkles className="h-7 w-7" />
          </div>
        </div>

        <div className="space-y-6 relative z-10">
          <h3 className="text-5xl font-black bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            Upload Files
          </h3>
          <p className="text-2xl text-muted-foreground max-w-2xl mx-auto font-semibold">
            👆 CLICK ANYWHERE HERE or drag and drop your files
          </p>
        </div>
        
        <div className="relative z-10">
          <Button 
            size="lg" 
            className="h-20 px-16 text-2xl font-black shadow-3xl hover:shadow-4xl transition-all duration-300 bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:from-primary/95 hover:via-primary hover:to-primary/90 border-4 border-primary/50 hover:border-primary group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer" />
            <div className="flex items-center gap-5 relative z-10">
              <div className="p-3 bg-white/25 rounded-full border-2 border-white/30">
                <FilePlus className="h-8 w-8" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <MousePointerClick className="h-6 w-6 animate-bounce" />
                  <span>CLICK HERE!</span>
                </div>
                <div className="text-lg opacity-90">Choose Files</div>
              </div>
            </div>
          </Button>
        </div>

        <div className="flex flex-wrap gap-3 justify-center relative z-10">
          <span className="px-6 py-3 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 rounded-2xl text-base font-black shadow-lg">PDF</span>
          <span className="px-6 py-3 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-2xl text-base font-black shadow-lg">JPG</span>
          <span className="px-6 py-3 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-2xl text-base font-black shadow-lg">PNG</span>
          <span className="px-6 py-3 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-2xl text-base font-black shadow-lg">WebP</span>
          <span className="px-6 py-3 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-2xl text-base font-black shadow-lg">GIF</span>
          <span className="px-6 py-3 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-2xl text-base font-black shadow-lg">BMP</span>
          <span className="px-6 py-3 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-2xl text-base font-black shadow-lg">TIFF</span>
          <span className="px-6 py-3 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 rounded-2xl text-base font-black shadow-lg">TXT</span>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-4xl font-black flex items-center gap-4">
              <div className="p-4 bg-primary/15 rounded-3xl">
                <FileText className="h-9 w-9 text-primary" />
              </div>
              Your Files ({files.length})
            </h3>
            <p className="text-muted-foreground text-xl font-semibold">
              Drag to reorder • First file will be at the top
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {files.map(({ file, id, preview }, index) => (
              <Card 
                key={id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className={cn(
                  "group hover:border-primary transition-all duration-300 overflow-hidden shadow-xl hover:shadow-2xl border-4",
                  draggedIndex === index ? "opacity-50 scale-98" : "opacity-100"
                )}
              >
                <CardContent className="p-8 flex items-center justify-between gap-6">
                  <div className="flex items-center gap-8 flex-1 min-w-0">
                    <div className="cursor-grab active:cursor-grabbing text-muted-foreground/40 hover:text-primary transition-colors p-4 hover:bg-primary/10 rounded-3xl">
                      <GripVertical className="h-9 w-9" />
                    </div>

                    {preview && (
                      <div className="w-20 h-20 rounded-3xl overflow-hidden border-4 border-border flex-shrink-0 shadow-xl">
                        <img src={preview} alt={file.name} className="w-full h-full object-cover" />
                      </div>
                    )}

                    {!preview && (
                      <div className={cn("p-5 rounded-3xl flex-shrink-0 shadow-xl", getFileIconBg(file))}>
                        {getFileIcon(file)}
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <p className="font-black text-xl line-clamp-1">{file.name}</p>
                      <div className="flex items-center gap-5 mt-3">
                        <span className="text-lg text-muted-foreground font-semibold">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                        <span className="px-4 py-1.5 bg-primary/20 text-primary rounded-full text-base font-black">
                          #{index + 1}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 flex-shrink-0">
                    <Button 
                      variant="secondary" 
                      size="icon" 
                      onClick={() => moveFile(index, 'up')}
                      disabled={index === 0}
                      className="h-14 w-14 rounded-2xl shadow-xl hover:shadow-2xl border-2"
                    >
                      <ArrowUp className="h-7 w-7" />
                    </Button>
                    <Button 
                      variant="secondary" 
                      size="icon" 
                      onClick={() => moveFile(index, 'down')}
                      disabled={index === files.length - 1}
                      className="h-14 w-14 rounded-2xl shadow-xl hover:shadow-2xl border-2"
                    >
                      <ArrowDown className="h-7 w-7" />
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      onClick={() => removeFile(index)}
                      className="h-14 w-14 rounded-2xl shadow-xl hover:shadow-2xl border-2"
                    >
                      <Trash2 className="h-7 w-7" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {loading && (
            <div className="space-y-5 bg-muted/50 p-8 rounded-[2rem] shadow-2xl border-4 border-dashed border-border">
              <div className="flex justify-between text-xl font-black">
                <span className="flex items-center gap-3">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  Merging files...
                </span>
                <span className="text-primary text-2xl">{progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-10 overflow-hidden shadow-inner border-4 border-border">
                <div 
                  className="bg-gradient-to-r from-primary via-primary/90 to-primary h-full transition-all duration-500 rounded-full relative overflow-hidden"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
                </div>
              </div>
            </div>
          )}

          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-primary via-primary/70 to-primary rounded-[2rem] blur-xl opacity-60" />
            <Button 
              size="lg"
              className="relative w-full h-24 text-3xl font-black shadow-3xl hover:shadow-4xl transition-all duration-300 bg-gradient-to-r from-primary via-primary/90 to-primary/85 hover:from-primary/95 hover:via-primary hover:to-primary/90 border-0 group overflow-hidden"
              onClick={mergePDFs} 
              disabled={loading || files.length < 2}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer" />
              <div className="flex items-center gap-6 relative z-10">
                <div className="p-4 bg-white/25 rounded-3xl border-4 border-white/30">
                  {loading ? (
                    <Loader2 className="h-10 w-10 animate-spin" />
                  ) : (
                    <Download className="h-10 w-10" />
                  )}
                </div>
                {loading ? (
                  <span>⏳ Processing... Please Wait ⏳</span>
                ) : (
                  <span>🚀 Merge & Download {files.length} Files 🚀</span>
                )}
              </div>
            </Button>
          </div>
        </div>
      )}

      <div className="p-12 bg-gradient-to-br from-muted/80 to-muted/50 rounded-[2rem] border-4 border-dashed border-muted-foreground/30 shadow-2xl">
        <h4 className="font-black text-3xl mb-8 flex items-center gap-5">
          <div className="p-4 bg-primary/20 rounded-3xl">
            <FileText className="h-9 w-9 text-primary" />
          </div>
          How to Use
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg text-muted-foreground">
          <div className="flex items-start gap-6 p-8 bg-background rounded-[2rem] shadow-2xl border-4 border-border/70 hover:border-primary transition-all duration-300 hover:shadow-3xl">
            <div className="p-4 bg-primary/20 rounded-3xl text-primary font-black text-2xl shrink-0">1</div>
            <div>
              <h5 className="font-black text-2xl text-foreground mb-3">Upload Files</h5>
              <p className="text-xl">Click anywhere in the big box or the huge "CLICK HERE!" button</p>
            </div>
          </div>
          <div className="flex items-start gap-6 p-8 bg-background rounded-[2rem] shadow-2xl border-4 border-border/70 hover:border-primary transition-all duration-300 hover:shadow-3xl">
            <div className="p-4 bg-primary/20 rounded-3xl text-primary font-black text-2xl shrink-0">2</div>
            <div>
              <h5 className="font-black text-2xl text-foreground mb-3">Reorder Files</h5>
              <p className="text-xl">Drag files to change their order. First file appears at the top</p>
            </div>
          </div>
          <div className="flex items-start gap-6 p-8 bg-background rounded-[2rem] shadow-2xl border-4 border-border/70 hover:border-primary transition-all duration-300 hover:shadow-3xl">
            <div className="p-4 bg-primary/20 rounded-3xl text-primary font-black text-2xl shrink-0">3</div>
            <div>
              <h5 className="font-black text-2xl text-foreground mb-3">Merge &amp; Download</h5>
              <p className="text-xl">Click the massive glowing button at the bottom!</p>
            </div>
          </div>
          <div className="flex items-start gap-6 p-8 bg-background rounded-[2rem] shadow-2xl border-4 border-green-500/40 hover:border-green-500 transition-all duration-300 hover:shadow-3xl">
            <div className="p-4 bg-green-500/20 rounded-3xl text-green-600 font-black text-2xl shrink-0">✓</div>
            <div>
              <h5 className="font-black text-2xl text-foreground mb-3">100% Secure</h5>
              <p className="text-xl">Files stay on your device - never uploaded to any server</p>
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
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </div>
  )
}
