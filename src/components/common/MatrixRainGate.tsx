"use client"

import dynamic from "next/dynamic"

const MatrixRain = dynamic(
  () => import("@/components/common/MatrixRain").then((m) => m.MatrixRain),
  { ssr: false }
)

interface MatrixRainGateProps {
  color?: string
  opacity?: number
  speed?: number
}

export function MatrixRainGate({
  color = "#00f3ff",
  opacity = 0.08,
  speed = 50,
}: MatrixRainGateProps) {
  return <MatrixRain color={color} opacity={opacity} speed={speed} />
}
