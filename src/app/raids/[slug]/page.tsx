import { notFound } from "next/navigation"
import { RAIDS_DATA } from "@/data"
import { ActivityEncounterView } from "@/components/layout/ActivityEncounterView"

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ enc?: string }>
}

export async function generateStaticParams() {
  return Object.keys(RAIDS_DATA).map((slug) => ({
    slug,
  }))
}

export default async function RaidEncounterPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams

  const raidData = RAIDS_DATA[resolvedParams.slug]

  if (!raidData) {
    notFound()
  }

  return (
    <ActivityEncounterView 
      activityData={raidData} 
      activeEncounterId={resolvedSearchParams.enc}
    />
  )
}