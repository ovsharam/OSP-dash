"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { useAuth } from "@/contexts/AuthContext";

interface ProductCarouselProps {
  title: string;
  products: Product[];
  shopAllLink?: string;
}

export default function ProductCarousel({ title, products, shopAllLink }: ProductCarouselProps) {
  const { isAuthenticated } = useAuth();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      const newScrollLeft =
        scrollRef.current.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount);
      scrollRef.current.scrollTo({ left: newScrollLeft, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  if (products.length === 0) return null;

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
        {shopAllLink && (
          <Link
            href={shopAllLink}
            className="text-sm text-gray-700 hover:text-black transition-colors flex items-center gap-1"
          >
            Shop all {title.toLowerCase()}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>

      <div className="relative">
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors"
            aria-label="Scroll left"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="overflow-x-auto scrollbar-hide flex gap-4 pb-4"
          style={{ 
            scrollbarWidth: "none", 
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch"
          }}
        >
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="flex-shrink-0 w-64 group"
            >
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                <div className="relative aspect-square bg-gray-100">
                  <Image
                    src={product.images[0] || "/placeholder-product.jpg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="256px"
                  />
                  {product.isBestseller && (
                    <div className="absolute top-2 left-2 bg-green-100 text-green-800 px-2 py-1 text-xs font-semibold rounded flex items-center">
                      <span className="mr-1">★</span> Bestseller
                    </div>
                  )}
                  {product.isNew && (
                    <div className="absolute top-2 left-2 bg-pink-100 text-pink-800 px-2 py-1 text-xs font-semibold rounded">
                      New
                    </div>
                  )}
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="font-semibold text-black mb-1 line-clamp-2 text-sm leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-2 line-clamp-1">{product.vendor.name}</p>
                  
                  {/* Rating */}
                  {product.vendor.rating && (
                    <div className="flex items-center mb-2">
                      <span className="text-xs text-black font-medium">
                        ★ {product.vendor.rating}
                      </span>
                    </div>
                  )}

                  {/* Price */}
                  <div className="mt-auto">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-base font-semibold text-black">
                        {isAuthenticated && product.showWholesalePrice !== false
                          ? `$${product.price.toFixed(2)}`
                          : "Unlock wholesale price"}
                      </span>
                      {isAuthenticated &&
                        product.showWholesalePrice !== false &&
                        product.compareAtPrice && (
                          <span className="text-xs text-gray-500 line-through">
                            ${product.compareAtPrice.toFixed(2)}
                          </span>
                        )}
                    </div>

                    {/* Min order and shipping */}
                    <div className="text-xs text-gray-600 space-y-1">
                      {product.minOrderQuantity && (
                        <div>
                          ${(product.minOrderQuantity * product.price).toFixed(0)} min
                        </div>
                      )}
                      <div className="text-gray-500">
                        {product.shippingOptions.some((s) => s.name.toLowerCase().includes("free"))
                          ? "Free shipping"
                          : product.shippingOptions.some((s) => s.name.toLowerCase().includes("express"))
                          ? "Free shipping over $300"
                          : "Standard shipping"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors"
            aria-label="Scroll right"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

