"use client";

import { ArrowRight, Code2, ArrowUpRight, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full border-white/5 border-t pt-0 pb-0 relative mt-24">
            {/* Newsletter Pill */}
            <div className="absolute top-0 left-0 right-0 flex -translate-y-1/2 z-30 justify-center px-6">
                <div className="bg-[#0A0A0A] border border-white/10 rounded-full py-3 pl-6 pr-2 flex items-center gap-4 shadow-2xl max-w-md w-full group hover:border-orange-500/50 transition-colors">
                    <input
                        type="text"
                        placeholder="Subscribe to our newsletter..."
                        className="bg-transparent border-none outline-none text-white text-sm w-full placeholder:text-neutral-600 font-mono focus:ring-0"
                    />
                    <button className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors shrink-0 cursor-pointer">
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="overflow-hidden bg-[#050505] pt-20">
                <div className="w-full px-6 lg:px-12 py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-20">
                    {/* Left */}
                    <div className="lg:col-span-7">
                        <h2 className="text-5xl lg:text-[6rem] leading-[0.9] font-medium text-white tracking-tighter mb-10 font-display">
                            Global.
                            <span className="text-neutral-700">Local.</span>
                            Personal.
                        </h2>

                        <div className="flex flex-wrap gap-8 opacity-60 hover:opacity-100 transition-opacity duration-500 mb-12">
                            <div className="flex gap-4">
                                <Link
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all text-zinc-400"
                                >
                                    <Facebook className="w-4 h-4" />
                                </Link>
                                <Link
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all text-zinc-400"
                                >
                                    <Twitter className="w-4 h-4" />
                                </Link>
                                <Link
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all text-zinc-400"
                                >
                                    <Instagram className="w-4 h-4" />
                                </Link>
                                <Link
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all text-zinc-400"
                                >
                                    <Linkedin className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>


                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm text-zinc-500">
                            <div>
                                <h4 className="text-white font-bold mb-4">Quick Links</h4>
                                <ul className="space-y-2">
                                    {["Home", "About Us", "Segments", "Blogs", "Contact"].map(link => (
                                        <li key={link}><Link href="#" className="hover:text-orange-500 transition-colors">{link}</Link></li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-white font-bold mb-4">Legal</h4>
                                <ul className="space-y-2">
                                    {["Legal Notice", "Privacy Policy", "Terms & Conditions", "Code of Conduct"].map(link => (
                                        <li key={link}><Link href="#" className="hover:text-orange-500 transition-colors">{link}</Link></li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-white font-bold mb-4">Contact</h4>
                                <address className="not-italic leading-relaxed">
                                    Privé Germany GmbH<br />
                                    F.W. Raiffeisenstrasse 15061<br />
                                    Elsbethen, Salzburg Austria
                                </address>
                            </div>
                        </div>
                    </div>

                    {/* Right (Orange Card) */}
                    <div className="lg:col-span-5 flex lg:justify-end items-center">
                        <div className="w-full max-w-sm bg-orange-500 p-8 relative overflow-hidden group transform hover:-translate-y-2 transition-transform duration-500 rounded-2xl">
                            <Code2 className="absolute -right-4 -top-4 text-black/10 w-32 h-32 rotate-12" />

                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold text-black mb-4 tracking-tight font-display">Plan Your Next Event</h3>
                                <p className="text-black/70 text-sm font-medium leading-relaxed mb-8">
                                    Connect with our local experts worldwide to create unforgettable experiences.
                                </p>
                                <div className="flex items-center justify-between border-t border-black/10 pt-4">
                                    <span className="text-xs font-bold uppercase tracking-widest text-black">Global Reach</span>
                                    <ArrowUpRight className="w-5 h-5 text-black" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Watermark */}
                <div className="relative w-full overflow-hidden pointer-events-none select-none pt-12">
                    <h1 className="text-[15vw] leading-none font-bold text-white/5 text-center -mb-12 tracking-tighter font-display">
                        PRIVÉ
                    </h1>
                    <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#050505] to-transparent"></div>
                </div>

                <div className="absolute bottom-6 w-full flex justify-center z-30">
                    <p className="text-[10px] text-neutral-700 font-mono uppercase tracking-widest">
                        Powered by <span className="text-neutral-500 font-bold">CREATORS NETWORK</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
