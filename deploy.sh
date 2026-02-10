#!/bin/bash
echo "Deploying to Vercel via Git..."

# Change to project directory
cd "/Users/apoorvasharma/Desktop/Projects/OSP/OSP Marketplace" || exit

# Add all changes
git add .

# Commit changes
git commit -m "Refactor product page structure (Webstaurant clone)"

# Push to main branch
git push origin main

echo "Changes pushed! Vercel deployment should trigger automatically."
