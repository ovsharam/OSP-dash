import { Customer, CustomerNote, Order } from "@/types";
import { mockOrders } from "./mockBuyerData";

// Generate customer data from orders
const customer1Orders = mockOrders.filter((o) => o.customerEmail === "john@restaurant.com");
const customer2Orders: Order[] = [];
const customer3Orders: Order[] = [];

export const mockCustomers: Customer[] = [
  {
    id: "CUST-001",
    businessName: "Restaurant ABC",
    contactName: "John Doe",
    email: "john@restaurant.com",
    phone: "+1 (555) 123-4567",
    address: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
    },
    businessType: "Restaurant",
    taxId: "12-3456789",
    website: "https://www.restaurantabc.com",
    contractSigned: true,
    contractSignedDate: new Date("2023-12-01"),
    totalOrders: customer1Orders.length,
    totalSpent: customer1Orders.reduce((sum, o) => sum + o.total, 0),
    firstOrderDate: customer1Orders.length > 0 ? customer1Orders[customer1Orders.length - 1].orderDate : undefined,
    lastOrderDate: customer1Orders.length > 0 ? customer1Orders[0].orderDate : undefined,
    status: "active",
    tags: ["VIP", "Regular Customer", "High Volume"],
    notes: [
      {
        id: "NOTE-001",
        content: "Customer prefers organic products. Very satisfied with ginger root soda.",
        author: "Sales Team",
        createdAt: new Date("2024-01-10"),
        type: "note",
      },
      {
        id: "NOTE-002",
        content: "Follow-up call scheduled for next month to discuss bulk ordering.",
        author: "Sarah Johnson",
        createdAt: new Date("2024-01-12"),
        type: "call",
      },
    ],
    orders: customer1Orders,
  },
  {
    id: "CUST-002",
    businessName: "Cafe XYZ",
    contactName: "Jane Smith",
    email: "jane@cafexyz.com",
    phone: "+1 (555) 987-6543",
    address: {
      street: "456 Oak Avenue",
      city: "San Francisco",
      state: "CA",
      zipCode: "94102",
      country: "United States",
    },
    businessType: "Cafe",
    taxId: "98-7654321",
    website: "https://www.cafexyz.com",
    contractSigned: true,
    contractSignedDate: new Date("2023-11-15"),
    totalOrders: customer2Orders.length,
    totalSpent: customer2Orders.reduce((sum, o) => sum + o.total, 0),
    status: "active",
    tags: ["New Customer"],
    notes: [
      {
        id: "NOTE-003",
        content: "Interested in expanding beverage menu. Sent product catalog.",
        author: "Mike Chen",
        createdAt: new Date("2024-01-08"),
        type: "email",
      },
    ],
    orders: customer2Orders,
  },
  {
    id: "CUST-003",
    businessName: "Hotel Grand",
    contactName: "Robert Williams",
    email: "robert@hotelgrand.com",
    phone: "+1 (555) 456-7890",
    address: {
      street: "789 Park Boulevard",
      city: "Chicago",
      state: "IL",
      zipCode: "60601",
      country: "United States",
    },
    businessType: "Hotel",
    taxId: "45-6789012",
    website: "https://www.hotelgrand.com",
    contractSigned: false,
    totalOrders: customer3Orders.length,
    totalSpent: customer3Orders.reduce((sum, o) => sum + o.total, 0),
    status: "prospect",
    tags: ["Prospect", "High Potential"],
    notes: [
      {
        id: "NOTE-004",
        content: "Initial contact made. Waiting for contract signature.",
        author: "Sales Team",
        createdAt: new Date("2024-01-05"),
        type: "meeting",
      },
    ],
    orders: customer3Orders,
  },
  {
    id: "CUST-004",
    businessName: "Bistro Delight",
    contactName: "Maria Garcia",
    email: "maria@bistrodelight.com",
    phone: "+1 (555) 321-0987",
    address: {
      street: "321 Elm Street",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90001",
      country: "United States",
    },
    businessType: "Restaurant",
    taxId: "32-1098765",
    contractSigned: true,
    contractSignedDate: new Date("2023-10-20"),
    totalOrders: 0,
    totalSpent: 0,
    status: "inactive",
    tags: ["Inactive"],
    notes: [
      {
        id: "NOTE-005",
        content: "No orders in last 3 months. Follow up needed.",
        author: "Sales Team",
        createdAt: new Date("2024-01-01"),
        type: "note",
      },
    ],
    orders: [],
  },
];

export function getCustomerById(id: string): Customer | undefined {
  return mockCustomers.find((c) => c.id === id);
}

export function getCustomersByStatus(status: Customer["status"]): Customer[] {
  return mockCustomers.filter((c) => c.status === status);
}

export function getCustomersByTag(tag: string): Customer[] {
  return mockCustomers.filter((c) => c.tags.includes(tag));
}

