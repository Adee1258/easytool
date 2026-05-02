"use client"

import { useState, useRef, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Mic2, Upload, Music, Info, ExternalLink, Play, Pause, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function VocalRemover() {
  const [file, setFile] = useState<File | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const f = acceptedFiles[0]
    if (!f) return
    setFile(f)
    setAudioUrl(URL.createObjectURL(f))
    setIsPlaying(false)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "audio/*": [".mp3", ".wav", ".ogg", ".m4a", ".flac"] },
    multiple: false,
  })

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {!file ? (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-3xl p-16 text-center cursor-pointer transition-all",
            isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/20 hover:border-primary/50 hover:bg-muted/50"
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-5">
            <div className="p-5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600">
              <Mic2 className="h-12 w-12" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Upload Audio File</h3>
              <p className="text-muted-foreground">MP3, WAV, OGG, M4A, FLAC supported</p>
            </div>
            <Button size="lg" className="px-8">
              <Upload className="mr-2 h-5 w-5" /> Select Audio
            </Button>
          </div>
        </div>
      ) : (
        <Card className="border-2 border-primary/10">
          <CardContent className="p-8 space-y-6">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
              <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600">
                <Music className="h-6 w-6" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold truncate">{file.name}</p>
                <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <Button variant="ghost" size="sm" onClick={togglePlay} className="flex-shrink-0">
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
            </div>

            {audioUrl && (
              <audio
                ref={audioRef}
                src={audioUrl}
                onEnded={() => setIsPlaying(false)}
                className="w-full"
                controls
              />
            )}

            <Button variant="outline" className="w-full" onClick={() => { setFile(null); setAudioUrl(null) }}>
              Change File
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Info about vocal removal */}
      <Card className="bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800">
        <CardContent className="p-6 space-y-4">
          <h4 className="font-bold text-purple-800 dark:text-purple-300 flex items-center gap-2">
            <Info className="h-5 w-5" /> About Vocal Removal
          </h4>
          <p className="text-sm text-purple-700 dark:text-purple-400">
            True AI vocal separation requires heavy server-side processing (like Spleeter or Demucs models).
            For the best results, we recommend these free professional tools:
          </p>
          <div className="space-y-3">
            {[
              { name: "Lalal.ai", desc: "Best quality AI vocal remover — 10 min free", url: "https://www.lalal.ai" },
              { name: "Moises.ai", desc: "Professional stem separation — free tier available", url: "https://moises.ai" },
              { name: "Vocal Remover (vocalremover.org)", desc: "100% free, browser-based", url: "https://vocalremover.org" },
            ].map((tool) => (
              <a
                key={tool.name}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 hover:border-purple-400 transition-all group"
              >
                <div>
                  <p className="font-bold text-sm text-purple-800 dark:text-purple-300">{tool.name}</p>
                  <p className="text-xs text-purple-600 dark:text-purple-400">{tool.desc}</p>
                </div>
                <ExternalLink className="h-4 w-4 text-purple-500 group-hover:text-purple-700 flex-shrink-0" />
              </a>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h4 className="font-bold mb-3 flex items-center gap-2">
            <Volume2 className="h-5 w-5 text-primary" /> How Vocal Removal Works
          </h4>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>AI vocal removers use deep learning models trained on thousands of songs to separate audio into stems:</p>
            <div className="grid grid-cols-2 gap-3">
              {["🎤 Vocals", "🥁 Drums", "🎸 Bass", "🎹 Other Instruments"].map(stem => (
                <div key={stem} className="p-3 rounded-xl bg-muted/50 font-medium text-foreground">{stem}</div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
