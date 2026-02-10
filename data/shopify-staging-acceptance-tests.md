# Shopify Staging Acceptance Tests

**Document Version**: 1.0  
**Date**: January 2026  
**Purpose**: Define exact acceptance tests that Shopify staging must pass before publishing to production. These tests validate compliance with the SEO Contract.

---

## Test Environment Setup

### Prerequisites
- [ ] Shopify staging theme is published (not live)
- [ ] Staging theme preview URL is accessible
- [ ] Screaming Frog or similar crawler is available
- [ ] Google Rich Results Test tool is accessible
- [ ] Money pages inventory is available (`data/money-pages-inventory.csv`)

### Test URLs
- **Staging Preview URL**: `https://organicsodapops.com/?preview_theme_id={theme_id}`
- **Production Baseline**: `https://organicsodapops.com`

---

## Test Suite 1: URL Structure Validation

### Test 1.1: Product URLs Match Production

**Test**: Verify all product URLs match production structure.

**Steps**:
1. Export all product handles from Shopify admin
2. For each product, verify staging URL matches production URL
3. Check format: `https://organicsodapops.com/products/{handle}`

**Expected Result**:
- ✅ All product URLs match exactly
- ✅ No handle changes
- ✅ No URL structure changes

**Pass Criteria**: 100% of product URLs match

**Test Data**: Use `data/shopify-canonical-urls.csv`

---

### Test 1.2: Collection URLs Match Production

**Test**: Verify all collection URLs match production structure.

**Steps**:
1. Export all collection handles from Shopify admin
2. For each collection, verify staging URL matches production URL
3. Check format: `https://organicsodapops.com/collections/{handle}`

**Expected Result**:
- ✅ All collection URLs match exactly
- ✅ No handle changes
- ✅ No URL structure changes

**Pass Criteria**: 100% of collection URLs match

---

### Test 1.3: Canonical Tags Are Correct

**Test**: Verify canonical tags point to correct URLs without query params.

**Steps**:
1. Visit staging product page with query params: `?variant=123&utm_source=test`
2. Inspect `<head>` for canonical tag
3. Verify canonical URL is clean (no query params)

**Expected Result**:
- ✅ Canonical tag exists
- ✅ Canonical URL matches production URL exactly
- ✅ No query parameters in canonical URL

**Pass Criteria**: 100% of tested pages have correct canonicals

**Test Pages**: Sample 10 product pages + 5 collection pages

---

## Test Suite 2: Content Visibility Validation

### Test 2.1: Product Descriptions Are Visible

**Test**: Verify product descriptions are visible in initial HTML.

**Steps**:
1. Visit staging product page
2. View page source (not rendered HTML)
3. Search for product description text
4. Verify description is in initial HTML (not loaded via JS)

**Expected Result**:
- ✅ Description text is present in page source
- ✅ Description is not hidden in collapsed tabs/accordions
- ✅ Description is not truncated

**Pass Criteria**: 100% of tested product pages have visible descriptions

**Test Pages**: All money pages from `data/money-pages-inventory.csv`

---

### Test 2.2: H1 Tags Are Present and Correct

**Test**: Verify each page has exactly one H1 tag with correct content.

**Steps**:
1. Visit staging page
2. Inspect HTML for H1 tags
3. Verify H1 content matches product/collection title

**Expected Result**:
- ✅ Exactly one H1 tag per page
- ✅ H1 content matches product/collection title
- ✅ H1 is visible in initial HTML

**Pass Criteria**: 100% of tested pages have correct H1

**Test Pages**: Sample 20 product pages + 10 collection pages

---

### Test 2.3: Collection Descriptions Are Visible

**Test**: Verify collection descriptions are visible and indexable.

**Steps**:
1. Visit staging collection page
2. View page source
3. Verify collection description is in initial HTML

**Expected Result**:
- ✅ Collection description is present in page source
- ✅ Description is visible on page (not hidden)

**Pass Criteria**: 100% of tested collection pages have visible descriptions

**Test Pages**: All collection pages

---

## Test Suite 3: Internal Linking Validation

### Test 3.1: Navigation Menu Links Use Canonical URLs

**Test**: Verify navigation menu links point to canonical URLs.

**Steps**:
1. Visit staging homepage
2. Inspect header navigation menu links
3. Verify all links use canonical URLs (no query params)
4. Verify all links are working (no 404s)

**Expected Result**:
- ✅ All navigation links use canonical URLs
- ✅ No query parameters in navigation links
- ✅ All links return 200 status codes

**Pass Criteria**: 100% of navigation links are correct

---

### Test 3.2: Footer Links Use Canonical URLs

**Test**: Verify footer links point to canonical URLs.

**Steps**:
1. Visit staging homepage
2. Inspect footer links
3. Verify all links use canonical URLs
4. Verify all links are working

