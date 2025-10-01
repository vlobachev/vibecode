#!/bin/bash
# Setup script for pre-commit hooks

set -e

echo "🔧 Setting up pre-commit hooks for Vibecode Blueprint..."

# Check if pre-commit is installed
if ! command -v pre-commit &> /dev/null; then
    echo "📦 Installing pre-commit..."

    if command -v brew &> /dev/null; then
        # macOS with Homebrew
        brew install pre-commit
    elif command -v pip3 &> /dev/null; then
        # Using pip3
        pip3 install pre-commit
    elif command -v pip &> /dev/null; then
        # Using pip
        pip install pre-commit
    else
        echo "❌ Error: Could not find brew, pip3, or pip to install pre-commit"
        echo "Please install pre-commit manually: https://pre-commit.com/#install"
        exit 1
    fi
fi

# Install pre-commit hooks
echo "📝 Installing pre-commit hooks..."
pre-commit install

# Run pre-commit on all files to verify setup
echo "✅ Running pre-commit on all files to verify setup..."
pre-commit run --all-files || true

echo ""
echo "✅ Pre-commit hooks installed successfully!"
echo ""
echo "📚 Usage:"
echo "  - Hooks will run automatically on 'git commit'"
echo "  - Run manually: pre-commit run --all-files"
echo "  - Update hooks: pre-commit autoupdate"
echo "  - Skip hooks: git commit --no-verify (not recommended)"
echo ""
echo "🔍 What gets checked:"
echo "  ✓ Trailing whitespace and file endings"
echo "  ✓ YAML and JSON syntax validation"
echo "  ✓ Markdown linting"
echo "  ✓ Code formatting with Prettier"
echo "  ✓ Project structure validation"
echo "  ✓ Large file detection"
echo "  ✓ Private key detection"
echo ""
