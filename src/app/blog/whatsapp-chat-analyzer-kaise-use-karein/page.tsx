import { Metadata } from "next"
import Link from "next/link"
import { MessageSquare, ChevronRight, CheckCircle2, ArrowRight, Shield, Zap, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "WhatsApp Chat Analyzer Kaise Use Karein — Step by Step Guide | EasyTool",
  description: "WhatsApp chat analyzer kaise use karein? Complete step by step guide in Urdu/Hindi. WhatsApp chat export, analyze, stats dekhne ka tarika. Bilkul free aur safe!",
  keywords: [
    "whatsapp chat analyzer kaise use karein",
    "whatsapp chat analyze karna",
    "whatsapp stats kaise dekhein",
    "whatsapp chat export kaise karein",
    "whatsapp messages count kaise karein",
    "whatsapp emoji analyzer urdu",
    "whatsapp word cloud generator hindi",
    "whatsapp chat analysis tool free",
  ],
  alternates: { canonical: "https://easytool.live/blog/whatsapp-chat-analyzer-kaise-use-karein" },
  openGraph: {
    title: "WhatsApp Chat Analyzer Kaise Use Karein",
    description: "Complete guide in Urdu/Hindi — WhatsApp chat analyze karne ka tarika.",
    url: "https://easytool.live/blog/whatsapp-chat-analyzer-kaise-use-karein",
    siteName: "EasyTool",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WhatsApp Chat Analyzer Kaise Use Karein",
    description: "Complete guide in Urdu/Hindi — step by step.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "WhatsApp Chat Analyzer Kaise Use Karein — Step by Step Guide",
  "description": "Complete guide in Urdu/Hindi how to use WhatsApp chat analyzer. Export chat, analyze, and see detailed statistics.",
  "author": { "@type": "Organization", "name": "EasyTool" },
  "publisher": { "@type": "Organization", "name": "EasyTool" },
  "datePublished": "2025-05-03",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://easytool.live/blog/whatsapp-chat-analyzer-kaise-use-karein",
  },
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "WhatsApp chat analyze karne ka tarika kya hai?", "acceptedAnswer": { "@type": "Answer", "text": "Sab se pehle WhatsApp chat export karein (3-dot menu > More > Export Chat > Without Media), phir EasyTool par upload karein. Aapko complete stats dikh jayenge — messages count, emojis, word cloud, aur bohot kuch!" } },
    { "@type": "Question", "name": "WhatsApp chat export kaise karein?", "acceptedAnswer": { "@type": "Answer", "text": "Android par: chat open karein > 3 dots > More > Export Chat > Without Media. iPhone par: chat open karein > contact name tap karein > Export Chat > Without Media. File save ho jayegi." } },
    { "@type": "Question", "name": "Kya WhatsApp chat analyzer safe hai?", "acceptedAnswer": { "@type": "Answer", "text": "100% safe! EasyTool aapki chat ko sirf aapke browser mein process karta hai. Koi bhi data server pe upload nahi hota, na hi store hota. Aapki privacy bilkul protected hai!" } },
    { "@type": "Question", "name": "WhatsApp mein kitne messages hain kaise pata karein?", "acceptedAnswer": { "@type": "Answer", "text": "WhatsApp chat export karein aur EasyTool par upload karein. Aapko exact message count, per person stats, top emojis, word cloud, aur bohot saari aur details mil jayengi." } },
    { "@type": "Question", "name": "Kya yeh tool free hai?", "acceptedAnswer": { "@type": "Answer", "text": "Bilkul free! EasyTool bilkul muft hai. Koi signup nahi, koi payment nahi, sirf aake use karein. Sab features bilkul free hain!" } },
  ],
}

