"use client";

import Image from 'next/image';
import { CategoryItem } from '@/data/val8-data';
import { Check, Clock, Pencil, Images } from 'lucide-react';

interface CategoryCardProps {
    item: CategoryItem;
    onConfirm?: () => void;
    onHold?: () => void;
    onEdit?: () => void;
    onGallery?: () => void;
    compact?: boolean;
}

export function CategoryCard({ item, onConfirm, onHold, onEdit, onGallery, compact = false }: CategoryCardProps) {
    const isConfirmed = item.status === 'confirmed';
    const isHeld = item.status === 'held';
    const isEditable = item.category !== 'weather';

    if (compact) {
        // Compact version for itinerary summary
        return (
            <div className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${isConfirmed
                ? 'border-[var(--success)]/30 bg-[var(--success)]/5'
                : isHeld
                    ? 'border-[var(--primary)]/30 bg-[var(--primary)]/5'
                    : 'border-[var(--glass-border)] bg-[var(--glass-button-bg)]'
                }`}>
                {/* Image thumbnail or Icon */}
                {item.image ? (
                    <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 relative">
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                    </div>
                ) : (
                    <div className="w-10 h-10 rounded-lg bg-[var(--foreground)]/10 flex items-center justify-center text-lg flex-shrink-0">
                        {item.icon}
                    </div>
                )}

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <h4 className="text-[var(--foreground)] font-medium text-sm truncate">{item.title}</h4>
                        {isConfirmed && <Check className="w-3.5 h-3.5 text-success-light" />}
                        {isHeld && <Clock className="w-3.5 h-3.5 text-primary" />}
                    </div>
                    <p className="text-[var(--foreground)]/60 text-xs truncate">{item.subtitle}</p>
                </div>

                {/* Gallery, Edit button & Price */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                    {item.gallery && item.gallery.length > 0 && onGallery && (
                        <button
                            onClick={onGallery}
                            className="p-1.5 rounded-lg bg-[var(--foreground)]/5 hover:bg-[var(--foreground)]/10 text-[var(--foreground)]/60 hover:text-[var(--foreground)] transition-colors"
                            title="View Gallery"
                        >
                            <Images className="w-3 h-3" />
                        </button>
                    )}
                    {isEditable && onEdit && (
                        <button
                            onClick={onEdit}
                            className="p-1.5 rounded-lg bg-[var(--foreground)]/5 hover:bg-[var(--foreground)]/10 text-[var(--foreground)]/60 hover:text-[var(--foreground)] transition-colors"
                            title="Edit"
                        >
                            <Pencil className="w-3 h-3" />
                        </button>
                    )}
                    <span className="text-primary font-medium text-sm ml-1">{item.price}</span>
                </div>
            </div>
        );
    }

    // Full version for chat
    return (
        <div className={`rounded-xl overflow-hidden border transition-all ${isConfirmed
            ? 'border-[var(--success)]/30 bg-[var(--success)]/5'
            : 'border-[var(--glass-border)] bg-[var(--glass-button-bg)]'
            }`}>
            {/* Image (if available) */}
            {item.image && (
                <div className="relative h-32">
                    <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between">
                        <span className="px-2 py-1 rounded-lg bg-black/40 backdrop-blur-sm text-white text-xs font-medium">
                            {item.icon} {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                        </span>
                        {isEditable && onEdit && (
                            <button
                                onClick={onEdit}
                                className="p-1.5 rounded-lg bg-black/40 backdrop-blur-sm hover:bg-black/60 text-white transition-colors"
                                title="Edit"
                            >
                                <Pencil className="w-3.5 h-3.5" />
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Content */}
            <div className="p-4">
                {/* Header without image */}
                {!item.image && (
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/20 flex items-center justify-center text-2xl">
                            {item.icon}
                        </div>
                        <div className="flex-1">
                            <span className="text-[var(--foreground)]/60 text-xs uppercase tracking-wide">
                                {item.category}
                            </span>
                            <h4 className="text-[var(--foreground)] font-medium">{item.title}</h4>
                        </div>
                        {isEditable && onEdit && (
                            <button
                                onClick={onEdit}
                                className="p-2 rounded-lg bg-[var(--foreground)]/5 hover:bg-[var(--foreground)]/10 text-[var(--foreground)]/60 hover:text-[var(--foreground)] transition-colors"
                                title="Edit"
                            >
                                <Pencil className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                )}

                {/* With image header */}
                {item.image && (
                    <h4 className="text-[var(--foreground)] font-medium mb-1">{item.title}</h4>
                )}

                <p className="text-[var(--foreground)]/60 text-sm mb-3">{item.subtitle}</p>

                {/* Details */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {item.details.map((detail, i) => (
                        <span key={i} className="px-2 py-1 text-xs rounded-full bg-[var(--foreground)]/10 text-[var(--foreground)]/80">
                            {detail}
                        </span>
                    ))}
                </div>

                {/* Price & Actions */}
                <div className="flex items-center justify-between">
                    <span className="text-primary font-semibold text-lg">{item.price}</span>

                    {!isConfirmed && onConfirm && (
                        <div className="flex gap-2">
                            {onHold && (
                                <button
                                    onClick={onHold}
                                    className="px-3 py-1.5 rounded-lg bg-[var(--foreground)]/5 border border-[var(--glass-border)] text-[var(--foreground)]/80 text-sm hover:bg-[var(--foreground)]/10 transition-colors"
                                >
                                    Hold
                                </button>
                            )}
                            <button
                                onClick={onConfirm}
                                className="px-4 py-1.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-all"
                            >
                                Confirm
                            </button>
                        </div>
                    )}

                    {isConfirmed && (
                        <span className="flex items-center gap-1 text-success-light text-sm font-medium">
                            <Check className="w-4 h-4" /> Confirmed
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
