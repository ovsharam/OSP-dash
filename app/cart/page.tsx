"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { EmptyCart } from "@/components/EmptyState";
import Link from "next/link";
import toast from "react-hot-toast";
import { ChevronRight, Heart, Trash2, Truck, ShieldCheck } from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const { items, updateQuantity, removeFromCart, isMounted } = useCart();
  const { addToWishlist } = useWishlist();

  const handleSaveForLater = (productId: string) => {
    const item = items.find((i) => i.product.id === productId);
    if (item) {
      addToWishlist(item.product);
      removeFromCart(productId);
      toast.success("Saved for later");
    }
  };

  if (!isMounted) {
    return null; // Prevent hydration error by matching the initial server render
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#f9f9f9] flex flex-col items-center justify-center p-4">
        <div className="bg-white border border-[#333]/10 rounded-lg p-12 text-center max-w-lg w-full shadow-sm">
          <h2 className="font-serif text-3xl text-[#333] mb-4">Your bag is empty</h2>
          <p className="text-[#333]/60 mb-8 font-sans">Discover independent brands and stock your shelves with unique products.</p>
          <Link href="/browse" className="inline-block bg-[#5c0f0f] text-[#ece4d0] px-8 py-3 rounded-md font-bold uppercase tracking-widest hover:bg-[#3d0a0a] transition-colors">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = items.reduce(
    (sum, item) => sum + (item.selectedShipping?.price || 0),
    0
  );
  // Calculate margins for wholesale ROI display
  const msrpTotal = items.reduce((sum, item) => sum + (item.product.compareAtPrice || item.product.price) * item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#333]">
      {/* Breadcrumb */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-[11px] text-[#333]/60 uppercase tracking-widest font-bold">
          <Link href="/" className="hover:text-[#5c0f0f]">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#5c0f0f]">Shopping Bag</span>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl lg:text-4xl font-serif text-[#333] mb-8">Shopping Bag</h1>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Cart Items List */}
          <div className="w-full lg:w-[65%] space-y-6">
            {/* Free shipping banner */}
            <div className="bg-[#ece4d0]/30 border border-[#d1b181]/50 rounded-md p-4 flex items-center gap-4">
              <div className="bg-[#5c0f0f] text-white p-2 rounded-full">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-[#5c0f0f]">You qualify for free shipping!</h4>
                <p className="text-[12px] text-[#333]/70">Standard ground shipping is free on this order.</p>
              </div>
            </div>

            {items.map((item) => {
              const minOrder = item.product.minOrderQuantity || 1;
              return (
                <div
                  key={item.product.id}
                  className="bg-white border border-[#333]/10 rounded-lg p-6 flex flex-col sm:flex-row gap-6 hover:shadow-md transition-shadow"
                >
                  <div className="relative w-full sm:w-36 aspect-square bg-[#f9f9f9] rounded-md overflow-hidden flex-shrink-0 border border-[#333]/5">
                    <Image
                      src={item.product.images[0] || "/placeholder-product.jpg"}
                      alt={item.product.name}
                      fill
                      className="object-cover mix-blend-multiply"
                      sizes="144px"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-2 gap-4">
                      <div>
                        <Link
                          href={`/browse?brand=${encodeURIComponent(item.product.vendor.name)}`}
                          className="text-[11px] font-bold text-[#333]/50 uppercase tracking-widest hover:text-[#5c0f0f] transition-colors"
                        >
                          {item.product.vendor.name}
                        </Link>
                        <Link
                          href={`/products/${item.product.id}`}
                          className="block font-serif text-xl tracking-tight text-[#333] hover:text-[#5c0f0f] transition-colors mt-1"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-sm text-[#333]/60 mt-2 line-clamp-2">{item.product.description}</p>
                      </div>

                      <div className="text-right">
                        <div className="font-sans font-bold text-lg text-[#333]">
                          ${item.product.price.toFixed(2)} <span className="text-[11px] font-normal text-[#333]/50">/ea</span>
                        </div>
                        {item.product.compareAtPrice && (
                          <div className="text-[12px] text-[#333]/50 line-through">
                            MSRP: ${item.product.compareAtPrice.toFixed(2)}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-end justify-between mt-4 md:mt-auto gap-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-[#333]/20 rounded bg-white">
                          <button
                            onClick={() => updateQuantity(item.product.id, Math.max(minOrder, item.quantity - 1))}
                            className="w-8 h-8 flex items-center justify-center text-[#333] hover:bg-gray-50 focus:outline-none"
                            disabled={item.quantity <= minOrder}
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.product.id, Math.max(minOrder, Number(e.target.value)))}
                            className="w-10 text-center border-none p-0 focus:ring-0 font-bold text-[14px]"
                          />
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-[#333] hover:bg-gray-50 focus:outline-none"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-[11px] text-[#333]/50">Total: <span className="font-bold text-[#333]">${(item.product.price * item.quantity).toFixed(2)}</span></span>
                      </div>

                      <div className="flex items-center gap-4 border-l border-[#333]/10 pl-4">
                        <button
                          onClick={() => handleSaveForLater(item.product.id)}
                          className="flex flex-col items-center gap-1 text-[#333]/50 hover:text-[#5c0f0f] transition-colors group"
                        >
                          <Heart className="w-4 h-4 group-hover:fill-[#5c0f0f]" />
                          <span className="text-[10px] uppercase tracking-widest font-bold">Save</span>
                        </button>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="flex flex-col items-center gap-1 text-[#333]/50 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="text-[10px] uppercase tracking-widest font-bold">Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary Sidebar */}
          <div className="w-full lg:w-[35%]">
            <div className="bg-white border border-[#333]/10 rounded-lg p-6 lg:p-8 sticky top-24 shadow-sm">
              <h2 className="text-xl font-serif text-[#333] mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6 font-sans text-[14px]">
                <div className="flex justify-between text-[#333]/80">
                  <span>Subtotal <span className="text-[11px] text-[#333]/50">({items.length} items)</span></span>
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

                {msrpTotal > subtotal && (
                  <div className="flex justify-between text-green-700 font-medium py-1">
                    <span>Est. Retail Value</span>
                    <span>${msrpTotal.toFixed(2)}</span>
                  </div>
                )}

                <div className="border-t border-[#333]/10 pt-4 mt-4">
                  <div className="flex justify-between items-end font-bold text-[#333] text-xl">
                    <span>Estimated Total</span>
                    <span className="text-2xl">${(subtotal + shipping).toFixed(2)}</span>
                  </div>
                  <p className="text-[11px] text-[#333]/50 text-right mt-1 uppercase tracking-widest">Taxes calculated at checkout</p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => router.push("/checkout")}
                  className="w-full bg-[#5c0f0f] text-[#ece4d0] py-4 rounded-md font-bold uppercase tracking-widest hover:bg-[#3d0a0a] transition-colors shadow-md text-[13px]"
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={() => router.push("/browse")}
                  className="w-full bg-white border border-[#333]/20 text-[#333] py-3.5 rounded-md font-bold uppercase tracking-widest hover:border-[#333] transition-colors text-[12px]"
                >
                  Continue Shopping
                </button>
              </div>

              <div className="mt-6 flex items-center justify-center gap-2 text-[12px] text-[#333]/50">
                <ShieldCheck className="w-4 h-4" /> Secure Wholesale Checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
