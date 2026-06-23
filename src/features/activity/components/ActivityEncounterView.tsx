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
        },
        ...(activityData.activity_secrets ? [{
          id: "secrets",
          title: "Secrets & Chests",
          href: "?enc=secrets"
        }] : [])
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

  const activeEncounter = isOverview || activeEncounterId === "secrets"
    ? null 
    : (activityData.encounters.find((enc: ActivityEncounter) => enc.id === activeEncounterId) || activityData.encounters[0])

  const renderContent = () => {
    if (activeEncounterId === "secrets" && activityData.activity_secrets) {
      return (
        <GuideTemplate
          title="Secrets & Chests"
          description="Vị trí rương ẩn và giải đố hạt giống viền đỏ (Red Border)"
          mechanics={<EncounterSecrets secrets={activityData.activity_secrets} />}
          map={null}
          roles={null}
        />
      );
    }
    
    if (isOverview) {
      return <ActivityOverviewTemplate activityData={activityData} />;
    }

    return (
      <GuideTemplate
        title={activeEncounter!.name}
        description={activityData.preface?.author_notes || "Hướng dẫn chi tiết cơ chế chiến đấu"}
        mechanics={
          activeEncounter!.walkthrough && Object.keys(activeEncounter!.walkthrough).length > 0 ? (
            <EncounterPhase walkthrough={activeEncounter!.walkthrough} />
          ) : undefined
        }
        map={
          activeEncounter!.images && activeEncounter!.images.length > 0 ? (
            <EncounterMap images={activeEncounter!.images} encounterName={activeEncounter!.name} />
          ) : undefined
        }
        roles={
          activeEncounter!.roles && Object.keys(activeEncounter!.roles).length > 0 && (
            <EncounterRoles roles={activeEncounter!.roles} />
          )
        }
        secrets={
          activeEncounter!.secrets && activeEncounter!.secrets.length > 0 ? (
            <EncounterSecrets secrets={activeEncounter!.secrets} />
          ) : undefined
        }
      />
    );
  };

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
          key={isOverview ? "overview" : activeEncounterId === "secrets" ? "secrets" : activeEncounter?.id} 
          className="flex-1 overflow-hidden h-full"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ opacity: { duration: 0.2, ease: "easeInOut" }, y: { duration: 0.2, ease: "easeInOut" } }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
