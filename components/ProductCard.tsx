"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import toast from "react-hot-toast";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { isAuthenticated } = useAuth();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const inWishlist = isInWishlist(product.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    toast.success(inWishlist ? "Removed from wishlist" : "Added to wishlist");
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.minOrderQuantity || 1);
  };

  return (
    <Link href={`/products/${product.id}`} className="group block w-full h-full">
      <div className="bg-white border text-left border-transparent group-hover:bg-gray-50/50 transition-all h-full flex flex-col rounded-md overflow-hidden">
        {/* Image Area */}
        <div className="relative aspect-square w-full bg-[#f9f9f9] overflow-hidden rounded-t-md">
          <Image
            src={product.images[0] || "/placeholder-product.jpg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 mix-blend-multiply"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistClick}
            className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 z-10 ${inWishlist
              ? "bg-white text-red-500 opacity-100 shadow-md"
              : "bg-white/80 text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-white hover:text-gray-900 shadow-sm"
              }`}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <svg className={`w-4 h-4 ${inWishlist ? "fill-current" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isBestseller && (
              <span className="bg-[#ece4d0] text-[#5c0f0f] py-1 px-2.5 text-[10px] uppercase font-bold tracking-widest rounded-sm shadow-sm inline-block">
                Bestseller
              </span>
            )}
            {product.isNew && (
              <span className="bg-[#5c0f0f] text-[#ece4d0] py-1 px-2.5 text-[10px] uppercase font-bold tracking-widest rounded-sm shadow-sm inline-block">
                New
              </span>
            )}
            {product.sampleAvailable && (
              <span className="bg-white border border-[#d1b181]/50 text-[#5c0f0f] py-1 px-2.5 text-[10px] uppercase font-bold tracking-widest rounded-sm shadow-sm inline-block">
                Sample
              </span>
            )}
          </div>

          {/* Quick Add Button (Authenticated Only) */}
          {isAuthenticated && product.showWholesalePrice !== false && product.inStock && (
            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-10">
              <button
                onClick={handleAddToCart}
                className="w-full bg-white/95 backdrop-blur-sm text-[#333] py-2.5 rounded-sm text-[11px] font-bold uppercase tracking-widest shadow-lg hover:bg-[#5c0f0f] hover:text-white transition-colors flex items-center justify-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Quick Add
              </button>
            </div>
          )}
        </div>

        {/* Info Area */}
        <div className="pt-4 pb-2 px-1 flex-1 flex flex-col">
          {/* Brand */}
          <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 line-clamp-1">
            {product.vendor.name}
          </h4>

          {/* Title */}
          <h3 className="text-[15px] font-serif font-medium text-gray-900 leading-snug line-clamp-2 mb-2 group-hover:text-[#5c0f0f] transition-colors">
            {product.name}
          </h3>

          {/* Pricing & Min Order */}
          <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
            {isAuthenticated && product.showWholesalePrice !== false ? (
              <div className="flex gap-2 items-baseline">
                <span className="font-sans font-bold text-gray-900 text-[15px]">${product.price.toFixed(2)}</span>
                {product.compareAtPrice && (
                  <span className="text-gray-400 line-through text-[11px]">${product.compareAtPrice.toFixed(2)} MSRP</span>
                )}
              </div>
            ) : (
              <span className="text-[11px] font-bold text-[#5c0f0f] uppercase tracking-widest">Sign in to view price</span>
            )}

            {product.minOrderQuantity && (
              <span className="text-[11px] text-gray-500">
                Min {product.minOrderQuantity}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
