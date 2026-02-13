import { AlgoItem } from "@/lib/registry";

export const bubbleSortTheory: AlgoItem['theory'] = {
    definition: "Bubble Sort is one of the simplest sorting algorithms to understand, though rarely used in practice due to its inefficiency. It works by repeatedly stepping through the list to be sorted, comparing each pair of adjacent items and swapping them if they are in the wrong order. The pass through the list is repeated until no swaps are needed, which indicates that the list is sorted. It is named for the way smaller elements 'bubble' to the top of the list.",
    steps: [
        "Start at the beginning of the array with a 'swapped' flag set to false.",
        "Iterate through the array from index 0 to n-1.",
        "Compare the current element (arr[i]) with the next element (arr[i+1]).",
        "If arr[i] > arr[i+1], swap them and set the 'swapped' flag to true.",
        "Repeat this process for each pass. After the first pass, the largest element is guaranteed to be at the end.",
        "Continue making passes until a pass completes with 'swapped' remaining false."
    ],
    complexity: {
        time: "O(n²)",
        space: "O(1)",
        analysis: "In the worst-case scenario (a reverse-sorted list), we must compare every element with every other element, resulting in quadratic time complexity. It is an 'in-place' sort, requiring only a single unit of extra memory space for the temporary swap variable."
    },
    pros: [
        "Extremely simple to implement and understand.",
        "No extra memory required (In-Place).",
        "Can detect an already sorted list in O(n) time (Adaptive)."
    ],
    cons: [
        "Very slow for large datasets compared to Merge Sort or Quick Sort.",
        "Performs many unnecessary swaps."
    ],
    code: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr`
};
