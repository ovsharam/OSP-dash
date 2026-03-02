"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { mockVendors } from "@/lib/mockData";

export default function SidebarFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Expanded state
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    brand: true,
    origin: true,
    percentage: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    const currentValues = params.get(key)?.split(",") || [];

    if (currentValues.includes(value)) {
      // Remove it
      const newValues = currentValues.filter((v) => v !== value);
      if (newValues.length > 0) {
        params.set(key, newValues.join(","));
      } else {
        params.delete(key);
      }
    } else {
      // Add it
      currentValues.push(value);
      params.set(key, currentValues.join(","));
    }

    router.push(`/browse?${params.toString()}`, { scroll: false });
  };

  const isChecked = (key: string, value: string) => {
    return searchParams?.get(key)?.split(",").includes(value) || false;
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
      <div className="border-b border-[#333]/10 pb-4 mb-4">
        <button
          onClick={() => toggleSection(sectionKey)}
          className="w-full flex items-center justify-between py-2 px-0 group"
        >
          <span className="font-serif text-[15px] font-bold text-[#333] tracking-wide group-hover:text-[#5c0f0f] transition-colors">
            {title}
          </span>
          <svg
            className={`w-4 h-4 text-[#333]/40 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isExpanded && <div className="mt-3 space-y-2 animate-in fade-in duration-300">{children}</div>}
      </div>
    );
  };

  const CheckboxItem = ({ label, category, value }: { label: string; category: string; value: string }) => (
    <label className="flex items-start cursor-pointer group py-1">
      <div className="relative flex items-center mt-0.5">
        <input
          type="checkbox"
          checked={isChecked(category, value)}
          onChange={() => handleFilterChange(category, value)}
          className="peer appearance-none w-[18px] h-[18px] border-2 border-[#333]/20 rounded-sm checked:bg-[#5c0f0f] checked:border-[#5c0f0f] transition-all cursor-pointer"
        />
        <svg
          className="absolute w-3.5 h-3.5 text-white pointer-events-none hidden peer-checked:block left-[2px]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <span className="ml-3 text-[14px] text-[#333]/80 group-hover:text-[#5c0f0f] transition-colors leading-tight">
        {label}
      </span>
    </label>
  );

  return (
    <div className="w-full">
      <FilterSection title="Brands" sectionKey="brand">
        {Object.values(mockVendors).map(v => (
          <CheckboxItem key={v.id} label={v.name} category="brand" value={v.name} />
        ))}
      </FilterSection>

      <FilterSection title="Origin" sectionKey="origin">
        <CheckboxItem label="Madagascar" category="origin" value="Madagascar" />
        <CheckboxItem label="Ecuador" category="origin" value="Ecuador" />
        <CheckboxItem label="Venezuela" category="origin" value="Venezuela" />
        <CheckboxItem label="Peru" category="origin" value="Peru" />
        <CheckboxItem label="Tanzania" category="origin" value="Tanzania" />
        <CheckboxItem label="Belize" category="origin" value="Belize" />
        <CheckboxItem label="Brazil" category="origin" value="Brazil" />
      </FilterSection>

      <FilterSection title="Categories" sectionKey="category">
        <CheckboxItem label="Dark Chocolate Bars" category="category" value="Dark Chocolate Bars" />
        <CheckboxItem label="Milk Chocolate Bars" category="category" value="Milk Chocolate Bars" />
        <CheckboxItem label="White & Blonde" category="category" value="White & Blonde" />
        <CheckboxItem label="Couverture & Baking" category="category" value="Couverture & Baking" />
        <CheckboxItem label="Gift Collections" category="category" value="Gift Collections" />
        <CheckboxItem label="Truffles & Bonbons" category="category" value="Truffles & Bonbons" />
      </FilterSection>

      <div className="pt-4">
        <CheckboxItem label="Samples Available" category="sampleAvailable" value="true" />
      </div>
    </div>
  );
}
