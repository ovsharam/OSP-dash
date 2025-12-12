"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { mockOrders, mockSampleRequests } from "@/lib/mockBuyerData";

// Mock messages for buyer (from vendors)
const mockBuyerMessages = [
  {
    id: 1,
    vendor: "Pure Soda Co.",
    subject: "Order update",
    preview: "Your order ORD-001 has been...",
    date: "2 hours ago",
    unread: true,
    needsReply: false,
    lastSender: "Pure Soda Co.",
    avatar: "PS",
    thread: [
      {
        id: 1,
        sender: "Pure Soda Co.",
        message: "Your order ORD-001 has been shipped! Tracking number: 1Z999AA10123456784",
        timestamp: "2 hours ago",
        time: "1:30 PM",
        date: "August 21, 2025",
        isVendor: true,
      },
    ],
  },
  {
    id: 2,
    vendor: "Eco Tableware Solutions",
    subject: "Sample request approved",
    preview: "Your sample request has been...",
    date: "1 day ago",
    unread: true,
    needsReply: false,
    lastSender: "Eco Tableware Solutions",
    avatar: "ET",
    thread: [
      {
        id: 1,
        sender: "Eco Tableware Solutions",
        message: "Your sample request has been approved and will ship tomorrow!",
        timestamp: "1 day ago",
        time: "10:15 AM",
        date: "August 20, 2025",
        isVendor: true,
      },
    ],
  },
  {
    id: 3,
    vendor: "Beverage Equipment Pro",
    subject: "Product availability",
    preview: "You: When will the soda dispenser...",
    date: "Yesterday",
    unread: false,
    needsReply: false,
    lastSender: "You",
    avatar: "BE",
    isStarred: true,
    thread: [
      {
        id: 1,
        sender: "You",
        message: "When will the soda dispenser be back in stock?",
        timestamp: "Yesterday",
        time: "9:00 AM",
        date: "August 20, 2025",
        isVendor: false,
      },
      {
        id: 2,
        sender: "Beverage Equipment Pro",
        message: "We expect to have it back in stock by next week. I can notify you when it's available!",
        timestamp: "Yesterday",
        time: "11:30 AM",
        date: "August 20, 2025",
        isVendor: true,
        read: true,
      },
      {
        id: 3,
        sender: "You",
        message: "That would be great, thank you!",
        timestamp: "Yesterday",
        time: "2:15 PM",
        date: "August 20, 2025",
        isVendor: false,
      },
    ],
  },
  {
    id: 4,
    vendor: "Sustainable Supplies",
    subject: "Bulk order inquiry",
    preview: "You: I'm interested in placing...",
    date: "3 days ago",
    unread: false,
    needsReply: false,
    lastSender: "You",
    avatar: "SS",
    thread: [
      {
        id: 1,
        sender: "You",
        message: "I'm interested in placing a bulk order for bamboo straws. Can you provide pricing?",
        timestamp: "3 days ago",
        time: "3:00 PM",
        date: "August 18, 2025",
        isVendor: false,
      },
      {
        id: 2,
        sender: "Sustainable Supplies",
        message: "Absolutely! For orders over 1000 units, we offer a 15% discount. I'll send you a detailed quote.",
        timestamp: "2 days ago",
        time: "10:00 AM",
        date: "August 19, 2025",
        isVendor: true,
        read: true,
      },
    ],
  },
];

interface BuyerMessageThreadProps {
  messageId: number;
  onBack: () => void;
  replyText: string;
  setReplyText: (text: string) => void;
}

function BuyerMessageThread({ messageId, onBack, replyText, setReplyText }: BuyerMessageThreadProps) {
  const message = mockBuyerMessages.find((m) => m.id === messageId);
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
      isVendor: false,
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
          <h2 className="text-lg font-semibold text-black">{message.vendor}</h2>
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
                className={`flex ${msg.isVendor ? "justify-start" : "justify-end"} mb-4`}
              >
                <div className={`max-w-[70%] rounded-lg p-3 ${
                  msg.isVendor
                    ? "bg-gray-100 text-black"
                    : "bg-amber-50 text-black"
                }`}>
                  <p className="text-sm leading-relaxed mb-1">{msg.message}</p>
                  <div className="flex items-center gap-2 text-xs">
                    <span className={msg.isVendor ? "text-gray-600" : "text-gray-500"}>
                      {msg.sender}
                    </span>
                    <span className={msg.isVendor ? "text-gray-500" : "text-gray-400"}>
                      {msg.time || msg.timestamp}
                    </span>
                    {msg.isVendor && 'read' in msg && (msg as any).read && (
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

export default function BuyerDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "samples" | "settings" | "messages">("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

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
                {mockBuyerMessages.filter((m) => m.needsReply).length > 0 && (
                  <div className="p-4">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">Needs reply</h3>
                    <div className="space-y-2">
                      {mockBuyerMessages
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
                                    {message.vendor}
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
                    {mockBuyerMessages
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
                                  {message.vendor}
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
                <BuyerMessageThread
                  messageId={selectedMessage}
                  onBack={() => setSelectedMessage(null)}
                  replyText={replyText}
                  setReplyText={setReplyText}
                />
              )}
            </div>
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

