"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { FilePlus, FileText, Download, Loader2, Trash2, ArrowUp, ArrowDown } from "lucide-react"
import { PDFDocument } from "pdf-lib"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export default function MergePDF() {
  const [files, setFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': [] },
    multiple: true
  })

  const removeFile = (index: number) => {
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

  const mergePDFs = async () => {
    if (files.length < 2) {
      toast.error("Please select at least 2 PDF files to merge.")
      return
    }

    setLoading(true)
    try {
      const mergedPdf = await PDFDocument.create()
      
      for (const file of files) {
        const fileBytes = await file.arrayBuffer()
        const pdf = await PDFDocument.load(fileBytes)
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
        copiedPages.forEach((page) => mergedPdf.addPage(page))
      }

      const mergedPdfBytes = await mergedPdf.save()
      const blob = new Blob([mergedPdfBytes as unknown as BlobPart], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = `merged-${Date.now()}.pdf`
      link.click()
      
      toast.success("PDFs merged successfully!")
    } catch (error) {
      console.error(error)
      toast.error("Failed to merge PDFs. Please ensure all files are valid.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div 
        {...getRootProps()} 
        className={cn(
          "border-2 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-all h-48 flex flex-col items-center justify-center space-y-4",
          isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/20 hover:border-primary/50 hover:bg-muted/50"
        )}
      >
        <input {...getInputProps()} />
        <div className="p-4 rounded-full bg-primary/10 text-primary">
          <FilePlus className="h-8 w-8" />
        </div>
        <div className="space-y-1">
          <h3 className="text-xl font-bold">Add PDF Files</h3>
          <p className="text-muted-foreground">Drag and drop or click to select multiple PDFs</p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {files.map((file, index) => (
              <Card key={`${file.name}-${index}`} className="group hover:border-primary transition-all">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-red-100 text-red-600">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-sm line-clamp-1">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => moveFile(index, 'up')}
                      disabled={index === 0}
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => moveFile(index, 'down')}
                      disabled={index === files.length - 1}
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeFile(index)}
                      className="text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button 
            className="w-full h-14 text-lg font-bold" 
            onClick={mergePDFs} 
            disabled={loading || files.length < 2}
          >
            {loading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <Download className="mr-2 h-6 w-6" />}
            Merge {files.length} PDFs
          </Button>
        </div>
      )}

      <div className="p-6 bg-muted/50 rounded-2xl border border-dashed">
        <h4 className="font-bold mb-2 flex items-center gap-2">
          <FileText className="h-4 w-4 text-primary" /> Privacy Notice
        </h4>
        <p className="text-sm text-muted-foreground">
          Merging is performed entirely in your browser. Your files are never uploaded to our servers, ensuring your data remains private and secure.
        </p>
      </div>
    </div>
  )
}
