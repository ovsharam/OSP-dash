# Shopify Theme Translation Guide

This guide documents the translation of Next.js/Vercel components to Shopify Liquid templates.

## Structure

### Snippets (`snippets/`)
Reusable components that can be included in sections and templates:

- **`product-card.liquid`** - Product card component matching `ProductCard.tsx`
  - Features: Badges (New, Bestseller), wishlist toggle, comparison toggle, price display
  - Usage: `{% include 'product-card' %}`

- **`navbar.liquid`** - Main navigation matching `Navbar.tsx`
  - Features: Search bar, category navigation, auth states
  - Usage: Include in layout or header

- **`product-badge.liquid`** - Product badges (New, Bestseller, Sale)
  - Usage: `{% include 'product-badge' %}`

- **`pagination.liquid`** - Pagination component
  - Usage: `{% include 'pagination' %}`

### Sections (`sections/`)
Modular page sections for Online Store 2.0:

#### Homepage Sections
- **`hero-video.liquid`** - Animated hero with video background
  - Settings: Headlines, CTAs, video sources
  - Matches: `AnimatedHero.tsx`

- **`featured-products-carousel.liquid`** - Horizontal scrolling product carousel
  - Settings: Title, collection, products count, shop all link
  - Matches: `ProductCarousel.tsx`

- **`featured-brands.liquid`** - Brand showcase carousel
  - Settings: Title, brand collections, count
  - Matches: Featured brands section in `BrowseClient.tsx`

- **`newsletter-signup.liquid`** - Email signup form
  - Settings: Title, button text, placeholder
  - Matches: Newsletter section in `BrowseClient.tsx`

#### Collection Sections
- **`collection-header.liquid`** - Collection page header
  - Settings: Breadcrumbs, filter buttons
  - Matches: Header in `CollectionClient.tsx`

- **`collection-products.liquid`** - Product grid with filtering/sorting
  - Settings: Products per page, grid layout, quick add, filtering, sorting
  - Matches: Product grid in `CollectionClient.tsx`

- **`sidebar-filters.liquid`** - Collapsible sidebar filters
  - Settings: Category navigation, filter sections
  - Matches: `SidebarFilters.tsx`

- **`collection-description.liquid`** - Collection description display

#### Product Sections
- **`product-detail-sticky-atc.liquid`** - Sticky add to cart bar
  - Settings: Enable/disable, scroll offset
  - Matches: Sticky ATC functionality

- **`product-bundle.liquid`** - Frequently bought together / bundle products
  - Settings: Title, bundle products, discount display
  - Matches: Upsell/bundle functionality

- **`product-reviews.liquid`** - Customer reviews and Q&A
  - Settings: Enable reviews, enable Q&A
  - Matches: `ProductReviews.tsx`

- **`shipping-quote.liquid`** - Freight shipping quote calculator
  - Already exists in theme
  - Matches: `ProductShippingQuote.tsx`

### Templates (`templates/`)
JSON templates for Online Store 2.0:

- **`index.json`** - Homepage template
  - Sections: Hero video, featured brands, product carousels, newsletter
  - Modular and customizable via theme editor

- **`product.json`** - Product detail template
  - Sections: Main product, reviews, shipping quote, sticky ATC, upsells, bundles, related products
  - Enhanced with sticky ATC, upsell steps, bundle steps

- **`collection.json`** - Collection listing template
  - Sections: Header, description, sidebar filters, products grid
  - Enhanced with filtering/sorting UI and quick add

## Key Features Translated

### 1. Product Cards
- ✅ Badge system (New, Bestseller)
- ✅ Wishlist toggle
- ✅ Comparison toggle
- ✅ Price display with wholesale logic
- ✅ Vendor rating display

### 2. Navigation
- ✅ Top promotional bar
- ✅ Search functionality
- ✅ Category navigation
- ✅ Auth state handling

### 3. Filtering & Sorting
- ✅ Sidebar filters with collapsible sections
- ✅ Category navigation
- ✅ Sort dropdown
- ✅ Filter buttons (New, Low minimum, Top Shop)

### 4. Product Pages
- ✅ Sticky add to cart bar
- ✅ Upsell products carousel
- ✅ Bundle products section
- ✅ Reviews and Q&A
- ✅ Shipping quote calculator

### 5. Collection Pages
- ✅ Breadcrumbs
- ✅ Filter buttons
- ✅ Sidebar filters
- ✅ Product grid with quick add
- ✅ Pagination

## Usage Instructions

### 1. Install Theme Files
Upload all files to your Shopify theme maintaining the directory structure:
```
shopify-theme/
├── snippets/
├── sections/
└── templates/
```

### 2. Configure Templates
- Go to Online Store > Themes > Customize
- Navigate to each template type (Homepage, Product, Collection)
- The JSON templates will automatically load the configured sections

### 3. Customize Sections
- Each section has settings accessible via the theme editor
- Configure collections, titles, counts, etc. without code changes

### 4. Add to Layout
Include the navbar snippet in your theme layout:
```liquid
{% include 'navbar' %}
```

### 5. Metafields Required
Some features require metafields:
- `product.metafields.custom.vendor_rating` - Vendor rating
- `product.metafields.custom.review_count` - Review count
- `product.metafields.custom.min_order_quantity` - Minimum order quantity

## Path Preservation

As requested, the same paths are maintained:

- `/products/:handle` - Product detail pages (enhanced with sticky ATC, upsells, bundles)
- `/collections/:handle` - Collection pages (enhanced with filtering, sorting, quick add)
- `/` - Homepage (modular sections)

## Next Steps

1. **Test in Development Theme** - Upload to a development theme first
2. **Configure Collections** - Set up collections referenced in templates
3. **Add Metafields** - Create required metafields for enhanced features
4. **Customize Styling** - Adjust CSS classes to match your brand
5. **Test Functionality** - Test filtering, sorting, quick add, sticky ATC
6. **Review App Integration** - Integrate with a review app (Judge.me, Stamped.io, etc.)

## Notes

- JavaScript functionality is included inline in sections where needed
- Some features (wishlist, comparison) require additional app integration or custom JavaScript
- Review system requires a review app integration
- Shipping quote uses existing `shipping-quote.liquid` section
- All components maintain the same visual structure as Next.js components
