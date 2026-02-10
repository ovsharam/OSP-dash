#!/bin/bash
echo "🚀 Deploying directly to Vercel (Bypassing Git)..."

cd "/Users/apoorvasharma/Desktop/Projects/OSP/OSP Marketplace" || exit

# Deploy to production with auto-confirmation
npx vercel deploy --prod --yes

echo "✅ Deployment command sent."
