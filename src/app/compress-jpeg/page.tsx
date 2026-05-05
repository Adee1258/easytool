import { Metadata } from "next"
import Link from "next/link"
import { FileImage, ChevronRight, CheckCircle2, ArrowRight, Shield, Zap, Minimize } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Compress JPEG — Reduce JPEG File Size Online Free | EasyTool",
  description: "Compress JPEG file size online free. Best JPEG compressor to reduce JPEG size without losing quality. Compress JPEG images for web and email. 100% free.",
  keywords: [
    "compress jpeg",
    "jpeg compressor",
    "reduce jpeg size",
    "compress jpeg online",
    "jpeg size reducer",
    "compress jpeg free",
    "free jpeg compressor",
    "compress jpeg without losing quality",
    "reduce jpeg file size",
    "shrink jpeg"
  ],
  alternates: { canonical: "https://easytool.live/compress-jpeg" },
  openGraph: {
    title: "Compress JPEG — Reduce JPEG File Size Online Free",
    description: "Best JPEG compressor to reduce JPEG size without losing quality.",
    url: "https://easytool.live/compress-jpeg",
    siteName: "EasyTool",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compress JPEG — Reduce JPEG File Size Online Free",
    description: "Best JPEG compressor to reduce JPEG size without losing quality.",
  },
}

export default function CompressJpegSeoPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-orange-500/10 to-transparent border-b border-orange-500/15">
        <div className="container py-12 md:py-20">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">Compress JPEG</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-500/25 font-black text-sm">
                  🖼️ Compress JPEG
                </Badge>
                <Badge variant="outline" className="font-semibold text-sm">No Quality Loss</Badge>
                <Badge variant="outline" className="font-semibold text-sm">100% Free</Badge>
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                Compress JPEG
                <span className="block text-orange-600 mt-2">Reduce JPEG File Size Free</span>
              </h1>

              <p className="text-muted-foreground text-xl leading-relaxed">
                The best <strong>JPEG compressor</strong> online. <strong>Compress JPEG</strong> file size free. Reduce JPEG size without losing quality. Perfect for web, email, and social media!
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/tools/image-compressor">
                  <Button size="lg" className="bg-orange-500 hover:bg-orange-600 font-black rounded-xl h-14 px-10 shadow-xl shadow-orange-500/25 w-full sm:w-auto text-lg">
                    <Minimize className="mr-3 h-6 w-6" />
                    Compress JPEG Now
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