**Expected Result**:
- ✅ All footer links use canonical URLs
- ✅ All links return 200 status codes

**Pass Criteria**: 100% of footer links are correct

---

### Test 3.3: Product Cross-Links Use Canonical URLs

**Test**: Verify product cross-links (related products, carousels) use canonical URLs.

**Steps**:
1. Visit staging product page
2. Inspect "Related Products" or "You May Also Like" links
3. Verify all links use canonical URLs
4. Verify all links are working

**Expected Result**:
- ✅ All product cross-links use canonical URLs
- ✅ All links return 200 status codes

**Pass Criteria**: 100% of product cross-links are correct

**Test Pages**: Sample 10 product pages

---

### Test 3.4: Breadcrumbs Use Canonical URLs

**Test**: Verify breadcrumb links use canonical URLs.

**Steps**:
1. Visit staging product page
2. Inspect breadcrumb links
3. Verify all links use canonical URLs
4. Verify breadcrumb structure is correct

**Expected Result**:
- ✅ All breadcrumb links use canonical URLs
- ✅ Breadcrumb structure matches expected hierarchy

**Pass Criteria**: 100% of breadcrumb links are correct

**Test Pages**: Sample 20 product pages

---

## Test Suite 4: Schema Markup Validation

### Test 4.1: Product Schema Is Present and Valid

**Test**: Verify product schema is present and validates.

**Steps**:
1. Visit staging product page
2. View page source
3. Find JSON-LD product schema
4. Validate schema using Google Rich Results Test

**Expected Result**:
- ✅ Product schema is present in page source
- ✅ Schema validates in Google Rich Results Test
- ✅ Required fields are present (name, image, description, brand, offers)

**Pass Criteria**: 100% of tested product pages have valid schema

**Test Pages**: All money pages + sample 10 additional product pages

