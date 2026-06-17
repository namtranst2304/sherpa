import { notFound } from "next/navigation"
import { DUNGEONS_DATA } from "@/data"
import { ActivityEncounterView } from "@/components/layout/ActivityEncounterView"

interface PageProps {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const keys = Object.keys(DUNGEONS_DATA);
  if (keys.length === 0) {
    return [{ slug: '_empty_' }]
  }
  return keys.map((slug) => ({
    slug,
  }))
}

export default async function DungeonOverviewPage({ params }: PageProps) {
  const resolvedParams = await params

  const dungeonData = DUNGEONS_DATA[resolvedParams.slug]

  if (!dungeonData) {
    notFound()
  }

  return (
    <ActivityEncounterView 
      activityData={dungeonData} 
      activeEncounterId="overview"
      basePath={`/dungeons/${resolvedParams.slug}`}
    />
  )
}
