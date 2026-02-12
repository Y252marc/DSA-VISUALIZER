"use client";

import type { AlgoItem } from "@/lib/registry";
import ArrayEngine from "@/components/visualizers/ArrayEngine";
import {
    bubbleSort, bubbleSortCode,
    selectionSort, selectionSortCode,
    insertionSort, insertionSortCode,
    mergeSort, mergeSortCode,
    quickSort, quickSortCode
} from "@/core/algorithms/sorting";

// Algorithm Lookup Map
const ALGO_LOGIC_MAP: Record<string, { gen: any, code: string }> = {
    "bubble-sort": { gen: bubbleSort, code: bubbleSortCode },
    "selection-sort": { gen: selectionSort, code: selectionSortCode },
    "insertion-sort": { gen: insertionSort, code: insertionSortCode },
    "merge-sort": { gen: mergeSort, code: mergeSortCode },
    "quick-sort": { gen: quickSort, code: quickSortCode },
};

// Engine Map
const ENGINE_MAP: Record<string, React.ComponentType<any>> = {
    "ArrayEngine": ArrayEngine,
    // "GridEngine": GridEngine (Future)
};

export default function InteractiveWorkspace({ algo }: { algo: AlgoItem }) {
    // Determine the Logic and Engine
    const LogicData = ALGO_LOGIC_MAP[algo.id];

    // For now, sorting algorithms default to ArrayEngine if not specified, 
    // but typically algo.visualizer would define this. For now we assume ArrayEngine for sorting.
    // Let's deduce engine from category or just default to ArrayEngine for this visualizer.
    const Engine = ENGINE_MAP["ArrayEngine"];

    if (!Engine || !LogicData) {
        return (
            <div className="p-8 text-center">
                <p className="text-sm text-slate-500">
                    Visualizer engine or logic not found for {algo.title} ({algo.id})
                </p>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col overflow-hidden bg-slate-950">
            {/* Top Header Section - p-8 border-b border-slate-800 */}
            <div className="p-8 border-b border-slate-800 shrink-0 bg-slate-950 z-20 relative">
                <div className="flex items-end justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <span className="inline-block w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                            <span className="text-sm font-mono font-bold text-blue-400 tracking-wider uppercase">
                                Interactive Visualizer
                            </span>
                        </div>
                        <h1 className="text-4xl font-bold text-white tracking-tight">
                            {algo.title}
                        </h1>
                    </div>

                    {/* Complexity Stats */}
                    <div className="flex gap-8 text-xs font-mono text-slate-500 uppercase tracking-widest border border-slate-800 px-6 py-4 rounded-sm bg-slate-900/50">
                        <span className="flex gap-3">
                            <span className="text-slate-600 font-bold">Time</span>
                            <span className="text-slate-300">{algo.complexity.time}</span>
                        </span>
                        <span className="w-px h-full bg-slate-800" />
                        <span className="flex gap-3">
                            <span className="text-slate-600 font-bold">Space</span>
                            <span className="text-slate-300">{algo.complexity.space}</span>
                        </span>
                    </div>
                </div>
            </div>

            {/* Engine Mount - taking remaining height */}
            {/* WRAPPED in p-8 so bars don't touch sides */}
            <div className="flex-1 min-h-0 flex flex-col p-8 overflow-hidden bg-slate-950 relative z-10">
                <Engine
                    algo={algo}
                    algorithm={LogicData.gen}
                    code={LogicData.code}
                />
            </div>
        </div>
    );
}
