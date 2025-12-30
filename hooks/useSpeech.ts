"use client";

import { useState, useCallback, useEffect, useRef } from 'react';

interface UseSpeechOptions {
    rate?: number;
    pitch?: number;
    volume?: number;
    voiceName?: string;
}

export function useSpeech(options: UseSpeechOptions = {}) {
    const {
        rate = 1.0,
        pitch = 1.0,
        volume = 1.0,
        voiceName = ''
    } = options;

    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isEnabled, setIsEnabled] = useState(true);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

    // Load available voices
    useEffect(() => {
        if (typeof window === 'undefined' || !window.speechSynthesis) return;

        const loadVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            setVoices(availableVoices);
        };

        // Load voices initially
        loadVoices();

        // Chrome loads voices asynchronously
        window.speechSynthesis.onvoiceschanged = loadVoices;

        return () => {
            window.speechSynthesis.onvoiceschanged = null;
        };
    }, []);

    // Get preferred voice (prefer female English voices for concierge feel)
    const getPreferredVoice = useCallback(() => {
        if (voices.length === 0) return null;

        // If specific voice requested
        if (voiceName) {
            const specific = voices.find(v => v.name.includes(voiceName));
            if (specific) return specific;
        }

        // Prefer high-quality English voices
        const preferred = [
            'Samantha', // macOS
            'Microsoft Zira', // Windows
            'Google UK English Female',
            'Google US English',
            'Karen', // macOS
        ];

        for (const name of preferred) {
            const voice = voices.find(v => v.name.includes(name));
            if (voice) return voice;
        }

        // Fall back to any English voice
        const englishVoice = voices.find(v => v.lang.startsWith('en'));
        return englishVoice || voices[0];
    }, [voices, voiceName]);

    // Speak text
    const speak = useCallback((text: string) => {
        if (typeof window === 'undefined' || !window.speechSynthesis || !isEnabled) {
            return;
        }

        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utteranceRef.current = utterance;

        // Set voice
        const voice = getPreferredVoice();
        if (voice) {
            utterance.voice = voice;
        }

        // Set options
        utterance.rate = rate;
        utterance.pitch = pitch;
        utterance.volume = volume;

        // Event handlers
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        // Speak
        window.speechSynthesis.speak(utterance);
    }, [isEnabled, rate, pitch, volume, getPreferredVoice]);

    // Stop speaking
    const stop = useCallback(() => {
        if (typeof window === 'undefined' || !window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
    }, []);

    // Toggle voice on/off
    const toggleVoice = useCallback(() => {
        setIsEnabled(prev => {
            if (prev) {
                // Turning off, stop any current speech
                stop();
            }
            return !prev;
        });
    }, [stop]);

    return {
        speak,
        stop,
        isSpeaking,
        isEnabled,
        setIsEnabled,
        toggleVoice,
        voices,
    };
}
