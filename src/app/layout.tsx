import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Destiny 2 Sherpa",
  description: "Guides for Destiny 2 Dungeons and Raids",
};

import { ThemeProvider } from "@/components/common/theme-provider";
import { TopNav } from "@/components/layout/TopNav";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <SidebarProvider defaultOpen={true}>
              <div className="relative flex min-h-screen flex-col w-full">
                <TopNav />
                <div className="flex-1 flex overflow-hidden">
                  {children}
                </div>
              </div>
            </SidebarProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
