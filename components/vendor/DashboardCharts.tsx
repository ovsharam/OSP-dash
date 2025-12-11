"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#000000", "#4B5563", "#9CA3AF", "#D1D5DB", "#E5E7EB"];

// Mock sales data for the last 6 months
const salesData = [
  { month: "Jul", sales: 12000, revenue: 9600 },
  { month: "Aug", sales: 15000, revenue: 12000 },
  { month: "Sep", sales: 18000, revenue: 14400 },
  { month: "Oct", sales: 22000, revenue: 17600 },
  { month: "Nov", sales: 25000, revenue: 20000 },
  { month: "Dec", sales: 28000, revenue: 22400 },
];

// Mock top products data
const topProductsData = [
  { name: "Ginger Root Soda", sales: 4500 },
  { name: "Sparkling Water", sales: 3800 },
  { name: "Lemon Lime Soda", sales: 3200 },
  { name: "Bamboo Straws", sales: 2800 },
  { name: "Wheat Straw Plates", sales: 2400 },
];

// Mock customer acquisition data
const customerAcquisitionData = [
  { month: "Jul", new: 5, returning: 12 },
  { month: "Aug", new: 8, returning: 15 },
  { month: "Sep", new: 12, returning: 18 },
  { month: "Oct", new: 15, returning: 22 },
  { month: "Nov", new: 18, returning: 25 },
  { month: "Dec", new: 22, returning: 28 },
];

export default function DashboardCharts() {
  return (
    <div className="space-y-6">
      {/* Sales Trend Chart */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-black mb-4">Sales Trend (Last 6 Months)</h3>
        <div className="w-full" style={{ height: "300px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#000000"
                strokeWidth={2}
                name="Total Sales"
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#4B5563"
                strokeWidth={2}
                name="Revenue"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Revenue by Month */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-black mb-4">Revenue by Month</h3>
        <div className="w-full" style={{ height: "300px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="revenue" fill="#000000" name="Revenue ($)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products Pie Chart */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-black mb-4">Top Products</h3>
          <div className="w-full" style={{ height: "300px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={topProductsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="sales"
                >
                  {topProductsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Customer Acquisition */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-black mb-4">Customer Acquisition</h3>
          <div className="w-full" style={{ height: "300px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={customerAcquisitionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="new" fill="#000000" name="New Customers" />
                <Bar dataKey="returning" fill="#4B5563" name="Returning Customers" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

