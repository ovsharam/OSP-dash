"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContextNew";
import { Product, ShippingOption } from "@/types";
import ProductReviews from "@/components/ProductReviews";

// New Components
import ProductGallery from "@/components/product/ProductGallery";
import ProductBuyBox from "@/components/product/ProductBuyBox";
import StickyProductHeader from "@/components/product/StickyProductHeader";
import ProductNavBar from "@/components/product/ProductNavBar";
import ProductDetails from "@/components/product/ProductDetails";
import ProductSpecs from "@/components/product/ProductSpecs";

interface ProductDetailClientProps {
    product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
    const router = useRouter();
    const { addToCart } = useCart();
    const { isAuthenticated, user } = useAuth();

    const minimumOrder = product?.minOrderQuantity ?? (product?.category === "Beverages" ? 24 : 1);

    const [quantity, setQuantity] = useState(minimumOrder);
    const [selectedShipping, setSelectedShipping] = useState<ShippingOption | undefined>(
        product?.shippingOptions[0]
    );
    const [selectedFreightQuote, setSelectedFreightQuote] = useState<any>(null);

    const handleFreightQuoteSelected = useCallback((quote: any) => {
        setSelectedFreightQuote(quote);
    }, []);

    const handleAddToCart = () => {
        addToCart(product, quantity, selectedShipping, selectedFreightQuote);
        router.push("/cart");
    };

    return (
        <div className="min-h-screen bg-white pb-20 relative">
            {/* Sticky Header on Scroll */}
            <StickyProductHeader product={product} onAddToCart={handleAddToCart} />

            {/* Main Content */}
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">

                {/* Breadcrumbs (Simplified) */}
                <div className="text-xs text-gray-500 mb-4 flex gap-1">
                    <span onClick={() => router.push('/')} className="hover:underline cursor-pointer">Home</span> &gt;
                    <span onClick={() => router.push('/browse')} className="hover:underline cursor-pointer">Browse</span> &gt;
                    <span className="font-semibold text-gray-700">{product.category}</span>
                </div>

                {/* Top Section: Gallery & Buy Box (60/40 Split) */}
                <div className="flex flex-col lg:flex-row gap-8 mb-12">
                    {/* Left Column: Images (60%) */}
                    <div className="w-full lg:w-[60%]">
                        <ProductGallery images={product.images} name={product.name} />
                    </div>

                    {/* Right Column: Buy Box (40%) */}
                    <div className="w-full lg:w-[40%]">
                        <ProductBuyBox
                            product={product}
                            quantity={quantity}
                            setQuantity={setQuantity}
                            onAddToCart={handleAddToCart}
                            handleFreightQuoteSelected={handleFreightQuoteSelected}
                        />
                    </div>
                </div>
            </div>

            {/* Anchor Navigation */}
            <ProductNavBar />

            {/* Detailed Content Sections */}
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <section id="overview" className="scroll-mt-32">
                    <ProductDetails product={product} />
                </section>

                <section id="specs" className="scroll-mt-32">
                    <ProductSpecs product={product} />
                </section>

                <section id="reviews" className="scroll-mt-32">
                    <ProductReviews productId={product.id} />
                </section>
            </div>
        </div>
    );
}
