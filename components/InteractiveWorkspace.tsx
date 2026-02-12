"use client";

import type { AlgoItem } from "@/lib/registry";
import ArrayEngine from "@/components/visualizers/ArrayEngine";

export default function InteractiveWorkspace({ algo }: { algo: AlgoItem }) {

    // Route to the correct engine based on the algorithm
    const renderEngine = () => {
        switch (algo.id) {
            case "bubble-sort":
                return <ArrayEngine algo={algo} />;
            default:
                return (
                    <div className="p-8 text-center">
                        <p className="text-sm text-[var(--color-text-muted)]">
                            Visualizer engine not found for {algo.title}
                        </p>
                    </div>
                );
        }
    };

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
                {renderEngine()}
            </div>
        </div>
    );
}
