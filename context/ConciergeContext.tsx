"use client";

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';

// Types
export interface ClientProfile {
    id: string;
    name: string;
    membershipTier: 'Platinum' | 'Diamond' | 'Black';
    phone: string;
    email: string;
    preferences: {
        airlines: string[];
        hotels: string[];
        dietary: string[];
        interests: string[];
    };
    recentTrips: {
        destination: string;
        date: string;
        satisfaction: number;
    }[];
    notes: string;
    totalSpend: string;
}

export interface CallData {
    id: string;
    client: ClientProfile;
    status: 'waiting' | 'active' | 'on-hold' | 'completed';
    startTime: Date | null;
    waitingSince: Date;
    purpose: string;
}

export interface AIRecommendation {
    id: string;
    category: string;
    title: string;
    subtitle: string;
    price: string;
    margin: string;
    image: string;
    isSelected: boolean;
}

interface ConciergeContextType {
    // Call state
    callQueue: CallData[];
    activeCall: CallData | null;
    callDuration: number;

    // UI state
    isProfileOpen: boolean;
    setIsProfileOpen: (open: boolean) => void;

    // Actions
    acceptCall: (callId: string) => void;
    endCall: (sendQuote: boolean) => void;
    holdCall: () => void;

    // AI state
    recommendations: AIRecommendation[];
    toggleRecommendation: (id: string) => void;
    selectRecommendation: (id: string) => void;

    // Metrics
    avgTimeSaved: number;
    callsHandled: number;

    // Demo mode
    isDemoMode: boolean;
    startDemo: () => void;
    demoStep: number;
    showDemoSuccess: boolean;
    resetDemo: () => void;
}

const ConciergeContext = createContext<ConciergeContextType | undefined>(undefined);

export function useConcierge() {
    const context = useContext(ConciergeContext);
    if (!context) {
        throw new Error('useConcierge must be used within ConciergeProvider');
    }
    return context;
}

// Demo client profiles
const DEMO_CLIENTS: ClientProfile[] = [
    {
        id: '1',
        name: 'Alexandra Chen',
        membershipTier: 'Black',
        phone: '+1 (555) 234-5678',
        email: 'alexandra.chen@email.com',
        preferences: {
            airlines: ['Emirates First Class', 'Singapore Airlines Suites'],
            hotels: ['Four Seasons', 'Aman Resorts'],
            dietary: ['Pescatarian', 'No shellfish'],
            interests: ['Art galleries', 'Fine dining', 'Spa & wellness'],
        },
        recentTrips: [
            { destination: 'Tokyo, Japan', date: 'Nov 2024', satisfaction: 5 },
            { destination: 'Maldives', date: 'Sep 2024', satisfaction: 5 },
        ],
        notes: 'Prefers quiet rooms away from elevators. Always requests late checkout.',
        totalSpend: '$847,000',
    },
    {
        id: '2',
        name: 'Marcus Wellington III',
        membershipTier: 'Diamond',
        phone: '+1 (555) 987-6543',
        email: 'marcus.w@wellington.com',
        preferences: {
            airlines: ['British Airways First', 'Qantas First'],
            hotels: ['Ritz-Carlton', 'St. Regis'],
            dietary: ['No restrictions'],
            interests: ['Golf', 'Wine tasting', 'Private yacht charters'],
        },
        recentTrips: [
            { destination: 'Bordeaux, France', date: 'Oct 2024', satisfaction: 4 },
            { destination: 'Dubai, UAE', date: 'Aug 2024', satisfaction: 5 },
        ],
        notes: 'Golf at every destination. Prefers courses with ocean views.',
        totalSpend: '$523,000',
    },
    {
        id: '3',
        name: 'Sofia Rodriguez',
        membershipTier: 'Platinum',
        phone: '+1 (555) 345-6789',
        email: 'sofia.r@outlook.com',
        preferences: {
            airlines: ['Delta One', 'United Polaris'],
            hotels: ['Mandarin Oriental', 'Peninsula'],
            dietary: ['Vegan'],
            interests: ['Adventure travel', 'Photography', 'Hiking'],
        },
        recentTrips: [
            { destination: 'Patagonia, Chile', date: 'Dec 2024', satisfaction: 5 },
        ],
        notes: 'Active traveler. Needs early morning activities.',
        totalSpend: '$215,000',
    },
];

