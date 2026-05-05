import { Metadata } from "next"
import Link from "next/link"
import { FileText, ChevronRight, CheckCircle2, ArrowRight, Shield, Zap, FilePlus, Layers, Download, ArrowUp, ArrowDown, Trash2, Upload, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Merge PDF on Windows — Combine PDFs on Windows Free | EasyTool",
  description: "Merge PDF on Windows easily. Combine PDFs on Windows without any software. How to merge PDF files on Windows 10, 11 for free.",
  keywords: [
    "merge pdf on windows",
    "combine pdf on windows",
    "how to merge pdf on windows",
    "merge pdf files on windows",
    "combine pdf files on windows",
    "merge pdf windows 10",
    "merge pdf windows 11",
    "how to combine pdf on windows",
    "merge pdf on windows free",
    "combine pdfs on windows"
  ],
  alternates: { canonical: "https://easytool.live/merge-pdf-windows" },
  openGraph: {
    title: "Merge PDF on Windows — Combine PDFs on Windows Free",
    description: "Merge PDF on Windows easily. Combine PDFs on Windows without any software.",
    url: "https://easytool.live/merge-pdf-windows",
    siteName: "EasyTool",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Merge PDF on Windows — Combine PDFs on Windows Free",
    description: "Merge PDF on Windows easily. Combine PDFs on Windows without any software.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Merge PDF on Windows - Combine PDFs on Windows Free",
  "description": "Merge PDF on Windows easily. Combine PDFs on Windows without any software. How to merge PDF files on Windows 10, 11 for free.",
  "url": "https://easytool.live/merge-pdf-windows",
  "mainEntity": {
    "@type": "SoftwareApplication",
    "name": "Merge PDF on Windows",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Windows",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  },
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How to merge PDF on Windows?", "acceptedAnswer": { "@type": "Answer", "text": "To merge PDF on Windows, open EasyTool in your browser, upload your PDF files, arrange them in order, and click Merge. Your combined PDF will download instantly." } },
    { "@type": "Question", "name": "Can I combine PDFs on Windows without software?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! You can merge PDF on Windows without installing any software. EasyTool works directly in your browser - no downloads, no installation needed." } },
    { "@type": "Question", "name": "Is there a free way to merge PDF on Windows?", "acceptedAnswer": { "@type": "Answer", "text": "EasyTool is completely free to merge PDF on Windows. No subscription, no purchase required, no watermarks, no limits." } },
    { "@type": "Question", "name": "Does this work on Windows 10 and Windows 11?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! You can merge PDF on Windows 10, Windows 11, Windows 8, and Windows 7. Works on all modern Windows versions." } },
    { "@type": "Question", "name": "Is it safe to merge PDF on Windows here?", "acceptedAnswer": { "@type": "Answer", "text": "100% safe! All processing happens in your browser. Your files are never uploaded to any server when you merge PDF on Windows with EasyTool." } },
  ],
}

