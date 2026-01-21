import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVal8 } from './Val8Context';
import { FlightWidget } from '@/components/dashboard/FlightWidget';
import { StayWidget } from '@/components/dashboard/StayWidget';
import { RideWidget } from '@/components/dashboard/RideWidget';
import { ActivityWidget } from '@/components/dashboard/ActivityWidget';
import { CheckoutWidget } from '@/components/dashboard/CheckoutWidget';
import { CalendarWidget } from '@/components/dashboard/CalendarWidget';
import { WeatherWidget } from '@/components/dashboard/WeatherWidget';
import { TimezoneWidget } from '@/components/dashboard/TimezoneWidget';
import { DashboardState } from './Dashboard';
import { WidgetDetailView } from './WidgetDetailView';

// Wrapper for animation - simple opacity fade, no layout animation to prevent jumps
const WidgetContainer = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={className}
    >
        {children}
    </motion.div>
);

const DEMO_DATA: DashboardState = {
    flight: {
        origin: "SFO",
        destination: "DXB",
        carrier: "Emirates",
        class: "Business Class",
        date: "June 5 - June 9",
        flightNumber: "EK 226",
        price: "Nonstop"
    },
    stay: {
        hotelName: "The Royal Mirage",
        roomType: "King Suite",
        guests: 2,
        checkIn: "June 5",
        checkOut: "June 9",
        price: "Premium Rate"
    },
    ride: {
        pickup: "Dubai International (DXB)",
        serviceLevel: "Complimentary Chauffeur",
        dropoff: "The Royal Mirage, Dubai",
        price: "Included"
    },
    weather: {
        unit: 'F',
        alerts: false
    },
    location: {
        current: "Dubai, UAE"
    },
    timezone: {
        primary: "Gulf Standard Time",
        secondary: "Pacific Time"
    }
};

