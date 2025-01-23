import "../style/fonts";
import "../style/globals.css";
import { cutiveMono } from "../style/fonts";
import type { Metadata } from "next";
import { Providers } from "./providers";

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
    <html lang="en" className="dark">
      <body className={`${cutiveMono.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
