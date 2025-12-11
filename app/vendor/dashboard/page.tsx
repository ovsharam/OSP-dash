"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { mockOrders } from "@/lib/mockBuyerData";
import { mockCustomers } from "@/lib/mockCustomerData";
import CustomersContent from "@/components/vendor/CustomersContent";
import DashboardCharts from "@/components/vendor/DashboardCharts";

// Mock message data
const mockMessages = [
  {
    id: 1,
    customer: "Artisan Pantry",
    subject: "Order inquiry",
    preview: "Sarah: There's an issue w...",
    date: "5 mins ago",
    unread: true,
    needsReply: true,
    lastSender: "Sarah",
    avatar: "AP",
    thread: [
      {
        id: 1,
        sender: "Sarah",
        message: "There's an issue with our recent order. Can you help?",
        timestamp: "5 mins ago",
        time: "3:45 PM",
        date: "August 21, 2025",
        isCustomer: true,
      },
    ],
  },
  {
    id: 2,
    customer: "Heart & Home",
    subject: "Shipping question",
    preview: "Marc: Before you ship m...",
    date: "1 hour ago",
    unread: true,
    needsReply: true,
    lastSender: "Marc",
    avatar: "H&H",
    thread: [
      {
        id: 1,
        sender: "Marc",
        message: "Before you ship my order, can you add 10 more units?",
        timestamp: "1 hour ago",
        time: "2:30 PM",
        date: "August 21, 2025",
        isCustomer: true,
      },
    ],
  },
  {
    id: 3,
    customer: "Fern and Fable",
    subject: "Order update",
    preview: "You: Sounds good, thank...",
    date: "Yesterday",
    unread: false,
    needsReply: false,
    lastSender: "You",
    avatar: "F&F",
    isStarred: true,
    thread: [
      {
        id: 1,
        sender: "You",
        message: "Hi Sarah, your order will ship tomorrow!",
        timestamp: "Yesterday",
        time: "2:40 PM",
        date: "August 21, 2025",
        isCustomer: false,
        read: true,
      },
      {
        id: 2,
        sender: "Sarah",
        message: "Thank you! Appreciate you expediting. We'll be submitting another order soon.",
        timestamp: "Yesterday",
        time: "3:32 PM",
        date: "August 21, 2025",
        isCustomer: true,
      },
      {
        id: 3,
        sender: "You",
        message: "Sounds good, thank you! We appreciate you.",
        timestamp: "Yesterday",
        time: "8:24 AM",
        date: "August 21, 2025",
        isCustomer: false,
      },
    ],
  },
  {
    id: 4,
    customer: "The Woven Willow",
    subject: "New products",
    preview: "You: Check out our latest...",
    date: "Jul 24",
    unread: false,
    needsReply: false,
    lastSender: "You",
    avatar: "WW",
    thread: [
      {
        id: 1,
        sender: "You",
        message: "Check out our latest sustainable tableware collection!",
        timestamp: "Jul 24",
        time: "10:15 AM",
        date: "July 24, 2025",
        isCustomer: false,
      },
    ],
  },
  {
    id: 5,
    customer: "Legions",
    subject: "Thank you",
    preview: "Jeff: Thanks so much, let...",
    date: "Jun 01",
    unread: false,
    needsReply: false,
    lastSender: "Jeff",
    avatar: "L",
    thread: [
      {
        id: 1,
        sender: "Jeff",
        message: "Thanks so much, let me know when the next shipment arrives!",
        timestamp: "Jun 01",
        time: "4:20 PM",
        date: "June 1, 2025",
        isCustomer: true,
      },
    ],
  },
];

interface MessageThreadProps {
  messageId: number;
  onBack: () => void;
  replyText: string;
  setReplyText: (text: string) => void;
}

