"use client"

import { useState } from "react"
import { Copy, Trash2, Rows, ArrowDown, Filter, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Card, CardContent } from "@/components/ui/card"

export default function RemoveDuplicates() {
  const [text, setText] = useState("")
  const [caseSensitive, setCaseSensitive] = useState(false)
  const [originalCount, setOriginalCount] = useState(0)
  const [newCount, setNewCount] = useState(0)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text)
    toast.success("Text copied to clipboard!")
  }

  const clearText = () => {
    setText("")
    setOriginalCount(0)
    setNewCount(0)
    toast.success("Text cleared!")
  }

  const processText = () => {
    if (!text.trim()) return

    const lines = text.split('\n')
    setOriginalCount(lines.length)

    const uniqueLines = Array.from(new Set(
      caseSensitive 
        ? lines 
        : lines.map(line => line.toLowerCase())
    ))

    // If case insensitive, we need to map back to original lines or just keep unique lowercase ones
    // Usually, people want to keep the first occurrence of a unique line
    const seen = new Set()
    const resultLines = lines.filter(line => {
      const compareLine = caseSensitive ? line : line.toLowerCase()
      if (seen.has(compareLine)) return false
      seen.add(compareLine)
      return true
    })

    setText(resultLines.join('\n'))
    setNewCount(resultLines.length)
    
    const removed = lines.length - resultLines.length
    if (removed > 0) {
      toast.success(`Removed ${removed} duplicate lines!`)
    } else {
      toast.info("No duplicate lines found.")
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Rows className="h-8 w-8 text-primary" /> Remove Duplicate Lines
        </h2>
        <p className="text-muted-foreground">Clean up your lists by removing all duplicate lines instantly.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 overflow-hidden border-2 focus-within:border-primary transition-all">
          <CardContent className="p-0 relative">
            <textarea
              className="w-full h-[450px] p-6 bg-background focus:ring-0 transition-all resize-none text-lg border-none outline-none"
              placeholder="Paste your list here (one item per line)..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="absolute bottom-4 right-4 flex gap-2">
              <Button variant="secondary" size="sm" onClick={copyToClipboard} disabled={!text}>
                <Copy className="h-4 w-4 mr-2" /> Copy
              </Button>
              <Button variant="ghost" size="sm" onClick={clearText} disabled={!text} className="text-destructive hover:bg-destructive/10">
                <Trash2 className="h-4 w-4 mr-2" /> Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <h3 className="font-bold flex items-center gap-2 border-b pb-4">
                <Filter className="h-4 w-4 text-primary" /> Options
              </h3>
              
              <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => setCaseSensitive(!caseSensitive)}>
                <input 
                  type="checkbox" 
                  checked={caseSensitive}
                  onChange={() => {}}
                  className="w-5 h-5 rounded border-2 border-primary text-primary focus:ring-primary"
                />
                <span className="text-sm font-medium">Case Sensitive</span>
              </div>

              <Button className="w-full h-14 text-lg font-bold rounded-2xl shadow-lg" onClick={processText} disabled={!text}>
                <ArrowDown className="h-5 w-5 mr-2" /> Remove Duplicates
              </Button>
            </CardContent>
          </Card>

          {originalCount > 0 && (
            <Card className="bg-primary/5 border-primary/10">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-bold flex items-center gap-2 border-b border-primary/10 pb-4">
                  <Layers className="h-4 w-4 text-primary" /> Results
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Original Lines:</span>
                    <span className="font-bold">{originalCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Unique Lines:</span>
                    <span className="font-bold text-green-600">{newCount}</span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t border-primary/10">
                    <span className="text-muted-foreground font-semibold">Removed:</span>
                    <span className="font-black text-primary">{originalCount - newCount}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <div className="p-6 rounded-3xl bg-muted/30 border-2 border-dashed text-center">
        <p className="text-sm text-muted-foreground">
          <strong>Tip:</strong> This tool works best for email lists, keyword lists, or any text where you need to extract unique items line by line.
        </p>
      </div>
    </div>
  )
}
