"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const categories = [
  { id: "all", name: "Featured", href: "/browse" },
  { id: "new", name: "New", href: "/browse?filter=new" },
  { id: "beverages", name: "Organic Sodas", href: "/beverages" },
  { id: "equipment", name: "Soda Equipment", href: "/equipment" },
  { id: "tableware", name: "Sustainable Tableware", href: "/browse?category=Tableware" },
];

export default function CategoryNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center space-x-8 overflow-x-auto py-0">
          {categories.map((category) => {
            const isActive = pathname === category.href || 
              (category.id === "beverages" && pathname.includes("beverages")) ||
              (category.id === "equipment" && pathname.includes("equipment"));
            
            return (
              <Link
                key={category.id}
                href={category.href}
                className={`py-4 px-1 whitespace-nowrap text-sm font-normal transition-colors ${
                  isActive
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

