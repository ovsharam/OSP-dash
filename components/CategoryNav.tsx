"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const categories = [
  { id: "all", name: "Featured", href: "/browse" },
  { id: "new", name: "New", href: "/browse?filter=new" },
  { id: "sodas", name: "Sodas", href: "/browse?category=Sodas" },
  { id: "sparkling-water", name: "Sparkling Water", href: "/browse?category=Sparkling+Water" },
  { id: "machines", name: "Machines", href: "/browse?category=Machines" },
  { id: "syrups-mixers", name: "Syrups & Mixers", href: "/browse?category=Syrups+%26+Mixers" },
  { id: "parts-accessories", name: "Parts & Accessories", href: "/browse?category=Parts+%26+Accessories" },
  { id: "bundles", name: "Bundles", href: "/browse?category=Bundles" },
  { id: "sale", name: "Sale", href: "/browse?category=Sale" },
];

export default function CategoryNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center space-x-8 overflow-x-auto py-0">
          {categories.map((category) => {
            let isActive = false;

            if (category.id === "all") {
              isActive = pathname === "/browse" && !searchParams.get("category") && !searchParams.get("filter");
            } else if (category.id === "new") {
              isActive = searchParams.get("filter") === "new";
            } else {
              const categoryParam = category.href.split("category=")[1]?.split("&")[0];
              const currentCategoryParam = searchParams.get("category");
              isActive = currentCategoryParam === decodeURIComponent(categoryParam || "");
            }

            return (
              <Link
                key={category.id}
                href={category.href}
                className={`py-4 px-1 whitespace-nowrap text-sm font-normal transition-colors ${isActive
                  ? "text-black border-b-2 border-black"
                  : "text-gray-700 hover:text-black"
                  }`}
              >
                {category.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

