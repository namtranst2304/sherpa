import dynamic from "next/dynamic";
import { Metadata } from "next";
import { MatrixRain } from "@/components/common/MatrixRain";
import { TimelineDoorTransition } from "@/components/layout/TimelineDoorTransition";

const DestinyTimeline = dynamic(
  () => import("@/features/timeline/components/DestinyTimeline").then((mod) => mod.DestinyTimeline),
  { loading: () => <div className="w-full h-[100dvh] flex items-center justify-center bg-background text-white">Đang tải Dữ liệu Kỷ nguyên...</div> }
);

export const metadata: Metadata = {
  title: "Destiny 2 Timeline | D2 Sherpa",
  description: "Trải nghiệm dòng thời gian Destiny 2 đậm chất điện ảnh, từ Kỷ Nguyên Hoàng Kim đến Hình Hài Tối Hậu.",
  openGraph: {
    title: "Destiny 2 Cinematic Timeline | D2 Sherpa",
    description: "Khám phá lịch sử đồ sộ của Destiny 2 qua từng kỷ nguyên với giao diện tương tác đặc sắc.",
    images: [
      {
        url: "/og-timeline.jpg",
        width: 1200,
        height: 630,
        alt: "Destiny 2 Timeline",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Destiny 2 Cinematic Timeline",
    description: "Khám phá lịch sử đồ sộ của Destiny 2 qua từng kỷ nguyên.",
    images: ["/og-timeline.jpg"],
  },
};

export default function TimelinePage() {
  return (
    <>
      <TimelineDoorTransition />
      <main className="fixed inset-0 z-40 h-[100dvh] w-full overflow-hidden bg-background">
        {/* Matrix Rain Vex Network Effect */}
        <MatrixRain color="#00f3ff" opacity={0.08} speed={50} />

        {/* Main Timeline Component */}
        <div className="w-full h-full relative z-10">
          <DestinyTimeline />
        </div>
      </main>
    </>
  );
}
