import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Space_Grotesk, Fraunces } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/portfolio";
import { ThemeProvider } from "@/components/theme-provider";

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

// Editorial serif — used sparingly for high-contrast display accents against the
// Grotesk/mono system (the "hybrid" hacker + editorial typography direction).
// Used in exactly one place (the italic accent in Contact, below the fold), so
// it ships only the rendered variant and stays off the critical path.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400"],
  preload: false,
});

const description =
  "Vineet Kumar is an AI software engineer with 4+ years in fintech, now pursuing an MS at San Jose State University after a 2026 software engineering internship at Microsoft. Building AI-native platforms, LLM/RAG systems, and resilient distributed systems.";

export const metadata: Metadata = {
  metadataBase: new URL("https://vinet.dev"),
  title: "Vineet Kumar | AI Software Engineer",
  description,
  manifest: "/site.webmanifest",
  keywords: [
    "Vineet Kumar",
    "AI Software Engineer",
    "Software Engineer",
    "Artificial Intelligence",
    "Machine Learning",
    "LLM",
    "RAG",
    "Generative AI",
    "AI Agents",
    "Distributed Systems",
    "San Jose State University",
    "Microsoft",
    "Full-Stack Developer",
    "vinet.dev",
  ],
  authors: [{ name: profile.name, url: "https://vinet.dev" }],
  openGraph: {
    title: "Vineet Kumar | AI Software Engineer",
    description,
    url: "https://vinet.dev",
    siteName: "vinet.dev",
    images: [{ url: profile.photo, width: 1024, height: 1024, alt: profile.name }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vineet Kumar | AI Software Engineer",
    description,
    images: [profile.photo],
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${fraunces.variable} h-full antialiased`}
    >
      <head>
        <noscript>
          {/* Without JS, scroll-reveal can't run — force all content visible. */}
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
