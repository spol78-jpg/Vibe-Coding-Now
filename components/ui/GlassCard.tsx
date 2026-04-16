'use client'

import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
  hover?: boolean
}

export function GlassCard({
  children,
  className,
  glowColor,
  hover = true,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        'glass rounded-2xl p-6 transition-all duration-300',
        hover && 'hover:border-[var(--border-strong)] hover:bg-[rgba(255,255,255,0.07)]',
        className
      )}
      style={glowColor ? { '--glow-color': glowColor } as React.CSSProperties : undefined}
    >
      {children}
    </div>
  )
}
