"use client";

import Image from 'next/image';
import { useVAL8 } from '@/context/VAL8Context';
import { Calendar, Users, Star, ArrowRight, Search, MessageCircle } from 'lucide-react';

export function TripSummary() {
    const { selectedRecommendation, tripContext, setView, addMessage } = useVAL8();

    if (!selectedRecommendation) return null;

    const handleContinueToCheckout = () => {
        setView('checkout');
    };

    const handleExploreSimilar = () => {
        setView('chat');
    };

    const handleAskQuestion = () => {
        addMessage('assistant', "Of course! What would you like to know about your trip or the property? I'm here to help.", ['Room details', 'Dining options', 'Activities nearby', 'Talk to Concierge']);
        setView('chat');
    };

    return (
        <div className="flex-1 flex flex-col p-4 overflow-y-auto">
            {/* Header */}
            <div className="text-center mb-4">
                <h3 className="text-[var(--foreground)] font-medium text-lg">Your Trip Summary</h3>
                <p className="text-[var(--foreground)]/60 text-sm">Review your selection</p>
            </div>

            {/* Hotel Card */}
            <div className="rounded-xl overflow-hidden glass-card-static mb-4">
                <div className="relative h-40">
                    <Image
                        src={selectedRecommendation.image}
                        alt={selectedRecommendation.name}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                        <h4 className="text-white font-medium text-lg">{selectedRecommendation.name}</h4>
                        <div className="flex items-center gap-1 text-primary text-sm">
                            <Star className="w-4 h-4 fill-current" />
                            <span>{selectedRecommendation.rating}</span>
                        </div>
                    </div>
                </div>

                <div className="p-4 space-y-3">
                    {/* Trip details */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 text-[var(--foreground)]/80 text-sm">
                            <Calendar className="w-4 h-4 text-[var(--foreground)]/50" />
                            <span>{tripContext.duration || '4 nights'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[var(--foreground)]/80 text-sm">
                            <Users className="w-4 h-4 text-[var(--foreground)]/50" />
                            <span>{tripContext.travelers || '2 guests'}</span>
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        {selectedRecommendation.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-2 py-1 text-xs rounded-full bg-[var(--primary)]/20 text-primary-light"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Price */}
                    <div className="pt-3 border-t border-[var(--glass-border)] flex items-center justify-between">
                        <span className="text-[var(--foreground)]/60 text-sm">Total estimate</span>
                        <span className="text-[var(--foreground)] font-medium text-lg">{selectedRecommendation.price}</span>
                    </div>
                </div>
            </div>

            {/* Benefits */}
            <div className="bg-[var(--glass-bg)] rounded-xl p-4 mb-4 border border-[var(--glass-border)]">
                <h5 className="text-[var(--foreground)] font-medium text-sm mb-3">Included Benefits</h5>
                <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2 text-[var(--foreground)]/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Complimentary airport transfers
                    </li>
                    <li className="flex items-center gap-2 text-[var(--foreground)]/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Daily breakfast included
                    </li>
                    <li className="flex items-center gap-2 text-[var(--foreground)]/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Priority reservations
                    </li>
                </ul>
            </div>

            {/* Actions */}
            <div className="mt-auto space-y-2">
                <button
                    onClick={handleContinueToCheckout}
                    className="w-full py-3 rounded-xl bg-primary text-white font-medium text-sm flex items-center justify-center gap-2 hover:bg-primary-dark transition-all"
                >
                    Continue to Checkout <ArrowRight className="w-4 h-4" />
                </button>
                <div className="grid grid-cols-2 gap-2">
                    <button
                        onClick={handleExploreSimilar}
                        className="py-2.5 rounded-xl glass-button text-[var(--foreground)] font-medium text-xs flex items-center justify-center gap-1.5 transition-all"
                    >
                        <Search className="w-3.5 h-3.5" /> Explore Similar
                    </button>
                    <button
                        onClick={handleAskQuestion}
                        className="py-2.5 rounded-xl glass-button text-[var(--foreground)] font-medium text-xs flex items-center justify-center gap-1.5 transition-all"
                    >
                        <MessageCircle className="w-3.5 h-3.5" /> Ask a Question
                    </button>
                </div>
            </div>
        </div>
    );
}
