import Image from "next/image";
import Link from "next/link";
import { mockProducts, mockCategories, mockVendors } from "@/lib/mockData";
import ProductCarousel from "@/components/ProductCarousel";
import { ArrowRight, ShieldCheck, Truck, Globe2 } from "lucide-react";

export default function Home() {
  const bestsellers = mockProducts.filter((p) => p.isBestseller);
  const newArrivals = mockProducts.filter((p) => p.isNew);

  return (
    <div className="min-h-screen bg-[#ece4d0] pb-24">
      {/* 1. Hero Section */}
      <section className="relative h-[65vh] min-h-[500px] w-full bg-[#333333] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&q=80&w=2000"
          alt="Premium artisan chocolate"
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="relative z-10 text-center px-4 max-w-4xl pt-12">
          <h1 className="text-4xl md:text-6xl font-serif text-[#ece4d0] mb-6 leading-tight tracking-tight">
            The wholesale marketplace for <br className="hidden md:block" />
            <span className="italic">fine chocolate makers</span>
          </h1>
          <p className="text-lg md:text-xl text-[#ece4d0]/90 mb-10 font-sans max-w-2xl mx-auto font-light">
            Discover and buy premium couverture, single-origin bars, and artisan truffles from the world's best independent brands.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/browse"
              className="bg-[#5c0f0f] text-[#ece4d0] px-8 py-3.5 rounded-full font-bold uppercase tracking-widest hover:bg-[#3d0a0a] transition-all shadow-lg w-full sm:w-auto"
            >
              Shop All Products
            </Link>
            <Link
              href="/browse?filter=new"
              className="bg-transparent border border-[#ece4d0] text-[#ece4d0] px-8 py-3.5 rounded-full font-bold uppercase tracking-widest hover:bg-[#ece4d0] hover:text-[#5c0f0f] transition-all w-full sm:w-auto"
            >
              Explore New Arrivals
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Trust Bar */}
      <div className="bg-[#5c0f0f] text-[#ece4d0] py-6 border-y border-[#d1b181]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-[#d1b181]/30">
            <div className="flex items-center justify-center gap-3 py-2 md:py-0">
              <ShieldCheck className="w-5 h-5 text-[#d1b181]" />
              <span className="font-sans font-medium text-sm lg:text-base">Curated independent brands</span>
            </div>
            <div className="flex items-center justify-center gap-3 py-2 md:py-0">
              <Globe2 className="w-5 h-5 text-[#d1b181]" />
              <span className="font-sans font-medium text-sm lg:text-base">Sourced from 30+ countries</span>
            </div>
            <div className="flex items-center justify-center gap-3 py-2 md:py-0">
              <Truck className="w-5 h-5 text-[#d1b181]" />
              <span className="font-sans font-medium text-sm lg:text-base">Free samples on first order</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Category Grid - Faire Style */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-3xl font-serif text-[#5c0f0f] tracking-tight">Shop by Category</h2>
          <Link href="/browse" className="hidden sm:flex items-center gap-2 text-sm font-bold text-[#5c0f0f] uppercase tracking-wider hover:text-[#d1b181] transition-colors">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {mockCategories.map((category) => (
            <Link
              key={category.id}
              href={`/browse?category=${encodeURIComponent(category.name)}`}
              className="group relative h-64 md:h-80 overflow-hidden rounded-lg block cursor-pointer"
            >
              <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-black/10 transition-colors duration-500"></div>
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
                <h3 className="text-xl md:text-2xl font-serif text-white font-bold mb-1 shadow-sm">{category.name}</h3>
                <p className="text-white/90 font-sans text-sm">{category.count} Products</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <Link href="/browse" className="inline-flex items-center gap-2 text-sm font-bold text-[#5c0f0f] uppercase tracking-wider border border-[#5c0f0f] px-6 py-3 rounded-full hover:bg-[#5c0f0f] hover:text-[#ece4d0] transition-colors">
            View All Categories
          </Link>
        </div>
      </section>

      {/* 4. Best Sellers Carousel */}
      <section className="py-16 bg-white border-y border-[#333]/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-serif text-[#5c0f0f] tracking-tight mb-2">Best Sellers</h2>
              <p className="text-[#333]/70 font-sans text-lg">Top-rated chocolate chosen by retailers</p>
            </div>
            <Link href="/browse?filter=bestseller" className="hidden sm:flex items-center gap-2 text-sm font-bold text-[#5c0f0f] uppercase tracking-wider hover:text-[#d1b181] transition-colors">
              Shop Bestsellers <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="-mx-4 sm:mx-0">
            <ProductCarousel products={bestsellers} title="" />
          </div>
        </div>
      </section>

      {/* 5. Brand Spotlight */}
      <section className="py-20 bg-[#ece4d0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-sm font-bold text-[#d1b181] tracking-[0.2em] uppercase mb-10">Featured Brands</h2>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 md:gap-x-20 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {Object.values(mockVendors).slice(0, 5).map(vendor => (
              <div key={vendor.id} className="text-2xl md:text-3xl font-serif font-bold text-[#5c0f0f] cursor-pointer hover:scale-110 transition-transform">
                {vendor.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Shop by Origin (Map/Cards) */}
      <section className="py-20 bg-[#333333] text-[#ece4d0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/3">
              <h2 className="text-4xl font-serif mb-6 text-white">Sourced directly from the origin</h2>
              <p className="font-sans text-[#ece4d0]/80 mb-8 leading-relaxed text-lg">
                Explore single-origin couverture and bars that highlight the unique terroir of the world's finest cocoa growing regions.
              </p>
              <Link href="/browse?filter=origin" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#d1b181] hover:text-white transition-colors">
                Explore All Origins <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="md:w-2/3 grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
              {['Madagascar', 'Ecuador', 'Venezuela', 'Peru', 'Tanzania', 'Belize'].map((origin, i) => (
                <Link
                  key={origin}
                  href={`/browse?origin=${encodeURIComponent(origin)}`}
                  className="bg-white/5 border border-white/10 p-6 rounded-lg text-center hover:bg-white/10 hover:border-[#d1b181]/50 transition-all group"
                >
                  <div className="w-12 h-12 mx-auto bg-[#5c0f0f]/50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-[#d1b181]">
                    <Globe2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl text-white">{origin}</h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. New Arrivals */}
      <section className="py-20 bg-[#ece4d0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-serif text-[#5c0f0f] tracking-tight mb-2">New Arrivals</h2>
              <p className="text-[#333]/70 font-sans text-lg">Fresh stock just landed from our makers</p>
            </div>
          </div>
          <div className="-mx-4 sm:mx-0">
            <ProductCarousel products={newArrivals} title="" />
          </div>
        </div>
      </section>

    </div>
  );
}
