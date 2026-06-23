"use client"

import { motion, AnimatePresence } from "motion/react"
import { GuideSidebar } from "./GuideSidebar"
import { GuideTemplate } from "./GuideTemplate"
import { ActivityOverviewTemplate } from "./ActivityOverviewTemplate"
import { ActivityData, ActivityEncounter } from "@/types"
import { EncounterPhase } from "./EncounterPhase"
import { EncounterMap } from "./EncounterMap"
import { EncounterRoles } from "./EncounterRoles"
import { EncounterSecrets } from "./EncounterSecrets"

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

      <AnimatePresence mode="wait">
        <motion.div 
          key={isOverview ? "overview" : activeEncounter?.id} 
          className="flex-1 overflow-hidden h-full"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ opacity: { duration: 0.2, ease: "easeInOut" }, y: { duration: 0.2, ease: "easeInOut" } }}
        >
          {isOverview ? (
            <ActivityOverviewTemplate activityData={activityData} />
          ) : (
            <GuideTemplate
              title={activeEncounter!.name}
              description={activityData.preface?.author_notes || "Hướng dẫn chi tiết cơ chế chiến đấu"}
              mechanics={
                activeEncounter!.walkthrough && (
                  <EncounterPhase walkthrough={activeEncounter!.walkthrough} />
                )
              }
              map={
                <EncounterMap images={activeEncounter!.images} encounterName={activeEncounter!.name} />
              }
              roles={
                activeEncounter!.roles && (
                  <EncounterRoles roles={activeEncounter!.roles} />
                )
              }
              secrets={
                activeEncounter!.secrets && (
                  <EncounterSecrets secrets={activeEncounter!.secrets} />
                )
              }
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
