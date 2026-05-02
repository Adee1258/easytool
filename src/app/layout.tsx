import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://easytool.live"),
  title: {
    default: "EasyTool - 50+ Free Online Tools | PDF, Image, Text & More",
    template: "%s | EasyTool - Free Online Tools"
  },
  description: "50+ free online tools for PDF, Image, Text, Finance & SEO. No signup, no watermark, 100% private. Merge PDF, compress images, word counter, QR code generator and more.",
  keywords: [
    "free online tools", "pdf tools", "image compressor", "word counter", "qr code generator",
    "merge pdf", "image to pdf", "text to speech", "emi calculator", "bmi calculator",
    "password generator", "json formatter", "meta tag generator", "free tools no signup"
  ],
  authors: [{ name: "EasyTool" }],
  creator: "EasyTool",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://easytool.live",
    siteName: "EasyTool",
    title: "EasyTool - 50+ Free Online Tools",
    description: "50+ free online tools for PDF, Image, Text, Finance & SEO. No signup required.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "EasyTool - Free Online Tools"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "EasyTool - 50+ Free Online Tools",
    description: "50+ free online tools for PDF, Image, Text, Finance & SEO. No signup required.",
    images: ["/og-image.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "EasyTool",
  "url": "https://easytool.live",
  "description": "50+ free online tools for PDF, Image, Text, Finance & SEO. No signup required.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://easytool.live/tools?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 pb-16 md:pb-0">{children}</main>
            <Footer />
          </div>
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
