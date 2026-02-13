# DSA Visualizer: Algorithm Blueprint Engine

A modern, industrial-grade algorithm visualization platform built with Next.js, TypeScript, and Framer Motion. Designed to break down complex data structures and algorithms into interactive, step-by-step visual experiences.

## 🚀 Features

### Interactive Visualizers
Experience algorithms in action with real-time state tracking and physics-based animations.
- **Sorting Algorithms**: Bubble Sort, Selection Sort, Insertion Sort, Quick Sort, Merge Sort.
- **Tree Visualizations**: Divide-and-Conquer algorithms (Merge/Quick) visualized as recursion trees.
- **Search Algorithms**: Linear Search, Binary Search.

### Core Systems
- **Step-by-Step Execution**: Go forward, backward, or jump to specific steps in the algorithm's execution flow.
- **Code Highlighting**: Real-time pseudocode execution with active line tracking and syntax highlighting.
- **Algorithm Registry**: Centralized metadata system (`lib/registry.ts`) powering the entire platform's routing and navigation.
- **Blueprint Mode**: Technical specifications for algorithms pending visualization.

### Industrial Design
- **"Terminal Blue" Aesthetic**: High-contrast dark mode with neon accents (`bg-blue-600` active elements).
- **Precision Layout**: Pixel-perfect spacing (`1.5cm` top gap, `3cm` bottom gap, `4mm` side gutters).
- **Floating Interface**: Glassmorphic panels and crisp borders.

## 🛠 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Hooks (`useState`, `useReducer`)

## 🏁 Getting Started

### Prerequisites
- Node.js 18+ installed on your machine.

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/dsa-visualizer.git
    cd dsa-visualizer
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```
├── app/                  # Next.js App Router pages
│   ├── visualizer/[slug] # Dynamic visualizer route
│   └── page.tsx          # Main Dashboard
├── components/           # UI Components
│   ├── visualizers/      # Algorithm-specific components (Engine, Bars)
│   ├── Sidebar.tsx       # Navigation sidebar
│   └── CodePanel.tsx     # Syntax-highlighted code display
├── core/                 # Core Algorithm Logic
│   └── algorithms/       # Modular algorithm implementations (Generator functions)
├── lib/                  # Utilities & Data
│   └── registry.ts       # Central source of truth for all algorithms
└── public/               # Static assets
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
