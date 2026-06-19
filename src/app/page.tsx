import { DestinyTimeline } from "@/components/layout/DestinyTimeline"
import { MatrixRain } from "@/components/ui/matrix-rain"

export default function Home() {
  return (
    <main className="min-h-screen relative bg-background w-full">
      {/* Matrix Rain Vex Network Effect */}
      <MatrixRain color="#00f3ff" opacity={0.08} speed={50} />

      {/* Main Timeline Component */}
      <div className="w-full relative z-10">
        <DestinyTimeline />
      </div>
    </main>
  );
}