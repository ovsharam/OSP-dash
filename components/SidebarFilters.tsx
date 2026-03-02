"use client";

import { useState } from "react";
import Link from "next/link";

interface SidebarFiltersProps {
  onFilterChange?: (filters: any) => void;
  vendors?: string[];
}

export default function SidebarFilters({ onFilterChange, vendors = [] }: SidebarFiltersProps) {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    categories: true,
    percentage: false,
    origin: false,
    dietary: false,
    brands: false,
  });

  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({});
  const [searchQueries, setSearchQueries] = useState<{ [key: string]: string }>({});

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
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
  }: {
    title: string;
    sectionKey: string;
    children: React.ReactNode;
  }) => {
    const isExpanded = expandedSections[sectionKey];
    return (
      <div className="border-b border-gray-100 last:border-b-0">
        <button
          onClick={() => toggleSection(sectionKey)}
          className="w-full flex items-center justify-between py-4 px-0 hover:opacity-70 transition-opacity group"
        >
          <p className="font-serif text-sm font-bold text-charcoal uppercase tracking-widest group-hover:text-primary transition-colors">
            {title}
          </p>
          <svg
            className={`w-3 h-3 text-gray-400 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isExpanded && <div className="pb-6 animate-in fade-in slide-in-from-top-1 duration-300">{children}</div>}
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
      className="flex items-center py-1.5 cursor-pointer group"
    >
      <div className="relative flex items-center">
        <input
          type="checkbox"
          id={id}
          checked={isChecked(category, value)}
          onChange={() => toggleFilter(category, value)}
          className="peer appearance-none w-4 h-4 border border-gray-300 rounded-sm checked:bg-primary checked:border-primary transition-all cursor-pointer"
        />
        <svg
          className="absolute w-3 h-3 text-cream pointer-events-none hidden peer-checked:block left-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <span className="ml-3 text-xs text-gray-600 group-hover:text-primary transition-colors font-sans uppercase tracking-wider">
        {label}
      </span>
    </label>
  );

  return (
    <div className="w-full bg-transparent">
      <div className="space-y-2">
        {/* Main Categories Navigation */}
        <nav className="mb-8">
          <ul className="space-y-4">
            <li>
              <Link href="/browse?category=Shop by Brand" className="flex items-center justify-between group">
                <span className="font-serif text-lg text-charcoal group-hover:text-primary transition-colors italic">Shop by Brand</span>
                <span className="text-[10px] text-gray-400 font-bold tracking-widest">120+</span>
              </Link>
            </li>
            <li>
              <Link href="/browse?category=Shop by Origin" className="flex items-center justify-between group">
                <span className="font-serif text-lg text-charcoal group-hover:text-primary transition-colors italic">Shop by Origin</span>
                <span className="text-[10px] text-gray-400 font-bold tracking-widest">85+</span>
              </Link>
            </li>
            <li>
              <Link href="/browse?category=Gourmet Baking" className="flex items-center justify-between group">
                <span className="font-serif text-lg text-charcoal group-hover:text-primary transition-colors italic">Gourmet Baking</span>
                <span className="text-[10px] text-gray-400 font-bold tracking-widest">45+</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="h-px bg-gray-100 my-8"></div>

        {/* Filters */}
        <FilterSection title="Cocoa Percentage" sectionKey="percentage">
          <div className="space-y-1">
            <CheckboxItem label="100% Pure Cocoa" category="percentage" value="100" id="perc-100" />
            <CheckboxItem label="85% - 99% Extra Dark" category="percentage" value="85-99" id="perc-85" />
            <CheckboxItem label="70% - 84% Dark" category="percentage" value="70-84" id="perc-70" />
            <CheckboxItem label="50% - 69% Semi-Dark" category="percentage" value="50-69" id="perc-50" />
            <CheckboxItem label="Milk Chocolate" category="percentage" value="milk" id="perc-milk" />
          </div>
        </FilterSection>

        <FilterSection title="Origin" sectionKey="origin">
          <div className="space-y-1">
            <CheckboxItem label="Madagascar" category="origin" value="madagascar" id="orig-mad" />
            <CheckboxItem label="Ecuador" category="origin" value="ecuador" id="orig-ecu" />
            <CheckboxItem label="Venezuela" category="origin" value="venezuela" id="orig-ven" />
            <CheckboxItem label="Peru" category="origin" value="peru" id="orig-peru" />
            <CheckboxItem label="Dominican Republic" category="origin" value="dr" id="orig-dr" />
          </div>
        </FilterSection>

        <FilterSection title="Dietary & Values" sectionKey="dietary">
          <div className="space-y-1">
            <CheckboxItem label="Vegan" category="diet" value="vegan" id="diet-vegan" />
            <CheckboxItem label="Organic" category="diet" value="organic" id="diet-organic" />
            <CheckboxItem label="Sugar-Free" category="diet" value="sugar_free" id="diet-sf" />
            <CheckboxItem label="Fair Trade" category="diet" value="fair_trade" id="diet-ft" />
            <CheckboxItem label="Single Estate" category="diet" value="single_estate" id="diet-se" />
          </div>
        </FilterSection>

        <FilterSection title="Featured Brands" sectionKey="brands">
          <div className="space-y-1">
            <CheckboxItem label="Valrhona" category="brand" value="valrhona" id="brand-val" />
            <CheckboxItem label="Callebaut" category="brand" value="callebaut" id="brand-cal" />
            <CheckboxItem label="KESSHŌ" category="brand" value="kessho" id="brand-kes" />
            <CheckboxItem label="Crow & Moss" category="brand" value="crowmoss" id="brand-cm" />
          </div>
        </FilterSection>
      </div>
    </div>
  );
}
