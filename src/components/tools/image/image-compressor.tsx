"use client"

import { useState, useCallback, useRef } from "react"
import { useDropzone } from "react-dropzone"
import { 
  Upload, FileImage, Download, Loader2, Settings, Trash2, 
  X, CheckCircle2, Archive, Zap, Smartphone, Monitor, FileText, 
  Mail, ArrowRightLeft, Maximize2, Minimize2, Image
} from "lucide-react"
import imageCompression from "browser-image-compression"
import JSZip from "jszip"
import { saveAs } from "file-saver"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
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

type Preset = {
  name: string
  quality: number
  maxWidth: number
  maxHeight: number
  maxSizeMB: number
  icon: React.ReactNode
}

const presets: Preset[] = [
  {
    name: "Social Media",
    quality: 0.85,
    maxWidth: 1080,
    maxHeight: 1080,
    maxSizeMB: 1,
    icon: <Smartphone className="h-4 w-4" />,
  },
  {
    name: "Web",
    quality: 0.75,
    maxWidth: 1920,
    maxHeight: 1080,
    maxSizeMB: 0.5,
    icon: <Monitor className="h-4 w-4" />,
  },
  {
    name: "Print",
    quality: 0.95,
    maxWidth: 4000,
    maxHeight: 4000,
    maxSizeMB: 5,
    icon: <FileText className="h-4 w-4" />,
  },
  {
    name: "Email",
    quality: 0.6,
    maxWidth: 800,
    maxHeight: 800,
    maxSizeMB: 0.25,
    icon: <Mail className="h-4 w-4" />,
  },
  {
    name: "Extreme",
    quality: 0.4,
    maxWidth: 1280,
    maxHeight: 720,
    maxSizeMB: 0.1,
    icon: <Zap className="h-4 w-4" />,
  },
]

