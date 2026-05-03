import { Metadata } from "next"
import Link from "next/link"
import { MessageSquare, ChevronRight, CheckCircle2, ArrowRight, Shield, Zap, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "WhatsApp Emoji Analyzer — Most Used Emojis in Your Chat | EasyTool",
  description: "Find out which emojis you use most in WhatsApp. Analyze emoji frequency, per-person emoji stats, and top emojis in group chats. Free, private, no signup.",
  keywords: [
    "whatsapp emoji analyzer",
    "most used emoji in whatsapp chat",
    "whatsapp emoji statistics free",
    "whatsapp emoji counter",
    "which emoji do i use most whatsapp",
    "whatsapp chat emoji analysis",
    "most popular emoji whatsapp group",
    "whatsapp emoji frequency checker",
  ],
  alternates: { canonical: "https://easytool.live/whatsapp-emoji-analyzer" },
  openGraph: {
    title: "WhatsApp Emoji Analyzer — Most Used Emojis in Your Chat",
    description: "Find out which emojis you use most in WhatsApp chats. Free, private, instant analysis.",
    url: "https://easytool.live/whatsapp-emoji-analyzer",
    siteName: "EasyTool",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WhatsApp Emoji Analyzer — Most Used Emojis in Your Chat",
    description: "Find out which emojis you use most in WhatsApp. Free, private, no signup.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "WhatsApp Emoji Analyzer",
  "description": "Analyze emoji usage in WhatsApp chats. Find most used emojis, per-person emoji stats, and emoji frequency.",
  "url": "https://easytool.live/whatsapp-emoji-analyzer",
  "mainEntity": {
    "@type": "SoftwareApplication",
    "name": "WhatsApp Chat Analyzer",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  },
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How do I find most used emojis in WhatsApp?", "acceptedAnswer": { "@type": "Answer", "text": "Export your WhatsApp chat (tap 3-dot menu > More > Export Chat > Without Media), then upload the file to EasyTool. It scans every message and counts all emojis, showing you the top 10 most used emojis with exact counts." } },
    { "@type": "Question", "name": "Can I see emoji stats per person in WhatsApp?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. EasyTool's WhatsApp Chat Analyzer shows emoji usage per participant — you can see who uses the most emojis and which emojis each person favors." } },
    { "@type": "Question", "name": "Does WhatsApp show emoji statistics?", "acceptedAnswer": { "@type": "Answer", "text": "WhatsApp does not have built-in emoji statistics. You need to export your chat and use EasyTool to analyze emoji frequency and usage patterns." } },
    { "@type": "Question", "name": "Is WhatsApp emoji analyzer safe to use?", "acceptedAnswer": { "@type": "Answer", "text": "100% safe. EasyTool processes your chat file entirely in your browser. Your messages never leave your device and are never uploaded to any server." } },
    { "@type": "Question", "name": "Can I analyze emoji usage in WhatsApp group chats?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Export the group chat and upload it to EasyTool. You will see overall emoji stats plus per-member emoji usage for the entire group." } },
  ],
}

