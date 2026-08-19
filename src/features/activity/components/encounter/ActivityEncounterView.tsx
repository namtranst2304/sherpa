'use client'

import { useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { GuideShell } from '../GuideShell'
import { GuideSidebar } from './GuideSidebar'
import { GuideTemplate } from './GuideTemplate'
import { ActivityOverviewTemplate } from '../overview/ActivityOverviewTemplate'
import { MobileGuideTOC } from './MobileGuideTOC'
import { EncounterNavigatorHUD, NavItem } from './EncounterNavigatorHUD'
import { ActivityData, ActivityEncounter } from '@/types'
import { EncounterPhase } from './EncounterPhase'
import { EncounterMap } from './EncounterMap'
import { EncounterRoles } from './EncounterRoles'
import { EncounterSecrets } from './EncounterSecrets'
import { EncounterCatalyst } from './EncounterCatalyst'

interface ActivityEncounterViewProps {
  activityData: ActivityData
  activeEncounterId?: string
}

export function ActivityEncounterView({
  activityData,
  activeEncounterId,
}: ActivityEncounterViewProps) {
  const router = useRouter()
  const isOverview = !activeEncounterId || activeEncounterId === 'overview'
  const isSecretsView = activeEncounterId === 'secrets'
  const isCatalystView = activeEncounterId === 'catalyst'
  const pageTitle =
    activityData?.raid_name || activityData?.dungeon_name || 'Activity'

  const sidebarGroups = useMemo(() => {
    if (!activityData?.encounters) return []
    return [
      {
        title: 'Thông tin Activity',
        items: [
          {
            id: 'overview',
            title: 'Tổng quan & Loadout',
            href: '?enc=overview',
          },
          // Empty array from slim payload still means “has secrets” — keep nav link.
          ...(activityData.activity_secrets != null
            ? [
                {
                  id: 'secrets',
                  title: 'Secrets & Rương ẩn',
                  href: '?enc=secrets',
                },
              ]
            : []),
          ...(activityData.catalyst_guide != null
            ? [
                {
                  id: 'catalyst',
                  title: 'Catalyst Guide',
                  href: '?enc=catalyst',
                },
              ]
            : []),
        ],
      },
      {
        title: 'Encounters',
        items: activityData.encounters.map((enc: ActivityEncounter) => ({
          id: enc.id,
          title: enc.name,
          href: `?enc=${enc.id}`,
        })),
      },
    ]
  }, [activityData])

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

  if (!activityData?.encounters) {
    return <div>No activity data found.</div>
  }

  const activeEncounter =
    isOverview || isSecretsView || isCatalystView
      ? null
      : activityData.encounters.find(
          (enc: ActivityEncounter) => enc.id === activeEncounterId,
        ) || activityData.encounters[0]

  const currentViewId = isOverview
    ? 'overview'
    : isSecretsView
      ? 'secrets'
      : isCatalystView
        ? 'catalyst'
        : activeEncounter?.id

  const renderContent = () => {
    if (isSecretsView) {
      if (
        activityData.activity_secrets &&
        activityData.activity_secrets.length > 0
      ) {
        return (
          <GuideTemplate
            title="Secrets & Rương ẩn"
            description="Vị trí rương ẩn và giải đố hạt giống viền đỏ (Red Border)"
            mechanics={
              <EncounterSecrets secrets={activityData.activity_secrets} />
            }
            map={null}
            roles={null}
          />
        )
      }
      return (
        <GuideTemplate
          title="Secrets & Rương ẩn"
          description="Chưa có dữ liệu secrets cho activity này."
          mechanics={null}
          map={null}
          roles={null}
        />
      )
    }

    if (isCatalystView) {
      if (activityData.catalyst_guide) {
        return (
          <GuideTemplate
            title="Hướng dẫn lấy Catalyst"
            description="Chi tiết cách giải đố và thu thập vũ khí Catalyst"
            mechanics={
              <EncounterCatalyst catalyst={activityData.catalyst_guide} />
            }
            map={null}
            roles={null}
          />
        )
      }
      return (
        <GuideTemplate
          title="Hướng dẫn lấy Catalyst"
          description="Chưa có dữ liệu Catalyst cho activity này."
          mechanics={null}
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
        description={
          activityData.preface?.author_notes ||
          'Hướng dẫn chi tiết cơ chế chiến đấu'
        }
        mechanics={
          activeEncounter.walkthrough &&
          Object.keys(activeEncounter.walkthrough).length > 0 ? (
            <EncounterPhase walkthrough={activeEncounter.walkthrough} />
          ) : undefined
        }
        map={
          activeEncounter.images && activeEncounter.images.length > 0 ? (
            <EncounterMap
              images={activeEncounter.images}
              encounterName={activeEncounter.name}
            />
          ) : undefined
        }
        roles={
          activeEncounter.roles &&
          Object.keys(activeEncounter.roles).length > 0 ? (
            <EncounterRoles
              roles={activeEncounter.roles}
              encounterName={activeEncounter.name}
            />
          ) : undefined
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
    <>
      <GuideShell
        contentKey={currentViewId || 'overview'}
        sidebar={
          <GuideSidebar
            groups={sidebarGroups}
            title={pageTitle}
            subtitle="Hướng dẫn Encounter"
            activeEncounterId={currentViewId}
            orbit={activityData.active_orbit}
          />
        }
        toc={
          <MobileGuideTOC
            groups={sidebarGroups}
            activeEncounterId={currentViewId}
          />
        }
      >
        {renderContent()}
      </GuideShell>

      {/* Floating Bottom Action HUD */}
      <EncounterNavigatorHUD
        items={flatNavItems}
        currentId={currentViewId}
        onNavigate={handleNavigate}
      />
    </>
  )
}
