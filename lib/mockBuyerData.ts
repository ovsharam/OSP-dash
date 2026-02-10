import { Order, SampleRequest } from "@/types";

export const mockOrders: Order[] = [
  {
    id: "ORD-001",
    customerName: "John Doe",
    customerEmail: "john@restaurant.com",
    items: [
      {
        product: {
          id: "1",
          name: "Organic Ginger Root Soda",
          description: "Crisp and refreshing organic ginger root soda",
          price: 2.49,
          images: ["https://images.unsplash.com/photo-1554866585-cd94860890b7?w=800"],
          vendor: { id: "v1", name: "Pure Soda Co.", rating: 4.9, reviewCount: 127 },
          category: "Beverages",
          tags: ["organic", "ginger"],
          shippingOptions: [],
          inStock: true,
          sampleAvailable: true,
        },
        quantity: 48,
      },
    ],
    total: 119.52,
    status: "shipped",
    orderDate: new Date("2024-01-10"),
    shippingAddress: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
    },
    trackingNumber: "1Z999AA10123456784",
    carrier: "UPS",
    estimatedDelivery: new Date("2024-01-15"),
    shippedDate: new Date("2024-01-12"),
  },
  {
    id: "ORD-002",
    customerName: "John Doe",
    customerEmail: "john@restaurant.com",
    items: [
      {
        product: {
          id: "2",
          name: "Organic Lemon Lime Sparkling Water",
          description: "Naturally flavored organic sparkling water",
          price: 1.99,
          images: ["https://images.unsplash.com/photo-1523362628745-0c100150b504?w=800"],
          vendor: { id: "v2", name: "Sparkle Beverages", rating: 4.8, reviewCount: 89 },
          category: "Beverages",
          tags: ["organic", "sparkling"],
          shippingOptions: [],
          inStock: true,
          sampleAvailable: true,
        },
        quantity: 72,
      },
    ],
    total: 143.28,
    status: "delivered",
    orderDate: new Date("2024-01-05"),
    shippingAddress: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
    },
    trackingNumber: "9400111899223197428490",
    carrier: "USPS",
    deliveredDate: new Date("2024-01-08"),
    shippedDate: new Date("2024-01-06"),
  },
  {
    id: "ORD-003",
    customerName: "John Doe",
    customerEmail: "john@restaurant.com",
    items: [
      {
        product: {
          id: "13",
          name: "Commercial Soda Dispenser System",
          description: "Professional-grade commercial soda dispenser",
          price: 2499.99,
          images: ["https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800"],
          vendor: { id: "v5", name: "Beverage Equipment Pro", rating: 4.8, reviewCount: 234 },
          category: "Equipment",
          tags: ["dispenser", "commercial"],
          shippingOptions: [],
          inStock: true,
          sampleAvailable: false,
        },
        quantity: 1,
      },
    ],
    total: 2499.99,
    status: "processing",
    orderDate: new Date("2024-01-14"),
    shippingAddress: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
    },
    estimatedDelivery: new Date("2024-01-24"),
  },
];

export const mockSampleRequests: SampleRequest[] = [
  {
    id: "SAMPLE-001",
    productId: "1",
    productName: "Organic Ginger Root Soda",
    productHandle: "organic-ginger-root-soda",
    productImage: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=800",
    vendorName: "Pure Soda Co.",
    status: "shipped",
    requestedDate: new Date("2024-01-08"),
    approvedDate: new Date("2024-01-09"),
    shippedDate: new Date("2024-01-10"),
    trackingNumber: "1Z999AA10123456785",
    carrier: "UPS",
    estimatedDelivery: new Date("2024-01-13"),
  },
  {
    id: "SAMPLE-002",
    productId: "5",
    productName: "Organic Orange Cream Soda",
    productHandle: "organic-orange-cream-soda",
    productImage: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800",
    vendorName: "Sparkle Beverages",
    status: "approved",
    requestedDate: new Date("2024-01-12"),
    approvedDate: new Date("2024-01-13"),
  },
  {
    id: "SAMPLE-003",
    productId: "12",
    productName: "Organic Watermelon Mint Soda",
    productHandle: "organic-watermelon-mint-soda",
    productImage: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800",
    vendorName: "Pure Soda Co.",
    status: "delivered",
    requestedDate: new Date("2024-01-01"),
    approvedDate: new Date("2024-01-02"),
    shippedDate: new Date("2024-01-03"),
    deliveredDate: new Date("2024-01-05"),
    trackingNumber: "9400111899223197428491",
    carrier: "USPS",
  },
];

export function getOrderById(id: string): Order | undefined {
  return mockOrders.find((o) => o.id === id);
}

export function getSampleRequestById(id: string): SampleRequest | undefined {
  return mockSampleRequests.find((s) => s.id === id);
}

