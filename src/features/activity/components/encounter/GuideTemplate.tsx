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
  CheckCircle2,
} from 'lucide-react'
import {
  CyberCard,
  CyberHeading,
  CyberSectionHeader,
  CyberBadge,
} from '@/components/common/CyberComponents'
import { useCheckpoints } from '@/hooks/use-sherpa-store'
import { copyToClipboard } from '@/lib/clipboard'
import { cn } from '@/lib/utils'

interface GuideTemplateProps {
  title: string
  description: string
  encounterId?: string
  activitySlug?: string
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
  encounterId,
  activitySlug,
  mechanics,
  map,
  roles,
  secrets,
}: GuideTemplateProps) {
  const [copied, setCopied] = useState(false)
  const { isEncounterCompleted, toggleEncounterCompleted } = useCheckpoints()
  const isCompleted =
    encounterId && activitySlug
      ? isEncounterCompleted(activitySlug, encounterId)
      : false

  const handleCopyLink = async () => {
    if (typeof window === 'undefined') return
    const success = await copyToClipboard(window.location.href)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
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

  return (
    <div className="relative w-full flex-1 overflow-y-auto bg-background p-4 md:p-8">
      <div className="bg-scanline pointer-events-none absolute inset-0 z-0 opacity-5" />

      <div className="relative z-10 w-full space-y-8">
        <div className="flex flex-col justify-between gap-4 border-b border-primary/30 pb-6 sm:flex-row sm:items-start">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <CyberHeading variant="gradient" size="lg">
                {title}
              </CyberHeading>
              {isCompleted && (
                <CyberBadge variant="green" size="sm">
                  Đã hoàn thành
                </CyberBadge>
              )}
            </div>
            <p className="mt-2 font-mono text-sm tracking-wide text-muted-foreground sm:text-base">
              {description}
            </p>
          </div>

          {/* Quick Action Controls */}
          <div className="flex shrink-0 items-center gap-2">
            {encounterId && activitySlug && (
              <button
                type="button"
                onClick={() =>
                  toggleEncounterCompleted(activitySlug, encounterId)
                }
                className={cn(
                  'flex min-h-11 items-center gap-2 border px-3.5 py-2 font-mono text-xs tracking-wider uppercase transition-all',
                  isCompleted
                    ? 'border-neon-green bg-neon-green/20 text-neon-green shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                    : 'border-zinc-700 bg-zinc-900/60 text-zinc-400 hover:border-zinc-500 hover:text-white',
                )}
                title="Đánh dấu tiến độ vượt qua Encounter trong tuần"
              >
                <CheckCircle2
                  className={cn('h-4 w-4', isCompleted && 'text-neon-green')}
                />
                <span className="hidden md:inline">
                  {isCompleted ? 'Đã Clear' : 'Đánh dấu Clear'}
                </span>
              </button>
            )}

            <button
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
            </button>
          </div>
        </div>

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
              <GuideSection
                icon={Map}
                title="Bản đồ Callout"
                className="relative flex flex-col"
                contentClassName="flex-1 flex items-center justify-center min-h-[300px] bg-background/50 rounded-md border border-zinc-800 overflow-hidden"
              >
                <div className="pointer-events-none absolute inset-0 m-2 border border-neon-cyan/20" />
                {map}
              </GuideSection>
            )}

            <GuideSection
              icon={Settings}
              title="Cơ chế Encounter"
              className="relative cyber-grid"
              contentClassName="text-muted-foreground leading-relaxed"
            >
              {mechanics}
            </GuideSection>
          </div>

          {sidebarSections.length > 0 && (
            <div className="flex w-full min-w-0 flex-col gap-8 lg:sticky lg:top-[calc(3.5rem+1rem)]">
              {sidebarSections.map((section) => (
                <GuideSection
                  key={section.title}
                  icon={section.icon}
                  title={section.title}
                  className="relative cyber-grid"
                >
                  {section.content}
                </GuideSection>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
