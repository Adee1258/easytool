"use client"

import { useState } from "react"
import { Globe, Copy, RefreshCw, CheckCircle2, ListPlus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

export default function SitemapGenerator() {
  const [baseUrl, setBaseUrl] = useState("https://example.com")
  const [urls, setUrls] = useState<{ path: string; freq: string; priority: string }[]>([
    { path: "/", freq: "daily", priority: "1.0" },
    { path: "/tools", freq: "weekly", priority: "0.8" },
    { path: "/about", freq: "monthly", priority: "0.5" },
  ])
  const [generatedCode, setGeneratedCode] = useState("")

  const addUrl = () => {
    setUrls([...urls, { path: "", freq: "weekly", priority: "0.5" }])
  }

  const removeUrl = (index: number) => {
    setUrls(urls.filter((_, i) => i !== index))
  }

  const updateUrl = (index: number, field: string, value: string) => {
    const newUrls = [...urls]
    ;(newUrls[index] as any)[field] = value
    setUrls(newUrls)
  }

  const generate = () => {
    const date = new Date().toISOString().split("T")[0]
    let code = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`
    
    urls.forEach((u) => {
      const fullUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) + u.path : baseUrl + u.path
      code += `  <url>\n`
      code += `    <loc>${fullUrl}</loc>\n`
      code += `    <lastmod>${date}</lastmod>\n`
      code += `    <changefreq>${u.freq}</changefreq>\n`
      code += `    <priority>${u.priority}</priority>\n`
      code += `  </url>\n`
    })
    
    code += `</urlset>`
    setGeneratedCode(code)
    toast.success("XML Sitemap generated!")
  }

  const copyCode = () => {
    if (!generatedCode) return
    navigator.clipboard.writeText(generatedCode)
    toast.success("Sitemap copied to clipboard!")
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-2 border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" /> Sitemap Configuration
            </CardTitle>
            <CardDescription>Enter your URLs to generate an XML sitemap.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Base Website URL</Label>
              <Input
                placeholder="https://yourwebsite.com"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Pages</Label>
                <Button variant="outline" size="sm" onClick={addUrl} className="gap-1">
                  <ListPlus className="h-4 w-4" /> Add URL
                </Button>
              </div>
              
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                {urls.map((u, i) => (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-[1fr,auto,auto,auto] gap-2 items-end border p-3 rounded-lg bg-muted/20">
                    <div className="space-y-1">
                      <Label className="text-[10px] uppercase">Path</Label>
                      <Input
                        placeholder="/page"
                        value={u.path}
                        onChange={(e) => updateUrl(i, "path", e.target.value)}
                        className="h-8 text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px] uppercase">Freq</Label>
                      <Select value={u.freq} onValueChange={(val) => updateUrl(i, "freq", val)}>
                        <SelectTrigger className="h-8 text-xs w-[100px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"].map((f) => (
                            <SelectItem key={f} value={f} className="text-xs">{f}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px] uppercase">Prio</Label>
                      <Select value={u.priority} onValueChange={(val) => updateUrl(i, "priority", val)}>
                        <SelectTrigger className="h-8 text-xs w-[70px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {["1.0", "0.9", "0.8", "0.7", "0.6", "0.5", "0.4", "0.3", "0.2", "0.1"].map((p) => (
                            <SelectItem key={p} value={p} className="text-xs">{p}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeUrl(i)} className="h-8 w-8 text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <Button onClick={generate} className="w-full h-12 gap-2 text-lg font-bold">
              <RefreshCw className="h-5 w-5" /> Generate XML Sitemap
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-2 border-primary/10 bg-muted/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-lg">XML Output</CardTitle>
              <Button variant="outline" size="sm" onClick={copyCode} disabled={!generatedCode} className="gap-2">
                <Copy className="h-4 w-4" /> Copy
              </Button>
            </CardHeader>
            <CardContent>
              <pre className="p-6 rounded-lg bg-black text-orange-400 text-xs font-mono overflow-x-auto h-[450px]">
                {generatedCode || "<!-- Your XML sitemap will appear here -->"}
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
