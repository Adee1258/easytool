import { Metadata } from "next"
import Link from "next/link"
import { FileImage, ChevronRight, CheckCircle2, ArrowRight, Shield, Zap, Minimize } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Image Compressor Free — Compress Images 100% Free | EasyTool",
  description: "Image Compressor free online. 100% free image compressor. Compress images without any cost. No signup, no ads, completely free.",
  keywords: [
    "image compressor free",
    "free image compressor",
    "image compressor free online",
    "free online image compressor",
    "compress images free",
    "free image compression",
    "image compressor without paying",
    "free photo compressor",
    "100 free image compressor",
    "image compressor free download"
  ],
  alternates: { canonical: "https://easytool.live/image-compressor-free" },
  openGraph: {
    title: "Image Compressor Free — Compress Images 100% Free",
    description: "100% free image compressor. Compress images without any cost.",
    url: "https://easytool.live/image-compressor-free",
    siteName: "EasyTool",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Compressor Free — Compress Images 100% Free",
    description: "100% free image compressor. Compress images without any cost.",
  },
}

export default function ImageCompressorFreeSeoPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-sky-500/10 to-transparent border-b border-sky-500/15">
        <div className="container py-12 md:py-20">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">Image Compressor Free</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/25 font-black text-sm">
                  🆓 100% Free
                </Badge>
                <Badge variant="outline" className="font-semibold text-sm">No Ads</Badge>
                <Badge variant="outline" className="font-semibold text-sm">No Signup</Badge>
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                Image Compressor Free
                <span className="block text-sky-600 mt-2">100% Free Image Compression</span>
              </h1>

              <p className="text-muted-foreground text-xl leading-relaxed">
                The best <strong>Image Compressor free</strong> online. 100% <strong>free image compressor</strong>. Compress images without any cost. No signup, no ads, completely free!
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/tools/image-compressor">
                  <Button size="lg" className="bg-sky-500 hover:bg-sky-600 font-black rounded-xl h-14 px-10 shadow-xl shadow-sky-500/25 w-full sm:w-auto text-lg">
                    <Minimize className="mr-3 h-6 w-6" />
                    Compress Images Free Now
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
