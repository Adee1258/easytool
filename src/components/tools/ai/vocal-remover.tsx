"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import {
  Mic2, Upload, Music, Download, Play, Pause,
  Square, Loader2, Info, CheckCircle2, Volume2,
  VolumeX, Sliders, AlertCircle, Headphones
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

// ── Types ──────────────────────────────────────────────────────────────────
type ProcessingState = "idle" | "loading" | "processing" | "done" | "error"
type TrackType = "instrumental" | "vocals"

interface AudioTrack {
  type: TrackType
  blob: Blob
  url: string
  label: string
  description: string
  icon: typeof Music
  color: string
}

// ── Mid-Side Vocal Removal Engine ──────────────────────────────────────────
async function processAudio(
  file: File,
  vocalReduction: number, // 0-1
  onProgress: (p: number) => void
): Promise<{ instrumental: Blob; vocals: Blob }> {

  const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
  onProgress(10)

  // Decode audio
  const arrayBuffer = await file.arrayBuffer()
  onProgress(25)
  const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer)
  onProgress(40)

  const sampleRate = audioBuffer.sampleRate
  const length = audioBuffer.length

  // Get channels - if mono, duplicate
  const leftChannel = audioBuffer.numberOfChannels > 0
    ? audioBuffer.getChannelData(0)
    : new Float32Array(length)
  const rightChannel = audioBuffer.numberOfChannels > 1
    ? audioBuffer.getChannelData(1)
    : leftChannel

  onProgress(55)

  // ── Mid-Side Processing ──
  // Mid = (L + R) / 2  → contains vocals (center-panned)
  // Side = (L - R) / 2 → contains instruments (stereo)
  const instrumentalLeft = new Float32Array(length)
  const instrumentalRight = new Float32Array(length)
  const vocalLeft = new Float32Array(length)
  const vocalRight = new Float32Array(length)

  const reduction = vocalReduction // how much to reduce vocals

  for (let i = 0; i < length; i++) {
    const L = leftChannel[i]
    const R = rightChannel[i]

    // Mid (vocals) and Side (instruments)
    const mid = (L + R) * 0.5
    const sideL = L - mid
    const sideR = R - mid

    // Instrumental: keep sides, reduce mid
    instrumentalLeft[i] = sideL + mid * (1 - reduction)
    instrumentalRight[i] = sideR + mid * (1 - reduction)

    // Vocals: keep mid, reduce sides
    vocalLeft[i] = mid + sideL * (1 - reduction)
    vocalRight[i] = mid + sideR * (1 - reduction)
  }

  onProgress(75)

  // Create output buffers
  const instrumentalBuffer = audioCtx.createBuffer(2, length, sampleRate)
  instrumentalBuffer.copyToChannel(instrumentalLeft, 0)
  instrumentalBuffer.copyToChannel(instrumentalRight, 1)

  const vocalBuffer = audioCtx.createBuffer(2, length, sampleRate)
  vocalBuffer.copyToChannel(vocalLeft, 0)
  vocalBuffer.copyToChannel(vocalRight, 1)

  onProgress(85)

  // Encode to WAV
  const instrumentalBlob = audioBufferToWav(instrumentalBuffer)
  const vocalBlob = audioBufferToWav(vocalBuffer)

  onProgress(100)
  audioCtx.close()

  return { instrumental: instrumentalBlob, vocals: vocalBlob }
}

