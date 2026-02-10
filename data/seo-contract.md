# SEO Contract: Non-Negotiable Invariants for Shopify Rebuild

**Document Version**: 1.0  
**Date**: January 2026  
**Purpose**: Define the non-negotiable SEO rules that must be preserved during the Shopify rebuild. This contract applies to all environments: Next.js dev, Shopify staging, and Shopify production.

---

## Core Principle

**Google must see the rebuild as "same site, better UX" — not a new site.**

This means:
- Same URLs
- Same content intent
- Same internal link structure
- Same crawl paths

Everything else (design, layout, performance) can change.

---

## 1. URL Invariants

### 1.1 Product URLs

**Rule**: Product URLs must remain exactly as they are today.

**Format**: `https://organicsodapops.com/products/{handle}`

**Requirements**:
- ✅ Product handles **must not change**
- ✅ URL structure **must not change**
- ✅ Canonical tags **must point to exact product URL** (no query params)
- ✅ No trailing slashes
- ✅ No uppercase letters in handles

**Example**:
- ✅ `https://organicsodapops.com/products/organic-ginger-root-soda`
- ❌ `https://organicsodapops.com/products/Organic-Ginger-Root-Soda`
- ❌ `https://organicsodapops.com/products/organic-ginger-root-soda/`
- ❌ `https://organicsodapops.com/products/organic-ginger-root-soda?variant=123`

### 1.2 Collection URLs

**Rule**: Collection URLs must remain exactly as they are today.

**Format**: `https://organicsodapops.com/collections/{handle}`

**Requirements**:
- ✅ Collection handles **must not change**
- ✅ URL structure **must not change**
- ✅ Canonical tags **must point to exact collection URL** (no query params)
- ✅ No trailing slashes
- ✅ No uppercase letters in handles

**Example**:
- ✅ `https://organicsodapops.com/collections/organic-sodas`
- ❌ `https://organicsodapops.com/collections/Organic-Sodas`
- ❌ `https://organicsodapops.com/collections/organic-sodas/`

### 1.3 Page URLs

**Rule**: Page URLs must remain exactly as they are today.

**Format**: `https://organicsodapops.com/pages/{handle}`

**Requirements**:
- ✅ Page handles **must not change**
- ✅ Canonical tags **must point to exact page URL**

### 1.4 Query Parameter Handling

**Rule**: Canonical URLs must never include query parameters.

**Requirements**:
- ✅ Canonical tag must strip all query params (`?variant=123`, `?utm_source=...`, etc.)
- ✅ Internal links should use clean URLs (no tracking params)
- ✅ Tracking params can exist in URLs, but canonical must be clean

**Example**:
- URL: `https://organicsodapops.com/products/organic-ginger-root-soda?variant=123&utm_source=email`
- Canonical: `https://organicsodapops.com/products/organic-ginger-root-soda`

---

## 2. Content Invariants

### 2.1 Product Descriptions

**Rule**: Product description HTML must be visible by default in initial HTML.

**Requirements**:
- ✅ Full product description must be in initial HTML (not lazy-loaded)
- ✅ Description must not be hidden behind tabs/accordions by default
- ✅ Description must not require JavaScript to render
- ✅ Description HTML structure must be preserved (headings, lists, formatting)

**Allowed**:
- ✅ Secondary content (specs, reviews) can be in tabs/accordions
- ✅ "Read more" expandable sections are OK if initial content is substantial

**Not Allowed**:
- ❌ Description hidden in collapsed tabs
- ❌ Description loaded via JavaScript/AJAX
- ❌ Description truncated to first 100 characters

### 2.2 Collection Descriptions

**Rule**: Collection descriptions must be indexable and visible.

**Requirements**:
- ✅ Collection description must be visible on collection page
- ✅ Description must be in initial HTML (not JS-loaded)
- ✅ Description HTML structure must be preserved

### 2.3 H1 Tags

**Rule**: Each page must have exactly one H1 tag.

**Requirements**:
- ✅ Product pages: H1 = Product Title
- ✅ Collection pages: H1 = Collection Title
- ✅ Page pages: H1 = Page Title
- ✅ No duplicate H1s
- ✅ H1 must be visible in initial HTML

### 2.4 Title Tags

**Rule**: Title tags must preserve primary keywords and brand.

