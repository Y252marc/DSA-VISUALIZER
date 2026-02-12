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
        <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="inline-block w-2 h-2 rounded-full bg-[var(--color-accent-green)]" />
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-accent-green)]">
                            Interactive Visualizer
                        </span>
                    </div>
                    <h1 className="text-xl font-bold text-[var(--color-text-primary)]">
                        {algo.title}
                    </h1>
                </div>
                <div className="flex gap-4 text-xs text-[var(--color-text-muted)]">
                    <span>Time: {algo.complexity.time}</span>
                    <span>Space: {algo.complexity.space}</span>
                </div>
            </div>

            {/* Engine Mount */}
            {renderEngine()}
        </div>
    );
}
