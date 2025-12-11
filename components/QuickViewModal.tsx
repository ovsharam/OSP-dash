"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/types";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useWishlist } from "@/contexts/WishlistContext";
import toast from "react-hot-toast";
import Link from "next/link";

interface QuickViewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(product.minOrderQuantity || 1);
  const inWishlist = isInWishlist(product.id);

  if (!isOpen) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success("Added to cart");
    onClose();
  };

  const handleWishlistToggle = () => {
    toggleWishlist(product);
    toast.success(inWishlist ? "Removed from wishlist" : "Added to wishlist");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 md:p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl border border-gray-200 max-w-2xl w-full max-h-[88vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4 p-4">
          {/* Image */}
          <div className="relative aspect-[4/5] bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 rounded-lg overflow-hidden border border-gray-200">
            <Image
              src={product.images[0] || "/placeholder-product.jpg"}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Details */}
          <div className="flex flex-col h-full">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  {product.vendor.name || "Featured vendor"}
                </p>
                <h2 className="text-lg font-semibold text-gray-900 leading-snug">{product.name}</h2>
                {product.vendor.rating && (
                  <div className="flex items-center text-sm text-gray-800 space-x-2">
                    <span className="inline-flex items-center gap-1">
                      <span className="text-amber-500">★</span>
                      <span className="font-medium">{product.vendor.rating}</span>
                    </span>
                    {product.vendor.reviewCount && (
                      <span className="text-gray-500">({product.vendor.reviewCount} reviews)</span>
                    )}
                  </div>
                )}
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-700 transition-colors"
                aria-label="Close quick view"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <p className="text-sm text-gray-700 mb-2 leading-relaxed line-clamp-2">
              {product.description}
            </p>

            <div className="flex items-center flex-wrap gap-2 mb-3">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-semibold text-gray-900">
                  {isAuthenticated && product.showWholesalePrice !== false
                    ? `$${product.price.toFixed(2)}`
                    : "Unlock wholesale price"}
                </span>
                {isAuthenticated && product.showWholesalePrice !== false && product.compareAtPrice && (
                  <span className="text-xs text-gray-500 line-through">
                    ${product.compareAtPrice.toFixed(2)}
                  </span>
                )}
              </div>
              {product.inStock ? (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium border border-green-100">
                  In stock
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-xs font-medium border border-red-100">
                  Out of stock
                </span>
              )}
              {product.minOrderQuantity && (
                <span className="text-xs text-gray-500">
                  Min order: {product.minOrderQuantity} units
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(product.minOrderQuantity || 1, quantity - 1))}
                  className="px-3 py-2 hover:bg-gray-50 text-gray-700 text-sm"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  min={product.minOrderQuantity || 1}
                  onChange={(e) =>
                    setQuantity(Math.max(product.minOrderQuantity || 1, Number(e.target.value)))
                  }
                  className="w-12 text-center border-0 focus:outline-none text-black text-sm"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 hover:bg-gray-50 text-gray-700 text-sm"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleWishlistToggle}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-md border transition-colors ${
                  inWishlist
                    ? "border-red-500 text-red-500 bg-red-50"
                    : "border-gray-300 text-gray-500 hover:border-gray-400"
                }`}
              >
                <svg className="w-5 h-5" fill={inWishlist ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span className="text-sm font-medium">{inWishlist ? "Saved" : "Save"}</span>
              </button>
            </div>

            {product.shippingOptions?.length ? (
              <div className="mb-3 space-y-2">
                <p className="text-sm font-semibold text-gray-900">Shipping options</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {product.shippingOptions.slice(0, 2).map((option) => (
                    <div
                      key={option.id}
                      className="border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 flex items-center justify-between"
                    >
                      <span className="font-medium text-gray-900">{option.name}</span>
                      <span className="text-gray-500">${option.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="space-y-2.5 mt-auto pb-1">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full bg-black text-white py-2 rounded-md font-semibold hover:bg-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm"
              >
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </button>
              <Link
                href={`/products/${product.id}`}
                onClick={onClose}
                className="block w-full text-center border-2 border-black text-black py-2 rounded-md font-semibold hover:bg-gray-50 transition-colors text-sm"
              >
                View full details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


