"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { FileText, Download, Loader2, Scissors, Trash2, ShieldCheck, AlertCircle, Layers } from "lucide-react"
import { PDFDocument } from "pdf-lib"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function SplitPDF() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [pageRange, setPageRange] = useState("")
  const [pageCount, setPageCount] = useState<number>(0)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0]
      setFile(selectedFile)
      
      try {
        const arrayBuffer = await selectedFile.arrayBuffer()
        const pdfDoc = await PDFDocument.load(arrayBuffer)
        setPageCount(pdfDoc.getPageCount())
        setPageRange(`1-${pdfDoc.getPageCount()}`)
        toast.success("PDF loaded successfully!")
      } catch (error) {
        toast.error("Failed to load PDF. It might be password protected.")
        setFile(null)
      }
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
  })

  const splitPDF = async () => {
    if (!file || !pageRange) return
    setLoading(true)
    
    try {
      const arrayBuffer = await file.arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)
      
      // Parse range (e.g., "1-3, 5, 7-10")
      const pagesToKeep: number[] = []
      const ranges = pageRange.split(",").map(r => r.trim())
      
      for (const range of ranges) {
        if (range.includes("-")) {
          const [start, end] = range.split("-").map(Number)
          if (!isNaN(start) && !isNaN(end)) {
            for (let i = Math.max(1, start); i <= Math.min(pageCount, end); i++) {
              pagesToKeep.push(i - 1) // 0-indexed
            }
          }
        } else {
          const pageNum = parseInt(range)
          if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= pageCount) {
            pagesToKeep.push(pageNum - 1)
          }
        }
      }

      if (pagesToKeep.length === 0) {
        throw new Error("Invalid page range specified.")
      }

      const newPdfDoc = await PDFDocument.create()
      const copiedPages = await newPdfDoc.copyPages(pdfDoc, Array.from(new Set(pagesToKeep)).sort((a, b) => a - b))
      copiedPages.forEach(page => newPdfDoc.addPage(page))
      
      const pdfBytes = await newPdfDoc.save()
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement("a")
      link.href = url
      link.download = `split-${file.name}`
      link.click()
      
      toast.success("PDF split successfully!")
    } catch (error: any) {
      toast.error(error.message || "Failed to split PDF. Please check your range.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {!file ? (
        <div
          {...getRootProps()}
          className={`border-4 border-dashed rounded-3xl p-12 md:p-20 text-center transition-all cursor-pointer ${
            isDragActive ? "border-primary bg-primary/5 scale-[0.99]" : "border-primary/20 hover:border-primary/40 hover:bg-muted/50"
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-6">
            <div className="p-6 rounded-full bg-primary/10 text-primary">
              <Scissors className="h-16 w-16" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Click or drag PDF to split</h3>
              <p className="text-muted-foreground">Extract specific pages or ranges from your PDF</p>
            </div>
            <Button size="lg" className="px-8 rounded-full">Select PDF File</Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <Card className="border-2 border-primary/10 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-muted/50 border">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-red-100 text-red-600">
                    <FileText className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="font-bold truncate max-w-[200px] md:max-w-md">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {pageCount} pages • {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setFile(null)} className="text-destructive">
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>

              <div className="mt-8 space-y-6">
                <div className="space-y-4">
                  <Label htmlFor="range" className="flex items-center gap-2 text-lg font-bold">
                    <Layers className="h-5 w-5 text-primary" /> Enter Page Range
                  </Label>
                  <Input
                    id="range"
                    placeholder="e.g. 1-5, 8, 11-13"
                    value={pageRange}
                    onChange={(e) => setPageRange(e.target.value)}
                    className="h-14 text-lg border-2 focus:border-primary"
                  />
                  <p className="text-sm text-muted-foreground">
                    Use commas to separate ranges (e.g., 1-3, 5) or single pages. Total pages: {pageCount}
                  </p>
                </div>

                <Button
                  className="w-full h-16 text-xl font-bold gap-3 rounded-2xl shadow-lg shadow-primary/20"
                  onClick={splitPDF}
                  disabled={loading || !pageRange}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-6 w-6 animate-spin" />
                      Splitting PDF...
                    </>
                  ) : (
                    <>
                      <Download className="h-6 w-6" />
                      Download Split PDF
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10">
              <ShieldCheck className="h-5 w-5 text-primary mt-1" />
              <div className="space-y-1">
                <p className="font-bold text-sm">Safe Processing</p>
                <p className="text-xs text-muted-foreground">Your file is processed in your browser. Nothing is uploaded to our servers.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/10">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-1" />
              <div className="space-y-1">
                <p className="font-bold text-sm">Format Support</p>
                <p className="text-xs text-muted-foreground">Supports all standard PDF files. Password protected files must be unlocked first.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
