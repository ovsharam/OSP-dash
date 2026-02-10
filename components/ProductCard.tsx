"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { getProductUrl } from "@/lib/mockData";
import { useAuth } from "@/contexts/AuthContextNew";
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
          <Link href={getProductUrl(product)} className="h-full block">
            <div className="bg-white rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col transform hover:-translate-y-1">
              <div className="relative aspect-square bg-gray-100 w-full flex-shrink-0">
                <Image
                  src={product.images[0] || "/placeholder-product.jpg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 16vw"
                />
                {/* Badges */}
                {product.isNew && (
                  <div className="absolute top-2 left-2 bg-pink-100 text-pink-800 px-2 py-1 text-xs font-semibold rounded">
                    New
                  </div>
                )}
                {product.isBestseller && (
                  <div className="absolute top-2 left-2 bg-green-100 text-green-800 px-2 py-1 text-xs font-semibold rounded flex items-center">
                    <span className="mr-1">★</span> Bestseller
                  </div>
                )}
                {/* Action Buttons */}
                <div className="absolute top-2 right-2 flex flex-col space-y-2 z-10">
                  <button
                    onClick={handleWishlistClick}
                    className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors"
                    aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <svg
                      className={`w-4 h-4 transition-colors ${inWishlist ? "text-red-500 fill-current" : "text-gray-400"
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
                  <button
                    onClick={handleComparisonClick}
                    className={`bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors ${inComparison ? "text-black" : "text-gray-400"
                      }`}
                    aria-label={inComparison ? "Remove from comparison" : "Add to comparison"}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="p-3 flex-1 flex flex-col min-h-[120px]">
                <h3 className="font-semibold text-black mb-1 line-clamp-2 text-sm leading-tight min-h-[2.5rem]">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-500 mb-2 line-clamp-1 min-h-[1rem]">{product.vendor.name}</p>
                {/* Rating */}
                <div className="min-h-[1.25rem] mb-2">
                  {product.vendor.rating && (
                    <div className="flex items-center">
                      <span className="text-xs text-black font-medium">
                        ★ {product.vendor.rating}
                      </span>
                      {product.vendor.reviewCount && (
                        <span className="text-xs text-gray-500 ml-1">
                          ({product.vendor.reviewCount})
                        </span>
                      )}
                    </div>
                  )}
                </div>
                {/* Price */}
                <div className="flex items-center text-sm mt-auto min-h-[1.5rem]">
                  {isAuthenticated && product.showWholesalePrice !== false ? (
                    <>
                      <span className="font-semibold text-black">${product.price.toFixed(2)}</span>
                      {product.compareAtPrice && (
                        <span className="text-gray-500 line-through ml-2 text-xs">
                          ${product.compareAtPrice.toFixed(2)}
                        </span>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center text-gray-600">
                      <svg
                        className="w-4 h-4 mr-1 flex-shrink-0"
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
                      <span className="text-xs">Unlock wholesale price</span>
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
