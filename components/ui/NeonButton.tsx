'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface NeonButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'outline' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const sizeMap = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export function NeonButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className,
  disabled = false,
  type = 'button',
}: NeonButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.04 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={cn(
        'relative inline-flex items-center justify-center rounded-xl font-display font-semibold transition-all duration-300 cursor-pointer select-none',
        sizeMap[size],
        variant === 'primary' && [
          'bg-[var(--accent-primary)] text-[var(--bg-primary)]',
          'shadow-neon hover:shadow-[0_0_30px_rgba(0,255,135,0.5),0_0_80px_rgba(0,255,135,0.2)]',
        ],
        variant === 'outline' && [
          'border border-[var(--accent-primary)] text-[var(--accent-primary)] bg-transparent',
          'hover:bg-[rgba(0,255,135,0.08)] hover:shadow-neon',
        ],
        variant === 'secondary' && [
          'bg-[var(--accent-secondary)] text-white',
          'shadow-neon-purple hover:shadow-[0_0_30px_rgba(123,47,255,0.5)]',
        ],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {children}
    </motion.button>
  )
}
