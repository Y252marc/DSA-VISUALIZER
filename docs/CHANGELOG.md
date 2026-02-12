# CHANGELOG.md — DSA Visualizer Platform

## [0.1.0] — 2026-02-12 — Project Genesis

### Added
- Initialized Next.js 16 project with TypeScript, Tailwind CSS v4, App Router
- Installed core dependencies: `framer-motion`, `lucide-react`
- Created project configuration: `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`
- Created `app/globals.css` with industrial dark design system tokens
- Created `app/layout.tsx` with JetBrains Mono font integration
- Created `docs/ARCHITECTURE.md` documenting the Registry Pattern
- Created `docs/CHANGELOG.md` (this file)
- Created `lib/registry.ts` — 85 algorithm entries across 11 categories with helper functions
- Created `components/Sidebar.tsx` — searchable, collapsible category navigation with status badges
- Created `components/MainLayout.tsx` — shell layout (sidebar + content area)
- Created `app/page.tsx` — dashboard with stats grid, registry index table, active visualizer cards
- Created `components/BlueprintSpec.tsx` — technical datasheet for blueprint-status algorithms
- Created `components/InteractiveWorkspace.tsx` — engine container that routes to visualizer by algorithm ID
- Created `app/visualizer/[slug]/page.tsx` — dynamic route dispatching active vs. blueprint rendering
- Created `components/visualizers/ArrayEngine.tsx` — interactive Bubble Sort visualizer with generator-based stepping, Framer Motion animations, play/pause/step/reset/randomize controls, speed presets, and size slider
- Refactored `components/Sidebar.tsx` and `components/MainLayout.tsx` to use Flexbox layout, resolving content overlap issues
- Fixed hydration mismatch in `components/visualizers/ArrayEngine.tsx` by using deterministic initial state
- **Phase 1.1: UX Polish & Features**
  - **Visual Separation**: Implemented distinct zones (`bg-slate-950` Sidebar, `bg-slate-900` Canvas) with `border-slate-800` for better contrast
  - **Code Panel**: Added `components/CodePanel.tsx` with syntax highlighting (pink/blue) and active line tracking
  - **Bar Labels**: Added labels on top of bars in `ArrayEngine.tsx` (bold, white/80, auto-hide > 40 items)
  - **Layout**: Updated `ArrayEngine.tsx` to use a 50/50 split grid for Code and Description panels
- **Phase 1.5: UI/UX Refinement**
  - **Sidebar**: Implemented Accordion logic (sorting open by default), indentation for hierarchy, and distinct visual separation
  - **Legend**: Relocated color key to a floating pill inside the canvas for better visibility
  - **Visuals**: Enforced "Hard Cut" separation between navigation and workspace with `bg-slate-950` and border styling
- **Phase 2: UI/UX Polish & Mobile Responsiveness**
  - **Layout Overhaul**: Implemented "Floating Islands" design with global `bg-black`, `p-6` padding, and `rounded-xl` panels
  - **Mobile Support**: Added responsive Sidebar Drawer with Hamburger Menu for screens < 768px
  - **Sidebar Refinements**: Increased width to `w-72`, added deep indentation (`pl-10`), and active state styling
  - **Feature**: Added "Copy Code" button to `CodePanel` with clipboard integration
  - **Bug Fixes**: Implemented smart label visibility (hiding labels on short bars) and fixed z-index clipping
- **Phase 3: "Industrial" Aesthetic Overhaul**
  - **Sharp Edges**: Removed all `rounded-xl` in favor of `rounded-none` or `rounded-sm` for a precision look.
  - **Tighter Spacing**: Reduced global padding (`p-2`) and layout gap (`gap-1`) to maximize screen real estate.
  - **Visualizer Fixes**:
    -   **Height**: Fixed bar overflow logic (clamped to 90% of `h-[60vh]` container).
    -   **Labels**: Forced `z-index: 50` and `whitespace-nowrap` to prevent missing labels on top of bars.
    -   **Colors**: Updated palette to "Terminal Blue" (`bg-blue-600`) and "Active Neon" (`bg-yellow-400`).

