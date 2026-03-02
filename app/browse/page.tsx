"use client";

import { Suspense, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { mockProducts } from "@/lib/mockData";
import ProductCard from "@/components/ProductCard";
import SidebarFilters from "@/components/SidebarFilters";
import { SlidersHorizontal, ChevronRight } from "lucide-react";

function BrowseContent() {
  const searchParams = useSearchParams();
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [sortBy, setSortBy] = useState("newest");

  // Read filters from SearchParams
  const brands = searchParams?.get("brand")?.split(",") || [];
  const origins = searchParams?.get("origin")?.split(",") || [];
  const categories = searchParams?.get("category")?.split(",") || [];
  const sampleAvailable = searchParams?.get("sampleAvailable") === "true";
  const presetFilter = searchParams?.get("filter"); // like 'new', 'bestseller'

  const filteredProducts = useMemo(() => {
    let result = [...mockProducts];

    if (brands.length > 0) {
      result = result.filter(p => brands.includes(p.vendor.name));
    }
    if (origins.length > 0) {
      result = result.filter(p => p.tags.some(tag => origins.includes(tag)));
    }
    if (categories.length > 0) {
      result = result.filter(p => categories.includes(p.category));
    }
    if (sampleAvailable) {
      result = result.filter(p => p.sampleAvailable);
    }
    if (presetFilter === "new") {
      result = result.filter(p => p.isNew);
    }
    if (presetFilter === "bestseller") {
      result = result.filter(p => p.isBestseller);
    }

    // Sort
    if (sortBy === "price_desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "price_asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "popular") {
      result.sort((a, b) => (b.vendor.rating || 0) - (a.vendor.rating || 0));
    }

    return result;
  }, [brands, origins, categories, sampleAvailable, presetFilter, sortBy]);

  return (
    <div className="min-h-screen bg-white text-[#333]">
      {/* Main Content Area */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Desktop Header */}
        <div className="hidden lg:flex items-center justify-between mb-8 pb-4 border-b border-[#333]/10">
          <div className="flex items-center gap-2 text-[11px] text-[#333]/60 uppercase tracking-widest font-bold">
            <span>Home</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#5c0f0f]">Shop All</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-sm font-sans text-[#333]/60">{filteredProducts.length} items</span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-widest font-bold text-[#333]/60">Sort By</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none text-sm font-bold text-[#333] focus:ring-0 cursor-pointer p-0"
              >
                <option value="newest">Newest Arrivals</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar (Desktop) */}
          <aside className="hidden lg:block w-60 flex-shrink-0">
            <div className="sticky top-24">
              <SidebarFilters />
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="flex-1">
            {/* Mobile Filter Toggle */}
            <div className="flex lg:hidden items-center justify-between mb-6 pb-4 border-b border-[#333]/10">
              <button
                onClick={() => setIsFilterSidebarOpen(!isFilterSidebarOpen)}
                className="flex items-center gap-2 text-[#333] font-bold uppercase tracking-widest text-[11px]"
              >
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </button>
              <span className="text-[11px] text-[#333]/60 uppercase tracking-widest font-bold">{filteredProducts.length} items</span>
            </div>

            {isFilterSidebarOpen && (
              <div className="lg:hidden mb-8 p-4 bg-gray-50 rounded-md">
                <SidebarFilters />
              </div>
            )}

            {/* Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 px-4 border border-dashed border-[#333]/20 rounded-md">
                <h3 className="font-serif text-2xl text-[#333] mb-3">No products found</h3>
                <p className="text-[#333]/60 font-sans">Try adjusting your filters to discover more items.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function BrowsePage() {
  return (
    <Suspense fallback={<div className="min-h-screen py-20 text-center text-[#5c0f0f] animate-pulse">Loading amazing chocolate...</div>}>
      <BrowseContent />
    </Suspense>
  );
}
