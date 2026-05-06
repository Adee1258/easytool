import { Metadata } from "next"
import Link from "next/link"
import { FileText, ChevronRight, CheckCircle2, ArrowRight, Shield, Zap, Sparkles, Globe, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "EasyTool Online - 50+ Free Online Tools | EasyTool",
  description: "EasyTool Online - Best free online tools. PDF merge, image compress, WhatsApp chat analyzer, 50+ tools bilkul free, no signup, online use.",
  keywords: [
    "easytool",
    "easy tool",
    "easytool online",
    "easytool free",
    "free online tools",
    "easytool.live",
    "online pdf tools",
    "online image compressor"
  ],
  alternates: { canonical: "https://easytool.live/easytool-online" },
  openGraph: {
    title: "EasyTool Online - 50+ Free Online Tools",
    description: "EasyTool Online pe 50+ free online tools. PDF merge, image compress, WhatsApp analyzer sab online available.",
    url: "https://easytool.live/easytool-online",
    siteName: "EasyTool",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EasyTool Online - 50+ Free Online Tools",
    description: "EasyTool Online - sabse behtar free online tools platform.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "EasyTool Online - 50+ Free Online Tools",
  "description": "EasyTool Online is the best free online tools platform with 50+ tools available online without any download.",
  "url": "https://easytool.live/easytool-online",
}

export default function EasytoolOnlineSeoPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="bg-gradient-to-b from-blue-500/10 to-transparent border-b border-blue-500/15">
        <div className="container py-12 md:py-20">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">EasyTool Online</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/25 font-black text-sm">
                  🌐 EasyTool Online
                </Badge>
                <Badge variant="outline" className="font-semibold text-sm">No Download</Badge>
                <Badge variant="outline" className="font-semibold text-sm">Browser Only</Badge>
                <Badge variant="outline" className="font-semibold text-sm">Instant Access</Badge>
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                EasyTool Online
                <span className="block text-blue-600 mt-2">50+ Free Tools Online</span>
              </h1>

              <p className="text-muted-foreground text-xl leading-relaxed">
                <strong>EasyTool Online</strong> - Sabse behtar <strong>free online tools</strong> platform. Koi download nahi, koi install nahi — bas browser open karein aur tools use karein!
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 font-black rounded-xl h-14 px-10 shadow-xl shadow-blue-500/25 w-full sm:w-auto text-lg">
                    <Globe className="mr-3 h-6 w-6" />
                    EasyTool Online Use Karein
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                {[
                  { icon: Zap, text: "No Download" },
                  { icon: Globe, text: "Works Everywhere" },
                  { icon: CheckCircle2, text: "100% Free" },
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-2">
                    <item.icon className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative w-full max-w-md mx-auto">
                <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-[2rem] p-2 shadow-2xl shadow-blue-500/30">
                  <div className="bg-white rounded-[1.75rem] overflow-hidden p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-2xl">🌐</div>
                      <div>
                        <p className="font-black text-lg text-blue-900">EasyTool Online</p>
                        <p className="text-sm text-muted-foreground">Use in Browser</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {["PDF Merge", "Image Compress", "QR Code", "Chat Analyzer"].map((tool, i) => (
                        <div key={i} className="p-3 rounded-lg bg-blue-50 border border-blue-100 text-center">
                          <p className="font-bold text-sm text-blue-900">{tool}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-16">
            <section className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-black">
                EasyTool Online Kyun Best Hai?
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                <strong>EasyTool Online</strong> ka sabse bada fayda ye hai ki aapko kuch download ya install karne ki zarurat nahi! Bas apne browser mein jayein aur tools start karein.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-black">
                EasyTool Online Pe Kya Kar Sakte Hain?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { icon: "📄", title: "PDF Merge Online", desc: "Multiple PDF files ko online combine karein, bilkul free." },
                  { icon: "🖼️", title: "Image Compress Online", desc: "Images ko online compress karein, quality maintain karte hue." },
                  { icon: "💬", title: "WhatsApp Analyzer Online", desc: "WhatsApp chats ko online analyze karein, deep insights ke saath." },
                  { icon: "📝", title: "Word Counter Online", desc: "Words, characters count karein online, koi install nahi." },
                ].map((item, i) => (
                  <div key={i} className="p-6 rounded-2xl border border-border bg-card space-y-3">
                    <span className="text-4xl">{item.icon}</span>
                    <p className="font-black text-lg">{item.title}</p>
                    <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="p-8 md:p-10 rounded-2xl bg-blue-500/8 border border-blue-500/20 space-y-6">
              <div className="flex items-center gap-4">
                <Globe className="h-8 w-8 text-blue-600" />
                <h2 className="text-2xl font-black">
                  Koi Download Nahi, Bas Online Use
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                <strong>EasyTool Online</strong> har device pe kaam karta hai - Windows, Mac, Android, iOS, sab pe! Bas browser open karein, EasyTool visit karein aur tools use karein.
              </p>
            </section>
          </div>

          <div className="space-y-6 lg:sticky lg:top-8 self-start">
            <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 p-8 text-white space-y-6 shadow-2xl">
              <Globe className="h-10 w-10 text-white/90" />
              <div>
                <p className="font-black text-2xl leading-tight">Start Using Now!</p>
                <p className="text-white/80 text-sm mt-2 leading-relaxed">
                  EasyTool Online abhi visit karein aur 50+ free tools use karein.
                </p>
              </div>
              <Link href="/">
                <Button className="w-full bg-white text-blue-600 hover:bg-white/95 font-black h-12 rounded-xl text-lg">
                  Go to EasyTool <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
