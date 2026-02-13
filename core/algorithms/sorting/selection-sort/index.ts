import { selectionSort } from './logic';
import { selectionSortTheory } from './theory';
import { AlgoItem } from "@/lib/registry";

export const SelectionSortManifest: AlgoItem = {
    id: "selection-sort",
    title: "Selection Sort",
    category: "Sorting",
    status: "active",
    visualizer: "ArrayEngine",
    visualMode: "bars-scanner",
    complexity: { time: "O(n²)", space: "O(1)" },
    description: "Divides the input list into a sorted and unsorted region. It repeatedly selects the smallest (or largest) element from the unsorted region and moves it to the end of the sorted region. Performs fewer swaps than Bubble Sort but has the same time complexity.",
    logic: selectionSort,
    theory: selectionSortTheory,
};
