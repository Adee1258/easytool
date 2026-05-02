"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import {
  MessageSquare, Upload, BarChart2, User, Clock,
  Smile, FileText, RefreshCw, AlertCircle, Link, Image
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

// ── WhatsApp message patterns (Android + iOS, 12hr + 24hr) ─────────────────
const MSG_PATTERNS = [
  // Android 24hr: 12/03/2024, 14:30 - Name: msg
  /^(\d{1,2}[\/\.\-]\d{1,2}[\/\.\-]\d{2,4}),?\s+(\d{1,2}:\d{2}(?::\d{2})?)\s+-\s+([^:]+):\s+(.+)$/,
  // Android 12hr: 12/03/2024, 2:30 PM - Name: msg
  /^(\d{1,2}[\/\.\-]\d{1,2}[\/\.\-]\d{2,4}),?\s+(\d{1,2}:\d{2}(?::\d{2})?\s*[AP]M)\s+-\s+([^:]+):\s+(.+)$/i,
  // iOS brackets: [12/03/2024, 14:30:00] Name: msg
  /^\[(\d{1,2}[\/\.\-]\d{1,2}[\/\.\-]\d{2,4}),?\s+(\d{1,2}:\d{2}(?::\d{2})?(?:\s*[AP]M)?)\]\s+([^:]+):\s+(.+)$/i,
  // New Android format: 12/3/24, 2:30 am - Name: msg (lowercase am/pm)
  /^(\d{1,2}[\/\.\-]\d{1,2}[\/\.\-]\d{2,4}),?\s+(\d{1,2}:\d{2}(?::\d{2})?\s*[ap]m)\s+-\s+([^:]+):\s+(.+)$/,
  // Format with en-dash: 12/03/2024, 14:30 – Name: msg
  /^(\d{1,2}[\/\.\-]\d{1,2}[\/\.\-]\d{2,4}),?\s+(\d{1,2}:\d{2}(?::\d{2})?(?:\s*[AP]M)?)\s+[–\-]\s+([^:]+):\s+(.+)$/i,
]

interface Message {
  date: string
  time: string
  sender: string
  text: string
  hour: number
  isMedia: boolean
  hasLink: boolean
}

interface ChatStats {
  messages: number
  participants: Record<string, { count: number; words: number; media: number; emojis: number }>
  hourly: number[]
  weekday: number[]
  daily: Record<string, number>
  emojis: Record<string, number>
  totalWords: number
  totalMedia: number
  totalLinks: number
  firstDate: string
  lastDate: string
  avgPerDay: number
  longestMsg: number
  topWords: [string, number][]
  responseTime: number
}

const EMOJI_RE = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F000}-\u{1F02F}]|[\u{1F0A0}-\u{1F0FF}]/gu

const STOP_WORDS = new Set([
  "the", "and", "for", "that", "this", "with", "have", "from", "they", "will",
  "your", "been", "were", "also", "more", "than", "what", "when", "just", "like",
  "okay", "yeah", "yaar", "bhai", "kya", "hai", "nhi", "hain", "mera", "tera",
  "aur", "nahi", "karo", "kiya", "tha", "thi", "hoga", "hogi", "mein", "tum",
  "hum", "woh", "yeh", "isko", "usko", "kuch", "sab", "agar", "phir", "lekin",
  "but", "not", "are", "was", "has", "had", "its", "our", "can", "all", "one",
  "you", "him", "her", "his", "she", "who", "how", "why", "yes", "no", "ok",
])

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

function getHour(timeStr: string): number {
  const h12 = timeStr.match(/(\d{1,2}):(\d{2})(?::\d{2})?\s*(AM|PM)/i)
  const h24 = timeStr.match(/^(\d{1,2}):(\d{2})/)
  if (h12) {
    let h = parseInt(h12[1]) % 12
    if (h12[3].toUpperCase() === "PM") h += 12
    return h
  }
  if (h24) return parseInt(h24[1])
  return 0
}

function parseChat(text: string): Message[] {
  const lines = text.split(/\r?\n/)
  const messages: Message[] = []
  let current: Message | null = null

  for (const line of lines) {
    if (!line.trim()) continue
    let matched = false

    for (const pattern of MSG_PATTERNS) {
      const m = line.match(pattern)
      if (m) {
        if (current) messages.push(current)
        const msgText = m[4].trim()
        current = {
          date: m[1].trim(),
          time: m[2].trim(),
          sender: m[3].trim(),
          text: msgText,
          hour: getHour(m[2].trim()),
          isMedia: /<Media omitted>|image omitted|video omitted|audio omitted|sticker omitted|GIF omitted|document omitted/i.test(msgText),
          hasLink: /https?:\/\//i.test(msgText),
        }
        matched = true
        break
      }
    }
    if (!matched && current && !line.startsWith("\u200E") && !line.startsWith("\u200F")) {
      current.text += " " + line.trim()
    }
  }
  if (current) messages.push(current)
  return messages.filter(m => m.sender && !m.sender.includes("Messages to this chat"))
}

