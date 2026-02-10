#!/bin/bash
echo "🚀 Pushing to GitHub (Manual Add Mode)..."

cd "/Users/apoorvasharma/Desktop/Projects/OSP/OSP Marketplace" || exit

# 1. Remove broken git state
rm -rf .git

# 2. Initialize
git init
git branch -M main

# 3. Add Remote
git remote add origin https://github.com/ovsharam/OSP-dash.git

# 4. Add files EXPLICITLY by name (Avoids 'git add .' which hits locked config files)
echo "Adding core directories..."
git add app components contexts data lib public types shopify-theme

echo "Adding config files..."
git add next.config.js tailwind.config.ts tsconfig.json package.json postcss.config.js README.md

# 5. Commit
echo "Committing..."
git commit -m "Refactor product page (Webstaurant clone) [Manual Push]"

# 6. Push
echo "Pushing to GitHub..."
git push -u origin main --force

echo "✅ Done! Code pushed to GitHub."
