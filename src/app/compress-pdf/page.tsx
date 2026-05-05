import { Metadata } from "next"
import Link from "next/link"
import { FileText, ChevronRight, CheckCircle2, ArrowRight, Shield, Zap, FileDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Compress PDF — Reduce PDF Size Online Free | EasyTool",
  description: "Compress PDF size online free. Best PDF compressor to reduce PDF file size without losing quality. Compress PDFs for email and web. 100% free.",
  keywords: [
    "compress pdf",
    "pdf compressor",
    "reduce pdf size",
    "compress pdf online",
    "pdf size reducer",
    "compress pdf free",
    "free pdf compressor",
    "compress pdf without losing quality",
    "reduce pdf file size",
    "shrink pdf"
  ],
  alternates: { canonical: "https://easytool.live/compress-pdf" },
  openGraph: {
    title: "Compress PDF — Reduce PDF Size Online Free",
    description: "Best PDF compressor to reduce PDF file size without losing quality.",
    url: "https://easytool.live/compress-pdf",
    siteName: "EasyTool",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compress PDF — Reduce PDF Size Online Free",
    description: "Best PDF compressor to reduce PDF file size without losing quality.",
  },
}

export default function CompressPdfSeoPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-rose-500/10 to-transparent border-b border-rose-500/15">
        <div className="container py-12 md:py-20">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">Compress PDF</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/25 font-black text-sm">
                  📦 Compress PDF
                </Badge>
                <Badge variant="outline" className="font-semibold text-sm">No Quality Loss</Badge>
                <Badge variant="outline" className="font-semibold text-sm">100% Free</Badge>
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                Compress PDF
                <span className="block text-rose-600 mt-2">Reduce Size Without Losing Quality</span>
              </h1>

              <p className="text-muted-foreground text-xl leading-relaxed">
                The best <strong>PDF compressor</strong> online. <strong>Compress PDF</strong> size free. Reduce PDF file size without losing quality. Perfect for emails, websites, and sharing.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/tools/compress-pdf">
                  <Button size="lg" className="bg-rose-500 hover:bg-rose-600 font-black rounded-xl h-14 px-10 shadow-xl shadow-rose-500/25 w-full sm:w-auto text-lg">
                    <FileDown className="mr-3 h-6 w-6" />
                    Compress PDF Now
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
