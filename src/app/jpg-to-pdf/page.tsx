import { Metadata } from "next"
import Link from "next/link"
import { FileImage, ChevronRight, CheckCircle2, ArrowRight, Shield, Zap, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "JPG to PDF — Convert JPG to PDF Online Free | EasyTool",
  description: "Convert JPG to PDF free online. Best JPG to PDF converter. Turn images into PDF documents. Combine multiple JPGs into one PDF. 100% free.",
  keywords: [
    "jpg to pdf",
    "convert jpg to pdf",
    "jpg to pdf converter",
    "jpg to pdf free",
    "convert jpg to pdf online",
    "image to pdf",
    "jpeg to pdf",
    "free jpg to pdf converter",
    "multiple jpg to pdf",
    "jpg to pdf document"
  ],
  alternates: { canonical: "https://easytool.live/jpg-to-pdf" },
  openGraph: {
    title: "JPG to PDF — Convert JPG to PDF Online Free",
    description: "Best JPG to PDF converter to turn images into PDF documents.",
    url: "https://easytool.live/jpg-to-pdf",
    siteName: "EasyTool",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JPG to PDF — Convert JPG to PDF Online Free",
    description: "Best JPG to PDF converter to turn images into PDF documents.",
  },
}

export default function JpgToPdfSeoPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-fuchsia-500/10 to-transparent border-b border-fuchsia-500/15">
        <div className="container py-12 md:py-20">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">JPG to PDF</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-fuchsia-500/15 text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-500/25 font-black text-sm">
                  🖼️ JPG to PDF
                </Badge>
                <Badge variant="outline" className="font-semibold text-sm">Multiple Images</Badge>
                <Badge variant="outline" className="font-semibold text-sm">100% Free</Badge>
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                JPG to PDF
                <span className="block text-fuchsia-600 mt-2">Convert Images to PDF Documents</span>
              </h1>

              <p className="text-muted-foreground text-xl leading-relaxed">
                The best <strong>JPG to PDF converter</strong> online. <strong>Convert JPG to PDF</strong> free. Turn images into PDF documents. Combine multiple JPGs into one PDF. Perfect for documents and presentations.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/tools/image-to-pdf">
                  <Button size="lg" className="bg-fuchsia-500 hover:bg-fuchsia-600 font-black rounded-xl h-14 px-10 shadow-xl shadow-fuchsia-500/25 w-full sm:w-auto text-lg">
                    <FileImage className="mr-3 h-6 w-6" />
                    Convert JPG to PDF Now
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
