"use client"

import { useState, useRef, useEffect } from "react"
import { PDFDocument, rgb } from "pdf-lib"
import { Download, Upload, FileText, Trash2, PenTool, RefreshCw, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useDropzone } from "react-dropzone"
import { toast } from "sonner"

export default function SignPDF() {
  const [file, setFile] = useState<File | null>(null)
  const [signature, setSignature] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isDrawing, setIsDrawing] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const onDrop = (acceptedFiles: File[]) => {
    const droppedFile = acceptedFiles[0]
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile)
    } else {
      toast.error("Please upload a valid PDF file")
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': [] },
    multiple: false
  })

  // Signature Drawing Logic
  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true)
    draw(e)
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      ctx?.beginPath()
    }
  }

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : e.clientX - rect.left
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : e.clientY - rect.top

    ctx.lineWidth = 2
    ctx.lineCap = "round"
    ctx.strokeStyle = "black"

    ctx.lineTo(x, y)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const clearSignature = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      setSignature(null)
    }
  }

  const saveSignature = () => {
    const canvas = canvasRef.current
    if (canvas) {
      setSignature(canvas.toDataURL("image/png"))
      toast.success("Signature captured!")
    }
  }

  const processPDF = async () => {
    if (!file || !signature) return
    setIsProcessing(true)

    try {
      const arrayBuffer = await file.arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)
      const pages = pdfDoc.getPages()
      const firstPage = pages[0]

      const signatureImage = await pdfDoc.embedPng(signature)
      const { width, height } = firstPage.getSize()

      // Place signature at the bottom right of the first page
      firstPage.drawImage(signatureImage, {
        x: width - 150,
        y: 50,
        width: 100,
        height: 50,
      })

      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement("a")
      link.href = url
      link.download = `signed-${file.name}`
      link.click()
      
      toast.success("PDF signed and downloaded!")
    } catch (error) {
      console.error(error)
      toast.error("Error signing PDF")
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
          <h3 className="text-2xl font-bold mb-2">Upload PDF to Sign</h3>
          <p className="text-muted-foreground max-w-xs mx-auto">
            Upload your document and add your signature easily.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="overflow-hidden border-2 shadow-xl">
            <div className="bg-muted p-4 flex justify-between items-center border-b">
              <span className="font-semibold flex items-center gap-2">
                <FileText className="h-4 w-4" /> Document
              </span>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => setFile(null)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <CardContent className="p-8 flex flex-col items-center justify-center min-h-[300px] bg-black/5">
              <FileText className="h-32 w-32 text-primary/20" />
              <p className="mt-4 font-bold">{file.name}</p>
              <p className="text-sm text-muted-foreground">Signature will be placed on the first page.</p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-2 shadow-xl">
            <div className="bg-muted p-4 flex justify-between items-center border-b">
              <span className="font-semibold flex items-center gap-2">
                <PenTool className="h-4 w-4" /> Draw Signature
              </span>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={clearSignature}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
            <CardContent className="p-4 space-y-4">
              <div className="border-2 border-dashed rounded-lg bg-white overflow-hidden touch-none">
                <canvas
                  ref={canvasRef}
                  width={350}
                  height={150}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="cursor-crosshair w-full"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={clearSignature}>Clear</Button>
                <Button className="flex-1" onClick={saveSignature}>Capture</Button>
              </div>
            </CardContent>
          </Card>

          <div className="md:col-span-2 flex justify-center pt-4">
            <Button 
              size="lg" 
              onClick={processPDF} 
              disabled={isProcessing || !signature} 
              className="gap-2 h-14 px-12 bg-primary hover:bg-primary/90 shadow-xl"
            >
              {isProcessing ? <RefreshCw className="h-5 w-5 animate-spin" /> : <Check className="h-5 w-5" />}
              Sign & Download PDF
            </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t">
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
          <h4 className="font-bold mb-2">Easy Signing</h4>
          <p className="text-sm text-muted-foreground">Draw your signature using your mouse or touch screen and place it on your document.</p>
        </div>
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
          <h4 className="font-bold mb-2">Legal Ready</h4>
          <p className="text-sm text-muted-foreground">Add signatures to contracts, invoices, or any official document quickly.</p>
        </div>
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
          <h4 className="font-bold mb-2">Secure</h4>
          <p className="text-sm text-muted-foreground">Your document and signature never leave your device. Everything is processed locally.</p>
        </div>
      </div>
    </div>
  )
}
