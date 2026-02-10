# Phase 1: SEO Contract & Money-Page Lock - Deliverables

This directory contains all deliverables for Phase 1 of the SEO preservation plan.

---

## Data Files (CSV)

### 1. `shopify-crawl-baseline.csv`
**Status**: Template created - **TODO: Populate with actual crawl data**

Technical crawl baseline from current Shopify site. Use Screaming Frog to crawl `https://organicsodapops.com` and populate this file.

**Instructions**: See `access-instructions.md` → Step 1.4

---

### 2. `gsc-performance-export.csv`
**Status**: Template created - **TODO: Export from Google Search Console**

GSC performance data for last 90 days. Export from Google Search Console → Performance.

**Instructions**: See `access-instructions.md` → Step 1.1

---

### 3. `ga4-landing-pages-export.csv`
**Status**: Template created - **TODO: Export from Google Analytics 4**

GA4 landing page data for last 90 days. Export from Google Analytics 4 → Explore → Landing page report.

**Instructions**: See `access-instructions.md` → Step 1.2

---

### 4. `money-pages-inventory.csv`
**Status**: Template created - **TODO: Populate from GSC/GA4 exports**

Top 20% traffic and revenue pages. Cross-reference GSC clicks and GA4 revenue to identify money pages.

**Instructions**: 
1. Load `gsc-performance-export.csv` and `ga4-landing-pages-export.csv`
2. Map URLs to Shopify handles from `products_export_1.csv`
3. Calculate top 20% by traffic (GSC clicks) and revenue (GA4 revenue)
4. Populate with Shopify Handle, Current URL, GSC Clicks, GA4 Revenue, Primary Keyword, SEO Title, SEO Description, Priority Level

---

### 5. `shopify-canonical-urls.csv`
**Status**: ✅ **COMPLETE** - 364 product URLs extracted

All Shopify canonical URLs for products. Extracted from `products_export_1.csv`.

**Note**: Collections need to be exported separately from Shopify admin (Content → Collections). Add collection URLs to this file or create separate `shopify-collections-urls.csv`.

**Columns**:
- Handle
- URL Type (product/collection)
- Canonical URL
- Current Status (active/draft/archived)

---

### 6. `shopify-url-invariants.csv`
**Status**: ✅ **COMPLETE** - 364 URLs documented

URL preservation plan. All URLs are set to remain unchanged (Will Change? = No).

**Columns**:
- Current URL
- Future URL (should be identical)
- Will Change? (Yes/No)
- Redirect Needed? (Yes/No - only if changing)
- Priority (if redirect needed)

---

## Documentation Files (Markdown)

### 1. `seo-contract.md`
**Status**: ✅ **COMPLETE**

**GOLD DOCUMENT**: Non-negotiable SEO rules that must be preserved during Shopify rebuild.

This is the master contract that defines all SEO invariants. Share this with antigravity and Shopify rebuild team.

---

### 2. `shopify-staging-acceptance-tests.md`
**Status**: ✅ **COMPLETE**

Complete test suite for Shopify staging validation. Use this to validate staging before production launch.

**Test Suites**:
1. URL Structure Validation
2. Content Visibility Validation
3. Internal Linking Validation
4. Schema Markup Validation
5. Metadata Validation
6. Technical SEO Validation
7. Crawl Validation
8. Money Pages Validation
9. Performance Validation
10. Next.js Dev Site Validation

---

### 3. `critical-preservation-checklist.md`
**Status**: ✅ **COMPLETE**

Actionable preservation checklist. Converts SEO contract into checkboxes for validation.

Use this checklist during staging validation and before production launch.

---

### 4. `risk-assessment.md`
**Status**: ✅ **COMPLETE**

Risk analysis and mitigation strategies. Documents all identified risks with prevention, detection, and remediation strategies.

**Risk Categories**:
- Content Risks
- URL Risks
- Technical Risks
- Performance Risks

---

### 5. `access-instructions.md`
**Status**: ✅ **COMPLETE**

Step-by-step instructions for securing GSC, GA4, and Shopify admin access, plus crawl baseline instructions.

---

## Next Steps

### Immediate Actions Required

1. **Secure Access** (Step 1.1-1.3)
   - Request GSC full access
   - Request GA4 Admin access
   - Verify Shopify admin access
   - Follow instructions in `access-instructions.md`

2. **Export Data** (Step 1.4, 2.1-2.2)
   - Crawl Shopify site → populate `shopify-crawl-baseline.csv`
   - Export GSC data → populate `gsc-performance-export.csv`
   - Export GA4 data → populate `ga4-landing-pages-export.csv`

3. **Identify Money Pages** (Step 2.3)
   - Cross-reference GSC/GA4 exports
   - Map to Shopify handles
   - Calculate top 20% by traffic/revenue
   - Populate `money-pages-inventory.csv`

4. **Export Collections** (Step 4.1)
   - Go to Shopify admin → Content → Collections
   - Export all collection handles
   - Add to `shopify-canonical-urls.csv` or create separate collections file

5. **Validate SEO Contract** (Step 3)
   - Review `seo-contract.md` with team
   - Ensure all invariants are understood
   - Get sign-off before proceeding

---

## File Status Summary

| File | Status | Action Required |
|------|--------|----------------|
| `seo-contract.md` | ✅ Complete | Review with team |
| `shopify-staging-acceptance-tests.md` | ✅ Complete | Use for staging validation |
| `critical-preservation-checklist.md` | ✅ Complete | Use for pre-launch validation |
| `risk-assessment.md` | ✅ Complete | Review risks with team |
| `access-instructions.md` | ✅ Complete | Follow to secure access |
| `shopify-canonical-urls.csv` | ✅ Complete (products) | Add collections from Shopify admin |
| `shopify-url-invariants.csv` | ✅ Complete | Verify URLs remain unchanged |
| `shopify-crawl-baseline.csv` | ⏳ Template | Crawl site and populate |
| `gsc-performance-export.csv` | ⏳ Template | Export from GSC and populate |
| `ga4-landing-pages-export.csv` | ⏳ Template | Export from GA4 and populate |
| `money-pages-inventory.csv` | ⏳ Template | Cross-reference exports and populate |

---

## Success Criteria

Phase 1 is complete when:
- [ ] Full GSC/GA4 access secured
- [ ] Top 20% money pages identified and mapped
- [ ] SEO contract defined and documented ✅
- [ ] Shopify URL invariants confirmed ✅
- [ ] Risk register completed with mitigations ✅
- [ ] All deliverables created and stored in `data/` directory ✅

---

**Last Updated**: January 2026

