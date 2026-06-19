import * as React from "react"
import { cn } from "@/lib/utils"

export interface CyberPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "neon" | "destructive" | "ghost"
  withScanlines?: boolean
}

const CyberPanel = React.forwardRef<HTMLDivElement, CyberPanelProps>(
  ({ className, variant = "default", withScanlines = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative p-5 rounded-xl border transition-all duration-300 overflow-hidden group clip-cyber",
          {
            "bg-secondary/10 border-border hover:border-primary/50": variant === "default",
            "bg-primary/5 border-primary/40 hover:neon-border-primary": variant === "neon",
            "bg-destructive/10 border-destructive/40 hover:border-destructive": variant === "destructive",
            "bg-transparent border-transparent hover:border-border": variant === "ghost",
          },
          className
        )}
        {...props}
      >
        {withScanlines && (
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-scanline z-0" />
        )}
        <div className="relative z-10">{children}</div>
      </div>
    )
  }
)
CyberPanel.displayName = "CyberPanel"

export { CyberPanel }
