export interface SortStep {
    array: number[];
    sorted: number[]; // Indices that are sorted

    // Basic Comparisons
    comparing: number[] | null; // Currently being compared
    swapped: [number, number] | null; // Just swapped

    // Selection Sort
    min?: number; // Current minimum index (Pink)

    // Insertion Sort
    key?: number; // Element being inserted (Orange)

    // Quick Sort
    pivot?: number; // Pivot index (Purple)
    left?: number;  // Left pointer (Cyan)
    right?: number; // Right pointer (Yellow)

    // Merge Sort
    range?: [number, number]; // [start, end] inclusive (Faint Blue background)
    overwrite?: number; // Index being overwritten (White flash)

    // Visual Polymorphism
    lift?: number; // Index to lift (Insertion Sort)
    splits?: number[]; // Indices to create gaps after (Merge/Quick Sort)

    description: string;
    codeLine?: number; // 1-indexed
}

// Tree Sort Types
export interface TreeStep {
    type: "split" | "merge" | "pivot" | "partition" | "base";
    level: number;

    // Merge Sort
    range?: [number, number];
    sortedValues?: number[];

    // Quick Sort
    index?: number; // Pivot index (in the subarray context, or absolute?) -> Let's use value for visuals if easier, or absolute index
    pivotValue?: number;
    left?: number[];
    right?: number[];

    // ID tracking for nodes
    nodeId?: string;
    parentId?: string;

    description: string;
    codeLine?: number;
}
