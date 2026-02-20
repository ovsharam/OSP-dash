"use client";

import { Suspense, useState, useEffect } from "react";
import AnimatedHero from "@/components/AnimatedHero";
import Image from "next/image";
import Link from "next/link";
import { Search, ChevronRight, Star, Lock, ShoppingBag, Heart } from "lucide-react";

const categoryBrands = {
  "Soda Pop": [
    { name: "Galvanina", location: "Rimini, Italy", image: "/images/IMG_0997_copy.jpg" },
    { name: "Mother Kombucha", location: "Saint Petersburg, Florida", image: "/images/IMG_0998.jpeg" },
    { name: "Gusto Cola", location: "Devon, United Kingdom", image: "/images/IMG_0999_copy.jpg" },
    { name: "Top Note", location: "Milwaukee, Wisconsin", image: "/images/IMG_1001_copy.jpg" },
    { name: "Maine Root", location: "Austin, Texas", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800" }
  ],
  "Functional Beverages": [
    { name: "Olipop", location: "Oakland, California", image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800" },
    { name: "Poppi", location: "Austin, Texas", image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=800" },
    { name: "Recess", location: "New York, New York", image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=800" },
    { name: "Kin Euphorics", location: "Austin, Texas", image: "https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?w=800" },
    { name: "Hiyo", location: "Los Angeles, California", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800" }
  ],
  "Organic Snacks & Food Pairings": [
    { name: "BjornQorn", location: "Hudson Valley, New York", image: "https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?w=800" },
    { name: "Moon Juice", location: "Los Angeles, California", image: "https://images.unsplash.com/photo-1612232134966-a9b076b9fabe?w=800" },
    { name: "Fat Gold", location: "Oakland, California", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800" },
    { name: "Rustic Bakery", location: "Petaluma, California", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800" },
    { name: "Hu Kitchen", location: "New York, New York", image: "https://images.unsplash.com/photo-1582138110521-18e0009581a7?w=800" }
  ],
  "Sustainable Packaging": [
    { name: "Boxed Water", location: "Grand Rapids, Michigan", image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800" },
    { name: "Just Water", location: "Glens Falls, New York", image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800" },
    { name: "Pathwater", location: "Fremont, California", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800" },
    { name: "Cove", location: "Los Angeles, California", image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=800" },
    { name: "FinalStraw", location: "Santa Barbara, California", image: "https://images.unsplash.com/photo-1591871937573-74dbba515c4c?w=800" }
  ],
  "Beverage Equipment": [
    { name: "Breville", location: "Sydney, Australia", image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=800" },
    { name: "SodaStream", location: "Airport City, Israel", image: "https://images.unsplash.com/photo-1627483297929-37f416fec7cd?w=800" },
    { name: "Fellow", location: "San Francisco, California", image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=800" },
    { name: "Aarke", location: "Stockholm, Sweden", image: "https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?w=800" },
    { name: "Mizu", location: "San Diego, California", image: "https://images.unsplash.com/photo-1621275013337-4bf6336339bc?w=800" }
  ]
};

function BrowseContent() {
  const [activeCategory, setActiveCategory] = useState<keyof typeof categoryBrands>("Soda Pop");
  const [isVisible, setIsVisible] = useState(true);

  const handleCategoryChange = (cat: keyof typeof categoryBrands) => {
    if (cat === activeCategory) return;
    setIsVisible(false);
    setTimeout(() => {
      setActiveCategory(cat);
      setIsVisible(true);
    }, 150);
  };

  return (
    <div className="min-h-screen bg-[#F5F0EB]">
      <AnimatedHero />

      {/* Featured Brands Section */}
      <section className="bg-white min-h-[450px] md:min-h-[550px] flex items-center py-16 md:py-24 border-b border-[#E0D9D0]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12 w-full">
          <h2 className="text-3xl font-serif text-[#1A1A1A] mb-6">Featured brands</h2>
          <div className="flex flex-wrap gap-3 mb-10">
            {(Object.keys(categoryBrands) as Array<keyof typeof categoryBrands>).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleCategoryChange(cat);
                }}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${activeCategory === cat
                  ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                  : "bg-white text-[#1A1A1A] border-[#E0D9D0] hover:border-[#1A1A1A]"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-12 pb-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {categoryBrands[activeCategory].map((brand) => (
              <Link key={brand.name} className="group flex flex-col items-center text-center w-full" href={`/browse?brand=${encodeURIComponent(brand.name)}`}>
                <div className="relative w-full aspect-square bg-gray-50 rounded-full overflow-hidden mb-4 border border-[#F0F0F0]">
                  <Image
                    alt={brand.name}
                    src={brand.image}
                    fill
                    sizes="(max-width: 768px) 50vw, 20vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>
                <div className="flex flex-col items-center w-full px-2">
                  <div className="text-[#333333] font-semibold text-[15px] leading-tight mb-1">{brand.name}</div>
                  <div className="text-[#888888] text-[13px]">{brand.location}</div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center md:text-left">
            <Link className="inline-block bg-white border border-[#1A1A1A] text-[#1A1A1A] px-10 py-3 rounded-[4px] font-medium hover:bg-gray-50 transition-colors" href={`/browse?category=${encodeURIComponent(activeCategory)}`}>
              All {activeCategory.toLowerCase()}
            </Link>
          </div>
        </div>
      </section>

      {/* Retailer Section (Olive Green, Faire Style) */}
      <section className="bg-[#5B6128] text-white min-h-[500px] md:min-h-[600px] flex items-center py-16 md:py-24">
        <div className="max-w-[1700px] mx-auto px-6 md:px-12 w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          {/* Left Photo */}
          <div className="w-full lg:w-1/3">
            <div className="relative aspect-square w-full rounded-sm overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1456735190827-d1262f71b4a3?w=800"
                alt="Boutique display"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Centered Fonts/Text */}
          <div className="w-full lg:w-1/3 text-center flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 leading-tight text-white px-4">For any retailer, no matter what you sell.</h2>
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-md leading-relaxed">Whether you buy for a clothing boutique or a grocery store, find all the products you need on OSP.</p>
            <Link className="bg-white text-[#1A1A1A] px-12 py-4 rounded-[4px] font-semibold text-base hover:bg-gray-100 transition-colors uppercase tracking-widest shadow-lg" href="/?signUp=1">Sign up to buy</Link>
          </div>

          {/* Right Photo */}
          <div className="w-full lg:w-1/3">
            <div className="relative aspect-square w-full rounded-sm overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800"
                alt="Product shelf"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Explore Categories (Faire 3-column Layout) */}
      <section className="bg-white py-16 md:py-24 border-b border-[#E0D9D0]">
        <div className="max-w-[1700px] w-full mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-serif text-[#1A1A1A] mb-12">Explore categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Home decor", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1000" },
              { name: "Food & drink", image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=1000" },
              { name: "Women", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=1000" }
            ].map((cat, i) => (
              <Link key={i} className="group relative block aspect-[1.2/1] bg-gray-100 rounded-sm overflow-hidden" href={`/browse?category=${cat.name.replace(" & ", "+").replace(" ", "-")}`}>
                <Image
                  alt={cat.name}
                  src={cat.image}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                <div className="absolute bottom-6 left-6 z-10">
                  <h4 className="text-2xl md:text-3xl font-serif text-white drop-shadow-md">{cat.name}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by your values (New Plant Image) */}
      <section className="bg-white flex flex-col py-16 md:py-24 border-b border-[#E0D9D0] overflow-hidden">
        <div className="max-w-[1700px] w-full mx-auto px-6 md:px-12">
          <div className="flex flex-col mb-12">
            <h2 className="text-3xl font-serif text-[#1A1A1A] mb-8">Shop by your values</h2>
            <div className="flex flex-wrap gap-3">
              {["Women owned", "Organic", "Eco-friendly", "Made in USA", "Small Batch", "Sugar Free", "Not on Amazon"].map((val, i) => (
                <button key={i} className={`h-11 px-8 rounded-full border text-base font-medium transition-all duration-200 ${val === "Eco-friendly" ? "bg-[#1A1A1A] text-white border-[#1A1A1A]" : "bg-white text-[#333333] border-[#E0D9D0] hover:border-[#1A1A1A]"}`}>
                  {val}
                </button>
              ))}
            </div>
          </div>
          <div className="w-full flex flex-col md:flex-row gap-12 lg:gap-20 items-center md:items-start">
            <div className="relative w-full md:w-1/2 aspect-[1.3/1] bg-gray-100 rounded-sm overflow-hidden">
              <Image
                alt="Hands holding plant"
                src="https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=1200"
                fill
                className="object-cover scale-110"
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center min-h-[400px]">
              <h5 className="text-[#333333] text-2xl lg:text-3xl font-serif leading-relaxed mb-10 italic">“Sustainable hydration is our mission. Our bottles are 100% plant-based and compostable, reducing single-use plastic waste one drink at a time.”</h5>
              <div className="space-y-2 mb-10">
                <Link className="text-xl font-bold text-[#1A1A1A] underline decoration-rose-200 decoration-4 underline-offset-4" href="/browse?brand=GreenSip">GreenSip</Link>
                <p className="text-[#666666] text-lg">Seattle, Washington</p>
              </div>
              <Link className="inline-flex text-[#1A1A1A] font-bold text-lg uppercase tracking-widest border-b-2 border-rose-200 pb-1 w-fit hover:border-rose-400 transition-colors" href="/browse?values=eco-friendly">Shop Eco-friendly</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="bg-white py-16 md:py-24 border-b border-[#E0D9D0]">
        <div className="max-w-[1700px] w-full mx-auto px-6 md:px-12">
          <h2 className="text-2xl font-serif text-[#1A1A1A] mb-8">Bestsellers you might like</h2>
          <div className="flex overflow-x-auto gap-6 scrollbar-hide pb-4 -mx-6 px-6 md:mx-0 md:px-0">
            {[
              { title: "Craft Soda Variety Pack", brand: "Pop & Fizz Co.", rating: "4.9 (1,240)", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800" },
              { title: "Soda Fountain Dispenser", brand: "BeverageTech Systems", rating: "4.8 (85)", image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=800" },
              { title: "Organic Cola Syrup", brand: "Nature's Pour", rating: "5.0 (320)", image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800" },
              { title: "Premium Glass Bottle Soda", brand: "Old Town Bottling", rating: "4.9 (2,100)", image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=800" }
            ].map((product, i) => (
              <div key={i} className="min-w-[280px] w-[280px] flex-shrink-0 group">
                <Link className="flex flex-col" href="#">
                  <div className="relative aspect-square bg-gray-50 rounded-sm overflow-hidden mb-4">
                    <Image alt={product.title} src={product.image} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h3 className="text-[#1A1A1A] font-medium mb-1">{product.title}</h3>
                  <p className="text-[#666666] text-sm mb-3">{product.brand}</p>
                  <div className="flex items-center gap-1.5 text-sm text-[#1A1A1A]">
                    <Lock className="w-3.5 h-3.5" />
                    <span className="underline underline-offset-2">Unlock wholesale price</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Benefits */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-[1400px] w-full mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2">
            <h3 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-12">Try new flavor profiles in your shop, with confidence.</h3>
            <div className="space-y-10">
              <div className="flex flex-col gap-2">
                <span className="text-xl font-bold text-[#1A1A1A]">Low order minimums</span>
                <p className="text-gray-600 text-lg">Trial thousands of craft soda brands with low or no minimums.</p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xl font-bold text-[#1A1A1A]">60 days to pay, interest free</span>
                <p className="text-gray-600 text-lg">Stock your shelves now and pay invoices 60 days later with zero fees.</p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xl font-bold text-[#1A1A1A]">Free and easy returns</span>
                <p className="text-gray-600 text-lg">You get free returns on every first order with a new brand.</p>
              </div>
            </div>
            <Link className="inline-block mt-12 bg-[#1A1A1A] text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-black transition-colors" href="/?signUp=1">Sign up to buy</Link>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto rounded-sm overflow-hidden shadow-xl">
              <Image alt="Retailer stocking shelves" src="https://images.unsplash.com/photo-1556740758-90de374c12ad?w=1000" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function BrowsePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center font-serif text-2xl italic">Refining OSP...</div>}>
      <BrowseContent />
    </Suspense>
  );
}
