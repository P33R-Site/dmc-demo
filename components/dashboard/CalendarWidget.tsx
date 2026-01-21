import React from 'react';

interface CalendarWidgetProps {
    tripStart?: number;
    tripEnd?: number;
}

export const CalendarWidget: React.FC<CalendarWidgetProps> = ({ tripStart: initialStart = 5, tripEnd: initialEnd = 9 }) => {
    const days = Array.from({ length: 30 }, (_, i) => i + 1);
    const [range, setRange] = React.useState<{ start: number | null, end: number | null }>({ start: initialStart, end: initialEnd });

    const handleDateClick = (day: number, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!range.start || (range.start && range.end)) {
            setRange({ start: day, end: null });
        } else {
            if (day < range.start) {
                setRange({ start: day, end: range.start });
            } else {
                setRange({ start: range.start, end: day });
            }
        }
    };

    return (
        <div className="h-full p-5 flex flex-col glass-card cursor-pointer">
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-white font-medium">June 2026</h3>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-white/40 mb-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <div key={`${d}-${i}`}>{d}</div>)}
            </div>

            <div className="grid grid-cols-7 gap-1 flex-1 content-start">
                {days.map(day => {
                    const isStart = day === range.start;
                    const isEnd = day === range.end;
                    const isRange = range.start && range.end && day > range.start && day < range.end;
                    const isSelected = isStart || isEnd;

                    return (
                        <div
                            key={day}
                            onClick={(e) => handleDateClick(day, e)}
                            className={`
                                flex items-center justify-center text-xs rounded-full w-full aspect-square max-w-[2rem] mx-auto transition-all cursor-pointer
                                ${isSelected ? 'bg-primary text-white font-bold scale-110 shadow-lg shadow-primary/30' : ''}
                                ${isRange ? 'bg-primary/20 text-white' : ''}
                                ${!isSelected && !isRange ? 'text-white/60 hover:bg-white/10' : ''}
                            `}
                        >
                            {day}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
