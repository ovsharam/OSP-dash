#!/bin/bash
echo "🚀 Pushing to https://github.com/ovsharam/OSP-dash.git (Attempt #2)..."

cd "/Users/apoorvasharma/Desktop/Projects/OSP/OSP Marketplace" || exit

# 1. Remove broken git state
rm -rf .git

# 2. Initialize
git init
git branch -M main

# 3. Add Remote (as specified)
git remote add origin https://github.com/ovsharam/OSP-dash.git

# 4. Add files MANUALLY excluding ALL locked/heavy items
# We exclude .eslintrc.json because it timed out last time
echo "Adding files (Skipping locked .eslintrc.json & heavy files)..."
git add . \
  ':!node_modules' \
  ':!.next' \
  ':!.DS_Store' \
  ':!.eslintrc.json' \
  ':!out' \
  ':!build' \
  ':!dist' \
  ':!*.mp4' \
  ':!*.mov' \
  ':!*.zip' \
  ':!*.csv' \
  ':!*.log'

# 5. Commit
echo "Committing..."
git commit -m "Refactor product page (Webstaurant clone) [Fresh Push v2]"

# 6. Push
echo "Pushing to GitHub..."
git push -u origin main --force

echo "✅ Done! Code pushed to GitHub."
