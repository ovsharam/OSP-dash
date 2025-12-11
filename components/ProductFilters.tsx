"use client";

import { useState } from "react";

interface ProductFiltersProps {
  categories: string[];
  vendors: string[];
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  category: string;
  vendor: string;
  minPrice: number;
  maxPrice: number;
  inStock: boolean | null;
  sampleAvailable: boolean | null;
}

export default function ProductFilters({ categories, vendors, onFilterChange }: ProductFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    category: "",
    vendor: "",
    minPrice: 0,
    maxPrice: 10000,
    inStock: null,
    sampleAvailable: null,
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters: FilterState = {
      category: "",
      vendor: "",
      minPrice: 0,
      maxPrice: 10000,
      inStock: null,
      sampleAvailable: null,
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-black">Filters</h2>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 hover:text-black"
          >
            {isOpen ? "Hide" : "Show"} Filters
          </button>
        </div>
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 ${isOpen ? "" : "hidden md:grid"}`}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black text-black"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Vendor</label>
            <select
              value={filters.vendor}
              onChange={(e) => handleFilterChange("vendor", e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black text-black"
            >
              <option value="">All Vendors</option>
              {vendors.map((vendor) => (
                <option key={vendor} value={vendor}>
                  {vendor}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice || ""}
                onChange={(e) => handleFilterChange("minPrice", Number(e.target.value))}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black text-black"
              />
              <span className="text-gray-500">-</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice || ""}
                onChange={(e) => handleFilterChange("maxPrice", Number(e.target.value))}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black text-black"
              />
            </div>
          </div>
          <div className="flex items-end">
            <button
              onClick={clearFilters}
              className="w-full bg-gray-100 text-black px-4 py-2 rounded hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              Clear Filters
            </button>
          </div>
        </div>
        <div className={`mt-4 flex flex-wrap gap-2 ${isOpen ? "" : "hidden md:flex"}`}>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.inStock === true}
              onChange={(e) => handleFilterChange("inStock", e.target.checked ? true : null)}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">In Stock Only</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.sampleAvailable === true}
              onChange={(e) => handleFilterChange("sampleAvailable", e.target.checked ? true : null)}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">Sample Available</span>
          </label>
        </div>
      </div>
    </div>
  );
}

