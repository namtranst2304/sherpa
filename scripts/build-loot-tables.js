const fs = require('fs');
const path = require('path');

const MANIFEST_FILE = path.join(__dirname, '..', 'src', 'data', 'cache', 'mini-manifest.json');
const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'data', 'database', 'loot-tables.json');

// Dữ liệu cấu trúc Raid bằng tên thật của vật phẩm
const RAID_STRUCTURE = [
  {
    id: "salvations-edge",
    name: "Salvation's Edge",
    type: "Raid",
    encounters: [
      {
        order: 1,
        name: "Substratum",
        weapons: ["Non-Denouement", "Imminence"],
        armor: ["Promised Reign Helm", "Promised Reign Gauntlets"],
        exotic: null
      },
      {
        order: 5,
        name: "The Witness",
        weapons: ["Nullify", "Critical Anomaly"],
        armor: ["Promised Reign Robes"],
        exotic: "Euphony"
      }
    ]
  }
];

function build() {
  console.log("Đọc mini-manifest...");
  const manifest = JSON.parse(fs.readFileSync(MANIFEST_FILE, 'utf8'));
  
  // Tạo index theo tên để tra cứu O(1)
  const itemsByName = {};
  for (const hash in manifest) {
    const item = manifest[hash];
    if (item.name) {
      // Ưu tiên bản thường (không có chữ Adept)
      if (!itemsByName[item.name] || (!item.name.includes("(Adept)") && itemsByName[item.name].name.includes("(Adept)"))) {
        itemsByName[item.name] = item;
      }
    }
  }

  function resolveItem(name) {
    const item = itemsByName[name];
    if (!item) {
      console.warn(`[Cảnh báo] Không tìm thấy vật phẩm: ${name}`);
      return {
        name: name,
        icon: "",
        type: "Unknown",
        tier: "Unknown"
      };
    }
    
    return {
      name: item.name,
      icon: item.icon ? `https://www.bungie.net${item.icon}` : "",
      type: item.itemTypeDisplayName || "Unknown",
      tier: item.tierTypeName || "Unknown"
    };
  }

  console.log("Bắt đầu build cấu trúc Loot Tables...");
  const finalData = RAID_STRUCTURE.map(raid => {
    return {
      ...raid,
      encounters: raid.encounters.map(enc => {
        return {
          ...enc,
          weapons: enc.weapons.map(resolveItem),
          armor: enc.armor.map(resolveItem),
          exotic: enc.exotic ? resolveItem(enc.exotic) : null
        };
      })
    };
  });

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(finalData, null, 2));
  console.log(`Đã xuất file thành công tại: ${OUTPUT_FILE}`);
}

build();
