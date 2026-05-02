"use client"

import { useState } from "react"
import { tools, categories } from "@/config/tools"
import Link from "next/link"
import * as Icons from "lucide-react"
import { cn } from "@/lib/utils"
import { Search, ArrowUpRight, SlidersHorizontal } from "lucide-react"

const catColors: Record<string, { bg: string; text: string; border: string; iconBg: string }> = {
  "AI & Productivity Tools": { bg: "bg-violet-500/8", text: "text-violet-600 dark:text-violet-400", border: "border-violet-500/20", iconBg: "bg-violet-500" },
  "PDF Tools": { bg: "bg-red-500/8", text: "text-red-600 dark:text-red-400", border: "border-red-500/20", iconBg: "bg-red-500" },
  "Image Tools": { bg: "bg-blue-500/8", text: "text-blue-600 dark:text-blue-400", border: "border-blue-500/20", iconBg: "bg-blue-500" },
  "Text Tools": { bg: "bg-emerald-500/8", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-500/20", iconBg: "bg-emerald-500" },
  "Finance & Health": { bg: "bg-amber-500/8", text: "text-amber-600 dark:text-amber-400", border: "border-amber-500/20", iconBg: "bg-amber-500" },
  "SEO & Utilities": { bg: "bg-cyan-500/8", text: "text-cyan-600 dark:text-cyan-400", border: "border-cyan-500/20", iconBg: "bg-cyan-500" },
}

const catIcons: Record<string, string> = {
  "AI & Productivity Tools": "Sparkles",
  "PDF Tools": "FileText",
  "Image Tools": "Image",
  "Text Tools": "Type",
  "Finance & Health": "TrendingUp",
  "SEO & Utilities": "Globe",
}

export default function AllToolsPage() {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filtered = tools.filter(t => {
    const matchSearch = !search.trim() ||
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase())
    const matchCat = !activeCategory || t.category === activeCategory
    return matchSearch && matchCat
  })

  const grouped = categories.map(cat => ({
    cat,
    tools: filtered.filter(t => t.category === cat),
  })).filter(g => g.tools.length > 0)

  return (
    <div className="min-h-screen mesh-bg">
      {/* Header */}
      <div className="border-b border-border/50 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container py-10 md:py-14 text-center space-y-6">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">
            All Free Online <span className="gradient-text">Tools</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {tools.length}+ professional tools — PDF, Image, Text, Finance & more. No signup required.
          </p>

          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="Search tools..."
              className="w-full h-12 pl-12 pr-4 rounded-xl border border-border bg-card text-sm font-medium outline-none focus:border-primary/40 transition-colors shadow-sm"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-muted text-muted-foreground">
                <Icons.X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container py-8 md:py-12">
        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-10 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap scrollbar-hide">
          <button
            onClick={() => setActiveCategory(null)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap border transition-all active:scale-95",
              !activeCategory
                ? "bg-primary text-white border-transparent shadow-md shadow-primary/25"
                : "bg-card border-border text-muted-foreground hover:bg-muted/70"
            )}
          >
            <Icons.LayoutGrid className="h-3.5 w-3.5" />
            All ({tools.length})
          </button>
          {categories.map(cat => {
            const colors = catColors[cat] || catColors["SEO & Utilities"]
            const IconComp = (Icons as any)[catIcons[cat] || "Grid"] || Icons.Grid
            const count = tools.filter(t => t.category === cat).length
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap border transition-all active:scale-95",
                  activeCategory === cat
                    ? cn("text-white border-transparent shadow-md", colors.iconBg)
                    : cn("bg-card hover:bg-muted/70 border-border", colors.text)
                )}
              >
                <IconComp className="h-3.5 w-3.5" />
                {cat.replace(" & Productivity Tools", "").replace(" & Utilities", "").replace(" & Health", "")}
                <span className="opacity-60">({count})</span>
              </button>
            )
          })}
        </div>

        {/* Results count */}
        {search && (
          <p className="text-sm text-muted-foreground mb-6">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""} for "<strong>{search}</strong>"
          </p>
        )}

        {/* Tools by Category */}
        {grouped.length === 0 ? (
          <div className="text-center py-20 space-y-3">
            <Icons.SearchX className="h-12 w-12 text-muted-foreground/40 mx-auto" />
            <p className="text-lg font-bold">No tools found</p>
            <p className="text-muted-foreground text-sm">Try a different search term</p>
          </div>
        ) : (
          <div className="space-y-12">
            {grouped.map(({ cat, tools: catTools }) => {
              const colors = catColors[cat] || catColors["SEO & Utilities"]
              const IconComp = (Icons as any)[catIcons[cat] || "Grid"] || Icons.Grid

              return (
                <div key={cat}>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-sm", colors.iconBg)}>
                      <IconComp className="h-4 w-4" />
                    </div>
                    <h2 className="text-lg font-black">{cat}</h2>
                    <div className="flex-1 h-px bg-border/60" />
                    <span className="text-xs font-bold text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                      {catTools.length} tools
                    </span>
                  </div>

                  {/* Tools Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                    {catTools.map(tool => {
                      const ToolIcon = (Icons as any)[tool.icon] || Icons.Hammer
                      return (
                        <Link key={tool.id} href={`/tools/${tool.slug}`} className="group">
                          <div className={cn(
                            "relative h-full p-4 rounded-xl border bg-card transition-all duration-200",
                            "hover:-translate-y-0.5 hover:shadow-md hover:shadow-primary/8 hover:border-primary/20",
                            "active:scale-[0.97]"
                          )}>
                            <div className={cn(
                              "w-9 h-9 rounded-lg flex items-center justify-center mb-3 transition-transform duration-200 group-hover:scale-110",
                              colors.bg, "border", colors.border
                            )}>
                              <ToolIcon className={cn("h-4 w-4", colors.text)} />
                            </div>
                            <p className="font-bold text-xs leading-tight mb-1 group-hover:text-primary transition-colors line-clamp-2">
                              {tool.name}
                            </p>
                            <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed hidden sm:block">
                              {tool.description}
                            </p>
                            <ArrowUpRight className={cn(
                              "absolute top-3 right-3 h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-all",
                              colors.text
                            )} />
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
