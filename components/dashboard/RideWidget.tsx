import React from 'react';

import { DashboardState } from '../val8/Dashboard';

export const RideWidget: React.FC<{ data: DashboardState['ride'] }> = ({ data }) => {
    return (
        <div className="h-full relative overflow-hidden glass-card cursor-pointer group">
            <img
                src="/images/demo/ride-luxury-suv.png"
                alt="Ride"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
            <div className="relative h-full p-6 flex flex-col justify-end">
                <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-1 rounded-full bg-green-500/90 text-white text-xs font-medium">Scheduled</span>
                </div>
                <h3 className="text-xl font-medium text-white mb-1">Ride Agent</h3>
                <p className="text-white/80 text-sm">{data.serviceLevel}</p>
                <p className="text-white/60 text-xs mt-2">🚗 {data.pickup}</p>
            </div>
        </div>
    );
};
