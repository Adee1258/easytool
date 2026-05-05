import { Metadata } from "next"
import Link from "next/link"
import { FileText, ChevronRight, CheckCircle2, ArrowRight, Shield, Zap, FilePlus, Layers, Download, ArrowUp, ArrowDown, Trash2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Combine PDF Files — Merge PDF Files Online Free | EasyTool",
  description: "Combine PDF files online with ease. Best tool to merge PDF files quickly and securely. Combine PDF files with images and text. Free, no signup required.",
  keywords: [
    "combine pdf files",
    "merge pdf files",
    "how to combine pdf files",
    "combine pdf files online",
    "pdf file combiner",
    "merge multiple pdf files",
    "combine two pdf files",
    "join pdf files",
    "combine pdf files free",
    "merge pdf files online"
  ],
  alternates: { canonical: "https://easytool.live/combine-pdf-files" },
  openGraph: {
    title: "Combine PDF Files — Merge PDF Files Online Free",
    description: "Best tool to combine PDF files online. Merge PDF files quickly and securely.",
    url: "https://easytool.live/combine-pdf-files",
    siteName: "EasyTool",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Combine PDF Files — Merge PDF Files Online Free",
    description: "Best tool to combine PDF files online. Merge PDF files quickly and securely.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Combine PDF Files - Merge PDF Files Online Free",
  "description": "Combine PDF files online with ease. Merge PDF files quickly and securely. Combine PDF files with images and text.",
  "url": "https://easytool.live/combine-pdf-files",
  "mainEntity": {
    "@type": "SoftwareApplication",
    "name": "Combine PDF Files",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  },
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name:": "How to combine PDF files?", "acceptedAnswer": { "@type": "Answer", "text": "To combine PDF files, simply upload your files to EasyTool, arrange them in your desired order, and click Merge. Your combined PDF will download instantly." } },
    { "@type": "Question", "name:": "Can I combine PDF files with images?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! You can combine PDF files with images (JPG, PNG, WebP, GIF, BMP, TIFF) and text files. EasyTool converts them automatically to PDF pages." } },
    { "@type": "Question", "name:": "Is there a limit to how many PDF files I can combine?", "acceptedAnswer": { "@type": "Answer", "text": "No, there's no strict limit! You can combine as many PDF files as your browser can handle. Perfect for large projects and documents." } },
    { "@type": "Question", "name:": "Can I reorder files while combining PDFs?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely! After uploading your files, you can drag and drop them to reorder. The first file will appear at the beginning of your combined document." } },
    { "@type": "Question", "name:": "Is it safe to combine PDF files here?", "acceptedAnswer": { "@type": "Answer", "text": "100% safe! All processing happens in your browser. Your files are never uploaded to any server, ensuring complete privacy and security." } },
  ],
}

