"use client"

import { useState } from "react"
import { Copy, FileJson, RefreshCw, Braces, Code, AlignLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"

export default function JSONFormatter() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState<string | null>(null)

  const formatJSON = (indent: number = 2) => {
    try {
      if (!input.trim()) return
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, indent))
      setError(null)
      toast.success("JSON Formatted!")
    } catch (err: any) {
      setError(err.message)
      setOutput("")
      toast.error("Invalid JSON")
    }
  }

  const minifyJSON = () => {
    try {
      if (!input.trim()) return
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed))
      setError(null)
      toast.success("JSON Minified!")
    } catch (err: any) {
      setError(err.message)
      setOutput("")
      toast.error("Invalid JSON")
    }
  }

  const copyToClipboard = () => {
    if (!output) return
    navigator.clipboard.writeText(output)
    toast.success("Copied to clipboard!")
  }

  const clearAll = () => {
    setInput("")
    setOutput("")
    setError(null)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-lg font-semibold flex items-center gap-2">
              <Code className="h-5 w-5" /> Input JSON
            </Label>
            <Button variant="ghost" size="sm" onClick={clearAll} className="h-8 gap-1">
              <RefreshCw className="h-4 w-4" /> Clear
            </Button>
          </div>
          <textarea
            className="w-full h-[400px] p-4 font-mono text-sm bg-muted/30 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            placeholder='Paste your JSON here... e.g. {"name":"EasyToolify","status":"active"}'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-lg font-semibold flex items-center gap-2">
              <Braces className="h-5 w-5" /> Formatted Result
            </Label>
            {output && (
              <Button variant="outline" size="sm" onClick={copyToClipboard} className="h-8 gap-1">
                <Copy className="h-4 w-4" /> Copy
              </Button>
            )}
          </div>
          <div className="relative">
            <textarea
              readOnly
              className={`w-full h-[400px] p-4 font-mono text-sm border rounded-lg resize-none ${
                error ? "bg-destructive/5 border-destructive/20 text-destructive" : "bg-card"
              }`}
              placeholder="Formatted JSON will appear here..."
              value={error ? `Error: ${error}` : output}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        <Button onClick={() => formatJSON(2)} size="lg" className="gap-2">
          <AlignLeft className="h-5 w-5" /> Beautify (2 Space)
        </Button>
        <Button onClick={() => formatJSON(4)} variant="outline" size="lg" className="gap-2">
          <AlignLeft className="h-5 w-5" /> Beautify (4 Space)
        </Button>
        <Button onClick={minifyJSON} variant="secondary" size="lg" className="gap-2">
          <FileJson className="h-5 w-5" /> Minify
        </Button>
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4 flex items-start gap-3">
          <div className="p-2 rounded-full bg-primary/10 text-primary mt-1">
            <Braces className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-bold">Pro Tip for AdSense</h4>
            <p className="text-sm text-muted-foreground">
              JSON formatting is a high-demand tool for developers. By offering multiple indentation levels and a minification option, you improve user retention. All processing is done locally in the browser for maximum privacy.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
