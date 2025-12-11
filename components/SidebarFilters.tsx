"use client";

import { useState } from "react";
import Link from "next/link";

interface SidebarFiltersProps {
  onFilterChange?: (filters: any) => void;
  vendors?: string[];
}

export default function SidebarFilters({ onFilterChange, vendors = [] }: SidebarFiltersProps) {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    foodDrink: false,
    beverages: false,
    productTypes: false,
    shipsFrom: false,
    brandValues: false,
    brands: false,
    storage: false,
    shelfLife: false,
    diet: false,
    production: false,
    trending: false,
    madeIn: false,
    shipWindow: false,
    leadTime: false,
    gtin: false,
  });

  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({});
  const [searchQueries, setSearchQueries] = useState<{ [key: string]: string }>({});
  const [showMore, setShowMore] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleShowMore = (section: string) => {
    setShowMore((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleFilter = (category: string, value: string) => {
    setSelectedFilters((prev) => {
      const current = prev[category] || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      const newFilters = { ...prev, [category]: updated };
      onFilterChange?.(newFilters);
      return newFilters;
    });
  };

  const isChecked = (category: string, value: string) => {
    return selectedFilters[category]?.includes(value) || false;
  };

  const FilterSection = ({
    title,
    sectionKey,
    children,
    testId,
  }: {
    title: string;
    sectionKey: string;
    children: React.ReactNode;
    testId?: string;
  }) => {
    const isExpanded = expandedSections[sectionKey];
    return (
      <div data-test-id={testId || `filter-section-wrapper-${title}`} className="border-b border-gray-200 last:border-b-0">
        <button
          onClick={() => toggleSection(sectionKey)}
          role="heading"
          aria-level={3}
          aria-label={title}
          aria-expanded={isExpanded}
          aria-controls={`filter-section-options-${sectionKey.toUpperCase()}`}
          id={`filter-section-header-${sectionKey.toUpperCase()}`}
          className="w-full flex items-center justify-between py-3 px-0 hover:opacity-70 transition-opacity"
        >
          <p
            className="f_t_base f_t_color f_t_paragraphSansMedium text-left"
            style={{ "--f_t_color": "#333333", "--f_t_decorationColor": "#757575" } as React.CSSProperties}
          >
            {title}
          </p>
          <svg
            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isExpanded && (
          <section
            id={`filter-section-options-${sectionKey.toUpperCase()}`}
            aria-labelledby={`filter-section-header-${sectionKey.toUpperCase()}`}
            className="pb-4"
          >
            {children}
          </section>
        )}
      </div>
    );
  };

  const CheckboxItem = ({
    label,
    category,
    value,
    id,
  }: {
    label: string;
    category: string;
    value: string;
    id: string;
  }) => (
    <label
      htmlFor={id}
      className="flex items-center py-2 cursor-pointer hover:bg-gray-50 rounded px-1 -mx-1 transition-colors group"
    >
      <input
        type="checkbox"
        id={id}
        checked={isChecked(category, value)}
        onChange={() => toggleFilter(category, value)}
        className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black focus:ring-2 cursor-pointer"
      />
      <span
        id={`filter-${category}:${value}`}
        data-show-result-count="false"
        aria-label={label}
        title={label}
        className="ml-3 text-sm text-gray-700 group-hover:text-black transition-colors"
      >
        {label}
      </span>
    </label>
  );

  const RadioItem = ({
    label,
    category,
    value,
    id,
    name,
  }: {
    label: string;
    category: string;
    value: string;
    id: string;
    name: string;
  }) => (
    <label
      htmlFor={id}
      className="flex items-center py-2 cursor-pointer hover:bg-gray-50 rounded px-1 -mx-1 transition-colors group"
    >
      <input
        type="radio"
        id={id}
        name={name}
        checked={isChecked(category, value)}
        onChange={() => toggleFilter(category, value)}
        className="w-4 h-4 text-black border-gray-300 focus:ring-black focus:ring-2 cursor-pointer"
      />
      <span
        id={`filter-${category}:${value}`}
        data-show-result-count="false"
        aria-label={label}
        title={label}
        className="ml-3 text-sm text-gray-700 group-hover:text-black transition-colors"
      >
        {label}
      </span>
    </label>
  );

  const SearchInput = ({
    category,
    placeholder = "Search",
  }: {
    category: string;
    placeholder?: string;
  }) => {
    const query = searchQueries[category] || "";
    return (
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          placeholder={placeholder}
          data-test-id={`filter-search-field-${category.toUpperCase()}`}
          aria-invalid="false"
          className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
          type="search"
          value={query}
          onChange={(e) =>
            setSearchQueries((prev) => ({
              ...prev,
              [category]: e.target.value,
            }))
          }
        />
      </div>
    );
  };

  return (
    <div className="w-full bg-white">
      <div className="overflow-hidden">
        <div className="max-h-[360px] overflow-y-auto pb-4">
          <nav data-test-id="category-page-sidebar" aria-label="Side Navigation" className="px-4 py-2">
            <ul className="list-none pl-0 space-y-1">
              <li>
                <Link
                  data-test-id="left-nav-link"
                  className="block py-2 px-2 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-50 rounded transition-colors"
                  href="/category/Food & Drink"
                >
                  Food & drink
                </Link>
                <ul className="list-none pl-4 mt-1 space-y-1">
                  <li>
                    <Link
                      data-test-id="left-nav-link"
                      className="block py-1.5 px-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded transition-colors"
                      href="/category/Food & Drink/subcategory/New Arrivals"
                    >
                      New brands
                    </Link>
                  </li>
                  <li>
                    <Link
                      data-test-id="left-nav-link"
                      className="block py-1.5 px-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded transition-colors"
                      href="/category/Food & Drink/subcategory/New Products"
                    >
                      New products
                    </Link>
                  </li>
                  <li>
                    <Link
                      data-test-id="left-nav-link"
                      className="block py-1.5 px-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded transition-colors"
                      href="/category/Food & Drink/subcategory/Baking"
                    >
                      Baking
                    </Link>
                  </li>
                  <li>
                    <Link
                      data-test-id="left-nav-link"
                      aria-current="page"
                      className="block py-1.5 px-2 text-sm font-medium text-black bg-gray-100 rounded"
                      href="/category/Food & Drink/subcategory/Beverages"
                    >
                      Beverages
                    </Link>
                    <ul className="list-none pl-4 mt-1 space-y-1">
                      <li>
                        <Link
                          data-test-id="left-nav-link"
                          className="block py-1.5 px-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded transition-colors"
                          href="/category/Food & Drink/subcategory/Beverages/New Arrivals"
                        >
                          New brands
                        </Link>
                      </li>
                      <li>
                        <Link
                          data-test-id="left-nav-link"
                          className="block py-1.5 px-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded transition-colors"
                          href="/category/Food & Drink/subcategory/Beverages/New Products"
                        >
                          New products
                        </Link>
                      </li>
                      <li>
                        <Link
                          data-test-id="left-nav-link"
                          className="block py-1.5 px-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded transition-colors"
                          href="/category/Food & Drink/subcategory/Beverages/Cocktail Mixes & Elixirs"
                        >
                          Cocktail mixes & elixirs
                        </Link>
                      </li>
                      <li>
                        <Link
                          data-test-id="left-nav-link"
                          className="block py-1.5 px-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded transition-colors"
                          href="/category/Food & Drink/subcategory/Beverages/Hot Cocoa & Cider"
                        >
                          Hot cocoa & cider
                        </Link>
                      </li>
                      <li>
                        <Link
                          data-test-id="left-nav-link"
                          className="block py-1.5 px-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded transition-colors"
                          href="/category/Food & Drink/subcategory/Beverages/Juice"
                        >
                          Juice
                        </Link>
                      </li>
                      <li>
                        <Link
                          data-test-id="left-nav-link"
                          className="block py-1.5 px-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded transition-colors"
                          href="/category/Food & Drink/subcategory/Beverages/Non-Alcoholic"
                        >
                          Non-alcoholic
                        </Link>
                      </li>
                      <li>
                        <Link
                          data-test-id="left-nav-link"
                          aria-current="page"
                          className="block py-1.5 px-2 text-sm font-medium text-black bg-gray-100 rounded"
                          href="/category/Food & Drink/subcategory/Beverages/Water"
                        >
                          Water
                        </Link>
                      </li>
                      <li>
                        <Link
                          data-test-id="left-nav-link"
                          className="block py-1.5 px-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded transition-colors"
                          href="/category/Food & Drink/subcategory/Beverages/Non-Dairy Milk"
                        >
                          Non-dairy milk
                        </Link>
                      </li>
                      <li>
                        <Link
                          data-test-id="left-nav-link"
                          className="block py-1.5 px-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded transition-colors"
                          href="/category/Food & Drink/subcategory/Beverages/Powdered Drink Mixes"
                        >
                          Powdered drink mixes
                        </Link>
                      </li>
                      <li>
                        <Link
                          data-test-id="left-nav-link"
                          className="block py-1.5 px-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded transition-colors"
                          href="/category/Food & Drink/subcategory/Beverages/Soda & Sparkling"
                        >
                          Soda & sparkling
                        </Link>
                      </li>
                      <li>
                        <Link
                          data-test-id="left-nav-link"
                          className="block py-1.5 px-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded transition-colors"
                          href="/category/Food & Drink/subcategory/Beverages/Drink Kits"
                        >
                          Drink kits
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link
                      data-test-id="left-nav-link"
                      className="block py-1.5 px-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded transition-colors"
                      href="/category/Food & Drink/subcategory/Cereals, Grains, & Pastas"
                    >
                      Cereals, grains, & pastas
                    </Link>
                  </li>
                  <li>
                    <Link
                      data-test-id="left-nav-link"
                      className="block py-1.5 px-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded transition-colors"
                      href="/category/Food & Drink/subcategory/Coffee & Tea"
                    >
                      Coffee & tea
                    </Link>
                  </li>
                  <li>
                    <Link
                      data-test-id="left-nav-link"
                      className="block py-1.5 px-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded transition-colors"
                      href="/category/Food & Drink/subcategory/Condiments & Sauces"
                    >
                      Condiments & sauces
                    </Link>
                  </li>
                  <li>
                    <Link
                      data-test-id="left-nav-link"
                      className="block py-1.5 px-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded transition-colors"
                      href="/category/Food & Drink/subcategory/Confections"
                    >
                      Confections
                    </Link>
                  </li>
                  <li>
                    <Link
                      data-test-id="left-nav-link"
                      className="block py-1.5 px-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded transition-colors"
                      href="/category/Food & Drink/subcategory/Dairy & Meats"
                    >
                      Dairy & meats
                    </Link>
                  </li>
                  <li>
                    <Link
                      data-test-id="left-nav-link"
                      className="block py-1.5 px-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded transition-colors"
                      href="/category/Food & Drink/subcategory/Jams & Spreads"
                    >
                      Jams & spreads
                    </Link>
                  </li>
                  <li>
                    <Link
                      data-test-id="left-nav-link"
                      className="block py-1.5 px-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded transition-colors"
                      href="/category/Food & Drink/subcategory/Snacks"
                    >
                      Snacks
                    </Link>
                  </li>
                  <li>
                    <Link
                      data-test-id="left-nav-link"
                      className="block py-1.5 px-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded transition-colors"
                      href="/category/Food & Drink/subcategory/Food Baskets & Kits"
                    >
                      Food baskets & kits
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
        <hr className="my-4 border-t border-gray-200" />
      </div>
      <div
        data-test-id="filter-bar"
        className="px-4 py-2"
        style={{ height: "calc(100vh - 126px)", position: "sticky", top: "126px", overflowY: "auto" } as React.CSSProperties}
      >
        <div className="mb-4">
          <h2
            role="heading"
            aria-level={2}
            data-test-id="filter-bar-title"
            className="text-sm font-semibold text-gray-900 mb-2"
          >
            Filters
          </h2>
          <hr className="border-t border-gray-200" />
        </div>
        <div className="space-y-0">
          <FilterSection title="Product types" sectionKey="productTypes" testId="filter-section-impression-wrapper-Product types">
            <div
              role="list"
              aria-label="Product types"
              className="f_flex_base f_flex_single_value_direction"
              style={{ "--f_flex_direction_mobile": "column" } as React.CSSProperties}
            >
              <SearchInput category="TAXONOMY_TYPE" />
              <div className="space-y-1">
                <CheckboxItem label="Protein & Superfood Powder" category="taxonomy_type" value="Protein & Superfood Powder" id="checkbox-product-types-1" />
                <CheckboxItem label="Cocktail Mix & Syrup" category="taxonomy_type" value="Cocktail Mix & Syrup" id="checkbox-product-types-2" />
                <CheckboxItem label="Soda & Carbonated Drink" category="taxonomy_type" value="Soda & Carbonated Drink" id="checkbox-product-types-3" />
              </div>
              <button
                onClick={() => toggleShowMore("productTypes")}
                className="mt-2 text-sm text-gray-600 hover:text-black transition-colors"
              >
                {showMore["productTypes"] ? "Show less" : "Show more"}
              </button>
            </div>
          </FilterSection>

          <FilterSection title="Ships from" sectionKey="shipsFrom" testId="filter-section-impression-wrapper-Ships from">
            <div
              role="list"
              aria-label="Ships from"
              className="f_flex_base f_flex_single_value_direction"
              style={{ "--f_flex_direction_mobile": "column" } as React.CSSProperties}
            >
              <SearchInput category="LOCATION" />
              <div className="space-y-1">
                <CheckboxItem label="United States" category="location" value="usa" id="checkbox-ships-from-1" />
                <CheckboxItem label="European Union" category="location" value="european_union" id="checkbox-ships-from-2" />
                <CheckboxItem label="United Kingdom" category="location" value="gbr" id="checkbox-ships-from-3" />
              </div>
              <button
                onClick={() => toggleShowMore("shipsFrom")}
                className="mt-2 text-sm text-gray-600 hover:text-black transition-colors"
              >
                {showMore["shipsFrom"] ? "Show less" : "Show more"}
              </button>
            </div>
          </FilterSection>

          <FilterSection title="Brand values" sectionKey="brandValues" testId="filter-section-impression-wrapper-Brand values">
            <div
              role="list"
              aria-label="Brand values"
              className="f_flex_base f_flex_single_value_direction"
              style={{ "--f_flex_direction_mobile": "column" } as React.CSSProperties}
            >
              <div className="space-y-1">
                <CheckboxItem label="Asian owned" category="maker_value" value="asian_owned" id="checkbox-brand-values-1" />
                <CheckboxItem label="Black owned" category="maker_value" value="black_owned" id="checkbox-brand-values-2" />
                <CheckboxItem label="Eco-friendly" category="maker_value" value="eco_friendly" id="checkbox-brand-values-3" />
              </div>
              <button
                onClick={() => toggleShowMore("brandValues")}
                className="mt-2 text-sm text-gray-600 hover:text-black transition-colors"
              >
                {showMore["brandValues"] ? "Show less" : "Show more"}
              </button>
            </div>
          </FilterSection>

          <FilterSection title="Brands" sectionKey="brands" testId="filter-section-impression-wrapper-Brands">
            <div
              role="list"
              aria-label="Brands"
              className="f_flex_base f_flex_single_value_direction"
              style={{ "--f_flex_direction_mobile": "column" } as React.CSSProperties}
            >
              <SearchInput category="BRAND" />
              <div className="space-y-1">
                <CheckboxItem label="L&F Universal Goods" category="brand" value="b_ktcqb4hfg7" id="checkbox-brands-1" />
                <CheckboxItem label="Everyday Supply Co" category="brand" value="b_7xgwjjb7p6" id="checkbox-brands-2" />
                <CheckboxItem label="Hudson Meat Company" category="brand" value="b_fm4axeexgy" id="checkbox-brands-3" />
                {vendors.slice(0, showMore["brands"] ? vendors.length : 0).map((vendor, idx) => (
                  <CheckboxItem key={idx} label={vendor} category="brand" value={`vendor-${idx}`} id={`checkbox-brands-${idx + 4}`} />
                ))}
              </div>
              <button
                onClick={() => toggleShowMore("brands")}
                className="mt-2 text-sm text-gray-600 hover:text-black transition-colors"
              >
                {showMore["brands"] ? "Show less" : "Show more"}
              </button>
            </div>
          </FilterSection>

          <FilterSection title="Storage" sectionKey="storage" testId="filter-section-impression-wrapper-Storage">
            <div
              role="list"
              aria-label="Storage"
              className="f_flex_base f_flex_single_value_direction"
              style={{ "--f_flex_direction_mobile": "column" } as React.CSSProperties}
            >
              <div className="space-y-1">
                <CheckboxItem label="Shelf-stable" category="product_attribute" value="ta-storage:tv-storage-shelf-stable" id="checkbox-storage-1" />
                <CheckboxItem label="Refrigerate" category="product_attribute" value="ta-storage:tv-storage-refrigerate" id="checkbox-storage-2" />
                <CheckboxItem label="Freeze" category="product_attribute" value="ta-storage:tv-storage-freeze" id="checkbox-storage-3" />
              </div>
            </div>
          </FilterSection>

          <FilterSection title="Shelf life" sectionKey="shelfLife" testId="filter-section-impression-wrapper-Shelf life">
            <div
              role="list"
              aria-label="Shelf life"
              className="f_flex_base f_flex_single_value_direction"
              style={{ "--f_flex_direction_mobile": "column" } as React.CSSProperties}
            >
              <div className="space-y-1">
                <CheckboxItem label="Up to 2 weeks" category="product_attribute" value="ta-shelf-life:tv-shelf-life-up-to-2-weeks" id="checkbox-shelf-life-1" />
                <CheckboxItem label="1 month" category="product_attribute" value="ta-shelf-life:tv-shelf-life-1-month" id="checkbox-shelf-life-2" />
                <CheckboxItem label="1–3 months" category="product_attribute" value="ta-shelf-life:tv-shelf-life-1-3-months" id="checkbox-shelf-life-3" />
              </div>
              <button
                onClick={() => toggleShowMore("shelfLife")}
                className="mt-2 text-sm text-gray-600 hover:text-black transition-colors"
              >
                {showMore["shelfLife"] ? "Show less" : "Show more"}
              </button>
            </div>
          </FilterSection>

          <FilterSection title="Diet" sectionKey="diet" testId="filter-section-impression-wrapper-Diet">
            <div
              role="list"
              aria-label="Diet"
              className="f_flex_base f_flex_single_value_direction"
              style={{ "--f_flex_direction_mobile": "column" } as React.CSSProperties}
            >
              <div className="space-y-1">
                <CheckboxItem label="Gluten-free" category="product_attribute" value="ta-diet:tv-diet-gluten-free" id="checkbox-diet-1" />
                <CheckboxItem label="Vegan" category="product_attribute" value="ta-diet:tv-diet-vegan" id="checkbox-diet-2" />
                <CheckboxItem label="Dairy-free" category="product_attribute" value="ta-diet:tv-diet-dairy-free" id="checkbox-diet-3" />
              </div>
              <button
                onClick={() => toggleShowMore("diet")}
                className="mt-2 text-sm text-gray-600 hover:text-black transition-colors"
              >
                {showMore["diet"] ? "Show less" : "Show more"}
              </button>
            </div>
          </FilterSection>

          <FilterSection title="Production" sectionKey="production" testId="filter-section-impression-wrapper-Production">
            <div
              role="list"
              aria-label="Production"
              className="f_flex_base f_flex_single_value_direction"
              style={{ "--f_flex_direction_mobile": "column" } as React.CSSProperties}
            >
              <div className="space-y-1">
                <CheckboxItem label="No artificial sweeteners" category="product_attribute" value="ta-production:tv-production-no-artificial-sweeteners" id="checkbox-production-1" />
                <CheckboxItem label="No preservatives" category="product_attribute" value="ta-production:tv-production-no-preservatives" id="checkbox-production-2" />
                <CheckboxItem label="Non-GMO" category="product_attribute" value="ta-production:tv-production-non-gmo" id="checkbox-production-3" />
              </div>
              <button
                onClick={() => toggleShowMore("production")}
                className="mt-2 text-sm text-gray-600 hover:text-black transition-colors"
              >
                {showMore["production"] ? "Show less" : "Show more"}
              </button>
            </div>
          </FilterSection>

          <FilterSection title="Trending" sectionKey="trending" testId="filter-section-impression-wrapper-Trending">
            <div
              role="list"
              aria-label="Trending"
              className="f_flex_base f_flex_single_value_direction"
              style={{ "--f_flex_direction_mobile": "column" } as React.CSSProperties}
            >
              <div className="space-y-1">
                <RadioItem label="Trending" category="trending" value="is_trending" id="radio-trending-1" name="trending:is_trending" />
              </div>
            </div>
          </FilterSection>

          <FilterSection title="Made in" sectionKey="madeIn" testId="filter-section-impression-wrapper-Made in">
            <div
              role="list"
              aria-label="Made in"
              className="f_flex_base f_flex_single_value_direction"
              style={{ "--f_flex_direction_mobile": "column" } as React.CSSProperties}
            >
              <SearchInput category="MADE_IN" />
              <div className="space-y-1">
                <CheckboxItem label="United States" category="made_in" value="usa" id="checkbox-made-in-1" />
                <CheckboxItem label="European Union" category="made_in" value="european_union" id="checkbox-made-in-2" />
                <CheckboxItem label="United Kingdom" category="made_in" value="gbr" id="checkbox-made-in-3" />
              </div>
              <button
                onClick={() => toggleShowMore("madeIn")}
                className="mt-2 text-sm text-gray-600 hover:text-black transition-colors"
              >
                {showMore["madeIn"] ? "Show less" : "Show more"}
              </button>
            </div>
          </FilterSection>

          <FilterSection title="Ship window" sectionKey="shipWindow" testId="filter-section-impression-wrapper-Ship window">
            <div
              role="list"
              aria-label="Ship window"
              className="f_flex_base f_flex_single_value_direction"
              style={{ "--f_flex_direction_mobile": "column" } as React.CSSProperties}
            >
              <div className="space-y-1">
                <CheckboxItem label="Ships ASAP" category="delivery_window" value="asap" id="checkbox-ship-window-1" />
              </div>
              <p className="text-sm font-medium text-gray-900 mt-4 mb-2">
                Preorder by month
              </p>
              <div className="space-y-1">
                <CheckboxItem label="Dec 2025" category="delivery_window" value="2025-12" id="checkbox-preorder-1" />
                <CheckboxItem label="Jan 2026" category="delivery_window" value="2026-01" id="checkbox-preorder-2" />
              </div>
              <button
                onClick={() => toggleShowMore("preorder")}
                className="mt-2 text-sm text-gray-600 hover:text-black transition-colors"
              >
                {showMore["preorder"] ? "Show less" : "Show more"}
              </button>
            </div>
          </FilterSection>

          <FilterSection title="Lead time" sectionKey="leadTime" testId="filter-section-impression-wrapper-Lead time">
            <div
              role="list"
              aria-label="Lead time"
              className="f_flex_base f_flex_single_value_direction"
              style={{ "--f_flex_direction_mobile": "column" } as React.CSSProperties}
            >
              <div className="space-y-1">
                <RadioItem label="3 days or less" category="lead_time" value="three_or_less_days" id="radio-lead-time-1" name="lead_time:three_or_less_days" />
                <RadioItem label="6 days or less" category="lead_time" value="six_or_less_days" id="radio-lead-time-2" name="lead_time:six_or_less_days" />
                <RadioItem label="9 days or less" category="lead_time" value="nine_or_less_days" id="radio-lead-time-3" name="lead_time:nine_or_less_days" />
              </div>
              <button
                onClick={() => toggleShowMore("leadTime")}
                className="mt-2 text-sm text-gray-600 hover:text-black transition-colors"
              >
                {showMore["leadTime"] ? "Show less" : "Show more"}
              </button>
            </div>
          </FilterSection>

          <FilterSection title="Global trade item number" sectionKey="gtin" testId="filter-section-impression-wrapper-Global trade item number">
            <div
              role="list"
              aria-label="Global trade item number"
              className="f_flex_base f_flex_single_value_direction"
              style={{ "--f_flex_direction_mobile": "column" } as React.CSSProperties}
            >
              <div className="space-y-1">
                <CheckboxItem label="Includes GTIN" category="gtin" value="has_gtins" id="checkbox-gtin-1" />
              </div>
            </div>
          </FilterSection>

        </div>
      </div>
    </div>
  );
}
