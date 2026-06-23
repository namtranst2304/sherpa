"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { GuideSidebar } from "./GuideSidebar"
import { ActivityOverviewTemplate } from "./ActivityOverviewTemplate"
import { ExoticWalkthroughCard } from "./ExoticWalkthroughCard"
import { ExoticCatalystTab } from "./ExoticCatalystTab"
import { ActivityData } from "@/types"

interface ExoticMissionViewProps {
  activityData: ActivityData
  activeTabId?: string
}

export function ExoticMissionView({ activityData, activeTabId = "overview" }: ExoticMissionViewProps) {
  if (!activityData) {
    return <div>No activity data found.</div>
  }

  const sidebarGroups = [
    {
      title: "Mission Content",
      items: [
        {
          id: "overview",
          title: "Overview & Loadouts",
          href: "?tab=overview",
        },
        {
          id: "walkthrough",
          title: "Mission Walkthrough",
          href: "?tab=walkthrough",
        },
        ...(activityData.catalyst_guide ? [{
          id: "catalyst",
          title: "Catalyst & Secrets",
          href: "?tab=catalyst",
        }] : [])
      ]
    }
  ]

  const renderContent = () => {
    switch (activeTabId) {
      case "overview":
        return <ActivityOverviewTemplate activityData={activityData} />
      
      case "walkthrough":
        return (
          <div className="p-6 md:p-12 max-w-5xl mx-auto flex flex-col gap-8 h-full overflow-y-auto">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-widest text-zinc-100 text-glow-zinc mb-4">
                Walkthrough
              </h1>
              <p className="text-zinc-400 font-mono text-lg max-w-3xl">
                Hướng dẫn chi tiết các bước hoàn thành Exotic Mission {activityData.dungeon_name || activityData.raid_name}.
              </p>
            </div>

            {activityData.encounters?.[0]?.walkthrough && 
              Object.values(activityData.encounters[0].walkthrough).map((phase, idx) => (
                <ExoticWalkthroughCard 
                  key={idx} 
                  title={phase.name || `Phase ${idx + 1}`} 
                  phase={phase} 
                  index={idx + 1} 
                />
              ))
            }
          </div>
        )

      case "catalyst":
        return (
          <div className="h-full overflow-y-auto p-6 md:p-12">
            <ExoticCatalystTab catalystGuide={activityData.catalyst_guide} />
          </div>
        )
      
      default:
        return <ActivityOverviewTemplate activityData={activityData} />
    }
  }

  return (
    <div className="flex h-full w-full overflow-hidden">
      <GuideSidebar 
        groups={sidebarGroups} 
        title={activityData.dungeon_name || activityData.raid_name || "Exotic Mission"} 
        subtitle="Exotic Walkthrough" 
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
