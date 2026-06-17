import { notFound } from "next/navigation"
import { DUNGEONS_DATA } from "@/data"
import { ActivityEncounterView } from "@/components/layout/ActivityEncounterView"

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ enc?: string }>
}

export default async function DungeonEncounterPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams

  const dungeonData = DUNGEONS_DATA[resolvedParams.slug]

  if (!dungeonData) {
    notFound()
  }

  return (
    <ActivityEncounterView 
      activityData={dungeonData} 
      activeEncounterId={resolvedSearchParams.enc} 
    />
  )
}
