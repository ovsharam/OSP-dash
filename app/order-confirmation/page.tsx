"use client";

import Link from "next/link";
import { CheckCircle2, ChevronRight, Package, Truck } from "lucide-react";

export default function OrderConfirmationPage() {
  const orderId = `WWC-${Math.floor(Math.random() * 900000) + 100000}`;

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#333]">
      <header className="bg-white border-b border-[#333]/10 py-6">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center bg-white">
          <Link href="/" className="w-10 h-10 rounded-full bg-[#ece4d0] flex items-center justify-center flex-shrink-0 cursor-pointer">
            <span className="text-[#5c0f0f] font-serif text-2xl font-bold">W</span>
          </Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-16 sm:py-24">
        <div className="bg-white border border-[#333]/10 rounded-lg p-8 md:p-12 text-center shadow-sm">

          <div className="mb-8">
            <div className="w-20 h-20 bg-[#ece4d0] rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-[#5c0f0f]" />
            </div>
            <h1 className="text-3xl md:text-4xl font-serif text-[#333] mb-4">Order Received</h1>
            <p className="text-[#333]/80 font-sans text-lg">
              Thank you! Your wholesale order has been placed successfully.
            </p>
          </div>

          <div className="bg-[#f9f9f9] border border-[#333]/5 rounded-md p-6 mb-8 text-left grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#333]/50 mb-1">Order Number</h3>
              <p className="font-semibold text-sm">{orderId}</p>
            </div>
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#333]/50 mb-1">Estimated Lead Time</h3>
              <p className="font-semibold text-sm">3 - 5 Business Days</p>
            </div>
            <div className="col-span-2 pt-4 border-t border-[#333]/10 flex gap-3 items-center">
              <Truck className="w-5 h-5 text-[#5c0f0f]" />
              <p className="text-sm font-medium">We'll send a confirmation email with tracking details once your order ships.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/browse"
              className="bg-[#5c0f0f] text-[#ece4d0] px-8 py-3.5 rounded-md font-bold uppercase tracking-widest text-sm hover:bg-[#3d0a0a] transition-colors"
            >
              Continue Shopping
            </Link>
            <Link
              href="/buyer/dashboard"
              className="bg-white border border-[#333]/20 text-[#333] px-8 py-3.5 rounded-md font-bold uppercase tracking-widest text-sm hover:border-[#333] transition-colors"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
