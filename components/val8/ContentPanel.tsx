"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useVAL8 } from '@/context/VAL8Context';
import { ATLANTA_HOTELS, CATEGORY_ORDER, BookingCategory, CategoryItem } from '@/data/val8-data';
import { Star, MapPin, Calendar, Users, Check, Plane, Hotel, Car, Utensils, ShoppingBag, Palmtree, Sun, CalendarDays, Sparkles, X } from 'lucide-react';
import { CategoryCard } from './CategoryCard';
import { EditModal } from './EditModal';
import { GalleryModal } from './GalleryModal';

const CATEGORY_ICONS: Record<BookingCategory, React.ReactNode> = {
    calendar: <CalendarDays className="w-4 h-4" />,
    weather: <Sun className="w-4 h-4" />,
    flight: <Plane className="w-4 h-4" />,
    hotel: <Hotel className="w-4 h-4" />,
    ride: <Car className="w-4 h-4" />,
    dining: <Utensils className="w-4 h-4" />,
    experience: <Palmtree className="w-4 h-4" />,
    shopping: <ShoppingBag className="w-4 h-4" />,
};

export function ContentPanel({ onCollapse }: { onCollapse?: () => void }) {
    const { view, selectedRecommendation, tripContext, setSelectedRecommendation, setView, isDemoMode, bookedItems, addBookedItem } = useVAL8();

    // Modal state
    const [editingItem, setEditingItem] = useState<CategoryItem | null>(null);
    const [galleryItem, setGalleryItem] = useState<CategoryItem | null>(null);

    // Get the last message's recommendations if any
    const { messages } = useVAL8();
    const lastMessageWithRecs = [...messages].reverse().find(m => m.recommendations && m.recommendations.length > 0);
    const recommendations = lastMessageWithRecs?.recommendations || ATLANTA_HOTELS;

    // Get booked items sorted by order
    const bookedCategories = CATEGORY_ORDER.filter(cat => bookedItems[cat]);
    const bookedItemsCount = bookedCategories.length;

    const handleSelect = (rec: typeof recommendations[0]) => {
        setSelectedRecommendation(rec);
        setView('summary');
    };

    const handleContinueToCheckout = () => {
        setView('checkout');
    };

    const handleSaveEdit = (updatedItem: CategoryItem) => {
        // Update the booked item with edited values
        addBookedItem(updatedItem.category, updatedItem);
    };

    // Demo mode - show booked itinerary on right panel with widget cards
    if (isDemoMode) {
        return (
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <div className="p-4 border-b border-[var(--glass-border)] flex items-center justify-between bg-gradient-to-r from-[var(--primary)]/10 to-transparent">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <h3 className="text-[var(--foreground)] font-semibold text-lg leading-tight">Your Itinerary</h3>
                                {bookedItemsCount > 0 && (
                                    <span className="px-2 py-0.5 text-[10px] rounded-full bg-[var(--success)]/20 text-success-light">
                                        {bookedItemsCount}
                                    </span>
                                )}
                            </div>
                            <p className="text-[var(--foreground)]/60 text-sm leading-tight">
                                {tripContext.destination
                                    ? `${tripContext.destination} · ${tripContext.dates || 'Dates pending'}`
                                    : 'Building your perfect trip'}
                            </p>
                        </div>
                    </div>

                    {onCollapse && (
                        <button
                            onClick={onCollapse}
                            className="p-1.5 text-[var(--foreground)]/60 hover:text-[var(--foreground)] transition-colors rounded-lg hover:bg-[var(--foreground)]/5"
                            title="Collapse panel"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4">
                    {bookedItemsCount === 0 ? (
                        // Empty state
                        <div className="h-full flex flex-col items-center justify-center text-center p-6">
                            <div className="w-16 h-16 rounded-full bg-[var(--primary)]/20 flex items-center justify-center mb-4">
                                <Plane className="w-8 h-8 text-primary/60" />
                            </div>
                            <h4 className="text-[var(--foreground)] font-medium mb-2">Start Planning</h4>
                            <p className="text-[var(--foreground)]/60 text-sm">
                                Your confirmed bookings will appear here as you build your trip.
                            </p>
                        </div>
                    ) : (
                        // Booked items list - widget cards
                        <div className="space-y-3">
                            {bookedCategories.map((category, index) => {
                                const item = bookedItems[category];
                                if (!item) return null;
                                return (
                                    <div
                                        key={category}
                                        className="animate-in slide-in-from-right duration-300"
                                        style={{ animationDelay: `${index * 50}ms` }}
                                    >
                                        <CategoryCard
                                            item={item}
                                            compact
                                            onEdit={() => setEditingItem(item)}
                                            onGallery={() => setGalleryItem(item)}
                                        />
                                    </div>
                                );
                            })}

                            {/* Completion message when 6+ items */}
                            {bookedItemsCount >= 6 && (
                                <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[var(--success)]/10 to-[var(--primary)]/10 border border-[var(--success)]/20 animate-in fade-in duration-500">
                                    <p className="text-success-light text-sm font-medium">
                                        ✨ Trip fully organized!
                                    </p>
                                    <p className="text-[var(--foreground)]/60 text-xs mt-1">
                                        Ready for checkout when you are.
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer action - show when enough items */}
                {bookedItemsCount >= 5 && (
                    <div className="p-4 border-t border-[var(--glass-border)]">
                        <button
                            onClick={() => setView('demo-checkout')}
                            className="w-full py-3 rounded-xl bg-primary text-white font-medium text-sm hover:bg-primary-dark transition-all"
                        >
                            Complete Checkout
                        </button>
                    </div>
                )}

                {/* Edit Modal */}
                {editingItem && (
                    <EditModal
                        item={editingItem}
                        isOpen={!!editingItem}
                        onClose={() => setEditingItem(null)}
                        onSave={handleSaveEdit}
                        onOpenGallery={() => {
                            setGalleryItem(editingItem);
                            setEditingItem(null);
                        }}
                    />
                )}

                {/* Gallery Modal */}
                {galleryItem && (
                    <GalleryModal
                        item={galleryItem}
                        isOpen={!!galleryItem}
                        onClose={() => setGalleryItem(null)}
                    />
                )}
            </div>
        );
    }

    // Standard mode - show recommendations or trip summary
    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-[var(--glass-border)]">
                <h3 className="text-[var(--foreground)] font-medium">
                    {view === 'summary' ? 'Your Selection' : 'Curated For You'}
                </h3>
                <p className="text-[var(--foreground)]/60 text-xs mt-1">
                    {view === 'summary'
                        ? 'Review your trip details'
                        : tripContext.destination
                            ? `${tripContext.style || 'Luxury'} stays in ${tripContext.destination}`
                            : 'Premium recommendations'}
                </p>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
                {view === 'summary' && selectedRecommendation ? (
                    // Trip Summary View
                    <div className="space-y-4">
                        {/* Selected Hotel Card */}
                        <div className="rounded-xl overflow-hidden border border-[var(--primary)]/30 bg-[var(--primary)]/5">
                            <div className="relative h-48">
                                <Image
                                    src={selectedRecommendation.image}
                                    alt={selectedRecommendation.name}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute top-3 left-3 px-2 py-1 bg-primary rounded-lg text-white text-xs font-medium flex items-center gap-1">
                                    <Check className="w-3 h-3" /> Selected
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-3 left-3 right-3">
                                    <h4 className="text-white font-medium text-lg">{selectedRecommendation.name}</h4>
                                    <div className="flex items-center gap-2 text-sm">
                                        <div className="flex items-center gap-1 text-primary">
                                            <Star className="w-4 h-4 fill-current" />
                                            <span>{selectedRecommendation.rating}</span>
                                        </div>
                                        <span className="text-white/60">•</span>
                                        <span className="text-white font-medium">{selectedRecommendation.price}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Trip Details */}
                        <div className="bg-[var(--glass-bg)] rounded-xl p-4 border border-[var(--glass-border)] space-y-3">
                            <h5 className="text-[var(--foreground)] font-medium text-sm">Trip Details</h5>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex items-center gap-2 text-sm">
                                    <MapPin className="w-4 h-4 text-primary" />
                                    <span className="text-[var(--foreground)]/80">{tripContext.destination || 'Atlanta'}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Calendar className="w-4 h-4 text-primary" />
                                    <span className="text-[var(--foreground)]/80">{tripContext.duration || '4 nights'}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Users className="w-4 h-4 text-primary" />
                                    <span className="text-[var(--foreground)]/80">{tripContext.travelers || '2 guests'}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Star className="w-4 h-4 text-primary" />
                                    <span className="text-[var(--foreground)]/80">{tripContext.style || 'Relaxing'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Benefits */}
                        <div className="bg-[var(--glass-bg)] rounded-xl p-4 border border-[var(--glass-border)]">
                            <h5 className="text-[var(--foreground)] font-medium text-sm mb-3">Included Benefits</h5>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center gap-2 text-[var(--foreground)]/80">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                    Complimentary airport transfers
                                </li>
                                <li className="flex items-center gap-2 text-[var(--foreground)]/80">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                    Daily breakfast included
                                </li>
                                <li className="flex items-center gap-2 text-[var(--foreground)]/80">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                    Priority reservations
                                </li>
                                <li className="flex items-center gap-2 text-[var(--foreground)]/80">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                    24/7 concierge support
                                </li>
                            </ul>
                        </div>

                        {/* CTA */}
                        <button
                            onClick={handleContinueToCheckout}
                            className="w-full py-3 rounded-xl bg-primary text-white font-medium text-sm hover:bg-primary-dark transition-all"
                        >
                            Continue to Checkout
                        </button>
                    </div>
                ) : (
                    // Recommendations Grid
                    <div className="space-y-3">
                        {recommendations.map((rec) => (
                            <div
                                key={rec.id}
                                className={`rounded-xl overflow-hidden border transition-all cursor-pointer group ${selectedRecommendation?.id === rec.id
                                    ? 'border-[var(--primary)]/50 bg-[var(--primary)]/5'
                                    : 'border-[var(--glass-border)] bg-[var(--glass-bg)] hover:border-[var(--foreground)]/20'
                                    }`}
                                onClick={() => handleSelect(rec)}
                            >
                                <div className="flex">
                                    {/* Image */}
                                    <div className="relative w-28 h-28 flex-shrink-0">
                                        <Image
                                            src={rec.image}
                                            alt={rec.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 p-3 flex flex-col justify-between">
                                        <div>
                                            <h4 className="text-[var(--foreground)] font-medium text-sm group-hover:text-primary transition-colors">{rec.name}</h4>
                                            <div className="flex items-center gap-1 text-primary text-xs mt-1">
                                                <Star className="w-3 h-3 fill-current" />
                                                <span>{rec.rating}</span>
                                            </div>
                                            <div className="flex flex-wrap gap-1 mt-2">
                                                {rec.tags.slice(0, 2).map((tag) => (
                                                    <span key={tag} className="px-1.5 py-0.5 text-[10px] rounded bg-[var(--foreground)]/10 text-[var(--foreground)]/60">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between mt-2">
                                            <span className="text-primary font-medium text-xs">{rec.price}</span>
                                            <span className="text-xs text-[var(--foreground)]/50 group-hover:text-primary transition-colors">
                                                Select →
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
