import dynamic from "next/dynamic"
import { Metadata } from "next"
import { MatrixRain } from "@/components/common/MatrixRain"
import { getDestinyTimelineSummaries } from "@/data/timeline"

const DestinyTimeline = dynamic(
  () => import("@/features/timeline").then((mod) => mod.DestinyTimeline),
  {
    loading: () => (
      <div className="w-full h-[100dvh] flex items-center justify-center bg-[#050505] text-zinc-400 font-mono text-sm tracking-widest uppercase">
        Đang tải...
      </div>
    ),
  }
)

export const metadata: Metadata = {
  title: "Destiny 2 Timeline | D2 Sherpa",
  description: "Trải nghiệm dòng thời gian Destiny 2 đậm chất điện ảnh, từ Kỷ Nguyên Hoàng Kim đến Moment of Triumph.",
  openGraph: {
    title: "Destiny 2 Timeline",
    description: "Khám phá lịch sử đồ sộ của Destiny 2 qua từng kỷ nguyên.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Destiny 2 Timeline",
    description: "Khám phá lịch sử đồ sộ của Destiny 2 qua từng kỷ nguyên.",
  },
}

export default async function TimelinePage() {
  const eras = await getDestinyTimelineSummaries()

  return (
    <main className="fixed inset-0 z-40 h-[100dvh] w-full overflow-hidden bg-[#050505]">
      <MatrixRain color="#00f3ff" opacity={0.08} speed={50} />
      <div className="w-full h-full relative z-10">
        <DestinyTimeline eras={eras} />
      </div>
    </main>
  )
}
