"use client"

import { useState } from "react"
import {
  FileCheck, CheckCircle2, XCircle, AlertCircle,
  TrendingUp, Loader2, Download, RefreshCw,
  Target, Zap, Award, BookOpen, Briefcase, User
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

// ── Types ──────────────────────────────────────────────────────────────────
interface CheckItem {
  label: string
  status: "pass" | "warn" | "fail"
  detail?: string
}

interface ATSResult {
  score: number
  grade: string
  gradeColor: string
  checks: CheckItem[]
  matchedKeywords: string[]
  missingKeywords: string[]
  suggestions: { priority: "high" | "medium" | "low"; text: string }[]
  stats: { words: number; sentences: number; sections: number; actionVerbs: number }
}

// ── Analysis Engine ────────────────────────────────────────────────────────
const STOP_WORDS = new Set([
  "with", "that", "this", "from", "have", "will", "your", "their", "they", "been",
  "were", "also", "more", "than", "when", "what", "which", "about", "after", "before",
  "should", "would", "could", "these", "those", "there", "where", "while", "other",
  "into", "over", "such", "some", "just", "like", "very", "well", "even", "only",
  "both", "each", "much", "many", "most", "then", "than", "them", "they", "been",
])

const ACTION_VERBS = [
  "managed", "developed", "led", "created", "improved", "achieved", "designed",
  "built", "implemented", "increased", "reduced", "delivered", "launched", "drove",
  "executed", "established", "coordinated", "analyzed", "optimized", "streamlined",
  "generated", "negotiated", "trained", "mentored", "collaborated", "spearheaded",
  "transformed", "accelerated", "automated", "deployed", "architected", "scaled",
]

const SECTION_KEYWORDS = {
  experience: ["experience", "work history", "employment", "career", "professional background"],
  education: ["education", "academic", "degree", "university", "college", "qualification"],
  skills: ["skills", "technical skills", "core competencies", "expertise", "proficiencies"],
  summary: ["summary", "objective", "profile", "about me", "professional summary"],
  projects: ["projects", "portfolio", "work samples", "case studies"],
  certifications: ["certifications", "certificates", "licenses", "credentials"],
  achievements: ["achievements", "accomplishments", "awards", "honors", "recognition"],
}

function analyzeResume(resumeText: string, jobDesc: string): ATSResult {
  const text = resumeText.toLowerCase()
  const checks: CheckItem[] = []

  // 1. Word Count
  const words = resumeText.trim().split(/\s+/).filter(Boolean)
  const wordCount = words.length
  if (wordCount >= 400 && wordCount <= 900)
    checks.push({ label: "Resume length is optimal (400–900 words)", status: "pass", detail: `${wordCount} words` })
  else if (wordCount < 400)
    checks.push({ label: "Resume is too short", status: "fail", detail: `${wordCount} words — aim for 400–900` })
  else
    checks.push({ label: "Resume might be too long", status: "warn", detail: `${wordCount} words — consider trimming` })

  // 2. Contact Info
  const hasEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i.test(resumeText)
  const hasPhone = /(\+?\d[\d\s\-().]{7,}\d)/.test(resumeText)
  const hasLinkedIn = /linkedin\.com|linkedin/i.test(resumeText)

  checks.push({ label: hasEmail ? "Email address found" : "No email address detected", status: hasEmail ? "pass" : "fail", detail: hasEmail ? "✓" : "Add your professional email" })
  checks.push({ label: hasPhone ? "Phone number found" : "No phone number detected", status: hasPhone ? "pass" : "warn", detail: hasPhone ? "✓" : "Add your contact number" })
  checks.push({ label: hasLinkedIn ? "LinkedIn profile included" : "LinkedIn profile missing", status: hasLinkedIn ? "pass" : "warn", detail: hasLinkedIn ? "✓" : "Add linkedin.com/in/yourname" })

  // 3. Sections
  const foundSections: string[] = []
  Object.entries(SECTION_KEYWORDS).forEach(([section, keywords]) => {
    if (keywords.some(k => text.includes(k))) foundSections.push(section)
  })
  if (foundSections.length >= 4)
    checks.push({ label: `${foundSections.length} key sections found`, status: "pass", detail: foundSections.join(", ") })
  else if (foundSections.length >= 2)
    checks.push({ label: `Only ${foundSections.length} sections detected`, status: "warn", detail: `Add: ${["experience", "education", "skills", "summary"].filter(s => !foundSections.includes(s)).join(", ")}` })
  else
    checks.push({ label: "Missing critical resume sections", status: "fail", detail: "Add Experience, Education, Skills, Summary" })

  // 4. Action Verbs
  const foundVerbs = ACTION_VERBS.filter(v => text.includes(v))
  if (foundVerbs.length >= 6)
    checks.push({ label: `Strong action verbs (${foundVerbs.length} found)`, status: "pass", detail: foundVerbs.slice(0, 5).join(", ") + "..." })
  else if (foundVerbs.length >= 3)
    checks.push({ label: `Some action verbs (${foundVerbs.length} found)`, status: "warn", detail: "Add more: led, built, achieved, delivered, optimized" })
  else
    checks.push({ label: "Very few action verbs", status: "fail", detail: "Use: managed, developed, led, created, improved" })

  // 5. Quantified Achievements
  const quantPatterns = [
    /\d+\s*%/, /\d+\s*(years?|months?)/, /\d+\s*(people|team|members?)/,
    /\$\s*\d+/, /\d+\s*(projects?|clients?|customers?)/,
    /\d+[kKmMbB]\b/, /increased|decreased|reduced|improved.*\d+/,
  ]
  const hasQuantified = quantPatterns.some(p => p.test(resumeText))
  checks.push({
    label: hasQuantified ? "Quantified achievements found" : "No quantified achievements",
    status: hasQuantified ? "pass" : "warn",
    detail: hasQuantified ? "Numbers/metrics detected ✓" : "Add: 'Increased sales by 30%', 'Led team of 8'"
  })

  // 6. File Format Hint
  checks.push({ label: "ATS-compatible format recommended", status: "warn", detail: "Save as .docx or simple PDF (no tables/graphics)" })

  // 7. Sentence count
  const sentences = resumeText.split(/[.!?]+/).filter(s => s.trim().length > 10).length

  // 8. Keyword Matching with JD
  let matchedKeywords: string[] = []
  let missingKeywords: string[] = []

  if (jobDesc.trim()) {
    const jdWords = jobDesc.toLowerCase().match(/\b[a-z]{3,}\b/g) || []
    const uniqueJdWords = [...new Set(jdWords)].filter(w => !STOP_WORDS.has(w) && w.length > 3)

    matchedKeywords = uniqueJdWords.filter(w => text.includes(w)).slice(0, 15)
    missingKeywords = uniqueJdWords.filter(w => !text.includes(w)).slice(0, 10)

    if (matchedKeywords.length >= 8)
      checks.push({ label: `Excellent keyword match (${matchedKeywords.length} keywords)`, status: "pass", detail: "Strong alignment with job description" })
    else if (matchedKeywords.length >= 4)
      checks.push({ label: `Moderate keyword match (${matchedKeywords.length} keywords)`, status: "warn", detail: "Add more keywords from job description" })
    else
      checks.push({ label: "Poor keyword match with job description", status: "fail", detail: "Tailor your resume to match the job posting" })
  }

  // ── Score Calculation ──
  const passCount = checks.filter(c => c.status === "pass").length
  const warnCount = checks.filter(c => c.status === "warn").length
  const failCount = checks.filter(c => c.status === "fail").length
  const total = checks.length
  const rawScore = Math.round(((passCount * 1 + warnCount * 0.4) / total) * 100)
  const score = Math.min(98, Math.max(10, rawScore))

  // Grade
  let grade = "F", gradeColor = "text-red-600"
  if (score >= 90) { grade = "A+"; gradeColor = "text-green-600" }
  else if (score >= 80) { grade = "A"; gradeColor = "text-green-600" }
  else if (score >= 70) { grade = "B+"; gradeColor = "text-blue-600" }
  else if (score >= 60) { grade = "B"; gradeColor = "text-blue-600" }
  else if (score >= 50) { grade = "C"; gradeColor = "text-yellow-600" }
  else if (score >= 40) { grade = "D"; gradeColor = "text-orange-600" }

  // ── Suggestions ──
  const suggestions: ATSResult["suggestions"] = []
  if (failCount > 0) suggestions.push({ priority: "high", text: "Fix all critical issues (red items) first — they hurt your score the most" })
  if (!hasQuantified) suggestions.push({ priority: "high", text: "Add numbers to achievements: 'Increased revenue by 25%', 'Managed team of 10'" })
  if (foundVerbs.length < 6) suggestions.push({ priority: "high", text: "Start bullet points with strong action verbs: Led, Built, Achieved, Delivered, Optimized" })
  if (missingKeywords.length > 0) suggestions.push({ priority: "high", text: `Add these missing keywords from JD: ${missingKeywords.slice(0, 5).join(", ")}` })
  suggestions.push({ priority: "medium", text: "Use a single-column format — ATS systems struggle with multi-column layouts" })
  suggestions.push({ priority: "medium", text: "Avoid tables, text boxes, headers/footers — ATS cannot parse them" })
  suggestions.push({ priority: "medium", text: "Use standard fonts: Arial, Calibri, Times New Roman (11-12pt)" })
  suggestions.push({ priority: "low", text: "Customize your resume for each job — tailor keywords to match the job description" })
  suggestions.push({ priority: "low", text: "Keep resume to 1 page (0-5 years exp) or 2 pages max (5+ years)" })

  return {
    score,
    grade,
    gradeColor,
    checks,
    matchedKeywords,
    missingKeywords,
    suggestions,
    stats: { words: wordCount, sentences, sections: foundSections.length, actionVerbs: foundVerbs.length }
  }
}

// ── Component ──────────────────────────────────────────────────────────────
export default function ResumeATSChecker() {
  const [resumeText, setResumeText] = useState("")
  const [jobDesc, setJobDesc] = useState("")
  const [result, setResult] = useState<ATSResult | null>(null)
  const [loading, setLoading] = useState(false)

  const wordCount = resumeText.trim().split(/\s+/).filter(Boolean).length

  const handleCheck = () => {
    if (!resumeText.trim()) {
      toast.error("Please paste your resume text first.")
      return
    }
    setLoading(true)
    setTimeout(() => {
      setResult(analyzeResume(resumeText, jobDesc))
      setLoading(false)
      toast.success("Analysis complete!")
    }, 1500)
  }

  const handleReset = () => {
    setResumeText("")
    setJobDesc("")
    setResult(null)
  }

  const passCount = result?.checks.filter(c => c.status === "pass").length || 0
  const warnCount = result?.checks.filter(c => c.status === "warn").length || 0
  const failCount = result?.checks.filter(c => c.status === "fail").length || 0

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      {/* Input Section */}
      {!result ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Resume Input */}
            <div className="space-y-2">
              <Label className="font-bold flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                Your Resume Text *
              </Label>
              <Textarea
                placeholder="Paste your resume content here (copy-paste from Word or PDF)..."
                className="h-72 resize-none text-sm leading-relaxed focus:border-primary"
                value={resumeText}
                onChange={e => setResumeText(e.target.value)}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{wordCount} words</span>
                <span className={cn(
                  wordCount >= 400 && wordCount <= 900 ? "text-green-600" :
                    wordCount > 0 ? "text-yellow-600" : ""
                )}>
                  {wordCount === 0 ? "Aim for 400–900 words" :
                    wordCount < 400 ? `Need ${400 - wordCount} more words` :
                      wordCount > 900 ? `${wordCount - 900} words over limit` : "✓ Good length"}
                </span>
              </div>
            </div>

            {/* Job Description */}
            <div className="space-y-2">
              <Label className="font-bold flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-primary" />
                Job Description
                <Badge variant="secondary" className="text-xs font-normal">Optional but recommended</Badge>
              </Label>
              <Textarea
                placeholder="Paste the job description here to check keyword match and get tailored suggestions..."
                className="h-72 resize-none text-sm leading-relaxed focus:border-primary"
                value={jobDesc}
                onChange={e => setJobDesc(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Adding JD enables keyword gap analysis and improves accuracy by 40%
              </p>
            </div>
          </div>

          <Button
            onClick={handleCheck}
            className="w-full h-14 text-lg font-bold shadow-lg shadow-primary/25"
            disabled={loading || !resumeText.trim()}
          >
            {loading ? (
              <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Analyzing Resume...</>
            ) : (
              <><FileCheck className="mr-2 h-5 w-5" /> Check ATS Score — Free</>
            )}
          </Button>

          {/* How it works */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: BookOpen, label: "Paste Resume", desc: "Copy text from your CV" },
              { icon: Target, label: "Add Job Description", desc: "For keyword matching" },
              { icon: Award, label: "Get ATS Score", desc: "With actionable tips" },
            ].map((s, i) => (
              <div key={i} className="text-center p-4 rounded-xl bg-muted/40 border border-border/60">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <s.icon className="h-5 w-5 text-primary" />
                </div>
                <p className="font-bold text-sm">{s.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

          {/* Score Hero */}
          <div className="relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-violet-500/5 p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Score Circle */}
              <div className="text-center">
                <div className={cn("text-7xl md:text-8xl font-black", result.gradeColor)}>
                  {result.score}%
                </div>
                <div className={cn("text-2xl font-black mt-1", result.gradeColor)}>
                  Grade: {result.grade}
                </div>
                <div className="mt-3 h-3 rounded-full bg-muted overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-1000",
                      result.score >= 75 ? "bg-green-500" :
                        result.score >= 50 ? "bg-yellow-500" : "bg-red-500"
                    )}
                    style={{ width: `${result.score}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {result.score >= 80 ? "🎉 Excellent! ATS-ready resume" :
                    result.score >= 60 ? "👍 Good, minor improvements needed" :
                      result.score >= 40 ? "⚠️ Needs significant improvement" :
                        "❌ Major issues found"}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Words", value: result.stats.words, icon: BookOpen, good: result.stats.words >= 400 },
                  { label: "Sections", value: result.stats.sections, icon: Target, good: result.stats.sections >= 4 },
                  { label: "Action Verbs", value: result.stats.actionVerbs, icon: Zap, good: result.stats.actionVerbs >= 6 },
                  { label: "Keywords", value: result.matchedKeywords.length, icon: TrendingUp, good: result.matchedKeywords.length >= 5 },
                ].map((stat, i) => (
                  <div key={i} className={cn(
                    "p-3 rounded-xl border text-center",
                    stat.good ? "bg-green-500/8 border-green-500/20" : "bg-muted/50 border-border"
                  )}>
                    <stat.icon className={cn("h-4 w-4 mx-auto mb-1", stat.good ? "text-green-600" : "text-muted-foreground")} />
                    <div className="text-xl font-black">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Check Summary */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-sm text-green-700 dark:text-green-400">{passCount} Passed</p>
                    <p className="text-xs text-green-600">Good job!</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                  <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-sm text-yellow-700 dark:text-yellow-400">{warnCount} Warnings</p>
                    <p className="text-xs text-yellow-600">Can be improved</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                  <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-sm text-red-700 dark:text-red-400">{failCount} Failed</p>
                    <p className="text-xs text-red-600">Fix immediately</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Checks */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                Detailed ATS Checks
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {result.checks.map((check, i) => (
                <div key={i} className={cn(
                  "flex items-start gap-3 p-3 rounded-xl border",
                  check.status === "pass" ? "bg-green-500/5 border-green-500/15" :
                    check.status === "warn" ? "bg-yellow-500/5 border-yellow-500/15" :
                      "bg-red-500/5 border-red-500/15"
                )}>
                  {check.status === "pass" ? <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" /> :
                    check.status === "warn" ? <AlertCircle className="h-4 w-4 text-yellow-600 flex-shrink-0 mt-0.5" /> :
                      <XCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />}
                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      "text-sm font-semibold",
                      check.status === "pass" ? "text-green-700 dark:text-green-400" :
                        check.status === "warn" ? "text-yellow-700 dark:text-yellow-400" :
                          "text-red-700 dark:text-red-400"
                    )}>{check.label}</p>
                    {check.detail && (
                      <p className="text-xs text-muted-foreground mt-0.5">{check.detail}</p>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Keywords */}
          {(result.matchedKeywords.length > 0 || result.missingKeywords.length > 0) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.matchedKeywords.length > 0 && (
                <Card className="border-green-200 dark:border-green-800">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-green-700 dark:text-green-400 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      Matched Keywords ({result.matchedKeywords.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {result.matchedKeywords.map(kw => (
                        <Badge key={kw} className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">
                          ✓ {kw}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {result.missingKeywords.length > 0 && (
                <Card className="border-red-200 dark:border-red-800">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-red-700 dark:text-red-400 flex items-center gap-2">
                      <XCircle className="h-4 w-4" />
                      Missing Keywords ({result.missingKeywords.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {result.missingKeywords.map(kw => (
                        <Badge key={kw} variant="outline" className="border-red-200 text-red-600 dark:border-red-800 dark:text-red-400">
                          + {kw}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">Add these keywords to your resume to improve match rate</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Suggestions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                Action Plan to Improve Score
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {result.suggestions.map((s, i) => (
                <div key={i} className={cn(
                  "flex items-start gap-3 p-3 rounded-xl",
                  s.priority === "high" ? "bg-red-500/5 border border-red-500/15" :
                    s.priority === "medium" ? "bg-yellow-500/5 border border-yellow-500/15" :
                      "bg-muted/40 border border-border/60"
                )}>
                  <Badge className={cn(
                    "text-[10px] font-bold flex-shrink-0 mt-0.5",
                    s.priority === "high" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                      s.priority === "medium" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" :
                        "bg-muted text-muted-foreground"
                  )}>
                    {s.priority.toUpperCase()}
                  </Badge>
                  <p className="text-sm text-muted-foreground">{s.text}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              onClick={handleReset}
              variant="outline"
              className="flex-1 h-12 font-bold"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Check Another Resume
            </Button>
            <Button
              onClick={() => {
                const text = `ATS Score: ${result.score}% (Grade: ${result.grade})\n\nPassed: ${passCount} | Warnings: ${warnCount} | Failed: ${failCount}\n\nMatched Keywords: ${result.matchedKeywords.join(", ")}\n\nMissing Keywords: ${result.missingKeywords.join(", ")}`
                navigator.clipboard.writeText(text)
                toast.success("Results copied to clipboard!")
              }}
              variant="outline"
              className="flex-1 h-12 font-bold"
            >
              <Download className="mr-2 h-4 w-4" />
              Copy Results
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
