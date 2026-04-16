'use client'

import { motion } from 'framer-motion'
import { fadeInUp, fadeInDown, fadeInLeft, fadeInRight } from '@/lib/animations'

interface FadeInViewProps {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
}

const variantMap = {
  up: fadeInUp,
  down: fadeInDown,
  left: fadeInLeft,
  right: fadeInRight,
}

export function FadeInView({
  children,
  delay = 0,
  direction = 'up',
  className,
}: FadeInViewProps) {
  const variant = variantMap[direction]

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: variant.hidden,
        visible: {
          ...(variant.visible as object),
          transition: {
            ...(typeof variant.visible === 'object' && 'transition' in variant.visible
              ? (variant.visible as { transition: object }).transition
              : {}),
            delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
