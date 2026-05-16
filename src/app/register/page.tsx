"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import toast from "react-hot-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TrendingUp, Eye, EyeOff, Check } from "lucide-react"

const COUNTRIES = [
  "United States", "United Kingdom", "Canada", "Australia", "Germany",
  "France", "UAE", "Singapore", "Nigeria", "South Africa", "India",
  "Japan", "Brazil", "Mexico", "Other"
]

const strengthLevels = [
  { min: 0, label: "", color: "" },
  { min: 1, label: "Weak", color: "bg-red-500" },
  { min: 2, label: "Fair", color: "bg-orange-500" },
  { min: 3, label: "Good", color: "bg-yellow-500" },
  { min: 4, label: "Strong", color: "bg-green-500" },
]

function getStrength(pwd: string): number {
  let score = 0
  if (pwd.length >= 8) score++
  if (/[A-Z]/.test(pwd)) score++
  if (/[0-9]/.test(pwd)) score++
  if (/[^A-Za-z0-9]/.test(pwd)) score++
  return score
}

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "", phone: "", country: "" })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [agreed, setAgreed] = useState(false)

  const strength = getStrength(form.password)
  const level = strengthLevels[strength]

  function update(field: string, value: string) {
    setForm((p) => ({ ...p, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (form.password !== form.confirm) {
      toast.error("Passwords do not match")
      return
    }

    if (!agreed) {
      toast.error("Please agree to terms & conditions")
      return
    }

    setLoading(true)

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
        country: form.country,
      }),
    })

    const data = await res.json()
    setLoading(false)

    if (!res.ok) {
      toast.error(data.error || "Registration failed")
    } else {
      toast.success("Account created! Please sign in.")
      router.push("/login")
    }
  }

  return (
    <div className="min-h-screen bg-[#0A1628] flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#060e1a] to-[#0d1f3c] flex-col justify-between p-12 border-r border-[#1a2f4a]">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#b8961e] rounded-xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-[#0A1628]" />
          </div>
          <span className="text-white font-bold text-2xl">
            Nex<span className="text-[#D4AF37]">Vest</span> Capital
          </span>
        </Link>

        <div>
          <h2 className="text-4xl font-bold text-white mb-6">
            Start your<br />
            <span className="text-[#D4AF37]">wealth journey</span><br />
            today
          </h2>

          <div className="space-y-4">
            {[
              { title: "No Hidden Fees", desc: "Transparent pricing with zero account maintenance fees" },
              { title: "Regulated & Secure", desc: "FCA and SEC authorized platform with bank-grade security" },
              { title: "Flexible Plans", desc: "From $500 Starter to $500K+ Diamond tier investments" },
              { title: "Expert Management", desc: "180+ certified portfolio managers working for your returns" },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#D4AF37]/20 border border-[#D4AF37]/40 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-white font-medium">{item.title}</p>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-gray-500 text-sm">
          © 2024 NexVest Capital Ltd. All investments carry risk.
        </p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-12 py-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-6">
            <div className="w-9 h-9 bg-gradient-to-br from-[#D4AF37] to-[#b8961e] rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#0A1628]" />
            </div>
            <span className="text-white font-bold text-xl">
              Nex<span className="text-[#D4AF37]">Vest</span> Capital
            </span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link href="/login" className="text-[#D4AF37] hover:underline">Sign in</Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-gray-300 text-sm font-medium mb-1.5 block">Full Name</label>
                <Input
                  placeholder="John Smith"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  required
                />
              </div>

              <div className="col-span-2">
                <label className="text-gray-300 text-sm font-medium mb-1.5 block">Email Address</label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-gray-300 text-sm font-medium mb-1.5 block">Phone (Optional)</label>
                <Input
                  type="tel"
                  placeholder="+1 555 0000"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                />
              </div>

              <div>
                <label className="text-gray-300 text-sm font-medium mb-1.5 block">Country</label>
                <select
                  value={form.country}
                  onChange={(e) => update("country", e.target.value)}
                  className="w-full h-11 px-3 rounded-md border border-[#1a2f4a] bg-[#0d1f3c] text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37] text-sm"
                >
                  <option value="">Select country</option>
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="col-span-2">
                <label className="text-gray-300 text-sm font-medium mb-1.5 block">Password</label>
                <div className="relative">
                  <Input
                    type={showPass ? "text" : "password"}
                    placeholder="Min. 8 characters"
                    value={form.password}
                    onChange={(e) => update("password", e.target.value)}
                    className="pr-10"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {form.password && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={`flex-1 h-1 rounded-full ${strength >= i ? level.color : "bg-[#1a2f4a]"}`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-400">{level.label} password</p>
                  </div>
                )}
              </div>

              <div className="col-span-2">
                <label className="text-gray-300 text-sm font-medium mb-1.5 block">Confirm Password</label>
                <Input
                  type="password"
                  placeholder="Repeat password"
                  value={form.confirm}
                  onChange={(e) => update("confirm", e.target.value)}
                  required
                />
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 rounded"
              />
              <span className="text-gray-400 text-sm">
                I agree to the{" "}
                <Link href="#" className="text-[#D4AF37] hover:underline">Terms of Service</Link>,{" "}
                <Link href="#" className="text-[#D4AF37] hover:underline">Privacy Policy</Link>, and{" "}
                <Link href="#" className="text-[#D4AF37] hover:underline">Risk Disclosure</Link>.
              </span>
            </label>

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? "Creating Account..." : "Create Free Account"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
