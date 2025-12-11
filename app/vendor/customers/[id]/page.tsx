"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getCustomerById } from "@/lib/mockCustomerData";
import { CustomerNote } from "@/types";

export default function CustomerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const customer = getCustomerById(params.id as string);
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "contract" | "notes">("overview");
  const [newNote, setNewNote] = useState("");

  if (!customer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">Customer Not Found</h1>
          <button
            onClick={() => router.push("/vendor/dashboard")}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleAddNote = () => {
    if (newNote.trim()) {
      // In a real app, this would save to the backend
      alert("Note added successfully!");
      setNewNote("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            href="/vendor/dashboard"
            className="text-sm text-gray-600 hover:text-black mb-4 inline-block"
          >
            ← Back to Customers
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-black mb-2">{customer.businessName}</h1>
              <p className="text-gray-600">{customer.businessType}</p>
            </div>
            <span
              className={`inline-block px-4 py-2 text-sm font-semibold rounded ${
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
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-gray-200 mb-6">
          <div className="flex space-x-8">
            {[
              { id: "overview", label: "Overview" },
              { id: "orders", label: "Orders" },
              { id: "contract", label: "Contract" },
              { id: "notes", label: "Notes & Activity" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-black text-black"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <p className="text-sm text-gray-600 mb-1">Total Orders</p>
                <p className="text-2xl font-bold text-black">{customer.totalOrders}</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <p className="text-sm text-gray-600 mb-1">Total Spent</p>
                <p className="text-2xl font-bold text-black">${customer.totalSpent.toFixed(2)}</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <p className="text-sm text-gray-600 mb-1">First Order</p>
                <p className="text-sm font-semibold text-black">
                  {customer.firstOrderDate
                    ? customer.firstOrderDate.toLocaleDateString()
                    : "No orders yet"}
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <p className="text-sm text-gray-600 mb-1">Last Order</p>
                <p className="text-sm font-semibold text-black">
                  {customer.lastOrderDate
                    ? customer.lastOrderDate.toLocaleDateString()
                    : "No orders yet"}
                </p>
              </div>
            </div>

            {/* Business Information */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-bold text-black mb-4">Business Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Contact Name</p>
                  <p className="font-semibold text-black">{customer.contactName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Email</p>
                  <p className="font-semibold text-black">{customer.email}</p>
                </div>
                {customer.phone && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Phone</p>
                    <p className="font-semibold text-black">{customer.phone}</p>
                  </div>
                )}
                {customer.website && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Website</p>
                    <a
                      href={customer.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-black hover:underline"
                    >
                      {customer.website}
                    </a>
                  </div>
                )}
                {customer.taxId && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Tax ID / EIN</p>
                    <p className="font-semibold text-black">{customer.taxId}</p>
                  </div>
                )}
                {customer.address && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Address</p>
                    <p className="font-semibold text-black">
                      {customer.address.street}
                      <br />
                      {customer.address.city}, {customer.address.state} {customer.address.zipCode}
                      <br />
                      {customer.address.country}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            {customer.tags.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-bold text-black mb-4">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {customer.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Notes */}
            {customer.notes.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-black">Recent Notes</h2>
                  <button
                    onClick={() => setActiveTab("notes")}
                    className="text-sm text-gray-600 hover:text-black"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {customer.notes.slice(0, 3).map((note) => (
                    <div key={note.id} className="border-l-4 border-gray-300 pl-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-black">{note.author}</span>
                        <span className="text-xs text-gray-500">
                          {note.createdAt.toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{note.content}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                        {note.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-black mb-6">Order History</h2>
            {customer.orders.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p>No orders yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {customer.orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-black">{order.id}</p>
                        <p className="text-sm text-gray-600">
                          {order.items.length} item{order.items.length > 1 ? "s" : ""} •{" "}
                          {order.orderDate.toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <p className="font-semibold text-black">${order.total.toFixed(2)}</p>
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
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Contract Tab */}
        {activeTab === "contract" && (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-black mb-6">Contract Information</h2>
            {customer.contractSigned ? (
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="font-semibold text-green-800">Contract Signed</span>
                  </div>
                  {customer.contractSignedDate && (
                    <p className="text-sm text-gray-700">
                      Signed on: {customer.contractSignedDate.toLocaleDateString()}
                    </p>
                  )}
                </div>
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-black mb-4">Contract Details</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-gray-600">Business Name:</p>
                      <p className="font-semibold text-black">{customer.businessName}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Contact:</p>
                      <p className="font-semibold text-black">{customer.contactName}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Email:</p>
                      <p className="font-semibold text-black">{customer.email}</p>
                    </div>
                    {customer.taxId && (
                      <div>
                        <p className="text-gray-600">Tax ID:</p>
                        <p className="font-semibold text-black">{customer.taxId}</p>
                      </div>
                    )}
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <button className="bg-black text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-800 transition-colors">
                      Download Contract PDF
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <svg
                    className="w-5 h-5 text-yellow-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <span className="font-semibold text-yellow-800">Contract Not Signed</span>
                </div>
                <p className="text-sm text-gray-700">
                  This customer has not signed a contract yet. Contact them to complete the contract
                  process.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Notes Tab */}
        {activeTab === "notes" && (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-black">Notes & Activity</h2>
            </div>

            {/* Add Note Form */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-black mb-3">Add Note</h3>
              <div className="space-y-3">
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add a note about this customer..."
                  rows={3}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-black"
                />
                <div className="flex space-x-2">
                  <button
                    onClick={handleAddNote}
                    className="bg-black text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-800 transition-colors"
                  >
                    Add Note
                  </button>
                  <select className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black text-black">
                    <option value="note">Note</option>
                    <option value="call">Call</option>
                    <option value="meeting">Meeting</option>
                    <option value="email">Email</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Notes List */}
            <div className="space-y-4">
              {customer.notes.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p>No notes yet. Add your first note above.</p>
                </div>
              ) : (
                customer.notes.map((note) => (
                  <div key={note.id} className="border-l-4 border-gray-300 pl-4 py-2">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-black">{note.author}</span>
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                          {note.type}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {note.createdAt.toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{note.content}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

