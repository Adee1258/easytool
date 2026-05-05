import { Metadata } from "next"
import Link from "next/link"
import { MessageSquare, ChevronRight, CheckCircle2, ArrowRight, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "WhatsApp Chat Analyzer Free — Analyze WhatsApp Chats 100% Free | EasyTool",
  description: "WhatsApp Chat Analyzer free online. 100% free WhatsApp chat analyzer. Analyze WhatsApp chats without any cost. No signup, no ads.",
  keywords: [
    "whatsapp chat analyzer free",
    "free whatsapp chat analyzer",
    "whatsapp chat analyzer free online",
    "free whatsapp chat analysis",
    "whatsapp chat analyzer without paying",
    "whatsapp chat analyzer free download",
    "whatsapp chat statistics free",
    "whatsapp analyzer free",
    "free online whatsapp chat analyzer",
    "whatsapp chat tracker free"
  ],
  alternates: { canonical: "https://easytool.live/whatsapp-chat-analyzer-free" },
  openGraph: {
    title: "WhatsApp Chat Analyzer Free — Analyze WhatsApp Chats 100% Free",
    description: "100% free WhatsApp chat analyzer. Analyze WhatsApp chats without any cost.",
    url: "https://easytool.live/whatsapp-chat-analyzer-free",
    siteName: "EasyTool",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WhatsApp Chat Analyzer Free — Analyze WhatsApp Chats 100% Free",
    description: "100% free WhatsApp chat analyzer. Analyze WhatsApp chats without any cost.",
  },
}

export default function WhatsappChatAnalyzerFreeSeoPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-emerald-500/10 to-transparent border-b border-emerald-500/15">
        <div className="container py-12 md:py-20">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">WhatsApp Chat Analyzer Free</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/25 font-black text-sm">
                  🆓 100% Free
                </Badge>
                <Badge variant="outline" className="font-semibold text-sm">No Ads</Badge>
                <Badge variant="outline" className="font-semibold text-sm">No Signup</Badge>
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                WhatsApp Chat Analyzer Free
                <span className="block text-emerald-600 mt-2">100% Free WhatsApp Analysis</span>
              </h1>

              <p className="text-muted-foreground text-xl leading-relaxed">
                The best <strong>WhatsApp Chat Analyzer free</strong> online. 100% <strong>free WhatsApp chat analyzer</strong>. Analyze WhatsApp chats without any cost. No signup, no ads, completely free!
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/tools/whatsapp-chat-analyzer">
                  <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 font-black rounded-xl h-14 px-10 shadow-xl shadow-emerald-500/25 w-full sm:w-auto text-lg">
                    <MessageSquare className="mr-3 h-6 w-6" />
                    Analyze WhatsApp Chat Free Now
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
