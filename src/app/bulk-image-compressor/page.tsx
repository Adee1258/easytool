import { Metadata } from "next"
import Link from "next/link"
import { FileImage, ChevronRight, CheckCircle2, ArrowRight, Shield, Zap, Minimize, Archive } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Bulk Image Compressor — Compress Multiple Images at Once | EasyTool",
  description: "Bulk Image Compressor to compress multiple images at once. Batch image compression free. Compress 100+ images together and download as ZIP. 100% free.",
  keywords: [
    "bulk image compressor",
    "batch image compressor",
    "compress multiple images",
    "bulk image compression",
    "compress many images at once",
    "batch compress images",
    "multiple image compressor",
    "bulk photo compressor",
    "compress batch images",
    "mass image compressor"
  ],
  alternates: { canonical: "https://easytool.live/bulk-image-compressor" },
  openGraph: {
    title: "Bulk Image Compressor — Compress Multiple Images at Once",
    description: "Bulk Image Compressor to compress multiple images at once.",
    url: "https://easytool.live/bulk-image-compressor",
    siteName: "EasyTool",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bulk Image Compressor — Compress Multiple Images at Once",
    description: "Bulk Image Compressor to compress multiple images at once.",
  },
}

export default function BulkImageCompressorSeoPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-amber-500/10 to-transparent border-b border-amber-500/15">
        <div className="container py-12 md:py-20">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">Bulk Image Compressor</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/25 font-black text-sm">
                  📦 Bulk Image Compressor
                </Badge>
                <Badge variant="outline" className="font-semibold text-sm">Batch Processing</Badge>
                <Badge variant="outline" className="font-semibold text-sm">Download ZIP</Badge>
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                Bulk Image Compressor
                <span className="block text-amber-600 mt-2">Compress Multiple Images at Once</span>
              </h1>

              <p className="text-muted-foreground text-xl leading-relaxed">
                The best <strong>Bulk Image Compressor</strong>. <strong>Compress multiple images</strong> at once. Batch image compression free. Compress 100+ images together and download as ZIP!
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/tools/image-compressor">
                  <Button size="lg" className="bg-amber-500 hover:bg-amber-600 font-black rounded-xl h-14 px-10 shadow-xl shadow-amber-500/25 w-full sm:w-auto text-lg">
                    <Archive className="mr-3 h-6 w-6" />
                    Bulk Compress Images Now
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
