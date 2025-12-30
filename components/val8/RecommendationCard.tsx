"use client";

import Image from 'next/image';
import { useVAL8 } from '@/context/VAL8Context';
import { Recommendation } from '@/data/val8-data';
import { Star, Check } from 'lucide-react';

interface RecommendationCardProps {
    recommendation: Recommendation;
}

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
    const { handleSelectRecommendation, selectedRecommendation } = useVAL8();
    const isSelected = selectedRecommendation?.id === recommendation.id;

    return (
        <div
            className={`group rounded-xl overflow-hidden border transition-all cursor-pointer ${isSelected
                ? 'border-[var(--primary)] bg-[var(--primary)]/10'
                : 'border-[var(--glass-border)] bg-[var(--glass-button-bg)] hover:border-[var(--glass-border)]'
                }`}
            onClick={() => handleSelectRecommendation(recommendation)}
        >
            {/* Image */}
            <div className="relative h-32 overflow-hidden">
                <Image
                    src={recommendation.image}
                    alt={recommendation.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Price badge */}
                <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-lg text-white text-xs font-medium">
                    {recommendation.price}
                </div>
                {/* Selected indicator */}
                {isSelected && (
                    <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-3">
                <div className="flex items-center justify-between mb-1">
                    <h4 className="text-[var(--foreground)] font-medium text-sm truncate">{recommendation.name}</h4>
                    <div className="flex items-center gap-1 text-primary">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="text-xs">{recommendation.rating}</span>
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-2">
                    {recommendation.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-2 py-0.5 text-[10px] rounded-full bg-[var(--foreground)]/5 text-[var(--foreground)]/60"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <p className="text-[var(--foreground)]/60 text-xs line-clamp-2">{recommendation.description}</p>

                {/* Select button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleSelectRecommendation(recommendation);
                    }}
                    className={`w-full mt-3 py-2 rounded-lg text-xs font-medium transition-all ${isSelected
                        ? 'bg-primary text-white'
                        : 'glass-button text-[var(--foreground)]'
                        }`}
                >
                    {isSelected ? 'Selected' : 'Select'}
                </button>
            </div>
        </div>
    );
}
