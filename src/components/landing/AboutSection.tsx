import { Badge } from "@/components/ui/badge"
import { Globe, Award, Users, BarChart3 } from "lucide-react"

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-[#0A1628]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <Badge variant="outline" className="mb-4">About NexVest Capital</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              A Decade of <span className="text-[#D4AF37]">Excellence</span> in Wealth Management
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Founded in 2009 in the heart of London&apos;s financial district, NexVest Capital has grown from a boutique investment advisory firm into one of the world&apos;s most trusted online investment platforms, serving clients across 38 countries.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              Our team of 180+ certified financial analysts, portfolio managers, and quantitative researchers work around the clock to deliver consistent, superior returns. We combine time-tested investment principles with cutting-edge algorithmic analysis to navigate markets with precision.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Globe, label: "38 Countries", sub: "Global Presence" },
                { icon: Users, label: "180+ Experts", sub: "Investment Team" },
                { icon: Award, label: "14 Awards", sub: "Industry Recognition" },
                { icon: BarChart3, label: "99.8% Uptime", sub: "Platform Reliability" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-xl flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <div>
                    <div className="text-white font-bold">{item.label}</div>
                    <div className="text-gray-400 text-sm">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {/* Timeline */}
            <div className="space-y-1">
              {[
                { year: "2009", event: "NexVest Capital founded in London with $10M seed capital" },
                { year: "2012", event: "Received FCA authorization, expanded to European markets" },
                { year: "2015", event: "Launched online investment platform; $500M AUM milestone" },
                { year: "2018", event: "SEC registration; entered US and Asian markets" },
                { year: "2021", event: "$2B AUM achieved; launched Diamond tier for HNW investors" },
                { year: "2024", event: "$4.2B AUM; 52,000+ active investors across 38 countries" },
              ].map((item, i) => (
                <div key={item.year} className="flex gap-4 group">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center shrink-0 group-hover:bg-[#D4AF37]/40 transition-colors">
                      <div className="w-2 h-2 bg-[#D4AF37] rounded-full" />
                    </div>
                    {i < 5 && <div className="w-0.5 h-6 bg-[#1a2f4a] mt-1" />}
                  </div>
                  <div className="pb-4">
                    <span className="text-[#D4AF37] font-bold text-sm">{item.year}</span>
                    <p className="text-gray-300 text-sm">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
