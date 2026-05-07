"use client"

import { useState, useCallback, useRef } from "react"
import { useDropzone } from "react-dropzone"
import * as pdfjs from "pdfjs-dist"
import { FileText, Download, Loader2, Image as ImageIcon, Trash2, Settings2, ShieldCheck, AlertCircle, CheckCircle2, Eye, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import JSZip from "jszip"
import { saveAs } from "file-saver"

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

interface ConvertedImage {
  pageNumber: number
  dataUrl: string
  selected: boolean
}

export default function PDFToImage() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [converting, setConverting] = useState(false)
  const [format, setFormat] = useState("jpg")
  const [quality, setQuality] = useState("high")
  const [images, setImages] = useState<ConvertedImage[]>([])
  const [totalPages, setTotalPages] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const getDPI = () => {
    switch (quality) {
      case "standard": return 72
      case "high": return 150
      case "ultra": return 300
      default: return 150
    }
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0])
      setImages([])
      toast.success("PDF file uploaded successfully!")
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
  })

  const convertPDF = async () => {
    if (!file || !canvasRef.current) return
    
    setConverting(true)
    setImages([])
    
    try {
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise
      setTotalPages(pdf.numPages)
      
      const dpi = getDPI()
      const newImages: ConvertedImage[] = []
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const viewport = page.getViewport({ scale: dpi / 72 })
        
        const canvas = canvasRef.current!
        canvas.width = viewport.width
        canvas.height = viewport.height
        
        const context = canvas.getContext("2d", { willReadFrequently: true })
        if (!context) continue
        
        await page.render({
          canvasContext: context,
          viewport: viewport
        }).promise
        
        const dataUrl = canvas.toDataURL(`image/${format === "jpg" ? "jpeg" : "png"}`, format === "jpg" ? 0.95 : 1.0)
        
        newImages.push({
          pageNumber: i,
          dataUrl,
          selected: true
        })
      }
      
      setImages(newImages)
      toast.success(`Successfully converted ${pdf.numPages} pages!`)
    } catch (error) {
      console.error(error)
      toast.error("Failed to convert PDF. Please try again.")
    } finally {
      setConverting(false)
    }
  }

  const toggleSelectAll = () => {
    const allSelected = images.every(img => img.selected)
    setImages(prev => prev.map(img => ({ ...img, selected: !allSelected })))
  }

  const toggleSelectImage = (index: number) => {
    setImages(prev => prev.map((img, i) => 
      i === index ? { ...img, selected: !img.selected } : img
    ))
  }

  const downloadSelected = async () => {
    const selectedImages = images.filter(img => img.selected)
    if (selectedImages.length === 0) {
      toast.error("Please select at least one image")
      return
    }

    setLoading(true)
    
    try {
      if (selectedImages.length === 1) {
        const img = selectedImages[0]
        const link = document.createElement("a")
        link.href = img.dataUrl
        link.download = `page-${img.pageNumber}.${format}`
        link.click()
        toast.success("Image downloaded!")
      } else {
        const zip = new JSZip()
        
        for (const img of selectedImages) {
          const base64Data = img.dataUrl.split(",")[1]
          zip.file(`page-${img.pageNumber}.${format}`, base64Data, { base64: true })
        }
        
        const content = await zip.generateAsync({ type: "blob" })
        saveAs(content, "converted-images.zip")
        toast.success(`${selectedImages.length} images downloaded as ZIP!`)
      }
    } catch (error) {
      toast.error("Failed to download images")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <canvas ref={canvasRef} className="hidden" />
      
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
              <FileText className="h-16 w-16" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Click or drag PDF here</h3>
              <p className="text-muted-foreground">Select the PDF file you want to convert to images</p>
            </div>
            <Button size="lg" className="px-8 rounded-full">Select PDF File</Button>
          </div>
        </div>
      ) : images.length === 0 ? (
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
                    <p className="text-xs text-muted-foreground">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setFile(null)} className="text-destructive">
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="space-y-4">
                  <Label className="flex items-center gap-2">
                    <Settings2 className="h-4 w-4" /> Output Format
                  </Label>
                  <Select value={format} onValueChange={setFormat}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jpg">JPG (Best for photos)</SelectItem>
                      <SelectItem value="png">PNG (Best for text/logos)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-4">
                  <Label className="flex items-center gap-2">
                    <ImageIcon className="h-4 w-4" /> Image Quality
                  </Label>
                  <Select value={quality} onValueChange={setQuality}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard (72 DPI)</SelectItem>
                      <SelectItem value="high">High (150 DPI)</SelectItem>
                      <SelectItem value="ultra">Ultra (300 DPI)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                className="w-full h-16 mt-8 text-xl font-bold gap-3 rounded-2xl shadow-lg shadow-primary/20"
                onClick={convertPDF}
                disabled={converting}
              >
                {converting ? (
                  <>
                    <Loader2 className="h-6 w-6 animate-spin" />
                    Converting PDF... {totalPages > 0 ? `(${images.length}/${totalPages})` : ""}
                  </>
                ) : (
                  <>
                    <ImageIcon className="h-6 w-6" />
                    Convert PDF to {format.toUpperCase()}
                  </>
                )}
              </Button>
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
                <p className="font-bold text-sm">High Resolution</p>
                <p className="text-xs text-muted-foreground">Choose Ultra quality for crystal clear images suitable for printing.</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <CheckCircle2 className="text-green-500" />
                Conversion Complete!
              </h2>
              <p className="text-muted-foreground">
                {images.length} page{images.length > 1 ? "s" : ""} converted successfully
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => { setImages([]); setFile(null) }}>
                <X className="mr-2 h-4 w-4" />
                Convert Another PDF
              </Button>
              <Button onClick={downloadSelected} disabled={loading} className="gap-2">
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
                Download {images.filter(i => i.selected).length} Image{images.filter(i => i.selected).length > 1 ? "s" : ""}
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4 pb-4 border-b">
                <div className="flex items-center gap-3">
                  <Checkbox 
                    id="select-all" 
                    checked={images.length > 0 && images.every(img => img.selected)}
                    onCheckedChange={toggleSelectAll}
                  />
                  <Label htmlFor="select-all" className="font-medium cursor-pointer">
                    Select All Pages
                  </Label>
                </div>
                <span className="text-sm text-muted-foreground">
                  {images.filter(i => i.selected).length} of {images.length} selected
                </span>
              </div>

              <ScrollArea className="h-[500px] pr-2">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {images.map((img, index) => (
                    <div 
                      key={img.pageNumber}
                      className={`group relative rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        img.selected ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => toggleSelectImage(index)}
                    >
                      <div className="aspect-[3/4] bg-muted">
                        <img 
                          src={img.dataUrl} 
                          alt={`Page ${img.pageNumber}`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="p-2 bg-card/90 backdrop-blur-sm border-t">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Page {img.pageNumber}</span>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                            img.selected ? "bg-primary border-primary" : "border-muted-foreground"
                          }`}>
                            {img.selected && <CheckCircle2 className="w-3 h-3 text-white" />}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
