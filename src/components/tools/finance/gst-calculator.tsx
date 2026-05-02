"use client"

import { useState, useEffect } from "react"
import { Calculator, RefreshCw, DollarSign, Percent, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function GSTCalculator() {
  const [amount, setAmount] = useState<number>(1000)
  const [gstRate, setGstRate] = useState<number>(18)
  const [type, setType] = useState<"exclusive" | "inclusive">("exclusive")
  const [gstAmount, setGstAmount] = useState<number>(0)
  const [totalAmount, setTotalAmount] = useState<number>(0)
  const [netAmount, setNetAmount] = useState<number>(0)

  useEffect(() => {
    if (type === "exclusive") {
      const calculatedGst = amount * (gstRate / 100)
      setGstAmount(calculatedGst)
      setTotalAmount(amount + calculatedGst)
      setNetAmount(amount)
    } else {
      const calculatedNet = amount / (1 + gstRate / 100)
      const calculatedGst = amount - calculatedNet
      setGstAmount(calculatedGst)
      setTotalAmount(amount)
      setNetAmount(calculatedNet)
    }
  }, [amount, gstRate, type])

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-4">
              <Label>Tax Calculation Type</Label>
              <RadioGroup value={type} onValueChange={(val: any) => setType(val)} className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="exclusive" id="exclusive" />
                  <Label htmlFor="exclusive" className="cursor-pointer">GST Exclusive</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="inclusive" id="inclusive" />
                  <Label htmlFor="inclusive" className="cursor-pointer">GST Inclusive</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" /> Amount
              </Label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Percent className="h-4 w-4" /> GST Rate (%)
              </Label>
              <div className="grid grid-cols-3 gap-2">
                {[5, 12, 18].map((rate) => (
                  <Button
                    key={rate}
                    variant={gstRate === rate ? "default" : "outline"}
                    onClick={() => setGstRate(rate)}
                    className="h-10"
                  >
                    {rate}%
                  </Button>
                ))}
              </div>
              <Input
                type="number"
                value={gstRate}
                onChange={(e) => setGstRate(parseFloat(e.target.value) || 0)}
                placeholder="Custom Rate"
                className="mt-2"
              />
            </div>

            <Button variant="outline" className="w-full gap-2" onClick={() => {
              setAmount(1000)
              setGstRate(18)
              setType("exclusive")
            }}>
              <RefreshCw className="h-4 w-4" /> Reset
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="bg-primary/5 border-primary/20 overflow-hidden">
            <div className="bg-primary p-4 text-primary-foreground">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Calculator className="h-5 w-5" /> Results
              </h3>
            </div>
            <CardContent className="p-8 space-y-6">
              <div className="flex justify-between items-center border-b pb-4">
                <span className="text-muted-foreground">Net Amount</span>
                <span className="text-2xl font-bold">{netAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center border-b pb-4">
                <span className="text-muted-foreground">GST Amount ({gstRate}%)</span>
                <span className="text-2xl font-bold text-primary">+{gstAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-bold">Total Amount</span>
                <span className="text-4xl font-black text-primary">{totalAmount.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 bg-blue-50/50">
            <CardContent className="p-4 flex gap-3 text-sm text-blue-700">
              <Info className="h-5 w-5 shrink-0" />
              <div>
                <p className="font-bold mb-1">Tax Info</p>
                <p>Standard GST in Pakistan is 18%. Some services may have different rates (e.g., 5% or 12%).</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
