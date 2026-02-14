import MainLayout from "@/components/MainLayout";
import { REGISTRY, getCategories } from "@/lib/registry";
import { Activity, FileText, Database, Layers } from "lucide-react";

export default function HomePage() {
    const categories = getCategories();
    const activeCount = REGISTRY.filter((a) => a.status === "active").length;
    const blueprintCount = REGISTRY.filter((a) => a.status === "blueprint").length;

    return (
        <MainLayout>
            <div className="bg-slate-950 min-h-screen pb-32 px-4 selection:bg-blue-500/30 text-slate-400">
                {/* ── HEADER SPACER ────────────────────── */}
                <div className="h-14 w-full" aria-hidden="true" />

                <div className="p-8 max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="mb-10">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] mb-2">
                            System Overview
                        </p>
                        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-3">
                            Algorithm Blueprint Engine
                        </h1>
                        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
                            A data-driven platform for exploring data structures and algorithms.
                            Each algorithm is documented as a technical specification with
                            complexity analysis. Active modules include interactive step-by-step
                            visualizers.
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-4 gap-3 mb-10">
                        {[
                            {
                                label: "Total Algorithms",
                                value: REGISTRY.length,
                                icon: Database,
                                color: "var(--color-accent-blue)",
                            },
                            {
                                label: "Active Visualizers",
                                value: activeCount,
                                icon: Activity,
                                color: "var(--color-accent-green)",
                            },
                            {
                                label: "Blueprints",
                                value: blueprintCount,
                                icon: FileText,
                                color: "var(--color-text-muted)",
                            },
                            {
                                label: "Categories",
                                value: categories.length,
                                icon: Layers,
                                color: "var(--color-accent-purple)",
                            },
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                className="border border-[var(--color-border-primary)] rounded-md p-4 bg-[var(--color-bg-secondary)]"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <stat.icon size={16} style={{ color: stat.color }} />
                                    <span
                                        className="text-2xl font-bold"
                                        style={{ color: stat.color }}
                                    >
                                        {stat.value}
                                    </span>
                                </div>
                                <p className="text-[10px] uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Category Breakdown */}
                    <div className="mb-10">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] mb-4">
                            Registry Index
                        </p>
                        <div className="border border-[var(--color-border-primary)] rounded-md overflow-hidden">
                            <div className="grid grid-cols-[1fr_80px_80px] gap-0 text-[10px] uppercase tracking-[0.1em] text-[var(--color-text-muted)] bg-[var(--color-bg-tertiary)] px-4 py-2.5 border-b border-[var(--color-border-primary)]">
                                <span>Category</span>
                                <span className="text-right">Count</span>
                                <span className="text-right">Active</span>
                            </div>
                            {categories.map((cat) => {
                                const items = REGISTRY.filter((a) => a.category === cat);
                                const active = items.filter((a) => a.status === "active").length;
                                return (
                                    <div
                                        key={cat}
                                        className="grid grid-cols-[1fr_80px_80px] gap-0 px-4 py-2.5 border-b border-[var(--color-border-primary)] last:border-b-0 text-xs hover:bg-[var(--color-bg-tertiary)] transition-colors"
                                    >
                                        <span className="text-[var(--color-text-secondary)]">
                                            {cat}
                                        </span>
                                        <span className="text-right text-[var(--color-text-muted)]">
                                            {items.length}
                                        </span>
                                        <span
                                            className={`text-right ${active > 0
                                                ? "text-[var(--color-accent-green)]"
                                                : "text-[var(--color-text-muted)]"
                                                }`}
                                        >
                                            {active}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quick Access */}
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] mb-4">
                            Active Visualizers
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                            {REGISTRY.filter((a) => a.status === "active").map((algo) => (
                                <a
                                    key={algo.id}
                                    href={`/visualizer/${algo.id}`}
                                    className="border border-[var(--color-border-primary)] rounded-md p-4 bg-[var(--color-bg-secondary)] hover:border-[var(--color-accent-green)] transition-colors group"
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <Activity
                                            size={12}
                                            className="text-[var(--color-accent-green)]"
                                        />
                                        <span className="text-xs font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-green)] transition-colors">
                                            {algo.title}
                                        </span>
                                    </div>
                                    <p className="text-[10px] text-[var(--color-text-muted)] leading-relaxed">
                                        {algo.description.slice(0, 120)}...
                                    </p>
                                    <div className="flex gap-3 mt-3">
                                        <span className="text-[10px] text-[var(--color-text-muted)]">
                                            Time: {algo.complexity.time}
                                        </span>
                                        <span className="text-[10px] text-[var(--color-text-muted)]">
                                            Space: {algo.complexity.space}
                                        </span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
