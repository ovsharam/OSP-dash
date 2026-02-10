import { Metadata } from "next";
import { getProductByHandle, getProductUrl } from "@/lib/mockData";
import ProductDetailClient from "@/components/ProductDetailClient";
import Link from "next/link";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const product = getProductByHandle(handle);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  const title = `${product.name} | OSP Marketplace`;
  const description = product.description;
  const url = `https://organicsodapops.com/products/${handle}`;
  const imageUrl = product.images[0] || "https://organicsodapops.com/og-image.jpg";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "OSP Marketplace",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const product = getProductByHandle(handle);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">Product Not Found</h1>
          <Link
            href="/browse"
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
          >
            Back to Browse
          </Link>
        </div>
      </div>
    );
  }

  const productUrl = `https://organicsodapops.com/products/${handle}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.images,
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": product.vendor.name
    },
    "offers": {
      "@type": "Offer",
      "url": productUrl,
      "priceCurrency": "USD",
      "price": product.price,
      "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "priceValidUntil": "2026-12-31"
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://organicsodapops.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Products",
        "item": "https://organicsodapops.com/browse"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.name,
        "item": productUrl
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProductDetailClient product={product} />
    </>
  );
}
