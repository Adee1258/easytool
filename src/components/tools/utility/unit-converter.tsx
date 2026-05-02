"use client"

import { useState, useEffect } from "react"
import { RefreshCw, ArrowRightLeft, Ruler, Weight, Pipette, Thermometer, Gauge, HardDrive } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

const units: Record<string, any> = {
  length: {
    icon: Ruler,
    units: {
      meters: 1,
      kilometers: 0.001,
      centimeters: 100,
      millimeters: 1000,
      inches: 39.3701,
      feet: 3.28084,
      yards: 1.09361,
      miles: 0.000621371,
    }
  },
  weight: {
    icon: Weight,
    units: {
      kilograms: 1,
      grams: 1000,
      milligrams: 1000000,
      pounds: 2.20462,
      ounces: 35.274,
      tons: 0.001,
    }
  },
  temperature: {
    icon: Thermometer,
    units: {
      celsius: "C",
      fahrenheit: "F",
      kelvin: "K",
    }
  },
  data: {
    icon: HardDrive,
    units: {
      bytes: 1,
      kilobytes: 1 / 1024,
      megabytes: 1 / (1024 ** 2),
      gigabytes: 1 / (1024 ** 3),
      terabytes: 1 / (1024 ** 4),
    }
  }
}

export default function UnitConverter() {
  const [category, setCategory] = useState("length")
  const [fromUnit, setFromUnit] = useState("meters")
  const [toUnit, setToUnit] = useState("kilometers")
  const [fromValue, setFromValue] = useState("1")
  const [toValue, setToValue] = useState("")

  const convert = () => {
    const val = parseFloat(fromValue)
    if (isNaN(val)) return

    if (category === "temperature") {
      let result = 0
      if (fromUnit === "celsius") {
        if (toUnit === "fahrenheit") result = (val * 9/5) + 32
        else if (toUnit === "kelvin") result = val + 273.15
        else result = val
      } else if (fromUnit === "fahrenheit") {
        if (toUnit === "celsius") result = (val - 32) * 5/9
        else if (toUnit === "kelvin") result = (val - 32) * 5/9 + 273.15
        else result = val
      } else if (fromUnit === "kelvin") {
        if (toUnit === "celsius") result = val - 273.15
        else if (toUnit === "fahrenheit") result = (val - 273.15) * 9/5 + 32
        else result = val
      }
      setToValue(result.toFixed(4).replace(/\.?0+$/, ""))
    } else {
      const baseValue = val / units[category].units[fromUnit]
      const result = baseValue * units[category].units[toUnit]
      setToValue(result.toFixed(8).replace(/\.?0+$/, ""))
    }
  }

  useEffect(() => {
    convert()
  }, [fromValue, fromUnit, toUnit, category])

  const swapUnits = () => {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Tabs value={category} onValueChange={(val) => {
        setCategory(val)
        const unitKeys = Object.keys(units[val].units)
        setFromUnit(unitKeys[0])
        setToUnit(unitKeys[1])
      }} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto p-1 bg-muted/50">
          {Object.entries(units).map(([key, data]) => {
            const Icon = data.icon
            return (
              <TabsTrigger key={key} value={key} className="py-3 gap-2">
                <Icon className="h-4 w-4" />
                <span className="capitalize">{key}</span>
              </TabsTrigger>
            )
          })}
        </TabsList>
      </Tabs>

      <Card className="border-2 border-primary/10 shadow-lg overflow-hidden">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-6 items-center">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>From</Label>
                <Select value={fromUnit} onValueChange={setFromUnit}>
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(units[category].units).map((u) => (
                      <SelectItem key={u} value={u} className="capitalize">{u}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Input
                type="number"
                value={fromValue}
                onChange={(e) => setFromValue(e.target.value)}
                className="h-16 text-2xl font-bold"
              />
            </div>

            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full mt-6 rotate-90 md:rotate-0"
              onClick={swapUnits}
            >
              <ArrowRightLeft className="h-6 w-6" />
            </Button>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>To</Label>
                <Select value={toUnit} onValueChange={setToUnit}>
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(units[category].units).map((u) => (
                      <SelectItem key={u} value={u} className="capitalize">{u}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Input
                readOnly
                value={toValue}
                className="h-16 text-2xl font-bold bg-muted/30"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <h4 className="font-bold mb-2">Popular Conversions</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <button onClick={() => { setCategory("length"); setFromUnit("miles"); setToUnit("kilometers") }} className="text-left hover:text-primary transition-colors">Miles to KM</button>
              <button onClick={() => { setCategory("weight"); setFromUnit("pounds"); setToUnit("kilograms") }} className="text-left hover:text-primary transition-colors">Lbs to KG</button>
              <button onClick={() => { setCategory("temperature"); setFromUnit("celsius"); setToUnit("fahrenheit") }} className="text-left hover:text-primary transition-colors">°C to °F</button>
              <button onClick={() => { setCategory("data"); setFromUnit("megabytes"); setToUnit("gigabytes") }} className="text-left hover:text-primary transition-colors">MB to GB</button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-secondary/5 border-secondary/20">
          <CardContent className="p-4">
            <h4 className="font-bold mb-2">Unit Details</h4>
            <p className="text-xs text-muted-foreground">
              Our {category} converter uses high-precision math to ensure accurate results. 
              Perfect for students, engineers, and everyday use.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
