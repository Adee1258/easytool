import { Metadata } from "next"
import Link from "next/link"
import { MessageSquare, ChevronRight, CheckCircle2, ArrowRight, Shield, Zap, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "WhatsApp Chat Analyzer for iPhone — Analyze on iOS Free | EasyTool",
  description: "WhatsApp Chat Analyzer for iPhone. Analyze WhatsApp chats on iOS devices. Best WhatsApp chat analyzer iPhone app alternative. Free, no app needed.",
  keywords: [
    "whatsapp chat analyzer for iphone",
    "whatsapp chat analyzer iphone",
    "iphone whatsapp chat analyzer",
    "whatsapp chat analyzer app for iphone",
    "whatsapp chat analysis iphone",
    "whatsapp analyzer for iphone",
    "whatsapp chat statistics iphone",
    "whatsapp chat tracker iphone",
    "whatsapp chat analyzer on iphone",
    "whatsapp chat insights iphone"
  ],
  alternates: { canonical: "https://easytool.live/whatsapp-chat-analyzer-for-iphone" },
  openGraph: {
    title: "WhatsApp Chat Analyzer for iPhone — Analyze on iOS Free",
    description: "WhatsApp Chat Analyzer for iPhone. Analyze WhatsApp chats on iOS devices.",
    url: "https://easytool.live/whatsapp-chat-analyzer-for-iphone",
    siteName: "EasyTool",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WhatsApp Chat Analyzer for iPhone — Analyze on iOS Free",
    description: "WhatsApp Chat Analyzer for iPhone. Analyze WhatsApp chats on iOS devices.",
  },
}

export default function WhatsappChatAnalyzerForIphoneSeoPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-indigo-500/10 to-transparent border-b border-indigo-500/15">
        <div className="container py-12 md:py-20">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">WhatsApp Chat Analyzer for iPhone</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/25 font-black text-sm">
                  📱 iPhone & iOS
                </Badge>
                <Badge variant="outline" className="font-semibold text-sm">No App Needed</Badge>
                <Badge variant="outline" className="font-semibold text-sm">100% Free</Badge>
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                WhatsApp Chat Analyzer for iPhone
                <span className="block text-indigo-600 mt-2">Analyze on iOS Free</span>
              </h1>

              <p className="text-muted-foreground text-xl leading-relaxed">
                The best <strong>WhatsApp Chat Analyzer for iPhone</strong>. Analyze WhatsApp chats on iOS devices. Free, no app needed - works directly in Safari!
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/tools/whatsapp-chat-analyzer">
                  <Button size="lg" className="bg-indigo-500 hover:bg-indigo-600 font-black rounded-xl h-14 px-10 shadow-xl shadow-indigo-500/25 w-full sm:w-auto text-lg">
                    <Smartphone className="mr-3 h-6 w-6" />
                    Analyze on iPhone Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
