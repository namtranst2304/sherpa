import React from "react"
import { Map, Users, Settings, Sparkles, LucideIcon } from "lucide-react"
import { CyberCard, CyberHeading } from "@/components/common/CyberComponents"
import { cn } from "@/lib/utils"

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

function GuideSection({ icon: Icon, title, children, className, contentClassName }: GuideSectionProps) {
  if (!children) return null

  return (
    <CyberCard variant="zinc" withCorners className={className}>
      <div className="border-b border-zinc-800 pb-4 mb-4 flex items-center gap-3 relative z-10">
        <div className="p-2 bg-neon-cyan/10 rounded-md">
          <Icon className="w-5 h-5 text-neon-cyan" />
        </div>
        <h2 className="text-xl font-bold uppercase tracking-wider text-foreground">{title}</h2>
      </div>
      <div className={cn("relative z-10", contentClassName)}>
        {children}
      </div>
    </CyberCard>
  )
}

export function GuideTemplate({ title, description, mechanics, map, roles, secrets }: GuideTemplateProps) {
  const hasSidebar = Boolean(roles || secrets)

  return (
    <div className="flex-1 overflow-y-auto w-full bg-background p-4 md:p-8 relative">
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-scanline z-0" />

      <div className="w-full space-y-8 relative z-10">
        <div className="border-b border-primary/30 pb-6">
          <CyberHeading variant="gradient" size="lg">
            {title}
          </CyberHeading>
          <p className="text-muted-foreground mt-2 text-lg font-mono tracking-wide">
            {description}
          </p>
        </div>

        <div className={cn(
          "flex flex-col lg:grid gap-8 items-start",
          hasSidebar ? "lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_450px]" : "lg:grid-cols-1"
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

          {hasSidebar && (
            <div className="flex flex-col gap-8 w-full min-w-0 lg:sticky lg:top-[calc(3.5rem+1rem)]">
              {roles && (
                <GuideSection icon={Users} title="Vai trò" className="cyber-grid relative">
                  {roles}
                </GuideSection>
              )}
              {secrets && (
                <GuideSection icon={Sparkles} title="Rương ẩn & Secrets" className="cyber-grid relative">
                  {secrets}
                </GuideSection>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