function MergePdfMockup() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2rem] p-2 shadow-2xl shadow-black/30">
        <div className="bg-white rounded-[1.75rem] overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-6 pt-3 pb-2 flex items-center justify-between">
            <span className="text-white text-sm font-bold">9:41</span>
            <div className="flex gap-1 items-end h-3">
              <div className="w-0.5 h-1.5 bg-white/60 rounded-sm" />
              <div className="w-0.5 h-2 bg-white/80 rounded-sm" />
              <div className="w-0.5 h-3 bg-white rounded-sm" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-4">
            <div className="flex items-center gap-3">
              <Layers className="w-6 h-6 text-white" />
              <div>
                <p className="text-white text-lg font-black">Combine PDF Files</p>
                <p className="text-white/80 text-xs">Merge Multiple PDFs</p>
              </div>
            </div>
          </div>
          
          <div className="p-5 bg-gray-50 space-y-3">
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Files to Combine</p>
              <div className="space-y-2">
                {[
                  { name: "chapter1.pdf", size: "3.2 MB", color: "bg-blue-100 text-blue-600" },
                  { name: "chapter2.pdf", size: "2.8 MB", color: "bg-purple-100 text-purple-600" },
                  { name: "appendix.pdf", size: "1.5 MB", color: "bg-pink-100 text-pink-600" }
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
            
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 text-white text-center shadow-lg">
              <p className="text-lg font-black">Combine & Download</p>
              <p className="text-xs text-white/80 mt-1">3 files • 42 pages total</p>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 text-center">
              <p className="text-sm font-black text-purple-700">✅ Files Combined Successfully!</p>
              <p className="text-[11px] text-purple-600 mt-1">Download started automatically</p>
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

export default function CombinePdfFilesSeoPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="bg-gradient-to-b from-purple-500/10 to-transparent border-b border-purple-500/15">
        <div className="container py-12 md:py-20">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">Combine PDF Files</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/25 font-black text-sm">
                  📚 Combine PDF Files
                </Badge>
                <Badge variant="outline" className="font-semibold text-sm">Free Tool</Badge>
                <Badge variant="outline" className="font-semibold text-sm">100% Private</Badge>
                <Badge variant="outline" className="font-semibold text-sm">No Signup</Badge>
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                Combine PDF Files
                <span className="block text-purple-600 mt-2">Merge PDF Files Online Free</span>
              </h1>

              <p className="text-muted-foreground text-xl leading-relaxed">
                The easiest way to <strong>combine PDF files</strong> online. <strong>Merge PDF files</strong> quickly and securely. Our <strong>PDF file combiner</strong> supports images and text too. Free, no signup required.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/tools/merge-pdf">
                  <Button size="lg" className="bg-purple-500 hover:bg-purple-600 font-black rounded-xl h-14 px-10 shadow-xl shadow-purple-500/25 w-full sm:w-auto text-lg">
                    <Layers className="mr-3 h-6 w-6" />
                    Combine PDF Files Now
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                {[
                  { icon: Shield, text: "Files never uploaded" },
                  { icon: Zap, text: "Instant results" },
                  { icon: CheckCircle2, text: "Reorder files" },
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-2">
                    <item.icon className="h-5 w-5 text-purple-500" />
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
                Combine PDF Files with Multiple Formats
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Combine PDF files with ease. Our <strong>PDF file combiner</strong> supports not just PDFs, but also images and text files. Simply upload your files, arrange them in your desired order, and download your perfectly combined document.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Whether you need to <strong>combine PDF files</strong> for work, school, or personal use, EasyTool makes it simple. <strong>Merge PDF files</strong>, images, and text into one professional document in seconds.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {[
                  { label: "PDF Files", icon: "📄" },
                  { label: "JPG/PNG", icon: "🖼️" },
                  { label: "WebP/GIF", icon: "🎞️" },
                  { label: "Text Files", icon: "📝" }
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
                How to Combine PDF Files in 3 Simple Steps
              </h2>
              <div className="space-y-5">
                {[
                  { step: "1", title: "Upload your files", desc: "Click Browse Files or drag and drop your PDFs, images, and text files onto the upload area." },
                  { step: "2", title: "Arrange the order", desc: "Drag files to change their sequence. The first file you upload appears first in the combined document." },
                  { step: "3", title: "Download combined PDF", desc: "Click Combine & Download PDF. Your merged document will download automatically in seconds." }
                ].map(s => (
                  <div key={s.step} className="flex gap-5 p-6 rounded-2xl border border-border bg-card">
                    <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center text-white font-black text-xl flex-shrink-0">
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
                <Button className="bg-purple-500 hover:bg-purple-600 font-black rounded-xl h-12 px-10 shadow-lg shadow-purple-500/20 text-lg mt-4">
                  Combine PDF Files Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-black">
                Why Choose Our PDF File Combiner?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { icon: "⚡", title: "Lightning Fast", desc: "Combine PDF files in seconds. All processing happens locally in your browser for maximum speed." },
                  { icon: "🔒", title: "100% Secure", desc: "Your files never leave your device. No uploads to servers, complete privacy guaranteed." },
                  { icon: "🆓", title: "Completely Free", desc: "No ads, no watermarks, no limits. Our PDF file combiner works perfectly every time." },
                  { icon: "📱", title: "Works Everywhere", desc: "Combine PDF files on any device. Works on Windows, Mac, Android, and iOS." }
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
                Features of Our Combine PDF Files Tool
              </h2>
              <ul className="space-y-4">
                {[
                  "Combine PDF files with unlimited pages",
                  "Merge PDF files with images (JPG, PNG, WebP, GIF, BMP, TIFF)",
                  "Join PDF files with text documents",
                  "Drag and drop to reorder files",
                  "Image previews for easy identification",
                  "Real-time progress bar",
                  "Shows total pages before combining",
                  "Downloads with automatic timestamp",
                  "No watermarks on combined documents",
                  "Works offline after initial page load"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground text-lg">
                    <CheckCircle2 className="h-6 w-6 text-purple-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="p-8 md:p-10 rounded-2xl bg-purple-500/8 border border-purple-500/20 space-y-6">
              <div className="flex items-center gap-4">
                <Shield className="h-8 w-8 text-purple-500" />
                <h2 className="text-2xl font-black">
                  Your Privacy is Our Priority
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                When you <strong>combine PDF files</strong> with EasyTool, your files are processed entirely in your browser using JavaScript. There are no server uploads, no databases, no storage of any kind. Your documents stay completely private and secure.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-black">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {[
                  { q: "How to combine PDF files?", a: "To combine PDF files, simply upload your files to EasyTool, arrange them in your desired order, and click Merge. Your combined PDF will download instantly." },
                  { q: "Can I combine PDF files with images?", a: "Yes! You can combine PDF files with images (JPG, PNG, WebP, GIF, BMP, TIFF) and text files. EasyTool converts them automatically to PDF pages." },
                  { q: "Is there a limit to how many PDF files I can combine?", a: "No, there's no strict limit! You can combine as many PDF files as your browser can handle. Perfect for large projects and documents." },
                  { q: "Can I reorder files while combining PDFs?", a: "Absolutely! After uploading your files, you can drag and drop them to reorder. The first file will appear at the beginning of your combined document." },
                  { q: "Is it safe to combine PDF files here?", a: "100% safe! All processing happens in your browser. Your files are never uploaded to any server, ensuring complete privacy and security." }
                ].map((item, i) => (
                  <div key={i} className="p-6 rounded-xl border border-border bg-card">
                    <p className="font-black text-lg mb-3 flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
                      {item.q}
                    </p>
                    <p className="text-muted-foreground leading-relaxed pl-8">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          <div className="space-y-6 lg:sticky lg:top-8 self-start">
            <div className="rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 p-8 text-white space-y-6 shadow-2xl">
              <Layers className="h-10 w-10 text-white/90" />
              <div>
                <p className="font-black text-2xl leading-tight">Ready to Combine PDF Files?</p>
                <p className="text-white/80 text-sm mt-2 leading-relaxed">
                  Merge PDF files online free right now. No signup, no limits, just pure convenience.
                </p>
              </div>
              <Link href="/tools/merge-pdf">
                <Button className="w-full bg-white text-purple-600 hover:bg-white/95 font-black h-12 rounded-xl text-lg">
                  Combine PDF Files Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
              <p className="font-black text-lg">Supported Formats</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "PDF", "JPG", "PNG", "WebP", "GIF", "BMP", "TIFF", "TXT"
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
                    <span className="text-sm font-semibold group-hover:text-purple-500 transition-colors">{item.label}</span>
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
