import { TreeStep } from "@/core/types";

export const mergeSortCode = `procedure mergeSort(A: list)
  if length(A) <= 1 then
    return A
  end if
  mid := length(A) / 2
  left := mergeSort(A[0..mid])
  right := mergeSort(A[mid..end])
  return merge(left, right)
11: end procedure`;

export function* mergeSort(input: number[]): Generator<TreeStep> {
    const arr = [...input];

    yield {
        type: "base",
        level: 0,
        description: "Initial Array",
        codeLine: 1,
    };

    yield* mergeSortRecursive(arr, "root", 0);
}

function* mergeSortRecursive(
    arr: number[],
    nodeId: string,
    level: number
): Generator<TreeStep> {
    if (arr.length <= 1) {
        yield {
            type: "merge",
            level: level,
            nodeId: nodeId,
            sortedValues: arr,
            description: `Base case reached for ${nodeId}`,
            codeLine: 4
        };
        return arr;
    }

    const mid = Math.floor(arr.length / 2);
    const leftArr = arr.slice(0, mid);
    const rightArr = arr.slice(mid);

    // Yield Split -> This tells engine to spawn children
    yield {
        type: "partition", // Reusing partition type to spawn children
        level: level,
        nodeId: nodeId,
        left: leftArr,
        right: rightArr,
        description: `Splitting ${nodeId} into halves`,
        codeLine: 7
    };

    // Recurse Left
    const sortedLeft: any = yield* mergeSortRecursive(leftArr, `${nodeId}-L`, level + 1);

    // Recurse Right
    const sortedRight: any = yield* mergeSortRecursive(rightArr, `${nodeId}-R`, level + 1);

    // Merge
    const merged = [];
    let i = 0, j = 0;
    while (i < sortedLeft.length && j < sortedRight.length) {
        if (sortedLeft[i] <= sortedRight[j]) {
            merged.push(sortedLeft[i]);
            i++;
        } else {
            merged.push(sortedRight[j]);
            j++;
        }
    }
    while (i < sortedLeft.length) merged.push(sortedLeft[i++]);
    while (j < sortedRight.length) merged.push(sortedRight[j++]);

    yield {
        type: "merge",
        level: level,
        nodeId: nodeId,
        sortedValues: merged,
        description: `Merged children of ${nodeId}`,
        codeLine: 10
    };

    return merged;
}
