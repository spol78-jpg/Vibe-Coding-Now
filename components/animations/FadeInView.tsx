'use client'

import { motion } from 'framer-motion'

interface FadeInViewProps {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
}

const directionMap = {
  up:    { y: 30 },
  down:  { y: -30 },
  left:  { x: -40 },
  right: { x: 40 },
}

export function FadeInView({
  children,
  delay = 0,
  direction = 'up',
  className,
}: FadeInViewProps) {
  const offset = directionMap[direction]

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
