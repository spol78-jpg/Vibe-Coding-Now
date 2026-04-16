'use client'

import { useScroll, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import { useRef } from 'react'

export function useScrollProgress() {
  const { scrollYProgress } = useScroll()
  return scrollYProgress
}

export function useElementScrollProgress(
  offset: ['start end' | 'end start' | string, 'start end' | 'end start' | string] = ['start end', 'end start']
) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset })
  return { ref, scrollYProgress }
}

export function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance])
}
