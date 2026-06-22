import { RAIDS_DATA } from "@/data"
import { createActivityPage } from "@/lib/page-utils"

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ enc?: string }>
}

export async function generateStaticParams() {
  return Object.keys(RAIDS_DATA).map((slug) => ({ slug }))
}

export default async function RaidEncounterPage({ params, searchParams }: PageProps) {
  return await createActivityPage(params, searchParams, RAIDS_DATA)
}