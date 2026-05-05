import { Metadata } from "next"
import Link from "next/link"
import { FileText, ChevronRight, CheckCircle2, ArrowRight, Shield, Zap, FilePlus, Layers, Download, ArrowUp, ArrowDown, Trash2, Upload, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Best PDF Merger — Top Rated Free PDF Combiner | EasyTool",
  description: "Best PDF merger free online. Top rated PDF combiner tool. Best free PDF merger to combine PDF files. 100% free, no signup, secure.",
  keywords: [
    "best pdf merger",
    "best pdf combiner",
    "best free pdf merger",
    "top pdf merger",
    "best online pdf merger",
    "best pdf merger free",
    "top rated pdf merger",
    "best pdf file merger",
    "best pdf merger online",
    "best free pdf combiner"
  ],
  alternates: { canonical: "https://easytool.live/best-pdf-merger" },
  openGraph: {
    title: "Best PDF Merger — Top Rated Free PDF Combiner",
    description: "Best PDF merger free online. Top rated PDF combiner tool to combine PDF files.",
    url: "https://easytool.live/best-pdf-merger",
    siteName: "EasyTool",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best PDF Merger — Top Rated Free PDF Combiner",
    description: "Best PDF merger free online. Top rated PDF combiner tool to combine PDF files.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Best PDF Merger - Top Rated Free PDF Combiner",
  "description": "Best PDF merger free online. Top rated PDF combiner tool. Best free PDF merger to combine PDF files.",
  "url": "https://easytool.live/best-pdf-merger",
  "mainEntity": {
    "@type": "SoftwareApplication",
    "name": "Best PDF Merger",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "10000"
    }
  },
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "What is the best PDF merger?", "acceptedAnswer": { "@type": "Answer", "text": "EasyTool is the best PDF merger available. It's 100% free, has no limits, no watermarks, processes files locally for privacy, and works on any device." } },
    { "@type": "Question", "name": "Which is the best free PDF merger?", "acceptedAnswer": { "@type": "Answer", "text": "EasyTool is the best free PDF merger. No subscription fees, no hidden costs, no limits on file size or number of files, and no watermarks on your merged documents." } },
    { "@type": "Question", "name": "What makes EasyTool the best PDF combiner?", "acceptedAnswer": { "@type": "Answer", "text": "EasyTool is the best PDF combiner because it's fast, secure, private, and completely free. All processing happens in your browser - your files are never uploaded to any server." } },
    { "@type": "Question", "name": "Is the best PDF merger really free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! EasyTool, the best PDF merger, is 100% free. No ads, no watermarks, no limits, no signup required. It's free forever for everyone." } },
    { "@type": "Question", "name": "Why is EasyTool the top rated PDF merger?", "acceptedAnswer": { "@type": "Answer", "text": "EasyTool is the top rated PDF merger because of its simplicity, speed, privacy, and complete lack of costs. Users love that it just works without any hassle." } },
  ],
}

