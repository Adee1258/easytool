import { Metadata } from "next"
import Link from "next/link"
import { FileText, ChevronRight, CheckCircle2, ArrowRight, Shield, Zap, FilePlus, Layers, Download, ArrowUp, ArrowDown, Trash2, Upload, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Merge PDF on Android — Combine PDFs on Android Free | EasyTool",
  description: "Merge PDF on Android easily. Combine PDFs on Android without any app. How to merge PDF files on Android for free. Works on all Android devices.",
  keywords: [
    "merge pdf on android",
    "combine pdf on android",
    "how to merge pdf on android",
    "merge pdf files on android",
    "combine pdf files on android",
    "merge pdf android",
    "how to combine pdf on android",
    "merge pdf on android free",
    "combine pdfs on android",
    "merge pdf on android without app"
  ],
  alternates: { canonical: "https://easytool.live/merge-pdf-android" },
  openGraph: {
    title: "Merge PDF on Android — Combine PDFs on Android Free",
    description: "Merge PDF on Android easily. Combine PDFs on Android without any app.",
    url: "https://easytool.live/merge-pdf-android",
    siteName: "EasyTool",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Merge PDF on Android — Combine PDFs on Android Free",
    description: "Merge PDF on Android easily. Combine PDFs on Android without any app.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Merge PDF on Android - Combine PDFs on Android Free",
  "description": "Merge PDF on Android easily. Combine PDFs on Android without any app. How to merge PDF files on Android for free.",
  "url": "https://easytool.live/merge-pdf-android",
  "mainEntity": {
    "@type": "SoftwareApplication",
    "name": "Merge PDF on Android",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Android",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  },
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How to merge PDF on Android?", "acceptedAnswer": { "@type": "Answer", "text": "To merge PDF on Android, open EasyTool in Chrome, upload your PDF files, arrange them in order, and tap Merge. Your combined PDF will download to your Android device instantly." } },
    { "@type": "Question", "name": "Can I combine PDFs on Android without an app?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! You can merge PDF on Android without downloading any apps. EasyTool works directly in Chrome or any Android browser - no installation needed." } },
    { "@type": "Question", "name": "Is there a free way to merge PDF on Android?", "acceptedAnswer": { "@type": "Answer", "text": "EasyTool is completely free to merge PDF on Android. No subscription, no in-app purchases, no watermarks, no limits." } },
    { "@type": "Question", "name": "Does this work on all Android devices?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! You can merge PDF on Android phones and tablets from Samsung, Google, Xiaomi, OnePlus, and all other manufacturers." } },
    { "@type": "Question", "name": "Is it safe to merge PDF on Android here?", "acceptedAnswer": { "@type": "Answer", "text": "100% safe! All processing happens in your browser. Your files are never uploaded to any server when you merge PDF on Android with EasyTool." } },
  ],
}

function MergePdfMockup() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2rem] p-2 shadow-2xl shadow-black/30">
        <div className="bg-white rounded-[1.75rem] overflow-hidden">
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 px-6 pt-3 pb-2 flex items-center justify-between">
            <span className="text-white text-sm font-bold">9:41</span>
            <div className="flex gap-1 items-end h-3">
              <div className="w-0.5 h-1.5 bg-white/60 rounded-sm" />
              <div className="w-0.5 h-2 bg-white/80 rounded-sm" />
              <div className="w-0.5 h-3 bg-white rounded-sm" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 px-6 py-4">
            <div className="flex items-center gap-3">
              <Smartphone className="w-6 h-6 text-white" />
              <div>
                <p className="text-white text-lg font-black">Merge PDF on Android</p>
                <p className="text-white/80 text-xs">Android • No App Needed</p>
              </div>
            </div>
          </div>
          
          <div className="p-5 bg-gray-50 space-y-3">
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">On Your Android</p>
              <div className="space-y-2">
                {[
                  { name: "report.pdf", size: "2.1 MB", color: "bg-teal-100 text-teal-600" },
                  { name: "attachment.pdf", size: "1.5 MB", color: "bg-cyan-100 text-cyan-600" }
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-gray-50 border border-gray-100">
                    <div className={f.color + " p-2 rounded-lg flex-shrink-0"}>
                      <FileText className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-700 truncate">{f.name}</p>
                      <p className="text-[10px] text-gray-400">{f.size}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl p-4 text-white text-center shadow-lg">
              <p className="text-lg font-black">Merge & Download</p>
              <p className="text-xs text-white/80 mt-1">On Android • Instant</p>
            </div>
            
            <div className="bg-teal-50 border border-teal-200 rounded-xl p-3 text-center">
              <p className="text-sm font-black text-teal-700">✅ Works on Android</p>
              <p className="text-[11px] text-teal-600 mt-1">No app • No cost</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center py-2">
          <div className="w-12 h-1.5 bg-gray-700 rounded-full" />
        </div>
      </div>
    </div>
  )
}

export default function MergePdfAndroidSeoPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="bg-gradient-to-b from-teal-500/10 to-transparent border-b border-teal-500/15">
        <div className="container py-12 md:py-20">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">Merge PDF on Android</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-teal-500/15 text-teal-600 dark:text-teal-400 border-teal-500/25 font-black text-sm">
                  📱 Android Devices
                </Badge>
                <Badge variant="outline" className="font-semibold text-sm">No App Needed</Badge>
                <Badge variant="outline" className="font-semibold text-sm">100% Free</Badge>
                <Badge variant="outline" className="font-semibold text-sm">No Signup</Badge>
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                Merge PDF on Android
                <span className="block text-teal-600 mt-2">Combine PDFs on Android Free</span>
              </h1>

              <p className="text-muted-foreground text-xl leading-relaxed">
                Learn how to <strong>merge PDF on Android</strong> without any apps! EasyTool lets you <strong>combine PDFs on Android</strong> directly in Chrome. No installation, no cost, just pure PDF merging power on your Android device.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/tools/merge-pdf">
                  <Button size="lg" className="bg-teal-500 hover:bg-teal-600 font-black rounded-xl h-14 px-10 shadow-xl shadow-teal-500/25 w-full sm:w-auto text-lg">
                    <Smartphone className="mr-3 h-6 w-6" />
                    Merge PDF on Android Now
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                {[
                  { icon: Shield, text: "Files never uploaded" },
                  { icon: Zap, text: "Instant results" },
                  { icon: CheckCircle2, text: "Works on Android" },
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-2">
                    <item.icon className="h-5 w-5 text-teal-500" />
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <MergePdfMockup />
            </div>
          </div>
        </div>
      </div>

      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-16">

            <section className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-black">
                Merge PDF on Android: No App Required
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Want to <strong>merge PDF on Android</strong> but don't want to download another app? You're in luck! EasyTool works directly in Chrome, Samsung Internet, or any browser on your Android device. No Play Store, no installation, no storage space used - just instant PDF merging.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Whether you're using a Samsung Galaxy, Google Pixel, Xiaomi, OnePlus, or any other Android device, our tool works perfectly. You can <strong>combine PDFs on Android</strong> anywhere, anytime - all you need is an internet connection to load the page (after that, it works offline too!).
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-black">
                How to Merge PDF on Android: Step by Step
              </h2>
              <div className="space-y-5">
                {[
                  { step: "1", title: "Open EasyTool in Chrome", desc: "On your Android device, open Chrome (or any browser) and go to EasyTool's merge PDF page. No need to download anything from the Play Store!" },
                  { step: "2", title: "Upload Your PDF Files", desc: "Tap the \"Browse Files\" button to select PDFs from your Files app, or tap and hold to drag and drop. You can also select photos from your Gallery - they'll be converted to PDF automatically!" },
                  { step: "3", title: "Arrange and Merge", desc: "Press and hold on a file to drag it into the perfect order. When you're ready, tap \"Merge & Download PDF\". Your merged file will save to your Downloads folder!" }
                ].map(s => (
                  <div key={s.step} className="flex gap-5 p-6 rounded-2xl border border-border bg-card">
                    <div className="w-12 h-12 rounded-xl bg-teal-500 flex items-center justify-center text-white font-black text-xl flex-shrink-0">
                      {s.step}
                    </div>
                    <div>
                      <p className="font-black text-xl mb-2">{s.title}</p>
                      <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/tools/merge-pdf">
                <Button className="bg-teal-500 hover:bg-teal-600 font-black rounded-xl h-12 px-10 shadow-lg shadow-teal-500/20 text-lg mt-4">
                  Try on Android Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-black">
                Tips for Merging PDFs on Android
              </h2>
              <ul className="space-y-4">
                {[
                  "Save your PDFs to your Files app first for easy access",
                  "Use Chrome for the best experience on Android",
                  "Make sure you have enough free space for the merged file",
                  "Check the order carefully before tapping merge",
                  "Your merged PDF will appear in your Downloads folder",
                  "You can share the merged PDF directly from Chrome"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground text-lg">
                    <CheckCircle2 className="h-6 w-6 text-teal-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="p-8 md:p-10 rounded-2xl bg-teal-500/8 border border-teal-500/20 space-y-6">
              <div className="flex items-center gap-4">
                <Shield className="h-8 w-8 text-teal-500" />
                <h2 className="text-2xl font-black">
                  Your Privacy on Android is Protected
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                When you <strong>merge PDF on Android</strong> with EasyTool, your files are processed entirely in your browser using JavaScript. There are no server uploads, no databases, no storage of any kind. Your documents stay completely private and secure on your Android device.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-black">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {[
                  { q: "How to merge PDF on Android?", a: "To merge PDF on Android, open EasyTool in Chrome, upload your PDF files, arrange them in order, and tap Merge. Your combined PDF will download to your Android device instantly." },
                  { q: "Can I combine PDFs on Android without an app?", a: "Yes! You can merge PDF on Android without downloading any apps. EasyTool works directly in Chrome or any Android browser - no installation needed." },
                  { q: "Is there a free way to merge PDF on Android?", a: "EasyTool is completely free to merge PDF on Android. No subscription, no in-app purchases, no watermarks, no limits." },
                  { q: "Does this work on all Android devices?", a: "Yes! You can merge PDF on Android phones and tablets from Samsung, Google, Xiaomi, OnePlus, and all other manufacturers." },
                  { q: "Is it safe to merge PDF on Android here?", a: "100% safe! All processing happens in your browser. Your files are never uploaded to any server when you merge PDF on Android with EasyTool." }
                ].map((item, i) => (
                  <div key={i} className="p-6 rounded-xl border border-border bg-card">
                    <p className="font-black text-lg mb-3 flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-teal-500 flex-shrink-0 mt-0.5" />
                      {item.q}
                    </p>
                    <p className="text-muted-foreground leading-relaxed pl-8">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          <div className="space-y-6 lg:sticky lg:top-8 self-start">
            <div className="rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 p-8 text-white space-y-6 shadow-2xl">
              <Smartphone className="h-10 w-10 text-white/90" />
              <div>
                <p className="font-black text-2xl leading-tight">Ready to Merge PDF on Android?</p>
                <p className="text-white/80 text-sm mt-2 leading-relaxed">
                  Combine PDFs on Android right now. No app, no cost!
                </p>
              </div>
              <Link href="/tools/merge-pdf">
                <Button className="w-full bg-white text-teal-600 hover:bg-white/95 font-black h-12 rounded-xl text-lg">
                  Merge PDF Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
              <p className="font-black text-lg">Works With</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Samsung Galaxy", "Google Pixel",
                  "Xiaomi", "OnePlus",
                  "OPPO", "Vivo",
                  "Realme", "Huawei"
                ].map(fmt => (
                  <div key={fmt} className="p-3 rounded-lg bg-muted/50 text-center">
                    <span className="font-bold text-sm">{fmt}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
              <p className="font-black text-lg">Related Tools</p>
              <div className="space-y-2">
                {[
                  { label: "Split PDF", href: "/tools/split-pdf", icon: "✂️" },
                  { label: "Compress PDF", href: "/tools/compress-pdf", icon: "📦" },
                  { label: "PDF to Word", href: "/tools/pdf-to-word", icon: "📄" },
                  { label: "All PDF Tools", href: "/categories/PDF Tools", icon: "📁" },
                ].map(item => (
                  <Link key={item.href} href={item.href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors group">
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-sm font-semibold group-hover:text-teal-500 transition-colors">{item.label}</span>
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
