import * as React from "react"
import Image from "next/image"
import { GuideSidebar } from "@/components/layout/GuideSidebar"
import { GuideTemplate } from "@/components/layout/GuideTemplate"
import { ActivityOverviewTemplate } from "@/components/layout/ActivityOverviewTemplate"
import { Shield, Target, Sword, Map } from "lucide-react"
import { ActivityData, ActivityEncounter, ActivityEncounterPhase, ActivityRole } from "@/lib/types"

interface ActivityEncounterViewProps {
  activityData: ActivityData
  activeEncounterId?: string
}

export function ActivityEncounterView({ activityData, activeEncounterId }: ActivityEncounterViewProps) {
  if (!activityData || !activityData.encounters) {
    return <div>No activity data found.</div>
  }

  const isOverview = !activeEncounterId || activeEncounterId === "overview";

  const sidebarGroups = [
    {
      title: "Activity Info",
      items: [
        {
          id: "overview",
          title: "Overview & Loadouts",
          href: "?enc=overview",
        }
      ]
    },
    {
      title: "Encounters",
      items: activityData.encounters.map((enc: ActivityEncounter) => ({
        id: enc.id,
        title: enc.name,
        href: `?enc=${enc.id}`,
      }))
    }
  ]

  const activeEncounter = isOverview 
    ? null 
    : (activityData.encounters.find((enc: ActivityEncounter) => enc.id === activeEncounterId) || activityData.encounters[0])

  return (
    <div className="flex h-full w-full overflow-hidden">
      <GuideSidebar 
        groups={sidebarGroups} 
        title={activityData.raid_name || activityData.dungeon_name || "Activity"} 
        subtitle="Walkthrough Guide" 
        activeEncounterId={isOverview ? "overview" : activeEncounter?.id}
      />

      {isOverview ? (
        <ActivityOverviewTemplate activityData={activityData} />
      ) : (
        <GuideTemplate
          title={activeEncounter!.name}
          description={activityData.preface?.author_notes || "Hướng dẫn chi tiết cơ chế chiến đấu"}
          mechanics={
            <div className="space-y-6">
              {Object.entries(activeEncounter!.walkthrough || {}).map(([phaseKey, phaseVal]: [string, ActivityEncounterPhase], index) => {
                const phaseTitle = phaseVal.name || phaseKey.toUpperCase()
                const phaseObjective = phaseVal.objective
                const steps = phaseVal.steps || phaseVal.details || []
                return (
                  <div key={phaseKey} className="bg-secondary/20 p-5 rounded-xl border border-border/50 hover:border-primary/50 transition-colors duration-300">
                    <h3 className="text-xl font-bold text-primary mb-3 flex items-center gap-3">
                      <span className="bg-primary/20 text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-[0_0_10px_rgba(0,195,255,0.2)]">
                        {index + 1}
                      </span>
                      {phaseTitle}
                    </h3>
                    {phaseObjective && (
                      <p className="text-muted-foreground italic mb-4 border-l-2 border-primary pl-4 py-1 text-sm bg-primary/5 rounded-r-lg">
                        Mục tiêu: {phaseObjective}
                      </p>
                    )}
                    <ul className="space-y-3">
                      {steps.map((step: string, i: number) => (
                        <li key={i} className="flex gap-3 text-sm text-foreground/80 leading-relaxed">
                          <span className="text-primary mt-1 font-bold">{i + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                    {phaseVal.mine_locations && (
                      <div className="mt-5 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                        <h4 className="font-semibold text-amber-500 mb-3 flex items-center gap-2">
                          <Map className="w-4 h-4" /> Vị trí phân bổ Mìn:
                        </h4>
                        <ul className="space-y-2">
                          {phaseVal.mine_locations.map((loc: string, i: number) => (
                            <li key={i} className="text-sm text-amber-500/90 ml-6 list-disc">
                              {loc}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          }
          map={
            activeEncounter!.images && activeEncounter!.images.length > 0 ? (
              <div className="w-full flex flex-col gap-6 p-4">
                {activeEncounter!.images.map((img, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-3 w-full">
                    <Image 
                      src={img.url} 
                      alt={img.caption || "Encounter map"} 
                      width={1200} 
                      height={800} 
                      unoptimized={true}
                      className="rounded-lg shadow-[0_0_15px_rgba(0,195,255,0.1)] border border-border max-w-full h-auto" 
                    />
                    {img.caption && <p className="text-sm text-muted-foreground italic bg-secondary/30 px-4 py-1.5 rounded-full">{img.caption}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground flex flex-col items-center justify-center gap-4 p-8 w-full h-full min-h-[300px] border border-dashed border-border/60 rounded-xl bg-background/50">
                <Map className="w-16 h-16 opacity-30 text-primary" />
                <p className="text-lg font-medium text-foreground/80">Sơ đồ vị trí: {activeEncounter!.name}</p>
                <p className="text-sm opacity-60 max-w-md">Khu vực này sẽ hiển thị bản đồ chiến thuật chi tiết, vị trí bệ đứng, bẫy điện và đường di chuyển của Boss.</p>
              </div>
            )
          }
          roles={
            <div className="space-y-6">
              {activeEncounter!.roles && (activeEncounter!.roles.option_1 || activeEncounter!.roles.option_2) ? (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  {['option_1', 'option_2'].map((opt) => {
                    if (!activeEncounter!.roles![opt]) return null;
                    const rolesForOption = activeEncounter!.roles![opt] as Record<string, ActivityRole>;
                    return (
                      <div key={opt} className="bg-secondary/10 p-5 rounded-xl border border-border relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1 h-full bg-primary/50 group-hover:bg-primary transition-colors"></div>
                        <h4 className="text-xl font-black text-primary mb-5 uppercase tracking-wider border-b border-border/50 pb-3 flex items-center justify-between">
                          {opt.replace('_', ' ')}
                          <span className="text-xs font-medium px-2 py-1 bg-primary/10 rounded-md text-primary/80">Strategy</span>
                        </h4>
                        <div className="space-y-4">
                          {Object.entries(rolesForOption).map(([roleKey, roleVal]: [string, ActivityRole], idx) => {
                            const isRunner = roleKey.toLowerCase().includes("runner");
                            const Icon = isRunner ? Target : Shield;
                            return (
                              <div key={idx} className="bg-background/80 p-4 rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
                                <h5 className="font-bold text-foreground flex items-center gap-2 mb-2">
                                  <div className="p-1.5 bg-primary/20 rounded-md">
                                    <Icon className="w-4 h-4 text-primary" />
                                  </div>
                                  {roleKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                  <span className="ml-auto text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">x{roleVal.quantity || 1}</span>
                                </h5>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                  {roleVal.description || "N/A"}
                                </p>
                                {roleVal.types && (
                                  <div className="mt-3 flex flex-wrap gap-2">
                                    {roleVal.types.map((t: string) => (
                                      <span key={t} className="text-[11px] font-medium px-2.5 py-1 bg-primary/15 text-primary border border-primary/20 rounded-full shadow-sm">{t}</span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries((activeEncounter!.roles as Record<string, ActivityRole>) || {}).map(([roleKey, roleVal]: [string, ActivityRole], idx: number) => {
                    const isRunner = roleKey.toLowerCase().includes("runner");
                    const isShooter = roleKey.toLowerCase().includes("shooter");
                    const Icon = (isRunner || isShooter) ? Target : Sword;
                    return (
                      <div key={idx} className="p-5 border border-border rounded-xl bg-secondary/10 hover:bg-secondary/30 transition-all duration-300 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                          <Icon className="w-24 h-24" />
                        </div>
                        <div className="relative z-10">
                          <h3 className="font-bold text-lg text-foreground flex items-center gap-3 mb-3">
                            <div className="p-2 bg-primary/20 rounded-md shadow-sm">
                              <Icon className="w-5 h-5 text-primary" />
                            </div>
                            {roleKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            <span className="ml-auto text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">x{roleVal.quantity || 1}</span>
                          </h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {roleVal.description}
                          </p>
                          {roleVal.types && (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {roleVal.types.map((t: string) => (
                                <span key={t} className="text-[11px] font-medium px-2.5 py-1 bg-primary/15 text-primary border border-primary/20 rounded-full shadow-sm">{t}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          }
        />
      )}
    </div>
  )
}

