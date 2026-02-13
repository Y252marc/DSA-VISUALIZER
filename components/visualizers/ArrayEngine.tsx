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
    ScanLine,
} from "lucide-react";
import type { AlgoItem } from "@/lib/registry";
import { SortStep } from "@/core/types";

// ---------------------------------------------------------------------------
// Constants & Types
// ---------------------------------------------------------------------------

const SPEED_PRESETS = [
    { label: "0.25×", ms: 1000 },
    { label: "0.5×", ms: 500 },
    { label: "1×", ms: 250 },
    { label: "2×", ms: 125 },
    { label: "4×", ms: 50 },
];

const INITIAL_ARRAY = [
    64, 34, 25, 12, 22, 11, 90, 45, 33, 21, 56, 78, 89, 43, 67, 10, 5, 95, 23, 87, 44, 30, 99, 15
];

interface ArrayEngineProps {
    algo: AlgoItem;
    algorithm: (input: number[]) => Generator<SortStep>;
    code: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ArrayEngine({ algo, algorithm, code }: ArrayEngineProps) {
    const [arraySize, setArraySize] = useState(24);
    const [baseArray, setBaseArray] = useState<number[]>(INITIAL_ARRAY);

    const [currentStep, setCurrentStep] = useState<SortStep>({
        array: INITIAL_ARRAY,
        comparing: null,
        swapped: null,
        sorted: [],
        description: "Ready.",
        codeLine: undefined,
    });
    const [stepIndex, setStepIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speedIdx, setSpeedIdx] = useState(2);
    const [isComplete, setIsComplete] = useState(false);

    const generatorRef = useRef<Generator<SortStep> | null>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const initGenerator = useCallback(
        (arr: number[]) => {
            generatorRef.current = algorithm(arr);
            setStepIndex(0);
            setIsComplete(false);
            setCurrentStep({
                array: arr,
                comparing: null,
                swapped: null,
                sorted: [],
                description: "Ready.",
                codeLine: undefined,
            });
        },
        [algorithm]
    );

    const step = useCallback(() => {
        if (!generatorRef.current) return false;
        const result = generatorRef.current.next();
        if (result.done) {
            setIsComplete(true);
            setIsPlaying(false);
            return false;
        }
        setCurrentStep(result.value);
        setStepIndex((prev) => prev + 1);
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
                if (!continued) {
                    if (intervalRef.current) clearInterval(intervalRef.current);
                }
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
        const newArr = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 95) + 5);
        setBaseArray(newArr);
        initGenerator(newArr);
    }, [arraySize, initGenerator]);

    const handleSizeChange = useCallback(
        (newSize: number) => {
            setArraySize(newSize);
            setIsPlaying(false);
            if (intervalRef.current) clearInterval(intervalRef.current);
            const newArr = Array.from({ length: newSize }, () => Math.floor(Math.random() * 95) + 5);
            setBaseArray(newArr);
            initGenerator(newArr);
        },
        [initGenerator]
    );

    useEffect(() => {
        initGenerator(baseArray);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [algo.id, algorithm]);

    const maxVal = Math.max(...currentStep.array, 1);
    const mode = algo.visualMode || "bars";

    // -------------------------------------------------------------------------
    // RENDER HELPERS
    // -------------------------------------------------------------------------
    const getBarColor = (index: number) => {
        if (currentStep.overwrite === index) return "#ffffff"; // White Flash
        if (currentStep.key === index) return "#f97316"; // Orange (Insertion Key)
        if (currentStep.min === index) return "#ec4899"; // Pink (Selection Min)
        if (currentStep.pivot === index) return "#a855f7"; // Purple (Quick Pivot)
        if (currentStep.swapped && (index === currentStep.swapped[0] || index === currentStep.swapped[1])) return "#facc15"; // Yellow
        if (currentStep.comparing && currentStep.comparing.includes(index)) return "#f59e0b"; // Amber (Compare)
        if (currentStep.left === index) return "#06b6d4"; // Cyan
        if (currentStep.right === index) return "#facc15"; // Yellow
        if (currentStep.sorted.includes(index)) return "#10b981"; // Green

        // Range Highlight
        if (currentStep.range) {
            const [start, end] = currentStep.range;
            if (index >= start && index <= end) return "#3b82f6"; // Blue Active
        }

        return "#1e40af"; // Blue Inactive
    };

    // -------------------------------------------------------------------------
    // RENDERERS
    // -------------------------------------------------------------------------

    // Mode A: "The Split" (Blocks)
    const renderBlocks = () => {
        // Identify split points. For simplicity, if we have 'splits' in currentStep, we could augment margins?
        // Implementing true detailed recursive split visualization is complex. 
        // Strategy: Use margin-right on elements that are split points.

        const splitIndices = new Set(currentStep.splits || []);

        return (
            <div className="flex items-center justify-center gap-1 w-full h-full p-4 overflow-x-auto">
                <AnimatePresence>
                    {currentStep.array.map((value, index) => {
                        const color = getBarColor(index);
                        const isSplit = splitIndices.has(index);
                        const isPivot = currentStep.pivot === index;

                        return (
                            <motion.div
                                key={`${index}-${value}`} // Key by index-value to animate movements
                                layoutId={`block-${index}`}
                                className={`
                                    relative flex items-center justify-center 
                                    w-10 h-10 md:w-12 md:h-12 
                                    rounded-sm shadow-lg border-2 border-slate-700/50
                                    text-sm font-bold text-white
                                    ${isSplit ? "mr-8" : "mr-0"}
                                    transition-all duration-300
                                `}
                                style={{
                                    backgroundColor: color,
                                    borderColor: isPivot ? "#a855f7" : "rgba(51,65,85,0.5)",
                                    y: isPivot ? -20 : 0, // Detach pivot
                                }}
                            >
                                {value}
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        );
    }

    // Mode B: "The Lifter" (Bars with Lift) & Mode C "Scanner" (Standard Bars)
    const renderBars = () => {
        return (
            <div className="flex items-end gap-[2px] justify-center w-full h-full relative z-10 px-4">
                {currentStep.array.map((value, index) => {
                    const heightPercent = Math.min((value / maxVal) * 100, 90);
                    const color = getBarColor(index);
                    const isLifted = currentStep.lift === index;
                    const isMin = currentStep.min === index;

                    return (
                        <motion.div
                            key={index}
                            className="relative flex-1 mx-[1px] min-w-[4px] max-w-[60px] z-10 rounded-t-sm"
                            style={{
                                backgroundColor: color,
                            }}
                            animate={{
                                height: `${heightPercent}%`,
                                y: isLifted ? -30 : 0, // LIFT ACTION
                            }}
                            transition={{
                                duration: 0.15, // Smooth lift
                            }}
                        >
                            {/* Label Frame */}
                            {mode === "bars-scanner" && isMin && (
                                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
                                    <ScanLine size={16} className="text-pink-500 animate-pulse" />
                                </div>
                            )}

                            {/* Standard Top Label */}
                            <div className={`absolute -top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none whitespace-nowrap transition-opacity ${arraySize > 40 ? 'opacity-0' : 'opacity-100'}`}>
                                <span className={`text-[10px] font-bold block drop-shadow-md ${isLifted ? "text-orange-400 scale-125" : "text-white"}`}>
                                    {value}
                                </span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-1">
            {/* Top Section: Visualization */}
            <div className="flex-1 flex flex-col space-y-1 min-h-0">
                {/* Controls - Size/Speed Row */}
                <div className="flex items-center justify-between border border-slate-800 bg-slate-950 px-6 py-4 shrink-0">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={togglePlay}
                            disabled={isComplete}
                            className="flex items-center justify-center w-10 h-10 rounded-sm border border-slate-700 bg-slate-900 text-white hover:border-slate-500 disabled:opacity-30 transition-colors"
                        >
                            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                        </button>
                        <button
                            onClick={() => {
                                if (!isPlaying) step();
                            }}
                            disabled={isComplete || isPlaying}
                            className="flex items-center justify-center w-10 h-10 rounded-sm border border-slate-700 bg-slate-900 text-white hover:border-slate-500 disabled:opacity-30 transition-colors"
                        >
                            <SkipForward size={16} />
                        </button>
                        <button
                            onClick={reset}
                            className="flex items-center justify-center w-10 h-10 rounded-sm border border-slate-700 bg-slate-900 text-white hover:border-slate-500 transition-colors"
                        >
                            <RotateCcw size={16} />
                        </button>
                        <button
                            onClick={randomize}
                            className="flex items-center justify-center w-10 h-10 rounded-sm border border-slate-700 bg-slate-900 text-white hover:border-slate-500 transition-colors"
                        >
                            <Shuffle size={16} />
                        </button>
                        <div className="w-px h-8 bg-slate-800 mx-2" />
                        <div className="flex items-center gap-2">
                            <Gauge size={14} className="text-slate-500" />
                            {SPEED_PRESETS.map((preset, idx) => (
                                <button
                                    key={preset.label}
                                    onClick={() => setSpeedIdx(idx)}
                                    className={`px-2 py-1 rounded-sm text-xs border transition-colors ${idx === speedIdx
                                        ? "border-blue-600 text-white bg-blue-600/10"
                                        : "border-transparent text-slate-500 hover:text-slate-300"
                                        }`}
                                >
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
                                min={8}
                                max={60} // Limit for bars to prevent overcrowding
                                value={arraySize}
                                onChange={(e) => handleSizeChange(Number(e.target.value))}
                                className="w-32 h-1 accent-blue-600"
                            />
                            <span className="text-sm font-mono text-slate-300 w-8 text-right">
                                {arraySize}
                            </span>
                        </div>
                        <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">
                            Step <span className="text-white text-sm ml-1">{stepIndex}</span>
                        </div>
                    </div>
                </div>

                {/* Canvas - Fixed Height [60vh], Overflow Hidden */}
                <div className="border border-slate-800 bg-slate-900 p-8 relative flex flex-col justify-end overflow-hidden h-[60vh]">
                    {/* Range Highlight Background (Only for Bars mostly, could apply to blocks too) */}
                    {mode.startsWith("bars") && currentStep.range && (
                        <div
                            className="absolute bottom-0 top-0 bg-blue-500/5 border-x border-blue-500/20 transition-all duration-100 pointer-events-none z-0"
                            style={{
                                left: `calc(16px + (100% - 32px) * ${currentStep.range[0] / arraySize})`, // Adjusted checks
                                width: `calc((100% - 32px) * ${(currentStep.range[1] - currentStep.range[0] + 1) / arraySize})`
                            }}
                        />
                    )}

                    {/* Absolute status text removed - moved to dedicated bar */}

                    <div className="absolute bottom-8 right-8 z-20 bg-slate-950/90 backdrop-blur px-4 py-2 border border-slate-800 flex items-center gap-6 text-xs pointer-events-none rounded-sm">
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-[#f59e0b]" />
                            <span className="text-slate-300 font-medium">COMPARE</span>
                        </span>
                        <span className="flex items-center gap-2">
                            {mode === "bars-lift" ? (
                                <span className="w-2 h-2 bg-[#f97316]" />
                            ) : (
                                <span className="w-2 h-2 bg-[#facc15]" />
                            )}
                            <span className="text-slate-300 font-medium">{mode === "bars-lift" ? "INSERT" : "SWAP"}</span>
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-[#10b981]" />
                            <span className="text-slate-300 font-medium">SORTED</span>
                        </span>
                    </div>

                    {/* RENDERER SWITCH */}
                    {mode === "blocks-split" ? renderBlocks() : renderBars()}

                </div>
            </div>

            {/* Status Bar */}
            <div className="w-full py-3 px-6 bg-slate-950 border-t border-b border-slate-800 font-mono text-sm text-blue-400 shrink-0">
                {">"} {currentStep.description}
            </div>
        </div>
    );
}