function MergePdfMockup() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2rem] p-2 shadow-2xl shadow-black/30">
        <div className="bg-white rounded-[1.75rem] overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 pt-3 pb-2 flex items-center justify-between">
            <span className="text-white text-sm font-bold">9:41</span>
            <div className="flex gap-1 items-end h-3">
              <div className="w-0.5 h-1.5 bg-white/60 rounded-sm" />
              <div className="w-0.5 h-2 bg-white/80 rounded-sm" />
              <div className="w-0.5 h-3 bg-white rounded-sm" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-4">
            <div className="flex items-center gap-3">
              <Trophy className="w-6 h-6 text-white" />
              <div>
                <p className="text-white text-lg font-black">Best PDF Merger</p>
                <p className="text-white/80 text-xs">Top Rated • 4.9★</p>
              </div>
            </div>
          </div>

          <div className="p-5 bg-gray-50 space-y-3">
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Top Rated</p>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">★★★★★</span>
                  <span className="text-xs font-bold text-gray-700">4.9</span>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { label: "100% Free", icon: "✅" },
                  { label: "No Watermarks", icon: "✅" },
                  { label: "Private & Secure", icon: "✅" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50">
                    <span>{item.icon}</span>
                    <span className="text-xs font-semibold text-emerald-700">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl p-4 text-white text-center shadow-lg">
              <p className="text-lg font-black">Use Best PDF Merger</p>
              <p className="text-xs text-white/80 mt-1">Free • Fast • Secure</p>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-center">
              <p className="text-sm font-black text-emerald-700">🏆 Voted Best PDF Merger</p>
              <p className="text-[11px] text-emerald-600 mt-1">Trusted by thousands</p>
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

export default function BestPdfMergerSeoPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="bg-gradient-to-b from-emerald-500/10 to-transparent border-b border-emerald-500/15">
        <div className="container py-12 md:py-20">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">Best PDF Merger</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/25 font-black text-sm">
                  🏆 Best PDF Merger
                </Badge>
                <Badge variant="outline" className="font-semibold text-sm">4.9★ Rated</Badge>
                <Badge variant="outline" className="font-semibold text-sm">100% Free</Badge>
                <Badge variant="outline" className="font-semibold text-sm">No Signup</Badge>
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                Best PDF Merger
                <span className="block text-emerald-600 mt-2">Top Rated Free PDF Combiner</span>
              </h1>

              <p className="text-muted-foreground text-xl leading-relaxed">
                Looking for the <strong>best PDF merger</strong>? You've found it! EasyTool is the <strong>best free PDF merger</strong> available - fast, secure, private, and completely free. Voted the <strong>best PDF combiner</strong> by thousands of happy users!
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/tools/merge-pdf">
                  <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 font-black rounded-xl h-14 px-10 shadow-xl shadow-emerald-500/25 w-full sm:w-auto text-lg">
                    <Trophy className="mr-3 h-6 w-6" />
                    Use Best PDF Merger Now
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                {[
                  { icon: Shield, text: "100% Private" },
                  { icon: Zap, text: "Lightning Fast" },
                  { icon: Trophy, text: "Top Rated" },
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-2">
                    <item.icon className="h-5 w-5 text-emerald-500" />
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
                Why EasyTool is the Best PDF Merger
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                With so many options available, what makes EasyTool the <strong>best PDF merger</strong>? It's simple: we focus on what matters most to users - speed, privacy, and cost. Here's why thousands of people vote us the <strong>best free PDF merger</strong> year after year.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                {[
                  { icon: "🆓", title: "100% Free Forever", desc: "No subscriptions, no trial periods, no hidden fees. The best PDF merger that's actually free." },
                  { icon: "🚫", title: "No Watermarks", desc: "Your merged PDFs come out clean with no branding. The best PDF combiner that respects your work." },
                  { icon: "🔒", title: "Complete Privacy", desc: "All processing happens in your browser. Your files are never uploaded - the most secure PDF merger." },
                  { icon: "⚡", title: "Lightning Fast", desc: "No waiting, no queues. Merge PDFs in seconds with the fastest PDF merger available." }
                ].map(item => (
                  <div key={item.title} className="p-6 rounded-2xl bg-card border border-border space-y-3">
                    <span className="text-4xl">{item.icon}</span>
                    <p className="font-black text-lg">{item.title}</p>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-black">
                Best PDF Merger: Feature Comparison
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 font-black">Feature</th>
                      <th className="text-left p-4 font-black text-emerald-500">EasyTool (Best)</th>
                      <th className="text-left p-4 font-black text-muted-foreground">Others</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { feature: "Cost", easytool: "100% Free", others: "$$$ Paid / Limited Free" },
                      { feature: "Watermarks", easytool: "❌ No Watermarks", others: "✅ Watermarks on Free" },
                      { feature: "File Limits", easytool: "❌ No Limits", others: "✅ File Size/Count Limits" },
                      { feature: "Privacy", easytool: "✅ Local Processing", others: "⚠️ Upload to Servers" },
                      { feature: "Signup Required", easytool: "❌ No Signup", others: "✅ Account Required" },
                      { feature: "Speed", easytool: "⚡ Instant", others: "🐢 Slow Queues" }
                    ].map(row => (
                      <tr key={row.feature} className="border-b border-border">
                        <td className="p-4 font-medium">{row.feature}</td>
                        <td className="p-4 text-emerald-500 font-semibold">{row.easytool}</td>
                        <td className="p-4 text-muted-foreground">{row.others}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-black">
                How to Use the Best PDF Merger
              </h2>
              <div className="space-y-5">
                {[
                  { step: "1", title: "Open EasyTool", desc: "Simply open EasyTool in your browser. No downloads, no installation, no signup required. Just the best PDF merger, ready to use!" },
                  { step: "2", title: "Upload Your Files", desc: "Click Browse Files or drag and drop your PDFs, images, and text files. Our best PDF combiner accepts multiple formats and converts them automatically!" },
                  { step: "3", title: "Arrange and Merge", desc: "Drag files to reorder them perfectly. Click Merge & Download PDF. That's it - you've just used the best free PDF merger!" }
                ].map(s => (
                  <div key={s.step} className="flex gap-5 p-6 rounded-2xl border border-border bg-card">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-black text-xl flex-shrink-0">
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
                <Button className="bg-emerald-500 hover:bg-emerald-600 font-black rounded-xl h-12 px-10 shadow-lg shadow-emerald-500/20 text-lg mt-4">
                  Try Best PDF Merger <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </section>

            <section className="p-8 md:p-10 rounded-2xl bg-emerald-500/8 border border-emerald-500/20 space-y-6">
              <div className="flex items-center gap-4">
                <Shield className="h-8 w-8 text-emerald-500" />
                <h2 className="text-2xl font-black">
                  Privacy First: The Best PDF Merger
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                What really makes EasyTool the <strong>best PDF merger</strong> is our commitment to privacy. All processing happens entirely in your browser using JavaScript. There are no server uploads, no databases, no storage of any kind. Your documents stay completely private and secure - something you won't find with other tools that call themselves the \"best PDF combiner\".
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-black">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {[
                  { q: "What is the best PDF merger?", a: "EasyTool is the best PDF merger available. It's 100% free, has no limits, no watermarks, processes files locally for privacy, and works on any device." },
                  { q: "Which is the best free PDF merger?", a: "EasyTool is the best free PDF merger. No subscription fees, no hidden costs, no limits on file size or number of files, and no watermarks on your merged documents." },
                  { q: "What makes EasyTool the best PDF combiner?", a: "EasyTool is the best PDF combiner because it's fast, secure, private, and completely free. All processing happens in your browser - your files are never uploaded to any server." },
                  { q: "Is the best PDF merger really free?", a: "Yes! EasyTool, the best PDF merger, is 100% free. No ads, no watermarks, no limits, no signup required. It's free forever for everyone." },
                  { q: "Why is EasyTool the top rated PDF merger?", a: "EasyTool is the top rated PDF merger because of its simplicity, speed, privacy, and complete lack of costs. Users love that it just works without any hassle." }
                ].map((item, i) => (
                  <div key={i} className="p-6 rounded-xl border border-border bg-card">
                    <p className="font-black text-lg mb-3 flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      {item.q}
                    </p>
                    <p className="text-muted-foreground leading-relaxed pl-8">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          <div className="space-y-6 lg:sticky lg:top-8 self-start">
            <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 p-8 text-white space-y-6 shadow-2xl">
              <Trophy className="h-10 w-10 text-white/90" />
              <div>
                <p className="font-black text-2xl leading-tight">Ready to Use the Best PDF Merger?</p>
                <p className="text-white/80 text-sm mt-2 leading-relaxed">
                  Try the best free PDF merger now. No signup, no cost!
                </p>
              </div>
              <Link href="/tools/merge-pdf">
                <Button className="w-full bg-white text-emerald-600 hover:bg-white/95 font-black h-12 rounded-xl text-lg">
                  Merge PDF Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
              <p className="font-black text-lg">Why We're the Best</p>
              <div className="grid grid-cols-1 gap-3">
                {[
                  "✅ 100% Free Forever",
                  "✅ No Watermarks",
                  "✅ Local Processing",
                  "✅ No Signup Required"
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
                    <span className="text-sm font-semibold group-hover:text-emerald-500 transition-colors">{item.label}</span>
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