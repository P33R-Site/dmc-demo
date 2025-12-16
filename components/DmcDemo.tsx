"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Map, Shield, Edit2, CheckCircle, Globe, Settings, User, X, MessageSquare, ChevronRight, Minimize2, Maximize2, Car, Clock, StickyNote, TrendingUp, ArrowDown, Info, Heart, Utensils, Sparkles } from "lucide-react";
import Image from "next/image";

type Step = "ENTRY" | "REQUEST" | "ITINERARY" | "CONSOLE" | "REFINEMENT" | "CONFIRMATION";

export default function DmcDemo() {
    const [isOpen, setIsOpen] = useState(false);
    const [hasBeenOpened, setHasBeenOpened] = useState(false);
    const [step, setStep] = useState<Step>("ENTRY");
    const [messages, setMessages] = useState<{ role: "ai" | "user"; text: string }[]>([
        { role: "ai", text: "I'll design your journey and coordinate directly with Privé International's on-ground team." }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isPartnerView, setIsPartnerView] = useState(false);
    const [showItinerary, setShowItinerary] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    // Auto-expand when reaching complex steps
    useEffect(() => {
        if (step === "ITINERARY" || step === "CONSOLE" || step === "REFINEMENT") {
            setIsExpanded(true);
        }
    }, [step]);

    const nextStep = () => {
        switch (step) {
            case "ENTRY":
                setStep("REQUEST");
                setTimeout(() => simulateTyping("10 days in Italy for two couples — Rome, Florence, Amalfi."), 500);
                break;
            case "REQUEST":
                setMessages(prev => [...prev,
                { role: "user", text: "10 days in Italy for two couples — Rome, Florence, Amalfi." },
                { role: "ai", text: "I'll prepare a structured itinerary and coordinate execution with Privé International." }
                ]);
                setStep("ITINERARY");
                setTimeout(() => setShowItinerary(true), 1500);
                setTimeout(() => {
                    setMessages(prev => [...prev, { role: "ai", text: "This draft optimizes routing and flow. Privé International will finalize guides, access, and experiences." }]);
                }, 3000);
                break;
            case "ITINERARY":
                setStep("CONSOLE");
                break;
            case "CONSOLE":
                setStep("REFINEMENT");
                setIsPartnerView(false);
                setMessages(prev => [...prev, { role: "ai", text: "Privé International recommends adjusting the Amalfi segment to avoid peak congestion. Shall I apply the update?" }]);
                break;
            case "REFINEMENT":
                setStep("CONFIRMATION");
                setMessages(prev => [...prev,
                { role: "user", text: "Yes, please apply the update." },
                { role: "ai", text: "Privé International will manage your journey end-to-end. I'll retain your preferences for future trips." }
                ]);
                break;
        }
    };

    const simulateTyping = (text: string) => {
        let i = 0;
        const interval = setInterval(() => {
            setInputValue(text.substring(0, i + 1));
            i++;
            if (i === text.length) {
                clearInterval(interval);
            }
        }, 50);
    };

    const handleSend = () => {
        if (step === "REQUEST" || step === "REFINEMENT") {
            nextStep();
            setInputValue("");
        } else {
            nextStep();
        }
    };

    if (!isOpen) {
        return (
            <div className="fixed bottom-6 right-6 z-50">
                <button
                    onClick={() => {
                        setIsOpen(true);
                        setHasBeenOpened(true);
                    }}
                    className="w-16 h-16 rounded-full shadow-[0_0_40px_rgba(249,115,22,0.5)] flex items-center justify-center hover:scale-110 transition-transform cursor-pointer group overflow-hidden border-2 border-orange-500"
                >
                    <img
                        src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&auto=format&fit=crop"
                        alt="AI Concierge"
                        className="w-full h-full object-cover"
                    />
                </button>
                {!hasBeenOpened && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-[#050505] animate-pulse pointer-events-none"></div>
                )}
            </div>
        );
    }

    return (
        <div className={`fixed bottom-6 right-6 z-50 flex items-end gap-4 transition-all duration-500 ${isExpanded ? 'w-[90vw] max-w-5xl h-[700px]' : 'w-[400px] h-[600px]'}`}>

            {/* Main Widget Container */}
            <div className="w-full h-full bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col relative">
                {/* Header */}
                <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-zinc-900/90 backdrop-blur-sm shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                            <span className="text-white text-xs font-bold">AI</span>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-white">Luxury Travel Concierge</h3>
                            <p className="text-[10px] text-zinc-400">Powered by <span className="text-orange-400 font-medium">PRV8</span></p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setShowInfo(true)} className="p-2 hover:bg-white/5 rounded-full text-zinc-400 hover:text-white transition-colors" title="About This Demo">
                            <Info className="w-4 h-4" />
                        </button>
                        <button onClick={() => setIsExpanded(!isExpanded)} className="p-2 hover:bg-white/5 rounded-full text-zinc-400 hover:text-white transition-colors">
                            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                        </button>
                        <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/5 rounded-full text-zinc-400 hover:text-white transition-colors">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="flex flex-1 overflow-hidden">
                    {/* Chat Panel */}
                    <div className={`flex flex-col bg-[#0A0A0A] transition-all duration-500 ${isExpanded ? 'w-2/5 border-r border-white/10' : 'w-full'}`}>
                        <div className="flex-1 p-6 overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-zinc-800" ref={scrollRef}>
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                                    {msg.role === 'ai' && (
                                        <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center shrink-0 mt-2">
                                            <span className="text-indigo-400 text-[10px]">AI</span>
                                        </div>
                                    )}
                                    <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                                        ? 'bg-white text-black rounded-tr-none shadow-sm'
                                        : 'bg-zinc-900 text-zinc-300 border border-white/5 rounded-tl-none'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t border-white/10 bg-zinc-900/30">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Type message..."
                                    className="w-full bg-black/50 border border-white/10 rounded-full py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-white/20 transition-colors"
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                />
                                <button
                                    onClick={handleSend}
                                    className="absolute right-1.5 top-1.5 p-1.5 bg-indigo-600 text-white rounded-full hover:bg-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={!inputValue && step !== "ENTRY" && step !== "CONSOLE" && step !== "ITINERARY"}
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                            {/* Demo Control Hint */}
                            <div className="mt-2 flex justify-center">
                                <button onClick={nextStep} className="text-[10px] text-zinc-600 hover:text-zinc-400 flex items-center gap-1 transition-colors">
                                    Demo Step: {step} <ChevronRight className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel (Hidden unless expanded) */}
                    {isExpanded && (
                        <div className="flex-1 bg-[#0c0c0c] relative flex flex-col animate-in fade-in duration-500">
                            {/* Toggle Control */}
                            {(step === "CONSOLE" || step === "REFINEMENT" || step === "CONFIRMATION") && (
                                <div className="absolute top-4 right-4 z-50 flex bg-black/80 rounded-full p-1 border border-white/10 backdrop-blur">
                                    <button
                                        onClick={() => setIsPartnerView(false)}
                                        className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${!isPartnerView ? 'bg-white text-black shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
                                    >
                                        Client View
                                    </button>
                                    <button
                                        onClick={() => setIsPartnerView(true)}
                                        className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${isPartnerView ? 'bg-orange-500 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
                                    >
                                        Partner View
                                    </button>
                                </div>
                            )}

                            {isPartnerView ? (
                                // PARTNER CONSOLE VIEW
                                <div className="h-full p-8 overflow-y-auto">
                                    <div className="flex items-center justify-between mb-8">
                                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                            <Shield className="w-5 h-5 text-orange-500" />
                                            Privé International Partner Console
                                        </h2>
                                        <span className="px-3 py-1 bg-green-500/20 text-green-400 text-[10px] rounded-full uppercase font-bold tracking-wider">
                                            Verified Intent
                                        </span>
                                    </div>

                                    <div className="bg-zinc-900/50 rounded-xl p-6 border border-white/5 mb-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex gap-4">
                                                <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                                                    <User className="w-6 h-6 text-zinc-400" />
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-medium">Qualified Client</h4>
                                                    <p className="text-sm text-zinc-500">Tier: Platinum • 2 Couples</p>
                                                </div>
                                            </div>
                                            <Settings className="w-4 h-4 text-zinc-500 cursor-pointer hover:text-white" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-3 bg-black/40 rounded border border-white/5">
                                                <label className="text-[10px] text-zinc-500 uppercase">Budget Est.</label>
                                                <p className="text-sm text-white font-mono">$45k - $60k</p>
                                            </div>
                                            <div className="p-3 bg-black/40 rounded border border-white/5">
                                                <label className="text-[10px] text-zinc-500 uppercase">Trip Length</label>
                                                <p className="text-sm text-white font-mono">10 Days</p>
                                            </div>
                                            <div className="p-3 bg-green-500/10 rounded border border-green-500/20 col-span-2">
                                                <label className="text-[10px] text-green-400 uppercase flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Margin Band</label>
                                                <p className="text-sm text-green-300 font-mono">Est. 18-22% • Protected</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Client Preferences Section */}
                                    <div className="bg-zinc-900/50 rounded-xl p-6 border border-white/5 mb-6">
                                        <h4 className="text-sm font-medium text-white mb-4 flex items-center gap-2">
                                            <Heart className="w-4 h-4 text-pink-500" /> Client Preferences
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="px-3 py-1.5 bg-pink-500/10 text-pink-300 text-[10px] rounded-full border border-pink-500/20 flex items-center gap-1">
                                                <Utensils className="w-3 h-3" /> Fine Dining
                                            </span>
                                            <span className="px-3 py-1.5 bg-purple-500/10 text-purple-300 text-[10px] rounded-full border border-purple-500/20 flex items-center gap-1">
                                                <Sparkles className="w-3 h-3" /> Private Tours
                                            </span>
                                            <span className="px-3 py-1.5 bg-sky-500/10 text-sky-300 text-[10px] rounded-full border border-sky-500/20">
                                                Wine Experiences
                                            </span>
                                            <span className="px-3 py-1.5 bg-amber-500/10 text-amber-300 text-[10px] rounded-full border border-amber-500/20">
                                                No Red-Eye Flights
                                            </span>
                                            <span className="px-3 py-1.5 bg-emerald-500/10 text-emerald-300 text-[10px] rounded-full border border-emerald-500/20">
                                                5-Star Only
                                            </span>
                                        </div>
                                    </div>

                                    <div className="bg-zinc-900/50 rounded-xl p-6 border border-white/5">
                                        <h4 className="text-sm font-medium text-white mb-4 flex items-center gap-2">
                                            <Globe className="w-4 h-4 text-sky-500" /> Draft Itinerary Review
                                        </h4>
                                        <div className="space-y-4">
                                            {["Rome (3 Nights)", "Florence (3 Nights)", "Amalfi Coast (4 Nights)"].map((stop, i) => (
                                                <div key={i} className="flex items-center justify-between p-3 hover:bg-white/5 rounded transition-colors group cursor-pointer">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-6 h-6 rounded-full bg-zinc-800 text-[10px] flex items-center justify-center text-zinc-400">{i + 1}</div>
                                                        <span className="text-sm text-zinc-300">{stop}</span>
                                                    </div>
                                                    <Edit2 className="w-3 h-3 text-zinc-500 opacity-0 group-hover:opacity-100" />
                                                </div>
                                            ))}
                                        </div>

                                        {/* Notes Field */}
                                        <div className="mt-6 pt-6 border-t border-white/5">
                                            <label className="text-[10px] text-zinc-500 uppercase flex items-center gap-1 mb-2"><StickyNote className="w-3 h-3" /> Operator Notes</label>
                                            <textarea
                                                placeholder="Add notes for this booking..."
                                                className="w-full bg-black/40 border border-white/5 rounded-lg p-3 text-sm text-zinc-300 resize-none h-20 focus:outline-none focus:border-white/20"
                                                defaultValue="VIP treatment requested. Confirm private tour at Vatican. Check wine cellar availability in Tuscany."
                                            />
                                        </div>

                                        <div className="mt-6 pt-6 border-t border-white/5">
                                            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3">
                                                <p className="text-xs text-orange-200 mb-2">⚠ AI Suggestion: Amalfi peak congestion warning.</p>
                                                <button className="w-full py-2 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold rounded transition-colors">
                                                    Suggest Alternative Routing
                                                </button>
                                            </div>
                                        </div>

                                        {/* Key Narration */}
                                        <div className="mt-6 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
                                            <p className="text-xs text-indigo-300 italic text-center">"PRV-8 feeds Privé International structured, qualified intent — not random requests."</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                // ITINERARY VISUAL VIEW
                                <div className="h-full bg-gradient-to-b from-zinc-900 via-[#0A0A0A] to-[#050505] p-8 flex flex-col relative overflow-hidden">
                                    {showItinerary ? (
                                        <div className="h-full flex flex-col animate-in slide-in-from-bottom duration-700">
                                            <div className="bg-white/5 border border-white/10 rounded-xl p-8 h-full backdrop-blur-sm relative overflow-hidden flex flex-col">
                                                <h3 className="text-xl font-display font-medium text-white mb-8">Your Italian Journey</h3>

                                                <div className="space-y-6 relative pl-4 flex-1">
                                                    {/* Timeline Line */}
                                                    <div className="absolute left-[29px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-white/30 via-white/10 to-transparent"></div>

                                                    {/* Stop 1: Rome */}
                                                    <div className="relative flex items-start gap-5">
                                                        <div className="w-7 h-7 rounded-full bg-white border-4 border-black z-10 shrink-0 mt-1"></div>
                                                        <div className="flex-1 pb-2">
                                                            <div className="flex justify-between items-start gap-2">
                                                                <div>
                                                                    <h4 className="text-white text-base font-bold">Rome</h4>
                                                                    <p className="text-xs text-zinc-400">Arrival & Ancient City • 3 Days</p>
                                                                </div>
                                                                <span className="px-2 py-0.5 bg-sky-500/10 text-sky-400 text-[9px] rounded flex items-center gap-1 shrink-0">
                                                                    <Clock className="w-2.5 h-2.5" /> Relaxed
                                                                </span>
                                                            </div>
                                                            {/* Transfer */}
                                                            <div className="flex items-center gap-2 text-[10px] text-zinc-500 mt-3 pl-1 border-l-2 border-dashed border-zinc-700 ml-0">
                                                                <Car className="w-3 h-3 ml-2" /> Private Transfer • 3h 15m
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Stop 2: Florence */}
                                                    <div className="relative flex items-start gap-5">
                                                        <div className="w-7 h-7 rounded-full bg-zinc-600 border-4 border-black z-10 shrink-0 mt-1"></div>
                                                        <div className="flex-1 pb-2">
                                                            <div className="flex justify-between items-start gap-2">
                                                                <div>
                                                                    <h4 className="text-white text-base font-bold">Florence</h4>
                                                                    <p className="text-xs text-zinc-400">Renaissance Art • 3 Days</p>
                                                                </div>
                                                                <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 text-[9px] rounded flex items-center gap-1 shrink-0">
                                                                    <Clock className="w-2.5 h-2.5" /> Active
                                                                </span>
                                                            </div>
                                                            {/* Transfer */}
                                                            <div className="flex items-center gap-2 text-[10px] text-zinc-500 mt-3 pl-1 border-l-2 border-dashed border-zinc-700 ml-0">
                                                                <Car className="w-3 h-3 ml-2" /> Scenic Route • 4h 30m
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Stop 3: Amalfi */}
                                                    <div className="relative flex items-start gap-5">
                                                        <div className={`w-7 h-7 rounded-full border-4 border-black z-10 shrink-0 mt-1 transition-colors duration-500 ${step === 'REFINEMENT' || step === 'CONFIRMATION' ? 'bg-orange-500' : 'bg-zinc-600'}`}></div>
                                                        <div className="flex-1">
                                                            <div className="flex justify-between items-start gap-2">
                                                                <div>
                                                                    <h4 className="text-white text-base font-bold">Amalfi Coast</h4>
                                                                    <p className="text-xs text-zinc-400">Coastal Relaxation • 4 Days</p>
                                                                </div>
                                                                {step !== 'ENTRY' && step !== 'REQUEST' && step !== 'ITINERARY' ? (
                                                                    <span className="px-2 py-0.5 bg-green-500/10 text-green-400 text-[9px] rounded border border-green-500/20 flex items-center gap-1 shrink-0 animate-in fade-in">
                                                                        <CheckCircle className="w-2.5 h-2.5" /> Optimized
                                                                    </span>
                                                                ) : (
                                                                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[9px] rounded flex items-center gap-1 shrink-0">
                                                                        <Clock className="w-2.5 h-2.5" /> Leisurely
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Map BG */}
                                                <div className="absolute bottom-0 right-0 w-full h-full opacity-5 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/2000px-World_map_blank_without_borders.svg.png')] bg-no-repeat bg-contain bg-bottom pointer-events-none mix-blend-overlay"></div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="h-full flex flex-col justify-center items-center text-zinc-600 space-y-4">
                                            <Map className="w-12 h-12 opacity-20" />
                                            <p className="text-sm font-medium">Visualizing itinerary...</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Presenter Hint - Bottom Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 pointer-events-none">
                <div className="text-center">
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Presenter Hint</p>
                    <p className="text-xs text-zinc-400 italic">
                        {step === 'ENTRY' && '"This immediately reassures them — the AI knows its place."'}
                        {step === 'REQUEST' && '"Their sweet spot: complex, multi-city, high-value requests."'}
                        {step === 'ITINERARY' && '"AI does NOT pretend to be the DMC — it drafts and defers."'}
                        {step === 'CONSOLE' && '"This is KEY — show them the Partner View toggle."'}
                        {step === 'REFINEMENT' && '"This shows respect for operator expertise."'}
                        {step === 'CONFIRMATION' && '"Ongoing relationship: preferences retained for future trips."'}
                    </p>
                </div>
            </div>

            {/* Info Modal */}
            {showInfo && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-300">
                    <div className="bg-zinc-900 border border-white/10 rounded-2xl p-8 max-w-md mx-4 relative">
                        <button onClick={() => setShowInfo(false)} className="absolute top-4 right-4 text-zinc-500 hover:text-white">
                            <X className="w-5 h-5" />
                        </button>

                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Shield className="w-6 h-6 text-orange-500" />
                            About This Demo
                        </h3>

                        <div className="space-y-4 text-sm">
                            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                                <h4 className="text-green-400 font-bold mb-2">✅ What This Demo Tells Privé International</h4>
                                <ul className="text-green-300 space-y-1 text-xs">
                                    <li>• You don't replace them</li>
                                    <li>• You don't commoditize them</li>
                                    <li>• You reduce planning waste</li>
                                    <li>• You deliver better clients</li>
                                    <li>• You scale relationships</li>
                                </ul>
                            </div>

                            <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
                                <h4 className="text-indigo-400 font-bold mb-2">🎯 Key Message</h4>
                                <p className="text-indigo-300 text-xs italic">
                                    "PRV-8 delivers qualified demand and protects DMC margins."
                                </p>
                            </div>

                            <p className="text-zinc-500 text-[10px] text-center pt-2">
                                Audience: DMC execs, operations, partnerships
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
