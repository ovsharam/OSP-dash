import { Product } from '@/types';

interface ProductDetailsProps {
    product: Product;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 bg-white border border-gray-200 rounded-lg">
            {/* Main Description */}
            <div className="md:col-span-2 space-y-6">
                <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2">Product Overview</h2>
                <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {product.description}
                </div>

                {product.offers && product.offers.length > 0 && (
                    <div className="mt-8">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Special Offers</h3>
                        <ul className="space-y-2">
                            {product.offers.map(offer => (
                                <li key={offer.id} className="bg-green-50 text-green-800 p-3 rounded text-sm border border-green-100">
                                    <span className="font-bold">{offer.name}:</span> {offer.description}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Features Sidebar */}
            <div className="bg-gray-50 p-6 rounded border border-gray-100 h-fit">
                <h3 className="font-bold text-gray-900 mb-4 uppercase text-sm tracking-wide">Key Features</h3>
                <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                        <span className="block mt-1.5 w-1.5 h-1.5 rounded-full bg-[#008060] shrink-0" />
                        <span>Vendor: {product.vendor.name}</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="block mt-1.5 w-1.5 h-1.5 rounded-full bg-[#008060] shrink-0" />
                        <span>Category: {product.category}</span>
                    </li>
                    {product.tags && product.tags.slice(0, 5).map((tag, i) => (
                        <li key={i} className="flex items-start gap-2">
                            <span className="block mt-1.5 w-1.5 h-1.5 rounded-full bg-[#008060] shrink-0" />
                            <span className="capitalize">{tag.replace(/-/g, ' ')}</span>
                        </li>
                    ))}
                    {product.minOrderQuantity && (
                        <li className="flex items-start gap-2">
                            <span className="block mt-1.5 w-1.5 h-1.5 rounded-full bg-[#008060] shrink-0" />
                            <span>Min Order: {product.minOrderQuantity} units</span>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default ProductDetails;
