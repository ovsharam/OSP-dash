"use client";

import { Suspense, useState } from "react";
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
    { name: "Maine Root", location: "Portland, Maine", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800" }
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
        <div className="max-w-[1700px] mx-auto px-6 md:px-10 lg:px-12 w-full">
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
                <div className="relative w-full pb-[100%] bg-gray-50 rounded-full overflow-hidden mb-3">
                  <Image
                    alt={brand.name}
                    src={brand.image}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>
                <div className="flex flex-col items-center w-full">
                  <div className="text-[#333333] font-semibold text-base leading-tight relative group-hover:after:w-full after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#333333] after:transition-all after:duration-500">{brand.name}</div>
                  <div className="text-[#6B6B6B] text-sm mt-1">{brand.location}</div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center md:text-left">
            <Link className="inline-block bg-white border border-[#1A1A1A] text-[#1A1A1A] px-8 py-3 rounded-[4px] font-medium hover:bg-gray-50 transition-colors" href={`/browse?category=${encodeURIComponent(activeCategory)}`}>
              All {activeCategory.toLowerCase()}
            </Link>
          </div>
        </div>
      </section>

      {/* We're OSP Section */}
      <section className="bg-[#5B6128] text-white min-h-[450px] md:min-h-[650px] flex items-center py-16 md:py-24 overflow-hidden relative">
        <div className="max-w-[1700px] mx-auto px-6 md:px-10 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 w-full relative z-10">
          {/* Left Image */}
          <div className="hidden lg:block w-full lg:w-[30%] xl:w-[35%] opacity-90 transition-all duration-700">
            <div className="relative aspect-square w-full max-w-[550px] rounded-sm overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800"
                alt="Boutique home decor"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Center Text */}
          <div className="w-full lg:w-[40%] xl:w-[30%] text-center flex flex-col items-center px-4">
            <h2 className="text-3xl md:text-5xl lg:text-4xl xl:text-5xl font-serif mb-6 leading-tight !text-white">
              For any retailer,<br className="hidden md:block" /> no matter what you sell.
            </h2>
            <p className="text-lg md:text-xl !text-white/90 mb-10 leading-relaxed max-w-[400px]">
              Whether you buy for a clothing boutique or a grocery store, find all the products you need on OSP.
            </p>
            <Link
              className="bg-white text-[#1A1A1A] px-10 py-3.5 rounded-[4px] font-medium text-base hover:bg-gray-100 transition-all duration-200 active:scale-95 shadow-lg"
              href="/?signUp=1"
            >
              Sign up to buy
            </Link>
          </div>

          {/* Right Image */}
          <div className="hidden lg:block w-full lg:w-[30%] xl:w-[35%] opacity-90 transition-all duration-700">
            <div className="relative aspect-square w-full max-w-[550px] rounded-sm overflow-hidden shadow-2xl ml-auto">
              <Image
                src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=800"
                alt="Artisan boutique shelf"
                fill
                className="object-cover"
              />
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


      {/* Explore Categories */}
      <section className="bg-white min-h-[450px] md:min-h-[550px] flex items-center py-16 md:py-24 border-b border-[#E0D9D0]">
        <div className="max-w-[1700px] w-full mx-auto px-6 md:px-10 lg:px-12 relative">
          <h2 className="text-3xl font-serif text-[#333333] mb-8">Explore categories</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {[
              { name: "Home decor", image: "https://cdn.faire.com/fastly/3370be0e446c444a7edc2be7543741c14b9f5de052618d149133001dbad36763.png" },
              { name: "Food & drink", image: "https://cdn.faire.com/fastly/ef838c32665b69c1a2e0030d16bbed76dac72e1720264c320864745596a6aa2b.png" },
              { name: "Women", image: "https://cdn.faire.com/fastly/ca29c8196ca222197e486c61f43023ca87f57c306f22cd63ff6d7b31ad5c53d0.png" }
            ].map((cat, i) => (
              <div key={i} className="w-full">
                <Link className="block group relative rounded-sm overflow-hidden" href={`/browse?category=${cat.name.replace(" & ", "+").replace(" ", "-")}`}>
                  <div className="relative w-full overflow-hidden" style={{ aspectRatio: "1.4 / 1" }}>
                    <Image
                      alt={cat.name}
                      src={cat.image}
                      fill
                      className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.17,0.67,0.24,1)] group-hover:scale-110"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 z-[1]" style={{ background: "linear-gradient(22.18deg, rgba(0, 0, 0, 0.5) 1.86%, rgba(0, 0, 0, 0) 31.23%)" }}></div>
                  </div>
                  <div className="absolute bottom-0 left-0 z-[2] p-4 md:p-6 lg:p-8">
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