**Tool**: [Google Rich Results Test](https://search.google.com/test/rich-results)

---

### Test 4.2: Breadcrumb Schema Is Present and Valid

**Test**: Verify breadcrumb schema is present and validates.

**Steps**:
1. Visit staging product page
2. View page source
3. Find JSON-LD breadcrumb schema
4. Validate schema using Google Rich Results Test

**Expected Result**:
- ✅ Breadcrumb schema is present
- ✅ Schema validates in Google Rich Results Test
- ✅ Breadcrumb items have correct position, name, and URL

**Pass Criteria**: 100% of tested pages have valid breadcrumb schema

**Test Pages**: Sample 20 product pages + 10 collection pages

---

### Test 4.3: Organization Schema Is Present on Homepage

**Test**: Verify organization schema is present on homepage.

**Steps**:
1. Visit staging homepage
2. View page source
3. Find JSON-LD organization schema
4. Validate schema

**Expected Result**:
- ✅ Organization schema is present
- ✅ Required fields are present (name, url, logo)

**Pass Criteria**: Organization schema is present and valid

---

## Test Suite 5: Metadata Validation

### Test 5.1: Title Tags Are Present and Optimized

**Test**: Verify title tags are present and follow best practices.

**Steps**:
1. Visit staging page
2. Inspect `<title>` tag
3. Verify title is present and optimized

**Expected Result**:
- ✅ Title tag is present
- ✅ Title length is 50-60 characters (optimal)
- ✅ Title includes brand name
- ✅ Title is unique per page

**Pass Criteria**: 100% of tested pages have optimized titles

**Test Pages**: All money pages + sample 20 additional pages

---

### Test 5.2: Meta Descriptions Are Present and Optimized

**Test**: Verify meta descriptions are present and optimized.

**Steps**:
1. Visit staging page
2. Inspect `<meta name="description">` tag
3. Verify description is present and optimized

**Expected Result**:
- ✅ Meta description is present
- ✅ Description length is 150-160 characters (optimal)
- ✅ Description is unique per page

**Pass Criteria**: 100% of tested pages have optimized meta descriptions

**Test Pages**: All money pages + sample 20 additional pages

---

### Test 5.3: OpenGraph Tags Are Present

**Test**: Verify OpenGraph tags are present.

**Steps**:
1. Visit staging page
2. Inspect `<head>` for OpenGraph tags
3. Verify required tags are present

**Expected Result**:
- ✅ `og:title` is present
- ✅ `og:description` is present
- ✅ `og:url` is present (canonical URL)
- ✅ `og:image` is present
- ✅ `og:type` is present

**Pass Criteria**: 100% of tested pages have all required OpenGraph tags

**Test Pages**: Sample 20 pages

---

### Test 5.4: Twitter Card Tags Are Present

**Test**: Verify Twitter Card tags are present.

**Steps**:
1. Visit staging page
2. Inspect `<head>` for Twitter Card tags
3. Verify required tags are present

**Expected Result**:
- ✅ `twitter:card` is present
- ✅ `twitter:title` is present
- ✅ `twitter:description` is present
- ✅ `twitter:image` is present

**Pass Criteria**: 100% of tested pages have all required Twitter Card tags

**Test Pages**: Sample 20 pages

---

## Test Suite 6: Technical SEO Validation

### Test 6.1: JavaScript Does Not Gate Primary Content

**Test**: Verify primary content is in initial HTML, not JS-loaded.

**Steps**:
1. Visit staging page with JavaScript disabled
2. Verify product title is visible
3. Verify product description is visible
4. Verify H1 is visible

**Expected Result**:
- ✅ Product title is visible without JavaScript
- ✅ Product description is visible without JavaScript
- ✅ H1 is visible without JavaScript

**Pass Criteria**: 100% of tested pages have primary content in initial HTML

**Test Pages**: All money pages

**Tool**: Browser DevTools → Disable JavaScript

---

### Test 6.2: Images Have Alt Text

**Test**: Verify all product images have alt text.

**Steps**:
1. Visit staging product page
2. Inspect all product images
3. Verify each image has alt attribute with descriptive text

**Expected Result**:
- ✅ All product images have alt text
- ✅ Alt text is descriptive (not "image1.jpg" or empty)

**Pass Criteria**: 100% of product images have descriptive alt text

**Test Pages**: Sample 20 product pages

---

### Test 6.3: Sitemap Is Accessible and Complete

**Test**: Verify sitemap is accessible and includes all products/collections.

**Steps**:
1. Visit `/sitemap.xml` on staging
2. Verify sitemap is accessible
3. Verify all products are included
4. Verify all collections are included

**Expected Result**:
- ✅ Sitemap is accessible
- ✅ All active products are in sitemap
- ✅ All active collections are in sitemap

**Pass Criteria**: Sitemap is complete and accessible

---

### Test 6.4: Robots.txt Allows Crawling

**Test**: Verify robots.txt allows crawling of product/collection pages.

**Steps**:
1. Visit `/robots.txt` on staging
2. Verify robots.txt does not block `/products/`
3. Verify robots.txt does not block `/collections/`

**Expected Result**:
- ✅ Robots.txt allows crawling of product pages
- ✅ Robots.txt allows crawling of collection pages

**Pass Criteria**: Robots.txt is correctly configured

---

## Test Suite 7: Crawl Validation

### Test 7.1: Full Site Crawl (Screaming Frog)

**Test**: Crawl staging site and verify no critical issues.

**Steps**:
1. Configure Screaming Frog to crawl staging preview URL
2. Set user-agent to Googlebot
3. Run crawl
4. Export results

**Check For**:
- ✅ No 404 errors on product/collection pages
- ✅ No 500 errors
- ✅ All canonicals are correct
- ✅ All title tags are present
- ✅ All meta descriptions are present
- ✅ All H1 tags are present
- ✅ No duplicate content issues

**Pass Criteria**: 
- Zero 404s on product/collection pages
- Zero 500 errors
- 100% of pages have correct canonicals
- 100% of pages have title tags
- 100% of pages have meta descriptions

**Tool**: Screaming Frog SEO Spider

---

### Test 7.2: Internal Link Structure Is Preserved

**Test**: Verify internal link structure matches production.

**Steps**:
1. Crawl staging site
2. Export internal links
3. Compare with production crawl baseline
4. Verify link structure is preserved

**Expected Result**:
- ✅ Navigation menu links are preserved
- ✅ Footer links are preserved
- ✅ Product cross-links are preserved
- ✅ Collection cross-links are preserved

**Pass Criteria**: Internal link structure matches production baseline

**Baseline**: `data/shopify-crawl-baseline.csv`

---

## Test Suite 8: Money Pages Validation

### Test 8.1: Money Pages URLs Match Production

**Test**: Verify all money pages have identical URLs to production.

**Steps**:
1. Load `data/money-pages-inventory.csv`
2. For each money page, verify staging URL matches production URL exactly

**Expected Result**:
- ✅ 100% of money page URLs match production exactly

**Pass Criteria**: 100% match

**Test Data**: `data/money-pages-inventory.csv`

---

### Test 8.2: Money Pages Metadata Is Preserved

**Test**: Verify money pages metadata matches production.

**Steps**:
1. For each money page, compare staging metadata with production:
   - SEO Title
   - SEO Description
   - H1 content

**Expected Result**:
- ✅ SEO titles match (or are improved, not degraded)
- ✅ SEO descriptions match (or are improved, not degraded)
- ✅ H1 content matches

**Pass Criteria**: 100% of money pages have preserved/improved metadata

**Test Data**: `data/money-pages-inventory.csv`

---

### Test 8.3: Money Pages Content Is Visible

**Test**: Verify money pages content is visible and matches production.

**Steps**:
1. For each money page, verify:
   - Product description is visible
   - Content matches production (or is improved)

**Expected Result**:
- ✅ All money page content is visible
- ✅ Content matches or improves upon production

**Pass Criteria**: 100% of money pages have visible content

**Test Data**: `data/money-pages-inventory.csv`

---

## Test Suite 9: Performance Validation

### Test 9.1: Core Web Vitals Are Acceptable

**Test**: Verify Core Web Vitals meet thresholds.

**Steps**:
1. Run PageSpeed Insights on staging homepage
2. Run PageSpeed Insights on top 5 money pages
3. Check Core Web Vitals scores

**Expected Result**:
- ✅ LCP < 2.5s
- ✅ FID < 100ms
- ✅ CLS < 0.1

**Pass Criteria**: All Core Web Vitals meet thresholds on tested pages

**Tool**: [PageSpeed Insights](https://pagespeed.web.dev/)

**Test Pages**: Homepage + top 5 money pages

---

## Test Suite 10: Next.js Dev Site Validation

### Test 10.1: Next.js Dev Site Is Noindex

**Test**: Verify Next.js dev site has noindex tags.

**Steps**:
1. Visit Next.js dev site (`osp-dash.vercel.app`)
2. Inspect `<head>` for meta robots tag
3. Verify `noindex, nofollow` is present

**Expected Result**:
- ✅ Global noindex tag is present
- ✅ Robots.txt disallows crawling

**Pass Criteria**: Next.js dev site is properly noindexed

---

### Test 10.2: Next.js URLs Use Shopify Shape

**Test**: Verify Next.js dev site uses Shopify-shaped URLs.

**Steps**:
1. Visit Next.js dev site product page
2. Verify URL structure matches Shopify: `/products/{handle}`
3. Verify canonical tag points to Shopify production URL

**Expected Result**:
- ✅ URLs use Shopify shape (not nested)
- ✅ Canonicals point to Shopify production URLs

**Pass Criteria**: Next.js URLs match Shopify structure

---

## Test Execution Checklist

### Pre-Test Setup
- [ ] Staging theme is published (not live)
- [ ] Staging preview URL is accessible
- [ ] Test tools are ready (Screaming Frog, PageSpeed Insights, etc.)
- [ ] Money pages inventory is loaded
- [ ] Production baseline data is available

### Test Execution Order
1. **URL Structure Validation** (Test Suite 1)
2. **Content Visibility Validation** (Test Suite 2)
3. **Internal Linking Validation** (Test Suite 3)
4. **Schema Markup Validation** (Test Suite 4)
5. **Metadata Validation** (Test Suite 5)
6. **Technical SEO Validation** (Test Suite 6)
7. **Crawl Validation** (Test Suite 7)
8. **Money Pages Validation** (Test Suite 8)
9. **Performance Validation** (Test Suite 9)
10. **Next.js Dev Site Validation** (Test Suite 10)

### Pass/Fail Criteria

**Overall Pass Criteria**:
- ✅ All critical tests (Test Suites 1-8) must pass at 100%
- ✅ Performance tests (Test Suite 9) must meet thresholds
- ✅ Next.js dev site tests (Test Suite 10) must pass

**If Any Test Fails**:
1. Document the failure
2. Identify root cause
3. Fix the issue
4. Re-run the failed test
5. Do not proceed to production until all tests pass

---

## Test Results Template

### Test Execution Log

**Date**: _______________  
**Tester**: _______________  
**Staging Theme ID**: _______________  
**Staging Preview URL**: _______________

| Test Suite | Test ID | Test Name | Status | Notes |
|------------|---------|-----------|--------|-------|
| 1 | 1.1 | Product URLs Match | ⬜ Pass / ⬜ Fail | |
| 1 | 1.2 | Collection URLs Match | ⬜ Pass / ⬜ Fail | |
| 1 | 1.3 | Canonical Tags Correct | ⬜ Pass / ⬜ Fail | |
| ... | ... | ... | ... | ... |

**Overall Status**: ⬜ PASS / ⬜ FAIL

**Issues Found**:
1. 
2. 
3. 

**Sign-off**:
- [ ] All tests passed
- [ ] Issues resolved
- [ ] Ready for production launch

**Approved By**: _______________  
**Date**: _______________

---

## Post-Test Actions

### If Tests Pass
1. Document test results
2. Get sign-off from stakeholders
3. Proceed to production launch
4. Monitor post-launch metrics

### If Tests Fail
1. Document all failures
2. Prioritize fixes (money pages first)
3. Fix issues
4. Re-run failed tests
5. Do not launch until all tests pass

---

**This test suite must be executed before every production launch.**

