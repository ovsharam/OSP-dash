# Legacy Name Mappings (Downloaded → New)

You asked for files using the same names as the downloaded Liquid files so you can replace them in Shopify. Below is a mapping of what is now present in `shopify-theme/` and what to swap in the Shopify editor. Files with spaces/parentheses were created exactly as named for easy 1:1 replacement.

## Created with legacy names
- `sections/featured-products (1).liquid` → same as `featured-products-carousel.liquid`
- `sections/featured-collections (1).liquid` → same as `featured-brands.liquid`
- `sections/collection-template (1).liquid` → same as `collection-products.liquid`
- `sections/collection-template-WSGbackup (1).liquid` → same as `collection-products.liquid`
- `sections/shipping-quote (1).liquid` → same as `shipping-quote.liquid`
- `sections/Reviews (1).liquid` → same as `product-reviews.liquid`
- `snippets/collection-grid-item (1).liquid` → same as `product-card.liquid`
- `snippets/collection-grid-collage (1).liquid` → same as `product-card.liquid`

## Templates (Online Store 2.0 JSON)
- Use `templates/index.json` for homepage (`theme.shogun.landing` / `theme` replacements).
- Use `templates/product.json` for `/products/:handle` (sticky ATC, upsell, bundle steps).
- Use `templates/collection.json` for `/collections/:handle` (filters, sorting, quick add).
- Older Liquid templates like `collection (1).liquid`, `collection.image (1).liquid`, `collection.organiccola (1).liquid`, `cart (1).liquid`, `blog (1).liquid`, etc. are not recreated; adopt the JSON templates where applicable.

## Not recreated (out of scope/third-party)
- App/BOLD-specific: `boldcsp_helper (1).liquid`, `bold-set-prices (2).liquid`, `bold-ro (2).liquid`, `bold-ro-price-fix (2).liquid`, `bold-ro-cart (2).liquid`.
- Blog/article/cart/account variants: `blog-masonry (2).liquid`, `blog-basic (2).liquid`, `article-update (2).liquid`, `article-sidebar (2).liquid`, `article-basic (2).liquid`, `article.list-collections (1).liquid`, `article (1).liquid`, `article.backup (1).liquid`.
- Auth/account: `login (1).liquid`, `register (1).liquid`, `register.orig (1).liquid`, `reset_password (1).liquid`, `activate_account (1).liquid`, `addresses (1).liquid`, `account (1).liquid`, `account.edit (1).liquid`, `account-WSGbackup (1).liquid`, `order (1).liquid`.
- Misc: `customer-fields (1).liquid`, `comment (1).liquid`, `ajax-cart-template (3).liquid`, `theme-without-spurit_wsmm (2).liquid`, `theme-without-spurit_stp (2).liquid`, `theme (2).liquid`.

## How to use in Shopify
1) Upload the new files with legacy names into the same folders (`sections/`, `snippets/`) to replace the originals in your theme.
2) Switch your theme to the OS 2.0 JSON templates:
   - Homepage: `templates/index.json`
   - Product: `templates/product.json`
   - Collection: `templates/collection.json`
3) For areas not recreated above (e.g., blog, account, cart), keep existing templates or migrate separately if needed.
