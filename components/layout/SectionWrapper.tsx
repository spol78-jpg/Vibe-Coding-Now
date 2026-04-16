import { cn } from '@/lib/utils'

interface SectionWrapperProps {
  id?: string
  children: React.ReactNode
  className?: string
  bg?: 'primary' | 'secondary' | 'tertiary'
}

export function SectionWrapper({
  id,
  children,
  className,
  bg = 'primary',
}: SectionWrapperProps) {
  const bgMap = {
    primary: 'bg-[var(--bg-primary)]',
    secondary: 'bg-[var(--bg-secondary)]',
    tertiary: 'bg-[var(--bg-tertiary)]',
  }

  return (
    <section
      id={id}
      className={cn(
        'relative w-full overflow-hidden section-padding',
        bgMap[bg],
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  )
}
