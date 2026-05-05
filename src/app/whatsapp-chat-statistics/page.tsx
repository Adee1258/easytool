import { Metadata } from "next"
import Link from "next/link"
import { MessageSquare, ChevronRight, CheckCircle2, ArrowRight, Shield, Zap, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "WhatsApp Chat Statistics — Check WhatsApp Stats Free | EasyTool",
  description: "WhatsApp Chat Statistics free. Check WhatsApp chat stats online. Get message count, most active person, emojis, and more. 100% free.",
  keywords: [
    "whatsapp chat statistics",
    "whatsapp chat stats",
    "whatsapp statistics",
    "whatsapp chat stats checker",
    "whatsapp message statistics",
    "whatsapp chat count",
    "whatsapp most active person",
    "whatsapp emoji statistics",
    "whatsapp chat analysis statistics",
    "whatsapp conversation statistics"
  ],
  alternates: { canonical: "https://easytool.live/whatsapp-chat-statistics" },
  openGraph: {
    title: "WhatsApp Chat Statistics — Check WhatsApp Stats Free",
    description: "WhatsApp Chat Statistics free. Check WhatsApp chat stats online.",
    url: "https://easytool.live/whatsapp-chat-statistics",
    siteName: "EasyTool",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WhatsApp Chat Statistics — Check WhatsApp Stats Free",
    description: "WhatsApp Chat Statistics free. Check WhatsApp chat stats online.",
  },
}

export default function WhatsappChatStatisticsSeoPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-purple-600/10 to-transparent border-b border-purple-600/15">
        <div className="container py-12 md:py-20">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">WhatsApp Chat Statistics</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-purple-600/15 text-purple-600 dark:text-purple-400 border-purple-600/25 font-black text-sm">
                  📊 WhatsApp Chat Statistics
                </Badge>
                <Badge variant="outline" className="font-semibold text-sm">Detailed Stats</Badge>
                <Badge variant="outline" className="font-semibold text-sm">100% Free</Badge>
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                WhatsApp Chat Statistics
                <span className="block text-purple-600 mt-2">Check WhatsApp Stats Free</span>
              </h1>

              <p className="text-muted-foreground text-xl leading-relaxed">
                Get detailed <strong>WhatsApp Chat Statistics</strong> free. Check <strong>WhatsApp chat stats</strong> online. Message count, most active person, emojis, and more!
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/tools/whatsapp-chat-analyzer">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700 font-black rounded-xl h-14 px-10 shadow-xl shadow-purple-600/25 w-full sm:w-auto text-lg">
                    <BarChart3 className="mr-3 h-6 w-6" />
                    Check WhatsApp Stats Now
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
