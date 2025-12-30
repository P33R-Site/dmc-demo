"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import {
    Message,
    Recommendation,
    TripContext,
    UserInfo,
    BookedItems,
    CategoryItem,
    ATLANTA_HOTELS,
    VAL8_RESPONSES,
    DEMO_SCRIPT,
    ATLANTA_DEMO_DATA,
    FINANCIAL_DEMO_DATA,
    DMC_DEMO_DATA,
    DEMO_CONFIGS,
    DemoType,
    BookingCategory
} from '@/data/val8-data';

type ViewState = 'welcome' | 'chat' | 'recommendations' | 'summary' | 'checkout' | 'confirmation' | 'itinerary' | 'demo-checkout' | 'demo-success';

interface VAL8ContextType {
    // Widget state
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    toggleWidget: () => void;

    // Demo mode
    isDemoMode: boolean;
    setIsDemoMode: (demo: boolean) => void;
    demoType: DemoType;
    setDemoType: (type: DemoType) => void;
    currentDemoStep: number;
    showCheckout: boolean;
    setShowCheckout: (show: boolean) => void;
    getDemoData: () => Record<BookingCategory, CategoryItem>;

    // Booked items (for demo mode)
    bookedItems: BookedItems;
    addBookedItem: (category: BookingCategory, item: CategoryItem) => void;
    clearBookedItems: () => void;

    // Pending categories (shown but not yet confirmed)
    pendingCategories: BookingCategory[];
    setPendingCategories: (categories: BookingCategory[]) => void;

    // View state
    view: ViewState;
    setView: (view: ViewState) => void;

    // Messages
    messages: Message[];
    addMessage: (role: 'user' | 'assistant', content: string, quickReplies?: string[], recommendations?: Recommendation[], categoryCard?: CategoryItem) => void;
    clearMessages: () => void;

    // Trip context
    tripContext: TripContext;
    updateTripContext: (updates: Partial<TripContext>) => void;

    // Selected recommendation
    selectedRecommendation: Recommendation | null;
    setSelectedRecommendation: (rec: Recommendation | null) => void;

    // User info
    userInfo: UserInfo;
    setUserInfo: (info: UserInfo) => void;

    // Typing indicator
    isTyping: boolean;
    setIsTyping: (typing: boolean) => void;

    // Actions
    handleUserMessage: (content: string) => void;
    handleQuickReply: (reply: string) => void;
    handleSelectRecommendation: (rec: Recommendation) => void;
    handleConfirmBooking: () => void;
    handleConfirmCategory: (category: BookingCategory) => void;
    handleDemoCheckout: () => void;
    resetConversation: () => void;
}

const VAL8Context = createContext<VAL8ContextType | undefined>(undefined);

