import type { Metadata } from "next";
import { Nunito, Raleway } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });
const raleway = Raleway({ subsets: ["latin"], variable: "--font-raleway" });

export const metadata: Metadata = {
  // Primary meta tags
  title: "Castify - Your Hub for Discovering & Streaming Podcasts",
  description:
    "Castify is a modern podcast app that lets you browse, stream, and track your favorite shows and episodes with ease.",
  creator: "Tinotenda Dauti",
  applicationName: "Castify",
  // SEO relevant meta data
  openGraph: {
    type: "website",
    title: "Castify - Your Hub for Discovering & Streaming Podcasts",
    description:
      "Castify is a modern podcast app that lets you browse, stream, and track your favorite shows and episodes with ease.",
    url: "https://castify-streaming.netlify.app/",
    images: [
      {
        url: "https://castify-streaming.netlify.app/assets/meta-logo-image.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Castify - Your Hub for Discovering & Streaming Podcasts",
    description:
      "Castify is a modern podcast app that lets you browse, stream, and track your favorite shows and episodes with ease.",
    images: [
      {
        url: "https://castify-streaming.netlify.app/assets/meta-logo-image.png",
      },
    ],
    site: "https://castify-streaming.netlify.app/",
  },
  keywords:
    "podcast, podcasts, Castify, streaming, audio, episodes, shows, entertainment, Castify app, podcast streaming",
  robots: "index, follow",
  authors: [{ name: "Castify" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${nunito.variable} ${raleway.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
