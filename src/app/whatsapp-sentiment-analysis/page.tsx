import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, CheckCircle2, ArrowRight, Shield, Zap, AlertCircle, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "WhatsApp Sentiment Analysis — Analyze Chat Mood Free | EasyTool",
  description: "Analyze WhatsApp chat sentiment free. See if your chat is positive, negative, or neutral. Mood analysis, emotion detection, and conversation tone checker. 100% private, no signup.",
  keywords: [
    "whatsapp sentiment analysis free",
    "analyze mood of whatsapp chat",
    "is my whatsapp chat positive or negative",
    "whatsapp chat emotion detector",
    "free whatsapp mood analyzer",
    "whatsapp conversation tone checker",
    "sentiment analysis for whatsapp chats",
    "whatsapp chat mood analysis tool",
  ],
  alternates: { canonical: "https://easytool.live/whatsapp-sentiment-analysis" },
  openGraph: {
    title: "WhatsApp Sentiment Analysis — Analyze Chat Mood Free",
    description: "Analyze WhatsApp chat sentiment — positive, negative, or neutral. Free, private, instant.",
    url: "https://easytool.live/whatsapp-sentiment-analysis",
    siteName: "EasyTool",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WhatsApp Sentiment Analysis — Analyze Chat Mood Free",
    description: "Analyze WhatsApp chat sentiment. Free, private, no signup.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "WhatsApp Sentiment Analysis",
  "description": "Analyze sentiment of WhatsApp chats. Detect positive, negative, and neutral moods from chat exports.",
  "url": "https://easytool.live/whatsapp-sentiment-analysis",
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
    { "@type": "Question", "name": "How do I analyze WhatsApp chat sentiment?", "acceptedAnswer": { "@type": "Answer", "text": "Export your WhatsApp chat (tap 3-dot menu > More > Export Chat > Without Media), then upload the file to EasyTool. It analyzes every message and shows whether the chat is overall positive, negative, or neutral." } },
    { "@type": "Question", "name": "Can I see if my WhatsApp chat is positive or negative?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. EasyTool's sentiment analyzer reads your exported chat and calculates an overall mood score — showing you exactly how positive or negative your conversation is." } },
    { "@type": "Question", "name": "Is WhatsApp sentiment analysis private?", "acceptedAnswer": { "@type": "Answer", "text": "100% private. EasyTool processes your chat file entirely in your browser. Your messages never leave your device and are never uploaded to any server." } },
    { "@type": "Question", "name": "Does sentiment analysis work for Urdu and Arabic?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. EasyTool supports multilingual sentiment analysis including Urdu, Arabic, Hindi, and English. It detects mood regardless of the language used." } },
    { "@type": "Question", "name": "Can I see sentiment per person in WhatsApp?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. You can see both overall chat sentiment and per-person sentiment — find out who is the most positive or negative in the conversation." } },
  ],
}

