import { SortStep } from "@/core/types";

export const bubbleSortCode = `procedure bubbleSort(A: list of sortable items)
  n := length(A)
  repeat
    swapped := false
    for i := 1 to n-1 inclusive do
      if A[i-1] > A[i] then
        swap(A[i-1], A[i])
        swapped := true
      end if
    end for
    n := n - 1
  until not swapped
end procedure`;

export function* bubbleSort(input: number[]): Generator<SortStep> {
    const arr = [...input];
    const n = arr.length;
    const sorted: number[] = [];

    yield {
        array: [...arr],
        comparing: null,
        swapped: null,
        sorted: [],
        description: `Starting Bubble Sort on ${n} elements`,
        codeLine: 1,
    };

    let len = n;
    let swapped;

    do {
        swapped = false;
        yield {
            array: [...arr],
            comparing: null,
            swapped: null,
            sorted: [...sorted],
            description: `Pass started. n = ${len}`,
            codeLine: 4,
        };

        for (let i = 1; i < len; i++) {
            yield {
                array: [...arr],
                comparing: [i - 1, i],
                swapped: null,
                sorted: [...sorted],
                description: `Comparing ${arr[i - 1]} and ${arr[i]}`,
                codeLine: 6,
            };

            if (arr[i - 1] > arr[i]) {
                [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
                swapped = true;

                yield {
                    array: [...arr],
                    comparing: null,
                    swapped: [i - 1, i],
                    sorted: [...sorted],
                    description: `Swapped ${arr[i]} and ${arr[i - 1]}`,
                    codeLine: 7,
                };

                yield {
                    array: [...arr],
                    comparing: null,
                    swapped: null,
                    sorted: [...sorted],
                    description: "Swapped marked true",
                    codeLine: 8,
                }
            }
        }

        len--;
        sorted.push(len);

        yield {
            array: [...arr],
            comparing: null,
            swapped: null,
            sorted: [...sorted],
            description: `Pass complete. n reduced to ${len}`,
            codeLine: 11,
        };

    } while (swapped);

    const allIndices = Array.from({ length: n }, (_, i) => i);

    yield {
        array: [...arr],
        comparing: null,
        swapped: null,
        sorted: allIndices,
        description: "Sorting complete.",
        codeLine: 13,
    };
}
