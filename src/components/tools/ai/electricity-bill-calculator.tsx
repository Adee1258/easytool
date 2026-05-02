"use client"

import { useState } from "react"
import { Zap, Calculator, Info, TrendingUp, AlertCircle, Home, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// ── NEPRA Tariff 2024-25 (Updated) ────────────────────────────────────────
// Source: NEPRA Determination on Tariff Petition 2024
// These are the ACTUAL rates as per latest NEPRA notification

// Protected consumers (0-100 units) - Lifeline/Protected category
const PROTECTED_RATES = [
  { upTo: 50, rate: 3.95, label: "0–50 units (Protected)" },
  { upTo: 100, rate: 7.74, label: "51–100 units (Protected)" },
]

// Unprotected residential consumers (101+ units) - FLAT RATE per slab
// Important: Pakistan uses FLAT rate (not incremental) for unprotected consumers
// i.e., if you use 200 units, ALL 200 units are charged at 200-unit rate
const UNPROTECTED_SLABS = [
  { upTo: 100, rate: 16.00, label: "Up to 100 units" },
  { upTo: 200, rate: 22.00, label: "101–200 units" },
  { upTo: 300, rate: 28.00, label: "201–300 units" },
  { upTo: 400, rate: 35.00, label: "301–400 units" },
  { upTo: 500, rate: 40.00, label: "401–500 units" },
  { upTo: 600, rate: 43.00, label: "501–600 units" },
  { upTo: 700, rate: 46.00, label: "601–700 units" },
  { upTo: Infinity, rate: 50.00, label: "700+ units" },
]

// DISCO-specific fixed charges (per month)
const DISCO_CONFIG: Record<string, {
  name: string
  fc: number        // Fixed charges
  meterRent: number // Meter rent
  tvFee: number     // TV license fee
  njSurcharge: number // NJ surcharge rate
  gst: number       // GST rate
  fca: number       // Fuel Cost Adjustment (variable - approximate)
  qta: number       // Quarterly Tariff Adjustment
}> = {
  lesco: {
    name: "LESCO (Lahore)",
    fc: 75, meterRent: 35, tvFee: 35,
    njSurcharge: 0.10, gst: 0.18, fca: 3.50, qta: 1.20,
  },
  mepco: {
    name: "MEPCO (Multan)",
    fc: 75, meterRent: 35, tvFee: 35,
    njSurcharge: 0.10, gst: 0.18, fca: 3.50, qta: 1.20,
  },
  fesco: {
    name: "FESCO (Faisalabad)",
    fc: 75, meterRent: 35, tvFee: 35,
    njSurcharge: 0.10, gst: 0.18, fca: 3.50, qta: 1.20,
  },
  iesco: {
    name: "IESCO (Islamabad)",
    fc: 75, meterRent: 35, tvFee: 35,
    njSurcharge: 0.10, gst: 0.18, fca: 3.20, qta: 1.10,
  },
  pesco: {
    name: "PESCO (Peshawar)",
    fc: 75, meterRent: 35, tvFee: 35,
    njSurcharge: 0.10, gst: 0.18, fca: 3.50, qta: 1.20,
  },
  hesco: {
    name: "HESCO (Hyderabad)",
    fc: 75, meterRent: 35, tvFee: 35,
    njSurcharge: 0.10, gst: 0.18, fca: 3.80, qta: 1.30,
  },
  sepco: {
    name: "SEPCO (Sukkur)",
    fc: 75, meterRent: 35, tvFee: 35,
    njSurcharge: 0.10, gst: 0.18, fca: 3.80, qta: 1.30,
  },
  kesc: {
    name: "K-Electric (Karachi)",
    fc: 100, meterRent: 40, tvFee: 35,
    njSurcharge: 0.10, gst: 0.18, fca: 4.00, qta: 1.50,
  },
  qesco: {
    name: "QESCO (Quetta)",
    fc: 75, meterRent: 35, tvFee: 35,
    njSurcharge: 0.10, gst: 0.18, fca: 3.50, qta: 1.20,
  },
}

interface BillResult {
  energyCharges: number
  fcCharge: number
  meterRent: number
  tvFee: number
  fcaCharges: number
  qtaCharges: number
  subtotal: number
  njSurcharge: number
  gst: number
  total: number
  rateApplied: number
  category: string
  isProtected: boolean
}

function calculateBill(units: number, discoKey: string, consumerType: string): BillResult {
  const disco = DISCO_CONFIG[discoKey]
  const isProtected = units <= 100 && consumerType === "residential"

  let energyCharges = 0
  let rateApplied = 0
  let category = ""

  if (isProtected) {
    // Protected: incremental slab rates
    let remaining = units
    let prev = 0
    for (const slab of PROTECTED_RATES) {
      if (remaining <= 0) break
      const slabUnits = Math.min(remaining, slab.upTo - prev)
      energyCharges += slabUnits * slab.rate
      remaining -= slabUnits
      prev = slab.upTo
    }
    rateApplied = energyCharges / units
    category = "Protected Consumer (≤100 units)"
  } else {
    // Unprotected: FLAT rate on ALL units
    const slab = UNPROTECTED_SLABS.find(s => units <= s.upTo) || UNPROTECTED_SLABS[UNPROTECTED_SLABS.length - 1]
    rateApplied = slab.rate
    energyCharges = units * slab.rate
    category = consumerType === "commercial" ? "Commercial Consumer" : `Residential Unprotected (${slab.label})`
  }

  // FCA & QTA on energy charges
  const fcaCharges = Math.round(units * disco.fca)
  const qtaCharges = Math.round(units * disco.qta)

  const subtotal = Math.round(energyCharges) + disco.fc + disco.meterRent + disco.tvFee + fcaCharges + qtaCharges
  const njSurcharge = Math.round(subtotal * disco.njSurcharge)
  const gst = Math.round((subtotal + njSurcharge) * disco.gst)
  const total = subtotal + njSurcharge + gst

  return {
    energyCharges: Math.round(energyCharges),
    fcCharge: disco.fc,
    meterRent: disco.meterRent,
    tvFee: disco.tvFee,
    fcaCharges,
    qtaCharges,
    subtotal,
    njSurcharge,
    gst,
    total,
    rateApplied: Math.round(rateApplied * 100) / 100,
    category,
    isProtected,
  }
}

export default function ElectricityBillCalculator() {
  const [units, setUnits] = useState("")
  const [disco, setDisco] = useState("lesco")
  const [consumerType, setConsumerType] = useState("residential")
  const [result, setResult] = useState<BillResult | null>(null)

  const handleCalculate = () => {
    const u = parseFloat(units)
    if (!u || u <= 0) return
    setResult(calculateBill(u, disco, consumerType))
  }

  const u = parseFloat(units) || 0

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      {/* Input Card */}
      <Card className="border-2 border-amber-500/20">
        <CardHeader className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-t-xl pb-4">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-600">
              <Zap className="h-5 w-5" />
            </div>
            Pakistan Electricity Bill Calculator
          </CardTitle>
          <p className="text-xs text-muted-foreground">NEPRA 2024-25 Updated Rates</p>
        </CardHeader>
        <CardContent className="p-6 space-y-5">

          {/* Consumer Type */}
          <div className="space-y-2">
            <Label className="font-bold text-sm">Consumer Type</Label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: "residential", label: "Residential", icon: Home, desc: "Home / Apartment" },
                { id: "commercial", label: "Commercial", icon: Building2, desc: "Shop / Office" },
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setConsumerType(t.id)}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left",
                    consumerType === t.id
                      ? "border-amber-500 bg-amber-500/10"
                      : "border-border hover:border-amber-500/40"
                  )}
                >
                  <t.icon className={cn("h-5 w-5 flex-shrink-0", consumerType === t.id ? "text-amber-600" : "text-muted-foreground")} />
                  <div>
                    <p className="font-bold text-sm">{t.label}</p>
                    <p className="text-xs text-muted-foreground">{t.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* DISCO Selection */}
          <div className="space-y-2">
            <Label className="font-bold text-sm">Your DISCO (Electric Company)</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.entries(DISCO_CONFIG).map(([key, d]) => (
                <button
                  key={key}
                  onClick={() => setDisco(key)}
                  className={cn(
                    "p-2.5 rounded-xl border-2 text-xs font-semibold transition-all text-center",
                    disco === key
                      ? "border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-400"
                      : "border-border hover:border-amber-500/40 text-muted-foreground"
                  )}
                >
                  {d.name.split(" ")[0]}
                  <span className="block text-[10px] opacity-70">{d.name.split("(")[1]?.replace(")", "")}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Units Input */}
          <div className="space-y-2">
            <Label className="font-bold text-sm">Units Consumed (kWh)</Label>
            <div className="flex gap-3">
              <Input
                type="number"
                placeholder="e.g. 78"
                value={units}
                onChange={e => { setUnits(e.target.value); setResult(null) }}
                className="h-14 text-2xl font-black"
                min="0"
                max="9999"
              />
              <Button
                onClick={handleCalculate}
                className="h-14 px-6 font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/25"
                disabled={!units || u <= 0}
              >
                <Calculator className="mr-2 h-5 w-5" />
                Calculate
              </Button>
            </div>
            {u > 0 && (
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Info className="h-3 w-3" />
                {u <= 100 && consumerType === "residential"
                  ? `Protected consumer — incremental slab rates apply`
                  : `Unprotected — flat rate applies to ALL ${u} units`}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Result */}
      {result && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">

          {/* Total */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-2 border-amber-500/20 text-center">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Estimated Bill</p>
            <p className="text-6xl font-black text-amber-600">Rs {result.total.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground mt-2">
              {units} units · {DISCO_CONFIG[disco].name} · {result.category}
            </p>
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400 text-xs font-bold">
              <Zap className="h-3 w-3" />
              Avg rate: Rs {result.rateApplied}/unit
            </div>
          </div>

          {/* Breakdown */}
          <Card>
            <CardContent className="p-5 space-y-2">
              <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-3">Bill Breakdown</h4>
              {[
                { label: "Energy Charges", value: result.energyCharges, highlight: true },
                { label: "Fuel Cost Adjustment (FCA)", value: result.fcaCharges },
                { label: "Quarterly Tariff Adjustment (QTA)", value: result.qtaCharges },
                { label: "Fixed Charges (FC)", value: result.fcCharge },
                { label: "Meter Rent", value: result.meterRent },
                { label: "TV License Fee", value: result.tvFee },
                { label: "Subtotal", value: result.subtotal, divider: true },
                { label: "NJ Surcharge (10%)", value: result.njSurcharge },
                { label: "GST (18%)", value: result.gst },
              ].map((item, i) => (
                <div key={i}>
                  {item.divider && <div className="border-t border-border my-2" />}
                  <div className={cn(
                    "flex justify-between items-center p-2.5 rounded-lg",
                    item.highlight ? "bg-amber-500/8 border border-amber-500/15" : "hover:bg-muted/50"
                  )}>
                    <span className={cn("text-sm", item.highlight ? "font-bold" : "text-muted-foreground")}>{item.label}</span>
                    <span className={cn("font-bold text-sm", item.highlight ? "text-amber-700 dark:text-amber-400" : "")}>
                      Rs {item.value.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center p-4 rounded-xl bg-amber-500 text-white font-black text-lg mt-2">
                <span>Total Payable</span>
                <span>Rs {result.total.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-500/8 border border-blue-500/15">
            <AlertCircle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-blue-700 dark:text-blue-400">
              <strong>Note:</strong> This is an estimate. Actual bill includes variable FCA/QTA adjustments that change monthly.
              Your bill may differ by ±10-15%. For exact amount, check your DISCO's official app or website.
            </p>
          </div>
        </div>
      )}

      {/* Slab Rates Reference */}
      <Card>
        <CardContent className="p-5">
          <h4 className="font-bold mb-4 flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4 text-primary" />
            NEPRA 2024-25 Residential Rates
          </h4>
          <div className="space-y-1.5">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Protected (≤100 units) — Incremental</p>
            {PROTECTED_RATES.map(s => (
              <div key={s.label} className="flex justify-between text-xs p-2 rounded-lg bg-green-500/5 border border-green-500/10">
                <span className="text-muted-foreground">{s.label}</span>
                <span className="font-bold text-green-700 dark:text-green-400">Rs {s.rate}/unit</span>
              </div>
            ))}
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mt-3 mb-2">Unprotected (101+ units) — Flat Rate on ALL units</p>
            {UNPROTECTED_SLABS.filter(s => s.upTo !== Infinity).map(s => (
              <div key={s.label} className="flex justify-between text-xs p-2 rounded-lg hover:bg-muted/50">
                <span className="text-muted-foreground">{s.label}</span>
                <span className="font-bold">Rs {s.rate}/unit</span>
              </div>
            ))}
            <div className="flex justify-between text-xs p-2 rounded-lg hover:bg-muted/50">
              <span className="text-muted-foreground">700+ units</span>
              <span className="font-bold">Rs 50.00/unit</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
