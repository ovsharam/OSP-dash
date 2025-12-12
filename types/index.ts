export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  vendor: Vendor;
  category: string;
  tags: string[];
  reviews?: ProductReview[];
  dimensions?: {
    length: number;
    width: number;
    height: number;
    weight: number;
  };
  shippingOptions: ShippingOption[];
  deals?: Deal[];
  offers?: Offer[];
  inStock: boolean;
  minOrderQuantity?: number;
  sampleAvailable: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  showWholesalePrice?: boolean; // If false, show "Unlock wholesale price"
}

export interface Vendor {
  id: string;
  name: string;
  logo?: string;
  rating?: number;
  reviewCount?: number;
  location?: string;
}

export interface ShippingOption {
  id: string;
  name: string;
  price: number;
  estimatedDays: number;
}

export interface Deal {
  id: string;
  name: string;
  discount: number;
  minQuantity?: number;
}

export interface Offer {
  id: string;
  name: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedShipping?: ShippingOption;
}

export interface User {
  id: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  businessName?: string;
  address?: Address;
  isAuthenticated: boolean;
  contractSigned?: boolean;
  // Seller profile
  sellerProfile?: SellerProfile;
}

export interface SellerProfile {
  id: string;
  email: string;
  password?: string; // Only for creation, not stored
  firstName: string;
  lastName: string;
  phone?: string;
  businessName: string;
  businessType: string;
  businessWebsite?: string;
  businessAddress: Address;
  createdAt: Date;
  isActive: boolean;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface CheckoutData {
  items: CartItem[];
  shippingAddress: Address;
  billingAddress?: Address;
  paymentMethod: PaymentMethod;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export interface PaymentMethod {
  type: 'card' | 'bank_transfer';
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  nameOnCard?: string;
}

export interface VendorProfile {
  id: string;
  businessName: string;
  email: string;
  phone?: string;
  address?: Address;
  description?: string;
  logo?: string;
  website?: string;
}

export interface VendorStats {
  totalSales: number;
  totalRevenue: number;
  totalCustomers: number;
  totalProducts: number;
  recentOrders: Order[];
}

export interface Customer {
  id: string;
  businessName: string;
  contactName: string;
  email: string;
  phone?: string;
  address?: Address;
  businessType?: string;
  taxId?: string;
  website?: string;
  contractSigned: boolean;
  contractSignedDate?: Date;
  totalOrders: number;
  totalSpent: number;
  firstOrderDate?: Date;
  lastOrderDate?: Date;
  status: 'active' | 'inactive' | 'prospect';
  tags: string[];
  notes: CustomerNote[];
  orders: Order[];
}

export interface CustomerNote {
  id: string;
  content: string;
  author: string;
  createdAt: Date;
  type: 'note' | 'call' | 'meeting' | 'email';
}

export interface CustomerActivity {
  id: string;
  type: 'order' | 'sample_request' | 'contract_signed' | 'note' | 'contact';
  description: string;
  date: Date;
  orderId?: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: Date;
  shippingAddress: Address;
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery?: Date;
  shippedDate?: Date;
  deliveredDate?: Date;
}

export interface SampleRequest {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  vendorName: string;
  status: 'pending' | 'approved' | 'shipped' | 'delivered' | 'rejected';
  requestedDate: Date;
  approvedDate?: Date;
  shippedDate?: Date;
  deliveredDate?: Date;
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery?: Date;
}

export interface ProductReview {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title?: string;
  comment: string;
  date: Date;
  verifiedPurchase: boolean;
  helpfulCount: number;
  images?: string[];
}

export interface ProductQuestion {
  id: string;
  productId: string;
  question: string;
  askedBy: string;
  askedDate: Date;
  answers: ProductAnswer[];
}

export interface ProductAnswer {
  id: string;
  answer: string;
  answeredBy: string;
  answeredDate: Date;
  isVendor: boolean;
}

export interface VendorProfileExtended extends VendorProfile {
  story?: string;
  certifications?: string[];
  socialLinks?: {
    website?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  foundedYear?: number;
  employeeCount?: string;
}

export interface BulkOrderTemplate {
  id: string;
  name: string;
  items: {
    productId: string;
    quantity: number;
  }[];
  createdAt: Date;
}

