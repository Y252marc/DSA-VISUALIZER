import { SortStep } from "@/core/types";

export const insertionSortCode = `procedure insertionSort(A: list of sortable items)
  i := 1
  while i < length(A)
    key := A[i]
    j := i - 1
    while j >= 0 and A[j] > key
      A[j + 1] = A[j]
      j := j - 1
    end while
    A[j + 1] = key
    i := i + 1
  end while
end procedure`;

export function* insertionSort(input: number[]): Generator<SortStep> {
    const arr = [...input];
    const n = arr.length;
    // Initially, first element is considered sorted relative to itself
    const sorted: number[] = [0];

    yield {
        array: [...arr],
        sorted: [0],
        comparing: null,
        swapped: null,
        description: `Starting Insertion Sort. Element at 0 is sorted sublist.`,
        codeLine: 1,
    };

    for (let i = 1; i < n; i++) {
        const key = arr[i];
        let j = i - 1;

        yield {
            array: [...arr],
            sorted: [...sorted], // Visual trick: keep previous sorted visible?
            comparing: null,
            swapped: null,
            key: i, // Highlight key in Orange
            description: `Picked key ${key} at index ${i}`,
            lift: i, // LIFT ACTION
            codeLine: 4,
        };

        while (j >= 0 && arr[j] > key) {
            yield {
                array: [...arr],
                sorted: [...sorted],
                comparing: [j],
                swapped: null,
                key: j + 1, // Key is effectively at j+1 position conceptually but value at j is shifting
                description: `Compared ${arr[j]} > ${key}. Shifting ${arr[j]} right.`,
                codeLine: 6,
            };

            arr[j + 1] = arr[j]; // Shift
            // Can't show duplicate immediately without confusion, but let's show the shift

            yield {
                array: [...arr], // arr has duplicate value now at j and j+1
                sorted: [...sorted],
                comparing: null,
                swapped: null,
                overwrite: j + 1, // Show overwrite animation? Or just shift
                key: j, // The hole is essentially moving to j
                description: `Shifted ${arr[j]} to position ${j + 1}`,
                lift: j, // The KEY is conceptually moving, so we keep "lift" active on the hole or the key? 
                // Actually, in the visualizer, we want the KEY (value) to float. 
                // The key is currently overwritten in the array for logic, but for visuals we might need to track it differently.
                // Simple approach: The "Gap" is at j, but we want to show the val floating. 
                // Let's just lift the current 'j' index to show it's "above" the others.
                codeLine: 7,
            };

            j--;
        }

        arr[j + 1] = key;
        sorted.push(i); // Expand sorted region

        yield {
            array: [...arr],
            sorted: Array.from({ length: i + 1 }, (_, k) => k), // visual update
            comparing: null,
            swapped: null, // Insert isn't a swap, strict placement
            description: `Inserted key ${key} at position ${j + 1}`,
            codeLine: 10,
        };
    }

    yield {
        array: [...arr],
        sorted: Array.from({ length: n }, (_, k) => k),
        comparing: null,
        swapped: null,
        description: "Sorting complete",
        codeLine: 13,
    };
}
