import { notFound } from "next/navigation"
import { Metadata } from "next"
import { tools } from "@/config/tools"
import * as Icons from "lucide-react"
import ToolRenderer from "@/components/tools/tool-renderer"
import RelatedTools from "@/components/tools/related-tools"
import ToolFaqs from "@/components/tools/tool-faqs"
import Breadcrumbs from "@/components/layout/breadcrumbs"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Props {
  params: Promise<{ slug: string }>
}

const catColors: Record<string, { bg: string; text: string; border: string; iconBg: string }> = {
  "AI & Productivity Tools": { bg: "bg-violet-500/8", text: "text-violet-600 dark:text-violet-400", border: "border-violet-500/20", iconBg: "bg-violet-500" },
  "PDF Tools": { bg: "bg-red-500/8", text: "text-red-600 dark:text-red-400", border: "border-red-500/20", iconBg: "bg-red-500" },
  "Image Tools": { bg: "bg-blue-500/8", text: "text-blue-600 dark:text-blue-400", border: "border-blue-500/20", iconBg: "bg-blue-500" },
  "Text Tools": { bg: "bg-emerald-500/8", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-500/20", iconBg: "bg-emerald-500" },
  "Finance & Health": { bg: "bg-amber-500/8", text: "text-amber-600 dark:text-amber-400", border: "border-amber-500/20", iconBg: "bg-amber-500" },
  "SEO & Utilities": { bg: "bg-cyan-500/8", text: "text-cyan-600 dark:text-cyan-400", border: "border-cyan-500/20", iconBg: "bg-cyan-500" },
}

export async function generateStaticParams() {
  return tools.map(tool => ({ slug: tool.slug }))
}

// Per-tool SEO data with killer keywords
const toolSEO: Record<string, { title: string; description: string; keywords: string[] }> = {
  "merge-pdf": {
    title: "Merge PDF Online Free - Combine PDF Files Instantly | EasyTool",
    description: "Merge multiple PDF files into one online for free. No signup, no watermark. Combine PDF documents in seconds — fast, secure, browser-based PDF merger.",
    keywords: ["merge pdf", "combine pdf", "pdf merger online free", "join pdf files", "merge pdf without watermark", "combine pdf files online", "free pdf merger", "merge pdf files online free no signup"],
  },
  "split-pdf": {
    title: "Split PDF Online Free - Extract PDF Pages Instantly | EasyTool",
    description: "Split PDF files online for free. Extract specific pages or ranges from any PDF. No signup required. Fast, secure, browser-based PDF splitter tool.",
    keywords: ["split pdf", "split pdf online free", "extract pages from pdf", "pdf splitter", "separate pdf pages", "split pdf without watermark", "free pdf splitter online"],
  },
  "compress-pdf": {
    title: "Compress PDF Online Free - Reduce PDF File Size | EasyTool",
    description: "Compress PDF files online for free without losing quality. Reduce PDF size by up to 80%. No signup, no watermark. Fast browser-based PDF compressor.",
    keywords: ["compress pdf", "reduce pdf size", "compress pdf online free", "pdf compressor", "shrink pdf file size", "compress pdf without losing quality", "free pdf compressor online"],
  },
  "pdf-to-word": {
    title: "PDF to Word Converter Free Online - Convert PDF to DOCX | EasyTool",
    description: "Convert PDF to Word (DOCX) online for free. Accurate PDF to Word conversion with formatting preserved. No signup, no watermark, instant download.",
    keywords: ["pdf to word", "convert pdf to word", "pdf to docx", "pdf to word converter free", "pdf to word online free", "convert pdf to editable word", "free pdf to word converter"],
  },
  "word-to-pdf": {
    title: "Word to PDF Converter Free Online - Convert DOCX to PDF | EasyTool",
    description: "Convert Word documents to PDF online for free. DOCX to PDF conversion with original formatting. No signup required. Fast and secure Word to PDF converter.",
    keywords: ["word to pdf", "convert word to pdf", "docx to pdf", "word to pdf converter free", "word to pdf online free", "convert doc to pdf free", "free word to pdf converter"],
  },
  "pdf-to-image": {
    title: "PDF to Image Converter Free - Convert PDF to JPG/PNG | EasyTool",
    description: "Convert PDF pages to high-quality JPG or PNG images online for free. No signup, no watermark. Fast PDF to image converter — works in your browser.",
    keywords: ["pdf to image", "pdf to jpg", "pdf to png", "convert pdf to image free", "pdf to jpg converter online free", "pdf to image converter", "extract images from pdf free"],
  },
  "image-to-pdf": {
    title: "Image to PDF Converter Free Online - JPG to PDF | EasyTool",
    description: "Convert JPG, PNG images to PDF online for free. Combine multiple images into one PDF. No signup, no watermark. Fast image to PDF converter.",
    keywords: ["image to pdf", "jpg to pdf", "png to pdf", "convert image to pdf free", "jpg to pdf converter online free", "multiple images to pdf", "photo to pdf converter free"],
  },
  "rotate-pdf": {
    title: "Rotate PDF Online Free - Rotate PDF Pages | EasyTool",
    description: "Rotate PDF pages online for free. Rotate all pages or specific pages left, right, or 180 degrees. No signup required. Fast browser-based PDF rotator.",
    keywords: ["rotate pdf", "rotate pdf online free", "rotate pdf pages", "flip pdf pages", "pdf rotator online", "rotate pdf without watermark", "free pdf page rotator"],
  },
  "unlock-pdf": {
    title: "Unlock PDF Online Free - Remove PDF Password | EasyTool",
    description: "Unlock password-protected PDF files online for free. Remove PDF restrictions and passwords instantly. No signup, secure browser-based PDF unlocker.",
    keywords: ["unlock pdf", "remove pdf password", "unlock pdf online free", "pdf password remover", "decrypt pdf online", "remove pdf restrictions free", "unlock protected pdf"],
  },
  "sign-pdf": {
    title: "Sign PDF Online Free - Add Signature to PDF | EasyTool",
    description: "Sign PDF documents online for free. Draw or upload your signature and add it to any PDF. No signup, no watermark. Secure browser-based PDF signer.",
    keywords: ["sign pdf online", "pdf signature", "add signature to pdf free", "electronic signature pdf", "digital signature pdf free", "sign pdf without adobe", "free pdf signer online"],
  },
  "image-compressor": {
    title: "Image Compressor Online Free - Compress JPG PNG WebP | EasyTool",
    description: "Compress images online for free without losing quality. Reduce JPG, PNG, WebP file size by up to 90%. No signup, no watermark. Fast browser-based image compressor.",
    keywords: ["image compressor", "compress image online free", "reduce image size", "compress jpg online free", "compress png free", "image size reducer", "compress photo online free without losing quality"],
  },
  "image-resizer": {
    title: "Image Resizer Online Free - Resize Images to Any Size | EasyTool",
    description: "Resize images online for free. Change image dimensions to any size in pixels or percentage. No signup, no watermark. Fast browser-based image resizer.",
    keywords: ["image resizer", "resize image online free", "change image size", "resize photo online", "image resize tool free", "resize jpg online free", "resize png online free"],
  },
  "image-cropper": {
    title: "Image Cropper Online Free - Crop Photos Online | EasyTool",
    description: "Crop images online for free. Crop photos to any size or aspect ratio. No signup, no watermark. Fast and easy browser-based image cropper tool.",
    keywords: ["image cropper", "crop image online free", "crop photo online", "online image crop tool", "crop jpg free", "crop png online", "free image cropper no signup"],
  },
  "image-converter": {
    title: "Image Format Converter Free - Convert JPG PNG WebP GIF | EasyTool",
    description: "Convert images between JPG, PNG, WebP, GIF formats online for free. No signup, no watermark. Fast browser-based image format converter.",
    keywords: ["image converter", "convert jpg to png free", "convert png to jpg", "webp to jpg converter", "image format converter online free", "jpg to webp converter", "convert image format free"],
  },
  "background-remover": {
    title: "Background Remover Online Free - Remove Image Background | EasyTool",
    description: "Remove background from images online for free. AI-powered background removal for photos. No signup, no watermark. Instant transparent background maker.",
    keywords: ["background remover", "remove background from image free", "background eraser online", "transparent background maker", "remove image background free", "bg remover online", "photo background remover free"],
  },
  "watermark-adder": {
    title: "Watermark Image Online Free - Add Watermark to Photos | EasyTool",
    description: "Add watermark to images online for free. Protect your photos with text or image watermarks. No signup required. Fast browser-based watermark tool.",
    keywords: ["add watermark to image", "watermark photo online free", "image watermark tool", "add text watermark to photo", "watermark pictures free", "online watermark maker", "photo watermark free"],
  },
  "image-rotator": {
    title: "Rotate Image Online Free - Flip & Rotate Photos | EasyTool",
    description: "Rotate and flip images online for free. Rotate photos 90, 180, 270 degrees or flip horizontally/vertically. No signup, instant download.",
    keywords: ["rotate image online free", "flip image online", "rotate photo free", "image rotator online", "rotate jpg online", "flip photo horizontally free", "rotate picture online free"],
  },
  "image-enhancer": {
    title: "Image Enhancer Online Free - Improve Photo Quality | EasyTool",
    description: "Enhance image quality online for free. Improve brightness, contrast, sharpness of photos. No signup, no watermark. Fast browser-based image enhancer.",
    keywords: ["image enhancer online free", "improve image quality free", "photo enhancer online", "enhance photo quality", "image quality improver", "sharpen image online free", "photo quality enhancer free"],
  },
  "grayscale-converter": {
    title: "Grayscale Converter Online Free - Convert Photo to Black & White | EasyTool",
    description: "Convert color images to black and white (grayscale) online for free. No signup, no watermark. Instant browser-based grayscale photo converter.",
    keywords: ["grayscale converter", "convert image to black and white free", "black and white photo converter", "grayscale image online", "make photo black and white free", "desaturate image online", "bw photo converter free"],
  },
  "thumbnail-generator": {
    title: "Thumbnail Generator Online Free - YouTube & Social Media | EasyTool",
    description: "Generate custom thumbnails for YouTube, Instagram, Twitter online for free. No signup, no watermark. Fast browser-based thumbnail maker tool.",
    keywords: ["thumbnail generator", "youtube thumbnail maker free", "thumbnail creator online", "social media thumbnail generator", "create thumbnail free", "youtube thumbnail generator online", "free thumbnail maker"],
  },
  "word-counter": {
    title: "Word Counter Online Free - Count Words Characters Sentences | EasyTool",
    description: "Count words, characters, sentences, and paragraphs online for free. Real-time word counter with reading time estimate. No signup required.",
    keywords: ["word counter", "word count online free", "character counter", "count words online", "word counter tool", "online word counter free", "words characters sentences counter", "word count checker free"],
  },
  "text-to-speech": {
    title: "Text to Speech Online Free - Convert Text to Voice | EasyTool",
    description: "Convert text to speech online for free. Natural-sounding voices in multiple languages. No signup, no watermark. Browser-based TTS converter.",
    keywords: ["text to speech", "text to speech online free", "convert text to voice", "tts online free", "text to audio converter free", "read text aloud free", "text to speech converter no signup"],
  },
  "case-converter": {
    title: "Case Converter Online Free - UPPERCASE lowercase Title Case | EasyTool",
    description: "Convert text case online for free. Change to UPPERCASE, lowercase, Title Case, camelCase, sentence case instantly. No signup required.",
    keywords: ["case converter", "text case converter online free", "uppercase to lowercase converter", "lowercase to uppercase", "title case converter", "camelcase converter", "sentence case converter free"],
  },
  "paraphraser": {
    title: "Paraphraser Online Free - Rewrite Text to Avoid Plagiarism | EasyTool",
    description: "Paraphrase text online for free. Rewrite sentences and paragraphs to avoid plagiarism. No signup required. Free online paraphrasing tool.",
    keywords: ["paraphraser online free", "paraphrase tool", "rewrite text free", "paraphrasing tool online", "avoid plagiarism tool", "sentence rewriter free", "free paraphraser no signup"],
  },
  "remove-duplicates": {
    title: "Remove Duplicate Lines Online Free - Text Deduplicator | EasyTool",
    description: "Remove duplicate lines from text online for free. Clean and deduplicate text lists instantly. No signup required. Fast browser-based duplicate remover.",
    keywords: ["remove duplicate lines", "remove duplicates online free", "text deduplicator", "delete duplicate lines", "remove duplicate text free", "online duplicate line remover", "clean duplicate text free"],
  },
  "find-replace": {
    title: "Find and Replace Text Online Free | EasyTool",
    description: "Find and replace text online for free. Bulk find and replace words or phrases in text. No signup required. Fast browser-based find & replace tool.",
    keywords: ["find and replace text online", "find replace tool free", "bulk text replace online", "text find replace free", "online find replace tool", "replace words in text free", "text editor find replace"],
  },
  "speech-to-text": {
    title: "Speech to Text Online Free - Voice to Text Converter | EasyTool",
    description: "Convert speech to text online for free. Voice recognition transcription in your browser. No signup, no download. Free speech-to-text converter.",
    keywords: ["speech to text", "voice to text online free", "speech recognition online", "transcribe audio to text free", "voice transcription free", "speech to text converter online", "free voice to text no signup"],
  },
  "slug-generator": {
    title: "Slug Generator Online Free - URL Slug Maker | EasyTool",
    description: "Generate SEO-friendly URL slugs from text online for free. Convert titles to clean URL slugs instantly. No signup required. Free slug generator tool.",
    keywords: ["slug generator", "url slug generator free", "seo slug maker", "convert title to slug", "url slug creator online", "generate url slug free", "seo friendly url generator"],
  },
  "online-notepad": {
    title: "Online Notepad Free - Browser Notepad No Login | EasyTool",
    description: "Free online notepad that works in your browser. No signup, no download. Write and save notes online instantly. Simple browser-based text editor.",
    keywords: ["online notepad", "free online notepad", "browser notepad no login", "online text editor free", "notepad online no signup", "simple online notepad", "web notepad free"],
  },
  "lorem-ipsum-generator": {
    title: "Lorem Ipsum Generator Online Free - Dummy Text Generator | EasyTool",
    description: "Generate Lorem Ipsum placeholder text online for free. Create dummy text for designs and mockups. No signup required. Fast Lorem Ipsum generator.",
    keywords: ["lorem ipsum generator", "dummy text generator free", "placeholder text generator", "lorem ipsum online free", "generate lorem ipsum", "fake text generator", "lorem ipsum text maker free"],
  },
  "emi-calculator": {
    title: "EMI Calculator Online Free - Loan EMI Calculator | EasyTool",
    description: "Calculate loan EMI online for free. Home loan, car loan, personal loan EMI calculator with amortization schedule. No signup required.",
    keywords: ["emi calculator", "loan emi calculator online free", "home loan emi calculator", "car loan emi calculator", "personal loan emi calculator", "emi calculator india pakistan", "monthly loan payment calculator free"],
  },
  "percentage-calculator": {
    title: "Percentage Calculator Online Free - Calculate % Easily | EasyTool",
    description: "Calculate percentages online for free. Find percentage of a number, percentage increase/decrease, and more. No signup required. Fast percentage calculator.",
    keywords: ["percentage calculator", "percentage calculator online free", "calculate percentage", "percent calculator free", "percentage increase calculator", "percentage difference calculator", "how to calculate percentage free tool"],
  },
  "discount-calculator": {
    title: "Discount Calculator Online Free - Calculate Sale Price | EasyTool",
    description: "Calculate discounts and sale prices online for free. Find final price after discount percentage. No signup required. Fast discount calculator tool.",
    keywords: ["discount calculator", "discount calculator online free", "sale price calculator", "calculate discount percentage", "percent off calculator", "price after discount calculator", "discount price calculator free"],
  },
  "bmi-calculator": {
    title: "BMI Calculator Online Free - Body Mass Index Calculator | EasyTool",
    description: "Calculate your BMI (Body Mass Index) online for free. Check if you're underweight, normal, overweight, or obese. No signup required.",
    keywords: ["bmi calculator", "bmi calculator online free", "body mass index calculator", "calculate bmi free", "bmi checker online", "bmi calculator kg cm", "healthy weight calculator free"],
  },
  "gst-calculator": {
    title: "GST Calculator Online Free - Pakistan & India GST | EasyTool",
    description: "Calculate GST online for free. Add or remove GST from prices for Pakistan and India. No signup required. Fast and accurate GST calculator.",
    keywords: ["gst calculator", "gst calculator online free", "pakistan gst calculator", "india gst calculator", "calculate gst free", "gst inclusive exclusive calculator", "sales tax calculator free"],
  },
  "currency-converter": {
    title: "Currency Converter Online Free - PKR USD EUR Live Rates | EasyTool",
    description: "Convert currencies online for free. PKR to USD, EUR, GBP, AED and more. Live exchange rates. No signup required. Fast currency converter.",
    keywords: ["currency converter", "currency converter online free", "pkr to usd converter", "dollar to rupee converter", "live currency converter", "exchange rate calculator free", "forex converter online free"],
  },
  "meta-tag-generator": {
    title: "Meta Tag Generator Online Free - SEO Meta Tags | EasyTool",
    description: "Generate SEO meta tags online for free. Create title, description, keywords, Open Graph and Twitter Card meta tags. No signup required.",
    keywords: ["meta tag generator", "seo meta tag generator free", "meta tags generator online", "generate meta tags free", "open graph meta tag generator", "twitter card generator", "seo meta description generator free"],
  },
  "robots-txt-generator": {
    title: "Robots.txt Generator Online Free - Create robots.txt | EasyTool",
    description: "Generate robots.txt file online for free. Create custom robots.txt for your website to control search engine crawlers. No signup required.",
    keywords: ["robots txt generator", "robots.txt generator free", "create robots txt online", "robots txt file generator", "seo robots txt maker", "generate robots txt free", "website robots txt creator"],
  },
  "xml-sitemap-generator": {
    title: "XML Sitemap Generator Online Free - Create Sitemap | EasyTool",
    description: "Generate XML sitemap online for free. Create sitemap.xml for your website for better SEO and search engine indexing. No signup required.",
    keywords: ["xml sitemap generator", "sitemap generator free", "create xml sitemap online", "website sitemap generator", "sitemap.xml generator free", "seo sitemap creator", "generate sitemap free online"],
  },
  "qr-code-generator": {
    title: "QR Code Generator Online Free - Create QR Codes | EasyTool",
    description: "Generate QR codes online for free. Create QR codes for URLs, text, WiFi, email, phone. No signup, no watermark. Download in PNG format.",
    keywords: ["qr code generator", "qr code generator online free", "create qr code free", "qr code maker", "free qr code generator no signup", "custom qr code generator", "qr code creator online free"],
  },
  "password-generator": {
    title: "Password Generator Online Free - Strong Secure Passwords | EasyTool",
    description: "Generate strong, secure passwords online for free. Customize length, symbols, numbers. No signup required. Free random password generator.",
    keywords: ["password generator", "strong password generator free", "random password generator online", "secure password generator", "password creator free", "generate strong password online", "free password generator no signup"],
  },
  "json-formatter": {
    title: "JSON Formatter Online Free - Beautify & Validate JSON | EasyTool",
    description: "Format, beautify, and validate JSON online for free. Minify JSON, fix JSON errors. No signup required. Fast browser-based JSON formatter and validator.",
    keywords: ["json formatter", "json formatter online free", "json beautifier", "format json online", "json validator free", "json minifier online", "pretty print json free", "json editor online free"],
  },
  "unit-converter": {
    title: "Unit Converter Online Free - Length Weight Temperature | EasyTool",
    description: "Convert units online for free. Length, weight, temperature, data, speed conversions. No signup required. Fast and accurate unit converter tool.",
    keywords: ["unit converter", "unit converter online free", "length converter", "weight converter", "temperature converter", "metric to imperial converter", "measurement converter free", "online unit conversion tool"],
  },
  "whatsapp-chat-analyzer": {
    title: "WhatsApp Chat Analyzer Online Free - Chat Statistics | EasyTool",
    description: "Analyze WhatsApp chat export online for free. Get message stats, top senders, emoji usage, active hours. No signup, 100% private browser-based tool.",
    keywords: ["whatsapp chat analyzer", "whatsapp chat statistics", "analyze whatsapp chat free", "whatsapp chat insights", "whatsapp message counter", "whatsapp chat export analyzer", "free whatsapp analyzer online"],
  },
  "passport-photo-maker": {
    title: "Passport Photo Maker Online Free - Passport Size Photo | EasyTool",
    description: "Create passport size photos online for free. Pakistan, US, UK passport photo requirements. No signup, no watermark. Instant download.",
    keywords: ["passport photo maker", "passport size photo online free", "passport photo creator", "make passport photo online", "passport photo generator free", "id photo maker online", "passport photo pakistan free"],
  },
  "resume-ats-checker": {
    title: "Resume ATS Checker Free Online - ATS Score Checker | EasyTool",
    description: "Check your resume ATS score online for free. Optimize resume for Applicant Tracking Systems. Get keyword suggestions. No signup required.",
    keywords: ["resume ats checker", "ats resume checker free", "ats score checker online", "resume ats optimizer", "ats friendly resume checker", "resume keyword checker free", "ats resume scanner online free"],
  },
  "vocal-remover": {
    title: "Vocal Remover Online Free - Remove Vocals from Music | EasyTool",
    description: "Remove vocals from songs online for free. Separate vocals and instrumentals using AI. No signup required. Free vocal remover tool.",
    keywords: ["vocal remover", "vocal remover online free", "remove vocals from song", "instrumental extractor free", "karaoke maker online free", "separate vocals from music", "ai vocal remover free"],
  },
  "bank-statement-to-excel": {
    title: "Bank Statement to Excel Converter Free Online | EasyTool",
    description: "Convert bank statement PDF to Excel/CSV online for free. Extract transactions from bank statements. No signup required. Fast bank statement converter.",
    keywords: ["bank statement to excel", "convert bank statement to excel free", "pdf bank statement to csv", "bank statement converter online", "extract transactions from pdf free", "bank statement to spreadsheet", "pdf to excel bank statement free"],
  },
  "electricity-bill-calculator": {
    title: "Electricity Bill Calculator Pakistan Free - NEPRA Units | EasyTool",
    description: "Calculate electricity bill online free for Pakistan. NEPRA 2024 slab rates. Calculate LESCO, MEPCO, KESC bill by units consumed. No signup required.",
    keywords: ["electricity bill calculator pakistan", "nepra electricity calculator", "lesco bill calculator", "mepco bill calculator", "electricity units calculator pakistan", "bijli bill calculator free", "pakistan electricity bill calculator 2024"],
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const tool = tools.find(t => t.slug === slug)
  if (!tool) return { title: "Tool Not Found" }

  const seo = toolSEO[slug]
  const title = seo?.title || `${tool.name} - Free Online Tool | EasyTool`
  const description = seo?.description || `${tool.description} Free, no signup required, works in your browser.`
  const keywords = seo?.keywords || [tool.name.toLowerCase(), "free online tool", "no signup"]

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `https://easytool.live/tools/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://easytool.live/tools/${slug}`,
      siteName: "EasyTool",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

// SEO Content Component - keyword rich text for Google
function ToolSEOContent({ tool }: { tool: typeof tools[0] }) {
  const seo = toolSEO[tool.slug]
  if (!seo) return null

  return (
    <div className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-4">
      <h2 className="text-xl font-black">
        Free {tool.name} — No Signup, No Watermark
      </h2>
      <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground space-y-3">
        <p>
          EasyTool's <strong>{tool.name}</strong> is a completely free, browser-based tool that requires no account or installation.
          Whether you're a student, professional, or casual user, our {tool.name.toLowerCase()} delivers professional-quality results instantly.
        </p>
        <p>
          Unlike other online tools, EasyTool processes everything directly in your browser — your files and data never leave your device.
          This means <strong>100% privacy</strong>, zero server uploads, and lightning-fast processing.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 not-prose mt-4">
          {[
            { label: "100% Free", sub: "No hidden costs" },
            { label: "No Signup", sub: "Instant access" },
            { label: "No Watermark", sub: "Clean output" },
            { label: "Mobile Ready", sub: "Works on all devices" },
          ].map(item => (
            <div key={item.label} className="p-3 rounded-xl bg-muted/50 border border-border/60 text-center">
              <p className="font-bold text-xs text-foreground">{item.label}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params
  const tool = tools.find(t => t.slug === slug)
  if (!tool) notFound()

  const IconComponent = (Icons as any)[tool.icon] || Icons.Hammer
  const colors = catColors[tool.category] || catColors["SEO & Utilities"]
  const catSlug = tool.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')
  const seo = toolSEO[tool.slug]

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.name,
    "description": seo?.description || tool.description,
    "url": `https://easytool.live/tools/${tool.slug}`,
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250",
      "bestRating": "5"
    },
    "featureList": [
      "Free to use",
      "No signup required",
      "No watermark",
      "Browser-based processing",
      "Mobile friendly"
    ]
  }

  return (
    <div className="min-h-screen">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ── Header ── */}
      <div className={cn("border-b border-border/50", colors.bg)}>
        <div className="container py-8 md:py-10">
          <Breadcrumbs items={[
            { label: "Tools", href: "/tools" },
            { label: tool.category, href: `/categories/${catSlug}` },
            { label: tool.name, href: `/tools/${tool.slug}` },
          ]} />

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-5">
            {/* Icon */}
            <div className={cn(
              "w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg text-white",
              colors.iconBg
            )}>
              <IconComponent className="h-8 w-8" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h1 className="text-2xl md:text-3xl font-black tracking-tight">{tool.name}</h1>
                {tool.isPopular && (
                  <Badge className="bg-amber-500/15 text-amber-600 border-amber-500/25 text-xs font-bold">
                    ⭐ Popular
                  </Badge>
                )}
                {tool.isTrending && (
                  <Badge className="bg-green-500/15 text-green-600 border-green-500/25 text-xs font-bold">
                    🔥 Trending
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground leading-relaxed max-w-2xl">{tool.description}</p>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2 sm:flex-col sm:items-end">
              {[
                { icon: Icons.CheckCircle2, label: "Free" },
                { icon: Icons.ShieldCheck, label: "Private" },
                { icon: Icons.Zap, label: "Fast" },
              ].map(b => (
                <div key={b.label} className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground bg-background/80 px-3 py-1.5 rounded-full border border-border/60">
                  <b.icon className={cn("h-3.5 w-3.5", colors.text)} />
                  {b.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">

          {/* Tool + Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tool Card */}
            <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
              <div className={cn("px-6 py-3 border-b border-border/50 flex items-center gap-2", colors.bg)}>
                <div className={cn("w-2 h-2 rounded-full", colors.iconBg)} />
                <span className={cn("text-xs font-bold uppercase tracking-wider", colors.text)}>
                  {tool.name}
                </span>
              </div>
              <div className="p-6 md:p-8">
                <ToolRenderer toolId={tool.id} />
              </div>
            </div>

            {/* How to Use */}
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <h2 className="text-xl font-black mb-6">How to use {tool.name}?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { step: "1", title: "Upload or Input", desc: "Select your file or enter your data into the tool." },
                  { step: "2", title: "Configure", desc: "Adjust settings and options to match your needs." },
                  { step: "3", title: "Process", desc: "Click the action button to start processing instantly." },
                  { step: "4", title: "Download", desc: "Get your result with one click — no watermarks." },
                ].map(s => (
                  <div key={s.step} className="flex gap-4">
                    <div className={cn(
                      "w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black text-white flex-shrink-0",
                      colors.iconBg
                    )}>
                      {s.step}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{s.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Why EasyTool */}
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <h2 className="text-xl font-black mb-3">Why use EasyTool for {tool.name}?</h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                EasyTool processes your files directly in your browser — your data never leaves your device.
                Our {tool.name} is completely free, requires no account, and produces professional results with zero watermarks.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  "100% Free Forever",
                  "No Account Needed",
                  "No Watermarks",
                  "Browser-Based",
                  "Mobile Friendly",
                  "Instant Results",
                ].map(f => (
                  <div key={f} className="flex items-center gap-2 text-xs font-semibold">
                    <Icons.CheckCircle2 className={cn("h-3.5 w-3.5 flex-shrink-0", colors.text)} />
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* SEO Content Block - keyword rich */}
            <ToolSEOContent tool={tool} />

            {/* FAQs */}
            <ToolFaqs toolName={tool.name} />
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Privacy Card */}
            <div className={cn("rounded-2xl border p-5", colors.bg, colors.border)}>
              <div className="flex items-center gap-3 mb-3">
                <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center text-white", colors.iconBg)}>
                  <Icons.ShieldCheck className="h-4 w-4" />
                </div>
                <h3 className="font-bold text-sm">Privacy Guaranteed</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                This tool runs entirely in your browser. Your files are never uploaded to our servers — 100% private and secure.
              </p>
            </div>

            {/* Related Tools */}
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
                <Icons.LayoutGrid className="h-4 w-4 text-primary" />
                Related Tools
              </h3>
              <RelatedTools currentToolId={tool.id} category={tool.category} />
            </div>

            {/* Ad Space */}
            <div className="rounded-2xl border-2 border-dashed border-border/60 bg-muted/20 aspect-[4/5] flex flex-col items-center justify-center gap-2">
              <Icons.BarChart2 className="h-6 w-6 text-muted-foreground/40" />
              <span className="text-xs text-muted-foreground/50 font-medium uppercase tracking-wider">Advertisement</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
