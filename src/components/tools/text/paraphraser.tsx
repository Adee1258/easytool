"use client"

import { useState } from "react"
import { RefreshCw, Copy, Trash2, Languages, Wand2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

const MODES = [
  { id: "formal", name: "Formal", description: "Makes the text sound more professional." },
  { id: "casual", name: "Casual", description: "Makes the text sound more friendly and relaxed." },
  { id: "creative", name: "Creative", description: "Adds more descriptive words and variety." },
  { id: "shorten", name: "Shorten", description: "Removes unnecessary words to make it concise." },
  { id: "expand", name: "Expand", description: "Adds more detail and explanation." },
]

export default function Paraphraser() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [mode, setMode] = useState("formal")
  const [isProcessing, setIsProcessing] = useState(false)

  const paraphrase = () => {
    if (!inputText.trim()) {
      toast.error("Please enter some text")
      return
    }

    setIsProcessing(true)
    
    // Simulate processing delay
    setTimeout(() => {
      let result = inputText.trim()
      
      // Basic rule-based transformations (simulating paraphrasing)
      const transformations: Record<string, [RegExp, string][]> = {
        formal: [
          [/\b(get|buy)\b/gi, "purchase"],
          [/\b(help)\b/gi, "assist"],
          [/\b(check)\b/gi, "verify"],
          [/\b(fix)\b/gi, "rectify"],
          [/\b(so)\b/gi, "consequently"],
          [/\b(but)\b/gi, "however"],
          [/\b(maybe)\b/gi, "perhaps"],
        ],
        casual: [
          [/\b(purchase)\b/gi, "buy"],
          [/\b(assist)\b/gi, "help"],
          [/\b(verify)\b/gi, "check"],
          [/\b(rectify)\b/gi, "fix"],
          [/\b(consequently)\b/gi, "so"],
          [/\b(however)\b/gi, "but"],
          [/\b(perhaps)\b/gi, "maybe"],
        ],
        creative: [
          [/\b(good)\b/gi, "excellent"],
          [/\b(bad)\b/gi, "unpleasant"],
          [/\b(happy)\b/gi, "delighted"],
          [/\b(sad)\b/gi, "melancholy"],
          [/\b(big)\b/gi, "immense"],
          [/\b(small)\b/gi, "minuscule"],
        ],
      }

      const rules = transformations[mode] || []
      rules.forEach(([regex, replacement]) => {
        result = result.replace(regex, replacement)
      })

      // If shorten, remove some common filler words
      if (mode === "shorten") {
        result = result.replace(/\b(actually|basically|really|very|just|definitely|literally)\b/gi, "")
        result = result.replace(/\s+/g, " ").trim()
      }

      // If expand, add some descriptive fillers
      if (mode === "expand") {
        result = result.replace(/\b(i think)\b/gi, "In my professional opinion, I believe that")
        result = result.replace(/\b(important)\b/gi, "critically important and essential")
      }

      setOutputText(result)
      setIsProcessing(false)
      toast.success("Text paraphrased!")
    }, 800)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText)
    toast.success("Copied to clipboard!")
  }

  const clear = () => {
    setInputText("")
    setOutputText("")
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-lg font-bold">Input Text</Label>
            <span className="text-xs text-muted-foreground">{inputText.length} characters</span>
          </div>
          <Textarea
            placeholder="Paste your text here..."
            className="min-h-[400px] text-lg p-6 rounded-2xl border-2 focus:ring-primary"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-lg font-bold">Paraphrased Text</Label>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={copyToClipboard} disabled={!outputText}>
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={clear}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
          <div className="min-h-[400px] text-lg p-6 rounded-2xl border-2 bg-muted/30 whitespace-pre-wrap relative">
            {outputText || <span className="text-muted-foreground italic">Paraphrased text will appear here...</span>}
            {isProcessing && (
              <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center rounded-2xl">
                <RefreshCw className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}
          </div>
        </div>
      </div>

      <Card className="border-2 shadow-lg overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="flex flex-wrap gap-2 justify-center">
              {MODES.map((m) => (
                <Button
                  key={m.id}
                  variant={mode === m.id ? "default" : "outline"}
                  onClick={() => setMode(m.id)}
                  className="rounded-full"
                >
                  {m.name}
                </Button>
              ))}
            </div>
            
            <Button size="lg" onClick={paraphrase} disabled={isProcessing} className="gap-2 px-12 h-14 text-lg font-bold shadow-xl hover:shadow-2xl transition-all">
              {isProcessing ? <RefreshCw className="h-6 w-6 animate-spin" /> : <Wand2 className="h-6 w-6" />}
              Paraphrase Now
            </Button>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            {MODES.find(m => m.id === mode)?.description}
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t">
        <div className="space-y-2">
          <h4 className="font-bold flex items-center gap-2">
            <Languages className="h-4 w-4 text-primary" /> Smart Rewriting
          </h4>
          <p className="text-sm text-muted-foreground">Change the tone and style of your writing while keeping the original meaning.</p>
        </div>
        <div className="space-y-2">
          <h4 className="font-bold flex items-center gap-2">
            <ArrowRight className="h-4 w-4 text-primary" /> Multiple Modes
          </h4>
          <p className="text-sm text-muted-foreground">Choose from Formal, Casual, Creative, and more to suit your needs.</p>
        </div>
        <div className="space-y-2">
          <h4 className="font-bold flex items-center gap-2">
            <Wand2 className="h-4 w-4 text-primary" /> 100% Private
          </h4>
          <p className="text-sm text-muted-foreground">All processing happens in your browser. Your text is never sent to any server.</p>
        </div>
      </div>
    </div>
  )
}
