import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { HoverGlow } from '../HoverGlow'

const cyberCardVariants = cva(
  'bg-black/80 backdrop-blur-md border relative transition-all duration-300 ease-out hover:bg-black/70',
  {
    variants: {
      variant: {
        cyan: 'border-neon-cyan/30 shadow-[0_0_15px_rgba(0,243,255,0.05)]',
        orange: 'border-neon-orange/40 shadow-[0_0_15px_rgba(255,0,255,0.05)]',
        yellow: 'border-neon-yellow/40 shadow-[0_0_15px_rgba(252,226,5,0.05)]',
        red: 'border-neon-red/40 shadow-[0_0_15px_rgba(255,0,0,0.05)]',
        green: 'border-neon-green/40 shadow-[0_0_15px_rgba(57,255,20,0.05)]',
        purple: 'border-neon-purple/40 shadow-[0_0_15px_rgba(178,65,255,0.05)]',
        zinc: 'border-zinc-800',
        exotic: 'border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.05)]',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'zinc',
      padding: 'md',
    },
  }
)

const cyberCardCorners = {
  cyan: 'border-neon-cyan',
  orange: 'border-neon-orange',
  yellow: 'border-neon-yellow',
  red: 'border-neon-red',
  green: 'border-neon-green',
  purple: 'border-neon-purple',
  zinc: 'border-zinc-500',
  exotic: 'border-amber-500',
}

export interface CyberCardProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cyberCardVariants> {
  withCorners?: boolean
}

export function CyberCard({
  variant,
  padding,
  withCorners = false,
  className,
  children,
  ...props
}: CyberCardProps) {
  const currentVariant = variant || 'zinc'
  return (
    <div
      className={cn(cyberCardVariants({ variant, padding, className }))}
      {...props}
    >
      <HoverGlow glowColor={
        currentVariant === 'cyan' ? 'rgba(0, 243, 255, 0.15)' :
        currentVariant === 'red' ? 'rgba(255, 60, 60, 0.15)' :
        currentVariant === 'orange' ? 'rgba(255, 140, 0, 0.15)' :
        currentVariant === 'yellow' ? 'rgba(255, 215, 0, 0.15)' :
        currentVariant === 'green' ? 'rgba(57, 255, 20, 0.15)' :
        currentVariant === 'exotic' ? 'rgba(250, 197, 28, 0.15)' :
        'rgba(255, 255, 255, 0.05)'
      }>
        {withCorners && (
          <>
            <div
              className={cn(
                'absolute top-0 left-0 h-3 w-3 border-t-2 border-l-2 z-20 pointer-events-none',
                cyberCardCorners[currentVariant]
              )}
            />
            <div
              className={cn(
                'absolute right-0 bottom-0 h-3 w-3 border-r-2 border-b-2 z-20 pointer-events-none',
                cyberCardCorners[currentVariant]
              )}
            />
          </>
        )}
        {children}
      </HoverGlow>
    </div>
  )
}
