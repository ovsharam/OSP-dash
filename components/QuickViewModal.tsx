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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={product.images[0] || "/placeholder-product.jpg"}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">{product.vendor.name}</p>
                <h2 className="text-2xl font-bold text-black mb-2">{product.name}</h2>
                {product.vendor.rating && (
                  <div className="flex items-center mb-4">
                    <span className="text-sm text-black font-medium">★ {product.vendor.rating}</span>
                    {product.vendor.reviewCount && (
                      <span className="text-sm text-gray-500 ml-1">({product.vendor.reviewCount})</span>
                    )}
                  </div>
                )}
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-black transition-colors"
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

            <p className="text-gray-700 mb-4 line-clamp-3">{product.description}</p>

            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-2xl font-bold text-black">${product.price.toFixed(2)}</span>
                {product.compareAtPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    ${product.compareAtPrice.toFixed(2)}
                  </span>
                )}
              </div>
              {product.minOrderQuantity && (
                <p className="text-sm text-gray-600">Minimum order: {product.minOrderQuantity} units</p>
              )}
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center border border-gray-300 rounded">
                <button
                  onClick={() => setQuantity(Math.max(product.minOrderQuantity || 1, quantity - 1))}
                  className="px-3 py-2 hover:bg-gray-50"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(product.minOrderQuantity || 1, Number(e.target.value)))
                  }
                  className="w-16 text-center border-0 focus:outline-none text-black"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 hover:bg-gray-50"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleWishlistToggle}
                className={`p-2 rounded border ${
                  inWishlist
                    ? "border-red-500 text-red-500"
                    : "border-gray-300 text-gray-400 hover:border-gray-400"
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
              </button>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full bg-black text-white py-3 rounded font-semibold hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </button>
              <Link
                href={`/products/${product.id}`}
                onClick={onClose}
                className="block w-full bg-white border-2 border-black text-black py-3 rounded font-semibold hover:bg-gray-50 transition-colors text-center"
              >
                View Full Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


