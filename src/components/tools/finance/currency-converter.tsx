"use client"

import { useState, useEffect, useMemo } from "react"
import { ArrowLeftRight, Coins, RefreshCw, TrendingUp, Search, Star, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

interface Currency {
  code: string
  name: string
  symbol: string
  flag: string
  country: string
}

const ALL_CURRENCIES: Currency[] = [
  { code: "PKR", name: "Pakistani Rupee", symbol: "Rs", flag: "🇵🇰", country: "Pakistan" },
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸", country: "United States" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺", country: "European Union" },
  { code: "GBP", name: "British Pound", symbol: "£", flag: "🇬🇧", country: "United Kingdom" },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ", flag: "🇦🇪", country: "United Arab Emirates" },
  { code: "SAR", name: "Saudi Riyal", symbol: "﷼", flag: "🇸🇦", country: "Saudi Arabia" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", flag: "🇨🇦", country: "Canada" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", flag: "🇦🇺", country: "Australia" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥", flag: "🇨🇳", country: "China" },
  { code: "INR", name: "Indian Rupee", symbol: "₹", flag: "🇮🇳", country: "India" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", flag: "🇯🇵", country: "Japan" },
  { code: "KRW", name: "South Korean Won", symbol: "₩", flag: "🇰🇷", country: "South Korea" },
  { code: "CHF", name: "Swiss Franc", symbol: "Fr", flag: "🇨🇭", country: "Switzerland" },
  { code: "SEK", name: "Swedish Krona", symbol: "kr", flag: "🇸🇪", country: "Sweden" },
  { code: "NOK", name: "Norwegian Krone", symbol: "kr", flag: "🇳🇴", country: "Norway" },
  { code: "DKK", name: "Danish Krone", symbol: "kr", flag: "🇩🇰", country: "Denmark" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$", flag: "🇸🇬", country: "Singapore" },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$", flag: "🇭🇰", country: "Hong Kong" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$", flag: "🇳🇿", country: "New Zealand" },
  { code: "MXN", name: "Mexican Peso", symbol: "$", flag: "🇲🇽", country: "Mexico" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$", flag: "🇧🇷", country: "Brazil" },
  { code: "RUB", name: "Russian Ruble", symbol: "₽", flag: "🇷🇺", country: "Russia" },
  { code: "ZAR", name: "South African Rand", symbol: "R", flag: "🇿🇦", country: "South Africa" },
  { code: "TRY", name: "Turkish Lira", symbol: "₺", flag: "🇹🇷", country: "Turkey" },
  { code: "PLN", name: "Polish Zloty", symbol: "zł", flag: "🇵🇱", country: "Poland" },
  { code: "THB", name: "Thai Baht", symbol: "฿", flag: "🇹🇭", country: "Thailand" },
  { code: "ILS", name: "Israeli Shekel", symbol: "₪", flag: "🇮🇱", country: "Israel" },
  { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp", flag: "🇮🇩", country: "Indonesia" },
  { code: "CZK", name: "Czech Koruna", symbol: "Kč", flag: "🇨🇿", country: "Czech Republic" },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ", flag: "🇦🇪", country: "United Arab Emirates" },
  { code: "SAR", name: "Saudi Riyal", symbol: "﷼", flag: "🇸🇦", country: "Saudi Arabia" },
  { code: "QAR", name: "Qatari Riyal", symbol: "ر.ق", flag: "🇶🇦", country: "Qatar" },
  { code: "KWD", name: "Kuwaiti Dinar", symbol: "د.ك", flag: "🇰🇼", country: "Kuwait" },
  { code: "BHD", name: "Bahraini Dinar", symbol: ".د.ب", flag: "🇧🇭", country: "Bahrain" },
  { code: "OMR", name: "Omani Rial", symbol: "ر.ع", flag: "🇴🇲", country: "Oman" },
  { code: "EGP", name: "Egyptian Pound", symbol: "£", flag: "🇪🇬", country: "Egypt" },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦", flag: "🇳🇬", country: "Nigeria" },
  { code: "KES", name: "Kenyan Shilling", symbol: "KSh", flag: "🇰🇪", country: "Kenya" },
  { code: "BDT", name: "Bangladeshi Taka", symbol: "৳", flag: "🇧🇩", country: "Bangladesh" },
  { code: "LKR", name: "Sri Lankan Rupee", symbol: "₨", flag: "🇱🇰", country: "Sri Lanka" },
  { code: "MYR", name: "Malaysian Ringgit", symbol: "RM", flag: "🇲🇾", country: "Malaysia" },
  { code: "PHP", name: "Philippine Peso", symbol: "₱", flag: "🇵🇭", country: "Philippines" },
  { code: "VND", name: "Vietnamese Dong", symbol: "₫", flag: "🇻🇳", country: "Vietnam" },
  { code: "COP", name: "Colombian Peso", symbol: "$", flag: "🇨🇴", country: "Colombia" },
  { code: "CLP", name: "Chilean Peso", symbol: "$", flag: "🇨🇱", country: "Chile" },
  { code: "PEN", name: "Peruvian Sol", symbol: "S/", flag: "🇵🇪", country: "Peru" },
  { code: "ARS", name: "Argentine Peso", symbol: "$", flag: "🇦🇷", country: "Argentina" },
  { code: "RON", name: "Romanian Leu", symbol: "lei", flag: "🇷🇴", country: "Romania" },
  { code: "HUF", name: "Hungarian Forint", symbol: "Ft", flag: "🇭🇺", country: "Hungary" },
  { code: "HRK", name: "Croatian Kuna", symbol: "kn", flag: "🇭🇷", country: "Croatia" },
  { code: "BGN", name: "Bulgarian Lev", symbol: "лв", flag: "🇧🇬", country: "Bulgaria" },
]

const POPULAR_CURRENCIES = ["USD", "EUR", "GBP", "PKR", "INR", "AED", "SAR"]

// Function to get currency flag by code
const getFlag = (code: string) => {
  const currency = ALL_CURRENCIES.find(c => c.code === code)
  return currency?.flag || "🏳️"
}

// Function to get currency name by code
const getCurrencyName = (code: string) => {
  const currency = ALL_CURRENCIES.find(c => c.code === code)
  return currency?.name || code
}

interface CurrencySelectProps {
  value: string
  onChange: (value: string) => void
  label: string
  otherValue: string
}

function CurrencySelect({ value, onChange, label, otherValue }: CurrencySelectProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const filteredCurrencies = useMemo(() => {
    const query = searchQuery.toLowerCase()
    return ALL_CURRENCIES.filter(c =>
      c.code.toLowerCase().includes(query) ||
      c.name.toLowerCase().includes(query) ||
      c.country.toLowerCase().includes(query)
    )
  }, [searchQuery])

  const selectedCurrency = ALL_CURRENCIES.find(c => c.code === value)

  return (
    <div className="space-y-2">
      <Label className="text-base font-semibold">{label}</Label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full h-14 px-4 flex items-center justify-between rounded-2xl border-2 bg-card hover:border-primary/30 transition-all text-left group"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{selectedCurrency?.flag || "🏳️"}</span>
            <div>
              <div className="font-bold text-lg">{value}</div>
              <div className="text-xs text-muted-foreground truncate max-w-[150px]">
                {selectedCurrency?.name}
              </div>
            </div>
          </div>
          <div className="text-muted-foreground group-hover:text-foreground transition-colors">
            <Search className="h-5 w-5" />
          </div>
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-card border rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-3 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search currency..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-10"
                  autoFocus
                />
              </div>
            </div>

            <ScrollArea className="h-[300px]">
              <div className="p-2">
                {POPULAR_CURRENCIES.filter(c => c !== otherValue).map(code => {
                  const curr = ALL_CURRENCIES.find(c => c.code === code)!
                  return (
                    <button
                      key={`popular-${code}`}
                      type="button"
                      onClick={() => {
                        onChange(code)
                        setIsOpen(false)
                        setSearchQuery("")
                      }}
                      className={`w-full p-3 rounded-xl flex items-center gap-3 hover:bg-muted/50 transition-all ${value === code ? "bg-primary/10 border border-primary/30" : ""}`}
                    >
                      <span className="text-2xl">{curr.flag}</span>
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{code}</span>
                          <Badge variant="secondary" className="text-xs">Popular</Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">{curr.name}</div>
                      </div>
                    </button>
                  )
                })}
                <div className="my-2 border-t" />
                {filteredCurrencies.filter(c => c.code !== otherValue).map(curr => (
                  <button
                    key={curr.code}
                    type="button"
                    onClick={() => {
                      onChange(curr.code)
                      setIsOpen(false)
                      setSearchQuery("")
                    }}
                    className={`w-full p-3 rounded-xl flex items-center gap-3 hover:bg-muted/50 transition-all ${value === curr.code ? "bg-primary/10 border border-primary/30" : ""}`}
                  >
                    <span className="text-2xl">{curr.flag}</span>
                    <div className="flex-1 text-left">
                      <div className="font-bold">{curr.code}</div>
                      <div className="text-xs text-muted-foreground">{curr.name} • {curr.country}</div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  )
}

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<number>(1)
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("PKR")
  const [result, setResult] = useState<number | null>(null)
  const [rates, setRates] = useState<Record<string, number> | null>(null)
  const [lastUpdated, setLastUpdated] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Function to fetch real-time exchange rates
  const fetchRates = async () => {
    setIsLoading(true)
    setError(null)
    try {
      // Using a free, reliable API - ExchangeRate-API (free tier available)
      // Fallback to mock rates if API fails
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`)
      
      if (!response.ok) throw new Error("Failed to fetch rates")
      
      const data = await response.json()
      setRates(data.rates)
      setLastUpdated(new Date().toLocaleString())
      toast.success("Exchange rates updated successfully!")
    } catch (err) {
      console.error("Error fetching rates:", err)
      // Fallback mock rates
      setRates({
        USD: 1,
        EUR: 0.92,
        GBP: 0.79,
        PKR: 278.50,
        INR: 83.30,
        AED: 3.67,
        SAR: 3.75,
        CAD: 1.36,
        AUD: 1.51,
        CNY: 7.24,
        JPY: 150.00,
        KRW: 1350.00,
        CHF: 0.88,
        SEK: 10.50,
        NOK: 10.80,
        DKK: 6.90,
        SGD: 1.34,
        HKD: 7.82,
        NZD: 1.62,
        MXN: 17.20,
        BRL: 5.00,
        RUB: 92.00,
        ZAR: 18.50,
        TRY: 32.00,
        PLN: 4.00,
        THB: 35.00,
        ILS: 3.70,
        IDR: 15500.00,
        CZK: 23.00,
        QAR: 3.64,
        KWD: 0.31,
        BHD: 0.38,
        OMR: 0.38,
        EGP: 48.00,
        NGN: 1500.00,
        KES: 130.00,
        BDT: 117.00,
        LKR: 300.00,
        MYR: 4.70,
        PHP: 57.00,
        VND: 24000.00,
        COP: 4000.00,
        CLP: 950.00,
        PEN: 3.80,
        ARS: 900.00,
        RON: 4.60,
        HUF: 380.00,
        HRK: 7.00,
        BGN: 1.85,
      })
      setLastUpdated(new Date().toLocaleString())
      toast.warning("Using cached rates. Some currencies may not be available.")
    } finally {
      setIsLoading(false)
    }
  }

  const convert = () => {
    if (!rates || amount <= 0) return
    
    const fromRate = rates[fromCurrency]
    const toRate = rates[toCurrency]
    
    if (fromRate && toRate) {
      const converted = (amount / fromRate) * toRate
      setResult(converted)
    }
  }

  useEffect(() => {
    fetchRates()
  }, [])

  useEffect(() => {
    if (rates) {
      convert()
    }
  }, [amount, fromCurrency, toCurrency, rates])

  const swapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <Card className="border-2 border-primary/10 shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 p-8 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-3xl md:text-4xl font-black flex items-center gap-3">
                <Coins className="h-8 w-8" /> 
                Currency Converter
              </h3>
              <p className="text-white/80 mt-2 text-sm md:text-base">
                Real-time exchange rates • 50+ currencies • 100% free
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              {lastUpdated && (
                <p className="text-xs md:text-sm opacity-90 flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full">
                  <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} /> 
                  {isLoading ? "Updating..." : `Last updated: ${lastUpdated}`}
                </p>
              )}
              <Button 
                onClick={fetchRates} 
                disabled={isLoading} 
                variant="secondary"
                className="bg-white text-purple-700 hover:bg-white/90 font-semibold"
                size="sm"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                Refresh Rates
              </Button>
            </div>
          </div>
        </div>
        
        <CardContent className="p-8 space-y-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-3">
              <Info className="h-5 w-5" />
              <p>{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-3 space-y-2">
              <Label className="text-base font-semibold">Amount</Label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                className="h-14 text-2xl font-bold rounded-2xl"
                placeholder="1.00"
                min="0"
                step="0.01"
              />
            </div>
            
            <div className="lg:col-span-4">
              <CurrencySelect 
                value={fromCurrency} 
                onChange={setFromCurrency} 
                label="From"
                otherValue={toCurrency}
              />
            </div>

            <div className="flex justify-center lg:justify-center pb-1 lg:col-span-1">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-14 w-14 hover:rotate-180 transition-transform duration-500 border-2 hover:border-primary hover:bg-primary/5"
                onClick={swapCurrencies}
              >
                <ArrowLeftRight className="h-6 w-6" />
              </Button>
            </div>

            <div className="lg:col-span-4">
              <CurrencySelect 
                value={toCurrency} 
                onChange={setToCurrency} 
                label="To"
                otherValue={fromCurrency}
              />
            </div>
          </div>

          <div className="pt-10 border-t-2 text-center space-y-6">
            <div className="space-y-3">
              <p className="text-lg text-muted-foreground font-medium">
                {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {getCurrencyName(fromCurrency)} =
              </p>
              <h2 className="text-6xl md:text-7xl font-black text-primary break-all tracking-tight">
                {isLoading ? (
                  <span className="animate-pulse">...</span>
                ) : result !== null ? (
                  `${result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${toCurrency}`
                ) : (
                  "—"
                )}
              </h2>
              {rates && !isLoading && (
                <p className="text-sm text-muted-foreground">
                  1 {fromCurrency} = {(rates[toCurrency] / rates[fromCurrency]).toFixed(4)} {toCurrency}
                  <span className="mx-2">•</span>
                  1 {toCurrency} = {(rates[fromCurrency] / rates[toCurrency]).toFixed(4)} {fromCurrency}
                </p>
              )}
            </div>
            
            <Button 
              onClick={convert} 
              disabled={isLoading || !rates} 
              size="lg"
              className="gap-2 h-14 px-8 text-lg font-bold rounded-2xl"
            >
              <RefreshCw className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`} /> 
              Convert Now
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardContent className="p-6 space-y-4">
            <h4 className="text-xl font-bold flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-green-600" /> 
              Popular Conversions
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {["USD/PKR", "EUR/PKR", "GBP/PKR", "AED/PKR", "SAR/PKR", "INR/PKR", "USD/EUR", "EUR/GBP"].map((pair) => {
                const [from, to] = pair.split("/")
                const rate = rates ? (rates[to] / rates[from]) : null
                return (
                  <button
                    key={pair}
                    onClick={() => {
                      setFromCurrency(from)
                      setToCurrency(to)
                    }}
                    className="flex justify-between items-center p-4 bg-muted/50 hover:bg-primary/10 hover:border-primary/30 border rounded-xl transition-all group text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getFlag(from)}</span>
                      <div>
                        <span className="font-bold text-lg">{pair}</span>
                      </div>
                    </div>
                    {rate && (
                      <span className="font-mono font-semibold text-primary group-hover:scale-105 transition-transform">
                        {rate.toFixed(2)}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-blue-100">
          <CardContent className="p-6 space-y-4">
            <h4 className="text-xl font-bold flex items-center gap-2 text-blue-700">
              <Star className="h-6 w-6" /> 
              Why Choose Us?
            </h4>
            <ul className="space-y-3">
              {[
                { title: "Real-time Rates", desc: "Live exchange rate updates" },
                { title: "All Currencies", desc: "50+ global currencies supported" },
                { title: "Easy Search", desc: "Find any currency instantly" },
                { title: "100% Free", desc: "No hidden costs or subscriptions" },
                { title: "Privacy First", desc: "No data stored on our servers" },
                { title: "Mobile Friendly", desc: "Works perfectly on all devices" },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-blue-900">{item.title}:</span>{" "}
                    <span className="text-blue-800/70">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
