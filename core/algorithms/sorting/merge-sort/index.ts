import { mergeSort } from './logic';
import { mergeSortTheory } from './theory';
import { AlgoItem } from "@/lib/registry";

export const MergeSortManifest: AlgoItem = {
    id: "merge-sort",
    title: "Merge Sort",
    category: "Sorting",
    status: "active",
    visualizer: "TreeSortEngine",
    visualMode: "blocks-split",
    complexity: { time: "O(n log n)", space: "O(n)" },
    description: "A divide-and-conquer algorithm that splits the array in half, recursively sorts each half, and then merges the two sorted halves. Guarantees O(n log n) performance regardless of input. Stable sort widely used in practice.",
    logic: mergeSort,
    theory: mergeSortTheory,
};
