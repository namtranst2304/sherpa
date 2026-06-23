import { cva } from "class-variance-authority"

export const topNavTriggerVariants = cva(
  "bg-transparent uppercase tracking-widest font-mono text-sm border border-transparent rounded-none transition-all",
  {
    variants: {
      variant: {
        cyan: "hover:bg-neon-cyan/10 hover:text-neon-cyan hover:border-neon-cyan/30 data-[state=open]:bg-neon-cyan/10 data-[state=open]:text-neon-cyan data-[state=open]:border-neon-cyan/30 text-zinc-300",
        green: "hover:bg-neon-green/10 hover:text-neon-green hover:border-neon-green/30 data-[state=open]:bg-neon-green/10 data-[state=open]:text-neon-green data-[state=open]:border-neon-green/30 text-zinc-300",
        red: "hover:bg-neon-red/10 hover:text-neon-red hover:border-neon-red/30 data-[state=open]:bg-neon-red/10 data-[state=open]:text-neon-red data-[state=open]:border-neon-red/30 text-zinc-300",
        orange: "hover:bg-neon-orange/10 hover:text-neon-orange hover:border-neon-orange/30 data-[state=open]:bg-neon-orange/10 data-[state=open]:text-neon-orange data-[state=open]:border-neon-orange/30 text-zinc-300",
        yellow: "hover:bg-neon-yellow/10 hover:text-neon-yellow hover:border-neon-yellow/30 data-[state=open]:bg-neon-yellow/10 data-[state=open]:text-neon-yellow data-[state=open]:border-neon-yellow/30 text-zinc-300",
        zinc: "hover:bg-zinc-800/50 hover:text-zinc-300 hover:border-zinc-500/30 data-[state=open]:bg-zinc-800/50 data-[state=open]:text-zinc-300 data-[state=open]:border-zinc-500/30 text-zinc-300",
      }
    },
    defaultVariants: { variant: "zinc" }
  }
)

export const topNavDropdownVariants = cva(
  "flex gap-6 p-6 md:w-[600px] lg:w-[800px] bg-black/95 backdrop-blur-xl border",
  {
    variants: {
      variant: {
        cyan: "border-neon-cyan/30 shadow-[0_10px_40px_rgba(0,243,255,0.2)]",
        green: "border-neon-green/30 shadow-[0_10px_40px_rgba(57,255,20,0.2)]",
        red: "border-neon-red/30 shadow-[0_10px_40px_rgba(255,0,0,0.2)]",
        orange: "border-neon-orange/30 shadow-[0_10px_40px_rgba(255,140,0,0.2)]",
        yellow: "border-neon-yellow/30 shadow-[0_10px_40px_rgba(252,226,5,0.2)]",
        zinc: "border-zinc-800/50 shadow-[0_10px_40px_rgba(0,0,0,0.5)]",
      }
    },
    defaultVariants: { variant: "zinc" }
  }
)

export const topNavCardBgVariants = cva(
  "flex h-full w-full select-none flex-col justify-start rounded-md p-6 outline-none relative overflow-hidden",
  {
    variants: {
      variant: {
        cyan: "bg-neon-cyan/5 border border-neon-cyan/30 shadow-[inset_0_0_20px_rgba(0,243,255,0.05)]",
        green: "bg-neon-green/5 border border-neon-green/30 shadow-[inset_0_0_20px_rgba(57,255,20,0.05)]",
        red: "bg-black border border-neon-red/30 shadow-[inset_0_0_20px_rgba(255,0,0,0.1)]",
        orange: "bg-neon-orange/5 border border-neon-orange/30 shadow-[inset_0_0_20px_rgba(255,140,0,0.05)]",
        yellow: "bg-neon-yellow/5 border border-neon-yellow/30 shadow-[inset_0_0_20px_rgba(252,226,5,0.05)]",
        zinc: "bg-zinc-900/20 border border-zinc-800/50 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]",
      }
    },
    defaultVariants: { variant: "zinc" }
  }
)

export const topNavIconVariants = cva("h-6 w-6 mb-2", {
  variants: {
    variant: {
      cyan: "text-neon-cyan",
      green: "text-neon-green",
      red: "text-neon-red opacity-60",
      orange: "text-neon-orange",
      yellow: "text-neon-yellow",
      zinc: "text-zinc-400",
    }
  },
  defaultVariants: { variant: "zinc" }
})

export const topNavTitleVariants = cva("mb-2 mt-4 text-lg font-black uppercase tracking-widest flex items-center gap-2", {
  variants: {
    variant: {
      cyan: "text-neon-cyan text-glow-cyan",
      green: "text-neon-green text-glow-green",
      red: "text-neon-red text-glow-red",
      orange: "text-neon-orange text-glow-orange",
      yellow: "text-neon-yellow text-glow-yellow",
      zinc: "text-zinc-300",
    }
  },
  defaultVariants: { variant: "zinc" }
})

export const topNavHoverItemVariants = cva(
  "block select-none space-y-1 rounded-sm p-3 leading-none no-underline outline-none transition-colors group border border-transparent",
  {
    variants: {
      variant: {
        cyan: "hover:bg-neon-cyan/10 hover:border-neon-cyan group-hover:text-neon-cyan group-hover:text-glow-cyan",
        green: "hover:bg-neon-green/10 hover:border-neon-green group-hover:text-neon-green group-hover:text-glow-green",
        red: "hover:bg-neon-red/10 hover:border-neon-red group-hover:text-neon-red group-hover:text-glow-red",
        orange: "hover:bg-neon-orange/10 hover:border-neon-orange group-hover:text-neon-orange group-hover:text-glow-orange",
        yellow: "hover:bg-neon-yellow/10 hover:border-neon-yellow group-hover:text-neon-yellow group-hover:text-glow-yellow",
        zinc: "hover:bg-zinc-800/30 hover:border-zinc-500 group-hover:text-zinc-300",
      }
    },
    defaultVariants: { variant: "zinc" }
  }
)

export const topNavCardGlowVariants = cva("absolute top-0 right-0 w-32 h-32 blur-3xl -mr-10 -mt-10 pointer-events-none", {
  variants: {
    variant: {
      cyan: "bg-neon-cyan/10",
      green: "bg-neon-green/10",
      red: "bg-neon-red/5",
      orange: "bg-neon-orange/10",
      yellow: "bg-neon-yellow/10",
      zinc: "bg-zinc-800/20",
    }
  },
  defaultVariants: { variant: "zinc" }
})

export const topNavDescVariants = cva("transition-colors", {
  variants: {
    variant: {
      cyan: "group-hover:text-neon-cyan/70",
      green: "group-hover:text-neon-green/70",
      red: "group-hover:text-neon-red/70",
      orange: "group-hover:text-neon-orange/70",
      yellow: "group-hover:text-neon-yellow/70",
      zinc: "group-hover:text-zinc-400",
    }
  },
  defaultVariants: { variant: "zinc" }
})
