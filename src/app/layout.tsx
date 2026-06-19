import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider } from "@/components/common/theme-provider";
import { TopNav } from "@/components/layout/TopNav";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollToTop } from "@/components/layout/ScrollToTop";

export const metadata: Metadata = {
  title: "Destiny 2 Sherpa | Guides for Dungeons & Raids",
  description: "Comprehensive guides to master Destiny 2 endgame content.",
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
          <TooltipProvider>
            {/* SidebarProvider bọc toàn bộ để các trang con có thể dùng GuideSidebar */}
            <SidebarProvider defaultOpen={true}>
              <div className="relative flex min-h-screen flex-col w-full">
                <TopNav />
                {/* Phần thân chính */}
                <div className="flex-1 flex overflow-hidden">
                  {children}
                </div>
                <ScrollToTop />
              </div>
            </SidebarProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}