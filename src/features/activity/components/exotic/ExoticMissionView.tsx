'use client'

import { useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { GuideShell } from '../GuideShell'
import { GuideSidebar } from '../encounter/GuideSidebar'
import { MobileGuideTOC } from '../encounter/MobileGuideTOC'
import {
  EncounterNavigatorHUD,
  NavItem,
} from '../encounter/EncounterNavigatorHUD'
import { ActivityOverviewTemplate } from '../overview/ActivityOverviewTemplate'
import { ExoticWalkthroughCard } from './ExoticWalkthroughCard'
import { ExoticCatalystTab } from './ExoticCatalystTab'
import { ActivityData } from '@/types'

interface ExoticMissionViewProps {
  activityData: ActivityData
  activeTabId?: string
}

export function ExoticMissionView({
  activityData,
  activeTabId = 'overview',
}: ExoticMissionViewProps) {
  const router = useRouter()
  const missionName =
    activityData.dungeon_name || activityData.raid_name || 'Exotic Mission'
  const walkthrough = activityData.encounters?.[0]?.walkthrough

  const sidebarGroups = useMemo(
    () => [
      {
        title: 'Nội dung Mission',
        items: [
          {
            id: 'overview',
            title: 'Tổng quan & Loadout',
            href: '?tab=overview',
          },
          {
            id: 'walkthrough',
            title: 'Walkthrough',
            href: '?tab=walkthrough',
          },
          ...(activityData.catalyst_guide
            ? [
                {
                  id: 'catalyst',
                  title: 'Catalyst & Secrets',
                  href: '?tab=catalyst',
                },
              ]
            : []),
        ],
      },
    ],
    [activityData.catalyst_guide],
  )

  const flatNavItems: NavItem[] = useMemo(() => {
    return sidebarGroups.flatMap((g) => g.items)
  }, [sidebarGroups])

  const handleNavigate = useCallback(
    (item: NavItem) => {
      if (item.href) {
        router.push(item.href, { scroll: false })
      }
    },
    [router],
  )

  const renderContent = () => {
    switch (activeTabId) {
      case 'walkthrough':
        return (
          <div className="mx-auto flex h-full max-w-5xl flex-col gap-8 overflow-y-auto p-6 pb-24 md:p-12 md:pb-28">
            <div className="mb-8">
              <h1 className="glow-text-zinc mb-4 text-4xl font-black tracking-widest text-zinc-100 uppercase md:text-5xl">
                Walkthrough
              </h1>
              <p className="max-w-3xl font-mono text-lg text-zinc-400">
                Hướng dẫn chi tiết các bước hoàn thành Exotic Mission{' '}
                {missionName}.
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

      case 'catalyst':
        return (
          <div className="h-full overflow-y-auto p-6 md:p-12">
            <ExoticCatalystTab catalystGuide={activityData.catalyst_guide} />
          </div>
        )

      case 'overview':
      default:
        return <ActivityOverviewTemplate activityData={activityData} />
    }
  }

  return (
    <>
      <GuideShell
        contentKey={activeTabId}
        contentClassName="flex-1 min-h-0 overflow-hidden bg-zinc-950"
        sidebar={
          <GuideSidebar
            groups={sidebarGroups}
            title={missionName}
            subtitle="Exotic Walkthrough"
            activeEncounterId={activeTabId}
          />
        }
        toc={
          <MobileGuideTOC
            groups={sidebarGroups}
            activeEncounterId={activeTabId}
          />
        }
      >
        {renderContent()}
      </GuideShell>

      {/* Floating Bottom Action HUD */}
      <EncounterNavigatorHUD
        items={flatNavItems}
        currentId={activeTabId}
        onNavigate={handleNavigate}
      />
    </>
  )
}
