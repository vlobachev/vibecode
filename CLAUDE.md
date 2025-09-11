# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a collaborative vibecoding project - a framework for natural-language driven development through agentic IDEs for team collaboration. The project provides rules, shared prompts, examples, and collaboration artifacts to enable teams to co-develop in a monorepo using AI coding tools.

## Development Commands

### Setup & Dependencies
```bash
chmod +x setup.sh && ./setup.sh      # Initial project setup
chmod +x scripts/agent-guardrails.sh # Make guardrails executable
npm ci                                # Install dependencies (when package.json exists)
```

### Quality & Validation
```bash
npm run guardrails          # Run AI code guardrails validation
./scripts/agent-guardrails.sh  # Direct guardrail script execution
npm run lint               # Run ESLint (when configured)
npm run type-check         # Run TypeScript type checking (when configured)
npm run test               # Run test suites (when configured)
```

### Build & Development
```bash
npm run build              # Build all packages (when configured)
npm run dev                # Development mode (when configured)
turbo run build            # Turbo monorepo build (when configured)
turbo run dev              # Turbo development mode (when configured)
```

## Project Architecture

### Core Structure
- **Framework-based**: Template repository providing standardized structure for AI-assisted development
- **Documentation-driven**: Comprehensive guides in `/docs/` for architecture, contributing, and onboarding
- **Quality-focused**: Built-in guardrails and validation scripts for AI-generated code
- **Tool-agnostic**: Supports Windsurf, Roo Code, KiloCode, and other agentic IDEs

### Key Directories
```
/docs/architecture/    - System design and architecture documentation
/docs/guides/          - Contributing guidelines and onboarding materials  
/prompts/              - Standardized AI prompt templates (feature, bugfix, refactor)
/policies/             - Code ownership and review guidelines
/templates/            - PR and commit message templates
/scripts/              - Automation scripts including agent-guardrails.sh
/tests/golden/         - Baseline snapshots for regression testing
/examples/             - Real-world usage examples and workflows
```

### Validation & Quality Assurance
The `scripts/agent-guardrails.sh` script enforces:
- File size limits and code quality standards
- Security pattern detection (no hardcoded secrets, SQL injection prevention)
- TypeScript best practices (avoid `any` types, proper error handling)
- Test coverage requirements alongside code changes
- Commit message format validation (AI-Generated and Reviewed-by fields)
- Branch naming conventions (feature/*, fix/*, etc.)

### Development Philosophy
- **Human-in-the-loop**: AI proposes, humans approve via review process
- **Contract-driven**: Interfaces and tests define boundaries, AI modifies implementations
- **Golden test protection**: Stable snapshots prevent regression in critical functionality
- **Context enforcement**: Clear package boundaries and import rules

## Important Files

### Configuration & Setup
- `setup.sh`: Comprehensive project initialization script that creates package.json, ESLint, Prettier, TypeScript configs, and GitHub Actions workflows
- `AGENTS.md`: Detailed AI agent guidelines following standard format (285 lines of comprehensive rules)
- `scripts/agent-guardrails.sh`: Pre-commit validation script (260 lines) with security and quality checks

### Templates & Standards  
- `/prompts/*.md`: Standardized templates for feature development, bug fixes, and refactoring
- `/templates/PR.md`: Pull request template for consistent documentation
- `/templates/CommitMessage.md`: Commit message format with AI attribution tracking

### Documentation
- `PROJECT_STRUCTURE.md`: Detailed directory overview and usage patterns
- `/docs/guides/CONTRIBUTING.md`: Development contribution guidelines
- `/docs/guides/ONBOARDING.md`: New team member setup guide

## Working with This Codebase

### Before Making Changes
1. Read the comprehensive `AGENTS.md` file for AI agent guidelines
2. Use appropriate prompt templates from `/prompts/` directory
3. Follow the human-in-the-loop review process outlined in `/policies/REVIEW.md`

### Quality Standards
- Run `./scripts/agent-guardrails.sh` before commits to validate changes
- Ensure AI-Generated and Reviewed-by fields are present in commit messages  
- Include corresponding tests when modifying code
- Follow TypeScript best practices and avoid `any` types
- Respect package boundaries and import rules

### Monorepo Structure
When the setup script runs, it creates:
```
packages/
├── core/           # Shared utilities
├── shared-types/   # TypeScript definitions  
├── api/            # Backend services
└── web/            # Frontend application
```

The project supports Turbo for monorepo orchestration with workspace-based dependency management.