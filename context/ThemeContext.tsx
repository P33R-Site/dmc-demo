"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type ThemePreset =
    | "ocean-blue"
    | "dubai-gold"
    | "desert-rose"
    | "midnight-luxury"
    | "emerald-oasis";

export interface ThemeInfo {
    id: ThemePreset;
    name: string;
    primaryColor: string;
    description: string;
}

export const themePresets: ThemeInfo[] = [
    {
        id: "ocean-blue",
        name: "Ocean Blue",
        primaryColor: "#3b82f6",
        description: "Cool and professional",
    },
    {
        id: "dubai-gold",
        name: "Dubai Gold",
        primaryColor: "#d4af37",
        description: "Warm luxury",
    },
    {
        id: "desert-rose",
        name: "Desert Rose",
        primaryColor: "#e11d48",
        description: "Elegant pink",
    },
    {
        id: "midnight-luxury",
        name: "Midnight Luxury",
        primaryColor: "#8b5cf6",
        description: "Premium purple",
    },
    {
        id: "emerald-oasis",
        name: "Emerald Oasis",
        primaryColor: "#10b981",
        description: "Fresh green",
    },
];

interface ThemeContextType {
    currentTheme: ThemePreset;
    setTheme: (theme: ThemePreset) => void;
    themePresets: ThemeInfo[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemePresetProvider({ children }: { children: ReactNode }) {
    const [currentTheme, setCurrentTheme] = useState<ThemePreset>("ocean-blue");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem("theme-preset") as ThemePreset | null;
        if (saved && themePresets.some((t) => t.id === saved)) {
            setCurrentTheme(saved);
            document.documentElement.setAttribute("data-theme", saved);
        } else {
            document.documentElement.setAttribute("data-theme", "ocean-blue");
        }
    }, []);

    const setTheme = (theme: ThemePreset) => {
        setCurrentTheme(theme);
        localStorage.setItem("theme-preset", theme);
        document.documentElement.setAttribute("data-theme", theme);
    };

    if (!mounted) {
        return null;
    }

    return (
        <ThemeContext.Provider value={{ currentTheme, setTheme, themePresets }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useThemePreset() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useThemePreset must be used within ThemePresetProvider");
    }
    return context;
}
