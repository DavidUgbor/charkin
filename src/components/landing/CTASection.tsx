import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, TrendingUp } from "lucide-react"

export default function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#0A1628] via-[#0d1f3c] to-[#0A1628] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full px-4 py-2 mb-8">
          <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-[#D4AF37] text-sm">Start earning today</span>
        </div>

        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Your Wealth Journey<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-amber-300">
            Starts With One Step
          </span>
        </h2>

        <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
          Join 52,000+ investors who trust NexVest Capital to grow their wealth. Open your account in minutes and start earning returns up to 35% annually.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Link href="/register">
            <Button size="xl" className="group">
              Open Free Account
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/#plans">
            <Button size="xl" variant="outline">
              Compare All Plans
            </Button>
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400">
          {[
            { icon: Shield, text: "FCA & SEC Regulated" },
            { icon: Shield, text: "256-bit SSL Encryption" },
            { icon: Shield, text: "FDIC Insured Funds" },
            { icon: Shield, text: "No Hidden Fees" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <item.icon className="w-4 h-4 text-[#D4AF37]" />
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
