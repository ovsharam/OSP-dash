"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { mockOrders, mockSampleRequests } from "@/lib/mockBuyerData";

export default function BuyerDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "samples" | "settings">("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const recentOrders = mockOrders.slice(0, 3);
  const pendingSamples = mockSampleRequests.filter((s) => s.status !== "delivered").length;
  const totalOrders = mockOrders.length;
  const totalSpent = mockOrders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}
      <div className={`${sidebarOpen ? "w-64" : "w-16"} transition-all duration-300 bg-white border-r border-gray-200 overflow-hidden flex-shrink-0`}>
        <div className="p-4">
          {/* Hamburger Menu Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mb-4 p-2 hover:bg-gray-100 rounded transition-colors"
            aria-label="Toggle sidebar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Navigation Buttons */}
          {sidebarOpen && (
            <div className="flex flex-col">
              <button
                onClick={() => setActiveTab("overview")}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors text-left ${
                  activeTab === "overview"
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="font-medium">Overview</span>
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors text-left ${
                  activeTab === "orders"
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span className="font-medium">Orders</span>
              </button>
              <button
                onClick={() => setActiveTab("samples")}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors text-left ${
                  activeTab === "samples"
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <span className="font-medium">Sample Requests</span>
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors text-left ${
                  activeTab === "settings"
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-medium">Settings</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <div className="p-6">

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <p className="text-sm text-gray-600 mb-1">Total Orders</p>
                <p className="text-2xl font-bold text-black">{totalOrders}</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <p className="text-sm text-gray-600 mb-1">Total Spent</p>
                <p className="text-2xl font-bold text-black">${totalSpent.toFixed(2)}</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <p className="text-sm text-gray-600 mb-1">Pending Samples</p>
                <p className="text-2xl font-bold text-black">{pendingSamples}</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <p className="text-sm text-gray-600 mb-1">Active Orders</p>
                <p className="text-2xl font-bold text-black">
                  {mockOrders.filter((o) => o.status !== "delivered" && o.status !== "cancelled").length}
                </p>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-black">Recent Orders</h2>
                <Link
                  href="/buyer/orders"
                  className="text-sm text-gray-600 hover:text-black"
                  onClick={() => setActiveTab("orders")}
                >
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-semibold text-black">{order.id}</p>
                          <p className="text-sm text-gray-600">
                            {order.items.length} item{order.items.length > 1 ? "s" : ""}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">
                            {order.orderDate.toLocaleDateString()}
                          </p>
                          <p className="text-sm font-semibold text-black">${order.total.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-semibold rounded ${
                          order.status === "delivered"
                            ? "bg-green-100 text-green-800"
                            : order.status === "shipped"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "processing"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                      <Link
                        href={`/buyer/orders/${order.id}`}
                        className="text-sm text-black hover:underline"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-bold text-black mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  href="/browse"
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-semibold text-black mb-1">Browse Products</h3>
                  <p className="text-sm text-gray-600">Discover new products</p>
                </Link>
                <Link
                  href="/buyer/samples"
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => setActiveTab("samples")}
                >
                  <h3 className="font-semibold text-black mb-1">Request Samples</h3>
                  <p className="text-sm text-gray-600">Request product samples</p>
                </Link>
                <Link
                  href="/buyer/settings"
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => setActiveTab("settings")}
                >
                  <h3 className="font-semibold text-black mb-1">Account Settings</h3>
                  <p className="text-sm text-gray-600">Manage your account</p>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div>
            <OrdersContent />
          </div>
        )}

        {/* Samples Tab */}
        {activeTab === "samples" && (
          <div>
            <SamplesContent />
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div>
            <SettingsContent />
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

function OrdersContent() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-xl font-bold text-black mb-6">All Orders</h2>
      <div className="space-y-4">
        {mockOrders.map((order) => (
          <Link
            key={order.id}
            href={`/buyer/orders/${order.id}`}
            className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="font-semibold text-black">{order.id}</p>
                    <p className="text-sm text-gray-600">
                      {order.items.length} item{order.items.length > 1 ? "s" : ""} •{" "}
                      {order.orderDate.toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-black">${order.total.toFixed(2)}</p>
                    {order.trackingNumber && (
                      <p className="text-xs text-gray-500">Tracking: {order.trackingNumber}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span
                  className={`inline-block px-3 py-1 text-xs font-semibold rounded ${
                    order.status === "delivered"
                      ? "bg-green-100 text-green-800"
                      : order.status === "shipped"
                      ? "bg-blue-100 text-blue-800"
                      : order.status === "processing"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function SamplesContent() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-black">Sample Requests</h2>
        <Link
          href="/browse"
          className="bg-black text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Request New Sample
        </Link>
      </div>
      <div className="space-y-4">
        {mockSampleRequests.map((sample) => (
          <div
            key={sample.id}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start space-x-4">
              <div className="relative w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                <img
                  src={sample.productImage}
                  alt={sample.productName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-black mb-1">{sample.productName}</h3>
                    <p className="text-sm text-gray-600">{sample.vendorName}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Requested: {sample.requestedDate.toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`inline-block px-3 py-1 text-xs font-semibold rounded ${
                      sample.status === "delivered"
                        ? "bg-green-100 text-green-800"
                        : sample.status === "shipped"
                        ? "bg-blue-100 text-blue-800"
                        : sample.status === "approved"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {sample.status.charAt(0).toUpperCase() + sample.status.slice(1)}
                  </span>
                </div>
                {sample.trackingNumber && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Tracking:</span> {sample.trackingNumber} ({sample.carrier})
                    </p>
                    {sample.estimatedDelivery && (
                      <p className="text-sm text-gray-600">
                        Estimated delivery: {sample.estimatedDelivery.toLocaleDateString()}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsContent() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-xl font-bold text-black mb-6">Account Settings</h2>
      <div className="max-w-2xl space-y-6">
        <div>
          <h3 className="font-semibold text-black mb-4">Profile Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                defaultValue="John Doe"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                defaultValue="john@restaurant.com"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
              <input
                type="text"
                defaultValue="Restaurant ABC"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                defaultValue="+1 (555) 123-4567"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-black"
              />
            </div>
          </div>
        </div>
        <div className="pt-6 border-t border-gray-200">
          <h3 className="font-semibold text-black mb-4">Password</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-black"
              />
            </div>
          </div>
        </div>
        <div className="pt-6">
          <button className="bg-black text-white px-6 py-2 rounded font-semibold hover:bg-gray-800 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

