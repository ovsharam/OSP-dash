"use client";
import { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
    images: string[];
    name: string;
}

const ProductGallery = ({ images, name }: ProductGalleryProps) => {
    const [activeImage, setActiveImage] = useState(0);

    if (!images || images.length === 0) return null;

    return (
        <div className="flex gap-4">
            {/* Main Image */}
            <div className="flex-1 relative aspect-square md:aspect-[4/3] bg-white border border-gray-200 rounded-lg overflow-hidden">
                <Image
                    src={images[activeImage]}
                    alt={name}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                />
            </div>

            {/* Thumbnails Column (Right side as per Webstaurant) */}
            {images.length > 1 && (
                <div className="flex flex-col gap-2 w-20 shrink-0">
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            className={`relative aspect-square w-full rounded overflow-hidden bg-white hover:border-[#008060] transition-all border-2 ${activeImage === idx ? 'border-[#008060]' : 'border-gray-200'}`}
                            onMouseEnter={() => setActiveImage(idx)}
                            onClick={() => setActiveImage(idx)}
                        >
                            <Image
                                src={img}
                                alt={`${name} thumbnail ${idx + 1}`}
                                fill
                                className="object-cover"
                                sizes="80px"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductGallery;
