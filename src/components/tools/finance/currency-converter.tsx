"use client"

import { useState, useEffect, useMemo, useRef, useCallback } from "react"
import { ArrowLeftRight, Coins, RefreshCw, TrendingUp, Search, Star, Info, Clock, Shield, Zap, X } from "lucide-react"
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

// ─── Raw list (may have duplicates) ──────────────────────────────────────────
const RAW_CURRENCIES: Currency[] = [
  { code: "PKR", name: "Pakistani Rupee", symbol: "Rs", flag: "🇵🇰", country: "Pakistan" },
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸", country: "United States" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺", country: "European Union" },
  { code: "GBP", name: "British Pound", symbol: "£", flag: "🇬🇧", country: "United Kingdom" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", flag: "🇯🇵", country: "Japan" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", flag: "🇦🇺", country: "Australia" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", flag: "🇨🇦", country: "Canada" },
  { code: "CHF", name: "Swiss Franc", symbol: "Fr", flag: "🇨🇭", country: "Switzerland" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥", flag: "🇨🇳", country: "China" },
  { code: "SEK", name: "Swedish Krona", symbol: "kr", flag: "🇸🇪", country: "Sweden" },
  { code: "MXN", name: "Mexican Peso", symbol: "$", flag: "🇲🇽", country: "Mexico" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$", flag: "🇸🇬", country: "Singapore" },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$", flag: "🇭🇰", country: "Hong Kong" },
  { code: "NOK", name: "Norwegian Krone", symbol: "kr", flag: "🇳🇴", country: "Norway" },
  { code: "KRW", name: "South Korean Won", symbol: "₩", flag: "🇰🇷", country: "South Korea" },
  { code: "TRY", name: "Turkish Lira", symbol: "₺", flag: "🇹🇷", country: "Turkey" },
  { code: "INR", name: "Indian Rupee", symbol: "₹", flag: "🇮🇳", country: "India" },
  { code: "RUB", name: "Russian Ruble", symbol: "₽", flag: "🇷🇺", country: "Russia" },
  { code: "ZAR", name: "South African Rand", symbol: "R", flag: "🇿🇦", country: "South Africa" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$", flag: "🇧🇷", country: "Brazil" },
  { code: "TWD", name: "New Taiwan Dollar", symbol: "NT$", flag: "🇹🇼", country: "Taiwan" },
  { code: "DKK", name: "Danish Krone", symbol: "kr", flag: "🇩🇰", country: "Denmark" },
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
  { code: "BGN", name: "Bulgarian Lev", symbol: "лв", flag: "🇧🇬", country: "Bulgaria" },
  { code: "ISK", name: "Icelandic Krona", symbol: "kr", flag: "🇮🇸", country: "Iceland" },
  { code: "HRK", name: "Croatian Kuna", symbol: "kn", flag: "🇭🇷", country: "Croatia" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$", flag: "🇳🇿", country: "New Zealand" },
  { code: "MVR", name: "Maldivian Rufiyaa", symbol: "Rf", flag: "🇲🇻", country: "Maldives" },
  { code: "MUR", name: "Mauritian Rupee", symbol: "₨", flag: "🇲🇺", country: "Mauritius" },
  { code: "SCR", name: "Seychellois Rupee", symbol: "₨", flag: "🇸🇨", country: "Seychelles" },
  { code: "BND", name: "Brunei Dollar", symbol: "B$", flag: "🇧🇳", country: "Brunei" },
  { code: "KHR", name: "Cambodian Riel", symbol: "៛", flag: "🇰🇭", country: "Cambodia" },
  { code: "LAK", name: "Lao Kip", symbol: "₭", flag: "🇱🇦", country: "Laos" },
  { code: "MOP", name: "Macanese Pataca", symbol: "P", flag: "🇲🇴", country: "Macau" },
  { code: "MNT", name: "Mongolian Tugrik", symbol: "₮", flag: "🇲🇳", country: "Mongolia" },
  { code: "NPR", name: "Nepalese Rupee", symbol: "₨", flag: "🇳🇵", country: "Nepal" },
  { code: "TJS", name: "Tajikistani Somoni", symbol: "SM", flag: "🇹🇯", country: "Tajikistan" },
  { code: "UZS", name: "Uzbekistani Som", symbol: "сум", flag: "🇺🇿", country: "Uzbekistan" },
  { code: "AOA", name: "Angolan Kwanza", symbol: "Kz", flag: "🇦🇴", country: "Angola" },
  { code: "BWP", name: "Botswanan Pula", symbol: "P", flag: "🇧🇼", country: "Botswana" },
  { code: "DJF", name: "Djiboutian Franc", symbol: "Fdj", flag: "🇩🇯", country: "Djibouti" },
  { code: "ERN", name: "Eritrean Nakfa", symbol: "Nfk", flag: "🇪🇷", country: "Eritrea" },
  { code: "ETB", name: "Ethiopian Birr", symbol: "Br", flag: "🇪🇹", country: "Ethiopia" },
  { code: "GMD", name: "Gambian Dalasi", symbol: "D", flag: "🇬🇲", country: "Gambia" },
  { code: "GHS", name: "Ghanaian Cedi", symbol: "₵", flag: "🇬🇭", country: "Ghana" },
  { code: "GNF", name: "Guinean Franc", symbol: "FG", flag: "🇬🇳", country: "Guinea" },
  { code: "KMF", name: "Comorian Franc", symbol: "CF", flag: "🇰🇲", country: "Comoros" },
  { code: "LRD", name: "Liberian Dollar", symbol: "$", flag: "🇱🇷", country: "Liberia" },
  { code: "LSL", name: "Lesotho Loti", symbol: "L", flag: "🇱🇸", country: "Lesotho" },
  { code: "MGA", name: "Malagasy Ariary", symbol: "Ar", flag: "🇲🇬", country: "Madagascar" },
  { code: "MWK", name: "Malawian Kwacha", symbol: "MK", flag: "🇲🇼", country: "Malawi" },
  { code: "MZN", name: "Mozambican Metical", symbol: "MT", flag: "🇲🇿", country: "Mozambique" },
  { code: "NAD", name: "Namibian Dollar", symbol: "$", flag: "🇳🇦", country: "Namibia" },
  { code: "RWF", name: "Rwandan Franc", symbol: "FRw", flag: "🇷🇼", country: "Rwanda" },
  { code: "SBD", name: "Solomon Islands Dollar", symbol: "$", flag: "🇸🇧", country: "Solomon Islands" },
  { code: "SLL", name: "Sierra Leonean Leone", symbol: "Le", flag: "🇸🇱", country: "Sierra Leone" },
  { code: "SOS", name: "Somali Shilling", symbol: "Sh", flag: "🇸🇴", country: "Somalia" },
  { code: "SZL", name: "Swazi Lilangeni", symbol: "L", flag: "🇸🇿", country: "Eswatini" },
  { code: "TND", name: "Tunisian Dinar", symbol: "DT", flag: "🇹🇳", country: "Tunisia" },
  { code: "TZS", name: "Tanzanian Shilling", symbol: "TSh", flag: "🇹🇿", country: "Tanzania" },
  { code: "UGX", name: "Ugandan Shilling", symbol: "USh", flag: "🇺🇬", country: "Uganda" },
  { code: "XAF", name: "CFA Franc BEAC", symbol: "FCFA", flag: "🇨🇲", country: "Central Africa" },
  { code: "XOF", name: "CFA Franc BCEAO", symbol: "CFA", flag: "🇸🇳", country: "West Africa" },
  { code: "ZMW", name: "Zambian Kwacha", symbol: "ZK", flag: "🇿🇲", country: "Zambia" },
  { code: "ZWL", name: "Zimbabwean Dollar", symbol: "$", flag: "🇿🇼", country: "Zimbabwe" },
  { code: "AFN", name: "Afghan Afghani", symbol: "؋", flag: "🇦🇫", country: "Afghanistan" },
  { code: "ALL", name: "Albanian Lek", symbol: "L", flag: "🇦🇱", country: "Albania" },
  { code: "DZD", name: "Algerian Dinar", symbol: "دج", flag: "🇩🇿", country: "Algeria" },
  { code: "AMD", name: "Armenian Dram", symbol: "֏", flag: "🇦🇲", country: "Armenia" },
  { code: "AWG", name: "Aruban Florin", symbol: "ƒ", flag: "🇦🇼", country: "Aruba" },
  { code: "AZN", name: "Azerbaijani Manat", symbol: "₼", flag: "🇦🇿", country: "Azerbaijan" },
  { code: "BSD", name: "Bahamian Dollar", symbol: "$", flag: "🇧🇸", country: "Bahamas" },
  { code: "BBD", name: "Barbadian Dollar", symbol: "$", flag: "🇧🇧", country: "Barbados" },
  { code: "BYN", name: "Belarusian Ruble", symbol: "Br", flag: "🇧🇾", country: "Belarus" },
  { code: "BZD", name: "Belize Dollar", symbol: "BZ$", flag: "🇧🇿", country: "Belize" },
  { code: "BMD", name: "Bermudan Dollar", symbol: "$", flag: "🇧🇲", country: "Bermuda" },
  { code: "BTN", name: "Bhutanese Ngultrum", symbol: "Nu", flag: "🇧🇹", country: "Bhutan" },
  { code: "BOB", name: "Bolivian Boliviano", symbol: "Bs", flag: "🇧🇴", country: "Bolivia" },
  { code: "BAM", name: "Bosnia-Herzegovina Mark", symbol: "KM", flag: "🇧🇦", country: "Bosnia and Herzegovina" },
  { code: "BIF", name: "Burundian Franc", symbol: "FBu", flag: "🇧🇮", country: "Burundi" },
  { code: "CVE", name: "Cape Verdean Escudo", symbol: "Esc", flag: "🇨🇻", country: "Cabo Verde" },
  { code: "KYD", name: "Cayman Islands Dollar", symbol: "$", flag: "🇰🇾", country: "Cayman Islands" },
  { code: "CDF", name: "Congolese Franc", symbol: "FC", flag: "🇨🇩", country: "Congo (DRC)" },
  { code: "CRC", name: "Costa Rican Colón", symbol: "₡", flag: "🇨🇷", country: "Costa Rica" },
  { code: "CUP", name: "Cuban Peso", symbol: "$", flag: "🇨🇺", country: "Cuba" },
  { code: "DOP", name: "Dominican Peso", symbol: "$", flag: "🇩🇴", country: "Dominican Republic" },
  { code: "FJD", name: "Fijian Dollar", symbol: "$", flag: "🇫🇯", country: "Fiji" },
  { code: "GEL", name: "Georgian Lari", symbol: "₾", flag: "🇬🇪", country: "Georgia" },
  { code: "GTQ", name: "Guatemalan Quetzal", symbol: "Q", flag: "🇬🇹", country: "Guatemala" },
  { code: "GYD", name: "Guyanese Dollar", symbol: "$", flag: "🇬🇾", country: "Guyana" },
  { code: "HTG", name: "Haitian Gourde", symbol: "G", flag: "🇭🇹", country: "Haiti" },
  { code: "HNL", name: "Honduran Lempira", symbol: "L", flag: "🇭🇳", country: "Honduras" },
  { code: "IRR", name: "Iranian Rial", symbol: "﷼", flag: "🇮🇷", country: "Iran" },
  { code: "IQD", name: "Iraqi Dinar", symbol: "ع.د", flag: "🇮🇶", country: "Iraq" },
  { code: "JMD", name: "Jamaican Dollar", symbol: "$", flag: "🇯🇲", country: "Jamaica" },
  { code: "JOD", name: "Jordanian Dinar", symbol: "JD", flag: "🇯🇴", country: "Jordan" },
  { code: "KZT", name: "Kazakhstani Tenge", symbol: "₸", flag: "🇰🇿", country: "Kazakhstan" },
  { code: "KGS", name: "Kyrgystani Som", symbol: "с", flag: "🇰🇬", country: "Kyrgyzstan" },
  { code: "LBP", name: "Lebanese Pound", symbol: "£", flag: "🇱🇧", country: "Lebanon" },
  { code: "LYD", name: "Libyan Dinar", symbol: "LD", flag: "🇱🇾", country: "Libya" },
  { code: "MAD", name: "Moroccan Dirham", symbol: "DH", flag: "🇲🇦", country: "Morocco" },
  { code: "MMK", name: "Myanmar Kyat", symbol: "K", flag: "🇲🇲", country: "Myanmar" },
  { code: "ANG", name: "Netherlands Antillean Guilder", symbol: "ƒ", flag: "🇳🇱", country: "Netherlands Antilles" },
  { code: "NIO", name: "Nicaraguan Córdoba", symbol: "C$", flag: "🇳🇮", country: "Nicaragua" },
  { code: "KPW", name: "North Korean Won", symbol: "₩", flag: "🇰🇵", country: "North Korea" },
  { code: "PAB", name: "Panamanian Balboa", symbol: "B/.", flag: "🇵🇦", country: "Panama" },
  { code: "PGK", name: "Papua New Guinean Kina", symbol: "K", flag: "🇵🇬", country: "Papua New Guinea" },
  { code: "PYG", name: "Paraguayan Guarani", symbol: "₲", flag: "🇵🇾", country: "Paraguay" },
  { code: "RSD", name: "Serbian Dinar", symbol: "дин", flag: "🇷🇸", country: "Serbia" },
  { code: "WST", name: "Samoan Tala", symbol: "T", flag: "🇼🇸", country: "Samoa" },
  { code: "SSP", name: "South Sudanese Pound", symbol: "£", flag: "🇸🇸", country: "South Sudan" },
  { code: "SDG", name: "Sudanese Pound", symbol: "£", flag: "🇸🇩", country: "Sudan" },
  { code: "SRD", name: "Surinamese Dollar", symbol: "$", flag: "🇸🇷", country: "Suriname" },
  { code: "SYP", name: "Syrian Pound", symbol: "£", flag: "🇸🇾", country: "Syria" },
  { code: "TTD", name: "Trinidad and Tobago Dollar", symbol: "TT$", flag: "🇹🇹", country: "Trinidad and Tobago" },
  { code: "TMT", name: "Turkmenistani Manat", symbol: "T", flag: "🇹🇲", country: "Turkmenistan" },
  { code: "UAH", name: "Ukrainian Hryvnia", symbol: "₴", flag: "🇺🇦", country: "Ukraine" },
  { code: "UYU", name: "Uruguayan Peso", symbol: "$U", flag: "🇺🇾", country: "Uruguay" },
  { code: "VUV", name: "Vanuatu Vatu", symbol: "VT", flag: "🇻🇺", country: "Vanuatu" },
  { code: "VEF", name: "Venezuelan Bolívar", symbol: "Bs", flag: "🇻🇪", country: "Venezuela" },
  { code: "YER", name: "Yemeni Rial", symbol: "﷼", flag: "🇾🇪", country: "Yemen" },
  { code: "MDL", name: "Moldovan Leu", symbol: "L", flag: "🇲🇩", country: "Moldova" },
  { code: "MRO", name: "Mauritanian Ouguiya", symbol: "UM", flag: "🇲🇷", country: "Mauritania" },
]

// ─── Deduplicated at module level (runs once, not on every render) ────────────
const UNIQUE_CURRENCIES: Currency[] = (() => {
  const seen = new Set<string>()
  return RAW_CURRENCIES.filter(c => {
    if (seen.has(c.code)) return false
    seen.add(c.code)
    return true
  })
})()

// Quick O(1) lookup map
const CURRENCY_MAP: Record<string, Currency> = Object.fromEntries(
  UNIQUE_CURRENCIES.map(c => [c.code, c])
)

const POPULAR_CURRENCY_CODES = ["USD", "EUR", "GBP", "PKR", "INR", "AED", "SAR", "JPY", "CNY", "CAD", "AUD"]
const POPULAR_SET = new Set(POPULAR_CURRENCY_CODES)

const getCurrency = (code: string) => CURRENCY_MAP[code]
const getFlag = (code: string) => CURRENCY_MAP[code]?.flag ?? "🏳️"
const getCurrencyName = (code: string) => CURRENCY_MAP[code]?.name ?? code

// ─── CurrencySelect ───────────────────────────────────────────────────────────

interface CurrencySelectProps {
  value: string
  onChange: (value: string) => void
  label: string
  otherValue: string
}

function CurrencySelect({ value, onChange, label, otherValue }: CurrencySelectProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // ── Close on outside click ──
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
        setSearchQuery("")
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // ── Focus search input after dropdown animates open ──
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => searchInputRef.current?.focus(), 80)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // ── Close on Escape key ──
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false)
      setSearchQuery("")
    }
  }, [])

  const toggleOpen = useCallback(() => {
    setIsOpen(prev => {
      if (prev) setSearchQuery("")   // clear search when closing
      return !prev
    })
  }, [])

  const selectCurrency = useCallback((code: string) => {
    onChange(code)
    setIsOpen(false)
    setSearchQuery("")
  }, [onChange])

  const isSearching = searchQuery.trim().length > 0

  // ── BUG FIX: otherValue is now in the dependency array ──
  const { popularList, allList } = useMemo(() => {
    const query = searchQuery.toLowerCase().trim()

    // All currencies except the one selected in the other dropdown
    const available = UNIQUE_CURRENCIES.filter(c => c.code !== otherValue)

    if (query) {
      // When searching: single flat list — no popular section
      const filtered = available.filter(c =>
        c.code.toLowerCase().includes(query) ||
        c.name.toLowerCase().includes(query) ||
        c.country.toLowerCase().includes(query)
      )
      return { popularList: [], allList: filtered }
    }

    // When not searching: popular + rest (popular not duplicated in rest)
    const popular = POPULAR_CURRENCY_CODES
      .filter(code => code !== otherValue)
      .map(code => CURRENCY_MAP[code])
      .filter(Boolean) as Currency[]

    const rest = available.filter(c => !POPULAR_SET.has(c.code))

    return { popularList: popular, allList: rest }
  }, [searchQuery, otherValue])  // ← otherValue dependency fixed

  const selectedCurrency = getCurrency(value)
  const totalCount = popularList.length + allList.length

  return (
    <div className="space-y-2" ref={containerRef} onKeyDown={handleKeyDown}>
      <Label className="text-base font-semibold">{label}</Label>
      <div className="relative">

        {/* ── Trigger Button ── */}
        <button
          type="button"
          onClick={toggleOpen}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className="w-full h-16 px-5 flex items-center justify-between rounded-2xl border-2 bg-card hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 text-left group shadow-sm hover:shadow-md"
        >
          <div className="flex items-center gap-4">
            <span className="text-4xl leading-none">{selectedCurrency?.flag ?? "🏳️"}</span>
            <div>
              <div className="font-black text-xl leading-tight">{value}</div>
              <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                {selectedCurrency?.name} • {selectedCurrency?.country}
              </div>
            </div>
          </div>
          <Search className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
        </button>

        {/* ── Dropdown ── */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 z-[9999] bg-gradient-to-br from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 border-2 border-primary/30 rounded-2xl shadow-2xl shadow-primary/20 overflow-hidden">

            {/* Search bar */}
            <div className="p-4 border-b bg-gradient-to-r from-primary/10 to-transparent">
              <div className="relative flex items-center">
                <Search className="absolute left-4 h-5 w-5 text-muted-foreground pointer-events-none" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search by name, code or country..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-10 h-12 text-base rounded-xl border-2 border-primary/20 focus:border-primary focus:outline-none bg-white dark:bg-slate-900 transition-colors"
                />
                {isSearching && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-2 pl-1">
                {isSearching
                  ? `${allList.length} result${allList.length !== 1 ? "s" : ""} found`
                  : `${totalCount} currencies available`}
              </p>
            </div>

            {/* List */}
            <ScrollArea className="h-[420px]">
              <div className="p-3 space-y-1">

                {/* ── Popular section (only when NOT searching) ── */}
                {!isSearching && popularList.length > 0 && (
                  <>
                    <div className="px-2 pt-1 pb-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      ⭐ Popular Currencies
                    </div>
                    {popularList.map(curr => (
                      <CurrencyRow
                        key={`pop-${curr.code}`}
                        currency={curr}
                        isSelected={value === curr.code}
                        isPopular
                        onSelect={selectCurrency}
                      />
                    ))}
                    <div className="my-3 border-t-2 border-dashed border-muted" />
                  </>
                )}

                {/* ── All / Search results section ── */}
                {allList.length > 0 ? (
                  <>
                    <div className="px-2 pt-1 pb-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      {isSearching ? "🔍 Search Results" : "🌍 All Currencies"}
                    </div>
                    {allList.map(curr => (
                      <CurrencyRow
                        key={curr.code}
                        currency={curr}
                        isSelected={value === curr.code}
                        isPopular={false}
                        onSelect={selectCurrency}
                      />
                    ))}
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-muted-foreground gap-3">
                    <Search className="h-10 w-10 opacity-30" />
                    <p className="text-base font-medium">No currencies found</p>
                    <p className="text-sm opacity-60">Try a different search term</p>
                  </div>
                )}

              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Extracted row component to avoid inline JSX duplication ─────────────────

interface CurrencyRowProps {
  currency: Currency
  isSelected: boolean
  isPopular: boolean
  onSelect: (code: string) => void
}

function CurrencyRow({ currency, isSelected, isPopular, onSelect }: CurrencyRowProps) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={isSelected}
      onClick={() => onSelect(currency.code)}
      className={`w-full p-3.5 rounded-xl flex items-center gap-4 border-2 transition-all duration-150 text-left
        ${isSelected
          ? "bg-primary/15 border-primary/40 shadow-sm"
          : "border-transparent hover:bg-primary/8 hover:border-primary/20"
        }`}
    >
      <span className="text-3xl leading-none flex-shrink-0">{currency.flag}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-black text-base">{currency.code}</span>
          {isPopular && (
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 leading-4">
              Popular
            </Badge>
          )}
        </div>
        <div className="text-sm text-muted-foreground truncate">
          {currency.name} · {currency.country}
        </div>
      </div>
      {isSelected && (
        <span className="text-primary font-black text-lg flex-shrink-0">✓</span>
      )}
    </button>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

const FALLBACK_RATES: Record<string, number> = {
  USD: 1, EUR: 0.92, GBP: 0.79, PKR: 278.50, INR: 83.30,
  AED: 3.67, SAR: 3.75, CAD: 1.36, AUD: 1.51, CNY: 7.24,
  JPY: 150.00, KRW: 1350.00, CHF: 0.88, SEK: 10.50, NOK: 10.80,
  DKK: 6.90, SGD: 1.34, HKD: 7.82, NZD: 1.62, MXN: 17.20,
  BRL: 5.00, RUB: 92.00, ZAR: 18.50, TRY: 32.00, PLN: 4.00,
  THB: 35.00, ILS: 3.70, IDR: 15500.00, CZK: 23.00, QAR: 3.64,
  KWD: 0.31, BHD: 0.38, OMR: 0.38, EGP: 48.00, NGN: 1500.00,
  KES: 130.00, BDT: 117.00, LKR: 300.00, MYR: 4.70, PHP: 57.00,
  VND: 24000.00, COP: 4000.00, CLP: 950.00, PEN: 3.80, ARS: 900.00,
  RON: 4.60, HUF: 380.00, BGN: 1.85,
}

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<number>(1)
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("PKR")
  const [result, setResult] = useState<number | null>(null)
  const [rates, setRates] = useState<Record<string, number> | null>(null)
  const [lastUpdated, setLastUpdated] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [usingFallback, setUsingFallback] = useState(false)

  const fetchRates = useCallback(async () => {
    setIsLoading(true)
    setUsingFallback(false)
    try {
      const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD")
      if (!response.ok) throw new Error("API error")
      const data = await response.json()
      setRates(data.rates)
      setLastUpdated(new Date().toLocaleTimeString())
      toast.success("Exchange rates updated!")
    } catch {
      setRates(FALLBACK_RATES)
      setLastUpdated(new Date().toLocaleTimeString())
      setUsingFallback(true)
      toast.warning("Using cached rates — live fetch failed")
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Initial fetch
  useEffect(() => { fetchRates() }, [fetchRates])

  // Auto-convert whenever inputs change
  useEffect(() => {
    if (!rates || amount <= 0) { setResult(null); return }
    const fromRate = rates[fromCurrency]
    const toRate = rates[toCurrency]
    if (fromRate && toRate) {
      setResult((amount / fromRate) * toRate)
    } else {
      setResult(null)
    }
  }, [amount, fromCurrency, toCurrency, rates])

  const swapCurrencies = useCallback(() => {
    setFromCurrency(prev => { setToCurrency(prev); return toCurrency })
  }, [toCurrency])

  const exchangeRate = rates && rates[fromCurrency] && rates[toCurrency]
    ? rates[toCurrency] / rates[fromCurrency]
    : null

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      <Card className="border-2 border-primary/20 shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 p-8 md:p-10 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h3 className="text-4xl md:text-5xl font-black flex items-center gap-4">
                <Coins className="h-10 w-10" />
                Currency Converter
              </h3>
              <p className="text-white/80 mt-3 text-lg">
                Real-time exchange rates · All countries & currencies · 100% free
              </p>
            </div>
            <div className="flex flex-col items-end gap-3">
              {lastUpdated && (
                <p className="text-sm opacity-90 flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                  <Clock className="h-4 w-4" />
                  {isLoading ? "Updating…" : `Updated: ${lastUpdated}`}
                  {usingFallback && " (cached)"}
                </p>
              )}
              <Button
                onClick={fetchRates}
                disabled={isLoading}
                variant="secondary"
                className="bg-white text-purple-700 hover:bg-white/95 font-bold shadow-lg"
                size="lg"
              >
                <RefreshCw className={`h-5 w-5 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                Refresh Rates
              </Button>
            </div>
          </div>
        </div>

        <CardContent className="p-8 md:p-10 space-y-10">

          {/* Inputs row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">

            {/* Amount */}
            <div className="lg:col-span-3 space-y-3">
              <Label className="text-lg font-bold">Amount</Label>
              <Input
                type="number"
                value={amount}
                onChange={e => setAmount(parseFloat(e.target.value) || 0)}
                className="h-16 text-3xl font-black rounded-2xl border-2 border-primary/20 focus:border-primary"
                placeholder="1.00"
                min="0"
                step="0.01"
              />
            </div>

            {/* From */}
            <div className="lg:col-span-4">
              <CurrencySelect
                value={fromCurrency}
                onChange={setFromCurrency}
                label="From"
                otherValue={toCurrency}
              />
            </div>

            {/* Swap button */}
            <div className="flex justify-center pb-1 lg:col-span-1">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-16 w-16 hover:rotate-180 transition-transform duration-500 border-2 border-primary hover:bg-primary/10 shadow-lg"
                onClick={swapCurrencies}
                title="Swap currencies"
              >
                <ArrowLeftRight className="h-7 w-7" />
              </Button>
            </div>

            {/* To */}
            <div className="lg:col-span-4">
              <CurrencySelect
                value={toCurrency}
                onChange={setToCurrency}
                label="To"
                otherValue={fromCurrency}
              />
            </div>
          </div>

          {/* Result */}
          <div className="pt-10 border-t-4 text-center space-y-6">
            <p className="text-xl text-muted-foreground font-semibold">
              {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{" "}
              {getCurrencyName(fromCurrency)} =
            </p>

            <h2 className="text-6xl md:text-8xl font-black text-primary break-all tracking-tight min-h-[1.2em] flex items-center justify-center">
              {isLoading
                ? <span className="animate-pulse text-5xl">…</span>
                : result !== null
                  ? `${result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${toCurrency}`
                  : "—"
              }
            </h2>

            {exchangeRate && !isLoading && (
              <p className="text-base text-muted-foreground space-x-4">
                <span>1 {fromCurrency} = {exchangeRate.toFixed(6)} {toCurrency}</span>
                <span className="opacity-40">•</span>
                <span>1 {toCurrency} = {(1 / exchangeRate).toFixed(6)} {fromCurrency}</span>
              </p>
            )}

            <Button
              onClick={() => {
                if (!rates || amount <= 0) return
                const fromRate = rates[fromCurrency]
                const toRate = rates[toCurrency]
                if (fromRate && toRate) setResult((amount / fromRate) * toRate)
              }}
              disabled={isLoading || !rates}
              size="lg"
              className="gap-3 h-16 px-12 text-xl font-black rounded-2xl shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300"
            >
              <RefreshCw className={`h-6 w-6 ${isLoading ? "animate-spin" : ""}`} />
              Convert Now
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bottom cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Popular pairs */}
        <Card className="md:col-span-2 border-2 border-primary/10">
          <CardContent className="p-8 space-y-6">
            <h4 className="text-2xl font-black flex items-center gap-3">
              <TrendingUp className="h-7 w-7 text-green-600" />
              Popular Conversions
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {["USD/PKR", "EUR/PKR", "GBP/PKR", "AED/PKR", "SAR/PKR", "INR/PKR", "USD/EUR", "EUR/GBP"].map(pair => {
                const [from, to] = pair.split("/")
                const rate = rates ? (rates[to] / rates[from]) : null
                return (
                  <button
                    key={pair}
                    type="button"
                    onClick={() => { setFromCurrency(from); setToCurrency(to) }}
                    className="flex flex-col items-center justify-center p-5 bg-gradient-to-br from-muted/50 to-muted hover:from-primary/10 hover:to-primary/5 hover:border-primary/30 border-2 rounded-2xl transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-3xl">{getFlag(from)}</span>
                      <span className="text-xl font-black text-primary">/</span>
                      <span className="text-3xl">{getFlag(to)}</span>
                    </div>
                    <p className="font-bold text-base">{pair}</p>
                    {rate && (
                      <p className="font-mono font-black text-sm text-primary mt-1">
                        {rate.toFixed(2)}
                      </p>
                    )}
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Why us */}
        <Card className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-2 border-blue-100">
          <CardContent className="p-8 space-y-5">
            <h4 className="text-2xl font-black flex items-center gap-3 text-blue-700">
              <Star className="h-7 w-7" />
              Why Choose Us?
            </h4>
            <ul className="space-y-4">
              {[
                { icon: Zap,    title: "Real-time Rates",   desc: "Live exchange rate updates" },
                { icon: Star,   title: "All Countries",     desc: "All currencies supported" },
                { icon: Search, title: "Easy Search",       desc: "Find any currency instantly" },
                { icon: Shield, title: "100% Free",         desc: "No hidden costs or subscriptions" },
                { icon: Info,   title: "Privacy First",     desc: "No data stored on servers" },
                { icon: Star,   title: "Mobile Friendly",   desc: "Works on all devices" },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <item.icon className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-black text-blue-900">{item.title}: </span>
                    <span className="text-blue-800/70 text-sm">{item.desc}</span>
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