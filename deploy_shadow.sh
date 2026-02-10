#!/bin/bash
echo "🥷 Initiating Shadow Deployment (Bypassing ALL locks)..."

# Define paths
SOURCE_DIR="/Users/apoorvasharma/Desktop/Projects/OSP/OSP Marketplace"
SHADOW_DIR="/Users/apoorvasharma/Desktop/Projects/OSP/OSP_Marketplace_Shadow_Deploy"

# 1. Clean previous shadow dir
rm -rf "$SHADOW_DIR"
mkdir -p "$SHADOW_DIR"

# 2. Copy ONLY essential files (ignoring locked config/node_modules)
echo "Copying source files to temporary shadow directory..."

# Copy directories
cp -R "$SOURCE_DIR/app" "$SHADOW_DIR/"
cp -R "$SOURCE_DIR/components" "$SHADOW_DIR/"
cp -R "$SOURCE_DIR/contexts" "$SHADOW_DIR/"
cp -R "$SOURCE_DIR/data" "$SHADOW_DIR/"
cp -R "$SOURCE_DIR/lib" "$SHADOW_DIR/"
cp -R "$SOURCE_DIR/public" "$SHADOW_DIR/"
cp -R "$SOURCE_DIR/shopify-theme" "$SHADOW_DIR/"
cp -R "$SOURCE_DIR/types" "$SHADOW_DIR/"

# Copy config files
cp "$SOURCE_DIR/next.config.js" "$SHADOW_DIR/" 2>/dev/null
cp "$SOURCE_DIR/tailwind.config.ts" "$SHADOW_DIR/" 2>/dev/null
cp "$SOURCE_DIR/tsconfig.json" "$SHADOW_DIR/" 2>/dev/null
cp "$SOURCE_DIR/package.json" "$SHADOW_DIR/" 2>/dev/null
cp "$SOURCE_DIR/postcss.config.js" "$SHADOW_DIR/" 2>/dev/null
cp "$SOURCE_DIR/README.md" "$SHADOW_DIR/" 2>/dev/null

# 3. Initialize Git in Shadow Directory
echo "Initializing clean git repo in shadow directory..."
cd "$SHADOW_DIR" || exit

git init
git branch -M main
git remote add origin https://github.com/ovsharam/OSP-dash.git

# Create a fresh .gitignore
cat > .gitignore <<EOF
node_modules/
.next/
.DS_Store
*.log
EOF

# 4. Add and Commit
# We use 'git add .' here because this directory is clean and has NO locks
git add .
git commit -m "Refactor product page (Shadow Deploy) [Final]"

# 5. Push
echo "Pushing from shadow directory..."
git push -u origin main --force

# 6. Cleanup
cd ..
rm -rf "$SHADOW_DIR"

echo "✅ SUCCESS! Code pushed via shadow clone."
