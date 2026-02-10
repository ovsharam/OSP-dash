"use client";
import { useState, useEffect } from 'react';
import { Product } from '@/types';

interface StickyProductHeaderProps {
    product: Product;
    onAddToCart: () => void;
}

const StickyProductHeader = ({ product, onAddToCart }: StickyProductHeaderProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 600) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-[60] transform transition-transform duration-300 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
                <div className="flex flex-col overflow-hidden mr-4">
                    <h2 className="font-bold text-gray-900 truncate text-sm sm:text-base">{product.name}</h2>
                    <div className="text-xs text-gray-500">Item #: {product.handle || product.id.substring(0, 8)}</div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right hidden sm:block">
                        <div className="font-bold text-lg text-[#d32323]">${product.price.toFixed(2)}</div>
                    </div>
                    <button
                        onClick={onAddToCart}
                        disabled={!product.inStock}
                        className="bg-[#d32323] hover:bg-[#b91c1c] text-white font-bold py-2 px-4 rounded transition-colors text-sm"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StickyProductHeader;
