#!/bin/bash
echo "🔓 Attempting to remove Git lock files..."

cd "/Users/apoorvasharma/Desktop/Projects/OSP/OSP Marketplace" || exit

# Remove standard git lock files
rm -f .git/index.lock
rm -f .git/HEAD.lock
rm -f .git/config.lock
rm -f .git/refs/heads/main.lock
rm -f .git/refs/remotes/origin/main.lock

echo "✅ Lock files removed. You can try running your git commands again."
echo "If issues persist, try closing VS Code or any running dev servers momentarily."
