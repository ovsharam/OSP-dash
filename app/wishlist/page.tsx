"use client";

import { useWishlist } from "@/contexts/WishlistContext";
import ProductCard from "@/components/ProductCard";
import EmptyState from "@/components/EmptyState";
import Link from "next/link";

export default function WishlistPage() {
  const { items } = useWishlist();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">My Wishlist</h1>
          <p className="text-gray-600">
            {items.length} {items.length === 1 ? "item" : "items"} saved
          </p>
        </div>

        {items.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg">
            <EmptyState
              title="Your wishlist is empty"
              description="Save products you're interested in by clicking the heart icon on any product card."
              icon={
                <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              }
              action={{
                label: "Browse Products",
                onClick: () => (window.location.href = "/browse"),
              }}
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {items.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

