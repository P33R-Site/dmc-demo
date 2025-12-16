"use client";

import {
    Lightbulb,
    Calendar,
    Globe,
    DollarSign,
    Recycle,
    Settings,
    Award,
    Key,
} from "lucide-react";
import Image from "next/image";

export default function WhyUs() {
    return (
        <section className="relative py-32 bg-[#080808] border-y border-white/5 overflow-hidden">
            {/* Map Background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-center bg-no-repeat bg-cover grayscale invert"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="mb-20">
                    <h2 className="text-4xl font-semibold text-white tracking-tight mb-6">
                        Why Us
                    </h2>
                    <p className="text-zinc-400 max-w-2xl text-lg font-light leading-relaxed">
                        Privé International Tourism Group is the largest privately owned
                        Destination Management Company (DMC) delivering professional
                        services with our knowledge, expertise and resources.
                    </p>
                </div>

                {/* Icons Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16">
                    {/* Icon Item */}
                    <div className="flex flex-col items-center text-center group">
                        <div className="w-16 h-16 rounded-full bg-sky-900/20 border border-sky-500/30 flex items-center justify-center mb-6 group-hover:bg-sky-500/20 transition-colors duration-300">
                            <Lightbulb className="w-8 h-8 text-sky-400" />
                        </div>
                        <h4 className="text-sm font-semibold text-white">
                            Ownership Concept
                        </h4>
                    </div>

                    {/* Icon Item */}
                    <div className="flex flex-col items-center text-center group">
                        <div className="w-16 h-16 rounded-full bg-sky-900/20 border border-sky-500/30 flex items-center justify-center mb-6 group-hover:bg-sky-500/20 transition-colors duration-300">
                            <Calendar className="w-8 h-8 text-sky-400" />
                        </div>
                        <h4 className="text-sm font-semibold text-white">30+ Years</h4>
                    </div>

                    {/* Icon Item */}
                    <div className="flex flex-col items-center text-center group">
                        <div className="w-16 h-16 rounded-full bg-sky-900/20 border border-sky-500/30 flex items-center justify-center mb-6 group-hover:bg-sky-500/20 transition-colors duration-300">
                            <Globe className="w-8 h-8 text-sky-400" />
                        </div>
                        <h4 className="text-sm font-semibold text-white">
                            120+ Destinations
                        </h4>
                    </div>

                    {/* Icon Item */}
                    <div className="flex flex-col items-center text-center group">
                        <div className="w-16 h-16 rounded-full bg-sky-900/20 border border-sky-500/30 flex items-center justify-center mb-6 group-hover:bg-sky-500/20 transition-colors duration-300">
                            <DollarSign className="w-8 h-8 text-sky-400" />
                        </div>
                        <h4 className="text-sm font-semibold text-white">
                            Financial Stability
                        </h4>
                    </div>

                    {/* Row 2 */}
                    <div className="flex flex-col items-center text-center group">
                        <div className="w-16 h-16 rounded-full bg-sky-900/20 border border-sky-500/30 flex items-center justify-center mb-6 group-hover:bg-sky-500/20 transition-colors duration-300">
                            <Recycle className="w-8 h-8 text-sky-400" />
                        </div>
                        <h4 className="text-sm font-semibold text-white">
                            Sustainability Mindset
                        </h4>
                    </div>

                    <div className="flex flex-col items-center text-center group">
                        <div className="w-16 h-16 rounded-full bg-sky-900/20 border border-sky-500/30 flex items-center justify-center mb-6 group-hover:bg-sky-500/20 transition-colors duration-300">
                            <Settings className="w-8 h-8 text-sky-400" />
                        </div>
                        <h4 className="text-sm font-semibold text-white">
                            Service Diversification
                        </h4>
                    </div>

                    <div className="flex flex-col items-center text-center group">
                        <div className="w-16 h-16 rounded-full bg-sky-900/20 border border-sky-500/30 flex items-center justify-center mb-6 group-hover:bg-sky-500/20 transition-colors duration-300">
                            <Award className="w-8 h-8 text-sky-400" />
                        </div>
                        <h4 className="text-sm font-semibold text-white">
                            Quality Control
                        </h4>
                    </div>

                    <div className="flex flex-col items-center text-center group">
                        <div className="w-16 h-16 rounded-full bg-sky-900/20 border border-sky-500/30 flex items-center justify-center mb-6 group-hover:bg-sky-500/20 transition-colors duration-300">
                            <Key className="w-8 h-8 text-sky-400" />
                        </div>
                        <h4 className="text-sm font-semibold text-white">
                            Privately Owned
                        </h4>
                    </div>
                </div>

                {/* Founder Section */}
                <div className="mt-24 pt-16 border-t border-white/5 relative">
                    {/* Dashed line visual connecting to map */}
                    <svg className="absolute top-0 left-10 w-px h-16 border-l border-dashed border-sky-500 opacity-50"></svg>

                    <div className="flex flex-col md:flex-row items-start gap-12">
                        <div className="flex-shrink-0 text-center">
                            <div className="w-24 h-24 rounded-full border-2 border-orange-500 p-1 mb-4 mx-auto">
                                <img
                                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop"
                                    className="w-full h-full rounded-full object-cover grayscale hover:grayscale-0 transition-all"
                                    alt="Founder"
                                />
                            </div>
                            <div className="px-4 py-1.5 bg-orange-500 rounded-full text-[10px] font-bold text-white mb-1">
                                Mario Enzesberger
                            </div>
                            <div className="text-[10px] text-zinc-500">Founder & CEO</div>
                        </div>

                        <div>
                            <h3 className="text-2xl text-white font-medium mb-4">
                                What makes Privé the{" "}
                                <span className="text-orange-500">best DMC?</span>
                            </h3>
                            <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl mb-4">
                                "I founded Privé International Tourism Group in 1991 with a
                                clear vision: to build the world's leading independent
                                Destination Management Company (DMC). More than 30 years later,
                                Privé has reshaped global travel."
                            </p>
                            <p className="text-zinc-500 text-xs italic">
                                At Privé, personalisation isn't a luxury—it's our standard.
                                We create unforgettable experiences tailored to your vision.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
