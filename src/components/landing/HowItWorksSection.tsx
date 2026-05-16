import { Badge } from "@/components/ui/badge"
import { UserPlus, CreditCard, TrendingUp, DollarSign } from "lucide-react"

const steps = [
  {
    step: "01",
    icon: UserPlus,
    title: "Create Your Account",
    description: "Register in under 2 minutes. Complete a simple KYC verification to secure your account and comply with regulations.",
    color: "from-blue-400 to-indigo-600",
  },
  {
    step: "02",
    icon: CreditCard,
    title: "Choose Your Plan & Fund",
    description: "Select an investment tier that fits your goals. Fund securely via bank transfer, credit card, or wire with 256-bit SSL encryption.",
    color: "from-[#D4AF37] to-amber-500",
  },
  {
    step: "03",
    icon: TrendingUp,
    title: "Watch Your Investment Grow",
    description: "Our expert fund managers actively grow your portfolio across diversified assets including equities, commodities, and real estate.",
    color: "from-emerald-400 to-teal-600",
  },
  {
    step: "04",
    icon: DollarSign,
    title: "Receive Regular Payouts",
    description: "Receive your returns directly to your preferred bank account on your plan's schedule — daily, weekly, bi-weekly, or monthly.",
    color: "from-purple-400 to-pink-600",
  },
]

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 bg-[#060e1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Process</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            How <span className="text-[#D4AF37]">It Works</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From registration to receiving your first payout — a seamless, transparent process designed around you.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-24 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-[#1a2f4a] via-[#D4AF37]/50 to-[#1a2f4a]" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.step} className="relative flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 shadow-lg relative z-10`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <div className="absolute top-0 -right-2 bg-[#0A1628] border border-[#1a2f4a] rounded-full w-6 h-6 flex items-center justify-center">
                  <span className="text-[#D4AF37] text-xs font-bold">{index + 1}</span>
                </div>
                <h3 className="text-white font-semibold text-lg mb-3">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "FCA Authorized", sub: "UK Financial Conduct Authority" },
            { label: "SEC Registered", sub: "US Securities & Exchange Commission" },
            { label: "256-bit SSL", sub: "Bank-Grade Encryption" },
            { label: "FDIC Protected", sub: "Funds Insured to $250K" },
          ].map((badge) => (
            <div key={badge.label} className="bg-[#0d1f3c] border border-[#1a2f4a] rounded-xl p-4 text-center">
              <div className="text-[#D4AF37] font-bold text-sm mb-1">{badge.label}</div>
              <div className="text-gray-400 text-xs">{badge.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
