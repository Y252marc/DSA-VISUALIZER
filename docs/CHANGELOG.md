# CHANGELOG.md — DSA Visualizer Platform

## [0.6.1] — 2026-02-13 — Sidebar Auto-Open & Editable Search Target

### Fixed
- **Sidebar.tsx**: Category folder now auto-opens when the user navigates to a page inside it — `openCategories` initializes by matching `pathname` against `REGISTRY` to find the active algorithm's category
- **Footer Removed**: Deleted the footer entirely as requested
- **Layout Spacing**: Added `pt-16` (64px) top padding to content for 1.5cm header gap, and an `h-32` (128px) bottom spacer for 3cm scroll buffer
- **Header Spacing**: Added `h-14` (56px ~ 1.5cm) physical spacer div above the header to guarantee top gap, reverting padding to standard `p-8`
- **Side Margins**: Added `px-4` (16px ~ 4mm) to the main container to create consistent side gaps
- **Dashboard Layout**: Applied the same `h-14` top spacer and `px-4` side margins to the main dashboard (`app/page.tsx`) for consistency

### Changed
- **SearchEngine.tsx**: Target display replaced with an editable `input[type=number]` — dark bg, blue border, focus glow styling; typing a new number re-initializes the generator to search for it
- **SearchEngine.tsx**: Added "Randomize Target" button (`Dices` icon) next to the input — picks a random value from the current array

## [0.6.0] — 2026-02-13 — Searching Module (Linear & Binary Search)

### Added
- **New Category**: Searching — first two algorithms activated
- **Linear Search** (`core/algorithms/searching/linear-search/`): Sequential scan generator yielding `scan`, `found`, `not-found` steps; textbook-grade theory with definition, steps, complexity analysis, pros/cons, and Python code
- **Binary Search** (`core/algorithms/searching/binary-search/`): Divide-and-conquer generator with auto-sort, yielding `range`, `mid`, `found`, `not-found` steps; full theory file
- **SearchStep Type** (`core/types.ts`): New interface with `type`, `index`, `rangeStart`, `rangeEnd`, `target` fields
- **SearchEngine** (`components/visualizers/SearchEngine.tsx`): Block/card-style visualizer (not bars) with:
  - Target display banner at the top
  - Yellow highlight for scanning (Linear Search)
  - Purple highlight for mid-point (Binary Search)
  - Green highlight + glow for found
  - Red tint for not-found
  - Opacity dimming (`opacity-30`) for out-of-range indices (Binary Search)
  - Full playback controls (Play/Pause/Step/Reset/Randomize/Speed/Size)
  - `onStepChange` callback for code panel sync

### Changed
- **registry.ts**: Added `SearchEngine` to `visualizer` union type; imported `LinearSearchManifest` and `BinarySearchManifest`; replaced blueprint entries with active manifests
- **InteractiveWorkspace.tsx**: Added `SearchEngine` to engine map; added search algorithm logic/code to `ALGO_LOGIC_MAP`

## [0.5.0] — 2026-02-13 — Code Sync & Professional Footer

### Added
- **Footer**: Professional `<footer>` with copyright ("© 2026 Devnullx Technology"), GitHub & LinkedIn links (Lucide icons), version badge, and tech stack tagline
- **Code Panel Line Sync**: Engine → Parent callback (`onStepChange`) passes `codeLine` from each algorithm step to `CodePanel`, which highlights the active line in real-time as the visualizer runs

### Changed
- **ArrayEngine**: Added `onStepChange?: (codeLine: number | null) => void` prop; fires on every generator step
- **TreeSortEngine**: Added matching `onStepChange` prop with identical behavior
- **InteractiveWorkspace.tsx**: Tracks `activeLine` state via `handleStepChange` callback; passes synced `activeLine` to `CodePanel`; added `min-h-screen flex flex-col` for footer pinning

## [0.4.0] — 2026-02-13 — Split-View Layout (Code Panel Sidebar)

### Changed
- **InteractiveWorkspace.tsx**: Refactored to split-view grid layout — Visualizer (left) + Code Panel (right, 450px) side-by-side on desktop (`lg:grid-cols-[1fr_450px]`), stacked vertically on mobile
- Complexity stats badge hidden on small screens (`hidden sm:flex`)
- Theory section remains below the grid as a scrollable article

## [0.3.1] — 2026-02-13 — Parent-Controlled Centering & Textbook Content

