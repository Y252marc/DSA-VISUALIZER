"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Play,
    Pause,
    SkipForward,
    RotateCcw,
    Shuffle,
    Gauge,
    Search,
    Dices,
} from "lucide-react";
import type { AlgoItem } from "@/lib/registry";
import { SearchStep } from "@/core/types";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SPEED_PRESETS = [
    { label: "0.25×", ms: 1200 },
    { label: "0.5×", ms: 600 },
    { label: "1×", ms: 300 },
    { label: "2×", ms: 150 },
    { label: "4×", ms: 60 },
];

const INITIAL_ARRAY = [
    64, 34, 25, 12, 22, 11, 90, 45, 33, 21, 56, 78, 89, 43, 67, 10
];

interface SearchEngineProps {
    algo: AlgoItem;
    algorithm: (arr: number[], target: number) => Generator<SearchStep>;
    code: string;
    onStepChange?: (codeLine: number | null) => void;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function SearchEngine({ algo, algorithm, code, onStepChange }: SearchEngineProps) {
    const [arraySize, setArraySize] = useState(16);
    const [baseArray, setBaseArray] = useState<number[]>(INITIAL_ARRAY);
    const [target, setTarget] = useState<number>(() => INITIAL_ARRAY[Math.floor(Math.random() * INITIAL_ARRAY.length)]);

    const [currentStep, setCurrentStep] = useState<SearchStep>({
        array: INITIAL_ARRAY,
        target,
        type: "init",
        description: "Ready. Press Play to start searching.",
    });
    const [stepIndex, setStepIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speedIdx, setSpeedIdx] = useState(2);
    const [isComplete, setIsComplete] = useState(false);

    const generatorRef = useRef<Generator<SearchStep> | null>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const initGenerator = useCallback(
        (arr: number[], t: number) => {
            generatorRef.current = algorithm(arr, t);
            setStepIndex(0);
            setIsComplete(false);
            setCurrentStep({
                array: arr,
                target: t,
                type: "init",
                description: "Ready. Press Play to start searching.",
            });
            onStepChange?.(null);
        },
        [algorithm, onStepChange]
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
        onStepChange?.(result.value.codeLine ?? null);
        setStepIndex((prev) => prev + 1);
        return true;
    }, [onStepChange]);

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
        initGenerator(baseArray, target);
    }, [baseArray, target, initGenerator]);

    const randomize = useCallback(() => {
        setIsPlaying(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
        const newArr = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 99) + 1);
        const newTarget = newArr[Math.floor(Math.random() * newArr.length)];
        setBaseArray(newArr);
        setTarget(newTarget);
        initGenerator(newArr, newTarget);
    }, [arraySize, initGenerator]);

    const randomizeTarget = useCallback(() => {
        setIsPlaying(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
        const newTarget = baseArray[Math.floor(Math.random() * baseArray.length)];
        setTarget(newTarget);
        initGenerator(baseArray, newTarget);
    }, [baseArray, initGenerator]);

    const handleTargetChange = useCallback((value: string) => {
        const num = parseInt(value);
        if (!isNaN(num) && num > 0) {
            setIsPlaying(false);
            if (intervalRef.current) clearInterval(intervalRef.current);
            setTarget(num);
            initGenerator(baseArray, num);
        }
    }, [baseArray, initGenerator]);

    useEffect(() => {
        initGenerator(baseArray, target);
    }, [algorithm]); // eslint-disable-line react-hooks/exhaustive-deps

    // Get the display array (may be sorted by binary search)
    const displayArray = currentStep.array;

    // ── Helper: Determine block color/style ──────────────
    const getBlockStyle = (index: number) => {
        const { type, index: stepIdx, rangeStart, rangeEnd } = currentStep;

        // Found
        if (type === "found" && stepIdx === index) {
            return {
                bg: "bg-green-500",
                border: "border-green-400",
                text: "text-white",
                opacity: "opacity-100",
                shadow: "shadow-[0_0_20px_rgba(34,197,94,0.5)]",
                scale: 1.1,
            };
        }

        // Currently scanning (Linear Search)
        if (type === "scan" && stepIdx === index) {
            return {
                bg: "bg-yellow-500",
                border: "border-yellow-400",
                text: "text-black",
                opacity: "opacity-100",
                shadow: "shadow-[0_0_16px_rgba(234,179,8,0.4)]",
                scale: 1.05,
            };
        }

        // Mid element (Binary Search)
        if (type === "mid" && stepIdx === index) {
            return {
                bg: "bg-purple-500",
                border: "border-purple-400",
                text: "text-white",
                opacity: "opacity-100",
                shadow: "shadow-[0_0_16px_rgba(168,85,247,0.4)]",
                scale: 1.05,
            };
        }

        // Outside range (Binary Search dimming)
        if ((type === "range" || type === "mid") && rangeStart !== undefined && rangeEnd !== undefined) {
            if (index < rangeStart || index > rangeEnd) {
                return {
                    bg: "bg-slate-800",
                    border: "border-slate-700",
                    text: "text-slate-600",
                    opacity: "opacity-30",
                    shadow: "",
                    scale: 0.95,
                };
            }
            // In range
            return {
                bg: "bg-blue-900/50",
                border: "border-blue-500/50",
                text: "text-blue-300",
                opacity: "opacity-100",
                shadow: "",
                scale: 1,
            };
        }

        // Not found state
        if (type === "not-found") {
            return {
                bg: "bg-red-900/30",
                border: "border-red-500/30",
                text: "text-red-400",
                opacity: "opacity-60",
                shadow: "",
                scale: 1,
            };
        }

        // Default
        return {
            bg: "bg-slate-800",
            border: "border-slate-700",
            text: "text-slate-300",
            opacity: "opacity-100",
            shadow: "",
            scale: 1,
        };
    };

    return (
        <div className="flex flex-col h-full">
            {/* ── CONTROLS ─────────────────────────────────────── */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50 shrink-0 flex-wrap gap-4">
                {/* Playback */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={togglePlay}
                        disabled={isComplete}
                        className="w-10 h-10 rounded-sm bg-blue-600 hover:bg-blue-500 disabled:opacity-30 text-white flex items-center justify-center transition-colors"
                        title={isPlaying ? "Pause" : "Play"}
                    >
                        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </button>
                    <button
                        onClick={() => { if (!isComplete) step(); }}
                        disabled={isComplete}
                        className="w-10 h-10 rounded-sm border border-slate-700 hover:bg-slate-800 disabled:opacity-30 text-slate-300 flex items-center justify-center transition-colors"
                        title="Step"
                    >
                        <SkipForward size={16} />
                    </button>
                    <button onClick={reset} className="w-10 h-10 rounded-sm border border-slate-700 hover:bg-slate-800 text-slate-300 flex items-center justify-center transition-colors" title="Reset">
                        <RotateCcw size={16} />
                    </button>
                    <button onClick={randomize} className="w-10 h-10 rounded-sm border border-slate-700 hover:bg-slate-800 text-slate-300 flex items-center justify-center transition-colors" title="Randomize">
                        <Shuffle size={16} />
                    </button>
                </div>

                {/* Speed */}
                <div className="flex items-center gap-3">
                    <Gauge size={14} className="text-slate-500" />
                    <div className="flex gap-1">
                        {SPEED_PRESETS.map((preset, i) => (
                            <button
                                key={i}
                                onClick={() => setSpeedIdx(i)}
                                className={`px-2.5 py-1 text-[10px] font-mono rounded-sm transition-colors ${i === speedIdx
                                    ? "bg-blue-600 text-white"
                                    : "text-slate-500 hover:text-white hover:bg-slate-800"
                                    }`}
                            >
                                {preset.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Size Slider */}
                <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Size</span>
                    <input
                        type="range"
                        min={4}
                        max={24}
                        value={arraySize}
                        onChange={(e) => {
                            const newSize = parseInt(e.target.value);
                            setArraySize(newSize);
                            const newArr = Array.from({ length: newSize }, () => Math.floor(Math.random() * 99) + 1);
                            const newTarget = newArr[Math.floor(Math.random() * newArr.length)];
                            setBaseArray(newArr);
                            setTarget(newTarget);
                            setIsPlaying(false);
                            if (intervalRef.current) clearInterval(intervalRef.current);
                            initGenerator(newArr, newTarget);
                        }}
                        className="w-24 accent-blue-500"
                    />
                    <span className="text-xs font-mono text-slate-400 w-6 text-right">{arraySize}</span>
                </div>
            </div>

            {/* ── TARGET INPUT ──────────────────────────────────── */}
            <div className="flex items-center justify-center gap-4 px-6 py-4 border-b border-slate-800 bg-slate-950 shrink-0">
                <Search size={18} className="text-blue-400" />
                <span className="text-sm font-mono text-slate-400 uppercase tracking-widest">Target:</span>
                <div className="relative">
                    <input
                        type="number"
                        value={target}
                        onChange={(e) => handleTargetChange(e.target.value)}
                        className="w-24 text-center text-2xl font-bold font-mono text-white bg-slate-900/80 border-2 border-blue-500/50 px-3 py-1.5 rounded-md focus:outline-none focus:border-blue-400 focus:shadow-[0_0_12px_rgba(59,130,246,0.3)] transition-all appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        min={1}
                        max={99}
                    />
                </div>
                <button
                    onClick={randomizeTarget}
                    className="p-2 rounded-md border border-slate-700 hover:bg-slate-800 hover:border-blue-500/50 text-slate-400 hover:text-blue-400 transition-all"
                    title="Randomize Target"
                >
                    <Dices size={16} />
                </button>
                <span className="text-xs font-mono text-slate-600 ml-2">
                    Step {stepIndex}
                </span>
            </div>

            {/* ── BLOCK CANVAS ──────────────────────────────────── */}
            <div className="flex-1 flex items-center justify-center px-6 py-8 overflow-auto">
                <div className="flex flex-wrap gap-3 justify-center items-center max-w-full">
                    {displayArray.map((value, index) => {
                        const style = getBlockStyle(index);
                        return (
                            <motion.div
                                key={`${index}-${value}`}
                                layout
                                animate={{
                                    scale: style.scale,
                                    opacity: style.opacity === "opacity-30" ? 0.3 : style.opacity === "opacity-60" ? 0.6 : 1,
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                className={`
                                    relative flex flex-col items-center justify-center
                                    w-14 h-14 rounded-lg border-2
                                    ${style.bg} ${style.border} ${style.shadow}
                                    transition-colors duration-200
                                `}
                            >
                                {/* Value */}
                                <span className={`text-lg font-bold font-mono ${style.text}`}>
                                    {value}
                                </span>
                                {/* Index */}
                                <span className="absolute -bottom-5 text-[9px] font-mono text-slate-600">
                                    [{index}]
                                </span>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* ── STATUS BAR ───────────────────────────────────── */}
            <div className="px-6 py-3 border-t border-slate-800 bg-slate-900/30 shrink-0">
                <p className={`text-sm font-mono truncate ${currentStep.type === "found"
                    ? "text-green-400"
                    : currentStep.type === "not-found"
                        ? "text-red-400"
                        : "text-slate-400"
                    }`}>
                    {currentStep.description}
                </p>
            </div>
        </div>
    );
}
