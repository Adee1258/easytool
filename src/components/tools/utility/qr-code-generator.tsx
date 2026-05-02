"use client"

import { useState, useRef } from "react"
import { QRCodeCanvas } from "qrcode.react"
import { Download, Share2, Copy, RefreshCw, Type, Link as LinkIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"

export default function QRCodeGenerator() {
  const [text, setText] = useState("https://easytoolify.com")
  const [size, setSize] = useState(256)
  const [bgColor, setBgColor] = useState("#ffffff")
  const [fgColor, setFgColor] = useState("#000000")
  const [level, setLevel] = useState<"L" | "M" | "Q" | "H">("M")
  const qrRef = useRef<HTMLDivElement>(null)

  const downloadQRCode = () => {
    const canvas = qrRef.current?.querySelector("canvas")
    if (canvas) {
      const url = canvas.toDataURL("image/png")
      const link = document.createElement("a")
      link.download = "qrcode-easytoolify.png"
      link.href = url
      link.click()
      toast.success("QR Code downloaded!")
    }
  }

  const copyToClipboard = async () => {
    const canvas = qrRef.current?.querySelector("canvas")
    if (canvas) {
      canvas.toBlob(async (blob) => {
        if (blob) {
          try {
            await navigator.clipboard.write([
              new ClipboardItem({ "image/png": blob })
            ])
            toast.success("QR Code copied to clipboard!")
          } catch (err) {
            toast.error("Failed to copy image")
          }
        }
      })
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="space-y-4">
          <Label htmlFor="qr-text" className="text-lg font-semibold">Content</Label>
          <Tabs defaultValue="url" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="url" className="flex items-center gap-2">
                <LinkIcon className="h-4 w-4" /> URL
              </TabsTrigger>
              <TabsTrigger value="text" className="flex items-center gap-2">
                <Type className="h-4 w-4" /> Text
              </TabsTrigger>
            </TabsList>
            <TabsContent value="url">
              <Input
                id="qr-text"
                placeholder="https://example.com"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="h-12"
              />
            </TabsContent>
            <TabsContent value="text">
              <textarea
                className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter text to encode..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </TabsContent>
          </Tabs>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Size ({size}x{size})</Label>
            <Slider
              value={[size]}
              min={128}
              max={512}
              step={8}
              onValueChange={(val) => setSize(val[0])}
            />
          </div>
          <div className="space-y-2">
            <Label>Error Correction</Label>
            <div className="flex gap-1">
              {["L", "M", "Q", "H"].map((l) => (
                <Button
                  key={l}
                  variant={level === l ? "default" : "outline"}
                  size="sm"
                  className="flex-1"
                  onClick={() => setLevel(l as any)}
                >
                  {l}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Foreground Color</Label>
            <div className="flex gap-2">
              <Input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="w-12 h-10 p-1 cursor-pointer"
              />
              <Input
                type="text"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Background Color</Label>
            <div className="flex gap-2">
              <Input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-12 h-10 p-1 cursor-pointer"
              />
              <Input
                type="text"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center space-y-6">
        <Card className="p-8 bg-white dark:bg-slate-900 border-2 border-primary/20 shadow-xl rounded-2xl">
          <div ref={qrRef} className="p-4 bg-white rounded-lg">
            <QRCodeCanvas
              value={text || " "}
              size={size}
              bgColor={bgColor}
              fgColor={fgColor}
              level={level}
              includeMargin={true}
            />
          </div>
        </Card>

        <div className="flex flex-wrap gap-3 justify-center">
          <Button onClick={downloadQRCode} size="lg" className="gap-2">
            <Download className="h-5 w-5" /> Download PNG
          </Button>
          <Button onClick={copyToClipboard} variant="outline" size="lg" className="gap-2">
            <Copy className="h-5 w-5" /> Copy Image
          </Button>
          <Button 
            variant="ghost" 
            size="lg" 
            className="gap-2"
            onClick={() => {
              setText("")
              toast.info("Cleared!")
            }}
          >
            <RefreshCw className="h-5 w-5" /> Reset
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground text-center max-w-xs">
          High-quality QR code generated instantly. No signup required.
        </p>
      </div>
    </div>
  )
}
