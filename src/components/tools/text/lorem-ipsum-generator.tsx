"use client"

import { useState } from "react"
import { Copy, RefreshCw, FileText, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

const LOREM_TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

export default function LoremIpsumGenerator() {
  const [type, setType] = useState<"paragraphs" | "sentences" | "words">("paragraphs")
  const [count, setCount] = useState(3)
  const [result, setResult] = useState("")
  const [copied, setCopied] = useState(false)

  const generate = () => {
    let output = ""
    const words = LOREM_TEXT.toLowerCase().replace(/[.,]/g, "").split(" ")
    const sentences = LOREM_TEXT.split(". ").map(s => s.endsWith(".") ? s : s + ".")

    if (type === "paragraphs") {
      const paragraphs = []
      for (let i = 0; i < count; i++) {
        paragraphs.push(LOREM_TEXT)
      }
      output = paragraphs.join("\n\n")
    } else if (type === "sentences") {
      const selectedSentences = []
      for (let i = 0; i < count; i++) {
        selectedSentences.push(sentences[i % sentences.length])
      }
      output = selectedSentences.join(" ")
    } else if (type === "words") {
      const selectedWords = []
      for (let i = 0; i < count; i++) {
        selectedWords.push(words[i % words.length])
      }
      output = selectedWords.join(" ")
      // Capitalize first letter
      output = output.charAt(0).toUpperCase() + output.slice(1) + "."
    }

    setResult(output)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result)
    setCopied(true)
    toast.success("Copied to clipboard!")
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <div className="space-y-2">
              <Label>Generate</Label>
              <Select value={type} onValueChange={(val: any) => setType(val)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paragraphs">Paragraphs</SelectItem>
                  <SelectItem value="sentences">Sentences</SelectItem>
                  <SelectItem value="words">Words</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Amount</Label>
              <Input
                type="number"
                min={1}
                max={100}
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value) || 1)}
              />
            </div>
            <Button onClick={generate} className="w-full gap-2">
              <RefreshCw className="h-4 w-4" /> Generate Text
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-lg font-semibold flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" /> Generated Result
            </Label>
            <Button variant="outline" size="sm" onClick={copyToClipboard} className="gap-2">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
          <div className="p-6 border-2 border-primary/10 rounded-2xl bg-muted/30 shadow-inner whitespace-pre-wrap min-h-[200px]">
            {result}
          </div>
        </div>
      )}
    </div>
  )
}
