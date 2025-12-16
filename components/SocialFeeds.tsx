"use client";

import { Instagram } from "lucide-react";

export default function SocialFeeds() {
    return (
        <section className="py-20 px-6 bg-[#050505]">
            <div className="max-w-6xl mx-auto text-center">
                <h3 className="text-2xl font-bold text-white mb-12">
                    Social <span className="text-sky-500">Feeds</span>
                </h3>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Instagram Mock */}
                    <div className="bg-zinc-900 rounded-xl border border-white/5 overflow-hidden h-[400px] flex items-center justify-center relative">
                        <img
                            src="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=800&auto=format&fit=crop"
                            className="absolute inset-0 w-full h-full object-cover opacity-50"
                            alt="Social Feed Background"
                        />
                        <div className="relative z-10 text-center">
                            <Instagram className="w-12 h-12 text-white mx-auto mb-4" />
                            <span className="text-white font-medium">@prive_international</span>
                        </div>
                    </div>

                    {/* Facebook Mock */}
                    <div className="bg-white rounded-xl border border-white/5 overflow-hidden h-[400px] relative text-left">
                        <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
                                <div>
                                    <div className="text-xs font-bold text-gray-800">
                                        Privé International Tourism Group
                                    </div>
                                    <div className="text-[10px] text-gray-500">
                                        11,159 followers
                                    </div>
                                </div>
                            </div>
                            <button className="px-3 py-1 bg-gray-200 text-gray-700 text-[10px] font-bold rounded cursor-pointer">
                                Follow Page
                            </button>
                        </div>
                        <div className="p-4">
                            <p className="text-xs text-gray-800 mb-4">
                                "Not every memory is polished, but the ones that stay with us
                                are always true."
                            </p>
                            <div className="w-full h-48 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
