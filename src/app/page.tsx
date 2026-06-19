import { DestinyTimeline } from "@/components/layout/DestinyTimeline"
import { MatrixRain } from "@/components/ui/matrix-rain"

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-background w-full">
      {/* Matrix Rain Vex Network Effect */}
      <MatrixRain color="#00f3ff" opacity={0.15} speed={40} />

      {/* Main Timeline Component */}
      <div className="w-full relative z-10 flex flex-col items-center">
        <DestinyTimeline />
      </div>
    </main>
  );
}