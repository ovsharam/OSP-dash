#!/bin/bash
echo "🚀 Linking to 'osp-dash' on Vercel and deploying..."

cd "/Users/apoorvasharma/Desktop/Projects/OSP/OSP Marketplace" || exit

# 1. Force Link to the specific project and scope
# This connects your local folder to the "osp-dash" project in your "asharma42-8268" account
npx vercel link --scope asharma42-8268 --project osp-dash --yes

# 2. Deploy to Production
echo "Uploading files to Vercel..."
npx vercel deploy --prod

echo "✅ Deployment initiated! Check your dashboard."
