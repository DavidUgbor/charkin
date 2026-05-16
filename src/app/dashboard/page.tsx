"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp, DollarSign, BarChart3, Clock, Plus,
  ArrowUpRight, ArrowDownRight, Bell, Settings, LogOut,
  Shield, User, ChevronRight
} from "lucide-react"
import { signOut } from "next-auth/react"
import { formatCurrency, formatDate } from "@/lib/utils"
import { INVESTMENT_PLANS } from "@/lib/investment-plans"

interface DashboardData {
  user: { name: string; email: string; country: string | null }
  stats: {
    totalInvested: number
    totalEarned: number
    activeInvestments: number
    portfolioValue: number
  }
  investments: Array<{
    id: string
    planName: string
    amount: number
    returnRate: number
    status: string
    startDate: string
    endDate: string | null
    totalEarned: number
    nextPayout: string | null
  }>
  transactions: Array<{
    id: string
    type: string
    amount: number
    status: string
    description: string | null
    createdAt: string
  }>
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login")
  }, [status, router])

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/dashboard")
        .then((r) => r.json())
        .then(setData)
        .finally(() => setLoading(false))
    }
  }, [status])

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading your portfolio...</p>
        </div>
      </div>
    )
  }

  if (!session) return null

  const stats = data?.stats || { totalInvested: 0, totalEarned: 0, activeInvestments: 0, portfolioValue: 0 }

  return (
    <div className="min-h-screen bg-[#0A1628] flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 bg-[#060e1a] border-r border-[#1a2f4a] flex-col fixed h-full z-10">
        <div className="p-6 border-b border-[#1a2f4a]">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-[#D4AF37] to-[#b8961e] rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#0A1628]" />
            </div>
            <span className="text-white font-bold text-lg">
              Nex<span className="text-[#D4AF37]">Vest</span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {[
            { icon: BarChart3, label: "Dashboard", href: "/dashboard", active: true },
            { icon: TrendingUp, label: "My Investments", href: "/dashboard/investments" },
            { icon: DollarSign, label: "Invest Now", href: "/invest" },
            { icon: Clock, label: "Transactions", href: "/dashboard/transactions" },
            { icon: Shield, label: "Security", href: "/dashboard/security" },
            { icon: User, label: "Profile", href: "/dashboard/profile" },
            { icon: Settings, label: "Settings", href: "/dashboard/settings" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${
                item.active
                  ? "bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20"
                  : "text-gray-400 hover:text-white hover:bg-[#0d1f3c]"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-[#1a2f4a]">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-8 h-8 bg-[#D4AF37]/20 rounded-full flex items-center justify-center text-[#D4AF37] font-bold text-sm">
              {session.user.name[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{session.user.name}</p>
              <p className="text-gray-500 text-xs truncate">{session.user.email}</p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-2 text-gray-400 hover:text-red-400 text-sm px-2 py-1.5 w-full transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 lg:ml-64">
        {/* Top bar */}
        <header className="bg-[#060e1a]/50 border-b border-[#1a2f4a] px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-white font-bold text-xl">
              Good morning, {session.user.name.split(" ")[0]} 👋
            </h1>
            <p className="text-gray-400 text-sm">{new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 bg-[#0d1f3c] border border-[#1a2f4a] rounded-full flex items-center justify-center text-gray-400 hover:text-white">
              <Bell className="w-4 h-4" />
            </button>
            <Link href="/invest">
              <Button size="sm">
                <Plus className="w-4 h-4 mr-1" />
                New Investment
              </Button>
            </Link>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: "Portfolio Value",
                value: formatCurrency(stats.portfolioValue),
                change: "+12.4%",
                up: true,
                icon: TrendingUp,
                color: "text-[#D4AF37]",
              },
              {
                label: "Total Invested",
                value: formatCurrency(stats.totalInvested),
                change: "Total capital",
                up: true,
                icon: DollarSign,
                color: "text-blue-400",
              },
              {
                label: "Total Earned",
                value: formatCurrency(stats.totalEarned),
                change: "All time returns",
                up: true,
                icon: ArrowUpRight,
                color: "text-green-400",
              },
              {
                label: "Active Plans",
                value: stats.activeInvestments.toString(),
                change: "Running investments",
                up: true,
                icon: BarChart3,
                color: "text-purple-400",
              },
            ].map((s) => (
              <Card key={s.label}>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-gray-400 text-xs">{s.label}</p>
                    <div className={`w-8 h-8 bg-current/10 rounded-lg flex items-center justify-center ${s.color}`}>
                      <s.icon className="w-4 h-4" />
                    </div>
                  </div>
                  <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-gray-500 text-xs mt-1">{s.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Active Investments */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                  <CardTitle className="text-lg">Active Investments</CardTitle>
                  <Link href="/invest">
                    <Button size="sm" variant="outline">
                      <Plus className="w-3 h-3 mr-1" /> Add New
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  {data?.investments && data.investments.length > 0 ? (
                    <div className="space-y-3">
                      {data.investments.map((inv) => {
                        const plan = INVESTMENT_PLANS.find((p) => p.name === inv.planName)
                        return (
                          <div key={inv.id} className="flex items-center justify-between p-4 bg-[#0A1628]/50 border border-[#1a2f4a] rounded-xl">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${plan?.color || "from-gray-400 to-gray-600"} flex items-center justify-center`}>
                                <TrendingUp className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <p className="text-white font-medium">{inv.planName} Plan</p>
                                <p className="text-gray-400 text-xs">{inv.returnRate}% p.a. · Started {formatDate(inv.startDate)}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-white font-semibold">{formatCurrency(inv.amount)}</p>
                              <Badge variant="success" className="text-xs mt-1">Active</Badge>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <TrendingUp className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                      <p className="text-gray-400 mb-4">No active investments yet</p>
                      <Link href="/invest">
                        <Button>Start Investing</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Quick actions + recent transactions */}
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {[
                    { label: "Invest Now", href: "/invest", icon: Plus },
                    { label: "View All Plans", href: "/#plans", icon: TrendingUp },
                    { label: "Transaction History", href: "/dashboard/transactions", icon: Clock },
                  ].map((action) => (
                    <Link key={action.label} href={action.href}>
                      <div className="flex items-center justify-between p-3 bg-[#0A1628]/50 border border-[#1a2f4a] rounded-lg hover:border-[#D4AF37]/40 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                          <action.icon className="w-4 h-4 text-[#D4AF37]" />
                          <span className="text-gray-300 text-sm">{action.label}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-600" />
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  {data?.transactions && data.transactions.length > 0 ? (
                    <div className="space-y-3">
                      {data.transactions.slice(0, 4).map((tx) => (
                        <div key={tx.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                              tx.type === "deposit" ? "bg-green-500/10" : "bg-red-500/10"
                            }`}>
                              {tx.type === "deposit"
                                ? <ArrowDownRight className="w-3 h-3 text-green-400" />
                                : <ArrowUpRight className="w-3 h-3 text-red-400" />
                              }
                            </div>
                            <div>
                              <p className="text-white text-xs font-medium capitalize">{tx.type}</p>
                              <p className="text-gray-500 text-xs">{formatDate(tx.createdAt)}</p>
                            </div>
                          </div>
                          <p className={`text-sm font-semibold ${tx.type === "deposit" ? "text-green-400" : "text-red-400"}`}>
                            {tx.type === "deposit" ? "+" : "-"}{formatCurrency(tx.amount)}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm text-center py-4">No transactions yet</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
