import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const cyberHeadingVariants = cva('font-extrabold uppercase tracking-widest', {
  variants: {
    variant: {
      default: 'text-foreground',
      gradient:
        'text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-blue-400 to-neon-orange glow-text-cyan',
      exotic: 'text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]',
      legendary: 'text-purple-400 drop-shadow-[0_0_10px_rgba(192,132,252,0.5)]',
    },
    size: {
      sm: 'text-xl',
      md: 'text-2xl',
      lg: 'text-3xl md:text-4xl',
      xl: 'text-4xl md:text-6xl',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

export interface CyberHeadingProps
  extends
    React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof cyberHeadingVariants> {}

export function CyberHeading({
  variant,
  size,
  className,
  children,
  ...props
}: CyberHeadingProps) {
  return (
    <h1
      className={cn(cyberHeadingVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </h1>
  )
}
