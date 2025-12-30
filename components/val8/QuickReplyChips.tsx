"use client";

import { useVAL8 } from '@/context/VAL8Context';

interface QuickReplyChipsProps {
    options: string[];
}

export function QuickReplyChips({ options }: QuickReplyChipsProps) {
    const { handleQuickReply } = useVAL8();

    return (
        <div className="flex flex-wrap gap-2 mt-3">
            {options.map((option) => (
                <button
                    key={option}
                    onClick={() => handleQuickReply(option)}
                    className="px-3 py-1.5 rounded-full glass-button text-[var(--foreground)] text-xs font-medium hover:text-primary transition-all"
                >
                    {option}
                </button>
            ))}
        </div>
    );
}
