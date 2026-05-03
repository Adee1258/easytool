import { Metadata } from "next"
import Link from "next/link"
import { MessageSquare, ChevronRight, CheckCircle2, AlertCircle, ArrowRight, Shield, Zap, Info, FileText, MoreVertical, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "How to Export WhatsApp Chat — Step-by-Step Guide (Android & iPhone) | EasyTool",
  description: "Learn how to export WhatsApp chat on Android and iPhone in 2024. Step-by-step guide to save WhatsApp chat history as TXT or ZIP file. Export individual chats and group chats easily.",
  keywords: ["how to export whatsapp chat","whatsapp chat export","save whatsapp chat history","export whatsapp chat android","export whatsapp chat iphone","whatsapp export chat to txt","how to save whatsapp messages","whatsapp chat backup export","export whatsapp group chat","download whatsapp chat history","whatsapp export without media"],
  alternates: { canonical: "https://easytool.live/how-to-export-whatsapp-chat" },
  openGraph: { title: "How to Export WhatsApp Chat — Android & iPhone Guide | EasyTool", description: "Step-by-step guide to export WhatsApp chat on Android and iPhone.", url: "https://easytool.live/how-to-export-whatsapp-chat", siteName: "EasyTool", type: "article" },
  twitter: { card: "summary_large_image", title: "How to Export WhatsApp Chat — Android & iPhone Guide", description: "Step-by-step guide to export WhatsApp chat on Android and iPhone." },
}

const howToJsonLd = {
  "@context": "https://schema.org", "@type": "HowTo",
  "name": "How to Export WhatsApp Chat",
  "description": "Step-by-step guide to export WhatsApp chat history on Android and iPhone as a TXT or ZIP file.",
  "totalTime": "PT2M",
  "tool": [{ "@type": "HowToTool", "name": "WhatsApp app" }],
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "Open the WhatsApp chat", "text": "Open WhatsApp and navigate to the chat or group you want to export." },
    { "@type": "HowToStep", "position": 2, "name": "Tap 3-dot menu then More then Export Chat", "text": "Android: tap 3-dot menu, tap More, tap Export Chat. iPhone: tap contact name at top, scroll down, tap Export Chat." },
    { "@type": "HowToStep", "position": 3, "name": "Choose Without Media", "text": "Select Without Media to export only text messages as a compact file." },
    { "@type": "HowToStep", "position": 4, "name": "Save the file and upload to EasyTool", "text": "Save the ZIP file to your device, then upload it to EasyTool WhatsApp Chat Analyzer for instant stats." },
  ],
}

const faqJsonLd = {
  "@context": "https://schema.org", "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How do I export WhatsApp chat on Android?", "acceptedAnswer": { "@type": "Answer", "text": "Open the chat, tap 3-dot menu, tap More, tap Export Chat, choose Without Media, save the ZIP file." } },
    { "@type": "Question", "name": "How do I export WhatsApp chat on iPhone?", "acceptedAnswer": { "@type": "Answer", "text": "Open the chat, tap the contact or group name at the top, scroll down, tap Export Chat, choose Without Media." } },
    { "@type": "Question", "name": "What format does WhatsApp export chat in?", "acceptedAnswer": { "@type": "Answer", "text": "WhatsApp exports chats as a ZIP file containing a _chat.txt file with all messages." } },
    { "@type": "Question", "name": "Can I export WhatsApp group chat?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Open the group, tap the group name, scroll down, tap Export Chat, choose Without Media." } },
    { "@type": "Question", "name": "How far back does WhatsApp chat export go?", "acceptedAnswer": { "@type": "Answer", "text": "WhatsApp exports your entire chat history stored on your device from the very first message." } },
  ],
}

