import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ActivityEncounterView } from "@/features/activity"
import { slimActivityForClient } from "@/lib/activity-payload"
import { ActivityData } from "@/types"

export async function createActivityMetadata(
  params: Promise<{ slug: string }>,
  dataLoader: (slug: string) => Promise<ActivityData | null>,
  typeLabel: "Raid" | "Dungeon" | "Pantheon" | "Exotic Mission"
): Promise<Metadata> {
  const resolvedParams = await params
  const data = await dataLoader(resolvedParams.slug)

  if (!data) {
    return {
      title: `${typeLabel} Guide | Destiny 2 Sherpa`,
    }
  }

  const name =
    data.raid_name ||
    data.dungeon_name ||
    (typeof data.name === "string" ? data.name : undefined) ||
    resolvedParams.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())

  const description =
    data.preface?.author_notes?.slice(0, 160) ||
    `Hướng dẫn chi tiết cơ chế, vai trò (roles), loot table và mẹo loadout cho ${name} (${typeLabel}) trong Destiny 2.`

  const title = `${name} — ${typeLabel} Guide | Destiny 2 Sherpa`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

export async function createActivityPage(
  params: Promise<{ slug: string }>,
  searchParams: Promise<{ enc?: string }>,
  dataLoader: (slug: string) => Promise<ActivityData | null>
) {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams

  const data = await dataLoader(resolvedParams.slug)

  if (!data) {
    notFound()
  }

  return (
    <ActivityEncounterView
      activityData={slimActivityForClient(data, resolvedSearchParams.enc)}
      activeEncounterId={resolvedSearchParams.enc}
    />
  )
}

