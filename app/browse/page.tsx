"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import ProductCard from "@/components/ProductCard";
import SidebarFilters from "@/components/SidebarFilters";
import ProductComparison from "@/components/ProductComparison";
import ProductCarousel from "@/components/ProductCarousel";
import AnimatedHero from "@/components/AnimatedHero";
import { useComparison } from "@/contexts/ComparisonContext";
import { useAuth } from "@/contexts/AuthContext";
import { mockProducts, getCategories, getVendors } from "@/lib/mockData";
import { Product } from "@/types";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { FilterState } from "@/components/ProductFilters";
import Link from "next/link";

const categories = [
  { id: "beverages", name: "Organic Soda Beverages", image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=200" },
  { id: "equipment", name: "Soda Equipment", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=200" },
  { id: "straws", name: "Sustainable Straws", image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=200" },
  { id: "plates", name: "Eco-Friendly Plates", image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=200" },
  { id: "cups", name: "Sustainable Cups", image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=200" },
  { id: "cutlery", name: "Biodegradable Cutlery", image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=200" },
  { id: "bowls", name: "Compostable Bowls", image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=200" },
];

// Faire-style categories for authenticated buyers
const faireCategories = [
  { id: "kitchen-tabletop", name: "Kitchen & tabletop", image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=400&fit=crop" },
  { id: "snacks", name: "Snacks", image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400&h=400&fit=crop" },
  { id: "home-accents", name: "Home accents", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop" },
  { id: "womens-apparel", name: "Women's apparel", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=400&fit=crop" },
  { id: "confections", name: "Confections", image: "https://images.unsplash.com/photo-1606312619070-d48b4e0016a4?w=400&h=400&fit=crop" },
  { id: "beverages", name: "Beverages", image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&h=400&fit=crop" },
  { id: "womens-accessories", name: "Women's accessories", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=400&fit=crop" },
  { id: "coffee-tea", name: "Coffee & tea", image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&h=400&fit=crop" },
];

function BrowseContent() {
  const { user, isAuthenticated } = useAuth();
  const searchParams = useSearchParams();
  const searchParam = searchParams?.get("search") || "";
  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [showSidebarFilters, setShowSidebarFilters] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const { items: comparisonItems, removeFromComparison } = useComparison();
  const categoryParam = searchParams?.get("category") || "";
  
  // Check if user is a buyer (authenticated and not on vendor routes)
  // For now, assume authenticated users on browse page are buyers
  const isBuyer = isAuthenticated && user;

  const categoryList = getCategories();
  const vendors = getVendors();

  const [filterState, setFilterState] = useState<FilterState>({
    category: "",
    vendor: "",
    minPrice: 0,
    maxPrice: 10000,
    inStock: null,
    sampleAvailable: null,
  });

  useEffect(() => {
    if (categoryParam) {
      setActiveFilters([categoryParam]);
    }
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [categoryParam, searchParam]);

  // Get unique vendors for featured brands with proper images
  const featuredBrands = useMemo(() => {
    const vendorMap = new Map();
    mockProducts.forEach((product) => {
      if (!vendorMap.has(product.vendor.id)) {
        // Use a representative product image for each vendor
        const vendorProducts = mockProducts.filter(p => p.vendor.id === product.vendor.id);
        const vendorImage = vendorProducts[0]?.images[0] || "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=800";
        vendorMap.set(product.vendor.id, {
          id: product.vendor.id,
          name: product.vendor.name,
          location: product.vendor.location,
          image: vendorImage,
        });
      }
    });
    return Array.from(vendorMap.values()).slice(0, 10); // Show more brands
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered: Product[] = [...mockProducts];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.vendor.name.toLowerCase().includes(query) ||
          product.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Category filter from URL, active filters, or filter state
    const categoryFilter = categoryParam || activeFilters.find(f => categoryList.includes(f)) || filterState.category;
    if (categoryFilter) {
      filtered = filtered.filter((product) => product.category === categoryFilter);
    }

    // Vendor filter
    if (filterState.vendor) {
      filtered = filtered.filter((product) => product.vendor.name === filterState.vendor);
    }

    // Price filter
    filtered = filtered.filter(
      (product) =>
        product.price >= (filterState.minPrice || 0) &&
        product.price <= (filterState.maxPrice || 10000)
    );

    // Stock filter
    if (filterState.inStock === true) {
      filtered = filtered.filter((product) => product.inStock);
    } else if (filterState.inStock === false) {
      filtered = filtered.filter((product) => !product.inStock);
    }

    // Sample available filter
    if (filterState.sampleAvailable === true) {
      filtered = filtered.filter((product) => product.sampleAvailable);
    }

    // Filter by "New" tag
    if (activeFilters.includes("new")) {
      filtered = filtered.filter((product) => product.isNew);
    }

    // Filter by "Low minimum"
    if (activeFilters.includes("low-minimum")) {
      filtered = filtered.filter((product) => (product.minOrderQuantity || 0) <= 24);
    }

    // Filter by "Bestseller"
    if (activeFilters.includes("bestseller")) {
      filtered = filtered.filter((product) => product.isBestseller);
    }

    return filtered;
  }, [searchQuery, activeFilters, categoryParam, categoryList, filterState]);

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  // Get selected category for "All [category]" link
  const selectedCategory = categoryParam || activeFilters.find(f => categoryList.includes(f)) || categoryList[0];

  // Get products for carousels
  const popularProducts = useMemo(() => {
    return mockProducts
      .filter((p) => p.isBestseller || (p.vendor.rating ?? 0) >= 4.8)
      .slice(0, 12)
      .map((p) => ({ ...p, showWholesalePrice: true }));
  }, []);

  const homeAccentsProducts = useMemo(() => {
    return mockProducts
      .filter((p) => p.category === "Tableware" || p.tags.some((t) => t.toLowerCase().includes("home")))
      .slice(0, 12)
      .map((p) => ({ ...p, showWholesalePrice: true }));
  }, []);

  const beveragesProducts = useMemo(() => {
    return mockProducts
      .filter((p) => p.category === "Beverages")
      .slice(0, 12)
      .map((p) => ({ ...p, showWholesalePrice: true }));
  }, []);

  // Show Faire-style homepage for authenticated buyers
  if (isBuyer) {
    return (
      <div className="min-h-screen bg-white">
        {/* Top Promotional Banner */}
        <div className="bg-amber-50 border-b border-amber-200 py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center text-sm">
              <span className="text-gray-800">Enjoy 50% off! Shop food, drinks, and more.</span>
              <Link href="/browse" className="ml-2 text-gray-800 underline hover:text-black">
                View details
              </Link>
            </div>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-8">
            Welcome to OSP, {user?.name || "Buyer"}
          </h1>

          {/* Category Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
            {faireCategories.map((category) => (
              <Link
                key={category.id}
                href={`/browse?category=${encodeURIComponent(category.name)}`}
                className="group cursor-pointer"
              >
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="aspect-square relative bg-gray-100 overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-900 text-center group-hover:text-black transition-colors">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Holiday Shop Banner */}
          <div className="bg-[#8B4513] rounded-lg overflow-hidden mb-12 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8 md:p-12">
              <div className="text-white z-10">
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                  The Holiday Shop
                </h2>
                <p className="text-lg md:text-xl mb-6 text-white/90 leading-relaxed">
                  Make this holiday season magical for your customers with everything they need from memorable family moments to gifts for everyone on their list.
                </p>
                <Link
                  href="/browse?category=Holiday"
                  className="inline-block bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                >
                  Shop all
                </Link>
              </div>
              <div className="relative h-64 md:h-96 flex items-center justify-center">
                {/* Decorative holiday items */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-yellow-400 rounded-full opacity-20"></div>
                  <div className="absolute top-8 right-8 w-16 h-16 bg-amber-500 rounded-full opacity-30"></div>
                  <div className="absolute bottom-8 left-8 w-20 h-20 bg-orange-400 rounded-full opacity-25"></div>
                </div>
                <div className="relative z-10 text-white text-center">
                  <div className="text-6xl mb-4">🎄</div>
                  <div className="text-4xl mb-2">🎁</div>
                  <div className="text-5xl">✨</div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Carousels */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Popular with stores like yours */}
            <ProductCarousel
              title="Popular with stores like yours"
              products={popularProducts}
              shopAllLink="/browse?filter=bestseller"
            />

            {/* Mid-Page Promotional Banner */}
            <div className="bg-gray-50 rounded-lg overflow-hidden mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8 md:p-12">
                <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&h=600&fit=crop"
                    alt="First order discount"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-4 md:p-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    You've got 50% off your first order.
                  </h2>
                  <p className="text-base md:text-lg text-gray-700 mb-2">
                    Welcome to OSP! You've got 7 days to use this welcome offer.
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    Maximum discount is $100. Offer ends December 19, 2025, at 07:59 AM UTC and is automatically applied at checkout.
                  </p>
                  <Link
                    href="/browse"
                    className="inline-block bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                  >
                    Shop now
                  </Link>
                </div>
              </div>
            </div>

            {/* Home accents */}
            <ProductCarousel
              title="Home accents"
              products={homeAccentsProducts}
              shopAllLink="/browse?category=Tableware"
            />

            {/* Beverages */}
            <ProductCarousel
              title="Beverages"
              products={beveragesProducts}
              shopAllLink="/beverages"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Animated Hero Section */}
      <AnimatedHero />

      {/* Featured Brands Section */}
      <div data-test-id="best-brands-banner-v2" className="mt-12 mb-0 ml-4 md:ml-8 lg:ml-12 2xl:ml-20 f_flex_base f_flex_single_value_direction" style={{ "--f_flex_direction_mobile": "column" } as React.CSSProperties}>
        <div className="items-start f_flex_base f_flex_single_value_direction" style={{ "--f_flex_direction_mobile": "column" } as React.CSSProperties}>
          <h4 className="f_t_base f_t_color f_t_displaySSerifRegular" style={{ "--f_t_color": "#333333", "--f_t_decorationColor": "#757575" } as React.CSSProperties}>
            Featured brands
          </h4>
          <div className="f_spacer_base f_spacer_variable_fb f_spacer_variable_min_height" style={{ "--f_spacer_size_mobile": "24px", "--f_spacer_size_tablet": "16px", "--f_spacer_size_desktop": "24px", "--f_spacer_size_xlarge": "24px", "--f_spacer_size_xxlarge": "24px", width: "0px" } as React.CSSProperties}></div>
          <div className="w-full f_flex_base f_flex_single_value_justify f_flex_single_value_direction" style={{ "--f_flex_justify_mobile": "space-between", "--f_flex_direction_mobile": "row" } as React.CSSProperties}>
            <div className="overflow-auto">
              <div className="f_c_carousel_wrapper_base f_c_carousel_wrapper_mobile w-full flex overflow-x-auto scrollbar-hide" style={{ "--f-c-item-gap-mobile": "8px", "--f-c-item-gap-tablet": "8px", "--f-c-item-gap-desktop": "8px", "--f-c-item-gap-xlarge": "8px", "--f-c-item-gap-xxlarge": "8px", gap: "8px" } as React.CSSProperties}>
                <div className="f_c_inner_container f_flex_base" style={{ transform: "translate3d(0px, 0px, 0px)" } as React.CSSProperties}>
                  {categoryList.map((category, index) => {
                    const isActive = categoryParam === category || (categoryParam === "" && index === 0);
                    return (
                      <div key={category} className="f_c_slide_width_free_flow f_c_slide_gap flex-shrink-0" data-index={index}>
                        <div>
                          <p
                            tabIndex={0}
                            onClick={() => {
                              window.location.href = `/browse?category=${encodeURIComponent(category)}`;
                            }}
                            className={`f_t_base f_t_color hover:border-fs-action-border-default focus-visible:border-fs-action-border-default flex h-10 cursor-pointer items-center justify-center rounded-[40px] border p-4! f_t_paragraphSansRegular ${
                              isActive
                                ? "border-fs-action-border-default bg-white"
                                : "border-fs-border-muted"
                            }`}
                            style={{
                              "--f_t_color": "#333333",
                              "--f_t_decorationColor": "#757575"
                            } as React.CSSProperties}
                          >
                            {category}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <a
              className="xl:pr-12! 2xl:pr-20! fslegacy-component hidden xl:block text-sm text-gray-700 hover:text-black transition-colors whitespace-nowrap flex-shrink-0"
              aria-disabled={false}
              href={`/browse?category=${encodeURIComponent(selectedCategory)}`}
              style={{ marginRight: "3rem" } as React.CSSProperties}
            >
              All brands
            </a>
          </div>
          <div className="relative w-full overflow-hidden pr-4 md:pr-8 lg:pr-12 2xl:pr-20 pill-with-content-fade-in bottom-0 opacity-100">
            <div className="items-start f_flex_base f_flex_single_value_direction" style={{ "--f_flex_direction_mobile": "column" } as React.CSSProperties}>
              <div className="f_spacer_base f_spacer_variable_fb f_spacer_variable_min_height" style={{ "--f_spacer_size_mobile": "24px", "--f_spacer_size_tablet": "16px", "--f_spacer_size_desktop": "24px", "--f_spacer_size_xlarge": "24px", "--f_spacer_size_xxlarge": "24px", width: "0px" } as React.CSSProperties}></div>
              <div className="w-full overflow-x-auto scrollbar-hide">
                <div className="flex gap-4 md:gap-6" style={{ width: "max-content" } as React.CSSProperties}>
                  {featuredBrands.map((vendor) => (
                    <a
                      key={vendor.id}
                      href={`/browse?vendor=${encodeURIComponent(vendor.name)}`}
                      className="group flex-shrink-0"
                      style={{ width: "200px" } as React.CSSProperties}
                    >
                      <div className="w-full f_flex_base f_flex_single_value_direction" style={{ "--f_flex_direction_mobile": "column" } as React.CSSProperties}>
                        <div className="rounded-fs-component-default overflow-hidden aspect-square w-full">
                          <picture className="flex lg:origin-left lg:transition-transform lg:duration-[1200ms] lg:ease-[cubic-bezier(0.17,0.67,0.24,1)] lg:group-hover:scale-110 block w-full h-full">
                            <source media="(min-width: 1728px)" srcSet={`${vendor.image}?w=280&h=280`} />
                            <source media="(min-width: 1440px)" srcSet={`${vendor.image}?w=240&h=240`} />
                            <img
                              alt={vendor.name}
                              width="100%"
                              height="100%"
                              src={vendor.image}
                              style={{ objectFit: "cover", width: "100%", height: "100%", borderRadius: "var(--radius-fs-component-default)" } as React.CSSProperties}
                              loading="lazy"
                            />
                          </picture>
                        </div>
                        <div className="f_spacer_base f_spacer_single_value_fb f_spacer_single_value_min_width f_spacer_single_value_min_height" style={{ "--f_spacer_size_mobile": "8px" } as React.CSSProperties}></div>
                        <p className="f_t_base f_t_maxLines f_t_color lg:from-fs-text-primary lg:to-fs-text-primary w-fit group-focus-visible:[outline:2px_solid_var(--core-interactive-focus)_-2px] lg:bg-linear-to-r lg:bg-[length:0%_1px] lg:bg-left-bottom lg:bg-no-repeat lg:transition-all lg:duration-[1200ms] lg:ease-[cubic-bezier(0.17,0.67,0.24,1)] lg:group-hover:bg-[length:100%_1px] f_t_paragraphSansMedium" style={{ "--f_t_color": "#333333", "--f_t_maxLines": 1, "--f_t_decorationColor": "#757575" } as React.CSSProperties}>
                          {vendor.name}
                        </p>
                        <div className="f_spacer_base f_spacer_single_value_fb f_spacer_single_value_min_width f_spacer_single_value_min_height" style={{ "--f_spacer_size_mobile": "4px" } as React.CSSProperties}></div>
                        <p className="f_t_base f_t_maxLines f_t_color f_t_paragraphSansRegular" style={{ "--f_t_color": "#333333", "--f_t_maxLines": 1, "--f_t_decorationColor": "#757575" } as React.CSSProperties}>
                          {vendor.location}
                        </p>
                        <div className="f_spacer_base f_spacer_single_value_fb f_spacer_single_value_min_width f_spacer_single_value_min_height" style={{ "--f_spacer_size_mobile": "4px" } as React.CSSProperties}></div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
              <div className="f_spacer_base f_spacer_variable_fb f_spacer_variable_min_height" style={{ "--f_spacer_size_mobile": "32px", "--f_spacer_size_tablet": "32px", "--f_spacer_size_desktop": "48px", "--f_spacer_size_xlarge": "48px", "--f_spacer_size_xxlarge": "48px", width: "0px" } as React.CSSProperties}></div>
              <div className="block xl:hidden">
                <a
                  className="hover:bg-fs-surface-primary-inverse! w-fit bg-transparent! fslegacy-component inline-block text-sm text-gray-700 hover:text-black transition-colors whitespace-nowrap px-4 py-2 rounded"
                  aria-disabled={false}
                  href={`/browse?category=${encodeURIComponent(selectedCategory)}`}
                >
                  All brands
                </a>
                <div className="f_spacer_base f_spacer_variable_fb f_spacer_variable_min_height" style={{ "--f_spacer_size_mobile": "32px", "--f_spacer_size_tablet": "32px", "--f_spacer_size_desktop": "64px", "--f_spacer_size_xlarge": "64px", "--f_spacer_size_xxlarge": "64px", width: "0px" } as React.CSSProperties}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="mt-12 mb-0 flex">
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
          {/* Headline */}
          <h1 className="f_t_base f_t_color f_t_displaySSerifRegular mb-6" style={{ "--f_t_color": "#333333" } as React.CSSProperties}>
            Find the best wholesale organic sodas, equipment & sustainable tableware
          </h1>

          {/* Filter Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-8 mt-[0.9rem]">
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
            {comparisonItems.length > 0 && (
              <button
                onClick={() => setShowComparison(true)}
                className="px-4 py-2 rounded-full text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:border-gray-400 whitespace-nowrap"
              >
                Compare ({comparisonItems.length})
              </button>
            )}
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
              onClick={() => toggleFilter("bestseller")}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors flex items-center ${
                activeFilters.includes("bestseller")
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
              }`}
            >
              <span className="text-green-500 mr-1">★</span> Top Shop
            </button>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-12">
              {filteredProducts.map((product, index) => (
                <div key={product.id} className="w-full h-full">
                  <ProductCard product={product} index={index} />
                </div>
              ))}
            </div>
          )}

          {/* Comparison Modal */}
          {showComparison && (
            <ProductComparison
              products={comparisonItems}
              onRemove={removeFromComparison}
              onClose={() => setShowComparison(false)}
            />
          )}
        </div>
      </div>

      {/* Mid-Page Promotional Banner */}
      <div className="bg-gray-50 border-t border-gray-200 my-12">
        <div className="ml-4 md:ml-8 lg:ml-12 2xl:ml-20 mr-4 md:mr-8 lg:mr-12 2xl:mr-20 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800"
                alt="Promotional"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-black mb-4">
                Sustainable solutions, waiting for you
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Sign up to discover organic beverages and eco-friendly tableware for your business.
              </p>
              <button className="bg-black text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-gray-800 transition-colors">
                Unlock wholesale pricing
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Second Product Grid */}
      <div className={`${showSidebarFilters ? 'ml-4 md:ml-8 lg:ml-12 2xl:ml-20' : 'ml-4 md:ml-8 lg:ml-12 2xl:ml-20'} mr-4 md:mr-8 lg:mr-12 2xl:mr-20 pb-12`}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {filteredProducts.slice(0, 6).map((product) => (
            <div key={product.id} className="w-full h-full">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="ml-4 md:ml-8 lg:ml-12 2xl:ml-20 mr-4 md:mr-8 lg:mr-12 2xl:mr-20 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="mb-4 md:mb-0 flex-1">
              <h2 className="text-xl font-semibold text-black mb-2">
                Sign up to unlock customized recommendations at wholesale prices
              </h2>
            </div>
            <div className="flex items-center space-x-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Business email address"
                className="flex-1 md:flex-none px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-sm text-black min-w-[200px]"
              />
              <button className="bg-gray-800 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-900 transition-colors whitespace-nowrap">
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BrowsePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>}>
      <BrowseContent />
    </Suspense>
  );
}
