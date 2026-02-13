import { bubbleSort } from './logic';
import { bubbleSortTheory } from './theory';
import { AlgoItem } from "@/lib/registry";

export const BubbleSortManifest: AlgoItem = {
    id: "bubble-sort",
    title: "Bubble Sort",
    category: "Sorting",
    status: "active",
    visualizer: "ArrayEngine",
    visualMode: "bars",
    complexity: { time: "O(n²)", space: "O(1)" },
    description: "Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted. Named for the way smaller elements 'bubble' to the top of the list. While simple to understand, it is inefficient for large datasets.",
    logic: bubbleSort,
    theory: bubbleSortTheory,
};
