import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
    variable: "--font-jetbrains-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "DSA Visualizer",
    description: "A production-grade algorithm visualization tool.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${jetbrainsMono.variable} antialiased bg-black text-slate-200 h-screen w-screen overflow-hidden p-2`}
            >
                {children}
            </body>
        </html>
    );
}
