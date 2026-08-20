import React from 'react'
import { ChevronDown } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

export const cyberInputVariants = cva(
  'block w-full rounded-md border bg-zinc-900/50 py-2.5 px-3 leading-5 font-mono text-zinc-300 placeholder-zinc-500 transition-all outline-none',
  {
    variants: {
      variant: {
        cyan: 'border-zinc-800 focus:border-neon-cyan focus:bg-zinc-900 focus:ring-1 focus:ring-neon-cyan',
        orange: 'border-zinc-800 focus:border-neon-orange focus:bg-zinc-900 focus:ring-1 focus:ring-neon-orange',
        yellow: 'border-zinc-800 focus:border-neon-yellow focus:bg-zinc-900 focus:ring-1 focus:ring-neon-yellow',
        red: 'border-zinc-800 focus:border-neon-red focus:bg-zinc-900 focus:ring-1 focus:ring-neon-red',
        green: 'border-zinc-800 focus:border-neon-green focus:bg-zinc-900 focus:ring-1 focus:ring-neon-green',
        purple: 'border-zinc-800 focus:border-neon-purple focus:bg-zinc-900 focus:ring-1 focus:ring-neon-purple',
        zinc: 'border-zinc-800 focus:border-zinc-400 focus:bg-zinc-900 focus:ring-1 focus:ring-zinc-400',
        exotic: 'border-zinc-800 focus:border-amber-500 focus:bg-zinc-900 focus:ring-1 focus:ring-amber-500',
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
