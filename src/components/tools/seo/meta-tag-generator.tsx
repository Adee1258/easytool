"use client"

import { useState } from "react"
import { Search, Globe, Code, Tag, Copy, RefreshCw, CheckCircle2, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { toast } from "sonner"

export default function MetaTagGenerator() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    keywords: "",
    author: "",
    robots: "index, follow",
    viewport: "width=device-width, initial-scale=1.0",
    ogTitle: "",
    ogDescription: "",
  })

  const [generatedCode, setGeneratedCode] = useState("")

  const generate = () => {
    const code = `<!-- Primary Meta Tags -->
<title>${formData.title || "Page Title"}</title>
<meta name="title" content="${formData.title || ""}">
<meta name="description" content="${formData.description || ""}">
<meta name="keywords" content="${formData.keywords || ""}">
<meta name="author" content="${formData.author || ""}">
<meta name="robots" content="${formData.robots}">
<meta name="viewport" content="${formData.viewport}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:title" content="${formData.ogTitle || formData.title || ""}">
<meta property="og:description" content="${formData.ogDescription || formData.description || ""}">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:title" content="${formData.ogTitle || formData.title || ""}">
<meta property="twitter:description" content="${formData.ogDescription || formData.description || ""}">`
    
    setGeneratedCode(code)
    toast.success("Meta tags generated!")
  }

  const copyCode = () => {
    if (!generatedCode) return
    navigator.clipboard.writeText(generatedCode)
    toast.success("Code copied to clipboard!")
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <Card className="border-2 border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5 text-primary" /> SEO Settings
            </CardTitle>
            <CardDescription>Enter your website details to generate meta tags.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Site Title</Label>
              <Input
                placeholder="e.g. EasyToolify - All Free Online Tools"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Site Description</Label>
              <Textarea
                placeholder="Describe your website in 150-160 characters..."
                className="h-24"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Keywords</Label>
                <Input
                  placeholder="tools, online, free"
                  value={formData.keywords}
                  onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Author</Label>
                <Input
                  placeholder="Your Name"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                />
              </div>
            </div>
            <Button onClick={generate} className="w-full h-12 gap-2 text-lg font-bold">
              <RefreshCw className="h-5 w-5" /> Generate Tags
            </Button>
          </CardContent>
        </Card>

        {/* Output Preview */}
        <div className="space-y-6">
          <Card className="border-2 border-primary/10 bg-muted/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-lg">Generated HTML Code</CardTitle>
              <Button variant="outline" size="sm" onClick={copyCode} disabled={!generatedCode} className="gap-2">
                <Copy className="h-4 w-4" /> Copy
              </Button>
            </CardHeader>
            <CardContent>
              <pre className="p-4 rounded-lg bg-black text-green-400 text-xs font-mono overflow-x-auto h-[400px]">
                {generatedCode || "<!-- Click generate to see your meta tags here -->"}
              </pre>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4 flex gap-4 items-start">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Globe className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-sm">Why Meta Tags?</h4>
                <p className="text-xs text-muted-foreground">
                  Meta tags tell search engines like Google what your page is about. 
                  Properly optimized tags can significantly improve your SEO ranking and traffic.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Google Preview", icon: Search },
          { title: "Social Preview", icon: Code },
          { title: "Compliance", icon: CheckCircle2 }
        ].map((item, i) => (
          <div key={i} className="p-6 rounded-2xl border bg-background flex flex-col items-center text-center space-y-2">
            <item.icon className="h-8 w-8 text-primary/60" />
            <h3 className="font-bold">{item.title}</h3>
            <p className="text-sm text-muted-foreground">Automatically optimized for standard requirements.</p>
          </div>
        ))}
      </div>
    </div>
  )
}
