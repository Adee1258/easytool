"use client"

import { useState } from "react"
import { FileText, Copy, RefreshCw, CheckCircle2, ShieldCheck, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

export default function RobotsGenerator() {
  const [sitemapUrl, setSitemapUrl] = useState("")
  const [allowAll, setAllowAll] = useState("allow")
  const [delay, setDelay] = useState("0")
  const [generatedCode, setGeneratedCode] = useState("")

  const generate = () => {
    let code = `User-agent: *\n`
    if (allowAll === "disallow") {
      code += `Disallow: /\n`
    } else {
      code += `Allow: /\n`
    }

    if (delay !== "0") {
      code += `Crawl-delay: ${delay}\n`
    }

    if (sitemapUrl) {
      code += `Sitemap: ${sitemapUrl}\n`
    }

    setGeneratedCode(code)
    toast.success("Robots.txt generated!")
  }

  const copyCode = () => {
    if (!generatedCode) return
    navigator.clipboard.writeText(generatedCode)
    toast.success("Robots.txt copied to clipboard!")
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-2 border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" /> Robots Configuration
            </CardTitle>
            <CardDescription>Configure how search engines should crawl your site.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Default Access</Label>
              <Select value={allowAll} onValueChange={setAllowAll}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="allow">Allow All Robots</SelectItem>
                  <SelectItem value="disallow">Disallow All Robots</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Crawl Delay (Seconds)</Label>
              <Select value={delay} onValueChange={setDelay}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">No Delay (Default)</SelectItem>
                  <SelectItem value="5">5 Seconds</SelectItem>
                  <SelectItem value="10">10 Seconds</SelectItem>
                  <SelectItem value="20">20 Seconds</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Sitemap URL (Optional)</Label>
              <Input
                placeholder="https://example.com/sitemap.xml"
                value={sitemapUrl}
                onChange={(e) => setSitemapUrl(e.target.value)}
              />
            </div>

            <Button onClick={generate} className="w-full h-12 gap-2 text-lg font-bold">
              <RefreshCw className="h-5 w-5" /> Generate Robots.txt
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-2 border-primary/10 bg-muted/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-lg">Resulting File</CardTitle>
              <Button variant="outline" size="sm" onClick={copyCode} disabled={!generatedCode} className="gap-2">
                <Copy className="h-4 w-4" /> Copy
              </Button>
            </CardHeader>
            <CardContent>
              <pre className="p-6 rounded-lg bg-black text-blue-400 text-sm font-mono overflow-x-auto min-h-[200px]">
                {generatedCode || "# Click generate to see results"}
              </pre>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border bg-background flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10 text-green-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium">SEO Optimized</span>
            </div>
            <div className="p-4 rounded-xl border bg-background flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium">Crawler Friendly</span>
            </div>
          </div>
        </div>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none p-6 rounded-2xl border bg-muted/20">
        <h3 className="text-xl font-bold mb-4">What is Robots.txt?</h3>
        <p className="text-muted-foreground">
          A robots.txt file tells search engine crawlers which pages or files the crawler can or can't request from your site. 
          This is used mainly to avoid overloading your site with requests; it is not a mechanism for keeping a web page out of Google. 
          To keep a web page out of Google, use noindex directives, or password-protect the page.
        </p>
      </div>
    </div>
  )
}
