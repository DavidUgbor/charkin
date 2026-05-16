"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Star, Quote, Play, ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    name: "Marcus Chen",
    role: "Retired Executive, San Francisco",
    avatar: "MC",
    avatarColor: "from-blue-400 to-indigo-600",
    rating: 5,
    text: "I moved $250,000 into the Platinum plan 18 months ago. The weekly payouts have been absolutely consistent, and my account manager James is always reachable. NexVest has genuinely transformed my retirement income.",
    plan: "Platinum",
    returns: "+$62,500",
    duration: "18 months",
  },
  {
    name: "Sarah Okonkwo",
    role: "Entrepreneur, Lagos & London",
    avatar: "SO",
    avatarColor: "from-purple-400 to-pink-600",
    rating: 5,
    text: "As a business owner, I needed somewhere reliable for my surplus capital. The Gold plan's 18% returns have outperformed every bank and fund I've tried. The dashboard is intuitive and the team is world-class.",
    plan: "Gold",
    returns: "+$18,000",
    duration: "12 months",
  },
  {
    name: "Dr. James Whitfield",
    role: "Consultant Surgeon, Manchester",
    avatar: "JW",
    avatarColor: "from-emerald-400 to-teal-600",
    rating: 5,
    text: "My colleague recommended NexVest last year. I started with Silver and quickly upgraded to Gold after seeing the returns. The compliance and security measures give me complete peace of mind.",
    plan: "Gold",
    returns: "+$24,300",
    duration: "14 months",
  },
  {
    name: "Elena Vasquez",
    role: "Tech CEO, Miami",
    avatar: "EV",
    avatarColor: "from-orange-400 to-red-500",
    rating: 5,
    text: "Diamond tier changed everything. The daily payouts hit my account like clockwork. My dedicated investment team provides market briefings every morning. Worth every penny of the minimum investment.",
    plan: "Diamond",
    returns: "+$350,000",
    duration: "24 months",
  },
  {
    name: "Robert Adeyemi",
    role: "Real Estate Developer, Dubai",
    avatar: "RA",
    avatarColor: "from-cyan-400 to-blue-600",
    rating: 5,
    text: "I diversified across Gold and Platinum plans. The combined returns have let me expand my property portfolio significantly. NexVest is not just an investment platform — it's a genuine wealth-building partner.",
    plan: "Platinum + Gold",
    returns: "+$89,750",
    duration: "20 months",
  },
]

const videoTestimonials = [
  { name: "Marcus Chen", role: "Platinum Investor", thumbnail: "MC", duration: "2:14" },
  { name: "Sarah Okonkwo", role: "Gold Investor", thumbnail: "SO", duration: "1:58" },
  { name: "Dr. James Whitfield", role: "Gold Investor", thumbnail: "JW", duration: "3:05" },
]

export default function TestimonialsSection() {
  const [active, setActive] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeVideo, setActiveVideo] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % testimonials.length), 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="testimonials" className="py-24 bg-[#0A1628]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Success Stories</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Trusted by <span className="text-[#D4AF37]">52,000+ Investors</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Real people, real returns. Hear from our investors across the globe.
          </p>
        </div>

        {/* Video Testimonials */}
        <div className="mb-16">
          <h3 className="text-white text-xl font-semibold mb-6 text-center">Video Testimonials</h3>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {videoTestimonials.map((vt, i) => (
              <div
                key={vt.name}
                className={`relative cursor-pointer rounded-2xl overflow-hidden border-2 transition-all ${
                  activeVideo === i ? "border-[#D4AF37]" : "border-[#1a2f4a]"
                }`}
                onClick={() => { setActiveVideo(i); setIsPlaying(true) }}
              >
                <div className="aspect-video bg-gradient-to-br from-[#0d1f3c] to-[#0A1628] flex items-center justify-center relative">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${
                    i === 0 ? "from-blue-400 to-indigo-600" : i === 1 ? "from-purple-400 to-pink-600" : "from-emerald-400 to-teal-600"
                  } flex items-center justify-center text-white font-bold text-2xl`}>
                    {vt.thumbnail}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/10 transition-colors">
                    <div className="w-14 h-14 bg-[#D4AF37] rounded-full flex items-center justify-center shadow-lg">
                      <Play className="w-6 h-6 text-[#0A1628] ml-1" fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {vt.duration}
                  </div>
                </div>
                <div className="p-4 bg-[#0d1f3c]">
                  <p className="text-white font-semibold">{vt.name}</p>
                  <p className="text-gray-400 text-sm">{vt.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Video player modal simulation */}
          {isPlaying && (
            <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setIsPlaying(false)}>
              <div className="bg-[#0d1f3c] rounded-2xl overflow-hidden max-w-2xl w-full border border-[#1a2f4a]" onClick={(e) => e.stopPropagation()}>
                <div className="aspect-video bg-gradient-to-br from-[#0A1628] to-[#1a2f4a] flex flex-col items-center justify-center p-8 text-center relative">
                  <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${
                    activeVideo === 0 ? "from-blue-400 to-indigo-600" : activeVideo === 1 ? "from-purple-400 to-pink-600" : "from-emerald-400 to-teal-600"
                  } flex items-center justify-center text-white font-bold text-3xl mb-4`}>
                    {videoTestimonials[activeVideo].thumbnail}
                  </div>
                  <p className="text-white text-lg font-semibold mb-2">{videoTestimonials[activeVideo].name}</p>
                  <p className="text-gray-400 mb-4">{videoTestimonials[activeVideo].role}</p>
                  <p className="text-gray-300 italic max-w-md">
                    &quot;{testimonials[activeVideo].text}&quot;
                  </p>
                  <div className="mt-4 flex gap-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />)}
                  </div>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <p className="text-gray-400 text-sm">Click anywhere outside to close</p>
                  <button onClick={() => setIsPlaying(false)} className="text-[#D4AF37] text-sm hover:underline">Close</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Written testimonials carousel */}
        <div className="relative">
          <div className="bg-[#0d1f3c] border border-[#1a2f4a] rounded-2xl p-8 md:p-12">
            <Quote className="w-10 h-10 text-[#D4AF37]/30 mb-4" />
            <p className="text-white text-lg md:text-xl leading-relaxed mb-8 min-h-[80px]">
              &quot;{testimonials[active].text}&quot;
            </p>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonials[active].avatarColor} flex items-center justify-center text-white font-bold`}>
                  {testimonials[active].avatar}
                </div>
                <div>
                  <p className="text-white font-semibold">{testimonials[active].name}</p>
                  <p className="text-gray-400 text-sm">{testimonials[active].role}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-green-400 font-bold text-xl">{testimonials[active].returns}</p>
                  <p className="text-gray-400 text-xs">Total Returns</p>
                </div>
                <div className="text-center">
                  <p className="text-[#D4AF37] font-bold">{testimonials[active].plan}</p>
                  <p className="text-gray-400 text-xs">Plan</p>
                </div>
                <div className="flex gap-1">
                  {[...Array(testimonials[active].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={() => setActive((a) => (a - 1 + testimonials.length) % testimonials.length)}
              className="w-10 h-10 bg-[#0d1f3c] border border-[#1a2f4a] rounded-full flex items-center justify-center text-gray-400 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === active ? "bg-[#D4AF37] w-6" : "bg-[#1a2f4a]"}`}
                />
              ))}
            </div>
            <button
              onClick={() => setActive((a) => (a + 1) % testimonials.length)}
              className="w-10 h-10 bg-[#0d1f3c] border border-[#1a2f4a] rounded-full flex items-center justify-center text-gray-400 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
