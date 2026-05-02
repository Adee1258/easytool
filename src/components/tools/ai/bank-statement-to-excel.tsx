"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import {
  Table, Upload, Download, FileText, Info,
  CheckCircle2, Loader2, AlertCircle, Eye,
  TrendingUp, TrendingDown, DollarSign, RefreshCw
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

// ── Types ──────────────────────────────────────────────────────────────────
interface Transaction {
  date: string
  description: string
  debit: string
  credit: string
  balance: string
  type: "debit" | "credit" | "unknown"
}

// ── PDF Text Extractor ─────────────────────────────────────────────────────
async function extractPDFText(file: File): Promise<string> {
  const buffer = await file.arrayBuffer()
  const bytes = new Uint8Array(buffer)
  const raw = new TextDecoder("latin1").decode(bytes)

  const chunks: string[] = []

  // Method 1: BT/ET blocks
  const btEtRegex = /BT([\s\S]*?)ET/g
  let m
  while ((m = btEtRegex.exec(raw)) !== null) {
    const block = m[1]
    const strRegex = /\(([^)\\]|\\.)*\)/g
    let sm
    while ((sm = strRegex.exec(block)) !== null) {
      const s = sm[0].slice(1, -1)
        .replace(/\\n/g, "\n").replace(/\\r/g, " ")
        .replace(/\\t/g, " ").replace(/\\\\/g, "\\")
        .replace(/\\([0-7]{3})/g, (_, o) => String.fromCharCode(parseInt(o, 8)))
        .replace(/\\(.)/g, "$1")
      if (s.trim()) chunks.push(s)
    }
  }

  // Method 2: TJ arrays
  const tjRegex = /\[((?:[^[\]]*|\[[^\]]*\])*)\]\s*TJ/g
  while ((m = tjRegex.exec(raw)) !== null) {
    const inner = m[1].replace(/\(([^)]*)\)/g, "$1").replace(/-?\d+/g, " ")
    if (inner.trim()) chunks.push(inner)
  }

  // Method 3: Tj single strings
  const tjSingle = /\(([^)]{2,})\)\s*Tj/g
  while ((m = tjSingle.exec(raw)) !== null) {
    if (m[1].trim()) chunks.push(m[1])
  }

  return chunks.join(" ").replace(/\s{2,}/g, " ").trim()
}

// ── Image OCR ─────────────────────────────────────────────────────────────
async function extractImageText(
  file: File,
  onProgress: (p: number) => void
): Promise<string> {
  const { createWorker } = await import("tesseract.js")
  const worker = await createWorker("eng", 1, {
    logger: (msg: any) => {
      if (msg.status === "recognizing text") {
        onProgress(Math.round(msg.progress * 100))
      }
    },
  })
  const url = URL.createObjectURL(file)
  const { data: { text } } = await worker.recognize(url)
  await worker.terminate()
  URL.revokeObjectURL(url)
  return text
}

