import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UpMonitor - Website Status & Uptime Dashboard",
  description: "Check your website's status, response time, and uptime from multiple regions — all in one powerful dashboard.",
  icons: {
    icon: "/globe.png",
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          {/* Invisible Speed Insights tracker */}
          <div style={{ width: 0, height: 0, overflow: 'hidden', position: 'absolute' }}>
            <SpeedInsights />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
