"use client"

import { useState, useEffect, useRef } from "react"
import { Mic, MicOff, Copy, Trash2, Download, RefreshCw, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

const LANGUAGES = [
  { code: "en-US", name: "English (US)" },
  { code: "en-GB", name: "English (UK)" },
  { code: "es-ES", name: "Spanish" },
  { code: "fr-FR", name: "French" },
  { code: "de-DE", name: "German" },
  { code: "it-IT", name: "Italian" },
  { code: "hi-IN", name: "Hindi" },
  { code: "ur-PK", name: "Urdu" },
]

export default function SpeechToText() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [interimTranscript, setInterimTranscript] = useState("")
  const [language, setLanguage] = useState("en-US")
  const [isSupported, setIsSupported] = useState(true)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) {
      setIsSupported(false)
      return
    }

    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = language

    recognition.onresult = (event: any) => {
      let interim = ""
      let final = ""

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript
        } else {
          interim += event.results[i][0].transcript
        }
      }

      if (final) {
        setTranscript((prev) => prev + " " + final)
      }
      setInterimTranscript(interim)
    }

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error)
      if (event.error === "not-allowed") {
        toast.error("Microphone access denied")
      } else {
        toast.error(`Error: ${event.error}`)
      }
      setIsListening(false)
    }

    recognition.onend = () => {
      if (isListening) {
        recognition.start() // Auto-restart if we're supposed to be listening
      }
    }

    recognitionRef.current = recognition

    return () => {
      recognition.stop()
    }
  }, [language, isListening])

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
    } else {
      setInterimTranscript("")
      recognitionRef.current?.start()
      setIsListening(true)
      toast.info("Microphone is on. Speak now.")
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(transcript)
    toast.success("Transcript copied to clipboard!")
  }

  const downloadTranscript = () => {
    const blob = new Blob([transcript], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "transcript.txt"
    link.click()
    toast.success("Transcript downloaded!")
  }

  const clearTranscript = () => {
    setTranscript("")
    setInterimTranscript("")
    toast.info("Transcript cleared")
  }

  if (!isSupported) {
    return (
      <div className="text-center p-12 border-2 border-dashed rounded-3xl">
        <MicOff className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2">Speech Recognition Not Supported</h3>
        <p className="text-muted-foreground">
          Your browser does not support the Web Speech API. Please try using Chrome or Edge.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-muted/50 p-4 rounded-2xl border">
        <div className="flex items-center gap-4">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-[200px] h-11">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2 text-sm font-medium">
            <div className={`h-3 w-3 rounded-full ${isListening ? "bg-red-500 animate-pulse" : "bg-muted-foreground"}`} />
            {isListening ? "Listening..." : "Ready"}
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={clearTranscript} title="Clear">
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={copyToClipboard} disabled={!transcript} title="Copy">
            <Copy className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={downloadTranscript} disabled={!transcript} title="Download">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card className="border-2 shadow-xl min-h-[400px] flex flex-col relative overflow-hidden">
        <CardContent className="p-8 flex-1 overflow-y-auto">
          <div className="prose prose-sm max-w-none">
            {transcript ? (
              <p className="whitespace-pre-wrap text-lg leading-relaxed">{transcript}</p>
            ) : !interimTranscript ? (
              <p className="text-muted-foreground italic text-lg">Click the microphone button and start speaking...</p>
            ) : null}
            {interimTranscript && (
              <p className="text-primary/60 text-lg leading-relaxed italic inline">
                {interimTranscript}
              </p>
            )}
          </div>
        </CardContent>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <Button
            size="lg"
            onClick={toggleListening}
            className={`h-20 w-20 rounded-full shadow-2xl transition-all duration-300 ${
              isListening ? "bg-red-500 hover:bg-red-600 scale-110" : ""
            }`}
          >
            {isListening ? <MicOff className="h-10 w-10" /> : <Mic className="h-10 w-10" />}
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t">
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
          <h4 className="font-bold flex items-center gap-2 mb-2">
            <Volume2 className="h-4 w-4 text-primary" /> Real-time
          </h4>
          <p className="text-sm text-muted-foreground">Transcribe your voice into text instantly as you speak.</p>
        </div>
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
          <h4 className="font-bold flex items-center gap-2 mb-2">
            <Volume2 className="h-4 w-4 text-primary" /> Multi-language
          </h4>
          <p className="text-sm text-muted-foreground">Supports multiple languages including English, Urdu, and Hindi.</p>
        </div>
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
          <h4 className="font-bold flex items-center gap-2 mb-2">
            <Volume2 className="h-4 w-4 text-primary" /> Privacy First
          </h4>
          <p className="text-sm text-muted-foreground">Processing happens directly in your browser. No data is stored.</p>
        </div>
      </div>
    </div>
  )
}
