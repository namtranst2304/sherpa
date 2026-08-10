"use client"

import { AnimatePresence, motion } from "motion/react"
import type { ReactNode } from "react"

interface GuideShellProps {
  sidebar: ReactNode
  toc: ReactNode
  contentKey: string
  children: ReactNode
  /** Exotic mission uses full-bleed dark pane; raid/dungeon wraps content. */
  contentClassName?: string
}

export function GuideShell({
  sidebar,
  toc,
  contentKey,
  children,
  contentClassName = "flex-1 md:overflow-hidden relative",
}: GuideShellProps) {
  return (
    <div className="flex h-full w-full md:overflow-hidden flex-col md:flex-row">
      {sidebar}
      {toc}
      <div className={contentClassName}>
        <AnimatePresence mode="wait">
          <motion.div
            key={contentKey}
            className="w-full h-full flex flex-col"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              opacity: { duration: 0.2, ease: "easeInOut" },
              y: { duration: 0.2, ease: "easeInOut" },
            }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
