const fs = require('fs');
const path = require('path');

const MANIFEST_FILE = path.join(__dirname, '..', 'src', 'data', 'cache', 'mini-manifest.json');
const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'data', 'database', 'armor-sets.json');

function getSlot(displayName) {
  if (!displayName) return "Unknown";
  if (displayName.includes("Helmet") || displayName.includes("Mask") || displayName.includes("Cowl") || displayName.includes("Hood") || displayName.includes("Casque")) return "Helmet";
  if (displayName.includes("Gauntlets") || displayName.includes("Grips") || displayName.includes("Gloves")) return "Gauntlets";
  if (displayName.includes("Chest") || displayName.includes("Vest") || displayName.includes("Robes") || displayName.includes("Plate") || displayName.includes("Cuirass")) return "Chest";
  if (displayName.includes("Leg") || displayName.includes("Boots") || displayName.includes("Strides") || displayName.includes("Greaves")) return "Legs";
  if (displayName.includes("Cloak") || displayName.includes("Mark") || displayName.includes("Bond")) return "Class Item";
  return displayName;
}

function getClass(displayName) {
  if (!displayName) return "Unknown";
  if (displayName.includes("Hunter")) return "Hunter";
  if (displayName.includes("Titan")) return "Titan";
  if (displayName.includes("Warlock")) return "Warlock";
  return "Any"; // Sẽ suy luận sau dựa trên Class Item của set
}

function build() {
  console.log("Đọc mini-manifest để lấy TOÀN BỘ Armor Sets...");
  const manifest = JSON.parse(fs.readFileSync(MANIFEST_FILE, 'utf8'));
  
  const sets = {};

  for (const hash in manifest) {
    const item = manifest[hash];
    
    // Chỉ lấy Giáp (itemType 2) và Legendary
    if (item.itemType === 2 && item.tierTypeName === 'Legendary') {
      const name = item.name;
      if (!name) continue;
      
      // Mẹo: Cắt từ cuối cùng đi để lấy Tên Set (VD: "First Ascent Casque" -> "First Ascent")
      const words = name.split(' ');
      if (words.length < 2) continue;
      const setName = words.slice(0, words.length - 1).join(' ');
      
      if (!sets[setName]) {
        sets[setName] = { pieces: [] };
      }
      
      // Bỏ qua trùng lặp
      if (!sets[setName].pieces.some(p => p.name === name)) {
        sets[setName].pieces.push({
          slot: getSlot(item.itemTypeDisplayName),
          rawType: item.itemTypeDisplayName,
          name: item.name,
          icon: item.icon ? `https://www.bungie.net${item.icon}` : "",
          tier: item.tierTypeName
        });
      }
    }
  }

  const finalData = [];
  
  // Lọc ra các Set hợp lệ (có đủ 5 món)
  for (const setName in sets) {
    const pieces = sets[setName].pieces;
    
    // Đôi khi 1 set name có chung cho cả 3 class (15 mảnh). Cần chia nhỏ theo Class.
    const classPieces = { Hunter: [], Titan: [], Warlock: [] };
    
    pieces.forEach(p => {
      // Suy luận class dựa trên loại giáp
      let cls = getClass(p.rawType);
      if (cls === "Any") {
        // Nếu không có tên class trực tiếp, ta sẽ phải đoán. 
        // Nhưng tạm thời ta đẩy vào cả 3 mảng, tí nữa class nào đủ 5 món thì là của class đó.
        classPieces.Hunter.push(p);
        classPieces.Titan.push(p);
        classPieces.Warlock.push(p);
      } else {
        classPieces[cls].push(p);
      }
    });
    
    for (const cls of ["Hunter", "Titan", "Warlock"]) {
      // Lọc trùng lặp Slot trong cùng 1 class (chỉ lấy 5 slot khác nhau)
      const uniqueSlots = {};
      classPieces[cls].forEach(p => {
        if (!uniqueSlots[p.slot]) uniqueSlots[p.slot] = p;
      });
      
      const finalPieces = Object.values(uniqueSlots);
      
      // Nếu đủ 5 món khác nhau (Helm, Gauntlets, Chest, Legs, Class Item)
      if (finalPieces.length === 5) {
        // Sắp xếp lại thứ tự cho chuẩn: Helm -> Gauntlets -> Chest -> Legs -> Class Item
        const order = ["Helmet", "Gauntlets", "Chest", "Legs", "Class Item"];
        finalPieces.sort((a, b) => order.indexOf(a.slot) - order.indexOf(b.slot));
        
        finalData.push({
          id: `${setName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${cls.toLowerCase()}`,
          setName: `${setName} Suit`,
          class: cls,
          source: "World Drop / Activity",
          pieces: finalPieces.map(p => ({
            slot: p.slot,
            name: p.name,
            icon: p.icon,
            tier: p.tier
          })),
          setBonus: {
            "origin_trait": "Đang cập nhật...",
            "rep_bonus": "Đang cập nhật..."
          }
        });
      }
    }
  }

  // Sắp xếp theo tên
  finalData.sort((a, b) => a.setName.localeCompare(b.setName));

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(finalData, null, 2));
  console.log(`Đã xuất file thành công tại: ${OUTPUT_FILE}`);
  console.log(`Tổng cộng: ${finalData.length} bộ Giáp (Armor Sets) hoàn chỉnh đã được quét!`);
}

build();
