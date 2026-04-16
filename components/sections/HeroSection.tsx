'use client'

import { motion } from 'framer-motion'
import { GradientText } from '@/components/ui/GradientText'
import { NeonButton } from '@/components/ui/NeonButton'
import { FadeInView } from '@/components/animations/FadeInView'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--bg-primary)]">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(ellipse at 20% 50%, rgba(0,255,135,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(123,47,255,0.15) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(255,107,53,0.1) 0%, transparent 50%)',
        }}
      />

      {/* Floating blobs */}
      <motion.div
        className="absolute w-72 h-72 rounded-full opacity-10 blur-3xl"
        style={{ background: 'var(--accent-primary)', top: '15%', left: '10%' }}
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ background: 'var(--accent-secondary)', bottom: '20%', right: '10%' }}
        animate={{ x: [0, -25, 0], y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className="absolute w-64 h-64 rounded-full opacity-8 blur-3xl"
        style={{ background: 'var(--accent-tertiary)', top: '60%', left: '60%' }}
        animate={{ x: [0, 20, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h1 className="font-display font-bold text-5xl sm:text-7xl lg:text-8xl mb-6 leading-tight">
            <GradientText gradient="neon">Vibe Coding</GradientText>
            <br />
            <span className="text-[var(--text-primary)]">Now</span>
          </h1>
        </motion.div>

        <FadeInView delay={0.3}>
          <p className="text-[var(--text-secondary)] text-xl sm:text-2xl max-w-2xl mx-auto mb-10 font-body leading-relaxed">
            Современный веб — это не скучные формы.
            <br />
            Это живые интерфейсы, созданные с помощью ИИ за один день.
          </p>
        </FadeInView>

        <FadeInView delay={0.5}>
          <div className="flex flex-wrap gap-4 justify-center">
            <NeonButton size="lg" onClick={() => document.getElementById('animations')?.scrollIntoView({ behavior: 'smooth' })}>
              Смотреть демо
            </NeonButton>
            <NeonButton size="lg" variant="outline" onClick={() => document.getElementById('visual-fx')?.scrollIntoView({ behavior: 'smooth' })}>
              Visual FX →
            </NeonButton>
          </div>
        </FadeInView>
      </div>

      {/* Scroll arrow */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--text-muted)]"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-xs font-body tracking-widest uppercase">Скролл</span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M8 0v16M1 9l7 7 7-7" />
        </svg>
      </motion.div>
    </section>
  )
}
