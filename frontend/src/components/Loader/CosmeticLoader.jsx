"use client"

import { useEffect, useState } from "react";

export default function CosmeticLoader({ isLoading = true, className = "" }) {
    if (!isLoading) return null;

    return (
        <div className={`w-full flex items-center justify-center ${className} transition-opacity duration-300`}>
            <div className="relative w-full flex justify-center">
                {/* Compact base */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-peach-100 to-peach-100 shadow-lg flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-peach-200 to-peach-200 flex items-center justify-center relative overflow-hidden">
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent shimmer"></div>

                        {/* Powder puff */}
                        <div className="powder-puff w-8 h-8 rounded-full bg-white/90 shadow-sm flex items-center justify-center">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-peach-300 to-peach-300 opacity-40"></div>
                        </div>
                    </div>
                </div>

                {/* Brand logo placeholder */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-500 tracking-wider uppercase">
                    Beauty
                </div>
            </div>

            <style jsx>{`
                .shimmer {
                    animation: shimmer 2s infinite;
                    transform: skewX(-20deg);
                }
                .powder-puff {
                    animation: puff 3s infinite ease-in-out;
                }
                @keyframes shimmer {
                    0% { transform: translateX(-100%) skewX(-20deg); }
                    100% { transform: translateX(100%) skewX(-20deg); }
                }
                @keyframes puff {
                    0%, 100% { transform: translateY(0) scale(1); opacity: 1; }
                    50% { transform: translateY(-5px) scale(0.95); opacity: 0.9; }
                }
            `}</style>
        </div>
    );
}
