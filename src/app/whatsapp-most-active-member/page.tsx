import { Metadata } from "next"
import Link from "next/link"
import { MessageSquare, ChevronRight, CheckCircle2, ArrowRight, Shield, Zap, AlertCircle, Trophy, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "WhatsApp Most Active Member Finder — Who Sends Most Messages? | EasyTool",
  description: "Find who sends the most messages in your WhatsApp group. Discover the most active member, top senders ranking, and message count per person. Free, private, no signup.",
  keywords: [
    "whatsapp most active member finder",
    "who sends most messages in whatsapp group",
    "whatsapp group top sender",
    "most active person in whatsapp group",
    "whatsapp message count per person",
    "who talks most in whatsapp group",
    "whatsapp group activity stats",
    "find most active whatsapp member free",
  ],
  alternates: { canonical: "https://easytool.live/whatsapp-most-active-member" },
  openGraph: {
    title: "WhatsApp Most Active Member Finder — Who Sends Most Messages?",
    description: "Find who sends the most messages in your WhatsApp group. Free, private, instant analysis.",
    url: "https://easytool.live/whatsapp-most-active-member",
    siteName: "EasyTool",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WhatsApp Most Active Member Finder — Who Sends Most Messages?",
    description: "Find who sends the most messages in your WhatsApp group. Free, private, no signup.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "WhatsApp Most Active Member Finder",
  "description": "Find the most active member in WhatsApp groups. See message count per person, top senders ranking, and activity stats.",
  "url": "https://easytool.live/whatsapp-most-active-member",
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
    { "@type": "Question", "name": "How do I find the most active member in a WhatsApp group?", "acceptedAnswer": { "@type": "Answer", "text": "Export your WhatsApp group chat (tap group name > Export Chat > Without Media), then upload the file to EasyTool. It ranks every member by message count, showing who sends the most messages." } },
    { "@type": "Question", "name": "Who sends the most messages in WhatsApp group?", "acceptedAnswer": { "@type": "Answer", "text": "To find out, export your group chat and upload it to EasyTool's WhatsApp Chat Analyzer. It shows a ranked leaderboard of all members by message count, words sent, and media shared." } },
    { "@type": "Question", "name": "Can I see message count per person in WhatsApp?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. EasyTool shows message count, word count, media count, and emoji count for every participant in the chat." } },
    { "@type": "Question", "name": "Is it safe to check WhatsApp group activity?", "acceptedAnswer": { "@type": "Answer", "text": "100% safe. EasyTool processes your chat file entirely in your browser. Your messages never leave your device and are never uploaded to any server." } },
    { "@type": "Question", "name": "Does WhatsApp show who sends the most messages?", "acceptedAnswer": { "@type": "Answer", "text": "WhatsApp does not have a built-in feature to show message counts per person. You need to export the chat and use EasyTool to see the full activity breakdown." } },
  ],
}

