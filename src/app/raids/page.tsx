import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RAIDS_DATA } from "@/data";
import { ActivityData } from "@/lib/types";

export default function RaidsPage() {
  return (
    <main className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-black mb-6 text-primary uppercase tracking-widest">Raids</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(RAIDS_DATA).map(([slug, raidData]: [string, ActivityData]) => (
          <Card key={slug} className="hover:border-primary transition-colors hover:shadow-[0_0_15px_rgba(0,195,255,0.1)] bg-card border-border">
            <CardHeader>
              <CardTitle className="text-xl font-bold">{raidData.raid_name || "Unknown Raid"}</CardTitle>
              <CardDescription>{raidData.active_orbit || "Unknown Sector"}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`/raids/${slug}`}>
                <Button className="w-full">Trỏ Thẳng Vào (View Guide)</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
        {Object.keys(RAIDS_DATA).length === 0 && (
          <p className="text-muted-foreground col-span-full">Chưa có dữ liệu raid nào.</p>
        )}
      </div>
    </main>
  );
}
