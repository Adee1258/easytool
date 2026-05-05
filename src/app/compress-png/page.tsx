import { Metadata } from "next"
import Link from "next/link"
import { FileImage, ChevronRight, CheckCircle2, ArrowRight, Shield, Zap, Minimize } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Compress PNG — Reduce PNG File Size Online Free | EasyTool",
  description: "Compress PNG file size online free. Best PNG compressor to reduce PNG size without losing quality. Compress PNG images for web and email. 100% free.",
  keywords: [
    "compress png",
    "png compressor",
    "reduce png size",
    "compress png online",
    "png size reducer",
    "compress png free",
    "free png compressor",
    "compress png without losing quality",
    "reduce png file size",
    "shrink png"
  ],
  alternates: { canonical: "https://easytool.live/compress-png" },
  openGraph: {
    title: "Compress PNG — Reduce PNG File Size Online Free",
    description: "Best PNG compressor to reduce PNG size without losing quality.",
    url: "https://easytool.live/compress-png",
    siteName: "EasyTool",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compress PNG — Reduce PNG File Size Online Free",
    description: "Best PNG compressor to reduce PNG size without losing quality.",
  },
}

export default function CompressPngSeoPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-cyan-500/10 to-transparent border-b border-cyan-500/15">
        <div className="container py-12 md:py-20">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">Compress PNG</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/25 font-black text-sm">
                  🖼️ Compress PNG
                </Badge>
                <Badge variant="outline" className="font-semibold text-sm">No Quality Loss</Badge>
                <Badge variant="outline" className="font-semibold text-sm">100% Free</Badge>
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                Compress PNG
                <span className="block text-cyan-600 mt-2">Reduce PNG File Size Free</span>
              </h1>

              <p className="text-muted-foreground text-xl leading-relaxed">
                The best <strong>PNG compressor</strong> online. <strong>Compress PNG</strong> file size free. Reduce PNG size without losing quality. Perfect for web, email, and social media!
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/tools/image-compressor">
                  <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 font-black rounded-xl h-14 px-10 shadow-xl shadow-cyan-500/25 w-full sm:w-auto text-lg">
                    <Minimize className="mr-3 h-6 w-6" />
                    Compress PNG Now
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
