import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, CheckCircle2, ArrowRight, Shield, Zap, AlertCircle, Heart, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Who Texts You Most on WhatsApp — Find Out Who Likes You! | EasyTool",
  description: "Find out who texts you most on WhatsApp! See who messages you the most, who talks to you most, and who might have a crush on you. Fun, free, and 100% private.",
  keywords: [
    "who texts me most on whatsapp",
    "find out who talks to you most whatsapp",
    "whatsapp most messages from one person",
    "who likes me on whatsapp test",
    "who messages me the most whatsapp",
    "whatsapp crush detector free",
    "who texts you most analyzer",
    "find my whatsapp top sender",
  ],
  alternates: { canonical: "https://easytool.live/whatsapp-who-texts-you-most" },
  openGraph: {
    title: "Who Texts You Most on WhatsApp — Find Out!",
    description: "Find out who texts you most on WhatsApp. Fun crush detector — free and private!",
    url: "https://easytool.live/whatsapp-who-texts-you-most",
    siteName: "EasyTool",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Who Texts You Most on WhatsApp — Find Out!",
    description: "Find out who texts you most on WhatsApp. Fun, free, private.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Who Texts You Most on WhatsApp",
  "description": "Find out who texts you most on WhatsApp. Analyze message counts and see who messages you the most.",
  "url": "https://easytool.live/whatsapp-who-texts-you-most",
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
    { "@type": "Question", "name:": "How do I find who texts me most on WhatsApp?", "acceptedAnswer": { "@type": "Answer", "text": "Export your WhatsApp chat (tap 3-dot menu > More > Export Chat > Without Media), then upload the file to EasyTool. It shows you exactly who sent the most messages — and it might just reveal your crush!" } },
    { "@type": "Question", "name": "Can I see who messages me the most on WhatsApp?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! EasyTool counts every message from each person in your chat and shows you a ranked list of who texts you the most. The results are often surprising!" } },
    { "@type": "Question", "name": "Is this a real crush detector?", "acceptedAnswer": { "@type": "Answer", "text": "While nothing is 100% certain, if someone texts you WAY more than anyone else, it's a pretty good sign they like talking to you! Let the stats speak for themselves 😉" } },
    { "@type": "Question", "name": "Is it private to check who texts me most?", "acceptedAnswer": { "@type": "Answer", "text": "100% private! EasyTool processes everything in your browser. Your chats never leave your device and no one else will ever see your results — not even us!" } },
    { "@type": "Question", "name": "Can I check multiple chats?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely! Export each chat separately and upload them one by one. Find out who texts you most across all your conversations!" } },
  ],
}

