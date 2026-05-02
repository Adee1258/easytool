import { notFound } from "next/navigation"
import { tools, categories, ToolCategory } from "@/config/tools"
import Link from "next/link"
import * as Icons from "lucide-react"
import { cn } from "@/lib/utils"
import { ArrowUpRight, ChevronRight } from "lucide-react"
import Breadcrumbs from "@/components/layout/breadcrumbs"

interface Props {
  params: Promise<{ category: string }>
}

const catColors: Record<string, { bg: string; text: string; border: string; iconBg: string; hero: string }> = {
  "AI & Productivity Tools": { bg: "bg-violet-500/8", text: "text-violet-600 dark:text-violet-400", border: "border-violet-500/20", iconBg: "bg-violet-500", hero: "from-violet-600/15 to-fuchsia-600/10" },
  "PDF Tools": { bg: "bg-red-500/8", text: "text-red-600 dark:text-red-400", border: "border-red-500/20", iconBg: "bg-red-500", hero: "from-red-600/15 to-orange-600/10" },
  "Image Tools": { bg: "bg-blue-500/8", text: "text-blue-600 dark:text-blue-400", border: "border-blue-500/20", iconBg: "bg-blue-500", hero: "from-blue-600/15 to-cyan-600/10" },
  "Text Tools": { bg: "bg-emerald-500/8", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-500/20", iconBg: "bg-emerald-500", hero: "from-emerald-600/15 to-teal-600/10" },
  "Finance & Health": { bg: "bg-amber-500/8", text: "text-amber-600 dark:text-amber-400", border: "border-amber-500/20", iconBg: "bg-amber-500", hero: "from-amber-600/15 to-yellow-600/10" },
  "SEO & Utilities": { bg: "bg-cyan-500/8", text: "text-cyan-600 dark:text-cyan-400", border: "border-cyan-500/20", iconBg: "bg-cyan-500", hero: "from-cyan-600/15 to-blue-600/10" },
}

const catIcons: Record<string, string> = {
  "AI & Productivity Tools": "Sparkles",
  "PDF Tools": "FileText",
  "Image Tools": "Image",
  "Text Tools": "Type",
  "Finance & Health": "TrendingUp",
  "SEO & Utilities": "Globe",
}

export async function generateStaticParams() {
  return categories.map(cat => ({
    category: cat.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-'),
  }))
}

export async function generateMetadata({ params }: Props) {
  const { category: slug } = await params
  const category = categories.find(c => c.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-') === slug)
  if (!category) return {}

  const count = tools.filter(t => t.category === category).length
  const toolNames = tools.filter(t => t.category === category).slice(0, 5).map(t => t.name).join(", ")

  return {
    title: `${category} - ${count} Free Online Tools | EasyTool`,
    description: `${count} free ${category.toLowerCase()} tools including ${toolNames} and more. No signup, no watermark, works in your browser. 100% free.`,
    keywords: [
      category.toLowerCase(),
      `free ${category.toLowerCase()}`,
      `${category.toLowerCase()} online free`,
      "free online tools no signup",
      ...tools.filter(t => t.category === category).map(t => t.name.toLowerCase()),
    ],
    alternates: {
      canonical: `https://easytool.live/categories/${slug}`,
    },
    openGraph: {
      title: `${category} - Free Online Tools | EasyTool`,
      description: `${count} free ${category.toLowerCase()} tools. No signup required.`,
      url: `https://easytool.live/categories/${slug}`,
    },
  }
}

export default async function CategoryPage({ params }: Props) {
  const { category: categorySlug } = await params

  const category = categories.find(
    c => c.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-') === categorySlug
  )
  if (!category) notFound()

  const categoryTools = tools.filter(t => t.category === category)
  const colors = catColors[category] || catColors["SEO & Utilities"]
  const IconComp = (Icons as any)[catIcons[category] || "Grid"] || Icons.Grid

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className={cn("border-b border-border/50 bg-gradient-to-br", colors.hero)}>
        <div className="container py-10 md:py-14">
          <Breadcrumbs items={[
            { label: "Tools", href: "/tools" },
            { label: category, href: `/categories/${categorySlug}` },
          ]} />

          <div className="mt-6 flex items-start gap-5">
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg flex-shrink-0", colors.iconBg)}>
              <IconComp className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-2xl md:text-4xl font-black tracking-tight mb-2">{category}</h1>
              <p className="text-muted-foreground">
                {categoryTools.length} free tools — no signup, no watermarks, works in your browser.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {categoryTools.map(tool => {
            const ToolIcon = (Icons as any)[tool.icon] || Icons.Hammer
            return (
              <Link key={tool.id} href={`/tools/${tool.slug}`} className="group">
                <div className={cn(
                  "relative h-full p-5 rounded-2xl border bg-card transition-all duration-200",
                  "hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/8 hover:border-primary/25",
                  "active:scale-[0.97]"
                )}>
                  <div className={cn(
                    "w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110",
                    colors.bg, "border", colors.border
                  )}>
                    <ToolIcon className={cn("h-5 w-5", colors.text)} />
                  </div>
                  <h3 className="font-bold text-sm leading-tight mb-1.5 group-hover:text-primary transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {tool.description}
                  </p>
                  <ArrowUpRight className={cn(
                    "absolute top-4 right-4 h-4 w-4 opacity-0 group-hover:opacity-100 transition-all",
                    colors.text
                  )} />
                </div>
              </Link>
            )
          })}
        </div>

        {/* Other Categories */}
        <div className="mt-16">
          <h2 className="text-xl font-black mb-5">Other Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {categories.filter(c => c !== category).map(cat => {
              const c = catColors[cat] || catColors["SEO & Utilities"]
              const CatIcon = (Icons as any)[catIcons[cat] || "Grid"] || Icons.Grid
              const slug = cat.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')
              const count = tools.filter(t => t.category === cat).length
              return (
                <Link key={cat} href={`/categories/${slug}`} className="group">
                  <div className={cn(
                    "p-4 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
                    c.bg, c.border
                  )}>
                    <CatIcon className={cn("h-5 w-5 mb-2", c.text)} />
                    <p className="font-bold text-xs">{cat.replace(" & Productivity Tools", "").replace(" & Utilities", "").replace(" & Health", "")}</p>
                    <p className={cn("text-xs mt-0.5", c.text)}>{count} tools</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
