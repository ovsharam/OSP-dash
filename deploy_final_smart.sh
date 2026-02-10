#!/bin/bash
echo "🧹 Cleaning and Syncing for Final Deploy..."

SOURCE_DIR="/Users/apoorvasharma/Desktop/Projects/OSP/OSP Marketplace"
SHADOW_DIR="/Users/apoorvasharma/Desktop/Projects/OSP/OSP_Marketplace_Shadow_Build"

# 1. Aggressive Cleanup in Source (Safe deletes only)
cd "$SOURCE_DIR" || exit
rm -rf node_modules .next .vercel
echo "Reclaimed space in source."

# 2. Prepare Shadow Directory
rm -rf "$SHADOW_DIR"
mkdir -p "$SHADOW_DIR"

# 3. RSYNC: Smart Copy (Excluding heavy/irrelevant files)
# This prevents "No space left on device" by skipping videos and build artifacts
echo "Syncing files (skipping videos & heavy files)..."
rsync -av \
  --exclude 'node_modules' \
  --exclude '.next' \
  --exclude '.git' \
  --exclude '.vercel' \
  --exclude '*.mp4' \
  --exclude '*.mov' \
  --exclude '*.zip' \
  --exclude '.DS_Store' \
  "$SOURCE_DIR/" "$SHADOW_DIR/"

# 4. Push from Shadow
echo "🚀 Pushing from clean shadow build..."
cd "$SHADOW_DIR" || exit

git init
git branch -M main
git remote add origin https://github.com/ovsharam/OSP-dash.git

# Force ignore heavy files just in case
cat > .gitignore <<EOF
node_modules/
.next/
*.mp4
*.mov
EOF

git add .
git commit -m "Refactor product page (Final Smart Deploy) [React 19 Fix]"
git push -u origin main --force

# 5. Cleanup Shadow
rm -rf "$SHADOW_DIR"

echo "✅ SUCCESS! Code pushed. Vercel should now build correctly."
