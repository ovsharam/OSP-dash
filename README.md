# OSP Marketplace - B2B Wholesale Platform

A modern B2B marketplace platform inspired by Faire.com, built with Next.js, TypeScript, and Tailwind CSS.

## Features

### Customer/Buyer Features
- **Product Browsing**: Browse products with card grid layout
- **Search & Filters**: Search products by name, vendor, or category with advanced filtering options
- **Product Details**: View comprehensive product information including:
  - Product descriptions, prices, and deals
  - Dimensions and specifications
  - Shipping options
  - Special offers
- **Shopping Cart**: Add products to cart with quantity selection
- **Checkout**: Complete checkout with:
  - Shipping and billing address
  - Payment method entry
  - Accurate pricing with tax calculations
- **Sample Requests**: Request product samples with authentication flow and contract signing

### Vendor/Seller Features
- **Vendor Login**: Secure vendor authentication
- **Dashboard**: Comprehensive vendor dashboard with:
  - Sales and revenue analytics
  - Customer management
  - Order management
  - Product catalog management
- **Product Management**: Create and manage product listings
- **Profile Management**: Update vendor profile information

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Image Optimization**: Next.js Image component

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
OSP Marketplace/
├── app/                    # Next.js app directory
│   ├── browse/            # Product browsing page
│   ├── products/          # Product detail pages
│   ├── cart/              # Shopping cart page
│   ├── checkout/          # Checkout page
│   ├── sample-request/    # Sample request flow
│   ├── vendor/            # Vendor pages
│   │   ├── login/         # Vendor login
│   │   └── dashboard/    # Vendor dashboard
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── Navbar.tsx        # Navigation bar
│   ├── ProductCard.tsx   # Product card component
│   └── ProductFilters.tsx # Filter component
├── contexts/              # React contexts
│   ├── AuthContext.tsx   # Authentication context
│   └── CartContext.tsx   # Shopping cart context
├── lib/                   # Utilities and data
│   └── mockData.ts       # Mock product data
└── types/                 # TypeScript type definitions
    └── index.ts          # Shared types
```

## Design System

The platform uses a clean black and white design inspired by Faire.com:
- **Primary Color**: Black (#000000)
- **Background**: White (#FFFFFF) with light gray (#F9FAFB) for sections
- **Text**: Black for headings, gray for secondary text
- **Borders**: Light gray (#E5E7EB)
- **Hover States**: Subtle gray transitions

## Features in Detail

### Product Browsing
- Grid layout with responsive columns
- Real-time search functionality
- Advanced filtering by category, vendor, price range, stock status
- Product cards showing key information at a glance

### Product Details
- High-quality product images with gallery
- Comprehensive product information
- Shipping options selection
- Quantity selection with minimum order requirements
- Add to cart functionality
- Sample request button (triggers authentication flow)

### Shopping Cart
- View all cart items
- Update quantities
- Remove items
- See order summary with subtotal, shipping, tax, and total
- Proceed to checkout

### Checkout
- Shipping address form
- Billing address (can be same as shipping)
- Payment method entry
- Real-time tax calculation (8% estimated)
- Order confirmation

### Sample Request Flow
1. **Authentication**: Login or sign up
2. **Business Information**: Fill out business details
3. **Contract**: Read and accept sample request agreement
4. **Access**: Once authenticated and contract signed, users can request samples

### Vendor Dashboard
- **Overview**: Key metrics (sales, revenue, customers, products)
- **Products**: Manage product catalog, add new products
- **Orders**: View and manage customer orders
- **Customers**: Customer management interface
- **Profile**: Update vendor profile information

## Mock Data

The application currently uses mock data for products. In a production environment, you would:
- Connect to a database (PostgreSQL, MongoDB, etc.)
- Implement API routes for CRUD operations
- Add authentication with a service like Auth0 or NextAuth
- Integrate payment processing (Stripe, PayPal, etc.)
- Add real-time inventory management

## Next Steps

To make this production-ready:

1. **Backend Integration**
   - Set up a database (PostgreSQL recommended)
   - Create API routes for products, orders, users
   - Implement authentication with JWT or OAuth

2. **Payment Processing**
   - Integrate Stripe or PayPal
   - Add secure payment handling
   - Implement order processing

3. **File Uploads**
   - Add image upload functionality for products
   - Implement CSV import for bulk product uploads

4. **Email Notifications**
   - Order confirmations
   - Sample request confirmations
   - Vendor notifications

5. **Advanced Features**
   - Product reviews and ratings
   - Wishlist functionality
   - Order tracking
   - Vendor analytics dashboard
   - Bulk ordering tools

## License

ISC

