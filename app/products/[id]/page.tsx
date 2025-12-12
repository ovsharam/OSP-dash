"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { getProductById } from "@/lib/mockData";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { ShippingOption } from "@/types";
import ProductReviews from "@/components/ProductReviews";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const product = getProductById(params.id as string);

  const minimumOrder = product?.minOrderQuantity ?? (product?.category === "Beverages" ? 24 : 1);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(minimumOrder);
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption | undefined>(
    product?.shippingOptions[0]
  );

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">Product Not Found</h1>
          <button
            onClick={() => router.push("/browse")}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
          >
            Back to Browse
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedShipping);
    router.push("/cart");
  };

  const handleRequestSample = () => {
    if (!isAuthenticated || !user?.contractSigned) {
      router.push("/sample-request");
    } else {
      // Handle sample request for authenticated users
      alert("Sample request submitted! You will receive a confirmation email shortly.");
    }
  };

  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-black mb-6 transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>Back</span>
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="min-w-0">
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
              <Image
                src={product.images[selectedImageIndex] || "/placeholder-product.jpg"}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative aspect-square bg-gray-100 rounded overflow-hidden border-2 ${
                      selectedImageIndex === index ? "border-black" : "border-transparent"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 25vw, 12.5vw"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col w-full">
            {/* Product Header */}
            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-2">{product.vendor.name}</p>
              <h1 className="text-3xl font-bold text-black mb-4 leading-tight break-words">{product.name}</h1>
              <div className="flex items-center flex-wrap gap-3">
                <span className="text-3xl font-bold text-black">${product.price.toFixed(2)}</span>
                {product.compareAtPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      ${product.compareAtPrice.toFixed(2)}
                    </span>
                    <span className="bg-black text-white px-2 py-1 text-sm font-semibold whitespace-nowrap">
                      {discount}% OFF
                    </span>
                  </>
                )}
                <div className="text-sm whitespace-nowrap">
                  <span className={product.inStock ? "text-green-600" : "text-red-600"}>
                    {product.inStock ? "✓ In Stock" : "✗ Out of Stock"}
                  </span>
                </div>
              </div>
            </div>

            {/* Deals */}
            {product.deals && product.deals.length > 0 && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-black mb-2">Available Deals</h3>
                <div className="space-y-1">
                  {product.deals.map((deal) => (
                    <div key={deal.id} className="text-sm text-gray-700 break-words leading-normal">
                      <span className="font-semibold">{deal.name}:</span> {deal.discount}% off
                      {deal.minQuantity && ` (min. ${deal.minQuantity} units)`}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="mb-6">
              <h2 className="font-semibold text-black mb-2">Description</h2>
              <p className="text-gray-700 leading-relaxed break-words">{product.description}</p>
            </div>

            {/* Dimensions */}
            {product.dimensions && (
              <div className="mb-6" style={{ marginTop: '-2.5rem' }}>
                <h2 className="font-semibold text-black mb-2">Dimensions</h2>
                <div className="text-sm text-gray-700 space-y-1">
                  <p className="leading-normal">Length: {product.dimensions.length}"</p>
                  <p className="leading-normal">Width: {product.dimensions.width}"</p>
                  <p className="leading-normal">Height: {product.dimensions.height}"</p>
                  <p className="leading-normal">Weight: {product.dimensions.weight} lbs</p>
                </div>
              </div>
            )}

            {/* Shipping Options */}
            {product.shippingOptions && product.shippingOptions.length > 0 && (
              <div className="mb-6" style={{ marginTop: '1.4rem' }}>
                <h2 className="font-semibold text-black mb-2">Shipping Options</h2>
                <div className="space-y-2">
                  {product.shippingOptions.map((option) => (
                    <label
                      key={option.id}
                      className="flex items-start p-3 border border-gray-200 rounded cursor-pointer hover:bg-gray-50"
                    >
                      <input
                        type="radio"
                        name="shipping"
                        value={option.id}
                        checked={selectedShipping?.id === option.id}
                        onChange={() => setSelectedShipping(option)}
                        className="mr-3 mt-1 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-black break-words leading-normal">{option.name}</div>
                        <div className="text-sm text-gray-500 leading-normal mt-1">
                          ${option.price.toFixed(2)} • {option.estimatedDays} days
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mb-6" style={{ marginTop: '4.5rem' }}>
              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="w-full bg-black text-white py-3 rounded font-semibold hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </button>
                {product.sampleAvailable && (
                  <button
                    onClick={handleRequestSample}
                    className="w-full bg-white border-2 border-black text-black py-3 rounded font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Request Sample
                  </button>
                )}
              </div>
            </div>

            {/* Offers */}
            {product.offers && product.offers.length > 0 && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-black mb-2">Special Offers</h3>
                <div className="space-y-1">
                  {product.offers.map((offer) => (
                    <div key={offer.id} className="text-sm text-gray-700 break-words leading-normal">
                      <span className="font-semibold">{offer.name}:</span> {offer.description}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <label className="block font-semibold text-black mb-2 leading-normal">
                Quantity{product.minOrderQuantity && ` (Min: ${product.minOrderQuantity})`}
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(minimumOrder, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 flex-shrink-0"
                  type="button"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(minimumOrder, Number(e.target.value)))
                  }
                  min={minimumOrder}
                  className="w-20 text-center border border-gray-300 rounded py-2 text-black"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 flex-shrink-0"
                  type="button"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Reviews Section */}
        <ProductReviews productId={product.id} />
      </div>
    </div>
  );
}

