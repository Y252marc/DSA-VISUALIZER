import { binarySearch, binarySearchCode } from './logic';
import { binarySearchTheory } from './theory';
import { AlgoItem } from "@/lib/registry";

export const BinarySearchManifest: AlgoItem = {
    id: "binary-search",
    title: "Binary Search",
    category: "Searching",
    status: "active",
    visualizer: "SearchEngine",
    complexity: { time: "O(log n)", space: "O(1)" },
    description: "Efficiently finds a target value within a sorted array by repeatedly dividing the search interval in half. Compares the target to the middle element and eliminates half of the remaining elements at each step. Foundation for many algorithmic techniques.",
    theory: binarySearchTheory,
};
