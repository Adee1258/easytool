"use client"

import { useState, useEffect } from "react"
import { Tag, Calculator, RefreshCw, DollarSign, Percent } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export default function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState<number>(100)
  const [discountPercent, setDiscountPercent] = useState<number>(20)
  const [taxPercent, setTaxPercent] = useState<number>(0)
  const [savings, setSavings] = useState<number>(0)
  const [finalPrice, setFinalPrice] = useState<number>(0)

  useEffect(() => {
    const discountAmount = originalPrice * (discountPercent / 100)
    const priceAfterDiscount = originalPrice - discountAmount
    const taxAmount = priceAfterDiscount * (taxPercent / 100)
    
    setSavings(discountAmount)
    setFinalPrice(priceAfterDiscount + taxAmount)
  }, [originalPrice, discountPercent, taxPercent])

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" /> Original Price
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  type="number"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(parseFloat(e.target.value) || 0)}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Percent className="h-4 w-4" /> Discount Percentage
              </Label>
              <div className="relative">
                <Input
                  type="number"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(parseFloat(e.target.value) || 0)}
                  className="pr-8"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Calculator className="h-4 w-4" /> Sales Tax (Optional)
              </Label>
              <div className="relative">
                <Input
                  type="number"
                  value={taxPercent}
                  onChange={(e) => setTaxPercent(parseFloat(e.target.value) || 0)}
                  className="pr-8"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
              </div>
            </div>

            <Button variant="outline" className="w-full gap-2" onClick={() => {
              setOriginalPrice(100)
              setDiscountPercent(20)
              setTaxPercent(0)
            }}>
              <RefreshCw className="h-4 w-4" /> Reset
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="bg-primary/5 border-primary/20 overflow-hidden">
            <div className="bg-primary p-4 text-primary-foreground">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Tag className="h-5 w-5" /> Calculation Summary
              </h3>
            </div>
            <CardContent className="p-8 space-y-8 text-center">
              <div>
                <p className="text-muted-foreground mb-1">Final Price</p>
                <p className="text-5xl font-black text-primary">${finalPrice.toFixed(2)}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-background rounded-xl border">
                  <p className="text-sm text-muted-foreground mb-1">You Save</p>
                  <p className="text-2xl font-bold text-green-600">${savings.toFixed(2)}</p>
                </div>
                <div className="p-4 bg-background rounded-xl border">
                  <p className="text-sm text-muted-foreground mb-1">Original</p>
                  <p className="text-2xl font-bold">${originalPrice.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h4 className="font-bold mb-2">How it's calculated:</h4>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                <li>Discount Amount = Original Price × (Discount % / 100)</li>
                <li>Sale Price = Original Price - Discount Amount</li>
                <li>Final Price = Sale Price + (Sale Price × Tax % / 100)</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
