"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/types";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContextNew";
import { useWishlist } from "@/contexts/WishlistContext";
import toast from "react-hot-toast";
import Link from "next/link";
import { getProductUrl } from "@/lib/mockData";

interface QuickViewModalProps {
    product: Product;
    onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const { isAuthenticated } = useAuth();
    const [quantity, setQuantity] = useState(product.minOrderQuantity || 1);
    const [selectedImage, setSelectedImage] = useState(0);

    const images = product.images.length > 0 ? product.images : ["/placeholder-product.jpg"];
    const inWishlist = isInWishlist(product.id);

    const handleAddToCart = () => {
        addToCart(product, quantity);
        toast.success("Added to cart");
        onClose();
    };

    const toggleWishlist = () => {
        if (inWishlist) {
            removeFromWishlist(product.id);
            toast.success("Removed from wishlist");
        } else {
            addToWishlist(product);
            toast.success("Added to wishlist");
        }
    };

    const incrementQty = () => setQuantity(q => q + 1);
    const decrementQty = () => {
        const min = product.minOrderQuantity || 1;
        if (quantity > min) setQuantity(q => q - 1);
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
                    <div className="absolute top-0 right-0 pt-4 pr-4">
                        <button
                            type="button"
                            className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={onClose}
                        >
                            <span className="sr-only">Close</span>
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Image Gallery */}
                                <div className="space-y-4">
                                    <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden">
                                        <div className="relative w-full h-96">
                                            <Image
                                                src={images[selectedImage]}
                                                alt={product.name}
                                                fill
                                                className="object-cover object-center"
                                            />
                                        </div>
                                    </div>
                                    {images.length > 1 && (
                                        <div className="grid grid-cols-4 gap-2">
                                            {images.map((img, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => setSelectedImage(idx)}
                                                    className={`relative h-20 bg-gray-100 rounded-lg overflow-hidden ${selectedImage === idx ? 'ring-2 ring-black' : ''}`}
                                                >
                                                    <Image src={img} alt="" fill className="object-cover" />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Product Info */}
                                <div className="flex flex-col h-full">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
                                    <p className="text-sm text-gray-500 mb-4">By {product.vendor.name}</p>

                                    <div className="flex items-baseline mb-4">
                                        <p className="text-2xl font-bold text-gray-900">
                                            ${product.price.toFixed(2)}
                                        </p>
                                        {product.compareAtPrice && (
                                            <p className="ml-2 text-sm text-gray-500 line-through">
                                                ${product.compareAtPrice.toFixed(2)}
                                            </p>
                                        )}
                                    </div>

                                    <div className="prose prose-sm text-gray-500 mb-6">
                                        <p>{product.description}</p>
                                    </div>

                                    <div className="mt-auto space-y-4">
                                        {/* Quantity */}
                                        <div className="flex items-center space-x-4">
                                            <label htmlFor="quantity" className="text-sm font-medium text-gray-700">Quantity</label>
                                            <div className="flex items-center border border-gray-300 rounded-md">
                                                <button onClick={decrementQty} className="p-2 hover:bg-gray-50 text-gray-600">-</button>
                                                <span className="w-12 text-center text-gray-900">{quantity}</span>
                                                <button onClick={incrementQty} className="p-2 hover:bg-gray-50 text-gray-600">+</button>
                                            </div>
                                            {product.minOrderQuantity && (
                                                <span className="text-xs text-gray-500">Min. order: {product.minOrderQuantity}</span>
                                            )}
                                        </div>

                                        {/* Actions */}
                                        <div className="flex space-x-4">
                                            <button
                                                onClick={handleAddToCart}
                                                disabled={!product.inStock}
                                                className={`flex-1 bg-black text-white py-3 px-6 rounded-md font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${!product.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            >
                                                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                                            </button>
                                            <button
                                                onClick={toggleWishlist}
                                                className={`p-3 rounded-md border ${inWishlist ? 'border-red-500 text-red-500 bg-red-50' : 'border-gray-300 text-gray-400 hover:text-gray-500'}`}
                                            >
                                                <svg className="h-6 w-6" fill={inWishlist ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                </svg>
                                            </button>
                                        </div>

                                        <div className="text-center">
                                            <Link
                                                href={getProductUrl(product)}
                                                className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
                                            >
                                                View Full Details →
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
