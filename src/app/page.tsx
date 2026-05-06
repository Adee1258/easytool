"use client"

import * as React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  Search, ArrowRight, Sparkles, Zap, Shield, Star,
  TrendingUp, ArrowUpRight, CheckCircle2, Users, FileText,
  Globe, Rocket, ChevronRight, Play
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { tools, categories } from "@/config/tools"
import * as Icons from "lucide-react"
import { cn } from "@/lib/utils"

// Category color map
const catColors: Record<string, { bg: string; text: string; border: string; icon: string }> = {
  "AI & Productivity Tools": {
    bg: "bg-violet-500/10 dark:bg-violet-500/15",
    text: "text-violet-600 dark:text-violet-400",
    border: "border-violet-500/20",
    icon: "bg-violet-500",
  },
  "PDF Tools": {
    bg: "bg-red-500/10 dark:bg-red-500/15",
    text: "text-red-600 dark:text-red-400",
    border: "border-red-500/20",
    icon: "bg-red-500",
  },
  "Image Tools": {
    bg: "bg-blue-500/10 dark:bg-blue-500/15",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-500/20",
    icon: "bg-blue-500",
  },
  "Text Tools": {
    bg: "bg-emerald-500/10 dark:bg-emerald-500/15",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-500/20",
    icon: "bg-emerald-500",
  },
  "Finance & Health": {
    bg: "bg-amber-500/10 dark:bg-amber-500/15",
    text: "text-amber-600 dark:text-amber-400",
    border: "border-amber-500/20",
    icon: "bg-amber-500",
  },
  "SEO & Utilities": {
    bg: "bg-cyan-500/10 dark:bg-cyan-500/15",
    text: "text-cyan-600 dark:text-cyan-400",
    border: "border-cyan-500/20",
    icon: "bg-cyan-500",
  },
}

const catIcons: Record<string, string> = {
  "AI & Productivity Tools": "Sparkles",
  "PDF Tools": "FileText",
  "Image Tools": "Image",
  "Text Tools": "Type",
  "Finance & Health": "TrendingUp",
  "SEO & Utilities": "Globe",
}

