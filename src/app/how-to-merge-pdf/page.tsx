import { Metadata } from "next"
import Link from "next/link"
import { FileText, ChevronRight, CheckCircle2, ArrowRight, Shield, Zap, FilePlus, Layers, Download, ArrowUp, ArrowDown, Trash2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "How to Merge PDF — Step by Step Guide | EasyTool",
  description: "Learn how to merge PDF files easily with our step-by-step guide. How to combine PDFs online for free. Complete tutorial on merging PDF documents.",
  keywords: [
    "how to merge pdf",
    "how to combine pdf",
    "how to merge pdf files",
    "how to combine pdf files",
    "how to merge two pdf files",
    "merge pdf step by step",
    "how to merge pdf online",
    "tutorial merge pdf",
    "guide to merge pdf",
    "how do i merge pdf files"
  ],
  alternates: { canonical: "https://easytool.live/how-to-merge-pdf" },
  openGraph: {
    title: "How to Merge PDF — Step by Step Guide",
    description: "Complete guide on how to merge PDF files. Step-by-step tutorial with screenshots.",
    url: "https://easytool.live/how-to-merge-pdf",
    siteName: "EasyTool",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Merge PDF — Step by Step Guide",
    description: "Complete guide on how to merge PDF files. Step-by-step tutorial with screenshots.",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Merge PDF Files",
  "description": "Step-by-step guide on how to merge PDF files online for free.",
  "url": "https://easytool.live/how-to-merge-pdf",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Upload your files",
      "text": "Click Browse Files or drag and drop your PDFs, images, and text files onto the upload area."
    },
    {
      "@type": "HowToStep",
      "name": "Arrange the order",
      "text": "Drag files to change their sequence. The first file you upload appears first in the merged document."
    },
    {
      "@type": "HowToStep",
      "name": "Download merged PDF",
      "text": "Click Merge & Download PDF. Your combined document will download automatically in seconds."
    }
  ]
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How do I merge PDF files?", "acceptedAnswer": { "@type": "Answer", "text": "To merge PDF files, go to EasyTool, upload your PDF documents, arrange them in order, and click Merge. Your merged PDF will download instantly." } },
    { "@type": "Question", "name": "How to merge PDF files on mobile?", "acceptedAnswer": { "@type": "Answer", "text": "You can merge PDF files on any mobile device (iPhone, Android) using EasyTool. Just open our website in your browser and follow the same steps." } },
    { "@type": "Question", "name": "How to combine PDF files for free?", "acceptedAnswer": { "@type": "Answer", "text": "EasyTool's merge PDF tool is 100% free. No subscription, no limits, no watermarks. Just upload and merge your PDF files." } },
    { "@type": "Question", "name": "How to merge two PDF files?", "acceptedAnswer": { "@type": "Answer", "text": "Upload both PDF files to EasyTool, make sure they're in the correct order, then click Merge. Your two PDFs will be combined into one document." } },
    { "@type": "Question", "name": "How to merge PDF files with images?", "acceptedAnswer": { "@type": "Answer", "text": "EasyTool allows you to merge PDF files with images. Simply upload your PDFs and images together, arrange them, and merge. Images are automatically converted to PDF pages." } },
  ],
}

function MergePdfMockup() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2rem] p-2 shadow-2xl shadow-black/30">
        <div className="bg-white rounded-[1.75rem] overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 pt-3 pb-2 flex items-center justify-between">
            <span className="text-white text-sm font-bold">9:41</span>
            <div className="flex gap-1 items-end h-3">
              <div className="w-0.5 h-1.5 bg-white/60 rounded-sm" />
              <div className="w-0.5 h-2 bg-white/80 rounded-sm" />
              <div className="w-0.5 h-3 bg-white rounded-sm" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-white" />
              <div>
                <p className="text-white text-lg font-black">How to Merge PDF</p>
                <p className="text-white/80 text-xs">Step-by-Step Guide</p>
              </div>
            </div>
          </div>
          
          <div className="p-5 bg-gray-50 space-y-3">
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Step 1: Upload Files</p>
              <div className="border-2 border-dashed border-blue-200 rounded-lg p-4 text-center bg-blue-50">
                <Upload className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <p className="text-xs font-semibold text-blue-600">Click to upload or drag & drop</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white text-center shadow-lg">
              <p className="text-lg font-black">Follow Our Guide</p>
              <p className="text-xs text-white/80 mt-1">3 simple steps to merge PDFs</p>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center">
              <p className="text-sm font-black text-blue-700">✅ Start Merging Now</p>
              <p className="text-[11px] text-blue-600 mt-1">Click the button below</p>
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

