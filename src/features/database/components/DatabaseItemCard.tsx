import React from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { CyberCard, type CyberVariant } from '@/components/common/CyberComponents'
import { ExoticCardHeader, ItemSourceLine } from './ExoticCardParts'
import { bungieUrl } from '@/lib/bungie'
import { cn } from '@/lib/utils'

export interface DatabaseItemCardProps {
  /** The variant (color theme) for the card */
  variant?: CyberVariant
  /** Optional icon for the header */
  iconUrl?: string | null
  /** Name of the item */
  name: string
  /** Header meta elements (damage types, slots, etc.) */
  meta?: React.ReactNode
  /** Header action elements (wishlist button, etc.) */
  action?: React.ReactNode
  /** Optional screenshot to show below the header */
  screenshot?: string | null
  /** The main content of the card */
  children?: React.ReactNode
  /** Item source description, if any */
  source?: string | null
  /** Optional container classname */
  className?: string
  /** Expand state for motion animation */
  expanded?: boolean
}

export function DatabaseItemCard({
  variant = 'zinc',
  iconUrl,
  name,
  meta,
  action,
  screenshot,
  children,
  source,
  className,
  expanded = false,
}: DatabaseItemCardProps) {
  const [imageLoaded, setImageLoaded] = React.useState(false)

  return (
    <CyberCard
      variant={variant}
      padding="none"
      withCorners
      data-expanded={expanded}
      className={cn(
        'flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 group',
        className
      )}
    >
      <ExoticCardHeader
        iconUrl={iconUrl || null}
        name={name}
        meta={meta}
        action={action}
      />

      {screenshot && (
        <div
          className={cn(
            'relative aspect-[21/9] w-full border-b border-white/10',
            !imageLoaded ? 'animate-pulse bg-white/5' : 'bg-black/30'
          )}
        >
          <Image
            src={bungieUrl(screenshot)}
            alt={`${name} screenshot`}
            fill
            className={cn(
              'object-cover mix-blend-screen transition-all duration-500',
              imageLoaded ? 'opacity-80 group-hover:scale-105' : 'opacity-0'
            )}
            onLoad={() => setImageLoaded(true)}
            unoptimized
          />
        </div>
      )}

      <div className="flex flex-col flex-grow gap-4 p-4">
        {children}
        {source && <ItemSourceLine source={source} />}
      </div>
    </CyberCard>
  )
}
