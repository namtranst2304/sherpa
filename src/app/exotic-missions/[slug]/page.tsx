import { EXOTIC_MISSIONS_DATA } from "@/data"
import { createActivityPage } from "@/lib/page-utils"

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ enc?: string }>
}

export async function generateStaticParams() {
  return Object.keys(EXOTIC_MISSIONS_DATA).map((slug) => ({ slug }))
}

export default async function ExoticMissionPage({ params, searchParams }: PageProps) {
  return await createActivityPage(params, searchParams, EXOTIC_MISSIONS_DATA)
}
