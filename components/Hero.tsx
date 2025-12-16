"use client";

import { Compass } from "lucide-react";
import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 overflow-hidden">
            {/* Hero Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1500835556837-99ac94a94552?q=80&w=2000&auto=format&fit=crop"
                    alt="Travel Collage"
                    fill
                    className="object-cover opacity-40 mix-blend-overlay"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-[#050505]"></div>
            </div>

            {/* Decorative Globe Lines */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <svg
                    className="w-full h-full"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0 50 Q 50 0 100 50"
                        stroke="white"
                        strokeWidth="0.1"
                        fill="none"
                        strokeDasharray="1 1"
                    ></path>
                    <path
                        d="M0 60 Q 50 10 100 60"
                        stroke="white"
                        strokeWidth="0.1"
                        fill="none"
                        strokeDasharray="1 1"
                    ></path>
                    <circle cx="25" cy="20" r="0.5" fill="white" className="animate-pulse"></circle>
                    <circle
                        cx="75"
                        cy="30"
                        r="0.5"
                        fill="white"
                        className="animate-pulse"
                        style={{ animationDelay: "1s" }}
                    ></circle>
                </svg>
            </div>

            <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-10">
                {/* Year Watermark */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] font-bold text-white/[0.03] select-none pointer-events-none tracking-tighter">
                    2026
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tighter text-white mb-6 drop-shadow-2xl">
                    Privé International
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
                        Tourism Group
                    </span>
                </h1>

                <div className="flex justify-center mb-8">
                    <div className="bg-orange-500/90 text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(249,115,22,0.4)] backdrop-blur-md">
                        Think Global - Act Local
                    </div>
                </div>

                <p className="font-script text-3xl md:text-5xl text-zinc-300 transform -rotate-2 mb-12 text-shadow-sm">
                    Experience Travel with Privé <br />
                    <span className="text-white">Personal Touch Worldwide</span>
                </p>

                <button className="group relative px-8 py-3 bg-white text-black font-semibold rounded-full overflow-hidden transition-all hover:scale-105 cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span className="relative z-10 group-hover:text-white transition-colors flex items-center gap-2">
                        Explore Destinations <Compass className="w-4 h-4" />
                    </span>
                </button>
            </div>
        </section>
    );
}
