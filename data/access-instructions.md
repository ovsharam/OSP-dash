# Access & Baseline Instructions

## Step 1.1: Google Search Console Access

### Action Items
1. Request full GSC access for `organicsodapops.com` property
2. Verify access to:
   - Performance reports (queries, pages, countries, devices)
   - Coverage reports (indexed pages, errors)
   - URL Inspection tool
   - Sitemaps
   - Links report

### Export Instructions
1. Go to GSC → Performance
2. Set date range: Last 90 days
3. Export data:
   - Click "Export" → "Google Sheets" or "Download CSV"
   - Include: URL, Query, Clicks, Impressions, CTR, Position
4. Save as: `data/gsc-performance-export.csv`

### Verification Checklist
- [ ] Can access Performance reports
- [ ] Can access Coverage reports
- [ ] Can use URL Inspection tool
- [ ] Can export data to CSV

---

## Step 1.2: Google Analytics 4 Access

### Action Items
1. Request GA4 Admin access for property
2. Verify access to:
   - Exploration reports
   - Landing page reports
   - Conversion events
   - User acquisition reports
   - Export capabilities

### Export Instructions
1. Go to GA4 → Explore → Landing page report
2. Set date range: Last 90 days
3. Add dimensions: Landing page
4. Add metrics: Sessions, Users, Revenue, Conversions
5. Export → Download CSV
6. Save as: `data/ga4-landing-pages-export.csv`

### Verification Checklist
- [ ] Can access Exploration reports
- [ ] Can access Landing page reports
- [ ] Can export data to CSV

---

## Step 1.3: Shopify Admin Access

### Action Items
1. Verify full admin access to `organicsodapops.com` Shopify store
2. Confirm access to:
   - Products (all handles)
   - Collections (all handles)
   - Pages
   - Navigation menus
   - URL Redirects section
   - Theme editor

### Verification Checklist
- [ ] Can access Products section
- [ ] Can access Collections section
- [ ] Can access Pages section
- [ ] Can access Navigation menus (Content → Menus)
- [ ] Can access URL Redirects (Online Store → Navigation → URL Redirects)
- [ ] Can access Theme editor

---

## Step 1.4: Crawl Baseline

### Action Items
1. Crawl current Shopify site once (using Screaming Frog or similar)
2. Export:
   - All indexable URLs
   - Status codes
   - Title tags
   - Meta descriptions
   - H1 tags
   - Canonical tags
   - Internal links count

### Screaming Frog Instructions
1. Download Screaming Frog SEO Spider (free version is sufficient)
2. Enter URL: `https://organicsodapops.com`
3. Set mode: "List" mode (if you have sitemap) or "Spider" mode
4. Configure:
   - User-agent: Googlebot
   - Respect robots.txt: Yes
   - Follow internal links: Yes
5. Run crawl
6. Export:
   - Go to "Export" → "All Inlinks"
   - Export: "All Inlinks" → CSV
   - Also export: "Internal HTML" → CSV (for title/meta/H1 data)
7. Combine exports and save as: `data/shopify-crawl-baseline.csv`

### Alternative: Manual Crawl Script
If Screaming Frog is not available, use curl/wget to crawl sitemap:
```bash
# Download sitemap
curl https://organicsodapops.com/sitemap.xml > sitemap.xml

# Extract URLs from sitemap (requires XML parsing)
# Then curl each URL to get status codes and HTML
```

### Deliverable Format
CSV with columns:
- URL
- Status Code
- Title Tag
- Meta Description
- H1 Tag
- Canonical Tag
- Internal Links Count

Save as: `data/shopify-crawl-baseline.csv`

