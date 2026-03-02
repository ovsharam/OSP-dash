"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { getProductById } from "@/lib/mockData";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { ShippingOption } from "@/types";
import ProductReviews from "@/components/ProductReviews";
import { ChevronRight, Heart, Share, ShieldCheck } from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const product = getProductById(params.id as string);

  const minimumOrder = product?.minOrderQuantity || 1;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(minimumOrder);
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption | undefined>(
    product?.shippingOptions[0]
  );
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-serif text-[#333] mb-4">Product Not Found</h1>
          <button
            onClick={() => router.push("/browse")}
            className="bg-[#5c0f0f] text-[#ece4d0] px-8 py-3 rounded-md font-bold uppercase tracking-widest hover:bg-[#3d0a0a]"
          >
            Back to Browse
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedShipping);
    router.push("/cart");
  };

  const handleRequestSample = () => {
    if (!isAuthenticated || !user?.contractSigned) {
      router.push("/sample-request");
    } else {
      alert("Sample request submitted! You will receive a confirmation email shortly.");
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#333]">
      {/* Breadcrumb */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-[11px] text-[#333]/60 uppercase tracking-widest font-bold">
          <button onClick={() => router.push("/")} className="hover:text-[#5c0f0f]">Home</button>
          <ChevronRight className="w-3 h-3" />
          <button onClick={() => router.push("/browse")} className="hover:text-[#5c0f0f]">Shop All</button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#5c0f0f] line-clamp-1">{product.name}</span>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

          {/* Left Column: Images */}
          <div className="w-full lg:w-[60%] flex flex-col gap-4">
            <div className="relative aspect-square bg-[#f9f9f9] rounded-lg overflow-hidden border border-[#333]/5 w-full">
              <Image
                src={product.images[selectedImageIndex] || "/placeholder-product.jpg"}
                alt={product.name}
                fill
                className="object-cover mix-blend-multiply transition-opacity duration-300"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
              {product.isBestseller && (
                <div className="absolute top-4 left-4 bg-[#ece4d0] text-[#5c0f0f] px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest rounded shadow-sm">
                  ★ Bestseller
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 md:w-24 aspect-square flex-shrink-0 bg-[#f9f9f9] rounded-md overflow-hidden border-2 transition-colors ${selectedImageIndex === idx ? "border-[#5c0f0f]" : "border-transparent hover:border-[#333]/20"
                      }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      fill
                      className="object-cover mix-blend-multiply"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Product Details Tabs / Content */}
            <div className="hidden lg:block mt-12 bg-white pt-8 border-t border-[#333]/10">
              <h2 className="text-sm font-bold uppercase tracking-widest text-[#333] mb-6">Product Details</h2>
              <p className="text-[#333]/80 leading-relaxed font-sans text-[15px] whitespace-pre-wrap">
                {product.description}
              </p>

              {product.dimensions && (
                <div className="mt-8 grid grid-cols-2 gap-4 bg-gray-50 p-6 rounded-md">
                  <div>
                    <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#333]/50 mb-1">Dimensions</h3>
                    <p className="text-sm font-medium">{product.dimensions.length}" L × {product.dimensions.width}" W × {product.dimensions.height}" H</p>
                  </div>
                  <div>
                    <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#333]/50 mb-1">Weight</h3>
                    <p className="text-sm font-medium">{product.dimensions.weight} lbs</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Sticky Purchasing Info */}
          <div className="w-full lg:w-[40%] flex flex-col lg:sticky lg:top-8 gap-6">

            {/* Header info */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <button
                  onClick={() => router.push(`/browse?brand=${encodeURIComponent(product.vendor.name)}`)}
                  className="text-[13px] font-bold uppercase tracking-widest text-[#5c0f0f] hover:underline"
                >
                  {product.vendor.name}
                </button>
                <div className="flex gap-3 text-[#333]/40">
                  <button onClick={() => setIsWishlisted(!isWishlisted)}>
                    <Heart className={`w-5 h-5 ${isWishlisted ? "fill-[#5c0f0f] text-[#5c0f0f]" : "hover:text-[#5c0f0f]"}`} />
                  </button>
                  <button>
                    <Share className="w-5 h-5 hover:text-[#5c0f0f]" />
                  </button>
                </div>
              </div>

              <h1 className="text-3xl md:text-3xl font-serif text-[#333] mb-4 leading-snug">
                {product.name}
              </h1>

              <div className="flex items-center gap-2 mb-6">
                {/* Rating stars placeholder based on vendor rating */}
                <div className="flex text-[#d1b181]">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-sm">{i < Math.floor(product.vendor.rating || 5) ? "★" : "☆"}</span>
                  ))}
                </div>
                <span className="text-sm text-[#333]/60 underline cursor-pointer">{product.vendor.reviewCount} Reviews</span>
              </div>
            </div>

            {/* Pricing block */}
            <div className="p-6 bg-[#fcfbf9] border border-[#d1b181]/30 rounded-lg">
              {isAuthenticated && product.showWholesalePrice !== false ? (
                <div className="mb-4">
                  <div className="flex items-end gap-3 mb-1">
                    <span className="text-3xl font-bold font-serif text-[#5c0f0f]">${product.price.toFixed(2)}</span>
                    <span className="text-[11px] font-bold text-[#333]/50 uppercase tracking-widest pb-1">Wholesale</span>
                  </div>
                  {product.compareAtPrice && (
                    <div className="text-sm text-[#333]/60">
                      MSRP: <span className="line-through">${product.compareAtPrice.toFixed(2)}</span>
                      <span className="ml-2 text-[#5c0f0f] font-medium">({Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}% Margin)</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="mb-6">
                  <h3 className="font-serif text-xl mb-2 text-[#5c0f0f]">Wholesale Pricing</h3>
                  <p className="text-sm text-[#333]/70 mb-4">Sign in or create a retailer account to view wholesale pricing and order.</p>
                  <button className="w-full bg-[#333] text-white py-3 rounded-md font-bold text-sm tracking-wide hover:bg-black transition-colors">
                    Sign in to order
                  </button>
                </div>
              )}

              {/* Add to cart (If authenticated) */}
              {isAuthenticated && product.showWholesalePrice !== false && (
                <>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between border border-[#333]/20 rounded-md p-1 bg-white">
                      <span className="pl-4 text-[12px] font-bold text-[#333]/60 uppercase tracking-widest">Qty</span>
                      <div className="flex items-center">
                        <button
                          onClick={() => setQuantity(Math.max(minimumOrder, quantity - 1))}
                          className="w-10 h-10 flex items-center justify-center text-[#333] hover:bg-gray-50 disabled:opacity-30"
                          disabled={quantity <= minimumOrder}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={quantity}
                          onChange={(e) => setQuantity(Math.max(minimumOrder, Number(e.target.value)))}
                          className="w-12 text-center border-none p-0 text-[15px] font-bold focus:ring-0"
                        />
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-10 h-10 flex items-center justify-center text-[#333] hover:bg-gray-50"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <p className="text-[11px] text-[#333]/60 text-right">Must order in multiples of {minimumOrder}</p>

                    <button
                      onClick={handleAddToCart}
                      disabled={!product.inStock}
                      className="w-full bg-[#5c0f0f] text-[#ece4d0] py-4 rounded-md font-bold uppercase tracking-widest hover:bg-[#3d0a0a] disabled:bg-gray-300 disabled:text-gray-500 transition-colors shadow-md"
                    >
                      {product.inStock ? `Add to order - $${(product.price * quantity).toFixed(2)}` : "Out of Stock"}
                    </button>

                    {product.sampleAvailable && (
                      <button
                        onClick={handleRequestSample}
                        className="w-full bg-white border border-[#333]/20 text-[#333] py-3 rounded-md font-bold uppercase tracking-wider text-[12px] hover:border-[#333] transition-colors"
                      >
                        Request a Sample
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Shipping / Trust info */}
            <div className="pt-6 border-t border-[#333]/10 space-y-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#d1b181]" />
                <div>
                  <h4 className="text-[13px] font-bold text-[#333]">Guaranteed Quality</h4>
                  <p className="text-[12px] text-[#333]/60 mt-0.5 max-w-xs">Return anything that doesn't sell within 60 days for free.</p>
                </div>
              </div>
              {product.shippingOptions && product.shippingOptions.length > 0 && (
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#d1b181]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                  <div>
                    <h4 className="text-[13px] font-bold text-[#333]">Shipping Details</h4>
                    <p className="text-[12px] text-[#333]/60 mt-0.5">Ships from {product.vendor.location || "Vendor"}. Est. {product.shippingOptions[0].estimatedDays} days.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile description (hidden on desktop, placed here naturally) */}
            <div className="lg:hidden mt-8 border-t border-[#333]/10 pt-8">
              <h2 className="text-sm font-bold uppercase tracking-widest text-[#333] mb-4">Product Details</h2>
              <p className="text-[#333]/80 leading-relaxed font-sans text-sm">{product.description}</p>
            </div>

          </div>
        </div>

        {/* Reviews Section at Bottom */}
        <div className="mt-20 pt-16 border-t border-[#333]/10">
          <ProductReviews productId={product.id} />
        </div>
      </div>
    </div>
  );
}
