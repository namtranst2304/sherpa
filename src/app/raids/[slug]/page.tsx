import { GuideSidebar, SidebarGroup } from "@/components/layout/GuideSidebar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function RaidPage({ params }: { params: { slug: string } }) {
  // Normally, we'd fetch data based on params.slug. 
  // For now, we mock "The Desert Perpetual".

  const sidebarGroups: SidebarGroup[] = [
    {
      items: [
        { id: "preface", title: "I. Preface (Lời mở đầu)", label: "INFO" },
        { id: "loadouts", title: "II. Loadout Tips (Trang bị)", label: "META" },
      ],
    },
    {
      title: "Encounters (Từng Ải)",
      items: [
        { id: "enc1", title: "1. Living Rhythm (Wyvern)" },
        { id: "enc2", title: "2. Inverse Function (Hobgoblin)" },
        { id: "enc3", title: "3. Clear Sight (Hydra)" },
        { id: "enc4", title: "4. The End Times (Harpy)", label: "FINAL", isFinal: true },
      ],
    },
  ];

  return (
    <>
      <GuideSidebar
        title="THE DESERT"
        subtitle="PERPETUAL RAID"
        orbit="Kepler Sector"
        groups={sidebarGroups}
      />
      <main className="flex-1 w-full overflow-y-auto">
        <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-16 pb-32">
        
        {/* SECTION I: PREFACE */}
        <section id="preface" className="scroll-mt-20">
          <header className="mb-6 border-b border-border pb-4">
            <span className="text-xs bg-primary/20 text-primary font-extrabold px-2 py-0.5 rounded uppercase font-mono">
              System Core
            </span>
            <h2 className="text-3xl font-black text-foreground mt-2">Preface (Lời Mở Đầu)</h2>
            <p className="text-muted-foreground text-sm font-medium mt-1">
              Cơ chế chọn màn lượng tử không tuyến tính (Non-linear Hub) của toàn bộ Raid "The Desert Perpetual".
            </p>
          </header>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg text-primary flex items-center gap-2">
                🎛️ Cơ Chế Vận Hành Tại Hub
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-foreground/80 leading-relaxed font-medium">
              <p>
                Dựa trên tài liệu <strong>"The Desert Perpetual Raid Guide.docx"</strong>, bạn có thể chọn đi bất kỳ Encounter A, B, C nào trước bằng cách đi lên thang máy bên trái khu vực xuất phát và tương tác với các bệ đứng (plates) tương ứng:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2 text-xs font-mono">
                <div className="p-3 bg-muted/50 border border-border rounded-lg">
                  <span className="text-primary font-extrabold">"Axiom is axiom"</span>
                  <p className="text-[10px] text-muted-foreground mt-1">Encounter A: Living Rhythm (Wyvern)</p>
                </div>
                <div className="p-3 bg-muted/50 border border-border rounded-lg">
                  <span className="text-primary font-extrabold">"Interference patterns swell"</span>
                  <p className="text-[10px] text-muted-foreground mt-1">Encounter B: Inverse Function (Hobgoblin)</p>
                </div>
                <div className="p-3 bg-muted/50 border border-border rounded-lg">
                  <span className="text-primary font-extrabold">"All are entangled"</span>
                  <p className="text-[10px] text-muted-foreground mt-1">Encounter C: Clear Sight (Hydra)</p>
                </div>
                <div className="p-3 bg-muted/50 border border-border rounded-lg">
                  <span className="text-destructive font-extrabold">"Dust drifts eternal"</span>
                  <p className="text-[10px] text-muted-foreground mt-1">Final Encounter: The End Times (Harpy)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg text-xs leading-relaxed text-foreground/80">
            <strong>💡 Mẹo đọc tài liệu:</strong> Toàn bộ các cơ chế buff thời gian quan trọng sẽ được tô màu sắc rõ rệt để bạn dễ nhận diện trong suốt quá trình đi Raid. Vị trí phân chia vai trò (roles) được tính toán tối ưu, nhưng bạn vẫn nên chủ động phối hợp để chia lại theo thế mạnh của từng thành viên trong Fireteam.
          </div>
        </section>

        {/* SECTION II: LOADOUT TIPS */}
        <section id="loadouts" className="scroll-mt-20">
          <header className="mb-6 border-b border-border pb-4">
            <span className="text-xs bg-primary/20 text-primary font-extrabold px-2 py-0.5 rounded uppercase font-mono">
              Arsenal Meta
            </span>
            <h2 className="text-3xl font-black text-foreground mt-2">Loadout Tips (Trang Bị Khuyên Dùng)</h2>
            <p className="text-muted-foreground text-sm font-medium mt-1">
              Cách tối ưu hóa class và vũ khí dựa trên dữ liệu Meta thực tế từ tài liệu "The Desert Perpetual Raid Guide.docx".
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="border-b border-border pb-2 mb-4">
                <CardTitle className="text-lg flex items-center gap-2">🧙 Warlocks Build</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs leading-relaxed font-medium text-foreground/80">
                <p><strong>Well of Radiance:</strong> Kỹ năng hỗ trợ bắt buộc cung cấp khả năng hồi máu mạnh mẽ (Restoration) và tăng sát thương (Radiance) cho toàn đội.</p>
                <p><strong>Song of Flame:</strong> Cực kỳ tốt để dốc sát thương cho ải Wyvern (Encounter A). Người caster nhận được 90% kháng sát thương để facetank boss giữ cự ly dồn dame.</p>
                <p className="pt-2 border-t border-border mt-4 text-[11px]"><strong>Exotics:</strong> <em>Starfire Protocol</em>, <em>Speaker's Sight</em></p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="border-b border-border pb-2 mb-4">
                <CardTitle className="text-lg flex items-center gap-2 text-blue-500">🛡️ Titans Build</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs leading-relaxed font-medium text-foreground/80">
                <p><strong>Thundercrash:</strong> Sự lựa chọn sát thương duy nhất mà tất cả Titans nên chạy. Gây lượng dam dứt điểm khổng lồ do hầu như mọi con boss trong Raid này đều áp sát tầm gần.</p>
                <p className="pt-2 border-t border-border mt-4 text-[11px]"><strong>Exotics:</strong> <em>Cuirass of the Falling Star</em>, <em>Insurmountable Skullfort</em></p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="border-b border-border pb-2 mb-4">
                <CardTitle className="text-lg flex items-center gap-2 text-green-500">🏹 Hunters Build</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs leading-relaxed font-medium text-foreground/80">
                <p><strong>Shadowshot: Mobius Quiver:</strong> Tạo Tether bẫy tím khống chế làm yếu (Weaken) boss liên tục để tăng sát thương đầu ra của cả Fireteam.</p>
                <p><strong>Golden Gun: Marksman:</strong> Burst sát thương điểm yếu cực mạnh.</p>
                <p className="pt-2 border-t border-border mt-4 text-[11px]"><strong>Exotics:</strong> <em>Star-Eater Scales</em>, <em>Celestial Nighthawk</em></p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ENCOUNTER A */}
        <section id="enc1" className="scroll-mt-20">
          <header className="mb-6 border-b border-border pb-4">
            <span className="text-xs bg-primary/20 text-primary font-extrabold px-2 py-0.5 rounded uppercase font-mono">
              Encounter A
            </span>
            <h2 className="text-3xl font-black text-foreground mt-2">1. Living Rhythm (Wyvern Iatros)</h2>
            <p className="text-muted-foreground text-sm font-medium mt-1">
              Boss Wyvern. Phối hợp căn nhịp nhảy phá vex boxes xây bục đá sạc đầy Hourglass.
            </p>
          </header>

          <Card className="mb-6 border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="text-base font-bold">⚙️ Lược đồ chiến thuật và cơ chế chung</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-foreground/80 leading-relaxed space-y-3 font-medium">
              <p><strong>Mục tiêu:</strong> Dunk hạt Chronon vào vòng Hourglass để sạc đầy thời gian, đồng thời nhịp nhàng bắn nổ hộp vex để dựng thang đưa Runner lên kích hoạt DPS.</p>
              <p><strong>Phase 1: Fill the Hourglass</strong> - Walk down từ bệ spawn để kích hoạt. 6 con Minotaurs xuất hiện, hạ gục chúng để nhặt hạt Chronon.</p>
              <p><strong>Phase 2: Build Platforms</strong> - Buff Diastole xuất hiện đếm ngược 4 khối. Đến nhịp thứ 4, cả 3 Shooters phải bắn nổ đồng loạt các hộp vex ở tầng tương ứng để dựng bệ đứng.</p>
            </CardContent>
          </Card>
        </section>

        {/* ENCOUNTER B */}
        <section id="enc2" className="scroll-mt-20">
          <header className="mb-6 border-b border-border pb-4">
            <span className="text-xs bg-primary/20 text-primary font-extrabold px-2 py-0.5 rounded uppercase font-mono">
              Encounter B
            </span>
            <h2 className="text-3xl font-black text-foreground mt-2">2. Inverse Function (Hobgoblin)</h2>
          </header>
          <p className="text-muted-foreground italic">Content coming soon...</p>
        </section>

        {/* ENCOUNTER C */}
        <section id="enc3" className="scroll-mt-20">
          <header className="mb-6 border-b border-border pb-4">
            <span className="text-xs bg-primary/20 text-primary font-extrabold px-2 py-0.5 rounded uppercase font-mono">
              Encounter C
            </span>
            <h2 className="text-3xl font-black text-foreground mt-2">3. Clear Sight (Hydra)</h2>
          </header>
          <p className="text-muted-foreground italic">Content coming soon...</p>
        </section>

        {/* ENCOUNTER D */}
        <section id="enc4" className="scroll-mt-20">
          <header className="mb-6 border-b border-border pb-4">
            <span className="text-xs bg-destructive/20 text-destructive font-extrabold px-2 py-0.5 rounded uppercase font-mono">
              Final Encounter
            </span>
            <h2 className="text-3xl font-black text-foreground mt-2">4. The End Times (Harpy)</h2>
          </header>
          <p className="text-muted-foreground italic">Content coming soon...</p>
        </section>

        </div>
      </main>
    </>
  );
}
