'use client'

import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer'
import { AnimatedCard } from '@/components/ui/AnimatedCard'
import { GradientText } from '@/components/ui/GradientText'
import { FadeInView } from '@/components/animations/FadeInView'

const animationCards = [
  {
    id: 'fade',
    variant: 'fadeUp' as const,
    icon: '✨',
    title: 'Fade In',
    description: 'Плавное появление при попадании в viewport',
  },
  {
    id: 'slide',
    variant: 'fadeUp' as const,
    icon: '⬆️',
    title: 'Slide Up',
    description: 'Вылет снизу с затуханием opacity',
  },
  {
    id: 'spring',
    variant: 'spring' as const,
    icon: '🌀',
    title: 'Spring',
    description: 'Пружинная физика — реалистичный отскок',
  },
  {
    id: 'stagger',
    variant: 'scale' as const,
    icon: '🎯',
    title: 'Stagger',
    description: 'Последовательное появление дочерних элементов',
  },
  {
    id: 'hover',
    variant: 'fadeUp' as const,
    icon: '🖱️',
    title: 'Hover Scale',
    description: 'Масштабирование при наведении курсора',
  },
  {
    id: 'rotate',
    variant: 'rotate' as const,
    icon: '🔄',
    title: 'Rotation',
    description: 'Вращение при появлении в зоне видимости',
  },
]

export function AnimationsSection() {
  return (
    <SectionWrapper id="animations" bg="secondary">
      <FadeInView className="text-center mb-16">
        <h2 className="font-display font-bold text-4xl sm:text-5xl mb-4">
          <GradientText gradient="purple">Анимации</GradientText>
        </h2>
        <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto font-body">
          Framer Motion — самая мощная библиотека анимаций для React. Каждая карточка демонстрирует отдельную технику.
        </p>
      </FadeInView>

      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {animationCards.map((card) => (
          <StaggerItem key={card.id}>
            <AnimatedCard variant={card.variant} className="h-full">
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="font-display font-semibold text-xl mb-2 text-[var(--text-primary)]">
                {card.title}
              </h3>
              <p className="text-[var(--text-secondary)] text-sm font-body leading-relaxed">
                {card.description}
              </p>
              <div className="mt-4 text-xs font-mono text-[var(--accent-primary)] opacity-70">
                framer-motion
              </div>
            </AnimatedCard>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </SectionWrapper>
  )
}
