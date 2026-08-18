import dynamic from 'next/dynamic'
import { Metadata } from 'next'
import { MatrixRainGate } from '@/components/common/MatrixRainGate'
import { getDestinyTimelineSummaries } from '@/data/timeline'

const DestinyTimeline = dynamic(
  () => import('@/features/timeline').then((mod) => mod.DestinyTimeline),
  {
    loading: () => (
      <div className="flex h-[100dvh] w-full items-center justify-center bg-[#050505] font-mono text-sm tracking-widest text-zinc-400 uppercase">
        Đang tải...
      </div>
    ),
  },
)

export const metadata: Metadata = {
  title: 'Destiny 2 Timeline | D2 Sherpa',
  description:
    'Trải nghiệm dòng thời gian Destiny 2 đậm chất điện ảnh, từ Kỷ Nguyên Hoàng Kim đến Moment of Triumph.',
  openGraph: {
    title: 'Destiny 2 Timeline',
    description: 'Khám phá lịch sử đồ sộ của Destiny 2 qua từng kỷ nguyên.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Destiny 2 Timeline',
    description: 'Khám phá lịch sử đồ sộ của Destiny 2 qua từng kỷ nguyên.',
  },
}

export default async function TimelinePage() {
  const eras = await getDestinyTimelineSummaries()

  return (
    <main className="fixed inset-0 z-40 h-[100dvh] w-full overflow-hidden bg-[#050505]">
      <MatrixRainGate color="#00f3ff" opacity={0.08} speed={50} />
      <div className="relative z-10 h-full w-full">
        <DestinyTimeline eras={eras} />
      </div>
    </main>
  )
}
