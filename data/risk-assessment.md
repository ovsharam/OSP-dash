# Risk Assessment & Mitigation Strategies

**Document Version**: 1.0  
**Date**: January 2026  
**Purpose**: Identify actual risks during Shopify rebuild and define mitigation strategies for each.

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation Strategy | Owner |
|------|------------|--------|---------------------|-------|
| Content moved to tabs/accordions | High | High | Prevention: Explicitly forbid in SEO contract. Detection: Crawl staging, verify description in HTML source. Remediation: Move content out of tabs, ensure visible by default. | Development Team |
| JS-only rendering (content not in initial HTML) | Medium | High | Prevention: Require all primary content in initial HTML. Detection: Disable JS, verify content visible. Remediation: Move content to server-side rendering. | Development Team |
| Theme hiding copy by default | High | High | Prevention: Test theme before selection, verify content visibility. Detection: Crawl staging, check HTML source. Remediation: Configure theme to show content by default. | Development Team |
| Product descriptions truncated | Medium | Medium | Prevention: Verify theme doesn't auto-truncate. Detection: Compare description length pre/post rebuild. Remediation: Disable truncation, show full description. | Development Team |
| Handles accidentally changed during rebuild | Low | High | Prevention: Lock handles in SEO contract, use Shopify import (not manual entry). Detection: Compare handles CSV pre/post rebuild. Remediation: Revert handle changes immediately, add redirects if needed. | Development Team |
| Canonical tags missing or incorrect | Medium | High | Prevention: Template canonical tags in theme, test on staging. Detection: Crawl staging, verify canonical on all pages. Remediation: Add/fix canonical tags in theme. | Development Team |
| Query params breaking canonicals | Medium | Medium | Prevention: Ensure canonical function strips query params. Detection: Test URLs with query params, verify canonical. Remediation: Fix canonical function to strip params. | Development Team |
| Menu links changed/broken | Medium | Medium | Prevention: Export menu structure before rebuild, preserve in staging. Detection: Test all menu links, verify 200 status codes. Remediation: Restore menu structure from backup. | Development Team |
| Footer links changed/broken | Medium | Medium | Prevention: Export footer menu before rebuild, preserve in staging. Detection: Test all footer links, verify 200 status codes. Remediation: Restore footer menu from backup. | Development Team |
| Internal linking structure altered | Medium | Medium | Prevention: Crawl baseline before rebuild, compare post-rebuild. Detection: Compare internal link counts/structure. Remediation: Restore internal linking structure. | Development Team |
| Schema markup missing | Medium | Medium | Prevention: Template schema in theme, test on staging. Detection: Validate schema on staging pages. Remediation: Add schema markup to theme templates. | Development Team |
| Slow page load (affects rankings) | Medium | Low | Prevention: Test performance on staging, optimize before launch. Detection: Run PageSpeed Insights on staging. Remediation: Optimize images, reduce JS, improve hosting. | Development Team |
| Layout shift (CLS issues) | Medium | Low | Prevention: Set explicit image dimensions, avoid dynamic content above fold. Detection: Run PageSpeed Insights, check CLS score. Remediation: Fix layout shifts, set image dimensions. | Development Team |

---

## Detailed Mitigation Strategies

### Content Risks

#### Risk: Content moved to tabs/accordions (hides from Google)

**Prevention:**
- Explicitly forbid in SEO contract (Section 10.1)
- Test theme before selection - verify content visibility
- Require content to be visible by default in theme requirements

**Detection:**
- Crawl staging site with Screaming Frog
- Verify product description is in HTML source (not hidden)
- Check that description is visible without user interaction

**Remediation:**
- Move content out of tabs/accordions
- Ensure description is visible by default
- If tabs are needed, ensure initial content is substantial (200+ words)

**Owner:** Development Team  
**Priority:** High

---

#### Risk: JS-only rendering (content not in initial HTML)

**Prevention:**
- Require all primary content (title, description, H1) in initial HTML
- Test theme with JavaScript disabled
- Use server-side rendering for all SEO-critical content

**Detection:**
- Disable JavaScript in browser
- Verify product title, description, H1 are visible
- Check HTML source - content should be present

**Remediation:**
- Move content to server-side rendering
- Ensure content is in initial HTML output
- Remove JS-only rendering for SEO-critical content

**Owner:** Development Team  
**Priority:** High

---

#### Risk: Theme hiding copy by default

**Prevention:**
- Test theme before selection
- Verify content visibility in theme demo
- Require content visibility in theme requirements

**Detection:**
- Crawl staging site
- Check HTML source for content
- Verify content is visible on page load

**Remediation:**
- Configure theme to show content by default
- Disable any "hide by default" settings
- Ensure content is in initial HTML

**Owner:** Development Team  
**Priority:** High

---

#### Risk: Product descriptions truncated

**Prevention:**
- Verify theme doesn't auto-truncate descriptions
- Test with long descriptions
- Require full description display in theme requirements

**Detection:**
- Compare description length pre/post rebuild
- Check if "read more" is hiding content
- Verify full description is accessible

**Remediation:**
- Disable truncation in theme settings
- Show full description by default
- If "read more" is used, ensure initial content is substantial

**Owner:** Development Team  
**Priority:** Medium

---

### URL Risks

#### Risk: Handles accidentally changed during rebuild

