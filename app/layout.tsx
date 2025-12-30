
import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Great_Vibes } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemePresetProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { Val8Provider } from "@/components/val8/Val8Context";
import { Val8Widget } from "@/components/val8/Val8ChatWidget";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });
const greatVibes = Great_Vibes({ weight: "400", subsets: ["latin"], variable: "--font-great-vibes" });

export const metadata: Metadata = {
  title: "Liberty International | Luxury Travel Concierge",
  description: "DMC Partner - Powered by Liberty International Tourism Group",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${greatVibes.variable} font-sans antialiased bg-[#050505] text-[#e5e5e5] selection:bg-orange-500/30 selection:text-white`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ThemePresetProvider>
            <AuthProvider>
              <Val8Provider>
                {children}
                <Val8Widget />
              </Val8Provider>
            </AuthProvider>
          </ThemePresetProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

