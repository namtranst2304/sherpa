import { DestinyTimeline } from "@/features/timeline/components/DestinyTimeline"
import { MatrixRain } from "@/components/common/MatrixRain"
import { TimelineDoorTransition } from "@/components/layout/TimelineDoorTransition"

export default function TimelinePage() {
  return (
    <>
      <TimelineDoorTransition />
      <main className="min-h-screen relative bg-background w-full">
        {/* Matrix Rain Vex Network Effect */}
        <MatrixRain color="#00f3ff" opacity={0.08} speed={50} />

        {/* Main Timeline Component */}
        <div className="w-full relative z-10">
          <DestinyTimeline />
        </div>
      </main>
    </>
  );
}
