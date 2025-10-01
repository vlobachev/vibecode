#!/bin/bash
# Validate project structure

set -e

echo "Validating project structure..."

# Check for required directories
required_dirs=(
    "docs"
    "docs/architecture"
    "docs/guides"
    "policies"
    "prompts"
    "templates"
    "scripts"
    "tests/golden"
    "examples"
)

missing_dirs=()

for dir in "${required_dirs[@]}"; do
    if [ ! -d "$dir" ]; then
        missing_dirs+=("$dir")
    fi
done

if [ ${#missing_dirs[@]} -ne 0 ]; then
    echo "❌ Missing required directories:"
    printf '  - %s\n' "${missing_dirs[@]}"
    exit 1
fi

# Check for required files
required_files=(
    "README.md"
    "AGENTS.md"
    "docs/PROJECT_STRUCTURE.md"
    "docs/README.md"
    "docs/architecture/SYSTEM_ARCHITECTURE.md"
    "docs/guides/CONTRIBUTING.md"
    "docs/guides/ONBOARDING.md"
    "policies/CODEOWNERS"
    "policies/REVIEW.md"
)

missing_files=()

for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        missing_files+=("$file")
    fi
done

if [ ${#missing_files[@]} -ne 0 ]; then
    echo "⚠️  Missing recommended files:"
    printf '  - %s\n' "${missing_files[@]}"
    # Don't fail, just warn
fi

echo "✓ Project structure validation passed"
