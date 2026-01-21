import React from 'react';

import { DashboardState } from '../val8/Dashboard';

export const FlightWidget: React.FC<{ status?: 'pending' | 'completed', data: DashboardState['flight'] }> = ({ status = 'completed', data }) => {
    return (
        <div className="h-full relative overflow-hidden glass-card cursor-pointer group">
            <img
                src="/images/demo/flight-exterior.png"
                alt="Flight"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
            <div className="relative h-full p-6 flex flex-col justify-end">
                <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${status === 'pending'
                        ? 'bg-amber-500/90 text-white'
                        : 'bg-green-500/90 text-white'
                        }`}>
                        {status === 'pending' ? 'Pending' : 'Confirmed'}
                    </span>
                </div>
                <h3 className="text-xl font-medium text-white mb-1">Flight Agent</h3>
                <p className="text-white/80 text-sm">{data.origin} → {data.destination} • {data.carrier}</p>
                <p className="text-white/60 text-xs mt-2">✈️ {data.flightNumber} • {data.class}</p>
            </div>
        </div>
    );
};
