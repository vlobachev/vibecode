#!/bin/bash
# Setup script for Collaborative Vibecoding Project
# Initializes the project structure and configures git hooks

set -e

echo "🚀 Setting up Collaborative Vibecoding Project..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Not in a git repository. Please run 'git init' first."
    exit 1
fi

# Make scripts executable
echo -e "${BLUE}📁 Making scripts executable...${NC}"
chmod +x scripts/agent-guardrails.sh

# Set up git hooks (optional)
echo -e "${BLUE}🔗 Setting up git hooks...${NC}"
read -p "Do you want to install the pre-commit hook for AI code validation? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    # Create pre-commit hook
    cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
# Pre-commit hook to run AI code guardrails
exec ./scripts/agent-guardrails.sh
EOF
    chmod +x .git/hooks/pre-commit
    echo -e "${GREEN}✅ Pre-commit hook installed${NC}"
else
    echo "ℹ️  Skipping pre-commit hook installation"
fi

# Create sample configuration files
echo -e "${BLUE}⚙️  Creating sample configuration files...${NC}"

# Create sample .agents.md if it doesn't exist
if [ ! -f "AGENTS.md" ]; then
    warning "AGENTS.md not found - this should be customized for your project"
    info "Please copy and customize the AGENTS.md file from the vibecoding template"
fi

# Sample package.json for monorepo root
if [ ! -f "package.json" ]; then
    cat > package.json << 'EOF'
{
  "name": "collaborative-vibecoding-project",
  "version": "1.0.0",
  "private": true,
  "description": "AI-assisted collaborative development project",
  "workspaces": [
    "packages/*"
  ],
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "lint": "turbo run lint",
    "test": "turbo run test",
    "type-check": "turbo run type-check",
    "clean": "turbo run clean",
    "guardrails": "./scripts/agent-guardrails.sh"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0",
    "turbo": "^1.10.0",
    "typescript": "^5.0.0"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
EOF
    echo -e "${GREEN}✅ Created package.json${NC}"
fi

# Sample ESLint configuration
if [ ! -f ".eslintrc.js" ]; then
    cat > .eslintrc.js << 'EOF'
module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  env: {
    node: true,
    es2022: true,
  },
  rules: {
    // Enforce consistent code style
    'prefer-const': 'error',
    'no-var': 'error',
    'no-console': 'warn',
    
    // TypeScript specific
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    
    // Security
    'no-eval': 'error',
    'no-implied-eval': 'error',
  },
  ignorePatterns: [
    'node_modules/',
    'dist/',
    'build/',
    '*.js' // Allow JS files for config
  ],
};
EOF
    echo -e "${GREEN}✅ Created .eslintrc.js${NC}"
fi

# Sample Prettier configuration
if [ ! -f ".prettierrc" ]; then
    cat > .prettierrc << 'EOF'
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
EOF
    echo -e "${GREEN}✅ Created .prettierrc${NC}"
fi

# Sample TypeScript configuration
if [ ! -f "tsconfig.json" ]; then
    cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "composite": true,
    "incremental": true
  },
  "include": [
    "packages/*/src/**/*",
    "scripts/**/*",
    "tests/**/*"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "build",
    "**/*.test.ts",
    "**/*.spec.ts"
  ]
}
EOF
    echo -e "${GREEN}✅ Created tsconfig.json${NC}"
fi

# Sample GitHub Actions workflow
mkdir -p .github/workflows
if [ ! -f ".github/workflows/ci.yml" ]; then
    cat > .github/workflows/ci.yml << 'EOF'
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linting
      run: npm run lint
    
    - name: Run type checking
      run: npm run type-check
    
    - name: Run tests
      run: npm run test
    
    - name: Run AI code guardrails
      run: npm run guardrails

  security-scan:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Run security audit
      run: npm audit --audit-level moderate
    
    - name: Scan for secrets
      uses: trufflesecurity/trufflehog@main
      with:
        path: ./
        base: main
        head: HEAD
EOF
    echo -e "${GREEN}✅ Created GitHub Actions workflow${NC}"
fi

# Sample .gitignore
if [ ! -f ".gitignore" ]; then
    cat > .gitignore << 'EOF'
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Production builds
dist/
build/
*.tsbuildinfo

# Environment variables
.env
.env.local
.env.production
.env.development

# IDE files
.vscode/
.idea/
*.swp
*.swo
*~

# OS files
.DS_Store
Thumbs.db

# Logs
logs/
*.log

# Runtime data
pids/
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# parcel-bundler cache
.cache
.parcel-cache

# Turbo
.turbo/
EOF
    echo -e "${GREEN}✅ Created .gitignore${NC}"
fi

# Create sample package directories
echo -e "${BLUE}📦 Creating sample package structure...${NC}"
mkdir -p packages/core/src
mkdir -p packages/api/src
mkdir -p packages/web/src
mkdir -p packages/shared-types/src

# Initialize git configuration
echo -e "${BLUE}🔧 Configuring git for AI collaboration...${NC}"

# Set up commit template
cat > .gitmessage << 'EOF'
# [type](scope): brief description
#
# Detailed explanation of the change and why it was made.
# Include context about the problem being solved.
#
# - Key change 1
# - Key change 2
# - Key change 3
#
# AI-Generated: [Yes/No]
# Reviewed-by: [Human reviewer name]
# Refs: #[issue number]
EOF

git config commit.template .gitmessage
echo -e "${GREEN}✅ Configured git commit template${NC}"

# Final setup summary
echo ""
echo -e "${GREEN}🎉 Setup Complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Customize AGENTS.md with your project specifics"
echo "2. Update the README.md with your project details"
echo "3. Install your preferred AI coding assistant (Windsurf, Roo Code, KiloCode)"
echo "4. Review and customize the prompt templates in /prompts/"
echo "5. Set up your CI/CD pipeline"
echo "6. Train your team on the vibecoding workflow"
echo ""
echo -e "${BLUE}📚 Documentation:${NC}"
echo "- Start with: docs/guides/ONBOARDING.md"
echo "- Contributing: docs/guides/CONTRIBUTING.md"
echo "- Architecture: docs/architecture/SYSTEM_ARCHITECTURE.md"
echo ""
echo -e "${YELLOW}⚡ Quick commands:${NC}"
echo "- Run guardrails: npm run guardrails"
echo "- Build all packages: npm run build"
echo "- Run tests: npm run test"
echo "- Lint code: npm run lint"
echo ""
echo -e "${GREEN}Happy vibecoding! 🤖✨${NC}"
