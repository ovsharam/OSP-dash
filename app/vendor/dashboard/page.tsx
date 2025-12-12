"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
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
    orders: [
      {
        id: "AP-ORD-001",
        date: "Jun 20",
        products: [
          "/images/orders/pexels-introspectivedsgn-30652943.jpg",
          "/images/orders/pexels-jamie-saw-4619044-12999924.jpg",
          "/images/orders/pexels-micheile-10045929.jpg",
          "/images/orders/pexels-muhammed-nasrallah-fotograf-1448516764-27289728.jpg",
          "/images/orders/pexels-olenkabohovyk-12851541.jpg",
          "/images/orders/pexels-oskelaq-1009158.jpg",
        ],
        status: "New",
        isNew: true,
        total: 1250.00,
        customerName: "Artisan Pantry",
      },
      {
        id: "AP-ORD-002",
        date: "Jun 15",
        products: [
          "/images/orders/pexels-shardar-tarikul-islam-84327533-8885948.jpg",
          "/images/orders/pexels-introspectivedsgn-30652943.jpg",
          "/images/orders/pexels-jamie-saw-4619044-12999924.jpg",
        ],
        status: "Shipped",
        estDelivery: "Est. Jun 25-27",
        total: 890.50,
        customerName: "Artisan Pantry",
      },
    ],
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
    orders: [
      {
        id: "HH-ORD-001",
        date: "Jun 18",
        products: [
          "/images/orders/pexels-oskelaq-1009158.jpg",
          "/images/orders/pexels-shardar-tarikul-islam-84327533-8885948.jpg",
          "/images/orders/pexels-introspectivedsgn-30652943.jpg",
          "/images/orders/pexels-jamie-saw-4619044-12999924.jpg",
        ],
        status: "Shipped",
        estDelivery: "Est. Jul 01-03",
        total: 1450.00,
        customerName: "Heart & Home",
      },
      {
        id: "HH-ORD-002",
        date: "Jun 10",
        products: [
          "/images/orders/pexels-micheile-10045929.jpg",
          "/images/orders/pexels-muhammed-nasrallah-fotograf-1448516764-27289728.jpg",
          "/images/orders/pexels-olenkabohovyk-12851541.jpg",
        ],
        status: "Delivered",
        total: 675.00,
        customerName: "Heart & Home",
      },
    ],
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
    orders: [
      {
        id: "FF-ORD-001",
        date: "Jun 20",
        products: [
          "/images/orders/pexels-olenkabohovyk-12851541.jpg",
          "/images/orders/pexels-oskelaq-1009158.jpg",
          "/images/orders/pexels-shardar-tarikul-islam-84327533-8885948.jpg",
          "/images/orders/pexels-introspectivedsgn-30652943.jpg",
          "/images/orders/pexels-jamie-saw-4619044-12999924.jpg",
          "/images/orders/pexels-micheile-10045929.jpg",
          "/images/orders/pexels-muhammed-nasrallah-fotograf-1448516764-27289728.jpg",
          "/images/orders/pexels-olenkabohovyk-12851541.jpg",
        ],
        status: "New",
        isNew: true,
        total: 2340.00,
        customerName: "Fern and Fable",
      },
    ],
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
    orders: [
      {
        id: "WW-ORD-001",
        date: "Jul 20",
        products: [
          "/images/orders/pexels-muhammed-nasrallah-fotograf-1448516764-27289728.jpg",
          "/images/orders/pexels-olenkabohovyk-12851541.jpg",
          "/images/orders/pexels-oskelaq-1009158.jpg",
        ],
        status: "Shipped",
        estDelivery: "Est. Jul 28-30",
        total: 980.00,
        customerName: "The Woven Willow",
      },
    ],
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
    orders: [
      {
        id: "L-ORD-001",
        date: "May 28",
        products: [
          "/images/orders/pexels-shardar-tarikul-islam-84327533-8885948.jpg",
          "/images/orders/pexels-introspectivedsgn-30652943.jpg",
          "/images/orders/pexels-jamie-saw-4619044-12999924.jpg",
          "/images/orders/pexels-micheile-10045929.jpg",
        ],
        status: "Delivered",
        total: 1120.00,
        customerName: "Legions",
      },
    ],
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
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [customerDetailTab, setCustomerDetailTab] = useState<"overview" | "orders">("overview");
  const [showCustomerDetailPanel, setShowCustomerDetailPanel] = useState(false);
  const [selectedOrderForDetail, setSelectedOrderForDetail] = useState<string | null>(null);

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
                onClick={() => setActiveTab("products")}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors text-left ${
                  activeTab === "products"
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <span className="font-medium">Products</span>
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
                onClick={() => setActiveTab("customers")}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors text-left ${
                  activeTab === "customers"
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="font-medium">Customers</span>
              </button>
              <button
                onClick={() => setActiveTab("messages")}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors text-left ${
                  activeTab === "messages"
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="font-medium">Messages</span>
              </button>
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors text-left ${
                  activeTab === "profile"
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-medium">Profile</span>
              </button>
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
        {activeTab === "orders" && (() => {
          // Combine all orders from all messages
          const allOrders = mockMessages.flatMap((message) => message.orders || []);
          const selectedOrder = allOrders.find((o) => o.id === selectedOrderId);

          return (
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
                    {allOrders.map((order, idx) => (
                      <tr
                        key={`${order.id}-${idx}`}
                        className={`border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                          selectedOrderId === order.id ? "bg-blue-50" : ""
                        }`}
                        onClick={() => setSelectedOrderId(selectedOrderId === order.id ? null : order.id)}
                      >
                        <td className="py-3 px-4 text-sm text-gray-900">{order.id}</td>
                        <td className="py-3 px-4 text-sm text-gray-700">{order.customerName}</td>
                        <td className="py-3 px-4 text-sm text-gray-700">{order.date}</td>
                        <td className="py-3 px-4 text-sm font-semibold text-black">
                          ${order.total.toFixed(2)}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "Shipped"
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

              {/* Order Details Section - Show when an order is selected */}
              {selectedOrder && (
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <div>
                    <h3 className="text-lg font-bold text-black mb-4">
                      Order Details: {selectedOrder.id}
                    </h3>
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Customer</h4>
                        <p className="text-sm text-black">{selectedOrder.customerName}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Order Date</h4>
                        <p className="text-sm text-black">{selectedOrder.date}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Status</h4>
                        <span
                          className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                            selectedOrder.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : selectedOrder.status === "Shipped"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {selectedOrder.status}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Total</h4>
                        <p className="text-sm font-semibold text-black">
                          ${selectedOrder.total.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">Products</h4>
                      <div className="flex gap-2 flex-wrap">
                        {selectedOrder.products.map((img, i) => (
                          <div
                            key={i}
                            className="w-20 h-20 rounded overflow-hidden bg-gray-200"
                          >
                            <img
                              src={img}
                              alt={`Product ${i + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    {selectedOrder.estDelivery && (
                      <div className="mt-4">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Estimated Delivery</h4>
                        <p className="text-sm text-black">{selectedOrder.estDelivery}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })()}

        {/* Customers Tab */}
        {activeTab === "customers" && (() => {
          // First try to find customer in mockCustomers
          let selectedCustomer = selectedCustomerId
            ? mockCustomers.find((c) => c.id === selectedCustomerId)
            : null;

          // If not found, try to create from message data
          if (!selectedCustomer && selectedCustomerId && selectedCustomerId.startsWith("TEMP-")) {
            const message = mockMessages.find((m) => {
              const tempId = `TEMP-${m.customer.replace(/\s+/g, '-')}`;
              return tempId === selectedCustomerId;
            });
            if (message) {
              // Create a temporary customer object from message
              selectedCustomer = {
                id: selectedCustomerId,
                businessName: message.customer,
                contactName: message.lastSender || "Unknown",
                email: `${message.customer.toLowerCase().replace(/\s+/g, '')}@example.com`,
                phone: "+1 (555) 000-0000",
                address: {
                  street: "",
                  city: "",
                  state: "",
                  zipCode: "",
                  country: "United States",
                },
                businessType: "Business",
                taxId: "",
                contractSigned: false,
                totalOrders: message.orders?.length || 0,
                totalSpent: message.orders?.reduce((sum, o) => sum + o.total, 0) || 0,
                status: "active" as const,
                tags: [],
                notes: [],
                orders: [],
              };
            }
          }

          // Get orders for selected customer from messages
          const customerOrders = selectedCustomer
            ? mockMessages
                .filter((m) => m.customer === selectedCustomer!.businessName)
                .flatMap((m) => m.orders || [])
            : [];

          return selectedCustomer ? (
            <div className="bg-white border border-gray-200 rounded-lg">
              {/* Customer Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setSelectedCustomerId(null)}
                      className="text-gray-600 hover:text-black transition-colors p-1"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <div>
                      <h2 className="text-2xl font-bold text-black">{selectedCustomer.businessName}</h2>
                      <p className="text-sm text-gray-600">{selectedCustomer.businessType}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Tabs */}
              <div className="border-b border-gray-200">
                <div className="flex gap-4 px-6">
                  <button
                    onClick={() => setCustomerDetailTab("overview")}
                    className={`py-4 px-2 border-b-2 transition-colors ${
                      customerDetailTab === "overview"
                        ? "border-black text-black font-semibold"
                        : "border-transparent text-gray-600 hover:text-black"
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setCustomerDetailTab("orders")}
                    className={`py-4 px-2 border-b-2 transition-colors ${
                      customerDetailTab === "orders"
                        ? "border-black text-black font-semibold"
                        : "border-transparent text-gray-600 hover:text-black"
                    }`}
                  >
                    Orders
                  </button>
                </div>
              </div>

              {/* Customer Content */}
              <div className="p-6">
                {customerDetailTab === "overview" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Contact Information</h3>
                        <p className="text-sm text-black">{selectedCustomer.contactName}</p>
                        <p className="text-sm text-gray-600">{selectedCustomer.email}</p>
                        <p className="text-sm text-gray-600">{selectedCustomer.phone}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Business Details</h3>
                        <p className="text-sm text-black">Status: {selectedCustomer.status}</p>
                        <p className="text-sm text-gray-600">Total Orders: {selectedCustomer.totalOrders}</p>
                        <p className="text-sm text-gray-600">Total Spent: ${selectedCustomer.totalSpent.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                )}

                {customerDetailTab === "orders" && (
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-4">Orders</h3>
                    {customerOrders.length > 0 ? (
                      <div className="space-y-4">
                        {customerOrders.map((order, idx) => (
                          <div
                            key={`${order.id}-${idx}`}
                            onClick={() => setSelectedOrderId(selectedOrderId === order.id ? null : order.id)}
                            className={`border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                              selectedOrderId === order.id ? "bg-blue-50 border-blue-300" : ""
                            }`}
                          >
                            <div className="flex justify-between items-center mb-3">
                              <div>
                                <h4 className="text-sm font-semibold text-black">Order #{order.id}</h4>
                                <p className="text-xs text-gray-500">{order.date}</p>
                              </div>
                              <div className="flex items-center gap-3">
                                <span
                                  className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                                    order.status === "Delivered"
                                      ? "bg-green-100 text-green-800"
                                      : order.status === "Shipped"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {order.status}
                                </span>
                                <span className="text-sm font-semibold text-black">${order.total.toFixed(2)}</span>
                              </div>
                            </div>
                            <div className="flex gap-2 mb-3">
                              {order.products.slice(0, 4).map((img, i) => (
                                <div
                                  key={i}
                                  className="w-16 h-16 rounded overflow-hidden bg-gray-200"
                                >
                                  <img
                                    src={img}
                                    alt={`Product ${i + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ))}
                              {order.products.length > 4 && (
                                <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                                  <span className="text-xs text-gray-500">+{order.products.length - 4}</span>
                                </div>
                              )}
                            </div>
                            {selectedOrderId === order.id && (
                              <div className="mt-4 pt-4 border-t border-gray-200">
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                  <div>
                                    <h5 className="text-xs font-semibold text-gray-700 mb-1">Order Date</h5>
                                    <p className="text-sm text-black">{order.date}</p>
                                  </div>
                                  <div>
                                    <h5 className="text-xs font-semibold text-gray-700 mb-1">Status</h5>
                                    <p className="text-sm text-black">{order.status}</p>
                                  </div>
                                  {(order as any).estDelivery && (
                                    <div>
                                      <h5 className="text-xs font-semibold text-gray-700 mb-1">Estimated Delivery</h5>
                                      <p className="text-sm text-black">{(order as any).estDelivery}</p>
                                    </div>
                                  )}
                                  <div>
                                    <h5 className="text-xs font-semibold text-gray-700 mb-1">Total</h5>
                                    <p className="text-sm font-semibold text-black">${order.total.toFixed(2)}</p>
                                  </div>
                                </div>
                                <div>
                                  <h5 className="text-xs font-semibold text-gray-700 mb-2">Products</h5>
                                  <div className="flex gap-2 flex-wrap">
                                    {order.products.map((img, i) => (
                                      <div
                                        key={i}
                                        className="w-20 h-20 rounded overflow-hidden bg-gray-200"
                                      >
                                        <img
                                          src={img}
                                          alt={`Product ${i + 1}`}
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 text-center py-8">No orders found for this customer.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <CustomersContent
                onCustomerSelect={(customerId) => {
                  setSelectedCustomerId(customerId);
                  setCustomerDetailTab("overview");
                }}
              />
            </div>
          );
        })()}

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

            {/* Right Panel - Recent Orders / Customer Details - Only show when message is selected */}
            {selectedMessage !== null && (() => {
              const message = mockMessages.find((m) => m.id === selectedMessage);
              if (!message) return null;

              const selectedCustomerOrders = message.orders || [];
              
              // Find or create customer
              let customer = mockCustomers.find((c) => c.businessName === message.customer);
              if (!customer) {
                customer = {
                  id: `TEMP-${message.customer.replace(/\s+/g, '-')}`,
                  businessName: message.customer,
                  contactName: message.lastSender || "Unknown",
                  email: `${message.customer.toLowerCase().replace(/\s+/g, '')}@example.com`,
                  phone: "+1 (555) 000-0000",
                  address: {
                    street: "",
                    city: "",
                    state: "",
                    zipCode: "",
                    country: "United States",
                  },
                  businessType: "Business",
                  taxId: "",
                  contractSigned: false,
                  totalOrders: message.orders?.length || 0,
                  totalSpent: message.orders?.reduce((sum, o) => sum + o.total, 0) || 0,
                  status: "active" as const,
                  tags: [],
                  notes: [],
                  orders: [],
                };
              }

              const selectedOrder = selectedCustomerOrders.find((o) => o.id === selectedOrderForDetail);

              // Show customer detail view if order is selected, otherwise show orders list
              return selectedCustomerOrders.length > 0 ? (
                <div className={`border-l border-gray-200 flex flex-col transition-all duration-300 ${
                  selectedOrderForDetail ? "w-[500px]" : "w-80"
                }`}>
                  {selectedOrderForDetail ? (
                    // Customer Detail View
                    <>
                      <div className="p-4 border-b border-gray-200 flex items-center gap-3">
                        <button
                          onClick={() => {
                            setSelectedOrderForDetail(null);
                            setShowCustomerDetailPanel(false);
                          }}
                          className="text-gray-600 hover:text-black transition-colors p-1"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-black">{customer.businessName}</h3>
                          <p className="text-xs text-gray-600">{customer.businessType}</p>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedCustomerId(customer.id);
                            setCustomerDetailTab("orders");
                            setSelectedOrderId(selectedOrderForDetail);
                            setActiveTab("customers");
                          }}
                          className="text-xs text-black hover:underline"
                        >
                          View Full
                        </button>
                      </div>
                      <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {/* Customer Info */}
                        <div>
                          <h4 className="text-sm font-semibold text-black mb-3">Customer Information</h4>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="text-gray-600">Contact: </span>
                              <span className="text-black">{customer.contactName}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Email: </span>
                              <span className="text-black">{customer.email}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Phone: </span>
                              <span className="text-black">{customer.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-600">Status: </span>
                              <span
                                className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                                  customer.status === "active"
                                    ? "bg-green-100 text-green-800"
                                    : customer.status === "prospect"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-600">Total Orders: </span>
                              <span className="text-black">{customer.totalOrders}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Total Spent: </span>
                              <span className="text-black font-semibold">${customer.totalSpent.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Selected Order Details */}
                        {selectedOrder && (
                          <div className="border-t border-gray-200 pt-4">
                            <h4 className="text-sm font-semibold text-black mb-3">Order: {selectedOrder.id}</h4>
                            <div className="border border-gray-200 rounded-lg p-3 space-y-3">
                              <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                  <span className="text-gray-600">Date: </span>
                                  <span className="text-black">{selectedOrder.date}</span>
                                </div>
                                <div>
                                  <span className="text-gray-600">Status: </span>
                                  <span
                                    className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                                      selectedOrder.status === "Delivered"
                                        ? "bg-green-100 text-green-800"
                                        : selectedOrder.status === "Shipped"
                                        ? "bg-blue-100 text-blue-800"
                                        : "bg-yellow-100 text-yellow-800"
                                    }`}
                                  >
                                    {selectedOrder.status}
                                  </span>
                                </div>
                                {(selectedOrder as any).estDelivery && (
                                  <div>
                                    <span className="text-gray-600">Est. Delivery: </span>
                                    <span className="text-black">{(selectedOrder as any).estDelivery}</span>
                                  </div>
                                )}
                                <div>
                                  <span className="text-gray-600">Total: </span>
                                  <span className="text-black font-semibold">${selectedOrder.total.toFixed(2)}</span>
                                </div>
                              </div>
                              <div>
                                <p className="text-xs text-gray-600 mb-2">Products:</p>
                                <div className="flex gap-2 flex-wrap">
                                  {selectedOrder.products.map((img, i) => (
                                    <div
                                      key={i}
                                      className="w-14 h-14 rounded overflow-hidden bg-gray-200"
                                    >
                                      <img
                                        src={img}
                                        alt={`Product ${i + 1}`}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* All Orders List */}
                        <div className="border-t border-gray-200 pt-4">
                          <h4 className="text-sm font-semibold text-black mb-3">All Orders ({selectedCustomerOrders.length})</h4>
                          <div className="space-y-2">
                            {selectedCustomerOrders.map((order, idx) => (
                              <div
                                key={`${order.id}-${idx}`}
                                onClick={() => setSelectedOrderForDetail(order.id)}
                                className={`border rounded-lg p-2 cursor-pointer transition-colors text-sm ${
                                  selectedOrderForDetail === order.id
                                    ? "border-black bg-gray-50"
                                    : "border-gray-200 hover:bg-gray-50"
                                }`}
                              >
                                <div className="flex justify-between items-center mb-1">
                                  <span className="font-semibold text-black">#{order.id}</span>
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={`inline-block px-1.5 py-0.5 text-xs font-semibold rounded ${
                                        order.status === "Delivered"
                                          ? "bg-green-100 text-green-800"
                                          : order.status === "Shipped"
                                          ? "bg-blue-100 text-blue-800"
                                          : "bg-yellow-100 text-yellow-800"
                                      }`}
                                    >
                                      {order.status}
                                    </span>
                                    <span className="text-xs font-semibold text-black">${order.total.toFixed(2)}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-gray-500">{order.date}</span>
                                  <div className="flex gap-1">
                                    {order.products.slice(0, 3).map((img, i) => (
                                      <div
                                        key={i}
                                        className="w-8 h-8 rounded overflow-hidden bg-gray-200"
                                      >
                                        <img
                                          src={img}
                                          alt={`Product ${i + 1}`}
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                    ))}
                                    {order.products.length > 3 && (
                                      <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                                        <span className="text-xs text-gray-500">+{order.products.length - 3}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    // Orders List View
                    <>
                      <div className="p-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-black">Recent orders</h3>
                      </div>
                      <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {selectedCustomerOrders.map((order) => (
                          <div
                            key={order.id}
                            onClick={() => {
                              setSelectedOrderForDetail(order.id);
                              setShowCustomerDetailPanel(true);
                            }}
                            className="border border-gray-200 rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                          >
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
                            {(order as any).isNew ? (
                              <span className="inline-block px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded">
                                New
                              </span>
                            ) : (
                              <p className="text-xs text-gray-600">
                                {order.status} • {(order as any).estDelivery || ""}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : null;
            })()}
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
