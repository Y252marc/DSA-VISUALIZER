"use client";

import { useState, useCallback } from "react";
import type { AlgoItem } from "@/lib/registry";
import ArrayEngine from "@/components/visualizers/ArrayEngine";
import TreeSortEngine from "@/components/visualizers/TreeSortEngine";
import SearchEngine from "@/components/visualizers/SearchEngine";
import CodePanel from "@/components/CodePanel";
import TheorySection from "@/components/TheorySection";

import {
    bubbleSort, bubbleSortCode,
    selectionSort, selectionSortCode,
    insertionSort, insertionSortCode,
    mergeSort, mergeSortCode,
    quickSort, quickSortCode
} from "@/core/algorithms/sorting";
import {
    linearSearch, linearSearchCode,
    binarySearch, binarySearchCode
} from "@/core/algorithms/searching";

// ---------------------------------------------------------------------------
// Algorithm Lookup Map
// ---------------------------------------------------------------------------
const ALGO_LOGIC_MAP: Record<string, { gen: any, code: string }> = {
    "bubble-sort": { gen: bubbleSort, code: bubbleSortCode },
    "selection-sort": { gen: selectionSort, code: selectionSortCode },
    "insertion-sort": { gen: insertionSort, code: insertionSortCode },
    "merge-sort": { gen: mergeSort, code: mergeSortCode },
    "quick-sort": { gen: quickSort, code: quickSortCode },
    "linear-search": { gen: linearSearch, code: linearSearchCode },
    "binary-search": { gen: binarySearch, code: binarySearchCode },
};

// Engine Map
const ENGINE_MAP: Record<string, React.ComponentType<any>> = {
    "ArrayEngine": ArrayEngine,
    "TreeSortEngine": TreeSortEngine,
    "SearchEngine": SearchEngine,
};

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------
export default function InteractiveWorkspace({ algo }: { algo: AlgoItem }) {
    const LogicData = ALGO_LOGIC_MAP[algo.id];
    const Engine = ENGINE_MAP[algo.visualizer || "ArrayEngine"];

    // ── Code Sync State ──────────────────────────────────
    const [activeLine, setActiveLine] = useState<number | null>(null);

    const handleStepChange = useCallback((codeLine: number | null) => {
        setActiveLine(codeLine);
    }, []);

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
        <div className="bg-slate-950 min-h-screen pb-32 px-4">

            {/* ── HEADER SPACER (Force Gap) ────────────────────── */}
            <div className="h-14 w-full bg-slate-950" />

            {/* ── HEADER ───────────────────────────────────────── */}
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
                    <div className="hidden sm:flex gap-8 text-xs font-mono text-slate-500 uppercase tracking-widest border border-slate-800 px-6 py-4 rounded-sm bg-slate-900/50">
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

            {/* ── MAIN CONTENT WRAPPER ─────────────────────────── */}
            {/* Added pt-16 for ~1.5cm Top Gap between Header and Visualizer */}
            <main className="max-w-[1920px] mx-auto p-4 lg:p-6 space-y-8 pt-16">

                {/* 1. TOP SECTION: Visualizer + Code */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 h-auto lg:h-[65vh]">

                    {/* LEFT COLUMN — Visualizer Engine */}
                    <div className="relative flex flex-col h-[60vh] lg:h-full bg-slate-950 rounded-lg border border-slate-800 overflow-hidden">
                        <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
                            <Engine
                                algo={algo}
                                algorithm={LogicData.gen}
                                code={LogicData.code}
                                onStepChange={handleStepChange}
                            />
                        </div>
                    </div>

                    {/* RIGHT COLUMN — Code Panel (Synced) */}
                    <div className="h-[400px] lg:h-full bg-slate-950 rounded-lg border border-slate-800 overflow-hidden">
                        <CodePanel
                            code={LogicData.code}
                            activeLine={activeLine}
                            language="python"
                        />
                    </div>
                </div>

                {/* 2. MIDDLE SECTION: Theory */}
                {/* Centered with margin top */}
                <div className="w-full flex justify-center border-t border-slate-900 pt-12 mt-8">
                    <div className="w-full max-w-5xl mx-auto px-6">
                        {algo.theory ? (
                            <TheorySection
                                title={algo.title}
                                theory={algo.theory}
                                description={algo.description}
                            />
                        ) : (
                            <p className="text-slate-500 text-center">No theory data available.</p>
                        )}
                    </div>
                </div>

                {/* 3. BOTTOM SPACER (The 3cm Gap) */}
                {/* h-32 = 128px which is roughly 3.4cm */}
                <div className="h-32 w-full" aria-hidden="true" />
            </main>
        </div>
    );
}
