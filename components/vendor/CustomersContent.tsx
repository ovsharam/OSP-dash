"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { mockCustomers } from "@/lib/mockCustomerData";
import { Customer } from "@/types";

interface CustomersContentProps {
  onCustomerSelect?: (customerId: string) => void;
}

export default function CustomersContent({ onCustomerSelect }: CustomersContentProps = {}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | Customer["status"]>("all");
  const [tagFilter, setTagFilter] = useState<string>("all");

  const allTags = Array.from(new Set(mockCustomers.flatMap((c) => c.tags)));

  const filteredCustomers = useMemo(() => {
    let filtered = [...mockCustomers];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (customer) =>
          customer.businessName.toLowerCase().includes(query) ||
          customer.contactName.toLowerCase().includes(query) ||
          customer.email.toLowerCase().includes(query)
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((customer) => customer.status === statusFilter);
    }

    // Tag filter
    if (tagFilter !== "all") {
      filtered = filtered.filter((customer) => customer.tags.includes(tagFilter));
    }

    return filtered;
  }, [searchQuery, statusFilter, tagFilter]);

  const stats = {
    total: mockCustomers.length,
    active: mockCustomers.filter((c) => c.status === "active").length,
    inactive: mockCustomers.filter((c) => c.status === "inactive").length,
    prospects: mockCustomers.filter((c) => c.status === "prospect").length,
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-sm text-gray-600 mb-1">Total Customers</p>
          <p className="text-2xl font-bold text-black">{stats.total}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-sm text-gray-600 mb-1">Active</p>
          <p className="text-2xl font-bold text-green-600">{stats.active}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-sm text-gray-600 mb-1">Inactive</p>
          <p className="text-2xl font-bold text-gray-600">{stats.inactive}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-sm text-gray-600 mb-1">Prospects</p>
          <p className="text-2xl font-bold text-yellow-600">{stats.prospects}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-black"
            />
          </div>
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-black"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="prospect">Prospects</option>
            </select>
          </div>
          <div>
            <select
              value={tagFilter}
              onChange={(e) => setTagFilter(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black text-black"
            >
              <option value="all">All Tags</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Customers Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Business Name
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Contact</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Orders</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Total Spent
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Contract</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div>
                      {onCustomerSelect ? (
                        <button
                          onClick={() => onCustomerSelect(customer.id)}
                          className="font-semibold text-black hover:underline text-left"
                        >
                          {customer.businessName}
                        </button>
                      ) : (
                        <Link
                          href={`/vendor/customers/${customer.id}`}
                          className="font-semibold text-black hover:underline"
                        >
                          {customer.businessName}
                        </Link>
                      )}
                      <p className="text-xs text-gray-500">{customer.businessType}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-sm text-gray-900">{customer.contactName}</p>
                      <p className="text-xs text-gray-500">{customer.email}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
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
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">{customer.totalOrders}</td>
                  <td className="py-3 px-4 text-sm font-semibold text-black">
                    ${customer.totalSpent.toFixed(2)}
                  </td>
                  <td className="py-3 px-4">
                    {customer.contractSigned ? (
                      <span className="text-green-600 text-sm font-medium">✓ Signed</span>
                    ) : (
                      <span className="text-red-600 text-sm font-medium">Not Signed</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {onCustomerSelect ? (
                      <button
                        onClick={() => onCustomerSelect(customer.id)}
                        className="text-sm text-black hover:underline"
                      >
                        View Details
                      </button>
                    ) : (
                      <Link
                        href={`/vendor/customers/${customer.id}`}
                        className="text-sm text-black hover:underline"
                      >
                        View Details
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

