"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Address, PaymentMethod } from "@/types";
import { ShieldCheck, Lock } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCart();
  const { user } = useAuth();
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

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
    type: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = items.reduce(
    (sum, item) => sum + (item.selectedShipping?.price || 0),
    0
  );
  // Defaulting tax to 0 for wholesale (resale certificates)
  const total = subtotal + shipping;

  if (!mounted || items.length === 0) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    router.push("/order-confirmation");
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#333]">
      {/* Simple Header for Checkout */}
      <header className="bg-white border-b border-[#333]/10 py-6">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center bg-white">
          <div className="w-10 h-10 rounded-full bg-[#ece4d0] flex items-center justify-center flex-shrink-0">
            <span className="text-[#5c0f0f] font-serif text-2xl font-bold">W</span>
          </div>
          <div className="flex items-center gap-2 text-[#5c0f0f]">
            <Lock className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-widest">Secure Checkout</span>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Main Checkout Form */}
          <div className="w-full lg:w-[60%] space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">

              {/* Contact Info */}
              <section className="bg-white p-6 md:p-8 rounded-lg border border-[#333]/10 shadow-sm">
                <h2 className="text-xl font-serif text-[#333] mb-6">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-sans mb-4">
                  <div>
                    <label className="block text-[#333]/70 mb-1">First Name</label>
                    <input required type="text" className="w-full border border-[#333]/20 rounded-md p-2.5 focus:border-[#5c0f0f] focus:ring-1 focus:ring-[#5c0f0f]" />
                  </div>
                  <div>
                    <label className="block text-[#333]/70 mb-1">Last Name</label>
                    <input required type="text" className="w-full border border-[#333]/20 rounded-md p-2.5 focus:border-[#5c0f0f] focus:ring-1 focus:ring-[#5c0f0f]" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[#333]/70 mb-1">Email Address</label>
                    <input required type="email" defaultValue={user?.email || ""} className="w-full border border-[#333]/20 rounded-md p-2.5 focus:border-[#5c0f0f] focus:ring-1 focus:ring-[#5c0f0f]" />
                  </div>
                </div>
              </section>

              {/* Shipping Address */}
              <section className="bg-white p-6 md:p-8 rounded-lg border border-[#333]/10 shadow-sm">
                <h2 className="text-xl font-serif text-[#333] mb-6">Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-sans">
                  <div className="md:col-span-2">
                    <label className="block text-[#333]/70 mb-1">Street Address</label>
                    <input required value={shippingAddress.street} onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })} type="text" className="w-full border border-[#333]/20 rounded-md p-2.5 focus:border-[#5c0f0f]" />
                  </div>
                  <div>
                    <label className="block text-[#333]/70 mb-1">City</label>
                    <input required value={shippingAddress.city} onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })} type="text" className="w-full border border-[#333]/20 rounded-md p-2.5 focus:border-[#5c0f0f]" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#333]/70 mb-1">State</label>
                      <input required value={shippingAddress.state} onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })} type="text" className="w-full border border-[#333]/20 rounded-md p-2.5 focus:border-[#5c0f0f]" />
                    </div>
                    <div>
                      <label className="block text-[#333]/70 mb-1">ZIP Code</label>
                      <input required value={shippingAddress.zipCode} onChange={(e) => setShippingAddress({ ...shippingAddress, zipCode: e.target.value })} type="text" className="w-full border border-[#333]/20 rounded-md p-2.5 focus:border-[#5c0f0f]" />
                    </div>
                  </div>
                </div>
              </section>

              {/* Payment Info */}
              <section className="bg-white p-6 md:p-8 rounded-lg border border-[#333]/10 shadow-sm">
                <h2 className="text-xl font-serif text-[#333] mb-6">Payment</h2>
                <p className="text-[12px] text-[#333]/60 mb-4 bg-yellow-50 p-3 border border-yellow-200 rounded text-yellow-800">
                  <span className="font-bold">Net 60 Terms apply:</span> No payment is due today. We just need a card on file in case of late payment.
                </p>
                <div className="grid grid-cols-1 gap-4 text-sm font-sans">
                  <div>
                    <label className="block text-[#333]/70 mb-1">Card Number</label>
                    <input required value={paymentMethod.cardNumber} onChange={(e) => setPaymentMethod({ ...paymentMethod, cardNumber: e.target.value })} placeholder="0000 0000 0000 0000" type="text" className="w-full border border-[#333]/20 rounded-md p-2.5 focus:border-[#5c0f0f]" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#333]/70 mb-1">Expiration Date (MM/YY)</label>
                      <input required value={paymentMethod.expiryDate} onChange={(e) => setPaymentMethod({ ...paymentMethod, expiryDate: e.target.value })} placeholder="MM/YY" type="text" className="w-full border border-[#333]/20 rounded-md p-2.5 focus:border-[#5c0f0f]" />
                    </div>
                    <div>
                      <label className="block text-[#333]/70 mb-1">Security Code</label>
                      <input required value={paymentMethod.cvv} onChange={(e) => setPaymentMethod({ ...paymentMethod, cvv: e.target.value })} placeholder="CVV" type="text" className="w-full border border-[#333]/20 rounded-md p-2.5 focus:border-[#5c0f0f]" />
                    </div>
                  </div>
                </div>
              </section>

              <button type="submit" className="w-full bg-[#5c0f0f] text-[#ece4d0] py-4 rounded-md font-bold uppercase tracking-widest hover:bg-[#3d0a0a] transition-colors shadow-md text-[14px]">
                Submit Order
              </button>

              <div className="flex items-center justify-center gap-2 text-[12px] text-[#333]/50">
                <ShieldCheck className="w-4 h-4" /> Secure SSL Encrypted Checkout
              </div>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="w-full lg:w-[40%]">
            <div className="bg-white border border-[#333]/10 rounded-lg p-6 lg:p-8 sticky top-6 shadow-sm">
              <h2 className="text-xl font-serif text-[#333] mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 border-b border-[#333]/10 pb-6 max-h-[40vh] overflow-y-auto scrollbar-hide pr-2">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <div className="relative w-16 h-16 bg-[#f9f9f9] rounded border border-[#333]/5 overflow-hidden flex-shrink-0">
                      <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover mix-blend-multiply" />
                      <span className="absolute -top-2 -right-2 bg-[#333] text-white w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="text-[13px] font-medium text-[#333] line-clamp-2 leading-snug">{item.product.name}</h4>
                      <p className="text-[11px] text-[#333]/50 mt-1 uppercase tracking-widest">{item.product.vendor.name}</p>
                    </div>
                    <div className="font-bold text-[#333] text-sm flex items-center">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6 font-sans text-[14px]">
                <div className="flex justify-between text-[#333]/80">
                  <span>Subtotal <span className="text-[11px] text-[#333]/50"></span></span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {shipping === 0 ? (
                  <div className="flex justify-between text-[#5c0f0f]">
                    <span>Shipping</span>
                    <span className="font-bold uppercase tracking-wider text-[11px] mt-0.5">Free</span>
                  </div>
                ) : (
                  <div className="flex justify-between text-[#333]/80">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#333]/80">
                  <span>Taxes</span>
                  <span className="text-[11px] text-[#333]/50">Calculated on invoice</span>
                </div>

                <div className="border-t border-[#333]/10 pt-4 mt-4">
                  <div className="flex justify-between items-end font-bold text-[#333] text-xl">
                    <span>Total</span>
                    <span className="text-2xl">${total.toFixed(2)}</span>
                  </div>
                  <div className="text-right text-[11px] font-bold text-[#5c0f0f] uppercase tracking-widest mt-1">Due in 60 Days</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
