"use client"

import { useState, useEffect, useMemo } from "react"
import { ArrowLeftRight, Coins, RefreshCw, TrendingUp, Search, Star, Info, Clock, Shield, Zap, Globe } from "lucide-react"
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
  { code: "PKR", name: "Pakistani Rupee", symbol: "Rs", flag: "🇵🇰", country: "Pakistan" },
  { code: "TJS", name: "Tajikistani Somoni", symbol: "SM", flag: "🇹🇯", country: "Tajikistan" },
  { code: "UZS", name: "Uzbekistani Som", symbol: "лв", flag: "🇺🇿", country: "Uzbekistan" },
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
  { code: "TZS", name: "Tanzanian Shilling", symbol: "TSh", flag: "🇹🇿", country: "Tanzania" },
  { code: "UGX", name: "Ugandan Shilling", symbol: "USh", flag: "🇺🇬", country: "Uganda" },
  { code: "XAF", name: "CFA Franc BEAC", symbol: "FCFA", flag: "🇨🇲", country: "CEMAC (Central Africa)" },
  { code: "XOF", name: "CFA Franc BCEAO", symbol: "CFA", flag: "🇸🇳", country: "UEMOA (West Africa)" },
  { code: "ZMW", name: "Zambian Kwacha", symbol: "ZK", flag: "🇿🇲", country: "Zambia" },
  { code: "ZWL", name: "Zimbabwean Dollar", symbol: "$", flag: "🇿🇼", country: "Zimbabwe" },
  { code: "ALL", name: "Albanian Lek", symbol: "L", flag: "🇦🇱", country: "Albania" },
  { code: "AMD", name: "Armenian Dram", symbol: "֏", flag: "🇦🇲", country: "Armenia" },
  { code: "AZN", name: "Azerbaijani Manat", symbol: "₼", flag: "🇦🇿", country: "Azerbaijan" },
  { code: "BAM", name: "Bosnia-Herzegovina Convertible Mark", symbol: "KM", flag: "🇧🇦", country: "Bosnia & Herzegovina" },
  { code: "BYN", name: "Belarusian Ruble", symbol: "Br", flag: "🇧🇾", country: "Belarus" },
  { code: "GEL", name: "Georgian Lari", symbol: "₾", flag: "🇬🇪", country: "Georgia" },
  { code: "KGS", name: "Kyrgystani Som", symbol: "лв", flag: "🇰🇬", country: "Kyrgyzstan" },
  { code: "MDL", name: "Moldovan Leu", symbol: "L", flag: "🇲🇩", country: "Moldova" },
  { code: "MKD", name: "Macedonian Denar", symbol: "ден", flag: "🇲🇰", country: "North Macedonia" },
  { code: "RSD", name: "Serbian Dinar", symbol: "дин", flag: "🇷🇸", country: "Serbia" },
  { code: "TMT", name: "Turkmenistani Manat", symbol: "T", flag: "🇹🇲", country: "Turkmenistan" },
  { code: "UAH", name: "Ukrainian Hryvnia", symbol: "₴", flag: "🇺🇦", country: "Ukraine" },
  { code: "AFN", name: "Afghan Afghani", symbol: "؋", flag: "🇦🇫", country: "Afghanistan" },
  { code: "BTN", name: "Bhutanese Ngultrum", symbol: "Nu", flag: "🇧🇹", country: "Bhutan" },
  { code: "FJD", name: "Fijian Dollar", symbol: "$", flag: "🇫🇯", country: "Fiji" },
  { code: "PGK", name: "Papua New Guinean Kina", symbol: "K", flag: "🇵🇬", country: "Papua New Guinea" },
  { code: "WST", name: "Samoan Tala", symbol: "T", flag: "🇼🇸", country: "Samoa" },
  { code: "TOP", name: "Tongan Paʻanga", symbol: "T$", flag: "🇹🇴", country: "Tonga" },
  { code: "VUV", name: "Vanuatu Vatu", symbol: "VT", flag: "🇻🇺", country: "Vanuatu" },
  { code: "DOP", name: "Dominican Peso", symbol: "$", flag: "🇩🇴", country: "Dominican Republic" },
  { code: "GTQ", name: "Guatemalan Quetzal", symbol: "Q", flag: "🇬🇹", country: "Guatemala" },
  { code: "HNL", name: "Honduran Lempira", symbol: "L", flag: "🇭🇳", country: "Honduras" },
  { code: "JMD", name: "Jamaican Dollar", symbol: "$", flag: "🇯🇲", country: "Jamaica" },
  { code: "KYD", name: "Cayman Islands Dollar", symbol: "$", flag: "🇰🇾", country: "Cayman Islands" },
  { code: "NIO", name: "Nicaraguan Córdoba", symbol: "C$", flag: "🇳🇮", country: "Nicaragua" },
  { code: "PAB", name: "Panamanian Balboa", symbol: "B/.", flag: "🇵🇦", country: "Panama" },
  { code: "TTD", name: "Trinidad and Tobago Dollar", symbol: "TT$", flag: "🇹🇹", country: "Trinidad & Tobago" },
  { code: "XCD", name: "East Caribbean Dollar", symbol: "$", flag: "🇱🇨", country: "Eastern Caribbean States" },
  { code: "BBD", name: "Barbadian Dollar", symbol: "$", flag: "🇧🇧", country: "Barbados" },
  { code: "BMD", name: "Bermudan Dollar", symbol: "$", flag: "🇧🇲", country: "Bermuda" },
  { code: "BSD", name: "Bahamian Dollar", symbol: "$", flag: "🇧🇸", country: "Bahamas" },
  { code: "CRC", name: "Costa Rican Colón", symbol: "₡", flag: "🇨🇷", country: "Costa Rica" },
  { code: "CUP", name: "Cuban Peso", symbol: "$", flag: "🇨🇺", country: "Cuba" },
  { code: "HTG", name: "Haitian Gourde", symbol: "G", flag: "🇭🇹", country: "Haiti" },
  { code: "JOD", name: "Jordanian Dinar", symbol: "JD", flag: "🇯🇴", country: "Jordan" },
  { code: "LBP", name: "Lebanese Pound", symbol: "£", flag: "🇱🇧", country: "Lebanon" },
  { code: "LYD", name: "Libyan Dinar", symbol: "LD", flag: "��", country: "Libya" },
  { code: "MAD", name: "Moroccan Dirham", symbol: "DH", flag: "🇲🇦", country: "Morocco" },
  { code: "SYP", name: "Syrian Pound", symbol: "£", flag: "🇸🇾", country: "Syria" },
  { code: "YER", name: "Yemeni Rial", symbol: "﷼", flag: "🇾🇪", country: "Yemen" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇩🇪", country: "Germany" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇫🇷", country: "France" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "��", country: "Italy" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇸", country: "Spain" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇵🇹", country: "Portugal" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇳🇱", country: "Netherlands" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇧🇪", country: "Belgium" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇱�", country: "Luxembourg" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇦🇹", country: "Austria" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇫🇮", country: "Finland" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇮🇪", country: "Ireland" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇬🇷", country: "Greece" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇨🇾", country: "Cyprus" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇲�", country: "Malta" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇸🇰", country: "Slovakia" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇸🇮", country: "Slovenia" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇱🇹", country: "Lithuania" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "��", country: "Latvia" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇪", country: "Estonia" },
  { code: "XAF", name: "CFA Franc BEAC", symbol: "FCFA", flag: "🇨🇫", country: "Central African Republic" },
  { code: "XAF", name: "CFA Franc BEAC", symbol: "FCFA", flag: "🇹🇩", country: "Chad" },
  { code: "XAF", name: "CFA Franc BEAC", symbol: "FCFA", flag: "🇬🇶", country: "Equatorial Guinea" },
  { code: "XAF", name: "CFA Franc BEAC", symbol: "FCFA", flag: "�🇦", country: "Gabon" },
  { code: "XAF", name: "CFA Franc BEAC", symbol: "FCFA", flag: "🇨🇩", country: "Congo (DRC)" },
  { code: "XAF", name: "CFA Franc BEAC", symbol: "FCFA", flag: "🇨🇬", country: "Congo (Republic)" },
  { code: "XOF", name: "CFA Franc BCEAO", symbol: "CFA", flag: "🇧🇯", country: "Benin" },
  { code: "XOF", name: "CFA Franc BCEAO", symbol: "CFA", flag: "🇧🇫", country: "Burkina Faso" },
  { code: "XOF", name: "CFA Franc BCEAO", symbol: "CFA", flag: "🇧🇮", country: "Burundi" },
  { code: "XOF", name: "CFA Franc BCEAO", symbol: "CFA", flag: "🇨🇻", country: "Cabo Verde" },
  { code: "XOF", name: "CFA Franc BCEAO", symbol: "CFA", flag: "🇨🇮", country: "Côte d'Ivoire" },
  { code: "XOF", name: "CFA Franc BCEAO", symbol: "CFA", flag: "��", country: "Guinea-Bissau" },
  { code: "XOF", name: "CFA Franc BCEAO", symbol: "CFA", flag: "🇱🇮", country: "Liberia" },
  { code: "XOF", name: "CFA Franc BCEAO", symbol: "CFA", flag: "🇲🇱", country: "Mali" },
  { code: "XOF", name: "CFA Franc BCEAO", symbol: "CFA", flag: "🇲🇷", country: "Mauritania" },
  { code: "XOF", name: "CFA Franc BCEAO", symbol: "CFA", flag: "🇳🇪", country: "Niger" },
  { code: "XOF", name: "CFA Franc BCEAO", symbol: "CFA", flag: "🇸🇳", country: "Senegal" },
  { code: "XOF", name: "CFA Franc BCEAO", symbol: "CFA", flag: "��", country: "Togo" },
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇦🇬", country: "Antigua & Barbuda" },
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇧🇿", country: "Belize" },
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇧🇴", country: "Bolivia" },
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇩🇲", country: "Dominica" },
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇪🇨", country: "Ecuador" },
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇸🇻", country: "El Salvador" },
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇬🇾", country: "Guyana" },
  { code: "USD", name: "US Dollar", symbol: "$", flag: "�🇳", country: "Honduras" },
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇰🇳", country: "Saint Kitts & Nevis" },
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇱🇨", country: "Saint Lucia" },
  { code: "USD", name: "US Dollar", symbol: "$", flag: "��", country: "Saint Vincent & Grenadines" },
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇸🇷", country: "Suriname" },
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇾", country: "Uruguay" },
  { code: "USD", name: "US Dollar", symbol: "$", flag: "�🇺", country: "Vanuatu" },
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇵🇼", country: "Palau" },
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇫�", country: "Micronesia" },
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇲🇭", country: "Marshall Islands" },
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇳�", country: "Nauru" },
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇹🇻", country: "Tuvalu" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇲🇨", country: "Monaco" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇻🇦", country: "Vatican City" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇸🇲", country: "San Marino" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇦🇩", country: "Andorra" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "��", country: "Montenegro" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇽🇰", country: "Kosovo" },
  { code: "CHF", name: "Swiss Franc", symbol: "Fr", flag: "🇱🇮", country: "Liechtenstein" },
  { code: "NOK", name: "Norwegian Krone", symbol: "kr", flag: "🇸🇯", country: "Svalbard & Jan Mayen" },
  { code: "SEK", name: "Swedish Krona", symbol: "kr", flag: "🇫🇴", country: "Faroe Islands" },
  { code: "DKK", name: "Danish Krone", symbol: "kr", flag: "🇬🇱", country: "Greenland" },
  { code: "JOD", name: "Jordanian Dinar", symbol: "JD", flag: "🇵🇸", country: "Palestine" },
  { code: "ILS", name: "Israeli Shekel", symbol: "₪", flag: "🇵🇸", country: "Palestine" },
  { code: "KWD", name: "Kuwaiti Dinar", symbol: "د.ك", flag: "🇰🇬", country: "Kyrgyzstan" },
  { code: "SAR", name: "Saudi Riyal", symbol: "﷼", flag: "🇸�", country: "Saudi Arabia" },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ", flag: "🇦🇪", country: "United Arab Emirates" },
  { code: "QAR", name: "Qatari Riyal", symbol: "ر.ق", flag: "🇶🇦", country: "Qatar" },
  { code: "OMR", name: "Omani Rial", symbol: "ر.ع", flag: "🇴🇲", country: "Oman" },
  { code: "BHD", name: "Bahraini Dinar", symbol: ".د.ب", flag: "🇧🇭", country: "Bahrain" },
  { code: "KWD", name: "Kuwaiti Dinar", symbol: "د.ك", flag: "🇰🇼", country: "Kuwait" },
  { code: "SDG", name: "Sudanese Pound", symbol: "£", flag: "🇸🇩", country: "Sudan" },
  { code: "SSP", name: "South Sudanese Pound", symbol: "£", flag: "�🇸", country: "South Sudan" },
  { code: "STN", name: "São Tomé & Príncipe Dobra", symbol: "Db", flag: "🇸🇹", country: "São Tomé & Príncipe" },
  { code: "MRO", name: "Mauritanian Ouguiya", symbol: "UM", flag: "��", country: "Mauritania" },
  { code: "KPW", name: "North Korean Won", symbol: "₩", flag: "🇰🇵", country: "North Korea" },
  { code: "MMK", name: "Myanmar Kyat", symbol: "K", flag: "🇲🇲", country: "Myanmar" },
  { code: "VEF", name: "Venezuelan Bolívar", symbol: "Bs", flag: "🇻�", country: "Venezuela" },
]

