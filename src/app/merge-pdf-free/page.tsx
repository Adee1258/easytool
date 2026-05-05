import { Metadata } from "next"
import Link from "next/link"
import { FileText, ChevronRight, CheckCircle2, ArrowRight, Shield, Zap, FilePlus, Layers, Download, ArrowUp, ArrowDown, Trash2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Merge PDF Free — Combine PDF Online 100% Free | EasyTool",
  description: "Merge PDF free online without any limits. Best free PDF merger tool to combine PDF files. 100% free, no signup, no watermarks, instant download.",
  keywords: [
    "merge pdf free",
    "free pdf merger",
    "merge pdf online free",
    "combine pdf free",
    "free pdf combiner",
    "merge pdf files free",
    "pdf merger free online",
    "free merge pdf tool",
    "merge pdf without paying",
    "free online pdf merger"
  ],
  alternates: { canonical: "https://easytool.live/merge-pdf-free" },
  openGraph: {
    title: "Merge PDF Free — Combine PDF Online 100% Free",
    description: "Best free PDF merger tool to merge PDF files. No limits, no watermarks, completely free.",
    url: "https://easytool.live/merge-pdf-free",
    siteName: "EasyTool",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Merge PDF Free — Combine PDF Online 100% Free",
    description: "Best free PDF merger tool to merge PDF files. No limits, no watermarks, completely free.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Merge PDF Free - Combine PDF Online 100% Free",
  "description": "100% free online PDF merger to merge PDF files. Combine PDF free with no watermarks, no signup.",
  "url": "https://easytool.live/merge-pdf-free",
  "mainEntity": {
    "@type": "SoftwareApplication",
    "name": "Merge PDF Free",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  },
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Is there a truly free way to merge PDFs?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! EasyTool's merge PDF free tool is 100% free with no hidden costs, no limits, no watermarks, and no signup required." } },
    { "@type": "Question", "name": "Can I merge PDF files for free without watermarks?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely! Our free PDF merger adds no watermarks to your merged documents. You get clean, professional results every time." } },
    { "@type": "Question", "name": "How many PDFs can I merge for free?", "acceptedAnswer": { "@type": "Answer", "text": "There are no limits! You can merge as many PDF files as you want, completely free. Our free PDF combiner works with any number of files." } },
    { "@type": "Question", "name": "Do I need to sign up to merge PDF free?", "acceptedAnswer": { "@type": "Answer", "text": "No signup needed! Just visit EasyTool, upload your files, and merge PDF free instantly. No accounts, no emails required." } },
    { "@type": "Question", "name": "Is merge PDF free safe to use?", "acceptedAnswer": { "@type": "Answer", "text": "100% safe! All processing happens in your browser. Your files are never uploaded to any server, ensuring complete privacy." } },
  ],
}

