import React from "react"
import { Shield, Crosshair, BookOpen, Map, Trophy, Gem } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { CyberCard, CyberBadge } from "@/components/ui/CyberComponents"
import { ActivityData } from "@/types"

interface ActivityOverviewTemplateProps {
  activityData: ActivityData
}

export function ActivityOverviewTemplate({ activityData }: ActivityOverviewTemplateProps) {
  const { preface, loadout_tips, epic_mode, loot_table, raid_name, dungeon_name } = activityData
  const title = raid_name || dungeon_name || "Activity Overview"

  return (
    <div className="flex-1 overflow-y-auto w-full bg-background p-4 md:p-8">
      <div className="w-full space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4 border-b border-border pb-6">
          <SidebarTrigger className="md:hidden" />
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-blue-400 to-neon-orange text-glow-cyan">
              {title} - Overview
            </h1>
            {preface?.author_notes && (
              <p className="text-muted-foreground mt-2 text-lg font-mono tracking-wide">
                {preface.author_notes}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-8">
          {/* General Mechanics & Rules */}
          <div className="space-y-8">
            <CyberCard variant="zinc" withCorners className="cyber-grid relative">
              <div className="border-b border-zinc-800 pb-4 mb-4 flex items-center gap-3 relative z-10">
                <div className="p-2 bg-neon-cyan/10 rounded-md">
                  <BookOpen className="w-5 h-5 text-neon-cyan" />
                </div>
                <h2 className="text-xl font-bold uppercase tracking-wider text-foreground">General Rules</h2>
              </div>
              <div className="text-muted-foreground leading-relaxed space-y-4 relative z-10">
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
                            <CyberBadge variant="cyan" withIndicator={false}>
                              {plate.plate_text}
                            </CyberBadge>
                            <span>→ {plate.target_encounter}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </CyberCard>
          </div>

          {/* Loadout Recommendations */}
          <div className="space-y-8">
            <CyberCard variant="zinc" withCorners className="h-full">
              <div className="border-b border-zinc-800 pb-4 mb-4 flex items-center gap-3">
                <div className="p-2 bg-neon-cyan/10 rounded-md">
                  <Shield className="w-5 h-5 text-neon-cyan" />
                </div>
                <h2 className="text-xl font-bold uppercase tracking-wider text-foreground">Recommended Loadouts</h2>
              </div>
              <div className="space-y-6 relative z-10">
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
                      {loadout_tips.weapons.map((w: { name: string; description: string }) => (
                        <div key={w.name} className="flex flex-col bg-secondary/10 p-3 rounded-md border border-border/50">
                          <span className="font-bold text-foreground text-sm">{w.name}</span>
                          <span className="text-xs text-muted-foreground mt-1">{w.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {['warlocks', 'titans', 'hunters'].map((cls) => {
                  const data = loadout_tips?.[cls] as { supers?: { name: string; utility: string }[]; exotics_and_abilities?: { name: string; recommendation: string }[] } | undefined;
                  if (!data) return null;
                  
                  return (
                    <div key={cls}>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-3 flex items-center gap-2">
                        <Shield className="w-4 h-4" /> {cls.charAt(0).toUpperCase() + cls.slice(1)}
                      </h3>
                      <div className="space-y-3 pl-2 border-l border-border/50">
                        {(data.supers?.length ?? 0) > 0 && (
                          <div>
                            <strong className="text-xs text-muted-foreground uppercase">Supers:</strong>
                            <div className="flex flex-col gap-2 mt-2">
                              {data.supers!.map((s: { name: string; utility: string }) => (
                                <div key={s.name} className="flex flex-col bg-secondary/10 p-3 rounded-md border border-border/50">
                                  <span className="font-bold text-primary text-sm">{s.name}</span>
                                  <span className="text-xs text-muted-foreground mt-1">{s.utility}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {(data.exotics_and_abilities?.length ?? 0) > 0 && (
                          <div className="mt-4">
                            <strong className="text-xs text-muted-foreground uppercase">Exotics & Abilities:</strong>
                            <div className="flex flex-col gap-2 mt-2">
                              {data.exotics_and_abilities!.map((e: { name: string; recommendation: string }) => (
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
              </div>
            </CyberCard>
          </div>

          {/* Epic Mode */}
          {epic_mode && (
            <div className="space-y-8">
              <CyberCard variant="red" withCorners className="h-full">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                  <Trophy className="w-32 h-32 text-neon-red" />
                </div>
                <div className="border-b border-neon-red/30 pb-4 mb-4 flex items-center gap-3 relative z-10">
                  <div className="p-2 bg-neon-red/20 rounded-md">
                    <Trophy className="w-5 h-5 text-neon-red" />
                  </div>
                  <h2 className="text-xl font-bold uppercase tracking-wider text-neon-red text-glow-red">The Epic Raid (Mastery)</h2>
                </div>
                <div className="space-y-6 relative z-10">
                  {epic_mode.requirements_and_contest && (
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3 border-b border-border/50 pb-2">🛡️ Requirements & Contest Mode</h3>
                      <ul className="space-y-2 text-sm text-foreground/80 list-disc pl-5">
                        {epic_mode.requirements_and_contest.map((req, i) => <li key={i}>{req}</li>)}
                      </ul>
                    </div>
                  )}
                  {epic_mode.emblems_and_titles && (
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3 border-b border-border/50 pb-2">🏆 Emblems & Titles</h3>
                      <ul className="space-y-2 text-sm text-foreground/80 list-disc pl-5">
                        {epic_mode.emblems_and_titles.map((emb, i) => <li key={i}>{emb}</li>)}
                      </ul>
                    </div>
                  )}
                  {epic_mode.encounter_changes && (
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-red-500 mb-3 border-b border-border/50 pb-2 flex items-center gap-2">⚠️ Encounter Changes</h3>
                      <div className="space-y-3">
                        {epic_mode.encounter_changes.map((enc, i) => (
                          <div key={i} className="p-3 bg-secondary/20 border border-border/50 rounded-lg">
                            <strong className="text-primary block mb-1">{enc.name}</strong>
                            <span className="text-sm text-muted-foreground">{enc.changes}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CyberCard>
            </div>
          )}

          {/* Loot Table */}
          {loot_table && loot_table.length > 0 && (
            <div className="space-y-8">
              <CyberCard variant="orange" withCorners className="h-full">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                  <Gem className="w-32 h-32 text-neon-orange" />
                </div>
                <div className="border-b border-neon-orange/30 pb-4 mb-4 flex items-center gap-3 relative z-10">
                  <div className="p-2 bg-neon-orange/20 rounded-md">
                    <Gem className="w-5 h-5 text-neon-orange" />
                  </div>
                  <h2 className="text-xl font-bold uppercase tracking-wider text-neon-orange text-glow-orange">Loot Table</h2>
                </div>
                <div className="relative z-10 overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-secondary/50 text-muted-foreground border-b border-border/50">
                      <tr>
                        <th scope="col" className="px-4 py-3 font-bold">Weapon</th>
                        <th scope="col" className="px-4 py-3 font-bold">Type</th>
                        <th scope="col" className="px-4 py-3 font-bold">Frame</th>
                        <th scope="col" className="px-4 py-3 font-bold">Source</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loot_table.map((item, i) => (
                        <tr key={i} className="border-b border-border/50 hover:bg-secondary/20">
                          <td className="px-4 py-3 font-bold text-foreground flex items-center gap-2">
                            {item.weapon.includes('(Exotic)') && <span className="w-2 h-2 rounded-full bg-amber-500"></span>}
                            {!item.weapon.includes('(Exotic)') && <span className="w-2 h-2 rounded-full bg-purple-500"></span>}
                            {item.weapon}
                          </td>
                          <td className="px-4 py-3 text-muted-foreground">{item.type}</td>
                          <td className="px-4 py-3 text-muted-foreground">{item.frame}</td>
                          <td className="px-4 py-3 font-medium text-foreground/80">{item.source}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CyberCard>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
