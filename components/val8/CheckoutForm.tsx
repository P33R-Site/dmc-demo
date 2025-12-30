"use client";

import { useState } from 'react';
import { useVAL8 } from '@/context/VAL8Context';
import { ArrowLeft, Shield } from 'lucide-react';

export function CheckoutForm() {
    const { userInfo, setUserInfo, handleConfirmBooking, setView, selectedRecommendation } = useVAL8();
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (field: keyof typeof userInfo, value: string) => {
        setUserInfo({ ...userInfo, [field]: value });
        if (errors[field]) {
            setErrors({ ...errors, [field]: '' });
        }
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!userInfo.name.trim()) newErrors.name = 'Name is required';
        if (!userInfo.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(userInfo.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            handleConfirmBooking();
        }
    };

    return (
        <div className="flex-1 flex flex-col p-4">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <button
                    onClick={() => setView('summary')}
                    className="p-2 rounded-lg bg-[var(--foreground)]/5 text-[var(--foreground)]/60 hover:text-[var(--foreground)] transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                </button>
                <div>
                    <h3 className="text-[var(--foreground)] font-medium">Complete Booking</h3>
                    <p className="text-[var(--foreground)]/60 text-xs">Just a few details to confirm</p>
                </div>
            </div>

            {/* Summary */}
            {selectedRecommendation && (
                <div className="bg-[var(--glass-bg)] rounded-xl p-3 mb-6 border border-[var(--glass-border)] flex items-center gap-3">
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 relative">
                        <img
                            src={selectedRecommendation.image}
                            alt={selectedRecommendation.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="text-[var(--foreground)] font-medium text-sm truncate">{selectedRecommendation.name}</h4>
                        <p className="text-[var(--foreground)]/60 text-xs">{selectedRecommendation.price}</p>
                    </div>
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                <div className="space-y-4 flex-1">
                    {/* Name */}
                    <div>
                        <label className="block text-sm text-[var(--foreground)]/80 mb-1.5">Full Name *</label>
                        <input
                            type="text"
                            value={userInfo.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            placeholder="John Doe"
                            className={`w-full px-4 py-3 rounded-xl bg-[var(--glass-button-bg)] border text-[var(--foreground)] placeholder-[var(--foreground)]/50 text-sm focus:outline-none transition-colors ${errors.name ? 'border-red-500' : 'border-[var(--glass-border)] focus:border-[var(--primary)]/50'
                                }`}
                        />
                        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm text-[var(--foreground)]/80 mb-1.5">Email Address *</label>
                        <input
                            type="email"
                            value={userInfo.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            placeholder="john@example.com"
                            className={`w-full px-4 py-3 rounded-xl bg-[var(--glass-button-bg)] border text-[var(--foreground)] placeholder-[var(--foreground)]/50 text-sm focus:outline-none transition-colors ${errors.email ? 'border-red-500' : 'border-[var(--glass-border)] focus:border-[var(--primary)]/50'
                                }`}
                        />
                        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm text-[var(--foreground)]/80 mb-1.5">Phone Number (optional)</label>
                        <input
                            type="tel"
                            value={userInfo.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            placeholder="+1 (555) 123-4567"
                            className="w-full px-4 py-3 rounded-xl bg-[var(--glass-button-bg)] border border-[var(--glass-border)] text-[var(--foreground)] placeholder-[var(--foreground)]/50 text-sm focus:outline-none focus:border-[var(--primary)]/50 transition-colors"
                        />
                    </div>
                </div>

                {/* Security notice */}
                <div className="flex items-center gap-2 text-[var(--foreground)]/50 text-xs mb-4">
                    <Shield className="w-4 h-4" />
                    <span>Your information is secured and encrypted</span>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-primary text-white font-medium text-sm hover:bg-primary-dark transition-all"
                >
                    Confirm & Book
                </button>

                {/* Legal */}
                <p className="text-center text-[var(--foreground)]/50 text-[10px] mt-3">
                    By confirming, you agree to our{' '}
                    <a href="#" className="text-primary hover:underline">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                </p>
            </form>
        </div>
    );
}