### Fixed
- **Layout Centering**: Moved `max-w-5xl mx-auto` centering from `TheorySection` to parent wrapper in `InteractiveWorkspace.tsx` — architecture now follows "parent controls layout" principle
- **TheorySection.tsx**: Converted from self-centering `<section>` to a plain `<div>` that fills whatever container wraps it

### Content
- Upgraded Bubble Sort, Merge Sort, and Quick Sort theory files with textbook-grade explanations (concise steps, detailed analysis paragraphs, cleaner code samples)

## [0.3.0] — 2026-02-13 — Scrollable Educational Page & Academic Theory

### Changed
- **Scrollable Layout**: Refactored visualizer pages from fixed dashboard to scrollable educational page (Hero → Code → Theory article)
- **TheorySection.tsx**: Rewritten with centered layout (`max-w-5xl mx-auto`), numbered algorithm steps with markdown rendering, complexity analysis paragraph, and embedded Python code with syntax highlighting
- **AlgoTheory Interface**: Expanded with `steps`, `analysis`, and `code` fields
- **InteractiveWorkspace.tsx**: Removed `h-full`/`overflow-hidden` constraints; Code and Theory now render as full-width scrollable sections below the visualizer hero
- **ArrayEngine.tsx / TreeSortEngine.tsx**: Stripped embedded CodePanel and AlgoTheoryPane; engines now only render Controls + Canvas + Status Bar

### Content
- Replaced brief theory descriptions with in-depth academic explanations for all 5 sorting algorithms (Bubble, Selection, Insertion, Merge, Quick Sort)
- Each theory now includes: detailed definition, step-by-step walkthrough, complexity analysis paragraph, pros & cons, and Python implementation

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
- **Phase 3.5: Typography & Spacing Polish**
  - **Sidebar Branding**: Increased to `text-2xl font-black` with `mb-6`.
  - **Typography**: Updated main headers to `text-4xl font-bold` and labels to `text-sm mono`.
  - **Spacing**: Increased sidebar and panel content padding to `p-6` for better readability.
  - **Misc**: Added `.gitignore` file.
- **Phase 4: White Space Overhaul**
  - **Sidebar**: Wrapped content in `px-8 py-8`, increased header bottom margin to `mb-10`.
  - **Workspace**: Root padding increased to `p-8` for breathing room.
  - **Controls**: Increased vertical padding for Size/Speed and Time/Space controls.
  - **Typography**: Enforced `leading-loose` on algorithm descriptions.
- **Phase 5: Strict Padding Enforcement**
  - **Sidebar**: Hardcoded `px-8` on header wrapper. `pl-4` on list items.
  - **CodePanel**: `p-8` on all content containers.
  - **Workspace**: `p-8` wrapper on main engine area.
  - **Header**: `p-8` wrapper on main title section.

## [0.2.0] — 2026-02-12 — Sorting Algorithms & Modular Architecture

### Added
- **New Algorithms**: Implemented Selection, Insertion, Quick, and Merge Sort with distinct visual identities (Pink, Orange, Purple, Blue)
- **TreeSortEngine**: Created `components/visualizers/TreeSortEngine.tsx` for hierarchical recursion visualization (Merge Sort, Quick Sort)
- **Visual Polymorphism**: Implemented `visualMode` property supporting `bars-lift`, `blocks-split`, `bars-scanner` rendering styles

### Changed
- **Refactoring**: Created `@/core/algorithms/sorting/index.ts` for unified exports; decoupled `ArrayEngine` from specific algorithms
- **Engine Loading**: Implemented `ALGO_LOGIC_MAP` in `InteractiveWorkspace` for dynamic prop-based algorithm loading
- **Registry**: Activated 5 sorting algorithms (Bubble, Selection, Insertion, Merge, Quick)
- **Controls**: Context-aware Size Slider limits — TreeSortEngine (max 16), ArrayEngine (max 60)
- **Status Bar**: Moved step description from absolute canvas overlay to a dedicated horizontal bar

### Architecture
- **Modular File Structure**: Refactored all 5 sorting algorithms to dedicated directories (`core/algorithms/sorting/[name]/`) containing `logic.ts`, `theory.ts`, and `index.ts`
- **Registry Refactor**: `lib/registry.ts` now imports manifests from modular directories instead of hardcoding data
- **Serialization Fix**: Resolved "Functions cannot be passed to Client Components" error by sanitizing the `algo` object in `page.tsx`

