import type { Metadata } from "next";

import { Tajawal } from "next/font/google";

import "./globals.css";

import Providers from "./providers";

import { Toaster } from "react-hot-toast";

import CartProvider from "./context/CartContext";
import WishlistProvider from "./context/WishlistContext";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Sham Tex",
  description: "Luxury Home Store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={tajawal.className}
      suppressHydrationWarning
    >
      <body className="overflow-x-hidden">
        <Providers>
          <CartProvider>
            <WishlistProvider>
              <Toaster position="top-center" />
              {children}
            </WishlistProvider>
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}