import { Metadata } from "next"
import Link from "next/link"
import { FileImage, ChevronRight, CheckCircle2, ArrowRight, Shield, Zap, Minimize } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Compress JPG — Reduce JPG File Size Online Free | EasyTool",
  description: "Compress JPG file size online free. Best JPG compressor to reduce JPG size without losing quality. Compress JPG images for web and email. 100% free.",
  keywords: [
    "compress jpg",
    "jpg compressor",
    "reduce jpg size",
    "compress jpg online",
    "jpg size reducer",
    "compress jpg free",
    "free jpg compressor",
    "compress jpg without losing quality",
    "reduce jpg file size",
    "shrink jpg"
  ],
  alternates: { canonical: "https://easytool.live/compress-jpg" },
  openGraph: {
    title: "Compress JPG — Reduce JPG File Size Online Free",
    description: "Best JPG compressor to reduce JPG size without losing quality.",
    url: "https://easytool.live/compress-jpg",
    siteName: "EasyTool",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compress JPG — Reduce JPG File Size Online Free",
    description: "Best JPG compressor to reduce JPG size without losing quality.",
  },
}

export default function CompressJpgSeoPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-rose-500/10 to-transparent border-b border-rose-500/15">
        <div className="container py-12 md:py-20">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">Compress JPG</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/25 font-black text-sm">
                  🖼️ Compress JPG
                </Badge>
                <Badge variant="outline" className="font-semibold text-sm">No Quality Loss</Badge>
                <Badge variant="outline" className="font-semibold text-sm">100% Free</Badge>
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                Compress JPG
                <span className="block text-rose-600 mt-2">Reduce JPG File Size Free</span>
              </h1>

              <p className="text-muted-foreground text-xl leading-relaxed">
                The best <strong>JPG compressor</strong> online. <strong>Compress JPG</strong> file size free. Reduce JPG size without losing quality. Perfect for web, email, and social media!
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/tools/image-compressor">
                  <Button size="lg" className="bg-rose-500 hover:bg-rose-600 font-black rounded-xl h-14 px-10 shadow-xl shadow-rose-500/25 w-full sm:w-auto text-lg">
                    <Minimize className="mr-3 h-6 w-6" />
                    Compress JPG Now
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
