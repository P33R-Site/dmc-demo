"use client";

import { useVAL8 } from '@/context/VAL8Context';
import { DEMO_CONFIGS, QUICK_ACTIONS, DemoType } from '@/data/val8-data';
import { useState } from 'react';
import { Send, Mic, ChevronDown } from 'lucide-react';

export function WelcomeScreen() {
    const { handleUserMessage, isDemoMode, demoType, setDemoType } = useVAL8();
    const [inputValue, setInputValue] = useState('');
    const [showDemoSelector, setShowDemoSelector] = useState(false);

    const currentDemoConfig = DEMO_CONFIGS[demoType];
    const quickActions = isDemoMode ? currentDemoConfig.quickActions : QUICK_ACTIONS;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim()) {
            handleUserMessage(inputValue);
            setInputValue('');
        }
    };

    const handleQuickAction = (label: string) => {
        handleUserMessage(label);
    };

    const handleDemoTypeSelect = (type: DemoType) => {
        setDemoType(type);
        setShowDemoSelector(false);
    };

    return (
        <div className="flex-1 flex flex-col p-6">
            {/* Demo Header (only in demo mode) - shows current demo type without selector */}
            {isDemoMode && (
                <div className="mb-4">
                    <div className="w-full flex items-center gap-3 px-4 py-3 rounded-xl glass-button text-[var(--foreground)] text-sm">
                        <span className="text-xl">{currentDemoConfig.icon}</span>
                        <div className="text-left">
                            <p className="font-medium">{currentDemoConfig.name}</p>
                            <p className="text-xs text-[var(--foreground)]/60">{currentDemoConfig.subtitle}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Hero section */}
            <div className="flex-1 flex flex-col justify-center">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-2">
                        {isDemoMode
                            ? currentDemoConfig.welcomeTitle
                            : "Where are you thinking of going?"
                        }
                    </h2>
                    <p className="text-[var(--foreground)]/60 text-sm">
                        {isDemoMode
                            ? currentDemoConfig.welcomeSubtitle
                            : "I'll help you plan the perfect trip."
                        }
                    </p>
                </div>

                {/* Quick actions */}
                <div className="grid grid-cols-1 gap-2 mb-6">
                    {quickActions.map((action) => (
                        <button
                            key={action.label}
                            onClick={() => handleQuickAction(action.label)}
                            className="flex items-center gap-2 px-4 py-3 glass-button rounded-xl text-[var(--foreground)] text-sm transition-all"
                        >
                            <span className="text-lg">{action.icon}</span>
                            <span>{action.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="mt-auto">
                <div className="relative mb-4">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={isDemoMode ? currentDemoConfig.inputPlaceholder : "Or type a destination..."}
                        className="w-full px-4 py-3 pr-24 rounded-xl glass-button text-[var(--foreground)] placeholder-[var(--foreground)]/50 text-sm focus:outline-none focus:border-primary transition-colors"
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

                <div className="text-center">
                    <p className="text-[10px] text-[var(--foreground)]/40 uppercase tracking-widest font-medium">
                        {isDemoMode ? currentDemoConfig.poweredBy : 'Powered by PRV8'}
                    </p>
                </div>
            </form>
        </div>
    );
}

