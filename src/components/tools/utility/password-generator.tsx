"use client"

import { useState, useEffect } from "react"
import { Copy, RefreshCw, Shield, ShieldCheck, ShieldAlert, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"

export default function PasswordGenerator() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState(16)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [strength, setStrength] = useState({ label: "Weak", color: "text-destructive", score: 0 })

  const generatePassword = () => {
    const lowercase = "abcdefghijklmnopqrstuvwxyz"
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const numbers = "0123456789"
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?"

    let charset = lowercase
    if (includeUppercase) charset += uppercase
    if (includeNumbers) charset += numbers
    if (includeSymbols) charset += symbols

    let generatedPassword = ""
    for (let i = 0; i < length; i++) {
      generatedPassword += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    setPassword(generatedPassword)
    calculateStrength(generatedPassword)
  }

  const calculateStrength = (pwd: string) => {
    let score = 0
    if (pwd.length > 8) score++
    if (pwd.length > 12) score++
    if (/[A-Z]/.test(pwd)) score++
    if (/[0-9]/.test(pwd)) score++
    if (/[^A-Za-z0-9]/.test(pwd)) score++

    if (score <= 2) setStrength({ label: "Weak", color: "text-destructive", score })
    else if (score <= 4) setStrength({ label: "Medium", color: "text-yellow-500", score })
    else setStrength({ label: "Strong", color: "text-green-500", score })
  }

  const copyToClipboard = () => {
    if (!password) return
    navigator.clipboard.writeText(password)
    toast.success("Password copied!")
  }

  useEffect(() => {
    generatePassword()
  }, [length, includeUppercase, includeNumbers, includeSymbols])

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="space-y-4">
        <div className="relative">
          <Input
            readOnly
            value={password}
            className="h-16 text-2xl font-mono text-center pr-24 border-2 border-primary/20 bg-muted/30"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
            <Button variant="ghost" size="icon" onClick={generatePassword} className="h-12 w-12">
              <RefreshCw className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" onClick={copyToClipboard} className="h-12 w-12">
              <Copy className="h-6 w-6" />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            {strength.label === "Strong" ? (
              <ShieldCheck className={`h-5 w-5 ${strength.color}`} />
            ) : strength.label === "Medium" ? (
              <Shield className={`h-5 w-5 ${strength.color}`} />
            ) : (
              <ShieldAlert className={`h-5 w-5 ${strength.color}`} />
            )}
            <span className={`font-bold ${strength.color}`}>Strength: {strength.label}</span>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`h-2 w-8 rounded-full ${
                  i <= strength.score ? (strength.score > 4 ? "bg-green-500" : strength.score > 2 ? "bg-yellow-500" : "bg-destructive") : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-lg">Password Length</Label>
              <span className="text-2xl font-bold text-primary">{length}</span>
            </div>
            <Slider
              value={[length]}
              min={6}
              max={64}
              step={1}
              onValueChange={(val) => setLength(val[0])}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3">
              <Checkbox
                id="uppercase"
                checked={includeUppercase}
                onCheckedChange={(checked) => setIncludeUppercase(checked as boolean)}
              />
              <Label htmlFor="uppercase" className="text-base cursor-pointer">Include Uppercase</Label>
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox
                id="numbers"
                checked={includeNumbers}
                onCheckedChange={(checked) => setIncludeNumbers(checked as boolean)}
              />
              <Label htmlFor="numbers" className="text-base cursor-pointer">Include Numbers</Label>
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox
                id="symbols"
                checked={includeSymbols}
                onCheckedChange={(checked) => setIncludeSymbols(checked as boolean)}
              />
              <Label htmlFor="symbols" className="text-base cursor-pointer">Include Symbols</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button variant="outline" className="h-12" onClick={() => setLength(12)}>12 Characters</Button>
        <Button variant="outline" className="h-12" onClick={() => setLength(24)}>24 Characters</Button>
        <Button variant="outline" className="h-12" onClick={() => setLength(32)}>32 Characters</Button>
      </div>

      <p className="text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
        <Lock className="h-4 w-4" /> Passwords are generated locally and never leave your device.
      </p>
    </div>
  )
}

function Input(props: any) {
  return (
    <input
      {...props}
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${props.className}`}
    />
  )
}
