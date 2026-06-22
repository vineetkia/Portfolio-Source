import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/portfolio";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
