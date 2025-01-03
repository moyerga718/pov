import "../style/fonts";
import "../style/globals.css";
import { cutiveMono } from "../style/fonts";
import type { Metadata } from "next";

// Metadata Here
export const metadata: Metadata = {
  title: "pov.",
  description: "My Metadata",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${cutiveMono.className} antialiased`}>{children}</body>
    </html>
  );
}
