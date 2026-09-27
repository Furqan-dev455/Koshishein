import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import ImportantBanner from "@/components/ImportantBanner";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Koshishein — Timeless Watches",
  description:
    "Signature and everyday watches. Order on WhatsApp, delivered across Pakistan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />

        <ImportantBanner />

        {children}

        <Footer />
      </body>
    </html>
  );
}