function MergePdfMockup() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2rem] p-2 shadow-2xl shadow-black/30">
        <div className="bg-white rounded-[1.75rem] overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 pt-3 pb-2 flex items-center justify-between">
            <span className="text-white text-sm font-bold">9:41</span>
            <div className="flex gap-1 items-end h-3">
              <div className="w-0.5 h-1.5 bg-white/60 rounded-sm" />
              <div className="w-0.5 h-2 bg-white/80 rounded-sm" />
              <div className="w-0.5 h-3 bg-white rounded-sm" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-white" />
              <div>
                <p className="text-white text-lg font-black">Merge PDF Free</p>
                <p className="text-white/80 text-xs">100% Free Tool</p>
              </div>
            </div>
          </div>

          <div className="p-5 bg-gray-50 space-y-3">
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Files to Merge</p>
              <div className="space-y-2">
                {[
                  { name: "report.pdf", size: "2.4 MB", color: "bg-red-100 text-red-600" },
                  { name: "photo.jpg", size: "850 KB", color: "bg-blue-100 text-blue-600" },
                  { name: "notes.txt", size: "12 KB", color: "bg-green-100 text-green-600" }
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-gray-50 border border-gray-100">
                    <div className={f.color + " p-2 rounded-lg flex-shrink-0"}>
                      <FileText className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-700 truncate">{f.name}</p>
                      <p className="text-[10px] text-gray-400">{f.size}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <ArrowUp className="h-3 w-3 text-gray-400" />
                      <ArrowDown className="h-3 w-3 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white text-center shadow-lg">
              <p className="text-lg font-black">Merge & Download</p>
              <p className="text-xs text-white/80 mt-1">3 files • 15 pages total</p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
              <p className="text-sm font-black text-green-700">✅ 100% Free • No Watermarks</p>
              <p className="text-[11px] text-green-600 mt-1">Download started automatically</p>
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

export default function MergePdfFreeSeoPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="bg-gradient-to-b from-green-500/10 to-transparent border-b border-green-500/15">
        <div className="container py-12 md:py-20">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">Merge PDF Free</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-green-500/15 text-green-600 dark:text-green-400 border-green-500/25 font-black text-sm">
                  🆓 100% Free
                </Badge>
                <Badge variant="outline" className="font-semibold text-sm">No Watermarks</Badge>
                <Badge variant="outline" className="font-semibold text-sm">No Limits</Badge>
                <Badge variant="outline" className="font-semibold text-sm">No Signup</Badge>
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                Merge PDF Free
                <span className="block text-green-600 mt-2">Combine PDF Online 100% Free</span>
              </h1>

              <p className="text-muted-foreground text-xl leading-relaxed">
                The best <strong>merge PDF free</strong> tool online. <strong>Combine PDF free</strong> with no watermarks, no limits, and no signup required. Our <strong>free PDF merger</strong> works instantly in your browser.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/tools/merge-pdf">
                  <Button size="lg" className="bg-green-500 hover:bg-green-600 font-black rounded-xl h-14 px-10 shadow-xl shadow-green-500/25 w-full sm:w-auto text-lg">
                    <FilePlus className="mr-3 h-6 w-6" />
                    Merge PDF Free Now
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                {[
                  { icon: Shield, text: "Files never uploaded" },
                  { icon: Zap, text: "Instant results" },
                  { icon: CheckCircle2, text: "No watermarks" },
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-2">
                    <item.icon className="h-5 w-5 text-green-500" />
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
                Merge PDF Free with No Hidden Costs
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Tired of PDF mergers that charge you for basic features? Our <strong>merge PDF free</strong> tool is completely free with no strings attached. No subscription fees, no one-time payments, just pure functionality.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Whether you need to <strong>merge PDF free</strong> for work, school, or personal projects, EasyTool has you covered. Our <strong>free PDF combiner</strong> handles everything from small documents to large files with ease.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {[
                  { label: "No Watermarks", icon: "❌" },
                  { label: "No Limits", icon: "♾️" },
                  { label: "No Signup", icon: "📧" },
                  { label: "100% Free", icon: "💸" }
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
                How to Merge PDF Free in 3 Simple Steps
              </h2>
              <div className="space-y-5">
                {[
                  { step: "1", title: "Upload your files", desc: "Click Browse Files or drag and drop your PDFs, images, and text files onto the upload area. No account needed!" },
                  { step: "2", title: "Arrange the order", desc: "Drag files to change their sequence. The first file you upload appears first in the merged document." },
                  { step: "3", title: "Download merged PDF", desc: "Click Merge & Download PDF. Your combined document will download automatically in seconds. 100% free!" }
                ].map(s => (
                  <div key={s.step} className="flex gap-5 p-6 rounded-2xl border border-border bg-card">
                    <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center text-white font-black text-xl flex-shrink-0">
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
                <Button className="bg-green-500 hover:bg-green-600 font-black rounded-xl h-12 px-10 shadow-lg shadow-green-500/20 text-lg mt-4">
                  Merge PDF Free Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-black">
                Why Choose Our Free PDF Merger?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { icon: "🆓", title: "Truly Free", desc: "No hidden fees, no subscriptions, no premium plans. Merge PDF free forever." },
                  { icon: "🚫", title: "No Watermarks", desc: "Your merged PDFs come out clean and professional with no watermarks of any kind." },
                  { icon: "♾️", title: "Unlimited Usage", desc: "Merge as many files as you want, as often as you want. No daily limits, no file size restrictions." },
                  { icon: "⚡", title: "Lightning Fast", desc: "All processing happens locally in your browser for maximum speed and privacy." }
                ].map(item => (
                  <div key={item.title} className="p-6 rounded-2xl border border-border bg-card space-y-3">
                    <span className="text-4xl">{item.icon}</span>
                    <p className="font-black text-lg">{item.title}</p>
                    <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-black">
                Features of Our Merge PDF Free Tool
              </h2>
              <ul className="space-y-4">
                {[
                  "Merge PDF free with unlimited files and pages",
                  "No watermarks on merged documents",
                  "Combine PDF free with images (JPG, PNG, WebP, GIF, BMP, TIFF)",
                  "Merge PDF files free with text documents",
                  "Drag and drop to reorder files",
                  "Image previews for easy identification",
                  "Real-time progress bar",
                  "Shows total pages before merging",
                  "Downloads with automatic timestamp",
                  "Works offline after initial page load"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground text-lg">
                    <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="p-8 md:p-10 rounded-2xl bg-green-500/8 border border-green-500/20 space-y-6">
              <div className="flex items-center gap-4">
                <Shield className="h-8 w-8 text-green-500" />
                <h2 className="text-2xl font-black">
                  Your Privacy is Our Priority
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                When you <strong>merge PDF free</strong> with EasyTool, your files are processed entirely in your browser using JavaScript. There are no server uploads, no databases, no storage of any kind. Your documents stay completely private and secure.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-black">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {[
                  { q: "Is there a truly free way to merge PDFs?", a: "Yes! EasyTool's merge PDF free tool is 100% free with no hidden costs, no limits, no watermarks, and no signup required." },
                  { q: "Can I merge PDF files for free without watermarks?", a: "Absolutely! Our free PDF merger adds no watermarks to your merged documents. You get clean, professional results every time." },
                  { q: "How many PDFs can I merge for free?", a: "There are no limits! You can merge as many PDF files as you want, completely free. Our free PDF combiner works with any number of files." },
                  { q: "Do I need to sign up to merge PDF free?", a: "No signup needed! Just visit EasyTool, upload your files, and merge PDF free instantly. No accounts, no emails required." },
                  { q: "Is merge PDF free safe to use?", a: "100% safe! All processing happens in your browser. Your files are never uploaded to any server, ensuring complete privacy." }
                ].map((item, i) => (
                  <div key={i} className="p-6 rounded-xl border border-border bg-card">
                    <p className="font-black text-lg mb-3 flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      {item.q}
                    </p>
                    <p className="text-muted-foreground leading-relaxed pl-8">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          <div className="space-y-6 lg:sticky lg:top-8 self-start">
            <div className="rounded-2xl bg-gradient-to-br from-green-500 to-green-600 p-8 text-white space-y-6 shadow-2xl">
              <FileText className="h-10 w-10 text-white/90" />
              <div>
                <p className="font-black text-2xl leading-tight">Ready to Merge PDF Free?</p>
                <p className="text-white/80 text-sm mt-2 leading-relaxed">
                  Combine PDF free right now. No signup, no watermarks, 100% free forever.
                </p>
              </div>
              <Link href="/tools/merge-pdf">
                <Button className="w-full bg-white text-green-600 hover:bg-white/95 font-black h-12 rounded-xl text-lg">
                  Merge PDF Free Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
              <p className="font-black text-lg">What's Included Free</p>
              <div className="grid grid-cols-1 gap-3">
                {[
                  "✅ Unlimited files",
                  "✅ No watermarks",
                  "✅ No file size limits",
                  "✅ No daily limits",
                  "✅ All file formats"
                ].map(fmt => (
                  <div key={fmt} className="p-3 rounded-lg bg-muted/50">
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
                    <span className="text-sm font-semibold group-hover:text-green-500 transition-colors">{item.label}</span>
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
