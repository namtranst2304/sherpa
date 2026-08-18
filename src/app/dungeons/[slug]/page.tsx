import { DUNGEON_SLUGS, getDungeonData } from '@/data'
import { createActivityPage, createActivityMetadata } from '@/lib/page-utils'

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ enc?: string }>
}

export async function generateStaticParams() {
  return DUNGEON_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps) {
  return await createActivityMetadata(params, getDungeonData, 'Dungeon')
}

export default async function DungeonEncounterPage({
  params,
  searchParams,
}: PageProps) {
  return await createActivityPage(params, searchParams, getDungeonData)
}
