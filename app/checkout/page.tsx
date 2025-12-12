"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Address, PaymentMethod } from "@/types";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && items.length === 0) {
      router.push("/cart");
    }
  }, [mounted, items.length, router]);

  const [shippingAddress, setShippingAddress] = useState<Address>({
    street: user?.address?.street || "",
    city: user?.address?.city || "",
    state: user?.address?.state || "",
    zipCode: user?.address?.zipCode || "",
    country: user?.address?.country || "United States",
  });

  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [billingAddress, setBillingAddress] = useState<Address>({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
    type: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!mounted) {
    return null;
  }

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = items.reduce(
    (sum, item) => sum + (item.selectedShipping?.price || 0),
    0
  );
  const tax = (subtotal + shipping) * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const firstItem = items[0];
  const minOrderThreshold =
    (firstItem?.product.minOrderQuantity || 0) * (firstItem?.product.price || 0) || 135;
  const progressPct =
    minOrderThreshold > 0 ? Math.min(100, Math.round((subtotal / minOrderThreshold) * 100)) : 0;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!shippingAddress.street) newErrors.shippingStreet = "Street address is required";
    if (!shippingAddress.city) newErrors.shippingCity = "City is required";
    if (!shippingAddress.state) newErrors.shippingState = "State is required";
    if (!shippingAddress.zipCode) newErrors.shippingZip = "ZIP code is required";

    if (!billingSameAsShipping) {
      if (!billingAddress.street) newErrors.billingStreet = "Street address is required";
      if (!billingAddress.city) newErrors.billingCity = "City is required";
      if (!billingAddress.state) newErrors.billingState = "State is required";
      if (!billingAddress.zipCode) newErrors.billingZip = "ZIP code is required";
    }

    if (paymentMethod.type === "card") {
      if (!paymentMethod.cardNumber) newErrors.cardNumber = "Card number is required";
      if (!paymentMethod.expiryDate) newErrors.expiryDate = "Expiry date is required";
      if (!paymentMethod.cvv) newErrors.cvv = "CVV is required";
      if (!paymentMethod.nameOnCard) newErrors.nameOnCard = "Name on card is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // In a real app, this would process the payment
      alert("Order placed successfully! You will receive a confirmation email shortly.");
      clearCart();
      router.push("/order-confirmation");
    }
  };

  // If cart is empty, route back to cart
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-semibold text-black">Your cart is empty</h1>
          <button
            onClick={() => router.push("/browse")}
            className="inline-flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            Continue shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-3xl font-bold text-black">Carts</h1>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex-1 md:w-96">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products or brands"
                  className="w-full border border-gray-200 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
                <svg
                  className="w-5 h-5 text-gray-500 absolute right-3 top-2.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                </svg>
              </div>
            </div>
            <button className="px-4 py-2 border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Select carts
            </button>
          </div>
        </div>

        {/* Cart Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex-1 min-w-0 space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="font-semibold text-black">{firstItem?.product.vendor.name || "Vendor"}</span>
              <span className="text-gray-500">${subtotal.toFixed(2)}</span>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-700">Minimum reached</div>
              <div className="h-2.5 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-600 rounded-full transition-all"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => router.push("/cart")}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                View cart
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-5 py-2 bg-black text-white rounded-md text-sm font-semibold hover:bg-gray-800 transition-colors"
              >
                Checkout
              </button>
            </div>
          </div>
          {firstItem && (
            <div className="w-48 h-44 flex-shrink-0 flex items-center justify-center bg-white">
              <img
                src={firstItem.product.images?.[0] || "/placeholder-product.jpg"}
                alt={firstItem.product.name}
                className="max-h-full max-w-full object-contain rounded-md border border-gray-200"
              />
            </div>
          )}
        </div>

        {/* Recently viewed */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-black">Recently viewed</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.slice(0, 4).map((item, idx) => (
              <div
                key={item.product.id + idx}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow transition-shadow"
              >
                <div className="relative">
                  <img
                    src={item.product.images?.[0] || "/placeholder-product.jpg"}
                    alt={item.product.name}
                    className="w-full h-52 object-cover"
                  />
                  {item.product.isBestseller && (
                    <span className="absolute top-2 left-2 bg-white text-xs font-semibold px-2 py-1 rounded shadow-sm">
                      Bestseller
                    </span>
                  )}
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm border border-gray-200"
                  >
                    <svg
                      className="w-4 h-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded">Bestseller</span>
                    {item.product.compareAtPrice && (
                      <span className="text-gray-500 line-through">
                        ${item.product.compareAtPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-800 font-medium leading-snug">{item.product.name}</p>
                  <p className="text-xs text-gray-600">{item.product.vendor.name}</p>
                  <div className="text-sm font-semibold text-black">
                    ${item.product.price.toFixed(2)}{" "}
                    {item.product.compareAtPrice && (
                      <span className="text-xs text-gray-500 font-normal">
                        MSRP ${item.product.compareAtPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-600">
                    {item.product.minOrderQuantity
                      ? `$${(item.product.minOrderQuantity * item.product.price).toFixed(0)} min`
                      : "Low min"}
                  </div>
                  <div className="text-xs text-gray-600">Free shipping over $300</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="sticky bottom-0 w-full bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="text-sm text-gray-700">
            <div className="font-medium">{items.length} cart ready to checkout</div>
            <div className="text-gray-600">
              Item total: <span className="line-through text-gray-400">${(subtotal * 2).toFixed(2)}</span>{" "}
              <span className="font-semibold text-black">${subtotal.toFixed(2)}</span>
            </div>
            <div className="text-green-600 font-medium">Welcome 50% off</div>
          </div>
          <button
            onClick={handleSubmit}
            className="w-full sm:w-auto px-6 py-3 bg-black text-white rounded-md font-semibold hover:bg-gray-800 transition-colors"
          >
            Checkout all
          </button>
        </div>
      </div>
    </div>
  );
}

