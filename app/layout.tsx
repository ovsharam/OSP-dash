import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals-new.css";
import { AuthProvider } from "@/contexts/AuthContextNew";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { ComparisonProvider } from "@/contexts/ComparisonContext";
import { SignupModalProvider } from "@/contexts/SignupModalContext";
import { ToastProvider } from "@/contexts/ToastContext";
import Navbar from "@/components/Navbar";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "OSP Marketplace",
    description: "B2B Marketplace for Hospitality Supplies",
    robots: {
        index: false,
        follow: false,
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const organizationJsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "OSP Marketplace",
        "url": "https://organicsodapops.com",
        "logo": "https://organicsodapops.com/logo.png",
        "sameAs": [
            "https://facebook.com/organicsodapops",
            "https://instagram.com/organicsodapops"
        ]
    };

    return (
        <html lang="en">
            <body className={inter.className}>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
                />
                <AuthProvider>
                    <CartProvider>
                        <WishlistProvider>
                            <ComparisonProvider>
                                <SignupModalProvider>
                                    <ToastProvider>
                                        <Suspense fallback={<div className="h-[120px]" />}>
                                            <Navbar />
                                        </Suspense>
                                        {children}
                                    </ToastProvider>
                                </SignupModalProvider>
                            </ComparisonProvider>
                        </WishlistProvider>
                    </CartProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
