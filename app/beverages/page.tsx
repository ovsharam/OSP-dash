"use client";

import { useState, useMemo, Suspense } from "react";
import ProductCard from "@/components/ProductCard";
import SidebarFilters from "@/components/SidebarFilters";
import ProductComparison from "@/components/ProductComparison";
import { useComparison } from "@/contexts/ComparisonContext";
import { mockProducts, getVendors } from "@/lib/mockData";
import { Product } from "@/types";
import { FilterState } from "@/components/ProductFilters";
import Link from "next/link";

function BeveragesContent() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [showSidebarFilters, setShowSidebarFilters] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const { items: comparisonItems, removeFromComparison } = useComparison();
  const vendors = getVendors();

  const [filterState, setFilterState] = useState<FilterState>({
    category: "Beverages",
    vendor: "",
    minPrice: 0,
    maxPrice: 10000,
    inStock: null,
    sampleAvailable: null,
  });

  // Filter products to only show Beverages category
  const filteredProducts = useMemo(() => {
    let filtered: Product[] = mockProducts.filter(
      (product) => product.category === "Beverages"
    );

    // Vendor filter
    if (filterState.vendor) {
      filtered = filtered.filter((product) => product.vendor.name === filterState.vendor);
    }

    // Price filter
    filtered = filtered.filter(
      (product) => product.price >= filterState.minPrice && product.price <= filterState.maxPrice
    );

    // In stock filter
    if (filterState.inStock !== null) {
      filtered = filtered.filter((product) => product.inStock === filterState.inStock);
    }

    // Sample available filter
    if (filterState.sampleAvailable !== null) {
      filtered = filtered.filter(
        (product) => product.sampleAvailable === filterState.sampleAvailable
      );
    }

    // Active filters (new, bestseller, etc.)
    if (activeFilters.includes("new")) {
      filtered = filtered.filter((product) => product.isNew);
    }
    if (activeFilters.includes("bestseller")) {
      filtered = filtered.filter((product) => product.isBestseller);
    }
    if (activeFilters.includes("low-minimum")) {
      filtered = filtered.filter((product) => (product.minOrderQuantity || 0) <= 24);
    }
    if (activeFilters.includes("top-shop")) {
      filtered = filtered.filter((product) => (product.vendor.rating ?? 0) >= 4.8);
    }

    return filtered;
  }, [filterState, activeFilters]);

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="border-b border-gray-200">
        <div className="ml-4 md:ml-8 lg:ml-12 2xl:ml-20 mr-4 md:mr-8 lg:mr-12 2xl:mr-20 pt-8 pb-4">
          {/* Breadcrumbs */}
          <nav className="text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-black">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/browse" className="hover:text-black">Food & drink</Link>
            <span className="mx-2">/</span>
            <span className="text-black">Beverages</span>
          </nav>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-6">
            Dive into our vast selection of beverages
          </h1>

          {/* Filter Tags */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowSidebarFilters(!showSidebarFilters)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors whitespace-nowrap flex items-center ${
                showSidebarFilters
                  ? "bg-gray-800 text-white border-gray-800"
                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
              }`}
            >
              {showSidebarFilters ? (
                <>
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Hide filters
                </>
              ) : (
                <>
                  All filters
                  <svg className="inline-block w-4 h-4 ml-1 align-middle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                </>
              )}
            </button>
            <button className="px-4 py-2 rounded-full text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:border-gray-400 whitespace-nowrap">
              American brands
            </button>
            <button
              onClick={() => toggleFilter("low-minimum")}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                activeFilters.includes("low-minimum")
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
              }`}
            >
              Low minimum
            </button>
            <button
              onClick={() => toggleFilter("top-shop")}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors flex items-center ${
                activeFilters.includes("top-shop")
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
              }`}
            >
              <span className="text-green-500 mr-1">★</span> Top Shop
            </button>
            <button
              onClick={() => toggleFilter("new")}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                activeFilters.includes("new")
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
              }`}
            >
              New this month
            </button>
          </div>
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="flex">
        {/* Left Sidebar Filters */}
        {showSidebarFilters && (
          <div className="w-64 lg:w-80 xl:w-96 flex-shrink-0 border-r border-gray-200 bg-white">
            <div className="sticky top-24 max-h-[calc(100vh-96px)] overflow-y-auto">
              <SidebarFilters onFilterChange={() => {}} vendors={vendors} />
            </div>
          </div>
        )}

        {/* Right Content Area */}
        <div className={`flex-1 pt-8 pb-8 transition-all duration-300 ${showSidebarFilters ? 'ml-4 md:ml-8 lg:ml-12 2xl:ml-20 mr-4 md:mr-8 lg:mr-12 2xl:mr-20' : 'ml-4 md:ml-8 lg:ml-12 2xl:ml-20 mr-4 md:mr-8 lg:mr-12 2xl:mr-20'}`}>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found matching your filters.</p>
            </div>
          )}
        </div>
      </div>

      {/* Product Comparison */}
      {showComparison && (
        <ProductComparison
          products={comparisonItems}
          onClose={() => setShowComparison(false)}
          onRemove={removeFromComparison}
        />
      )}
    </div>
  );
}

export default function BeveragesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>}>
      <BeveragesContent />
    </Suspense>
  );
}

