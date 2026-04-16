'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { GradientText } from '@/components/ui/GradientText'
import { NeonButton } from '@/components/ui/NeonButton'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { GlassCard } from '@/components/ui/GlassCard'
import { FadeInView } from '@/components/animations/FadeInView'
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer'

type MorphState = 'idle' | 'loading' | 'success'

export function InteractivitySection() {
  const [counter, setCounter] = useState(0)
  const [morphState, setMorphState] = useState<MorphState>('idle')
  const [accentHue, setAccentHue] = useState(150)

  const triggerConfetti = useCallback(async () => {
    const confetti = (await import('canvas-confetti')).default
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#00FF87', '#7B2FFF', '#FF6B35'],
    })
  }, [])

  const handleMorph = () => {
    if (morphState !== 'idle') return
    setMorphState('loading')
    setTimeout(() => setMorphState('success'), 1500)
    setTimeout(() => setMorphState('idle'), 3000)
  }

  const morphLabel = {
    idle: '🚀 Запустить',
    loading: '⏳ Загрузка...',
    success: '✅ Готово!',
  }[morphState]

  return (
    <SectionWrapper id="interactivity" bg="primary">
      <FadeInView className="text-center mb-16">
        <h2 className="font-display font-bold text-4xl sm:text-5xl mb-4">
          <GradientText gradient="fire">Интерактив</GradientText>
        </h2>
        <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto font-body">
          Сайт должен реагировать. Кликай, тяни, переключай — всё работает мгновенно.
        </p>
      </FadeInView>

      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Confetti */}
        <StaggerItem>
          <GlassCard className="flex flex-col items-center text-center gap-4 h-full">
            <div className="text-4xl">🎉</div>
            <h3 className="font-display font-semibold text-lg text-[var(--text-primary)]">Конфетти</h3>
            <p className="text-[var(--text-secondary)] text-sm font-body">canvas-confetti при клике</p>
            <NeonButton onClick={triggerConfetti} size="sm">
              Взрыв!
            </NeonButton>
          </GlassCard>
        </StaggerItem>

        {/* Morphing button */}
        <StaggerItem>
          <GlassCard className="flex flex-col items-center text-center gap-4 h-full">
            <div className="text-4xl">🔄</div>
            <h3 className="font-display font-semibold text-lg text-[var(--text-primary)]">Морфинг</h3>
            <p className="text-[var(--text-secondary)] text-sm font-body">Кнопка меняет состояние плавно</p>
            <NeonButton
              onClick={handleMorph}
              size="sm"
              variant={morphState === 'success' ? 'secondary' : 'primary'}
              disabled={morphState === 'loading'}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={morphState}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                >
                  {morphLabel}
                </motion.span>
              </AnimatePresence>
            </NeonButton>
          </GlassCard>
        </StaggerItem>

        {/* Counter */}
        <StaggerItem>
          <GlassCard className="flex flex-col items-center text-center gap-4 h-full">
            <div className="text-4xl">🔢</div>
            <h3 className="font-display font-semibold text-lg text-[var(--text-primary)]">Счётчик</h3>
            <AnimatePresence mode="wait">
              <motion.div
                key={counter}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.5 }}
                transition={{ duration: 0.2 }}
                className="text-5xl font-display font-bold gradient-neon"
              >
                {counter}
              </motion.div>
            </AnimatePresence>
            <div className="flex gap-2">
              <NeonButton size="sm" variant="outline" onClick={() => setCounter(c => c - 1)}>−</NeonButton>
              <NeonButton size="sm" onClick={() => setCounter(c => c + 1)}>+</NeonButton>
            </div>
          </GlassCard>
        </StaggerItem>

        {/* Theme toggle */}
        <StaggerItem>
          <GlassCard className="flex flex-col items-center text-center gap-4 h-full">
            <div className="text-4xl">🌗</div>
            <h3 className="font-display font-semibold text-lg text-[var(--text-primary)]">Тема</h3>
            <p className="text-[var(--text-secondary)] text-sm font-body">Переключение тёмной/светлой темы</p>
            <ThemeToggle />
          </GlassCard>
        </StaggerItem>

        {/* Color slider */}
        <StaggerItem>
          <GlassCard className="flex flex-col items-center text-center gap-4 h-full">
            <div className="text-4xl">🎨</div>
            <h3 className="font-display font-semibold text-lg text-[var(--text-primary)]">Цвет-слайдер</h3>
            <div
              className="w-12 h-12 rounded-full transition-all duration-100 shadow-neon"
              style={{ background: `hsl(${accentHue}, 100%, 60%)` }}
            />
            <input
              type="range"
              min={0}
              max={360}
              value={accentHue}
              onChange={(e) => setAccentHue(Number(e.target.value))}
              className="w-full accent-[var(--accent-primary)] cursor-pointer"
            />
          </GlassCard>
        </StaggerItem>

        {/* Ripple */}
        <StaggerItem>
          <GlassCard className="flex flex-col items-center text-center gap-4 h-full">
            <div className="text-4xl">💧</div>
            <h3 className="font-display font-semibold text-lg text-[var(--text-primary)]">Ripple</h3>
            <p className="text-[var(--text-secondary)] text-sm font-body">Эффект ряби при клике (CSS)</p>
            <button
              className="relative overflow-hidden px-6 py-2 rounded-xl border border-[var(--accent-secondary)] text-[var(--accent-secondary)] font-display text-sm
                         active:before:animate-ping before:absolute before:inset-0 before:rounded-xl before:bg-[var(--accent-secondary)] before:opacity-30"
              onClick={(e) => {
                const btn = e.currentTarget
                const ripple = document.createElement('span')
                const rect = btn.getBoundingClientRect()
                const size = Math.max(rect.width, rect.height)
                ripple.style.cssText = `
                  position:absolute;width:${size}px;height:${size}px;
                  left:${e.clientX - rect.left - size / 2}px;
                  top:${e.clientY - rect.top - size / 2}px;
                  border-radius:50%;background:rgba(123,47,255,0.4);
                  transform:scale(0);animation:ripple 0.6s linear;pointer-events:none;
                `
                btn.appendChild(ripple)
                ripple.addEventListener('animationend', () => ripple.remove())
              }}
            >
              <style>{`@keyframes ripple{to{transform:scale(2.5);opacity:0}}`}</style>
              Нажми меня
            </button>
          </GlassCard>
        </StaggerItem>
      </StaggerContainer>
    </SectionWrapper>
  )
}
