"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types";
import Link from "next/link";

interface CollectionClientProps {
    category: string;
    categoryHandle: string;
    products: Product[];
}

export default function CollectionClient({ category, categoryHandle, products }: CollectionClientProps) {
    const [showFilters, setShowFilters] = useState(true);

    return (
        <div className="min-h-screen bg-white">
            <div className="border-b border-gray-200">
                <div className="ml-4 md:ml-8 lg:ml-12 2xl:ml-20 mr-4 md:mr-8 lg:mr-12 2xl:mr-20 pt-8 pb-4">
                    {/* Breadcrumbs */}
                    <nav className="text-sm text-gray-500 mb-4">
                        <Link href="/" className="hover:text-black">Home</Link>
                        <span className="mx-2">/</span>
                        <Link href="/browse" className="hover:text-black">Food & drink</Link>
                        <span className="mx-2">/</span>
                        <span className="text-black">{category}</span>
                    </nav>

                    <h1 className="text-3xl md:text-4xl font-bold text-black mb-6">
                        Dive into our vast selection of {category.toLowerCase()}
                    </h1>

                    {/* Filter Buttons */}
                    <div className="flex flex-wrap items-center gap-3">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors whitespace-nowrap flex items-center ${showFilters
                                ? "bg-gray-800 text-white border-gray-800"
                                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                                }`}
                        >
                            {showFilters ? (
                                <>
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                    Hide filters
                                </>
                            ) : (
                                <>
                                    <span className="mr-1">All filters</span>
                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                                    </svg>
                                </>
                            )}
                        </button>
                        <button className="px-4 py-2 rounded-full text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:border-gray-400 whitespace-nowrap">
                            American brands
                        </button>
                        <button className="px-4 py-2 rounded-full text-sm font-medium border transition-colors bg-white text-gray-700 border-gray-300 hover:border-gray-400">
                            Low minimum
                        </button>
                        <button className="px-4 py-2 rounded-full text-sm font-medium border transition-colors flex items-center bg-white text-gray-700 border-gray-300 hover:border-gray-400">
                            <span className="text-green-500 mr-1">★</span> Top Shop
                        </button>
                        <button className="px-4 py-2 rounded-full text-sm font-medium border transition-colors bg-white text-gray-700 border-gray-300 hover:border-gray-400">
                            New this month
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex">
                {/* Sidebar */}
                {showFilters && (
                    <div className="w-64 lg:w-80 xl:w-96 flex-shrink-0 border-r border-gray-200 bg-white">
                        <div className="sticky top-24 max-h-[calc(100vh-96px)] overflow-y-auto">
                            <div className="w-full bg-white">
                                <div className="overflow-hidden">
                                    <div className="max-h-[360px] overflow-y-auto pb-4">
                                        <nav data-test-id="category-page-sidebar" aria-label="Side Navigation" className="px-4 py-2">
                                            <ul className="list-none pl-0 space-y-1">
                                                <li>
                                                    <Link data-test-id="left-nav-link" className="block py-2 px-2 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-50 rounded transition-colors" href="/collections/food-drink">Food & drink</Link>
                                                    <ul className="list-none pl-4 mt-1 space-y-1">
                                                        <li><Link data-test-id="left-nav-link" className="block py-1.5 px-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded transition-colors" href="/browse?filter=new-brands">New brands</Link></li>
                                                        <li><Link data-test-id="left-nav-link" className="block py-1.5 px-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded transition-colors" href="/browse?filter=new-products">New products</Link></li>
                                                        <li><Link data-test-id="left-nav-link" className="block py-1.5 px-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded transition-colors" href="/collections/baking">Baking</Link></li>
                                                        <li>
                                                            <Link data-test-id="left-nav-link" className={`block py-1.5 px-2 text-sm font-medium rounded ${category === 'Beverages' ? 'text-black bg-gray-100' : 'text-gray-600 hover:text-black hover:bg-gray-50'}`} href="/collections/beverages">Beverages</Link>
                                                            <ul className="list-none pl-4 mt-1 space-y-1">
                                                                <li><Link data-test-id="left-nav-link" className="block py-1.5 px-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded transition-colors" href="/browse?filter=beverages-new-brands">New brands</Link></li>
                                                                <li><Link data-test-id="left-nav-link" className="block py-1.5 px-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded transition-colors" href="/browse?filter=beverages-new-products">New products</Link></li>
                                                                <li><Link data-test-id="left-nav-link" className="block py-1.5 px-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded transition-colors" href="/browse?filter=cocktail-mixers">Cocktail mixes & elixirs</Link></li>
                                                                <li><Link data-test-id="left-nav-link" className="block py-1.5 px-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded transition-colors" href="/browse?filter=hot-cocoa">Hot cocoa & cider</Link></li>
                                                                <li><Link data-test-id="left-nav-link" className="block py-1.5 px-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded transition-colors" href="/browse?filter=juice">Juice</Link></li>
                                                                <li><Link data-test-id="left-nav-link" className="block py-1.5 px-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded transition-colors" href="/browse?filter=non-alcoholic">Non-alcoholic</Link></li>
                                                                <li><Link data-test-id="left-nav-link" className="block py-1.5 px-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded transition-colors" href="/browse?filter=water">Water</Link></li>
                                                                <li><Link data-test-id="left-nav-link" className="block py-1.5 px-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded transition-colors" href="/browse?filter=non-dairy-milk">Non-dairy milk</Link></li>
                                                                <li><Link data-test-id="left-nav-link" className="block py-1.5 px-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded transition-colors" href="/browse?filter=powdered-drink-mixes">Powdered drink mixes</Link></li>
                                                                <li><Link data-test-id="left-nav-link" className="block py-1.5 px-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded transition-colors" href="/browse?filter=soda-sparkling">Soda & sparkling</Link></li>
                                                                <li><Link data-test-id="left-nav-link" className="block py-1.5 px-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded transition-colors" href="/browse?filter=drink-kits">Drink kits</Link></li>
                                                            </ul>
                                                        </li>
                                                        <li><Link data-test-id="left-nav-link" className="block py-1.5 px-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded transition-colors" href="/collections/cereals-grains-pastas">Cereals, grains, & pastas</Link></li>
                                                        <li><Link data-test-id="left-nav-link" className="block py-1.5 px-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded transition-colors" href="/collections/coffee-tea">Coffee & tea</Link></li>
                                                        <li><Link data-test-id="left-nav-link" className="block py-1.5 px-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded transition-colors" href="/collections/condiments-sauces">Condiments & sauces</Link></li>
                                                        <li><Link data-test-id="left-nav-link" className="block py-1.5 px-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded transition-colors" href="/collections/confections">Confections</Link></li>
                                                        <li><Link data-test-id="left-nav-link" className="block py-1.5 px-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded transition-colors" href="/collections/dairy-meats">Dairy & meats</Link></li>
                                                        <li><Link data-test-id="left-nav-link" className="block py-1.5 px-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded transition-colors" href="/collections/jams-spreads">Jams & spreads</Link></li>
                                                        <li><Link data-test-id="left-nav-link" className="block py-1.5 px-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded transition-colors" href="/collections/snacks">Snacks</Link></li>
                                                        <li><Link data-test-id="left-nav-link" className="block py-1.5 px-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded transition-colors" href="/collections/food-baskets-kits">Food baskets & kits</Link></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                    <hr className="my-4 border-t border-gray-200" />
                                </div>
                                <div data-test-id="filter-bar" className="px-4 py-2" style={{ height: "calc(-126px + 100vh)", position: "sticky", top: "126px", overflowY: "auto" }}>
                                    <div className="mb-4">
                                        <h2 role="heading" aria-level={2} data-test-id="filter-bar-title" className="text-sm font-semibold text-gray-900 mb-2">Filters</h2>
                                        <hr className="border-t border-gray-200" />
                                    </div>
                                    <div className="space-y-0">
                                        {[
                                            "Product types",
                                            "Ships from",
                                            "Brand values",
                                            "Brands",
                                            "Storage",
                                            "Shelf life",
                                            "Diet",
                                            "Production",
                                            "Trending",
                                            "Made in",
                                            "Ship window",
                                            "Lead time",
                                            "Global trade item number"
                                        ].map((filter) => (
                                            <div key={filter} data-test-id={`filter-section-impression-wrapper-${filter}`} className="border-b border-gray-200 last:border-b-0">
                                                <button role="heading" aria-level={3} aria-label={filter} aria-expanded="false" className="w-full flex items-center justify-between py-3 px-0 hover:opacity-70 transition-opacity">
                                                    <p className="text-sm font-medium text-[#333333] text-left">{filter}</p>
                                                    <svg className="w-4 h-4 text-gray-500 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Product Grid */}
                <div className="flex-1 pt-8 pb-8 transition-all duration-300 ml-4 md:ml-8 lg:ml-12 2xl:ml-20 mr-4 md:mr-8 lg:mr-12 2xl:mr-20">
                    {products.length === 0 ? (
                        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
                            <p className="text-gray-500">No products found in this collection.</p>
                        </div>
                    ) : (
                        <div className={`grid gap-6 mb-12 ${showFilters
                            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                            : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                            }`}>
                            {products.map((product, index) => (
                                <ProductCard key={product.id} product={product} index={index} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
