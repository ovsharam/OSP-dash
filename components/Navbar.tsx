"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useState } from "react";
import { Search, Heart, ShoppingBag, ChevronDown, X } from "lucide-react";

const navCategories = [
  {
    title: "Shop by Brand",
    items: ["Valrhona", "Callebaut", "KESSHŌ", "Amedei", "Michel Cluizel", "Dandelion Chocolate", "view all brands →"],
  },
  {
    title: "Shop by Origin",
    items: ["Madagascar", "Ecuador", "Peru", "Venezuela", "Ghana", "Colombia", "Hawaii", "view all origins →"],
  },
  {
    title: "Bar Chocolate",
    items: ["Dark Chocolate", "Milk Chocolate", "White Chocolate", "Blended Origins", "Limited Edition"],
  },
  {
    title: "Couverture",
    items: ["Dark Couverture", "Milk Couverture", "White Couverture", "Cocoa Powder", "Cocoa Butter"],
  },
  {
    title: "Gourmet & Gifts",
    items: ["Gift Boxes", "Tasting Collections", "Corporate Orders", "Seasonal Specials", "Truffles & Bonbons"],
  },
];

export default function Navbar() {
  const { logout, isAuthenticated } = useAuth();
  const { getItemCount } = useCart();
  const { items: wishlistItems } = useWishlist();
  const router = useRouter();
  const itemCount = getItemCount();
  const wishlistCount = wishlistItems.length;
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/browse?search=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push("/browse");
    }
    setShowSearch(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#ece4d0] border-b border-[#d1b181]/30 shadow-sm">
      {/* Top bar */}
      <div className="flex flex-col relative bg-[#ece4d0] z-50">
        <div className="flex items-center justify-between px-4 md:px-8 lg:px-12 h-[64px] md:h-[76px]">
          {/* Logo */}
          <Link className="flex-shrink-0 flex items-center gap-3" href="/browse">
            <div className="w-9 h-9 rounded-full bg-[#5c0f0f] flex items-center justify-center flex-shrink-0">
              <span className="text-[#ece4d0] font-serif text-xl font-bold">W</span>
            </div>
            <span className="hidden sm:block font-serif text-lg font-bold tracking-wide text-[#5c0f0f] uppercase">
              Worldwide Chocolate
            </span>
          </Link>

          {/* Desktop search */}
          <div className="hidden md:flex flex-1 mx-8 max-w-2xl">
            <form className="w-full flex items-stretch group" onSubmit={handleSearch}>
              <div className="relative flex-1">
                <input
                  type="text"
                  className="block w-full px-4 py-2.5 bg-white/80 border border-[#d1b181]/50 rounded-l-sm text-[15px] placeholder-[#333333]/50 focus:outline-none focus:border-[#5c0f0f] transition duration-150 ease-in-out text-[#333333]"
                  placeholder="Search artisan brands, origins or products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="px-5 bg-[#5c0f0f] border border-[#5c0f0f] rounded-r-sm hover:bg-[#7a1515] transition-colors flex items-center justify-center"
              >
                <Search className="h-4 w-4 text-[#ece4d0] stroke-[2]" aria-hidden="true" />
              </button>
            </form>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-1 md:gap-3">
            {/* Mobile search toggle */}
            <button
              className="md:hidden p-2 text-[#5c0f0f] hover:bg-[#d1b181]/20 rounded-full transition-colors"
              onClick={() => setShowSearch(true)}
            >
              <Search className="w-5 h-5 stroke-[1.5]" aria-hidden="true" />
            </button>

            {isAuthenticated ? (
              <button
                onClick={() => { logout(); router.push("/browse"); }}
                className="hidden md:block text-sm font-medium text-[#5c0f0f] hover:text-[#7a1515] px-2 transition-colors"
              >
                Sign Out
              </button>
            ) : (
              <Link className="hidden md:block text-sm font-medium text-[#5c0f0f] hover:text-[#7a1515] px-2 transition-colors" href="/login">
                Sign In
              </Link>
            )}

            <Link className="hidden md:block p-2 text-[#5c0f0f] hover:bg-[#d1b181]/20 rounded-full relative transition-colors" href="/wishlist">
              <Heart className="w-5 h-5 stroke-[1.5]" aria-hidden="true" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#5c0f0f] text-[#ece4d0] text-xs rounded-full w-4 h-4 flex items-center justify-center translate-x-1 -translate-y-1 font-medium">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link className="p-2 text-[#5c0f0f] hover:bg-[#d1b181]/20 rounded-full relative transition-colors" href="/cart">
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" aria-hidden="true" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#5c0f0f] text-[#ece4d0] text-xs rounded-full w-4 h-4 flex items-center justify-center translate-x-1 -translate-y-1 font-medium">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile search overlay */}
        {showSearch && (
          <div className="md:hidden absolute inset-0 bg-[#ece4d0] z-50 flex items-center px-4 gap-3">
            <form className="flex-1 flex" onSubmit={handleSearch}>
              <input
                type="text"
                autoFocus
                className="flex-1 px-4 py-2.5 bg-white/80 border border-[#d1b181]/50 rounded-l-sm text-[15px] focus:outline-none focus:border-[#5c0f0f] text-[#333333]"
                placeholder="Search chocolates, brands, origins..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="px-4 bg-[#5c0f0f] text-[#ece4d0] rounded-r-sm">
                <Search className="w-4 h-4" />
              </button>
            </form>
            <button onClick={() => setShowSearch(false)} className="p-2 text-[#5c0f0f]">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Category nav */}
        <div className="hidden md:flex flex-row justify-center min-h-[44px] border-t border-[#d1b181]/30 bg-[#ece4d0]">
          <div className="flex flex-row flex-wrap justify-center px-6 gap-1">
            {navCategories.map((category) => (
              <div key={category.title} className="relative group py-3">
                <button className="flex items-center gap-1 text-[13px] font-semibold text-[#5c0f0f] hover:text-[#7a1515] tracking-wide uppercase transition-colors px-3">
                  {category.title}
                  <ChevronDown className="w-3 h-3 text-[#5c0f0f]/60 group-hover:text-[#5c0f0f] transition-transform duration-200 group-hover:rotate-180" />
                </button>
                {/* Dropdown */}
                <div className="absolute left-0 top-full pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-[220px]">
                  <div className="bg-[#ece4d0] shadow-lg border border-[#d1b181]/40 rounded-sm py-2">
                    {category.items.map((item) => (
                      <Link
                        key={item}
                        href={`/browse?category=${encodeURIComponent(item)}`}
                        className="block px-5 py-2 text-[14px] text-[#333333] hover:text-[#5c0f0f] hover:bg-[#d1b181]/20 transition-colors font-normal"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
