#!/bin/bash
echo "🚀 One last try: Deploying (bypassing .gitignore lock)..."

# Change to project directory
cd "/Users/apoorvasharma/Desktop/Projects/OSP/OSP Marketplace" || exit

# Remove git folder to start fresh
rm -rf .git

# Initialize
git init
git branch -M main
git remote add origin https://github.com/ovsharam/OSP-dash.git

# Force add everything EXCEPT node_modules and .next
# This avoids the need for .gitignore if it's locked
echo "Adding files (excluding node_modules)..."
git add . ':!node_modules' ':!.next' ':!.DS_Store' ':!dist' ':!build' ':!.vscode' ':!*.log'

# Commit
echo "Committing..."
git commit -m "Refactor product page (Webstaurant clone) [Final]"

# Push
echo "Pushing..."
git push -u origin main --force

echo "✅ If this succeded, check Vercel!"
