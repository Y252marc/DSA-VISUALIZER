import { SearchStep } from "@/core/types";

export function* binarySearch(arr: number[], target: number): Generator<SearchStep> {
    // Auto-sort the array first
    const sorted = [...arr].sort((a, b) => a - b);

    yield {
        array: sorted,
        target,
        type: "init",
        description: `Array sorted. Searching for target ${target} using Binary Search.`,
        codeLine: 1,
    };

    let low = 0;
    let high = sorted.length - 1;

    while (low <= high) {
        yield {
            array: sorted,
            target,
            type: "range",
            rangeStart: low,
            rangeEnd: high,
            description: `Search window: indices ${low} to ${high}.`,
            codeLine: 4,
        };

        const mid = Math.floor((low + high) / 2);

        yield {
            array: sorted,
            target,
            type: "mid",
            index: mid,
            rangeStart: low,
            rangeEnd: high,
            description: `Mid = ${mid}, arr[${mid}] = ${sorted[mid]}. Comparing with target ${target}.`,
            codeLine: 5,
        };

        if (sorted[mid] === target) {
            yield {
                array: sorted,
                target,
                type: "found",
                index: mid,
                rangeStart: low,
                rangeEnd: high,
                description: `Found target ${target} at index ${mid}!`,
                codeLine: 7,
            };
            return;
        } else if (sorted[mid] < target) {
            low = mid + 1;
            yield {
                array: sorted,
                target,
                type: "range",
                rangeStart: low,
                rangeEnd: high,
                description: `arr[${mid}] = ${sorted[mid]} < ${target}. Move low to ${low}.`,
                codeLine: 9,
            };
        } else {
            high = mid - 1;
            yield {
                array: sorted,
                target,
                type: "range",
                rangeStart: low,
                rangeEnd: high,
                description: `arr[${mid}] = ${sorted[mid]} > ${target}. Move high to ${high}.`,
                codeLine: 11,
            };
        }
    }

    yield {
        array: sorted,
        target,
        type: "not-found",
        description: `Target ${target} was not found in the sorted array.`,
        codeLine: 12,
    };
}

export const binarySearchCode = `def binary_search(arr, target):
    arr.sort()
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        # Check middle element
        if arr[mid] == target:
            return mid       # Found!
        elif arr[mid] < target:
            low = mid + 1    # Search right half
        else:
            high = mid - 1   # Search left half
    return -1  # Not found`;
