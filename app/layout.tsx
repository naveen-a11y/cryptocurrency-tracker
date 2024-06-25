import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cryptocurrency List | Top Cryptocurrencies by Market Cap",
  description:
    "Get the latest list of top cryptocurrencies by market capitalization. View real-time prices, market caps, and trading volumes for Bitcoin, Ethereum, Litecoin, and more.",
  keywords: [
    "cryptocurrency list",
    "top cryptocurrencies",
    "cryptocurrency market cap",
    "bitcoin price",
    "ethereum price",
    "litecoin price",
    "cryptocurrency prices",
    "crypto market data",
  ],
  alternates: {
    canonical: "https://cryptocurrency-tracker-green.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