export default function HowToMergePdfSeoPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="bg-gradient-to-b from-blue-500/10 to-transparent border-b border-blue-500/15">
        <div className="container py-12 md:py-20">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">How to Merge PDF</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/25 font-black text-sm">
                  📖 Step-by-Step Guide
                </Badge>
                <Badge variant="outline" className="font-semibold text-sm">Free Tool</Badge>
                <Badge variant="outline" className="font-semibold text-sm">100% Private</Badge>
                <Badge variant="outline" className="font-semibold text-sm">No Signup</Badge>
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                How to Merge PDF
                <span className="block text-blue-600 mt-2">Complete Step-by-Step Guide</span>
              </h1>

              <p className="text-muted-foreground text-xl leading-relaxed">
                Learn <strong>how to merge PDF</strong> files easily with our comprehensive guide. This step-by-step tutorial shows you exactly <strong>how to combine PDF</strong> files online for free. No software installation needed!
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/tools/merge-pdf">
                  <Button size="lg" className="bg-blue-500 hover:bg-blue-600 font-black rounded-xl h-14 px-10 shadow-xl shadow-blue-500/25 w-full sm:w-auto text-lg">
                    <FilePlus className="mr-3 h-6 w-6" />
                    Start Merging PDFs Now
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                {[
                  { icon: Shield, text: "Files never uploaded" },
                  { icon: Zap, text: "Instant results" },
                  { icon: CheckCircle2, text: "No signup needed" },
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-2">
                    <item.icon className="h-5 w-5 text-blue-500" />
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
                Introduction: Why Merge PDF Files?
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                If you've ever wondered <strong>how to merge PDF</strong> files, you're not alone. Merging PDFs is a common task for students, professionals, and anyone who works with digital documents. It helps organize your files, reduce clutter, and make sharing easier.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                In this guide, we'll show you exactly <strong>how to combine PDF</strong> files using EasyTool - the simplest, fastest, and most secure way to merge PDFs online. Best of all, it's completely free!
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-black">
                How to Merge PDF: Step-by-Step Tutorial
              </h2>
              <div className="space-y-8">
                {[
                  { step: "1", title: "Step 1: Upload Your PDF Files", desc: "The first step in learning how to merge PDF files is uploading your documents. Go to EasyTool's merge PDF page and click \"Browse Files\" or simply drag and drop your PDF files onto the upload area. You can also upload images and text files - they'll be automatically converted to PDF pages!" },
                  { step: "2", title: "Step 2: Arrange the Files in Order", desc: "Once your files are uploaded, you can arrange them in your desired sequence. Simply drag and drop the files to reorder them. The file at the top will be the first page of your merged PDF, and the file at the bottom will be the last page. Take your time to get the order perfect!" },
                  { step: "3", title: "Step 3: Merge and Download Your PDF", desc: "When you're happy with the order, click the \"Merge & Download PDF\" button. EasyTool will process your files locally in your browser (no uploads to servers!) and your merged PDF will download automatically. That's it - you now know how to merge PDF files!" }
                ].map(s => (
                  <div key={s.step} className="p-8 rounded-2xl border border-border bg-card">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-xl bg-blue-500 flex items-center justify-center text-white font-black text-2xl flex-shrink-0">
                        {s.step}
                      </div>
                      <h3 className="text-2xl font-black">{s.title}</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-lg">{s.desc}</p>
                  </div>
                ))}
              </div>
              <Link href="/tools/merge-pdf">
                <Button className="bg-blue-500 hover:bg-blue-600 font-black rounded-xl h-12 px-10 shadow-lg shadow-blue-500/20 text-lg mt-4">
                  Try It Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-black">
                Tips for Merging PDF Files Successfully
              </h2>
              <ul className="space-y-4">
                {[
                  "Make sure your PDF files are not password protected before merging",
                  "Check the file order carefully before clicking merge",
                  "Preview images before merging to ensure they're in the right orientation",
                  "Large files may take a few seconds to process - be patient",
                  "Save your merged PDF in a location you can easily find later",
                  "You can merge multiple batches if you have many files"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground text-lg">
                    <CheckCircle2 className="h-6 w-6 text-blue-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="p-8 md:p-10 rounded-2xl bg-blue-500/8 border border-blue-500/20 space-y-6">
              <div className="flex items-center gap-4">
                <Shield className="h-8 w-8 text-blue-500" />
                <h2 className="text-2xl font-black">
                  Your Privacy is Important
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                When learning <strong>how to merge PDF</strong> files with EasyTool, you can rest assured that your privacy is protected. All processing happens entirely in your browser using JavaScript. There are no server uploads, no databases, no storage of any kind. Your documents stay completely private and secure.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-black">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {[
                  { q: "How do I merge PDF files?", a: "To merge PDF files, go to EasyTool, upload your PDF documents, arrange them in order, and click Merge. Your merged PDF will download instantly." },
                  { q: "How to merge PDF files on mobile?", a: "You can merge PDF files on any mobile device (iPhone, Android) using EasyTool. Just open our website in your browser and follow the same steps." },
                  { q: "How to combine PDF files for free?", a: "EasyTool's merge PDF tool is 100% free. No subscription, no limits, no watermarks. Just upload and merge your PDF files." },
                  { q: "How to merge two PDF files?", a: "Upload both PDF files to EasyTool, make sure they're in the correct order, then click Merge. Your two PDFs will be combined into one document." },
                  { q: "How to merge PDF files with images?", a: "EasyTool allows you to merge PDF files with images. Simply upload your PDFs and images together, arrange them, and merge. Images are automatically converted to PDF pages." }
                ].map((item, i) => (
                  <div key={i} className="p-6 rounded-xl border border-border bg-card">
                    <p className="font-black text-lg mb-3 flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      {item.q}
                    </p>
                    <p className="text-muted-foreground leading-relaxed pl-8">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          <div className="space-y-6 lg:sticky lg:top-8 self-start">
            <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-8 text-white space-y-6 shadow-2xl">
              <FileText className="h-10 w-10 text-white/90" />
              <div>
                <p className="font-black text-2xl leading-tight">Ready to Merge PDFs?</p>
                <p className="text-white/80 text-sm mt-2 leading-relaxed">
                  Now that you know how to merge PDF files, try it yourself!
                </p>
              </div>
              <Link href="/tools/merge-pdf">
                <Button className="w-full bg-white text-blue-600 hover:bg-white/95 font-black h-12 rounded-xl text-lg">
                  Merge PDF Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
              <p className="font-black text-lg">Quick Steps</p>
              <div className="space-y-3">
                {[
                  "1️⃣ Upload files",
                  "2️⃣ Arrange order",
                  "3️⃣ Download merged PDF"
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
                    <span className="text-sm font-semibold group-hover:text-blue-500 transition-colors">{item.label}</span>
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