// COMPLETE TRIP recommendations
const DEMO_RECOMMENDATIONS: AIRecommendation[] = [
    {
        id: 'r1',
        category: 'flight',
        title: 'Emirates First Class',
        subtitle: 'JFK → DXB • Dec 28 • 2 passengers',
        price: '$24,900',
        margin: '8%',
        image: '',
        isSelected: false,
    },
    {
        id: 'r2',
        category: 'transfer',
        title: 'VIP Airport Meet & Greet',
        subtitle: 'Private immigration + Rolls-Royce transfer',
        price: '$850',
        margin: '25%',
        image: '',
        isSelected: false,
    },
    {
        id: 'r3',
        category: 'hotel',
        title: 'Burj Al Arab Royal Suite',
        subtitle: '5 nights • Butler service • Burj views',
        price: '$45,000',
        margin: '12%',
        image: '',
        isSelected: false,
    },
    {
        id: 'r4',
        category: 'dining',
        title: 'At.mosphere NYE Dinner',
        subtitle: 'Burj Khalifa 122nd floor • Fireworks view',
        price: '$4,500',
        margin: '18%',
        image: '',
        isSelected: false,
    },
    {
        id: 'r5',
        category: 'experience',
        title: 'Private Yacht Charter',
        subtitle: '4 hours • Palm Jumeirah sunset cruise',
        price: '$3,800',
        margin: '22%',
        image: '',
        isSelected: false,
    },
    {
        id: 'r6',
        category: 'tour',
        title: 'Louvre Abu Dhabi Private Tour',
        subtitle: 'VIP curator-led • Skip all lines',
        price: '$1,200',
        margin: '30%',
        image: '',
        isSelected: false,
    },
    {
        id: 'r7',
        category: 'event',
        title: 'Dubai Opera VIP Experience',
        subtitle: 'La Traviata • Royal Box seats',
        price: '$2,400',
        margin: '20%',
        image: '',
        isSelected: false,
    },
    {
        id: 'r8',
        category: 'experience',
        title: 'Desert Safari VIP',
        subtitle: 'Private camp • Falcon show • Dinner',
        price: '$2,800',
        margin: '25%',
        image: '',
        isSelected: false,
    },
    {
        id: 'r9',
        category: 'lounge',
        title: 'Spa Day at Talise',
        subtitle: 'Couples retreat • 4 hour package',
        price: '$1,800',
        margin: '15%',
        image: '',
        isSelected: false,
    },
    {
        id: 'r10',
        category: 'flight',
        title: 'Emirates First Class Return',
        subtitle: 'DXB → JFK • Jan 2 • 2 passengers',
        price: '$24,900',
        margin: '8%',
        image: '',
        isSelected: false,
    },
];

