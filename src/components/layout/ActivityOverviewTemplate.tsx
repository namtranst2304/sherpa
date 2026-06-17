import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Crosshair, BookOpen, Map } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ActivityData } from "@/lib/types"

interface ActivityOverviewTemplateProps {
  activityData: ActivityData
}

export function ActivityOverviewTemplate({ activityData }: ActivityOverviewTemplateProps) {
  const { preface, loadout_tips, raid_name, dungeon_name } = activityData
  const title = raid_name || dungeon_name || "Activity Overview"

  return (
    <div className="flex-1 overflow-y-auto w-full bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4 border-b border-border pb-6">
          <SidebarTrigger className="md:hidden" />
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
              {title} - Overview
            </h1>
            {preface?.author_notes && (
              <p className="text-muted-foreground mt-2 text-lg">
                {preface.author_notes}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-8">
          {/* General Mechanics & Rules */}
          <div className="space-y-8">
            <Card className="bg-card border-border hover:border-primary transition-colors hover:shadow-[0_0_15px_rgba(0,195,255,0.1)]">
              <CardHeader className="border-b border-border/50 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-md">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="uppercase tracking-wider">General Rules</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground leading-relaxed space-y-4">
                {preface?.formatting_rules && (
                  <div>
                    <h3 className="font-bold text-foreground mb-2">Formatting & Callouts</h3>
                    <p className="text-sm">{preface.formatting_rules}</p>
                  </div>
                )}
                {preface?.non_linear_mechanic && (
                  <div className="mt-4 p-4 bg-secondary/20 rounded-lg border border-border/50">
                    <h3 className="font-bold text-primary mb-2 flex items-center gap-2">
                      <Map className="w-4 h-4" /> Non-Linear Progression
                    </h3>
                    <p className="text-sm mb-4">{preface.non_linear_mechanic.description}</p>
                    {preface.non_linear_mechanic.elevator_plates && (
                      <ul className="space-y-2">
                        {preface.non_linear_mechanic.elevator_plates.map((plate, i) => (
                          <li key={i} className="text-sm flex items-center gap-2">
                            <span className="px-2 py-1 bg-primary/10 text-primary font-mono text-xs rounded">
                              {plate.plate_text}
                            </span>
                            <span>→ {plate.target_encounter}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Loadout Recommendations */}
          <div className="space-y-8">
            <Card className="bg-card border-border hover:border-primary transition-colors hover:shadow-[0_0_15px_rgba(0,195,255,0.1)] h-full">
              <CardHeader className="border-b border-border/50 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-md">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="uppercase tracking-wider">Recommended Loadouts</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {loadout_tips?.note && (
                  <p className="text-sm italic text-muted-foreground bg-secondary/10 p-3 rounded border-l-2 border-primary">
                    {loadout_tips.note}
                  </p>
                )}
                {loadout_tips?.weapons && (
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                      <Crosshair className="w-4 h-4" /> Recommended Weapons
                    </h3>
                    <div className="flex flex-col gap-2">
                      {loadout_tips.weapons.map((w: any) => (
                        <div key={w.name} className="flex flex-col bg-secondary/10 p-3 rounded-md border border-border/50">
                          <span className="font-bold text-foreground text-sm">{w.name}</span>
                          <span className="text-xs text-muted-foreground mt-1">{w.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {['warlocks', 'titans', 'hunters'].map((cls) => {
                  const data = loadout_tips?.[cls] as any;
                  if (!data) return null;
                  
                  return (
                    <div key={cls}>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-3 flex items-center gap-2">
                        <Shield className="w-4 h-4" /> {cls.charAt(0).toUpperCase() + cls.slice(1)}
                      </h3>
                      <div className="space-y-3 pl-2 border-l border-border/50">
                        {data.supers?.length > 0 && (
                          <div>
                            <strong className="text-xs text-muted-foreground uppercase">Supers:</strong>
                            <div className="flex flex-col gap-2 mt-2">
                              {data.supers.map((s: any) => (
                                <div key={s.name} className="flex flex-col bg-secondary/10 p-3 rounded-md border border-border/50">
                                  <span className="font-bold text-primary text-sm">{s.name}</span>
                                  <span className="text-xs text-muted-foreground mt-1">{s.utility}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {data.exotics_and_abilities?.length > 0 && (
                          <div className="mt-4">
                            <strong className="text-xs text-muted-foreground uppercase">Exotics & Abilities:</strong>
                            <div className="flex flex-col gap-2 mt-2">
                              {data.exotics_and_abilities.map((e: any) => (
                                <div key={e.name} className="flex flex-col bg-amber-500/5 p-3 rounded-md border border-amber-500/20">
                                  <span className="font-bold text-amber-500 text-sm">{e.name}</span>
                                  <span className="text-xs text-muted-foreground mt-1">{e.recommendation}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
