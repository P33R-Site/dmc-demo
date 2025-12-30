"use client";

import { useState } from 'react';
import { useVAL8 } from '@/context/VAL8Context';
import { CategoryCard } from './CategoryCard';
import { CATEGORY_ORDER } from '@/data/val8-data';
import { CreditCard, Lock, Check, Loader2, Sparkles } from 'lucide-react';

export function DemoCheckout() {
    const { bookedItems, tripContext, handleDemoCheckout } = useVAL8();
    const [isProcessing, setIsProcessing] = useState(false);

    const bookedCategories = CATEGORY_ORDER.filter(cat => bookedItems[cat]);

    // Calculate total (dummy)
    const total = 7890;

    const handleSubmit = () => {
        setIsProcessing(true);
        // Simulate processing
        setTimeout(() => {
            handleDemoCheckout();
        }, 2000);
    };

    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-[var(--glass-border)] bg-gradient-to-r from-[var(--primary)]/10 to-transparent flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col">
                    <h3 className="text-[var(--foreground)] font-semibold text-lg leading-tight">Checkout</h3>
                    <p className="text-[var(--foreground)]/60 text-sm leading-tight">
                        {tripContext.destination} · {tripContext.dates}
                    </p>
                </div>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Booked items summary */}
                <div className="bg-[var(--glass-bg)] rounded-xl p-4 border border-[var(--glass-border)]">
                    <h4 className="text-[var(--foreground)] font-medium text-sm mb-3">Your Itinerary</h4>
                    <div className="space-y-2">
                        {bookedCategories.map((category) => {
                            const item = bookedItems[category];
                            if (!item) return null;
                            return (
                                <div key={category} className="flex items-center justify-between py-2 border-b border-[var(--glass-border)] last:border-0">
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">{item.icon}</span>
                                        <span className="text-[var(--foreground)]/80 text-sm">{item.title}</span>
                                    </div>
                                    <span className="text-primary text-sm font-medium">{item.price || '—'}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Dummy payment form */}
                <div className="bg-[var(--glass-bg)] rounded-xl p-4 border border-[var(--glass-border)]">
                    <div className="flex items-center gap-2 mb-4">
                        <CreditCard className="w-4 h-4 text-primary" />
                        <h4 className="text-[var(--foreground)] font-medium text-sm">Payment Details</h4>
                    </div>

                    {/* Dummy card info - pre-filled */}
                    <div className="space-y-3">
                        <div>
                            <label className="block text-[var(--foreground)]/60 text-xs mb-1">Cardholder Name</label>
                            <div className="px-3 py-2.5 rounded-lg bg-[var(--glass-button-bg)] border border-[var(--glass-border)] text-[var(--foreground)] text-sm">
                                Alex Morgan
                            </div>
                        </div>
                        <div>
                            <label className="block text-[var(--foreground)]/60 text-xs mb-1">Card Number</label>
                            <div className="px-3 py-2.5 rounded-lg bg-[var(--glass-button-bg)] border border-[var(--glass-border)] text-[var(--foreground)] text-sm flex items-center gap-2">
                                <span>•••• •••• •••• 4242</span>
                                <span className="ml-auto text-primary text-xs">VISA</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[var(--foreground)]/60 text-xs mb-1">Expiry</label>
                                <div className="px-3 py-2.5 rounded-lg bg-[var(--glass-button-bg)] border border-[var(--glass-border)] text-[var(--foreground)] text-sm">
                                    12/26
                                </div>
                            </div>
                            <div>
                                <label className="block text-[var(--foreground)]/60 text-xs mb-1">CVC</label>
                                <div className="px-3 py-2.5 rounded-lg bg-[var(--glass-button-bg)] border border-[var(--glass-border)] text-[var(--foreground)] text-sm">
                                    •••
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact info - pre-filled */}
                <div className="bg-[var(--glass-bg)] rounded-xl p-4 border border-[var(--glass-border)]">
                    <h4 className="text-[var(--foreground)] font-medium text-sm mb-3">Contact Information</h4>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-[var(--foreground)]/60 text-xs mb-1">Email</label>
                            <div className="px-3 py-2.5 rounded-lg bg-[var(--glass-button-bg)] border border-[var(--glass-border)] text-[var(--foreground)] text-sm">
                                alex.morgan@email.com
                            </div>
                        </div>
                        <div>
                            <label className="block text-[var(--foreground)]/60 text-xs mb-1">Phone</label>
                            <div className="px-3 py-2.5 rounded-lg bg-[var(--glass-button-bg)] border border-[var(--glass-border)] text-[var(--foreground)] text-sm">
                                +1 (555) 123-4567
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer with total and pay button */}
            <div className="p-4 border-t border-[var(--glass-border)] space-y-3">
                {/* Total */}
                <div className="flex items-center justify-between">
                    <span className="text-[var(--foreground)]/60">Total</span>
                    <span className="text-2xl font-semibold text-[var(--foreground)]">${total.toLocaleString()}</span>
                </div>

                {/* Pay button */}
                <button
                    onClick={handleSubmit}
                    disabled={isProcessing}
                    className="w-full py-3 rounded-xl bg-primary text-white font-medium text-sm hover:bg-primary-dark transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                    {isProcessing ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        <>
                            <Lock className="w-4 h-4" />
                            Complete Booking
                        </>
                    )}
                </button>

                <p className="text-[var(--foreground)]/50 text-xs text-center flex items-center justify-center gap-1">
                    <Lock className="w-3 h-3" />
                    Secure checkout Powered by PRV8
                </p>
            </div>
        </div>
    );
}
