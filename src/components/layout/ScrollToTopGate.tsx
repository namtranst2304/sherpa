'use client'

import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'

const ScrollToTop = dynamic(
  () => import('./ScrollToTop').then((m) => m.ScrollToTop),
  { ssr: false },
)

/** Avoid loading motion-heavy ScrollToTop on timeline (fullscreen snap). */
export function ScrollToTopGate() {
  const pathname = usePathname()
  if (pathname === '/timeline') return null
  return <ScrollToTop />
}
