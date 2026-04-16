'use client'

import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'
import { ThemeToggle } from './ThemeToggle'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '#animations', label: 'Анимации' },
  { href: '#interactivity', label: 'Интерактив' },
  { href: '#visual-fx', label: 'Visual FX' },
  { href: '#responsive', label: 'Адаптивность' },
]

export function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 20)
  })

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'glass border-b border-[var(--border)] py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a
          href="#"
          className="font-display font-bold text-xl gradient-neon"
        >
          Vibe Coding Now
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors duration-200 text-sm font-body"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <ThemeToggle />
      </div>
    </motion.nav>
  )
}
