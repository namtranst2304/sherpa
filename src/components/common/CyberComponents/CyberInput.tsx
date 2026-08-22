import React from 'react'
import { ChevronDown } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const cyberInputVariants = cva(
  'block w-full rounded-md border bg-white/5 py-2.5 px-3 leading-5 font-mono text-zinc-300 placeholder-zinc-500 transition-all outline-none backdrop-blur-sm',
  {
    variants: {
      variant: {
        cyan: 'border-white/10 focus:border-neon-cyan focus:bg-white/10 focus:ring-1 focus:ring-neon-cyan',
        orange: 'border-white/10 focus:border-neon-orange focus:bg-white/10 focus:ring-1 focus:ring-neon-orange',
        yellow: 'border-white/10 focus:border-neon-yellow focus:bg-white/10 focus:ring-1 focus:ring-neon-yellow',
        red: 'border-white/10 focus:border-neon-red focus:bg-white/10 focus:ring-1 focus:ring-neon-red',
        green: 'border-white/10 focus:border-neon-green focus:bg-white/10 focus:ring-1 focus:ring-neon-green',
        purple: 'border-white/10 focus:border-neon-purple focus:bg-white/10 focus:ring-1 focus:ring-neon-purple',
        zinc: 'border-white/10 focus:border-zinc-400 focus:bg-white/10 focus:ring-1 focus:ring-zinc-400',
        exotic: 'border-white/10 focus:border-amber-500 focus:bg-white/10 focus:ring-1 focus:ring-amber-500',
      },
      size: {
        sm: 'min-h-9 text-xs',
        md: 'min-h-11 text-sm',
        lg: 'min-h-12 text-base',
      },
    },
    defaultVariants: {
      variant: 'cyan',
      size: 'md',
    },
  }
)

export interface CyberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof cyberInputVariants> {}

export const CyberInput = React.forwardRef<HTMLInputElement, CyberInputProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(cyberInputVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)
CyberInput.displayName = 'CyberInput'

export interface CyberSelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
    VariantProps<typeof cyberInputVariants> {}

export const CyberSelect = React.forwardRef<HTMLSelectElement, CyberSelectProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div className={cn('relative w-full', className)}>
        <select
          ref={ref}
          className={cn(
            cyberInputVariants({ variant, size }),
            'cursor-pointer appearance-none pr-10'
          )}
          {...props}
        />
        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-zinc-500" />
      </div>
    )
  }
)
CyberSelect.displayName = 'CyberSelect'