**Prevention:**
- Lock handles in SEO contract (non-negotiable)
- Use Shopify product import (not manual entry)
- Export handles CSV before rebuild as backup
- Never manually edit handles during rebuild

**Detection:**
- Compare handles CSV pre/post rebuild
- Verify handles match exactly
- Check for any handle changes in Shopify admin

**Remediation:**
- Revert handle changes immediately
- If handles were changed and URLs indexed, add 301 redirects
- Restore handles from backup CSV

**Owner:** Development Team  
**Priority:** High

---

#### Risk: Canonical tags missing or incorrect

**Prevention:**
- Template canonical tags in theme
- Test canonical tags on staging
- Ensure canonical function is correct

**Detection:**
- Crawl staging site
- Verify canonical tag on all pages
- Check canonical URLs are correct (no query params)

**Remediation:**
- Add canonical tags to theme templates
- Fix canonical function if incorrect
- Ensure canonical points to correct URL

**Owner:** Development Team  
**Priority:** High

---

#### Risk: Query params breaking canonicals

**Prevention:**
- Ensure canonical function strips query params
- Test URLs with query params
- Verify canonical is clean

**Detection:**
- Test URLs with query params (e.g., `?variant=123`)
- Verify canonical tag strips params
- Check canonical URL is clean

**Remediation:**
- Fix canonical function to strip query params
- Ensure canonical always points to clean URL
- Test all query param scenarios

**Owner:** Development Team  
**Priority:** Medium

---

### Technical Risks

#### Risk: Menu links changed/broken

**Prevention:**
- Export menu structure before rebuild
- Preserve menu structure in staging
- Document menu structure in SEO contract

**Detection:**
- Test all menu links
- Verify 200 status codes
- Check links point to correct URLs

**Remediation:**
- Restore menu structure from backup
- Fix broken links
- Ensure menu links use canonical URLs

**Owner:** Development Team  
**Priority:** Medium

---

#### Risk: Footer links changed/broken

**Prevention:**
- Export footer menu before rebuild
- Preserve footer menu in staging
- Document footer menu in SEO contract

**Detection:**
- Test all footer links
- Verify 200 status codes
- Check links point to correct URLs

**Remediation:**
- Restore footer menu from backup
- Fix broken links
- Ensure footer links use canonical URLs

**Owner:** Development Team  
**Priority:** Medium

---

#### Risk: Internal linking structure altered

**Prevention:**
- Crawl baseline before rebuild
- Document internal link structure
- Preserve linking structure in staging

**Detection:**
- Compare internal link counts pre/post rebuild
- Verify link structure matches baseline
- Check for missing links

**Remediation:**
- Restore internal linking structure
- Add missing links
- Ensure links use canonical URLs

**Owner:** Development Team  
**Priority:** Medium

---

#### Risk: Schema markup missing

**Prevention:**
- Template schema in theme
- Test schema on staging
- Validate schema before launch

**Detection:**
- Validate schema on staging pages
- Use Google Rich Results Test
- Check for missing schema

**Remediation:**
- Add schema markup to theme templates
- Fix schema validation errors
- Ensure all required schema is present

**Owner:** Development Team  
**Priority:** Medium

---

### Performance Risks

#### Risk: Slow page load (affects rankings)

**Prevention:**
- Test performance on staging
- Optimize before launch
- Set performance thresholds

**Detection:**
- Run PageSpeed Insights on staging
- Check Core Web Vitals scores
- Monitor LCP, FID, CLS

**Remediation:**
- Optimize images (compress, lazy-load below fold)
- Reduce JavaScript bundle size
- Improve hosting/CDN performance
- Minimize render-blocking resources

**Owner:** Development Team  
**Priority:** Low (indirect SEO impact)

---

#### Risk: Layout shift (CLS issues)

**Prevention:**
- Set explicit image dimensions
- Avoid dynamic content above fold
- Reserve space for dynamic content

**Detection:**
- Run PageSpeed Insights
- Check CLS score
- Test for layout shifts

**Remediation:**
- Set explicit image dimensions
- Reserve space for dynamic content
- Fix layout shifts
- Avoid inserting content above existing content

**Owner:** Development Team  
**Priority:** Low (indirect SEO impact)

---

## Risk Monitoring Schedule

### Pre-Launch (Staging)
- Daily checks for high-priority risks
- Verify all prevention measures are in place
- Test detection methods

### Launch Day
- Monitor all high-priority risks
- Have remediation plans ready
- Quick response team on standby

### Post-Launch (First 7 Days)
- Daily monitoring of high-priority risks
- Weekly monitoring of medium-priority risks
- Document any issues and resolutions

### Post-Launch (After Day 7)
- Weekly monitoring of all risks
- Monthly review of risk register
- Update mitigation strategies as needed

---

## Escalation Process

### High-Priority Risk Detected
1. Immediately notify development team
2. Document the risk and impact
3. Implement remediation strategy
4. Verify fix before proceeding
5. Update risk register with resolution

### Medium-Priority Risk Detected
1. Document the risk
2. Schedule remediation within 24 hours
3. Implement fix
4. Verify resolution
5. Update risk register

### Low-Priority Risk Detected
1. Document the risk
2. Schedule remediation within 1 week
3. Implement fix
4. Verify resolution
5. Update risk register

---

**This risk assessment must be reviewed before production launch.**

