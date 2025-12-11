"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useState, useEffect, useRef } from "react";
import CategoryNav from "./CategoryNav";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const { getItemCount } = useCart();
  const { items: wishlistItems } = useWishlist();
  const router = useRouter();
  const pathname = usePathname();
  const itemCount = getItemCount();
  const wishlistCount = wishlistItems.length;
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const trendingSearches = [
    "organic soda",
    "soda equipment",
    "sustainable tableware",
    "eco-friendly cups",
    "bamboo straws",
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/browse?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchExpanded(false);
    } else {
      router.push("/browse");
    }
  };

  const handleTrendingClick = (term: string) => {
    setSearchQuery(term);
    router.push(`/browse?search=${encodeURIComponent(term)}`);
    setIsSearchExpanded(false);
  };

  const handleSearchFocus = () => {
    setIsSearchExpanded(true);
  };

  const handleCloseSearch = () => {
    setIsSearchExpanded(false);
    setSearchQuery("");
  };

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchExpanded(false);
      }
    };

    if (isSearchExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchExpanded]);

  return (
    <>
      {/* Top Promotional Bar */}
      <div className="bg-stone-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-8 text-xs text-gray-800">
            <span>Shop wholesale online from over 100,000 brands.</span>
            <Link
              href="/login"
              className="ml-1 text-black font-medium underline hover:no-underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-[50px] md:h-[60px]">
            {/* Mobile Menu Button */}
            <button
              className="relative flex items-center justify-center px-4 text-gray-700 hover:text-black h-[50px] md:h-[60px] cursor-pointer md:hidden flex-shrink-0"
              aria-label="Menu button"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Logo - Far Left */}
            <Link
              href="/browse"
              id="faire-logo-link"
              aria-label="Go to homepage"
              className="flex items-center justify-center h-[50px] md:h-[60px] flex-shrink-0"
            >
              <span className="text-2xl font-bold text-black" style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.2em' }}>
                OSP
              </span>
            </Link>

            {/* Search Bar Container - flex: 1 1 0% */}
            <div ref={searchRef} style={{ flex: '1 1 0%' }} className="hidden md:block ml-4 md:ml-6 relative">
              <div className={`topsearch-component ${isSearchExpanded ? 'expanded' : ''} flex items-center justify-between w-full`}>
                <form onSubmit={handleSearch} className="relative w-full flex items-center">
                  <div className="flex items-center w-full">
                    <input
                      type="username"
                      name="auto-fill guard"
                      autoComplete="username"
                      style={{ display: 'none' }}
                    />
                    <input
                      id="top-search"
                      type="text"
                      placeholder="Search wholesale products or brands"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={handleSearchFocus}
                      className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black text-sm text-black bg-white"
                      aria-label="Search products or brands"
                      autoComplete="off"
                      data-test-id="searchBarInput"
                    />
                  </div>
                  {isSearchExpanded ? (
                    <div className="flex items-center ml-2" data-test-id="close-search">
                      <button
                        type="button"
                        onClick={handleCloseSearch}
                        className="flex items-center justify-center p-2 text-gray-600 hover:text-black"
                        aria-label="Close"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21.429 2.571 2.572 21.43M2.572 2.571 21.429 21.43"
                          />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center justify-center"
                      aria-label="Search"
                    >
                      <svg
                        className="w-5 h-5 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M.857 10.144a9.287 9.287 0 1 0 18.573 0 9.287 9.287 0 0 0-18.573 0ZM23.143 23.143l-6.434-6.434"
                        />
                      </svg>
                    </button>
                  )}
                </form>
              </div>

              {/* Expanded Search Dropdown */}
              {isSearchExpanded && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-4">
                    <div className="pb-2">
                      <div className="flex items-center mb-2">
                        <div style={{ width: '16px', height: '0px' }}></div>
                        <p
                          role="heading"
                          className="f_t_base f_t_color f_t_paragraphSansMedium"
                          style={{ "--f_t_color": "#333333", "--f_t_decorationColor": "#757575" } as React.CSSProperties}
                        >
                          Trending searches
                        </p>
                      </div>
                      <ul data-test-id="trending_searches">
                        <div className="flex flex-wrap gap-2">
                          {trendingSearches.map((term, index) => (
                            <a
                              key={index}
                              data-test-id="search-recommendation-pill"
                              href={`/browse?search=${encodeURIComponent(term)}`}
                              onClick={(e) => {
                                e.preventDefault();
                                handleTrendingClick(term);
                              }}
                              className="inline-flex items-center px-3 py-1.5 rounded-full border border-gray-300 bg-white hover:border-gray-400 transition-colors"
                            >
                              <p
                                className="f_t_base f_t_inheritColor f_t_paragraphSansRegular text-gray-700"
                                style={{ "--f_t_decorationColor": "#757575" } as React.CSSProperties}
                              >
                                {term}
                              </p>
                            </a>
                          ))}
                        </div>
                      </ul>
                    </div>
                    <div style={{ height: '25px', width: '0px' }}></div>
                    <div style={{ height: '16px', width: '0px' }}></div>
                  </div>
                </div>
              )}
            </div>

            {/* Spacer - 16px */}
            <div className="hidden md:block" style={{ width: '16px', flexShrink: 0 }}></div>

            {/* Right Navigation */}
            <div className="flex items-center flex-shrink-0">
              {isAuthenticated && user?.businessName ? (
                <>
                  <Link
                    href="/blog"
                    data-test-id="blogEntryButton"
                    className="hidden md:block text-sm text-gray-700 hover:text-black transition-colors whitespace-nowrap px-2"
                  >
                    Blog
                  </Link>
                  <Link
                    href="/vendor/dashboard"
                    className="hidden md:block text-sm text-gray-700 hover:text-black transition-colors whitespace-nowrap px-2"
                  >
                    Sell on OSP
                  </Link>
                  <Link
                    href="/buyer/dashboard"
                    className="hidden md:block text-sm text-gray-700 hover:text-black transition-colors whitespace-nowrap px-2"
                  >
                    Buyer Portal
                  </Link>
                  <Link
                    href="/wishlist"
                    className="relative p-2 text-gray-700 hover:text-black transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill={wishlistCount > 0 ? "currentColor" : "none"}
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
                    {wishlistCount > 0 && (
                      <span className="absolute top-0 right-0 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>
                  <Link
                    href="/cart"
                    className="relative p-2 text-gray-700 hover:text-black transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    {itemCount > 0 && (
                      <span className="absolute top-0 right-0 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {itemCount}
                      </span>
                    )}
                  </Link>
                  <button
                    onClick={logout}
                    className="relative flex items-center justify-center px-4 text-gray-700 hover:text-black h-[50px] md:h-[60px] cursor-pointer text-sm whitespace-nowrap"
                    data-test-id="login"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/blog"
                    data-test-id="blogEntryButton"
                    className="hidden md:block text-sm text-gray-700 hover:text-black transition-colors whitespace-nowrap px-2"
                  >
                    Blog
                  </Link>
                  <Link
                    href="/vendor/login"
                    className="hidden md:block text-sm text-gray-700 hover:text-black transition-colors whitespace-nowrap px-2"
                  >
                    Sell on OSP
                  </Link>
                  <button
                    className="relative flex items-center justify-center px-4 text-gray-700 hover:text-black h-[50px] md:h-[60px] cursor-pointer text-sm whitespace-nowrap"
                    data-test-id="login"
                    onClick={() => router.push('/login')}
                  >
                    Sign in
                  </button>
                  <div>
                    <Link
                      href="/login"
                      data-test-id="signUpButton"
                      className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-black transition-colors whitespace-nowrap inline-block"
                    >
                      Sign up to buy
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Category Navigation Bar - Centered */}
        {!pathname?.startsWith("/vendor") && <CategoryNav />}
      </header>
    </>
  );
}
