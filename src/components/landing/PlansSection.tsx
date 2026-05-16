"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, TrendingUp } from "lucide-react"
import { INVESTMENT_PLANS, calculateReturns } from "@/lib/investment-plans"
import { formatCurrency } from "@/lib/utils"
import { useState } from "react"

export default function PlansSection() {
  const [investAmount, setInvestAmount] = useState(10000)

  return (
    <section id="plans" className="py-24 bg-[#060e1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Investment Plans</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your <span className="text-[#D4AF37]">Growth Path</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From conservative starter plans to elite diamond portfolios — find the investment tier that matches your ambition.
          </p>
        </div>

        {/* Calculator */}
        <div className="bg-[#0d1f3c] border border-[#1a2f4a] rounded-2xl p-6 mb-12 max-w-2xl mx-auto">
          <h3 className="text-white font-semibold mb-4 text-center">Returns Calculator</h3>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <label className="text-gray-400 text-sm mb-1 block">Investment Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                <input
                  type="number"
                  value={investAmount}
                  onChange={(e) => setInvestAmount(Number(e.target.value))}
                  className="w-full pl-7 pr-3 py-2.5 bg-[#0A1628] border border-[#1a2f4a] rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>
            <div className="text-center sm:text-left">
              <p className="text-gray-400 text-xs mb-1">Est. Annual Return (Gold Plan)</p>
              <p className="text-[#D4AF37] text-2xl font-bold">
                {formatCurrency(calculateReturns(investAmount, 18, 365))}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {INVESTMENT_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl border p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                plan.popular
                  ? "border-[#D4AF37] bg-gradient-to-b from-[#1a2f4a] to-[#0d1f3c] shadow-[0_0_40px_rgba(212,175,55,0.15)]"
                  : "border-[#1a2f4a] bg-[#0d1f3c]"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="whitespace-nowrap">{plan.badge}</Badge>
                </div>
              )}

              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4`}>
                <TrendingUp className="w-6 h-6 text-white" />
              </div>

              <h3 className="text-white text-xl font-bold mb-1">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-bold text-[#D4AF37]">{plan.returnRate}%</span>
                <span className="text-gray-400 text-sm">p.a.</span>
              </div>
              <p className="text-gray-400 text-xs mb-4">{plan.payoutFrequency} payouts</p>

              <div className="text-gray-300 text-xs mb-6">
                Min: <span className="text-white font-medium">{formatCurrency(plan.minAmount)}</span>
                {plan.maxAmount && (
                  <> · Max: <span className="text-white font-medium">{formatCurrency(plan.maxAmount)}</span></>
                )}
              </div>

              <ul className="space-y-2 mb-6 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link href={`/invest?plan=${plan.id}`}>
                <Button variant={plan.popular ? "default" : "outline"} className="w-full">
                  Invest Now
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
