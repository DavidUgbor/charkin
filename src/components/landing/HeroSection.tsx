"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, TrendingUp, Award, Users } from "lucide-react"
import { useEffect, useState } from "react"

const stats = [
  { label: "Assets Under Management", value: "$4.2B+", icon: TrendingUp },
  { label: "Happy Investors", value: "52,000+", icon: Users },
  { label: "Years of Excellence", value: "15+", icon: Award },
  { label: "Countries Served", value: "38+", icon: Shield },
]

export default function HeroSection() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const target = 4200000000
    const step = target / 80
    let current = 0
    const timer = setInterval(() => {
      current += step
      if (current >= target) { current = target; clearInterval(timer) }
      setCount(current)
    }, 30)
    return () => clearInterval(timer)
  }, [])

  const formatAUM = (n: number) => {
    if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B+`
    return `$${(n / 1e6).toFixed(0)}M`
  }

  return (
    <section className="relative min-h-screen bg-[#0A1628] flex items-center overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Glow effects */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full px-4 py-2 mb-6">
              <Shield className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-[#D4AF37] text-sm font-medium">FCA Authorized · SEC Registered</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Grow Wealth.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-amber-300">
                Build Legacy.
              </span>
            </h1>

            <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-lg">
              NexVest Capital delivers institutional-grade investment strategies to individuals and families worldwide. Earn up to <span className="text-[#D4AF37] font-semibold">35% annual returns</span> with complete transparency and security.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link href="/register">
                <Button size="xl" className="group">
                  Start Investing Today
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="#plans">
                <Button size="xl" variant="outline">
                  View Investment Plans
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center shrink-0">
                    <stat.icon className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg">
                      {stat.label === "Assets Under Management" ? formatAUM(count) : stat.value}
                    </div>
                    <div className="text-gray-400 text-xs">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            {/* Portfolio card */}
            <div className="bg-[#0d1f3c]/80 backdrop-blur border border-[#1a2f4a] rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-gray-400 text-sm">Portfolio Value</p>
                  <p className="text-3xl font-bold text-white">$284,750.00</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-1.5">
                  <span className="text-green-400 text-sm font-semibold">+18.4%</span>
                </div>
              </div>

              {/* Simulated chart bars */}
              <div className="flex items-end gap-2 h-32 mb-6">
                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t-sm transition-all duration-300"
                    style={{
                      height: `${h}%`,
                      background: i === 11 ? 'linear-gradient(to top, #D4AF37, #f0cc5e)' : 'rgba(212,175,55,0.2)'
                    }}
                  />
                ))}
              </div>

              <div className="space-y-3">
                {[
                  { name: "Gold Plan", amount: "+$12,840", pct: "+18%", color: "bg-amber-500" },
                  { name: "Platinum Plan", amount: "+$31,250", pct: "+25%", color: "bg-blue-500" },
                  { name: "Silver Plan", amount: "+$4,200", pct: "+12%", color: "bg-gray-400" },
                ].map((item) => (
                  <div key={item.name} className="flex items-center justify-between p-3 bg-[#0A1628]/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${item.color}`} />
                      <span className="text-gray-300 text-sm">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-white text-sm font-medium">{item.amount}</div>
                      <div className="text-green-400 text-xs">{item.pct} p.a.</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-bounce">
              Live Returns ↑
            </div>
            <div className="absolute -bottom-4 -left-4 bg-[#D4AF37] text-[#0A1628] text-xs font-bold px-3 py-2 rounded-xl shadow-lg">
              🔒 256-bit SSL Encrypted
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
