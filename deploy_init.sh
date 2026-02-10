#!/bin/bash
echo "Initializing Git and Deploying..."

# Change to project directory
cd "/Users/apoorvasharma/Desktop/Projects/OSP/OSP Marketplace" || exit

# Initialize git if not already
if [ ! -d ".git" ]; then
  git init
  git branch -M main
  echo "Git initialized."
fi

# Add remote if not exists
if ! git remote | grep -q origin; then
  git remote add origin https://github.com/ovsharam/OSP-dash.git
  echo "Remote added."
fi

# Add all changes
git add .

# Commit changes
git commit -m "Refactor product page structure (Webstaurant clone)"

# Push to main branch (force to overwrite if history mismatch)
echo "Pushing to GitHub..."
git push -u origin main --force

echo "Changes pushed! Vercel deployment should trigger automatically."
