'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { GlassCard } from '@/components/ui/GlassCard'
import { GradientText } from '@/components/ui/GradientText'
import { FadeInView } from '@/components/animations/FadeInView'
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer'

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-50, 50], [8, -8])
  const rotateY = useTransform(x, [-50, 50], [-8, 8])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }
  const handleMouseLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="cursor-pointer"
    >
      {children}
    </motion.div>
  )
}

export function VisualFXSection() {
  return (
    <SectionWrapper id="visual-fx" bg="secondary">
      <FadeInView className="text-center mb-16">
        <h2 className="font-display font-bold text-4xl sm:text-5xl mb-4">
          <GradientText gradient="ocean">Visual FX</GradientText>
        </h2>
        <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto font-body">
          Glassmorphism, glow, градиенты, 3D-тилт — визуал 2025-2026 года.
        </p>
      </FadeInView>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Glassmorphism */}
        <StaggerItem>
          <GlassCard className="h-full relative overflow-hidden">
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20 blur-2xl bg-[var(--accent-primary)]" />
            <div className="relative z-10">
              <div className="text-3xl mb-3">🪟</div>
              <h3 className="font-display font-semibold text-lg mb-2 text-[var(--text-primary)]">Glassmorphism</h3>
              <p className="text-[var(--text-secondary)] text-sm font-body">backdrop-blur + полупрозрачный фон + тонкая граница</p>
            </div>
          </GlassCard>
        </StaggerItem>

        {/* Neon glow */}
        <StaggerItem>
          <motion.div
            className="glass rounded-2xl p-6 h-full border border-[var(--accent-primary)] cursor-pointer"
            whileHover={{
              boxShadow: '0 0 30px rgba(0,255,135,0.5), 0 0 80px rgba(0,255,135,0.2)',
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-3xl mb-3">✨</div>
            <h3 className="font-display font-semibold text-lg mb-2 text-[var(--accent-primary)]">Neon Glow</h3>
            <p className="text-[var(--text-secondary)] text-sm font-body">box-shadow с акцентным цветом, анимируется при hover</p>
          </motion.div>
        </StaggerItem>

        {/* 3D Tilt */}
        <StaggerItem>
          <TiltCard>
            <GlassCard className="h-full" hover={false}>
              <div className="text-3xl mb-3">🎲</div>
              <h3 className="font-display font-semibold text-lg mb-2 text-[var(--text-primary)]">3D Tilt</h3>
              <p className="text-[var(--text-secondary)] text-sm font-body">Карточка реагирует на движение мыши через useMotionValue</p>
            </GlassCard>
          </TiltCard>
        </StaggerItem>

        {/* Mesh gradient */}
        <StaggerItem>
          <div
            className="rounded-2xl p-6 h-full"
            style={{
              background: 'radial-gradient(at 40% 20%, rgba(0,255,135,0.3) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(123,47,255,0.2) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(255,107,53,0.15) 0px, transparent 50%), var(--bg-tertiary)',
              border: '1px solid var(--border)',
            }}
          >
            <div className="text-3xl mb-3">🌈</div>
            <h3 className="font-display font-semibold text-lg mb-2 text-[var(--text-primary)]">Mesh Gradient</h3>
            <p className="text-[var(--text-secondary)] text-sm font-body">Несколько radial-gradient создают живой фон</p>
          </div>
        </StaggerItem>

        {/* Typography */}
        <StaggerItem>
          <GlassCard className="h-full">
            <div className="text-3xl mb-3">🔤</div>
            <h3 className="font-display font-semibold text-lg mb-3 text-[var(--text-primary)]">Типографика</h3>
            <div className="space-y-2">
              <p className="font-display text-2xl font-bold gradient-neon">Syne Display</p>
              <p className="font-body text-[var(--text-secondary)] text-sm">DM Sans для текста</p>
              <p className="font-mono text-xs text-[var(--accent-primary)] opacity-70">{'// monospace'}</p>
            </div>
          </GlassCard>
        </StaggerItem>

        {/* Animated border */}
        <StaggerItem>
          <div className="rounded-2xl p-[1px] h-full"
            style={{
              background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary), var(--accent-tertiary))',
            }}
          >
            <div className="rounded-2xl p-6 h-full bg-[var(--bg-secondary)]">
              <div className="text-3xl mb-3">🖼️</div>
              <h3 className="font-display font-semibold text-lg mb-2 text-[var(--text-primary)]">Gradient Border</h3>
              <p className="text-[var(--text-secondary)] text-sm font-body">Градиентная граница через padding + overlay</p>
            </div>
          </div>
        </StaggerItem>
      </StaggerContainer>
    </SectionWrapper>
  )
}
