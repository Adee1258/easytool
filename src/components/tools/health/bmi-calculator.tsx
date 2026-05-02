"use client"

import { useState, useEffect } from "react"
import { Activity, Scale, Ruler, Info, AlertCircle, Heart } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function BMICalculator() {
  const [weight, setWeight] = useState<number>(70)
  const [height, setHeight] = useState<number>(170)
  const [bmi, setBmi] = useState<number>(0)
  const [category, setCategory] = useState("")
  const [color, setColor] = useState("")

  useEffect(() => {
    if (weight > 0 && height > 0) {
      const heightInMeters = height / 100
      const bmiValue = weight / (heightInMeters * heightInMeters)
      setBmi(bmiValue)

      if (bmiValue < 18.5) {
        setCategory("Underweight")
        setColor("text-blue-500")
      } else if (bmiValue >= 18.5 && bmiValue < 25) {
        setCategory("Normal Weight")
        setColor("text-green-500")
      } else if (bmiValue >= 25 && bmiValue < 30) {
        setCategory("Overweight")
        setColor("text-yellow-500")
      } else {
        setCategory("Obese")
        setColor("text-red-500")
      }
    }
  }, [weight, height])

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Activity className="h-8 w-8 text-primary" /> BMI Calculator
        </h2>
        <p className="text-muted-foreground">Calculate your Body Mass Index (BMI) to check your health status.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="border-2 border-primary/10 shadow-xl">
          <CardContent className="p-8 space-y-8">
            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="text-lg font-bold flex items-center gap-2">
                  <Scale className="h-5 w-5 text-primary" /> Weight (kg)
                </Label>
                <Input 
                  type="number" 
                  value={weight} 
                  onChange={(e) => setWeight(Number(e.target.value))} 
                  className="h-14 text-2xl font-black text-center border-2 focus:border-primary"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-lg font-bold flex items-center gap-2">
                  <Ruler className="h-5 w-5 text-primary" /> Height (cm)
                </Label>
                <Input 
                  type="number" 
                  value={height} 
                  onChange={(e) => setHeight(Number(e.target.value))} 
                  className="h-14 text-2xl font-black text-center border-2 focus:border-primary"
                />
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-muted/50 space-y-2 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Your BMI Score</p>
              <h3 className={`text-6xl font-black ${color}`}>{bmi.toFixed(1)}</h3>
              <p className={`text-xl font-bold ${color}`}>{category}</p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="bg-primary/5 border-none shadow-none">
            <CardContent className="p-8 space-y-6">
              <h3 className="font-bold text-xl flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" /> BMI Categories
              </h3>
              <div className="space-y-3">
                {[
                  { range: "< 18.5", label: "Underweight", c: "text-blue-500" },
                  { range: "18.5 - 24.9", label: "Normal weight", c: "text-green-500" },
                  { range: "25 - 29.9", label: "Overweight", c: "text-yellow-500" },
                  { range: "≥ 30", label: "Obese", c: "text-red-500" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-background border shadow-sm">
                    <span className="text-sm font-medium">{item.range}</span>
                    <span className={`text-sm font-bold ${item.c}`}>{item.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex items-start gap-4 p-6 rounded-3xl bg-yellow-500/5 border border-yellow-500/10">
            <AlertCircle className="h-6 w-6 text-yellow-600 shrink-0 mt-1" />
            <div className="space-y-1">
              <p className="font-bold text-sm">Medical Disclaimer</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                BMI is a simple index of weight-for-height that is commonly used to classify underweight, overweight and obesity in adults. It is not a diagnostic of the body fatness or health of an individual.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-6 rounded-3xl bg-green-500/5 border border-green-500/10">
            <Heart className="h-6 w-6 text-green-600 shrink-0 mt-1" />
            <div className="space-y-1">
              <p className="font-bold text-sm">Stay Healthy</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Combine regular exercise with a balanced diet to maintain a healthy BMI. Consult a professional for a detailed health assessment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
