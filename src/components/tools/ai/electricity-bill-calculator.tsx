"use client"

import { useState } from "react"
import { Zap, Calculator, Info, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Pakistan NEPRA slab rates (approximate 2024)
const SLAB_RATES = [
  { upTo: 50, rate: 3.95, label: "0–50 units" },
  { upTo: 100, rate: 7.74, label: "51–100 units" },
  { upTo: 200, rate: 10.06, label: "101–200 units" },
  { upTo: 300, rate: 12.15, label: "201–300 units" },
  { upTo: 400, rate: 17.59, label: "301–400 units" },
  { upTo: 500, rate: 20.19, label: "401–500 units" },
  { upTo: 600, rate: 22.65, label: "501–600 units" },
  { upTo: 700, rate: 25.19, label: "601–700 units" },
  { upTo: Infinity, rate: 26.40, label: "700+ units" },
]

const FC_CHARGE = 75 // Fixed charges PKR
const METER_RENT = 35 // PKR
const TV_FEE = 35 // PKR
const NJ_SURCHARGE_RATE = 0.10 // 10%
const GST_RATE = 0.18 // 18%

function calculateBill(units: number) {
  let energyCharges = 0
  let remaining = units
  let prev = 0

  for (const slab of SLAB_RATES) {
    if (remaining <= 0) break
    const slabUnits = Math.min(remaining, slab.upTo - prev)
    energyCharges += slabUnits * slab.rate
    remaining -= slabUnits
    prev = slab.upTo
  }

  const subtotal = energyCharges + FC_CHARGE + METER_RENT + TV_FEE
  const njSurcharge = subtotal * NJ_SURCHARGE_RATE
  const gst = (subtotal + njSurcharge) * GST_RATE
  const total = subtotal + njSurcharge + gst

  return {
    energyCharges: Math.round(energyCharges),
    fcCharge: FC_CHARGE,
    meterRent: METER_RENT,
    tvFee: TV_FEE,
    njSurcharge: Math.round(njSurcharge),
    gst: Math.round(gst),
    total: Math.round(total),
  }
}

export default function ElectricityBillCalculator() {
  const [units, setUnits] = useState("")
  const [result, setResult] = useState<ReturnType<typeof calculateBill> | null>(null)

  const handleCalculate = () => {
    const u = parseFloat(units)
    if (!u || u < 0) return
    setResult(calculateBill(u))
  }

  const getSlabInfo = (u: number) => {
    let prev = 0
    for (const slab of SLAB_RATES) {
      if (u <= slab.upTo) return `${slab.label} @ Rs ${slab.rate}/unit`
      prev = slab.upTo
    }
    return ""
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <Card className="border-2 border-primary/10">
        <CardHeader className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-t-xl">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="p-2 rounded-xl bg-yellow-500/20 text-yellow-600">
              <Zap className="h-6 w-6" />
            </div>
            Pakistan Electricity Bill Calculator
          </CardTitle>
          <p className="text-sm text-muted-foreground">Based on NEPRA 2024 slab rates</p>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="space-y-2">
            <Label className="text-base font-bold">Units Consumed (kWh)</Label>
            <div className="flex gap-3">
              <Input
                type="number"
                placeholder="e.g. 350"
                value={units}
                onChange={(e) => setUnits(e.target.value)}
                className="h-14 text-xl font-bold"
                min="0"
              />
              <Button onClick={handleCalculate} className="h-14 px-8 text-lg font-bold" disabled={!units}>
                <Calculator className="mr-2 h-5 w-5" /> Calculate
              </Button>
            </div>
            {units && parseFloat(units) > 0 && (
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Info className="h-3 w-3" /> {getSlabInfo(parseFloat(units))}
              </p>
            )}
          </div>

          {result && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-violet-500/5 border-2 border-primary/10 text-center">
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">Estimated Bill</p>
                <p className="text-6xl font-black text-primary">Rs {result.total.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground mt-2">for {units} units consumed</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Bill Breakdown</h4>
                {[
                  { label: "Energy Charges", value: result.energyCharges },
                  { label: "Fixed Charges", value: result.fcCharge },
                  { label: "Meter Rent", value: result.meterRent },
                  { label: "TV Fee", value: result.tvFee },
                  { label: "NJ Surcharge (10%)", value: result.njSurcharge },
                  { label: "GST (18%)", value: result.gst },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-center p-3 rounded-xl bg-muted/50">
                    <span className="text-sm font-medium">{item.label}</span>
                    <span className="font-bold">Rs {item.value.toLocaleString()}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center p-4 rounded-xl bg-primary text-primary-foreground font-black text-lg">
                  <span>Total Payable</span>
                  <span>Rs {result.total.toLocaleString()}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                <p className="text-xs text-blue-700 dark:text-blue-300 flex items-start gap-2">
                  <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  This is an estimate based on NEPRA 2024 rates. Actual bill may vary by DISCO (LESCO, KESC, MEPCO etc.) and additional surcharges.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h4 className="font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" /> NEPRA Slab Rates 2024
          </h4>
          <div className="space-y-2">
            {SLAB_RATES.filter(s => s.upTo !== Infinity).map((slab) => (
              <div key={slab.label} className="flex justify-between text-sm p-2 rounded-lg hover:bg-muted/50">
                <span className="text-muted-foreground">{slab.label}</span>
                <span className="font-bold">Rs {slab.rate}/unit</span>
              </div>
            ))}
            <div className="flex justify-between text-sm p-2 rounded-lg hover:bg-muted/50">
              <span className="text-muted-foreground">700+ units</span>
              <span className="font-bold">Rs 26.40/unit</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
