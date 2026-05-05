import { Metadata } from "next"
import Link from "next/link"
import { FileImage, ChevronRight, CheckCircle2, ArrowRight, Shield, Zap, Minimize, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Image Compressor for Web — Optimize Images for Website | EasyTool",
  description: "Image Compressor for Web. Optimize images for website to improve load speed. Web-optimized image compression. Best for WordPress, Shopify, and all websites.",
  keywords: [
    "image compressor for web",
    "optimize images for web",
    "web image compressor",
    "compress images for website",
    "optimize images for website",
    "web optimized images",
    "image compressor for website",
    "compress images for web",
    "website image optimizer",
    "web image optimizer"
  ],
  alternates: { canonical: "https://easytool.live/image-compressor-for-web" },
  openGraph: {
    title: "Image Compressor for Web — Optimize Images for Website",
    description: "Optimize images for website to improve load speed.",
    url: "https://easytool.live/image-compressor-for-web",
    siteName: "EasyTool",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Compressor for Web — Optimize Images for Website",
    description: "Optimize images for website to improve load speed.",
  },
}

export default function ImageCompressorForWebSeoPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-blue-500/10 to-transparent border-b border-blue-500/15">
        <div className="container py-12 md:py-20">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">Image Compressor for Web</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/25 font-black text-sm">
                  🌐 Image Compressor for Web
                </Badge>
                <Badge variant="outline" className="font-semibold text-sm">Faster Website</Badge>
                <Badge variant="outline" className="font-semibold text-sm">Better SEO</Badge>
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                Image Compressor for Web
                <span className="block text-blue-600 mt-2">Optimize Images for Website</span>
              </h1>

              <p className="text-muted-foreground text-xl leading-relaxed">
                The best <strong>Image Compressor for Web</strong>. <strong>Optimize images for website</strong> to improve load speed. Web-optimized image compression - perfect for WordPress, Shopify, and all websites!
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/tools/image-compressor">
                  <Button size="lg" className="bg-blue-500 hover:bg-blue-600 font-black rounded-xl h-14 px-10 shadow-xl shadow-blue-500/25 w-full sm:w-auto text-lg">
                    <Monitor className="mr-3 h-6 w-6" />
                    Optimize Images for Web Now
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
