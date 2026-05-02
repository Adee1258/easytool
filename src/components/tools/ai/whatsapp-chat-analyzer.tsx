"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { MessageSquare, Upload, BarChart2, User, Clock, Smile, TrendingUp, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface ChatStats {
  totalMessages: number
  totalWords: number
  participants: Record<string, number>
  topEmojis: [string, number][]
  mostActiveHour: number
  avgWordsPerMsg: number
  firstMessage: string
  lastMessage: string
}

function parseWhatsAppChat(text: string): ChatStats {
  const lines = text.split("\n").filter(Boolean)
  const msgRegex = /^(\d{1,2}\/\d{1,2}\/\d{2,4}),?\s+(\d{1,2}:\d{2}(?::\d{2})?(?:\s?[AP]M)?)\s+-\s+([^:]+):\s+(.+)$/i

  const participants: Record<string, number> = {}
  const hourCounts: Record<number, number> = {}
  const emojiCounts: Record<string, number> = {}
  let totalWords = 0
  let totalMessages = 0
  let firstMessage = ""
  let lastMessage = ""

  const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu

  for (const line of lines) {
    const match = line.match(msgRegex)
    if (!match) continue

    const [, date, time, sender, message] = match
    totalMessages++
    if (!firstMessage) firstMessage = `${date} ${time}`
    lastMessage = `${date} ${time}`

    const senderClean = sender.trim()
    participants[senderClean] = (participants[senderClean] || 0) + 1

    const words = message.trim().split(/\s+/).filter(Boolean)
    totalWords += words.length

    // Hour extraction
    const hourMatch = time.match(/(\d{1,2}):\d{2}/)
    if (hourMatch) {
      let hour = parseInt(hourMatch[1])
      if (time.toLowerCase().includes("pm") && hour !== 12) hour += 12
      if (time.toLowerCase().includes("am") && hour === 12) hour = 0
      hourCounts[hour] = (hourCounts[hour] || 0) + 1
    }

    // Emoji extraction
    const emojis = message.match(emojiRegex) || []
    for (const emoji of emojis) {
      emojiCounts[emoji] = (emojiCounts[emoji] || 0) + 1
    }
  }

  const mostActiveHour = Object.entries(hourCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "0"
  const topEmojis = Object.entries(emojiCounts).sort((a, b) => b[1] - a[1]).slice(0, 5) as [string, number][]

  return {
    totalMessages,
    totalWords,
    participants,
    topEmojis,
    mostActiveHour: parseInt(mostActiveHour),
    avgWordsPerMsg: totalMessages > 0 ? Math.round(totalWords / totalMessages) : 0,
    firstMessage,
    lastMessage,
  }
}

export default function WhatsAppChatAnalyzer() {
  const [stats, setStats] = useState<ChatStats | null>(null)
  const [loading, setLoading] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return
    setLoading(true)

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string
        const result = parseWhatsAppChat(text)
        if (result.totalMessages === 0) {
          toast.error("No messages found. Make sure you exported the chat as .txt from WhatsApp.")
        } else {
          setStats(result)
          toast.success(`Analyzed ${result.totalMessages} messages!`)
        }
      } catch {
        toast.error("Failed to parse chat file.")
      } finally {
        setLoading(false)
      }
    }
    reader.readAsText(file)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "text/plain": [".txt"] },
    multiple: false,
  })

  const topParticipants = stats
    ? Object.entries(stats.participants).sort((a, b) => b[1] - a[1]).slice(0, 5)
    : []

  const formatHour = (h: number) => {
    if (h === 0) return "12 AM"
    if (h < 12) return `${h} AM`
    if (h === 12) return "12 PM"
    return `${h - 12} PM`
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {!stats ? (
        <div className="space-y-6">
          <div
            {...getRootProps()}
            className={cn(
              "border-2 border-dashed rounded-3xl p-16 text-center cursor-pointer transition-all",
              isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/20 hover:border-primary/50 hover:bg-muted/50"
            )}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-5">
              <div className="p-5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600">
                <MessageSquare className="h-12 w-12" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Upload WhatsApp Chat Export</h3>
                <p className="text-muted-foreground">Drag & drop your .txt file or click to browse</p>
              </div>
              <Button size="lg" className="px-8" disabled={loading}>
                <Upload className="mr-2 h-5 w-5" /> Select .txt File
              </Button>
            </div>
          </div>

          <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
            <CardContent className="p-6">
              <h4 className="font-bold mb-3 text-green-800 dark:text-green-300">How to export WhatsApp chat?</h4>
              <ol className="space-y-2 text-sm text-green-700 dark:text-green-400">
                <li className="flex gap-2"><span className="font-bold">1.</span> Open the WhatsApp chat you want to analyze</li>
                <li className="flex gap-2"><span className="font-bold">2.</span> Tap the 3 dots menu → More → Export Chat</li>
                <li className="flex gap-2"><span className="font-bold">3.</span> Choose "Without Media"</li>
                <li className="flex gap-2"><span className="font-bold">4.</span> Save the .txt file and upload it here</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in duration-500">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-black">Chat Analysis Results</h3>
            <Button variant="outline" onClick={() => setStats(null)}>Analyze Another</Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total Messages", value: stats.totalMessages.toLocaleString(), icon: MessageSquare, color: "text-blue-500" },
              { label: "Total Words", value: stats.totalWords.toLocaleString(), icon: FileText, color: "text-purple-500" },
              { label: "Avg Words/Msg", value: stats.avgWordsPerMsg, icon: BarChart2, color: "text-green-500" },
              { label: "Most Active", value: formatHour(stats.mostActiveHour), icon: Clock, color: "text-orange-500" },
            ].map((stat) => (
              <Card key={stat.label}>
                <CardContent className="p-5 text-center space-y-2">
                  <stat.icon className={`h-6 w-6 mx-auto ${stat.color}`} />
                  <p className="text-3xl font-black">{stat.value}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <User className="h-5 w-5 text-primary" /> Top Participants
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {topParticipants.map(([name, count], i) => {
                  const pct = Math.round((count / stats.totalMessages) * 100)
                  return (
                    <div key={name} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium truncate max-w-[180px]">{i + 1}. {name}</span>
                        <span className="text-muted-foreground">{count} msgs ({pct}%)</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary transition-all duration-1000"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Smile className="h-5 w-5 text-primary" /> Top Emojis Used
                </CardTitle>
              </CardHeader>
              <CardContent>
                {stats.topEmojis.length > 0 ? (
                  <div className="flex flex-wrap gap-4">
                    {stats.topEmojis.map(([emoji, count]) => (
                      <div key={emoji} className="flex flex-col items-center gap-1 p-3 rounded-xl bg-muted/50">
                        <span className="text-4xl">{emoji}</span>
                        <span className="text-xs font-bold text-muted-foreground">{count}x</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">No emojis found in this chat.</p>
                )}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-muted/50">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">First Message</p>
                <p className="font-bold">{stats.firstMessage || "N/A"}</p>
              </div>
              <div className="p-4 rounded-xl bg-muted/50">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Last Message</p>
                <p className="font-bold">{stats.lastMessage || "N/A"}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