function GuideMockup() {
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
            <MessageSquare className="w-4 h-4 text-white" />
            <p className="text-white text-[9px] font-bold">WhatsApp Stats</p>
          </div>
          <div className="p-3 bg-gray-50 space-y-2.5">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 text-center">
              <p className="text-[16px] font-black text-emerald-700">5,847</p>
              <p className="text-[7px] text-emerald-500">Total Messages</p>
            </div>
            <div className="bg-white rounded-xl p-2.5 border border-gray-100 shadow-sm">
              <p className="text-[7px] font-bold text-gray-500 mb-2">Top Senders</p>
              <div className="space-y-1">
                {[
                  { name: "Ali", msgs: 2847 },
                  { name: "Sara", msgs: 2156 },
                  { name: "Ahmed", msgs: 844 },
                ].map((p) => (
                  <div key={p.name} className="flex items-center justify-between">
                    <span className="text-[7px] text-gray-700">{p.name}</span>
                    <span className="text-[7px] font-bold text-gray-500">{p.msgs}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-2 text-center">
              <p className="text-[7px] font-black text-blue-700">😂 is top emoji!</p>
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

export default function WhatsAppChatAnalyzerGuide() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="bg-gradient-to-b from-emerald-500/10 to-transparent border-b border-emerald-500/15">
        <div className="container py-10 md:py-16">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">Guide (Urdu/Hindi)</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/25 font-bold">📖 Complete Guide</Badge>
                <Badge variant="outline" className="font-semibold">Urdu/Hindi</Badge>
                <Badge variant="outline" className="font-semibold">Step by Step</Badge>
              </div>

              <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                WhatsApp Chat Analyzer
                <span className="block text-emerald-500 mt-1">Kaise Use Karein?</span>
              </h1>

              <p className="text-muted-foreground text-lg leading-relaxed">
                Is complete guide mein aap seekhenge WhatsApp chat analyze karne ka tarika — step by step, Urdu/Hindi mein. Chat export karein, upload karein, aur amazing stats dekhiye. <strong>Bilkul free aur 100% safe!</strong>
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/tools/whatsapp-chat-analyzer">
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 font-bold rounded-xl h-12 px-8 shadow-lg shadow-emerald-600/25 w-full sm:w-auto text-white">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Abhi Use Karein — Free!
                  </Button>
                </Link>
                <Link href="/how-to-export-whatsapp-chat">
                  <Button size="lg" variant="outline" className="font-bold rounded-xl h-12 px-6 w-full sm:w-auto">
                    Export Guide
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                {[
                  { icon: Shield, text: "100% Safe & Private" },
                  { icon: Zap, text: "Instant Results" },
                  { icon: CheckCircle2, text: "No Signup Needed" },
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-1.5">
                    <item.icon className="h-4 w-4 text-emerald-500" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <GuideMockup />
            </div>
          </div>
        </div>
      </div>

      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-12">

            <section className="space-y-4">
              <h2 className="text-2xl font-black">Introduction — Kya Hai Ye Tool?</h2>
              <p className="text-muted-foreground leading-relaxed">
                EasyTool ka WhatsApp Chat Analyzer aisa tool hai jo aapki WhatsApp chat ko analyze karke amazing stats deta hai — like kitne messages hue, kaun sabse zyada baat karta hai, kaunsa emoji sabse zyada use hota hai, word cloud, aur bohot kuch!
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Sab se best part? Yeh <strong>bilkul free hai</strong>, aur <strong>100% safe</strong>. Aapki chat kisi server pe upload nahi hoti — sab kuch aapke browser mein hi hota hai!
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: "Free", sub: "Koi paisa nahi", icon: "💸" },
                  { label: "Safe", sub: "Privacy first", icon: "🔒" },
                  { label: "Fast", sub: "Instant results", icon: "⚡" },
                  { label: "Easy", sub: "Bas 3 steps", icon: "👍" },
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
              <h2 className="text-2xl font-black">Step 1 — WhatsApp Chat Export Karein</h2>
              <p className="text-muted-foreground leading-relaxed">
                Sab se pehle aapko apni WhatsApp chat export karni hogi. Iske liye ye steps follow karein:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl border border-border bg-card">
                  <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                    <span className="text-2xl">🤖</span> Android Users
                  </h3>
                  <ol className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">1</span>
                      <span>WhatsApp open karein aur wo chat select karein jise aap analyze karna chahte hain</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">2</span>
                      <span>Top right pe 3 dots (⋮) wale button par tap karein</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">3</span>
                      <span>"More" par click karein</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">4</span>
                      <span>"Export Chat" select karein</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">5</span>
                      <span>"Without Media" choose karein (taaki file zyada badi na ho)</span>
                    </li>
                  </ol>
                </div>
                <div className="p-5 rounded-2xl border border-border bg-card">
                  <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                    <span className="text-2xl">🍎</span> iPhone Users
                  </h3>
                  <ol className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">1</span>
                      <span>WhatsApp open karein aur chat select karein</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">2</span>
                      <span>Top par contact/group name par tap karein</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">3</span>
                      <span>Neeche scroll karein aur "Export Chat" par tap karein</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">4</span>
                      <span>"Without Media" select karein</span>
                    </li>
                  </ol>
                </div>
              </div>
              <p className="text-muted-foreground text-sm">
                <strong>Note:</strong> Chat export hoke aapke device par .zip ya .txt file save ho jayegi.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-black">Step 2 — EasyTool Par Upload Karein</h2>
              <p className="text-muted-foreground leading-relaxed">
                Ab aapki chat file ready hai! Ab EasyTool par upload karne ka time:
              </p>
              <div className="space-y-4">
                {[
                  { step: "1", title: "EasyTool open karein", desc: "Browser mein EasyTool ka WhatsApp Chat Analyzer open karein." },
                  { step: "2", title: "File choose karein", desc: "\"Upload File\" button par click karein aur apni exported chat file select karein." },
                  { step: "3", title: "Wait karein bas thoda", desc: "Jaise hi file upload hogi, processing automatically start ho jayegi — bas 1-2 seconds!" },
                ].map(s => (
                  <div key={s.step} className="flex gap-4 p-5 rounded-2xl border border-border bg-card">
                    <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black text-sm flex-shrink-0">
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
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl h-11 px-8 shadow-lg shadow-emerald-600/20">
                  Abhi Upload Karein <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black">Step 3 — Stats Enjoy Karein!</h2>
              <p className="text-muted-foreground leading-relaxed">
                Maza aa jayega! Aapko ye saari amazing stats milengi:
              </p>
              <ul className="space-y-3">
                {[
                  "Total messages ka count — kitne baat hui!",
                  "Per person stats — kaun sabse zyada bolta hai",
                  "Top emojis — kaunsa emoji sabse zyada use hua",
                  "Word cloud — kaunse words sabse zyada aaye",
                  "Most active time — kab sabse zyada baat hoti hai",
                  "Response time — kaun jaldi reply karta hai",
                  "Media count — kitne photos/videos share hue",
                  "Sentiment analysis — chat positive hai ya negative",
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="p-6 md:p-8 rounded-2xl bg-emerald-500/8 border border-emerald-500/20 space-y-4">
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-emerald-600" />
                <h2 className="text-xl font-black">Kya Yeh Safe Hai? Haan Bilkul!</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Hum samajhte hain ki aapki chats personal hoti hain. Isliye EasyTool aapki chat ko <strong>sirf aapke browser mein</strong> process karta hai. Koi bhi message, name, ya data <strong>kabhi bhi server pe upload nahi hota</strong>, na hi store hota. Aap close karte hi sab kuch disappear ho jata hai!
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { label: "No Server Upload", icon: "🔒" },
                  { label: "No Data Stored", icon: "🗑️" },
                  { label: "No Signup", icon: "✅" },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-2 p-3 rounded-xl bg-white/50 dark:bg-white/5 border border-emerald-500/15">
                    <span className="text-lg">{item.icon}</span>
                    <p className="text-sm font-semibold">{item.label}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black">Aksar Poochhe Jaane Waale Sawal</h2>
              <div className="space-y-3">
                {[
                  { q: "WhatsApp chat analyze karne se kya hota hai?", a: "Aapko pata chalta hai ki kitne messages hue, kaun sabse zyada baat karta hai, kaunsa emoji sabse zyada use hota hai, word cloud, active time, aur bohot saari interesting details!" },
                  { q: "Kya ye tool bilkul free hai?", a: "Haan bilkul! EasyTool poora free hai. Koi hidden charges nahi, koi subscription nahi, bas aake freely use karein!" },
                  { q: "Kya meri chat safe hai?", a: "100% safe! Aapki chat kahi upload nahi hoti. Sab kuch aapke browser mein hi hota hai. Aapke paas hi rehta hai, hum nahi dekh sakte!" },
                  { q: "Kitne chats analyze kar sakte hain?", a: "Jitne chahen! Har chat ko alag-alag export karke upload karein. Koi limit nahi!" },
                  { q: "Group chat analyze ho jayega?", a: "Haan bilkul! Individual chat aur group chat — dono analyze ho jate hain same tareeke se!" },
                ].map((item, i) => (
                  <div key={i} className="p-5 rounded-xl border border-border bg-card">
                    <p className="font-bold text-sm mb-2 flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      {item.q}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed pl-6">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          <div className="space-y-5 lg:sticky lg:top-6 self-start">
            <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 p-6 text-white space-y-4">
              <MessageSquare className="h-8 w-8 text-white/80" />
              <div>
                <p className="font-black text-lg leading-tight">Abhi Try Karein!</p>
                <p className="text-white/80 text-xs mt-1 leading-relaxed">Apni WhatsApp chat export karein aur upload karein — 100% free aur safe!</p>
              </div>
              <Link href="/tools/whatsapp-chat-analyzer">
                <Button className="w-full bg-white text-emerald-700 hover:bg-white/90 font-bold h-10 rounded-xl">
                  Start Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
              <p className="font-bold text-sm">Quick Links</p>
              <div className="space-y-2">
                {[
                  { label: "Export Guide", href: "/how-to-export-whatsapp-chat", icon: "📤" },
                  { label: "Word Cloud", href: "/whatsapp-word-cloud-generator", icon: "☁️" },
                  { label: "Emoji Analyzer", href: "/whatsapp-emoji-analyzer", icon: "😂" },
                  { label: "Response Time", href: "/whatsapp-response-time-checker", icon: "⏱️" },
                ].map(item => (
                  <Link key={item.href} href={item.href} className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-muted transition-colors group">
                    <span className="text-base">{item.icon}</span>
                    <span className="text-xs font-medium group-hover:text-primary transition-colors">{item.label}</span>
                    <ChevronRight className="h-3 w-3 text-muted-foreground ml-auto" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
              <p className="font-bold text-sm">Related Pages</p>
              <div className="space-y-2">
                {[
                  { label: "WhatsApp Chat Analyzer", href: "/tools/whatsapp-chat-analyzer", icon: "💬" },
                  { label: "Most Active Member", href: "/whatsapp-most-active-member", icon: "🏆" },
                  { label: "Sentiment Analysis", href: "/whatsapp-sentiment-analysis", icon: "😊" },
                  { label: "Blog", href: "/blog", icon: "📖" },
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
