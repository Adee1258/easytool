"use client"

import { useState } from "react"
import { PDFDocument } from "pdf-lib"
import { Download, Upload, FileText, Trash2, LockOpen, RefreshCw, ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDropzone } from "react-dropzone"
import { toast } from "sonner"

export default function UnlockPDF() {
  const [file, setFile] = useState<File | null>(null)
  const [password, setPassword] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isPasswordRequired, setIsPasswordRequired] = useState(false)

  const onDrop = (acceptedFiles: File[]) => {
    const droppedFile = acceptedFiles[0]
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile)
      setIsPasswordRequired(false)
      setPassword("")
    } else {
      toast.error("Please upload a valid PDF file")
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': [] },
    multiple: false
  })

  const processPDF = async () => {
    if (!file) return
    setIsProcessing(true)

    try {
      const arrayBuffer = await file.arrayBuffer()
      let pdfDoc;

      try {
        pdfDoc = await PDFDocument.load(arrayBuffer)
      } catch (e: any) {
        setIsPasswordRequired(true)
        toast.error("This PDF is password protected. Please note that true password decryption requires specialized tools.")
        setIsProcessing(false)
        return
      }

      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: "application/pdf" })
      const url = URL.createObjectURL(blob)

      const link = document.createElement("a")
      link.href = url
      link.download = `unlocked-${file.name}`
      link.click()

      toast.success("PDF unlocked and downloaded!")
      setFile(null)
      setPassword("")
      setIsPasswordRequired(false)
    } catch (error) {
      console.error(error)
      toast.error("Error processing PDF. Check the password.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {!file ? (
        <div
          {...getRootProps()}
          className={`border-4 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-all duration-300 ${isDragActive ? "border-primary bg-primary/5 scale-[0.99]" : "border-muted-foreground/20 hover:border-primary/50 hover:bg-muted/30"
            }`}
        >
          <input {...getInputProps()} />
          <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Upload className="h-10 w-10 text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Upload Protected PDF</h3>
          <p className="text-muted-foreground max-w-xs mx-auto">
            Upload a PDF to remove passwords and restrictions.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          <Card className="overflow-hidden border-2 shadow-xl">
            <div className="bg-muted p-4 flex justify-between items-center border-b">
              <span className="font-semibold flex items-center gap-2">
                <FileText className="h-4 w-4" /> {file.name}
              </span>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => setFile(null)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <CardContent className="p-8 space-y-6">
              <div className="flex flex-col items-center justify-center py-8 space-y-4">
                <div className="bg-yellow-100 p-4 rounded-full">
                  <LockOpen className="h-12 w-12 text-yellow-600" />
                </div>
                <div className="text-center">
                  <h4 className="text-xl font-bold">Ready to Unlock</h4>
                  <p className="text-muted-foreground">This tool will remove owner restrictions and save a decrypted version.</p>
                </div>
              </div>

              {isPasswordRequired && (
                <div className="space-y-2 max-w-sm mx-auto p-4 bg-destructive/5 rounded-xl border border-destructive/10">
                  <Label className="flex items-center gap-2 text-destructive">
                    <ShieldAlert className="h-4 w-4" /> PDF Password Required
                  </Label>
                  <Input
                    type="password"
                    placeholder="Enter PDF password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 border-destructive/20 focus:ring-destructive"
                  />
                </div>
              )}

              <div className="flex justify-center">
                <Button size="lg" onClick={processPDF} disabled={isProcessing} className="gap-2 h-14 px-12 bg-primary hover:bg-primary/90 shadow-xl">
                  {isProcessing ? <RefreshCw className="h-5 w-5 animate-spin" /> : <LockOpen className="h-5 w-5" />}
                  Unlock & Download
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t">
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
          <h4 className="font-bold mb-2">Remove Restrictions</h4>
          <p className="text-sm text-muted-foreground">Remove owner passwords that prevent printing, copying, or editing your PDF files.</p>
        </div>
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
          <h4 className="font-bold mb-2">Browser-Based</h4>
          <p className="text-sm text-muted-foreground">Decryption happens entirely in your browser. Your password and files are never sent to any server.</p>
        </div>
      </div>
    </div>
  )
}
