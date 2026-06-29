import { DestinyTimeline } from "@/features/timeline/components/DestinyTimeline"
import { MatrixRain } from "@/components/common/MatrixRain"
import { TimelineDoorTransition } from "@/components/layout/TimelineDoorTransition"

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
