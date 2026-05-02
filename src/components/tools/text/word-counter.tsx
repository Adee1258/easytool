"use client"

import { useState, useEffect } from "react"
import { Copy, Trash2, FileText, Hash, AlignLeft, WrapText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"

export default function WordCounter() {
  const [text, setText] = useState("")
  const [stats, setStats] = useState({
    words: 0,
    characters: 0,
    charactersNoSpaces: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0
  })

  useEffect(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0
    const characters = text.length
    const charactersNoSpaces = text.replace(/\s/g, '').length
    const sentences = text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0
    const paragraphs = text.trim() ? text.split(/\n+/).filter(Boolean).length : 0
    const readingTime = Math.ceil(words / 200) // Average reading speed 200 wpm

    setStats({
      words,
      characters,
      charactersNoSpaces,
      sentences,
      paragraphs,
      readingTime
    })
  }, [text])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text)
    toast.success("Text copied to clipboard!")
  }

  const clearText = () => {
    setText("")
    toast.success("Text cleared!")
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: "Words", value: stats.words, icon: FileText, color: "text-blue-500" },
          { label: "Characters", value: stats.characters, icon: Hash, color: "text-green-500" },
          { label: "Sentences", value: stats.sentences, icon: AlignLeft, color: "text-purple-500" },
          { label: "Paragraphs", value: stats.paragraphs, icon: WrapText, color: "text-orange-500" },
          { label: "No Spaces", value: stats.charactersNoSpaces, icon: Hash, color: "text-pink-500" },
          { label: "Reading Time", value: `${stats.readingTime} min`, icon: FileText, color: "text-cyan-500" },
        ].map((stat, i) => (
          <Card key={i} className="border-none bg-muted/50">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-1">
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
              <span className="text-2xl font-bold">{stat.value}</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="relative">
        <textarea
          className="w-full h-80 p-6 rounded-2xl border-2 border-muted bg-background focus:border-primary focus:ring-0 transition-all resize-none text-lg"
          placeholder="Start typing or paste your text here..."
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
      </div>
      
      <div className="flex flex-wrap gap-4">
        <Button variant="outline" onClick={() => setText(text.toUpperCase())} disabled={!text}>UPPERCASE</Button>
        <Button variant="outline" onClick={() => setText(text.toLowerCase())} disabled={!text}>lowercase</Button>
        <Button variant="outline" onClick={() => {
          const capitalized = text.toLowerCase().replace(/(^\w|\s\w)/g, m => m.toUpperCase())
          setText(capitalized)
        }} disabled={!text}>Title Case</Button>
        <Button variant="outline" onClick={() => {
          const trimmed = text.replace(/\s+/g, ' ').trim()
          setText(trimmed)
        }} disabled={!text}>Remove Extra Spaces</Button>
      </div>
    </div>
  )
}
