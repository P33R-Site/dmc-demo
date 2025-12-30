"use client";

import { useVAL8 } from '@/context/VAL8Context';
import { Check, Calendar, MessageCircle, RefreshCw } from 'lucide-react';

export function ConfirmationScreen() {
    const { selectedRecommendation, tripContext, userInfo, resetConversation, setView } = useVAL8();

    return (
        <div className="flex-1 flex flex-col p-6 items-center justify-center text-center">
            {/* Success animation */}
            <div className="relative mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--success-light)] to-[var(--success-dark)] flex items-center justify-center">
                    <Check className="w-10 h-10 text-white" />
                </div>
                {/* Pulse rings */}
                <div className="absolute inset-0 rounded-full bg-[var(--success)] animate-ping opacity-20" />
            </div>

            {/* Message */}
            <h3 className="text-[var(--foreground)] font-medium text-xl mb-2">Your trip is confirmed!</h3>
            <p className="text-[var(--foreground)]/60 text-sm mb-6 max-w-[260px]">
                I'll send the itinerary to <span className="text-[var(--foreground)]">{userInfo.email || 'your email'}</span>. Let me know if you'd like to make changes.
            </p>

            {/* Trip summary card */}
            {selectedRecommendation && (
                <div className="w-full bg-[var(--glass-bg)] rounded-xl p-4 border border-[var(--glass-border)] mb-6 text-left">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                                src={selectedRecommendation.image}
                                alt={selectedRecommendation.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <h4 className="text-[var(--foreground)] font-medium text-sm">{selectedRecommendation.name}</h4>
                            <p className="text-[var(--foreground)]/60 text-xs">{tripContext.destination || 'Atlanta'} • {tripContext.duration || '4 nights'}</p>
                        </div>
                    </div>
                    <div className="pt-3 border-t border-[var(--glass-border)] flex items-center justify-between">
                        <span className="text-[var(--foreground)]/60 text-xs">Booking total</span>
                        <span className="text-[var(--foreground)] font-medium">{selectedRecommendation.price}</span>
                    </div>
                </div>
            )}

            {/* Actions */}
            <div className="w-full space-y-3">
                <button
                    onClick={() => setView('chat')}
                    className="w-full py-3 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--foreground)] font-medium text-sm flex items-center justify-center gap-2 hover:bg-[var(--glass-button-hover)] transition-all"
                >
                    <Calendar className="w-4 h-4" /> View Itinerary
                </button>
                <button
                    onClick={() => setView('chat')}
                    className="w-full py-3 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--foreground)] font-medium text-sm flex items-center justify-center gap-2 hover:bg-[var(--glass-button-hover)] transition-all"
                >
                    <MessageCircle className="w-4 h-4" /> Add Experiences
                </button>
                <button
                    onClick={resetConversation}
                    className="w-full py-3 rounded-xl text-[var(--foreground)]/60 text-sm flex items-center justify-center gap-2 hover:text-[var(--foreground)] transition-colors"
                >
                    <RefreshCw className="w-4 h-4" /> Plan Another Trip
                </button>
            </div>
        </div>
    );
}
