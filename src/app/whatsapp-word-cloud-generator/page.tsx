import { Metadata } from "next"
import Link from "next/link"
import { MessageSquare, ChevronRight, CheckCircle2, ArrowRight, Shield, Zap, AlertCircle, BarChart2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "WhatsApp Word Cloud Generator — Visualize Your Most Used Words | EasyTool",
  description: "Generate a word cloud from your WhatsApp chat. See which words you use most, visualize chat patterns, and discover your most common phrases. Free, private, no signup.",
  keywords: [
    "whatsapp word cloud generator",
    "whatsapp chat word cloud",
    "most used words in whatsapp chat",
    "whatsapp word frequency analyzer",
    "generate word cloud from whatsapp",
    "whatsapp chat visualization",
    "whatsapp most common words",
    "word cloud from chat export free",
  ],
  alternates: { canonical: "https://easytool.live/whatsapp-word-cloud-generator" },
  openGraph: {
    title: "WhatsApp Word Cloud Generator — Visualize Your Most Used Words",
    description: "Generate a word cloud from your WhatsApp chat. See your most used words instantly. Free, private, no signup.",
    url: "https://easytool.live/whatsapp-word-cloud-generator",
    siteName: "EasyTool",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WhatsApp Word Cloud Generator — Visualize Your Most Used Words",
    description: "Generate a word cloud from your WhatsApp chat. Free, private, instant.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "WhatsApp Word Cloud Generator",
  "description": "Generate a word cloud from your WhatsApp chat export. Visualize most used words, phrases, and chat patterns.",
  "url": "https://easytool.live/whatsapp-word-cloud-generator",
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
    { "@type": "Question", "name": "How do I generate a word cloud from WhatsApp?", "acceptedAnswer": { "@type": "Answer", "text": "Export your WhatsApp chat (tap 3-dot menu > More > Export Chat > Without Media), then upload the file to EasyTool's WhatsApp Chat Analyzer. It automatically generates a word cloud showing your most used words." } },
    { "@type": "Question", "name": "What words show up in a WhatsApp word cloud?", "acceptedAnswer": { "@type": "Answer", "text": "The word cloud shows the most frequently used words in your chat. Common filler words like 'the', 'a', 'is' are filtered out so you see meaningful words that define your conversation." } },
    { "@type": "Question", "name": "Is the WhatsApp word cloud generator private?", "acceptedAnswer": { "@type": "Answer", "text": "100% private. EasyTool processes your chat file entirely in your browser. Your messages never leave your device and are never uploaded to any server." } },
    { "@type": "Question", "name": "Can I generate a word cloud for a WhatsApp group?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Export the group chat and upload it to EasyTool. You will see a word cloud for the entire group, plus per-member word frequency stats." } },
    { "@type": "Question", "name": "Does it work for non-English WhatsApp chats?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. EasyTool supports multilingual chats including Urdu, Arabic, Hindi, and other languages. The word cloud will display words in their original language." } },
  ],
}

