import { SearchStep } from "@/core/types";

export function* linearSearch(arr: number[], target: number): Generator<SearchStep> {
    yield {
        array: arr,
        target,
        type: "init",
        description: `Searching for target ${target} in array of ${arr.length} elements.`,
        codeLine: 1,
    };

    for (let i = 0; i < arr.length; i++) {
        yield {
            array: arr,
            target,
            type: "scan",
            index: i,
            description: `Checking index ${i}: arr[${i}] = ${arr[i]}. Is it ${target}?`,
            codeLine: 3,
        };

        if (arr[i] === target) {
            yield {
                array: arr,
                target,
                type: "found",
                index: i,
                description: `Found target ${target} at index ${i}!`,
                codeLine: 4,
            };
            return;
        }
    }

    yield {
        array: arr,
        target,
        type: "not-found",
        description: `Target ${target} was not found in the array.`,
        codeLine: 6,
    };
}

export const linearSearchCode = `def linear_search(arr, target):
    for i in range(len(arr)):
        # Check current element
        if arr[i] == target:
            return i    # Found!
    # Element not in list
    return -1`;
