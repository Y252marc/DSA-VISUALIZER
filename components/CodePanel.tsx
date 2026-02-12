import { useMemo, useState } from "react";
import { Terminal, Copy, Check } from "lucide-react";

interface CodePanelProps {
    code: string;
    activeLine: number | null; // 1-indexed
    language?: string;
}

const KEYWORDS = new Set([
    "procedure",
    "end",
    "repeat",
    "until",
    "for",
    "to",
    "do",
    "if",
    "then",
    "else",
    "return",
    "inclusive",
    "not",
]);

const FUNCTIONS = new Set(["swap", "length", "print"]);

const SyntaxHighlighter = ({ text }: { text: string }) => {
    const parts = text.split(/([a-zA-Z0-9_]+)/g);

    return (
        <span>
            {parts.map((part, i) => {
                if (KEYWORDS.has(part)) {
                    return (
                        <span key={i} className="text-pink-500 font-bold">
                            {part}
                        </span>
                    );
                }
                if (FUNCTIONS.has(part)) {
                    return (
                        <span key={i} className="text-blue-400">
                            {part}
                        </span>
                    );
                }
                if (/^\d+$/.test(part)) {
                    return <span key={i} className="text-orange-400">{part}</span>;
                }
                return <span key={i} className="text-slate-300">{part}</span>;
            })}
        </span>
    );
};

export default function CodePanel({
    code,
    activeLine,
    language = "text",
}: CodePanelProps) {
    const lines = useMemo(() => code.split("\n"), [code]);
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy code", err);
        }
    };

    return (
        <div className="border border-slate-800 rounded-sm bg-slate-950 overflow-hidden flex flex-col h-full min-h-[200px] shadow-none relative group">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900 shrink-0">
                <div className="flex items-center gap-3">
                    <Terminal size={14} className="text-slate-500" />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">
                        Code Execution
                    </span>
                </div>
                <button
                    onClick={handleCopy}
                    className="text-slate-500 hover:text-white transition-colors p-1.5 rounded hover:bg-slate-800 flex items-center gap-2"
                    title="Copy Code"
                >
                    <span className="text-[10px] font-mono uppercase tracking-wider">{copied ? "Copied" : "Copy"}</span>
                    {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                </button>
            </div>

            {/* Code Area - STRICT P-8 (2rem/32px) */}
            <div className="flex-1 overflow-auto p-8 font-mono text-xs bg-[#0f172a] leading-relaxed scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-700">
                <table className="w-full border-collapse">
                    <tbody>
                        {lines.map((line, index) => {
                            const lineNumber = index + 1;
                            const isActive = lineNumber === activeLine;
                            return (
                                <tr
                                    key={index}
                                    className={`${isActive
                                            ? "bg-blue-500/10 border-l-2 border-blue-500"
                                            : "border-l-2 border-transparent"
                                        } transition-colors duration-150`}
                                >
                                    <td className="w-8 pr-6 text-right select-none opacity-30 text-slate-400 align-top py-0.5">
                                        {lineNumber}
                                    </td>
                                    <td className="pl-2 whitespace-pre py-0.5 text-slate-300">
                                        <SyntaxHighlighter text={line} />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
