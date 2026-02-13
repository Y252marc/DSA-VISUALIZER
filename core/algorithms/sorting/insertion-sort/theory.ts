import { AlgoItem } from "@/lib/registry";

export const insertionSortTheory: AlgoItem['theory'] = {
    definition: "Insertion Sort builds the final sorted array (or list) one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort. However, it provides several advantages: it's simple, it's efficient for small data sets, it's stable, and it's adaptive (efficient for data sets that are already substantially sorted). It works similarly to the way you sort playing cards in your hands.",
    steps: [
        "Assume the first element is already sorted.",
        "Pick the next element (the second element) and designate it as the 'key'.",
        "Compare the 'key' with the elements in the sorted sub-list to its left.",
        "Shift all elements in the sorted sub-list that are greater than the 'key' one position to the right.",
        "Insert the 'key' into its correct sorted position.",
        "Repeat until all elements from the unsorted portion have been moved into the sorted portion."
    ],
    complexity: {
        time: "O(n²)",
        space: "O(1)",
        analysis: "In the worst case (reverse sorted array), insertion sort runs in O(n²) time because every new element must be compared with and shifted past every element already in the sorted section. However, in the best case (an already sorted array), it runs in O(n) time, making it incredibly efficient for nearly-sorted data. It is an in-place algorithm requiring constant O(1) extra space."
    },
    pros: [
        "Adaptive: Extremely fast (O(n)) for arrays that are already mostly sorted.",
        "Stable: Preserves the relative order of elements with equal keys.",
        "In-place and requires very little overhead, making it fast for small datasets (e.g., n < 50).",
        "Often used as the base case for complex recursive algorithms like Merge Sort or Timsort."
    ],
    cons: [
        "Inefficient quadratic time complexity O(n²) for random or reverse-sorted large lists.",
        "Generally slower than sophisticated algorithms like Merge Sort or Quick Sort for large n."
    ],
    code: `def insertion_sort(arr):
    # Traverse through 1 to len(arr)
    for i in range(1, len(arr)):
        key = arr[i]
        # Move elements of arr[0..i-1], that are
        # greater than key, to one position ahead
        # of their current position
        j = i-1
        while j >= 0 and key < arr[j] :
                arr[j + 1] = arr[j]
                j -= 1
        arr[j + 1] = key
    return arr`
};
