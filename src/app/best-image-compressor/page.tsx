import { Metadata } from "next"
import Link from "next/link"
import { FileImage, ChevronRight, CheckCircle2, ArrowRight, Shield, Zap, Minimize, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Best Image Compressor — Top Rated Image Compression Tool | EasyTool",
  description: "Best Image Compressor online. Top rated image compression tool. Compress images without losing quality. Free, fast, and easy to use. The best image compressor 2025.",
  keywords: [
    "best image compressor",
    "top image compressor",
    "best photo compressor",
    "best free image compressor",
    "best online image compressor",
    "top rated image compressor",
    "best image compression tool",
    "best way to compress images",
    "best image compressor 2025",
    "number one image compressor"
  ],
  alternates: { canonical: "https://easytool.live/best-image-compressor" },
  openGraph: {
    title: "Best Image Compressor — Top Rated Image Compression Tool",
    description: "Top rated image compression tool. Compress images without losing quality.",
    url: "https://easytool.live/best-image-compressor",
    siteName: "EasyTool",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Image Compressor — Top Rated Image Compression Tool",
    description: "Top rated image compression tool. Compress images without losing quality.",
  },
}

export default function BestImageCompressorSeoPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-yellow-500/10 to-transparent border-b border-yellow-500/15">
        <div className="container py-12 md:py-20">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">Best Image Compressor</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-yellow-500/15 text-yellow-600 dark:text-yellow-400 border-yellow-500/25 font-black text-sm">
                  🏆 Best Image Compressor
                </Badge>
                <Badge variant="outline" className="font-semibold text-sm">Top Rated</Badge>
                <Badge variant="outline" className="font-semibold text-sm">No Quality Loss</Badge>
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                Best Image Compressor
                <span className="block text-yellow-600 mt-2">Top Rated Image Compression</span>
              </h1>

              <p className="text-muted-foreground text-xl leading-relaxed">
                The <strong>Best Image Compressor</strong> online. Top rated <strong>image compression tool</strong>. Compress images without losing quality. Free, fast, and easy to use!
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/tools/image-compressor">
                  <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 font-black rounded-xl h-14 px-10 shadow-xl shadow-yellow-500/25 w-full sm:w-auto text-lg">
                    <Trophy className="mr-3 h-6 w-6" />
                    Use Best Image Compressor Now
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
