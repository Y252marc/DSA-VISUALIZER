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
    const pathname = usePathname();

    // Auto-open the category that contains the current page's algorithm
    const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(() => {
        const defaults: Record<string, boolean> = { Sorting: true };
        // Extract slug from /visualizer/[slug]
        const slug = pathname?.split("/visualizer/")?.[1];
        if (slug) {
            const match = REGISTRY.find((a) => a.id === slug);
            if (match) {
                defaults[match.category] = true;
            }
        }
        return defaults;
    });

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

    return (
        <aside className={`flex flex-col flex-shrink-0 z-50 overflow-hidden bg-slate-950 border-r border-slate-800 h-full ${className}`}>

            {/* Header - WRAPPED in px-8 pt-8 pb-4 */}
            <div className="px-8 pt-8 pb-4 flex-shrink-0">
                <Link href="/" className="block">
                    <h1 className="text-2xl font-black tracking-tighter text-white">
                        DSA VISUALIZER
                    </h1>
                    <p className="text-[10px] text-slate-500 tracking-wider uppercase font-semibold mt-2">
                        {activeCount} Active Modules
                    </p>
                </Link>
            </div>

            {/* Search - px-8 */}
            <div className="px-8 pb-6 flex-shrink-0">
                <div className="relative group">
                    <Search
                        size={14}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-hover:text-white transition-colors"
                    />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-sm px-3 pl-9 py-3 text-xs text-white/90 placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-all font-mono"
                    />
                </div>
            </div>

            {/* Navigation - px-4 wrapper for the list container */}
            <nav className="flex-1 overflow-y-auto min-h-0 px-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-800 pb-8">
                {Object.entries(grouped).map(([category, items]) => {
                    const isOpen = openCategories[category];

                    return (
                        <div key={category} className="mb-4">
                            {/* Category Header - pl-4 for alignment */}
                            <button
                                onClick={() => toggleCategory(category)}
                                className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-[0.15em] text-slate-400 hover:text-white transition-colors group mb-2 px-4 py-2"
                            >
                                <span className="flex items-center gap-2">
                                    <span className="opacity-50 group-hover:opacity-100">{CATEGORY_ICONS[category] || "•"}</span>
                                    <span>{category}</span>
                                </span>
                                {isOpen ? (
                                    <ChevronDown size={14} className="text-slate-600" />
                                ) : (
                                    <ChevronRight size={14} className="text-slate-600" />
                                )}
                            </button>

                            {/* Items - pl-4 py-2 per item */}
                            {isOpen && (
                                <div className="flex flex-col gap-0.5 border-l border-slate-800/50 ml-6">
                                    {items.map((algo) => {
                                        const isActive = pathname === `/visualizer/${algo.id}`;
                                        return (
                                            <Link
                                                key={algo.id}
                                                href={`/visualizer/${algo.id}`}
                                                // STRICT: pl-4 py-2 on the item itself
                                                className={`flex items-center gap-3 pl-4 pr-3 py-2 text-xs transition-colors rounded-r-sm ${isActive
                                                    ? "text-blue-400 bg-blue-500/10 font-semibold border-l-2 border-blue-500 -ml-px"
                                                    : "text-slate-500 hover:text-slate-300 hover:bg-slate-900 border-l-2 border-transparent -ml-px"
                                                    }`}
                                            >
                                                {algo.status === "active" ? (
                                                    <Activity size={12} className={isActive ? "text-blue-500" : "text-slate-600"} />
                                                ) : (
                                                    <FileText size={12} className="text-slate-700" />
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

            {/* Footer - px-8 */}
            <div className="flex-shrink-0 p-8 pt-4 mt-auto border-t border-slate-800/50">
                <div className="flex items-center justify-between">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
                    <span className="text-[10px] uppercase tracking-widest text-slate-600 font-mono">
                        System Online
                    </span>
                </div>
            </div>
        </aside>
    );
}
