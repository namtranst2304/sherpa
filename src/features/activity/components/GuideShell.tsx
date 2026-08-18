'use client'

import { AnimatePresence, motion } from 'motion/react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

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
  contentClassName = 'flex-1 min-h-0 md:overflow-hidden relative',
}: GuideShellProps) {
  return (
    <div className="flex w-full flex-col md:h-[calc(100vh-3.5rem)] md:min-h-0 md:flex-row md:overflow-hidden">
      {sidebar}
      {toc}
      <div className={cn(contentClassName)}>
        <AnimatePresence mode="wait">
          <motion.div
            key={contentKey}
            className="flex h-full min-h-0 w-full flex-col"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              opacity: { duration: 0.2, ease: 'easeInOut' },
              y: { duration: 0.2, ease: 'easeInOut' },
            }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
