"use client"

import { useState, useEffect } from "react"
import { Percent, Calculator, ArrowRight, Info, TrendingUp, TrendingDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PercentageCalculator() {
  // Mode 1: What is X% of Y?
  const [val1_X, setVal1_X] = useState<number>(10)
  const [val1_Y, setVal1_Y] = useState<number>(100)
  const [res1, setRes1] = useState<number>(0)

  // Mode 2: X is what % of Y?
  const [val2_X, setVal2_X] = useState<number>(20)
  const [val2_Y, setVal2_Y] = useState<number>(200)
  const [res2, setRes2] = useState<number>(0)

  // Mode 3: % Increase/Decrease from X to Y
  const [val3_X, setVal3_X] = useState<number>(100)
  const [val3_Y, setVal3_Y] = useState<number>(150)
  const [res3, setRes3] = useState<number>(0)

  useEffect(() => {
    setRes1((val1_X / 100) * val1_Y)
    setRes2((val2_X / val2_Y) * 100)
    setRes3(((val3_Y - val3_X) / val3_X) * 100)
  }, [val1_X, val1_Y, val2_X, val2_Y, val3_X, val3_Y])

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Percent className="h-8 w-8 text-primary" /> Percentage Calculator
        </h2>
        <p className="text-muted-foreground">Quickly calculate percentages, growth rates, and more.</p>
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-14 rounded-2xl bg-muted/50 p-1">
          <TabsTrigger value="basic" className="rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-sm">Basic %</TabsTrigger>
          <TabsTrigger value="inverse" className="rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-sm">X is what % of Y</TabsTrigger>
          <TabsTrigger value="growth" className="rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-sm">Growth/Decay</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="mt-6">
          <Card className="border-2 border-primary/10 shadow-lg">
            <CardContent className="p-8 space-y-8">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <div className="space-y-2 w-full md:w-32">
                  <Label>Percentage (%)</Label>
                  <Input type="number" value={val1_X} onChange={(e) => setVal1_X(Number(e.target.value))} className="h-12 text-center text-lg font-bold" />
                </div>
                <span className="text-xl font-bold mt-6">of</span>
                <div className="space-y-2 w-full md:w-48">
                  <Label>Total Value</Label>
                  <Input type="number" value={val1_Y} onChange={(e) => setVal1_Y(Number(e.target.value))} className="h-12 text-center text-lg font-bold" />
                </div>
                <ArrowRight className="h-8 w-8 text-primary hidden md:block mt-6" />
                <div className="space-y-2 w-full md:w-48">
                  <Label>Result</Label>
                  <div className="h-12 flex items-center justify-center bg-primary text-primary-foreground rounded-xl text-xl font-black">
                    {res1.toFixed(2)}
                  </div>
                </div>
              </div>
              <p className="text-center text-sm text-muted-foreground italic">
                Formula: ({val1_X} / 100) × {val1_Y} = {res1.toFixed(2)}
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inverse" className="mt-6">
          <Card className="border-2 border-primary/10 shadow-lg">
            <CardContent className="p-8 space-y-8">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <div className="space-y-2 w-full md:w-32">
                  <Label>Value X</Label>
                  <Input type="number" value={val2_X} onChange={(e) => setVal2_X(Number(e.target.value))} className="h-12 text-center text-lg font-bold" />
                </div>
                <span className="text-xl font-bold mt-6">is what % of</span>
                <div className="space-y-2 w-full md:w-48">
                  <Label>Total Value Y</Label>
                  <Input type="number" value={val2_Y} onChange={(e) => setVal2_Y(Number(e.target.value))} className="h-12 text-center text-lg font-bold" />
                </div>
                <ArrowRight className="h-8 w-8 text-primary hidden md:block mt-6" />
                <div className="space-y-2 w-full md:w-48">
                  <Label>Result (%)</Label>
                  <div className="h-12 flex items-center justify-center bg-primary text-primary-foreground rounded-xl text-xl font-black">
                    {res2.toFixed(2)}%
                  </div>
                </div>
              </div>
              <p className="text-center text-sm text-muted-foreground italic">
                Formula: ({val2_X} / {val2_Y}) × 100 = {res2.toFixed(2)}%
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="growth" className="mt-6">
          <Card className="border-2 border-primary/10 shadow-lg">
            <CardContent className="p-8 space-y-8">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <div className="space-y-2 w-full md:w-48">
                  <Label>Initial Value</Label>
                  <Input type="number" value={val3_X} onChange={(e) => setVal3_X(Number(e.target.value))} className="h-12 text-center text-lg font-bold" />
                </div>
                <span className="text-xl font-bold mt-6">to</span>
                <div className="space-y-2 w-full md:w-48">
                  <Label>New Value</Label>
                  <Input type="number" value={val3_Y} onChange={(e) => setVal3_Y(Number(e.target.value))} className="h-12 text-center text-lg font-bold" />
                </div>
                <ArrowRight className="h-8 w-8 text-primary hidden md:block mt-6" />
                <div className="space-y-2 w-full md:w-48">
                  <Label>Change (%)</Label>
                  <div className={`h-12 flex items-center justify-center rounded-xl text-xl font-black text-white ${res3 >= 0 ? 'bg-green-600' : 'bg-red-600'}`}>
                    {res3 >= 0 ? <TrendingUp className="h-5 w-5 mr-2" /> : <TrendingDown className="h-5 w-5 mr-2" />}
                    {Math.abs(res3).toFixed(2)}%
                  </div>
                </div>
              </div>
              <p className="text-center text-sm text-muted-foreground italic">
                Formula: (({val3_Y} - {val3_X}) / {val3_X}) × 100 = {res3.toFixed(2)}%
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-muted/50 space-y-3">
          <h4 className="font-bold flex items-center gap-2">
            <Calculator className="h-4 w-4 text-primary" /> Tips for Growth
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Use the Growth tab to calculate discounts (initial price vs final price) or salary hikes. A positive result indicates an increase, while a negative one shows a decrease.
          </p>
        </div>
        <div className="p-6 rounded-3xl bg-muted/50 space-y-3">
          <h4 className="font-bold flex items-center gap-2">
            <Info className="h-4 w-4 text-primary" /> Why use this?
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            From business reports to shopping math, percentage calculations are everywhere. This tool saves time and ensures accuracy without manual division.
          </p>
        </div>
      </div>
    </div>
  )
}
