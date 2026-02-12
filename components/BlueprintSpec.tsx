import type { AlgoItem } from "@/lib/registry";
import { Clock, HardDrive, Tag, Hash } from "lucide-react";

export default function BlueprintSpec({ algo }: { algo: AlgoItem }) {
    return (
        <div className="p-8 max-w-4xl">
            {/* Header Badge */}
            <div className="flex items-center gap-2 mb-6">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] border border-[var(--color-border-primary)] px-2 py-0.5 rounded">
                    Blueprint Specification
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                    ·
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-accent-amber)]">
                    Theory Only
                </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
                {algo.title}
            </h1>

            {/* Metadata Row */}
            <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
                    <Tag size={12} />
                    <span>{algo.category}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
                    <Hash size={12} />
                    <span className="font-mono">{algo.id}</span>
                </div>
            </div>

            {/* Complexity Grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
                <div className="border border-[var(--color-border-primary)] rounded-md p-4 bg-[var(--color-bg-secondary)]">
                    <div className="flex items-center gap-2 mb-2">
                        <Clock size={14} className="text-[var(--color-accent-blue)]" />
                        <span className="text-[10px] uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                            Time Complexity
                        </span>
                    </div>
                    <p className="text-lg font-bold text-[var(--color-accent-blue)]">
                        {algo.complexity.time}
                    </p>
                </div>
                <div className="border border-[var(--color-border-primary)] rounded-md p-4 bg-[var(--color-bg-secondary)]">
                    <div className="flex items-center gap-2 mb-2">
                        <HardDrive size={14} className="text-[var(--color-accent-purple)]" />
                        <span className="text-[10px] uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                            Space Complexity
                        </span>
                    </div>
                    <p className="text-lg font-bold text-[var(--color-accent-purple)]">
                        {algo.complexity.space}
                    </p>
                </div>
            </div>

            {/* Description */}
            <div className="border border-[var(--color-border-primary)] rounded-md bg-[var(--color-bg-secondary)]">
                <div className="px-4 py-2.5 border-b border-[var(--color-border-primary)] bg-[var(--color-bg-tertiary)]">
                    <span className="text-[10px] uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                        Technical Description
                    </span>
                </div>
                <div className="p-4">
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                        {algo.description}
                    </p>
                </div>
            </div>

            {/* Specification Table */}
            <div className="mt-6 border border-[var(--color-border-primary)] rounded-md overflow-hidden">
                <div className="px-4 py-2.5 border-b border-[var(--color-border-primary)] bg-[var(--color-bg-tertiary)]">
                    <span className="text-[10px] uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                        Specification Sheet
                    </span>
                </div>
                <div className="divide-y divide-[var(--color-border-primary)]">
                    {[
                        { label: "Identifier", value: algo.id },
                        { label: "Category", value: algo.category },
                        { label: "Status", value: "Blueprint (Theory Only)" },
                        { label: "Time", value: algo.complexity.time },
                        { label: "Space", value: algo.complexity.space },
                    ].map((row) => (
                        <div
                            key={row.label}
                            className="grid grid-cols-[140px_1fr] px-4 py-2.5 text-xs"
                        >
                            <span className="text-[var(--color-text-muted)] uppercase tracking-[0.1em] text-[10px]">
                                {row.label}
                            </span>
                            <span className="text-[var(--color-text-secondary)]">
                                {row.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