// Word cloud mockup
function WordCloudMockup() {
  const words = [
    { word: "haha", size: "text-[14px]", color: "text-amber-500", weight: "font-black" },
    { word: "okay", size: "text-[11px]", color: "text-blue-500", weight: "font-bold" },
    { word: "bro", size: "text-[16px]", color: "text-violet-500", weight: "font-black" },
    { word: "yaar", size: "text-[10px]", color: "text-rose-500", weight: "font-bold" },
    { word: "lol", size: "text-[13px]", color: "text-emerald-500", weight: "font-black" },
    { word: "sure", size: "text-[9px]", color: "text-orange-400", weight: "font-semibold" },
    { word: "nice", size: "text-[11px]", color: "text-cyan-500", weight: "font-bold" },
    { word: "wait", size: "text-[9px]", color: "text-pink-500", weight: "font-semibold" },
    { word: "coming", size: "text-[10px]", color: "text-indigo-400", weight: "font-bold" },
    { word: "done", size: "text-[12px]", color: "text-teal-500", weight: "font-bold" },
    { word: "yes", size: "text-[15px]", color: "text-amber-600", weight: "font-black" },
    { word: "send", size: "text-[9px]", color: "text-blue-400", weight: "font-semibold" },
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
            <BarChart2 className="w-4 h-4 text-white" />
            <p className="text-white text-[9px] font-bold">Word Cloud</p>
          </div>
          {/* Content */}
          <div className="p-3 bg-gray-50 space-y-2.5">
            {/* Word cloud visual */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 min-h-[90px] flex flex-wrap gap-1.5 items-center justify-center">
              {words.map((w) => (
                <span key={w.word} className={cn(w.size, w.color, w.weight, "leading-none")}>{w.word}</span>
              ))}
            </div>
            {/* Top words list */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-2.5">
              <p className="text-[7px] font-bold text-gray-400 uppercase tracking-wide mb-2">Top Words</p>
              <div className="space-y-1.5">
                {[
                  { word: "bro", count: 412, pct: 100, color: "#8b5cf6" },
                  { word: "yes", count: 387, pct: 94, color: "#f59e0b" },
                  { word: "haha", count: 298, pct: 72, color: "#f59e0b" },
                  { word: "lol", count: 241, pct: 59, color: "#10b981" },
                  { word: "okay", count: 189, pct: 46, color: "#3b82f6" },
                ].map((item) => (
                  <div key={item.word} className="flex items-center gap-1.5">
                    <span className="text-[8px] font-bold text-gray-600 w-8">{item.word}</span>
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${item.pct}%`, backgroundColor: item.color }} />
                    </div>
                    <span className="text-[7px] font-bold text-gray-400 w-6 text-right">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Fun stat */}
            <div className="bg-violet-50 border border-violet-200 rounded-xl p-2 text-center">
              <p className="text-[8px] font-black text-violet-700">You said "bro" 412 times!</p>
              <p className="text-[6px] text-violet-500 mt-0.5">3,847 unique words in this chat</p>
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

export default function WhatsAppWordCloudGenerator() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <div className="bg-gradient-to-b from-violet-500/10 to-transparent border-b border-violet-500/15">
        <div className="container py-10 md:py-16">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/tools/whatsapp-chat-analyzer" className="hover:text-foreground transition-colors">WhatsApp Analyzer</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">Word Cloud Generator</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-violet-500/15 text-violet-700 dark:text-violet-400 border-violet-500/25 font-bold">☁️ Word Cloud</Badge>
                <Badge variant="outline" className="font-semibold">Free Tool</Badge>
                <Badge variant="outline" className="font-semibold">100% Private</Badge>
              </div>

              <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                WhatsApp Word Cloud Generator
                <span className="block text-violet-500 mt-1">See Your Most Used Words</span>
              </h1>

              <p className="text-muted-foreground text-lg leading-relaxed">
                Turn your WhatsApp chat into a beautiful word cloud. Instantly see which words you use most, discover your chat vocabulary, and visualize conversation patterns. <strong>Free, private, instant.</strong>
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/tools/whatsapp-chat-analyzer">
                  <Button size="lg" className="bg-violet-600 hover:bg-violet-700 font-bold rounded-xl h-12 px-8 shadow-lg shadow-violet-600/25 w-full sm:w-auto text-white">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Generate Word Cloud Free
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
                    <item.icon className="h-4 w-4 text-violet-500" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <WordCloudMockup />
            </div>
          </div>
        </div>
      </div>

      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-12">

            {/* What is it */}
            <section className="space-y-4">
              <h2 className="text-2xl font-black">What is WhatsApp Word Cloud Generator?</h2>
              <p className="text-muted-foreground leading-relaxed">
                A <strong>WhatsApp word cloud generator</strong> reads your exported chat file and counts how often each word appears. The most frequently used words are displayed larger in the cloud — giving you an instant visual snapshot of what your conversations are really about.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                EasyTool filters out common stop words (like "the", "a", "is") so the cloud only shows meaningful words that define your chat. It works for individual chats, group chats, and supports all languages including Urdu, Arabic, and Hindi.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: "Word Cloud", sub: "Visual word map", icon: "☁️" },
                  { label: "Top Words", sub: "Most used ranked", icon: "🏆" },
                  { label: "Word Count", sub: "Total vocabulary", icon: "🔢" },
                  { label: "Per Person", sub: "Who says what", icon: "👤" },
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
              <h2 className="text-2xl font-black">How to Generate a WhatsApp Word Cloud</h2>
              <div className="space-y-4">
                {[
                  { step: "1", title: "Export your WhatsApp chat", desc: "Open the chat → tap ⋮ (Android) or contact name (iPhone) → Export Chat → Without Media. Save the ZIP file to your device." },
                  { step: "2", title: "Upload to EasyTool", desc: "Go to EasyTool's WhatsApp Chat Analyzer and upload your .zip or .txt file. Everything runs in your browser — zero server upload." },
                  { step: "3", title: "See your word cloud", desc: "Instantly see a visual word cloud of your most used words, a ranked top-words list with counts, and per-person word frequency stats." },
                ].map(s => (
                  <div key={s.step} className="flex gap-4 p-5 rounded-2xl border border-border bg-card">
                    <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center text-white font-black text-sm flex-shrink-0">
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
                <Button className="bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl h-11 px-8 shadow-lg shadow-violet-600/20">
                  Generate My Word Cloud <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </section>

            {/* Fun discoveries */}
            <section className="space-y-4">
              <h2 className="text-2xl font-black">Fun Things You Can Discover</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: "🗣️", title: "Your Signature Word", desc: "Every person has a word they overuse without realizing it. The word cloud reveals yours — and it is almost always surprising." },
                  { icon: "💬", title: "Chat Personality", desc: "Is your chat full of slang, formal words, or inside jokes? The word cloud paints a picture of your unique chat style." },
                  { icon: "🔥", title: "Trending Topics", desc: "Words that appear large in the cloud often represent recurring topics or themes in your conversations." },
                  { icon: "😂", title: "Shared Vocabulary", desc: "Group chats develop their own language over time. The word cloud captures the unique vocabulary of your group." },
                ].map(item => (
                  <div key={item.title} className="p-5 rounded-2xl border border-border bg-card space-y-2">
                    <span className="text-3xl">{item.icon}</span>
                    <p className="font-bold">{item.title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Full stats */}
            <section className="space-y-4">
              <h2 className="text-2xl font-black">What Word Stats You Get</h2>
              <ul className="space-y-3">
                {[
                  "Visual word cloud with size proportional to word frequency",
                  "Top 20 most used words with exact usage count",
                  "Total unique words — your chat vocabulary size",
                  "Per-person word frequency — who uses which words most",
                  "Stop word filtering — removes filler words for meaningful results",
                  "Supports all Unicode languages including Urdu, Arabic, Hindi",
                  "Works for both individual chats and group chats",
                  "Average words per message for each participant",
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-violet-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Privacy */}
            <section className="p-6 md:p-8 rounded-2xl bg-violet-500/8 border border-violet-500/20 space-y-4">
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-violet-600" />
                <h2 className="text-xl font-black">100% Private Word Cloud Generation</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Your WhatsApp chat contains personal conversations. EasyTool processes your export file <strong>entirely in your browser</strong> using JavaScript. Your messages, words, and contact names never leave your device. No server, no database, no storage — complete privacy guaranteed.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { label: "No server upload", icon: "🔒" },
                  { label: "No data stored", icon: "🗑️" },
                  { label: "No account needed", icon: "✅" },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-2 p-3 rounded-xl bg-white/50 dark:bg-white/5 border border-violet-500/15">
                    <span className="text-lg">{item.icon}</span>
                    <p className="text-sm font-semibold">{item.label}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section className="space-y-4">
              <h2 className="text-2xl font-black">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {[
                  { q: "How do I generate a word cloud from WhatsApp?", a: "Export your WhatsApp chat (tap ⋮ → More → Export Chat → Without Media on Android, or tap contact name → Export Chat on iPhone), then upload the file to EasyTool's WhatsApp Chat Analyzer. It instantly generates a word cloud from your messages." },
                  { q: "What words are shown in the word cloud?", a: "The word cloud shows the most frequently used meaningful words in your chat. Common stop words like 'the', 'a', 'is', 'and' are automatically filtered out so you see words that actually define your conversation." },
                  { q: "Can I generate a word cloud for a WhatsApp group?", a: "Yes. Export the group chat and upload it to EasyTool. You will see a word cloud for the entire group, plus per-member word frequency stats showing who uses which words most." },
                  { q: "Does it work for Urdu or Arabic WhatsApp chats?", a: "Yes. EasyTool supports multilingual chats including Urdu, Arabic, Hindi, and other languages. The word cloud will display words in their original script and language." },
                  { q: "Is my WhatsApp chat safe to upload?", a: "Your chat is never uploaded anywhere. EasyTool processes the file entirely in your browser using JavaScript. The file stays on your device and is discarded when you close the tab." },
                ].map((item, i) => (
                  <div key={i} className="p-5 rounded-xl border border-border bg-card">
                    <p className="font-bold text-sm mb-2 flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-violet-500 flex-shrink-0 mt-0.5" />
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
            <div className="rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 p-6 text-white space-y-4">
              <span className="text-3xl">☁️</span>
              <div>
                <p className="font-black text-lg leading-tight">Generate Your Word Cloud</p>
                <p className="text-white/80 text-xs mt-1 leading-relaxed">Upload your WhatsApp export and see your most used words instantly — free, private, no signup.</p>
              </div>
              <Link href="/tools/whatsapp-chat-analyzer">
                <Button className="w-full bg-white text-violet-700 hover:bg-white/90 font-bold h-10 rounded-xl">
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
                  { label: "Emoji Analyzer", href: "/whatsapp-emoji-analyzer", icon: "😂" },
                  { label: "Most Active Member", href: "/whatsapp-most-active-member", icon: "🏆" },
                  { label: "Response Time Checker", href: "/whatsapp-response-time-checker", icon: "⏱️" },
                  { label: "Sentiment Analysis", href: "/whatsapp-sentiment-analysis", icon: "💖" },
                  { label: "WhatsApp vs Telegram", href: "/whatsapp-vs-telegram-chat-analyzer", icon: "⚡" },
                  { label: "Who Texts You Most", href: "/whatsapp-who-texts-you-most", icon: "💕" },
                  { label: "Urdu/Hindi Guide", href: "/blog/whatsapp-chat-analyzer-kaise-use-karein", icon: "📚" },
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
