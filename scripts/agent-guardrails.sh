#!/bin/bash
# Agent Guardrails - Pre-commit validation script
# Ensures AI-generated code meets quality standards before commit

# Note: Removed 'set -e' to allow script to continue on non-critical errors
# Individual critical errors will still cause explicit exits

echo "🤖 Running AI code guardrails..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
MAX_FILE_SIZE=50000  # 50KB
MAX_FUNCTION_LENGTH=100
MIN_TEST_COVERAGE=80

# Initialize counters
ERRORS=0
WARNINGS=0

# Helper functions
error() {
    echo -e "${RED}❌ ERROR: $1${NC}"
    ((ERRORS++))
}

warning() {
    echo -e "${YELLOW}⚠️  WARNING: $1${NC}"
    ((WARNINGS++))
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

info() {
    echo "ℹ️  $1"
}

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    error "Not in a git repository"
    exit 1
fi

# Get list of staged files
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM)

if [ -z "$STAGED_FILES" ]; then
    info "No staged files to check"
    exit 0
fi

info "Checking $(echo "$STAGED_FILES" | wc -l) staged files..."

# 1. Check for large files
echo "🔍 Checking file sizes..."
for file in $STAGED_FILES; do
    if [ -f "$file" ]; then
        size=$(wc -c < "$file")
        if [ $size -gt $MAX_FILE_SIZE ]; then
            warning "Large file detected: $file ($size bytes > $MAX_FILE_SIZE)"
        fi
    fi
done

# 2. Check for forbidden patterns
echo "🔍 Checking for forbidden patterns..."
FORBIDDEN_PATTERNS=(
    "debugger"
    "TODO.*FIXME"
    "\.only\("
    "\.skip\("
    "password.*=.*['\"]"
    "api[_-]?key.*=.*['\"]"
    "secret.*=.*['\"]"
)

for pattern in "${FORBIDDEN_PATTERNS[@]}"; do
    matches=$(git diff --cached | grep -E "^\+.*$pattern" || true)
    if [ -n "$matches" ]; then
        # Check if any of the staged files with this pattern are GitHub workflows
        workflow_files=$(git diff --cached --name-only | grep "\.github/workflows/" || true)
        if [ -n "$workflow_files" ]; then
            # Check if the pattern appears in workflow files specifically
            workflow_pattern_found=false
            for workflow_file in $workflow_files; do
                if git diff --cached "$workflow_file" | grep -E "^\+.*$pattern" > /dev/null 2>&1; then
                    workflow_pattern_found=true
                    break
                fi
            done
            
            if [ "$workflow_pattern_found" = true ]; then
                info "Security pattern '$pattern' found in GitHub workflow (acceptable for security scanning)"
            else
                error "Forbidden pattern '$pattern' found in staged changes"
                echo "$matches"
            fi
        else
            error "Forbidden pattern '$pattern' found in staged changes"
            echo "$matches"
        fi
    fi
done

# Check for console.log but allow it in CLI tools (src/ directory)
console_matches=$(git diff --cached | grep -E "^\+.*console\.log" || true)
if [ -n "$console_matches" ]; then
    # Check if console.log is in CLI tools (src/ directory)
    cli_files=$(git diff --cached --name-only | grep "^src/" || true)
    if [ -z "$cli_files" ]; then
        error "Forbidden pattern 'console\.log' found in staged changes (use proper logging instead)"
        echo "$console_matches"
    else
        info "console.log found in CLI tools - this is acceptable for user output"
    fi
fi

# 3. Check for proper AI attribution in commits
echo "🔍 Checking commit message format..."
COMMIT_MSG_FILE=".git/COMMIT_EDITMSG"
# Note: During pre-commit hook, the commit message might not be available yet
# This check is more relevant for commit-msg hook, so we'll make it informational
if [ -f "$COMMIT_MSG_FILE" ]; then
    if ! grep -q "AI-Generated:" "$COMMIT_MSG_FILE"; then
        info "Reminder: Include 'AI-Generated: [Yes/No]' field in commit message"
    fi
    if ! grep -q "Reviewed-by:" "$COMMIT_MSG_FILE"; then
        info "Reminder: Include 'Reviewed-by: [reviewer name]' field in commit message"
    fi
else
    info "Reminder: Use proper commit message format with AI-Generated and Reviewed-by fields"
fi

# 4. Check TypeScript/JavaScript specific patterns
echo "🔍 Checking code quality..."
for file in $STAGED_FILES; do
    if [[ $file =~ \.(ts|tsx|js|jsx)$ ]]; then
        if [ -f "$file" ]; then
            # Check for overly long functions (simplified check)
            func_count=$(grep -c "function\|const.*=>\|class.*{" "$file" 2>/dev/null || echo "0")
            file_lines=$(wc -l < "$file" 2>/dev/null || echo "0")
            if [ "$func_count" -gt 0 ] && [ "$file_lines" -gt $((MAX_FUNCTION_LENGTH * 2)) ]; then
                warning "Large file with functions detected in $file ($file_lines lines, consider refactoring)"
            fi
            
            # Check for missing error handling
            if grep -q "await\|\.then(" "$file" && ! grep -q "catch\|try" "$file"; then
                warning "Async code without error handling in $file"
            fi
            
            # Check for proper TypeScript usage
            if [[ $file =~ \.tsx?$ ]]; then
                if grep -q ": any" "$file"; then
                    warning "TypeScript 'any' type usage in $file"
                fi
            fi
        fi
    fi
done

# 5. Check for test files alongside code changes
echo "🔍 Checking test coverage..."
CODE_FILES=$(echo "$STAGED_FILES" | grep -E '\.(ts|tsx|js|jsx)$' | grep -v '\.test\.' | grep -v '\.spec\.' || true)
TEST_FILES=$(echo "$STAGED_FILES" | grep -E '\.(test|spec)\.(ts|tsx|js|jsx)$' || true)

