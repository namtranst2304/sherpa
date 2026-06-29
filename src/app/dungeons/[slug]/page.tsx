import { DUNGEON_SLUGS, getDungeonData } from "@/data"
import { createActivityPage } from "@/lib/page-utils"

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ enc?: string }>
}

export async function generateStaticParams() {
  return DUNGEON_SLUGS.map((slug) => ({ slug }))
}

export default async function DungeonEncounterPage({ params, searchParams }: PageProps) {
  return await createActivityPage(params, searchParams, getDungeonData)
}
