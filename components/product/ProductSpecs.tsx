import { Product } from '@/types';

interface ProductSpecsProps {
    product: Product;
}

const ProductSpecs = ({ product }: ProductSpecsProps) => {
    // Generate specs list dynamically
    const specs = [
        { label: "Vendor", value: product.vendor.name },
        { label: "Minimum Order", value: `${product.minOrderQuantity || 1} Units` },
        { label: "Category", value: product.category },
    ];

    if (product.dimensions) {
        specs.push({ label: "Length", value: `${product.dimensions.length} inches` });
        specs.push({ label: "Width", value: `${product.dimensions.width} inches` });
        specs.push({ label: "Height", value: `${product.dimensions.height} inches` });
        specs.push({ label: "Weight", value: `${product.dimensions.weight} lbs` });
    }

    if (product.sampleAvailable) {
        specs.push({ label: "Sample Available", value: "Yes" });
    }

    return (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <h2 className="text-xl font-bold text-gray-900 p-6 border-b border-gray-200 bg-gray-50">Specs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2">
                {specs.map((spec, i) => (
                    <div key={i} className={`flex justify-between p-4 border-b border-gray-100 ${i % 2 === 0 ? 'md:border-r' : ''} hover:bg-gray-50 transition-colors`}>
                        <span className="font-semibold text-gray-700">{spec.label}</span>
                        <span className="text-gray-600">{spec.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductSpecs;
