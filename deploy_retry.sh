#!/bin/bash
echo "🚀 Retrying Deployment (Clean Slate)..."

cd "/Users/apoorvasharma/Desktop/Projects/OSP/OSP Marketplace" || exit

# 1. Clean up previous Vercel state to avoid conflicts
rm -rf .vercel

# 2. Link to the project
# We use the specific scope and project name you provided
npx vercel link --scope asharma42-8268 --project osp-dash --yes

# 3. Deploy
# .vercelignore should now prevent node_modules from being uploaded, fixing the timeout
echo "Uploading (ignoring heavy files)..."
npx vercel deploy --prod

echo "✅ Deployment initiated!"
