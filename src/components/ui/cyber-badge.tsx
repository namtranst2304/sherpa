import * as React from "react"
import { cn } from "@/lib/utils"

export interface CyberBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "destructive" | "outline" | "ghost"
}

const CyberBadge = React.forwardRef<HTMLSpanElement, CyberBadgeProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-bold font-mono tracking-widest clip-cyber-alt px-2.5 py-1 text-xs",
          {
            "bg-primary/20 text-primary border border-primary/50 shadow-[0_0_10px_rgba(0,240,255,0.2)]": variant === "primary",
            "bg-secondary/20 text-secondary border border-secondary/50 shadow-[0_0_10px_rgba(255,0,230,0.2)]": variant === "secondary",
            "bg-destructive/20 text-destructive border border-destructive/50": variant === "destructive",
            "bg-transparent text-foreground border border-border": variant === "outline",
            "bg-muted text-muted-foreground": variant === "ghost",
          },
          className
        )}
        {...props}
      />
    )
  }
)
CyberBadge.displayName = "CyberBadge"

export { CyberBadge }
