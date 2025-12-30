"use client";

import { useVAL8 } from '@/context/VAL8Context';
import { CategoryCard } from './CategoryCard';
import { CATEGORY_ORDER } from '@/data/val8-data';
import { Check, Send, Calendar, MapPin } from 'lucide-react';

export function ItinerarySummary() {
    const { bookedItems, tripContext, resetConversation, setView } = useVAL8();

    const bookedCategories = CATEGORY_ORDER.filter(cat => bookedItems[cat]);
    const bookedItemsCount = bookedCategories.length;

    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-[var(--glass-border)] bg-gradient-to-r from-[var(--success)]/10 to-transparent">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--success-light)] to-[var(--success-dark)] flex items-center justify-center">
                        <Check className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-[var(--foreground)] font-semibold text-lg">Trip Organized</h3>
                        <p className="text-success-light text-sm">{bookedItemsCount} items confirmed</p>
                    </div>
                </div>

                {/* Trip info */}
                <div className="flex flex-wrap gap-3">
                    {tripContext.destination && (
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)]">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span className="text-[var(--foreground)] text-sm">{tripContext.destination}</span>
                        </div>
                    )}
                    {tripContext.dates && (
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)]">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span className="text-[var(--foreground)] text-sm">{tripContext.dates}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Items list */}
            <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-3">
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

                {/* Summary message */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-[var(--primary)]/10 to-[var(--success)]/10 border border-[var(--primary)]/20">
                    <p className="text-[var(--foreground)] text-sm font-medium mb-1">
                        Your complete trip took 42 seconds.
                    </p>
                    <p className="text-[var(--foreground)]/60 text-xs">
                        No browsing, no forms, no apps, no menus. The system leads. You confirm. That's invisible luxury.
                    </p>
                </div>
            </div>

            {/* Actions */}
            <div className="p-4 border-t border-[var(--glass-border)] space-y-2">
                <button
                    onClick={() => {
                        // In real app, this would send to email
                    }}
                    className="w-full py-3 rounded-xl bg-primary text-white font-medium text-sm hover:bg-primary-dark transition-all flex items-center justify-center gap-2"
                >
                    <Send className="w-4 h-4" />
                    Send Summary
                </button>
                <button
                    onClick={() => {
                        resetConversation();
                    }}
                    className="w-full py-2.5 rounded-xl glass-button text-[var(--foreground)]/60 font-medium text-sm hover:text-[var(--foreground)] transition-all"
                >
                    Plan Another Trip
                </button>
            </div>
        </div>
    );
}
