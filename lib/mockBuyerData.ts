import { Order, SampleRequest } from "@/types";

export const mockOrders: Order[] = [
  {
    id: "ORD-001",
    customerName: "John Doe",
    customerEmail: "john@restaurant.com",
    items: [
      {
        product: {
          id: "p1",
          name: "Guanaja 70% Dark Chocolate Féves",
          description: "Valrhona’s legendary dark chocolate with an exceptionally bitter, deeply roasted flavor profile. Perfect for professional baking and enrobing.",
          price: 38.50,
          images: ["https://worldwidechocolate.com/wp-content/uploads/2021/05/Valrhona-Guanaja-70-Dark-Couverture-Chocolate-Feves-400x400.jpg"],
          vendor: { id: "v1", name: "Valrhona", rating: 4.9, reviewCount: 1250 },
          category: "Couverture & Baking",
          tags: ["Dark", "Féves", "70%", "Baking"],
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
          id: "p5",
          name: "811 Dark Recipe 54.5% Callets",
          description: "The universally trusted dark chocolate for professionals.",
          price: 28.00,
          images: ["https://worldwidechocolate.com/wp-content/uploads/2019/12/Callebaut-60-40-38-60.1-Dark-Chocolate-Callets-400x400.png"],
          vendor: { id: "v2", name: "Callebaut", rating: 4.8, reviewCount: 3400 },
          category: "Couverture & Baking",
          tags: ["Dark", "54.5%", "Callets", "Baking"],
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
          id: "p22",
          name: "Grand Cacao Drinking Chocolate",
          description: "A rich, European-style drinking chocolate.",
          price: 12.00,
          images: ["https://worldwidechocolate.com/wp-content/uploads/2019/01/Callebaut-100-Cocoa-Powder-CP776-400x400.png"],
          vendor: { id: "v8", name: "Guittard", rating: 4.7, reviewCount: 1560 },
          category: "Couverture & Baking",
          tags: ["Cocoa Powder", "Drinking Chocolate"],
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
    productName: "Guanaja 70% Dark Chocolate Féves",
    productImage: "https://worldwidechocolate.com/wp-content/uploads/2021/05/Valrhona-Guanaja-70-Dark-Couverture-Chocolate-Feves-400x400.jpg",
    vendorName: "Valrhona",
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
    productName: "811 Dark Recipe 54.5% Callets",
    productImage: "https://worldwidechocolate.com/wp-content/uploads/2019/12/Callebaut-60-40-38-60.1-Dark-Chocolate-Callets-400x400.png",
    vendorName: "Callebaut",
    status: "approved",
    requestedDate: new Date("2024-01-12"),
    approvedDate: new Date("2024-01-13"),
  },
  {
    id: "SAMPLE-003",
    productId: "12",
    productName: "W2 White Recipe 28% Callets",
    productImage: "https://worldwidechocolate.com/wp-content/uploads/2020/02/Allez-Blanche-33-White-Chocolate-Chips-400x400.jpg",
    vendorName: "Callebaut",
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