**Requirements**:
- ✅ Use Shopify SEO Title if set, else Product/Collection Title
- ✅ Include brand name: `{Title} | OSP Marketplace` or `{Title} | Organic Soda Pops`
- ✅ Length: 50-60 characters (optimal)
- ✅ Must be unique per page

---

## 3. Internal Linking Invariants

### 3.1 Navigation Menus

**Rule**: Navigation menus must link to canonical URLs.

**Requirements**:
- ✅ Header menu links must use canonical URLs
- ✅ Footer menu links must use canonical URLs
- ✅ Mobile menu links must use canonical URLs
- ✅ No query parameters in menu links
- ✅ No broken links

### 3.2 Product Cross-Links

**Rule**: Product cross-links must use canonical URLs.

**Requirements**:
- ✅ Related products must link to canonical URLs
- ✅ "You may also like" sections must use canonical URLs
- ✅ Product carousels must use canonical URLs

### 3.3 Collection Cross-Links

**Rule**: Collection cross-links must use canonical URLs.

**Requirements**:
- ✅ Collection navigation must use canonical URLs
- ✅ Category links must use canonical URLs

### 3.4 Breadcrumbs

**Rule**: Breadcrumbs must use canonical URLs.

**Requirements**:
- ✅ Breadcrumb links must use canonical URLs
- ✅ Breadcrumb structure must be preserved
- ✅ Breadcrumb schema must be present

### 3.5 Menu Source Preservation

**Rule**: Navigation and footer menu sources must not change.

**Requirements**:
- ✅ Footer menu source must remain unchanged (no accidental removal of links)
- ✅ Header menu source must remain unchanged
- ✅ Menu links must remain canonical (no query params)
- ✅ No mailto: or external links accidentally removed during rebuild
- ✅ Menu structure (hierarchy, order) must be preserved

**Critical**: Menus are one of the easiest SEO leaks during redesigns. Any menu changes must be explicitly approved.

---

## 4. Schema Markup Invariants

### 4.1 Product Schema

**Rule**: Product schema must be present on all product pages.

**Required Fields**:
- ✅ `@type`: "Product"
- ✅ `name`: Product title
- ✅ `image`: Product images (array)
- ✅ `description`: Product description
- ✅ `brand`: Brand name
- ✅ `offers`: Price, currency, availability

**Format**: JSON-LD in `<head>` or inline script

