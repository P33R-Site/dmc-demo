"use client";

import { useState, useEffect, useRef } from 'react';
import { useVAL8 } from '@/context/VAL8Context';
import { DEMO_CONFIGS } from '@/data/val8-data';
import { X, RotateCcw, Sparkles, Headphones, Maximize2, Minimize2, Play, Volume2, VolumeX } from 'lucide-react';
import { useSpeech } from '@/hooks/useSpeech';
import { WelcomeScreen } from './WelcomeScreen';
import { ChatInterface } from './ChatInterface';
import { TripSummary } from './TripSummary';
import { CheckoutForm } from './CheckoutForm';
import { ConfirmationScreen } from './ConfirmationScreen';
import { ContentPanel } from './ContentPanel';
import { ItinerarySummary } from './ItinerarySummary';
import { DemoCheckout } from './DemoCheckout';
import { DemoSuccess } from './DemoSuccess';

export function VAL8Widget() {
    const { isOpen, setIsOpen, toggleWidget, view, resetConversation, messages, selectedRecommendation, tripContext, isDemoMode, setIsDemoMode, bookedItems, demoType } = useVAL8();
    const currentDemoConfig = DEMO_CONFIGS[demoType];
    const [showExitModal, setShowExitModal] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const { speak, stop, isSpeaking, isEnabled: voiceEnabled, toggleVoice } = useSpeech({ rate: 1.0, pitch: 1.0 });
    const lastSpokenMessageId = useRef<string | null>(null);

    // Auto-speak assistant messages
    useEffect(() => {
        if (!voiceEnabled || !isDemoMode) return;

        const lastMessage = messages[messages.length - 1];
        if (lastMessage && lastMessage.role === 'assistant' && lastMessage.id !== lastSpokenMessageId.current) {
            lastSpokenMessageId.current = lastMessage.id;
            // Clean the text for speaking (remove emojis and special formatting)
            const cleanText = lastMessage.content
                .replace(/[\u{1F300}-\u{1F9FF}]/gu, '') // Remove emojis
                .replace(/\n+/g, '. '); // Replace newlines with pauses
            speak(cleanText);
        }
    }, [messages, voiceEnabled, isDemoMode, speak]);

    // Check if user has started a conversation
    const hasProgress = messages.length > 0 && view !== 'welcome' && view !== 'confirmation' && view !== 'demo-success';

    // Auto-expand in demo mode when there's content
    const bookedItemsCount = Object.keys(bookedItems).length;
    const shouldAutoExpand = isDemoMode && bookedItemsCount > 0;

    // Show split view when expanded or when in demo mode with booked items (but not in checkout/success views)
    const showSplitView = (isExpanded || shouldAutoExpand) &&
        (view === 'recommendations' || view === 'chat' || view === 'summary');

    const handleClose = () => {
        if (hasProgress) {
            setShowExitModal(true);
        } else {
            setIsOpen(false);
        }
    };

    const handleExitConfirm = () => {
        setShowExitModal(false);
        setIsOpen(false);
    };

    const handleExitCancel = () => {
        setShowExitModal(false);
    };

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const toggleDemoMode = () => {
        if (!isDemoMode) {
            // Entering demo mode - reset and expand
            resetConversation();
            setIsDemoMode(true);
            setIsExpanded(true);
        } else {
            // Exiting demo mode
            setIsDemoMode(false);
            resetConversation();
        }
    };

    return (
        <>
            {/* Floating Action Button */}
            <button
                onClick={toggleWidget}
                className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${isOpen
                    ? 'glass-button rotate-0'
                    : 'bg-primary hover:scale-110'
                    }`}
                aria-label={isOpen ? 'Close chat' : 'Open VAL8 concierge'}
            >
                {isOpen ? (
                    <X className="w-6 h-6 text-[var(--foreground)]" />
                ) : (
                    <>
                        <Sparkles className="w-6 h-6 text-white" />
                        {/* Pulse animation */}
                        <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30" />
                    </>
                )}
            </button>

            {/* Widget Panel */}
            {isOpen && (
                <div
                    className={`fixed z-50 bg-[var(--background)] border border-[var(--glass-border)] rounded-2xl shadow-2xl flex overflow-hidden animate-in slide-in-from-bottom-5 duration-300 transition-all ${showSplitView
                        ? 'bottom-6 right-6 w-[1000px] max-w-[calc(100vw-48px)] h-[700px] max-h-[calc(100vh-48px)]'
                        : 'bottom-24 right-6 w-[380px] max-w-[calc(100vw-48px)] h-[600px] max-h-[calc(100vh-120px)]'
                        }`}
                >
                    {/* Left Panel - Chat */}
                    <div className={`flex flex-col ${showSplitView ? 'w-1/2 border-r border-[var(--glass-border)]' : 'w-full'}`}>
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-[var(--glass-border)] bg-gradient-to-r from-[var(--primary)]/10 to-transparent">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                                    <Sparkles className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="text-[var(--foreground)] font-semibold text-lg leading-tight">
                                        {isDemoMode ? currentDemoConfig.headerTitle : 'VAL8'}
                                    </h3>
                                    <p className="text-[var(--foreground)]/60 text-sm leading-tight">
                                        {isDemoMode ? currentDemoConfig.headerSubtitle : 'Powered by PRV8'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                {/* Voice Toggle */}
                                {isDemoMode && (
                                    <button
                                        onClick={toggleVoice}
                                        className={`p-2 rounded-lg transition-all ${voiceEnabled
                                            ? 'bg-[var(--primary)]/20 text-primary'
                                            : 'glass-button text-[var(--foreground)]/50 hover:text-[var(--foreground)]'
                                            }`}
                                        title={voiceEnabled ? 'Mute voice' : 'Enable voice'}
                                    >
                                        {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                                    </button>
                                )}

                                {/* Demo Mode Toggle */}
                                <button
                                    onClick={toggleDemoMode}
                                    className={`px-2 py-1 text-xs rounded-lg flex items-center gap-1 transition-all ${isDemoMode
                                        ? 'bg-[var(--success)]/20 text-success-light border border-[var(--success)]/30'
                                        : 'bg-[var(--foreground)]/5 text-[var(--foreground)]/60 hover:text-[var(--foreground)] hover:bg-[var(--foreground)]/10'
                                        }`}
                                    title={isDemoMode ? 'Exit Demo' : 'Start Demo'}
                                >
                                    <Play className="w-3 h-3" />
                                    {isDemoMode ? 'Demo' : 'Demo'}
                                </button>

                                {view !== 'welcome' && view !== 'demo-checkout' && view !== 'demo-success' && (
                                    <>
                                        <button
                                            onClick={toggleExpand}
                                            className="p-2 text-[var(--foreground)]/60 hover:text-[var(--foreground)] transition-colors rounded-lg hover:bg-[var(--foreground)]/5"
                                            title={isExpanded ? 'Collapse' : 'Expand'}
                                        >
                                            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                                        </button>
                                        <button
                                            onClick={resetConversation}
                                            className="p-2 text-[var(--foreground)]/60 hover:text-[var(--foreground)] transition-colors rounded-lg hover:bg-[var(--foreground)]/5"
                                            title="Start over"
                                        >
                                            <RotateCcw className="w-4 h-4" />
                                        </button>
                                    </>
                                )}
                                <button
                                    onClick={handleClose}
                                    className="p-2 text-[var(--foreground)]/60 hover:text-[var(--foreground)] transition-colors rounded-lg hover:bg-[var(--foreground)]/5"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-hidden flex flex-col">
                            {view === 'welcome' && <WelcomeScreen />}
                            {(view === 'chat' || view === 'recommendations') && <ChatInterface hiddenRecommendations={showSplitView} />}
                            {view === 'summary' && !showSplitView && <TripSummary />}
                            {view === 'checkout' && <CheckoutForm />}
                            {view === 'confirmation' && <ConfirmationScreen />}
                            {view === 'itinerary' && <ItinerarySummary />}
                            {view === 'demo-checkout' && <DemoCheckout />}
                            {view === 'demo-success' && <DemoSuccess />}
                        </div>

                        {/* Concierge Button - persistent footer */}
                        {view !== 'welcome' && view !== 'confirmation' && view !== 'itinerary' && view !== 'demo-checkout' && view !== 'demo-success' && (
                            <div className="p-3 border-t border-[var(--glass-border)]">
                                <button
                                    onClick={() => {
                                        // This would trigger concierge escalation in real implementation
                                    }}
                                    className="w-full py-2 text-xs text-[var(--foreground)]/50 hover:text-[var(--foreground)]/80 flex items-center justify-center gap-2 transition-colors"
                                >
                                    <Headphones className="w-3.5 h-3.5" />
                                    Need help? Talk to a concierge
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Right Panel - Content/Recommendations */}
                    {showSplitView && (
                        <div className="w-1/2 flex flex-col">
                            <ContentPanel onCollapse={toggleExpand} />
                        </div>
                    )}
                </div>
            )}

            {/* Exit Modal */}
            {showExitModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-[var(--background)] border border-[var(--glass-border)] rounded-2xl p-6 w-[320px] max-w-[calc(100vw-48px)] shadow-2xl animate-in zoom-in-95 duration-200">
                        <h3 className="text-[var(--foreground)] font-medium text-lg mb-2">Save your progress?</h3>
                        <p className="text-[var(--foreground)]/60 text-sm mb-6">
                            Would you like to save your trip and access it later?
                        </p>
                        <div className="space-y-2">
                            <button
                                onClick={handleExitCancel}
                                className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-medium text-sm transition-all"
                            >
                                Continue Planning
                            </button>
                            <button
                                onClick={handleExitConfirm}
                                className="w-full py-2.5 rounded-xl glass-button text-[var(--foreground)]/60 font-medium text-sm hover:text-[var(--foreground)] transition-all"
                            >
                                No, Thanks
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
