"use client";

import Link from "next/link";

export default function OrderConfirmationPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full bg-white border border-gray-200 rounded-lg p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-black mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">
            Thank you for your order. You will receive a confirmation email shortly.
          </p>
        </div>
        <div className="border-t border-gray-200 pt-6 mt-6">
          <p className="text-sm text-gray-600 mb-4">
            Order ID: <span className="font-semibold text-black">ORD-{Date.now()}</span>
          </p>
          <div className="flex space-x-4 justify-center">
            <Link
              href="/browse"
              className="bg-black text-white px-6 py-2 rounded font-semibold hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </Link>
            <Link
              href="/vendor/dashboard"
              className="bg-gray-100 text-black px-6 py-2 rounded font-semibold hover:bg-gray-200 transition-colors"
            >
              View Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

