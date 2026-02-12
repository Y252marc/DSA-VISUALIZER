"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ChevronDown, ChevronRight, Activity, FileText } from "lucide-react";
import { REGISTRY, getCategories, searchAlgos } from "@/lib/registry";
import type { AlgoItem } from "@/lib/registry";

const CATEGORY_ICONS: Record<string, string> = {
    Sorting: "↕",
    Searching: "⊕",
    Arrays: "▦",
    "Linked Lists": "⟿",
    "Stacks & Queues": "☰",
    Trees: "⸙",
    Graphs: "◈",
    "Dynamic Programming": "◧",
    Backtracking: "↩",
    Greedy: "◆",
    Hashing: "#",
};

export default function Sidebar({ className = "" }: { className?: string }) {
    const [query, setQuery] = useState("");
    const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
        Sorting: true,
    });
    const pathname = usePathname();

    const categories = useMemo(() => getCategories(), []);

    const filtered = useMemo(() => {
        if (!query.trim()) return REGISTRY;
        return searchAlgos(query);
    }, [query]);

    const grouped = useMemo(() => {
        const map: Record<string, AlgoItem[]> = {};
        for (const cat of categories) {
            const items = filtered.filter((a) => a.category === cat);
            if (items.length > 0) map[cat] = items;
        }
        return map;
    }, [filtered, categories]);

    const toggleCategory = (cat: string) => {
        setOpenCategories((prev) => ({
            ...prev,
            [cat]: !prev[cat],
        }));
    };

    const activeCount = REGISTRY.filter((a) => a.status === "active").length;
    const totalCount = REGISTRY.length;

    return (
        <aside className={`flex flex-col flex-shrink-0 z-50 overflow-hidden ${className}`}>
            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-800 flex-shrink-0 bg-slate-950/50 backdrop-blur-sm">
                <Link href="/" className="block">
                    <h1 className="text-xs font-bold tracking-[0.2em] uppercase text-white/90">
                        DSA Visualizer
                    </h1>
                    <p className="text-[10px] text-slate-500 mt-1 tracking-wider">
                        {activeCount} active · {totalCount} blueprints
                    </p>
                </Link>
            </div>

            {/* Search */}
            <div className="px-5 py-3 border-b border-slate-800 flex-shrink-0 bg-slate-950">
                <div className="relative">
                    <Search
                        size={14}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                    />
                    <input
                        type="text"
                        placeholder="Search algorithms..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-sm px-3 pl-9 py-1.5 text-xs text-white/90 placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors"
                    />
                </div>
            </div>

            {/* Algorithm List */}
            <nav className="flex-1 overflow-y-auto py-2 scrollbar-thin scrollbar-track-slate-950 scrollbar-thumb-slate-800 bg-slate-950">
                {Object.entries(grouped).map(([category, items]) => {
                    const isOpen = openCategories[category];

                    return (
                        <div key={category} className="mb-1">
                            {/* Category Header */}
                            <button
                                onClick={() => toggleCategory(category)}
                                className="w-full flex items-center justify-between px-5 py-2 text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400 hover:text-slate-200 transition-colors group"
                            >
                                <span className="flex items-center gap-2">
                                    <span className="opacity-70 group-hover:opacity-100 transition-opacity">{CATEGORY_ICONS[category] || "•"}</span>
                                    <span>{category}</span>
                                    <span className="text-slate-600 font-medium ml-1">
                                        {items.length}
                                    </span>
                                </span>
                                {isOpen ? (
                                    <ChevronDown size={14} className="text-slate-600" />
                                ) : (
                                    <ChevronRight size={14} className="text-slate-600" />
                                )}
                            </button>

                            {/* Algorithm Items - Indentation pl-10 (2.5rem) */}
                            {isOpen && (
                                <div className="pb-2 pt-1 flex flex-col gap-0.5">
                                    {items.map((algo) => {
                                        const isActive =
                                            pathname === `/visualizer/${algo.id}`;
                                        return (
                                            <Link
                                                key={algo.id}
                                                href={`/visualizer/${algo.id}`}
                                                className={`flex items-center gap-2.5 pl-10 pr-4 py-1.5 text-xs border-l-2 transition-all ${isActive
                                                        ? "border-blue-600 bg-blue-600/10 text-white font-medium"
                                                        : "border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-900/30"
                                                    }`}
                                            >
                                                {algo.status === "active" ? (
                                                    <Activity
                                                        size={12}
                                                        className={`${isActive ? "text-blue-500" : "text-slate-600"} flex-shrink-0`}
                                                    />
                                                ) : (
                                                    <FileText
                                                        size={12}
                                                        className="text-slate-700 flex-shrink-0"
                                                    />
                                                )}
                                                <span className="truncate">{algo.title}</span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-slate-800 bg-slate-950 flex-shrink-0">
                <p className="text-[10px] text-slate-600">
                    v1.0.0 · Industrial
                </p>
            </div>
        </aside>
    );
}
