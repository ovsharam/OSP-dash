"use client";

import { useState, useMemo, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import SidebarFilters from "@/components/SidebarFiltersNew";
import ProductComparison from "@/components/ProductComparison";
import ProductCarousel from "@/components/ProductCarousel";
import AnimatedHero from "@/components/AnimatedHeroNew";
import CategoryCircles from "@/components/CategoryCircles";
import { useComparison } from "@/contexts/ComparisonContext";
import { useAuth } from "@/contexts/AuthContextNew";
import { mockProducts, getCategories, getVendors } from "@/lib/mockData";
import { Product } from "@/types";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { FilterState } from "@/components/ProductFiltersNew";
import Link from "next/link";

export default function BrowseClient() {
    const { user, isAuthenticated } = useAuth();
    const searchParams = useSearchParams();
    const searchParam = searchParams?.get("search") || "";
    const [searchQuery, setSearchQuery] = useState(searchParam);
    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    const [showSidebarFilters, setShowSidebarFilters] = useState(false);
    const [showComparison, setShowComparison] = useState(false);
    const { items: comparisonItems, removeFromComparison } = useComparison();
    const categoryParam = searchParams?.get("category") || "";

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

    const featuredBrands = useMemo(() => {
        const vendorMap = new Map();
        mockProducts.forEach((product) => {
            if (!vendorMap.has(product.vendor.id)) {
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
        return Array.from(vendorMap.values()).slice(0, 10);
    }, []);

    const filteredProducts = useMemo(() => {
        let filtered: Product[] = [...mockProducts];

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

        const categoryFilter = categoryParam || activeFilters.find(f => categoryList.includes(f)) || filterState.category;
        if (categoryFilter) {
            filtered = filtered.filter((product) => product.category === categoryFilter);
        }

        if (filterState.vendor) {
            filtered = filtered.filter((product) => product.vendor.name === filterState.vendor);
        }

        filtered = filtered.filter(
            (product) =>
                product.price >= (filterState.minPrice || 0) &&
                product.price <= (filterState.maxPrice || 10000)
        );

        if (filterState.inStock === true) {
            filtered = filtered.filter((product) => product.inStock);
        }

        if (filterState.sampleAvailable === true) {
            filtered = filtered.filter((product) => product.sampleAvailable);
        }

        if (activeFilters.includes("new")) {
            filtered = filtered.filter((product) => product.isNew);
        }

        if (activeFilters.includes("low-minimum")) {
            filtered = filtered.filter((product) => (product.minOrderQuantity || 0) <= 24);
        }

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

    const selectedCategory = categoryParam || activeFilters.find(f => categoryList.includes(f)) || categoryList[0];

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

    const equipmentProducts = useMemo(() => {
        return mockProducts
            .filter((p) => p.category === "Equipment")
            .slice(0, 12)
            .map((p) => ({ ...p, showWholesalePrice: true }));
    }, []);

    if (isBuyer) {
        return (
            <div className="min-h-screen bg-white">
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

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-8">
                        Welcome to OSP, {user?.name || "Buyer"}
                    </h1>

                    <div className="grid grid-cols-3 gap-4 md:gap-6 mb-12">
                        {[
                            { id: "beverages", name: "Beverages", image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&h=400&fit=crop", handle: "beverages" },
                            { id: "equipment", name: "Equipment", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=400&fit=crop", handle: "equipment" },
                            { id: "straws", name: "Straws", image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&h=400&fit=crop", handle: "tableware" },
                            { id: "plates", name: "Plates", image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=400&fit=crop", handle: "tableware" },
                            { id: "cups", name: "Cups", image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400&h=400&fit=crop", handle: "tableware" },
                            { id: "silverware", name: "Silverware", image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&h=400&fit=crop", handle: "tableware" },
                        ].map((category) => (
                            <Link
                                key={category.id}
                                href={`/collections/${category.handle}`}
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
                                            loading="lazy"
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

                    <div className="ml-4 md:ml-8 lg:ml-12 2xl:ml-20 mr-4 md:mr-8 lg:mr-12 2xl:mr-20 py-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
                                <Image
                                    alt="Promotional"
                                    src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    loading="lazy"
                                />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-black mb-4">Sustainable solutions, waiting for you</h2>
                                <p className="text-lg text-gray-600 mb-6">Sign up to discover organic beverages and eco-friendly tableware for your business.</p>
                                <button className="bg-black text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-gray-800 transition-colors">Unlock wholesale pricing</button>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <ProductCarousel
                            title="Popular with stores like yours"
                            products={popularProducts}
                            shopAllLink="/browse?filter=bestseller"
                        />
                        <ProductCarousel
                            title="Home accents"
                            products={homeAccentsProducts}
                            shopAllLink="/browse?category=Tableware"
                        />
                        <ProductCarousel
                            title="Beverages"
                            products={beveragesProducts}
                            shopAllLink="/beverages"
                        />
                        <ProductCarousel
                            title="Equipment"
                            products={equipmentProducts}
                            shopAllLink="/equipment"
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <AnimatedHero />
            <CategoryCircles />

            <div className="mt-8 mb-0 ml-4 md:ml-8 lg:ml-12 2xl:ml-20 lg:flex lg:flex-col">
                <div className="items-start flex flex-col">
                    <h4 className="text-2xl font-serif text-[#333333] mb-6">
                        Featured brands
                    </h4>
                    <div className="w-full flex justify-between items-center mb-6">
                        <div className="overflow-auto flex-1">
                            <div className="flex gap-2 overflow-x-auto scrollbar-hide pr-4">
                                {categoryList.map((category, index) => {
                                    const isActive = categoryParam === category || (categoryParam === "" && index === 0);
                                    return (
                                        <div key={category} className="flex-shrink-0">
                                            <Link
                                                href={`/collections/${category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}
                                                className={`flex h-10 px-6 cursor-pointer items-center justify-center rounded-[40px] border text-sm font-sans transition-all ${isActive
                                                    ? "border-black bg-white text-black"
                                                    : "border-gray-200 text-gray-600 hover:border-gray-400"
                                                    }`}
                                            >
                                                {category}
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <Link
                            className="hidden xl:block text-sm text-gray-700 hover:text-black transition-colors whitespace-nowrap ml-8 mr-12 lg:mr-20"
                            href={`/collections/${selectedCategory.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}
                        >
                            All brands
                        </Link>
                    </div>

                    <div className="w-full overflow-x-auto scrollbar-hide mb-12">
                        <div className="flex gap-4 md:gap-6 pb-4">
                            {featuredBrands.map((vendor) => (
                                <Link
                                    key={vendor.id}
                                    href={`/browse?vendor=${encodeURIComponent(vendor.name)}`}
                                    className="group flex-shrink-0 w-[200px] flex flex-col"
                                >
                                    <div className="rounded-lg overflow-hidden aspect-square w-full relative mb-2">
                                        <Image
                                            src={vendor.image}
                                            alt={vendor.name}
                                            fill
                                            className="object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                                            sizes="200px"
                                            loading="lazy"
                                        />
                                    </div>
                                    <p className="font-sans font-medium text-[#333333] truncate group-hover:underline underline-offset-4 decoration-1 transition-all duration-300">
                                        {vendor.name}
                                    </p>
                                    <p className="text-xs text-gray-600 truncate">
                                        {vendor.location}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-12 mb-0 flex">
                {showSidebarFilters && (
                    <div className="w-64 lg:w-80 xl:w-96 flex-shrink-0 border-r border-gray-200 bg-white">
                        <div className="sticky top-24 max-h-[calc(100vh-96px)] overflow-y-auto px-4">
                            <SidebarFilters onFilterChange={() => { }} vendors={vendors} />
                        </div>
                    </div>
                )}

                <div className="flex-1 px-4 md:px-8 lg:px-12 2xl:px-20 py-8">
                    <h1 className="text-3xl font-serif text-[#333333] mb-8">
                        Find the best wholesale organic sodas, equipment & sustainable tableware
                    </h1>

                    <div className="flex flex-wrap items-center gap-3 mb-8">
                        <button
                            onClick={() => setShowSidebarFilters(!showSidebarFilters)}
                            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors flex items-center ${showSidebarFilters
                                ? "bg-black text-white border-black"
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
                                    <span className="mr-1">All filters</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                    </svg>
                                </>
                            )}
                        </button>
                        {comparisonItems.length > 0 && (
                            <button
                                onClick={() => setShowComparison(true)}
                                className="px-4 py-2 rounded-full text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                            >
                                Compare ({comparisonItems.length})
                            </button>
                        )}
                        <button
                            onClick={() => toggleFilter("new")}
                            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${activeFilters.includes("new") ? "bg-black text-white border-black" : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                                }`}
                        >
                            New this month
                        </button>
                        <button
                            onClick={() => toggleFilter("low-minimum")}
                            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${activeFilters.includes("low-minimum") ? "bg-black text-white border-black" : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                                }`}
                        >
                            Low minimum
                        </button>
                        <button
                            onClick={() => toggleFilter("bestseller")}
                            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors flex items-center ${activeFilters.includes("bestseller") ? "bg-black text-white border-black" : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                                }`}
                        >
                            <span className="text-green-500 mr-1">★</span> Top Shop
                        </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mb-12">
                        {filteredProducts.map((product, index) => (
                            <ProductCard key={product.id} product={product} index={index} />
                        ))}
                    </div>

                    {showComparison && (
                        <ProductComparison
                            products={comparisonItems}
                            onRemove={removeFromComparison}
                            onClose={() => setShowComparison(false)}
                        />
                    )}
                </div>
            </div>

            <div className="bg-gray-50 border-t border-gray-200 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <h2 className="text-2xl font-semibold text-black flex-1">
                            Sign up to unlock customized recommendations at wholesale prices
                        </h2>
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <input
                                type="email"
                                placeholder="Business email address"
                                className="flex-1 md:w-80 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                            />
                            <button className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                                Sign up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