function ToolCard({ tool }: { tool: typeof tools[0] }) {
  const IconComponent = (Icons as any)[tool.icon] || Icons.Hammer
  const colors = catColors[tool.category] || catColors["SEO & Utilities"]

  return (
    <Link href={`/tools/${tool.slug}`} className="group block">
      <div className={cn(
        "relative h-full p-5 rounded-2xl border bg-card transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/8",
        "hover:border-primary/25 active:scale-[0.98]",
        "card-shimmer icon-bounce"
      )}>
        {/* Icon */}
        <div className={cn(
          "bounce-icon w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110",
          colors.bg, colors.border, "border"
        )}>
          <IconComponent className={cn("h-5 w-5", colors.text)} />
        </div>

        {/* Content */}
        <h3 className="font-bold text-sm leading-tight mb-1.5 group-hover:text-primary transition-colors line-clamp-1">
          {tool.name}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {tool.description}
        </p>

        {/* Arrow */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0">
          <ArrowUpRight className={cn("h-4 w-4", colors.text)} />
        </div>

        {/* Popular badge */}
        {tool.isPopular && (
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-0">
            <span className="sr-only">Popular</span>
          </div>
        )}
      </div>
    </Link>
  )
}

function CategoryPill({ cat, active, onClick }: { cat: string; active: boolean; onClick: () => void }) {
  const colors = catColors[cat] || catColors["SEO & Utilities"]
  const IconName = catIcons[cat] || "Grid"
  const IconComp = (Icons as any)[IconName] || Icons.Grid

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200",
        "border active:scale-95",
        active
          ? cn("text-white border-transparent shadow-lg", colors.icon)
          : cn("bg-card hover:bg-muted/80", colors.text, colors.border)
      )}
    >
      <IconComp className="h-3.5 w-3.5" />
      {cat.replace(" & Productivity Tools", "").replace(" & Utilities", "").replace(" & Health", "")}
    </button>
  )
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [showSearch, setShowSearch] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const highlightText = (text: string, query: string) => {
    if (!query) return text
    const regex = new RegExp(`(${query})`, 'gi')
    const parts = text.split(regex)
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase()
        ? <span key={i} className="bg-purple-200 dark:bg-purple-800 text-purple-900 dark:text-purple-100 font-bold px-0.5 rounded">{part}</span>
        : part
    )
  }

  // Typing animation state
  const typingWords = ["100% Free.", "No Signup.", "Instant Results.", "Privacy First.", "Free Forever."]
  const [typingIndex, setTypingIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingPause, setTypingPause] = useState(false)

  useEffect(() => {
    if (typingPause) return
    const currentWord = typingWords[typingIndex]
    const speed = isDeleting ? 40 : 80

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentWord.slice(0, displayText.length + 1))
        if (displayText.length + 1 === currentWord.length) {
          setTypingPause(true)
          setTimeout(() => { setIsDeleting(true); setTypingPause(false) }, 1800)
        }
      } else {
        setDisplayText(currentWord.slice(0, displayText.length - 1))
        if (displayText.length - 1 === 0) {
          setIsDeleting(false)
          setTypingIndex((prev) => (prev + 1) % typingWords.length)
        }
      }
    }, speed)

    return () => clearTimeout(timer)
  }, [displayText, isDeleting, typingIndex, typingPause])

  const filteredBySearch = searchQuery.trim().length > 1
    ? tools.filter(t =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 8)
    : []

  const displayTools = activeCategory
    ? tools.filter(t => t.category === activeCategory)
    : tools.filter(t => t.isPopular || t.isTrending)

  const trendingTools = tools.filter(t => t.isTrending).slice(0, 6)

  // Close search on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearch(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  return (
    <div className="mesh-bg min-h-screen">
      
      {/* Search Overlay */}
      {showSearch && filteredBySearch.length > 0 && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setShowSearch(false)}
        />
      )}

      {/* JSON-LD for Homepage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "EasyTool",
            "url": "https://easytool.live",
            "description": "50+ free online tools for PDF, Image, Text, Finance & SEO. No signup required.",
            "potentialAction": {
              "@type": "SearchAction",
              "target": { "@type": "EntryPoint", "urlTemplate": "https://easytool.live/tools?q={search_term_string}" },
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />

      {/* ── HERO ── */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
        {/* Blobs */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="blob-1 absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-to-r from-violet-600/15 via-purple-500/10 to-fuchsia-600/15 rounded-full blur-[120px]" />
          <div className="blob-2 absolute top-20 -left-32 w-72 h-72 bg-blue-500/8 rounded-full blur-[80px]" />
          <div className="blob-3 absolute top-40 -right-32 w-72 h-72 bg-pink-500/8 rounded-full blur-[80px]" />
          {/* Floating Particles */}
          <div className="particle particle-1 w-2 h-2 bg-violet-500/40 top-[20%] left-[15%]" />
          <div className="particle particle-2 w-1.5 h-1.5 bg-pink-500/40 top-[35%] left-[80%]" />
          <div className="particle particle-3 w-2.5 h-2.5 bg-blue-500/30 top-[60%] left-[25%]" />
          <div className="particle particle-4 w-1 h-1 bg-fuchsia-500/50 top-[15%] left-[65%]" />
          <div className="particle particle-5 w-2 h-2 bg-cyan-500/30 top-[70%] left-[70%]" />
        </div>

        <div className="container flex flex-col items-center text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/8 border border-primary/15 text-primary text-sm font-semibold fade-up reveal">
            <Sparkles className="h-4 w-4" />
            50+ Free Professional Tools
          </div>

          {/* Headline */}
          <div className="space-y-4 fade-up">
            <h1 className="display-text max-w-5xl">
              AI-Powered Tools for Everyone
              <br />
              <span className="animated-gradient">— Free Forever</span>
            </h1>

            {/* Typing Animation */}
            <div className="flex items-center justify-center gap-2 text-lg md:text-xl font-bold text-muted-foreground flex-wrap">
              <span>Your work is</span>
              <span className="inline-flex items-center text-primary font-black">
                <span className="min-w-[140px] md:min-w-[180px] text-left">{displayText}</span>
                <span className="w-[2px] h-5 md:h-6 bg-primary inline-block animate-pulse ml-0.5 flex-shrink-0" />
              </span>
            </div>

            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              50+ professional tools for PDF, Image, Text, Finance & AI — all free, no signup, works in your browser.
            </p>
          </div>

          {/* Search Bar */}
          <div ref={searchRef} className="w-full max-w-2xl relative search-glow">
            <div className={cn(
              "relative flex items-center rounded-2xl border-2 bg-card shadow-xl transition-all duration-300",
              showSearch || searchQuery ? "border-primary/40 shadow-primary/10" : "border-border hover:border-primary/25"
            )}>
              <Search className="absolute left-5 h-5 w-5 text-muted-foreground pointer-events-none" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search tools... (PDF, Image, Calculator...)"
                className="w-full h-14 md:h-16 pl-14 pr-5 bg-card text-foreground text-base md:text-lg font-medium outline-none placeholder:text-muted-foreground/60 rounded-2xl"
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setShowSearch(true) }}
                onFocus={() => setShowSearch(true)}
              />
              {searchQuery && (
                <button
                  onClick={() => { setSearchQuery(""); inputRef.current?.focus() }}
                  className="absolute right-4 p-1.5 rounded-lg hover:bg-muted text-muted-foreground"
                >
                  <Icons.X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Search Results */}
            {showSearch && filteredBySearch.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 border border-border rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-2 max-h-96 overflow-y-auto">
                  {filteredBySearch.map(tool => {
                    const IconComp = (Icons as any)[tool.icon] || Icons.Hammer
                    const colors = catColors[tool.category] || catColors["SEO & Utilities"]
                    return (
                      <Link
                        key={tool.id}
                        href={`/tools/${tool.slug}`}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/70 transition-all group/r"
                        onClick={() => { setShowSearch(false); setSearchQuery("") }}
                      >
                        <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0", colors.bg)}>
                          <IconComp className={cn("h-4 w-4", colors.text)} />
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                          <p className="font-semibold text-sm">
                            {highlightText(tool.name, searchQuery)}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">{tool.category}</p>
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover/r:opacity-100 flex-shrink-0" />
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
            <span className="text-sm text-muted-foreground self-center font-medium">Popular:</span>
            {tools.filter(t => t.isPopular).slice(0, 4).map(t => (
              <Link
                key={t.id}
                href={`/tools/${t.slug}`}
                className="text-xs md:text-sm font-semibold px-3 py-1.5 rounded-full bg-card hover:bg-primary/10 hover:text-primary border border-border hover:border-primary/25 transition-all whitespace-nowrap"
              >
                {t.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="container mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "50+", label: "Free Tools", icon: Rocket, color: "text-violet-500" },
            { value: "1M+", label: "Users Monthly", icon: Users, color: "text-blue-500" },
            { value: "10M+", label: "Files Processed", icon: FileText, color: "text-emerald-500" },
            { value: "99.9%", label: "Uptime", icon: Globe, color: "text-amber-500" },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all group card-shimmer hover-lift">
              <div className="p-2.5 rounded-xl bg-muted group-hover:scale-110 transition-transform">
                <s.icon className={cn("h-5 w-5", s.color)} />
              </div>
              <div>
                <div className="text-2xl font-black stat-pop">{s.value}</div>
                <div className="text-xs text-muted-foreground font-medium">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TRENDING ── */}
      <section className="container mb-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-primary text-sm font-bold uppercase tracking-wider mb-2">
              <TrendingUp className="h-4 w-4" />
              Trending Now
            </div>
            <h2 className="headline-text">Most Popular Tools</h2>
          </div>
          <Link href="/tools" className="hidden md:flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors group">
            View All
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {trendingTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        <div className="mt-4 md:hidden">
          <Link href="/tools" className="flex items-center justify-center gap-2 p-3 rounded-xl border border-border text-sm font-semibold hover:bg-muted transition-all">
            View All 50+ Tools <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ── ALL TOOLS WITH FILTER ── */}
      <section className="container mb-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-black">Browse Tools</h2>
          <span className="text-sm text-muted-foreground">{displayTools.length} tools</span>
        </div>

        {/* Category Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-8 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap">
          <button
            onClick={() => setActiveCategory(null)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all border active:scale-95",
              !activeCategory
                ? "bg-primary text-white border-transparent shadow-lg shadow-primary/25"
                : "bg-card hover:bg-muted/80 border-border text-muted-foreground"
            )}
          >
            <Icons.LayoutGrid className="h-3.5 w-3.5" />
            All
          </button>
          {categories.map(cat => (
            <CategoryPill
              key={cat}
              cat={cat}
              active={activeCategory === cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
            />
          ))}
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
          {displayTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* ── CATEGORIES BENTO ── */}
      <section className="container mb-20">
        <div className="text-center mb-10">
          <h2 className="headline-text mb-3">Browse by Category</h2>
          <p className="text-muted-foreground text-lg">Everything organized for your workflow</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((cat, i) => {
            const colors = catColors[cat] || catColors["SEO & Utilities"]
            const IconName = catIcons[cat] || "Grid"
            const IconComp = (Icons as any)[IconName] || Icons.Grid
            const count = tools.filter(t => t.category === cat).length
            const catSlug = cat.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')
            const isLarge = i === 0 || i === 3

            return (
              <Link
                key={cat}
                href={`/categories/${catSlug}`}
                className={cn("group", isLarge && "md:col-span-1")}
              >
                <div className={cn(
                  "relative h-full p-6 md:p-8 rounded-2xl border overflow-hidden transition-all duration-300",
                  "hover:-translate-y-1 hover:shadow-xl active:scale-[0.98]",
                  colors.bg, colors.border
                )}>
                  {/* BG Icon */}
                  <div className="absolute -bottom-4 -right-4 opacity-[0.07]">
                    <IconComp className="h-32 w-32" />
                  </div>

                  <div className="relative z-10">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-white shadow-lg",
                      colors.icon
                    )}>
                      <IconComp className="h-6 w-6" />
                    </div>
                    <h3 className="font-black text-lg mb-1">{cat}</h3>
                    <p className={cn("text-sm font-semibold mb-4", colors.text)}>{count} Tools</p>
                    <div className={cn(
                      "inline-flex items-center gap-1.5 text-xs font-bold",
                      colors.text
                    )}>
                      Explore <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ── WHY EASYTOOL ── */}
      <section className="container mb-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 p-8 md:p-16 text-white">
          {/* BG decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-[80px]" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="headline-text text-white">
                Built for Speed.<br />Built for Privacy.
              </h2>
              <p className="text-white/80 text-lg leading-relaxed">
                Unlike other tools, EasyTool processes everything in your browser. Your files never touch our servers.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Zap, text: "Instant processing — no waiting" },
                  { icon: Shield, text: "Files stay on your device" },
                  { icon: Star, text: "No signup, no watermarks, ever" },
                  { icon: CheckCircle2, text: "Works on mobile & desktop" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-white/90 font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
              <Link href="/tools">
                <Button size="lg" className="bg-white text-violet-700 hover:bg-white/90 font-bold rounded-xl h-12 px-8 shadow-xl">
                  Try All Tools Free <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 gap-4">
              {tools.filter(t => t.isTrending).slice(0, 4).map((tool, i) => {
                const IconComp = (Icons as any)[tool.icon] || Icons.Hammer
                return (
                  <Link key={tool.id} href={`/tools/${tool.slug}`}>
                    <div className={cn(
                      "p-5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20",
                      "hover:bg-white/20 transition-all duration-300 hover:-translate-y-1",
                      i % 2 === 1 ? "mt-6" : ""
                    )}>
                      <IconComp className="h-8 w-8 text-white mb-3" />
                      <p className="font-bold text-white text-sm">{tool.name}</p>
                      <p className="text-white/60 text-xs mt-1 line-clamp-2">{tool.description}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BADGES ── */}
      <section className="container mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              icon: Zap,
              title: "Lightning Fast",
              desc: "Browser-based processing means instant results. No upload delays.",
              color: "text-amber-500",
              bg: "bg-amber-500/8 border-amber-500/15",
            },
            {
              icon: Shield,
              title: "100% Private",
              desc: "Your files never leave your device. Zero server uploads for most tools.",
              color: "text-blue-500",
              bg: "bg-blue-500/8 border-blue-500/15",
            },
            {
              icon: Star,
              title: "Always Free",
              desc: "No hidden costs, no subscriptions, no watermarks. Free forever.",
              color: "text-violet-500",
              bg: "bg-violet-500/8 border-violet-500/15",
            },
          ].map((item, i) => (
            <div key={i} className={cn("p-6 rounded-2xl border", item.bg)}>
              <div className={cn("w-11 h-11 rounded-xl bg-card flex items-center justify-center mb-4 shadow-sm")}>
                <item.icon className={cn("h-5 w-5", item.color)} />
              </div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
