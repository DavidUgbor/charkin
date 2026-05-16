"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import toast from "react-hot-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TrendingUp, Eye, EyeOff, Lock, Mail } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    setLoading(false)

    if (res?.error) {
      toast.error("Invalid email or password")
    } else {
      toast.success("Welcome back!")
      router.push("/dashboard")
      router.refresh()
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
          <h2 className="text-4xl font-bold text-white mb-4">
            Welcome back to your<br />
            <span className="text-[#D4AF37]">wealth journey</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Your investments are growing every day. Log in to check your portfolio, manage your plans, and view your latest returns.
          </p>

          <div className="space-y-4">
            {[
              { label: "Total AUM", value: "$4.2B+" },
              { label: "Active Investors", value: "52,000+" },
              { label: "Avg Annual Return", value: "19.4%" },
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between p-4 bg-[#0A1628]/60 border border-[#1a2f4a] rounded-xl">
                <span className="text-gray-400">{s.label}</span>
                <span className="text-[#D4AF37] font-bold text-xl">{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-gray-500 text-sm">
          © 2024 NexVest Capital Ltd. All investments carry risk.
        </p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-9 h-9 bg-gradient-to-br from-[#D4AF37] to-[#b8961e] rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#0A1628]" />
            </div>
            <span className="text-white font-bold text-xl">
              Nex<span className="text-[#D4AF37]">Vest</span> Capital
            </span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Sign In</h1>
            <p className="text-gray-400">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-[#D4AF37] hover:underline">
                Create one free
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-gray-300 text-sm font-medium mb-1.5 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-gray-300 text-sm font-medium mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  type={showPass ? "text" : "password"}
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-[#1a2f4a] bg-[#0d1f3c]" />
                <span className="text-gray-400 text-sm">Remember me</span>
              </label>
              <Link href="#" className="text-[#D4AF37] text-sm hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In to Dashboard"}
            </Button>
          </form>

          <div className="mt-8 p-4 bg-[#0d1f3c] border border-[#1a2f4a] rounded-xl">
            <p className="text-gray-400 text-xs text-center mb-2">Demo Credentials</p>
            <p className="text-white text-xs text-center">
              Email: <span className="text-[#D4AF37]">demo@nexvest.com</span> · Password: <span className="text-[#D4AF37]">demo1234</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
