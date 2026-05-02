"use client"

import { useState, useEffect } from "react"
import { Play, Pause, Square, Volume2, Download, Settings2, Trash2, Languages, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"

export default function TextToSpeech() {
  const [text, setText] = useState("")
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [selectedVoice, setSelectedVoice] = useState<string>("")
  const [rate, setRate] = useState(1)
  const [pitch, setPitch] = useState(1)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  const downloadMP3 = () => {
    setIsDownloading(true)
    toast.info("MP3 download feature coming soon!")
    setTimeout(() => setIsDownloading(false), 1500)
  }

  useEffect(() => {
    const synth = window.speechSynthesis
    const updateVoices = () => {
      const availableVoices = synth.getVoices()
      setVoices(availableVoices)
      if (availableVoices.length > 0 && !selectedVoice) {
        setSelectedVoice(availableVoices[0].name)
      }
    }

    updateVoices()
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = updateVoices
    }

    return () => {
      synth.cancel()
    }
  }, [])

  const speak = () => {
    if (!text.trim()) return toast.error("Please enter some text")

    const synth = window.speechSynthesis
    if (isPaused) {
      synth.resume()
      setIsPaused(false)
      setIsSpeaking(true)
      return
    }

    synth.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    const voice = voices.find(v => v.name === selectedVoice)
    if (voice) utterance.voice = voice
    utterance.rate = rate
    utterance.pitch = pitch

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => {
      setIsSpeaking(false)
      setIsPaused(false)
    }
    utterance.onerror = () => {
      setIsSpeaking(false)
      setIsPaused(false)
    }

    synth.speak(utterance)
  }

  const pause = () => {
    window.speechSynthesis.pause()
    setIsPaused(true)
    setIsSpeaking(false)
  }

  const stop = () => {
    window.speechSynthesis.cancel()
    setIsSpeaking(false)
    setIsPaused(false)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-lg font-semibold flex items-center gap-2">
            <Languages className="h-5 w-5 text-primary" /> Enter Your Text
          </Label>
          <Button variant="ghost" size="sm" onClick={() => setText("")} className="text-destructive h-8 gap-1">
            <Trash2 className="h-4 w-4" /> Clear
          </Button>
        </div>
        <textarea
          className="w-full h-[300px] p-6 text-lg border-2 border-primary/10 rounded-2xl bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none shadow-inner"
          placeholder="Type or paste your content here to convert it into a natural sounding voice..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex justify-end text-sm text-muted-foreground">
          {text.length} characters | {text.split(/\s+/).filter(Boolean).length} words
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Volume2 className="h-4 w-4" /> Select Voice
                </Label>
                <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a voice" />
                  </SelectTrigger>
                  <SelectContent>
                    {voices.map((voice) => (
                      <SelectItem key={voice.name} value={voice.name}>
                        {voice.name} ({voice.lang})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end gap-3">
                {!isSpeaking || isPaused ? (
                  <Button onClick={speak} size="lg" className="flex-1 h-12 gap-2 bg-primary hover:bg-primary/90">
                    <Play className="h-5 w-5 fill-current" /> {isPaused ? "Resume" : "Start Speaking"}
                  </Button>
                ) : (
                  <Button onClick={pause} size="lg" variant="secondary" className="flex-1 h-12 gap-2">
                    <Pause className="h-5 w-5 fill-current" /> Pause
                  </Button>
                )}
                <Button onClick={stop} size="lg" variant="outline" className="h-12 w-12 p-0" disabled={!isSpeaking && !isPaused}>
                  <Square className="h-5 w-5 fill-current" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Speed (Rate)</Label>
                  <span className="text-sm font-bold text-primary">{rate}x</span>
                </div>
                <Slider
                  value={[rate]}
                  min={0.5}
                  max={2}
                  step={0.1}
                  onValueChange={(val) => setRate(val[0])}
                />
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Pitch</Label>
                  <span className="text-sm font-bold text-primary">{pitch}</span>
                </div>
                <Slider
                  value={[pitch]}
                  min={0.5}
                  max={2}
                  step={0.1}
                  onValueChange={(val) => setPitch(val[0])}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6 space-y-4">
            <h4 className="font-bold flex items-center gap-2">
              <Settings2 className="h-5 w-5" /> Voice Settings
            </h4>
            <p className="text-sm text-muted-foreground">
              Adjust the speed and pitch to find the perfect tone for your content. Great for YouTube videos, podcasts, and accessibility.
            </p>
            <div className="pt-4 space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span>Browser Based (Privacy)</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span>Multiple Languages</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span>Unlimited Usage</span>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full mt-4 gap-2"
              onClick={downloadMP3}
              disabled={isDownloading || !text.trim()}
            >
              {isDownloading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              {isDownloading ? "Generating..." : "Download MP3"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