function computeStats(messages: Message[]): ChatStats {
  const participants: ChatStats["participants"] = {}
  const hourly = new Array(24).fill(0)
  const weekday = new Array(7).fill(0)
  const daily: Record<string, number> = {}
  const emojis: Record<string, number> = {}
  const wordFreq: Record<string, number> = {}
  let totalWords = 0, totalMedia = 0, totalLinks = 0, longestMsg = 0

  for (const msg of messages) {
    // Participant stats
    if (!participants[msg.sender]) {
      participants[msg.sender] = { count: 0, words: 0, media: 0, emojis: 0 }
    }
    participants[msg.sender].count++

    hourly[msg.hour]++
    daily[msg.date] = (daily[msg.date] || 0) + 1

    // Try to get weekday from date
    try {
      const parts = msg.date.split(/[\/\.\-]/)
      if (parts.length === 3) {
        const d = new Date(`${parts[2].length === 2 ? "20" + parts[2] : parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(2, "0")}`)
        if (!isNaN(d.getTime())) weekday[d.getDay()]++
      }
    } catch { }

    if (msg.isMedia) {
      totalMedia++
      participants[msg.sender].media++
      continue
    }
    if (msg.hasLink) totalLinks++

    // Emojis
    const msgEmojis = msg.text.match(EMOJI_RE) || []
    msgEmojis.forEach(e => {
      emojis[e] = (emojis[e] || 0) + 1
      participants[msg.sender].emojis++
    })

    // Words
    const msgWords = msg.text.toLowerCase().match(/\b[a-z\u0600-\u06FF]{2,}\b/g) || []
    totalWords += msgWords.length
    participants[msg.sender].words += msgWords.length
    longestMsg = Math.max(longestMsg, msg.text.length)
    msgWords.forEach(w => {
      if (!STOP_WORDS.has(w) && w.length > 2) {
        wordFreq[w] = (wordFreq[w] || 0) + 1
      }
    })
  }

  const days = Math.max(Object.keys(daily).length, 1)
  const topWords = Object.entries(wordFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12) as [string, number][]

  return {
    messages: messages.length,
    participants,
    hourly,
    weekday,
    daily,
    emojis,
    totalWords,
    totalMedia,
    totalLinks,
    firstDate: messages[0]?.date || "",
    lastDate: messages[messages.length - 1]?.date || "",
    avgPerDay: Math.round(messages.length / days),
    longestMsg,
    topWords,
    responseTime: 0,
  }
}

