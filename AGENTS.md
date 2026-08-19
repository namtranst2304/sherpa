<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Destiny 2 Sherpa — Agent & Developer Guidelines

## 1. Absolute Core Principles
- **STRICT TYPE SAFETY**: **NEVER USE `any` FOR TYPESAFETY**. Always use strongly typed interfaces, Generics, unions, or `unknown` with type narrowing.
- **Closed-Loop Verification**: Self-test and verify features (run `yarn check` / `yarn typecheck` / `yarn lint` / test server requests) before finishing. Do not rely on the user to provide error logs or debug basic regressions.
- **Maintain Aesthetics & Visual Polish**: Adhere strictly to the Destiny 2 Cyberpunk / Sci-fi neon visual design system. Never build plain, generic, or unstyled UI.
- **DRY & Clean Code (No God Components)**: Constantly refactor and break down large files (>200 lines) into smaller, reusable UI blocks. Prevent HTML/Tailwind duplication by extracting reusable internal components or moving them to `CyberComponents`.
- **Responsive Layout Integrity**: Ensure UI components don't clip text on mobile (use `break-words`). Always add adequate bottom padding (e.g., `pb-24`) to scrolling containers so content isn't hidden behind floating mobile navigation.

---

## 2. Project Architecture & Directory Structure
This repository uses a Feature-Sliced / Modular architecture:

```
src/
├── app/              # Next.js App Router routes & API endpoints
│   ├── api/tts/      # Edge Text-to-Speech endpoint (Cloudflare + Node compatible)
│   ├── database/     # Database pages (Exotic Weapons, Exotic Armor, Armor Sets)
│   ├── dungeons/     # Dungeon guide routes [id]
│   ├── exotic-missions/ # Exotic Mission guide routes [id]
│   ├── pantheon/     # Pantheon gauntlet guide routes [id]
│   ├── raids/        # Raid guide routes [id]
│   └── timeline/     # Interactive fullscreen story timeline
├── components/
│   ├── common/       # CyberComponents (CyberCard, CyberBadge, CyberButton, CyberHeading, etc.)
│   ├── layout/       # TopNav, MobileNav, MusicPlayer, ScrollToTop, Gates
│   └── ui/           # Radix UI primitives
├── config/           # App-wide constants & navigation metadata (DESTINY_ACTIVITIES)
├── data/             # Pure JSON data files + Dynamic Loaders (src/data/index.ts)
├── features/         # Feature-specific logic & UI templates
│   ├── activity/     # GuideShell, GuideTemplate, EncounterView, LootTable, WeaponCard
│   ├── database/     # ExoticWeaponsView, ExoticArmorView, ArmorSetsView, Filters
│   ├── home/         # LandingPage, WelcomeScreen, Hero transitions
│   └── timeline/     # DestinyTimeline, EraCinematicScene, EraNav
├── hooks/            # Custom hooks (useScrollSpy, useSmoothScroll)
├── lib/              # Utilities (cn, bungieUrl, audio, theme)
└── types/            # Shared TypeScript type definitions
```

---

## 3. Data Loading & Performance Guidelines
1. **Dynamic Import for Heavy JSON**:
   - All activity JSON files in `/src/data/` (Raids, Dungeons, Database) **MUST** be loaded dynamically on demand via `src/data/index.ts` functions (`getRaidData()`, `getDungeonData()`, etc.).
   - **DO NOT** statically import raw JSON at the top of shared client files or route modules to prevent bundle bloat (>550KB).
2. **Lean Payloads**:
   - Use `getLeanExoticWeaponsData()` / `getLeanExoticArmorData()` for catalog / grid views. Load heavy perk pools and full catalyst graphs only when necessary.

---

## 4. UI / UX Design System Conventions
1. **Cyber Design System**:
   - Always prioritize importing from `@/components/common/CyberComponents`:
     - `<CyberCard variant="..." withCorners pulse={false}>`
     - `<CyberBadge variant="..." size="..." pulse>`
     - `<CyberButton variant="..." size="..." glow>`
     - `<CyberHeading variant="..." size="...">`
     - `<CyberSectionHeader icon={...} title="..." variant="...">`
   - Color palette variants: `cyan`, `green`, `orange`, `yellow`, `red`, `zinc`, `exotic`.
2. **Mobile Ergonomics & Accessibility**:
   - The floating mobile menu button (`MobileNav`) sits at `fixed top-2 left-4 z-[70] md:hidden`.
   - Headers and sticky sub-navigation on mobile **MUST** reserve left padding (`pl-14`) so content is never covered by the mobile menu button.
   - All interactive touch targets on mobile MUST satisfy `min-h-11` (44px min height).
3. **Layout & Z-Index Layering**:
   - `TopNav`: `sticky top-0 z-[60]` (Desktop), `absolute` on `/` and `/timeline`.
   - `MobileNav`: `z-[70]` (trigger) and `z-[100]` (popover content).
   - `MusicPlayer`: `bottom-4 left-4 md:bottom-8 md:left-8 z-50`.
   - `ScrollToTop`: `bottom-8 right-8 z-50` (Disabled on `/timeline` via `ScrollToTopGate`).
   - `DoorOverlay` & transition curtains: `z-[9999]`.

---

## 5. Cloudflare & Edge Compatibility
- The app targets Cloudflare Workers via `@opennextjs/cloudflare` + `wrangler`.
- When creating or modifying backend APIs (`src/app/api/*`), ensure compatibility with both:
  - **Cloudflare Edge Runtime**: `WebSocketPair`, Web Standards `fetch`, Web Crypto.
  - **Local Node.js Runtime**: fallback libraries (e.g., `ws`, Node `crypto`).

---

## 6. Development & Quality Check Workflow
Run the following verification commands before concluding any task:
- `yarn typecheck` : Verify TypeScript types with 0 errors.
- `yarn lint` : Verify ESLint rules with 0 errors/warnings.
- `yarn check` : Run `lint:fix` and `typecheck` in a single command.
