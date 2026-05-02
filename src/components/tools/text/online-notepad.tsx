"use client"

import { useState, useEffect } from "react"
import { Save, Trash2, Download, Copy, Check, FileText, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"

export default function OnlineNotepad() {
  const [content, setContent] = useState("")
  const [lastSaved, setLastSaved] = useState<string>("")
  const [copied, setCopied] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("easytoolify-notepad")
    if (saved) {
      setContent(saved)
      setLastSaved(new Date().toLocaleTimeString())
    }
  }, [])

  // Auto-save to localStorage
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (content) {
        localStorage.setItem("easytoolify-notepad", content)
        setLastSaved(new Date().toLocaleTimeString())
      }
    }, 1000)
    return () => clearTimeout(timeout)
  }, [content])

  const clearNotepad = () => {
    if (confirm("Are you sure you want to clear all notes?")) {
      setContent("")
      localStorage.removeItem("easytoolify-notepad")
      setLastSaved("")
      toast.success("Notepad cleared")
    }
  }

  const copyToClipboard = () => {
    if (!content) return
    navigator.clipboard.writeText(content)
    setCopied(true)
    toast.success("Copied to clipboard")
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadTxt = () => {
    if (!content) return
    const element = document.createElement("a")
    const file = new Blob([content], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `note-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    toast.success("Downloading text file...")
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" /> Online Notepad
          </h3>
          <p className="text-sm text-muted-foreground">
            Your notes are automatically saved to your browser's local storage.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={copyToClipboard} disabled={!content} className="gap-2">
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied" : "Copy"}
          </Button>
          <Button variant="outline" size="sm" onClick={downloadTxt} disabled={!content} className="gap-2">
            <Download className="h-4 w-4" /> Download .txt
          </Button>
          <Button variant="ghost" size="sm" onClick={clearNotepad} disabled={!content} className="text-destructive gap-2">
            <Trash2 className="h-4 w-4" /> Clear All
          </Button>
        </div>
      </div>

      <Card className="border-2 border-primary/10 shadow-lg">
        <CardContent className="p-0">
          <textarea
            className="w-full h-[500px] p-8 text-lg bg-transparent focus:outline-none resize-none leading-relaxed font-serif"
            placeholder="Start typing your notes here... Everything is saved automatically."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            spellCheck={false}
          />
        </CardContent>
        <div className="p-4 bg-muted/50 border-t flex justify-between items-center text-xs text-muted-foreground">
          <div className="flex gap-4">
            <span>{content.length} characters</span>
            <span>{content.split(/\s+/).filter(Boolean).length} words</span>
          </div>
          {lastSaved && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> Auto-saved at {lastSaved}
            </div>
          )}
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex items-start gap-3">
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
            <Save className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="font-bold text-sm">Auto-Save</p>
            <p className="text-xs text-muted-foreground">Never lose your work. Changes save as you type.</p>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-green-50 border border-green-100 flex items-start gap-3">
          <div className="h-8 w-8 rounded-full bg-green-200 flex items-center justify-center shrink-0">
            <FileText className="h-4 w-4 text-green-700" />
          </div>
          <div>
            <p className="font-bold text-sm text-green-800">Privacy First</p>
            <p className="text-xs text-green-700/70">Data stays in your browser. No server uploads.</p>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-orange-50 border border-orange-100 flex items-start gap-3">
          <div className="h-8 w-8 rounded-full bg-orange-200 flex items-center justify-center shrink-0">
            <Download className="h-4 w-4 text-orange-700" />
          </div>
          <div>
            <p className="font-bold text-sm text-orange-800">Export Ready</p>
            <p className="text-xs text-orange-700/70">Download your notes as plain text files anytime.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
