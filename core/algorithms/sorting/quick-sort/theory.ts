import { AlgoItem } from "@/lib/registry";

export const quickSortTheory: AlgoItem['theory'] = {
    definition: "Quick Sort is a fast, efficient, divide-and-conquer sorting algorithm. It picks an element as a 'pivot' and partitions the given array around the picked pivot. There are many versions of quickSort that pick pivot in different ways (first, last, random, or median). It is widely used in standard library implementations due to its speed and cache efficiency.",
    steps: [
        "**Choose Pivot:** Select an element from the array (e.g., the last element).",
        "**Partition:** Reorder the array so that all elements with values less than the pivot come before the pivot, and all elements with values greater than the pivot come after it.",
        "**Recursion:** Recursively apply the above steps to the sub-array of elements with smaller values and separately to the sub-array of elements with greater values."
    ],
    complexity: {
        time: "O(n log n) avg, O(n²) worst",
        space: "O(log n)",
        analysis: "On average, Quick Sort runs in O(n log n). However, if the pivot is chosen poorly (e.g., always the smallest element), it degrades to O(n²). Randomizing the pivot selection virtually eliminates this risk. It sorts in-place, requiring only O(log n) stack space for recursion."
    },
    pros: [
        "Often faster than Merge Sort in practice due to lower overhead.",
        "In-Place sort (requires very little extra memory).",
        "Cache friendly."
    ],
    cons: [
        "Worst-case time complexity is O(n²).",
        "Not a Stable sort (relative order of equal items is not preserved)."
    ],
    code: `def partition(array, low, high):
    pivot = array[high]
    i = low - 1
    for j in range(low, high):
        if array[j] <= pivot:
            i = i + 1
            array[i], array[j] = array[j], array[i]
    array[i + 1], array[high] = array[high], array[i + 1]
    return i + 1

def quick_sort(array, low, high):
    if low < high:
        pi = partition(array, low, high)
        quick_sort(array, low, pi - 1)
        quick_sort(array, pi + 1, high)`
};
