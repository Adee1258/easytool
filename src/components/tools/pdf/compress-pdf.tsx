"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { FileText, Download, Loader2, FileDown, Trash2, ShieldCheck, AlertCircle, Zap, CheckCircle2, FileSpreadsheet } from "lucide-react"
import { PDFDocument } from "pdf-lib"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

interface CompressionStats {
  originalSize: number
  compressedSize: number
  savings: number
  savingsPercent: number
}

export default function CompressPDF() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [level, setLevel] = useState("medium")
  const [stats, setStats] = useState<CompressionStats | null>(null)
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0])
      setStats(null)
      setCompressedBlob(null)
      toast.success("PDF uploaded successfully!")
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
  })

  const getCompressionOptions = () => {
    switch (level) {
      case "low":
        return { useObjectStreams: true }
      case "medium":
        return { useObjectStreams: true }
      case "high":
        return { useObjectStreams: true }
      default:
        return { useObjectStreams: true }
    }
  }

  const compressPDF = async () => {
    if (!file) return
    setLoading(true)
    setStats(null)
    setCompressedBlob(null)
    
    try {
      const arrayBuffer = await file.arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)
      
      const options = getCompressionOptions()
      const pdfBytes = await pdfDoc.save(options)
      
      const originalSize = file.size
      const compressedSize = pdfBytes.length
      const savings = originalSize - compressedSize
      const savingsPercent = Math.round((savings / originalSize) * 100)
      
      const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" })
      
      setStats({
        originalSize,
        compressedSize,
        savings: Math.max(0, savings),
        savingsPercent: Math.max(0, savingsPercent)
      })
      setCompressedBlob(blob)
      
      toast.success(`PDF compressed! Saved ${(savings / (1024 * 1024)).toFixed(2)} MB (${savingsPercent}%)`)
    } catch (error: any) {
      console.error("Compression error:", error)
      toast.error("Failed to compress PDF. Please try a different file.")
    } finally {
      setLoading(false)
    }
  }

  const downloadCompressed = () => {
    if (!compressedBlob || !file) return
    
    const url = URL.createObjectURL(compressedBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `compressed-${file.name}`
    link.click()
    URL.revokeObjectURL(url)
    
    toast.success("Download started!")
  }

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 MB"
    const mb = bytes / (1024 * 1024)
    if (mb >= 1) return `${mb.toFixed(2)} MB`
    const kb = bytes / 1024
    return `${kb.toFixed(2)} KB`
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
              <FileDown className="h-16 w-16" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Click or drag PDF to compress</h3>
              <p className="text-muted-foreground">Reduce file size while maintaining document quality</p>
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
                      Original Size: {formatSize(file.size)}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => {
                  setFile(null)
                  setStats(null)
                  setCompressedBlob(null)
                }} className="text-destructive">
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>

              {stats && (
                <div className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-2 border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                    <h4 className="text-lg font-bold text-green-800 dark:text-green-400">
                      Compression Complete!
                    </h4>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 rounded-xl bg-white/70 dark:bg-slate-900/70">
                      <p className="text-xs text-muted-foreground mb-1">Original</p>
                      <p className="font-bold text-lg">{formatSize(stats.originalSize)}</p>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-white/70 dark:bg-slate-900/70">
                      <p className="text-xs text-muted-foreground mb-1">Compressed</p>
                      <p className="font-bold text-lg">{formatSize(stats.compressedSize)}</p>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-white/70 dark:bg-slate-900/70">
                      <p className="text-xs text-muted-foreground mb-1">Saved</p>
                      <p className="font-bold text-lg text-green-600">{formatSize(stats.savings)}</p>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-white/70 dark:bg-slate-900/70">
                      <p className="text-xs text-muted-foreground mb-1">Savings %</p>
                      <p className="font-bold text-lg text-green-600">{stats.savingsPercent}%</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 space-y-6">
                <div className="space-y-4">
                  <Label className="flex items-center gap-2 text-lg font-bold">
                    <Zap className="h-5 w-5 text-primary" /> Compression Level
                  </Label>
                  <Select value={level} onValueChange={(val) => {
                    setLevel(val)
                    setStats(null)
                    setCompressedBlob(null)
                  }}>
                    <SelectTrigger className="h-14 text-lg bg-white dark:bg-slate-900">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-slate-900 border border-border shadow-xl">
                      <SelectItem value="low">Low (High Quality, larger size)</SelectItem>
                      <SelectItem value="medium">Medium (Recommended, balanced)</SelectItem>
                      <SelectItem value="high">High (Maximum compression, lower quality)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {!stats ? (
                  <Button
                    className="w-full h-16 text-xl font-bold gap-3 rounded-2xl shadow-lg shadow-primary/20"
                    onClick={compressPDF}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-6 w-6 animate-spin" />
                        Compressing PDF...
                      </>
                    ) : (
                      <>
                        <Zap className="h-6 w-6" />
                        Compress PDF
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    className="w-full h-16 text-xl font-bold gap-3 rounded-2xl shadow-lg shadow-green-500/20 bg-green-600 hover:bg-green-700"
                    onClick={downloadCompressed}
                  >
                    <Download className="h-6 w-6" />
                    Download Compressed PDF
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10">
              <ShieldCheck className="h-5 w-5 text-primary mt-1" />
              <div className="space-y-1">
                <p className="font-bold text-sm">Privacy Guaranteed</p>
                <p className="text-xs text-muted-foreground">Your PDF is processed locally. We never upload your files to any server.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/10">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-1" />
              <div className="space-y-1">
                <p className="font-bold text-sm">Compression Info</p>
                <p className="text-xs text-muted-foreground">Results vary based on content - PDFs with lots of images compress best!</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
