import { Metadata } from "next"
import Link from "next/link"
import { FileText, ChevronRight, CheckCircle2, ArrowRight, Shield, Zap, FilePlus, Layers, Download, ArrowUp, ArrowDown, Trash2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Merge PDF — Combine PDF Online Free | EasyTool",
  description: "Best pdf merger free online. Merge pdf files quickly and easily. Join pdf files with images and text. 100% free, no signup, secure.",
  keywords: [
    "merge pdf",
    "combine pdf online",
    "pdf merger free",
    "merge pdf files",
    "join pdf files",
    "online pdf merger",
    "merge multiple pdfs",
    "pdf combiner free",
    "free merge pdf online",
    "how to merge pdf files"
  ],
  alternates: { canonical: "https://easytool.live/merge-pdf" },
  openGraph: {
    title: "Merge PDF — Combine PDF Online Free",
    description: "Best pdf merger free online. Merge pdf files quickly and easily.",
    url: "https://easytool.live/merge-pdf",
    siteName: "EasyTool",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Merge PDF — Combine PDF Online Free",
    description: "Best pdf merger free online. Merge pdf files quickly and easily.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Merge PDF - Combine PDF Online Free",
  "description": "Free online pdf merger to merge pdf files. Combine pdf online with images and text files.",
  "url": "https://easytool.live/merge-pdf",
  "mainEntity": {
    "@type": "SoftwareApplication",
    "name": "Merge PDF",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  },
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How to merge pdf files?", "acceptedAnswer": { "@type": "Answer", "text": "Upload your pdf files to EasyTool, arrange them in order, and click Merge. Your merged pdf will download instantly." } },
    { "@type": "Question", "name": "Is this pdf merger free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, EasyTool's merge pdf tool is 100% free. No limits, no ads, no signup required." } },
    { "@type": "Question", "name": "Can I combine pdf online with images?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! You can merge pdf files with images (JPG, PNG, WebP, GIF, BMP, TIFF) and text files. EasyTool converts them automatically." } },
    { "@type": "Question", "name": "Is it safe to merge pdf files here?", "acceptedAnswer": { "@type": "Answer", "text": "100% safe. All processing happens in your browser. Your files never leave your device and are never uploaded to any server." } },
    { "@type": "Question", "name": "How to join pdf files in order?", "acceptedAnswer": { "@type": "Answer", "text": "After uploading, you can drag and drop files to arrange them. The first file will be at the top of the merged pdf." } },
  ],
}

function MergePdfMockup() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2rem] p-2 shadow-2xl shadow-black/30">
        <div className="bg-white rounded-[1.75rem] overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-primary/80 px-6 pt-3 pb-2 flex items-center justify-between">
            <span className="text-white text-sm font-bold">9:41</span>
            <div className="flex gap-1 items-end h-3">
              <div className="w-0.5 h-1.5 bg-white/60 rounded-sm" />
              <div className="w-0.5 h-2 bg-white/80 rounded-sm" />
              <div className="w-0.5 h-3 bg-white rounded-sm" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-primary to-primary/90 px-6 py-4">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-white" />
              <div>
                <p className="text-white text-lg font-black">Merge PDF</p>
                <p className="text-white/80 text-xs">Combine PDF Online</p>
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
            
            <div className="bg-gradient-to-r from-primary to-primary/90 rounded-xl p-4 text-white text-center shadow-lg">
              <p className="text-lg font-black">Merge & Download</p>
              <p className="text-xs text-white/80 mt-1">3 files • 15 pages total</p>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
              <p className="text-sm font-black text-green-700">✅ Files Merged Successfully!</p>
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

