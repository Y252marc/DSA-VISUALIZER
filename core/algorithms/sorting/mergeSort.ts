import { SortStep } from "@/core/types";
import { secondsToMilliseconds } from "framer-motion";
import { button } from "framer-motion/client";
import { setReactDebugChannelForHtmlRequest } from "next/dist/server/dev/debug-channel";
import { ButtonHTMLAttributes } from "react";

export const mergeSortCode = `procedure mergeSort(A: list)
  if length(A) <= 1 then
    return A
  end if
  mid := length(A) / 2
  left := mergeSort(A[0..mid])
  right := mergeSort(A[mid..end])
  return merge(left, right)
end procedure

procedure merge(left, right)
  result := empty list
  while left and right not empty do
    if left[0] <= right[0] then
      append left[0] to result
      left := left[1..end]
    else
      append right[0] to result
      right := right[1..end]
    end if
  end while
  append remaining elements to result
  return result
end procedure`;

export function* mergeSort(input: number[]): Generator<SortStep> {
    let arr = [...input];
    const n = arr.length;

    yield {
        array: [...arr],
        sorted: [],
        comparing: null,
        swapped: null,
        description: "Starting Merge Sort",
        codeLine: 1,
    };

    // Iterative Merge Sort is easier to visualize in-place than recursive for step-by-step
    // but let's emulate the recursive structure visually
    yield* mergeSortRecursive(arr, 0, n - 1);

    yield {
        array: [...arr],
        sorted: Array.from({ length: n }, (_, i) => i),
        comparing: null,
        swapped: null,
        description: "Sorting complete",
        codeLine: 8,
    };
}

function* mergeSortRecursive(
    arr: number[],
    left: number,
    right: number
): Generator<SortStep> {
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);

    yield* mergeSortRecursive(arr, left, mid);
    yield* mergeSortRecursive(arr, mid + 1, right);

    yield* merge(arr, left, mid, right);
}

function* merge(
    arr: number[],
    left: number,
    mid: number,
    right: number
): Generator<SortStep> {

    yield {
        array: [...arr],
        sorted: [], // Sorting state is complex in merge sort, clear for clarity or track carefully?
        comparing: null,
        swapped: null,
        range: [left, right], // Highlight range in Faint Blue
        description: `Merging range [${left}, ${right}]`,
        codeLine: 11,
    };

    const n1 = mid - left + 1;
    const n2 = right - mid;

    const L = arr.slice(left, mid + 1);
    const R = arr.slice(mid + 1, right + 1);

    let i = 0, j = 0, k = left;

    while (i < n1 && j < n2) {
        yield {
            array: [...arr],
            sorted: [],
            comparing: [left + i, mid + 1 + j], // Comparing from sub-arrays (in-place indices approximation)
            range: [left, right],
            swapped: null,
            description: `Comparing L:${L[i]} vs R:${R[j]}`,
            codeLine: 14,
        };

        if (L[i] <= R[j]) {
            arr[k] = L[i];
            yield {
                array: [...arr],
                sorted: [],
                comparing: null,
                swapped: null,
                overwrite: k, // White flash
                range: [left, right],
                description: `Overwriting index ${k} with ${L[i]} (from Left)`,
                codeLine: 15,
            }
            i++;
        } else {
            arr[k] = R[j];
            yield {
                array: [...arr],
                sorted: [],
                comparing: null,
                swapped: null,
                overwrite: k, // White flash
                range: [left, right],
                description: `Overwriting index ${k} with ${R[j]} (from Right)`,
                codeLine: 18,
            }
            j++;
        }
        k++;
    }

    // Copy remaining
    while (i < n1) {
        arr[k] = L[i];
        yield {
            array: [...arr],
            sorted: [],
            comparing: null,
            swapped: null,
            overwrite: k,
            range: [left, right],
            description: `Copying remaining L:${L[i]} to index ${k}`,
            codeLine: 22,
        };
        i++;
        k++;
    }

    while (j < n2) {
        arr[k] = R[j];
        yield {
            array: [...arr],
            sorted: [],
            comparing: null,
            swapped: null,
            overwrite: k,
            range: [left, right],
            description: `Copying remaining R:${R[j]} to index ${k}`,
            codeLine: 22,
        };
        j++;
        k++;
    }
}