function PhoneFrame({ children, stepNum, highlight }: { children: React.ReactNode; stepNum: string; highlight?: string }) {
  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-black shadow-lg shadow-green-500/30">
        {stepNum}
      </div>
      <div className="relative w-[185px]">
        <div className="bg-gray-900 rounded-[28px] p-[3px] shadow-2xl shadow-black/40 ring-1 ring-white/5">
          <div className="bg-white rounded-[25px] overflow-hidden min-h-[300px]">
            {children}
          </div>
          <div className="flex justify-center py-1.5">
            <div className="w-10 h-1 bg-gray-700 rounded-full" />
          </div>
        </div>
        <div className="absolute -right-[3px] top-14 w-[3px] h-7 bg-gray-700 rounded-r-sm" />
        <div className="absolute -left-[3px] top-10 w-[3px] h-5 bg-gray-700 rounded-l-sm" />
        <div className="absolute -left-[3px] top-[72px] w-[3px] h-5 bg-gray-700 rounded-l-sm" />
      </div>
      {highlight && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 max-w-[185px] w-full">
          <p className="text-[10px] text-amber-800 font-semibold text-center leading-snug">{highlight}</p>
        </div>
      )}
    </div>
  )
}

function StatusBar() {
  return (
    <div className="bg-[#075E54] px-3 pt-1.5 pb-0.5 flex items-center justify-between">
      <span className="text-white text-[7px] font-bold">9:41</span>
      <div className="flex items-center gap-1">
        <div className="flex gap-px items-end h-2">
          <div className="w-px h-1 bg-white/60 rounded-sm" />
          <div className="w-px h-1.5 bg-white/80 rounded-sm" />
          <div className="w-px h-2 bg-white rounded-sm" />
        </div>
        <div className="w-2.5 h-1.5 border border-white/60 rounded-sm relative ml-0.5">
          <div className="absolute inset-[1px] bg-white/60 rounded-sm" />
        </div>
      </div>
    </div>
  )
}

function WABar({ name, back }: { name: string; back?: boolean }) {
  return (
    <div className="bg-[#075E54] px-2.5 py-2 flex items-center gap-2">
      {back && <ChevronRight className="w-3 h-3 text-white rotate-180 flex-shrink-0" />}
      <div className="w-6 h-6 rounded-full bg-emerald-200 flex items-center justify-center flex-shrink-0">
        <span className="text-[9px] font-black text-emerald-800">{name[0]}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white text-[9px] font-bold leading-none truncate">{name}</p>
        <p className="text-white/60 text-[7px] mt-0.5">online</p>
      </div>
      <div className="flex items-center gap-1.5">
        <svg className="w-3 h-3 text-white/70" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
        <MoreVertical className="w-3 h-3 text-white/70" />
      </div>
    </div>
  )
}

function Bubble({ text, mine, time }: { text: string; mine?: boolean; time: string }) {
  return (
    <div className={cn("flex mb-1", mine ? "justify-end" : "justify-start")}>
      <div className={cn("max-w-[78%] px-2 py-1 rounded-lg shadow-sm", mine ? "bg-[#DCF8C6] rounded-tr-none" : "bg-white rounded-tl-none")}>
        <p className="text-[7.5px] text-gray-800 leading-tight">{text}</p>
        <p className="text-[6px] text-gray-400 text-right mt-0.5">{time}{mine ? " \u2713\u2713" : ""}</p>
      </div>
    </div>
  )
}

function ChatBG({ children }: { children: React.ReactNode }) {
  return <div className="bg-[#ECE5DD] px-2 py-2 min-h-[200px]">{children}</div>
}

function InputBar() {
  return (
    <div className="bg-[#F0F0F0] px-2 py-1.5 flex items-center gap-1.5">
      <div className="flex-1 bg-white rounded-full px-2.5 py-1 border border-gray-200">
        <p className="text-[7px] text-gray-400">Type a message</p>
      </div>
      <div className="w-6 h-6 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
        <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
      </div>
    </div>
  )
}

function AndroidStep1() {
  return (
    <PhoneFrame stepNum="1" highlight="Open any chat in WhatsApp">
      <StatusBar />
      <WABar name="Ali" back={false} />
      <ChatBG>
        <Bubble text="Hey! How are you?" time="14:30" />
        <Bubble text="I'm good! What about you?" mine time="14:32" />
        <Bubble text="Same here! Let's meet tomorrow" time="14:33" />
      </ChatBG>
      <InputBar />
    </PhoneFrame>
  )
}

