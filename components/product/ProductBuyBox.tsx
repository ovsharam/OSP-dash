"use client";
import { useState } from 'react';
import { Product, ShippingOption } from '@/types';
import ProductShippingQuote from '@/components/ProductShippingQuote';

interface ProductBuyBoxProps {
    product: Product;
    quantity: number;
    setQuantity: (val: number) => void;
    onAddToCart: () => void;
    handleFreightQuoteSelected: (quote: any) => void;
}

const ProductBuyBox = ({ product, quantity, setQuantity, onAddToCart, handleFreightQuoteSelected }: ProductBuyBoxProps) => {

    const minimumOrder = product?.minOrderQuantity ?? (product?.category === "Beverages" ? 24 : 1);
    const discount = product.compareAtPrice
        ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
        : 0;

    return (
        <div className="bg-white p-6 border border-gray-200 rounded shadow-sm sticky top-24">
            <h1 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
                {product.name}
            </h1>
            <div className="text-sm text-gray-500 mb-4">
                Item #: <span className="font-mono text-gray-700">{product.handle || product.id.substring(0, 8)}</span>
            </div>

            {/* Price Loading */}
            <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-sm text-gray-600 font-medium">Your Price:</span>
                    <span className="text-3xl font-bold text-[#d32323]">${product.price.toFixed(2)}</span>
                </div>
                {product.compareAtPrice && (
                    <div className="text-sm text-gray-500 line-through">
                        Reg. ${product.compareAtPrice.toFixed(2)}
                    </div>
                )}
            </div>

            {/* Availability */}
            <div className="mb-6 flex items-center gap-2">
                {product.inStock ? (
                    <span className="text-[#008060] font-bold flex items-center gap-1">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        In Stock & Ready to Ship
                    </span>
                ) : (
                    <span className="text-[#d32323] font-bold">Out of Stock</span>
                )}
            </div>

            {/* Add to Cart Area */}
            <div className="flex gap-4 mb-4">
                <div className="w-24">
                    <label htmlFor="qty" className="sr-only">Quantity</label>
                    <input
                        type="number"
                        id="qty"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(minimumOrder, parseInt(e.target.value) || minimumOrder))}
                        min={minimumOrder}
                        className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-[#008060] focus:border-[#008060] text-center h-12 font-bold text-lg"
                    />
                </div>
                <button
                    onClick={onAddToCart}
                    disabled={!product.inStock}
                    className="flex-1 bg-[#d32323] hover:bg-[#b91c1c] text-white font-bold py-3 px-6 rounded transition-colors text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                </button>
            </div>

            {/* Shipping Calculator */}
            <div className="mt-6 pt-6 border-t border-gray-100">
                <ProductShippingQuote
                    product={product}
                    quantity={quantity}
                    onQuoteSelected={handleFreightQuoteSelected}
                />
            </div>

        </div>
    );
};

export default ProductBuyBox;