// ── WAV Encoder ────────────────────────────────────────────────────────────
function audioBufferToWav(buffer: AudioBuffer): Blob {
  const numChannels = buffer.numberOfChannels
  const sampleRate = buffer.sampleRate
  const length = buffer.length
  const bitsPerSample = 16
  const blockAlign = numChannels * (bitsPerSample / 8)
  const byteRate = sampleRate * blockAlign
  const dataSize = length * blockAlign
  const bufferSize = 44 + dataSize

  const arrayBuffer = new ArrayBuffer(bufferSize)
  const view = new DataView(arrayBuffer)

  // WAV Header
  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i))
  }

  writeString(0, "RIFF")
  view.setUint32(4, bufferSize - 8, true)
  writeString(8, "WAVE")
  writeString(12, "fmt ")
  view.setUint32(16, 16, true)
  view.setUint16(20, 1, true) // PCM
  view.setUint16(22, numChannels, true)
  view.setUint32(24, sampleRate, true)
  view.setUint32(28, byteRate, true)
  view.setUint16(32, blockAlign, true)
  view.setUint16(34, bitsPerSample, true)
  writeString(36, "data")
  view.setUint32(40, dataSize, true)

  // Write samples (interleaved)
  let offset = 44
  for (let i = 0; i < length; i++) {
    for (let ch = 0; ch < numChannels; ch++) {
      const sample = Math.max(-1, Math.min(1, buffer.getChannelData(ch)[i]))
      view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true)
      offset += 2
    }
  }

  return new Blob([arrayBuffer], { type: "audio/wav" })
}

