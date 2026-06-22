import { PANTHEON_DATA } from "@/data"
import { createActivityPage } from "@/lib/page-utils"

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ enc?: string }>
}

export async function generateStaticParams() {
  return Object.keys(PANTHEON_DATA).map((slug) => ({ slug }))
}

export default async function PantheonEncounterPage({ params, searchParams }: PageProps) {
  return await createActivityPage(params, searchParams, PANTHEON_DATA)
}
