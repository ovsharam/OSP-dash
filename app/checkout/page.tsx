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

  if (!mounted || items.length === 0) {
    return null;
  }

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = items.reduce(
    (sum, item) => sum + (item.selectedShipping?.price || 0),
    0
  );
  const tax = (subtotal + shipping) * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-black mb-8">Checkout</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
            {/* Checkout Form - Left Column */}
            <div className="space-y-6">
              {/* Shipping Address */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-black mb-6">Shipping Address</h2>
                <div className="space-y-4">
                  {/* Street Address */}
                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.street}
                      onChange={(e) =>
                        setShippingAddress({ ...shippingAddress, street: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-black"
                    />
                    {errors.shippingStreet && (
                      <p className="text-red-500 text-sm mt-1.5">{errors.shippingStreet}</p>
                    )}
                  </div>

                  {/* City and State */}
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.city}
                        onChange={(e) =>
                          setShippingAddress({ ...shippingAddress, city: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-black"
                      />
                      {errors.shippingCity && (
                        <p className="text-red-500 text-sm mt-1.5">{errors.shippingCity}</p>
                      )}
                    </div>
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.state}
                        onChange={(e) =>
                          setShippingAddress({ ...shippingAddress, state: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-black"
                      />
                      {errors.shippingState && (
                        <p className="text-red-500 text-sm mt-1.5">{errors.shippingState}</p>
                      )}
                    </div>
                  </div>

                  {/* ZIP Code and Country */}
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ZIP Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.zipCode}
                        onChange={(e) =>
                          setShippingAddress({ ...shippingAddress, zipCode: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-black"
                      />
                      {errors.shippingZip && (
                        <p className="text-red-500 text-sm mt-1.5">{errors.shippingZip}</p>
                      )}
                    </div>
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Country <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.country}
                        onChange={(e) =>
                          setShippingAddress({ ...shippingAddress, country: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-black"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Billing Address */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-6">
                  <input
                    type="checkbox"
                    id="billingSame"
                    checked={billingSameAsShipping}
                    onChange={(e) => setBillingSameAsShipping(e.target.checked)}
                    className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black focus:ring-2"
                  />
                  <label htmlFor="billingSame" className="ml-3 text-sm font-medium text-gray-700">
                    Billing address same as shipping
                  </label>
                </div>
                {!billingSameAsShipping && (
                  <div className="space-y-5 pt-4 border-t border-gray-200">
                    <h2 className="text-xl font-semibold text-black mb-6">Billing Address</h2>
                    {/* Street Address */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Street Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={billingAddress.street}
                        onChange={(e) =>
                          setBillingAddress({ ...billingAddress, street: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-black"
                      />
                      {errors.billingStreet && (
                        <p className="text-red-500 text-sm mt-1.5">{errors.billingStreet}</p>
                      )}
                    </div>
                    {/* City and State */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={billingAddress.city}
                          onChange={(e) =>
                            setBillingAddress({ ...billingAddress, city: e.target.value })
                          }
                          className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-black"
                        />
                        {errors.billingCity && (
                          <p className="text-red-500 text-sm mt-1.5">{errors.billingCity}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          State <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={billingAddress.state}
                          onChange={(e) =>
                            setBillingAddress({ ...billingAddress, state: e.target.value })
                          }
                          className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-black"
                        />
                        {errors.billingState && (
                          <p className="text-red-500 text-sm mt-1.5">{errors.billingState}</p>
                        )}
                      </div>
                    </div>
                    {/* ZIP Code and Country */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          ZIP Code <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={billingAddress.zipCode}
                          onChange={(e) =>
                            setBillingAddress({ ...billingAddress, zipCode: e.target.value })
                          }
                          className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-black"
                        />
                        {errors.billingZip && (
                          <p className="text-red-500 text-sm mt-1.5">{errors.billingZip}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Country <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={billingAddress.country}
                          onChange={(e) =>
                            setBillingAddress({ ...billingAddress, country: e.target.value })
                          }
                          className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-black"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Payment Method */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-black mb-6">Payment Method</h2>
                <div className="space-y-4">
                  {/* Card Number */}
                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={paymentMethod.cardNumber}
                      onChange={(e) =>
                        setPaymentMethod({ ...paymentMethod, cardNumber: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-black"
                    />
                    {errors.cardNumber && (
                      <p className="text-red-500 text-sm mt-1.5">{errors.cardNumber}</p>
                    )}
                  </div>

                  {/* Name on Card */}
                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name on Card <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={paymentMethod.nameOnCard}
                      onChange={(e) =>
                        setPaymentMethod({ ...paymentMethod, nameOnCard: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-black"
                    />
                    {errors.nameOnCard && (
                      <p className="text-red-500 text-sm mt-1.5">{errors.nameOnCard}</p>
                    )}
                  </div>

                  {/* Expiry Date and CVV */}
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={paymentMethod.expiryDate}
                        onChange={(e) =>
                          setPaymentMethod({ ...paymentMethod, expiryDate: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-black"
                      />
                      {errors.expiryDate && (
                        <p className="text-red-500 text-sm mt-1.5">{errors.expiryDate}</p>
                      )}
                    </div>
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        value={paymentMethod.cvv}
                        onChange={(e) =>
                          setPaymentMethod({ ...paymentMethod, cvv: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-black"
                      />
                      {errors.cvv && (
                        <p className="text-red-500 text-sm mt-1.5">{errors.cvv}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary - Right Column */}
            <div className="w-full">
              <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-4">
                <h2 className="text-xl font-semibold text-black mb-6">Order Summary</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center text-sm text-gray-700">
                    <span>Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-700">
                    <span>Shipping</span>
                    <span className="font-medium">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-700">
                    <span>Tax (estimated)</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between items-center font-bold text-black text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

