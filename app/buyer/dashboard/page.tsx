"use client";

import { useAuth } from "@/contexts/AuthContextNew";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function BuyerDashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Account Overview</h2>
            <div className="space-y-3 text-sm text-gray-600">
              <p><span className="font-semibold">Name:</span> {user.name}</p>
              <p><span className="font-semibold">Email:</span> {user.email}</p>
              <p><span className="font-semibold">Member since:</span> {new Date().getFullYear()}</p>
            </div>
            <Link
              href="/buyer/settings"
              className="mt-4 block text-indigo-600 hover:text-indigo-500 text-sm font-medium"
            >
              Edit Profile
            </Link>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Orders</h2>
            <p className="text-gray-500 text-sm mb-4">No recent orders found.</p>
            <Link
              href="/buyer/orders"
              className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
            >
              View Order History
            </Link>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Links</h2>
            <div className="space-y-3">
              <Link href="/browse" className="block text-gray-600 hover:text-black">
                Browse Products
              </Link>
              <Link href="/cart" className="block text-gray-600 hover:text-black">
                View Cart
              </Link>
              <Link href="/wishlist" className="block text-gray-600 hover:text-black">
                Wishlist
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
