import { SortStep } from "@/core/types";

export const selectionSortCode = `procedure selectionSort(A: list of sortable items)
  n := length(A)
  for i := 0 to n - 2 do
    min_idx := i
    for j := i + 1 to n - 1 do
      if A[j] < A[min_idx] then
        min_idx := j
      end if
    end for
    if min_idx != i then
      swap(A[i], A[min_idx])
    end if
  end for
end procedure`;

export function* selectionSort(input: number[]): Generator<SortStep> {
    const arr = [...input];
    const n = arr.length;
    const sorted: number[] = [];

    yield {
        array: [...arr],
        sorted: [],
        comparing: null,
        swapped: null,
        description: `Starting Selection Sort on ${n} elements`,
        codeLine: 1,
    };

    for (let i = 0; i < n - 1; i++) {
        let min_idx = i;

        yield {
            array: [...arr],
            sorted: [...sorted],
            comparing: null,
            swapped: null,
            min: min_idx,
            description: `Pass ${i + 1}: Assuming minimum at index ${i}`,
            codeLine: 4,
        };

        for (let j = i + 1; j < n; j++) {
            yield {
                array: [...arr],
                sorted: [...sorted],
                comparing: [j], // Highlight scanner
                swapped: null,
                min: min_idx,   // Highlight current min
                description: `Checking if ${arr[j]} < ${arr[min_idx]}`,
                codeLine: 6,
            };

            if (arr[j] < arr[min_idx]) {
                min_idx = j;
                yield {
                    array: [...arr],
                    sorted: [...sorted],
                    comparing: [j],
                    swapped: null,
                    min: min_idx,
                    description: `New minimum found: ${arr[min_idx]} at index ${min_idx}`,
                    codeLine: 7,
                };
            }
        }

        if (min_idx !== i) {
            [arr[i], arr[min_idx]] = [arr[min_idx], arr[i]];
            yield {
                array: [...arr],
                sorted: [...sorted],
                comparing: null,
                swapped: [i, min_idx],
                min: min_idx,
                description: `Swapped minimum ${arr[i]} with ${arr[min_idx]}`,
                codeLine: 11,
            };
        }

        sorted.push(i);
        yield {
            array: [...arr],
            sorted: [...sorted],
            comparing: null,
            swapped: null,
            description: `Element ${arr[i]} is now sorted`,
            codeLine: 13,
        };
    }

    // Last element is naturally sorted
    sorted.push(n - 1);
    yield {
        array: [...arr],
        sorted: Array.from({ length: n }, (_, k) => k),
        comparing: null,
        swapped: null,
        description: "Sorting complete",
        codeLine: 14,
    };
}
