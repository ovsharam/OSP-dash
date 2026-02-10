"use client";

import Link from "next/link";
import Image from "next/image";
import { mockSampleRequests } from "@/lib/mockBuyerData";
import { getProductByHandle, getProductUrl } from "@/lib/mockData";

export default function SamplesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-black mb-2">Sample Requests</h1>
            <p className="text-gray-600">Track your sample requests</p>
          </div>
          <Link
            href="/browse"
            className="bg-black text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Request New Sample
          </Link>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="space-y-4">
            {mockSampleRequests.map((sample) => (
              <div
                key={sample.id}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start space-x-4">
                  <div className="relative w-24 h-24 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                    <Image
                      src={sample.productImage}
                      alt={sample.productName}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <Link
                          href={(() => {
                            const product = getProductByHandle(sample.productHandle || sample.productId);
                            return product ? getProductUrl(product) : `/products/${sample.productHandle || sample.productId}`;
                          })()}
                          className="font-semibold text-black hover:underline"
                        >
                          {sample.productName}
                        </Link>
                        <p className="text-sm text-gray-600">{sample.vendorName}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Requested: {sample.requestedDate.toLocaleDateString()}
                        </p>
                        {sample.approvedDate && (
                          <p className="text-xs text-gray-500">
                            Approved: {sample.approvedDate.toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <span
                        className={`inline-block px-3 py-1 text-xs font-semibold rounded ${sample.status === "delivered"
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
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Tracking:</span> {sample.trackingNumber}
                            </p>
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Carrier:</span> {sample.carrier}
                            </p>
                            {sample.estimatedDelivery && (
                              <p className="text-sm text-gray-600 mt-1">
                                Estimated delivery: {sample.estimatedDelivery.toLocaleDateString()}
                              </p>
                            )}
                          </div>
                          {sample.carrier && (
                            <a
                              href={`https://www.${sample.carrier.toLowerCase()}.com/track?tracking=${sample.trackingNumber}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-black hover:underline text-sm font-medium"
                            >
                              Track Package →
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

