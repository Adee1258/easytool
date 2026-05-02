"use client"

import React, { Suspense } from "react"
import dynamic from "next/dynamic"
import { Loader2, Wrench } from "lucide-react"

// Loading skeleton shown while tool loads
function ToolLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <div className="relative">
        <div className="absolute -inset-4 bg-primary/20 rounded-full blur-xl animate-pulse" />
        <div className="relative p-5 rounded-2xl bg-primary/10">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      </div>
      <p className="text-lg font-bold text-muted-foreground animate-pulse">Loading Tool...</p>
    </div>
  )
}

function ComingSoon({ toolId }: { toolId: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-12 space-y-6 bg-gradient-to-br from-primary/5 to-violet-500/5 rounded-[2.5rem] border-2 border-primary/10">
      <div className="p-6 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600">
        <Wrench className="h-12 w-12" />
      </div>
      <h3 className="text-3xl font-black">Coming Soon</h3>
      <p className="text-xl text-muted-foreground max-w-2xl">
        We're working hard to bring you the best <strong>{toolId.replace(/-/g, ' ')}</strong> experience. Check back soon!
      </p>
    </div>
  )
}

// Dynamic imports - each tool loads only when needed (fixes infinite loading)
const MergePDF = dynamic(() => import("@/components/tools/pdf/merge-pdf"), { loading: () => <ToolLoading />, ssr: false })
const SplitPDF = dynamic(() => import("@/components/tools/pdf/split-pdf"), { loading: () => <ToolLoading />, ssr: false })
const CompressPDF = dynamic(() => import("@/components/tools/pdf/compress-pdf"), { loading: () => <ToolLoading />, ssr: false })
const RotatePDF = dynamic(() => import("@/components/tools/pdf/rotate-pdf"), { loading: () => <ToolLoading />, ssr: false })
const ImageToPDF = dynamic(() => import("@/components/tools/pdf/image-to-pdf"), { loading: () => <ToolLoading />, ssr: false })
const PDFToImage = dynamic(() => import("@/components/tools/pdf/pdf-to-image"), { loading: () => <ToolLoading />, ssr: false })
const UnlockPDF = dynamic(() => import("@/components/tools/pdf/unlock-pdf"), { loading: () => <ToolLoading />, ssr: false })
const PDFSign = dynamic(() => import("@/components/tools/pdf/pdf-sign"), { loading: () => <ToolLoading />, ssr: false })
const PDFToWord = dynamic(() => import("@/components/tools/pdf/pdf-to-word"), { loading: () => <ToolLoading />, ssr: false })
const WordToPDF = dynamic(() => import("@/components/tools/pdf/word-to-pdf"), { loading: () => <ToolLoading />, ssr: false })

const ImageCompressor = dynamic(() => import("@/components/tools/image/image-compressor"), { loading: () => <ToolLoading />, ssr: false })
const ImageResizer = dynamic(() => import("@/components/tools/image/image-resizer"), { loading: () => <ToolLoading />, ssr: false })
const ImageCropper = dynamic(() => import("@/components/tools/image/image-cropper"), { loading: () => <ToolLoading />, ssr: false })
const ImageConverter = dynamic(() => import("@/components/tools/image/image-converter"), { loading: () => <ToolLoading />, ssr: false })
const GrayscaleConverter = dynamic(() => import("@/components/tools/image/grayscale-converter"), { loading: () => <ToolLoading />, ssr: false })
const ImageRotator = dynamic(() => import("@/components/tools/image/image-rotator"), { loading: () => <ToolLoading />, ssr: false })
const ThumbnailGenerator = dynamic(() => import("@/components/tools/image/thumbnail-generator"), { loading: () => <ToolLoading />, ssr: false })
const ImageWatermark = dynamic(() => import("@/components/tools/image/image-watermark"), { loading: () => <ToolLoading />, ssr: false })
const BgRemover = dynamic(() => import("@/components/tools/image/bg-remover"), { loading: () => <ToolLoading />, ssr: false })
const ImageEnhancer = dynamic(() => import("@/components/tools/image/image-enhancer"), { loading: () => <ToolLoading />, ssr: false })

const WordCounter = dynamic(() => import("@/components/tools/text/word-counter"), { loading: () => <ToolLoading />, ssr: false })
const CaseConverter = dynamic(() => import("@/components/tools/text/case-converter"), { loading: () => <ToolLoading />, ssr: false })
const RemoveDuplicates = dynamic(() => import("@/components/tools/text/remove-duplicates"), { loading: () => <ToolLoading />, ssr: false })
const TextToSpeech = dynamic(() => import("@/components/tools/text/text-to-speech"), { loading: () => <ToolLoading />, ssr: false })
const SpeechToText = dynamic(() => import("@/components/tools/text/speech-to-text"), { loading: () => <ToolLoading />, ssr: false })
const SlugGenerator = dynamic(() => import("@/components/tools/text/slug-generator"), { loading: () => <ToolLoading />, ssr: false })
const OnlineNotepad = dynamic(() => import("@/components/tools/text/online-notepad"), { loading: () => <ToolLoading />, ssr: false })
const LoremIpsumGenerator = dynamic(() => import("@/components/tools/text/lorem-ipsum-generator"), { loading: () => <ToolLoading />, ssr: false })
const Paraphraser = dynamic(() => import("@/components/tools/text/paraphraser"), { loading: () => <ToolLoading />, ssr: false })
const FindReplace = dynamic(() => import("@/components/tools/text/find-replace"), { loading: () => <ToolLoading />, ssr: false })