// Leaderboard mockup
function LeaderboardMockup() {
  const members = [
    { rank: 1, name: "Ahmed", msgs: 1842, pct: 100, color: "bg-amber-400", medal: "🥇" },
    { rank: 2, name: "Sara", msgs: 1203, pct: 65, color: "bg-gray-400", medal: "🥈" },
    { rank: 3, name: "Ali", msgs: 876, pct: 48, color: "bg-amber-600", medal: "🥉" },
    { rank: 4, name: "Zara", msgs: 543, pct: 29, color: "bg-blue-400", medal: "4️⃣" },
    { rank: 5, name: "Usman", msgs: 312, pct: 17, color: "bg-green-400", medal: "5️⃣" },
  ]

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
            <Trophy className="w-4 h-4 text-amber-300" />
            <p className="text-white text-[9px] font-bold">Most Active Members</p>
          </div>
          <div className="p-3 bg-gray-50 space-y-2">
            {/* Top 3 podium */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 text-center">
              <p className="text-[18px]">🥇</p>
              <p className="text-[10px] font-black text-amber-700">Ahmed</p>
              <p className="text-[8px] text-amber-500">1,842 messages · 38%</p>
            </div>
            {/* Full leaderboard */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <p className="text-[7px] font-bold text-gray-400 uppercase tracking-wide px-2.5 pt-2 pb-1">Full Ranking</p>
              {members.map((m) => (
                <div key={m.name} className="px-2.5 py-1.5 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[9px]">{m.medal}</span>
                    <span className="text-[8px] font-bold text-gray-700 flex-1">{m.name}</span>
                    <span className="text-[7px] font-bold text-gray-500">{m.msgs.toLocaleString()}</span>
                  </div>
                  <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full", m.color)} style={{ width: `${m.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
            {/* Fun fact */}
            <div className="bg-violet-50 border border-violet-200 rounded-xl p-2 text-center">
              <p className="text-[8px] font-black text-violet-700">Ahmed sends 6x more than Usman!</p>
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

export default function WhatsAppMostActiveMember() {
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
            <span className="text-foreground font-medium">Most Active Member</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/25 font-bold">🏆 Activity Ranking</Badge>
                <Badge variant="outline" className="font-semibold">Free Tool</Badge>
                <Badge variant="outline" className="font-semibold">100% Private</Badge>
              </div>

              <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                WhatsApp Most Active Member Finder
                <span className="block text-amber-500 mt-1">Who Talks the Most?</span>
              </h1>

              <p className="text-muted-foreground text-lg leading-relaxed">
                Find out who sends the most messages in your WhatsApp group. Get a full leaderboard of all members ranked by message count, words sent, media shared, and more. <strong>Free, private, instant.</strong>
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/tools/whatsapp-chat-analyzer">
                  <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl h-12 px-8 shadow-lg shadow-amber-500/25 w-full sm:w-auto">
                    <Trophy className="mr-2 h-5 w-5" />
                    Find Most Active Member
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
              <LeaderboardMockup />
            </div>
          </div>
        </div>
      </div>

      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-12">

            {/* What is it */}
            <section className="space-y-4">
              <h2 className="text-2xl font-black">What is WhatsApp Most Active Member Finder?</h2>
              <p className="text-muted-foreground leading-relaxed">
                The <strong>WhatsApp Most Active Member Finder</strong> analyzes your exported group chat and ranks every member by their activity level. It counts messages, words, media files, and emojis per person — giving you a complete leaderboard of who contributes the most to the conversation.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This is especially popular for friend groups, family chats, and work groups where people are curious about who dominates the conversation. The results are often surprising — and always shareable!
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: "Message Count", sub: "Per person", icon: "💬" },
                  { label: "Word Count", sub: "Total words sent", icon: "📝" },
                  { label: "Media Shared", sub: "Photos & videos", icon: "📸" },
                  { label: "% of Chat", sub: "Share of total", icon: "📊" },
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
              <h2 className="text-2xl font-black">How to Find Most Active WhatsApp Member</h2>
              <div className="space-y-4">
                {[
                  { step: "1", title: "Export your WhatsApp group chat", desc: "Open the group → tap the group name at the top → Export Chat → Without Media. Save the ZIP file. Works the same on Android and iPhone." },
                  { step: "2", title: "Upload to EasyTool", desc: "Go to EasyTool's WhatsApp Chat Analyzer and upload your .zip or .txt file. It processes everything locally in your browser." },
                  { step: "3", title: "See the full leaderboard", desc: "Instantly see all members ranked by message count, with percentage share, word count, media count, and emoji count per person." },
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
                  Find Most Active Member <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </section>

            {/* Why people use it */}
            <section className="space-y-4">
              <h2 className="text-2xl font-black">Why People Check WhatsApp Group Activity</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: "😂", title: "Settle Debates", desc: "Every group has that one person who claims they never text much. The stats settle the debate once and for all." },
                  { icon: "🏆", title: "Group Competitions", desc: "Who is the undisputed group champion? Share the leaderboard and let the bragging rights begin." },
                  { icon: "😶", title: "Find the Silent Ones", desc: "Who is in the group but never says anything? The activity stats reveal the lurkers." },
                  { icon: "📊", title: "Group Health Check", desc: "Is your group dominated by one person? Or is participation balanced? The stats show the real picture." },
                ].map(item => (
                  <div key={item.title} className="p-5 rounded-2xl border border-border bg-card space-y-2">
                    <span className="text-3xl">{item.icon}</span>
                    <p className="font-bold">{item.title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Full stats list */}
            <section className="space-y-4">
              <h2 className="text-2xl font-black">Complete Activity Stats You Get</h2>
              <ul className="space-y-3">
                {[
                  "Full member leaderboard ranked by total message count",
                  "Percentage share of total messages for each member",
                  "Total words sent per person",
                  "Media files shared per person (photos, videos, audio)",
                  "Emoji count per person",
                  "Most active day and hour for the group overall",
                  "Total messages, words, and media for the entire group",
                  "Works for groups of any size — 2 people to 256 members",
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
                <h2 className="text-xl font-black">100% Private — Group Chat Stays Private</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Group chats contain conversations from multiple people. EasyTool processes your export file <strong>entirely in your browser</strong>. No messages, names, or data are ever sent to any server. The analysis is instant, local, and completely private.
              </p>
            </section>

            {/* FAQ */}
            <section className="space-y-4">
              <h2 className="text-2xl font-black">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {[
                  { q: "How do I find the most active member in a WhatsApp group?", a: "Export your WhatsApp group chat (tap group name → Export Chat → Without Media), then upload the file to EasyTool's WhatsApp Chat Analyzer. It instantly shows a ranked leaderboard of all members by message count." },
                  { q: "Does WhatsApp show message count per person?", a: "WhatsApp does not have a built-in feature to show message counts per person. You need to export the chat and use EasyTool to see the full activity breakdown." },
                  { q: "Can I check activity for individual chats too?", a: "Yes. The same tool works for both individual chats and group chats. For individual chats, it shows the message split between you and the other person." },
                  { q: "How many members can it analyze?", a: "EasyTool can analyze WhatsApp groups of any size — from 2 people to the maximum 256 members. All members are ranked in the leaderboard." },
                  { q: "Will the group members know I checked?", a: "No. You are only analyzing your own exported chat file locally in your browser. No one in the group is notified." },
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
              <Trophy className="h-8 w-8 text-white/80" />
              <div>
                <p className="font-black text-lg leading-tight">Find Most Active Member</p>
                <p className="text-white/80 text-xs mt-1 leading-relaxed">Upload your group chat and see the full leaderboard — free, private, no signup.</p>
              </div>
              <Link href="/tools/whatsapp-chat-analyzer">
                <Button className="w-full bg-white text-amber-700 hover:bg-white/90 font-bold h-10 rounded-xl">
                  Analyze Now Free <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
              <p className="font-bold text-sm">How to export WhatsApp group?</p>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div>
                  <p className="font-bold text-foreground mb-1">Android</p>
                  <p>Open group → ⋮ → More → Export Chat → Without Media</p>
                </div>
                <div className="h-px bg-border" />
                <div>
                  <p className="font-bold text-foreground mb-1">iPhone</p>
                  <p>Open group → tap group name → Export Chat → Without Media</p>
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
                  { label: "Emoji Analyzer", href: "/whatsapp-emoji-analyzer", icon: "😂" },
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
