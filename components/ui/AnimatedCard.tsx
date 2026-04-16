'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { fadeInUp, scaleIn, springIn, rotateIn } from '@/lib/animations'
import type { Variants } from 'framer-motion'

type AnimationVariant = 'fadeUp' | 'scale' | 'spring' | 'rotate'

interface AnimatedCardProps {
  children: React.ReactNode
  variant?: AnimationVariant
  className?: string
  hoverScale?: boolean
}

const variantMap: Record<AnimationVariant, Variants> = {
  fadeUp: fadeInUp,
  scale: scaleIn,
  spring: springIn,
  rotate: rotateIn,
}

export function AnimatedCard({
  children,
  variant = 'fadeUp',
  className,
  hoverScale = true,
}: AnimatedCardProps) {
  return (
    <motion.div
      variants={variantMap[variant]}
      whileHover={hoverScale ? { scale: 1.03, y: -4 } : undefined}
      transition={{ duration: 0.2 }}
      className={cn(
        'glass rounded-2xl p-6 cursor-default transition-shadow duration-300',
        'hover:shadow-neon',
        className
      )}
    >
      {children}
    </motion.div>
  )
}
