import { quickSort } from './logic';
import { quickSortTheory } from './theory';
import { AlgoItem } from "@/lib/registry";

export const QuickSortManifest: AlgoItem = {
    id: "quick-sort",
    title: "Quick Sort",
    category: "Sorting",
    status: "active",
    visualizer: "TreeSortEngine",
    visualMode: "blocks-split",
    complexity: { time: "O(n log n) avg", space: "O(log n)" },
    description: "Selects a 'pivot' element and partitions the array around it so that elements less than the pivot come before it and elements greater come after. Recursively sorts the sub-arrays. Average-case O(n log n) with excellent cache performance despite O(n²) worst case.",
    logic: quickSort,
    theory: quickSortTheory,
};
