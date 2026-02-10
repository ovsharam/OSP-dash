#!/bin/bash
echo "🚀 Starting SMART deployment fix..."

# Change to project directory
cd "/Users/apoorvasharma/Desktop/Projects/OSP/OSP Marketplace" || exit

# 1. Create a proper .gitignore to prevent adding node_modules/etc
echo "Creating .gitignore..."
cat > .gitignore << EOL
node_modules/
.next/
out/
build/
dist/
.DS_Store
.env
.env.local
.vscode/
*.log
EOL

# 2. Clean slate
echo "Cleaning old git config..."
rm -rf .git

# 3. Re-initialize
echo "Initializing git..."
git init
git branch -M main

# 4. Add files (now safe because we ignored node_modules)
echo "Adding files..."
git add .

# 5. Commit
echo "Committing..."
git commit -m "Refactor product page (Webstaurant clone)"

# 6. Push
echo "Pushing to GitHub..."
git remote add origin https://github.com/ovsharam/OSP-dash.git
git push -u origin main --force

echo "✅ DONE! Check Vercel dashboard."
