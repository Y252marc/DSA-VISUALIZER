"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    return (
        <div className="flex h-full w-full gap-1 relative">
            {/* Desktop Sidebar - Sharp edges, tighter borders */}
            <div className="hidden md:flex h-full shrink-0 w-72">
                <Sidebar className="h-full rounded-sm border border-slate-800 bg-slate-950 shadow-none w-full" />
            </div>

            {/* Main Content - Sharp edges, gap-1 split */}
            <main className="flex-1 rounded-sm border border-slate-800 bg-slate-950 overflow-hidden relative flex flex-col shadow-none min-w-0">

                {/* Mobile Header - Sharp */}
                <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-950 shrink-0">
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/90">
                        DSA Visualizer
                    </span>
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="text-slate-400 hover:text-white transition-colors"
                    >
                        <Menu size={20} />
                    </button>
                </div>

                {/* Content Content - Scrollable */}
                <div className="flex-1 overflow-y-auto relative scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-700">
                    {children}
                </div>
            </main>

            {/* Mobile Drawer Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[100] md:hidden">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                    <div className="absolute top-0 bottom-0 left-0 w-72 bg-slate-950 border-r border-slate-800 shadow-2xl flex flex-col">
                        <div className="flex justify-end p-4">
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-slate-500 hover:text-white"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <Sidebar className="h-full border-none bg-transparent" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
