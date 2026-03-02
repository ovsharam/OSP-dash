import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { ComparisonProvider } from "@/contexts/ComparisonContext";
import { ToastProvider } from "@/contexts/ToastContext";
import { SignupModalProvider } from "@/contexts/SignupModalContext";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import SignupModal from "@/components/SignupModal";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "WWC-Site | Premium Wholesale Chocolate",
  description: "Discover and buy premium couverture, single-origin bars, and artisan truffles from the world's best independent brands.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-white">
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <ComparisonProvider>
                <SignupModalProvider>
                  <ToastProvider />
                  <Navbar />
                  <main>{children}</main>
                  <Footer />
                  <ScrollToTop />
                  <SignupModal />
                </SignupModalProvider>
              </ComparisonProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