export function ConciergeProvider({ children }: { children: ReactNode }) {
    // Initialize call queue with demo data
    const [callQueue, setCallQueue] = useState<CallData[]>(() => {
        const now = new Date();
        return [
            {
                id: 'call-1',
                client: DEMO_CLIENTS[0],
                status: 'waiting',
                startTime: null,
                waitingSince: new Date(now.getTime() - 45000),
                purpose: 'New Year Dubai trip planning',
            },
            {
                id: 'call-2',
                client: DEMO_CLIENTS[1],
                status: 'waiting',
                startTime: null,
                waitingSince: new Date(now.getTime() - 120000),
                purpose: 'Golf vacation inquiry',
            },
            {
                id: 'call-3',
                client: DEMO_CLIENTS[2],
                status: 'waiting',
                startTime: null,
                waitingSince: new Date(now.getTime() - 30000),
                purpose: 'Adventure trip to Iceland',
            },
        ];
    });

    const [activeCall, setActiveCall] = useState<CallData | null>(null);
    const [callDuration, setCallDuration] = useState(0);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [recommendations, setRecommendations] = useState<AIRecommendation[]>(DEMO_RECOMMENDATIONS);
    const [callsHandled, setCallsHandled] = useState(12);
    const avgTimeSaved = 24;

    // Demo mode state
    const [isDemoMode, setIsDemoMode] = useState(false);
    const [demoStep, setDemoStep] = useState(0);
    const [showDemoSuccess, setShowDemoSuccess] = useState(false);

    // Call duration timer
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (activeCall?.status === 'active') {
            interval = setInterval(() => {
                setCallDuration(d => d + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [activeCall?.status]);

    const acceptCall = useCallback((callId: string) => {
        const call = callQueue.find(c => c.id === callId);
        if (call) {
            const updatedCall: CallData = {
                ...call,
                status: 'active',
                startTime: new Date(),
            };
            setActiveCall(updatedCall);
            setCallQueue(q => q.filter(c => c.id !== callId));
            setCallDuration(0);
            setIsProfileOpen(false);
            setRecommendations(DEMO_RECOMMENDATIONS);
        }
    }, [callQueue]);

    const endCall = useCallback((sendQuote: boolean) => {
        if (activeCall) {
            setCallsHandled(h => h + 1);
            setActiveCall(null);
            setCallDuration(0);
            setIsProfileOpen(false);

            if (isDemoMode && sendQuote) {
                setShowDemoSuccess(true);
            }
        }
    }, [activeCall, isDemoMode]);

    const holdCall = useCallback(() => {
        if (activeCall) {
            const heldCall: CallData = {
                ...activeCall,
                status: 'on-hold',
            };
            setCallQueue(q => [heldCall, ...q]);
            setActiveCall(null);
        }
    }, [activeCall]);

    const toggleRecommendation = useCallback((id: string) => {
        setRecommendations(recs =>
            recs.map(r => (r.id === id ? { ...r, isSelected: !r.isSelected } : r))
        );
    }, []);

    const selectRecommendation = useCallback((id: string) => {
        setRecommendations(recs =>
            recs.map(r => (r.id === id ? { ...r, isSelected: true } : r))
        );
    }, []);

    // Demo mode controller
    const startDemo = useCallback(() => {
        setIsDemoMode(true);
        setDemoStep(0);
        setShowDemoSuccess(false);
        setIsProfileOpen(false);
        setRecommendations(DEMO_RECOMMENDATIONS);
    }, []);

    const resetDemo = useCallback(() => {
        setIsDemoMode(false);
        setDemoStep(0);
        setShowDemoSuccess(false);
        setActiveCall(null);
        setCallDuration(0);
        setIsProfileOpen(false);
        setRecommendations(DEMO_RECOMMENDATIONS);
        // Reset call queue
        const now = new Date();
        setCallQueue([
            {
                id: 'call-1',
                client: DEMO_CLIENTS[0],
                status: 'waiting',
                startTime: null,
                waitingSince: new Date(now.getTime() - 45000),
                purpose: 'New Year Dubai trip planning',
            },
            {
                id: 'call-2',
                client: DEMO_CLIENTS[1],
                status: 'waiting',
                startTime: null,
                waitingSince: new Date(now.getTime() - 120000),
                purpose: 'Golf vacation inquiry',
            },
            {
                id: 'call-3',
                client: DEMO_CLIENTS[2],
                status: 'waiting',
                startTime: null,
                waitingSince: new Date(now.getTime() - 30000),
                purpose: 'Adventure trip to Iceland',
            },
        ]);
    }, []);

    // Demo automation - selects all 10 items progressively
    useEffect(() => {
        if (!isDemoMode) return;

        const demoActions: { step: number; delay: number; action: () => void }[] = [
            // Step 0: Accept call after 1s
            { step: 0, delay: 1000, action: () => acceptCall('call-1') },
            // Select recommendations progressively (every 3s)
            { step: 1, delay: 6000, action: () => selectRecommendation('r1') },  // Flight outbound
            { step: 2, delay: 2500, action: () => selectRecommendation('r2') },  // Transfer
            { step: 3, delay: 2500, action: () => selectRecommendation('r3') },  // Hotel
            { step: 4, delay: 2500, action: () => selectRecommendation('r4') },  // NYE Dinner
            { step: 5, delay: 2500, action: () => selectRecommendation('r5') },  // Yacht
            { step: 6, delay: 2500, action: () => selectRecommendation('r6') },  // Louvre
            { step: 7, delay: 2500, action: () => selectRecommendation('r7') },  // Opera
            { step: 8, delay: 2500, action: () => selectRecommendation('r8') },  // Desert Safari
            { step: 9, delay: 2500, action: () => selectRecommendation('r9') },  // Spa
            { step: 10, delay: 2500, action: () => selectRecommendation('r10') }, // Flight return
            // Open profile
            { step: 11, delay: 2000, action: () => setIsProfileOpen(true) },
            // Send quote
            { step: 12, delay: 3000, action: () => endCall(true) },
        ];

        const currentAction = demoActions.find(a => a.step === demoStep);
        if (currentAction) {
            const timeout = setTimeout(() => {
                currentAction.action();
                setDemoStep(s => s + 1);
            }, currentAction.delay);
            return () => clearTimeout(timeout);
        }
    }, [isDemoMode, demoStep, acceptCall, selectRecommendation, endCall]);

    return (
        <ConciergeContext.Provider
            value={{
                callQueue,
                activeCall,
                callDuration,
                isProfileOpen,
                setIsProfileOpen,
                acceptCall,
                endCall,
                holdCall,
                recommendations,
                toggleRecommendation,
                selectRecommendation,
                avgTimeSaved,
                callsHandled,
                isDemoMode,
                startDemo,
                demoStep,
                showDemoSuccess,
                resetDemo,
            }}
        >
            {children}
        </ConciergeContext.Provider>
    );
}
