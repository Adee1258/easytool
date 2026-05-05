import { Metadata } from "next"
import Link from "next/link"
import { MessageSquare, ChevronRight, CheckCircle2, ArrowRight, Shield, Zap, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "WhatsApp Chat Analyzer Online — Analyze WhatsApp Chats Free | EasyTool",
  description: "WhatsApp Chat Analyzer online free. Analyze WhatsApp chats online without any app. Get insights, statistics, and more. 100% free, no signup.",
  keywords: [
    "whatsapp chat analyzer online",
    "online whatsapp chat analyzer",
    "whatsapp chat analyzer",
    "analyze whatsapp chat online",
    "whatsapp chat analysis online",
    "free whatsapp chat analyzer",
    "whatsapp chat statistics online",
    "whatsapp analyzer online",
    "whatsapp chat tracker online",
    "whatsapp chat insights online"
  ],
  alternates: { canonical: "https://easytool.live/whatsapp-chat-analyzer-online" },
  openGraph: {
    title: "WhatsApp Chat Analyzer Online — Analyze WhatsApp Chats Free",
    description: "WhatsApp Chat Analyzer online free. Analyze WhatsApp chats without any app.",
    url: "https://easytool.live/whatsapp-chat-analyzer-online",
    siteName: "EasyTool",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WhatsApp Chat Analyzer Online — Analyze WhatsApp Chats Free",
    description: "WhatsApp Chat Analyzer online free. Analyze WhatsApp chats without any app.",
  },
}

export default function WhatsappChatAnalyzerOnlineSeoPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-blue-600/10 to-transparent border-b border-blue-600/15">
        <div className="container py-12 md:py-20">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">WhatsApp Chat Analyzer Online</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-blue-600/15 text-blue-600 dark:text-blue-400 border-blue-600/25 font-black text-sm">
                  💬 WhatsApp Chat Analyzer Online
                </Badge>
                <Badge variant="outline" className="font-semibold text-sm">No App Needed</Badge>
                <Badge variant="outline" className="font-semibold text-sm">100% Free</Badge>
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                WhatsApp Chat Analyzer Online
                <span className="block text-blue-600 mt-2">Analyze WhatsApp Chats Free</span>
              </h1>

              <p className="text-muted-foreground text-xl leading-relaxed">
                The best <strong>WhatsApp Chat Analyzer online</strong> free. <strong>Analyze WhatsApp chats online</strong> without any app. Get insights, statistics, and more. Perfect for understanding your WhatsApp conversations!
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/tools/whatsapp-chat-analyzer">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 font-black rounded-xl h-14 px-10 shadow-xl shadow-blue-600/25 w-full sm:w-auto text-lg">
                    <MessageSquare className="mr-3 h-6 w-6" />
                    Analyze WhatsApp Chat Now
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
