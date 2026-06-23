# Destiny 2 Sherpa

A modern, high-performance Web App designed to provide comprehensive, easy-to-read, and visually stunning guides for Destiny 2 Endgame content (Raids and Dungeons).

## 📖 Hướng Dẫn Sử Dụng (Developer Manual)

Dự án này được thiết kế theo cấu trúc Feature-Sliced Design. Dưới đây là hướng dẫn để bạn có thể mở rộng dự án một cách dễ dàng:

### 1. Quản lý Data (Thêm Raid / Dungeon mới)

Toàn bộ dữ liệu nội dung, chỉ số vũ khí, cơ chế boss đều được cấu hình bằng JSON thuần:

- **Thư mục:** `/src/data/`
- **Cách làm:**
  1. Thêm một file `.json` mới (ví dụ: `new-raid.json`) học theo cấu trúc của `salvations-edge.json`.
  2. Cấu trúc JSON bao gồm: `id`, `name`, `type` (Raid/Dungeon), `bannerImage`, `overview`, `encounters` (hướng dẫn cơ chế), và `lootTable` (danh sách vũ khí/giáp).
  3. Để badge "NEW" tự động nhấp nháy cho các vũ khí mới, chỉ cần thêm tên perk vào mảng `NEW_PERKS` trong `/src/features/activity/components/WeaponCard.tsx`.

### 2. Thiết kế Giao Diện (CyberComponents)

Thay vì code Tailwind inline chằng chịt, dự án cung cấp bộ Design System với phong cách Cyberpunk/Neon:

- **Đường dẫn:** `/src/components/common/CyberComponents.tsx`
- **Cách sử dụng:** Import các components đã cấu hình sẵn `variant` (màu sắc: `cyan`, `orange`, `zinc`, v.v.):

  ```tsx
  import {
    CyberCard,
    CyberHeading,
    CyberButton,
    CyberBadge,
  } from "@/components/common/CyberComponents";

  // Thẻ chứa Neon
  <CyberCard variant="cyan" pulse={false} withCorners>
    <CyberHeading variant="default" size="lg">
      Tiêu đề chói lóa
    </CyberHeading>
    <CyberBadge variant="orange" pulse>
      NEW
    </CyberBadge>
    <CyberButton variant="cyan">Click Me</CyberButton>
  </CyberCard>;
  ```

- **Các class CVA điều hướng:** File `top-nav-variants.ts` chứa toàn bộ biến thể màu sắc để thanh menu tự động chuyển màu dựa theo meta của Raid/Dungeon.

### 3. Cấu Trúc Thư Mục Chính

- `/src/app`: Chứa các trang route (ví dụ `/raids/[id]`, `/dungeons/[id]`).
- `/src/features/activity/components`: Chứa các layout và template chuyên dụng để hiển thị hướng dẫn (GuideTemplate, OverviewLootTable).
- `/src/components/layout`: Header, Footer, Music Player, Sidebar.

---

## 🚀 Features

- **Cyberpunk / Sci-fi Aesthetics:** Beautiful UI inspired by the visual language of Destiny 2, utilizing Neon glows, dark backgrounds, and grid patterns.
- **Raid & Dungeon Walkthroughs:** Step-by-step guides with role breakdowns, map layouts, and secrets.
- **Loot Tables & Loadouts:** Detailed loot tables with live-updated data, tier lists, and recommended PvE/PvP perks (highlighting exclusive new perks).
- **Interactive UI:** Smooth animations with Framer Motion, accessible sidebars, and responsive design for both desktop and mobile.

## 🛠️ Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS + Radix UI (shadcn/ui) + class-variance-authority (cva)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Language:** TypeScript

## 📦 Getting Started

1. **Install Dependencies:**
   ```bash
   yarn install
   ```
2. **Run the Development Server:**
   ```bash
   yarn dev
   ```
3. **Open the App:** Navigate to [http://localhost:3000]
   (http://localhost:3000)

## 📜 License

This project is not affiliated with Bungie. Destiny 2 and all related media are properties of Bungie, Inc.
