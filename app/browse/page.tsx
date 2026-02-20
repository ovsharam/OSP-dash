"use client";

import { Suspense } from "react";
import AnimatedHero from "@/components/AnimatedHero";
import Image from "next/image";
import Link from "next/link";
import { Search, ChevronRight, Star, Lock, ShoppingBag, Heart } from "lucide-react";

function BrowseContent() {
  return (
    <div className="min-h-screen bg-[#F5F0EB]">
      <AnimatedHero />

      {/* Featured Brands Section */}
      <section className="bg-white min-h-[450px] md:min-h-[550px] flex items-center py-16 md:py-24 border-b border-[#E0D9D0]">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-12 w-full">
          <h2 className="text-3xl font-serif text-[#1A1A1A] mb-6">Featured brands</h2>
          <div className="flex flex-wrap gap-3 mb-10">
            <Link href="/browse?category=Sodas" className="bg-[#1A1A1A] text-white px-5 py-2 rounded-full text-sm font-medium transition-colors">Soda Pop</Link>
            <Link href="/browse?category=Functional+Beverages" className="bg-white border border-[#E0D9D0] text-[#1A1A1A] px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors">Functional Beverages</Link>
            <Link href="/browse?category=Sustainable+Packaging" className="bg-white border border-[#E0D9D0] text-[#1A1A1A] px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors">Sustainable Packaging</Link>
            <Link href="/browse?category=Beverage+Equipment" className="bg-white border border-[#E0D9D0] text-[#1A1A1A] px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors">Beverage Equipment</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 pb-4">
            {[
              { name: "Galvanina", location: "Rimini, Italy", image: "/images/IMG_0997_copy.jpg" },
              { name: "Mother Kombucha", location: "Saint Petersburg, Florida", image: "/images/IMG_0998.jpeg" },
              { name: "Gusto Cola", location: "Devon, United Kingdom", image: "/images/IMG_0999_copy.jpg" },
              { name: "Top Note", location: "Milwaukee, Wisconsin", image: "/images/IMG_1001_copy.jpg" }
            ].map((brand) => (
              <Link key={brand.name} className="group flex flex-col items-center text-center w-full max-w-[240px]" href={`/browse?brand=${encodeURIComponent(brand.name)}`}>
                <div className="relative w-full pb-[100%] bg-gray-100 rounded-full overflow-hidden mb-3">
                  <Image
                    alt={brand.name}
                    src={brand.image}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>
                <div className="flex flex-col items-center w-full">
                  <div className="text-[#333333] font-semibold text-base leading-tight">{brand.name}</div>
                  <div className="text-[#333333] text-sm">{brand.location}</div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center md:text-left">
            <Link className="inline-block bg-white border border-[#1A1A1A] text-[#1A1A1A] px-8 py-3 rounded-[4px] font-medium hover:bg-gray-50 transition-colors" href="/browse?category=Home%20decor">All home decor</Link>
          </div>
        </div>
      </section>

      {/* We're OSP Section */}
      <section className="bg-[#BC826D] min-h-[450px] md:min-h-[550px] flex items-center py-16 md:py-24">
        <div className="max-w-[1700px] mx-auto px-6 md:px-10 lg:px-20 w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          <div className="w-full lg:w-1/2 flex flex-col gap-6 lg:gap-8 order-2 lg:order-1">
            <div className="flex flex-col gap-2">
              <h2 className="font-serif text-white text-4xl md:text-5xl lg:text-6xl leading-tight">We're OSP.</h2>
              <h3 className="font-sans text-white text-2xl md:text-3xl lg:text-4xl font-light">The platform for soda shops.</h3>
            </div>
            <p className="font-sans text-white max-w-2xl text-lg leading-relaxed">We make it easy for you to discover premium organic sodas and professional equipment that make your shop stand out.</p>
          </div>
          <div className="w-full lg:w-1/2 relative order-1 lg:order-2">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[4px]">
              <Image
                alt="Soda shop owner"
                src="https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80"
                fill
                className="object-cover"
              />
            </div>
            <div className="mt-4 text-sm text-white font-sans flex flex-col gap-0.5">
              <p className="font-semibold">Sarah Jenkins, Owner of The Soda Shoppe</p>
              <p className="text-white/80">Austin, Texas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="bg-white min-h-[450px] md:min-h-[550px] flex items-center py-16 md:py-24 border-b border-[#E0D9D0]">
        <div className="max-w-[1700px] w-full mx-auto px-6 md:px-10 lg:px-12 relative group">
          <h2 className="text-2xl font-serif text-[#1A1A1A] mb-8">Bestsellers you might like</h2>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-100 hover:bg-gray-50 transition-all opacity-0 group-hover:opacity-100" aria-label="Scroll right">
            <ChevronRight className="w-5 h-5 text-[#1A1A1A]" aria-hidden="true" />
          </button>
          <div className="flex overflow-x-auto gap-4 scrollbar-hide pb-4 -mx-6 px-6 md:mx-0 md:px-0">
            {[
              { title: "Craft Soda Variety Pack - 12 Flavors", brand: "Pop & Fizz Co.", rating: "4.9 (1,240)", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80" },
              { title: "Commercial Soda Fountain Dispenser - 6 Valve", brand: "BeverageTech Systems", rating: "4.8 (85)", image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=800&q=80" },
              { title: "Organic Cola Syrup Concentrate (5 Gallon)", brand: "Nature's Pour", rating: "5.0 (320)", image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80" },
              { title: "Premium Glass Bottle Soda - Root Beer (Case/24)", brand: "Old Town Bottling", rating: "4.9 (2,100)", image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=800&q=80" },
              { title: "Industrial Ice Maker - 500lb Capacity", brand: "FrostLine Commercial", rating: "4.7 (45)", image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&w=800&q=80" },
              { title: "CO2 Cylinder Refill System - Dual Gauge", brand: "DraftPure", rating: "4.8 (150)", image: "https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?auto=format&fit=crop&w=800&q=80" },
              { title: "Vintage Style Soda Glasses (Set of 6)", brand: "RetroServe", rating: "4.9 (890)", image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80" },
              { title: "Sparkling Water Maker - Home Edition", brand: "BubbleStream", rating: "4.6 (560)", image: "https://images.unsplash.com/photo-1627483297929-37f416fec7cd?auto=format&fit=crop&w=800&q=80" }
            ].map((product, i) => (
              <div key={i} className="min-w-[240px] w-[240px] flex-shrink-0 flex flex-col h-full">
                <Link className="flex flex-col h-full group" href="#">
                  <div className="relative aspect-square bg-[#F5F5F5] rounded-[4px] overflow-hidden mb-3 w-full">
                    <Image
                      alt={product.title}
                      src={product.image}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded text-[10px] font-medium text-[#1A1A1A] uppercase tracking-wide border border-gray-100">Bestseller</div>
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-[#1A1A1A] text-[15px] font-medium leading-snug mb-1 line-clamp-2 min-h-[42px]">{product.title}</h3>
                    <p className="text-[#6B6B6B] text-sm mb-2 line-clamp-1">{product.brand}</p>
                    <div className="flex items-center gap-1 mb-2 mt-auto">
                      <Star className="w-3 h-3 fill-current text-[#1A1A1A]" aria-hidden="true" />
                      <span className="text-xs text-[#1A1A1A]">{product.rating}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#1A1A1A]">
                      <Lock className="w-3 h-3" aria-hidden="true" />
                      <span className="text-sm underline decoration-[#757575] underline-offset-2">Unlock wholesale price</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Retailer Section (Sage Green) */}
      <section className="bg-[#556E5C] text-white min-h-[450px] md:min-h-[550px] flex items-center py-16 md:py-24 overflow-hidden">
        <div className="max-w-[1700px] mx-auto px-6 md:px-10 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 w-full">
          <div className="hidden lg:block w-full lg:w-1/3 opacity-80">
            {/* Visual placeholder for left image cluster */}
            <div className="relative aspect-square w-full max-w-[500px] rounded overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=800" alt="Retailer example" fill className="object-cover" />
            </div>
          </div>
          <div className="w-full md:w-[240px] lg:w-[370px] 2xl:w-[500px] text-center flex flex-col items-center z-10 mx-auto px-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif mb-4 leading-tight !text-white">For any retailer,<br />no matter what you sell.</h2>
            <p className="text-base md:text-lg !text-white/90 mb-6 leading-relaxed">Whether you buy for a clothing boutique or a grocery store, find all the products you need on OSP.</p>
            <Link className="bg-white text-[#1A1A1A] px-10 py-3 rounded-[4px] font-medium text-base hover:bg-gray-100 transition-colors" href="/?signUp=1">Sign up to buy</Link>
          </div>
          <div className="hidden lg:block w-full lg:w-1/3 opacity-80">
            {/* Visual placeholder for right image cluster */}
            <div className="relative aspect-square w-full max-w-[500px] rounded overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1604719312566-b7cb33746479?w=800" alt="Retailer example" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Explore Categories */}
      <section className="bg-white min-h-[450px] md:min-h-[550px] flex items-center py-16 md:py-24 border-b border-[#E0D9D0]">
        <div className="max-w-[1700px] w-full mx-auto px-6 md:px-10 lg:px-12 relative group/section">
          <h2 className="text-2xl font-serif text-[#333333] mb-8">Explore categories</h2>
          <button className="absolute right-4 top-[50%] -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-100 hover:bg-gray-50 transition-all opacity-0 group-hover/section:opacity-100" aria-label="Scroll right">
            <ChevronRight className="w-5 h-5 text-[#333333]" aria-hidden="true" />
          </button>
          <div className="flex overflow-x-auto gap-6 scrollbar-hide pb-4 -mx-6 px-6 md:mx-0 md:px-0">
            {[
              { name: "Home decor", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=640" },
              { name: "Food & Drink", image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=640" },
              { name: "Women", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=640" },
              { name: "Beauty & Wellness", image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=640" },
              { name: "Jewelry", image: "https://images.unsplash.com/photo-1515562141207-7a88fb05220c?w=640" },
              { name: "Kids & Baby", image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=640" },
              { name: "Paper & Novelty", image: "https://images.unsplash.com/photo-1586075010923-2dd45eeed8bd?w=640" }
            ].map((cat, i) => (
              <div key={i} className="min-w-[280px] sm:min-w-[320px] md:min-w-[400px] flex-shrink-0">
                <Link className="block group relative rounded-lg overflow-hidden" href={`/browse?category=${cat.name.replace(" & ", "+").replace(" ", "-")}`}>
                  <div className="relative w-full" style={{ aspectRatio: "1.4 / 1" }}>
                    <Image
                      alt={cat.name}
                      src={cat.image}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 z-[1]" style={{ background: "linear-gradient(22.18deg, rgba(0, 0, 0, 0.5) 1.86%, rgba(0, 0, 0, 0) 31.23%)" }}></div>
                  </div>
                  <div className="absolute bottom-0 left-0 z-[2] p-6">
                    <h4 className="text-xl md:text-2xl font-serif !text-white">{cat.name}</h4>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by your values */}
      <section className="bg-white min-h-[450px] flex flex-col py-16 md:py-24 border-b border-[#E0D9D0] overflow-hidden">
        <div className="max-w-[1700px] w-full mx-auto px-6 md:px-10 lg:px-12">
          <div className="flex flex-col mb-12">
            <h2 className="text-3xl font-serif text-[#333333] mb-8">Shop by your values</h2>
            <div className="w-full overflow-x-auto pb-4 -mx-6 px-6 md:mx-0 md:px-0 scrollbar-hide">
              <div className="flex gap-3 w-max">
                {["Women owned", "Organic", "Eco-friendly", "Made in USA", "Small Batch", "Sugar Free", "Not on Amazon"].map((val, i) => (
                  <button key={i} className={`flex h-10 cursor-pointer items-center justify-center rounded-[40px] border px-6 py-2 transition-all duration-200 whitespace-nowrap ${val === "Eco-friendly" ? "bg-[#1A1A1A] text-white border-[#1A1A1A]" : "bg-white text-[#333333] border-[#E0D9D0] hover:border-[#333333]"}`}>
                    <span className="text-sm md:text-base font-medium font-sans">{val}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full flex-col gap-6 pt-2 md:flex-row md:gap-8 lg:gap-14 flex items-center md:items-start">
            <div className="relative w-full md:w-[440px] lg:w-[455px] xl:w-[640px] 2xl:w-[824px] aspect-[4/3] md:aspect-auto md:h-[413px] lg:h-[455px] xl:h-[500px] 2xl:h-[635px] rounded-sm overflow-hidden bg-gray-100">
              <Image alt="GreenSip" src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80" fill className="object-cover animate-in fade-in duration-700" />
            </div>
            <div className="relative pt-2 w-full md:flex-1 md:h-[413px] lg:h-[455px] xl:h-[500px] 2xl:h-[635px] flex flex-col justify-between">
              <div>
                <h5 className="text-[#333333] text-sm tracking-[0.15px] lg:text-lg lg:leading-[26px] xl:text-[22px] xl:leading-8 2xl:text-3xl 2xl:leading-[38px] font-medium font-sans mb-8">“Sustainable hydration is our mission. Our bottles are 100% plant-based and compostable, reducing single-use plastic waste one drink at a time.”</h5>
                <div className="space-y-1 mb-8">
                  <Link className="block text-sm lg:text-lg font-medium text-[#333333] underline hover:no-underline" href="/browse?brand=GreenSip">GreenSip</Link>
                  <p className="text-[#757575] text-sm lg:text-base">Seattle, Washington</p>
                </div>
              </div>
              <div className="mt-auto">
                <Link className="inline-block text-[#333333] font-medium border-b border-black pb-0.5 hover:text-[#757575] hover:border-[#757575] transition-colors" href="/browse?values=eco-friendly">Shop Eco-friendly</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Benefits */}
      <section className="bg-white min-h-[450px] md:min-h-[550px] flex items-center py-16 md:py-24 border-b border-[#E0D9D0]">
        <div className="max-w-[1400px] w-full mx-auto px-6 md:px-10 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
            <div className="w-full lg:w-1/2 flex flex-col items-start pt-4">
              <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#333333] mb-12 leading-tight">Try new flavor profiles in your shop, with confidence.</h3>
              <div className="flex flex-col gap-10 w-full max-w-lg mb-12">
                <div className="flex flex-col gap-1">
                  <span className="text-lg font-medium text-[#333333]">Low order minimums</span>
                  <h5 className="text-[#757575] text-lg font-normal leading-relaxed">Trial thousands of craft soda brands with low or no minimums.</h5>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-lg font-medium text-[#333333]">60 days to pay, interest free</span>
                  <h5 className="text-[#757575] text-lg font-normal leading-relaxed">Stock your shelves now and pay invoices 60 days later with zero fees.</h5>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-lg font-medium text-[#333333]">Free and easy returns</span>
                  <h5 className="text-[#757575] text-lg font-normal leading-relaxed">You get free returns on every first order with a new brand.</h5>
                </div>
              </div>
              <Link className="inline-block bg-[#1A1A1A] text-white px-8 py-4 rounded-full text-base font-medium hover:bg-[#333333] transition-colors" href="/?signUp=1">Sign up to buy</Link>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="relative w-full aspect-[4/5] lg:aspect-[3/4] max-w-[500px] mx-auto lg:mx-0 lg:ml-auto">
                <div className="relative w-full h-full rounded-sm overflow-hidden bg-gray-100">
                  <Image alt="Sarah Jenkins stocking shelves" src="https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80" fill className="object-cover" />
                </div>
                <div className="mt-4 flex flex-col gap-1">
                  <p className="font-medium text-[#333333] text-sm md:text-base">Sarah Jenkins, Owner of The Soda Shoppe</p>
                  <p className="text-[#757575] text-sm">Austin, Texas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="bg-[#ffd0b6] min-h-[500px] flex flex-col justify-center py-12 md:py-0 overflow-hidden relative">
        <div className="max-w-[1700px] mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 lg:gap-24 px-6 md:px-12">
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <div className="grid grid-cols-2 gap-4 w-full max-w-[500px]">
              <div className="flex flex-col gap-4 translate-y-8">
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden w-full">
                  <Image alt="" src="https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80" fill className="object-cover" />
                </div>
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden w-full">
                  <Image alt="" src="https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=80" fill className="object-cover" />
                </div>
              </div>
              <div className="flex flex-col gap-4 -translate-y-8">
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden w-full">
                  <Image alt="" src="https://images.unsplash.com/photo-1543253687-c59975c7125e?auto=format&fit=crop&w=400&q=80" fill className="object-cover" />
                </div>
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden w-full">
                  <Image alt="" src="https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=400&q=80" fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left z-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#333333] mb-8 leading-tight">The perfect<br /><span className="text-[#333333] underline decoration-[#757575] underline-offset-8 transition-all duration-300 block min-h-[1.2em]">syrup</span>for your store,<br />right this way.</h2>
            <Link className="bg-[#1A1A1A] text-white px-8 py-3.5 rounded-full font-medium text-lg hover:bg-[#333333] transition-colors mb-12" href="/?signUp=1">Sign up for free</Link>
          </div>
        </div>
        <div className="w-full border-t border-[#333333]/10 pt-6 mt-12 md:mt-0 md:absolute md:bottom-6 left-0 bg-[#ffd0b6]">
          <div className="max-w-[1700px] mx-auto px-6 w-full flex items-center gap-6 overflow-hidden">
            <span className="text-[#333333] font-medium whitespace-nowrap">More to explore</span>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 w-full">
              {["Ginger Beer", "Cola", "Evaluate", "Root Beer", "Fruit Soda", "Sparkling Water", "Tonics", "Bitters", "Shrubs", "Glassware", "Syrups", "Garnishes", "Bar Tools", "Cocktail Mixers", "Probiotic Soda", "Kombucha"].map((tag) => (
                <Link key={tag} className="flex-shrink-0 px-5 py-2 rounded-full border border-[#333333] text-[#333333] hover:bg-[#333333]/5 transition-colors whitespace-nowrap text-sm font-medium" href={`/browse?search=${encodeURIComponent(tag)}`}>{tag}</Link>
              ))}
            </div>
          </div>
        </div>
      </section>
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
