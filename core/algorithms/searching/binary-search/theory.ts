import { AlgoItem } from "@/lib/registry";

export const binarySearchTheory: AlgoItem['theory'] = {
    definition: "Binary Search is a highly efficient search algorithm that works on sorted arrays by repeatedly dividing the search interval in half. It compares the target value to the middle element of the array — if they are not equal, the half in which the target cannot lie is eliminated and the search continues on the remaining half. This process is repeated until the target is found or the search interval is empty. It is the foundation of many algorithmic techniques and is one of the most important algorithms in computer science.",
    steps: [
        "**Prerequisite:** The array must be sorted in ascending order.",
        "Initialize two pointers: `low = 0` and `high = n - 1`.",
        "Calculate the middle index: `mid = (low + high) // 2`.",
        "Compare `arr[mid]` with the target value.",
        "If `arr[mid] == target`, the search is successful — return `mid`.",
        "If `arr[mid] < target`, the target must be in the right half. Set `low = mid + 1`.",
        "If `arr[mid] > target`, the target must be in the left half. Set `high = mid - 1`.",
        "Repeat steps 3–7 until `low > high`, meaning the target is not in the array."
    ],
    complexity: {
        time: "O(log n)",
        space: "O(1)",
        best: "O(1)",
        worst: "O(log n)",
        analysis: "At each step, the search space is halved, resulting in at most log₂(n) comparisons for an array of size n. For example, an array of 1,000,000 elements requires at most ~20 comparisons. The iterative version uses O(1) space, while the recursive version uses O(log n) stack space."
    },
    pros: [
        "Extremely fast — O(log n) time complexity.",
        "Very efficient for large, sorted datasets.",
        "Simple to implement iteratively with O(1) space.",
        "Foundation for many advanced algorithms (lower/upper bound, interpolation search)."
    ],
    cons: [
        "Requires the data to be sorted beforehand.",
        "Not efficient for linked lists (no random access).",
        "Insertion into a sorted array is O(n), which can negate search benefits."
    ],
    code: `def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid          # Found
        elif arr[mid] < target:
            low = mid + 1       # Search right half
        else:
            high = mid - 1      # Search left half
    return -1                   # Not found`
};
