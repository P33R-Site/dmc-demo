"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Minimize2, Maximize2, User, Sparkles, Bot } from 'lucide-react';
import { useVal8, Val8Provider } from './Val8Context';
import { ChatInterface } from './ChatInterface';
import { BookingFlow } from './BookingFlow';
import { PostBookingSummary } from './PostBookingSummary';
import { ExitModal } from './ExitModal';
import { LoginModal } from './LoginModal';
import { Dashboard } from './Dashboard';
import { DemoCard } from './DemoCard';

const Val8WidgetContent: React.FC = () => {
    const {
        isExpanded,
        setIsExpanded,
        bookingState,
        chatHistory,
        setShowExitModal,
        view,
        setView,
        user,
        setShowLoginModal,
        activeAction,
        clearActiveAction,
        addMessage,
        isDemoMode,
        setIsDemoMode,
        setDemoStep
    } = useVal8();
    const [showLoader, setShowLoader] = useState(false);

    // Handle incoming widget actions and external messages
    React.useEffect(() => {
        // Handle internal actions
        if (activeAction) {
            addMessage({ sender: 'user', text: activeAction });
            setTimeout(() => {
                addMessage({
                    sender: 'val8',
                    text: `I can certainly help you with "${activeAction}". What specific details would you like to know?`
                });
            }, 1000);
            clearActiveAction();
        }

        // Handle external window messages
        const handleMessage = (event: MessageEvent) => {
            if (event.data?.type === 'LUMINE_WIDGET_SEARCH' && event.data.query) {
                // Determine layout on mobile vs desktop
                if (window.innerWidth < 768) {
                    setView('chat'); // Force chat view on mobile
                }

                // Force widget expansion
                setIsExpanded(true);

                addMessage({
                    sender: 'user',
                    text: `Search for: ${event.data.query}`
                });

                // Simulate AI finding results
                setTimeout(() => {
                    addMessage({
                        sender: 'val8',
                        text: `I found some great options for "${event.data.query}". Would you like to see the top recommendations?`
                    });
                }, 1000);
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [activeAction, addMessage, clearActiveAction, setView, setIsExpanded]);



    const handleExpand = () => {
        setIsExpanded(true);
        setShowLoader(true);
        // Simulate loading delay
        setTimeout(() => {
            setShowLoader(false);
        }, 2000);
    };

    const handleClose = () => {
        if (chatHistory.length > 0 && bookingState !== 'confirmed' && bookingState !== 'post-booking') {
            setShowExitModal(true);
        } else {
            setIsExpanded(false);
        }
    };

    const handleProfileClick = () => {
        if (!user) {
            setShowLoginModal(true);
        }
    };

    return (

        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className={`fixed z-50 overflow-hidden flex flex-col glass-panel shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
                                   ${view === 'dashboard' && window.innerWidth >= 768
                                ? 'fixed inset-[5vw] top-[7.5vh] bottom-[7.5vh] w-auto h-auto rounded-[32px]'
                                : 'max-md:inset-0 max-md:w-full max-md:h-[100dvh] max-md:rounded-none md:bottom-6 md:right-6 md:w-[400px] md:h-[700px] md:rounded-[32px]'
                            }`}
                        style={{ transformOrigin: 'bottom right', background: 'var(--glass-bg)' }}
                    >
                        {/* Header */}
                        <div className="h-16 backdrop-blur-md border-b flex items-center justify-between px-6 shrink-0 relative z-20" style={{ borderColor: 'var(--glass-border)', background: 'rgba(0,0,0,0.3)' }}>
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors bg-primary`}>
                                    <span className="font-serif font-bold text-white text-lg">V</span>
                                </div>
                                <div>
                                    <h1 className="font-serif text-lg tracking-wide" style={{ color: 'var(--foreground)' }}>{isDemoMode ? 'Speak to Nora' : 'Val8'}</h1>
                                    <p className="text-[10px] uppercase tracking-widest font-medium text-primary">
                                        {isDemoMode ? 'Powered by Prv8' : 'Powered by PRV8.'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => {
                                        const newMode = !isDemoMode;
                                        setIsDemoMode(newMode);
                                        if (newMode) {
                                            setView('dashboard');
                                            setDemoStep(0);
                                        }
                                    }}
                                    className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-medium transition-colors border ${isDemoMode ? 'bg-primary text-white border-primary' : 'glass-button'}`}
                                    style={!isDemoMode ? { color: 'var(--foreground)' } : {}}
                                >
                                    {isDemoMode ? 'Exit Demo' : 'Demo'}
                                </button>
                                <button
                                    onClick={handleProfileClick}
                                    className="w-8 h-8 rounded-full glass-button flex items-center justify-center transition-colors"
                                    style={{ color: 'var(--foreground)' }}
                                >
                                    {user ? (
                                        <div className="w-full h-full rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs">
                                            {user?.name?.charAt(0)}
                                        </div>
                                    ) : (
                                        <User className="w-4 h-4" />
                                    )}
                                </button>
                                <button
                                    onClick={() => setView(view === 'chat' ? 'dashboard' : 'chat')}
                                    className="w-8 h-8 rounded-full glass-button flex items-center justify-center transition-colors"
                                    style={{ color: 'var(--foreground)' }}
                                >
                                    {view === 'chat' ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                                </button>
                                <button
                                    onClick={handleClose}
                                    className="w-8 h-8 rounded-full glass-button flex items-center justify-center transition-colors"
                                    style={{ color: 'var(--foreground)' }}
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Main Content Area */}
                        <div className="flex-1 relative overflow-hidden" style={{ background: 'var(--background)' }}>
                            {/* DEMO MODE BACKGROUND */}
                            {isDemoMode && (
                                <div className="absolute inset-0 z-0 pointer-events-none">
                                    <img
                                        src="https://images.unsplash.com/photo-1512453979798-5ea904ac22de?q=80&w=2670&auto=format&fit=crop"
                                        alt="Dubai Background"
                                        className="w-full h-full object-cover opacity-20 transform scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                                </div>
                            )}

                            <AnimatePresence mode="wait">
                                {showLoader ? (
                                    <motion.div
                                        key="loader"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
                                    >
                                        <div className="w-16 h-16 rounded-full border border-primary/30 flex items-center justify-center mb-6 relative">
                                            <div className="absolute inset-0 rounded-full border border-primary/10 animate-ping" />
                                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                                        </div>
                                        <h3 className="text-lg font-serif mb-2" style={{ color: 'var(--foreground)' }}>Preparing your experience...</h3>
                                        <p className="text-xs font-light tracking-wide" style={{ color: 'var(--foreground)', opacity: 0.6 }}>Connecting to global concierge network</p>
                                    </motion.div>
                                ) : view === 'dashboard' ? (
                                    <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col md:flex-row relative z-10 animate-in fade-in">
                                        {/* Left Panel: Chat Interface - Visible on Mobile ONLY in Demo Mode (Split Screen) */}
                                        <div className={`
                                            w-full md:w-[400px] 
                                            flex-col backdrop-blur-xl relative z-10
                                            border-b md:border-b-0 md:border-r
                                            ${isDemoMode ? 'flex h-[40%] md:h-full' : 'hidden md:flex h-full'}
                                        `} style={{ background: 'var(--background)', borderColor: 'var(--glass-border)' }}>
                                            <ChatInterface />
                                            <BookingFlow />
                                            <PostBookingSummary />
                                        </div>

                                        {/* Right Panel: Content (Dashboard OR Demo Card) - Full Width on Mobile */}
                                        <div className="flex-1 relative z-0 flex flex-col" style={{ background: 'var(--glass-bg)' }}>
                                            {isDemoMode ? <DemoCard /> : <Dashboard />}
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div key="chat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full relative z-10">
                                        <ChatInterface />
                                        <BookingFlow />
                                        <PostBookingSummary />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Modals */}
                            <ExitModal />
                            <LoginModal />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Launcher */}
            <AnimatePresence>
                {!isExpanded && (
                    <motion.button
                        layoutId="launcher"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleExpand}
                        className="glass-panel pl-2 pr-6 py-2 rounded-full shadow-2xl flex items-center gap-3 group z-50
                                 max-md:bottom-4 max-md:right-4 max-md:transform max-md:scale-90"
                        style={{ color: 'var(--foreground)' }}
                    >
                        <div className="w-10 h-10 rounded-full bg-primary overflow-hidden border-2 border-white/20 shadow-lg relative">
                            <img
                                src="https://api.dicebear.com/7.x/personas/svg?seed=Nora&backgroundColor=b6e3f4&hair=long&hairColor=2c1b18&eyes=happy&mouth=smile&nose=smallRound&skinColor=f5cfa0"
                                alt="Nora AI Avatar"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <span className="font-medium tracking-wide">Speak to Nora</span>
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};

export const Val8Widget: React.FC = () => {
    return (
        <Val8Provider>
            <Val8WidgetContent />
        </Val8Provider>
    );
};
