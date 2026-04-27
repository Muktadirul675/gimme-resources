import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { MessengerProvider } from "@/contexts/MessengerContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "Gimme Resources",
    template: "%s | Gimme Resources",
  },

  description:
    "Gimme Resources is an AI-powered chatbot that helps you discover the best learning resources through intelligent search and curation.",

  keywords: [
    "Gimme Resources",
    "AI chatbot",
    "resource finder",
    "learning resources",
    "RAG system",
    "education platform",
    "programming resources",
  ],

  authors: [{ name: "Gimme Resources" }],
  creator: "Gimme Resources",
  applicationName: "Gimme Resources",

  metadataBase: new URL("https://your-domain.com"),

  openGraph: {
    title: "Gimme Resources",
    description:
      "Find the best learning resources instantly with AI-powered curation.",
    url: "https://your-domain.com",
    siteName: "Gimme Resources",
    locale: "en_US",
    type: "website",

    images: [
      {
        url: "/icon.png", // ð place in /public
        width: 1200,
        height: 630,
        alt: "Gimme Resources - AI Resource Finder",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Gimme Resources",
    description:
      "An AI chatbot that curates the best resources for you.",
    images: ["/icon.png"],
  },

  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
  },

  robots: {
    index: true,
    follow: true,
  },

  category: "technology",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MessengerProvider>
          {children}
        </MessengerProvider>
      </body>
    </html>
  );
}
