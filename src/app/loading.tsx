import { LoadingScreen } from "@/components/layout/LoadingScreen";

export default function Loading() {
  // Next.js App Router sẽ tự động hiển thị component này khi các component con (như page.tsx) đang load dữ liệu (async/await)
  return <LoadingScreen />;
}
