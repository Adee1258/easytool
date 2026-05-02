"use client"

import { useState, useEffect } from "react"
import { ArrowLeftRight, Coins, RefreshCw, TrendingUp, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

const COMMON_CURRENCIES = [
  { code: "PKR", name: "Pakistani Rupee", symbol: "Rs" },
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ" },
  { code: "SAR", name: "Saudi Riyal", symbol: "﷼" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
]

// Mock exchange rates (relative to USD)
const MOCK_RATES: Record<string, number> = {
  USD: 1,
  PKR: 278.50,
  EUR: 0.92,
  GBP: 0.79,
  AED: 3.67,
  SAR: 3.75,
  CAD: 1.36,
  AUD: 1.51,
  CNY: 7.24,
  INR: 83.30,
}

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<number>(1)
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("PKR")
  const [result, setResult] = useState<number>(0)
  const [lastUpdated, setLastUpdated] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  const convert = () => {
    setIsLoading(true)
    setTimeout(() => {
      const fromRate = MOCK_RATES[fromCurrency]
      const toRate = MOCK_RATES[toCurrency]
      const converted = (amount / fromRate) * toRate
      setResult(converted)
      setLastUpdated(new Date().toLocaleTimeString())
      setIsLoading(false)
    }, 500)
  }

  useEffect(() => {
    convert()
  }, [fromCurrency, toCurrency])

  const swapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card className="border-2 border-primary/10 shadow-xl overflow-hidden">
        <div className="bg-primary p-6 text-primary-foreground">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <Coins className="h-6 w-6" /> Currency Converter
            </h3>
            {lastUpdated && (
              <p className="text-xs opacity-80 flex items-center gap-1">
                <RefreshCw className="h-3 w-3" /> Last updated: {lastUpdated}
              </p>
            )}
          </div>
        </div>
        <CardContent className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-end">
            <div className="md:col-span-2 space-y-2">
              <Label>Amount</Label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                className="h-12 text-lg font-bold"
              />
            </div>
            
            <div className="md:col-span-2 space-y-2">
              <Label>From</Label>
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {COMMON_CURRENCIES.map((c) => (
                    <SelectItem key={c.code} value={c.code}>
                      <span className="font-bold">{c.code}</span> - {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-center pb-1">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-10 w-10 hover:rotate-180 transition-transform duration-500"
                onClick={swapCurrencies}
              >
                <ArrowLeftRight className="h-5 w-5" />
              </Button>
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label>To</Label>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {COMMON_CURRENCIES.map((c) => (
                    <SelectItem key={c.code} value={c.code}>
                      <span className="font-bold">{c.code}</span> - {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="pt-8 border-t text-center space-y-4">
            <div className="space-y-1">
              <p className="text-muted-foreground font-medium">
                {amount} {COMMON_CURRENCIES.find(c => c.code === fromCurrency)?.name} =
              </p>
              <h2 className="text-5xl font-black text-primary break-all">
                {isLoading ? "..." : `${result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${toCurrency}`}
              </h2>
            </div>
            <Button onClick={convert} disabled={isLoading} className="gap-2">
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} /> 
              Get Latest Rates
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6 space-y-4">
            <h4 className="font-bold flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" /> Popular PKR Pairs
            </h4>
            <div className="space-y-3">
              {[
                { pair: "USD/PKR", rate: MOCK_RATES.PKR },
                { pair: "EUR/PKR", rate: MOCK_RATES.PKR / MOCK_RATES.EUR },
                { pair: "GBP/PKR", rate: MOCK_RATES.PKR / MOCK_RATES.GBP },
                { pair: "AED/PKR", rate: MOCK_RATES.PKR / MOCK_RATES.AED },
              ].map((item) => (
                <div key={item.pair} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="font-semibold">{item.pair}</span>
                  <span className="font-mono">{item.rate.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50/50 border-blue-100">
          <CardContent className="p-6 space-y-4">
            <h4 className="font-bold flex items-center gap-2 text-blue-700">
              <Search className="h-5 w-5" /> Why use our converter?
            </h4>
            <ul className="space-y-2 text-sm text-blue-800/80">
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-400 mt-1.5" />
                Real-time mock rates for demonstration
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-400 mt-1.5" />
                Supports 10+ major global currencies
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-400 mt-1.5" />
                Completely free and private
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-400 mt-1.5" />
                Optimized for PKR (Pakistani Rupee) conversions
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