function MessageThread({ messageId, onBack, replyText, setReplyText }: MessageThreadProps) {
  const message = mockMessages.find((m) => m.id === messageId);
  const [thread, setThread] = useState(message?.thread || []);

  const handleSendReply = () => {
    if (!replyText.trim()) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
    const dateStr = now.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

    const newMessage = {
      id: thread.length + 1,
      sender: "You",
      message: replyText,
      timestamp: "Just now",
      time: timeStr,
      date: dateStr,
      isCustomer: false,
      read: false,
    };

    setThread([...thread, newMessage]);
    setReplyText("");
  };

  if (!message) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-500">Message not found</p>
      </div>
    );
  }

  // Group messages by date
  const groupedMessages: { [key: string]: typeof thread } = {};
  thread.forEach((msg) => {
    const date = msg.date || "Today";
    if (!groupedMessages[date]) {
      groupedMessages[date] = [];
    }
    groupedMessages[date].push(msg);
  });

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-black transition-colors p-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-lg font-semibold text-black">{message.customer}</h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-600 hover:text-black transition-colors">
            <svg className="w-5 h-5" fill={message.isStarred ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </button>
          <button className="p-2 text-gray-600 hover:text-black transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Message Thread */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {Object.entries(groupedMessages).map(([date, messages]) => (
          <div key={date}>
            {/* Date Separator */}
            <div className="flex items-center justify-center my-4">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-3 text-xs text-gray-500">{date}</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>
            {/* Messages for this date */}
            {messages.map((msg, idx) => (
              <div
                key={msg.id}
                className={`flex ${msg.isCustomer ? "justify-start" : "justify-end"} mb-4`}
              >
                <div className={`max-w-[70%] rounded-lg p-3 ${
                  msg.isCustomer
                    ? "bg-gray-100 text-black"
                    : "bg-amber-50 text-black"
                }`}>
                  <p className="text-sm leading-relaxed mb-1">{msg.message}</p>
                  <div className="flex items-center gap-2 text-xs">
                    <span className={msg.isCustomer ? "text-gray-600" : "text-gray-500"}>
                      {msg.sender}
                    </span>
                    <span className={msg.isCustomer ? "text-gray-500" : "text-gray-400"}>
                      {msg.time || msg.timestamp}
                    </span>
                    {!msg.isCustomer && 'read' in msg && (msg as any).read && (
                      <span className="text-gray-400">Read</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Reply Input */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex gap-3">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Type your message..."
            rows={2}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-black resize-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.ctrlKey) {
                handleSendReply();
              }
            }}
          />
          <button
            onClick={handleSendReply}
            disabled={!replyText.trim()}
            className="bg-black text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed self-end"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default function VendorDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "products" | "orders" | "customers" | "messages" | "profile">("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

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
          <div className="flex h-[calc(100vh-200px)] bg-white border border-gray-200 rounded-lg overflow-hidden">
            {/* Left Panel - Message List */}
            <div className="w-80 border-r border-gray-200 flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-black">Messages</h2>
              </div>
              <div className="flex-1 overflow-y-auto">
                {/* Needs reply section */}
                {mockMessages.filter((m) => m.needsReply).length > 0 && (
                  <div className="p-4">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">Needs reply</h3>
                    <div className="space-y-2">
                      {mockMessages
                        .filter((m) => m.needsReply)
                        .map((message) => (
                          <div
                            key={message.id}
                            onClick={() => setSelectedMessage(message.id)}
                            className={`p-3 rounded-lg cursor-pointer transition-colors ${
                              selectedMessage === message.id ? "bg-gray-100" : "hover:bg-gray-50"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className="relative">
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                                  <span className="text-xs font-semibold text-gray-700">
                                    {message.avatar}
                                  </span>
                                </div>
                                {message.unread && (
                                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                  <h4 className="text-sm font-semibold text-black truncate">
                                    {message.customer}
                                  </h4>
                                  <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                                    {message.date}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-600 truncate">{message.preview}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Other conversations section */}
                <div className="p-4 border-t border-gray-200">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">
                    Other conversations
                  </h3>
                  <div className="space-y-2">
                    {mockMessages
                      .filter((m) => !m.needsReply)
                      .map((message) => (
                        <div
                          key={message.id}
                          onClick={() => setSelectedMessage(message.id)}
                          className={`p-3 rounded-lg cursor-pointer transition-colors ${
                            selectedMessage === message.id ? "bg-gray-100" : "hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-xs font-semibold text-gray-700">
                                {message.avatar}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="text-sm font-semibold text-black truncate">
                                  {message.customer}
                                </h4>
                                <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                                  {message.isStarred && (
                                    <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  )}
                                  <span className="text-xs text-gray-500">{message.date}</span>
                                </div>
                              </div>
                              <p className="text-xs text-gray-600 truncate">{message.preview}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Center Panel - Chat */}
            <div className="flex-1 flex flex-col">
              {selectedMessage === null ? (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  <p>Select a conversation to start messaging</p>
                </div>
              ) : (
                <MessageThread
                  messageId={selectedMessage}
                  onBack={() => setSelectedMessage(null)}
                  replyText={replyText}
                  setReplyText={setReplyText}
                />
              )}
            </div>

            {/* Right Panel - Recent Orders - Only show when message is selected */}
            {selectedMessage !== null && (
              <div className="w-80 border-l border-gray-200 flex flex-col">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-black">Recent orders</h3>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {[
                    {
                      id: "HGIODKSLE",
                      date: "Jun 20",
                      products: [
                        "/images/orders/pexels-introspectivedsgn-30652943.jpg",
                        "/images/orders/pexels-jamie-saw-4619044-12999924.jpg",
                        "/images/orders/pexels-micheile-10045929.jpg",
                        "/images/orders/pexels-muhammed-nasrallah-fotograf-1448516764-27289728.jpg",
                        "/images/orders/pexels-olenkabohovyk-12851541.jpg",
                        "/images/orders/pexels-oskelaq-1009158.jpg",
                        "/images/orders/pexels-shardar-tarikul-islam-84327533-8885948.jpg",
                        "/images/orders/pexels-introspectivedsgn-30652943.jpg",
                      ],
                      status: "New",
                      isNew: true,
                    },
                    {
                      id: "OIERULKDS",
                      date: "Jun 18",
                      products: [
                        "/images/orders/pexels-jamie-saw-4619044-12999924.jpg",
                        "/images/orders/pexels-micheile-10045929.jpg",
                        "/images/orders/pexels-muhammed-nasrallah-fotograf-1448516764-27289728.jpg",
                        "/images/orders/pexels-olenkabohovyk-12851541.jpg",
                      ],
                      status: "Shipped",
                      estDelivery: "Est. Jul 01-03",
                    },
                    {
                      id: "OIERULKDS",
                      date: "Jun 18",
                      products: [
                        "/images/orders/pexels-oskelaq-1009158.jpg",
                        "/images/orders/pexels-shardar-tarikul-islam-84327533-8885948.jpg",
                        "/images/orders/pexels-introspectivedsgn-30652943.jpg",
                        "/images/orders/pexels-jamie-saw-4619044-12999924.jpg",
                        "/images/orders/pexels-micheile-10045929.jpg",
                        "/images/orders/pexels-muhammed-nasrallah-fotograf-1448516764-27289728.jpg",
                        "/images/orders/pexels-olenkabohovyk-12851541.jpg",
                        "/images/orders/pexels-oskelaq-1009158.jpg",
                      ],
                      status: "Shipped",
                      estDelivery: "Est. Jul 01-03",
                    },
                  ].map((order, idx) => (
                    <div key={`${order.id}-${idx}`} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-black">Order #{order.id}</span>
                        <span className="text-xs text-gray-500">{order.date}</span>
                      </div>
                      <div className="flex gap-1 mb-2">
                        {order.products.slice(0, 4).map((img, i) => (
                          <div
                            key={i}
                            className="w-12 h-12 rounded overflow-hidden flex-shrink-0 bg-gray-200 relative"
                          >
                            <img
                              src={img}
                              alt={`Product ${i + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                        {order.products.length > 4 && (
                          <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center flex-shrink-0 relative">
                            <span className="text-xs text-gray-500">+{order.products.length - 4}</span>
                          </div>
                        )}
                      </div>
                      {order.isNew ? (
                        <span className="inline-block px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded">
                          New
                        </span>
                      ) : (
                        <p className="text-xs text-gray-600">
                          {order.status} • {order.estDelivery}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
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
