"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { CategoryItem } from '@/data/val8-data';
import { X, Check, Images } from 'lucide-react';

interface EditModalProps {
    item: CategoryItem;
    isOpen: boolean;
    onClose: () => void;
    onSave: (updatedItem: CategoryItem) => void;
    onOpenGallery: () => void;
}

export function EditModal({ item, isOpen, onClose, onSave, onOpenGallery }: EditModalProps) {
    const [formData, setFormData] = useState<Record<string, string>>({});

    // Initialize form data from item's editable fields
    useEffect(() => {
        if (item.editableFields) {
            const initial: Record<string, string> = {};
            item.editableFields.forEach((field) => {
                initial[field.label] = field.value;
            });
            setFormData(initial);
        }
    }, [item]);

    if (!isOpen) return null;

    const handleInputChange = (label: string, value: string) => {
        setFormData((prev) => ({ ...prev, [label]: value }));
    };

    const handleSave = () => {
        // Create updated editable fields
        const updatedFields = item.editableFields?.map((field) => ({
            ...field,
            value: formData[field.label] || field.value,
        }));

        // Create updated item
        const updatedItem: CategoryItem = {
            ...item,
            editableFields: updatedFields,
        };

        onSave(updatedItem);
        onClose();
    };

    const hasGallery = item.gallery && item.gallery.length > 0;

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[var(--background)] border border-[var(--glass-border)] rounded-2xl w-full max-w-md mx-4 shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
                {/* Header with image */}
                {item.image && (
                    <div className="relative h-32">
                        <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                            <div>
                                <span className="text-2xl mr-2">{item.icon}</span>
                                <span className="text-white font-medium">Edit {item.category}</span>
                            </div>
                            {hasGallery && (
                                <button
                                    onClick={onOpenGallery}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm text-white text-xs hover:bg-white/20 transition-colors"
                                >
                                    <Images className="w-3.5 h-3.5" />
                                    View Gallery ({item.gallery?.length})
                                </button>
                            )}
                        </div>
                        <button
                            onClick={onClose}
                            className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}

                {/* Header without image */}
                {!item.image && (
                    <div className="flex items-center justify-between p-4 border-b border-[var(--glass-border)]">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/20 flex items-center justify-center text-xl">
                                {item.icon}
                            </div>
                            <div>
                                <h3 className="text-[var(--foreground)] font-medium">Edit {item.category}</h3>
                                <p className="text-[var(--foreground)]/60 text-xs">{item.title}</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 text-[var(--foreground)]/60 hover:text-[var(--foreground)] transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                )}

                {/* Form fields */}
                <div className="p-4 space-y-4">
                    {item.editableFields?.map((field) => (
                        <div key={field.label}>
                            <label className="block text-[var(--foreground)]/60 text-xs mb-1.5">{field.label}</label>
                            {field.type === 'select' && field.options ? (
                                <select
                                    value={formData[field.label] || field.value}
                                    onChange={(e) => handleInputChange(field.label, e.target.value)}
                                    className="w-full px-3 py-2.5 rounded-lg glass-button text-[var(--foreground)] text-sm focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
                                >
                                    {field.options.map((opt) => (
                                        <option key={opt} value={opt} className="bg-[var(--background)]">
                                            {opt}
                                        </option>
                                    ))}
                                </select>
                            ) : field.type === 'number' ? (
                                <input
                                    type="number"
                                    min="1"
                                    max="20"
                                    value={formData[field.label] || field.value}
                                    onChange={(e) => handleInputChange(field.label, e.target.value)}
                                    className="w-full px-3 py-2.5 rounded-lg glass-button text-[var(--foreground)] text-sm focus:outline-none focus:border-primary transition-colors"
                                />
                            ) : (
                                <input
                                    type={field.type === 'date' ? 'text' : 'text'}
                                    value={formData[field.label] || field.value}
                                    onChange={(e) => handleInputChange(field.label, e.target.value)}
                                    className="w-full px-3 py-2.5 rounded-lg glass-button text-[var(--foreground)] text-sm focus:outline-none focus:border-primary transition-colors"
                                />
                            )}
                        </div>
                    ))}

                    {/* Price display (if any) */}
                    {item.price && (
                        <div className="pt-3 border-t border-[var(--glass-border)] flex items-center justify-between">
                            <span className="text-[var(--foreground)]/60 text-sm">Price</span>
                            <span className="text-primary font-semibold">{item.price}</span>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="p-4 pt-0 flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-2.5 rounded-xl glass-button text-[var(--foreground)]/60 font-medium text-sm hover:text-[var(--foreground)] transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex-1 py-2.5 rounded-xl bg-primary text-white font-medium text-sm hover:bg-primary-dark transition-all flex items-center justify-center gap-2"
                    >
                        <Check className="w-4 h-4" />
                        Save Changes
                    </button>
                </div>
            </div>
        </div >
    );
}
