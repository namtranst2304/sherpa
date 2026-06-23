const fs = require('fs');
const path = require('path');

const RAW_MANIFEST = 'manifest.json';
const CACHE_DIR = path.join(__dirname, 'src', 'data', 'cache');
const MINI_MANIFEST = path.join(CACHE_DIR, 'mini-manifest.json');

if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

console.log("Đang đọc file manifest khổng lồ...");
const rawData = JSON.parse(fs.readFileSync(RAW_MANIFEST, 'utf8'));

console.log("Bắt đầu gọt rác...");
const filtered = {};
let count = 0;

for (const hash in rawData) {
  const item = rawData[hash];
  
  // itemType 3: Vũ khí
  // itemType 2: Giáp
  if (item.itemType === 3 || item.itemType === 2) {
    filtered[hash] = {
      name: item.displayProperties?.name,
      icon: item.displayProperties?.icon,
      itemTypeDisplayName: item.itemTypeDisplayName,
      tierTypeName: item.inventory?.tierTypeName,
      itemType: item.itemType
    };
    count++;
  }
}

fs.writeFileSync(MINI_MANIFEST, JSON.stringify(filtered));

console.log(`Đã gọt xong! Lọc được ${count} món vũ khí và giáp.`);
console.log(`Lưu thành công tại: ${MINI_MANIFEST}`);
