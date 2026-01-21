import React from 'react';
import { CloudSun } from 'lucide-react';

export const WeatherWidget: React.FC<{ temperature?: string }> = ({ temperature = "95" }) => {
    return (
        <div className="h-full p-5 flex flex-col justify-between relative overflow-hidden glass-card cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent pointer-events-none" />
            <div className="relative z-10 flex justify-between items-start">
                <div className="flex flex-col">
                    <h2 className="text-5xl font-light text-white tracking-tighter">{temperature}°</h2>
                </div>
            </div>

            <div className="relative z-10 flex flex-col items-center mt-2">
                <CloudSun className="w-8 h-8 text-amber-500 mb-1" />
                <span className="text-white font-medium text-sm">Sunny</span>
                <p className="text-white/60 text-xs">H: 88 L: 76</p>
            </div>
        </div>
    );
};