export function VAL8Provider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isDemoMode, setIsDemoMode] = useState(false);
    const [demoType, setDemoType] = useState<DemoType>('dmc');
    const [currentDemoStep, setCurrentDemoStep] = useState(0);
    const [showCheckout, setShowCheckout] = useState(false);
    const [bookedItems, setBookedItems] = useState<BookedItems>({});
    const [pendingCategories, setPendingCategories] = useState<BookingCategory[]>([]);
    const [view, setView] = useState<ViewState>('welcome');
    const [messages, setMessages] = useState<Message[]>([]);
    const [tripContext, setTripContext] = useState<TripContext>({});
    const [selectedRecommendation, setSelectedRecommendation] = useState<Recommendation | null>(null);
    const [userInfo, setUserInfo] = useState<UserInfo>({ name: '', email: '', phone: '' });
    const [isTyping, setIsTyping] = useState(false);

    // Get demo data based on current demo type
    const getDemoData = useCallback(() => {
        switch (demoType) {
            case 'financial':
                return FINANCIAL_DEMO_DATA;
            case 'dmc':
                return DMC_DEMO_DATA;
            default:
                return ATLANTA_DEMO_DATA;
        }
    }, [demoType]);

    // Get demo script based on current demo type
    const getDemoScript = useCallback(() => {
        return DEMO_CONFIGS[demoType].script;
    }, [demoType]);

    const toggleWidget = useCallback(() => setIsOpen(prev => !prev), []);

    const addBookedItem = useCallback((category: BookingCategory, item: CategoryItem) => {
        setBookedItems(prev => ({ ...prev, [category]: { ...item, status: 'confirmed' } }));
    }, []);

    const clearBookedItems = useCallback(() => setBookedItems({}), []);

    const addMessage = useCallback((
        role: 'user' | 'assistant',
        content: string,
        quickReplies?: string[],
        recommendations?: Recommendation[],
        categoryCard?: CategoryItem
    ) => {
        const newMessage: Message = {
            id: `msg-${Date.now()}`,
            role,
            content,
            quickReplies,
            recommendations,
            categoryCard,
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, newMessage]);
    }, []);

    const clearMessages = useCallback(() => setMessages([]), []);

    const updateTripContext = useCallback((updates: Partial<TripContext>) => {
        setTripContext(prev => ({ ...prev, ...updates }));
    }, []);

    // Demo mode response generator - advances step by step
    const generateDemoResponse = useCallback((userInput: string) => {
        // Use the correct demo script based on demo type
        const script = getDemoScript();
        // Simply return the next step in sequence
        // The currentDemoStep tracks progress through the script
        const nextStep = script[currentDemoStep];

        // If we've run out of steps, return the last one
        if (!nextStep) {
            return script[script.length - 1];
        }

        return nextStep;
    }, [currentDemoStep, getDemoScript]);

    // Standard mode response generator
    const generateResponse = useCallback((userInput: string) => {
        const input = userInput.toLowerCase();

        // Destination detection
        if (input.includes('atlanta')) {
            updateTripContext({ destination: 'Atlanta' });
            return VAL8_RESPONSES.atlanta_intent;
        }

        // Style detection
        if (input.includes('relax') || input === 'relaxing') {
            updateTripContext({ style: 'Relaxing' });
            return VAL8_RESPONSES.relaxing_style;
        }
        if (input.includes('adventure')) {
            updateTripContext({ style: 'Adventure' });
            return VAL8_RESPONSES.adventure_style;
        }
        if (input.includes('social')) {
            updateTripContext({ style: 'Social' });
            return VAL8_RESPONSES.social_style;
        }

        // Duration detection
        if (input.includes('night')) {
            const match = input.match(/(\d+)\s*night/);
            if (match) {
                updateTripContext({ duration: `${match[1]} nights` });
                return VAL8_RESPONSES.duration_selected;
            }
        }

        // Checkout flow
        if (input.includes('checkout') || input.includes('continue')) {
            return VAL8_RESPONSES.hotel_selected;
        }

        return VAL8_RESPONSES.fallback;
    }, [updateTripContext]);

    const handleUserMessage = useCallback((content: string) => {
        if (!content.trim()) return;

        // Add user message
        addMessage('user', content);
        setView('chat');

        // Simulate typing delay
        setIsTyping(true);

        if (isDemoMode) {
            // Demo mode flow
            const demoData = getDemoData();
            setTimeout(() => {
                const step = generateDemoResponse(content);

                // Book categories from previous step that were shown
                if (step.bookCategories && step.bookCategories.length > 0) {
                    step.bookCategories.forEach(category => {
                        addBookedItem(category, demoData[category]);
                    });
                }

                // Update trip context for demo
                if (content.toLowerCase().includes('atlanta')) {
                    updateTripContext({
                        destination: 'Atlanta'
                    });
                }
                if (content.toLowerCase().includes('june') || content.toLowerCase().includes('5th') || content.toLowerCase().includes('5')) {
                    updateTripContext({
                        dates: 'June 5-9',
                        weather: '82°F, partly cloudy'
                    });
                }

                // Set pending categories to show (for next response)
                if (step.showCategories && step.showCategories.length > 0) {
                    setPendingCategories(step.showCategories);
                } else {
                    setPendingCategories([]);
                }

                // Add assistant response - include the first showCategory as categoryCard in the message
                const categoryToShow = step.showCategories && step.showCategories.length > 0
                    ? demoData[step.showCategories[step.showCategories.length - 1]]
                    : undefined;

                addMessage('assistant', step.response, step.quickReplies, undefined, categoryToShow);
                setIsTyping(false);

                // Check if we should show checkout
                if (step.showCheckout) {
                    setShowCheckout(true);
                    setTimeout(() => setView('demo-checkout'), 500);
                }

                // Advance to next step
                setCurrentDemoStep(prev => prev + 1);
            }, 800 + Math.random() * 400);
        } else {
            // Standard mode flow
            setTimeout(() => {
                const response = generateResponse(content);
                addMessage(
                    'assistant',
                    response.content,
                    response.quickReplies,
                    response.showRecommendations ? ATLANTA_HOTELS : undefined
                );
                setIsTyping(false);

                if (response.showRecommendations) {
                    setView('recommendations');
                }
            }, 1000 + Math.random() * 500);
        }
    }, [addMessage, generateResponse, generateDemoResponse, isDemoMode, addBookedItem, updateTripContext]);

    const handleQuickReply = useCallback((reply: string) => {
        handleUserMessage(reply);
    }, [handleUserMessage]);

    const handleSelectRecommendation = useCallback((rec: Recommendation) => {
        setSelectedRecommendation(rec);
        addMessage('user', `I'd like to select ${rec.name}`);

        setIsTyping(true);
        setTimeout(() => {
            addMessage('assistant', VAL8_RESPONSES.hotel_selected.content, VAL8_RESPONSES.hotel_selected.quickReplies);
            setIsTyping(false);
            setView('summary');
        }, 800);
    }, [addMessage]);

    const handleConfirmCategory = useCallback((category: BookingCategory) => {
        const item = ATLANTA_DEMO_DATA[category];
        addBookedItem(category, item);
    }, [addBookedItem]);

    const handleDemoCheckout = useCallback(() => {
        setView('demo-success');
    }, []);

    const handleConfirmBooking = useCallback(() => {
        setIsTyping(true);
        setTimeout(() => {
            addMessage('assistant', VAL8_RESPONSES.booking_confirmed.content, VAL8_RESPONSES.booking_confirmed.quickReplies);
            setIsTyping(false);
            setView('confirmation');
        }, 1500);
    }, [addMessage]);

    const resetConversation = useCallback(() => {
        clearMessages();
        clearBookedItems();
        setTripContext({});
        setSelectedRecommendation(null);
        setUserInfo({ name: '', email: '', phone: '' });
        setCurrentDemoStep(0);
        setShowCheckout(false);
        setPendingCategories([]);
        setView('welcome');
    }, [clearMessages, clearBookedItems]);

    return (
        <VAL8Context.Provider value={{
            isOpen,
            setIsOpen,
            toggleWidget,
            isDemoMode,
            setIsDemoMode,
            demoType,
            setDemoType,
            getDemoData,
            currentDemoStep,
            showCheckout,
            setShowCheckout,
            bookedItems,
            addBookedItem,
            clearBookedItems,
            pendingCategories,
            setPendingCategories,
            view,
            setView,
            messages,
            addMessage,
            clearMessages,
            tripContext,
            updateTripContext,
            selectedRecommendation,
            setSelectedRecommendation,
            userInfo,
            setUserInfo,
            isTyping,
            setIsTyping,
            handleUserMessage,
            handleQuickReply,
            handleSelectRecommendation,
            handleConfirmBooking,
            handleConfirmCategory,
            handleDemoCheckout,
            resetConversation,
        }}>
            {children}
        </VAL8Context.Provider>
    );
}

export function useVAL8() {
    const context = useContext(VAL8Context);
    if (!context) {
        throw new Error('useVAL8 must be used within a VAL8Provider');
    }
    return context;
}
