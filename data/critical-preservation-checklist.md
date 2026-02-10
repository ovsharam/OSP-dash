# Critical Preservation Checklist

This checklist converts the SEO Contract into actionable items that must be verified during the Shopify rebuild.

---

## URL Preservation

### Product URLs
- [ ] All product handles remain unchanged
- [ ] Product URL structure remains: `/products/{handle}`
- [ ] No trailing slashes added
- [ ] No uppercase letters in handles
- [ ] Canonical tags point to exact product URL (no query params)

### Collection URLs
- [ ] All collection handles remain unchanged
- [ ] Collection URL structure remains: `/collections/{handle}`
- [ ] No trailing slashes added
- [ ] No uppercase letters in handles
- [ ] Canonical tags point to exact collection URL (no query params)

### Page URLs
- [ ] All page handles remain unchanged
- [ ] Page URL structure remains: `/pages/{handle}`
- [ ] Canonical tags point to exact page URL

### Query Parameter Handling
- [ ] Canonical tags strip all query parameters
- [ ] Internal links use clean URLs (no tracking params)
- [ ] Tracking params can exist in URLs, but canonical must be clean

---

## Content Preservation

### Product Descriptions
- [ ] Full product description HTML is visible by default
- [ ] Description is not hidden behind tabs/accordions by default
- [ ] Description does not require JavaScript to render
- [ ] Description HTML structure is preserved (headings, lists, formatting)
- [ ] Description is in initial HTML (not lazy-loaded)

### Collection Descriptions
- [ ] Collection description is visible on collection page
- [ ] Description is in initial HTML (not JS-loaded)
- [ ] Description HTML structure is preserved

### H1 Tags
- [ ] Each page has exactly one H1 tag
- [ ] Product pages: H1 = Product Title
- [ ] Collection pages: H1 = Collection Title
- [ ] Page pages: H1 = Page Title
- [ ] H1 is visible in initial HTML

### Title Tags
- [ ] Use Shopify SEO Title if set, else Product/Collection Title
- [ ] Include brand name: `{Title} | OSP Marketplace` or `{Title} | Organic Soda Pops`
- [ ] Length: 50-60 characters (optimal)
- [ ] Must be unique per page

---

## Internal Linking Preservation

### Navigation Menus
- [ ] Header menu links use canonical URLs
- [ ] Footer menu links use canonical URLs
- [ ] Mobile menu links use canonical URLs
- [ ] No query parameters in menu links
- [ ] No broken links
- [ ] Footer menu source remains unchanged
- [ ] Header menu source remains unchanged
- [ ] Menu structure (hierarchy, order) is preserved

### Product Cross-Links
- [ ] Related products link to canonical URLs
- [ ] "You may also like" sections use canonical URLs
- [ ] Product carousels use canonical URLs

### Collection Cross-Links
- [ ] Collection navigation uses canonical URLs
- [ ] Category links use canonical URLs

### Breadcrumbs
- [ ] Breadcrumb links use canonical URLs
- [ ] Breadcrumb structure is preserved
- [ ] Breadcrumb schema is present

---

## Metadata Preservation

### Meta Descriptions
- [ ] Use Shopify SEO Description if set, else excerpt from description
- [ ] Length: 150-160 characters (optimal)
- [ ] Must be unique per page
- [ ] Must include primary keyword

### OpenGraph Tags
- [ ] `og:title` is present
- [ ] `og:description` is present
- [ ] `og:url` is present (canonical URL)
- [ ] `og:image` is present
- [ ] `og:type` is present

### Twitter Card Tags
- [ ] `twitter:card` is present (summary_large_image)
- [ ] `twitter:title` is present
- [ ] `twitter:description` is present
- [ ] `twitter:image` is present

---

## Schema Preservation

### Product Schema
- [ ] Product schema is present on all product pages
- [ ] `@type`: "Product"
- [ ] `name`: Product title
- [ ] `image`: Product images (array)
- [ ] `description`: Product description
- [ ] `brand`: Brand name
- [ ] `offers`: Price, currency, availability
- [ ] Schema validates in Google Rich Results Test

