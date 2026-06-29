import { PANTHEON_SLUGS, getPantheonData } from "@/data"
import { createActivityPage } from "@/lib/page-utils"

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ enc?: string }>
}

export async function generateStaticParams() {
  return PANTHEON_SLUGS.map((slug) => ({ slug }))
}

export default async function PantheonEncounterPage({ params, searchParams }: PageProps) {
  return await createActivityPage(params, searchParams, getPantheonData)
}