function AndroidStep2() {
  return (
    <PhoneFrame stepNum="2" highlight="Tap ⋮ then tap More">
      <StatusBar />
      <WABar name="Ali" back={false} />
      <ChatBG>
        <Bubble text="Hey! How are you?" time="14:30" />
      </ChatBG>
      <div className="absolute right-2 top-16 w-32 bg-gray-900 rounded-lg shadow-xl border border-gray-700 overflow-hidden z-10">
        <div className="px-3 py-2 border-b border-gray-700">
          <p className="text-white text-[8px]">New group</p>
        </div>
        <div className="px-3 py-2 border-b border-gray-700">
          <p className="text-white text-[8px]">New broadcast</p>
        </div>
        <div className="px-3 py-2 border-b border-gray-700 bg-emerald-600">
          <p className="text-white text-[8px] font-bold">More</p>
        </div>
        <div className="px-3 py-2">
          <p className="text-white text-[8px]">Settings</p>
        </div>
      </div>
    </PhoneFrame>
  )
}

function AndroidStep3() {
  return (
    <PhoneFrame stepNum="3" highlight="Tap Export chat">
      <StatusBar />
      <div className="bg-[#ECE5DD] px-3 py-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2 px-2 py-2 rounded-lg bg-white">
            <p className="text-[8px] font-bold">View contact</p>
          </div>
          <div className="flex items-center gap-2 px-2 py-2 rounded-lg bg-white">
            <p className="text-[8px] font-bold">Media, links, and docs</p>
          </div>
          <div className="flex items-center gap-2 px-2 py-2 rounded-lg bg-white">
            <p className="text-[8px] font-bold">Search</p>
          </div>
          <div className="flex items-center gap-2 px-2 py-2 rounded-lg bg-white">
            <p className="text-[8px] font-bold">Mute notifications</p>
          </div>
          <div className="flex items-center gap-2 px-2 py-2 rounded-lg bg-white">
            <p className="text-[8px] font-bold">Wallpaper</p>
          </div>
          <div className="flex items-center gap-2 px-2 py-2 rounded-lg bg-emerald-500">
            <p className="text-white text-[8px] font-bold">Export chat</p>
          </div>
        </div>
      </div>
    </PhoneFrame>
  )
}

function AndroidStep4() {
  return (
    <PhoneFrame stepNum="4" highlight="Choose Without Media">
      <StatusBar />
      <div className="bg-white/80 absolute inset-0 flex items-center justify-center z-20">
        <div className="bg-white rounded-xl shadow-xl w-[150px] p-3">
          <p className="text-[9px] font-bold text-center mb-2">Export chat</p>
          <p className="text-[7px] text-gray-500 text-center mb-3">Include media?</p>
          <div className="space-y-1">
            <div className="py-2 border-b border-gray-100">
              <p className="text-[8px] text-center">Without Media</p>
            </div>
            <div className="py-2">
              <p className="text-[8px] text-center text-emerald-600 font-bold">Include Media</p>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-30">
        <WABar name="Ali" back={false} />
        <ChatBG>
          <Bubble text="Hey!" time="14:30" />
        </ChatBG>
      </div>
    </PhoneFrame>
  )
}

function AndroidStep5() {
  return (
    <PhoneFrame stepNum="5" highlight="Save the ZIP file">
      <StatusBar />
      <div className="bg-white p-3 min-h-[260px]">
        <p className="text-[9px] font-bold mb-2">Share</p>
        <div className="grid grid-cols-4 gap-2 mb-3">
          {["Gmail", "Drive", "Files", "Bluetooth"].map((app, i) => (
            <div key={app} className="flex flex-col items-center gap-1">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-[10px]">{app[0]}</span>
              </div>
              <p className="text-[6px] text-gray-600">{app}</p>
            </div>
          ))}
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2">
          <p className="text-[7px] font-bold text-emerald-700 text-center">Save to Device ✓</p>
        </div>
      </div>
    </PhoneFrame>
  )
}

function IPhoneStep1() {
  return (
    <PhoneFrame stepNum="1" highlight="Open any chat in WhatsApp">
      <StatusBar />
      <WABar name="Sara" back={false} />
      <ChatBG>
        <Bubble text="Hi! What's up?" time="10:15" />
        <Bubble text="Not much, you?" mine time="10:16" />
      </ChatBG>
      <InputBar />
    </PhoneFrame>
  )
}

