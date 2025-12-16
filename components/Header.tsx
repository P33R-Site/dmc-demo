"use client";

import { Menu, User } from "lucide-react";
import Link from "next/link";

export default function Header() {
    return (
        <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
            <div
                className="w-full max-w-4xl border rounded-full px-6 py-3 border-white/10"
                style={{
                    background:
                        "linear-gradient(180deg, rgba(14,16,26,0.55), rgba(14,16,26,0.35)) padding-box, linear-gradient(120deg, rgba(255,255,255,0.35), rgba(255,255,255,0.08)) border-box",
                    border: "1px solid transparent",
                    backdropFilter: "blur(16px) saturate(120%)",
                    WebkitBackdropFilter: "blur(16px) saturate(120%)",
                    boxShadow:
                        "0 10px 30px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04)",
                }}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-amber-600 rounded-lg flex items-center justify-center text-black font-bold text-xs shadow-lg shadow-orange-500/20">
                                <span className="transform -rotate-12">P</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold tracking-tight text-white/90 leading-none">
                                    PRIVÉ
                                </span>
                                <span className="text-[10px] text-zinc-400 uppercase tracking-widest hidden sm:block">
                                    International
                                </span>
                            </div>
                        </div>
                    </div>

                    <ul className="hidden md:flex items-center gap-1 text-sm font-medium text-white/60">
                        <li>
                            <Link
                                href="#"
                                className="transition-colors duration-300 rounded-full py-2 px-4 hover:text-white hover:bg-white/5 block"
                            >
                                Destinations
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className="transition-colors duration-300 hover:text-white hover:bg-white/5 rounded-full py-2 px-4 block"
                            >
                                Segments
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className="transition-colors duration-300 rounded-full py-2 px-4 hover:text-white hover:bg-white/5 block"
                            >
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className="transition-colors duration-300 rounded-full py-2 px-4 hover:text-white hover:bg-white/5 block"
                            >
                                Blog
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className="transition-colors duration-300 rounded-full py-2 px-4 hover:text-white hover:bg-white/5 block"
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>

                    <div className="flex items-center gap-1.5 md:gap-2">
                        <button
                            className="inline-flex md:hidden p-2 rounded-full transition-all duration-300 border hover:bg-white/5 border-white/5 cursor-pointer"
                            style={{ background: "rgba(255, 255, 255, 0.02)" }}
                            aria-label="Menu"
                        >
                            <Menu className="w-5 h-5 text-white/70 stroke-[1.5]" />
                        </button>
                        <button
                            className="hidden md:inline-flex p-2 rounded-full transition-all duration-300 border hover:bg-white/5 border-white/5 cursor-pointer"
                            style={{ background: "rgba(255, 255, 255, 0.02)" }}
                            aria-label="Account"
                        >
                            <User className="w-4 h-4 text-white/60 stroke-[1.5]" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
