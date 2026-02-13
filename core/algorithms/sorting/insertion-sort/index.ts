import { insertionSort } from './logic';
import { insertionSortTheory } from './theory';
import { AlgoItem } from "@/lib/registry";

export const InsertionSortManifest: AlgoItem = {
    id: "insertion-sort",
    title: "Insertion Sort",
    category: "Sorting",
    status: "active",
    visualizer: "ArrayEngine",
    visualMode: "bars",
    complexity: { time: "O(n²)", space: "O(1)" },
    description: "Builds the sorted array one item at a time by repeatedly picking the next item and inserting it into the correct position among the previously sorted items. Efficient for small or nearly-sorted datasets. Serves as the base case for hybrid sorts like TimSort.",
    logic: insertionSort,
    theory: insertionSortTheory,
};
