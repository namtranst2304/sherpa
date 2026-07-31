"use client"

import { useMemo } from "react"
import { motion, AnimatePresence } from "motion/react"
import { GuideSidebar } from "./GuideSidebar"
import { GuideTemplate } from "./GuideTemplate"
import { ActivityOverviewTemplate } from "./ActivityOverviewTemplate"
import { MobileGuideTOC } from "./MobileGuideTOC"
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
  const isOverview = !activeEncounterId || activeEncounterId === "overview"
  const isSecretsView = activeEncounterId === "secrets"
  const pageTitle = activityData?.raid_name || activityData?.dungeon_name || "Activity"

  const sidebarGroups = useMemo(
    () => {
      if (!activityData?.encounters) return []
      return [
        {
          title: "Thông tin Activity",
          items: [
            {
              id: "overview",
              title: "Tổng quan & Loadout",
              href: "?enc=overview",
            },
            ...(activityData.activity_secrets
              ? [
                  {
                    id: "secrets",
                    title: "Secrets & Rương ẩn",
                    href: "?enc=secrets",
                  },
                ]
              : []),
          ],
        },
        {
          title: "Encounters",
          items: activityData.encounters.map((enc: ActivityEncounter) => ({
            id: enc.id,
            title: enc.name,
            href: `?enc=${enc.id}`,
          })),
        },
      ]
    },
    [activityData]
  )

  if (!activityData?.encounters) {
    return <div>No activity data found.</div>
  }

  const activeEncounter =
    isOverview || isSecretsView
      ? null
      : activityData.encounters.find((enc: ActivityEncounter) => enc.id === activeEncounterId) ||
        activityData.encounters[0]

  const currentViewId = isOverview
    ? "overview"
    : isSecretsView
      ? "secrets"
      : activeEncounter?.id

  const renderContent = () => {
    if (isSecretsView && activityData.activity_secrets) {
      return (
        <GuideTemplate
          title="Secrets & Rương ẩn"
          description="Vị trí rương ẩn và giải đố hạt giống viền đỏ (Red Border)"
          mechanics={<EncounterSecrets secrets={activityData.activity_secrets} />}
          map={null}
          roles={null}
        />
      )
    }

    if (isOverview) {
      return <ActivityOverviewTemplate activityData={activityData} />
    }

    if (!activeEncounter) {
      return <div>Encounter not found.</div>
    }

    return (
      <GuideTemplate
        title={activeEncounter.name}
        description={activityData.preface?.author_notes || "Hướng dẫn chi tiết cơ chế chiến đấu"}
        mechanics={
          activeEncounter.walkthrough && Object.keys(activeEncounter.walkthrough).length > 0 ? (
            <EncounterPhase walkthrough={activeEncounter.walkthrough} />
          ) : undefined
        }
        map={
          activeEncounter.images && activeEncounter.images.length > 0 ? (
            <EncounterMap images={activeEncounter.images} encounterName={activeEncounter.name} />
          ) : undefined
        }
        roles={
          activeEncounter.roles && Object.keys(activeEncounter.roles).length > 0 && (
            <EncounterRoles roles={activeEncounter.roles} />
          )
        }
        secrets={
          activeEncounter.secrets && activeEncounter.secrets.length > 0 ? (
            <EncounterSecrets secrets={activeEncounter.secrets} />
          ) : undefined
        }
      />
    )
  }

  return (
    <div className="flex h-full w-full md:overflow-hidden flex-col md:flex-row">
      <GuideSidebar
        groups={sidebarGroups}
        title={pageTitle}
        subtitle="Hướng dẫn Encounter"
        activeEncounterId={currentViewId}
      />

      <MobileGuideTOC groups={sidebarGroups} activeEncounterId={currentViewId} />

      <div className="flex-1 md:overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentViewId}
            className="w-full h-full flex flex-col"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ opacity: { duration: 0.2, ease: "easeInOut" }, y: { duration: 0.2, ease: "easeInOut" } }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
