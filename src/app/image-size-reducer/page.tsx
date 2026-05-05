import { Metadata } from "next"
import Link from "next/link"
import { FileImage, ChevronRight, CheckCircle2, ArrowRight, Shield, Zap, Minimize } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Image Size Reducer — Reduce Image Size Online Free | EasyTool",
  description: "Image Size Reducer online free. Best photo size reducer to shrink images. Reduce image size for web, email, WhatsApp. 100% free, no signup.",
  keywords: [
    "image size reducer",
    "photo size reducer",
    "image reducer",
    "reduce image size",
    "image size reducer online",
    "image size reducer free",
    "free image size reducer",
    "picture size reducer",
    "shrink image size",
    "image file size reducer"
  ],
  alternates: { canonical: "https://easytool.live/image-size-reducer" },
  openGraph: {
    title: "Image Size Reducer — Reduce Image Size Online Free",
    description: "Best photo size reducer to shrink images.",
    url: "https://easytool.live/image-size-reducer",
    siteName: "EasyTool",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Size Reducer — Reduce Image Size Online Free",
    description: "Best photo size reducer to shrink images.",
  },
}

export default function ImageSizeReducerSeoPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-fuchsia-500/10 to-transparent border-b border-fuchsia-500/15">
        <div className="container py-12 md:py-20">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">Image Size Reducer</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-fuchsia-500/15 text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-500/25 font-black text-sm">
                  📉 Image Size Reducer
                </Badge>
                <Badge variant="outline" className="font-semibold text-sm">Shrink Images</Badge>
                <Badge variant="outline" className="font-semibold text-sm">100% Free</Badge>
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                Image Size Reducer
                <span className="block text-fuchsia-600 mt-2">Reduce Image Size Free</span>
              </h1>

              <p className="text-muted-foreground text-xl leading-relaxed">
                The best <strong>Image Size Reducer</strong> online. <strong>Photo size reducer</strong> to shrink images. Reduce image size for web, email, WhatsApp, and social media!
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/tools/image-compressor">
                  <Button size="lg" className="bg-fuchsia-500 hover:bg-fuchsia-600 font-black rounded-xl h-14 px-10 shadow-xl shadow-fuchsia-500/25 w-full sm:w-auto text-lg">
                    <Minimize className="mr-3 h-6 w-6" />
                    Reduce Image Size Now
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
