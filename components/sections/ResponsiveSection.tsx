'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { GradientText } from '@/components/ui/GradientText'
import { NeonButton } from '@/components/ui/NeonButton'
import { FadeInView } from '@/components/animations/FadeInView'
import { cn } from '@/lib/utils'

type Device = 'desktop' | 'tablet' | 'mobile'

const devices: { id: Device; label: string; icon: string; width: string }[] = [
  { id: 'desktop', label: 'Desktop', icon: '🖥️', width: '100%' },
  { id: 'tablet', label: 'Tablet', icon: '📱', width: '768px' },
  { id: 'mobile', label: 'Mobile', icon: '📲', width: '375px' },
]

const techniques = [
  { icon: '📐', title: 'Flexbox & Grid', desc: 'Современная раскладка без float' },
  { icon: '📏', title: 'Fluid Typography', desc: 'clamp() — шрифт масштабируется плавно' },
  { icon: '🎯', title: 'Media Queries', desc: 'Tailwind breakpoints: sm, md, lg, xl' },
  { icon: '🖼️', title: 'Responsive Images', desc: 'next/image с автооптимизацией' },
]

export function ResponsiveSection() {
  const [activeDevice, setActiveDevice] = useState<Device>('desktop')
  const activeWidth = devices.find(d => d.id === activeDevice)?.width ?? '100%'

  return (
    <SectionWrapper id="responsive" bg="primary">
      <FadeInView className="text-center mb-16">
        <h2 className="font-display font-bold text-4xl sm:text-5xl mb-4">
          <GradientText gradient="neon">Адаптивность</GradientText>
        </h2>
        <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto font-body">
          Каждый экран — отдельная история. Переключи устройство и посмотри как всё перестраивается.
        </p>
      </FadeInView>

      {/* Device switcher */}
      <div className="flex justify-center gap-3 mb-8 flex-wrap">
        {devices.map((device) => (
          <NeonButton
            key={device.id}
            size="sm"
            variant={activeDevice === device.id ? 'primary' : 'outline'}
            onClick={() => setActiveDevice(device.id)}
          >
            {device.icon} {device.label}
          </NeonButton>
        ))}
      </div>

      {/* Preview frame */}
      <div className="flex justify-center mb-16">
        <div className="w-full overflow-x-auto flex justify-center">
          <motion.div
            layout
            animate={{ width: activeWidth }}
            transition={{ type: 'spring', stiffness: 200, damping: 30 }}
            className="glass rounded-2xl overflow-hidden border border-[var(--border-strong)]"
            style={{ minWidth: '280px' }}
          >
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)] bg-[var(--bg-tertiary)]">
              <span className="w-3 h-3 rounded-full bg-red-500 opacity-70" />
              <span className="w-3 h-3 rounded-full bg-yellow-500 opacity-70" />
              <span className="w-3 h-3 rounded-full bg-green-500 opacity-70" />
              <div className="flex-1 mx-4 bg-[var(--bg-secondary)] rounded-md px-3 py-1 text-xs text-[var(--text-muted)] font-mono">
                localhost:3000
              </div>
            </div>

            {/* Preview content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDevice}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="p-6"
              >
                <div className={cn(
                  'grid gap-4',
                  activeDevice === 'desktop' ? 'grid-cols-3' : activeDevice === 'tablet' ? 'grid-cols-2' : 'grid-cols-1'
                )}>
                  {[1, 2, 3].map(i => (
                    <div key={i} className="glass rounded-xl p-4">
                      <div className="w-full h-20 rounded-lg mb-3 animate-pulse"
                        style={{ background: `var(--accent-${i === 1 ? 'primary' : i === 2 ? 'secondary' : 'tertiary'})`, opacity: 0.2 }}
                      />
                      <div className="h-3 rounded bg-[var(--border-strong)] mb-2" />
                      <div className="h-2 rounded bg-[var(--border)] w-3/4" />
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Techniques */}
      <FadeInView>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {techniques.map((t) => (
            <div key={t.title} className="glass rounded-xl p-5 text-center">
              <div className="text-3xl mb-2">{t.icon}</div>
              <h4 className="font-display font-semibold text-sm mb-1 text-[var(--text-primary)]">{t.title}</h4>
              <p className="text-[var(--text-muted)] text-xs font-body">{t.desc}</p>
            </div>
          ))}
        </div>
      </FadeInView>
    </SectionWrapper>
  )
}