### Breadcrumb Schema
- [ ] Breadcrumb schema is present on all product and collection pages
- [ ] `@type`: "BreadcrumbList"
- [ ] `itemListElement`: Array with position, name, item (URL)
- [ ] Schema validates in Google Rich Results Test

### Organization Schema
- [ ] Organization schema is present on homepage
- [ ] `@type`: "Organization"
- [ ] `name`: Company name
- [ ] `url`: Website URL
- [ ] `logo`: Logo URL

---

## Technical Preservation

### JavaScript Requirements
- [ ] Product title is in initial HTML
- [ ] Product description is in initial HTML
- [ ] H1 is in initial HTML
- [ ] Navigation links are in initial HTML
- [ ] Images have src attributes (not lazy-loaded by default)
- [ ] No content rendered only via JavaScript
- [ ] No Single Page Application (SPA) architecture for product pages
- [ ] No client-side routing for product/collection pages

### Image SEO
- [ ] All product images have alt text
- [ ] Alt text is descriptive (not "image1.jpg")
- [ ] Image filenames are descriptive (not random strings)
- [ ] Images are properly sized/compressed

### Sitemap
- [ ] All active products are in sitemap
- [ ] All active collections are in sitemap
- [ ] Sitemap is accessible at `/sitemap.xml`
- [ ] Sitemap is submitted to Google Search Console

### Robots.txt
- [ ] Does not block `/products/`
- [ ] Does not block `/collections/`
- [ ] Allows all search engines
- [ ] Can block admin/checkout pages

---

## Next.js Dev Site Requirements

### Indexing Rules
- [ ] Global `noindex, nofollow` meta tag on all pages
- [ ] Robots.txt disallows all crawling
- [ ] X-Robots-Tag header: `noindex, nofollow`

### URL Structure
- [ ] Product pages: `/products/{handle}` (not nested)
- [ ] Collection pages: `/collections/{handle}` (not nested)
- [ ] Canonical tags point to Shopify production URLs

---

## Shopify Staging Requirements

### Preview URLs
- [ ] Theme preview URLs are accessible
- [ ] Preview URLs have same structure as production
- [ ] Preview URLs are crawlable via Screaming Frog

### Validation Checklist
- [ ] All URLs match production structure
- [ ] All canonicals correct
- [ ] All content visible
- [ ] All schema present
- [ ] All internal links working
- [ ] Crawl validation passes (Screaming Frog)

---

## Performance Preservation

### Core Web Vitals
- [ ] LCP (Largest Contentful Paint) < 2.5s
- [ ] FID (First Input Delay) < 100ms
- [ ] CLS (Cumulative Layout Shift) < 0.1
- [ ] FCP (First Contentful Paint) < 1.8s

---

## Forbidden Behaviors (DO NOT ALLOW)

### Content Hiding
- [ ] Product descriptions are NOT truncated by theme
- [ ] "Read more" buttons do NOT hide core copy (minimum 200 words visible)
- [ ] Product descriptions are NOT in JS-only accordions
- [ ] Content is NOT moved to tabs/accordions by default

### URL Manipulation
- [ ] Product handles are NOT changed
- [ ] Collection handles are NOT changed
- [ ] Query parameters are NOT added to canonical URLs
- [ ] New URL structures are NOT created

### Technical Issues
- [ ] Faceted URLs (filter URLs) are NOT indexable (must be noindex or canonicalized)
- [ ] Query params are NOT in canonicals

---

## Pre-Launch Validation

Before publishing to production, verify:
- [ ] All URLs match current Shopify URLs
- [ ] All canonicals correct
- [ ] All content visible in initial HTML
- [ ] All schema validated (Google Rich Results Test)
- [ ] All internal links working
- [ ] Crawl validation passes
- [ ] Performance metrics acceptable

---

## Post-Launch Monitoring

After launch, monitor:
- [ ] GSC coverage reports (no new errors)
- [ ] GA4 landing page traffic (no sudden drops)
- [ ] Rankings for top keywords (no significant drops)
- [ ] Crawl rate (should remain stable)
- [ ] Top 10 money pages only (don't watch noise)

---

**This checklist must be completed before production launch.**