// Emoji mockup
function EmojiMockup() {
  const topEmojis = [
    { emoji: "😂", count: 342, pct: 100 },
    { emoji: "❤️", count: 218, pct: 64 },
    { emoji: "😭", count: 187, pct: 55 },
    { emoji: "🔥", count: 143, pct: 42 },
    { emoji: "😍", count: 98, pct: 29 },
    { emoji: "👍", count: 87, pct: 25 },
  ]

  return (
    <div className="relative w-[210px] mx-auto">
      <div className="bg-gray-900 rounded-[28px] p-[3px] shadow-2xl shadow-black/40 ring-1 ring-white/5">
        <div className="bg-white rounded-[25px] overflow-hidden">
          {/* Status bar */}
          <div className="bg-[#075E54] px-3 pt-1.5 pb-0.5 flex items-center justify-between">
            <span className="text-white text-[7px] font-bold">9:41</span>
            <div className="flex gap-px items-end h-2">
              <div className="w-px h-1 bg-white/60 rounded-sm" />
              <div className="w-px h-1.5 bg-white/80 rounded-sm" />
              <div className="w-px h-2 bg-white rounded-sm" />
            </div>
          </div>
          {/* Header */}
          <div className="bg-[#075E54] px-3 py-2 flex items-center gap-2">
            <span className="text-base">😂</span>
            <p className="text-white text-[9px] font-bold">Emoji Analysis</p>
          </div>
          {/* Content */}
          <div className="p-3 bg-gray-50 space-y-2.5">
            {/* Total emojis */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 text-center">
              <p className="text-[18px] font-black text-amber-600">1,204</p>
              <p className="text-[7px] text-amber-500 font-semibold">Total Emojis Used</p>
              <p className="text-[6px] text-amber-400 mt-0.5">47 unique emojis found</p>
            </div>
            {/* Top emojis */}
            <div className="bg-white rounded-xl p-2.5 border border-gray-100 shadow-sm">
              <p className="text-[8px] font-bold text-gray-500 mb-2 uppercase tracking-wide">Top Emojis</p>
              <div className="space-y-1.5">
                {topEmojis.map((e, i) => (
                  <div key={e.emoji} className="flex items-center gap-1.5">
                    <span className="text-[11px] w-4 text-center">{e.emoji}</span>
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${e.pct}%`,
                          backgroundColor: ["#f59e0b", "#ef4444", "#3b82f6", "#f97316", "#8b5cf6", "#10b981"][i],
                        }}
                      />
                    </div>
                    <span className="text-[7px] font-bold text-gray-500 w-6 text-right">{e.count}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Per person */}
            <div className="bg-white rounded-xl p-2.5 border border-gray-100 shadow-sm">
              <p className="text-[8px] font-bold text-gray-500 mb-2">Per Person</p>
              <div className="space-y-1.5">
                {[
                  { name: "Ali", emoji: "😂", count: 198, color: "bg-blue-400" },
                  { name: "Sara", emoji: "❤️", count: 156, color: "bg-rose-400" },
                ].map(p => (
                  <div key={p.name} className="flex items-center gap-1.5">
                    <div className={cn("w-4 h-4 rounded-full flex items-center justify-center text-white text-[7px] font-black flex-shrink-0", p.color)}>
                      {p.name[0]}
                    </div>
                    <span className="text-[8px] font-semibold text-gray-700 flex-1">{p.name}</span>
                    <span className="text-[10px]">{p.emoji}</span>
                    <span className="text-[7px] text-gray-400">{p.count}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Fun fact */}
            <div className="bg-violet-50 border border-violet-200 rounded-xl p-2 text-center">
              <p className="text-[8px] font-black text-violet-700">😂 is your #1 emoji!</p>
              <p className="text-[6px] text-violet-500 mt-0.5">Used 342 times in this chat</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center py-1.5">
          <div className="w-10 h-1 bg-gray-700 rounded-full" />
        </div>
      </div>
    </div>
  )
}

export default function WhatsAppEmojiAnalyzer() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <div className="bg-gradient-to-b from-amber-500/10 to-transparent border-b border-amber-500/15">
        <div className="container py-10 md:py-16">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/tools/whatsapp-chat-analyzer" className="hover:text-foreground transition-colors">WhatsApp Analyzer</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">Emoji Analyzer</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/25 font-bold">😂 Emoji Stats</Badge>
                <Badge variant="outline" className="font-semibold">Free Tool</Badge>
                <Badge variant="outline" className="font-semibold">100% Private</Badge>
              </div>

              <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                WhatsApp Emoji Analyzer
                <span className="block text-amber-500 mt-1">Which Emoji Do You Use Most?</span>
              </h1>

              <p className="text-muted-foreground text-lg leading-relaxed">
                Discover your most used emojis in WhatsApp chats. See top 10 emojis, per-person emoji stats, total emoji count, and which emoji defines your chat personality. <strong>Free, private, instant.</strong>
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/tools/whatsapp-chat-analyzer">
                  <Button size="lg" className="bg-amber-500 hover:bg-amber-600 font-bold rounded-xl h-12 px-8 shadow-lg shadow-amber-500/25 w-full sm:w-auto text-white">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Analyze My Emojis Free
                  </Button>
                </Link>
                <Link href="/how-to-export-whatsapp-chat">
                  <Button size="lg" variant="outline" className="font-bold rounded-xl h-12 px-6 w-full sm:w-auto">
                    How to Export Chat
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                {[
                  { icon: Shield, text: "Files never uploaded" },
                  { icon: Zap, text: "Instant results" },
                  { icon: CheckCircle2, text: "No signup needed" },
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-1.5">
                    <item.icon className="h-4 w-4 text-amber-500" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <EmojiMockup />
            </div>
          </div>
        </div>
      </div>

      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-12">

            {/* What is it */}
            <section className="space-y-4">
              <h2 className="text-2xl font-black">What is WhatsApp Emoji Analyzer?</h2>
              <p className="text-muted-foreground leading-relaxed">
                A <strong>WhatsApp emoji analyzer</strong> scans your exported chat file and counts every emoji used in the conversation. It identifies the most used emojis, shows per-person emoji stats, and reveals interesting patterns about how you and your contacts express emotions in chat.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                EasyTool supports all Unicode emojis — including new emojis, flag emojis, skin tone variants, and compound emojis. It also works for Urdu and Arabic chats where emojis are commonly mixed with text.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: "Top 10 Emojis", sub: "Most used ranked", icon: "🏆" },
                  { label: "Total Count", sub: "All emojis summed", icon: "🔢" },
                  { label: "Unique Emojis", sub: "Variety used", icon: "🎨" },
                  { label: "Per Person", sub: "Who uses what", icon: "👤" },
                ].map(item => (
                  <div key={item.label} className="p-4 rounded-2xl bg-card border border-border text-center space-y-1">
                    <span className="text-2xl">{item.icon}</span>
                    <p className="font-bold text-xs">{item.label}</p>
                    <p className="text-[11px] text-muted-foreground">{item.sub}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* How to use */}
            <section className="space-y-6">
              <h2 className="text-2xl font-black">How to Analyze WhatsApp Emoji Usage</h2>
              <div className="space-y-4">
                {[
                  { step: "1", title: "Export your WhatsApp chat", desc: "Open the chat → tap ⋮ (Android) or contact name (iPhone) → Export Chat → Without Media. Save the ZIP file to your device." },
                  { step: "2", title: "Upload to EasyTool", desc: "Go to EasyTool's WhatsApp Chat Analyzer and upload your .zip or .txt file. Everything runs in your browser — zero server upload." },
                  { step: "3", title: "See your emoji stats", desc: "Instantly see your top 10 emojis with counts, total emojis used, unique emoji count, and per-person emoji breakdown." },
                ].map(s => (
                  <div key={s.step} className="flex gap-4 p-5 rounded-2xl border border-border bg-card">
                    <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                      {s.step}
                    </div>
                    <div>
                      <p className="font-bold mb-1">{s.title}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/tools/whatsapp-chat-analyzer">
                <Button className="bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl h-11 px-8 shadow-lg shadow-amber-500/20">
                  Analyze My Emojis <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </section>

            {/* Fun facts */}
            <section className="space-y-4">
              <h2 className="text-2xl font-black">Fun Things You Can Discover</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: "😂", title: "Your #1 Emoji", desc: "Find out which single emoji you have used the most across the entire conversation. Most people are surprised by the answer!" },
                  { icon: "❤️", title: "Love vs Laugh", desc: "Do you use more heart emojis or laughing emojis? The ratio reveals a lot about the tone of your conversations." },
                  { icon: "🔥", title: "Hype Emojis", desc: "See how often fire, 100, and clapping emojis appear — a sign of an energetic, enthusiastic chat." },
                  { icon: "😭", title: "Dramatic Emojis", desc: "Crying laughing vs actual crying — which one dominates your chat? The stats tell the real story." },
                ].map(item => (
                  <div key={item.title} className="p-5 rounded-2xl border border-border bg-card space-y-2">
                    <span className="text-3xl">{item.icon}</span>
                    <p className="font-bold">{item.title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* What you get */}
            <section className="space-y-4">
              <h2 className="text-2xl font-black">What Emoji Stats You Get</h2>
              <ul className="space-y-3">
                {[
                  "Top 10 most used emojis with exact usage count",
                  "Total number of emojis used in the entire chat",
                  "Number of unique emojis — how varied your emoji vocabulary is",
                  "Per-person emoji count — who uses the most emojis",
                  "Emoji usage as percentage of total messages",
                  "Support for all Unicode emojis including flags and skin tones",
                  "Works for both individual chats and group chats",
                  "Supports multilingual chats — Urdu, Arabic, Hindi, English",
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Privacy */}
            <section className="p-6 md:p-8 rounded-2xl bg-amber-500/8 border border-amber-500/20 space-y-4">
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-amber-600" />
                <h2 className="text-xl font-black">100% Private Emoji Analysis</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Your WhatsApp chat contains personal conversations. EasyTool processes your export file <strong>entirely in your browser</strong> using JavaScript. Your messages, emojis, and contact names never leave your device. No server, no database, no storage — complete privacy guaranteed.
              </p>
            </section>

            {/* FAQ */}
            <section className="space-y-4">
              <h2 className="text-2xl font-black">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {[
                  { q: "How do I find most used emojis in WhatsApp?", a: "Export your WhatsApp chat (tap ⋮ → More → Export Chat → Without Media on Android, or tap contact name → Export Chat on iPhone), then upload the file to EasyTool's WhatsApp Chat Analyzer. It instantly shows your top 10 most used emojis with exact counts." },
                  { q: "Does WhatsApp show emoji statistics?", a: "No, WhatsApp does not have built-in emoji statistics. You need to export your chat and use EasyTool to analyze emoji frequency and usage patterns." },
                  { q: "Can I see which emoji each person uses most?", a: "Yes. EasyTool shows per-person emoji stats — you can see the total emoji count for each participant and their most used emojis." },
                  { q: "Does it work for group chats?", a: "Yes. Export the group chat and upload it to EasyTool. You will see overall emoji stats for the entire group plus per-member emoji usage." },
                  { q: "Are all emojis supported?", a: "Yes. EasyTool supports all Unicode emojis including standard emojis, flag emojis, skin tone variants, and compound emojis. It works for all languages including Urdu and Arabic chats." },
                ].map((item, i) => (
                  <div key={i} className="p-5 rounded-xl border border-border bg-card">
                    <p className="font-bold text-sm mb-2 flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                      {item.q}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed pl-6">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Sidebar */}
          <div className="space-y-5 lg:sticky lg:top-6 self-start">
            <div className="rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 p-6 text-white space-y-4">
              <span className="text-3xl">😂</span>
              <div>
                <p className="font-black text-lg leading-tight">Analyze Your Emojis</p>
                <p className="text-white/80 text-xs mt-1 leading-relaxed">Upload your WhatsApp export and see your top emojis instantly — free, private, no signup.</p>
              </div>
              <Link href="/tools/whatsapp-chat-analyzer">
                <Button className="w-full bg-white text-amber-700 hover:bg-white/90 font-bold h-10 rounded-xl">
                  Analyze Now Free <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
              <p className="font-bold text-sm">How to export WhatsApp chat?</p>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div>
                  <p className="font-bold text-foreground mb-1">Android</p>
                  <p>Open chat → ⋮ → More → Export Chat → Without Media</p>
                </div>
                <div className="h-px bg-border" />
                <div>
                  <p className="font-bold text-foreground mb-1">iPhone</p>
                  <p>Open chat → tap contact name → Export Chat → Without Media</p>
                </div>
              </div>
              <Link href="/how-to-export-whatsapp-chat">
                <Button variant="outline" size="sm" className="w-full text-xs font-semibold mt-1">
                  Full Export Guide <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
              <p className="font-bold text-sm">Related Pages</p>
              <div className="space-y-2">
                {[
                  { label: "WhatsApp Chat Analyzer", href: "/tools/whatsapp-chat-analyzer", icon: "💬" },
                  { label: "Response Time Checker", href: "/whatsapp-response-time-checker", icon: "⏱️" },
                  { label: "Most Active Member", href: "/whatsapp-most-active-member", icon: "🏆" },
                  { label: "How to Export Chat", href: "/how-to-export-whatsapp-chat", icon: "📤" },
                ].map(item => (
                  <Link key={item.href} href={item.href} className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-muted transition-colors group">
                    <span className="text-base">{item.icon}</span>
                    <span className="text-xs font-medium group-hover:text-primary transition-colors">{item.label}</span>
                    <ChevronRight className="h-3 w-3 text-muted-foreground ml-auto" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
