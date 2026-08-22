'use client'

import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'

const MusicPlayer = dynamic(
  () => import('./MusicPlayer').then((m) => m.MusicPlayer),
  { ssr: false },
)

export function MusicPlayerGate() {
  const pathname = usePathname()
  if (pathname !== '/' && pathname !== '/timeline') return null
  return <MusicPlayer />
}
