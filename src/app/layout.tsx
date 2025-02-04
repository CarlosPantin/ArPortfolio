import React from "react";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const pressStart2P = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className={pressStart2P.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