function IPhoneStep2() {
  return (
    <PhoneFrame stepNum="2" highlight="Tap contact name at top">
      <StatusBar />
      <div className="bg-[#075E54] px-2.5 py-2 flex items-center gap-2">
        <ChevronRight className="w-3 h-3 text-white rotate-180 flex-shrink-0" />
        <div className="w-6 h-6 rounded-full bg-emerald-200 flex items-center justify-center flex-shrink-0">
          <span className="text-[9px] font-black text-emerald-800">S</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-[9px] font-bold leading-none truncate">Sara</p>
          <p className="text-white/60 text-[7px] mt-0.5">online</p>
        </div>
        <div className="flex items-center gap-1.5">
          <svg className="w-3 h-3 text-white/70" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
          <MoreVertical className="w-3 h-3 text-white/70" />
        </div>
      </div>
      <ChatBG>
        <Bubble text="Hi!" time="10:15" />
      </ChatBG>
    </PhoneFrame>
  )
}

function IPhoneStep3() {
  return (
    <PhoneFrame stepNum="3" highlight="Scroll down, tap Export Chat">
      <StatusBar />
      <div className="bg-gray-100 px-2 py-2 min-h-[260px] overflow-y-auto">
        <div className="bg-white rounded-xl overflow-hidden shadow-sm mb-2">
          <div className="flex items-center gap-2 px-3 py-3 border-b border-gray-100">
            <div className="w-10 h-10 rounded-full bg-emerald-200 flex items-center justify-center">
              <span className="text-[12px] font-black text-emerald-800">S</span>
            </div>
            <div>
              <p className="text-[9px] font-bold">Sara</p>
              <p className="text-[7px] text-gray-500">+1 234 567 8900</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
          {["Media, Links, and Docs", "Starred Messages", "Search", "Mute", "Disappearing Messages", "Wallpaper"].map((item, i) => (
            <div key={item} className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
              <p className="text-[8px]">{item}</p>
              <ChevronRight className="w-3 h-3 text-gray-400" />
            </div>
          ))}
          <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 bg-emerald-50">
            <p className="text-[8px] font-bold text-emerald-700">Export Chat</p>
            <ChevronRight className="w-3 h-3 text-emerald-500" />
          </div>
          {["Lock Chat", "Clear Chat", "Delete Chat"].map((item, i) => (
            <div key={item} className="flex items-center justify-between px-3 py-2 border-b border-gray-100 last:border-0">
              <p className="text-[8px]">{item}</p>
              <ChevronRight className="w-3 h-3 text-gray-400" />
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  )
}

function IPhoneStep4() {
  return (
    <PhoneFrame stepNum="4" highlight="Choose Without Media">
      <StatusBar />
      <div className="bg-black/50 absolute inset-0 flex items-end justify-center z-20">
        <div className="bg-white rounded-t-2xl w-full p-4">
          <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-3" />
          <p className="text-[9px] font-bold text-center mb-4">Export Chat</p>
          <div className="space-y-2">
            <div className="py-3 rounded-xl bg-gray-100 flex items-center justify-center">
              <p className="text-[8px] font-bold">Attach Media</p>
            </div>
            <div className="py-3 rounded-xl bg-emerald-600 flex items-center justify-center">
              <p className="text-white text-[8px] font-bold">Without Media</p>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-30">
        <WABar name="Sara" back={false} />
        <ChatBG>
          <Bubble text="Hi!" time="10:15" />
        </ChatBG>
      </div>
    </PhoneFrame>
  )
}

function IPhoneStep5() {
  return (
    <PhoneFrame stepNum="5" highlight="Save to Files or email">
      <StatusBar />
      <div className="bg-gray-100 px-3 py-2 min-h-[260px]">
        <p className="text-[8px] font-bold mb-2 text-center">WhatsApp Chat - Sara.zip</p>
        <div className="grid grid-cols-4 gap-2 mb-3">
          {["Messages", "Mail", "Save to Files", "WhatsApp"].map((app, i) => (
            <div key={app} className="flex flex-col items-center gap-1">
              <div className="w-9 h-9 rounded-xl bg-gray-200 flex items-center justify-center">
                <span className="text-[10px]">{app[0]}</span>
              </div>
              <p className="text-[6px] text-gray-600 text-center">{app}</p>
            </div>
          ))}
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 mt-2">
          <p className="text-[7px] font-bold text-blue-700 text-center">Save to Files recommended ✓</p>
        </div>
      </div>
    </PhoneFrame>
  )
}

function UploadStep() {
  return (
    <PhoneFrame stepNum="6" highlight="Upload to EasyTool — get instant stats!">
      <StatusBar />
      <div className="bg-[#075E54] px-2.5 py-2 flex items-center gap-2">
        <MessageSquare className="w-4 h-4 text-white" />
        <p className="text-white text-[9px] font-bold">EasyTool — WhatsApp Analyzer</p>
      </div>
      <div className="bg-white p-2.5 space-y-2 min-h-[260px]">
        <div className="border-2 border-dashed border-green-400 rounded-xl p-3 flex flex-col items-center gap-1.5 bg-green-50/50">
          <div className="w-8 h-8 rounded-xl bg-green-500/15 flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-green-600" />
          </div>
          <p className="text-[7.5px] font-bold text-gray-700 text-center">Drop .zip or .txt here</p>
          <div className="bg-green-600 text-white text-[7px] font-bold px-3 py-1 rounded-full shadow-sm shadow-green-600/30">
            Choose File
          </div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl px-2.5 py-2 flex items-center gap-2">
          <FileText className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-[7px] font-bold text-green-700 truncate">WhatsApp Chat - Ali.zip</p>
            <p className="text-[6px] text-green-500">Analyzing 4,821 messages...</p>
          </div>
          <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { label: "Messages", value: "4,821", color: "text-blue-600" },
            { label: "Words", value: "28,340", color: "text-violet-600" },
            { label: "Media", value: "312", color: "text-pink-600" },
            { label: "Emojis", value: "1,204", color: "text-amber-600" },
          ].map(s => (
            <div key={s.label} className="bg-gray-50 rounded-lg p-1.5 text-center border border-gray-100">
              <p className={cn("text-[10px] font-black", s.color)}>{s.value}</p>
              <p className="text-[6px] text-gray-400">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="bg-violet-50 border border-violet-200 rounded-xl px-2.5 py-2">
          <p className="text-[7px] font-bold text-violet-700 mb-1">Top Sender</p>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-violet-200 flex items-center justify-center">
              <span className="text-[8px] font-black text-violet-700">A</span>
            </div>
            <div className="flex-1">
              <div className="h-1.5 bg-violet-400 rounded-full w-[70%]" />
            </div>
            <span className="text-[7px] font-bold text-violet-600">68%</span>
          </div>
        </div>
      </div>
    </PhoneFrame>
  )
}

export default function HowToExportWhatsAppChat() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="bg-gradient-to-b from-green-500/10 to-transparent border-b border-green-500/15">
        <div className="container py-10 md:py-14">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/tools/whatsapp-chat-analyzer" className="hover:text-foreground transition-colors">WhatsApp Analyzer</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">How to Export</span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-start gap-6 max-w-3xl">
            <div className="w-14 h-14 rounded-2xl bg-green-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-500/30">
              <MessageSquare className="h-7 w-7 text-white" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge className="bg-green-500/15 text-green-700 dark:text-green-400 border-green-500/25 text-xs font-bold">Step-by-Step Guide</Badge>
                <Badge variant="outline" className="text-xs">2 min read</Badge>
                <Badge variant="outline" className="text-xs">Android + iPhone</Badge>
              </div>
              <h1 className="text-2xl md:text-4xl font-black tracking-tight mb-3">How to Export WhatsApp Chat</h1>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                Complete visual guide with screenshots for Android and iPhone. Export any chat or group in under 2 minutes — then analyze it instantly with EasyTool.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 xl:gap-14">
          <div className="lg:col-span-2 space-y-16">

            <div className="p-5 rounded-2xl bg-green-500/8 border border-green-500/20 flex gap-4">
              <Info className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm space-y-1">
                <p className="font-bold text-foreground">Quick Answer</p>
                <p className="text-muted-foreground">
                  Open WhatsApp chat <span className="text-foreground font-semibold">→</span> tap <span className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">⋮</span> (Android) or contact name (iPhone) <span className="text-foreground font-semibold">→</span> <strong>Export Chat</strong> <span className="text-foreground font-semibold">→</span> <strong>Without Media</strong> <span className="text-foreground font-semibold">→</span> save ZIP. Then upload to{" "}
                  <Link href="/tools/whatsapp-chat-analyzer" className="text-green-600 font-semibold hover:underline">EasyTool Analyzer</Link>.
                </p>
              </div>
            </div>

            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center flex-shrink-0 shadow-md shadow-green-500/30">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M17.523 15.341a.5.5 0 0 1-.5.5H6.977a.5.5 0 0 1-.5-.5V8.66a.5.5 0 0 1 .5-.5h10.046a.5.5 0 0 1 .5.5v6.681zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 1.5a8.5 8.5 0 1 1 0 17 8.5 8.5 0 0 1 0-17z"/></svg>
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-black">Android — Step by Step</h2>
                  <p className="text-sm text-muted-foreground">Works on all Android phones with WhatsApp installed</p>
                </div>
              </div>

              <div className="space-y-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl border border-border bg-card">
                      <h3 className="font-bold text-sm mb-1">Open the chat</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">Open WhatsApp and go to any individual chat or group chat you want to export.</p>
                    </div>
                    <AndroidStep1 />
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl border border-border bg-card">
                      <h3 className="font-bold text-sm mb-1">Tap <span className="font-mono bg-muted px-1.5 py-0.5 rounded">⋮</span> then tap More</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">Tap the 3-dot menu in the top-right corner. From the dropdown, tap <strong>More</strong>.</p>
                    </div>
                    <AndroidStep2 />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl border border-border bg-card">
                      <h3 className="font-bold text-sm mb-1">Tap Export Chat</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">In the More submenu, tap <strong>Export chat</strong>. WhatsApp will prepare your messages.</p>
                    </div>
                    <AndroidStep3 />
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl border border-border bg-card">
                      <h3 className="font-bold text-sm mb-1">Choose Without Media</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">Always pick <strong>Without Media</strong> — it exports only text, creating a small ZIP file perfect for analysis.</p>
                    </div>
                    <AndroidStep4 />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl border border-border bg-card">
                      <h3 className="font-bold text-sm mb-1">Save the ZIP file</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">A share sheet appears. Tap <strong>Save</strong> to store the ZIP on your device. You can also email it to yourself.</p>
                    </div>
                    <AndroidStep5 />
                  </div>
                  <div className="p-5 rounded-2xl bg-green-500/8 border border-green-500/20 space-y-3 self-start mt-0 sm:mt-[52px]">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                    <p className="font-bold text-sm">Android export done!</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">Your ZIP file is saved. Now upload it to EasyTool to see your chat stats instantly.</p>
                    <Link href="/tools/whatsapp-chat-analyzer">
                      <Button size="sm" className="w-full bg-green-600 hover:bg-green-700 font-bold rounded-xl mt-2">
                        Analyze My Chat <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground font-semibold px-2">iPhone Guide Below</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gray-800 dark:bg-gray-600 flex items-center justify-center flex-shrink-0 shadow-md">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M17 2H7C5.9 2 5 2.9 5 4v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-5 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm5-3H7V5h10v12z"/></svg>
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-black">iPhone — Step by Step</h2>
                  <p className="text-sm text-muted-foreground">Works on all iPhones with WhatsApp installed</p>
                </div>
              </div>

              <div className="space-y-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl border border-border bg-card">
                      <h3 className="font-bold text-sm mb-1">Open the chat</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">Open WhatsApp on your iPhone and navigate to the chat or group you want to export.</p>
                    </div>
                    <IPhoneStep1 />
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl border border-border bg-card">
                      <h3 className="font-bold text-sm mb-1">Tap the contact name at top</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">Tap the <strong>contact or group name</strong> shown at the very top of the chat screen to open Contact Info.</p>
                    </div>
                    <IPhoneStep2 />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl border border-border bg-card">
                      <h3 className="font-bold text-sm mb-1">Scroll down, tap Export Chat</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">On the Contact Info page, scroll down until you see <strong>Export Chat</strong>. Tap it.</p>
                    </div>
                    <IPhoneStep3 />
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl border border-border bg-card">
                      <h3 className="font-bold text-sm mb-1">Choose Without Media</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">An action sheet appears. Tap <strong>Without Media</strong> — this creates a small, fast-to-process file.</p>
                    </div>
                    <IPhoneStep4 />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl border border-border bg-card">
                      <h3 className="font-bold text-sm mb-1">Save to Files or email</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">The iOS share sheet opens. Tap <strong>Save to Files</strong> or email it to yourself. Then upload to EasyTool.</p>
                    </div>
                    <IPhoneStep5 />
                  </div>
                  <div className="p-5 rounded-2xl bg-green-500/8 border border-green-500/20 space-y-3 self-start mt-0 sm:mt-[52px]">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                    <p className="font-bold text-sm">iPhone export done!</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">Your ZIP file is saved. Upload it to EasyTool to get instant insights from your chat.</p>
                    <Link href="/tools/whatsapp-chat-analyzer">
                      <Button size="sm" className="w-full bg-green-600 hover:bg-green-700 font-bold rounded-xl mt-2">
                        Analyze My Chat <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-violet-500 flex items-center justify-center flex-shrink-0 shadow-md shadow-violet-500/30">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-black">Now Analyze Your Chat</h2>
                  <p className="text-sm text-muted-foreground">Upload the ZIP to EasyTool — instant results, 100% private</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl border border-border bg-card">
                    <h3 className="font-bold text-sm mb-1">Upload to EasyTool</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">Go to EasyTool WhatsApp Analyzer, drag and drop your ZIP file, and get instant deep stats — all in your browser, zero privacy risk.</p>
                  </div>
                  <UploadStep />
                </div>
                <div className="space-y-3 self-start mt-0 sm:mt-[52px]">
                  <p className="font-bold text-sm">What you will see:</p>
                  {[
                    { icon: "💬", text: "Total messages, words, media & links" },
                    { icon: "🏆", text: "Top senders ranked by message count" },
                    { icon: "📊", text: "Hourly activity chart — peak chat hours" },
                    { icon: "😂", text: "Top 10 emojis with exact counts" },
                    { icon: "📅", text: "Most active day of the week" },
                    { icon: "🔤", text: "Most used words (Urdu + English)" },
                    { icon: "🎉", text: "Fun facts about your chat" },
                  ].map(item => (
                    <div key={item.text} className="flex items-start gap-2.5 p-3 rounded-xl bg-card border border-border">
                      <span className="text-base flex-shrink-0">{item.icon}</span>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                  <Link href="/tools/whatsapp-chat-analyzer">
                    <Button className="w-full bg-green-600 hover:bg-green-700 font-bold rounded-xl h-11 mt-2 shadow-lg shadow-green-600/20">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Open WhatsApp Analyzer
                    </Button>
                  </Link>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-black mb-6">With Media vs Without Media — Which to Choose?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl border-2 border-green-400 bg-green-50 dark:bg-green-950/20 space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <p className="font-black text-sm text-green-700 dark:text-green-400">Without Media — Recommended</p>
                  </div>
                  <ul className="space-y-2">
                    {["Small file size (usually under 2MB)","Exports in seconds","Works perfectly with EasyTool","Contains all text messages","Easy to email or share"].map(t => (
                      <li key={t} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-500 flex-shrink-0 mt-0.5" />{t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-5 rounded-2xl border border-border bg-card space-y-3">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-amber-500" />
                    <p className="font-black text-sm">With Media — Large files</p>
                  </div>
                  <ul className="space-y-2">
                    {["Can be hundreds of MB or GBs","Slow to export and share","Includes photos, videos, audio","Good for full backup only","Not needed for chat analysis"].map(t => (
                      <li key={t} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <AlertCircle className="h-3.5 w-3.5 text-amber-400 flex-shrink-0 mt-0.5" />{t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-black mb-6">Common Problems & Fixes</h2>
              <div className="space-y-3">
                {[
                  { q: "I cannot find Export Chat in the menu", a: "Update WhatsApp to the latest version. On Android it is under ⋮ → More. On iPhone, tap the contact/group name at the top of the chat, then scroll down." },
                  { q: "The exported file is too large", a: "You chose With Media. Re-export and select Without Media. The text-only export is usually under 5MB even for years of chat history." },
                  { q: "EasyTool says Could not parse chat", a: "Upload the original exported file without renaming it. The file should be a .zip or .txt. Do not open and re-save the file as this can change the encoding." },
                  { q: "My export is missing old messages", a: "WhatsApp exports messages stored on your device. If you reinstalled WhatsApp or switched phones without restoring a backup, older messages may not be available." },
                  { q: "Can I export WhatsApp chat on PC or Mac?", a: "WhatsApp Web and WhatsApp Desktop do not support chat export. You must export from the WhatsApp app on your Android or iPhone." },
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-xl border border-border bg-card">
                    <p className="font-bold text-sm mb-1.5 flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                      {item.q}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed pl-6">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-black mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {[
                  { q: "How far back does WhatsApp chat export go?", a: "WhatsApp exports your entire chat history stored on your device — from the very first message to the most recent. There is no time limit on the export." },
                  { q: "Does exporting WhatsApp chat delete the messages?", a: "No. Exporting creates a copy of your messages. The original chat in WhatsApp remains completely untouched." },
                  { q: "Can the other person see that I exported the chat?", a: "No. WhatsApp does not notify anyone when you export a chat. It is completely private." },
                  { q: "What does the exported WhatsApp chat file look like?", a: "It is a plain text file inside a ZIP archive. Each message is on a new line: date, time - sender: message. For example: 12/03/2024, 14:30 - Ali: Hello!" },
                  { q: "Can I export WhatsApp group chat?", a: "Yes, the process is identical. Open the group, tap the group name (iPhone) or ⋮ → More (Android), then Export Chat → Without Media." },
                ].map((item, i) => (
                  <div key={i} className="p-5 rounded-xl border border-border bg-card">
                    <p className="font-bold text-sm mb-2">{item.q}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          <div className="space-y-5 lg:sticky lg:top-6 self-start">
            <div className="rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 p-6 text-white space-y-4">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-black text-lg leading-tight">Analyze Your Chat</p>
                <p className="text-white/80 text-xs mt-1 leading-relaxed">Upload your exported file and get instant stats — free, private, no signup.</p>
              </div>
              <Link href="/tools/whatsapp-chat-analyzer">
                <Button className="w-full bg-white text-green-700 hover:bg-white/90 font-bold h-10 rounded-xl">
                  Try Analyzer Free <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-5 space-y-3">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-600" />
                <p className="font-bold text-sm">100% Private</p>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">EasyTool runs entirely in your browser. Your chat file is never uploaded to any server. Your messages stay on your device.</p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
              <p className="font-bold text-sm">Quick Steps</p>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-bold text-foreground mb-1">Android</p>
                  <div className="space-y-1">
                    {["Open chat","Tap ⋮ → More","Tap Export Chat","Without Media","Save ZIP"].map((s, i) => (
                      <div key={s} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="w-4 h-4 rounded-full bg-green-500/15 flex items-center justify-center flex-shrink-0">
                          <span className="text-[8px] font-bold text-green-600">{i+1}</span>
                        </div>
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="h-px bg-border" />
                <div>
                  <p className="text-xs font-bold text-foreground mb-1">iPhone</p>
                  <div className="space-y-1">
                    {["Open chat","Tap contact name","Scroll → Export Chat","Without Media","Save to Files"].map((s, i) => (
                      <div key={s} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                          <span className="text-[8px] font-bold text-gray-600">{i+1}</span>
                        </div>
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
              <p className="font-bold text-sm flex items-center gap-2">
                <Zap className="h-4 w-4 text-green-500" />
                What EasyTool Shows
              </p>
              <ul className="space-y-1.5">
                {["Total messages & words","Top senders ranking","Hourly activity chart","Top emojis used","Most used words","Media & links count","Peak day of week","Fun chat facts"].map(item => (
                  <li key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
