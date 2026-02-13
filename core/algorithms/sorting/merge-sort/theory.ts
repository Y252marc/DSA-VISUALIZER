import { AlgoItem } from "@/lib/registry";

export const mergeSortTheory: AlgoItem['theory'] = {
    definition: "Merge Sort is a highly efficient, general-purpose, comparison-based sorting algorithm. It follows the 'Divide and Conquer' paradigm. It works by recursively breaking down a problem into two or more sub-problems of the same or related type, until these become simple enough to be solved directly (base case). Then, the solutions to the sub-problems are combined (merged) to give a solution to the original problem.",
    steps: [
        "**Divide:** If the array has more than one element, calculate the middle index and split the array into two halves: 'Left' and 'Right'.",
        "**Conquer:** Recursively call Merge Sort on the Left half and the Right half.",
        "**Merge:** Compare the elements of the two sorted subarrays. Create a temporary array and place the smaller element from either the Left or Right subarray into it. Repeat until one subarray is empty, then copy the remaining elements."
    ],
    complexity: {
        time: "O(n log n)",
        space: "O(n)",
        analysis: "Merge Sort guarantees O(n log n) performance because the array is divided in half log(n) times, and re-merging requires linear time O(n) at each level. Unlike Quick Sort, its worst-case scenario is still O(n log n). However, it requires O(n) auxiliary space to hold the temporary arrays during the merge phase."
    },
    pros: [
        "Guaranteed O(n log n) efficiency on all datasets.",
        "Stable Sort: Preserves the relative order of equal elements.",
        "Excellent for sorting Linked Lists (doesn't require random access)."
    ],
    cons: [
        "Requires O(n) extra memory space (not in-place).",
        "Slower than Insertion Sort for very small arrays (n < 15) due to recursion overhead."
    ],
    code: `def merge_sort(arr):
    if len(arr) > 1:
        mid = len(arr)//2
        L = arr[:mid]
        R = arr[mid:]
        merge_sort(L)
        merge_sort(R)
        i = j = k = 0
        while i < len(L) and j < len(R):
            if L[i] <= R[j]:
                arr[k] = L[i]
                i += 1
            else:
                arr[k] = R[j]
                j += 1
            k += 1
        while i < len(L):
            arr[k] = L[i]
            i += 1
            k += 1
        while j < len(R):
            arr[k] = R[j]
            j += 1
            k += 1`
};
