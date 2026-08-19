'use client'

import * as React from 'react'
import { motion, HTMLMotionProps } from 'motion/react'
import { cn } from '@/lib/utils'

interface MagneticButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode
  className?: string
  strength?: number
}

export const MagneticButton = React.forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({ children, className, strength = 0.2, ...props }, ref) => {
    const [position, setPosition] = React.useState({ x: 0, y: 0 })
    const buttonRef = React.useRef<HTMLButtonElement>(null)

    // Merge refs
    React.useImperativeHandle(ref, () => buttonRef.current!)

    const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
      const { clientX, clientY } = e
      if (!buttonRef.current) return
      
      const { height, width, left, top } = buttonRef.current.getBoundingClientRect()
      const middleX = clientX - (left + width / 2)
      const middleY = clientY - (top + height / 2)
      
      setPosition({ x: middleX * strength, y: middleY * strength })
    }

    const reset = () => {
      setPosition({ x: 0, y: 0 })
    }

    return (
      <motion.button
        ref={buttonRef}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
        className={cn('will-change-transform', className)}
        {...props}
      >
        {children}
      </motion.button>
    )
  }
)
MagneticButton.displayName = 'MagneticButton'
