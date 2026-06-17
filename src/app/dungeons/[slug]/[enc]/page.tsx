import { notFound } from "next/navigation"
import { DUNGEONS_DATA } from "@/data"
import { ActivityEncounterView } from "@/components/layout/ActivityEncounterView"

interface PageProps {
  params: Promise<{ slug: string; enc: string }>
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const paths: { slug: string; enc: string }[] = []
  
  for (const [slug, dungeonData] of Object.entries(DUNGEONS_DATA)) {
    if (dungeonData.encounters) {
      for (const enc of dungeonData.encounters) {
        paths.push({ slug, enc: enc.id })
      }
    }
  }
  
  if (paths.length === 0) {
    return [{ slug: '_empty_', enc: '_empty_' }]
  }
  
  return paths
}

export default async function DungeonEncounterPage({ params }: PageProps) {
  const resolvedParams = await params
  const dungeonData = DUNGEONS_DATA[resolvedParams.slug]

  if (!dungeonData) {
    notFound()
  }

  const encounter = dungeonData.encounters?.find(e => e.id === resolvedParams.enc)
  if (!encounter) {
    notFound()
  }

  return (
    <ActivityEncounterView 
      activityData={dungeonData} 
      activeEncounterId={resolvedParams.enc}
      basePath={`/dungeons/${resolvedParams.slug}`}
    />
  )
}
