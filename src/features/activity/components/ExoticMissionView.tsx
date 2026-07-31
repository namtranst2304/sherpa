"use client"

import { useMemo } from "react"
import { motion, AnimatePresence } from "motion/react"
import { GuideSidebar } from "./GuideSidebar"
import { MobileGuideTOC } from "./MobileGuideTOC"
import { ActivityOverviewTemplate } from "./ActivityOverviewTemplate"
import { ExoticWalkthroughCard } from "./ExoticWalkthroughCard"
import { ExoticCatalystTab } from "./ExoticCatalystTab"
import { ActivityData } from "@/types"

interface ExoticMissionViewProps {
  activityData: ActivityData
  activeTabId?: string
}

export function ExoticMissionView({ activityData, activeTabId = "overview" }: ExoticMissionViewProps) {
  const missionName = activityData.dungeon_name || activityData.raid_name || "Exotic Mission"
  const walkthrough = activityData.encounters?.[0]?.walkthrough

  const sidebarGroups = useMemo(
    () => [
      {
        title: "Nội dung Mission",
        items: [
          {
            id: "overview",
            title: "Tổng quan & Loadout",
            href: "?tab=overview",
          },
          {
            id: "walkthrough",
            title: "Walkthrough",
            href: "?tab=walkthrough",
          },
          ...(activityData.catalyst_guide
            ? [{
                id: "catalyst",
                title: "Catalyst & Secrets",
                href: "?tab=catalyst",
              }]
            : []),
        ],
      },
    ],
    [activityData.catalyst_guide]
  )

  const renderContent = () => {
    switch (activeTabId) {
      case "walkthrough":
        return (
          <div className="p-6 md:p-12 max-w-5xl mx-auto flex flex-col gap-8 h-full overflow-y-auto">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-widest text-zinc-100 text-glow-zinc mb-4">
                Walkthrough
              </h1>
              <p className="text-zinc-400 font-mono text-lg max-w-3xl">
                Hướng dẫn chi tiết các bước hoàn thành Exotic Mission {missionName}.
              </p>
            </div>

            {walkthrough &&
              Object.values(walkthrough).map((phase, idx) => (
                <ExoticWalkthroughCard
                  key={idx}
                  title={phase.name || `Phase ${idx + 1}`}
                  phase={phase}
                  index={idx + 1}
                />
              ))}
          </div>
        )

      case "catalyst":
        return (
          <div className="h-full overflow-y-auto p-6 md:p-12">
            <ExoticCatalystTab catalystGuide={activityData.catalyst_guide} />
          </div>
        )

      case "overview":
      default:
        return <ActivityOverviewTemplate activityData={activityData} />
    }
  }

  return (
    <div className="flex h-full w-full md:overflow-hidden flex-col md:flex-row">
      <GuideSidebar
        groups={sidebarGroups}
        title={missionName}
        subtitle="Exotic Walkthrough"
        activeEncounterId={activeTabId}
      />

      <MobileGuideTOC
        groups={sidebarGroups}
        activeEncounterId={activeTabId}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTabId}
          className="flex-1 overflow-hidden h-full bg-zinc-950"
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
