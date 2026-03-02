"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useState, useRef } from "react";
import { Search, Heart, ShoppingBag, ChevronDown } from "lucide-react";

export default function Navbar() {
  const { logout, isAuthenticated } = useAuth();
  const { getItemCount } = useCart();
  const { items: wishlistItems } = useWishlist();
  const router = useRouter();
  const pathname = usePathname();
  const itemCount = getItemCount();
  const wishlistCount = wishlistItems.length;
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/browse?search=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push("/browse");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E6E6E6]">
      <div className="flex flex-col relative bg-white z-50">
        <div className="flex items-center justify-between px-4 md:px-6 lg:px-8 h-[60px] md:h-[72px]">
          <div className="flex items-center gap-4 md:gap-6">
            <Link className="flex-shrink-0" href="/browse">
              <span className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-[#333333]">OSP</span>
            </Link>
          </div>
          <div className="hidden md:flex flex-1 mx-4 md:mx-6 lg:mx-8" ref={searchRef}>
            <form className="w-full flex items-stretch group" onSubmit={handleSearch}>
              <div className="relative flex-1">
                <input
                  type="text"
                  className="block w-full px-4 py-2.5 bg-white border border-[#E6E6E6] rounded-l-sm text-[15px] leading-5 placeholder-gray-500 focus:outline-none focus:border-black transition duration-150 ease-in-out"
                  placeholder="Search wholesale products or brands"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="px-5 bg-[#F9F9F9] border border-l-0 border-[#E6E6E6] rounded-r-sm hover:bg-[#F0F0F0] transition-colors flex items-center justify-center"
              >
                <Search className="h-4.5 w-4.5 text-[#333333] stroke-[2.5]" aria-hidden="true" />
              </button>
            </form>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <button className="md:hidden p-2 text-[#333333]">
              <Search className="w-6 h-6 stroke-[1.5]" aria-hidden="true" />
            </button>
            {isAuthenticated ? (
              <button
                onClick={() => {
                  logout();
                  router.push("/browse");
                }}
                className="hidden md:block text-sm font-medium text-[#333333] hover:text-black px-2"
              >
                Sign Out
              </button>
            ) : (
              <Link className="hidden md:block text-sm font-medium text-[#333333] hover:text-black px-2" href="/login">
                Sign In
              </Link>
            )}
            <Link className="hidden md:block p-2 text-[#333333] hover:bg-gray-100 rounded-full relative" href="/wishlist">
              <Heart className="w-6 h-6 stroke-[1.5]" aria-hidden="true" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center translate-x-1 -translate-y-1">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link className="p-2 text-[#333333] hover:bg-gray-100 rounded-full relative" href="/cart">
              <ShoppingBag className="w-6 h-6 stroke-[1.5]" aria-hidden="true" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center translate-x-1 -translate-y-1">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
        <div className="hidden md:flex flex-row justify-center min-h-[47px] relative pt-2">
          {/* Navigation Categories with Dropdowns */}
          <div className="flex flex-row flex-wrap justify-center px-6 gap-6">
            {[
              {
                title: "Soda/Soft Drinks",
                items: [
                  "Organic Soda",
                  "Low Sugar Soda",
                  "Prebiotic Soda",
                  "Sparkling Botanical Drinks"
                ]
              },
              {
                title: "Functional Beverages",
                items: [
                  "Coffee",
                  "Tea",
                  "Energy Drinks",
                  "Water",
                  "Sports & Hydration",
                  "Kombucha and fermented",
                  "Juice & wellness",
                  "Protein & nutrition",
                  "Shots"
                ]
              },
              {
                title: "Organic Snacks",
                items: [
                  "Nut Mixes",
                  "Dried Fruit",
                  "Artisan Crackers",
                  "Food Pairings",
                  "Healthy Sweets"
                ]
              },
              {
                title: "Sustainable Packaging",
                items: [
                  "Cups",
                  "Lids",
                  "Straws",
                  "Compostable Packaging"
                ]
              },
              {
                title: "Beverage equipment",
                items: [
                  "Fountain Soda Machines",
                  "Beverage Dispensers",
                  "Alkaline Water Systems",
                  "Ice Machines",
                  "Slushy & Frozen Drink Machines"
                ]
              }
            ].map((category) => (
              <div key={category.title} className="relative group py-3">
                <button className="flex items-center gap-1.5 text-sm font-medium text-[#1A1A1A] hover:text-black transition-colors">
                  {category.title}
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-black transition-transform duration-200 group-hover:rotate-180" />
                </button>

                {/* Dropdown Menu */}
                <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-[240px]">
                  <div className="bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-[#E6E6E6] rounded-sm py-3">
                    {category.items.map((item) => (
                      <Link
                        key={item}
                        href={`/browse?category=${encodeURIComponent(item)}`}
                        className="block px-6 py-2 text-[15px] text-[#333333] hover:text-[#1A1A1A] hover:bg-[#F9F9F9] transition-colors text-left font-normal"
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
