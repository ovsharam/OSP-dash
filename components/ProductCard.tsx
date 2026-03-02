"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useComparison } from "@/contexts/ComparisonContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { isAuthenticated } = useAuth();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToComparison, isInComparison, removeFromComparison } = useComparison();
  const inWishlist = isInWishlist(product.id);
  const inComparison = isInComparison(product.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    toast.success(inWishlist ? "Removed from wishlist" : "Added to wishlist");
  };

  const handleComparisonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inComparison) {
      removeFromComparison(product.id);
      toast.success("Removed from comparison");
    } else {
      addToComparison(product);
      toast.success("Added to comparison");
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
      >
        <div className="group block relative h-full">
          <Link href={`/products/${product.id}`} className="h-full block">
            <div className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-[4px] overflow-hidden hover:shadow-2xl transition-all duration-500 h-full flex flex-col transform hover:-translate-y-2 group-hover:border-accent/30">
              <div className="relative aspect-square bg-cream/50 w-full flex-shrink-0">
                <Image
                  src={product.images[0] || "/placeholder-product.jpg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 16vw"
                />
                {/* Badges */}
                {product.isNew && (
                  <div className="absolute top-2 left-2 bg-primary text-cream px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm shadow-lg">
                    New
                  </div>
                )}
                {product.isBestseller && (
                  <div className="absolute top-2 left-2 bg-accent text-charcoal px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm flex items-center shadow-lg">
                    <span className="mr-1 text-xs">★</span> Bestseller
                  </div>
                )}
                {/* Action Buttons */}
                <div className="absolute top-2 right-2 flex flex-col space-y-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={handleWishlistClick}
                    className="bg-white/90 backdrop-blur-md rounded-full p-2 shadow-sm hover:bg-primary hover:text-white transition-all duration-300"
                    aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <svg
                      className={`w-4 h-4 transition-colors ${inWishlist ? "text-red-500 fill-current" : "currentColor"
                        }`}
                      fill={inWishlist ? "currentColor" : "none"}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col min-h-[140px]">
                <h3 className="font-serif text-charcoal font-semibold mb-2 line-clamp-2 text-sm leading-tight min-h-[2.5rem] group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-3 line-clamp-1 min-h-[1rem] flex items-center gap-1">
                  <span className="w-1 h-1 bg-accent rounded-full"></span>
                  {product.vendor.name}
                </p>
                {/* Rating */}
                <div className="min-h-[1.25rem] mb-3">
                  {product.vendor.rating && (
                    <div className="flex items-center">
                      <div className="flex text-accent">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-[10px]">{i < Math.floor(product.vendor.rating ?? 0) ? "★" : "☆"}</span>
                        ))}
                      </div>
                      <span className="text-[10px] text-gray-500 font-medium ml-1.5">
                        {product.vendor.rating}
                      </span>
                    </div>
                  )}
                </div>
                {/* Price */}
                <div className="flex items-center text-sm mt-auto border-t border-gray-50 pt-3">
                  {isAuthenticated && product.showWholesalePrice !== false ? (
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif font-bold text-primary text-base">${product.price.toFixed(2)}</span>
                      {product.compareAtPrice && (
                        <span className="text-gray-400 line-through text-[10px]">
                          ${product.compareAtPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center text-accent group/price">
                      <svg
                        className="w-3.5 h-3.5 mr-1.5 transition-transform group-hover/price:scale-110"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                      <span className="text-[10px] font-bold uppercase tracking-widest">Unlock Price</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Link>
        </div>
      </motion.div>
    </>
  );
}
