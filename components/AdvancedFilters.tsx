"use client";

import { useState } from "react";
import { FilterState } from "./ProductFilters";

interface AdvancedFiltersProps {
  categories: string[];
  vendors: string[];
  onFilterChange: (filters: FilterState) => void;
  currentFilters: FilterState;
  onClose: () => void;
}

export default function AdvancedFilters({
  categories,
  vendors,
  onFilterChange,
  currentFilters,
  onClose,
}: AdvancedFiltersProps) {
  const [filters, setFilters] = useState<FilterState>(currentFilters);

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

  const activeFilterCount = [
    filters.category,
    filters.vendor,
    filters.inStock !== null,
    filters.sampleAvailable !== null,
    filters.minPrice > 0,
    filters.maxPrice < 10000,
  ].filter(Boolean).length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-end" onClick={onClose}>
      <div
        className="bg-white w-full max-w-md h-full overflow-y-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-black">
              Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-black transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {activeFilterCount > 0 && (
            <button
              onClick={clearFilters}
              className="text-sm text-gray-600 hover:text-black"
            >
              Clear all filters
            </button>
          )}
        </div>

        <div className="p-6 space-y-6">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-black"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Vendor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Vendor</label>
            <select
              value={filters.vendor}
              onChange={(e) => handleFilterChange("vendor", e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-black"
            >
              <option value="">All Vendors</option>
              {vendors.map((vendor) => (
                <option key={vendor} value={vendor}>
                  {vendor}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice || ""}
                onChange={(e) => handleFilterChange("minPrice", Number(e.target.value))}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-black"
              />
              <span className="text-gray-500">-</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice || ""}
                onChange={(e) => handleFilterChange("maxPrice", Number(e.target.value))}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-black"
              />
            </div>
          </div>

          {/* Stock Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Stock Status</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="stock"
                  checked={filters.inStock === true}
                  onChange={() => handleFilterChange("inStock", true)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">In Stock Only</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="stock"
                  checked={filters.inStock === false}
                  onChange={() => handleFilterChange("inStock", false)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Out of Stock</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="stock"
                  checked={filters.inStock === null}
                  onChange={() => handleFilterChange("inStock", null)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">All</span>
              </label>
            </div>
          </div>

          {/* Sample Available */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Sample Available</label>
            <div className="space-y-2">
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
      </div>
    </div>
  );
}


