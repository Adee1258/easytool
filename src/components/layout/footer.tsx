import Link from "next/link"
import { Sparkles, Github, Twitter, Facebook, Instagram, Zap, Shield, Heart, ArrowUpRight } from "lucide-react"
import { tools, categories } from "@/config/tools"

const catSlugs: Record<string, string> = {
  "AI & Productivity Tools": "ai-productivity-tools",
  "PDF Tools": "pdf-tools",
  "Image Tools": "image-tools",
  "Text Tools": "text-tools",
  "Finance & Health": "finance-health",
  "SEO & Utilities": "seo-utilities",
}

export default function Footer() {
  const popularTools = tools.filter(t => t.isPopular).slice(0, 6)

  return (
    <footer className="w-full border-t border-border/50 bg-muted/20 pb-20 md:pb-0">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">

          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl blur-sm opacity-60 group-hover:opacity-90 transition-opacity" />
                <div className="relative w-8 h-8 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
              </div>
              <span className="font-black text-xl gradient-text">EasyTool</span>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              50+ free online tools for PDF, Image, Text & more. No signup, no watermarks, 100% private. Built with ❤️ in Pakistan.
            </p>

            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20">
                <Zap className="h-3 w-3" /> Fast
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/20">
                <Shield className="h-3 w-3" /> Private
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-pink-600 bg-pink-500/10 px-3 py-1.5 rounded-full border border-pink-500/20">
                <Heart className="h-3 w-3" /> Free
              </div>
            </div>

            <div className="flex items-center gap-2">
              {[
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Github, href: "#" },
              ].map((s, i) => (
                <Link
                  key={i}
                  href={s.href}
                  className="w-9 h-9 rounded-xl bg-muted hover:bg-primary/10 hover:text-primary border border-border hover:border-primary/25 flex items-center justify-center transition-all"
                >
                  <s.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Popular Tools */}
          <div className="space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-wider">Popular Tools</h3>
            <ul className="space-y-2.5">
              {popularTools.map(tool => (
                <li key={tool.id}>
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 group"
                  >
                    <span>{tool.name}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-wider">Categories</h3>
            <ul className="space-y-2.5">
              {categories.map(cat => (
                <li key={cat}>
                  <Link
                    href={`/categories/${catSlugs[cat] || cat.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-wider">Company</h3>
            <ul className="space-y-2.5">
              {[
                { href: "/about", label: "About Us" },
                { href: "/blog", label: "Blog" },
                { href: "/contact", label: "Contact" },
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" },
              ].map(item => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} EasyTool. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Made with ❤️ in Pakistan 🇵🇰
          </p>
        </div>
      </div>
    </footer>
  )
}
