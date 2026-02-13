# DSA Visualizer

A modern, interactive Data Structures and Algorithms visualizer built to help students and developers understand complex algorithms through animations and detailed theory.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🚀 Features

### **Sorting Algorithms**
* **Bubble Sort**: Classic bar visualization showing the "bubbling" effect.
* **Selection Sort**: Highlights minimum search and swap operations.
* **Insertion Sort**: Visualizes the "card sorting" method.
* **Merge Sort**: **Advanced Recursion Tree** visualization showing the divide-and-conquer process.
* **Quick Sort**: **Recursion Tree** visualization highlighting pivots and partitioning.

### **Searching Algorithms**
* **Linear Search**: Sequential card scanning animation.
* **Binary Search**: "Divide and Conquer" animation with dimming effects for discarded halves.

### **Educational Tools**
* **Rich Theory Sections**: Detailed explanations, time/space complexity analysis, and pros/cons for every algorithm.
* **Code Execution Sync**: Real-time highlighting of Python code lines as the visualization runs.
* **Interactive Controls**: Speed control, pause/play, and step-by-step execution.
* **Custom Inputs**: Users can define their own array sizes and search targets.

## 🛠️ Tech Stack

* **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **Animations**: [Framer Motion](https://www.framer.com/motion/)
* **Icons**: [Lucide React](https://lucide.dev/)

## 📦 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/yourusername/dsa-visualizer.git](https://github.com/yourusername/dsa-visualizer.git)
    cd dsa-visualizer
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

4.  **Open your browser:**
    Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📂 Project Structure

```text
/app
  └── visualizer/       # Dynamic algorithm pages
/components
  ├── Sidebar.tsx       # Navigation
  ├── CodePanel.tsx     # Algorithm code display
  ├── TheorySection.tsx # Educational content
  └── engines/          # Visualization Logic
      ├── ArrayEngine.tsx    # For Bubble/Selection/Insertion
      ├── TreeSortEngine.tsx # For Merge/Quick Sort
      └── SearchEngine.tsx   # For Linear/Binary Search
/core
  └── algorithms/       # Logic, Generators, and Theory data
/lib
  └── registry.ts       # Central algorithm manifest
```

🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

Fork the project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

📝 License
This project is licensed under the MIT License - see the LICENSE file for details.
