"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Play,
    Pause,
    SkipForward,
    RotateCcw,
    Shuffle,
    Gauge,
} from "lucide-react";
import type { AlgoItem } from "@/lib/registry";
import { TreeStep } from "@/core/types";

// ---------------------------------------------------------------------------
// Constants & Types
// ---------------------------------------------------------------------------

const SPEED_PRESETS = [
    { label: "0.25×", ms: 2000 }, // Slower for tree animations
    { label: "0.5×", ms: 1000 },
    { label: "1×", ms: 500 },
    { label: "2×", ms: 250 },
    { label: "4×", ms: 100 },
];

const INITIAL_ARRAY = [
    64, 34, 25, 12, 22, 11, 8, 45, 33, 21, 56, 4
];

interface TreeSortEngineProps {
    algo: AlgoItem;
    algorithm: (input: number[]) => Generator<TreeStep>;
    code: string;
}

interface TreeNode {
    id: string;
    parentId?: string;
    level: number;
    values: number[];
    status: "active" | "sorted" | "split" | "pivot";
    pivotIndex?: number; // Index in the node's array
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function TreeSortEngine({ algo, algorithm, code }: TreeSortEngineProps) {
    const [arraySize, setArraySize] = useState(12); // Default within range 4-16
    const [baseArray, setBaseArray] = useState<number[]>(INITIAL_ARRAY);

    // Tree State
    const [nodes, setNodes] = useState<TreeNode[]>([]);

    // Playback State
    const [currentStep, setCurrentStep] = useState<TreeStep | null>(null);
    const [stepIndex, setStepIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speedIdx, setSpeedIdx] = useState(2);
    const [isComplete, setIsComplete] = useState(false);

    const generatorRef = useRef<Generator<TreeStep> | null>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Initialize
    const initGenerator = useCallback(
        (arr: number[]) => {
            generatorRef.current = algorithm(arr);
            setStepIndex(0);
            setIsComplete(false);

            // Initial Node (Root)
            setNodes([{
                id: "root",
                level: 0,
                values: arr,
                status: "active"
            }]);

            setCurrentStep({
                type: "base",
                level: 0,
                description: "Ready",
            });
        },
        [algorithm]
    );

    // Step Logic
    const step = useCallback(() => {
        if (!generatorRef.current) return false;
        const result = generatorRef.current.next();

        if (result.done) {
            setIsComplete(true);
            setIsPlaying(false);
            return false;
        }

        const s = result.value;
        setCurrentStep(s);
        setStepIndex((prev) => prev + 1);

        // Update Tree State based on Step Type
        setNodes((prevNodes) => {
            const newNodes = [...prevNodes];

            if (s.type === "split") {
                // Merge Sort Split
                // Find parent node (usually the one at s.level matching the range, or explicitly tracked IDs)
                // For simplified visualizer, we might need explicit IDs in the generator or infer them.
                // Infer IS hard. Let's assume the generator passes IDs.

                if (s.nodeId && s.range) {
                    // Update parent status
                    const parentIdx = newNodes.findIndex(n => n.id === s.nodeId);
                    if (parentIdx !== -1) newNodes[parentIdx].status = "split";
                }

                // We rely on the generator to tell us what new nodes to create? 
                // actually, "split" usually implies creating children.
                // But the generator yields "split" meaning "I am splitting NODE X".
                // If the generator yields "partition" it provides left/right arrays.
            }
            else if (s.type === "partition") {
                // Quick Sort Partition
                if (s.nodeId && s.left && s.right) {
                    // Create Left and Right children
                    newNodes.push({
                        id: `${s.nodeId}-L`,
                        parentId: s.nodeId,
                        level: s.level + 1,
                        values: s.left,
                        status: "active"
                    });
                    newNodes.push({
                        id: `${s.nodeId}-R`,
                        parentId: s.nodeId,
                        level: s.level + 1,
                        values: s.right,
                        status: "active"
                    });
                }
            }
            else if (s.type === "merge") {
                // Merge Sort Merge
                // Update the node with Sorted Values
                if (s.nodeId && s.sortedValues) {
                    const nodeIdx = newNodes.findIndex(n => n.id === s.nodeId);
                    if (nodeIdx !== -1) {
                        newNodes[nodeIdx].values = s.sortedValues;
                        newNodes[nodeIdx].status = "sorted";
                    }
                    // Optionally remove children to clean up? Or keep them for history?
                    // User asked for "Children animate up". 
                    // If we hide children, it looks like they merged up.

                    // Remove children of this node
                    return newNodes.filter(n => n.parentId !== s.nodeId);
                }
            }
            else if (s.type === "pivot") {
                if (s.nodeId && s.index !== undefined) {
                    const nodeIdx = newNodes.findIndex(n => n.id === s.nodeId);
                    if (nodeIdx !== -1) {
                        newNodes[nodeIdx].pivotIndex = s.index;
                        newNodes[nodeIdx].status = "pivot";
                    }
                }
            }

            return newNodes;
        });

        return true;
    }, []);

    const togglePlay = useCallback(() => {
        if (isComplete) return;
        setIsPlaying((prev) => !prev);
    }, [isComplete]);

    useEffect(() => {
        if (isPlaying) {
            intervalRef.current = setInterval(() => {
                const continued = step();
                if (!continued && intervalRef.current) clearInterval(intervalRef.current);
            }, SPEED_PRESETS[speedIdx].ms);
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isPlaying, speedIdx, step]);

    const reset = useCallback(() => {
        setIsPlaying(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
        initGenerator(baseArray);
    }, [baseArray, initGenerator]);

    const randomize = useCallback(() => {
        setIsPlaying(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
        const newArr = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 50) + 1);
        setBaseArray(newArr);
        initGenerator(newArr);
    }, [arraySize, initGenerator]);

    useEffect(() => {
        initGenerator(baseArray);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [algo.id, algorithm]);

    // Group nodes by level
    const levels = Array.from(new Set(nodes.map(n => n.level))).sort((a, b) => a - b);

    return (
        <div className="flex flex-col h-[calc(100vh-140px)] gap-1">
            {/* Controls */}
            <div className="flex items-center justify-between border border-slate-800 bg-slate-950 px-6 py-4 shrink-0">
                {/* ... Standard Controls ... */}
                <div className="flex items-center gap-4">
                    <button onClick={togglePlay} disabled={isComplete} className="flex items-center justify-center w-10 h-10 rounded-sm border border-slate-700 bg-slate-900 text-white hover:border-slate-500 disabled:opacity-30 transition-colors">
                        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </button>
                    <button onClick={() => !isPlaying && step()} disabled={isComplete || isPlaying} className="flex items-center justify-center w-10 h-10 rounded-sm border border-slate-700 bg-slate-900 text-white hover:border-slate-500 disabled:opacity-30 transition-colors">
                        <SkipForward size={16} />
                    </button>
                    <button onClick={reset} className="flex items-center justify-center w-10 h-10 rounded-sm border border-slate-700 bg-slate-900 text-white hover:border-slate-500 transition-colors">
                        <RotateCcw size={16} />
                    </button>
                    <button onClick={randomize} className="flex items-center justify-center w-10 h-10 rounded-sm border border-slate-700 bg-slate-900 text-white hover:border-slate-500 transition-colors">
                        <Shuffle size={16} />
                    </button>
                    <div className="w-px h-8 bg-slate-800 mx-2" />
                    <div className="flex items-center gap-2">
                        <Gauge size={14} className="text-slate-500" />
                        {SPEED_PRESETS.map((preset, idx) => (
                            <button key={preset.label} onClick={() => setSpeedIdx(idx)} className={`px-2 py-1 rounded-sm text-xs border transition-colors ${idx === speedIdx ? "border-blue-600 text-white bg-blue-600/10" : "border-transparent text-slate-500 hover:text-slate-300"}`}>
                                {preset.label}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">
                            Size
                        </span>
                        <input
                            type="range"
                            min={4}
                            max={16} // Strict limit for trees
                            step={1}
                            value={arraySize}
                            onChange={(e) => {
                                const newSize = Number(e.target.value);
                                setArraySize(newSize);
                                setIsPlaying(false);
                                if (intervalRef.current) clearInterval(intervalRef.current);
                                const newArr = Array.from({ length: newSize }, () => Math.floor(Math.random() * 50) + 1);
                                setBaseArray(newArr);
                                initGenerator(newArr);
                            }}
                            className="w-24 h-1 accent-blue-600"
                        />
                        <span className="text-sm font-mono text-slate-300 w-6 text-right">
                            {arraySize}
                        </span>
                    </div>
                    <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">
                        Step <span className="text-white text-sm ml-1">{stepIndex}</span>
                    </div>
                </div>
            </div>

            {/* Tree Canvas */}
            <div className="flex-1 border border-slate-800 bg-slate-900 p-8 overflow-auto flex flex-col items-center gap-12 relative">
                {/* Absolute status text removed */}

                <AnimatePresence>
                    {levels.map(level => (
                        <div key={level} className="flex items-start gap-16 relative z-10 translate-x-[0px]">
                            {nodes.filter(n => n.level === level).map(node => (
                                <motion.div
                                    key={node.id}
                                    layoutId={node.id}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20, scale: 0.5 }}
                                    className={`
                                        flex flex-col items-center gap-2 
                                        p-4 rounded-lg 
                                        ${node.status === "sorted" ? "bg-green-500/10 border border-green-500/30" : "bg-slate-800/50 border border-slate-700"}
                                        p-2 transition-colors duration-500
                                    `}
                                >
                                    <span className="text-[10px] text-slate-500 font-mono">{node.id}</span>
                                    <div className="flex gap-1">
                                        {node.values.map((val, idx) => {
                                            const isPivot = node.status === "pivot" && node.pivotIndex === idx;
                                            return (
                                                <div
                                                    key={`${node.id}-${idx}`}
                                                    className={`
                                                        w-8 h-8 flex items-center justify-center rounded-sm text-xs font-bold
                                                        ${isPivot ? "bg-purple-600 text-white scale-110 shadow-lg z-10" : "bg-slate-700 text-white"}
                                                        ${node.status === "sorted" ? "bg-green-500 text-white" : ""}
                                                    `}
                                                >
                                                    {val}
                                                </div>
                                            )
                                        })}
                                    </div>
                                    {/* Connection Lines could be SVG overlaid, but for now simple structure is clear enough */}
                                </motion.div>
                            ))}
                        </div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Status Bar */}
            <div className="w-full py-3 px-6 bg-slate-950 border-t border-b border-slate-800 font-mono text-sm text-blue-400 shrink-0">
                {">"} {currentStep?.description || "Ready"}
            </div>
        </div>
    );
}
