import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AuthWrapper } from "@/components/AuthWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "360 Print Works NJ - Complete Printing Solutions | New Jersey",
  description: "Professional printing services in New Jersey. Business cards, brochures, banners, signage, custom merchandise. Quality guaranteed with fast turnaround in NJ.",
  keywords: ["printing", "print shop NJ", "New Jersey printing", "business cards NJ", "brochures", "banners", "signage", "custom merchandise", "360 Print Works", "Irvington NJ", "Essex County NJ"],
  authors: [{ name: "360 Print Works" }],
  metadataBase: new URL("https://three60-print-works.onrender.com"),
  openGraph: {
    title: "360 Print Works NJ - Professional Printing Services",
    description: "New Jersey's premier printing company. Business cards, brochures, banners, and more.",
    type: "website",
    locale: "en_US",
    region: "US-NJ",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <AuthWrapper>
          {children}
        </AuthWrapper>
        <Toaster />
      </body>
    </html>
  );
}

