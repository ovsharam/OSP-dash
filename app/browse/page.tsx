"use client";

import { mockProducts } from "@/lib/mockData";
import ProductCard from "@/components/ProductCard";
import SidebarFilters from "@/components/SidebarFilters";
import { useState } from "react";
import Image from "next/image";
import { Search, SlidersHorizontal, ChevronRight } from "lucide-react";

export default function BrowsePage() {
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden bg-charcoal">
        <Image
          src="https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&q=80&w=1600"
          alt="Premium Chocolate Hero"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4 max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-serif text-cream mb-6 tracking-tight">
              The World's Finest <span className="text-accent italic">Chocolates</span>
            </h1>
            <p className="text-lg md:text-xl text-cream/90 font-sans font-light mb-8 max-w-2xl mx-auto leading-relaxed">
              Curating an exclusive selection of artisan craft bars, professional couvertures, and single-origin cocoa from global heritage estates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary text-cream px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-black transition-all shadow-xl">
                Shop Best Sellers
              </button>
              <button className="bg-white/10 backdrop-blur-md border border-white/20 text-cream px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-white/20 transition-all">
                Explore by Origin
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar (Desktop) */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              <div>
                <h3 className="text-primary font-serif text-lg font-bold mb-4 uppercase tracking-widest">Filters</h3>
                <div className="h-0.5 w-12 bg-accent mb-6"></div>
                <SidebarFilters />
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="flex-1">
            {/* Mobile Filter Toggle */}
            <div className="flex lg:hidden items-center justify-between mb-8 pb-4 border-b border-gray-200">
              <button
                onClick={() => setIsFilterSidebarOpen(true)}
                className="flex items-center gap-2 text-charcoal font-semibold uppercase tracking-wider text-sm"
              >
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </button>
              <span className="text-xs text-gray-500 uppercase tracking-widest">{mockProducts.length} Products</span>
            </div>

            {/* Desktop Header */}
            <div className="hidden lg:flex items-center justify-between mb-12">
              <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-widest">
                <span>Browse</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-primary font-bold">All Chocolate</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-sans text-gray-400">Showing {mockProducts.length} exquisite products</span>
                <div className="h-4 w-px bg-gray-200"></div>
                <select className="bg-transparent border-none text-sm font-bold text-charcoal focus:ring-0 cursor-pointer">
                  <option>Newest Arrivals</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Most Popular</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {mockProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>

            {/* Load More Placeholder */}
            <div className="mt-16 text-center">
              <button className="border-2 border-primary text-primary px-10 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-primary hover:text-cream transition-all duration-300">
                Discover More
              </button>
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Filter Sidebar Overlay would go here */}
    </div>
  );
}
