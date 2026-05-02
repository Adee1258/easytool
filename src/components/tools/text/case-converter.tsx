"use client"

import { useState } from "react"
import { Copy, Trash2, CaseSensitive, Type, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function CaseConverter() {
  const [text, setText] = useState("")

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text)
    toast.success("Text copied to clipboard!")
  }

  const clearText = () => {
    setText("")
    toast.success("Text cleared!")
  }

  const toSentenceCase = () => {
    const result = text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase())
    setText(result)
  }

  const toTitleCase = () => {
    const result = text.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    setText(result)
  }

  const toInverseCase = () => {
    const result = text.split('').map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join('')
    setText(result)
  }

  const toAlternatingCase = () => {
    const result = text.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('')
    setText(result)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold flex items-center justify-center gap-2">
          <CaseSensitive className="h-8 w-8 text-primary" /> Case Converter
        </h2>
        <p className="text-muted-foreground">Easily change your text between different letter cases.</p>
      </div>

      <div className="relative group">
        <textarea
          className="w-full h-80 p-6 rounded-3xl border-2 border-muted bg-background focus:border-primary focus:ring-0 transition-all resize-none text-lg shadow-inner"
          placeholder="Paste your text here to convert..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="absolute bottom-6 right-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="secondary" className="rounded-xl shadow-lg" onClick={copyToClipboard} disabled={!text}>
            <Copy className="h-4 w-4 mr-2" /> Copy
          </Button>
          <Button variant="destructive" className="rounded-xl shadow-lg" onClick={clearText} disabled={!text}>
            <Trash2 className="h-4 w-4 mr-2" /> Clear
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button 
          variant="outline" 
          className="h-14 font-bold rounded-2xl border-2 hover:border-primary hover:text-primary transition-all"
          onClick={() => setText(text.toUpperCase())} 
          disabled={!text}
        >
          UPPER CASE
        </Button>
        <Button 
          variant="outline" 
          className="h-14 font-bold rounded-2xl border-2 hover:border-primary hover:text-primary transition-all"
          onClick={() => setText(text.toLowerCase())} 
          disabled={!text}
        >
          lower case
        </Button>
        <Button 
          variant="outline" 
          className="h-14 font-bold rounded-2xl border-2 hover:border-primary hover:text-primary transition-all"
          onClick={toSentenceCase} 
          disabled={!text}
        >
          Sentence case
        </Button>
        <Button 
          variant="outline" 
          className="h-14 font-bold rounded-2xl border-2 hover:border-primary hover:text-primary transition-all"
          onClick={toTitleCase} 
          disabled={!text}
        >
          Title Case
        </Button>
        <Button 
          variant="outline" 
          className="h-14 font-bold rounded-2xl border-2 hover:border-primary hover:text-primary transition-all"
          onClick={toInverseCase} 
          disabled={!text}
        >
          iNVERSE cASE
        </Button>
        <Button 
          variant="outline" 
          className="h-14 font-bold rounded-2xl border-2 hover:border-primary hover:text-primary transition-all"
          onClick={toAlternatingCase} 
          disabled={!text}
        >
          aLtErNaTiNg cAsE
        </Button>
        <Button 
          variant="outline" 
          className="h-14 font-bold rounded-2xl border-2 hover:border-primary hover:text-primary transition-all"
          onClick={() => {
            const result = text.replace(/\s+/g, ' ').trim()
            setText(result)
          }} 
          disabled={!text}
        >
          Remove Extra Spaces
        </Button>
        <Button 
          variant="outline" 
          className="h-14 font-bold rounded-2xl border-2 hover:border-primary hover:text-primary transition-all"
          onClick={() => {
            const result = text.split('\n').map(line => line.trim()).filter(line => line.length > 0).join('\n')
            setText(result)
          }} 
          disabled={!text}
        >
          Strip Empty Lines
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-primary/5 border border-primary/10 space-y-2 text-center">
          <Type className="h-6 w-6 mx-auto text-primary" />
          <h4 className="font-bold">Instant Conversion</h4>
          <p className="text-xs text-muted-foreground">Your text is converted immediately as you click the buttons.</p>
        </div>
        <div className="p-6 rounded-3xl bg-primary/5 border border-primary/10 space-y-2 text-center">
          <ArrowDown className="h-6 w-6 mx-auto text-primary" />
          <h4 className="font-bold">Clean & Fast</h4>
          <p className="text-xs text-muted-foreground">Minimalist interface designed for maximum productivity.</p>
        </div>
        <div className="p-6 rounded-3xl bg-primary/5 border border-primary/10 space-y-2 text-center">
          <Copy className="h-6 w-6 mx-auto text-primary" />
          <h4 className="font-bold">Quick Copy</h4>
          <p className="text-xs text-muted-foreground">One-click copy ensures your converted text is ready to use.</p>
        </div>
      </div>
    </div>
  )
}