// ── Component ──────────────────────────────────────────────────────────────
export default function WhatsAppChatAnalyzer() {
  const [stats, setStats] = useState<ChatStats | null>(null)
  const [loading, setLoading] = useState(false)
  const [fileName, setFileName] = useState("")
  const [error, setError] = useState("")
  const [msgCount, setMsgCount] = useState(0)

  const processText = useCallback((text: string, name: string) => {
    const messages = parseChat(text)
    if (messages.length < 3) {
      setError("Could not parse chat. Make sure you exported as .txt or .zip from WhatsApp (without media).")
      setLoading(false)
      return
    }
    setMsgCount(messages.length)
    setStats(computeStats(messages))
    setFileName(name)
    setLoading(false)
    setError("")
    toast.success(`Analyzed ${messages.length.toLocaleString()} messages!`)
  }, [])

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return
    setLoading(true)
    setError("")

    try {
      if (file.name.toLowerCase().endsWith(".zip")) {
        const JSZip = (await import("jszip")).default
        const zip = await JSZip.loadAsync(file)
        const txtFile = Object.values(zip.files).find(f =>
          !f.dir && (f.name.endsWith("_chat.txt") || f.name.endsWith(".txt"))
        )
        if (!txtFile) {
          setError("No chat .txt found in ZIP. Export 'Without Media' from WhatsApp.")
          setLoading(false)
          return
        }
        const text = await txtFile.async("string")
        processText(text, file.name)
      } else {
        const text = await file.text()
        processText(text, file.name)
      }
    } catch (e) {
      setError("Failed to read file. Please try again.")
      setLoading(false)
    }
  }, [processText])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/plain": [".txt"],
      "application/zip": [".zip"],
      "application/x-zip-compressed": [".zip"],
      "application/x-zip": [".zip"],
      "application/octet-stream": [".zip"],
    },
    multiple: false,
    maxSize: 100 * 1024 * 1024,
    // Accept any file - let onDrop handle validation
    validator: (file) => {
      const name = file.name.toLowerCase()
      if (name.endsWith(".zip") || name.endsWith(".txt")) return null
      return { code: "wrong-type", message: "Only .zip or .txt files allowed" }
    }
  })

  const topParticipants = stats
    ? Object.entries(stats.participants).sort((a, b) => b[1].count - a[1].count).slice(0, 6)
    : []
  const topEmojis = stats
    ? Object.entries(stats.emojis).sort((a, b) => b[1] - a[1]).slice(0, 10)
    : []
  const peakHour = stats ? stats.hourly.indexOf(Math.max(...stats.hourly)) : 0
  const peakDay = stats ? stats.weekday.indexOf(Math.max(...stats.weekday)) : 0
  const formatHour = (h: number) =>
    h === 0 ? "12 AM" : h < 12 ? `${h} AM` : h === 12 ? "12 PM" : `${h - 12} PM`

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
      <div className="w-12 h-12 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin" />
      <p className="font-bold text-muted-foreground animate-pulse">Analyzing chat messages...</p>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {!stats ? (
        <div className="space-y-5">
          {/* Upload Zone */}
          <div
            {...getRootProps()}
            className={cn(
              "border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all",
              isDragActive
                ? "border-green-500 bg-green-500/5 scale-[0.99]"
                : "border-border hover:border-green-500/50 hover:bg-muted/30"
            )}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center">
                <MessageSquare className="h-8 w-8 text-green-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Upload WhatsApp Export</h3>
                <p className="text-muted-foreground text-sm">
                  Drag & drop your <strong>.zip</strong> or <strong>.txt</strong> file here
                </p>
              </div>
              <Button
                size="lg"
                className="px-8 h-12 font-bold bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/25"
                type="button"
              >
                <Upload className="mr-2 h-5 w-5" />
                Choose Export File
              </Button>
              <p className="text-xs text-muted-foreground">
                Max 100MB · Supports Android & iPhone exports · 100% private
              </p>
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/8 border border-red-500/20">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* How to Export */}
          <Card className="bg-green-500/5 border-green-500/20">
            <CardContent className="p-5">
              <h4 className="font-bold text-sm mb-4 text-green-700 dark:text-green-400 flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                How to export WhatsApp chat?
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <p className="font-bold text-foreground">📱 Android</p>
                  <ol className="space-y-1 text-muted-foreground">
                    <li>1. Open the chat you want to analyze</li>
                    <li>2. Tap ⋮ (3 dots) → More → Export Chat</li>
                    <li>3. Select <strong>"Without Media"</strong></li>
                    <li>4. Save the ZIP file and upload here</li>
                  </ol>
                </div>
                <div className="space-y-2">
                  <p className="font-bold text-foreground">🍎 iPhone</p>
                  <ol className="space-y-1 text-muted-foreground">
                    <li>1. Open the chat you want to analyze</li>
                    <li>2. Tap contact/group name at top</li>
                    <li>3. Scroll down → Export Chat</li>
                    <li>4. Select <strong>"Without Media"</strong> → Save ZIP</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-5 animate-in fade-in duration-500">
          {/* Header */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h3 className="text-xl font-black flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-green-500" />
                Chat Analysis Complete
              </h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                {fileName} · {stats.firstDate} → {stats.lastDate}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => { setStats(null); setFileName(""); setError("") }}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Analyze Another
            </Button>
          </div>

          {/* Key Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Total Messages", value: stats.messages.toLocaleString(), icon: MessageSquare, color: "text-blue-500", bg: "bg-blue-500/8 border-blue-500/15" },
              { label: "Total Words", value: stats.totalWords.toLocaleString(), icon: FileText, color: "text-violet-500", bg: "bg-violet-500/8 border-violet-500/15" },
              { label: "Media Shared", value: stats.totalMedia.toLocaleString(), icon: Image, color: "text-pink-500", bg: "bg-pink-500/8 border-pink-500/15" },
              { label: "Links Shared", value: stats.totalLinks.toLocaleString(), icon: Link, color: "text-cyan-500", bg: "bg-cyan-500/8 border-cyan-500/15" },
            ].map((s, i) => (
              <Card key={i} className={cn("border", s.bg)}>
                <CardContent className="p-4 text-center space-y-1.5">
                  <s.icon className={cn("h-5 w-5 mx-auto", s.color)} />
                  <p className="text-2xl font-black">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* More Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Avg/Day", value: stats.avgPerDay, suffix: "msgs" },
              { label: "Participants", value: Object.keys(stats.participants).length, suffix: "people" },
              { label: "Peak Hour", value: formatHour(peakHour), suffix: "" },
              { label: "Peak Day", value: WEEKDAYS[peakDay], suffix: "" },
            ].map((s, i) => (
              <div key={i} className="p-4 rounded-xl bg-muted/40 border border-border/60 text-center">
                <p className="text-xl font-black">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Participants */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                Participants ({Object.keys(stats.participants).length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {topParticipants.map(([name, data], i) => {
                const pct = Math.round((data.count / stats.messages) * 100)
                const colors = ["bg-blue-500", "bg-violet-500", "bg-green-500", "bg-amber-500", "bg-pink-500", "bg-cyan-500"]
                return (
                  <div key={name} className="space-y-1.5">
                    <div className="flex justify-between items-center text-sm flex-wrap gap-2">
                      <span className="font-semibold truncate max-w-[180px]">{i + 1}. {name}</span>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground flex-shrink-0">
                        <span>{data.count.toLocaleString()} msgs</span>
                        <span>{data.words.toLocaleString()} words</span>
                        {data.media > 0 && <span>{data.media} media</span>}
                        <span className="font-bold text-foreground">{pct}%</span>
                      </div>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className={cn("h-full rounded-full transition-all duration-700", colors[i % colors.length])}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Hourly Activity Chart */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                Activity by Hour · Most active: {formatHour(peakHour)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-0.5 h-24 mb-2">
                {stats.hourly.map((count, h) => {
                  const max = Math.max(...stats.hourly, 1)
                  const height = (count / max) * 100
                  return (
                    <div key={h} className="flex-1 flex flex-col items-center group relative">
                      <div
                        className={cn(
                          "w-full rounded-t-sm transition-all duration-500",
                          h === peakHour ? "bg-green-500" : "bg-green-500/30 group-hover:bg-green-500/60"
                        )}
                        style={{ height: `${Math.max(height, 2)}%` }}
                      />
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-10 pointer-events-none">
                        {formatHour(h)}: {count}
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>12 AM</span><span>4 AM</span><span>8 AM</span>
                <span>12 PM</span><span>4 PM</span><span>8 PM</span><span>11 PM</span>
              </div>
            </CardContent>
          </Card>

          {/* Weekday Activity */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <BarChart2 className="h-4 w-4 text-primary" />
                Activity by Day · Most active: {WEEKDAYS[peakDay]}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2 h-20">
                {stats.weekday.map((count, d) => {
                  const max = Math.max(...stats.weekday, 1)
                  const height = (count / max) * 100
                  return (
                    <div key={d} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className={cn(
                          "w-full rounded-t-sm transition-all duration-500",
                          d === peakDay ? "bg-violet-500" : "bg-violet-500/30"
                        )}
                        style={{ height: `${Math.max(height, 4)}%` }}
                      />
                      <span className="text-[10px] text-muted-foreground">{WEEKDAYS[d]}</span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Emojis + Top Words */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Smile className="h-4 w-4 text-primary" />
                  Top Emojis ({Object.keys(stats.emojis).length} unique)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {topEmojis.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {topEmojis.map(([emoji, count]) => (
                      <div key={emoji} className="flex flex-col items-center gap-0.5 p-2.5 rounded-xl bg-muted/50 border border-border/60 min-w-[52px]">
                        <span className="text-3xl leading-none">{emoji}</span>
                        <span className="text-xs font-bold text-muted-foreground">{count}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No emojis found in this chat</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  Most Used Words
                </CardTitle>
              </CardHeader>
              <CardContent>
                {stats.topWords.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {stats.topWords.map(([word, count], i) => (
                      <Badge
                        key={word}
                        variant="secondary"
                        className={cn(
                          "text-xs",
                          i === 0 ? "bg-primary/15 text-primary border-primary/25" : ""
                        )}
                      >
                        {word}
                        <span className="ml-1.5 opacity-60">×{count}</span>
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No frequent words found</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Fun Facts */}
          <Card className="bg-gradient-to-br from-green-500/5 to-emerald-500/5 border-green-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">🎉 Chat Fun Facts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { label: "Most Active", value: topParticipants[0]?.[0] || "N/A", sub: `${topParticipants[0]?.[1].count || 0} messages` },
                  { label: "Longest Message", value: `${stats.longestMsg} chars`, sub: "Single message" },
                  { label: "Avg Words/Msg", value: Math.round(stats.totalWords / Math.max(stats.messages, 1)).toString(), sub: "Per message" },
                  { label: "Most Used Emoji", value: topEmojis[0]?.[0] || "None", sub: `${topEmojis[0]?.[1] || 0} times` },
                  { label: "Total Days", value: Object.keys(stats.daily).length.toString(), sub: "Chat duration" },
                  { label: "Top Word", value: stats.topWords[0]?.[0] || "N/A", sub: `${stats.topWords[0]?.[1] || 0} times` },
                ].map((fact, i) => (
                  <div key={i} className="p-3 rounded-xl bg-background/60 border border-border/60 text-center">
                    <p className="text-lg font-black truncate">{fact.value}</p>
                    <p className="text-xs font-semibold text-foreground">{fact.label}</p>
                    <p className="text-[11px] text-muted-foreground">{fact.sub}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
