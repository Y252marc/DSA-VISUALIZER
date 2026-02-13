import { AlgoItem } from "@/lib/registry";

export const selectionSortTheory: AlgoItem['theory'] = {
    definition: "Selection Sort is a simple comparison-based sorting algorithm. It divides the input list into two parts: a sorted sublist of items which is built up from left to right at the front (left) of the list, and the remaining unsorted items that occupy the rest of the list. Initially, the sorted sublist is empty and the unsorted sublist is the entire input list. The algorithm proceeds by finding the smallest (or largest, depending on sorting order) element in the unsorted sublist, exchanging (swapping) it with the leftmost unsorted element (putting it in sorted order), and moving the sublist boundaries one element to the right.",
    steps: [
        "Set the first element as the initial 'minimum'.",
        "Scan the rest of the array to find the actual smallest element.",
        "If a smaller element is found, define it as the new 'minimum'.",
        "After scanning the entire unsorted portion, swap the found minimum element with the first element of the unsorted portion.",
        "Advance the 'sorted' boundary one position to the right.",
        "Repeat the process starting from the next position until the entire array is sorted."
    ],
    complexity: {
        time: "O(n²)",
        space: "O(1)",
        analysis: "Selection sort always performs O(n²) comparisons because it must scan the remaining unsorted portion of the array to find the absolute minimum, regardless of the initial order of the elements. However, it is unique among O(n²) algorithms in that it performs at most n-1 swaps in total, which can be advantageous if writing to memory is significantly more expensive than reading."
    },
    pros: [
        "Simple to implement.",
        "Performs the minimum number of swaps possible for any sorting algorithm (O(n) swaps).",
        "In-place sort (requires O(1) extra space)."
    ],
    cons: [
        "Inefficient quadratic time complexity O(n²), making it unsuitable for large datasets.",
        "Not a stable sort (doesn't preserve relative order of equal elements).",
        "Its performance is usually worse than Insertion Sort for small or nearly sorted arrays."
    ],
    code: `def selection_sort(arr):
    # Traverse through all array elements
    for i in range(len(arr)):
        # Find the minimum element in remaining
        # unsorted array
        min_idx = i
        for j in range(i+1, len(arr)):
            if arr[j] < arr[min_idx]:
                min_idx = j

        # Swap the found minimum element with
        # the first element
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`
};
