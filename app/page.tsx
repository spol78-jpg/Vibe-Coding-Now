import { NavBar } from '@/components/ui/NavBar'
import { HeroSection } from '@/components/sections/HeroSection'
import { AnimationsSection } from '@/components/sections/AnimationsSection'
import { InteractivitySection } from '@/components/sections/InteractivitySection'
import { VisualFXSection } from '@/components/sections/VisualFXSection'
import { ResponsiveSection } from '@/components/sections/ResponsiveSection'
import { FooterSection } from '@/components/sections/FooterSection'

export default function Home() {
  return (
    <main>
      <NavBar />
      <HeroSection />
      <AnimationsSection />
      <InteractivitySection />
      <VisualFXSection />
      <ResponsiveSection />
      <FooterSection />
    </main>
  )
}
