import { Metadata } from "next"
import Link from "next/link"
import { FileText, ChevronRight, CheckCircle2, ArrowRight, Shield, Zap, Sparkles, Globe, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "EasyTool - 50+ Free Online Tools | PDF, Image & More",
  description: "EasyTool - Best free online tools platform. PDF merge, image compress, WhatsApp chat analyzer and 50+ tools, bilkul free, no signup.",
  keywords: [
    "easytool",
    "easy tool",
    "easytool online",
    "easytool free",
    "free online tools",
    "easytool.live",
    "pdf tools",
    "image compressor",
    "whatsapp chat analyzer"
  ],
  alternates: { canonical: "https://easytool.live/easytool" },
  openGraph: {
    title: "EasyTool - 50+ Free Online Tools",
    description: "EasyTool pe 50+ free online tools. PDF merge, image compress, WhatsApp analyzer aur bohot kuch.",
    url: "https://easytool.live/easytool",
    siteName: "EasyTool",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EasyTool - 50+ Free Online Tools",
    description: "EasyTool pe 50+ free online tools bilkul free.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "EasyTool - 50+ Free Online Tools",
  "description": "EasyTool is the best free online tools platform with 50+ tools for PDF, Image, Text, Finance & SEO.",
  "url": "https://easytool.live/easytool",
}

export default function EasytoolSeoPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="bg-gradient-to-b from-violet-500/10 to-transparent border-b border-violet-500/15">
        <div className="container py-12 md:py-20">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">EasyTool</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-500/25 font-black text-sm">
                  🚀 EasyTool
                </Badge>
                <Badge variant="outline" className="font-semibold text-sm">50+ Tools</Badge>
                <Badge variant="outline" className="font-semibold text-sm">100% Free</Badge>
                <Badge variant="outline" className="font-semibold text-sm">No Signup</Badge>
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                EasyTool
                <span className="block text-violet-600 mt-2">50+ Free Online Tools</span>
              </h1>

              <p className="text-muted-foreground text-xl leading-relaxed">
                EasyTool - Sabse behtar <strong>free online tools</strong> platform. <strong>PDF merge</strong>, <strong>image compress</strong>, <strong>WhatsApp chat analyzer</strong> aur 50+ se bhi zyada tools bilkul free, no signup required.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/">
                  <Button size="lg" className="bg-violet-600 hover:bg-violet-700 font-black rounded-xl h-14 px-10 shadow-xl shadow-violet-500/25 w-full sm:w-auto text-lg">
                    <Sparkles className="mr-3 h-6 w-6" />
                    EasyTool Use Karein
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                {[
                  { icon: Shield, text: "100% Private" },
                  { icon: Zap, text: "Instant Results" },
                  { icon: CheckCircle2, text: "No Limits" },
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-2">
                    <item.icon className="h-5 w-5 text-violet-600" />
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative w-full max-w-md mx-auto">
                <div className="bg-gradient-to-br from-violet-600 to-purple-600 rounded-[2rem] p-2 shadow-2xl shadow-violet-500/30">
                  <div className="bg-white rounded-[1.75rem] overflow-hidden p-8">
                    <div className="grid grid-cols-2 gap-4">
                      {["📄 PDF Tools", "🖼️ Image Tools", "📝 Text Tools", "💰 Finance"].map((cat, i) => (
                        <div key={i} className="p-4 rounded-xl bg-violet-50 border border-violet-100 text-center">
                          <div className="text-3xl mb-2">{cat.split(" ")[0]}</div>
                          <p className="font-bold text-sm text-violet-900">{cat.split(" ").slice(1).join(" ")}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 text-center">
                      <p className="text-violet-600 font-black text-xl">50+ Tools</p>
                      <p className="text-sm text-muted-foreground">All Free Forever</p>
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
                EasyTool Kya Hai?
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                EasyTool ek aisa amazing platform hai jahan aapko 50+ se bhi zyada professional online tools milte hain bilkul free! Chahe <strong>PDF merge</strong> karna ho, <strong>image compress</strong> karna ho, <strong>WhatsApp chat analyze</strong> karna ho, ya kuch aur — EasyTool pe sab kuch available hai.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                EasyTool ke liye koi signup nahi, koi hidden charges nahi, sab kuch bilkul free! Aapki files kabhi bhi servers pe upload nahi hoti, sab kuch aapke browser mein hi process hota hai.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-black">
                EasyTool Pe Kya Kya Tools Hain?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { icon: "📄", title: "PDF Tools", desc: "Merge PDF, Split PDF, Compress PDF, PDF to Word etc." },
                  { icon: "🖼️", title: "Image Tools", desc: "Image Compressor, Resizer, BG Remover, Image Enhancer etc." },
                  { icon: "📝", title: "Text Tools", desc: "Word Counter, Text to Speech, Case Converter, Paraphraser etc." },
                  { icon: "💰", title: "Finance Tools", desc: "EMI Calculator, Currency Converter, GST Calculator etc." },
                  { icon: "🔍", title: "SEO Tools", desc: "Meta Tag Generator, QR Code Generator, Robots.txt etc." },
                  { icon: "🤖", title: "AI Tools", desc: "WhatsApp Chat Analyzer, Resume ATS Checker etc." },
                ].map((item, i) => (
                  <div key={i} className="p-6 rounded-2xl border border-border bg-card space-y-3">
                    <span className="text-4xl">{item.icon}</span>
                    <p className="font-black text-lg">{item.title}</p>
                    <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-black">
                EasyTool Kyun Use Karein?
              </h2>
              <div className="space-y-5">
                {[
                  { step: "1", title: "100% Free", desc: "Koi paise nahi lagenge, bilkul free unlimited use." },
                  { step: "2", title: "No Signup", desc: "Bas aao aur use karo, koi login ya signup ki zarurat nahi." },
                  { step: "3", title: "Privacy First", desc: "Aapki files kabhi servers pe upload nahi hoti, sab browser mein process hota hai." },
                  { step: "4", title: "Mobile Friendly", desc: "Har device pe kaam karta hai - desktop, mobile, tablet sab pe." },
                ].map(s => (
                  <div key={s.step} className="flex gap-5 p-6 rounded-2xl border border-border bg-card">
                    <div className="w-12 h-12 rounded-xl bg-violet-600 flex items-center justify-center text-white font-black text-xl flex-shrink-0">
                      {s.step}
                    </div>
                    <div>
                      <p className="font-black text-xl mb-2">{s.title}</p>
                      <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/">
                <Button className="bg-violet-600 hover:bg-violet-700 font-black rounded-xl h-12 px-10 shadow-lg shadow-violet-500/20 text-lg mt-4">
                  EasyTool Start Karein <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </section>

            <section className="p-8 md:p-10 rounded-2xl bg-violet-500/8 border border-violet-500/20 space-y-6">
              <div className="flex items-center gap-4">
                <Shield className="h-8 w-8 text-violet-600" />
                <h2 className="text-2xl font-black">
                  EasyTool - 100% Safe aur Private
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                EasyTool use karte waqt aapki privacy sabse zaroori hai. Aapki files kabhi bhi humare servers pe upload nahi hoti, sab kuch aapke browser mein hi JavaScript ke through process hota hai. Koi data store nahi hota, koi tracking nahi hota.
              </p>
            </section>
          </div>

          <div className="space-y-6 lg:sticky lg:top-8 self-start">
            <div className="rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 p-8 text-white space-y-6 shadow-2xl">
              <Globe className="h-10 w-10 text-white/90" />
              <div>
                <p className="font-black text-2xl leading-tight">Ready to use EasyTool?</p>
                <p className="text-white/80 text-sm mt-2 leading-relaxed">
                  Abhi EasyTool visit karein aur 50+ free tools use karein bilkul free.
                </p>
              </div>
              <Link href="/">
                <Button className="w-full bg-white text-violet-600 hover:bg-white/95 font-black h-12 rounded-xl text-lg">
                  Go to EasyTool <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
              <p className="font-black text-lg">Popular Tools</p>
              <div className="space-y-2">
                {[
                  { label: "Merge PDF", href: "/tools/merge-pdf", icon: "📄" },
                  { label: "Image Compressor", href: "/tools/image-compressor", icon: "🖼️" },
                  { label: "WhatsApp Analyzer", href: "/tools/whatsapp-chat-analyzer", icon: "💬" },
                  { label: "All Tools", href: "/tools", icon: "🛠️" },
                ].map(item => (
                  <Link key={item.href} href={item.href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors group">
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-sm font-semibold group-hover:text-violet-600 transition-colors">{item.label}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
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
