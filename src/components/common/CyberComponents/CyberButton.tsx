import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

const cyberButtonVariants = cva(
  'inline-flex items-center justify-center gap-2 border bg-transparent font-bold uppercase transition-all duration-300 ease-out disabled:opacity-50 disabled:cursor-not-allowed select-none font-mono active:scale-[0.98]',
  {
    variants: {
      variant: {
        cyan: 'border-neon-cyan text-neon-cyan hover:bg-neon-cyan/20',
        orange: 'border-neon-orange text-neon-orange hover:bg-neon-orange/20',
        yellow: 'border-neon-yellow text-neon-yellow hover:bg-neon-yellow/20',
        red: 'border-neon-red text-neon-red hover:bg-neon-red/20',
        green: 'border-neon-green text-neon-green hover:bg-neon-green/20',
        purple: 'border-neon-purple text-neon-purple hover:bg-neon-purple/20',
        zinc: 'border-zinc-600 text-zinc-300 hover:border-zinc-400 hover:bg-zinc-800/30',
        exotic: 'border-amber-500 text-amber-400 hover:bg-amber-500/20',
      },
      size: {
        sm: 'px-4 py-1.5 text-[10px] tracking-wider',
        md: 'px-6 py-2.5 text-xs tracking-widest',
        lg: 'px-8 py-3.5 text-sm tracking-widest',
      },
      glow: {
        true: '',
        false: '',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    compoundVariants: [
      {
        variant: 'cyan',
        glow: true,
        className: 'shadow-neon-cyan hover:shadow-neon-cyan-hover',
      },
      {
        variant: 'orange',
        glow: true,
        className: 'shadow-neon-orange hover:shadow-neon-orange-hover',
      },
      {
        variant: 'yellow',
        glow: true,
        className: 'shadow-neon-yellow hover:shadow-neon-yellow-hover',
      },
      {
        variant: 'red',
        glow: true,
        className: 'shadow-neon-red hover:shadow-neon-red-hover',
      },
      {
        variant: 'green',
        glow: true,
        className: 'shadow-neon-green hover:shadow-neon-green-hover',
      },
      {
        variant: 'purple',
        glow: true,
        className: 'shadow-neon-purple hover:shadow-neon-purple-hover',
      },
      {
        variant: 'exotic',
        glow: true,
        className: 'shadow-[0_0_15px_rgba(245,158,11,0.4)] hover:shadow-[0_0_25px_rgba(245,158,11,0.6)]',
      },
    ],
    defaultVariants: {
      variant: 'cyan',
      size: 'md',
      glow: true,
      fullWidth: false,
    },
  }
)

export interface CyberButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof cyberButtonVariants> {
  asChild?: boolean
}

export function CyberButton({
  variant,
  size,
  glow,
  fullWidth,
  className,
  asChild = false,
  children,
  ...props
}: CyberButtonProps) {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      className={cn(
        cyberButtonVariants({ variant, size, glow, fullWidth, className })
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}
