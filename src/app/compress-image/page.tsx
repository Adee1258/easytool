import { Metadata } from "next"
import Link from "next/link"
import { FileImage, ChevronRight, CheckCircle2, ArrowRight, Shield, Zap, Minimize, Maximize } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Compress Image — Reduce Image Size Online Free | EasyTool",
  description: "Compress image size online free. Best image compressor to reduce JPG, PNG, WebP file size. Compress images without losing quality. 100% free, no signup.",
  keywords: [
    "compress image",
    "image compressor",
    "reduce image size",
    "compress jpg",
    "compress png",
    "image size reducer",
    "compress image online",
    "free image compressor",
    "compress image without losing quality",
    "reduce photo size"
  ],
  alternates: { canonical: "https://easytool.live/compress-image" },
  openGraph: {
    title: "Compress Image — Reduce Image Size Online Free",
    description: "Best image compressor to reduce JPG, PNG, WebP file size without losing quality.",
    url: "https://easytool.live/compress-image",
    siteName: "EasyTool",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compress Image — Reduce Image Size Online Free",
    description: "Best image compressor to reduce JPG, PNG, WebP file size without losing quality.",
  },
}

export default function CompressImageSeoPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-red-500/10 to-transparent border-b border-red-500/15">
        <div className="container py-12 md:py-20">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">Compress Image</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/25 font-black text-sm">
                  📦 Compress Image
                </Badge>
                <Badge variant="outline" className="font-semibold text-sm">No Quality Loss</Badge>
                <Badge variant="outline" className="font-semibold text-sm">100% Free</Badge>
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                Compress Image
                <span className="block text-red-600 mt-2">Reduce Size Without Losing Quality</span>
              </h1>

              <p className="text-muted-foreground text-xl leading-relaxed">
                The best <strong>image compressor</strong> online. <strong>Compress image</strong> size free. Reduce JPG, PNG, WebP file size without losing quality. Perfect for websites, emails, and social media.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/tools/image-compressor">
                  <Button size="lg" className="bg-red-500 hover:bg-red-600 font-black rounded-xl h-14 px-10 shadow-xl shadow-red-500/25 w-full sm:w-auto text-lg">
                    <Minimize className="mr-3 h-6 w-6" />
                    Compress Image Now
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