function SentimentMockup() {
  return (
    <div className="relative w-[210px] mx-auto">
      <div className="bg-gray-900 rounded-[28px] p-[3px] shadow-2xl shadow-black/40 ring-1 ring-white/5">
        <div className="bg-white rounded-[25px] overflow-hidden">
          <div className="bg-[#075E54] px-3 pt-1.5 pb-0.5 flex items-center justify-between">
            <span className="text-white text-[7px] font-bold">9:41</span>
            <div className="flex gap-px items-end h-2">
              <div className="w-px h-1 bg-white/60 rounded-sm" />
              <div className="w-px h-1.5 bg-white/80 rounded-sm" />
              <div className="w-px h-2 bg-white rounded-sm" />
            </div>
          </div>
          <div className="bg-[#075E54] px-3 py-2 flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-400" />
            <p className="text-white text-[9px] font-bold">Sentiment Analysis</p>
          </div>
          <div className="p-3 bg-gray-50 space-y-2.5">
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-center">
              <p className="text-[20px]">😊</p>
              <p className="text-[10px] font-black text-rose-700">Positive Chat!</p>
              <p className="text-[7px] text-rose-500 mt-0.5">78% Positive · 12% Neutral</p>
            </div>
            <div className="bg-white rounded-xl p-2.5 border border-gray-100 shadow-sm">
              <p className="text-[8px] font-bold text-gray-500 mb-2 uppercase tracking-wide">Mood Breakdown</p>
              <div className="space-y-1.5">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[7px] font-bold text-emerald-600">Positive</span>
                    <span className="text-[7px] font-bold text-emerald-600">78%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: "78%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[7px] font-bold text-gray-500">Neutral</span>
                    <span className="text-[7px] font-bold text-gray-500">12%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gray-400 rounded-full" style={{ width: "12%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[7px] font-bold text-rose-500">Negative</span>
                    <span className="text-[7px] font-bold text-rose-500">10%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-500 rounded-full" style={{ width: "10%" }} />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-2 text-center">
              <p className="text-[8px] font-black text-blue-700">You're the positive one! 💛</p>
              <p className="text-[6px] text-blue-500 mt-0.5">85% positive from your messages</p>
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

export default function WhatsAppSentimentAnalysis() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="bg-gradient-to-b from-rose-500/10 to-transparent border-b border-rose-500/15">
        <div className="container py-10 md:py-16">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/tools/whatsapp-chat-analyzer" className="hover:text-foreground transition-colors">WhatsApp Analyzer</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">Sentiment Analysis</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/25 font-bold">😊 Mood Analysis</Badge>
                <Badge variant="outline" className="font-semibold">Free Tool</Badge>
                <Badge variant="outline" className="font-semibold">100% Private</Badge>
              </div>

              <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                WhatsApp Sentiment Analysis
                <span className="block text-rose-500 mt-1">Is Your Chat Positive or Negative?</span>
              </h1>

              <p className="text-muted-foreground text-lg leading-relaxed">
                Analyze the mood of your WhatsApp chats. See if your conversation is overall positive, negative, or neutral. Get per-person sentiment and discover who brings the vibe. <strong>Free, private, instant.</strong>
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/tools/whatsapp-chat-analyzer">
                  <Button size="lg" className="bg-rose-600 hover:bg-rose-700 font-bold rounded-xl h-12 px-8 shadow-lg shadow-rose-600/25 w-full sm:w-auto text-white">
                    <Heart className="mr-2 h-5 w-5" />
                    Analyze Chat Mood Free
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
                    <item.icon className="h-4 w-4 text-rose-500" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <SentimentMockup />
            </div>
          </div>
        </div>
      </div>

      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-12">

            <section className="space-y-4">
              <h2 className="text-2xl font-black">What is WhatsApp Sentiment Analysis?</h2>
              <p className="text-muted-foreground leading-relaxed">
                <strong>WhatsApp sentiment analysis</strong> reads every message in your exported chat and determines whether each message is positive, negative, or neutral. It then calculates an overall mood score for the entire conversation, giving you a clear picture of your chat's emotional tone.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                EasyTool uses natural language processing to analyze your chat locally in your browser. It works for English, Urdu, Arabic, Hindi, and other languages, detecting sentiment regardless of what language you speak.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: "Overall Mood", sub: "Positive/Negative", icon: "😊" },
                  { label: "Per Person", sub: "Who is positive", icon: "👤" },
                  { label: "Mood Trend", sub: "Over time", icon: "📈" },
                  { label: "Multilingual", sub: "All languages", icon: "🌍" },
                ].map(item => (
                  <div key={item.label} className="p-4 rounded-2xl bg-card border border-border text-center space-y-1">
                    <span className="text-2xl">{item.icon}</span>
                    <p className="font-bold text-xs">{item.label}</p>
                    <p className="text-[11px] text-muted-foreground">{item.sub}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-black">How to Analyze WhatsApp Chat Sentiment</h2>
              <div className="space-y-4">
                {[
                  { step: "1", title: "Export your WhatsApp chat", desc: "Open the chat → tap ⋮ (Android) or contact name (iPhone) → Export Chat → Without Media. Save the ZIP file to your device." },
                  { step: "2", title: "Upload to EasyTool", desc: "Go to EasyTool's WhatsApp Chat Analyzer and upload your .zip or .txt file. Everything runs in your browser — zero server upload." },
                  { step: "3", title: "See your chat mood", desc: "Instantly see if your chat is positive, negative, or neutral, with per-person sentiment breakdown and mood statistics." },
                ].map(s => (
                  <div key={s.step} className="flex gap-4 p-5 rounded-2xl border border-border bg-card">
                    <div className="w-9 h-9 rounded-xl bg-rose-600 flex items-center justify-center text-white font-black text-sm flex-shrink-0">
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
                <Button className="bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl h-11 px-8 shadow-lg shadow-rose-600/20">
                  Analyze My Chat Mood <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black">Fun Things You Can Discover</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: "😊", title: "Who is the Positive One?", desc: "Find out who brings the good vibes — the person whose messages are consistently positive and uplifting." },
                  { icon: "😔", title: "The Negative Nancy", desc: "Is there someone who always sees the glass half empty? The sentiment stats will show you clearly." },
                  { icon: "📈", title: "Mood Over Time", desc: "Did your chat get more positive or negative over time? See how the conversation mood has evolved." },
                  { icon: "💕", title: "Relationship Vibe", desc: "For couples or close friends — is your chat mostly positive? The sentiment score tells the real story." },
                ].map(item => (
                  <div key={item.title} className="p-5 rounded-2xl border border-border bg-card space-y-2">
                    <span className="text-3xl">{item.icon}</span>
                    <p className="font-bold">{item.title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black">What Sentiment Stats You Get</h2>
              <ul className="space-y-3">
                {[
                  "Overall chat sentiment score — positive, negative, or neutral",
                  "Percentage breakdown of positive vs negative vs neutral messages",
                  "Per-person sentiment — who is most positive/negative",
                  "Mood trend over time — how sentiment changed",
                  "Most positive single message in the chat",
                  "Most negative single message in the chat",
                  "Works for both individual chats and group chats",
                  "Supports all languages — Urdu, Arabic, Hindi, English",
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-rose-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="p-6 md:p-8 rounded-2xl bg-rose-500/8 border border-rose-500/20 space-y-4">
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-rose-600" />
                <h2 className="text-xl font-black">100% Private Sentiment Analysis</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Your WhatsApp chats contain personal conversations. EasyTool processes your export file <strong>entirely in your browser</strong> using JavaScript. Your messages, sentiments, and contact names never leave your device. No server, no database, no storage — complete privacy guaranteed.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {[
                  { q: "How do I analyze WhatsApp chat sentiment?", a: "Export your WhatsApp chat (tap ⋮ → More → Export Chat → Without Media on Android, or tap contact name → Export Chat on iPhone), then upload the file to EasyTool's WhatsApp Chat Analyzer. It instantly shows the overall sentiment and mood breakdown." },
                  { q: "Can I see if my chat is positive or negative?", a: "Yes. EasyTool analyzes every message and calculates an overall sentiment score, showing you exactly how positive or negative your conversation is as a percentage." },
                  { q: "Does it work for Urdu and Arabic chats?", a: "Yes. EasyTool supports multilingual sentiment analysis including Urdu, Arabic, Hindi, and English. It detects mood regardless of the language used in your chat." },
                  { q: "Is sentiment analysis private?", a: "100% private. Everything happens in your browser. Your chat file is never uploaded to any server and no data is stored anywhere." },
                  { q: "Can I see sentiment per person?", a: "Yes. You get both overall chat sentiment and per-person sentiment analysis — find out who is the most positive or negative participant." },
                ].map((item, i) => (
                  <div key={i} className="p-5 rounded-xl border border-border bg-card">
                    <p className="font-bold text-sm mb-2 flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-rose-500 flex-shrink-0 mt-0.5" />
                      {item.q}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed pl-6">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          <div className="space-y-5 lg:sticky lg:top-6 self-start">
            <div className="rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 p-6 text-white space-y-4">
              <span className="text-3xl">😊</span>
              <div>
                <p className="font-black text-lg leading-tight">Analyze Your Chat Mood</p>
                <p className="text-white/80 text-xs mt-1 leading-relaxed">Upload your WhatsApp export and see if your chat is positive — free, private, no signup.</p>
              </div>
              <Link href="/tools/whatsapp-chat-analyzer">
                <Button className="w-full bg-white text-rose-700 hover:bg-white/90 font-bold h-10 rounded-xl">
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
                  { label: "Response Time Checker", href: "/whatsapp-response-time-checker", icon: "⏱️" },
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
