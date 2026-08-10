"use client"

import dynamic from "next/dynamic"

const WelcomeScreen = dynamic(
  () => import("@/features/home").then((m) => m.WelcomeScreen),
  { ssr: false }
)

export function WelcomeScreenGate() {
  return <WelcomeScreen />
}
