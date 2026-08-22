'use client'

import React from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'motion/react'
import { cn } from '@/lib/utils'

interface HoverGlowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  glowColor?: string
}

export function HoverGlow({ 
  children, 
  glowColor = 'rgba(0, 243, 255, 0.1)', // Default to very subtle cyan
  className,
  ...props 
}: HoverGlowProps) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect()

    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div
      className={cn("group/glow relative w-full h-full", className)}
      onMouseMove={handleMouseMove}
      {...props}
    >
      {/* Background Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition duration-500 group-hover/glow:opacity-100 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              500px circle at ${mouseX}px ${mouseY}px,
              ${glowColor},
              transparent 80%
            )
          `,
        }}
      />
      {/* Border Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-[1px] rounded-[inherit] opacity-0 transition duration-500 group-hover/glow:opacity-100 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              150px circle at ${mouseX}px ${mouseY}px,
              ${glowColor.replace(/0\.\d+\)/, '0.8)')},
              transparent 100%
            )
          `,
          maskImage: 'linear-gradient(black, black), linear-gradient(black, black)',
          WebkitMaskImage: 'linear-gradient(black, black), linear-gradient(black, black)',
          maskClip: 'content-box, border-box',
          WebkitMaskClip: 'content-box, border-box',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
        }}
      />
      <div className="relative z-10 h-full w-full flex flex-col">
        {children}
      </div>
    </div>
  )
}
