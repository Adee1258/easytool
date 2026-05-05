import { Metadata } from "next"
import Link from "next/link"
import { FileText, ChevronRight, CheckCircle2, ArrowRight, Shield, Zap, FileType } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "PDF to Word — Convert PDF to Word Online Free | EasyTool",
  description: "Convert PDF to Word free online. Best PDF to Word converter. Turn PDF into editable Word documents. 100% free, no signup, secure.",
  keywords: [
    "pdf to word",
    "convert pdf to word",
    "pdf to word converter",
    "pdf to word free",
    "convert pdf to word online",
    "pdf to doc",
    "pdf to word document",
    "free pdf to word converter",
    "pdf to editable word",
    "change pdf to word"
  ],
  alternates: { canonical: "https://easytool.live/pdf-to-word" },
  openGraph: {
    title: "PDF to Word — Convert PDF to Word Online Free",
    description: "Best PDF to Word converter to turn PDF into editable Word documents.",
    url: "https://easytool.live/pdf-to-word",
    siteName: "EasyTool",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF to Word — Convert PDF to Word Online Free",
    description: "Best PDF to Word converter to turn PDF into editable Word documents.",
  },
}

export default function PdfToWordSeoPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-cyan-500/10 to-transparent border-b border-cyan-500/15">
        <div className="container py-12 md:py-20">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">PDF to Word</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/25 font-black text-sm">
                  📄 PDF to Word
                </Badge>
                <Badge variant="outline" className="font-semibold text-sm">Editable</Badge>
                <Badge variant="outline" className="font-semibold text-sm">100% Free</Badge>
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                PDF to Word
                <span className="block text-cyan-600 mt-2">Convert PDF to Editable Word</span>
              </h1>

              <p className="text-muted-foreground text-xl leading-relaxed">
                The best <strong>PDF to Word converter</strong> online. <strong>Convert PDF to Word</strong> free. Turn PDF into editable Word documents. Perfect for editing and modifying your PDFs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/tools/pdf-to-word">
                  <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 font-black rounded-xl h-14 px-10 shadow-xl shadow-cyan-500/25 w-full sm:w-auto text-lg">
                    <FileType className="mr-3 h-6 w-6" />
                    Convert PDF to Word Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
