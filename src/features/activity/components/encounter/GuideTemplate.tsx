"use client"

import React, { useState } from "react"
import { Map, Users, Settings, Sparkles, LucideIcon, Share2, Check, CheckCircle2 } from "lucide-react"
import { CyberCard, CyberHeading, CyberSectionHeader, CyberBadge } from "@/components/common/CyberComponents"
import { useCheckpoints } from "@/hooks/use-sherpa-store"
import { copyToClipboard } from "@/lib/clipboard"
import { cn } from "@/lib/utils"

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

function GuideSection({ icon, title, children, className, contentClassName }: GuideSectionProps) {
  if (!children) return null

  return (
    <CyberCard variant="zinc" withCorners className={className}>
      <CyberSectionHeader icon={icon} title={title} />
      <div className={cn("relative z-10", contentClassName)}>
        {children}
      </div>
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
  const isCompleted = encounterId && activitySlug ? isEncounterCompleted(activitySlug, encounterId) : false

  const handleCopyLink = async () => {
    if (typeof window === "undefined") return
    const success = await copyToClipboard(window.location.href)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const sidebarSections: SidebarSectionItem[] = []
  if (roles) sidebarSections.push({ title: "Vai trò", icon: Users, content: roles })
  if (secrets) sidebarSections.push({ title: "Rương ẩn & Secrets", icon: Sparkles, content: secrets })

  return (
    <div className="flex-1 overflow-y-auto w-full bg-background p-4 md:p-8 relative">
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-scanline z-0" />

      <div className="w-full space-y-8 relative z-10">
        <div className="border-b border-primary/30 pb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
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
            <p className="text-muted-foreground mt-2 text-sm sm:text-base font-mono tracking-wide">
              {description}
            </p>
          </div>

          {/* Quick Action Controls */}
          <div className="flex items-center gap-2 shrink-0">
            {encounterId && activitySlug && (
              <button
                type="button"
                onClick={() => toggleEncounterCompleted(activitySlug, encounterId)}
                className={cn(
                  "flex items-center gap-2 min-h-11 px-3.5 py-2 border font-mono text-xs uppercase tracking-wider transition-all",
                  isCompleted
                    ? "bg-neon-green/20 border-neon-green text-neon-green shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                    : "bg-zinc-900/60 border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500"
                )}
                title="Đánh dấu tiến độ vượt qua Encounter trong tuần"
              >
                <CheckCircle2 className={cn("w-4 h-4", isCompleted && "text-neon-green")} />
                <span className="hidden md:inline">{isCompleted ? "Đã Clear" : "Đánh dấu Clear"}</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleCopyLink}
              className={cn(
                "flex items-center gap-2 min-h-11 px-3.5 py-2 border font-mono text-xs uppercase tracking-wider transition-all",
                copied
                  ? "bg-neon-cyan/20 border-neon-cyan text-neon-cyan shadow-[0_0_15px_rgba(0,243,255,0.3)]"
                  : "bg-zinc-900/60 border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500"
              )}
              title="Sao chép liên kết trực tiếp tới Encounter này"
            >
              {copied ? <Check className="w-4 h-4 text-neon-cyan" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? "Đã sao chép!" : "Chia sẻ link"}</span>
            </button>
          </div>
        </div>

        <div className={cn(
          "flex flex-col lg:grid gap-8 items-start",
          sidebarSections.length > 0 ? "lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_450px]" : "lg:grid-cols-1"
        )}>
          <div className="flex flex-col gap-8 w-full min-w-0">
            {map && (
              <GuideSection
                icon={Map}
                title="Bản đồ Callout"
                className="flex flex-col relative"
                contentClassName="flex-1 flex items-center justify-center min-h-[300px] bg-background/50 rounded-md border border-zinc-800 overflow-hidden"
              >
                <div className="absolute inset-0 pointer-events-none border border-neon-cyan/20 m-2" />
                {map}
              </GuideSection>
            )}

            <GuideSection
              icon={Settings}
              title="Cơ chế Encounter"
              className="cyber-grid relative"
              contentClassName="text-muted-foreground leading-relaxed"
            >
              {mechanics}
            </GuideSection>
          </div>

          {sidebarSections.length > 0 && (
            <div className="flex flex-col gap-8 w-full min-w-0 lg:sticky lg:top-[calc(3.5rem+1rem)]">
              {sidebarSections.map((section) => (
                <GuideSection
                  key={section.title}
                  icon={section.icon}
                  title={section.title}
                  className="cyber-grid relative"
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