if [ -n "$CODE_FILES" ] && [ -z "$TEST_FILES" ]; then
    warning "Code changes without corresponding test changes"
fi

# 6. Check for security issues
echo "🔍 Checking security patterns..."
SECURITY_PATTERNS=(
    "eval\("
    "innerHTML\s*="
    "document\.write"
    "\.html\("
    "SQL.*INSERT.*VALUES"
    "process\.env\..*PASSWORD"
    "process\.env\..*SECRET"
    "process\.env\..*KEY"
)

for pattern in "${SECURITY_PATTERNS[@]}"; do
    matches=$(git diff --cached | grep -E "^\+.*$pattern" || true)
    if [ -n "$matches" ]; then
        error "Potential security issue: pattern '$pattern' found"
        echo "$matches"
    fi
done

# 7. Check for proper imports and exports
echo "🔍 Checking import/export patterns..."
for file in $STAGED_FILES; do
    if [[ $file =~ \.(ts|tsx|js|jsx)$ ]] && [ -f "$file" ]; then
        # Check for circular dependencies (basic check)
        if grep -q "import.*\.\." "$file" && grep -q "export.*from.*\.\." "$file"; then
            warning "Potential circular dependency pattern in $file"
        fi
        
        # Check for absolute imports in packages (encourage relative imports within packages)
        if [[ $file =~ ^packages/ ]] && grep -q "import.*@/" "$file"; then
            info "Consider using relative imports within the same package in $file"
        fi
    fi
done

# 8. Validate JSON files
echo "🔍 Checking JSON syntax..."
for file in $STAGED_FILES; do
    if [[ $file =~ \.json$ ]] && [ -f "$file" ]; then
        if ! node -e "JSON.parse(require('fs').readFileSync('$file', 'utf8'))" > /dev/null 2>&1; then
            error "Invalid JSON syntax in $file"
        fi
    fi
done

# 9. Check for package.json changes
echo "🔍 Checking package.json changes..."
if echo "$STAGED_FILES" | grep -q "package\.json\|yarn\.lock\|package-lock\.json"; then
    warning "Package dependencies changed - ensure this was intentional and approved"
fi

# 10. Check for golden test modifications
echo "🔍 Checking golden test changes..."
if echo "$STAGED_FILES" | grep -q "tests/golden/"; then
    warning "Golden test snapshots modified - verify these changes are correct"
fi

# 11. Run linting on staged files
echo "🔍 Running linter..."
if command -v eslint &> /dev/null; then
    JS_FILES=$(echo "$STAGED_FILES" | grep -E '\.(ts|tsx|js|jsx)$' || true)
    if [ -n "$JS_FILES" ]; then
        for file in $JS_FILES; do
            if [ -f "$file" ]; then
                if ! eslint "$file" --quiet 2>/dev/null; then
                    warning "Linting issues found in $file (run 'pnpm run lint' to see details)"
                fi
            fi
        done
    fi
else
    info "ESLint not found globally - skipping lint check (install with 'pnpm install' and run 'pnpm run lint')"
fi

# 12. Run markdown linting with automatic fixes
echo "🔍 Running markdown linter with automatic fixes..."
MD_FILES=$(echo "$STAGED_FILES" | grep -E '\.md$' || true)
if [ -n "$MD_FILES" ]; then
    if command -v npx &> /dev/null; then
        # First, try to automatically fix markdown issues
        echo "🔧 Attempting to automatically fix markdown issues..."
        for file in $MD_FILES; do
            if [ -f "$file" ]; then
                if npx markdownlint-cli2 "$file" --fix --config .markdownlint.json 2>/dev/null; then
                    success "Auto-fixed markdown issues in $file"
                    # Re-stage the fixed file
                    git add "$file"
                else
                    # If auto-fix fails, just check for issues
                    if ! npx markdownlint-cli2 "$file" --config .markdownlint.json 2>/dev/null; then
                        warning "Markdown linting issues found in $file (some may require manual fixes)"
                    fi
                fi
            fi
        done
    else
        warning "npx not found - skipping markdown linting (install Node.js)"
    fi
else
    info "No markdown files staged - skipping markdown linting"
fi

# 13. Check for proper branch naming
echo "🔍 Checking branch naming..."
BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)
if [[ ! $BRANCH_NAME =~ ^(feature|fix|hotfix|refactor|chore)/.+ ]]; then
    if [ "$BRANCH_NAME" != "main" ] && [ "$BRANCH_NAME" != "develop" ]; then
        warning "Branch name '$BRANCH_NAME' doesn't follow naming convention (feature/*, fix/*, etc.)"
    fi
fi

# Summary
echo ""
echo "📊 Guardrails Summary:"
if [ $ERRORS -gt 0 ]; then
    echo -e "${RED}❌ $ERRORS error(s) found${NC}"
fi
if [ $WARNINGS -gt 0 ]; then
    echo -e "${YELLOW}⚠️  $WARNINGS warning(s) found${NC}"
fi

if [ $ERRORS -gt 0 ]; then
    echo ""
    echo -e "${RED}🚫 Pre-commit validation failed. Please fix errors before committing.${NC}"
    echo "Run 'git status' to see staged files and address the issues above."
    exit 1
fi

if [ $WARNINGS -gt 0 ]; then
    echo ""
    echo -e "${YELLOW}⚠️  Pre-commit validation passed with warnings.${NC}"
    echo "Consider addressing warnings to improve code quality."
else
    success "All guardrails passed!"
fi

echo ""
echo "🤖 AI code guardrails completed successfully!"
exit 0
