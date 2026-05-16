"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { useState } from "react"
import { Button } from "./ui/button"
import { Menu, X, TrendingUp, ChevronDown } from "lucide-react"

export default function Navbar() {
  const { data: session } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A1628]/95 backdrop-blur-md border-b border-[#1a2f4a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-[#D4AF37] to-[#b8961e] rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#0A1628]" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">
              Nex<span className="text-[#D4AF37]">Vest</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/#about" className="text-gray-300 hover:text-[#D4AF37] transition-colors text-sm">About</Link>
            <Link href="/#plans" className="text-gray-300 hover:text-[#D4AF37] transition-colors text-sm">Investment Plans</Link>
            <Link href="/#how-it-works" className="text-gray-300 hover:text-[#D4AF37] transition-colors text-sm">How It Works</Link>
            <Link href="/#testimonials" className="text-gray-300 hover:text-[#D4AF37] transition-colors text-sm">Testimonials</Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <>
                <Link href="/dashboard">
                  <Button variant="outline" size="sm">Dashboard</Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={() => signOut({ callbackUrl: "/" })} className="text-gray-400 hover:text-white">
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">Login</Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#0d1f3c] border-t border-[#1a2f4a] px-4 pb-4 pt-2 space-y-3">
          <Link href="/#about" className="block text-gray-300 py-2 hover:text-[#D4AF37]" onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/#plans" className="block text-gray-300 py-2 hover:text-[#D4AF37]" onClick={() => setMenuOpen(false)}>Investment Plans</Link>
          <Link href="/#how-it-works" className="block text-gray-300 py-2 hover:text-[#D4AF37]" onClick={() => setMenuOpen(false)}>How It Works</Link>
          <Link href="/#testimonials" className="block text-gray-300 py-2 hover:text-[#D4AF37]" onClick={() => setMenuOpen(false)}>Testimonials</Link>
          <div className="pt-2 flex flex-col gap-2">
            {session ? (
              <>
                <Link href="/dashboard" onClick={() => setMenuOpen(false)}><Button variant="outline" className="w-full">Dashboard</Button></Link>
                <Button variant="ghost" className="w-full text-gray-400" onClick={() => { signOut({ callbackUrl: "/" }); setMenuOpen(false) }}>Sign Out</Button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMenuOpen(false)}><Button variant="ghost" className="w-full text-gray-300">Login</Button></Link>
                <Link href="/register" onClick={() => setMenuOpen(false)}><Button className="w-full">Get Started</Button></Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
