import { Metadata } from "next"
import Link from "next/link"
import { FileImage, ChevronRight, CheckCircle2, ArrowRight, Shield, Zap, Minimize } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Online Image Compressor — Compress Images Online Free | EasyTool",
  description: "Online Image Compressor free. Compress images online without any software. Best online image compressor for JPG, PNG, WebP. 100% free, no signup.",
  keywords: [
    "online image compressor",
    "image compressor online",
    "compress image online",
    "online image compressor free",
    "free online image compressor",
    "compress images online",
    "online photo compressor",
    "best online image compressor",
    "image compressor online free",
    "online image resizer and compressor"
  ],
  alternates: { canonical: "https://easytool.live/online-image-compressor" },
  openGraph: {
    title: "Online Image Compressor — Compress Images Online Free",
    description: "Compress images online without any software.",
    url: "https://easytool.live/online-image-compressor",
    siteName: "EasyTool",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Image Compressor — Compress Images Online Free",
    description: "Compress images online without any software.",
  },
}

export default function OnlineImageCompressorSeoPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-emerald-500/10 to-transparent border-b border-emerald-500/15">
        <div className="container py-12 md:py-20">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">Online Image Compressor</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/25 font-black text-sm">
                  🌐 Online Image Compressor
                </Badge>
                <Badge variant="outline" className="font-semibold text-sm">No Software</Badge>
                <Badge variant="outline" className="font-semibold text-sm">100% Free</Badge>
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                Online Image Compressor
                <span className="block text-emerald-600 mt-2">Compress Images Online Free</span>
              </h1>

              <p className="text-muted-foreground text-xl leading-relaxed">
                The best <strong>Online Image Compressor</strong> free. <strong>Compress images online</strong> without any software. Works directly in your browser - JPG, PNG, WebP supported!
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/tools/image-compressor">
                  <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 font-black rounded-xl h-14 px-10 shadow-xl shadow-emerald-500/25 w-full sm:w-auto text-lg">
                    <Minimize className="mr-3 h-6 w-6" />
                    Compress Images Online Now
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
