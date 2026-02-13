import { TreeStep } from "@/core/types";

export const quickSortCode = `procedure quickSort(A)
  if length(A) <= 1 then
    return A
  end if
  pivot := A[length(A) - 1]
  left := [x in A if x < pivot]
  right := [x in A if x > pivot]
  return quickSort(left) + [pivot] + quickSort(right)
end procedure`;

export function* quickSort(input: number[]): Generator<TreeStep> {
    const arr = [...input];

    yield {
        type: "base",
        level: 0,
        description: "Initial Array",
        codeLine: 1,
    };

    yield* quickSortRecursive(arr, "root", 0);
}

function* quickSortRecursive(
    arr: number[],
    nodeId: string,
    level: number
): Generator<TreeStep> {
    if (arr.length <= 1) {
        if (arr.length === 1) {
            yield {
                type: "merge", // Reusing merge to indicate "sorted/ready"
                level: level,
                nodeId: nodeId,
                sortedValues: arr,
                description: `Single element ${arr[0]} is sorted`,
                codeLine: 2,
            };
        }
        return arr;
    }

    // Select Pivot (Last element)
    const pivotIndex = arr.length - 1;
    const pivotValue = arr[pivotIndex];

    // Viz: Highlight Pivot
    yield {
        type: "pivot",
        level: level,
        index: pivotIndex,
        nodeId: nodeId,
        pivotValue: pivotValue,
        description: `Selected pivot: ${pivotValue}`,
        codeLine: 5,
    };

    // Partition
    const leftArr = [];
    const rightArr = [];

    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < pivotValue) leftArr.push(arr[i]);
        else rightArr.push(arr[i]);
    }

    // Viz: Partition (Spawn Children)
    yield {
        type: "partition",
        level: level,
        nodeId: nodeId,
        left: leftArr,
        right: rightArr,
        description: `Partitioned into left (<${pivotValue}) and right (>=${pivotValue})`,
        codeLine: 6,
    };

    // Recurse Left
    const sortedLeft: any = yield* quickSortRecursive(leftArr, `${nodeId}-L`, level + 1);

    // Recurse Right
    const sortedRight: any = yield* quickSortRecursive(rightArr, `${nodeId}-R`, level + 1);

    // Combine
    const sorted = [...sortedLeft, pivotValue, ...sortedRight];

    yield {
        type: "merge", // Visual merge event
        level: level,
        nodeId: nodeId,
        sortedValues: sorted,
        description: `Combined sorted partitions with pivot ${pivotValue}`,
        codeLine: 8,
    };

    return sorted;
}
