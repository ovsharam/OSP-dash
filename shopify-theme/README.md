# Shopify Theme Files

This directory contains Shopify Liquid templates and assets that will be ported to your Shopify store during the rebuild.

## Files

### Sections
- `sections/shipping-quote.liquid` - Freight shipping quote calculator section

### Assets
- `assets/shipping.js` - JavaScript for Echo shipping API integration
- `assets/freight-map.json` - Freight mapping configuration

## Usage

### Adding to Shopify Theme

1. **Upload Section**:
   - Go to Shopify Admin → Online Store → Themes
   - Click "Edit code" on your theme
   - Navigate to `sections/`
   - Upload `shipping-quote.liquid`

2. **Upload Assets**:
   - In theme editor, navigate to `assets/`
   - Upload `shipping.js`
   - Upload `freight-map.json`

3. **Add Section to Cart Page**:
   - Go to Online Store → Themes → Customize
   - Navigate to Cart page
   - Add section "Shipping Quote"
   - Save

### Features

- **Auto-parses dimensions/weight** from product descriptions
- **Customer enters only ZIP code** - everything else is auto-filled
- **Integrates with Echo shipping API** for live freight quotes
- **Responsive design** - works on mobile and desktop
- **Cart update hooks** - updates when cart changes via AJAX

### Product Description Format

For the parser to work, product descriptions should include:

```
Height: 59.5
Width: 30.0
Depth: 34.0
Shipping: 85
```

The parser looks for:
- `Height: [number]` - Height in inches
- `Width: [number]` - Width in inches
- `Depth: [number]` - Depth in inches
- `Shipping: [number]` - Shipping weight in pounds

### API Integration

The section integrates with Echo shipping API at:
- `https://echo-ship.onrender.com/cart-echo-quote`

Make sure this endpoint is configured and accessible.

### Cart Update Integration

To update shipping quote when cart changes via AJAX:

**Option 1: Dispatch Event**
```javascript
window.dispatchEvent(new CustomEvent('osp:cart-updated', { 
  detail: cartObject 
}));
```

**Option 2: Call Helper**
```javascript
window.OSP_updateShippingQuoteFromCart(cartObject);
```

## SEO Considerations

This section is for cart/checkout pages and should:
- ✅ Not be indexed (cart pages are typically noindex)
- ✅ Not affect product page SEO
- ✅ Only appear on cart/checkout pages

## Notes

- Origin ZIP is currently hardcoded to `78219` (Lancer Worldwide, San Antonio, TX)
- Can be made per-product later if needed
- Freight class defaults to 70 (standard palletized goods)
- Minimum weight is 150 lbs (configurable in `shipping.js`)

