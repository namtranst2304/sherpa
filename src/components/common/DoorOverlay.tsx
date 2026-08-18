'use client'

import { motion } from 'motion/react'

interface DoorOverlayProps {
  isOpened: boolean
  initialOpened?: boolean
  duration?: number
}

export function DoorOverlay({
  isOpened,
  initialOpened = false,
  duration = 1.0,
}: DoorOverlayProps) {
  return (
    <>
      {/* Left Door */}
      <motion.div
        initial={{ x: initialOpened ? '-100%' : 0 }}
        animate={{ x: isOpened ? '-100%' : 0 }}
        transition={{ x: { duration, ease: [0.76, 0, 0.24, 1] } }}
        className="pointer-events-auto absolute top-0 bottom-0 left-0 w-1/2 overflow-hidden bg-black/95"
      >
        <div className="pointer-events-none absolute top-0 right-0 bottom-0 w-[200vw] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-black to-black opacity-30" />
      </motion.div>

      {/* Right Door */}
      <motion.div
        initial={{ x: initialOpened ? '100%' : 0 }}
        animate={{ x: isOpened ? '100%' : 0 }}
        transition={{ x: { duration, ease: [0.76, 0, 0.24, 1] } }}
        className="pointer-events-auto absolute top-0 right-0 bottom-0 w-1/2 overflow-hidden bg-black/95"
      >
        <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-[200vw] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-black to-black opacity-30" />
      </motion.div>
    </>
  )
}
