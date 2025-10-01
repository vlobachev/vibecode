#!/bin/bash
# Check AGENTS.md file validity

set -e

echo "Checking AGENTS.md..."

if [ ! -f "AGENTS.md" ]; then
    echo "❌ AGENTS.md file not found"
    exit 1
fi

# Check minimum file size (should have content)
file_size=$(wc -c < "AGENTS.md")
if [ "$file_size" -lt 100 ]; then
    echo "❌ AGENTS.md appears to be empty or too small"
    exit 1
fi

# Check for key sections (basic validation)
if ! grep -q "# " "AGENTS.md"; then
    echo "⚠️  AGENTS.md should contain markdown headers"
fi

echo "✓ AGENTS.md validation passed"
