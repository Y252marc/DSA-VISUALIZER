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

    description: string;
    codeLine?: number; // 1-indexed
}
