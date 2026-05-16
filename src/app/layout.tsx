import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./(providers)/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NexVest Capital — Grow Wealth. Build Legacy.",
  description: "A premier investment firm delivering institutional-grade returns to individuals and families worldwide. Earn up to 35% annual returns with full transparency and security.",
  keywords: "investment, wealth management, portfolio, returns, NexVest Capital",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-full bg-[#0A1628] antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
