import { Metadata } from "next"
import Link from "next/link"
import { MessageSquare, ChevronRight, CheckCircle2, Clock, ArrowRight, Zap, Shield, TrendingUp, Users, Heart, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "WhatsApp Response Time Checker — Who Replies Faster? | EasyTool",
  description: "Check who replies faster in WhatsApp — you or them? Find average response time, fastest reply, and who leaves you on read. Free, private, no signup needed.",
  keywords: [
    "whatsapp response time analyzer",
    "who replies faster in whatsapp",
    "check whatsapp reply time online",
    "whatsapp response time checker",
    "who takes longer to reply whatsapp",
    "whatsapp read receipts analyzer",
    "check who ignores you on whatsapp",
    "whatsapp reply speed checker free",
  ],
  alternates: { canonical: "https://easytool.live/whatsapp-response-time-checker" },
  openGraph: {
    title: "WhatsApp Response Time Checker — Who Replies Faster?",
    description: "Find out who replies faster in your WhatsApp chats. Free tool, 100% private.",
    url: "https://easytool.live/whatsapp-response-time-checker",
    siteName: "EasyTool",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WhatsApp Response Time Checker — Who Replies Faster?",
    description: "Find out who replies faster in your WhatsApp chats. Free, private, instant.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "WhatsApp Response Time Checker",
  "description": "Check who replies faster in WhatsApp chats. Analyze average response time, fastest reply, and reply patterns.",
  "url": "https://easytool.live/whatsapp-response-time-checker",
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
    { "@type": "Question", "name": "How do I check WhatsApp response time?", "acceptedAnswer": { "@type": "Answer", "text": "Export your WhatsApp chat (tap 3-dot menu > More > Export Chat > Without Media), then upload the file to EasyTool. It analyzes message timestamps to calculate average response times for each person." } },
    { "@type": "Question", "name": "Can I see who replies faster in WhatsApp?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. EasyTool's WhatsApp Chat Analyzer calculates response patterns from your exported chat file, showing who typically replies faster based on message timestamps." } },
    { "@type": "Question", "name": "Is WhatsApp response time checker private?", "acceptedAnswer": { "@type": "Answer", "text": "100% private. EasyTool processes your chat file entirely in your browser. Your messages never leave your device and are never uploaded to any server." } },
    { "@type": "Question", "name": "Does WhatsApp show response time?", "acceptedAnswer": { "@type": "Answer", "text": "WhatsApp does not show response time natively. You need to export your chat and use a tool like EasyTool to analyze message timestamps and calculate response patterns." } },
    { "@type": "Question", "name": "How to know if someone is ignoring you on WhatsApp?", "acceptedAnswer": { "@type": "Answer", "text": "Export your chat and analyze it with EasyTool. You can see average response times — if one person consistently takes much longer to reply, it shows in the stats." } },
  ],
}

// Phone mockup showing response time stats
function ResponseTimeMockup() {
  return (
    <div className="relative w-[200px] mx-auto">
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
            <MessageSquare className="w-4 h-4 text-white" />
            <p className="text-white text-[9px] font-bold">Response Time Analysis</p>
          </div>
          {/* Content */}
          <div className="p-3 space-y-2.5 bg-gray-50">
            {/* You vs Them */}
            <div className="bg-white rounded-xl p-2.5 border border-gray-100 shadow-sm">
              <p className="text-[8px] font-bold text-gray-500 mb-2 uppercase tracking-wide">Avg Response Time</p>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[8px] font-bold text-blue-600">You</span>
                    <span className="text-[8px] font-bold text-blue-600">4 min</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: "30%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[8px] font-bold text-rose-500">Them</span>
                    <span className="text-[8px] font-bold text-rose-500">47 min</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-400 rounded-full" style={{ width: "85%" }} />
                  </div>
                </div>
              </div>
            </div>
            {/* Verdict */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-2.5 text-center">
              <p className="text-[9px] font-black text-blue-700">You reply 11x faster! 😅</p>
              <p className="text-[7px] text-blue-500 mt-0.5">They take avg 47 min to reply</p>
            </div>
            {/* Stats row */}
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { label: "Fastest Reply", value: "12 sec", color: "text-green-600" },
                { label: "Slowest Reply", value: "3 days", color: "text-red-500" },
              ].map(s => (
                <div key={s.label} className="bg-white rounded-lg p-2 text-center border border-gray-100">
                  <p className={cn("text-[10px] font-black", s.color)}>{s.value}</p>
                  <p className="text-[6px] text-gray-400 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
            {/* Peak reply hours */}
            <div className="bg-white rounded-xl p-2.5 border border-gray-100">
              <p className="text-[8px] font-bold text-gray-500 mb-1.5">Their reply pattern</p>
              <div className="flex items-end gap-0.5 h-8">
                {[10, 20, 60, 90, 70, 40, 30, 20, 50, 80, 100, 60].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, backgroundColor: h === 100 ? "#3b82f6" : "#e2e8f0" }} />
                ))}
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-[6px] text-gray-400">Morning</span>
                <span className="text-[6px] text-blue-500 font-bold">Peak: 9PM</span>
                <span className="text-[6px] text-gray-400">Night</span>
              </div>
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

