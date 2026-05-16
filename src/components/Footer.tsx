import Link from "next/link"
import { TrendingUp, Mail, Phone, MapPin, ExternalLink } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#060e1a] border-t border-[#1a2f4a] text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-[#D4AF37] to-[#b8961e] rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#0A1628]" />
              </div>
              <span className="text-white font-bold text-xl">
                Nex<span className="text-[#D4AF37]">Vest</span> Capital
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              A premier investment firm dedicated to growing your wealth through intelligent, diversified portfolio management since 2009.
            </p>
            <div className="flex gap-3">
              {["X", "in", "f"].map((s) => (
                <a key={s} href="#" className="w-9 h-9 bg-[#0d1f3c] rounded-full flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#0A1628] transition-colors text-xs font-bold text-gray-400">
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-5">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/#about" className="hover:text-[#D4AF37] transition-colors">About Us</Link></li>
              <li><Link href="/#plans" className="hover:text-[#D4AF37] transition-colors">Investment Plans</Link></li>
              <li><Link href="/#how-it-works" className="hover:text-[#D4AF37] transition-colors">How It Works</Link></li>
              <li><Link href="/#testimonials" className="hover:text-[#D4AF37] transition-colors">Success Stories</Link></li>
              <li><Link href="/register" className="hover:text-[#D4AF37] transition-colors">Open Account</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-5">Investment Plans</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/#plans" className="hover:text-[#D4AF37] transition-colors">Starter — 8% p.a.</Link></li>
              <li><Link href="/#plans" className="hover:text-[#D4AF37] transition-colors">Silver — 12% p.a.</Link></li>
              <li><Link href="/#plans" className="hover:text-[#D4AF37] transition-colors">Gold — 18% p.a.</Link></li>
              <li><Link href="/#plans" className="hover:text-[#D4AF37] transition-colors">Platinum — 25% p.a.</Link></li>
              <li><Link href="/#plans" className="hover:text-[#D4AF37] transition-colors">Diamond — 35% p.a.</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-5">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>One Canada Square, London E14 5AB, UK</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>+1 (800) 639-8378</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>support@nexvestcapital.com</span>
              </li>
            </ul>
            <div className="mt-6 p-3 bg-[#0d1f3c] rounded-lg border border-[#1a2f4a] text-xs">
              <p className="text-[#D4AF37] font-medium mb-1">Regulated & Secure</p>
              <p>FCA Authorized · SEC Registered · FINRA Member</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#1a2f4a] flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2024 NexVest Capital Ltd. All rights reserved. Investments carry risk. Past performance is not indicative of future results.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-[#D4AF37] transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-[#D4AF37] transition-colors">Risk Disclosure</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
