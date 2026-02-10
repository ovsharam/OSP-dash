#!/bin/bash
echo "Attemping FORCE deployment (resetting git configuration)..."

# Change to project directory
cd "/Users/apoorvasharma/Desktop/Projects/OSP/OSP Marketplace" || exit

# REMOVE existing corrupted git configuration
rm -rf .git

# Re-initialize from scratch
git init
git branch -M main

# Re-connect to remote
git remote add origin https://github.com/ovsharam/OSP-dash.git

# Stage and Commit
git add .
git commit -m "Refactor product page structure [Force Deploy]"

# Force Push
echo "Pushing to GitHub..."
git push -u origin main --force

echo "✅ Success! Changes forced to GitHub. Vercel should deploy now."
