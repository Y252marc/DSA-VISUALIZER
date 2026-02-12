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
} from "lucide-react";
import type { AlgoItem } from "@/lib/registry";
import CodePanel from "@/components/CodePanel";

// ---------------------------------------------------------------------------
// Constants & Types
// ---------------------------------------------------------------------------

const BUBBLE_SORT_CODE = `procedure bubbleSort(A: list of sortable items)
  n := length(A)
  repeat
    swapped := false
    for i := 1 to n-1 inclusive do
      if A[i-1] > A[i] then
        swap(A[i-1], A[i])
        swapped := true
      end if
    end for
    n := n - 1
  until not swapped
end procedure`;

interface SortStep {
    array: number[];
    comparing: [number, number] | null;
    swapped: [number, number] | null;
    sorted: number[];
    description: string;
    codeLine?: number; // 1-indexed
}

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

// ---------------------------------------------------------------------------
// Generator
// ---------------------------------------------------------------------------

function* bubbleSortGenerator(input: number[]): Generator<SortStep> {
    const arr = [...input];
    const n = arr.length;
    const sorted: number[] = [];

    yield {
        array: [...arr],
        comparing: null,
        swapped: null,
        sorted: [],
        description: `Starting Bubble Sort on ${n} elements`,
        codeLine: 1,
    };

    let len = n;
    let swapped;

    do {
        swapped = false;
        yield {
            array: [...arr],
            comparing: null,
            swapped: null,
            sorted: [...sorted],
            description: `Pass started. n = ${len}`,
            codeLine: 4,
        };

        for (let i = 1; i < len; i++) {
            yield {
                array: [...arr],
                comparing: [i - 1, i],
                swapped: null,
                sorted: [...sorted],
                description: `Comparing ${arr[i - 1]} and ${arr[i]}`,
                codeLine: 6,
            };

            if (arr[i - 1] > arr[i]) {
                [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
                swapped = true;

                yield {
                    array: [...arr],
                    comparing: null,
                    swapped: [i - 1, i],
                    sorted: [...sorted],
                    description: `Swapped ${arr[i]} and ${arr[i - 1]}`,
                    codeLine: 7,
                };

                yield {
                    array: [...arr],
                    comparing: null,
                    swapped: null,
                    sorted: [...sorted],
                    description: "Swapped marked true",
                    codeLine: 8,
                }
            }
        }

        len--;
        sorted.push(len);

        yield {
            array: [...arr],
            comparing: null,
            swapped: null,
            sorted: [...sorted],
            description: `Pass complete. n reduced to ${len}`,
            codeLine: 11,
        };

    } while (swapped);

    const allIndices = Array.from({ length: n }, (_, i) => i);

    yield {
        array: [...arr],
        comparing: null,
        swapped: null,
        sorted: allIndices,
        description: "Sorting complete.",
        codeLine: 13,
    };
}

function generateRandomArray(size: number): number[] {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 95) + 5);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ArrayEngine({ algo }: { algo: AlgoItem }) {
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
            generatorRef.current = bubbleSortGenerator(arr);
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
        []
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
        const newArr = generateRandomArray(arraySize);
        setBaseArray(newArr);
        initGenerator(newArr);
    }, [arraySize, initGenerator]);

    const handleSizeChange = useCallback(
        (newSize: number) => {
            setArraySize(newSize);
            setIsPlaying(false);
            if (intervalRef.current) clearInterval(intervalRef.current);
            const newArr = generateRandomArray(newSize);
            setBaseArray(newArr);
            initGenerator(newArr);
        },
        [initGenerator]
    );

    useEffect(() => {
        initGenerator(baseArray);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const maxVal = Math.max(...currentStep.array, 1);

    // INDUSTRIAL COLORS
    const getBarColor = (index: number) => {
        if (currentStep.sorted.includes(index)) return "#10b981"; // Green-500
        if (
            currentStep.swapped &&
            (index === currentStep.swapped[0] || index === currentStep.swapped[1])
        )
            return "#facc15"; // Yellow-400 (Active Neon)
        if (
            currentStep.comparing &&
            (index === currentStep.comparing[0] ||
                index === currentStep.comparing[1])
        )
            return "#f59e0b"; // Amber-500
        return "#2563eb"; // Blue-600 (Terminal Blue)
    };

    return (
        <div className="flex flex-col h-[calc(100vh-140px)] gap-1">
            {/* Top Section: Visualization */}
            <div className="flex-1 flex flex-col space-y-1 min-h-0">
                {/* Controls - Size/Speed Row - UPDATED to py-4 or py-6 as requested */}
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
                                max={64}
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
                    <div className="absolute top-8 left-8 z-10 flex flex-col gap-1 pointer-events-none">
                        <span className="text-sm font-mono text-slate-400">
                            {">"} {currentStep.description}
                        </span>
                    </div>

                    <div className="absolute bottom-8 right-8 z-20 bg-slate-950/90 backdrop-blur px-4 py-2 border border-slate-800 flex items-center gap-6 text-xs pointer-events-none rounded-sm">
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-[#f59e0b]" />
                            <span className="text-slate-300 font-medium">COMPARE</span>
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-[#facc15]" />
                            <span className="text-slate-300 font-medium">SWAP</span>
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-[#10b981]" />
                            <span className="text-slate-300 font-medium">SORTED</span>
                        </span>
                    </div>

                    <div className="flex items-end gap-[2px] justify-center w-full h-full relative z-0">
                        {currentStep.array.map((value, index) => {
                            const heightPercent = Math.min((value / maxVal) * 100, 90);

                            return (
                                <motion.div
                                    key={index}
                                    className="relative flex-1 mx-[1px] min-w-[4px] max-w-[60px] z-10"
                                    style={{
                                        backgroundColor: getBarColor(index),
                                    }}
                                    animate={{
                                        height: `${heightPercent}%`,
                                    }}
                                    transition={{
                                        duration: 0.1,
                                    }}
                                >
                                    {/* Label Frame */}
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none whitespace-nowrap">
                                        <span className="text-xs font-bold text-white block drop-shadow-md">
                                            {value}
                                        </span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Code Panel Split */}
            <div className="grid grid-cols-2 gap-1 h-[240px] shrink-0">
                <CodePanel
                    code={BUBBLE_SORT_CODE}
                    activeLine={currentStep.codeLine || null}
                    language="python"
                />

                <div className="border border-slate-800 bg-slate-950 flex flex-col">
                    <div className="px-6 py-4 border-b border-slate-800 bg-slate-900">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">
                            Algorithm Logic
                        </span>
                    </div>
                    {/* Logic Box - p-6 leading-loose */}
                    <div className="p-6 overflow-y-auto">
                        <p className="text-sm text-slate-400 leading-loose font-mono">
                            {algo.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
