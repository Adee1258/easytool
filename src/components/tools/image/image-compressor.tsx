"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, Download, Loader2, Image as ImageIcon, Trash2, CheckCircle2 } from "lucide-react"
import imageCompression from "browser-image-compression"
import JSZip from "jszip"
import { saveAs } from "file-saver"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

type CompressedFile = {
  id: string
  original: File
  compressed: File | null
  status: "pending" | "compressing" | "done" | "error"
  progress: number
}

export default function ImageCompressor() {
  const [files, setFiles] = useState<CompressedFile[]>([])
  const [compressing, setCompressing] = useState(false)
  const [quality, setQuality] = useState(0.75)
  const [outputFormat, setOutputFormat] = useState<"same" | "jpeg" | "png" | "webp">("same")

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: CompressedFile[] = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      original: file,
      compressed: null,
      status: "pending" as const,
      progress: 0,
    }))
    setFiles((prev) => [...prev, ...newFiles])
    toast.success(`${acceptedFiles.length} file${acceptedFiles.length > 1 ? "s" : ""} added!`)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpg", ".jpeg", ".png", ".webp", ".gif", ".bmp"] },
    multiple: true,
  })

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getTotalSavings = () => {
    let originalTotal = 0
    let compressedTotal = 0
    files.forEach((file) => {
      originalTotal += file.original.size
      if (file.compressed) {
        compressedTotal += file.compressed.size
      }
    })
    return {
      original: formatSize(originalTotal),
      compressed: formatSize(compressedTotal),
      percentage: compressedTotal > 0 ? Math.round((1 - compressedTotal / originalTotal) * 100) : 0,
    }
  }

  const estimateCompressedSize = () => {
    if (files.length === 0) return null
    let totalOriginal = 0
    files.forEach((file) => {
      totalOriginal += file.original.size
    })
    const estimatedSize = totalOriginal * quality
    return formatSize(estimatedSize)
  }

  const compressFiles = async () => {
    if (files.length === 0) return
    setCompressing(true)

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (file.status === "done") continue

      setFiles((prev) =>
        prev.map((f) => (f.id === file.id ? { ...f, status: "compressing", progress: 0 } : f))
      )

      try {
        const options = {
          maxSizeMB: 10,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          initialQuality: quality,
          fileType:
            outputFormat === "same"
              ? undefined
              : outputFormat === "jpeg"
              ? "image/jpeg"
              : outputFormat === "png"
              ? "image/png"
              : "image/webp",
          onProgress: (progress: number) => {
            setFiles((prev) =>
              prev.map((f) =>
                f.id === file.id ? { ...f, progress: Math.round(progress * 100) } : f
              )
            )
          },
        }

        const compressed = await imageCompression(file.original, options)
        setFiles((prev) =>
          prev.map((f) =>
            f.id === file.id
              ? { ...f, compressed, status: "done", progress: 100 }
              : f
          )
        )
      } catch (error) {
        console.error(error)
        setFiles((prev) =>
          prev.map((f) =>
            f.id === file.id ? { ...f, status: "error", progress: 0 } : f
          )
        )
        toast.error(`Failed to compress ${file.original.name}`)
      }
    }

    setCompressing(false)
    toast.success("All files compressed! 🎉")
  }

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }

  const clearAll = () => {
    setFiles([])
  }

  const downloadFile = (file: CompressedFile) => {
    if (!file.compressed) return
    const a = document.createElement("a")
    a.href = URL.createObjectURL(file.compressed)
    a.download = `compressed-${file.original.name}`
    a.click()
  }

  const downloadAll = async () => {
    const zip = new JSZip()
    const doneFiles = files.filter((f) => f.compressed)

    if (doneFiles.length === 0) {
      toast.error("No compressed files to download")
      return
    }

    doneFiles.forEach((file) => {
      zip.file(`compressed-${file.original.name}`, file.compressed!)
    })

    const content = await zip.generateAsync({ type: "blob" })
    saveAs(content, "compressed-images.zip")
    toast.success("ZIP downloaded! 🎉")
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Drag & Drop Zone */}
      <div
        {...getRootProps()}
        className={cn(
          "border-3 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-6",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/30 hover:border-primary/60 hover:bg-muted/30"
        )}
      >
        <input {...getInputProps()} />
        <div className="p-6 rounded-full bg-primary/10 text-primary">
          <Upload className="h-14 w-14" />
        </div>
        <div className="space-y-3">
          <h2 className="text-2xl font-bold">Drag & Drop Images Here</h2>
          <p className="text-muted-foreground">
            Or click to select (JPG, PNG, WebP)
          </p>
        </div>
        <Button size="lg" className="px-8 h-12 font-semibold">
          <Upload className="mr-2 h-5 w-5" /> Choose Images
        </Button>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Badge variant="outline">100% Local</Badge>
          <Badge variant="outline">Free</Badge>
          <Badge variant="outline">No Sign Up</Badge>
        </div>
      </div>

      {/* Files List */}
      {files.length > 0 && (
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-primary" />
                Your Images ({files.length})
              </h3>
              <Button variant="ghost" size="sm" onClick={clearAll} className="text-destructive">
                <Trash2 className="h-4 w-4 mr-1" /> Clear All
              </Button>
            </div>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-4 rounded-xl border bg-muted/20"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                      <img
                        src={URL.createObjectURL(file.original)}
                        alt={file.original.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-sm truncate max-w-[200px]">{file.original.name}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-muted-foreground">
                          {formatSize(file.original.size)}
                        </span>
                        {file.compressed && (
                          <>
                            <span className="text-xs text-gray-400">→</span>
                            <span className="text-xs text-green-600 font-medium">
                              {formatSize(file.compressed.size)}
                            </span>
                          </>
                        )}
                      </div>
                      {file.status === "compressing" && (
                        <Progress value={file.progress} className="h-1.5 mt-2 w-40" />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {file.status === "done" && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                    {file.status === "compressing" && <Loader2 className="h-5 w-5 animate-spin text-primary" />}
                    {file.compressed && (
                      <Button variant="outline" size="sm" onClick={() => downloadFile(file)}>
                        <Download className="h-4 w-4 mr-1" /> Download
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => removeFile(file.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Settings */}
      {files.length > 0 && (
        <Card>
          <CardContent className="p-6 space-y-8">
            {/* Quality */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-lg font-semibold">Image Quality</Label>
                <span className="text-lg font-bold text-primary">{Math.round(quality * 100)}%</span>
              </div>
              
              {/* Quality Input Box */}
              <div className="flex items-center gap-3">
                <Input
                  type="number"
                  min={10}
                  max={100}
                  value={Math.round(quality * 100)}
                  onChange={(e) => {
                    const val = Math.min(100, Math.max(10, Number(e.target.value) || 10))
                    setQuality(val / 100)
                  }}
                  className="w-24 text-center font-semibold"
                />
                <span className="text-muted-foreground font-medium">%</span>
              </div>
              
              {/* Slider */}
              <Slider
                value={[quality * 100]}
                min={10}
                max={100}
                step={1}
                onValueChange={(v) => setQuality(v[0] / 100)}
                className="py-2"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Smaller Size</span>
                <span>Better Quality</span>
              </div>
              
              {/* Estimated Size Preview */}
              {estimateCompressedSize() && (
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Estimated Compressed Size:</span>
                    <span className="text-lg font-bold text-primary">{estimateCompressedSize()}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Output Format */}
            <div className="space-y-3">
              <Label className="text-lg font-semibold">Output Format</Label>
              <Tabs defaultValue="same" value={outputFormat} onValueChange={(v) => setOutputFormat(v as any)}>
                <TabsList className="grid grid-cols-4 h-12">
                  <TabsTrigger value="same" className="text-sm font-medium">Same</TabsTrigger>
                  <TabsTrigger value="jpeg" className="text-sm font-medium">JPEG</TabsTrigger>
                  <TabsTrigger value="png" className="text-sm font-medium">PNG</TabsTrigger>
                  <TabsTrigger value="webp" className="text-sm font-medium">WebP</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      {files.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            className="flex-1 h-14 text-lg font-semibold bg-primary hover:bg-primary/90"
            onClick={compressFiles}
            disabled={compressing}
          >
            {compressing ? (
              <>
                <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                Compressing...
              </>
            ) : (
              <>
                Compress Images
              </>
            )}
          </Button>

          {files.some((f) => f.compressed) && (
            <Button
              variant="outline"
              className="flex-1 h-14 text-lg font-semibold border-primary text-primary hover:bg-primary/10"
              onClick={downloadAll}
            >
              <Download className="mr-3 h-6 w-6" />
              Download All
            </Button>
          )}
        </div>
      )}

      {/* Results Summary */}
      {files.some((f) => f.compressed) && (
        <Card className="border-green-500/30 bg-green-500/5">
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              Compression Results
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white">
                <p className="text-sm text-muted-foreground mb-1">Original Size</p>
                <p className="text-2xl font-bold">{getTotalSavings().original}</p>
              </div>
              <div className="p-4 rounded-xl bg-white">
                <p className="text-sm text-muted-foreground mb-1">Compressed Size</p>
                <p className="text-2xl font-bold">{getTotalSavings().compressed}</p>
              </div>
              <div className="p-4 rounded-xl bg-green-100">
                <p className="text-sm text-green-700 mb-1">Total Saved</p>
                <p className="text-2xl font-bold text-green-700">-{getTotalSavings().percentage}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
