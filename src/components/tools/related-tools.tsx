import Link from "next/link"
import { tools, ToolCategory } from "@/config/tools"
import * as Icons from "lucide-react"
import { cn } from "@/lib/utils"
import { ArrowUpRight } from "lucide-react"

interface RelatedToolsProps {
  currentToolId: string
  category: ToolCategory
}

const catColors: Record<string, { bg: string; text: string; border: string }> = {
  "AI & Productivity Tools": { bg: "bg-violet-500/10", text: "text-violet-600 dark:text-violet-400", border: "border-violet-500/20" },
  "PDF Tools": { bg: "bg-red-500/10", text: "text-red-600 dark:text-red-400", border: "border-red-500/20" },
  "Image Tools": { bg: "bg-blue-500/10", text: "text-blue-600 dark:text-blue-400", border: "border-blue-500/20" },
  "Text Tools": { bg: "bg-emerald-500/10", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-500/20" },
  "Finance & Health": { bg: "bg-amber-500/10", text: "text-amber-600 dark:text-amber-400", border: "border-amber-500/20" },
  "SEO & Utilities": { bg: "bg-cyan-500/10", text: "text-cyan-600 dark:text-cyan-400", border: "border-cyan-500/20" },
}

export default function RelatedTools({ currentToolId, category }: RelatedToolsProps) {
  const related = tools
    .filter(t => t.category === category && t.id !== currentToolId)
    .slice(0, 6)

  const colors = catColors[category] || catColors["SEO & Utilities"]

  if (related.length === 0) return (
    <p className="text-xs text-muted-foreground">No related tools found.</p>
  )

  return (
    <ul className="space-y-1.5">
      {related.map(tool => {
        const IconComp = (Icons as any)[tool.icon] || Icons.Hammer
        return (
          <li key={tool.id}>
            <Link
              href={`/tools/${tool.slug}`}
              className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-muted/70 transition-all group"
            >
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border",
                colors.bg, colors.border
              )}>
                <IconComp className={cn("h-3.5 w-3.5", colors.text)} />
              </div>
              <span className="text-sm font-medium flex-1 group-hover:text-primary transition-colors line-clamp-1">
                {tool.name}
              </span>
              <ArrowUpRight className={cn("h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-all flex-shrink-0", colors.text)} />
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
