"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getOrderById } from "@/lib/mockBuyerData";

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const order = getOrderById(params.id as string);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">Order Not Found</h1>
          <button
            onClick={() => router.push("/buyer/orders")}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            href="/buyer/orders"
            className="text-sm text-gray-600 hover:text-black mb-4 inline-block"
          >
            ← Back to Orders
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-black mb-2">Order {order.id}</h1>
              <p className="text-gray-600">
                Placed on {order.orderDate.toLocaleDateString()}
              </p>
            </div>
            <span
              className={`inline-block px-4 py-2 text-sm font-semibold rounded ${getStatusColor(
                order.status
              )}`}
            >
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </div>
        </div>

        {/* Tracking Section */}
        {order.trackingNumber && (
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-black mb-4">Tracking Information</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tracking Number</p>
                  <p className="font-semibold text-black">{order.trackingNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Carrier</p>
                  <p className="font-semibold text-black">{order.carrier}</p>
                </div>
              </div>
              {order.estimatedDelivery && (
                <div>
                  <p className="text-sm text-gray-600">Estimated Delivery</p>
                  <p className="font-semibold text-black">
                    {order.estimatedDelivery.toLocaleDateString()}
                  </p>
                </div>
              )}
              {order.shippedDate && (
                <div>
                  <p className="text-sm text-gray-600">Shipped Date</p>
                  <p className="font-semibold text-black">
                    {order.shippedDate.toLocaleDateString()}
                  </p>
                </div>
              )}
              {order.deliveredDate && (
                <div>
                  <p className="text-sm text-gray-600">Delivered Date</p>
                  <p className="font-semibold text-black">
                    {order.deliveredDate.toLocaleDateString()}
                  </p>
                </div>
              )}
              <div className="pt-4 border-t border-gray-200">
                <a
                  href={`https://www.${order.carrier?.toLowerCase()}.com/track?tracking=${order.trackingNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:underline font-medium"
                >
                  Track on {order.carrier} website →
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Order Items */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-black mb-4">Order Items</h2>
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex items-start space-x-4 pb-4 border-b border-gray-100 last:border-0">
                <div className="relative w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                  <Image
                    src={item.product.images[0] || "/placeholder-product.jpg"}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="flex-1">
                  <Link
                    href={`/products/${item.product.id}`}
                    className="font-semibold text-black hover:underline"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-sm text-gray-600">{item.product.vendor.name}</p>
                  <p className="text-sm text-gray-600 mt-1">Quantity: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-black">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600">${item.product.price.toFixed(2)} each</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-black mb-4">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Shipping</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Tax</span>
              <span>$0.00</span>
            </div>
            <div className="border-t border-gray-200 pt-2 mt-2">
              <div className="flex justify-between font-bold text-black text-lg">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-black mb-4">Shipping Address</h2>
          <div className="text-gray-700">
            <p>{order.shippingAddress.street}</p>
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
            </p>
            <p>{order.shippingAddress.country}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

