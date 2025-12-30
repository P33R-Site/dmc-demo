"use client";

import { useState, useRef, useEffect } from 'react';
import { useVAL8 } from '@/context/VAL8Context';
import { Send, Sparkles, Mic } from 'lucide-react';
import { QuickReplyChips } from './QuickReplyChips';
import { RecommendationCard } from './RecommendationCard';
import { CategoryCard } from './CategoryCard';

// Shimmer loading card component
function ShimmerCard() {
    return (
        <div className="rounded-xl overflow-hidden border border-[var(--glass-border)] bg-[var(--glass-bg)] animate-pulse">
            {/* Image placeholder */}
            <div className="h-32 bg-[var(--foreground)]/10" />
            {/* Content */}
            <div className="p-3 space-y-2">
                <div className="flex items-center justify-between">
                    <div className="h-4 bg-[var(--foreground)]/10 rounded w-32" />
                    <div className="h-4 bg-[var(--foreground)]/10 rounded w-10" />
                </div>
                <div className="flex gap-1">
                    <div className="h-5 bg-[var(--foreground)]/10 rounded-full w-14" />
                    <div className="h-5 bg-[var(--foreground)]/10 rounded-full w-16" />
                    <div className="h-5 bg-[var(--foreground)]/10 rounded-full w-10" />
                </div>
                <div className="h-3 bg-[var(--foreground)]/10 rounded w-full" />
                <div className="h-3 bg-[var(--foreground)]/10 rounded w-3/4" />
                <div className="h-9 bg-[var(--foreground)]/10 rounded-lg w-full mt-2" />
            </div>
        </div>
    );
}

interface ChatInterfaceProps {
    hiddenRecommendations?: boolean;
}

export function ChatInterface({ hiddenRecommendations = false }: ChatInterfaceProps) {
    const { messages, handleUserMessage, isTyping, tripContext, view, isDemoMode, handleConfirmCategory } = useVAL8();
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Check if we're loading recommendations
    const isLoadingRecommendations = isTyping && view === 'recommendations';

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim()) {
            handleUserMessage(inputValue);
            setInputValue('');
        }
    };

    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] ${message.role === 'user' ? 'order-1' : 'order-2'}`}>
                            {message.role === 'assistant' && (
                                <div className="flex items-start gap-2 mb-1">
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center flex-shrink-0">
                                        <Sparkles className="w-3 h-3 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-2xl rounded-tl-md px-4 py-3 text-[var(--foreground)] text-sm leading-relaxed whitespace-pre-line">
                                            {message.content}
                                        </div>

                                        {/* Category Card (for demo mode) - shown inline in chat */}
                                        {!hiddenRecommendations && message.categoryCard && (
                                            <div className="mt-3">
                                                <CategoryCard
                                                    item={message.categoryCard}
                                                    onConfirm={() => handleConfirmCategory(message.categoryCard!.category)}
                                                />
                                            </div>
                                        )}

                                        {/* Quick replies */}
                                        {message.quickReplies && message.quickReplies.length > 0 && (
                                            <QuickReplyChips options={message.quickReplies} />
                                        )}

                                        {/* Recommendations - hide when in split view */}
                                        {!hiddenRecommendations && message.recommendations && message.recommendations.length > 0 && (
                                            <div className="mt-3 space-y-3">
                                                {message.recommendations.map((rec) => (
                                                    <RecommendationCard key={rec.id} recommendation={rec} />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {message.role === 'user' && (
                                <div className="bg-primary rounded-2xl rounded-tr-md px-4 py-3 text-white text-sm">
                                    {message.content}
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {/* Typing indicator with shimmer cards */}
                {isTyping && (
                    <div className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center flex-shrink-0">
                            <Sparkles className="w-3 h-3 text-white" />
                        </div>
                        <div className="flex-1">
                            <div className="bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-2xl rounded-tl-md px-4 py-3 inline-block">
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 bg-[var(--foreground)]/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <div className="w-2 h-2 bg-[var(--foreground)]/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <div className="w-2 h-2 bg-[var(--foreground)]/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>

                            {/* Shimmer cards when loading recommendations */}
                            {isLoadingRecommendations && (
                                <div className="mt-3 space-y-3">
                                    <ShimmerCard />
                                    <ShimmerCard />
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-[var(--glass-border)]">
                <div className="relative">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={isDemoMode ? "Continue the conversation..." : "Type a message..."}
                        className="w-full px-4 py-3 pr-24 rounded-xl bg-[var(--glass-button-bg)] border border-[var(--glass-border)] text-[var(--foreground)] placeholder-[var(--foreground)]/50 text-sm focus:outline-none focus:border-[var(--primary)]/50 transition-colors"
                    />
                    {/* Microphone icon for speech-to-speech */}
                    <button
                        type="button"
                        className="absolute right-12 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-[var(--glass-button-bg)] border border-[var(--glass-border)] text-[var(--foreground)]/70 flex items-center justify-center hover:text-[var(--primary)] hover:border-[var(--primary)]/50 transition-all group"
                        title="Voice input"
                    >
                        <Mic className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        {/* Subtle pulse indicator */}
                        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[var(--accent-alt)] rounded-full animate-pulse opacity-80" />
                    </button>
                    <button
                        type="submit"
                        disabled={!inputValue.trim()}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
            </form>
        </div>
    );
}
