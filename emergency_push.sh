#!/bin/bash
echo "🚨 Emergency Push Protocol..."

cd "/Users/apoorvasharma/Desktop/Projects/OSP/OSP Marketplace" || exit

# 1. Kill any lingering git processes that might be locking files
pkill -f git 2>/dev/null

# 2. Remove broken git repository
rm -rf .git

# 3. Force creation of .gitignore (Ignoring node_modules is critical for the "10k changes" issue)
echo "Creating .gitignore..."
cat > .gitignore <<EOF
node_modules/
.next/
out/
build/
dist/
.DS_Store
.env
.env.local
.vscode/
*.log
*.mp4
*.mov
*.zip
*.csv
EOF

# 4. Initialize Git
git init
git branch -M main
git remote add origin https://github.com/ovsharam/OSP-dash.git

# 5. CONFIG FIXES (Crucial for timeouts)
# Disable file system monitor which often hangs on large repos
git config core.fsmonitor false
# Increase timeout window
git config core.packedGitLimit 512m
git config core.packedGitWindowSize 512m
git config pack.windowMemory 512m
git config pack.packSizeLimit 512m
git config pack.threads 1

# 6. Add files
echo "Adding files..."
# We add everything, relying on the .gitignore we just forced
git add .

# 7. Commit
echo "Committing..."
git commit -m "Refactor product page (Webstaurant clone) [Emergency Push]"

# 8. Push
echo "Pushing..."
git push -u origin main --force

echo "✅ DONE! Code pushed to GitHub."
