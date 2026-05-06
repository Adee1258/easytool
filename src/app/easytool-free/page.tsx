import { Metadata } from "next"
import Link from "next/link"
import { FileText, ChevronRight, CheckCircle2, ArrowRight, Shield, Zap, Sparkles, Gift, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "EasyTool Free - 100% Free Online Tools | EasyTool",
  description: "EasyTool Free - Sabse behtar 100% free online tools. PDF merge, image compress, WhatsApp chat analyzer, 50+ tools bilkul free, no charges.",
  keywords: [
    "easytool",
    "easy tool",
    "easytool online",
    "easytool free",
    "free online tools",
    "easytool.live",
    "100% free tools",
    "free pdf tools"
  ],
  alternates: { canonical: "https://easytool.live/easytool-free" },
  openGraph: {
    title: "EasyTool Free - 100% Free Online Tools",
    description: "EasyTool Free - 100% free online tools, no hidden charges, no signup.",
    url: "https://easytool.live/easytool-free",
    siteName: "EasyTool",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EasyTool Free - 100% Free Online Tools",
    description: "EasyTool Free - sabse behtar free online tools bilkul free.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "EasyTool Free - 100% Free Online Tools",
  "description": "EasyTool Free offers 100% free online tools with no hidden charges, no signup, no ads.",
  "url": "https://easytool.live/easytool-free",
}

export default function EasytoolFreeSeoPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="bg-gradient-to-b from-emerald-500/10 to-transparent border-b border-emerald-500/15">
        <div className="container py-12 md:py-20">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">EasyTool Free</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/25 font-black text-sm">
                  🎁 EasyTool Free
                </Badge>
                <Badge variant="outline" className="font-semibold text-sm">100% Free</Badge>
                <Badge variant="outline" className="font-semibold text-sm">No Ads</Badge>
                <Badge variant="outline" className="font-semibold text-sm">No Limits</Badge>
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                EasyTool Free
                <span className="block text-emerald-600 mt-2">100% Free Tools</span>
              </h1>

              <p className="text-muted-foreground text-xl leading-relaxed">
                <strong>EasyTool Free</strong> - Sabse behtar <strong>100% free online tools</strong> platform. Koi paise nahi, koi hidden charges nahi, koi ads nahi — bilkul free!
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/">
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 font-black rounded-xl h-14 px-10 shadow-xl shadow-emerald-500/25 w-full sm:w-auto text-lg">
                    <Gift className="mr-3 h-6 w-6" />
                    Free Tools Use Karein
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                {[
                  { icon: Gift, text: "No Charges" },
                  { icon: Zap, text: "No Ads" },
                  { icon: CheckCircle2, text: "Unlimited Use" },
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-2">
                    <item.icon className="h-5 w-5 text-emerald-600" />
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative w-full max-w-md mx-auto">
                <div className="bg-gradient-to-br from-emerald-600 to-green-600 rounded-[2rem] p-2 shadow-2xl shadow-emerald-500/30">
                  <div className="bg-white rounded-[1.75rem] overflow-hidden p-8">
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <span className="text-5xl">🎁</span>
                    <div className="text-center">
                      <p className="font-black text-2xl text-emerald-900">100% Free</p>
                      <p className="text-sm text-muted-foreground">Forever</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {["No Signup", "No Ads", "No Limits", "No Watermarks"].map((text, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-emerald-50 border border-emerald-100">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      <span className="font-bold text-emerald-900">{text}</span>
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
                EasyTool Free - Kya Kya Free Hai?
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                <strong>EasyTool Free</strong> pe sab kuch bilkul free hai! Koi paise nahi lagenge, koi limits nahi, koi ads nahi!
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {[
                  { label: "PDF Tools", icon: "📄" },
                  { label: "Image Tools", icon: "🖼️" },
                  { label: "Text Tools", icon: "📝" },
                  { label: "All Tools", icon: "🛠️" },
                ].map(item => (
                  <div key={item.label} className="p-6 rounded-2xl bg-card border border-border text-center space-y-3">
                    <span className="text-4xl">{item.icon}</span>
                    <p className="font-black text-base">{item.label}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-black">
                EasyTool Free Pe Free Mein Kya Benefits Hain?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { icon: "🆓", title: "100% Free", desc: "Har tool bilkul free, kabhi bhi koi paise nahi lagenge." },
                  { icon: "🚫", title: "No Ads", desc: "Koi ads nahi, clean experience." },
                  { icon: "∞", title: "No Limits", desc: "Unlimited use, no daily limits, no file size limits." },
                  { icon: "🔒", title: "No Signup", desc: "Aao aur use karo, login/signup ki zarurat nahi." },
                ].map((item, i) => (
                  <div key={i} className="p-6 rounded-2xl border border-border bg-card space-y-3">
                    <span className="text-4xl">{item.icon}</span>
                    <p className="font-black text-lg">{item.title}</p>
                    <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="p-8 md:p-10 rounded-2xl bg-emerald-500/8 border border-emerald-500/20 space-y-6">
              <div className="flex items-center gap-4">
                <Gift className="h-8 w-8 text-emerald-600" />
                <h2 className="text-2xl font-black">
                  EasyTool Free - Hamesha Free Rahega!
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                <strong>EasyTool Free</strong> hamesha free rahega! Aap kabhi bhi koi paise nahi denge, kabhi bhi koi limits nahi honge.
              </p>
            </section>
          </div>

          <div className="space-y-6 lg:sticky lg:top-8 self-start">
            <div className="rounded-2xl bg-gradient-to-br from-emerald-600 to-green-600 p-8 text-white space-y-6 shadow-2xl">
              <Gift className="h-10 w-10 text-white/90" />
              <div>
                <p className="font-black text-2xl leading-tight">Start for Free!</p>
                <p className="text-white/80 text-sm mt-2 leading-relaxed">
                  EasyTool Free abhi visit karein aur 50+ free tools use karein bilkul free.
                </p>
              </div>
              <Link href="/">
                <Button className="w-full bg-white text-emerald-600 hover:bg-white/95 font-black h-12 rounded-xl text-lg">
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
