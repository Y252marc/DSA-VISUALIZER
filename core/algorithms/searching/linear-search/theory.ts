import { AlgoItem } from "@/lib/registry";

export const linearSearchTheory: AlgoItem['theory'] = {
    definition: "Linear Search, also known as Sequential Search, is the simplest searching algorithm. It works by checking every element in the list, one by one, from the beginning to the end, until a match is found or the entire list has been searched. It requires no pre-processing of data and works on both sorted and unsorted arrays. While inefficient for large datasets, its simplicity makes it the go-to method for small or unsorted collections.",
    steps: [
        "Start from the first element (index 0) of the array.",
        "Compare the current element with the **target** value.",
        "If the current element matches the target, return its index — the search is successful.",
        "If it does not match, move to the next element.",
        "Repeat steps 2–4 until the element is found or the end of the array is reached.",
        "If the entire array has been traversed without finding the target, return **-1** (not found)."
    ],
    complexity: {
        time: "O(n)",
        space: "O(1)",
        best: "O(1)",
        worst: "O(n)",
        analysis: "In the best case, the target is the first element, requiring only one comparison. In the worst case (element not present or at the end), all n elements must be checked. On average, n/2 comparisons are needed. It uses O(1) auxiliary space as it only requires a loop variable."
    },
    pros: [
        "Extremely simple to understand and implement.",
        "Works on unsorted data — no pre-processing required.",
        "No extra memory needed (In-Place, O(1) space).",
        "Works on any data type that supports equality comparison."
    ],
    cons: [
        "Very slow for large datasets — O(n) time complexity.",
        "Inefficient compared to Binary Search on sorted data.",
        "Not suitable for real-time applications requiring fast lookups."
    ],
    code: `def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i    # Found at index i
    return -1           # Not found`
};