// ── Smart Transaction Parser ───────────────────────────────────────────────
function parseTransactions(text: string): Transaction[] {
  const lines = text.split(/\n|\r\n|\r/).map(l => l.trim()).filter(Boolean)
  const transactions: Transaction[] = []

  // Date patterns - worldwide formats
  const datePatterns = [
    // DD/MM/YYYY or MM/DD/YYYY or YYYY/MM/DD
    /\b(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4})\b/,
    /\b(\d{4}[\/\-\.]\d{1,2}[\/\-\.]\d{1,2})\b/,
    // DD Mon YYYY or Mon DD, YYYY
    /\b(\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+\d{2,4})\b/i,
    /\b((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+\d{1,2},?\s+\d{2,4})\b/i,
    // DD-Mon-YY (common in UK/AU banks)
    /\b(\d{1,2}-(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-\d{2,4})\b/i,
    // YYYYMMDD (ISO format)
    /\b(20\d{2}[01]\d[0-3]\d)\b/,
  ]

  // Amount pattern - handles $1,234.56 £1,234.56 ₹1,234.56 etc
  const amountPattern = /(?:[$£€₹₨¥₩]?\s*)?(\d{1,3}(?:[,\.]\d{3})*(?:[,\.]\d{1,2})?|\d+[,\.]\d{1,2})\b/g

  // Keywords for debit/credit detection - worldwide
  const debitKeywords = /\b(withdraw|debit|dr\.?|payment|purchase|transfer out|atm|pos|fee|charge|bill|emi|sent|paid|buy|bought|spent|outgoing|outward|deducted|minus|chq|cheque|check)\b/i
  const creditKeywords = /\b(deposit|credit|cr\.?|salary|received|transfer in|refund|cashback|interest|dividend|incoming|inward|added|plus|neft|rtgs|imps|upi|wire|direct deposit|payroll)\b/i

  for (const line of lines) {
    // Skip header/footer lines
    if (/^(date|description|narration|particulars|debit|credit|balance|amount|transaction|sr\.?\s*no|#|ref|opening|closing|statement|account|page|total|subtotal)/i.test(line)) continue
    if (line.length < 8 || /^[-=*_]{3,}$/.test(line)) continue

    // Find date
    let date = ""
    for (const pattern of datePatterns) {
      const m = line.match(pattern)
      if (m) { date = m[1]; break }
    }
    if (!date) continue

    // Find all amounts (strip currency symbols first)
    const cleanLine = line.replace(/[$£€₹₨¥₩]/g, "")
    const amounts = [...cleanLine.matchAll(amountPattern)]
      .map(m => m[1])
      .filter(a => a && parseFloat(a.replace(/[,]/g, "")) > 0)
    if (amounts.length === 0) continue

    // Clean description
    let desc = line
    for (const pattern of datePatterns) desc = desc.replace(pattern, "")
    desc = desc
      .replace(/[$£€₹₨¥₩]/g, "")
      .replace(amountPattern, "")
      .replace(/\s{2,}/g, " ")
      .replace(/^[-|,\s]+|[-|,\s]+$/g, "")
      .trim()
    if (!desc || desc.length < 2) desc = "Transaction"

    // Determine type
    let type: Transaction["type"] = "unknown"
    let debit = "", credit = "", balance = ""

    if (debitKeywords.test(line)) {
      type = "debit"
      debit = amounts[0] || ""
      balance = amounts[amounts.length - 1] || ""
    } else if (creditKeywords.test(line)) {
      type = "credit"
      credit = amounts[0] || ""
      balance = amounts[amounts.length - 1] || ""
    } else if (amounts.length >= 3) {
      debit = amounts[0]
      credit = amounts[1]
      balance = amounts[2]
      type = parseFloat(amounts[0].replace(/,/g, "")) > 0 ? "debit" : "credit"
    } else if (amounts.length === 2) {
      debit = amounts[0]
      balance = amounts[1]
      type = "debit"
    } else {
      debit = amounts[0]
      type = "debit"
    }

    transactions.push({
      date,
      description: desc.substring(0, 80),
      debit,
      credit,
      balance,
      type
    })
  }

  return transactions
}

// ── CSV Generator ──────────────────────────────────────────────────────────
function generateCSV(transactions: Transaction[]): string {
  const headers = ["Date", "Description", "Debit (Dr)", "Credit (Cr)", "Balance", "Type"]
  const rows = transactions.map(t => [
    t.date, t.description, t.debit, t.credit, t.balance, t.type.toUpperCase()
  ])
  return [headers, ...rows]
    .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    .join("\n")
}

// ── Summary Calculator ─────────────────────────────────────────────────────
function calcSummary(transactions: Transaction[]) {
  let totalDebit = 0, totalCredit = 0
  transactions.forEach(t => {
    const d = parseFloat(t.debit.replace(/,/g, "")) || 0
    const c = parseFloat(t.credit.replace(/,/g, "")) || 0
    totalDebit += d
    totalCredit += c
  })
  return { totalDebit, totalCredit, net: totalCredit - totalDebit }
}

function fmt(n: number) {
  return n.toLocaleString("en-PK", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

// ── Component ──────────────────────────────────────────────────────────────
export default function BankStatementConverter() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [ocrProgress, setOcrProgress] = useState(0)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [csvData, setCsvData] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [extractedText, setExtractedText] = useState("")

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0])
    setTransactions([])
    setCsvData(null)
    setExtractedText("")
    setOcrProgress(0)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "text/plain": [".txt"],
      "image/*": [".jpg", ".jpeg", ".png", ".webp"],
      "text/csv": [".csv"],
    },
    multiple: false,
    maxSize: 20 * 1024 * 1024,
  })

  const handleConvert = async () => {
    if (!file) return
    setLoading(true)
    setOcrProgress(0)

    try {
      let text = ""
      const ext = file.name.split(".").pop()?.toLowerCase()

      if (ext === "pdf") {
        toast.info("Extracting text from PDF...")
        text = await extractPDFText(file)
        if (text.length < 30) {
          // Scanned PDF - try OCR
          toast.info("PDF appears to be scanned. Running OCR...")
          text = await extractImageText(file, (p) => setOcrProgress(p))
        }
      } else if (["jpg", "jpeg", "png", "webp"].includes(ext || "")) {
        toast.info("Scanning image with OCR...")
        text = await extractImageText(file, (p) => setOcrProgress(p))
      } else if (ext === "txt" || ext === "csv") {
        text = await file.text()
      }

      setExtractedText(text)
      const parsed = parseTransactions(text)

      if (parsed.length === 0) {
        toast.error("No transactions found. The file format may not be supported. Try a text-based PDF or TXT export.")
        setLoading(false)
        return
      }

      const csv = generateCSV(parsed)
      setTransactions(parsed)
      setCsvData(csv)
      toast.success(`✅ ${parsed.length} transactions extracted!`)
    } catch (err: any) {
      toast.error(err.message || "Conversion failed. Please try a different file.")
    } finally {
      setLoading(false)
      setOcrProgress(0)
    }
  }

  const downloadCSV = () => {
    if (!csvData) return
    const bom = "\uFEFF" // UTF-8 BOM for Excel
    const blob = new Blob([bom + csvData], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `bank-statement-${file?.name.replace(/\.[^.]+$/, "")}-${Date.now()}.csv`
    link.click()
    URL.revokeObjectURL(url)
    toast.success("CSV downloaded! Open in Excel or Google Sheets.")
  }

  const summary = transactions.length > 0 ? calcSummary(transactions) : null

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* Upload */}
      {!file ? (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all",
            isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/30"
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center">
              <Table className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">Upload Bank Statement</h3>
              <p className="text-muted-foreground text-sm">PDF, Image (JPG/PNG), TXT, or CSV</p>
            </div>
            <Button size="lg" className="px-8 h-12 font-bold bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/25" type="button">
              <Upload className="mr-2 h-5 w-5" /> Choose File
            </Button>
            <div className="flex gap-2 flex-wrap justify-center">
              {[
                { l: "PDF", c: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" },
                { l: "JPG/PNG", c: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" },
                { l: "TXT", c: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
                { l: "CSV", c: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
              ].map(f => <Badge key={f.l} className={cn("text-xs", f.c)}>{f.l}</Badge>)}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          {/* File Info */}
          <Card className="border-2 border-border">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold truncate">{file.name}</p>
                  <p className="text-sm text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => { setFile(null); setTransactions([]); setCsvData(null) }}>
                  Change
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Convert Button */}
          {!csvData && (
            <div className="space-y-3">
              <Button
                onClick={handleConvert}
                className="w-full h-14 text-lg font-bold bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/25"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    {ocrProgress > 0 ? `OCR Scanning... ${ocrProgress}%` : "Extracting transactions..."}
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Table className="h-5 w-5" />
                    Convert to Excel/CSV
                  </span>
                )}
              </Button>

              {/* OCR Progress */}
              {loading && ocrProgress > 0 && (
                <div className="space-y-1.5">
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full transition-all duration-300" style={{ width: `${ocrProgress}%` }} />
                  </div>
                  <p className="text-xs text-center text-muted-foreground">Scanning image... {ocrProgress}%</p>
                </div>
              )}
            </div>
          )}

          {/* Results */}
          {csvData && transactions.length > 0 && (
            <div className="space-y-4 animate-in fade-in duration-500">
              {/* Success */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-green-500/8 border border-green-500/20">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-bold text-sm text-green-700 dark:text-green-400">
                    {transactions.length} transactions extracted successfully!
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-500">Ready to download as Excel-compatible CSV</p>
                </div>
              </div>

              {/* Summary Cards */}
              {summary && (
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-4 rounded-xl bg-red-500/8 border border-red-500/15 text-center">
                    <TrendingDown className="h-5 w-5 text-red-500 mx-auto mb-1" />
                    <p className="text-lg font-black text-red-600">{fmt(summary.totalDebit)}</p>
                    <p className="text-xs text-muted-foreground">Total Debit</p>
                  </div>
                  <div className="p-4 rounded-xl bg-green-500/8 border border-green-500/15 text-center">
                    <TrendingUp className="h-5 w-5 text-green-500 mx-auto mb-1" />
                    <p className="text-lg font-black text-green-600">{fmt(summary.totalCredit)}</p>
                    <p className="text-xs text-muted-foreground">Total Credit</p>
                  </div>
                  <div className={cn(
                    "p-4 rounded-xl border text-center",
                    summary.net >= 0 ? "bg-blue-500/8 border-blue-500/15" : "bg-orange-500/8 border-orange-500/15"
                  )}>
                    <DollarSign className={cn("h-5 w-5 mx-auto mb-1", summary.net >= 0 ? "text-blue-500" : "text-orange-500")} />
                    <p className={cn("text-lg font-black", summary.net >= 0 ? "text-blue-600" : "text-orange-600")}>
                      {fmt(Math.abs(summary.net))}
                    </p>
                    <p className="text-xs text-muted-foreground">Net {summary.net >= 0 ? "Surplus" : "Deficit"}</p>
                  </div>
                </div>
              )}

              {/* Preview Toggle */}
              <Button
                variant="outline"
                className="w-full h-10 font-semibold"
                onClick={() => setShowPreview(!showPreview)}
              >
                <Eye className="mr-2 h-4 w-4" />
                {showPreview ? "Hide" : "Preview"} Transactions ({transactions.length})
              </Button>

              {/* Preview Table */}
              {showPreview && (
                <div className="rounded-xl border border-border overflow-hidden">
                  <div className="overflow-x-auto max-h-72">
                    <table className="w-full text-xs">
                      <thead className="bg-muted/70 sticky top-0">
                        <tr>
                          {["Date", "Description", "Debit", "Credit", "Balance", "Type"].map(h => (
                            <th key={h} className="px-3 py-2 text-left font-bold text-muted-foreground whitespace-nowrap">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.slice(0, 50).map((t, i) => (
                          <tr key={i} className={cn("border-t border-border/50", i % 2 === 0 ? "bg-background" : "bg-muted/20")}>
                            <td className="px-3 py-2 whitespace-nowrap font-medium">{t.date}</td>
                            <td className="px-3 py-2 max-w-[200px] truncate">{t.description}</td>
                            <td className="px-3 py-2 text-red-600 font-medium whitespace-nowrap">{t.debit}</td>
                            <td className="px-3 py-2 text-green-600 font-medium whitespace-nowrap">{t.credit}</td>
                            <td className="px-3 py-2 whitespace-nowrap">{t.balance}</td>
                            <td className="px-3 py-2">
                              <Badge className={cn("text-[10px]",
                                t.type === "debit" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                                  t.type === "credit" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                                    "bg-muted text-muted-foreground"
                              )}>
                                {t.type.toUpperCase()}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {transactions.length > 50 && (
                      <p className="text-xs text-center text-muted-foreground p-3">
                        Showing 50 of {transactions.length} transactions. Download CSV for all.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Download */}
              <Button
                onClick={downloadCSV}
                className="w-full h-14 text-lg font-bold bg-green-600 hover:bg-green-700 shadow-xl shadow-green-600/25"
              >
                <Download className="mr-3 h-6 w-6" />
                Download Excel CSV ({transactions.length} rows)
              </Button>

              <Button
                variant="outline"
                className="w-full h-10 font-semibold"
                onClick={() => { setFile(null); setTransactions([]); setCsvData(null) }}
              >
                <RefreshCw className="mr-2 h-4 w-4" /> Convert Another Statement
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Tips */}
      <Card className="bg-blue-500/5 border-blue-500/20">
        <CardContent className="p-5">
          <h4 className="font-bold text-sm mb-3 flex items-center gap-2 text-blue-700 dark:text-blue-400">
            <Info className="h-4 w-4" /> Tips for Best Results
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-muted-foreground">
            {[
              "✅ Text-based PDFs work best (not scanned)",
              "✅ Export statement as PDF from your bank app",
              "✅ JPG/PNG screenshots also supported (OCR)",
              "✅ TXT/CSV exports from internet banking",
              "🌍 Works with banks worldwide — US, UK, UAE, PK, IN & more",
              "📊 Opens directly in Excel & Google Sheets",
            ].map((tip, i) => (
              <p key={i}>{tip}</p>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
