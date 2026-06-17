import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DungeonsPage() {
  return (
    <main className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-black mb-6 text-primary">Dungeons</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder for Dungeons */}
        <Card className="hover:border-primary transition-colors">
          <CardHeader>
            <CardTitle>Warlord's Ruin</CardTitle>
            <CardDescription>Scorn Dungeon • EDZ</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dungeons/warlords-ruin">
              <Button className="w-full" disabled>Coming Soon</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
