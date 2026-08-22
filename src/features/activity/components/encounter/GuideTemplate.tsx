'use client'

import React, { useState } from 'react'
import {
  Map,
  Users,
  Settings,
  Sparkles,
  LucideIcon,
  Share2,
  Check,
} from 'lucide-react'
import {
  CyberCard,
  CyberHeading,
  CyberSectionHeader,
} from '@/components/common/CyberComponents'
import { MagneticButton } from '@/components/common/MagneticButton'
import { copyToClipboard } from '@/lib/clipboard'
import { cn } from '@/lib/utils'
import { motion } from 'motion/react'

interface GuideTemplateProps {
  title: string
  description: string
  mechanics: React.ReactNode
  map: React.ReactNode
  roles: React.ReactNode
  secrets?: React.ReactNode
}

interface GuideSectionProps {
  icon: LucideIcon
  title: string
  children: React.ReactNode
  className?: string
  contentClassName?: string
}

function GuideSection({
  icon,
  title,
  children,
  className,
  contentClassName,
}: GuideSectionProps) {
  if (!children) return null

  return (
    <CyberCard variant="zinc" withCorners className={className}>
      <CyberSectionHeader icon={icon} title={title} />
      <div className={cn('relative z-10', contentClassName)}>{children}</div>
    </CyberCard>
  )
}

interface SidebarSectionItem {
  title: string
  icon: LucideIcon
  content: React.ReactNode
}

export function GuideTemplate({
  title,
  description,
  mechanics,
  map,
  roles,
  secrets,
}: GuideTemplateProps) {
  const [copied, setCopied] = useState(false)
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const handleCopyLink = async () => {
    try {
      await copyToClipboard(window.location.href)
      setCopied(true)
      timerRef.current = setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy', err)
    }
  }

  const sidebarSections: SidebarSectionItem[] = []
  if (roles)
    sidebarSections.push({ title: 'Vai trò', icon: Users, content: roles })
  if (secrets)
    sidebarSections.push({
      title: 'Rương ẩn & Secrets',
      icon: Sparkles,
      content: secrets,
    })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 260,
        damping: 20,
      },
    },
  }

  return (
    <div className="relative w-full flex-1 overflow-y-auto bg-background p-4 pb-24 md:p-8 md:pb-28">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_center,_var(--tw-gradient-stops))] from-neon-cyan/5 via-background to-background" />
      <div className="bg-scanline pointer-events-none absolute inset-0 z-0 opacity-5" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full space-y-8"
      >
        <motion.div variants={itemVariants} className="flex flex-col justify-between gap-4 border-b border-primary/30 pb-6 pt-12 sm:flex-row sm:items-start md:pt-0">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <CyberHeading variant="gradient" size="lg">
                {title}
              </CyberHeading>
            </div>
            <p className="mt-2 font-mono text-sm tracking-wide text-muted-foreground sm:text-base">
              {description}
            </p>
          </div>

          {/* Quick Action Controls */}
          <div className="flex shrink-0 items-center gap-2">
            <MagneticButton
              type="button"
              onClick={handleCopyLink}
              className={cn(
                'flex min-h-11 items-center gap-2 border px-3.5 py-2 font-mono text-xs tracking-wider uppercase transition-all',
                copied
                  ? 'border-neon-cyan bg-neon-cyan/20 text-neon-cyan shadow-[0_0_15px_rgba(0,243,255,0.3)]'
                  : 'border-zinc-700 bg-zinc-900/60 text-zinc-400 hover:border-zinc-500 hover:text-white',
              )}
              title="Sao chép liên kết trực tiếp tới Encounter này"
            >
              {copied ? (
                <Check className="h-4 w-4 text-neon-cyan" />
              ) : (
                <Share2 className="h-4 w-4" />
              )}
              <span>{copied ? 'Đã sao chép!' : 'Chia sẻ link'}</span>
            </MagneticButton>
          </div>
        </motion.div>

        <div
          className={cn(
            'flex flex-col items-start gap-8 lg:grid',
            sidebarSections.length > 0
              ? 'lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_450px]'
              : 'lg:grid-cols-1',
          )}
        >
          <div className="flex w-full min-w-0 flex-col gap-8">
            {map && (
              <motion.div variants={itemVariants}>
                <GuideSection
                  icon={Map}
                  title="Bản đồ Callout"
                  className="relative flex flex-col"
                  contentClassName="flex-1 flex items-center justify-center min-h-[300px] bg-background/50 rounded-md border border-zinc-800 overflow-hidden"
                >
                  <div className="pointer-events-none absolute inset-0 m-2 border border-neon-cyan/20" />
                  {map}
                </GuideSection>
              </motion.div>
            )}

            <motion.div variants={itemVariants}>
              <GuideSection
                icon={Settings}
                title="Cơ chế Encounter"
                className="relative cyber-grid"
                contentClassName="text-muted-foreground leading-relaxed"
              >
                {mechanics}
              </GuideSection>
            </motion.div>
          </div>

          {sidebarSections.length > 0 && (
            <div className="flex w-full min-w-0 flex-col gap-8 lg:sticky lg:top-[calc(3.5rem+1rem)]">
              {sidebarSections.map((section) => (
                <motion.div variants={itemVariants} key={section.title}>
                  <GuideSection
                    icon={section.icon}
                    title={section.title}
                    className="relative cyber-grid"
                  >
                    {section.content}
                  </GuideSection>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