export default function ImageCompressor() {
  const [files, setFiles] = useState<CompressedFile[]>([])
  const [compressing, setCompressing] = useState(false)
  const [quality, setQuality] = useState(0.75)
  const [maxWidth, setMaxWidth] = useState(1920)
  const [maxHeight, setMaxHeight] = useState(1920)
  const [maxSizeMB, setMaxSizeMB] = useState(1)
  const [outputFormat, setOutputFormat] = useState<"same" | "jpeg" | "png" | "webp">("same")
  const [sliderPos, setSliderPos] = useState(50)
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null)
  const isDragging = useRef(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: CompressedFile[] = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      original: file,
      compressed: null,
      status: "pending" as const,
      progress: 0,
    }))
    setFiles((prev) => [...prev, ...newFiles])
    if (newFiles.length > 0) {
      setSelectedFileId(newFiles[0].id)
    }
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
          maxSizeMB: maxSizeMB,
          maxWidthOrHeight: Math.max(maxWidth, maxHeight),
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
    if (selectedFileId === id) {
      const remaining = files.filter((f) => f.id !== id)
      setSelectedFileId(remaining.length > 0 ? remaining[0].id : null)
    }
  }

  const clearAll = () => {
    setFiles([])
    setSelectedFileId(null)
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

  const applyPreset = (preset: Preset) => {
    setQuality(preset.quality)
    setMaxWidth(preset.maxWidth)
    setMaxHeight(preset.maxHeight)
    setMaxSizeMB(preset.maxSizeMB)
    toast.success(`Applied ${preset.name} preset`)
  }

  const selectedFile = files.find((f) => f.id === selectedFileId)

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header with Stats */}
      {files.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Files</p>
                  <p className="text-3xl font-black">{files.length}</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Image className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Original Size</p>
                  <p className="text-3xl font-black">{getTotalSavings().original}</p>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-xl">
                  <Maximize2 className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className={getTotalSavings().percentage > 0 ? "border-green-500/30" : ""}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Saved</p>
                  <p className="text-3xl font-black text-green-600">
                    {getTotalSavings().percentage > 0 ? `-${getTotalSavings().percentage}%` : "-"}
                  </p>
                </div>
                <div className="p-3 bg-green-500/10 rounded-xl">
                  <Minimize2 className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Upload Zone (if no files) */}
      {files.length === 0 && (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-3xl p-16 text-center cursor-pointer transition-all h-80 flex flex-col items-center justify-center space-y-6",
            isDragActive
              ? "border-primary bg-primary/5 scale-[0.99]"
              : "border-muted-foreground/20 hover:border-primary/50 hover:bg-muted/50"
          )}
        >
          <input {...getInputProps()} />
          <div className="p-6 rounded-full bg-primary/10 text-primary">
            <Upload className="h-12 w-12" />
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl font-black">Compress Images</h3>
            <p className="text-muted-foreground max-w-md">
              Drag and drop or click to select images (JPG, PNG, WebP, GIF, BMP). Batch compress multiple images at once!
            </p>
          </div>
          <Button size="lg" className="px-10 h-14 font-black">
            <Upload className="mr-3 h-6 w-6" /> Choose Images
          </Button>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Badge variant="outline">No Upload</Badge>
            <Badge variant="outline">100% Local</Badge>
            <Badge variant="outline">Batch Processing</Badge>
          </div>
        </div>
      )}

      {/* Main Content (if files) */}
      {files.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: File List & Settings */}
          <div className="lg:col-span-1 space-y-6">
            {/* File List */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold flex items-center gap-2">
                    <FileImage className="h-5 w-5 text-primary" />
                    Files
                  </h3>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      {...getRootProps()}
                      className="cursor-pointer"
                    >
                      <Upload className="h-4 w-4 mr-1" /> Add
                      <input {...getInputProps()} />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={clearAll} className="text-destructive">
                      <Trash2 className="h-4 w-4 mr-1" /> Clear
                    </Button>
                  </div>
                </div>

                <ScrollArea className="h-80 rounded-lg border">
                  <div className="p-2 space-y-2">
                    {files.map((file) => (
                      <div
                        key={file.id}
                        onClick={() => setSelectedFileId(file.id)}
                        className={cn(
                          "p-3 rounded-lg border cursor-pointer transition-all hover:bg-muted/50",
                          selectedFileId === file.id
                            ? "border-primary bg-primary/5 ring-1 ring-primary"
                            : "border-border"
                        )}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate text-sm">{file.original.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-muted-foreground">
                                {formatSize(file.original.size)}
                              </span>
                              {file.compressed && (
                                <span className="text-xs text-green-600 font-medium">
                                  {formatSize(file.compressed.size)}
                                </span>
                              )}
                            </div>
                            {file.status === "compressing" && (
                              <Progress value={file.progress} className="h-1 mt-2" />
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            {file.status === "done" && (
                              <CheckCircle2 className="h-5 w-5 text-green-500" />
                            )}
                            {file.status === "compressing" && (
                              <Loader2 className="h-5 w-5 animate-spin text-primary" />
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive"
                              onClick={(e) => {
                                e.stopPropagation()
                                removeFile(file.id)
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Presets */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="font-bold flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Quick Presets
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {presets.map((preset) => (
                    <Button
                      key={preset.name}
                      variant="ghost"
                      className="justify-start h-auto py-3 px-4"
                      onClick={() => applyPreset(preset)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">{preset.icon}</div>
                        <div className="text-left">
                          <p className="font-medium">{preset.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {Math.round(preset.quality * 100)}% · {preset.maxWidth}px
                          </p>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Preview & Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Preview */}
            {selectedFile && (
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold flex items-center gap-2">
                      <ArrowRightLeft className="h-5 w-5 text-primary" />
                      Before & After
                    </h3>
                    <div className="flex gap-2">
                      {selectedFile.status === "done" && selectedFile.compressed && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => downloadFile(selectedFile)}
                        >
                          <Download className="h-4 w-4 mr-2" /> Download
                        </Button>
                      )}
                    </div>
                  </div>

                  <div
                    className="relative rounded-xl overflow-hidden bg-muted cursor-ew-resize select-none"
                    style={{ minHeight: 350 }}
                    onMouseDown={() => (isDragging.current = true)}
                    onMouseUp={() => (isDragging.current = false)}
                    onMouseLeave={() => (isDragging.current = false)}
                    onMouseMove={(e) => {
                      if (!isDragging.current) return
                      const rect = e.currentTarget.getBoundingClientRect()
                      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
                      setSliderPos(Math.round((x / rect.width) * 100))
                    }}
                  >
                    {/* Checkerboard for transparency */}
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          "linear-gradient(45deg,#e0e0e0 25%,transparent 25%),linear-gradient(-45deg,#e0e0e0 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#e0e0e0 75%),linear-gradient(-45deg,transparent 75%,#e0e0e0 75%)",
                        backgroundSize: "20px 20px",
                        backgroundPosition: "0 0,0 10px,10px -10px,-10px 0px",
                      }}
                    />

                    {/* After (right) */}
                    {selectedFile.compressed ? (
                      <img
                        src={URL.createObjectURL(selectedFile.compressed)}
                        alt="After"
                        className="absolute inset-0 w-full h-full object-contain"
                      />
                    ) : (
                      <img
                        src={URL.createObjectURL(selectedFile.original)}
                        alt="Original"
                        className="absolute inset-0 w-full h-full object-contain opacity-50"
                      />
                    )}

                    {/* Before (left) */}
                    <div
                      className="absolute inset-0 overflow-hidden"
                      style={{ width: `${sliderPos}%` }}
                    >
                      <img
                        src={URL.createObjectURL(selectedFile.original)}
                        alt="Before"
                        className="absolute inset-0 h-full object-contain"
                        style={{
                          width: `${10000 / Math.max(sliderPos, 0.1)}%`,
                          maxWidth: "none",
                        }}
                      />
                    </div>

                    {/* Slider */}
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg pointer-events-none"
                      style={{ left: `${sliderPos}%` }}
                    >
                      <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-xl border-2 border-border flex items-center justify-center">
                        <ArrowRightLeft className="h-5 w-5 text-gray-700" />
                      </div>
                    </div>

                    <Badge className="absolute top-4 left-4 bg-black/70 text-white border-none">
                      Original
                    </Badge>
                    <Badge className="absolute top-4 right-4 bg-green-600 text-white border-none">
                      Compressed
                    </Badge>
                  </div>

                  {selectedFile.compressed && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                        <p className="text-sm text-muted-foreground">Original</p>
                        <p className="text-2xl font-black">{formatSize(selectedFile.original.size)}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                        <p className="text-sm text-muted-foreground">Compressed</p>
                        <div className="flex items-center justify-between">
                          <p className="text-2xl font-black text-green-600">
                            {formatSize(selectedFile.compressed.size)}
                          </p>
                          <Badge className="bg-green-600 text-white border-none">
                            -{Math.round((1 - selectedFile.compressed.size / selectedFile.original.size) * 100)}%
                          </Badge>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Advanced Settings */}
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold flex items-center gap-2">
                    <Settings className="h-5 w-5 text-primary" />
                    Compression Settings
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Label>Quality: {Math.round(quality * 100)}%</Label>
                    </div>
                    <Slider
                      value={[quality * 100]}
                      min={1}
                      max={100}
                      step={1}
                      onValueChange={(v) => setQuality(v[0] / 100)}
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Label>Max Size: {maxSizeMB} MB</Label>
                    </div>
                    <Slider
                      value={[maxSizeMB * 10]}
                      min={1}
                      max={50}
                      step={1}
                      onValueChange={(v) => setMaxSizeMB(v[0] / 10)}
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Label>Max Width: {maxWidth}px</Label>
                    </div>
                    <Slider
                      value={[maxWidth]}
                      min={200}
                      max={4000}
                      step={100}
                      onValueChange={(v) => setMaxWidth(v[0])}
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Label>Max Height: {maxHeight}px</Label>
                    </div>
                    <Slider
                      value={[maxHeight]}
                      min={200}
                      max={4000}
                      step={100}
                      onValueChange={(v) => setMaxHeight(v[0])}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Output Format</Label>
                  <Tabs defaultValue="same" value={outputFormat} onValueChange={(v) => setOutputFormat(v as any)}>
                    <TabsList className="grid grid-cols-4">
                      <TabsTrigger value="same">Same</TabsTrigger>
                      <TabsTrigger value="jpeg">JPEG</TabsTrigger>
                      <TabsTrigger value="png">PNG</TabsTrigger>
                      <TabsTrigger value="webp">WebP</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                className="flex-1 h-14 text-lg font-black bg-primary hover:bg-primary/90 shadow-xl shadow-primary/25"
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
                    <Zap className="mr-3 h-6 w-6" />
                    Compress All Images
                  </>
                )}
              </Button>

              {files.some((f) => f.compressed) && (
                <Button
                  variant="outline"
                  className="flex-1 h-14 text-lg font-black border-primary text-primary hover:bg-primary/10"
                  onClick={downloadAll}
                >
                  <Archive className="mr-3 h-6 w-6" />
                  Download All (ZIP)
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
