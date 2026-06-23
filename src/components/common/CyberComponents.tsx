import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export type CyberVariant = 'cyan' | 'orange' | 'yellow' | 'red' | 'green' | 'zinc' | 'exotic';
export type CyberSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// ─── CYBER BUTTON ────────────────────────────────────────────────────────────
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
        zinc: 'border-zinc-600 text-zinc-300 hover:border-zinc-400 hover:bg-zinc-800/30',
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
      { variant: 'cyan', glow: true, className: 'shadow-neon-cyan hover:shadow-neon-cyan-hover' },
      { variant: 'orange', glow: true, className: 'shadow-neon-orange hover:shadow-neon-orange-hover' },
      { variant: 'yellow', glow: true, className: 'shadow-neon-yellow hover:shadow-neon-yellow-hover' },
      { variant: 'red', glow: true, className: 'shadow-neon-red hover:shadow-neon-red-hover' },
      { variant: 'green', glow: true, className: 'shadow-neon-green hover:shadow-neon-green-hover' },
    ],
    defaultVariants: {
      variant: 'cyan',
      size: 'md',
      glow: true,
      fullWidth: false,
    },
  }
);

interface CyberButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof cyberButtonVariants> {}

export function CyberButton({
  variant,
  size,
  glow,
  fullWidth,
  className,
  children,
  ...props
}: CyberButtonProps) {
  return (
    <button
      className={cn(cyberButtonVariants({ variant, size, glow, fullWidth, className }))}
      {...props}
    >
      {children}
    </button>
  );
}

// ─── CYBER CARD ──────────────────────────────────────────────────────────────
const cyberCardVariants = cva(
  'bg-black/80 border relative transition-colors duration-300 ease-out',
  {
    variants: {
      variant: {
        cyan: 'border-neon-cyan/30 shadow-[0_0_15px_rgba(0,243,255,0.05)]',
        orange: 'border-neon-orange/40 shadow-[0_0_15px_rgba(255,0,255,0.05)]',
        yellow: 'border-neon-yellow/40 shadow-[0_0_15px_rgba(252,226,5,0.05)]',
        red: 'border-neon-red/40 shadow-[0_0_15px_rgba(255,0,0,0.05)]',
        green: 'border-neon-green/40 shadow-[0_0_15px_rgba(57,255,20,0.05)]',
        zinc: 'border-zinc-800',
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
);

const cyberCardCorners = {
  cyan: 'border-neon-cyan',
  orange: 'border-neon-orange',
  yellow: 'border-neon-yellow',
  red: 'border-neon-red',
  green: 'border-neon-green',
  zinc: 'border-zinc-500',
};

interface CyberCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cyberCardVariants> {
  withCorners?: boolean;
}

export function CyberCard({
  variant,
  padding,
  withCorners = false,
  className,
  children,
  ...props
}: CyberCardProps) {
  const currentVariant = variant || 'zinc';
  return (
    <div
      className={cn(cyberCardVariants({ variant, padding, className }))}
      {...props}
    >
      {withCorners && (
        <>
          <div className={cn('absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2', cyberCardCorners[currentVariant])} />
          <div className={cn('absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2', cyberCardCorners[currentVariant])} />
        </>
      )}
      {children}
    </div>
  );
}

// ─── CYBER BADGE ─────────────────────────────────────────────────────────────
const cyberBadgeVariants = cva(
  'inline-flex items-center justify-center gap-2 uppercase font-mono border-l-[3px] border-y border-r border-t-zinc-800/30 border-b-zinc-800/30 border-r-zinc-800/30 select-none',
  {
    variants: {
      variant: {
        cyan: 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan shadow-[0_0_8px_rgba(0,243,255,0.15)]',
        orange: 'bg-neon-orange/10 text-neon-orange border-neon-orange shadow-[0_0_8px_rgba(255,140,0,0.15)]',
        yellow: 'bg-neon-yellow/10 text-neon-yellow border-neon-yellow shadow-[0_0_8px_rgba(252,226,5,0.15)]',
        red: 'bg-neon-red/10 text-neon-red border-neon-red shadow-[0_0_8px_rgba(255,0,0,0.15)]',
        green: 'bg-neon-green/10 text-neon-green border-neon-green shadow-[0_0_8px_rgba(57,255,20,0.15)]',
        zinc: 'bg-zinc-900/50 text-zinc-500 border-zinc-700',
        exotic: 'bg-amber-500/10 text-amber-400 border-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.15)]',
      },
      size: {
        xs: 'px-1 py-0.5 text-[8px] font-black tracking-widest',
        sm: 'px-2 py-1 text-[10px] font-bold tracking-wider',
        md: 'px-3 py-1 text-xs font-bold tracking-wider',
      },
    },
    defaultVariants: {
      variant: 'cyan',
      size: 'md',
    },
  }
);

const cyberBadgeIndicator = {
  cyan: 'bg-neon-cyan shadow-[0_0_8px_#00f3ff]',
  orange: 'bg-neon-orange shadow-[0_0_8px_#ff8c00]',
  yellow: 'bg-neon-yellow shadow-[0_0_8px_#fce205]',
  red: 'bg-neon-red shadow-[0_0_8px_#ff0000]',
  green: 'bg-neon-green shadow-[0_0_8px_#39ff14]',
  zinc: 'bg-zinc-600',
  exotic: 'bg-amber-500 shadow-[0_0_8px_#f59e0b]',
};

interface CyberBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof cyberBadgeVariants> {
  pulse?: boolean;
  withIndicator?: boolean;
}

export function CyberBadge({
  variant,
  size,
  pulse = false,
  withIndicator = true,
  className,
  children,
  ...props
}: CyberBadgeProps) {
  const currentVariant = variant || 'cyan';
  return (
    <span
      className={cn(cyberBadgeVariants({ variant, size, className }))}
      {...props}
    >
      {withIndicator && (
        <div
          className={cn(
            'w-1.5 h-1.5 rounded-none shrink-0',
            cyberBadgeIndicator[currentVariant],
            pulse && 'animate-pulse'
          )}
        />
      )}
      {children}
    </span>
  );
}

// ─── CYBER HEADING ───────────────────────────────────────────────────────────
const cyberHeadingVariants = cva(
  'font-extrabold uppercase tracking-widest',
  {
    variants: {
      variant: {
        default: 'text-foreground',
        gradient: 'text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-blue-400 to-neon-orange text-glow-cyan',
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
  }
);

interface CyberHeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof cyberHeadingVariants> {}

export function CyberHeading({
  variant,
  size,
  className,
  children,
  ...props
}: CyberHeadingProps) {
  return (
    <h1 className={cn(cyberHeadingVariants({ variant, size, className }))} {...props}>
      {children}
    </h1>
  );
}
