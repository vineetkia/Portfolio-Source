import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/portfolio";
import Providers from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const description =
  "Vineet Kumar — software engineer with 3+ years in fintech, now pursuing an MS at San Jose State University and interning at Microsoft. Building distributed systems and AI-powered platforms.";

export const metadata: Metadata = {
  metadataBase: new URL("https://vinet.dev"),
  title: "Vineet Kumar — Software Engineer",
  description,
  keywords: [
    "Vineet Kumar",
    "Software Engineer",
    "Distributed Systems",
    "San Jose State University",
    "Microsoft",
    "Full-Stack Developer",
    "vinet.dev",
  ],
  authors: [{ name: profile.name, url: "https://vinet.dev" }],
  openGraph: {
    title: "Vineet Kumar — Software Engineer",
    description,
    url: "https://vinet.dev",
    siteName: "vinet.dev",
    images: [{ url: profile.photo, width: 1024, height: 1024, alt: profile.name }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vineet Kumar — Software Engineer",
    description,
    images: [profile.photo],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <head>
        <noscript>
          {/* Without JS, framer-motion can't reveal elements — force them visible. */}
          <style>{`.reveal-motion{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