export default function MergePdfSeoPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="bg-gradient-to-b from-primary/10 to-transparent border-b border-primary/15">
        <div className="container py-12 md:py-20">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">Merge PDF</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-primary/15 text-primary dark:text-primary/80 border-primary/25 font-black text-sm">
                  📄 Merge PDF
                </Badge>
                <Badge variant="outline" className="font-semibold text-sm">Free Tool</Badge>
                <Badge variant="outline" className="font-semibold text-sm">100% Private</Badge>
                <Badge variant="outline" className="font-semibold text-sm">No Signup</Badge>
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                Merge PDF
                <span className="block text-primary mt-2">Combine PDF Online Free</span>
              </h1>

              <p className="text-muted-foreground text-xl leading-relaxed">
                The best <strong>pdf merger free</strong> online tool. <strong>Merge pdf files</strong> quickly and easily. <strong>Join pdf files</strong> with images and text. 100% free, no signup required.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/tools/merge-pdf">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 font-black rounded-xl h-14 px-10 shadow-xl shadow-primary/25 w-full sm:w-auto text-lg">
                    <FilePlus className="mr-3 h-6 w-6" />
                    Merge PDF Files Now
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                {[
                  { icon: Shield, text: "Files never uploaded" },
                  { icon: Zap, text: "Instant results" },
                  { icon: CheckCircle2, text: "No limits" },
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-2">
                    <item.icon className="h-5 w-5 text-primary" />
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
                Combine PDF Online with Multiple Formats
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Merge pdf files with ease. Our <strong>pdf merger free</strong> tool supports not just PDFs, but also images and text files. Simply upload your files, arrange them in your desired order, and download your perfectly merged document.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Whether you need to <strong>merge pdf files</strong> for work, school, or personal use, EasyTool makes it simple. <strong>Join pdf files</strong>, images, and text into one professional document in seconds.
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
                How to Merge PDF Files in 3 Simple Steps
              </h2>
              <div className="space-y-5">
                {[
                  { step: "1", title: "Upload your files", desc: "Click Browse Files or drag and drop your PDFs, images, and text files onto the upload area." },
                  { step: "2", title: "Arrange the order", desc: "Drag files to change their sequence. The first file you upload appears first in the merged document." },
                  { step: "3", title: "Download merged PDF", desc: "Click Merge & Download PDF. Your combined document will download automatically in seconds." }
                ].map(s => (
                  <div key={s.step} className="flex gap-5 p-6 rounded-2xl border border-border bg-card">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white font-black text-xl flex-shrink-0">
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
                <Button className="bg-primary hover:bg-primary/90 font-black rounded-xl h-12 px-10 shadow-lg shadow-primary/20 text-lg mt-4">
                  Merge PDF Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-black">
                Why Choose Our Pdf Merger Free Tool?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { icon: "⚡", title: "Lightning Fast", desc: "Merge pdf files in seconds. All processing happens locally in your browser for maximum speed." },
                  { icon: "🔒", title: "100% Secure", desc: "Your files never leave your device. No uploads to servers, complete privacy guaranteed." },
                  { icon: "🆓", title: "Completely Free", desc: "No ads, no watermarks, no limits. Our pdf merger free tool works perfectly every time." },
                  { icon: "📱", title: "Works Everywhere", desc: "Combine pdf online on any device. Works on Windows, Mac, Android, and iOS." }
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
                Features of Our Merge PDF Tool
              </h2>
              <ul className="space-y-4">
                {[
                  "Merge pdf files with unlimited pages",
                  "Combine pdf online with images (JPG, PNG, WebP, GIF, BMP, TIFF)",
                  "Join pdf files with text documents",
                  "Drag and drop to reorder files",
                  "Image previews for easy identification",
                  "Real-time progress bar",
                  "Shows total pages before merging",
                  "Downloads with automatic timestamp",
                  "No watermarks on merged documents",
                  "Works offline after initial page load"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground text-lg">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="p-8 md:p-10 rounded-2xl bg-primary/8 border border-primary/20 space-y-6">
              <div className="flex items-center gap-4">
                <Shield className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-black">
                  Your Privacy is Our Priority
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                When you <strong>merge pdf files</strong> with EasyTool, your files are processed entirely in your browser using JavaScript. There are no server uploads, no databases, no storage of any kind. Your documents stay completely private and secure.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-black">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {[
                  { q: "How to merge pdf files?", a: "Upload your pdf files to EasyTool, arrange them in order by dragging, then click Merge. Your combined pdf will download instantly." },
                  { q: "Is this pdf merger free to use?", a: "Yes! Our merge pdf tool is 100% free with no limits, no watermarks, and no signup required." },
                  { q: "Can I combine pdf online with images?", a: "Absolutely! You can merge pdf files with JPG, PNG, WebP, GIF, BMP, and TIFF images. They are automatically converted to PDF pages." },
                  { q: "How many files can I join at once?", a: "There is no strict limit. You can merge pdf files in batches as large as your browser can handle." },
                  { q: "Is it safe to merge pdf here?", a: "100% safe. All processing happens in your browser. Your files are never uploaded to any server." }
                ].map((item, i) => (
                  <div key={i} className="p-6 rounded-xl border border-border bg-card">
                    <p className="font-black text-lg mb-3 flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      {item.q}
                    </p>
                    <p className="text-muted-foreground leading-relaxed pl-8">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          <div className="space-y-6 lg:sticky lg:top-8 self-start">
            <div className="rounded-2xl bg-gradient-to-br from-primary to-primary/90 p-8 text-white space-y-6 shadow-2xl">
              <FileText className="h-10 w-10 text-white/90" />
              <div>
                <p className="font-black text-2xl leading-tight">Ready to Merge PDF?</p>
                <p className="text-white/80 text-sm mt-2 leading-relaxed">
                  Combine pdf online free right now. No signup, no limits, just pure convenience.
                </p>
              </div>
              <Link href="/tools/merge-pdf">
                <Button className="w-full bg-white text-primary hover:bg-white/95 font-black h-12 rounded-xl text-lg">
                  Merge PDF Now <ArrowRight className="ml-2 h-5 w-5" />
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
                    <span className="text-sm font-semibold group-hover:text-primary transition-colors">{item.label}</span>
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
