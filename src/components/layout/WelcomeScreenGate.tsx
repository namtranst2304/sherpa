'use client'

import { WelcomeScreen } from '@/features/home'

/** Client boundary for welcome overlay (no delayed dynamic — avoids first-paint flash). */
export function WelcomeScreenGate() {
  return <WelcomeScreen />
}
