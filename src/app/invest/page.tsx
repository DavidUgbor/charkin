"use client"

import { useState, useEffect, Suspense } from "react"
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import toast from "react-hot-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp, Check, CreditCard, Building2, Shield,
  ArrowLeft, Lock, Info, ChevronRight
} from "lucide-react"
import { INVESTMENT_PLANS, calculateReturns, type InvestmentPlan } from "@/lib/investment-plans"
import { formatCurrency } from "@/lib/utils"

function InvestPageContent() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const planParam = searchParams.get("plan")

  const [selectedPlan, setSelectedPlan] = useState<InvestmentPlan | null>(null)
  const [amount, setAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank" | "wire">("card")
  const [step, setStep] = useState<"plan" | "amount" | "payment" | "confirm">("plan")
  const [loading, setLoading] = useState(false)
  const [cardData, setCardData] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  })

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login")
  }, [status, router])

  useEffect(() => {
    if (planParam) {
      const plan = INVESTMENT_PLANS.find((p) => p.id === planParam)
      if (plan) {
        setSelectedPlan(plan)
        setAmount(String(plan.minAmount))
        setStep("amount")
      }
    }
  }, [planParam])

  if (status === "loading") return (
    <div className="min-h-screen bg-[#0A1628] flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!session) return null

  const numAmount = parseFloat(amount) || 0
  const estimatedReturn = selectedPlan ? calculateReturns(numAmount, selectedPlan.returnRate, 365) : 0

  async function handlePayment() {
    if (!selectedPlan || numAmount < selectedPlan.minAmount) {
      toast.error(`Minimum investment is ${formatCurrency(selectedPlan?.minAmount || 0)}`)
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/investments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: selectedPlan.id, amount: numAmount }),
      })
      const data = await res.json()

      if (!res.ok) throw new Error(data.error)

      toast.success(`Investment of ${formatCurrency(numAmount)} in ${selectedPlan.name} plan confirmed!`)
      router.push("/dashboard")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Investment failed")
    } finally {
      setLoading(false)
    }
  }

  function formatCard(val: string) {
    return val.replace(/\D/g, "").replace(/(\d{4})/g, "$1 ").trim().slice(0, 19)
  }
  function formatExpiry(val: string) {
    return val.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2").slice(0, 5)
  }

  return (
    <div className="min-h-screen bg-[#0A1628]">
      {/* Header */}
      <header className="bg-[#060e1a] border-b border-[#1a2f4a] px-6 py-4 flex items-center gap-4">
        <Link href="/dashboard">
          <button className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-[#D4AF37] to-[#b8961e] rounded-lg flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-[#0A1628]" />
          </div>
          <span className="text-white font-bold">
            Nex<span className="text-[#D4AF37]">Vest</span> Capital
          </span>
        </div>
        <div className="ml-auto flex items-center gap-2 text-gray-400 text-sm">
          <Lock className="w-4 h-4" />
          <span>Secure Investment</span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {[
            { key: "plan", label: "Select Plan" },
            { key: "amount", label: "Set Amount" },
            { key: "payment", label: "Payment" },
            { key: "confirm", label: "Confirm" },
          ].map((s, i) => {
            const steps = ["plan", "amount", "payment", "confirm"]
            const currentIdx = steps.indexOf(step)
            const sIdx = steps.indexOf(s.key)
            const done = sIdx < currentIdx
            const active = s.key === step

            return (
              <div key={s.key} className="flex items-center gap-2">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all ${
                  active
                    ? "bg-[#D4AF37] text-[#0A1628] font-semibold"
                    : done
                    ? "bg-green-500/20 text-green-400"
                    : "bg-[#0d1f3c] text-gray-500 border border-[#1a2f4a]"
                }`}>
                  {done ? <Check className="w-3 h-3" /> : <span>{i + 1}</span>}
                  <span className="hidden sm:inline">{s.label}</span>
                </div>
                {i < 3 && <ChevronRight className="w-4 h-4 text-gray-600" />}
              </div>
            )
          })}
        </div>

        {/* Step: Select Plan */}
        {step === "plan" && (
          <div>
            <h2 className="text-3xl font-bold text-white text-center mb-2">Choose Your Investment Plan</h2>
            <p className="text-gray-400 text-center mb-10">Select the tier that matches your investment goals</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {INVESTMENT_PLANS.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => { setSelectedPlan(plan); setAmount(String(plan.minAmount)); setStep("amount") }}
                  className={`text-left p-5 rounded-2xl border-2 transition-all hover:-translate-y-1 ${
                    plan.popular
                      ? "border-[#D4AF37] bg-[#1a2f4a]"
                      : "border-[#1a2f4a] bg-[#0d1f3c] hover:border-[#D4AF37]/50"
                  }`}
                >
                  {plan.badge && <Badge className="mb-3 text-xs">{plan.badge}</Badge>}
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-3`}>
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-1">{plan.name}</h3>
                  <p className="text-[#D4AF37] text-2xl font-bold">{plan.returnRate}%<span className="text-sm text-gray-400 font-normal"> p.a.</span></p>
                  <p className="text-gray-400 text-xs mt-1">From {formatCurrency(plan.minAmount)}</p>
                  <p className="text-gray-500 text-xs">{plan.payoutFrequency} payouts</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step: Amount */}
        {step === "amount" && selectedPlan && (
          <div className="max-w-xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${selectedPlan.color} flex items-center justify-center`}>
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{selectedPlan.name} Plan</h2>
                <p className="text-[#D4AF37]">{selectedPlan.returnRate}% Annual Return · {selectedPlan.payoutFrequency} Payouts</p>
              </div>
            </div>

            <div className="bg-[#0d1f3c] border border-[#1a2f4a] rounded-2xl p-6 mb-6">
              <label className="text-gray-300 text-sm font-medium mb-2 block">Investment Amount (USD)</label>
              <div className="relative mb-4">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min={selectedPlan.minAmount}
                  max={selectedPlan.maxAmount || undefined}
                  className="w-full pl-8 pr-4 py-4 bg-[#0A1628] border border-[#1a2f4a] rounded-xl text-white text-2xl font-bold focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="flex gap-2 mb-6">
                {[
                  selectedPlan.minAmount,
                  selectedPlan.minAmount * 2,
                  selectedPlan.minAmount * 5,
                  selectedPlan.minAmount * 10,
                ].filter((v) => !selectedPlan.maxAmount || v <= selectedPlan.maxAmount).map((val) => (
                  <button
                    key={val}
                    onClick={() => setAmount(String(val))}
                    className="flex-1 py-2 text-sm border border-[#1a2f4a] rounded-lg text-gray-400 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
                  >
                    {val >= 1000 ? `$${val / 1000}K` : `$${val}`}
                  </button>
                ))}
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Investment Amount</span>
                  <span className="text-white font-medium">{formatCurrency(numAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Annual Return ({selectedPlan.returnRate}%)</span>
                  <span className="text-green-400 font-medium">+{formatCurrency(estimatedReturn)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Payout Frequency</span>
                  <span className="text-white">{selectedPlan.payoutFrequency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Per {selectedPlan.payoutFrequency.toLowerCase()} payout</span>
                  <span className="text-[#D4AF37] font-bold">
                    +{formatCurrency(calculateReturns(numAmount, selectedPlan.returnRate, selectedPlan.payoutDays))}
                  </span>
                </div>
                <div className="border-t border-[#1a2f4a] pt-3 flex justify-between">
                  <span className="text-gray-300 font-medium">Projected Annual Value</span>
                  <span className="text-white font-bold text-lg">{formatCurrency(numAmount + estimatedReturn)}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep("plan")} className="flex-1">
                Back
              </Button>
              <Button
                onClick={() => setStep("payment")}
                className="flex-1"
                disabled={numAmount < selectedPlan.minAmount}
              >
                Continue to Payment
              </Button>
            </div>

            {numAmount < selectedPlan.minAmount && (
              <p className="text-red-400 text-sm text-center mt-2">
                Minimum investment: {formatCurrency(selectedPlan.minAmount)}
              </p>
            )}
          </div>
        )}

        {/* Step: Payment */}
        {step === "payment" && selectedPlan && (
          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-2">Payment Details</h2>
            <p className="text-gray-400 mb-6">Investing {formatCurrency(numAmount)} in {selectedPlan.name} Plan</p>

            {/* Payment method tabs */}
            <div className="flex gap-2 mb-6">
              {[
                { key: "card" as const, label: "Credit/Debit Card", icon: CreditCard },
                { key: "bank" as const, label: "Bank Transfer", icon: Building2 },
                { key: "wire" as const, label: "Wire Transfer", icon: Shield },
              ].map((m) => (
                <button
                  key={m.key}
                  onClick={() => setPaymentMethod(m.key)}
                  className={`flex-1 flex flex-col items-center gap-1 p-3 rounded-xl border text-xs transition-colors ${
                    paymentMethod === m.key
                      ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]"
                      : "border-[#1a2f4a] bg-[#0d1f3c] text-gray-400 hover:border-gray-500"
                  }`}
                >
                  <m.icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{m.label}</span>
                </button>
              ))}
            </div>

            {paymentMethod === "card" && (
              <div className="bg-[#0d1f3c] border border-[#1a2f4a] rounded-2xl p-6 space-y-4">
                <div>
                  <label className="text-gray-300 text-sm mb-1.5 block">Card Number</label>
                  <Input
                    placeholder="1234 5678 9012 3456"
                    value={cardData.number}
                    onChange={(e) => setCardData((d) => ({ ...d, number: formatCard(e.target.value) }))}
                    maxLength={19}
                  />
                </div>
                <div>
                  <label className="text-gray-300 text-sm mb-1.5 block">Cardholder Name</label>
                  <Input
                    placeholder="John Smith"
                    value={cardData.name}
                    onChange={(e) => setCardData((d) => ({ ...d, name: e.target.value }))}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-300 text-sm mb-1.5 block">Expiry Date</label>
                    <Input
                      placeholder="MM/YY"
                      value={cardData.expiry}
                      onChange={(e) => setCardData((d) => ({ ...d, expiry: formatExpiry(e.target.value) }))}
                      maxLength={5}
                    />
                  </div>
                  <div>
                    <label className="text-gray-300 text-sm mb-1.5 block">CVV</label>
                    <Input
                      type="password"
                      placeholder="123"
                      value={cardData.cvv}
                      onChange={(e) => setCardData((d) => ({ ...d, cvv: e.target.value.slice(0, 4) }))}
                      maxLength={4}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 bg-[#0A1628]/50 p-3 rounded-lg">
                  <Lock className="w-3 h-3 text-[#D4AF37] shrink-0" />
                  <span>Your card information is encrypted with 256-bit SSL. NexVest never stores your card details.</span>
                </div>
              </div>
            )}

            {paymentMethod === "bank" && (
              <div className="bg-[#0d1f3c] border border-[#1a2f4a] rounded-2xl p-6">
                <p className="text-gray-300 mb-4">Transfer funds to our account:</p>
                <div className="space-y-3">
                  {[
                    { label: "Bank Name", value: "Barclays Bank PLC" },
                    { label: "Account Name", value: "NexVest Capital Ltd" },
                    { label: "Account Number", value: "12345678" },
                    { label: "Sort Code", value: "20-47-92" },
                    { label: "IBAN", value: "GB29BARC20474916498774" },
                    { label: "Reference", value: `NVC-${session?.user.id?.slice(-8).toUpperCase()}` },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between py-2 border-b border-[#1a2f4a] last:border-0">
                      <span className="text-gray-400 text-sm">{row.label}</span>
                      <span className="text-white font-mono text-sm">{row.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                  <p className="text-amber-400 text-xs flex items-start gap-2">
                    <Info className="w-3 h-3 shrink-0 mt-0.5" />
                    Include your reference code in the transfer. Funds typically appear within 1-3 business days.
                  </p>
                </div>
              </div>
            )}

            {paymentMethod === "wire" && (
              <div className="bg-[#0d1f3c] border border-[#1a2f4a] rounded-2xl p-6">
                <p className="text-gray-300 mb-4">International wire transfer details:</p>
                <div className="space-y-3">
                  {[
                    { label: "Beneficiary", value: "NexVest Capital Ltd" },
                    { label: "Bank", value: "JPMorgan Chase Bank N.A." },
                    { label: "SWIFT/BIC", value: "CHASUS33" },
                    { label: "Account", value: "400-112-9947" },
                    { label: "ABA Routing", value: "021000021" },
                    { label: "Address", value: "383 Madison Ave, New York NY 10179" },
                    { label: "Reference", value: `NVC-${session?.user.id?.slice(-8).toUpperCase()}` },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between py-2 border-b border-[#1a2f4a] last:border-0">
                      <span className="text-gray-400 text-sm">{row.label}</span>
                      <span className="text-white font-mono text-sm">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <Button variant="outline" onClick={() => setStep("amount")} className="flex-1">Back</Button>
              <Button onClick={() => setStep("confirm")} className="flex-1">Review Investment</Button>
            </div>
          </div>
        )}

        {/* Step: Confirm */}
        {step === "confirm" && selectedPlan && (
          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-2">Confirm Investment</h2>
            <p className="text-gray-400 mb-6">Please review your investment details before confirming</p>

            <div className="bg-[#0d1f3c] border border-[#1a2f4a] rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[#1a2f4a]">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${selectedPlan.color} flex items-center justify-center`}>
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-white text-xl font-bold">{selectedPlan.name} Plan</h3>
                  <p className="text-[#D4AF37]">{selectedPlan.returnRate}% Annual Return</p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                {[
                  { label: "Investment Amount", value: formatCurrency(numAmount), highlight: false },
                  { label: "Annual Return Rate", value: `${selectedPlan.returnRate}%`, highlight: false },
                  { label: "Payout Frequency", value: selectedPlan.payoutFrequency, highlight: false },
                  { label: "Payment Method", value: paymentMethod === "card" ? "Credit/Debit Card" : paymentMethod === "bank" ? "Bank Transfer" : "Wire Transfer", highlight: false },
                  { label: "Estimated Annual Earnings", value: `+${formatCurrency(estimatedReturn)}`, highlight: true },
                  { label: "Projected Annual Value", value: formatCurrency(numAmount + estimatedReturn), highlight: true },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between py-2 border-b border-[#1a2f4a] last:border-0">
                    <span className="text-gray-400">{row.label}</span>
                    <span className={row.highlight ? "text-[#D4AF37] font-bold" : "text-white"}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl mb-6">
              <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <p className="text-blue-300 text-sm">
                By confirming, you agree to our investment terms. Returns are estimated and subject to market conditions. All investments carry risk.
              </p>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep("payment")} className="flex-1">Back</Button>
              <Button onClick={handlePayment} className="flex-1" disabled={loading}>
                {loading ? "Processing..." : `Confirm ${formatCurrency(numAmount)} Investment`}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function InvestPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <InvestPageContent />
    </Suspense>
  )
}