// ── Component ──────────────────────────────────────────────────────────────
export default function VocalRemover() {
  const [file, setFile] = useState<File | null>(null)
  const [state, setState] = useState<ProcessingState>("idle")
  const [progress, setProgress] = useState(0)
  const [tracks, setTracks] = useState<AudioTrack[]>([])
  const [vocalReduction, setVocalReduction] = useState(0.85)
  const [playingTrack, setPlayingTrack] = useState<TrackType | null>(null)
  const [originalPlaying, setOriginalPlaying] = useState(false)
  const [originalUrl, setOriginalUrl] = useState<string | null>(null)

  const audioRefs = useRef<Record<string, HTMLAudioElement>>({})

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const f = acceptedFiles[0]
    if (!f) return
    setFile(f)
    setTracks([])
    setState("idle")
    setProgress(0)
    setOriginalUrl(URL.createObjectURL(f))
    toast.success(`"${f.name}" loaded!`)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "audio/*": [".mp3", ".wav", ".ogg", ".m4a", ".flac", ".aac"] },
    multiple: false,
    maxSize: 50 * 1024 * 1024, // 50MB
  })

  const handleProcess = async () => {
    if (!file) return
    setState("processing")
    setProgress(0)

    try {
      const { instrumental, vocals } = await processAudio(
        file,
        vocalReduction,
        (p) => setProgress(p)
      )

      const newTracks: AudioTrack[] = [
        {
          type: "instrumental",
          blob: instrumental,
          url: URL.createObjectURL(instrumental),
          label: "Instrumental / Music",
          description: "Background music with vocals reduced",
          icon: Music,
          color: "blue",
        },
        {
          type: "vocals",
          blob: vocals,
          url: URL.createObjectURL(vocals),
          label: "Vocals / Voice",
          description: "Isolated vocal track",
          icon: Mic2,
          color: "violet",
        },
      ]

      setTracks(newTracks)
      setState("done")
      toast.success("Processing complete! Both tracks are ready.")
    } catch (err) {
      console.error(err)
      setState("error")
      toast.error("Processing failed. Try a different audio file.")
    }
  }

  const togglePlay = (trackType: TrackType, url: string) => {
    const audio = audioRefs.current[trackType]
    if (!audio) return

    if (playingTrack === trackType) {
      audio.pause()
      setPlayingTrack(null)
    } else {
      // Stop all others
      Object.values(audioRefs.current).forEach(a => a.pause())
      if (audioRefs.current["original"]) audioRefs.current["original"].pause()
      setOriginalPlaying(false)
      audio.play()
      setPlayingTrack(trackType)
    }
  }

  const toggleOriginal = () => {
    const audio = audioRefs.current["original"]
    if (!audio) return
    if (originalPlaying) {
      audio.pause()
      setOriginalPlaying(false)
    } else {
      Object.values(audioRefs.current).forEach(a => a.pause())
      setPlayingTrack(null)
      audio.play()
      setOriginalPlaying(true)
    }
  }

  const downloadTrack = (track: AudioTrack) => {
    const ext = file?.name.split(".").pop() || "wav"
    const link = document.createElement("a")
    link.href = track.url
    link.download = `${track.type}-${file?.name.replace(/\.[^.]+$/, "")}-easytool.wav`
    link.click()
    toast.success(`${track.label} downloaded!`)
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`
  }

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60)
    return `${m}:${s.toString().padStart(2, "0")}`
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* Upload */}
      {!file ? (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all",
            isDragActive
              ? "border-primary bg-primary/5 scale-[0.99]"
              : "border-border hover:border-primary/50 hover:bg-muted/30"
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-violet-500/10 flex items-center justify-center">
              <Mic2 className="h-8 w-8 text-violet-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">Upload Audio File</h3>
              <p className="text-muted-foreground text-sm">MP3, WAV, OGG, M4A, FLAC — Max 50MB</p>
            </div>
            <Button size="lg" className="px-8 h-12 font-bold" type="button">
              <Upload className="mr-2 h-5 w-5" />
              Choose Audio File
            </Button>
            <p className="text-xs text-muted-foreground">
              💡 Works best with stereo recordings where vocals are center-panned
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-5">

          {/* File Info + Original Player */}
          <Card className="border-2 border-border">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                  <Music className="h-6 w-6 text-violet-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold truncate">{file.name}</p>
                  <p className="text-sm text-muted-foreground">{formatSize(file.size)} · {file.type.split("/")[1]?.toUpperCase()}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => { setFile(null); setTracks([]); setState("idle") }}
                  className="text-muted-foreground flex-shrink-0"
                >
                  Change
                </Button>
              </div>

              {/* Original Audio Player */}
              {originalUrl && (
                <div className="mt-4 pt-4 border-t border-border/50">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 flex-shrink-0"
                      onClick={toggleOriginal}
                    >
                      {originalPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-muted-foreground mb-1">Original Track</p>
                      <audio
                        ref={el => { if (el) audioRefs.current["original"] = el }}
                        src={originalUrl}
                        onEnded={() => setOriginalPlaying(false)}
                        className="w-full h-8"
                        controls
                      />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Settings */}
          {state !== "done" && (
            <Card className="border border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Sliders className="h-4 w-4 text-primary" />
                  Vocal Reduction Strength
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Reduction: <strong>{Math.round(vocalReduction * 100)}%</strong></span>
                    <span className={cn(
                      "text-xs font-semibold px-2 py-0.5 rounded-full",
                      vocalReduction >= 0.8 ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                        vocalReduction >= 0.6 ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" :
                          "bg-muted text-muted-foreground"
                    )}>
                      {vocalReduction >= 0.85 ? "Maximum" : vocalReduction >= 0.7 ? "High" : vocalReduction >= 0.5 ? "Medium" : "Low"}
                    </span>
                  </div>
                  <Slider
                    value={[Math.round(vocalReduction * 100)]}
                    min={30}
                    max={100}
                    step={5}
                    onValueChange={v => setVocalReduction(v[0] / 100)}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>30% — Keep some vocals</span>
                    <span>100% — Maximum removal</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-amber-500/8 border border-amber-500/20">
                  <p className="text-xs text-amber-700 dark:text-amber-400 flex items-start gap-2">
                    <Info className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>How it works:</strong> Uses Mid-Side audio processing to separate center-panned vocals from stereo instruments.
                      Works best on professionally mixed stereo tracks. Results vary by song.
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Process Button */}
          {state !== "done" && (
            <Button
              onClick={handleProcess}
              className="w-full h-14 text-lg font-bold shadow-lg shadow-primary/25"
              disabled={state === "processing"}
            >
              {state === "processing" ? (
                <span className="flex items-center gap-3">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Processing... {progress}%
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Headphones className="h-5 w-5" />
                  Separate Vocals & Music
                </span>
              )}
            </Button>
          )}

          {/* Progress Bar */}
          {state === "processing" && (
            <div className="space-y-2">
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-center text-muted-foreground">
                {progress < 30 ? "Loading audio file..." :
                  progress < 60 ? "Analyzing audio channels..." :
                    progress < 85 ? "Separating vocals from music..." :
                      "Encoding output tracks..."}
              </p>
            </div>
          )}

          {/* Results */}
          {state === "done" && tracks.length > 0 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-green-500/8 border border-green-500/20">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                <p className="text-sm font-semibold text-green-700 dark:text-green-400">
                  Processing complete! Both tracks are ready to preview and download.
                </p>
              </div>

              {tracks.map(track => (
                <Card key={track.type} className={cn(
                  "border-2 overflow-hidden",
                  track.color === "blue" ? "border-blue-500/20" : "border-violet-500/20"
                )}>
                  <CardContent className="p-5 space-y-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center",
                          track.color === "blue" ? "bg-blue-500/10" : "bg-violet-500/10"
                        )}>
                          <track.icon className={cn(
                            "h-5 w-5",
                            track.color === "blue" ? "text-blue-500" : "text-violet-500"
                          )} />
                        </div>
                        <div>
                          <p className="font-bold text-sm">{track.label}</p>
                          <p className="text-xs text-muted-foreground">{track.description}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs flex-shrink-0">
                        {formatSize(track.blob.size)} · WAV
                      </Badge>
                    </div>

                    {/* Audio Player */}
                    <audio
                      ref={el => { if (el) audioRefs.current[track.type] = el }}
                      src={track.url}
                      onEnded={() => setPlayingTrack(null)}
                      className="w-full h-10"
                      controls
                    />

                    {/* Download Button */}
                    <Button
                      onClick={() => downloadTrack(track)}
                      className={cn(
                        "w-full h-12 font-bold text-white shadow-lg",
                        track.color === "blue"
                          ? "bg-blue-600 hover:bg-blue-700 shadow-blue-600/25"
                          : "bg-violet-600 hover:bg-violet-700 shadow-violet-600/25"
                      )}
                    >
                      <Download className="mr-2 h-5 w-5" />
                      Download {track.label}
                    </Button>
                  </CardContent>
                </Card>
              ))}

              {/* Process Again */}
              <Button
                variant="outline"
                onClick={() => { setTracks([]); setState("idle") }}
                className="w-full h-11 font-semibold"
              >
                <Sliders className="mr-2 h-4 w-4" />
                Adjust Settings & Reprocess
              </Button>
            </div>
          )}

          {/* Error */}
          {state === "error" && (
            <div className="p-4 rounded-xl bg-red-500/8 border border-red-500/20 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm text-red-700 dark:text-red-400">Processing Failed</p>
                <p className="text-xs text-muted-foreground mt-1">
                  This can happen with DRM-protected files or unusual audio formats. Try a different file.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Info Card */}
      <Card className="bg-muted/30 border-border/60">
        <CardContent className="p-5">
          <h4 className="font-bold text-sm mb-3 flex items-center gap-2">
            <Info className="h-4 w-4 text-primary" />
            How Vocal Separation Works
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { icon: "🎵", title: "Upload Song", desc: "Any stereo MP3, WAV, or audio file" },
              { icon: "⚙️", title: "Mid-Side Processing", desc: "Separates center vocals from stereo instruments" },
              { icon: "⬇️", title: "Download Both", desc: "Get instrumental track + vocal track" },
            ].map((item, i) => (
              <div key={i} className="text-center p-3 rounded-xl bg-background border border-border/60">
                <div className="text-2xl mb-2">{item.icon}</div>
                <p className="font-bold text-xs">{item.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3 text-center">
            ⚡ 100% browser-based · No upload to servers · Files stay on your device
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
