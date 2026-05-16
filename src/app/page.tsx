import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import HeroSection from "@/components/landing/HeroSection"
import AboutSection from "@/components/landing/AboutSection"
import PlansSection from "@/components/landing/PlansSection"
import HowItWorksSection from "@/components/landing/HowItWorksSection"
import TestimonialsSection from "@/components/landing/TestimonialsSection"
import CTASection from "@/components/landing/CTASection"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <PlansSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
