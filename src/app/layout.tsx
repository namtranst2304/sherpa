import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider } from "@/components/common/ThemeProvider";
import { TopNav } from "@/components/layout/TopNav";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { MusicPlayer } from "@/components/layout/MusicPlayer";
import { WelcomeScreen } from "@/features/home/components/WelcomeScreen";
import { GuideTOCProvider } from "@/hooks/use-guide-toc";

export const metadata: Metadata = {
  title: "Destiny 2 Sherpa | Guides for Dungeons & Raids",
  description: "Comprehensive guides to master Destiny 2 endgame content.",
  metadataBase: new URL("https://d2sherpa.com"),
  keywords: ["Destiny 2", "Sherpa", "Guides", "Dungeons", "Raids", "Timeline", "Lore"],
  openGraph: {
    title: "Destiny 2 Sherpa | Guides for Dungeons & Raids",
    description: "Comprehensive guides to master Destiny 2 endgame content.",
    url: "https://d2sherpa.com",
    siteName: "Destiny 2 Sherpa",
    images: [
      {
        url: "/images/destiny-loading-bg.jpg",
        width: 1920,
        height: 1080,
        alt: "Destiny 2 Sherpa",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Destiny 2 Sherpa",
    description: "Comprehensive guides to master Destiny 2 endgame content.",
    images: ["/images/destiny-loading-bg.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-background text-foreground flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <WelcomeScreen />
          <TooltipProvider>
            {/* SidebarProvider bọc toàn bộ để các trang con có thể dùng GuideSidebar */}
            <SidebarProvider defaultOpen={true}>
              <GuideTOCProvider>
                <div className="relative flex min-h-screen flex-col w-full">
                  <TopNav />
                  {/* Phần thân chính */}
                  <div className="flex-1 flex flex-col">
                    {children}
                  </div>
                  <ScrollToTop />
                  <MusicPlayer />
                </div>
              </GuideTOCProvider>
            </SidebarProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}