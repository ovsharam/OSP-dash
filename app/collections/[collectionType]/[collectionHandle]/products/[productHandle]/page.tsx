import { Metadata } from "next";
import { getProductByHandle, getProductUrl, getCategoryMapping } from "@/lib/mockData";
import ProductDetailClient from "@/components/ProductDetailClient";
import Link from "next/link";

interface Props {
    params: Promise<{
        collectionType: string;
        collectionHandle: string;
        productHandle: string;
    }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { productHandle } = await params;
    const product = getProductByHandle(productHandle);

    if (!product) {
        return {
            title: "Product Not Found",
        };
    }

    const title = `${product.name} | OSP Marketplace`;
    const description = product.description;
    const url = `https://organicsodapops.com${getProductUrl(product)}`;
    const canonicalUrl = `https://organicsodapops.com/products/${productHandle}`; // Canonical points to flat URL
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
            canonical: canonicalUrl,
        },
    };
}

export default async function ProductDetailPage({ params }: Props) {
    const { productHandle, collectionType, collectionHandle } = await params;
    const product = getProductByHandle(productHandle);

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

    const productUrl = `https://organicsodapops.com${getProductUrl(product)}`;

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
                "name": product.category,
                "item": `https://organicsodapops.com/collections/${collectionType}`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": collectionHandle.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
                "item": `https://organicsodapops.com/collections/${collectionType}/${collectionHandle}`
            },
            {
                "@type": "ListItem",
                "position": 4,
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
