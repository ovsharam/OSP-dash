"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/types";
import { useCart } from "@/contexts/CartContext";
import toast from "react-hot-toast";
import Link from "next/link";

interface ProductComparisonProps {
  products: Product[];
  onRemove: (productId: string) => void;
  onClose: () => void;
}

export default function ProductComparison({ products, onRemove, onClose }: ProductComparisonProps) {
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  if (products.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-white rounded-lg p-8 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
          <h2 className="text-2xl font-bold text-black mb-4">Compare Products</h2>
          <p className="text-gray-600 mb-6">Add at least 2 products to compare</p>
          <button
            onClick={onClose}
            className="w-full bg-black text-white py-2 rounded font-semibold hover:bg-gray-800"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = (product: Product) => {
    const quantity = quantities[product.id] || product.minOrderQuantity || 1;
    addToCart(product, quantity);
    toast.success("Added to cart");
  };

  const getValue = (product: Product, key: string) => {
    switch (key) {
      case "price":
        return `$${product.price.toFixed(2)}`;
      case "vendor":
        return product.vendor.name;
      case "rating":
        return product.vendor.rating ? `★ ${product.vendor.rating}` : "N/A";
      case "minOrder":
        return product.minOrderQuantity || "N/A";
      case "sample":
        return product.sampleAvailable ? "Yes" : "No";
      case "stock":
        return product.inStock ? "In Stock" : "Out of Stock";
      default:
        return "N/A";
    }
  };

  const comparisonFields = [
    { key: "price", label: "Price" },
    { key: "vendor", label: "Vendor" },
    { key: "rating", label: "Rating" },
    { key: "minOrder", label: "Min Order" },
    { key: "sample", label: "Sample Available" },
    { key: "stock", label: "Stock Status" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-lg max-w-7xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-black">Compare Products</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-black transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left p-4 border-b border-gray-200 font-semibold text-black">Feature</th>
                  {products.map((product) => (
                    <th key={product.id} className="text-center p-4 border-b border-gray-200 min-w-[200px]">
                      <div className="relative w-32 h-32 mx-auto mb-2 bg-gray-100 rounded overflow-hidden">
                        <Image
                          src={product.images[0] || "/placeholder-product.jpg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="128px"
                        />
                        <button
                          onClick={() => onRemove(product.id)}
                          className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md hover:bg-gray-50"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                      <Link
                        href={`/products/${product.id}`}
                        className="font-semibold text-black hover:underline text-sm"
                      >
                        {product.name}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFields.map((field) => (
                  <tr key={field.key} className="border-b border-gray-100">
                    <td className="p-4 font-medium text-gray-700">{field.label}</td>
                    {products.map((product) => (
                      <td key={product.id} className="p-4 text-center text-gray-900">
                        {getValue(product, field.key)}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td className="p-4 font-medium text-gray-700">Actions</td>
                  {products.map((product) => (
                    <td key={product.id} className="p-4 text-center">
                      <div className="space-y-2">
                        <input
                          type="number"
                          min={product.minOrderQuantity || 1}
                          value={quantities[product.id] || product.minOrderQuantity || 1}
                          onChange={(e) =>
                            setQuantities({
                              ...quantities,
                              [product.id]: Math.max(product.minOrderQuantity || 1, Number(e.target.value)),
                            })
                          }
                          className="w-20 text-center border border-gray-300 rounded px-2 py-1 text-black"
                        />
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="w-full bg-black text-white px-4 py-2 rounded text-sm font-semibold hover:bg-gray-800"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}


