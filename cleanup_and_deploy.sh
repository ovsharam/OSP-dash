#!/bin/bash
echo "🧹 Low Disk Space Detected! Cleaning up to enable deployment..."

cd "/Users/apoorvasharma/Desktop/Projects/OSP/OSP Marketplace" || exit

# 1. Delete heavy generated folders to free space (Safe to delete, can be re-generated)
echo "Deleting node_modules and .next..."
rm -rf node_modules
rm -rf .next
rm -rf .vercel

# 2. Delete previous shadow directory
rm -rf "/Users/apoorvasharma/Desktop/Projects/OSP/OSP_Marketplace_Shadow_Deploy"

# 3. Check space
df -h .

# 4. Run Shadow Deploy
echo "♻️ Retrying Shadow Deploy with more space..."
sh deploy_shadow.sh
