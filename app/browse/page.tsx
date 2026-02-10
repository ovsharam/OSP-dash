import { Metadata } from "next";
import { Suspense } from "react";
import BrowseClient from "@/components/BrowseClient";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  // ... existing metadata
  title: "Browse Wholesale Organic Sodas & Supplies | OSP Marketplace",
  description: "Discover a curated selection of wholesale organic sodas, soda equipment, and sustainable tableware for your business. Best prices for B2B hospitality supplies.",
  alternates: {
    canonical: "https://organicsodapops.com/browse",
  },
  openGraph: {
    title: "Browse Wholesale Organic Sodas & Supplies | OSP Marketplace",
    description: "Discover a curated selection of wholesale organic sodas, soda equipment, and sustainable tableware for your business.",
    url: "https://organicsodapops.com/browse",
  },
};

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BrowsePage({ searchParams }: Props) {
  const params = await searchParams;
  const category = params.category;

  if (typeof category === "string") {
    const handle = category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    redirect(`/collections/${handle}`);
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>}>
      <BrowseClient />
    </Suspense>
  );
}
