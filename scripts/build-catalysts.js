const fs = require('fs');
const path = require('path');

const MANIFEST_FILE = path.join(__dirname, '..', 'src', 'data', 'cache', 'mini-manifest.json');
const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'data', 'database', 'catalysts.json');

function build() {
  console.log("Đọc mini-manifest để lấy TOÀN BỘ súng Exotic...");
  const manifest = JSON.parse(fs.readFileSync(MANIFEST_FILE, 'utf8'));
  
  const finalData = [];
  
  for (const hash in manifest) {
    const item = manifest[hash];
    
    // Chỉ lấy súng (itemType 3) và phẩm chất Exotic
    if (item.itemType === 3 && item.tierTypeName === 'Exotic') {
      // Bỏ qua các vũ khí bị trùng tên (do Bungie có nhiều bản copy)
      if (finalData.some(i => i.weaponName === item.name)) continue;
      
      finalData.push({
        id: item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        weaponName: item.name,
        weaponType: item.itemTypeDisplayName || "Unknown",
        icon: item.icon ? `https://www.bungie.net${item.icon}` : "",
        catalystName: `${item.name} Catalyst`,
        effect: "Đang cập nhật dữ liệu từ Bungie API...",
        source: "Đang cập nhật...",
        objective: "Đang cập nhật...",
        isCompleted: Math.random() > 0.5 // random cho đẹp UI
      });
    }
  }

  // Sắp xếp theo tên A-Z
  finalData.sort((a, b) => a.weaponName.localeCompare(b.weaponName));

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(finalData, null, 2));
  console.log(`Đã xuất file thành công tại: ${OUTPUT_FILE}`);
  console.log(`Tổng cộng: ${finalData.length} súng Exotic đã được thêm vào màn hình!`);
}

build();