function MergePdfMockup() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2rem] p-2 shadow-2xl shadow-black/30">
        <div className="bg-white rounded-[1.75rem] overflow-hidden">
          <div className="bg-gradient-to-r from-sky-500 to-sky-600 px-6 pt-3 pb-2 flex items-center justify-between">
            <span className="text-white text-sm font-bold">9:41</span>
            <div className="flex gap-1 items-end h-3">
              <div className="w-0.5 h-1.5 bg-white/60 rounded-sm" />
              <div className="w-0.5 h-2 bg-white/80 rounded-sm" />
              <div className="w-0.5 h-3 bg-white rounded-sm" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-sky-500 to-sky-600 px-6 py-4">
            <div className="flex items-center gap-3">
              <Monitor className="w-6 h-6 text-white" />
              <div>
                <p className="text-white text-lg font-black">Merge PDF on Windows</p>
                <p className="text-white/80 text-xs">Windows 10 & 11</p>
              </div>
            </div>
          </div>
          
          <div className="p-5 bg-gray-50 space-y-3">
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">On Your Windows PC</p>
              <div className="space-y-2">
                {[
                  { name: "project-part1.pdf", size: "3.5 MB", color: "bg-sky-100 text-sky-600" },
                  { name: "project-part2.pdf", size: "2.8 MB", color: "bg-blue-100 text-blue-600" },
                  { name: "project-part3.pdf", size: "4.1 MB", color: "bg-indigo-100 text-indigo-600" }
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
            
            <div className="bg-gradient-to-r from-sky-500 to-sky-600 rounded-xl p-4 text-white text-center shadow-lg">
              <p className="text-lg font-black">Merge & Download</p>
              <p className="text-xs text-white/80 mt-1">On Windows • Fast</p>
            </div>
            
            <div className="bg-sky-50 border border-sky-200 rounded-xl p-3 text-center">
              <p className="text-sm font-black text-sky-700">✅ Works on Windows</p>
              <p className="text-[11px] text-sky-600 mt-1">No software • Free</p>
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

export default function MergePdfWindowsSeoPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="bg-gradient-to-b from-sky-500/10 to-transparent border-b border-sky-500/15">
        <div className="container py-12 md:py-20">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">Merge PDF on Windows</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/25 font-black text-sm">
                  💻 Windows 10 & 11
                </Badge>
                <Badge variant="outline" className="font-semibold text-sm">No Software</Badge>
                <Badge variant="outline" className="font-semibold text-sm">100% Free</Badge>
                <Badge variant="outline" className="font-semibold text-sm">No Signup</Badge>
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                Merge PDF on Windows
                <span className="block text-sky-600 mt-2">Combine PDFs on Windows Free</span>
              </h1>

              <p className="text-muted-foreground text-xl leading-relaxed">
                Learn how to <strong>merge PDF on Windows</strong> without any software! EasyTool lets you <strong>combine PDFs on Windows</strong> directly in your browser. Works on Windows 10, Windows 11, and more - no installation required!
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/tools/merge-pdf">
                  <Button size="lg" className="bg-sky-500 hover:bg-sky-600 font-black rounded-xl h-14 px-10 shadow-xl shadow-sky-500/25 w-full sm:w-auto text-lg">
                    <Monitor className="mr-3 h-6 w-6" />
                    Merge PDF on Windows Now
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                {[
                  { icon: Shield, text: "Files never uploaded" },
                  { icon: Zap, text: "Instant results" },
                  { icon: CheckCircle2, text: "Works on Windows" },
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-2">
                    <item.icon className="h-5 w-5 text-sky-500" />
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
                Merge PDF on Windows: No Software Required
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Want to <strong>merge PDF on Windows</strong> but don't want to install bulky software? You're in luck! EasyTool works directly in Edge, Chrome, Firefox, or any browser on your Windows PC. No downloads, no installation, no registry changes - just instant PDF merging.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Whether you're on Windows 11, Windows 10, Windows 8, or even Windows 7, our tool works perfectly. You can <strong>combine PDFs on Windows</strong> anywhere, anytime - all you need is an internet connection to load the page (after that, it works offline too!).
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-black">
                How to Merge PDF on Windows: Step by Step
              </h2>
              <div className="space-y-5">
                {[
                  { step: "1", title: "Open EasyTool in Your Browser", desc: "On your Windows PC, open Edge, Chrome, Firefox, or any browser and go to EasyTool's merge PDF page. No need to download or install anything!" },
                  { step: "2", title: "Upload Your PDF Files", desc: "Click the \"Browse Files\" button to select PDFs from your computer, or simply drag and drop them onto the page. You can also add images - they'll be converted to PDF automatically!" },
                  { step: "3", title: "Arrange and Merge", desc: "Drag files to reorder them into the perfect sequence. When you're ready, click \"Merge & Download PDF\". Your merged file will save to your Downloads folder!" }
                ].map(s => (
                  <div key={s.step} className="flex gap-5 p-6 rounded-2xl border border-border bg-card">
                    <div className="w-12 h-12 rounded-xl bg-sky-500 flex items-center justify-center text-white font-black text-xl flex-shrink-0">
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
                <Button className="bg-sky-500 hover:bg-sky-600 font-black rounded-xl h-12 px-10 shadow-lg shadow-sky-500/20 text-lg mt-4">
                  Try on Windows Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-black">
                Tips for Merging PDFs on Windows
              </h2>
              <ul className="space-y-4">
                {[
                  "Organize your PDFs in a folder first for easy selection",
                  "Use drag and drop for the fastest upload experience",
                  "Make sure you have enough free space on your hard drive",
                  "Check the file order carefully before clicking merge",
                  "Your merged PDF will appear in your Downloads folder",
                  "You can pin EasyTool to your taskbar for quick access"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground text-lg">
                    <CheckCircle2 className="h-6 w-6 text-sky-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="p-8 md:p-10 rounded-2xl bg-sky-500/8 border border-sky-500/20 space-y-6">
              <div className="flex items-center gap-4">
                <Shield className="h-8 w-8 text-sky-500" />
                <h2 className="text-2xl font-black">
                  Your Privacy on Windows is Protected
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                When you <strong>merge PDF on Windows</strong> with EasyTool, your files are processed entirely in your browser using JavaScript. There are no server uploads, no databases, no storage of any kind. Your documents stay completely private and secure on your Windows PC.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-black">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {[
                  { q: "How to merge PDF on Windows?", a: "To merge PDF on Windows, open EasyTool in your browser, upload your PDF files, arrange them in order, and click Merge. Your combined PDF will download instantly." },
                  { q: "Can I combine PDFs on Windows without software?", a: "Yes! You can merge PDF on Windows without installing any software. EasyTool works directly in your browser - no downloads, no installation needed." },
                  { q: "Is there a free way to merge PDF on Windows?", a: "EasyTool is completely free to merge PDF on Windows. No subscription, no purchase required, no watermarks, no limits." },
                  { q: "Does this work on Windows 10 and Windows 11?", a: "Yes! You can merge PDF on Windows 10, Windows 11, Windows 8, and Windows 7. Works on all modern Windows versions." },
                  { q: "Is it safe to merge PDF on Windows here?", a: "100% safe! All processing happens in your browser. Your files are never uploaded to any server when you merge PDF on Windows with EasyTool." }
                ].map((item, i) => (
                  <div key={i} className="p-6 rounded-xl border border-border bg-card">
                    <p className="font-black text-lg mb-3 flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-sky-500 flex-shrink-0 mt-0.5" />
                      {item.q}
                    </p>
                    <p className="text-muted-foreground leading-relaxed pl-8">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          <div className="space-y-6 lg:sticky lg:top-8 self-start">
            <div className="rounded-2xl bg-gradient-to-br from-sky-500 to-sky-600 p-8 text-white space-y-6 shadow-2xl">
              <Monitor className="h-10 w-10 text-white/90" />
              <div>
                <p className="font-black text-2xl leading-tight">Ready to Merge PDF on Windows?</p>
                <p className="text-white/80 text-sm mt-2 leading-relaxed">
                  Combine PDFs on Windows right now. No software, no cost!
                </p>
              </div>
              <Link href="/tools/merge-pdf">
                <Button className="w-full bg-white text-sky-600 hover:bg-white/95 font-black h-12 rounded-xl text-lg">
                  Merge PDF Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
              <p className="font-black text-lg">Works On</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Windows 11", "Windows 10",
                  "Windows 8", "Windows 7",
                  "Edge", "Chrome",
                  "Firefox", "Brave"
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
                    <span className="text-sm font-semibold group-hover:text-sky-500 transition-colors">{item.label}</span>
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
