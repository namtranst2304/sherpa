import { RAID_SLUGS, getRaidData } from '@/data'
import { createActivityPage, createActivityMetadata } from '@/lib/page-utils'

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ enc?: string }>
}

export async function generateStaticParams() {
  return RAID_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps) {
  return await createActivityMetadata(params, getRaidData, 'Raid')
}

export default async function RaidEncounterPage({
  params,
  searchParams,
}: PageProps) {
  return await createActivityPage(params, searchParams, getRaidData)
}
