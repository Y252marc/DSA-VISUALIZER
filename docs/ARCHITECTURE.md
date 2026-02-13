# ARCHITECTURE.md — DSA Visualizer Platform

## Overview

The DSA Visualizer Platform is a data-driven, registry-based educational tool for exploring 80+ data structure and algorithm concepts. The architecture follows the **Registry Pattern** — a single source of truth that drives routing, navigation, and content rendering.

## The Registry Pattern

All algorithm metadata lives in `/lib/registry.ts`. This single file defines every algorithm's:
- **id** (slug) — used for URL routing `/visualizer/[slug]`
- **title** — display name
- **category** — grouping (Sorting, Graph, DP, etc.)
- **status** — `'active'` (interactive visualizer) or `'blueprint'` (theory specification)
- **complexity** — time and space complexity
- **description** — technical explanation

### How it works
1. The Sidebar reads the registry to render the full navigation tree, grouped by category.
2. The dynamic route `/app/visualizer/[slug]/page.tsx` looks up the slug in the registry.
3. If `status === 'active'`, it renders `<InteractiveWorkspace />` with the appropriate visualizer engine.
4. If `status === 'blueprint'`, it renders `<BlueprintSpec />` — a technical datasheet of the algorithm.

### Adding a new algorithm
1. Add the entry to the `REGISTRY` array in `/lib/registry.ts`.
2. If it's theory-only, set `status: 'blueprint'` — done.
3. If it has a visualizer, set `status: 'active'` and add a condition in `InteractiveWorkspace` to render the engine.

## Folder Structure

```
/
├── app/
│   ├── globals.css          # Design system tokens + base styles
│   ├── layout.tsx           # Root layout (font, metadata)
│   ├── page.tsx             # Dashboard / landing page
│   └── visualizer/
│       └── [slug]/
│           └── page.tsx     # Dynamic route — routes to visualizer or blueprint
├── components/
│   ├── Sidebar.tsx          # Fixed navigation sidebar with search
│   ├── MainLayout.tsx       # Shell layout (sidebar + content area)
│   ├── BlueprintSpec.tsx    # Generic blueprint spec renderer
│   ├── InteractiveWorkspace.tsx  # Container for active visualizers
│   └── visualizers/
│       └── ArrayEngine.tsx  # Bubble sort (and future array-based) visualizer
├── lib/
│   └── registry.ts          # Single source of truth for all algorithms
├── docs/
│   ├── ARCHITECTURE.md      # This file
│   └── CHANGELOG.md         # Project changelog
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
└── package.json
```

## Tech Stack

| Layer       | Technology                 |
|-------------|---------------------------|
| Framework   | Next.js 16 (App Router)   |
| Language    | TypeScript                |
| Styling     | Tailwind CSS v4           |
| Animation   | Framer Motion             |
| Icons       | Lucide React              |
| Font        | JetBrains Mono            |
