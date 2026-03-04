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
  title: "360 Print Works - Complete Printing Solutions",
  description: "Professional printing services for businesses. Business cards, brochures, banners, signage, custom merchandise, and more. Quality guaranteed with fast turnaround.",
  keywords: ["printing", "business cards", "brochures", "banners", "signage", "custom merchandise", "360 Print Works"],
  authors: [{ name: "360 Print Works" }],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "360 Print Works - Complete Printing Solutions",
    description: "Professional printing services for businesses",
    type: "website",
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

