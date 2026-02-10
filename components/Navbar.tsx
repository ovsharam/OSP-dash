"use client";

import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContextNew";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const { getItemCount } = useCart();
  const { items: wishlistItems } = useWishlist();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
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

            {/* Logo */}
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

            {/* Search Bar */}
            <div ref={searchRef} style={{ flex: '1 1 0%' }} className="hidden md:block ml-4 md:ml-6 relative">
              <div className="topsearch-component flex items-center justify-between w-full">
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
                </form>

                {/* Expanded Search Dropdown */}
                {isSearchExpanded && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="p-4">
                      <div className="pb-2">
                        <div className="flex items-center mb-2">
                          <p className="text-sm font-medium text-gray-900">Trending searches</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {trendingSearches.map((term, index) => (
                            <button
                              key={index}
                              onClick={() => handleTrendingClick(term)}
                              className="inline-flex items-center px-3 py-1.5 rounded-full border border-gray-300 bg-white hover:border-gray-400 transition-colors text-sm text-gray-700"
                            >
                              {term}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Nav */}
            <div className="hidden md:block" style={{ width: '16px', flexShrink: 0 }}></div>
            <div className="flex items-center flex-shrink-0">
              <Link
                href="/blog"
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
              {isAuthenticated ? (
                <button
                  onClick={logout}
                  className="relative flex items-center justify-center px-4 text-gray-700 hover:text-black h-[50px] md:h-[60px] cursor-pointer text-sm whitespace-nowrap"
                >
                  Sign out
                </button>
              ) : (
                <Link
                  href="/login"
                  className="relative flex items-center justify-center px-4 text-gray-700 hover:text-black h-[50px] md:h-[60px] cursor-pointer text-sm whitespace-nowrap"
                >
                  Sign in
                </Link>
              )}
              {!isAuthenticated && (
                <div>
                  <Link
                    href="/login"
                    className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-black transition-colors whitespace-nowrap inline-block"
                  >
                    Sign up to buy
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Category Nav Bar */}
        {!pathname?.startsWith("/vendor") && (
          <nav className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-center items-center space-x-8 overflow-x-auto py-0">
                <Link
                  href="/browse"
                  className={`py-4 px-1 whitespace-nowrap text-sm font-normal transition-colors ${pathname === "/browse" && !searchParams.toString()
                    ? "text-black border-b-2 border-black"
                    : "text-gray-700 hover:text-black"
                    }`}
                >
                  Featured
                </Link>
                <Link
                  href="/browse?filter=new"
                  className={`py-4 px-1 whitespace-nowrap text-sm font-normal transition-colors ${pathname === "/browse" && searchParams.get("filter") === "new"
                    ? "text-black border-b-2 border-black"
                    : "text-gray-700 hover:text-black"
                    }`}
                >
                  New
                </Link>
                <Link
                  href="/collections/beverages"
                  className={`py-4 px-1 whitespace-nowrap text-sm font-normal transition-colors ${pathname === "/collections/beverages"
                    ? "text-black border-b-2 border-black"
                    : "text-gray-700 hover:text-black"
                    }`}
                >
                  Organic Sodas
                </Link>
                <Link
                  href="/collections/equipment"
                  className={`py-4 px-1 whitespace-nowrap text-sm font-normal transition-colors ${pathname === "/collections/equipment"
                    ? "text-black border-b-2 border-black"
                    : "text-gray-700 hover:text-black"
                    }`}
                >
                  Soda Equipment
                </Link>
                <Link
                  href="/collections/tableware"
                  className={`py-4 px-1 whitespace-nowrap text-sm font-normal transition-colors ${pathname === "/collections/tableware"
                    ? "text-black border-b-2 border-black"
                    : "text-gray-700 hover:text-black"
                    }`}
                >
                  Sustainable Tableware
                </Link>
              </div>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
