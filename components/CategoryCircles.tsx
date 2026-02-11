"use client";

import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    id: "organic-sodas",
    name: "Organic Sodas",
    image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&h=400&fit=crop",
    href: "/collections/beverages",
  },
  {
    id: "soda-equipment",
    name: "Soda Equipment",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=400&fit=crop",
    href: "/collections/equipment",
  },
  {
    id: "sustainable-tableware",
    name: "Sustainable Tableware",
    image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&h=400&fit=crop",
    href: "/collections/tableware",
  },
  {
    id: "beverages",
    name: "Beverages",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400&h=400&fit=crop",
    href: "/beverages",
  },
  {
    id: "eco-packaging",
    name: "Eco Packaging",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
    href: "/browse?category=Tableware",
  },
  {
    id: "top-deals",
    name: "Top Deals",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=400&fit=crop",
    href: "/browse?filter=bestseller",
  },
];

export default function CategoryCircles() {
  return (
    <section className="bg-white py-8 md:py-10 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl md:text-2xl font-semibold text-black mb-1 text-center">
          Welcome to OSP!
        </h2>
        <Link
          href="/login"
          className="text-sm text-blue-600 hover:underline mb-6 block text-center"
        >
          Sign-in to personalize your experience
        </Link>

        {/* Six circles - Zazzle style */}
        <div className="flex justify-center gap-4 md:gap-8 overflow-x-auto scrollbar-hide py-2">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className="group flex flex-col items-center text-center flex-shrink-0"
            >
              <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-gray-200 bg-gray-50 mb-2 group-hover:border-gray-400 group-hover:shadow-lg transition-all duration-300">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  sizes="112px"
                />
              </div>
              <span className="text-xs md:text-sm font-medium text-gray-700 group-hover:text-black max-w-[80px] md:max-w-[112px]">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
