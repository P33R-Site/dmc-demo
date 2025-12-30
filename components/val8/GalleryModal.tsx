"use client";

import { useState } from 'react';
import Image from 'next/image';
import { CategoryItem } from '@/data/val8-data';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryModalProps {
    item: CategoryItem;
    isOpen: boolean;
    onClose: () => void;
}

export function GalleryModal({ item, isOpen, onClose }: GalleryModalProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = item.gallery || [item.image].filter(Boolean) as string[];

    if (!isOpen || images.length === 0) return null;

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-3xl max-h-[90vh] mx-4">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white transition-colors z-10"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Main image */}
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-black/50">
                    <Image
                        src={images[currentIndex]}
                        alt={`${item.title} - Image ${currentIndex + 1}`}
                        fill
                        className="object-cover animate-in fade-in duration-200"
                    />

                    {/* Category badge */}
                    <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-sm text-white text-sm font-medium">
                        {item.icon} {item.title}
                    </div>

                    {/* Navigation arrows */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={handlePrev}
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={handleNext}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </>
                    )}

                    {/* Image counter */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm">
                        {currentIndex + 1} / {images.length}
                    </div>
                </div>

                {/* Thumbnail strip */}
                {images.length > 1 && (
                    <div className="flex gap-2 mt-4 justify-center">
                        {images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`relative w-16 h-12 rounded-lg overflow-hidden transition-all ${idx === currentIndex
                                    ? 'ring-2 ring-[var(--primary)] scale-105'
                                    : 'opacity-60 hover:opacity-100'
                                    }`}
                            >
                                <Image
                                    src={img}
                                    alt={`Thumbnail ${idx + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
