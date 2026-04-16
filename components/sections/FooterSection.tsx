'use client'

import { motion } from 'framer-motion'
import { GradientText } from '@/components/ui/GradientText'
import { NeonButton } from '@/components/ui/NeonButton'
import { FadeInView } from '@/components/animations/FadeInView'

export function FooterSection() {
  return (
    <footer className="relative bg-[var(--bg-secondary)] overflow-hidden">
      {/* Animated gradient border top */}
      <div
        className="w-full h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, var(--accent-primary), var(--accent-secondary), var(--accent-tertiary), transparent)',
        }}
      />
      <motion.div
        className="w-full h-px absolute top-0"
        style={{
          background: 'linear-gradient(90deg, transparent, var(--accent-primary), var(--accent-secondary), transparent)',
          filter: 'blur(4px)',
        }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <FadeInView className="text-center">
          <h2 className="font-display font-bold text-4xl sm:text-5xl mb-4">
            <GradientText gradient="neon">Vibe Coding Now</GradientText>
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-lg mx-auto font-body mb-8">
            Создано за 1 день с помощью Claude и Cursor.
            Весь этот сайт — живое доказательство того, что возможно с AI-инструментами.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <NeonButton size="lg">
              🎓 Хочу так же → Пройти курс
            </NeonButton>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <NeonButton size="lg" variant="outline">
                <svg className="w-5 h-5 mr-2 inline" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </NeonButton>
            </a>
          </div>

          <div className="border-t border-[var(--border)] pt-8">
            <p className="text-[var(--text-muted)] text-sm font-body">
              © {new Date().getFullYear()} Vibe Coding Now — создано с{' '}
              <span className="text-[var(--accent-tertiary)]">♥</span> и нейросетями
            </p>
          </div>
        </FadeInView>
      </div>
    </footer>
  )
}