**Example**:
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Organic Ginger Root Soda",
  "image": ["https://organicsodapops.com/image1.jpg"],
  "description": "Crisp and refreshing...",
  "brand": {
    "@type": "Brand",
    "name": "Pure Soda Co."
  },
  "offers": {
    "@type": "Offer",
    "url": "https://organicsodapops.com/products/organic-ginger-root-soda",
    "priceCurrency": "USD",
    "price": "2.49",
    "availability": "https://schema.org/InStock"
  }
}
```

### 4.2 Breadcrumb Schema

**Rule**: Breadcrumb schema must be present on all product and collection pages.

**Required Fields**:
- ✅ `@type`: "BreadcrumbList"
- ✅ `itemListElement`: Array of breadcrumb items with position, name, item (URL)

**Format**: JSON-LD in `<head>` or inline script

### 4.3 Organization Schema

**Rule**: Organization schema must be present on homepage.

**Required Fields**:
- ✅ `@type`: "Organization"
- ✅ `name`: Company name
- ✅ `url`: Website URL
- ✅ `logo`: Logo URL

---

## 5. Metadata Invariants

### 5.1 Meta Descriptions

**Rule**: Meta descriptions must be present and optimized.

**Requirements**:
- ✅ Use Shopify SEO Description if set, else excerpt from description
- ✅ Length: 150-160 characters (optimal)
- ✅ Must be unique per page
- ✅ Must include primary keyword

### 5.2 OpenGraph Tags

**Rule**: OpenGraph tags must be present on all pages.

**Required Tags**:
- ✅ `og:title`
- ✅ `og:description`
- ✅ `og:url` (canonical URL)
- ✅ `og:image`
- ✅ `og:type` (website for pages, product for products)

### 5.3 Twitter Card Tags

**Rule**: Twitter Card tags must be present on all pages.

**Required Tags**:
- ✅ `twitter:card` (summary_large_image)
- ✅ `twitter:title`
- ✅ `twitter:description`
- ✅ `twitter:image`

---

## 6. Technical Invariants

### 6.1 JavaScript Requirements

**Rule**: Primary content must not require JavaScript to render.

**Requirements**:
- ✅ Product title must be in initial HTML
- ✅ Product description must be in initial HTML
- ✅ H1 must be in initial HTML
- ✅ Navigation links must be in initial HTML
- ✅ Images must have src attributes (not lazy-loaded by default)

**Allowed**:
- ✅ JavaScript for interactivity (filters, cart, etc.)
- ✅ Lazy-loading images below the fold
- ✅ Progressive enhancement

**Not Allowed**:
- ❌ Content rendered only via JavaScript
- ❌ Single Page Application (SPA) architecture for product pages
- ❌ Client-side routing for product/collection pages

### 6.2 Image SEO

**Rule**: All images must have proper SEO attributes.

**Requirements**:
- ✅ All product images must have alt text
- ✅ Alt text must be descriptive (not "image1.jpg")
- ✅ Image filenames should be descriptive (not random strings)
- ✅ Images must be properly sized/compressed

### 6.3 Sitemap

**Rule**: Sitemap must include all products and collections.

**Requirements**:
- ✅ All active products must be in sitemap
- ✅ All active collections must be in sitemap
- ✅ Sitemap must be accessible at `/sitemap.xml`
- ✅ Sitemap must be submitted to Google Search Console

### 6.4 Robots.txt

**Rule**: Robots.txt must allow crawling of all product/collection pages.

**Requirements**:
- ✅ Must not block `/products/`
- ✅ Must not block `/collections/`
- ✅ Must allow all search engines
- ✅ Can block admin/checkout pages

---

## 7. Next.js Dev Site Requirements

### 7.1 Indexing Rules

**Rule**: Next.js dev site must never be indexed by Google.

**Requirements**:
- ✅ Global `noindex, nofollow` meta tag on all pages
- ✅ Robots.txt must disallow all crawling
- ✅ X-Robots-Tag header: `noindex, nofollow`

### 7.2 URL Structure

**Rule**: Next.js dev site must use Shopify-shaped URLs for testing.

**Requirements**:
- ✅ Product pages: `/products/{handle}` (not nested)
- ✅ Collection pages: `/collections/{handle}` (not nested)
- ✅ Canonical tags must point to Shopify production URLs
- ✅ Example: `<link rel="canonical" href="https://organicsodapops.com/products/{handle}">`

**Purpose**: Next.js URLs are for design/QA validation only, not SEO.

---

## 8. Shopify Staging Requirements

### 8.1 Preview URLs

**Rule**: Shopify staging theme preview URLs must be crawlable for validation.

**Requirements**:
- ✅ Theme preview URLs must be accessible
- ✅ Preview URLs must have same structure as production
- ✅ Preview URLs can be noindex (but must be crawlable via Screaming Frog)

### 8.2 Validation Checklist

**Rule**: Staging must pass all SEO contract requirements before production launch.

**Requirements**:
- ✅ All URLs match production structure
- ✅ All canonicals correct
- ✅ All content visible
- ✅ All schema present
- ✅ All internal links working
- ✅ Crawl validation passes (Screaming Frog)

---

## 9. Performance Considerations

### 9.1 Page Speed

**Rule**: Page speed must not degrade significantly.

**Requirements**:
- ✅ LCP (Largest Contentful Paint) < 2.5s
- ✅ FID (First Input Delay) < 100ms
- ✅ CLS (Cumulative Layout Shift) < 0.1
- ✅ FCP (First Contentful Paint) < 1.8s

**Note**: Performance impacts SEO indirectly, but is critical for user experience.

---

## 10. Explicitly Forbidden Behaviors

### 10.1 Shopify Auto-Generated Behaviors (DO NOT ALLOW)

**These Shopify theme defaults are explicitly forbidden:**

- ❌ **Theme truncating descriptions**: Shopify themes sometimes auto-truncate product descriptions. This must be disabled.
- ❌ **"Read more" buttons hiding core copy**: If "Read more" is used, initial content must be substantial (minimum 200 words visible).
- ❌ **JS-only accordions for descriptions**: Product descriptions cannot be hidden in accordions that require JavaScript to expand.
- ❌ **Faceted URLs becoming indexable**: Filter URLs (e.g., `/collections/products?filter=...`) must be noindex or canonicalized to base collection URL.
- ❌ **Query params in canonicals**: Canonical tags must never include query parameters, even if Shopify theme defaults include them.

### 10.2 Content Hiding Patterns (DO NOT ALLOW)

- ❌ Moving product descriptions into tabs/accordions by default
- ❌ Requiring JavaScript to render product title or description
- ❌ Lazy-loading product descriptions (they must be in initial HTML)
- ❌ Truncating collection descriptions without "read more" functionality

### 10.3 URL Manipulation (DO NOT ALLOW)

- ❌ Changing product handles during rebuild
- ❌ Changing collection handles during rebuild
- ❌ Adding query parameters to canonical URLs
- ❌ Creating new URL structures that don't match production

---

## 11. Acceptance Tests (Staging)

### 11.1 Page-Level Acceptance Criteria

**A page passes SEO validation if ALL of the following are true:**

- ✅ **URL matches canonical invariant**: Product URLs are `/products/{handle}`, collection URLs are `/collections/{handle}`
- ✅ **Exactly one H1 exists** and matches product/collection title exactly
- ✅ **Product description HTML is visible** without any user interaction (not hidden in tabs/accordions)
- ✅ **Canonical tag matches URL** (no query params, no trailing slashes)
- ✅ **Product schema validates** in Google Rich Results Test (for product pages)
- ✅ **Breadcrumb schema validates** in Google Rich Results Test
- ✅ **Page is crawlable** in Screaming Frog (returns 200, content is in HTML source)

### 11.2 Site-Level Acceptance Criteria

**The entire site passes SEO validation if:**

- ✅ **100% of money pages** (top 20% by traffic/revenue) pass page-level tests
- ✅ **Zero 404 errors** on product/collection pages
- ✅ **Zero 500 errors** on any page
- ✅ **All internal links** use canonical URLs (no query params)
- ✅ **Sitemap includes** all active products and collections
- ✅ **Robots.txt allows** crawling of `/products/` and `/collections/`

### 11.3 Validation Tools

**Required tools for acceptance testing:**

- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **Screaming Frog SEO Spider**: For crawl validation
- **PageSpeed Insights**: For performance validation
- **Browser DevTools**: For HTML source inspection

---

## 12. Enforcement

### 10.1 Pre-Launch Validation

**Before publishing to production, validate:**
- [ ] All URLs match current Shopify URLs
- [ ] All canonicals correct
- [ ] All content visible in initial HTML
- [ ] All schema validated (Google Rich Results Test)
- [ ] All internal links working
- [ ] Crawl validation passes
- [ ] Performance metrics acceptable

### 12.2 Post-Launch Monitoring

**After launch, monitor daily for first 7 days, then weekly:**

**Daily Checks (Days 1-7):**
- [ ] GSC coverage reports (no new errors)
- [ ] GSC daily coverage check (indexed pages count should remain stable)
- [ ] Top 10 money pages only (monitor rankings, don't watch noise)
- [ ] GA4 landing page traffic (no sudden drops on money pages)

**Weekly Checks (After Day 7):**
- [ ] Diff crawl: Pre-launch vs post-launch URL count (should match)
- [ ] Rankings for top keywords (no significant drops)
- [ ] Crawl rate (should remain stable)
- [ ] Core Web Vitals (should meet thresholds)

**Post-Launch Guardrails:**
- **Focus on money pages only**: Don't monitor every page, focus on top 20% by traffic/revenue
- **Expect minor fluctuations**: Small ranking changes (±3 positions) are normal
- **Alert threshold**: Drop of >10 positions on money pages OR traffic drop >20% on money pages

---

## 13. Exceptions

**No exceptions to this contract without explicit written approval.**

If a change must be made that violates this contract:
1. Document the exception
2. Explain why it's necessary
3. Define mitigation strategy
4. Get approval before implementation

---

## 14. Contact

**Questions about this contract?**
- Review this document first
- If clarification needed, document the question and proposed solution
- Get approval before proceeding

---

**This contract is a living document. Updates must be versioned and approved.**

