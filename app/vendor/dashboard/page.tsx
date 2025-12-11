"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { mockOrders } from "@/lib/mockBuyerData";
import { mockCustomers } from "@/lib/mockCustomerData";
import CustomersContent from "@/components/vendor/CustomersContent";
import DashboardCharts from "@/components/vendor/DashboardCharts";

export default function VendorDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "products" | "orders" | "customers" | "messages" | "profile">("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Mock data
  const stats = {
    totalSales: 125000,
    totalRevenue: 98750,
    totalCustomers: mockCustomers.length,
    totalProducts: 28,
    recentOrders: [
      {
        id: "ORD-001",
        customerName: "Restaurant ABC",
        total: 1250.00,
        status: "processing",
        orderDate: new Date("2024-01-15"),
      },
      {
        id: "ORD-002",
        customerName: "Cafe XYZ",
        total: 890.50,
        status: "shipped",
        orderDate: new Date("2024-01-14"),
      },
      {
        id: "ORD-003",
        customerName: "Hotel Grand",
        total: 2340.00,
        status: "delivered",
        orderDate: new Date("2024-01-13"),
      },
    ],
  };

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
              {[
                { id: "overview", label: "Overview" },
                { id: "products", label: "Products" },
                { id: "orders", label: "Orders" },
                { id: "customers", label: "Customers" },
                { id: "messages", label: "Messages" },
                { id: "profile", label: "Profile" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm text-left ${
                    activeTab === tab.id
                      ? "border-black text-black"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-black mb-2">Vendor Dashboard</h1>
            <p className="text-gray-600">Manage your products, orders, and customers</p>
          </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <p className="text-sm text-gray-600 mb-1">Total Sales</p>
                <p className="text-2xl font-bold text-black">${stats.totalSales.toLocaleString()}</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                <p className="text-2xl font-bold text-black">${stats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <p className="text-sm text-gray-600 mb-1">Total Customers</p>
                <p className="text-2xl font-bold text-black">{stats.totalCustomers}</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <p className="text-sm text-gray-600 mb-1">Total Products</p>
                <p className="text-2xl font-bold text-black">{stats.totalProducts}</p>
              </div>
            </div>

            {/* Charts */}
            <DashboardCharts />

            {/* Recent Orders */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-black">Recent Orders</h2>
                <Link
                  href="/vendor/dashboard?tab=orders"
                  className="text-sm text-gray-600 hover:text-black"
                  onClick={() => setActiveTab("orders")}
                >
                  View All
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Order ID
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Customer
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Date
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Total
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentOrders.map((order) => (
                      <tr key={order.id} className="border-b border-gray-100">
                        <td className="py-3 px-4 text-sm text-gray-900">{order.id}</td>
                        <td className="py-3 px-4 text-sm text-gray-700">{order.customerName}</td>
                        <td className="py-3 px-4 text-sm text-gray-700">
                          {order.orderDate.toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-sm font-semibold text-black">
                          ${order.total.toFixed(2)}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                              order.status === "delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "shipped"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-black">Product Catalog</h2>
              <div className="flex gap-3">
                <button
                  className="bg-white border border-green-500 text-green-600 px-4 py-2 rounded font-semibold hover:bg-green-50 transition-colors flex items-center gap-2"
                  onClick={() => alert("Import from Shopify coming soon!")}
                >
                  {/* Shopify Logo SVG */}
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15.637 15.637c-.36 0-.69-.13-.95-.35l-1.96-1.96c-.22-.26-.35-.59-.35-.95 0-.36.13-.69.35-.95l1.96-1.96c.26-.22.59-.35.95-.35.36 0 .69.13.95.35l1.96 1.96c.22.26.35.59.35.95 0 .36-.13.69-.35.95l-1.96 1.96c-.26.22-.59.35-.95.35zm-7.274 0c-.36 0-.69-.13-.95-.35L5.458 13.327c-.22-.26-.35-.59-.35-.95 0-.36.13-.69.35-.95l1.955-1.96c.26-.22.59-.35.95-.35.36 0 .69.13.95.35l1.96 1.96c.22.26.35.59.35.95 0 .36-.13.69-.35.95l-1.96 1.96c-.26.22-.59.35-.95.35zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z"/>
                  </svg>
                  Import from Shopify
                </button>
                <button
                  className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2"
                  onClick={() => alert("Import from Website coming soon!")}
                >
                  {/* Code Icon </> */}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  Import from Website
                </button>
                <Link
                  href="/vendor/products/new"
                  className="bg-black text-white px-4 py-2 rounded font-semibold hover:bg-gray-800 transition-colors"
                >
                  Add New Product
                </Link>
              </div>
            </div>
            <div className="text-center py-12 text-gray-500">
              <p>Product management interface coming soon.</p>
              <p className="text-sm mt-2">Upload CSV or add products manually.</p>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-black mb-6">All Orders</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Order ID
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Customer
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Total</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-sm text-gray-900">{order.id}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{order.customerName}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">
                        {order.orderDate.toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-sm font-semibold text-black">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                            order.status === "delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "shipped"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-sm text-gray-600 hover:text-black">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Customers Tab */}
        {activeTab === "customers" && (
          <div>
            <CustomersContent />
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === "messages" && (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-black">Messages</h2>
              <button className="bg-black text-white px-4 py-2 rounded font-semibold hover:bg-gray-800 transition-colors">
                New Message
              </button>
            </div>
            <div className="space-y-4">
              {/* Mock messages */}
              {[
                {
                  id: 1,
                  customer: "Restaurant ABC",
                  subject: "Order ORD-001 inquiry",
                  preview: "Hi, I have a question about my recent order...",
                  date: "2 hours ago",
                  unread: true,
                },
                {
                  id: 2,
                  customer: "Cafe XYZ",
                  subject: "Product availability",
                  preview: "Are the bamboo straws still in stock?",
                  date: "1 day ago",
                  unread: true,
                },
                {
                  id: 3,
                  customer: "Hotel Grand",
                  subject: "Bulk order request",
                  preview: "We're interested in placing a large order...",
                  date: "3 days ago",
                  unread: false,
                },
              ].map((message) => (
                <div
                  key={message.id}
                  className={`border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    message.unread ? "bg-blue-50 border-blue-200" : ""
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-gray-700">
                          {message.customer.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-black">{message.customer}</h3>
                        <p className="text-sm text-gray-600">{message.subject}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{message.date}</span>
                  </div>
                  <p className="text-sm text-gray-700 ml-13">{message.preview}</p>
                  {message.unread && (
                    <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded">
                      New
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-black mb-6">Vendor Profile</h2>
            <div className="max-w-2xl space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Name *
                </label>
                <input
                  type="text"
                  defaultValue="Tableware Co."
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  defaultValue="contact@tablewareco.com"
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows={4}
                  defaultValue="Premium tableware supplier serving restaurants and cafes nationwide."
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                <input
                  type="url"
                  defaultValue="https://www.tablewareco.com"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-black"
                />
              </div>
              <button className="bg-black text-white px-6 py-2 rounded font-semibold hover:bg-gray-800 transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
