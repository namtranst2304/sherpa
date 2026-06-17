import { notFound } from "next/navigation"
import { RAIDS_DATA } from "@/data"
import { ActivityEncounterView } from "@/components/layout/ActivityEncounterView"

interface PageProps {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return Object.keys(RAIDS_DATA).map((slug) => ({
    slug,
  }))
}

export default async function RaidOverviewPage({ params }: PageProps) {
  const resolvedParams = await params

  const raidData = RAIDS_DATA[resolvedParams.slug]

  if (!raidData) {
    notFound()
  }

  return (
    <ActivityEncounterView 
      activityData={raidData} 
      activeEncounterId="overview"
      basePath={`/raids/${resolvedParams.slug}`}
    />
  )
}