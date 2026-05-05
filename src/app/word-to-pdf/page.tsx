import { Metadata } from "next"
import Link from "next/link"
import { FileText, ChevronRight, CheckCircle2, ArrowRight, Shield, Zap, FileText as FileTextIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Word to PDF — Convert Word to PDF Online Free | EasyTool",
  description: "Convert Word to PDF free online. Best Word to PDF converter. Turn DOC, DOCX into professional PDF documents. 100% free, no signup.",
  keywords: [
    "word to pdf",
    "convert word to pdf",
    "word to pdf converter",
    "word to pdf free",
    "convert word to pdf online",
    "doc to pdf",
    "docx to pdf",
    "free word to pdf converter",
    "word document to pdf",
    "change word to pdf"
  ],
  alternates: { canonical: "https://easytool.live/word-to-pdf" },
  openGraph: {
    title: "Word to PDF — Convert Word to PDF Online Free",
    description: "Best Word to PDF converter to turn DOC, DOCX into professional PDF documents.",
    url: "https://easytool.live/word-to-pdf",
    siteName: "EasyTool",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Word to PDF — Convert Word to PDF Online Free",
    description: "Best Word to PDF converter to turn DOC, DOCX into professional PDF documents.",
  },
}

export default function WordToPdfSeoPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-violet-500/10 to-transparent border-b border-violet-500/15">
        <div className="container py-12 md:py-20">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">Word to PDF</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-500/25 font-black text-sm">
                  📝 Word to PDF
                </Badge>
                <Badge variant="outline" className="font-semibold text-sm">Professional</Badge>
                <Badge variant="outline" className="font-semibold text-sm">100% Free</Badge>
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                Word to PDF
                <span className="block text-violet-600 mt-2">Convert Word to Professional PDF</span>
              </h1>

              <p className="text-muted-foreground text-xl leading-relaxed">
                The best <strong>Word to PDF converter</strong> online. <strong>Convert Word to PDF</strong> free. Turn DOC, DOCX into professional PDF documents. Perfect for sharing and printing.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/tools/word-to-pdf">
                  <Button size="lg" className="bg-violet-500 hover:bg-violet-600 font-black rounded-xl h-14 px-10 shadow-xl shadow-violet-500/25 w-full sm:w-auto text-lg">
                    <FileTextIcon className="mr-3 h-6 w-6" />
                    Convert Word to PDF Now
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