const EMICalculator = dynamic(() => import("@/components/tools/finance/emi-calculator"), { loading: () => <ToolLoading />, ssr: false })
const PercentageCalculator = dynamic(() => import("@/components/tools/finance/percentage-calculator"), { loading: () => <ToolLoading />, ssr: false })
const DiscountCalculator = dynamic(() => import("@/components/tools/finance/discount-calculator"), { loading: () => <ToolLoading />, ssr: false })
const GSTCalculator = dynamic(() => import("@/components/tools/finance/gst-calculator"), { loading: () => <ToolLoading />, ssr: false })
const CurrencyConverter = dynamic(() => import("@/components/tools/finance/currency-converter"), { loading: () => <ToolLoading />, ssr: false })
const BMICalculator = dynamic(() => import("@/components/tools/health/bmi-calculator"), { loading: () => <ToolLoading />, ssr: false })

const QRCodeGenerator = dynamic(() => import("@/components/tools/utility/qr-code-generator"), { loading: () => <ToolLoading />, ssr: false })
const JSONFormatter = dynamic(() => import("@/components/tools/utility/json-formatter"), { loading: () => <ToolLoading />, ssr: false })
const PasswordGenerator = dynamic(() => import("@/components/tools/utility/password-generator"), { loading: () => <ToolLoading />, ssr: false })
const UnitConverter = dynamic(() => import("@/components/tools/utility/unit-converter"), { loading: () => <ToolLoading />, ssr: false })
const MetaTagGenerator = dynamic(() => import("@/components/tools/seo/meta-tag-generator"), { loading: () => <ToolLoading />, ssr: false })
const RobotsGenerator = dynamic(() => import("@/components/tools/seo/robots-generator"), { loading: () => <ToolLoading />, ssr: false })
const SitemapGenerator = dynamic(() => import("@/components/tools/seo/sitemap-generator"), { loading: () => <ToolLoading />, ssr: false })

// AI Tools - proper dedicated components
const WhatsAppAnalyzer = dynamic(() => import("@/components/tools/ai/whatsapp-chat-analyzer"), { loading: () => <ToolLoading />, ssr: false })
const PassportPhotoMaker = dynamic(() => import("@/components/tools/ai/passport-photo-maker"), { loading: () => <ToolLoading />, ssr: false })
const ResumeATSChecker = dynamic(() => import("@/components/tools/ai/resume-ats-checker"), { loading: () => <ToolLoading />, ssr: false })
const VocalRemover = dynamic(() => import("@/components/tools/ai/vocal-remover"), { loading: () => <ToolLoading />, ssr: false })
const BankStatementConverter = dynamic(() => import("@/components/tools/ai/bank-statement-to-excel"), { loading: () => <ToolLoading />, ssr: false })
const ElectricityBillCalculator = dynamic(() => import("@/components/tools/ai/electricity-bill-calculator"), { loading: () => <ToolLoading />, ssr: false })

interface ToolRendererProps {
  toolId: string
}

const toolComponents: Record<string, React.ComponentType<any>> = {
  // PDF Tools
  "merge-pdf": MergePDF,
  "split-pdf": SplitPDF,
  "compress-pdf": CompressPDF,
  "rotate-pdf": RotatePDF,
  "image-to-pdf": ImageToPDF,
  "pdf-to-image": PDFToImage,
  "unlock-pdf": UnlockPDF,
  "pdf-sign": PDFSign,
  "sign-pdf": PDFSign,
  "pdf-to-word": PDFToWord,
  "word-to-pdf": WordToPDF,

  // Image Tools
  "image-compressor": ImageCompressor,
  "image-resizer": ImageResizer,
  "image-cropper": ImageCropper,
  "image-converter": ImageConverter,
  "grayscale-converter": GrayscaleConverter,
  "image-rotator": ImageRotator,
  "thumbnail-generator": ThumbnailGenerator,
  "image-watermark": ImageWatermark,
  "watermark-adder": ImageWatermark,
  "bg-remover": BgRemover,
  "background-remover": BgRemover,
  "image-enhancer": ImageEnhancer,

  // Text Tools
  "word-counter": WordCounter,
  "case-converter": CaseConverter,
  "remove-duplicates": RemoveDuplicates,
  "text-to-speech": TextToSpeech,
  "speech-to-text": SpeechToText,
  "slug-generator": SlugGenerator,
  "online-notepad": OnlineNotepad,
  "lorem-ipsum-generator": LoremIpsumGenerator,
  "paraphraser": Paraphraser,
  "find-replace": FindReplace,

  // Finance & Health
  "emi-calculator": EMICalculator,
  "percentage-calculator": PercentageCalculator,
  "discount-calculator": DiscountCalculator,
  "gst-calculator": GSTCalculator,
  "currency-converter": CurrencyConverter,
  "bmi-calculator": BMICalculator,

  // SEO & Utilities
  "qr-code-generator": QRCodeGenerator,
  "json-formatter": JSONFormatter,
  "password-generator": PasswordGenerator,
  "unit-converter": UnitConverter,
  "meta-tag-generator": MetaTagGenerator,
  "robots-txt-generator": RobotsGenerator,
  "xml-sitemap-generator": SitemapGenerator,

  // AI & Productivity Tools
  "whatsapp-chat-analyzer": WhatsAppAnalyzer,
  "passport-photo-maker": PassportPhotoMaker,
  "resume-ats-checker": ResumeATSChecker,
  "vocal-remover": VocalRemover,
  "bank-statement-to-excel": BankStatementConverter,
  "electricity-bill-calculator": ElectricityBillCalculator,
}

export default function ToolRenderer({ toolId }: ToolRendererProps) {
  const Component = toolComponents[toolId]

  if (!Component) {
    return <ComingSoon toolId={toolId} />
  }

  return (
    <div className="min-h-[400px]">
      <Component />
    </div>
  )
}
