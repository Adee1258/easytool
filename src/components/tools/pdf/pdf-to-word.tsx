"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { FileText, Download, Loader2, FileType, Trash2, ShieldCheck, AlertCircle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"

export default function PDFToWord() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [isConverted, setIsConverted] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0])
      setIsConverted(false)
      toast.success("PDF file uploaded successfully!")
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
  })

  const convertToWord = async () => {
    if (!file) return
    setLoading(true)
    
    try {
      // Simulate high-quality OCR and formatting conversion
      await new Promise(resolve => setTimeout(resolve, 4000))
      
      setIsConverted(true)
      toast.success("PDF successfully converted to Word document!")
      
      // Mock download
      const link = document.createElement("a")
      link.href = "#"
      link.download = `${file.name.replace(".pdf", "")}.docx`
      toast.info("Mock Download: Your Word document would start downloading now.")
    } catch (error) {
      toast.error("Failed to convert PDF. Please try again.")
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
            <div className="p-6 rounded-full bg-blue-100 text-blue-600">
              <FileText className="h-16 w-16" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">PDF to Word</h3>
              <p className="text-muted-foreground text-lg">Convert your PDF documents to editable Word files with high accuracy.</p>
            </div>
            <Button size="lg" className="px-10 h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-200">
              Select PDF File
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <Card className="border-2 border-blue-100 overflow-hidden shadow-2xl">
            <CardContent className="p-8">
              <div className="flex items-center justify-between gap-6 p-6 rounded-2xl bg-blue-50/50 border border-blue-100">
                <div className="flex items-center gap-6">
                  <div className="p-4 rounded-xl bg-red-100 text-red-600 shadow-sm">
                    <FileText className="h-10 w-10" />
                  </div>
                  <div>
                    <p className="font-bold text-lg truncate max-w-[250px] md:max-w-md">{file.name}</p>
                    <p className="text-sm text-muted-foreground">{(file.size / (1024 * 1024)).toFixed(2)} MB • PDF Document</p>
                  </div>
                </div>
                {!loading && (
                  <Button variant="ghost" size="icon" onClick={() => setFile(null)} className="text-destructive hover:bg-red-50 h-12 w-12 rounded-full">
                    <Trash2 className="h-6 w-6" />
                  </Button>
                )}
              </div>

              {isConverted ? (
                <div className="mt-10 p-8 rounded-2xl bg-green-50 border border-green-100 text-center space-y-4">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle2 className="h-10 w-10 text-green-600" />
                  </div>
                  <h4 className="text-2xl font-bold text-green-900">Conversion Complete!</h4>
                  <p className="text-green-700">Your editable Word file is ready for download.</p>
                  <Button className="h-14 px-12 text-lg font-bold gap-3 rounded-2xl bg-green-600 hover:bg-green-700 shadow-xl shadow-green-200" onClick={() => window.location.reload()}>
                    <Download className="h-6 w-6" /> Download .DOCX
                  </Button>
                </div>
              ) : (
                <Button
                  className="w-full h-20 mt-10 text-2xl font-bold gap-4 rounded-2xl shadow-xl shadow-blue-200 transition-all active:scale-95 bg-blue-600 hover:bg-blue-700"
                  onClick={convertToWord}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-8 w-8 animate-spin" />
                      Converting to Word...
                    </>
                  ) : (
                    <>
                      <FileType className="h-8 w-8" />
                      Convert to Word Now
                    </>
                  )}
                </Button>
              )}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-2">
              <ShieldCheck className="h-6 w-6 text-blue-600" />
              <p className="font-bold text-sm">Safe & Secure</p>
              <p className="text-xs text-muted-foreground">All processing is done in your browser. Your data never leaves your device.</p>
            </div>
            <div className="p-6 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-2">
              <AlertCircle className="h-6 w-6 text-blue-600" />
              <p className="font-bold text-sm">High Precision</p>
              <p className="text-xs text-muted-foreground">Maintains original layout, fonts, and images from your PDF document.</p>
            </div>
            <div className="p-6 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-2">
              <CheckCircle2 className="h-6 w-6 text-blue-600" />
              <p className="font-bold text-sm">Editable Text</p>
              <p className="text-xs text-muted-foreground">Extracts text and tables accurately for easy editing in Microsoft Word.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
