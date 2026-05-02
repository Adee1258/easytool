"use client"

import { useState } from "react"
import { Copy, Search, Replace, Check, RefreshCw, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"

export default function FindReplace() {
  const [text, setText] = useState("")
  const [find, setFind] = useState("")
  const [replace, setReplace] = useState("")
  const [caseSensitive, setCaseSensitive] = useState(false)
  const [wholeWord, setWholeWord] = useState(false)
  const [copied, setCopied] = useState(false)
  const [replaceCount, setReplaceCount] = useState(0)

  const handleReplace = () => {
    if (!find) return toast.error("Please enter text to find")
    
    let result = text
    let flags = "g"
    if (!caseSensitive) flags += "i"

    let findPattern = find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // Escape regex
    if (wholeWord) {
      findPattern = `\\b${findPattern}\\b`
    }

    const regex = new RegExp(findPattern, flags)
    const matches = text.match(regex)
    const count = matches ? matches.length : 0

    const newText = text.replace(regex, replace)
    setText(newText)
    setReplaceCount(count)
    
    if (count > 0) {
      toast.success(`Replaced ${count} occurrences`)
    } else {
      toast.info("No occurrences found")
    }
  }

  const copyToClipboard = () => {
    if (!text) return
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success("Text copied!")
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-lg font-semibold flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" /> Source Text
          </Label>
          <Button variant="ghost" size="sm" onClick={() => setText("")} className="text-destructive h-8 gap-1">
            <Trash2 className="h-4 w-4" /> Clear
          </Button>
        </div>
        <textarea
          className="w-full h-[250px] p-6 text-lg border-2 border-primary/10 rounded-2xl bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none shadow-inner"
          placeholder="Paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Search className="h-4 w-4" /> Find
              </Label>
              <Input
                placeholder="Text to find..."
                value={find}
                onChange={(e) => setFind(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Replace className="h-4 w-4" /> Replace With
              </Label>
              <Input
                placeholder="Text to replace with..."
                value={replace}
                onChange={(e) => setReplace(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-8 items-center justify-between border-t pt-6">
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center space-x-2">
                <Switch id="case-sensitive" checked={caseSensitive} onCheckedChange={setCaseSensitive} />
                <Label htmlFor="case-sensitive">Case Sensitive</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="whole-word" checked={wholeWord} onCheckedChange={setWholeWord} />
                <Label htmlFor="whole-word">Whole Word Only</Label>
              </div>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <Button onClick={handleReplace} className="flex-1 md:flex-none gap-2">
                <Replace className="h-4 w-4" /> Replace All
              </Button>
              <Button variant="outline" size="icon" onClick={copyToClipboard} className="h-10 w-10">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {replaceCount > 0 && (
        <div className="text-center text-sm text-muted-foreground bg-primary/5 py-2 rounded-lg border border-primary/10">
          Last action: {replaceCount} replacements made.
        </div>
      )}
    </div>
  )
}
