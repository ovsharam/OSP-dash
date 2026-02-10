import { redirect } from "next/navigation";
import { getCategoryByHandle, getCategoryMapping, getProductsByCategory } from "@/lib/mockData";
import CollectionClient from "@/components/CollectionClient";

interface Props {
    params: Promise<{ collectionType: string }>;
}

export default async function CollectionRedirectPage({ params }: Props) {
    const { collectionType } = await params;
    const category = getCategoryByHandle(collectionType);

    if (category) {
        const { type, handle: catHandle } = getCategoryMapping(category);
        if (collectionType === type || collectionType === category.toLowerCase().replace(/[^a-z0-9]+/g, '-')) {
            redirect(`/collections/${type}/${catHandle}`);
        }
    }

    const products = category ? getProductsByCategory(category) : [];

    if (!category) {
        redirect("/browse");
    }

    return <CollectionClient category={category} categoryHandle={collectionType} products={products} />;
}
