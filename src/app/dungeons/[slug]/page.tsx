import { DUNGEONS_DATA } from "@/data"
import { createActivityPage } from "@/lib/page-utils"

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ enc?: string }>
}

export async function generateStaticParams() {
  return Object.keys(DUNGEONS_DATA).map((slug) => ({ slug }))
}

export default async function DungeonEncounterPage({ params, searchParams }: PageProps) {
  return await createActivityPage(params, searchParams, DUNGEONS_DATA)
}