const POPULAR_CURRENCIES = ["USD", "EUR", "GBP", "PKR", "INR", "AED", "SAR", "JPY", "CNY", "CAD", "AUD"]

const getFlag = (code: string) => {
  const currency = ALL_CURRENCIES.find(c => c.code === code)
  return currency?.flag || "🏳️"
}

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
    const uniqueMap = new Map()
    const query = searchQuery.toLowerCase()
    const filtered = ALL_CURRENCIES.filter(c =>
      c.code.toLowerCase().includes(query) ||
      c.name.toLowerCase().includes(query) ||
      c.country.toLowerCase().includes(query)
    )
    filtered.forEach(c => uniqueMap.set(`${c.code}-${c.country}`, c))
    return Array.from(uniqueMap.values())
  }, [searchQuery])

  const selectedCurrency = useMemo(() => {
    return ALL_CURRENCIES.find(c => c.code === value)
  }, [value])

  return (
    <div className="space-y-2">
      <Label className="text-base font-semibold">{label}</Label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full h-16 px-5 flex items-center justify-between rounded-2xl border-2 bg-card hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 text-left group shadow-sm hover:shadow-md"
        >
          <div className="flex items-center gap-4">
            <span className="text-4xl leading-none">{selectedCurrency?.flag || "🏳️"}</span>
            <div>
              <div className="font-black text-xl leading-tight">{value}</div>
              <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                {selectedCurrency?.name} • {selectedCurrency?.country}
              </div>
            </div>
          </div>
          <div className="text-muted-foreground group-hover:text-primary transition-colors">
            <Search className="h-6 w-6" />
          </div>
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-3 z-50 bg-card border-2 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="p-4 border-b bg-gradient-to-r from-primary/5 to-transparent">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search currency, name, or country..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-base rounded-xl border-primary/20 focus:border-primary"
                  autoFocus
                />
              </div>
            </div>

            <ScrollArea className="h-[380px]">
              <div className="p-3 space-y-2">
                <div className="px-2 py-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Popular Currencies
                </div>
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
                      className={`w-full p-4 rounded-xl flex items-center gap-4 hover:bg-primary/10 hover:border-primary/30 border border-transparent transition-all duration-200 ${value === code ? "bg-primary/15 border-primary/40 shadow-md" : ""}`}
                    >
                      <span className="text-4xl leading-none">{curr.flag}</span>
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-lg">{code}</span>
                          <Badge variant="secondary" className="text-xs px-2 py-0.5">Popular</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">{curr.name} • {curr.country}</div>
                      </div>
                    </button>
                  )
                })}
                <div className="my-3 border-t-2 border-dashed" />
                <div className="px-2 py-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  All Currencies & Countries ({filteredCurrencies.filter(c => c.code !== otherValue).length})
                </div>
                {filteredCurrencies.filter(c => c.code !== otherValue).map((curr, idx) => (
                  <button
                    key={`${curr.code}-${curr.country}-${idx}`}
                    type="button"
                    onClick={() => {
                      onChange(curr.code)
                      setIsOpen(false)
                      setSearchQuery("")
                    }}
                    className={`w-full p-4 rounded-xl flex items-center gap-4 hover:bg-primary/10 hover:border-primary/30 border border-transparent transition-all duration-200 ${value === curr.code ? "bg-primary/15 border-primary/40 shadow-md" : ""}`}
                  >
                    <span className="text-4xl leading-none">{curr.flag}</span>
                    <div className="flex-1 text-left">
                      <div className="font-black text-lg">{curr.code}</div>
                      <div className="text-sm text-muted-foreground">{curr.name} • {curr.country}</div>
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

  const fetchRates = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`)
      if (!response.ok) throw new Error("Failed to fetch rates")
      const data = await response.json()
      setRates(data.rates)
      setLastUpdated(new Date().toLocaleString())
      toast.success("🎉 Exchange rates updated!")
    } catch (err) {
      console.error("Error fetching rates:", err)
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
        BGN: 1.85,
      })
      setLastUpdated(new Date().toLocaleString())
      toast.warning("⚠️ Using cached rates")
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
    const temp = fromCurrency
    setFromCurrency(toCurrency)
    setToCurrency(temp)
  }

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      <Card className="border-2 border-primary/20 shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 p-8 md:p-10 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h3 className="text-4xl md:text-5xl font-black flex items-center gap-4">
                <Coins className="h-10 w-10" /> 
                Currency Converter
              </h3>
              <p className="text-white/80 mt-3 text-lg">
                Real-time exchange rates • All countries & currencies • 100% free & accurate
              </p>
            </div>
            <div className="flex flex-col items-end gap-3">
              {lastUpdated && (
                <p className="text-sm opacity-90 flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                  <Clock className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} /> 
                  {isLoading ? "Updating..." : `Last update: ${lastUpdated}`}
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
          {error && (
            <div className="bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-2xl flex items-center gap-4">
              <Info className="h-7 w-7" />
              <p className="text-lg font-medium">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-3 space-y-3">
              <Label className="text-lg font-bold">Amount</Label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                className="h-16 text-3xl font-black rounded-2xl border-2 border-primary/20 focus:border-primary"
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

            <div className="flex justify-center pb-1 lg:col-span-1">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-16 w-16 hover:rotate-180 transition-transform duration-500 border-2 border-primary hover:border-primary hover:bg-primary/10 shadow-lg"
                onClick={swapCurrencies}
              >
                <ArrowLeftRight className="h-7 w-7" />
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

          <div className="pt-12 border-t-4 text-center space-y-8">
            <div className="space-y-4">
              <p className="text-xl text-muted-foreground font-semibold">
                {amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {getCurrencyName(fromCurrency)} =
              </p>
              <h2 className="text-7xl md:text-8xl font-black text-primary break-all tracking-tight">
                {isLoading ? (
                  <span className="animate-pulse">...</span>
                ) : result !== null ? (
                  `${result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${toCurrency}`
                ) : (
                  "—"
                )}
              </h2>
              {rates && !isLoading && (
                <p className="text-lg text-muted-foreground space-x-4">
                  <span>1 {fromCurrency} = {(rates[toCurrency] / rates[fromCurrency]).toFixed(6)} {toCurrency}</span>
                  <span className="text-muted-foreground/50">•</span>
                  <span>1 {toCurrency} = {(rates[fromCurrency] / rates[toCurrency]).toFixed(6)} {fromCurrency}</span>
                </p>
              )}
            </div>
            
            <Button 
              onClick={convert} 
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-2 border-2 border-primary/10">
          <CardContent className="p-8 space-y-6">
            <h4 className="text-2xl font-black flex items-center gap-3">
              <TrendingUp className="h-7 w-7 text-green-600" /> 
              Popular Conversions
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                    className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-muted/50 to-muted hover:from-primary/10 hover:to-primary/5 hover:border-primary/30 border-2 rounded-2xl transition-all duration-300 group text-left"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-4xl">{getFlag(from)}</span>
                      <span className="text-2xl font-black text-primary group-hover:scale-110 transition-transform">/</span>
                      <span className="text-4xl">{getFlag(to)}</span>
                    </div>
                    <p className="font-bold text-xl text-center">{pair}</p>
                    {rate && (
                      <p className="font-mono font-black text-lg text-primary mt-2 group-hover:scale-105 transition-transform">
                        {rate.toFixed(2)}
                      </p>
                    )}
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-2 border-blue-100">
          <CardContent className="p-8 space-y-6">
            <h4 className="text-2xl font-black flex items-center gap-3 text-blue-700">
              <Star className="h-7 w-7" /> 
              Why Choose Us?
            </h4>
            <ul className="space-y-4">
              {[
                { icon: Zap, title: "Real-time Rates", desc: "Live exchange rate updates" },
                { icon: Globe, title: "All Countries", desc: "195+ countries supported" },
                { icon: Search, title: "Easy Search", desc: "Find any country instantly" },
                { icon: Shield, title: "100% Free", desc: "No hidden costs or subscriptions" },
                { icon: Star, title: "Privacy First", desc: "No data stored on our servers" },
                { icon: Globe, title: "Mobile Friendly", desc: "Works perfectly on all devices" },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <item.icon className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-black text-blue-900 text-lg">{item.title}:</span>{" "}
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
