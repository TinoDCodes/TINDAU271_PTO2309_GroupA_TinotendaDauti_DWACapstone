import type { Metadata } from "next";
import { Nunito, Raleway } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";

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
  // TODO: make sure to add the correct urls once deployed to netlify
  openGraph: {
    type: "website",
    title: "Castify - Your Hub for Discovering & Streaming Podcasts",
    description:
      "Castify is a modern podcast app that lets you browse, stream, and track your favorite shows and episodes with ease.",
    url: "",
    images: [{ url: "" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Castify - Your Hub for Discovering & Streaming Podcasts",
    description:
      "Castify is a modern podcast app that lets you browse, stream, and track your favorite shows and episodes with ease.",
    images: [{ url: "" }],
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
    <html lang="en">
      <body className={`${nunito.variable} ${raleway.variable} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
