import { Metadata } from "next"
import Link from "next/link"
import { FileImage, ChevronRight, CheckCircle2, ArrowRight, Shield, Zap, Minimize } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Reduce Image Size — Make Images Smaller Online Free | EasyTool",
  description: "Reduce image size online free. Best tool to make images smaller without losing quality. Reduce photo size for web, email, WhatsApp. 100% free.",
  keywords: [
    "reduce image size",
    "make image smaller",
    "reduce photo size",
    "image size reducer",
    "reduce image size online",
    "reduce image size free",
    "how to reduce image size",
    "reduce image file size",
    "shrink image size",
    "make photo smaller"
  ],
  alternates: { canonical: "https://easytool.live/reduce-image-size" },
  openGraph: {
    title: "Reduce Image Size — Make Images Smaller Online Free",
    description: "Best tool to make images smaller without losing quality.",
    url: "https://easytool.live/reduce-image-size",
    siteName: "EasyTool",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reduce Image Size — Make Images Smaller Online Free",
    description: "Best tool to make images smaller without losing quality.",
  },
}

export default function ReduceImageSizeSeoPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-violet-500/10 to-transparent border-b border-violet-500/15">
        <div className="container py-12 md:py-20">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">Reduce Image Size</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-500/25 font-black text-sm">
                  📉 Reduce Image Size
                </Badge>
                <Badge variant="outline" className="font-semibold text-sm">Make Smaller</Badge>
                <Badge variant="outline" className="font-semibold text-sm">100% Free</Badge>
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                Reduce Image Size
                <span className="block text-violet-600 mt-2">Make Images Smaller Free</span>
              </h1>

              <p className="text-muted-foreground text-xl leading-relaxed">
                The best tool to <strong>reduce image size</strong> online. <strong>Make images smaller</strong> without losing quality. Perfect for web, email, WhatsApp, and social media!
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/tools/image-compressor">
                  <Button size="lg" className="bg-violet-500 hover:bg-violet-600 font-black rounded-xl h-14 px-10 shadow-xl shadow-violet-500/25 w-full sm:w-auto text-lg">
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
