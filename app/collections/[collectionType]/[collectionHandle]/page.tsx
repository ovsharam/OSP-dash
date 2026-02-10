import { Metadata } from "next";
import { getCategoryByHandle, getProductsByCategory, getProductUrl } from "@/lib/mockData";
import CollectionClient from "@/components/CollectionClient";
import Link from "next/link";
import { redirect } from "next/navigation";

interface Props {
    params: Promise<{ collectionType: string; collectionHandle: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { collectionType, collectionHandle } = await params;

    // For now, we map the collectionType back to our primary categories
    const category = getCategoryByHandle(collectionType);

    if (!category) {
        return {
            title: "Collection Not Found",
        };
    }

    const title = `Wholesale ${category} | OSP Marketplace`;
    const description = `Shop our curated selection of wholesale ${category}. Best prices for B2B hospitality supplies, eco-friendly and organic options available.`;
    const url = `https://organicsodapops.com/collections/${collectionType}/${collectionHandle}`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url,
            type: "website",
        },
        alternates: {
            canonical: url,
        },
    };
}

export default async function NestedCollectionPage({ params }: Props) {
    const { collectionType, collectionHandle } = await params;
    const category = getCategoryByHandle(collectionType);

    if (!category) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-black mb-4">Collection Not Found</h1>
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

    const products = getProductsByCategory(category);

    const itemListJsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": category,
        "description": `Wholesale ${category} collection`,
        "url": `https://organicsodapops.com/collections/${collectionType}/${collectionHandle}`,
        "itemListElement": products.map((product, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "url": `https://organicsodapops.com${getProductUrl(product)}`
        }))
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
                "name": category,
                "item": `https://organicsodapops.com/collections/${collectionType}`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": collectionHandle.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
                "item": `https://organicsodapops.com/collections/${collectionType}/${collectionHandle}`
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <CollectionClient category={category} categoryHandle={collectionHandle} products={products} />
        </>
    );
}
