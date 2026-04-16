import { cn } from '@/lib/utils'

type GradientPreset = 'neon' | 'fire' | 'ocean' | 'purple'

interface GradientTextProps {
  children: React.ReactNode
  gradient?: GradientPreset
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
}

const gradientMap: Record<GradientPreset, string> = {
  neon: 'gradient-neon',
  fire: 'gradient-fire',
  ocean: 'gradient-ocean',
  purple: 'gradient-purple',
}

export function GradientText({
  children,
  gradient = 'neon',
  className,
  as: Tag = 'span',
}: GradientTextProps) {
  return (
    <Tag className={cn(gradientMap[gradient], className)}>
      {children}
    </Tag>
  )
}
