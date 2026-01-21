import React from 'react';
import Image from 'next/image';

import { DashboardState } from '../val8/Dashboard';

export const StayWidget: React.FC<{ data: DashboardState['stay'] }> = ({ data }) => {
    return (
        <div className="h-full relative group cursor-pointer glass-card overflow-hidden">
            <Image
                src="/images/demo/hotel-exterior.png"
                alt="Hotel"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />

            <div className="absolute top-4 right-4 px-2 py-1 rounded-full bg-green-500/90 text-white text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm">
                Completed
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                        <span className="text-[10px] text-white font-medium">H</span>
                    </div>
                    <span className="text-xs text-white/80 font-medium">
                        Hotel Agent
                    </span>
                </div>
                <div className="mb-1">
                    <span className="text-white font-medium text-xl">{data.roomType}</span>
                </div>
                <div className="flex items-center gap-2 text-white/70 text-xs">
                    <span>{data.guests} Adults</span>
                    <span>•</span>
                    <span>{data.checkIn} - {data.checkOut}</span>
                </div>
                <p className="text-[10px] text-white/50 mt-1 italic">
                    Cancellation is only available within 24 hours.
                </p>
            </div>
        </div>
    );
};
