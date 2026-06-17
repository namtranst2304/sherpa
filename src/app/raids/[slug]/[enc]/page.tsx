import { notFound } from "next/navigation"
import { RAIDS_DATA } from "@/data"
import { ActivityEncounterView } from "@/components/layout/ActivityEncounterView"

interface PageProps {
  params: Promise<{ slug: string; enc: string }>
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const paths: { slug: string; enc: string }[] = []
  
  for (const [slug, raidData] of Object.entries(RAIDS_DATA)) {
    if (raidData.encounters) {
      for (const enc of raidData.encounters) {
        paths.push({ slug, enc: enc.id })
      }
    }
  }
  
  return paths
}

export default async function RaidEncounterPage({ params }: PageProps) {
  const resolvedParams = await params
  const raidData = RAIDS_DATA[resolvedParams.slug]

  if (!raidData) {
    notFound()
  }

  const encounter = raidData.encounters?.find(e => e.id === resolvedParams.enc)
  if (!encounter) {
    notFound()
  }

  return (
    <ActivityEncounterView 
      activityData={raidData} 
      activeEncounterId={resolvedParams.enc}
      basePath={`/raids/${resolvedParams.slug}`}
    />
  )
}
