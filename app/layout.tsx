
import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Great_Vibes } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemePresetProvider } from "@/context/ThemeContext";
import { VAL8Provider } from "@/context/VAL8Context";
import { VAL8Widget } from "@/components/val8/VAL8Widget";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });
const greatVibes = Great_Vibes({ weight: "400", subsets: ["latin"], variable: "--font-great-vibes" });

export const metadata: Metadata = {
  title: "Bank of PRV8 | PRV8 International",
  description: "The largest privately owned Destination Management Company (DMC)",
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
            <VAL8Provider>
              {children}
              <VAL8Widget />
            </VAL8Provider>
          </ThemePresetProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

