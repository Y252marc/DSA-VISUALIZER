import { SortStep } from "@/core/types";

export const quickSortCode = `procedure partition(A, lo, hi)
  pivot := A[hi]
  i := lo
  for j := lo to hi - 1 do
    if A[j] < pivot then
      swap A[i] with A[j]
      i := i + 1
    end if
  end for
  swap A[i] with A[hi]
  return i
end procedure

procedure quickSort(A, lo, hi)
  if lo < hi then
    p := partition(A, lo, hi)
    quickSort(A, lo, p - 1)
    quickSort(A, p + 1, hi)
  end if
end procedure`;

export function* quickSort(input: number[]): Generator<SortStep> {
    const arr = [...input];
    const sortedIndices: number[] = [];

    yield {
        array: [...arr],
        sorted: [],
        comparing: null,
        swapped: null,
        description: "Starting Quick Sort",
        codeLine: 14,
    };

    yield* quickSortHelper(arr, 0, arr.length - 1, sortedIndices);

    yield {
        array: [...arr],
        sorted: Array.from({ length: arr.length }, (_, i) => i),
        comparing: null,
        swapped: null,
        description: "Sorting complete",
        codeLine: 19,
    };
}

function* quickSortHelper(
    arr: number[],
    lo: number,
    hi: number,
    sortedIndices: number[]
): Generator<SortStep> {
    if (lo >= hi) {
        if (lo === hi) {
            sortedIndices.push(lo);
            yield {
                array: [...arr],
                sorted: [...sortedIndices],
                comparing: null,
                swapped: null,
                description: `Single element ${arr[lo]} is sorted`,
                codeLine: 15,
            };
        }
        return;
    }

    // Partition
    const pivotIndex = hi;
    const pivotValue = arr[hi];

    yield {
        array: [...arr],
        sorted: [...sortedIndices],
        comparing: null,
        swapped: null,
        pivot: pivotIndex, // Purple
        range: [lo, hi], // Focus area
        description: `Partitioning range [${lo}, ${hi}] with pivot ${pivotValue}`,
        codeLine: 2,
    };

    let i = lo;

    yield {
        array: [...arr],
        sorted: [...sortedIndices],
        comparing: null,
        swapped: null,
        pivot: pivotIndex,
        left: i, // Cyan scanner
        range: [lo, hi],
        description: `Initialize i at ${i}`,
        codeLine: 3,
    };

    for (let j = lo; j < hi; j++) {
        yield {
            array: [...arr],
            sorted: [...sortedIndices],
            comparing: [j],
            swapped: null,
            pivot: pivotIndex,
            left: i, // Cyan
            right: j, // Yellow
            range: [lo, hi],
            description: `Comparing A[${j}] (${arr[j]}) < Pivot (${pivotValue})`,
            codeLine: 5,
        };

        if (arr[j] < pivotValue) {
            if (i !== j) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
                yield {
                    array: [...arr],
                    sorted: [...sortedIndices],
                    comparing: null,
                    swapped: [i, j],
                    pivot: pivotIndex,
                    left: i,
                    right: j,
                    range: [lo, hi],
                    description: `Swapped smaller element ${arr[i]} to left`,
                    codeLine: 6,
                };
            }
            i++;
            yield {
                array: [...arr],
                sorted: [...sortedIndices],
                comparing: null,
                swapped: null,
                pivot: pivotIndex,
                left: i,
                range: [lo, hi],
                description: `Incremented i to ${i}`,
                codeLine: 7,
            }
        }
    }

    [arr[i], arr[hi]] = [arr[hi], arr[i]]; // Swap pivot into place
    sortedIndices.push(i);

    yield {
        array: [...arr],
        sorted: [...sortedIndices],
        comparing: null,
        swapped: [i, hi],
        pivot: i, // Pivot is now at i
        range: [lo, hi],
        description: `Partition complete. Pivot placed at ${i}`,
        codeLine: 10,
    };

    // Recurse
    yield* quickSortHelper(arr, lo, i - 1, sortedIndices);
    yield* quickSortHelper(arr, i + 1, hi, sortedIndices);
}
