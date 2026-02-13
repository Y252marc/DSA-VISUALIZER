import React from "react";
import { AlgoItem } from "@/lib/registry";

interface AlgoTheoryPaneProps {
    algo: AlgoItem;
}

export default function AlgoTheoryPane({ algo }: AlgoTheoryPaneProps) {
    if (!algo.theory) {
        return (
            <div className="p-6">
                <p className="text-sm text-slate-400 leading-loose font-mono">
                    {algo.description}
                </p>
            </div>
        );
    }

    const { definition, complexity, pros, cons } = algo.theory;

    return (
        <div className="h-full overflow-y-auto custom-scrollbar">
            {/* Definition Section */}
            <div className="p-6 border-b border-slate-800">
                <h3 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-3">Definition</h3>
                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                    {definition}
                </p>
            </div>

            {/* Complexity Grid */}
            <div className="p-6 border-b border-slate-800 bg-slate-900/30">
                <h3 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-4">Complexity Analysis</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-950 border border-slate-800 p-3 rounded-sm">
                        <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">Time (Avg)</div>
                        <div className="text-blue-400 font-mono text-sm">{complexity.time}</div>
                    </div>
                    <div className="bg-slate-950 border border-slate-800 p-3 rounded-sm">
                        <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">Space</div>
                        <div className="text-purple-400 font-mono text-sm">{complexity.space}</div>
                    </div>
                    <div className="bg-slate-950 border border-slate-800 p-3 rounded-sm">
                        <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">Best Case</div>
                        <div className="text-green-400 font-mono text-sm">{complexity.best}</div>
                    </div>
                    <div className="bg-slate-950 border border-slate-800 p-3 rounded-sm">
                        <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">Worst Case</div>
                        <div className="text-red-400 font-mono text-sm">{complexity.worst}</div>
                    </div>
                </div>
            </div>

            {/* Pros & Cons */}
            <div className="p-6 grid grid-cols-1 gap-6">
                <div>
                    <h3 className="text-xs uppercase tracking-widest text-green-500/80 font-bold mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Pros
                    </h3>
                    <ul className="space-y-2">
                        {pros.map((pro: string, idx: number) => (
                            <li key={idx} className="text-xs text-slate-400 flex gap-2 items-start">
                                <span className="text-slate-600 mt-0.5">•</span>
                                <span>{pro}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="text-xs uppercase tracking-widest text-red-500/80 font-bold mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Cons
                    </h3>
                    <ul className="space-y-2">
                        {cons.map((con: string, idx: number) => (
                            <li key={idx} className="text-xs text-slate-400 flex gap-2 items-start">
                                <span className="text-slate-600 mt-0.5">•</span>
                                <span>{con}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
