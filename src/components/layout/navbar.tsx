"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import {
  Search, Menu, X, Sparkles, ChevronDown,
  ArrowUpRight, Home, Wrench, BookOpen, Grid3X3
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { tools, categories } from "@/config/tools"
import * as Icons from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const catColors: Record<string, string> = {
  "AI & Productivity Tools": "text-violet-500",
  "PDF Tools": "text-red-500",
  "Image Tools": "text-blue-500",
  "Text Tools": "text-emerald-500",
  "Finance & Health": "text-amber-500",
  "SEO & Utilities": "text-cyan-500",
}

const catIcons: Record<string, string> = {
  "AI & Productivity Tools": "Sparkles",
  "PDF Tools": "FileText",
  "Image Tools": "Image",
  "Text Tools": "Type",
  "Finance & Health": "TrendingUp",
  "SEO & Utilities": "Globe",
}

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [showResults, setShowResults] = React.useState(false)
  const [showSearch, setShowSearch] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const searchRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const filteredTools = searchQuery.trim().length > 1
    ? tools.filter(t =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 7)
    : []

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowResults(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  React.useEffect(() => {
    setShowResults(false)
    setSearchQuery("")
    setIsOpen(false)
  }, [pathname])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && filteredTools.length > 0) {
      router.push(`/tools/${filteredTools[0].slug}`)
      setShowResults(false)
      setSearchQuery("")
    }
    if (e.key === "Escape") setShowResults(false)
  }

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

  const navLinks = [
    { href: "/tools", label: "All Tools" },
    { href: "/blog", label: "Blog" },
  ]

  return (
    <>
      {/* Search Overlay */}
      {showResults && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setShowResults(false)}
        />
      )}
      
      <header className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-background/85 backdrop-blur-2xl border-b border-border/60 shadow-sm"
          : "bg-background/60 backdrop-blur-xl border-b border-transparent"
      )}>
        <div className="container flex h-16 items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="relative w-8 h-8 logo-pulse">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl blur-sm opacity-60 group-hover:opacity-90 transition-opacity" />
              <div className="relative w-8 h-8 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
            </div>
            <span className="font-black text-xl tracking-tight animated-gradient hidden sm:block">
              EasyTool
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200",
                  pathname === link.href || pathname.startsWith(link.href + "/")
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* Categories Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className={cn(
                "flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 outline-none",
                pathname.startsWith("/categories")
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
              )}>
                Categories
                <ChevronDown className="h-3.5 w-3.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                sideOffset={8}
                className="w-72 p-2 rounded-2xl border bg-card/95 backdrop-blur-2xl shadow-xl"
              >
                {categories.map(cat => {
                  const IconComp = (Icons as any)[catIcons[cat] || "Grid"] || Icons.Grid
                  const catSlug = cat.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')
                  return (
                    <DropdownMenuItem key={cat} asChild>
                      <Link
                        href={`/categories/${catSlug}`}
                        className="flex items-center gap-3 p-2.5 rounded-xl cursor-pointer hover:bg-muted/70 transition-all"
                      >
                        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                          <IconComp className={cn("h-4 w-4", catColors[cat])} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm">{cat}</p>
                          <p className="text-xs text-muted-foreground">
                            {tools.filter(t => t.category === cat).length} tools
                          </p>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {/* Desktop Search */}
            <div ref={searchRef} className="hidden md:block relative">
              <div className={cn(
                "flex items-center rounded-xl border bg-muted/50 transition-all duration-200",
                showSearch || searchQuery
                  ? "border-primary/40 bg-card w-64 lg:w-80"
                  : "border-border w-48 lg:w-64 hover:border-primary/25"
              )}>
                <Search className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search tools..."
                  className="w-full h-9 pl-9 pr-3 bg-transparent text-sm font-medium outline-none placeholder:text-muted-foreground/60"
                  value={searchQuery}
                  onChange={e => { setSearchQuery(e.target.value); setShowSearch(true) }}
                  onFocus={() => setShowResults(true)}
                  onKeyDown={handleKeyDown}
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="pr-2 text-muted-foreground hover:text-foreground">
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* Desktop Search Results */}
              {showResults && filteredTools.length > 0 && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-gray-900 border border-border rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="p-1.5 max-h-80 overflow-y-auto">
                    {filteredTools.map(tool => {
                      const IconComp = (Icons as any)[tool.icon] || Icons.Hammer
                      const color = catColors[tool.category] || "text-primary"
                      return (
                        <Link
                          key={tool.id}
                          href={`/tools/${tool.slug}`}
                          className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-muted/70 transition-all group/r"
                          onClick={() => { setShowResults(false); setSearchQuery("") }}
                        >
                          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                            <IconComp className={cn("h-4 w-4", color)} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm">
                              {highlightText(tool.name, searchQuery)}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">{tool.category}</p>
                          </div>
                          <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover/r:opacity-100 flex-shrink-0" />
                        </Link>
                      )
                    })}
                  </div>
                  <div className="px-3 py-2 border-t bg-muted/30">
                    <p className="text-xs text-muted-foreground">↵ Enter to open · Esc to close</p>
                  </div>
                </div>
              )}
            </div>

            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-2xl animate-in slide-in-from-top-2 duration-200">
            <div className="container py-4 space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search 50+ tools..."
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-border bg-muted/50 text-sm font-medium outline-none focus:border-primary/40 transition-colors"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Mobile Search Results */}
              {searchQuery.trim().length > 1 && filteredTools.length > 0 && (
                <div className="rounded-xl border border-border overflow-hidden">
                  {filteredTools.slice(0, 4).map(tool => {
                    const IconComp = (Icons as any)[tool.icon] || Icons.Hammer
                    const color = catColors[tool.category] || "text-primary"
                    return (
                      <Link
                        key={tool.id}
                        href={`/tools/${tool.slug}`}
                        className="flex items-center gap-3 p-3 hover:bg-muted/50 transition-all border-b border-border/50 last:border-0"
                        onClick={() => setIsOpen(false)}
                      >
                        <IconComp className={cn("h-4 w-4 flex-shrink-0", color)} />
                        <span className="font-medium text-sm">{tool.name}</span>
                      </Link>
                    )
                  })}
                </div>
              )}

              {/* Mobile Nav Links */}
              <nav className="space-y-1">
                <Link href="/" onClick={() => setIsOpen(false)} className={cn("flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all", pathname === "/" ? "bg-primary/10 text-primary" : "hover:bg-muted/70")}>
                  <Home className="h-4 w-4" /> Home
                </Link>
                <Link href="/tools" onClick={() => setIsOpen(false)} className={cn("flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all", pathname === "/tools" ? "bg-primary/10 text-primary" : "hover:bg-muted/70")}>
                  <Wrench className="h-4 w-4" /> All Tools
                </Link>
                <Link href="/blog" onClick={() => setIsOpen(false)} className={cn("flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all", pathname === "/blog" ? "bg-primary/10 text-primary" : "hover:bg-muted/70")}>
                  <BookOpen className="h-4 w-4" /> Blog
                </Link>
              </nav>

              {/* Mobile Categories */}
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-3 mb-2">Categories</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {categories.map(cat => {
                    const IconComp = (Icons as any)[catIcons[cat] || "Grid"] || Icons.Grid
                    const catSlug = cat.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')
                    return (
                      <Link
                        key={cat}
                        href={`/categories/${catSlug}`}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-muted/70 transition-all"
                      >
                        <IconComp className={cn("h-4 w-4 flex-shrink-0", catColors[cat])} />
                        <span className="text-sm font-medium truncate">{cat.replace(" & Productivity Tools", "").replace(" & Utilities", "").replace(" & Health", "")}</span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ── MOBILE BOTTOM NAV ── */}
      <nav className="bottom-nav">
        <div className="flex items-center justify-around px-2 py-2">
          {[
            { href: "/", icon: Home, label: "Home" },
            { href: "/tools", icon: Wrench, label: "Tools" },
            { href: "/tools", icon: Search, label: "Search", action: () => { router.push("/tools") } },
            { href: "/blog", icon: BookOpen, label: "Blog" },
          ].map((item, i) => {
            const isActive = i === 0 ? pathname === "/" : pathname.startsWith(item.href) && item.href !== "/"
            return (
              <Link
                key={i}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-all",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon className={cn("h-5 w-5 transition-transform", isActive && "scale-110")} />
                <span className="text-[10px] font-semibold">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
