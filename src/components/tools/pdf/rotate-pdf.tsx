"use client"

import { useState } from "react"
import { PDFDocument, degrees } from "pdf-lib"
import { Download, Upload, FileText, Trash2, RotateCw, RotateCcw, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { useDropzone } from "react-dropzone"
import { toast } from "sonner"

export default function RotatePDF() {
  const [file, setFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [rotation, setRotation] = useState(0)

  const onDrop = (acceptedFiles: File[]) => {
    const droppedFile = acceptedFiles[0]
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile)
      setRotation(0)
    } else {
      toast.error("Please upload a valid PDF file")
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': [] },
    multiple: false
  })

  const rotate = (deg: number) => {
    setRotation((prev) => (prev + deg) % 360)
  }

  const processPDF = async () => {
    if (!file) return
    setIsProcessing(true)

    try {
      const arrayBuffer = await file.arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)
      const pages = pdfDoc.getPages()

      pages.forEach((page) => {
        const currentRotation = page.getRotation().angle
        page.setRotation(degrees((currentRotation + rotation) % 360))
      })

      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement("a")
      link.href = url
      link.download = `rotated-${file.name}`
      link.click()
      
      toast.success("PDF rotated and downloaded!")
    } catch (error) {
      console.error(error)
      toast.error("Error processing PDF")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {!file ? (
        <div
          {...getRootProps()}
          className={`border-4 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-all duration-300 ${
            isDragActive ? "border-primary bg-primary/5 scale-[0.99]" : "border-muted-foreground/20 hover:border-primary/50 hover:bg-muted/30"
          }`}
        >
          <input {...getInputProps()} />
          <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Upload className="h-10 w-10 text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Upload PDF</h3>
          <p className="text-muted-foreground max-w-xs mx-auto">
            Drag & drop your PDF here, or click to select a file.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          <Card className="overflow-hidden border-2 shadow-xl">
            <div className="bg-muted p-4 flex justify-between items-center border-b">
              <span className="font-semibold flex items-center gap-2">
                <FileText className="h-4 w-4" /> {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </span>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => setFile(null)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <CardContent className="p-12 flex flex-col items-center justify-center bg-black/5 min-h-[300px] space-y-6">
              <div 
                className="transition-transform duration-300 ease-in-out shadow-2xl bg-white p-8 rounded border"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                <FileText className="h-32 w-32 text-primary/20" />
                <div className="text-center font-bold text-primary mt-4">PDF PREVIEW</div>
              </div>
              <p className="text-sm text-muted-foreground">This will rotate all pages in the document.</p>
            </CardContent>
          </Card>

          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" size="lg" onClick={() => rotate(-90)} className="gap-2 h-14 px-8">
              <RotateCcw className="h-5 w-5" /> Rotate Left
            </Button>
            <Button variant="outline" size="lg" onClick={() => rotate(90)} className="gap-2 h-14 px-8">
              <RotateCw className="h-5 w-5" /> Rotate Right
            </Button>
            <Button size="lg" onClick={processPDF} disabled={isProcessing} className="gap-2 h-14 px-8 bg-primary hover:bg-primary/90">
              {isProcessing ? <RefreshCw className="h-5 w-5 animate-spin" /> : <Download className="h-5 w-5" />}
              Apply & Download
            </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t">
        <div className="space-y-2">
          <h4 className="font-bold">Fast & Simple</h4>
          <p className="text-sm text-muted-foreground">Rotate your PDF pages in seconds with just a few clicks.</p>
        </div>
        <div className="space-y-2">
          <h4 className="font-bold">Secure Processing</h4>
          <p className="text-sm text-muted-foreground">All processing happens in your browser. Your files never leave your device.</p>
        </div>
        <div className="space-y-2">
          <h4 className="font-bold">High Quality</h4>
          <p className="text-sm text-muted-foreground">Maintain the original quality and formatting of your PDF document.</p>
        </div>
      </div>
    </div>
  )
}
