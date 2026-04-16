import type { Metadata } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Vibe Coding Now',
  description: 'Showcase современной веб-разработки — анимации, интерактив, визуальные эффекты. Создано с помощью Claude и Cursor.',
  keywords: ['vibe coding', 'next.js', 'framer motion', 'showcase', 'animations'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${syne.variable} ${dmSans.variable} font-body`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
