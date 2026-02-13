import { linearSearch, linearSearchCode } from './logic';
import { linearSearchTheory } from './theory';
import { AlgoItem } from "@/lib/registry";

export const LinearSearchManifest: AlgoItem = {
    id: "linear-search",
    title: "Linear Search",
    category: "Searching",
    status: "active",
    visualizer: "SearchEngine",
    complexity: { time: "O(n)", space: "O(1)" },
    description: "Sequentially checks each element in the list until a match is found or the entire list has been searched. The simplest search algorithm with no prerequisites on data ordering. Optimal for unsorted or small datasets.",
    theory: linearSearchTheory,
};