export const DemoCard: React.FC = () => {
    const { demoStep, demoPhase } = useVal8();
    const [data, setData] = useState<DashboardState>(DEMO_DATA);
    const [selectedWidget, setSelectedWidget] = useState<'flight' | 'stay' | 'ride' | 'calendar' | 'dining' | 'shopping' | 'experience' | 'checkout' | 'weather' | 'location' | 'timezone' | 'scheduling' | null>(null);

    const handleSave = (partialData: Partial<DashboardState>) => {
        setData(prev => ({ ...prev, ...partialData }));
    };

    // Mapping steps to widgets with cumulative logic (8-step Dubai demo)
    // Step 0: Initial request (Dubai trip)
    // Step 1: Calendar, Flight (pending), Weather shown
    // Step 2: Flight confirmed
    // Step 3: Hotel shown
    // Step 4: Transfers/Ride shown
    // Step 5: Dining reservation (Ossiano)
    // Step 6: Sunscreen/Shopping amenity
    // Step 7: Experience (Desert Safari)
    // Step 8: Final trip summary & checkout

    const [isCheckoutComplete, setIsCheckoutComplete] = React.useState(false);
    const [visaCardAdded, setVisaCardAdded] = React.useState(false);

    const handleCheckout = (addToVisaCard?: boolean) => {
        setVisaCardAdded(addToVisaCard || false);
        setIsCheckoutComplete(true);
    };

    return (
        <div className="h-full w-full p-6 overflow-y-auto bg-[#050505] relative">

            <WidgetDetailView
                type={selectedWidget}
                data={data}
                onSave={handleSave}
                onClose={() => setSelectedWidget(null)}
            />

            {/* Success Modal Overlay */}
            <AnimatePresence>
                {isCheckoutComplete && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="glass-card p-8 max-w-sm w-full shadow-2xl text-center relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-success via-primary to-success" />
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-success/20 rounded-full blur-3xl" />

                            <div className="mb-6 flex justify-center">
                                <div className="p-4 rounded-full bg-success/20 border border-success/30">
                                    <svg className="w-8 h-8 text-success-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>

                            <h3 className="text-2xl font-medium text-white mb-2">Itinerary Confirmed</h3>
                            <p className="text-white/70 text-sm mb-4 leading-relaxed">
                                Your Dubai itinerary is fully organized. All reservations have been confirmed.
                            </p>

                            {visaCardAdded && (
                                <p className="text-primary-light text-sm font-medium mb-4">
                                    Added to your Visa card ending in 4242
                                </p>
                            )}

                            <p className="text-white/70 text-sm mb-8 leading-relaxed">
                                Have a wonderful trip!
                            </p>

                            <button
                                onClick={() => setIsCheckoutComplete(false)}
                                className="w-full py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-light transition-colors"
                            >
                                Done
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Dynamic Grid Container */}
            <div className={`grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-6 auto-rows-max grid-flow-row-dense pb-20 transition-all duration-500 ${isCheckoutComplete ? 'blur-sm grayscale-[0.5]' : ''}`}>
                <AnimatePresence>

                    {/* STEP 1-2: INITIAL OVERVIEW - Shows after user provides dates (step 1) */}
                    {((demoStep > 1) || (demoStep === 1 && (demoPhase === 'processing' || demoPhase === 'responding'))) && (
                        <React.Fragment key="overview-fragment">
                            {/* Calendar */}
                            <WidgetContainer key="calendar" className="col-span-1 md:col-span-12 lg:col-span-3 min-h-[180px] md:min-h-[240px]">
                                <div className="h-full" onClick={() => setSelectedWidget('calendar')}>
                                    <CalendarWidget />
                                </div>
                            </WidgetContainer>

                            {/* Flight Agent - pending until user confirms (step 2), then completed */}
                            <WidgetContainer key="flight" className="col-span-1 md:col-span-12 lg:col-span-6 min-h-[240px]">
                                <div className="h-full" onClick={() => setSelectedWidget('flight')}>
                                    <FlightWidget data={data.flight} status={(demoStep > 2) || (demoStep === 2 && (demoPhase === 'processing' || demoPhase === 'responding')) ? 'completed' : 'pending'} />
                                </div>
                            </WidgetContainer>

                            {/* Weather */}
                            <WidgetContainer key="weather" className="col-span-1 md:col-span-12 lg:col-span-3 min-h-[180px] md:min-h-[240px]">
                                <div className="h-full" onClick={() => setSelectedWidget('weather')}>
                                    <WeatherWidget temperature="95" />
                                </div>
                            </WidgetContainer>
                        </React.Fragment>
                    )}


                    {/* STEP 3: HOTEL - Shows after user confirms flights */}
                    {((demoStep > 3) || (demoStep === 3 && (demoPhase === 'processing' || demoPhase === 'responding'))) && (
                        <WidgetContainer key="hotel" className="col-span-2 md:col-span-12 lg:col-span-4 min-h-[240px]">
                            <div className="h-full" onClick={() => setSelectedWidget('stay')}>
                                <StayWidget data={data.stay} />
                            </div>
                        </WidgetContainer>
                    )}

                    {/* STEP 4: TRANSFERS - Shows after hotel confirmed */}
                    {((demoStep > 4) || (demoStep === 4 && (demoPhase === 'processing' || demoPhase === 'responding'))) && (
                        <WidgetContainer key="ride" className="col-span-1 md:col-span-12 lg:col-span-4 min-h-[180px] md:min-h-[240px]">
                            <div className="h-full" onClick={() => setSelectedWidget('ride')}>
                                <RideWidget data={data.ride} />
                            </div>
                        </WidgetContainer>
                    )}

                    {/* STEP 5: DINING - Shows after transfers scheduled */}
                    {((demoStep > 5) || (demoStep === 5 && (demoPhase === 'processing' || demoPhase === 'responding'))) && (
                        <WidgetContainer key="dining" className="col-span-2 md:col-span-12 lg:col-span-4 min-h-[180px] md:min-h-[240px]">
                            <div className="h-full relative cursor-pointer glass-card overflow-hidden group" onClick={() => setSelectedWidget('dining')}>
                                <img
                                    src="/images/demo/dining-interior.png"
                                    alt="Ossiano Restaurant"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
                                <div className="relative h-full p-6 flex flex-col justify-end">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="px-2 py-1 rounded-full bg-green-500/90 text-white text-xs font-medium">Reserved</span>
                                    </div>
                                    <h3 className="text-xl font-medium text-white mb-1">Ossiano</h3>
                                    <p className="text-white/80 text-sm">Underwater Fine Dining</p>
                                    <p className="text-white/60 text-xs mt-2">🗓️ Friday at 8pm</p>
                                </div>
                            </div>
                        </WidgetContainer>
                    )}

                    {/* STEP 6: SUNSCREEN - Shows after dining booked */}
                    {((demoStep > 6) || (demoStep === 6 && (demoPhase === 'processing' || demoPhase === 'responding'))) && (
                        <WidgetContainer key="sunscreen" className="col-span-1 md:col-span-12 lg:col-span-4 min-h-[180px] md:min-h-[240px]">
                            <div className="h-full relative cursor-pointer glass-card overflow-hidden group" onClick={() => setSelectedWidget('shopping')}>
                                <img
                                    src="/images/demo/shopping-sunscreen.png"
                                    alt="Sunscreen"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
                                <div className="relative h-full p-6 flex flex-col justify-end">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="px-2 py-1 rounded-full bg-amber-500/90 text-white text-xs font-medium">In Suite</span>
                                    </div>
                                    <h3 className="text-xl font-medium text-white mb-1">Amenity</h3>
                                    <p className="text-white/80 text-sm">SunSport SPF 50</p>
                                    <p className="text-white/60 text-xs mt-2">☀️ Waiting in your suite</p>
                                </div>
                            </div>
                        </WidgetContainer>
                    )}

                    {/* STEP 7: EXPERIENCE - Shows after sunscreen added */}
                    {((demoStep > 7) || (demoStep === 7 && (demoPhase === 'processing' || demoPhase === 'responding'))) && (
                        <WidgetContainer key="experience" className="col-span-2 md:col-span-12 lg:col-span-4 min-h-[180px] md:min-h-[240px]">
                            <div className="h-full relative cursor-pointer glass-card overflow-hidden group" onClick={() => setSelectedWidget('experience')}>
                                <img
                                    src="/images/demo/destination-desert.png"
                                    alt="Desert Safari"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
                                <div className="relative h-full p-6 flex flex-col justify-end">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="px-2 py-1 rounded-full bg-amber-500/90 text-white text-xs font-medium">Added</span>
                                    </div>
                                    <h3 className="text-xl font-medium text-white mb-1">Private Desert Safari</h3>
                                    <p className="text-white/80 text-sm">Vintage Land Rovers</p>
                                    <p className="text-white/60 text-xs mt-2">🏜️ Highly Rated Experience</p>
                                </div>
                            </div>
                        </WidgetContainer>
                    )}

                    {/* STEP 8: TRIP SUMMARY - Shows after experience added */}
                    {(demoStep >= 8) && (
                        <WidgetContainer key="summary" className="col-span-2 md:col-span-12 h-full min-h-[400px]">
                            <div className="h-full" onClick={() => setSelectedWidget('checkout')}>
                                <CheckoutWidget onCheckout={handleCheckout} data={data} />
                            </div>
                        </WidgetContainer>
                    )}


                </AnimatePresence>
            </div>
        </div>
    );
};
