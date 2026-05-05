import { Metadata } from "next"
import Link from "next/link"
import { FileImage, ChevronRight, CheckCircle2, ArrowRight, Shield, Zap, Minimize } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Image Compressor Without Losing Quality — High Quality Compression | EasyTool",
  description: "Image Compressor without losing quality. Compress images with high quality. Reduce image size while keeping quality. Best for photos and important images.",
  keywords: [
    "image compressor without losing quality",
    "compress image without losing quality",
    "image compression without quality loss",
    "reduce image size without losing quality",
    "compress photos without losing quality",
    "image compressor high quality",
    "no quality loss image compressor",
    "compress images without quality loss",
    "image size reducer without losing quality",
    "best image compressor without losing quality"
  ],
  alternates: { canonical: "https://easytool.live/image-compressor-without-losing-quality" },
  openGraph: {
    title: "Image Compressor Without Losing Quality — High Quality Compression",
    description: "Compress images with high quality. Reduce image size while keeping quality.",
    url: "https://easytool.live/image-compressor-without-losing-quality",
    siteName: "EasyTool",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Compressor Without Losing Quality — High Quality Compression",
    description: "Compress images with high quality. Reduce image size while keeping quality.",
  },
}

export default function ImageCompressorWithoutLosingQualitySeoPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-rose-500/10 to-transparent border-b border-rose-500/15">
        <div className="container py-12 md:py-20">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">Image Compressor Without Losing Quality</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/25 font-black text-sm">
                  ✨ No Quality Loss
                </Badge>
                <Badge variant="outline" className="font-semibold text-sm">High Quality</Badge>
                <Badge variant="outline" className="font-semibold text-sm">Preserve Details</Badge>
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                Image Compressor Without Losing Quality
                <span className="block text-rose-600 mt-2">High Quality Compression</span>
              </h1>

              <p className="text-muted-foreground text-xl leading-relaxed">
                The best <strong>Image Compressor without losing quality</strong>. <strong>Compress images</strong> with high quality. Reduce image size while keeping perfect quality - perfect for photos and important images!
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/tools/image-compressor">
                  <Button size="lg" className="bg-rose-500 hover:bg-rose-600 font-black rounded-xl h-14 px-10 shadow-xl shadow-rose-500/25 w-full sm:w-auto text-lg">
                    <Minimize className="mr-3 h-6 w-6" />
                    Compress Without Losing Quality Now
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
