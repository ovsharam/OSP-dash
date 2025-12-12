"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import toast from "react-hot-toast";

interface ProductCarouselCardProps {
  product: Product;
}

export default function ProductCarouselCard({ product }: ProductCarouselCardProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const inWishlist = isInWishlist(product.id);
  const minOrderValue = product.minOrderQuantity
    ? (product.minOrderQuantity * product.price).toFixed(0)
    : null;

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    toast.success(inWishlist ? "Removed from wishlist" : "Added to wishlist");
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const quantity = product.minOrderQuantity ?? (product.category === "Beverages" ? 24 : 1);
    addToCart(product, quantity);
    toast.success("Added to cart");
  };

  return (
    <Link href={`/products/${product.id}`} className="block group">
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 h-full flex flex-col">
        {/* Image Section */}
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          <Image
            src={product.images[0] || "/placeholder-product.jpg"}
            alt={product.name}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-200"
            sizes="192px"
          />
          
          {/* Bestseller Badge */}
          {product.isBestseller && (
            <div className="absolute top-2 left-2 bg-black text-white text-xs font-semibold px-2 py-1 rounded uppercase">
              Bestseller
            </div>
          )}
          
          {/* Heart Icon */}
          <button
            onClick={handleWishlistClick}
            className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
              inWishlist
                ? "bg-red-50 border border-red-200"
                : "bg-white border border-gray-200 hover:border-gray-300"
            }`}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <svg
              className={`w-4 h-4 ${
                inWishlist ? "text-red-500 fill-red-500" : "text-gray-400"
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
          
          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors border border-gray-200"
            aria-label="Add to cart"
          >
            <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
        
        {/* Product Details */}
        <div className="p-3 flex-1 flex flex-col">
          {/* Price */}
          <div className="mb-1">
            <div className="flex items-baseline gap-1">
              <span className="text-base font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              {product.compareAtPrice && (
                <span className="text-xs text-gray-500 line-through">
                  MSRP ${product.compareAtPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>
          
          {/* Product Title */}
          <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2 leading-snug">
            {product.name}
          </h3>
          
          {/* Minimum Quantity */}
          {minOrderValue && (
            <p className="text-xs text-gray-600 mb-2">
              Min qty {product.minOrderQuantity}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