function CrushDetectorMockup() {
  return (
    <div className="relative w-[210px] mx-auto">
      <div className="bg-gray-900 rounded-[28px] p-[3px] shadow-2xl shadow-black/40 ring-1 ring-white/5">
        <div className="bg-white rounded-[25px] overflow-hidden">
          <div className="bg-gradient-to-r from-pink-500 to-rose-500 px-3 pt-1.5 pb-0.5 flex items-center justify-between">
            <span className="text-white text-[7px] font-bold">9:41</span>
            <div className="flex gap-px items-end h-2">
              <div className="w-px h-1 bg-white/60 rounded-sm" />
              <div className="w-px h-1.5 bg-white/80 rounded-sm" />
              <div className="w-px h-2 bg-white rounded-sm" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-pink-500 to-rose-500 px-3 py-2 flex items-center gap-2">
            <Heart className="w-4 h-4 text-white" />
            <p className="text-white text-[9px] font-bold">Crush Detector</p>
          </div>
          <div className="p-3 bg-gray-50 space-y-2.5">
            <div className="bg-pink-50 border border-pink-200 rounded-xl p-3 text-center">
              <p className="text-[22px]">💕</p>
              <p className="text-[10px] font-black text-pink-700">Sara texts you MOST!</p>
              <p className="text-[7px] text-pink-500 mt-0.5">1,847 messages · 4x more than others</p>
            </div>
            <div className="bg-white rounded-xl p-2.5 border border-gray-100 shadow-sm">
              <p className="text-[7px] font-bold text-gray-400 uppercase tracking-wide mb-2">Top Senders</p>
              <div className="space-y-1.5">
                {[
                  { name: "Sara", msgs: 1847, color: "bg-pink-400" },
                  { name: "Ahmed", msgs: 543, color: "bg-blue-400" },
                  { name: "Ali", msgs: 321, color: "bg-emerald-400" },
                ].map((p, i) => (
                  <div key={p.name} className="flex items-center gap-1.5">
                    <span className="text-[8px] text-gray-400 w-4">{i + 1}.</span>
                    <span className="text-[8px] font-bold text-gray-700 flex-1">{p.name}</span>
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className={p.color} style={{ width: i === 0 ? "100%" : i === 1 ? "30%" : "17%" }} />
                    </div>
                    <span className="text-[7px] font-bold text-gray-500 w-10 text-right">{p.msgs}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-2 text-center">
              <p className="text-[8px] font-black text-rose-700">Someone likes you! 😏</p>
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

export default function WhoTextsYouMost() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="bg-gradient-to-b from-pink-500/10 to-transparent border-b border-pink-500/15">
        <div className="container py-10 md:py-16">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/tools/whatsapp-chat-analyzer" className="hover:text-foreground transition-colors">WhatsApp Analyzer</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">Who Texts You Most</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-pink-500/15 text-pink-700 dark:text-pink-400 border-pink-500/25 font-bold">💕 Crush Detector</Badge>
                <Badge variant="outline" className="font-semibold">Super Fun</Badge>
                <Badge variant="outline" className="font-semibold">100% Private</Badge>
              </div>

              <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                Who Texts You Most?
                <span className="block text-pink-500 mt-1">Find Out Who Likes You! 😏</span>
              </h1>

              <p className="text-muted-foreground text-lg leading-relaxed">
                Curious who texts you the most on WhatsApp? Want to know who might have a crush on you? Upload your chats and let the stats reveal the truth. <strong>Fun, free, and completely private!</strong>
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/tools/whatsapp-chat-analyzer">
                  <Button size="lg" className="bg-pink-600 hover:bg-pink-700 font-bold rounded-xl h-12 px-8 shadow-lg shadow-pink-600/25 w-full sm:w-auto text-white">
                    <Heart className="mr-2 h-5 w-5" />
                    Find Out Now — Free!
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
                  { icon: Shield, text: "No one sees your chats" },
                  { icon: Zap, text: "Instant results" },
                  { icon: Sparkles, text: "Surprisingly accurate" },
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-1.5">
                    <item.icon className="h-4 w-4 text-pink-500" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <CrushDetectorMockup />
            </div>
          </div>
        </div>
      </div>

      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-12">

            <section className="space-y-4">
              <h2 className="text-2xl font-black">What Is This? (It's Fun!)</h2>
              <p className="text-muted-foreground leading-relaxed">
                This is the <strong>most fun WhatsApp tool ever</strong>! Upload your chat and see exactly who texts you the most. Is it your best friend? Your sibling? Or... someone who secretly likes you? The stats don't lie!
              </p>
              <p className="text-muted-foreground leading-relaxed">
                While we can't <em>officially</em> call it a crush detector... let's be real — if someone texts you <strong>3x more than anyone else</strong>, they definitely enjoy talking to you! 😏
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: "Top Senders", sub: "Ranked list", icon: "🏆" },
                  { label: "Message Count", sub: "Exact numbers", icon: "💬" },
                  { label: "Fun Stats", sub: "Surprising facts", icon: "🎉" },
                  { label: "Shareable", sub: "Show friends", icon: "📱" },
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
              <h2 className="text-2xl font-black">How to Find Who Texts You Most</h2>
              <div className="space-y-4">
                {[
                  { step: "1", title: "Pick a chat (or multiple!)", desc: "Think — who do you suspect texts you most? Your crush? Best friend? Export that chat first. Or export ALL your chats and compare!" },
                  { step: "2", title: "Export from WhatsApp", desc: "Open the chat → tap ⋮ (Android) or contact name (iPhone) → Export Chat → Without Media. Save the ZIP file — easy!" },
                  { step: "3", title: "Upload & discover!", desc: "Upload to EasyTool and instantly see who sent the most messages. The results might surprise you (or confirm what you already suspected!)" },
                ].map(s => (
                  <div key={s.step} className="flex gap-4 p-5 rounded-2xl border border-border bg-card">
                    <div className="w-9 h-9 rounded-xl bg-pink-600 flex items-center justify-center text-white font-black text-sm flex-shrink-0">
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
                <Button className="bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-xl h-11 px-8 shadow-lg shadow-pink-600/20">
                  Find My Top Texter <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black">Signs Someone Likes You (According to Stats)</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: "💬", title: "They Text First... A Lot", desc: "If they initiate 70%+ of conversations, that's a huge sign they like talking to you." },
                  { icon: "⚡", title: "Replies in Minutes", desc: "Fast replies = high priority. If they always text back quickly, you're important to them." },
                  { icon: "📊", title: "Way More Messages", desc: "2x, 3x, even 10x more messages than others? Yeah, they definitely like you." },
                  { icon: "😂", title: "Emojis Everywhere", desc: "Lots of emojis (especially hearts, blushes, smiles) means they're trying to be cute." },
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
              <h2 className="text-2xl font-black">Fun Things You'll Discover</h2>
              <ul className="space-y-3">
                {[
                  "Who actually texts you the most (spoiler: it's not always who you think!)",
                  "How many more messages they send compared to everyone else",
                  "Who initiates conversations vs who only replies",
                  "Who uses the most emojis (and which ones!)",
                  "Your texting pattern together — are you a match?",
                  "Who texts you at weird hours (late night texts = interesting!)",
                  "Perfect for sharing with friends (or teasing your crush!)",
                  "Works for friend groups, family chats, AND that special someone",
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-pink-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="p-6 md:p-8 rounded-2xl bg-pink-500/8 border border-pink-500/20 space-y-4">
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-pink-600" />
                <h2 className="text-xl font-black">100% Private — Your Secret Stays Secret</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                We get it — this is personal! EasyTool processes everything <strong>entirely in your browser</strong>. Your chats, your stats, your crush suspicions — <strong>no one ever sees them</strong>. No server, no storage, no accounts. Just you and your stats. Your secret is safe! 😉
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black">Frequently Asked Questions (The Fun Ones!)</h2>
              <div className="space-y-3">
                {[
                  { q: "Is this actually a crush detector?", a: "Officially? No. Unofficially? The stats speak for themselves! If someone texts you way more than anyone else, it's a pretty good sign they enjoy your company. We'll let you connect the dots 😉" },
                  { q: "Will the other person know I checked?", a: "Not at all! You're just analyzing your own chat export on your own device. They'll never receive a notification or find out in any way. Your secret is safe!" },
                  { q: "Can I check multiple people?", a: "Absolutely! Export each chat separately and upload them one by one. Compare who texts you most across all your conversations. The results can be eye-opening!" },
                  { q: "Is it free?", a: "100% free! No ads, no signup, no paid features. Just pure fun and stats. Enjoy!" },
                  { q: "What if the results are embarrassing?", a: "No worries! Only you see them. You can refresh the page and everything disappears. Or just don't show anyone — we won't tell! 😅" },
                ].map((item, i) => (
                  <div key={i} className="p-5 rounded-xl border border-border bg-card">
                    <p className="font-bold text-sm mb-2 flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-pink-500 flex-shrink-0 mt-0.5" />
                      {item.q}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed pl-6">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          <div className="space-y-5 lg:sticky lg:top-6 self-start">
            <div className="rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 p-6 text-white space-y-4">
              <span className="text-3xl">💕</span>
              <div>
                <p className="font-black text-lg leading-tight">Find Your Top Texter!</p>
                <p className="text-white/80 text-xs mt-1 leading-relaxed">Upload a chat and see who texts you most. The results might surprise you! Free, private, fun.</p>
              </div>
              <Link href="/tools/whatsapp-chat-analyzer">
                <Button className="w-full bg-white text-pink-700 hover:bg-white/90 font-bold h-10 rounded-xl">
                  Find Out Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
              <p className="font-bold text-sm">How to export chat?</p>
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
