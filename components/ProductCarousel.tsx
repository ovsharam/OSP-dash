"use client";

import { useRef, useState, useEffect } from "react";
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

  useEffect(() => {
    // Check scroll state on mount and when products change
    const checkScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      }
    };

    checkScroll();
    // Also check after a short delay to ensure layout is complete
    const timeout = setTimeout(checkScroll, 100);
    return () => clearTimeout(timeout);
  }, [products]);

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
    <div className="mb-20">
      <div className="flex items-end justify-between mb-10 pb-4 border-b border-gray-100">
        <div>
          <h2 className="text-4xl font-serif text-primary tracking-tight">{title}</h2>
          <div className="h-1 w-12 bg-accent mt-2"></div>
        </div>
        {shopAllLink && (
          <Link
            href={shopAllLink}
            className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] hover:text-primary transition-all flex items-center gap-2 group/link"
          >
            Shop all <span className="group-hover/link:translate-x-1 transition-transform inline-block">→</span>
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
              className="flex-shrink-0 w-[280px] group"
            >
              <div className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-sm overflow-hidden hover:shadow-2xl transition-all duration-500 h-full flex flex-col transform hover:-translate-y-2 group-hover:border-accent/30">
                <div className="relative aspect-square bg-cream/50">
                  <Image
                    src={product.images[0] || "/placeholder-product.jpg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="280px"
                  />
                  {product.isBestseller && (
                    <div className="absolute top-2 left-2 bg-accent text-charcoal px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm shadow-lg">
                      ★ Bestseller
                    </div>
                  )}
                  {product.isNew && (
                    <div className="absolute top-2 left-2 bg-primary text-cream px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm shadow-lg">
                      New
                    </div>
                  )}
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-serif text-charcoal font-semibold mb-2 line-clamp-2 text-sm leading-tight group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-4 flex items-center gap-1">
                    <span className="w-1 h-1 bg-accent rounded-full"></span>
                    {product.vendor.name}
                  </p>

                  {/* Rating */}
                  {product.vendor.rating && (
                    <div className="flex items-center mb-4">
                      <div className="flex text-accent">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-[10px]">{i < Math.floor(product.vendor.rating ?? 0) ? "★" : "☆"}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Price */}
                  <div className="mt-auto pt-4 border-t border-gray-50">
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-lg font-serif font-bold text-primary">
                        {isAuthenticated && product.showWholesalePrice !== false
                          ? `$${product.price.toFixed(2)}`
                          : "Unlock Wholesale"}
                      </span>
                      {isAuthenticated &&
                        product.showWholesalePrice !== false &&
                        product.compareAtPrice && (
                          <span className="text-xs text-gray-400 line-through">
                            ${product.compareAtPrice.toFixed(2)}
                          </span>
                        )}
                    </div>

                    {/* Min order and shipping */}
                    <div className="flex items-center justify-between">
                      <div className="text-[10px] font-bold text-charcoal uppercase tracking-widest">
                        {product.minOrderQuantity && (
                          <span>${(product.minOrderQuantity * product.price).toFixed(0)} MIN</span>
                        )}
                      </div>
                      <div className="text-[10px] font-bold text-accent uppercase tracking-widest">
                        {product.shippingOptions.some((s) => s.name.toLowerCase().includes("free"))
                          ? "Free ship"
                          : "Standard"}
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

