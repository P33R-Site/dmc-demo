import React from 'react';
import { CreditCard, ShieldCheck, Plane, Hotel, Car, Utensils, ShoppingBag, Map } from 'lucide-react';

import { DashboardState } from '../val8/Dashboard';

export const CheckoutWidget: React.FC<{ onCheckout?: (addToVisaCard?: boolean) => void, data?: DashboardState }> = ({ onCheckout, data }) => {
    const [status, setStatus] = React.useState<'Reserving' | 'Confirmed'>('Reserving');
    const [addToVisa, setAddToVisa] = React.useState(false);

    if (!data) return null;

    const handleCheckout = () => {
        onCheckout?.(addToVisa);
    };

    return (
        <div className="h-full p-6 flex flex-col relative overflow-hidden glass-card">
            {/* Header */}
            <div className="flex justify-between items-start mb-4 border-b border-white/10 pb-3">
                <div>
                    <h3 className="text-xl font-medium text-white mb-1">Trip Manifest</h3>
                    <div className="flex items-center gap-2 text-xs text-white/60">
                        <span>{data.flight.date}</span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span>{data.stay.guests} Travelers</span>
                    </div>
                </div>
                <div
                    className={`px-3 py-1.5 rounded-full border cursor-pointer select-none transition-all ${status === 'Reserving'
                        ? 'bg-success/20 border-success/30 text-success-light'
                        : 'bg-primary/20 border-primary/30 text-primary-light'
                        }`}
                    onClick={(e) => {
                        e.stopPropagation();
                        setStatus(status === 'Reserving' ? 'Confirmed' : 'Reserving');
                    }}
                >
                    <span className="text-xs uppercase tracking-wider font-bold">{status}</span>
                </div>
            </div>

            {/* Line Items */}
            <div className="flex-1 space-y-3 overflow-y-auto">
                {/* Flight */}
                <div className="flex justify-between items-start">
                    <div className="flex gap-3 flex-1">
                        <div className="mt-1 p-2 bg-white/5 rounded-lg border border-white/10 shrink-0">
                            <Plane className="w-4 h-4 text-white/60" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-white">
                                {data.flight.carrier} {data.flight.class}
                            </p>
                            <p className="text-xs text-white/50 uppercase tracking-wide mt-0.5">
                                Round Trip • {data.flight.origin} - {data.flight.destination}
                            </p>
                        </div>
                    </div>
                    <p className="text-sm font-light text-white/80 ml-4">
                        {data.flight.price}
                    </p>
                </div>

                {/* Hotel */}
                <div className="flex justify-between items-start">
                    <div className="flex gap-3 flex-1">
                        <div className="mt-1 p-2 bg-white/5 rounded-lg border border-white/10 shrink-0">
                            <Hotel className="w-4 h-4 text-white/60" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-white">
                                {data.stay.hotelName}
                            </p>
                            <p className="text-xs text-white/50 uppercase tracking-wide mt-0.5">
                                4 Nights • {data.stay.roomType}
                            </p>
                        </div>
                    </div>
                    <p className="text-sm font-light text-white/80 ml-4">
                        {data.stay.price}
                    </p>
                </div>

                {/* Dining */}
                <div className="flex justify-between items-start">
                    <div className="flex gap-3 flex-1">
                        <div className="mt-1 p-2 bg-white/5 rounded-lg border border-white/10 shrink-0">
                            <Utensils className="w-4 h-4 text-white/60" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-white">
                                Ossiano Experience
                            </p>
                            <p className="text-xs text-white/50 uppercase tracking-wide mt-0.5">
                                Underwater Dining • Friday
                            </p>
                        </div>
                    </div>
                    <p className="text-sm font-light text-white/80 ml-4">
                        $450
                    </p>
                </div>

                {/* Included */}
                <div className="flex justify-between items-start opacity-70">
                    <div className="flex gap-3">
                        <div className="mt-1 p-2 bg-white/5 rounded-lg border border-white/10">
                            <Car className="w-4 h-4 text-white/60" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-white">Chauffeur Service • {data.ride.serviceLevel}</p>
                            <p className="text-xs text-white/50 uppercase tracking-wide mt-0.5">Complimentary</p>
                        </div>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wide text-success-light mt-1">Included</span>
                </div>
            </div>

            {/* Total & Action */}
            <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex justify-between items-end mb-4">
                    <div className="flex flex-col">
                        <span className="text-white/50 text-xs uppercase tracking-wide mb-1">Total Due</span>
                        <p className="text-2xl font-medium text-white">
                            $12,450
                        </p>
                    </div>
                    <div className="text-right">
                        <span className="text-xs text-white/50 uppercase tracking-wide">Taxes Included</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 mb-4 bg-white/5 p-3 rounded-lg border border-white/10" onClick={(e) => e.stopPropagation()}>
                    <input
                        type="checkbox"
                        id="visa-add"
                        checked={addToVisa}
                        onChange={(e) => setAddToVisa(e.target.checked)}
                        className="w-4 h-4 accent-primary rounded border-white/20"
                    />
                    <label htmlFor="visa-add" className="text-sm text-white/80 cursor-pointer select-none">
                        Add this to your Visa card?
                    </label>
                </div>

                <button
                    onClick={handleCheckout}
                    className="w-full group relative overflow-hidden rounded-xl bg-primary text-white font-bold py-3.5 transition-all hover:scale-[1.02] hover:bg-primary-light active:scale-[0.98]"
                >
                    <div className="flex items-center justify-center gap-2">
                        <ShieldCheck className="w-5 h-5" />
                        <span className="tracking-wide">Confirm Reservation</span>
                    </div>
                </button>
            </div>
        </div>
    );
};
