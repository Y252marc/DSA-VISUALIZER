"use client";

import React, { useState } from "react";
import type { AlgoTheory } from "@/lib/registry";
import { Copy, Check, Terminal } from "lucide-react";

interface TheorySectionProps {
    title: string;
    theory?: AlgoTheory;
    description: string;
}

// ---------------------------------------------------------------------------
// Simple Syntax Highlighter
// ---------------------------------------------------------------------------

const PY_KEYWORDS = new Set([
    "def", "return", "if", "else", "elif", "for", "while", "in", "range",
    "len", "and", "or", "not", "True", "False", "None", "break", "class",
]);

function HighlightedCode({ code }: { code: string }) {
    const lines = code.split("\n");
    return (
        <table className="w-full border-collapse">
            <tbody>
                {lines.map((line, i) => (
                    <tr key={i} className="border-l-2 border-transparent">
                        <td className="w-8 pr-6 text-right select-none opacity-30 text-slate-400 align-top py-0.5 text-xs font-mono">
                            {i + 1}
                        </td>
                        <td className="pl-2 whitespace-pre py-0.5 text-sm font-mono">
                            {line.split(/([a-zA-Z_]+|\s+|[^\sa-zA-Z_]+)/g).map((tok, j) => {
                                if (PY_KEYWORDS.has(tok)) return <span key={j} className="text-pink-500 font-bold">{tok}</span>;
                                if (/^#/.test(tok.trim()) || tok.startsWith("#")) return <span key={j} className="text-slate-500 italic">{tok}</span>;
                                if (/^\d+$/.test(tok)) return <span key={j} className="text-orange-400">{tok}</span>;
                                return <span key={j} className="text-slate-300">{tok}</span>;
                            })}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

// ---------------------------------------------------------------------------
// Markdown-lite: render **bold** and `code` in step text
// ---------------------------------------------------------------------------
function RichText({ text }: { text: string }) {
    const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
    return (
        <>
            {parts.map((part, i) => {
                if (part.startsWith("**") && part.endsWith("**")) {
                    return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
                }
                if (part.startsWith("`") && part.endsWith("`")) {
                    return <code key={i} className="text-blue-400 bg-slate-800 px-1.5 py-0.5 rounded text-[13px] font-mono">{part.slice(1, -1)}</code>;
                }
                return <span key={i}>{part}</span>;
            })}
        </>
    );
}

// ---------------------------------------------------------------------------
// Main Component — centering is controlled by the parent wrapper
// ---------------------------------------------------------------------------
export default function TheorySection({ title, theory, description }: TheorySectionProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async (code: string) => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy code", err);
        }
    };

    if (!theory) {
        return (
            <div>
                <h2 className="text-3xl font-bold text-white mb-6">
                    About {title}
                </h2>
                <p className="text-base text-slate-300 leading-relaxed">
                    {description}
                </p>
            </div>
        );
    }

    const { definition, steps, complexity, pros, cons, code } = theory;

    return (
        <div className="space-y-16">

            {/* ── Definition ───────────────────────────────────── */}
            <div>
                <h2 className="text-3xl font-bold text-white tracking-tight mb-6">
                    What is {title}?
                </h2>
                <p className="text-lg text-slate-300 leading-relaxed">
                    {definition}
                </p>
            </div>

            {/* ── Algorithm Steps ──────────────────────────────── */}
            {steps && steps.length > 0 && (
                <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight mb-8 flex items-center gap-3">
                        <span className="w-1 h-6 bg-blue-500 rounded-full" />
                        How It Works
                    </h2>
                    <ol className="space-y-5">
                        {steps.map((stepText, idx) => (
                            <li key={idx} className="flex gap-5">
                                <div className="shrink-0 w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 text-sm font-bold font-mono">
                                    {idx + 1}
                                </div>
                                <p className="text-[15px] text-slate-300 leading-relaxed pt-2">
                                    <RichText text={stepText} />
                                </p>
                            </li>
                        ))}
                    </ol>
                </div>
            )}

            {/* ── Complexity Analysis ──────────────────────────── */}
            <div>
                <h2 className="text-2xl font-bold text-white tracking-tight mb-8 flex items-center gap-3">
                    <span className="w-1 h-6 bg-purple-500 rounded-full" />
                    Complexity Analysis
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-md p-5">
                        <div className="text-[11px] text-slate-500 uppercase font-bold tracking-wider mb-2">Time (Avg)</div>
                        <div className="text-xl text-blue-400 font-mono font-bold">{complexity.time}</div>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 rounded-md p-5">
                        <div className="text-[11px] text-slate-500 uppercase font-bold tracking-wider mb-2">Space</div>
                        <div className="text-xl text-purple-400 font-mono font-bold">{complexity.space}</div>
                    </div>
                    {complexity.best && (
                        <div className="bg-slate-900 border border-slate-800 rounded-md p-5">
                            <div className="text-[11px] text-slate-500 uppercase font-bold tracking-wider mb-2">Best Case</div>
                            <div className="text-xl text-green-400 font-mono font-bold">{complexity.best}</div>
                        </div>
                    )}
                    {complexity.worst && (
                        <div className="bg-slate-900 border border-slate-800 rounded-md p-5">
                            <div className="text-[11px] text-slate-500 uppercase font-bold tracking-wider mb-2">Worst Case</div>
                            <div className="text-xl text-red-400 font-mono font-bold">{complexity.worst}</div>
                        </div>
                    )}
                </div>
                {complexity.analysis && (
                    <div className="bg-slate-900/50 border border-slate-800 rounded-md p-6">
                        <p className="text-sm text-slate-400 leading-relaxed">
                            {complexity.analysis}
                        </p>
                    </div>
                )}
            </div>

            {/* ── Pros & Cons ──────────────────────────────────── */}
            <div>
                <h2 className="text-2xl font-bold text-white tracking-tight mb-8 flex items-center gap-3">
                    <span className="w-1 h-6 bg-amber-500 rounded-full" />
                    Pros &amp; Cons
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Pros */}
                    <div className="bg-green-500/5 border border-green-500/20 rounded-md p-6">
                        <h3 className="text-sm uppercase tracking-widest text-green-400 font-bold mb-5 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500" />
                            Advantages
                        </h3>
                        <ul className="space-y-3">
                            {pros.map((pro, idx) => (
                                <li key={idx} className="text-sm text-slate-300 flex gap-3 items-start leading-relaxed">
                                    <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                                    <span>{pro}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Cons */}
                    <div className="bg-red-500/5 border border-red-500/20 rounded-md p-6">
                        <h3 className="text-sm uppercase tracking-widest text-red-400 font-bold mb-5 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500" />
                            Limitations
                        </h3>
                        <ul className="space-y-3">
                            {cons.map((con, idx) => (
                                <li key={idx} className="text-sm text-slate-300 flex gap-3 items-start leading-relaxed">
                                    <span className="text-red-500 mt-0.5 shrink-0">✗</span>
                                    <span>{con}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* ── Implementation Code ─────────────────────────── */}
            {code && (
                <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight mb-8 flex items-center gap-3">
                        <span className="w-1 h-6 bg-cyan-500 rounded-full" />
                        Python Implementation
                    </h2>
                    <div className="border border-slate-800 rounded-md bg-[#0f172a] overflow-hidden relative group">
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-3 border-b border-slate-800 bg-slate-900/80">
                            <div className="flex items-center gap-3">
                                <Terminal size={14} className="text-slate-500" />
                                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">
                                    Python
                                </span>
                            </div>
                            <button
                                onClick={() => handleCopy(code)}
                                className="text-slate-500 hover:text-white transition-colors p-1.5 rounded hover:bg-slate-800 flex items-center gap-2"
                                title="Copy Code"
                            >
                                <span className="text-[10px] font-mono uppercase tracking-wider">
                                    {copied ? "Copied" : "Copy"}
                                </span>
                                {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                            </button>
                        </div>
                        {/* Code Body */}
                        <div className="p-6 overflow-auto">
                            <HighlightedCode code={code} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