export default function WhatsAppResponseTimeChecker() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <div className="bg-gradient-to-b from-blue-500/10 to-transparent border-b border-blue-500/15">
        <div className="container py-10 md:py-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/tools/whatsapp-chat-analyzer" className="hover:text-foreground transition-colors">WhatsApp Analyzer</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">Response Time Checker</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/25 font-bold">⏱️ Response Time</Badge>
                <Badge variant="outline" className="font-semibold">Free Tool</Badge>
                <Badge variant="outline" className="font-semibold">100% Private</Badge>
              </div>

              <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                WhatsApp Response Time Checker
                <span className="block text-blue-500 mt-1">Who Replies Faster?</span>
              </h1>

              <p className="text-muted-foreground text-lg leading-relaxed">
                Find out who replies faster in your WhatsApp chats — you or them. See average response time, fastest reply, slowest reply, and peak reply hours. <strong>100% private, runs in your browser.</strong>
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/tools/whatsapp-chat-analyzer">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 font-bold rounded-xl h-12 px-8 shadow-lg shadow-blue-600/25 w-full sm:w-auto">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Check Response Time Free
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
                    <item.icon className="h-4 w-4 text-blue-500" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Phone mockup */}
            <div className="flex justify-center">
              <ResponseTimeMockup />
            </div>
          </div>
        </div>
      </div>

      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-12">

            {/* What is it */}
            <section className="space-y-4">
              <h2 className="text-2xl font-black">What is WhatsApp Response Time Checker?</h2>
              <p className="text-muted-foreground leading-relaxed">
                A <strong>WhatsApp response time checker</strong> analyzes your exported chat file and calculates how long each person takes to reply. It reads the timestamps of every message and computes the average time between a message being sent and the other person replying.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                EasyTool's <strong>WhatsApp Chat Analyzer</strong> does this automatically — upload your chat export and instantly see who replies faster, who takes the longest, and what time of day each person is most likely to respond.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                {[
                  { label: "Avg Response Time", sub: "Per person", icon: "⏱️" },
                  { label: "Fastest Reply", sub: "Quickest response", icon: "⚡" },
                  { label: "Slowest Reply", sub: "Longest wait", icon: "🐢" },
                  { label: "Peak Reply Hours", sub: "When they respond", icon: "📊" },
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
              <h2 className="text-2xl font-black">How to Check WhatsApp Response Time</h2>
              <div className="space-y-4">
                {[
                  {
                    step: "1",
                    title: "Export your WhatsApp chat",
                    desc: "Open the chat in WhatsApp → tap ⋮ (Android) or contact name (iPhone) → Export Chat → Without Media. Save the ZIP file.",
                    color: "bg-blue-500",
                  },
                  {
                    step: "2",
                    title: "Upload to EasyTool",
                    desc: "Go to EasyTool's WhatsApp Chat Analyzer and upload your .zip or .txt file. It processes everything in your browser — no server upload.",
                    color: "bg-blue-500",
                  },
                  {
                    step: "3",
                    title: "See response time stats",
                    desc: "Instantly see who replies faster, average response times, peak reply hours, and a full breakdown of messaging patterns.",
                    color: "bg-blue-500",
                  },
                ].map(s => (
                  <div key={s.step} className="flex gap-4 p-5 rounded-2xl border border-border bg-card">
                    <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm flex-shrink-0", s.color)}>
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
                <Button className="bg-blue-600 hover:bg-blue-700 font-bold rounded-xl h-11 px-8 shadow-lg shadow-blue-600/20">
                  Check My Response Time <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </section>

            {/* Why people check */}
            <section className="space-y-4">
              <h2 className="text-2xl font-black">Why Do People Check WhatsApp Response Time?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Checking WhatsApp response time has become one of the most popular ways to understand communication patterns. Here is why people use it:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: Heart, title: "Crush or Partner", desc: "The most common reason — people want to know if their crush or partner replies quickly or leaves them waiting. The stats reveal the truth!", color: "text-rose-500", bg: "bg-rose-500/8 border-rose-500/15" },
                  { icon: Users, title: "Friend Groups", desc: "Who in your friend group is the fastest responder? Who always takes hours to reply? Fun to compare and share.", color: "text-blue-500", bg: "bg-blue-500/8 border-blue-500/15" },
                  { icon: TrendingUp, title: "Work Chats", desc: "Track response times in professional chats to understand communication efficiency and identify bottlenecks.", color: "text-emerald-500", bg: "bg-emerald-500/8 border-emerald-500/15" },
                  { icon: Clock, title: "Self Awareness", desc: "Are you the one who always replies instantly? Or do you take forever? See your own response patterns clearly.", color: "text-violet-500", bg: "bg-violet-500/8 border-violet-500/15" },
                ].map(item => (
                  <div key={item.title} className={cn("p-5 rounded-2xl border", item.bg)}>
                    <item.icon className={cn("h-6 w-6 mb-3", item.color)} />
                    <p className="font-bold mb-1">{item.title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* What you can find out */}
            <section className="space-y-4">
              <h2 className="text-2xl font-black">What Can You Find Out?</h2>
              <p className="text-muted-foreground leading-relaxed">
                EasyTool's WhatsApp analyzer gives you a complete picture of messaging behavior from your exported chat:
              </p>
              <ul className="space-y-3">
                {[
                  "Average response time for each participant in the chat",
                  "Who replies faster — you or the other person",
                  "Fastest single reply ever sent in the conversation",
                  "Slowest reply — who made someone wait the longest",
                  "Time of day when each person is most likely to respond",
                  "Day of week with highest response activity",
                  "Total messages sent by each person",
                  "Whether the conversation is balanced or one-sided",
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Privacy section */}
            <section className="p-6 md:p-8 rounded-2xl bg-blue-500/8 border border-blue-500/20 space-y-4">
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-black">Is It Safe to Check WhatsApp Response Time?</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Yes — completely safe. EasyTool processes your WhatsApp export file <strong>entirely in your browser</strong>. Your chat messages, contact names, and personal data never leave your device. There is no server, no database, no storage. The analysis happens locally using JavaScript, and the file is discarded when you close the tab.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { label: "No server upload", icon: "🔒" },
                  { label: "No data stored", icon: "🗑️" },
                  { label: "No account needed", icon: "✅" },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-2 p-3 rounded-xl bg-white/50 dark:bg-white/5 border border-blue-500/15">
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
                  { q: "How do I check WhatsApp response time?", a: "Export your WhatsApp chat (tap ⋮ → More → Export Chat → Without Media on Android, or tap contact name → Export Chat on iPhone), then upload the file to EasyTool's WhatsApp Chat Analyzer. It instantly calculates response times from message timestamps." },
                  { q: "Does WhatsApp show response time natively?", a: "No. WhatsApp does not have a built-in response time feature. You need to export your chat and use a third-party analyzer like EasyTool to calculate response patterns from timestamps." },
                  { q: "Can I see if someone is ignoring me on WhatsApp?", a: "You can see average response times — if one person consistently takes much longer to reply (hours vs minutes), it shows clearly in the stats. EasyTool shows the response time comparison for each participant." },
                  { q: "Does the other person know I checked their response time?", a: "No. You are only analyzing your own exported chat file locally in your browser. The other person is not notified in any way." },
                  { q: "Can I check response time for group chats?", a: "Yes. Export the group chat and upload it to EasyTool. You will see response patterns and activity stats for every member of the group." },
                ].map((item, i) => (
                  <div key={i} className="p-5 rounded-xl border border-border bg-card">
                    <p className="font-bold text-sm mb-2 flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
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
            {/* CTA */}
            <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 p-6 text-white space-y-4">
              <Clock className="h-8 w-8 text-white/80" />
              <div>
                <p className="font-black text-lg leading-tight">Check Response Time</p>
                <p className="text-white/80 text-xs mt-1 leading-relaxed">Upload your WhatsApp export and see who replies faster — free, instant, private.</p>
              </div>
              <Link href="/tools/whatsapp-chat-analyzer">
                <Button className="w-full bg-white text-blue-700 hover:bg-white/90 font-bold h-10 rounded-xl">
                  Analyze Now Free <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* How to export */}
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

            {/* Related */}
            <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
              <p className="font-bold text-sm">Related Tools</p>
              <div className="space-y-2">
                {[
                  { label: "WhatsApp Chat Analyzer", href: "/tools/whatsapp-chat-analyzer", icon: "💬" },
                  { label: "Most Active Member", href: "/whatsapp-most-active-member", icon: "🏆" },
                  { label: "Emoji Analyzer", href: "/whatsapp-emoji-analyzer", icon: "😂" },
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
