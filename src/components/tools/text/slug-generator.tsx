"use client"

import { useState } from "react"
import { Copy, Link, Check, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"

export default function SlugGenerator() {
  const [text, setText] = useState("")
  const [slug, setSlug] = useState("")
  const [lowercase, setLowercase] = useState(true)
  const [removeStopWords, setRemoveStopWords] = useState(false)
  const [copied, setCopied] = useState(false)

  const stopWords = ["a", "an", "the", "and", "or", "but", "in", "on", "at", "to", "for", "with", "is", "are", "was", "were"]

  const generateSlug = () => {
    let result = text.trim()
    
    if (lowercase) {
      result = result.toLowerCase()
    }

    // Remove special characters and replace spaces with hyphens
    result = result
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "")

    if (removeStopWords) {
      const parts = result.split("-")
      result = parts.filter(word => !stopWords.includes(word.toLowerCase())).join("-")
    }

    setSlug(result)
  }

  const copyToClipboard = () => {
    if (!slug) return
    navigator.clipboard.writeText(slug)
    setCopied(true)
    toast.success("Slug copied!")
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <Label className="text-lg font-semibold flex items-center gap-2">
          <Link className="h-5 w-5 text-primary" /> Enter Title or Text
        </Label>
        <Input
          placeholder="e.g. How to Build a Next.js App in 2024"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="h-14 text-lg"
        />
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-8 items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch id="lowercase" checked={lowercase} onCheckedChange={setLowercase} />
              <Label htmlFor="lowercase">Force Lowercase</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="stop-words" checked={removeStopWords} onCheckedChange={setRemoveStopWords} />
              <Label htmlFor="stop-words">Remove Stop Words</Label>
            </div>
            <Button onClick={generateSlug} className="gap-2">
              <RefreshCw className="h-4 w-4" /> Generate Slug
            </Button>
          </div>
        </CardContent>
      </Card>

      {slug && (
        <div className="space-y-4">
          <Label className="text-lg font-semibold">Generated Slug</Label>
          <div className="flex gap-2">
            <div className="flex-1 p-4 bg-muted rounded-xl font-mono text-lg border-2 border-dashed border-primary/20">
              {slug}
            </div>
            <Button size="icon" variant="outline" className="h-14 w-14" onClick={copyToClipboard}>
              {copied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
