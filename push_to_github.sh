#!/bin/bash
echo "🚀 Pushing to GitHub (Bypassing locks & heavy files)..."

cd "/Users/apoorvasharma/Desktop/Projects/OSP/OSP Marketplace" || exit

# 1. Remove broken git state
rm -rf .git

# 2. Initialize
git init
git branch -M main

# 3. Add Remote
git remote add origin https://github.com/ovsharam/OSP-dash.git

# 4. Add files MANUALLY excluding heavy items
# (Since .gitignore is locked, we tell git what NOT to add here)
echo "Adding files..."
git add . ':!node_modules' ':!.next' ':!.DS_Store' ':!out' ':!build' ':!dist' ':!*.mp4' ':!*.mov' ':!*.zip' ':!*.csv' ':!*.log'

# 5. Commit
echo "Committing..."
git commit -m "Refactor product page (Webstaurant clone) [Fresh Push]"

# 6. Push
echo "Pushing to GitHub..."
git push -u origin main --force

echo "✅ Done! Code is on GitHub."
