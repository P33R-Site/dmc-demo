"use client";

import { useVAL8 } from '@/context/VAL8Context';
import { CategoryCard } from './CategoryCard';
import { CATEGORY_ORDER } from '@/data/val8-data';
import { Check, Send, Calendar, MapPin, Sparkles, PartyPopper } from 'lucide-react';

export function DemoSuccess() {
    const { bookedItems, tripContext, resetConversation } = useVAL8();

    const bookedCategories = CATEGORY_ORDER.filter(cat => bookedItems[cat]);
    const bookedItemsCount = bookedCategories.length;

    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            {/* Success header with animation */}
            <div className="p-6 border-b border-[var(--glass-border)] bg-gradient-to-r from-[var(--success)]/20 to-[var(--primary)]/10 text-center">
                <div className="relative inline-flex items-center justify-center mb-4">
                    {/* Animated rings */}
                    <div className="absolute w-20 h-20 rounded-full bg-[var(--success)]/20 animate-ping" />
                    <div className="absolute w-16 h-16 rounded-full bg-[var(--success)]/30 animate-pulse" />
                    <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[var(--success-light)] to-[var(--success-dark)] flex items-center justify-center">
                        <Check className="w-7 h-7 text-white" strokeWidth={3} />
                    </div>
                </div>
                <h3 className="text-[var(--foreground)] font-semibold text-xl mb-1">Trip Confirmed!</h3>
                <p className="text-success-light text-sm">Confirmation #PRV8-2025-78542</p>
            </div>

            {/* Trip summary */}
            <div className="flex-1 overflow-y-auto p-4">
                {/* Destination card */}
                <div className="bg-gradient-to-r from-[var(--primary)]/10 to-[var(--success)]/10 rounded-xl p-4 border border-[var(--primary)]/20 mb-4">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h4 className="text-[var(--foreground)] font-medium">{tripContext.destination || 'Atlanta'}</h4>
                            <p className="text-[var(--foreground)]/60 text-sm">{tripContext.dates || 'June 5-9, 2025'}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-[var(--foreground)]/80 text-sm">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span>{bookedItemsCount} items confirmed</span>
                    </div>
                </div>

                {/* Booked items */}
                <div className="space-y-2">
                    {bookedCategories.map((category) => {
                        const item = bookedItems[category];
                        if (!item) return null;
                        return (
                            <CategoryCard
                                key={category}
                                item={item}
                                compact
                            />
                        );
                    })}
                </div>

                {/* Success message */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-[var(--success)]/10 to-[var(--primary)]/10 border border-[var(--success)]/20 text-center">
                    <PartyPopper className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="text-[var(--foreground)] text-sm font-medium mb-1">
                        Your complete trip took under 2 minutes.
                    </p>
                    <p className="text-[var(--foreground)]/60 text-xs">
                        No browsing. No forms. No friction.
                        <br />
                        Just invisible luxury.
                    </p>
                </div>
            </div>

            {/* Actions */}
            <div className="p-4 border-t border-[var(--glass-border)] space-y-2">
                <button
                    onClick={() => {
                        // In real app, would send confirmation
                    }}
                    className="w-full py-3 rounded-xl bg-primary text-white font-medium text-sm hover:bg-primary-dark transition-all flex items-center justify-center gap-2"
                >
                    <Send className="w-4 h-4" />
                    Send to Email
                </button>
                <button
                    onClick={resetConversation}
                    className="w-full py-2.5 rounded-xl glass-button text-[var(--foreground)]/60 font-medium text-sm hover:text-[var(--foreground)] transition-all"
                >
                    Start New Demo
                </button>

                <div className="pt-2 text-center">
                    <p className="text-[10px] text-[var(--foreground)]/40 uppercase tracking-widest font-medium">
                        Powered by PRV8
                    </p>
                </div>
            </div>
        </div>
    );
}
