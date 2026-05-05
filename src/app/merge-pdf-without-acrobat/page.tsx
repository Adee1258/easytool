import { Metadata } from "next"
import Link from "next/link"
import { FileText, ChevronRight, CheckCircle2, ArrowRight, Shield, Zap, FilePlus, Layers, Download, ArrowUp, ArrowDown, Trash2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Merge PDF Without Acrobat — Free Online PDF Merger | EasyTool",
  description: "Merge PDF without Acrobat. Free alternative to Adobe Acrobat for merging PDFs. Combine PDF files online without Adobe Acrobat. 100% free, no signup.",
  keywords: [
    "merge pdf without acrobat",
    "combine pdf without acrobat",
    "merge pdf without adobe",
    "pdf merger without acrobat",
    "merge pdf files without adobe acrobat",
    "alternative to acrobat for merging pdf",
    "merge pdf without adobe acrobat free",
    "how to merge pdf without acrobat",
    "merge pdfs without acrobat",
    "combine pdf files without acrobat"
  ],
  alternates: { canonical: "https://easytool.live/merge-pdf-without-acrobat" },
  openGraph: {
    title: "Merge PDF Without Acrobat — Free Online PDF Merger",
    description: "Merge PDF without Acrobat. Free alternative to Adobe Acrobat for merging PDFs.",
    url: "https://easytool.live/merge-pdf-without-acrobat",
    siteName: "EasyTool",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Merge PDF Without Acrobat — Free Online PDF Merger",
    description: "Merge PDF without Acrobat. Free alternative to Adobe Acrobat for merging PDFs.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Merge PDF Without Acrobat - Free Online PDF Merger",
  "description": "Merge PDF without Acrobat. Free alternative to Adobe Acrobat for merging PDFs. Combine PDF files online without Adobe Acrobat.",
  "url": "https://easytool.live/merge-pdf-without-acrobat",
  "mainEntity": {
    "@type": "SoftwareApplication",
    "name": "Merge PDF Without Acrobat",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  },
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Can I merge PDF without Acrobat?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! EasyTool lets you merge PDF without Acrobat. No Adobe software required - everything works in your browser for free." } },
    { "@type": "Question", "name": "How to merge PDF files without Adobe Acrobat?", "acceptedAnswer": { "@type": "Answer", "text": "To merge PDF without Acrobat, simply go to EasyTool, upload your PDF files, arrange them in order, and click Merge. Your combined PDF will download instantly." } },
    { "@type": "Question", "name:": "Is there a free alternative to Acrobat for merging PDFs?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! EasyTool is a completely free alternative to Acrobat for merging PDFs. No subscription, no fees, no limits, no watermarks." } },
    { "@type": "Question", "name": "Do I need to install anything to merge PDF without Acrobat?", "acceptedAnswer": { "@type": "Answer", "text": "No installation needed! To merge PDF without Acrobat, just open EasyTool in your browser. No software, no plugins, no downloads required." } },
    { "@type": "Question", "name": "Is it safe to merge PDF without Acrobat here?", "acceptedAnswer": { "@type": "Answer", "text": "100% safe! All processing happens in your browser. Your files are never uploaded to any server when you merge PDF without Acrobat with EasyTool." } },
  ],
}

function MergePdfMockup() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2rem] p-2 shadow-2xl shadow-black/30">
        <div className="bg-white rounded-[1.75rem] overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 pt-3 pb-2 flex items-center justify-between">
            <span className="text-white text-sm font-bold">9:41</span>
            <div className="flex gap-1 items-end h-3">
              <div className="w-0.5 h-1.5 bg-white/60 rounded-sm" />
              <div className="w-0.5 h-2 bg-white/80 rounded-sm" />
              <div className="w-0.5 h-3 bg-white rounded-sm" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-white" />
              <div>
                <p className="text-white text-lg font-black">No Acrobat Needed</p>
                <p className="text-white/80 text-xs">Merge PDF Free</p>
              </div>
            </div>
          </div>
          
          <div className="p-5 bg-gray-50 space-y-3">
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">No Adobe Required</p>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-red-50 border border-red-200">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <Trash2 className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-red-700">No Acrobat Needed</p>
                  <p className="text-[10px] text-red-600">Merge PDFs without Adobe</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-4 text-white text-center shadow-lg">
              <p className="text-lg font-black">Merge PDF Now</p>
              <p className="text-xs text-white/80 mt-1">No Acrobat • 100% Free</p>
            </div>
            
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 text-center">
              <p className="text-sm font-black text-orange-700">✅ Works in Browser Only</p>
              <p className="text-[11px] text-orange-600 mt-1">No installation required</p>
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

export default function MergePdfWithoutAcrobatSeoPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="bg-gradient-to-b from-orange-500/10 to-transparent border-b border-orange-500/15">
        <div className="container py-12 md:py-20">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">Merge PDF Without Acrobat</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-500/25 font-black text-sm">
                  ❌ No Acrobat Needed
                </Badge>
                <Badge variant="outline" className="font-semibold text-sm">Free Tool</Badge>
                <Badge variant="outline" className="font-semibold text-sm">No Installation</Badge>
                <Badge variant="outline" className="font-semibold text-sm">No Signup</Badge>
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                Merge PDF Without Acrobat
                <span className="block text-orange-600 mt-2">No Adobe Software Required</span>
              </h1>

              <p className="text-muted-foreground text-xl leading-relaxed">
                Want to <strong>merge PDF without Acrobat</strong>? You've come to the right place! EasyTool lets you <strong>combine PDF without Acrobat</strong> - no Adobe software, no installation, no subscription fees. Just pure, free PDF merging.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/tools/merge-pdf">
                  <Button size="lg" className="bg-orange-500 hover:bg-orange-600 font-black rounded-xl h-14 px-10 shadow-xl shadow-orange-500/25 w-full sm:w-auto text-lg">
                    <FilePlus className="mr-3 h-6 w-6" />
                    Merge PDF Without Acrobat Now
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                {[
                  { icon: Shield, text: "Files never uploaded" },
                  { icon: Zap, text: "Instant results" },
                  { icon: CheckCircle2, text: "No Adobe needed" },
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-2">
                    <item.icon className="h-5 w-5 text-orange-500" />
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
                Why Merge PDF Without Acrobat?
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Adobe Acrobat is great, but it's expensive and bulky. If you just need to <strong>merge PDF without Acrobat</strong>, why pay for a full subscription? EasyTool is the perfect <strong>alternative to Acrobat for merging PDFs</strong> - it's free, fast, and works in any web browser.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                {[
                  { label: "No Subscription Fees", icon: "💰", desc: "Save hundreds of dollars compared to Acrobat" },
                  { label: "No Installation", icon: "💻", desc: "Works directly in your browser - no downloads" },
                  { label: "No Learning Curve", icon: "📚", desc: "Simple interface - anyone can use it" },
                  { label: "100% Free", icon: "🆓", desc: "No hidden costs, no limits, no watermarks" }
                ].map(item => (
                  <div key={item.label} className="p-6 rounded-2xl bg-card border border-border space-y-3">
                    <span className="text-4xl">{item.icon}</span>
                    <p className="font-black text-base">{item.label}</p>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-black">
                How to Merge PDF Without Acrobat in 3 Steps
              </h2>
              <div className="space-y-5">
                {[
                  { step: "1", title: "Open EasyTool in Your Browser", desc: "No need to install anything! Just open EasyTool in Chrome, Firefox, Safari, or any modern web browser. You're ready to merge PDF without Acrobat in seconds." },
                  { step: "2", title: "Upload and Arrange Your Files", desc: "Click Browse Files or drag and drop your PDFs onto the upload area. You can also add images and text files. Drag to reorder them exactly how you want." },
                  { step: "3", title: "Merge and Download Your PDF", desc: "Click Merge & Download PDF. Your files will be processed locally in your browser, and your merged PDF will download automatically. That's how to merge PDF files without Adobe Acrobat!" }
                ].map(s => (
                  <div key={s.step} className="flex gap-5 p-6 rounded-2xl border border-border bg-card">
                    <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center text-white font-black text-xl flex-shrink-0">
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
                <Button className="bg-orange-500 hover:bg-orange-600 font-black rounded-xl h-12 px-10 shadow-lg shadow-orange-500/20 text-lg mt-4">
                  Try It Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-black">
                EasyTool vs Adobe Acrobat: Which is Better?
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 font-black">Feature</th>
                      <th className="text-left p-4 font-black text-orange-500">EasyTool</th>
                      <th className="text-left p-4 font-black text-muted-foreground">Adobe Acrobat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { feature: "Cost", easytool: "100% Free", acrobat: "$$$/month subscription" },
                      { feature: "Installation", easytool: "None - works in browser", acrobat: "Requires installation" },
                      { feature: "Merge PDFs", easytool: "✅ Yes", acrobat: "✅ Yes" },
                      { feature: "Watermarks", easytool: "❌ No watermarks", acrobat: "❌ No watermarks (paid)" },
                      { feature: "File Limits", easytool: "❌ No limits", acrobat: "✅ Some limits" },
                      { feature: "Privacy", easytool: "✅ Local processing only", acrobat: "✅ Cloud processing" }
                    ].map(row => (
                      <tr key={row.feature} className="border-b border-border">
                        <td className="p-4 font-medium">{row.feature}</td>
                        <td className="p-4 text-orange-500 font-semibold">{row.easytool}</td>
                        <td className="p-4 text-muted-foreground">{row.acrobat}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="p-8 md:p-10 rounded-2xl bg-orange-500/8 border border-orange-500/20 space-y-6">
              <div className="flex items-center gap-4">
                <Shield className="h-8 w-8 text-orange-500" />
                <h2 className="text-2xl font-black">
                  Your Privacy is Protected
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                When you <strong>merge PDF without Acrobat</strong> with EasyTool, your files are processed entirely in your browser using JavaScript. There are no server uploads, no databases, no storage of any kind. Your documents stay completely private and secure - even more private than using Acrobat!
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-black">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {[
                  { q: "Can I merge PDF without Acrobat?", a: "Yes! EasyTool lets you merge PDF without Acrobat. No Adobe software required - everything works in your browser for free." },
                  { q: "How to merge PDF files without Adobe Acrobat?", a: "To merge PDF without Acrobat, simply go to EasyTool, upload your PDF files, arrange them in order, and click Merge. Your combined PDF will download instantly." },
                  { q: "Is there a free alternative to Acrobat for merging PDFs?", a: "Yes! EasyTool is a completely free alternative to Acrobat for merging PDFs. No subscription, no fees, no limits, no watermarks." },
                  { q: "Do I need to install anything to merge PDF without Acrobat?", a: "No installation needed! To merge PDF without Acrobat, just open EasyTool in your browser. No software, no plugins, no downloads required." },
                  { q: "Is it safe to merge PDF without Acrobat here?", a: "100% safe! All processing happens in your browser. Your files are never uploaded to any server when you merge PDF without Acrobat with EasyTool." }
                ].map((item, i) => (
                  <div key={i} className="p-6 rounded-xl border border-border bg-card">
                    <p className="font-black text-lg mb-3 flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                      {item.q}
                    </p>
                    <p className="text-muted-foreground leading-relaxed pl-8">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          <div className="space-y-6 lg:sticky lg:top-8 self-start">
            <div className="rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 p-8 text-white space-y-6 shadow-2xl">
              <FileText className="h-10 w-10 text-white/90" />
              <div>
                <p className="font-black text-2xl leading-tight">Ready to Merge PDF Without Acrobat?</p>
                <p className="text-white/80 text-sm mt-2 leading-relaxed">
                  Combine PDF without Acrobat right now. No Adobe, no installation, completely free!
                </p>
              </div>
              <Link href="/tools/merge-pdf">
                <Button className="w-full bg-white text-orange-600 hover:bg-white/95 font-black h-12 rounded-xl text-lg">
                  Merge PDF Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
              <p className="font-black text-lg">No Adobe Needed</p>
              <div className="grid grid-cols-1 gap-3">
                {[
                  "✅ No Acrobat",
                  "✅ No subscription",
                  "✅ No installation",
                  "✅ Works in any browser"
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
                    <span className="text-sm font-semibold group-hover:text-orange-500 transition-colors">{item.label}</span>
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
