"use client"

import { useState, useEffect } from "react"
import { Calculator, Landmark, Calendar, Percent, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(500000)
  const [interestRate, setInterestRate] = useState<number>(12.5)
  const [loanTenure, setLoanTenure] = useState<number>(5)
  const [emi, setEmi] = useState<number>(0)
  const [totalInterest, setTotalInterest] = useState<number>(0)
  const [totalPayment, setTotalPayment] = useState<number>(0)

  useEffect(() => {
    const principal = loanAmount
    const ratePerMonth = interestRate / (12 * 100)
    const months = loanTenure * 12

    const emiValue = 
      (principal * ratePerMonth * Math.pow(1 + ratePerMonth, months)) / 
      (Math.pow(1 + ratePerMonth, months) - 1)

    const totalPayable = emiValue * months
    const totalInt = totalPayable - principal

    setEmi(emiValue)
    setTotalInterest(totalInt)
    setTotalPayment(totalPayable)
  }, [loanAmount, interestRate, loanTenure])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-base">Loan Amount (PKR)</Label>
            <div className="relative">
              <Landmark className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                type="number" 
                className="pl-10 h-12" 
                value={loanAmount} 
                onChange={(e) => setLoanAmount(Number(e.target.value))} 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-base">Interest Rate (% P.A.)</Label>
            <div className="relative">
              <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                type="number" 
                className="pl-10 h-12" 
                value={interestRate} 
                onChange={(e) => setInterestRate(Number(e.target.value))} 
                step="0.1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-base">Loan Tenure (Years)</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                type="number" 
                className="pl-10 h-12" 
                value={loanTenure} 
                onChange={(e) => setLoanTenure(Number(e.target.value))} 
              />
            </div>
          </div>
        </div>

        <Card className="bg-primary/5 border-none shadow-none">
          <CardContent className="p-6">
            <h4 className="font-bold mb-4 flex items-center gap-2">
              <Calculator className="h-4 w-4" /> Why this matters?
            </h4>
            <p className="text-sm text-muted-foreground">
              Understanding your EMI helps you plan your monthly budget and choose the right loan amount for your financial situation.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-8">
        <div className="text-center p-8 bg-primary text-primary-foreground rounded-3xl shadow-xl space-y-2">
          <p className="text-primary-foreground/80 uppercase tracking-widest text-xs font-bold">Monthly EMI</p>
          <h3 className="text-4xl md:text-5xl font-black">{formatCurrency(emi)}</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-6 space-y-1">
              <p className="text-sm text-muted-foreground">Total Interest</p>
              <p className="text-xl font-bold">{formatCurrency(totalInterest)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 space-y-1">
              <p className="text-sm text-muted-foreground">Total Payment</p>
              <p className="text-xl font-bold">{formatCurrency(totalPayment)}</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h4 className="font-bold">Breakdown</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" /> Principal Amount
              </span>
              <span className="font-medium">{formatCurrency(loanAmount)}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center text-sm">
              <span className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-400" /> Total Interest
              </span>
              <span className="font-medium">{formatCurrency(totalInterest)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
