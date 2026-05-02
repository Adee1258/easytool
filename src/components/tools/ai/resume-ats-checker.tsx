"use client"

import { useState } from "react"
import { FileCheck, Upload, CheckCircle2, XCircle, AlertCircle, TrendingUp, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

interface ATSResult {
  score: number
  passed: string[]
  warnings: string[]
  failed: string[]
  keywords: string[]
  suggestions: string[]
}

function analyzeResume(resumeText: string, jobDesc: string): ATSResult {
  const text = resumeText.toLowerCase()
  const passed: string[] = []
  const warnings: string[] = []
  const failed: string[] = []

  // Check length
  const wordCount = resumeText.trim().split(/\s+/).length
  if (wordCount >= 300 && wordCount <= 800) passed.push("Good resume length (300–800 words)")
  else if (wordCount < 300) failed.push("Resume too short (less than 300 words)")
  else warnings.push("Resume might be too long (over 800 words)")

  // Check contact info
  const hasEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i.test(resumeText)
  const hasPhone = /(\+?\d[\d\s\-().]{7,}\d)/.test(resumeText)
  if (hasEmail) passed.push("Email address found")
  else failed.push("No email address detected")
  if (hasPhone) passed.push("Phone number found")
  else warnings.push("No phone number detected")

  // Check sections
  const sections = ["experience", "education", "skills", "summary", "objective", "work history", "projects"]
  const foundSections = sections.filter(s => text.includes(s))
  if (foundSections.length >= 3) passed.push(`Key sections found: ${foundSections.join(", ")}`)
  else warnings.push(`Only ${foundSections.length} key sections found. Add: experience, education, skills`)

  // Check action verbs
  const actionVerbs = ["managed", "developed", "led", "created", "improved", "achieved", "designed", "built", "implemented", "increased", "reduced", "delivered"]
  const foundVerbs = actionVerbs.filter(v => text.includes(v))
  if (foundVerbs.length >= 4) passed.push(`Strong action verbs used (${foundVerbs.length} found)`)
  else if (foundVerbs.length >= 2) warnings.push("Add more action verbs (managed, developed, led, etc.)")
  else failed.push("Very few action verbs. Use words like: managed, developed, led, created")

  // Check for numbers/metrics
  const hasNumbers = /\d+%|\d+\s*(years?|months?|projects?|people|team|million|k\b)/i.test(resumeText)
  if (hasNumbers) passed.push("Quantified achievements found (numbers/metrics)")
  else warnings.push("Add quantified achievements (e.g., 'Increased sales by 30%')")

  // Check for LinkedIn
  if (text.includes("linkedin")) passed.push("LinkedIn profile mentioned")
  else warnings.push("Consider adding your LinkedIn profile URL")

  // Job description keyword matching
  let keywords: string[] = []
  if (jobDesc.trim()) {
    const jdWords = jobDesc.toLowerCase().match(/\b[a-z]{4,}\b/g) || []
    const uniqueJdWords = [...new Set(jdWords)].filter(w =>
      !["with", "that", "this", "from", "have", "will", "your", "their", "they", "been", "were", "also", "more", "than"].includes(w)
    )
    keywords = uniqueJdWords.filter(w => text.includes(w)).slice(0, 10)
    const missingKeywords = uniqueJdWords.filter(w => !text.includes(w)).slice(0, 5)

    if (keywords.length >= 5) passed.push(`${keywords.length} job keywords matched`)
    else if (keywords.length >= 2) warnings.push(`Only ${keywords.length} keywords matched. Add more from job description.`)
    else failed.push("Very few job description keywords found in resume")

    if (missingKeywords.length > 0) {
      warnings.push(`Missing keywords: ${missingKeywords.join(", ")}`)
    }
  }

  const totalChecks = passed.length + warnings.length + failed.length
  const score = Math.round(((passed.length + warnings.length * 0.5) / Math.max(totalChecks, 1)) * 100)

  const suggestions = [
    "Use a clean, single-column format for best ATS compatibility",
    "Avoid tables, graphics, and text boxes — ATS can't read them",
    "Use standard section headings (Experience, Education, Skills)",
    "Save as .docx or plain PDF for best parsing",
    "Tailor your resume keywords to each job description",
  ]

  return { score, passed, warnings, failed, keywords, suggestions }
}

export default function ResumeATSChecker() {
  const [resumeText, setResumeText] = useState("")
  const [jobDesc, setJobDesc] = useState("")
  const [result, setResult] = useState<ATSResult | null>(null)
  const [loading, setLoading] = useState(false)

  const handleCheck = () => {
    if (!resumeText.trim()) {
      toast.error("Please paste your resume text first.")
      return
    }
    setLoading(true)
    setTimeout(() => {
      setResult(analyzeResume(resumeText, jobDesc))
      setLoading(false)
    }, 1200)
  }

  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-green-600"
    if (score >= 50) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 75) return "ATS Friendly"
    if (score >= 50) return "Needs Improvement"
    return "Poor ATS Score"
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-base font-bold">Paste Your Resume Text *</Label>
          <Textarea
            placeholder="Paste your resume content here (copy from Word/PDF)..."
            className="h-64 resize-none text-sm"
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">{resumeText.trim().split(/\s+/).filter(Boolean).length} words</p>
        </div>
        <div className="space-y-2">
          <Label className="text-base font-bold">Job Description (Optional)</Label>
          <Textarea
            placeholder="Paste the job description to check keyword match..."
            className="h-64 resize-none text-sm"
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">Adding JD improves keyword analysis accuracy</p>
        </div>
      </div>

      <Button onClick={handleCheck} className="w-full h-14 text-lg font-bold" disabled={loading || !resumeText.trim()}>
        {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <FileCheck className="mr-2 h-5 w-5" />}
        {loading ? "Analyzing Resume..." : "Check ATS Score"}
      </Button>

      {result && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Score */}
          <Card className="border-2 border-primary/10">
            <CardContent className="p-8 text-center">
              <div className={`text-8xl font-black ${getScoreColor(result.score)}`}>{result.score}%</div>
              <div className={`text-2xl font-bold mt-2 ${getScoreColor(result.score)}`}>{getScoreLabel(result.score)}</div>
              <div className="mt-4 h-4 rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${result.score >= 75 ? "bg-green-500" : result.score >= 50 ? "bg-yellow-500" : "bg-red-500"}`}
                  style={{ width: `${result.score}%` }}
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Passed */}
            <Card className="border-green-200 dark:border-green-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-green-700 dark:text-green-400 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" /> Passed ({result.passed.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {result.passed.map((item, i) => (
                  <p key={i} className="text-xs text-green-700 dark:text-green-400 flex items-start gap-2">
                    <CheckCircle2 className="h-3 w-3 mt-0.5 flex-shrink-0" /> {item}
                  </p>
                ))}
              </CardContent>
            </Card>

            {/* Warnings */}
            <Card className="border-yellow-200 dark:border-yellow-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-yellow-700 dark:text-yellow-400 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" /> Warnings ({result.warnings.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {result.warnings.map((item, i) => (
                  <p key={i} className="text-xs text-yellow-700 dark:text-yellow-400 flex items-start gap-2">
                    <AlertCircle className="h-3 w-3 mt-0.5 flex-shrink-0" /> {item}
                  </p>
                ))}
              </CardContent>
            </Card>

            {/* Failed */}
            <Card className="border-red-200 dark:border-red-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-red-700 dark:text-red-400 flex items-center gap-2">
                  <XCircle className="h-4 w-4" /> Failed ({result.failed.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {result.failed.length === 0 ? (
                  <p className="text-xs text-muted-foreground">No critical issues found!</p>
                ) : result.failed.map((item, i) => (
                  <p key={i} className="text-xs text-red-700 dark:text-red-400 flex items-start gap-2">
                    <XCircle className="h-3 w-3 mt-0.5 flex-shrink-0" /> {item}
                  </p>
                ))}
              </CardContent>
            </Card>
          </div>

          {result.keywords.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" /> Matched Keywords
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {result.keywords.map((kw) => (
                    <Badge key={kw} variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      ✓ {kw}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="bg-primary/5 border-primary/10">
            <CardHeader>
              <CardTitle className="text-base">💡 Pro Tips to Improve ATS Score</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {result.suggestions.map((tip, i) => (
                <p key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-primary font-bold">{i + 1}.</span> {tip}
                </p>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
