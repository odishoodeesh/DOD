import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DOD — Zero Prompt Image Gen",
  description: "The ultimate AI image generator. Select a style, get 2 hyper-realistic masterpieces instantly.",
};

export default function RootLayout({
  children,
}: {
  // Fix: Explicitly import React to satisfy the React.ReactNode namespace requirement
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9619447476010525"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${inter.className} bg-black text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}