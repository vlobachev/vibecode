# AGENTS.md

**AI Agent Guidelines for Vibecode Blueprint (2025-2026 Edition)**

This is the **primary interface** for AI agents working with the Vibecode
Blueprint. This repository is a **template/blueprint** for creating
collaborative AI development projects - not a production application.

## Project Overview

**Mission**: Provide a production-ready blueprint that enables teams to set up
collaborative AI-assisted development environments with best practices,
intelligent tooling, and seamless workflows.

**What This Is**: A **template repository** with a Node.js-powered setup system
that generates projects with AI agent support, validation guardrails, and modern
development workflows.

**Development Philosophy**:

- **Human-in-the-loop**: AI proposes, humans approve via review process
- **Contract-driven**: Interfaces and tests define boundaries, AI modifies
  implementations
- **Agent-loop friendly**: Agents run tests, observe output, self-correct,
  finish with clean validation
- **Multi-agent compatible**: Works with Claude Code, GitHub Copilot, Windsurf,
  Roo Code, KiloCode, Cline, etc.

## 🚀 Setup Commands (Run These First)

**For working on this blueprint**:

```bash
# 1. Install dependencies
make install
# OR
pnpm install

# 2. Run validation (lint, format-check, test)
make validate

# 3. Run the setup generator in test mode
pnpm run test-setup

# 4. Install pre-commit hooks
make pre-commit-install
```

**For using this blueprint to generate a new project**:

```bash
# Interactive setup that generates a new project
make setup
# OR
pnpm run setup
```

## 📁 Repository Map (What Matters)

This is what you need to know about this repository's structure:

### Core Directories

```
vibecode/
├── src/                    # 🔧 Setup generator (Node.js + Handlebars)
│   ├── setup.js           # Main interactive setup script
│   ├── test-setup.js      # Automated test mode
│   └── validate.js        # Validation runner (TODO: needs implementation)
│
├── templates/             # 📄 Handlebars templates (.hbs files)
│   ├── package.json.hbs   # Generated project package.json
│   ├── AGENTS.md.hbs      # Template for generated AGENTS.md
│   ├── CLAUDE.md.hbs      # Template for generated CLAUDE.md
│   ├── .eslintrc.js.hbs   # ESLint config template
│   ├── .prettierrc.hbs    # Prettier config template
│   └── .github/           # GitHub Actions workflow templates
│
├── scripts/               # 🛡️ Validation & guardrails
│   ├── agent-guardrails.sh              # Pre-commit AI code validation
│   ├── setup-pre-commit.sh              # Pre-commit hooks installer
│   ├── pre-commit-validate-structure.sh # Structure validation
│   └── pre-commit-check-agents.sh       # AGENTS.md validation
│
├── docs/                  # 📚 Documentation (comprehensive)
│   ├── README.md                        # Documentation index
│   ├── PROJECT_STRUCTURE.md             # Directory guide
│   ├── MCP_MEMORY_IMPLEMENTATION.md     # MCP server plan
│   ├── architecture/                    # System architecture
│   └── guides/                          # How-to guides
│
├── prompts/              # 💬 AI prompt templates
│   ├── feature.md        # New feature development
│   ├── bugfix.md         # Bug fixing workflow
│   └── refactor.md       # Code refactoring
│
├── policies/             # 📋 Governance
│   ├── CODEOWNERS        # Package ownership
│   └── REVIEW.md         # Review process
│
├── tests/                # ✅ Test files (TODO: add actual tests)
│   └── golden/           # Golden/snapshot tests
│       └── README.md     # Excellent documentation, no tests yet
│
├── memory-bank/          # 🧠 Cline/KiloCode memory files
│   ├── projectbrief.md
│   ├── activeContext.md
│   ├── systemPatterns.md
│   └── ...
│
└── Tool configs/         # 🔧 Agent-specific settings
    ├── .claude/          # Claude Code (MCP memory TODO)
    ├── .windsurf/        # Windsurf rules & workflows
    ├── .kilocode/        # KiloCode memory bank
    └── .clinerules       # Cline memory bank system
```

### Critical Files (Read These)

1. **`AGENTS.md`** (this file) - Primary AI agent interface
2. **`CLAUDE.md`** - Claude Code specific guidance
3. **`docs/PROJECT_STRUCTURE.md`** - Complete directory overview
4. **`src/setup.js`** - Setup generator logic
5. **`templates/`** - What gets generated
6. **`Makefile`** - All available commands

## 🛡️ How to Work Safely

### 1. This Is a Template Repository

**IMPORTANT**: This is NOT a production application. It's a **blueprint** that
generates other projects.

- **DO**: Modify templates in `templates/` to improve generated output
- **DO**: Update `src/setup.js` to add new setup options
- **DO**: Add tests for the generator itself
- **DO NOT**: Treat this like a typical monorepo application
- **DO NOT**: Add application code outside of templates

### 2. Golden Tests & Contracts

**Golden Tests**: Protect generated output from regressions

- `tests/golden/README.md` has excellent documentation
- **TODO**: We need to add actual golden test implementations
- When adding templates, add corresponding golden tests
- Golden tests should snapshot generated file structures

**Contracts**: Define what the blueprint guarantees

- Templates define contracts (what files are generated)
- Setup.js defines the interface (what options are available)
- Tests define correctness (generated output matches expectations)

### 3. Do Not Edit Generated Files (in test output)

- When running `pnpm run test-setup`, files are generated to test output
  directories
- **Never edit these directly** - they'll be overwritten
- Instead, edit the templates in `templates/`
- Re-run test-setup to see changes

### 4. Validation Before Finishing

**CRITICAL**: Before marking any task complete, run:

```bash
make validate   # Must pass: lint + format-check + test
```

**Agent Loop Pattern**:

1. Make changes
2. Run `make validate`
3. Observe failures
4. Fix issues
5. Repeat until clean
6. Only then mark task as done

### 5. Pre-commit Hooks

- This repo uses pre-commit hooks for automatic validation
- Run `make pre-commit-install` to enable them
- Hooks run: agent-guardrails.sh, structure validation, AGENTS.md checks
- **Never bypass hooks** with `--no-verify` unless explicitly instructed

## What You Can Do

### Code Generation & Modification

- Modify templates in `templates/` to improve generated projects
- Update `src/setup.js` to add new interactive options
- Add new Handlebars templates for additional file types
- Improve the generator logic and error handling
- Add validation to `src/validate.js` (currently missing)

### Testing & Quality

- **CRITICAL**: Add actual test files (currently none exist!)
- Create golden tests for generated output
- Add unit tests for setup.js logic
- Test Handlebars template rendering
- Add integration tests for the full setup flow

### Documentation

- Update this AGENTS.md as the project evolves
- Improve template documentation (AGENTS.md.hbs, etc.)
- Add guides for new features
- Keep docs/ up to date
- Document template variables and Handlebars helpers

## What You Cannot Do

### Security & Dependencies

- **Never add dependencies** without human approval
- **Never modify** `.github/workflows/security.yml` without review
- **Never hardcode secrets** in templates or source code
- **Never bypass** security scanning or validation
- **Never modify** pre-commit hook validation logic without approval

### Breaking Changes

- **Never delete** existing template files without migration plan
- **Never remove** setup.js configuration options (breaking change for users)
- **Never modify** `/policies/` directory without explicit approval
- **Never change** the Handlebars API in breaking ways
- **Never delete** golden test snapshots (when they exist)

### Framework Integrity

- **Never modify** the core blueprint structure without discussion
- **Never remove** support for existing AI tools (Windsurf, KiloCode, etc.)
- **Never break** backward compatibility with existing generated projects
- **Never remove** Makefile targets that users might depend on

## Code Standards

### Code Style

**This blueprint uses**:

- **Prettier** for formatting
- **ESLint** for linting
- **Markdown linting** for documentation

**Important**: The root project currently has **no .prettierrc or .eslintrc**
(these are in templates/). This is a known gap that needs fixing.

### Commands

```bash
# Formatting
make format              # Format all code with Prettier
make format-check        # Check formatting (CI mode)

# Linting
make lint                # Run ESLint on src/ and templates/

# Testing
make test                # Run all tests (currently no tests exist!)

# Complete validation
make validate            # Run lint + format-check + test (must pass before commit)
```

### Commit Message Format

Use conventional commits for this repository:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**Examples**:

```bash
feat(templates): add AGENTS.md template for generated projects
fix(setup): handle edge case when package.json already exists
docs(guides): add GitHub Copilot agent mode documentation
test(golden): add snapshot tests for template generator
```

### PR Expectations

1. **Description**: Explain what changed and why
2. **Testing**: Show evidence that validation passed
3. **Breaking changes**: Document migration path
4. **AI-generated**: Mark with "AI-Generated: Yes" and include "Reviewed-by:
   [name]"

### File Naming

- **SCREAMING_SNAKE_CASE.md** for documentation
- **kebab-case.js** for JavaScript files
- **kebab-case.hbs** for Handlebars templates
- **PascalCase.tsx** for React components (in templates)

## 🧰 Technology Stack (Blueprint Itself)

This blueprint project uses:

### Core Dependencies

- **Node.js** (>= 18.0.0) - Runtime environment
- **pnpm** (>= 8.0.0) - Package manager
- **Handlebars** (^4.7.8) - Template engine
- **Inquirer** (^9.2.12) - Interactive CLI prompts
- **fs-extra** (^11.2.0) - File system utilities
- **chalk** (^5.3.0) - Terminal styling
- **ora** (^7.0.1) - Terminal spinners

### Dev Dependencies

- **ESLint** (^8.56.0) - JavaScript linting
- **Prettier** (^3.1.0) - Code formatting
- **TypeScript** (^5.3.0) - Type checking (for generated projects)

### Template Technologies

Templates can generate projects with:

- TypeScript/JavaScript
- React, Vue, or other frameworks
- Node.js backends
- Testing frameworks (Jest, Vitest, etc.)
- Any technology - templates are customizable

## 🏗️ Blueprint Architecture

### Template System

This blueprint uses **Handlebars** for templating:

```javascript
// Handlebars helpers available in templates:
{{eq a b}}              // Equality check
{{ne a b}}              // Not equal
{{or a b}}              // Logical OR
{{and a b}}             // Logical AND
{{includes array item}} // Array includes
{{capitalize str}}      // Capitalize first letter
{{kebabCase str}}       // Convert to kebab-case
{{camelCase str}}       // Convert to camelCase
{{ifCond v1 op v2}}     // Conditional with operator
```

**Example template** (`templates/package.json.hbs`):

```handlebars
{ "name": "{{projectName}}", "version": "1.0.0", "description": "{{description}}",
{{#if useTypeScript}}
  "scripts": { "build": "tsc", "dev": "ts-node src/index.ts" }
{{else}}
  "scripts": { "dev": "node src/index.js" }
{{/if}}
}
```

### Setup Flow

```
User runs `make setup`
    ↓
src/setup.js runs
    ↓
Inquirer prompts gather config
    ↓
Handlebars compiles templates with config
    ↓
Files written to current directory or output path
    ↓
Optional: Setup git hooks, install dependencies
```

### Validation Flow

```
Developer makes changes
    ↓
Runs `make validate`
    ↓
1. ESLint checks src/ and templates/
2. Prettier checks formatting
3. Tests run (when they exist)
    ↓
All pass? ✅ Ready to commit
Any fail? ❌ Fix and retry
```

## Security Guidelines

### Template Security

**CRITICAL**: Templates get copied to user projects. Security issues here affect
ALL generated projects.

- **Never hardcode secrets** in templates (API keys, tokens, passwords)
- **Use environment variable examples** in templates: `process.env.API_KEY`
- **Include .env.example** in templates, never .env with real values
- **Sanitize user input** in setup.js (project names, descriptions, etc.)
- **Validate package names** before writing files
- **Avoid command injection** in setup scripts

### Setup Script Security

```javascript
// ✅ GOOD: Use fs-extra for file operations
await fs.writeFile(filePath, content);

// ❌ BAD: Never use exec/spawn with user input
exec(`mkdir ${userInput}`); // Command injection risk!

// ✅ GOOD: Validate and sanitize
const validated = validatePackageName(userInput);
if (!validated.validForNewPackages) {
  throw new Error('Invalid package name');
}
```

### Secrets & Configuration

- **Never commit** `.env` files or secrets
- **Never include** API keys in templates
- **Always use** `.env.example` with placeholder values
- **Document** required environment variables in generated README
- **Use** secrets scanning in GitHub Actions (already configured)

### Prompt Injection Cautions

This blueprint is designed for AI agents. Be aware of prompt injection risks:

- **User-provided descriptions** go into generated files
- **Sanitize markdown** in templates (prevent injection via project
  descriptions)
- **Validate file paths** before writing (prevent directory traversal)
- **Limit file sizes** when reading user input

## 📦 Project Boundaries

This is a **template repository**, not a monorepo application.

### What Belongs Here

```
vibecode/
├── src/          # Generator logic (setup.js, validation, etc.)
├── templates/    # Handlebars templates for generated projects
├── scripts/      # Automation scripts (guardrails, pre-commit)
├── docs/         # Blueprint documentation
├── tests/        # Tests for the generator itself
└── Tool configs/ # Agent configuration (.claude, .windsurf, etc.)
```

### What Does NOT Belong Here

- ❌ Application code (this generates apps, it's not an app)
- ❌ Backend services or APIs (those go in generated projects)
- ❌ Frontend components (those go in templates)
- ❌ Production data or databases
- ❌ Large binary files or media assets

### Generated Project Structure

When users run `make setup`, they get:

```
their-project/
├── packages/           # Monorepo packages (if selected)
│   ├── core/
│   ├── api/
│   ├── web/
│   └── shared-types/
├── package.json        # Generated from template
├── AGENTS.md           # Generated from template
├── tsconfig.json       # If TypeScript selected
└── .github/workflows/  # If GitHub Actions selected
```

## ✨ Quality Standards

### Test Coverage

**CURRENT STATUS**: ⚠️ No tests exist yet (critical gap!)

**REQUIRED**:

- Add golden/snapshot tests for generated output
- Add unit tests for setup.js logic
- Add integration tests for template rendering
- Test error handling and edge cases in setup flow

**WHEN IMPLEMENTED**:

- Minimum 80% coverage for src/ directory
- 100% coverage for template generation logic
- Golden tests for all template files
- Test both TypeScript and JavaScript generation paths

### Validation Requirements

**CRITICAL**: All changes must pass validation before commit:

```bash
make validate   # Must pass: lint + format-check + test
```

**CI/CD Integration**:

- GitHub Actions runs validation on every PR
- Pre-commit hooks run locally before commits
- Markdown linting for documentation
- Security scanning for secrets and vulnerabilities

### Documentation Standards

- **Follow SSOT principle**: Link to information, don't duplicate it
- **Use SCREAMING_SNAKE_CASE.md** for documentation files
- **Update docs/** when changing behavior
- **Keep AGENTS.md up to date** as the primary interface
- **Document template variables** and Handlebars helpers
- **Include examples** for complex templates

## Working with Humans

### Communication Style

- **Explain your reasoning**: "I'm updating template X because Y"
- **Ask for clarification**: "Should this template include ESLint config by
  default?"
- **Highlight assumptions**: "Assuming users want TypeScript by default..."
- **Suggest alternatives**: "We could use Handlebars helpers OR conditional
  templates"
- **Be honest about uncertainty**: "I'm not sure if this breaks backward
  compatibility"

### Code Review Expectations

**For AI-Generated Code**:

1. **Commit messages**: Use conventional commit format
2. **PR descriptions**: Include:
   - What changed and why
   - Testing evidence (`make validate` output)
   - Breaking changes (if any)
   - Migration guide (if needed)
3. **AI Attribution**:

   ```
   AI-Generated: Yes
   Reviewed-by: [Human Name]
   ```

4. **Flag uncertainty**: Call out areas where you need human review

### GitHub Actions Validation (CRITICAL)

**The Agent Loop**:

```
1. Make changes
2. Commit and push
3. Check GitHub Actions: gh run list --limit 5
4. If failures:
   - Investigate: gh run view <run-id> --log-failed
   - Fix issues
   - Commit fixes
   - GOTO step 2
5. If all pass:
   - ✅ Task complete
```

**Common CI Failures**:

- Markdown linting (docs must follow .markdownlint.json)
- Security scanning (no hardcoded secrets)
- Missing required files (AGENTS.md, CLAUDE.md, etc.)
- Structure validation (required directories must exist)

**NEVER ignore workflow failures** - they indicate real issues that affect
users.

### Self-Correction Loop

**Best Practice for Agents**:

1. **Make changes** to templates or source
2. **Run validation**: `make validate`
3. **Observe output**: Did it pass? What failed?
4. **Fix issues**: Address linting, formatting, test failures
5. **Repeat** until `make validate` passes cleanly
6. **ONLY THEN** mark task as complete

This loop ensures quality and prevents shipping broken templates.

### Continuous Improvement

- **Learn from failures**: If a template generates broken code, fix the template
- **Update documentation**: When you learn something, add it to docs/
- **Improve this file**: Contribute to AGENTS.md as you discover patterns
- **Ask questions**: Better to ask than to make incorrect assumptions

## 🤖 Supported AI Tools (2025-2026)

This blueprint works with all modern AI coding agents. Each tool has specific
configuration files:

### Claude Code (Primary Support)

- **Config**: `.claude/settings.local.json`
- **Guidance**: `CLAUDE.md` (Claude-specific)
- **MCP Support**: Ready for MCP memory server (see Phase 3 implementation)
- **Best Practices**:
  - Read AGENTS.md (this file) first every session
  - Use `make validate` before finishing tasks
  - Run agent-loop: test → observe → fix → repeat
  - Check GitHub Actions status after pushing

### GitHub Copilot Agent Mode / Coding Agent

- **Config**: `.github/` workflows optimized for agent mode
- **Guidance**: See `docs/guides/COPILOT_AGENT_MODE.md` (TODO: Phase 2)
- **Best Practices**:
  - Use issue/PR templates with clear acceptance criteria
  - Require `make validate` before done
  - Document decisions in PR descriptions
  - Use agent task checklist template

### Windsurf (Codeium)

- **Config**: `.windsurf/rules/` and `.windsurf/workflows/`
- **Features**: Memories, Cascade, Supercomplete
- **Best Practices**:
  - Use Memories to store blueprint patterns
  - Leverage Cascade for multi-step template updates
  - Use Supercomplete for consistent Handlebars syntax

### Roo Code

- **Features**: Multi-agent collaboration, slash commands
- **Best Practices**:
  - Use `/test` to run validation
  - Use `/refactor` for template improvements
  - Collaborate with multiple agents for complex features

### KiloCode

- **Config**: `.kilocode/rules/memory-bank/`
- **Features**: Architect → Code → Debug workflow, Memory Bank
- **Best Practices**:
  - Maintain Memory Bank with template patterns
  - Use orchestration for coordinated template changes
  - Follow architect-first approach for new features

### Cline

- **Config**: `.clinerules` (comprehensive memory bank system)
- **Features**: Memory Bank (projectbrief, activeContext, systemPatterns, etc.)
- **Best Practices**:
  - Read ALL memory bank files at session start
  - Update memory bank after significant changes
  - Use `**update memory bank**` command to trigger comprehensive review

### Generic / Other Agents

- **Primary interface**: This AGENTS.md file
- **Fallback**: CLAUDE.md for Claude-style agents
- **Minimum requirements**:
  - Read AGENTS.md at session start
  - Run `make validate` before finishing
  - Follow human-in-the-loop workflow
  - Respect golden tests and contracts

## 🧠 MCP (Model Context Protocol) Support

**Status**: Planned for Phase 3 implementation

**Vision**: Universal memory server that works across all MCP-compatible agents

**Planned Features**:

- Persistent memory across sessions
- Semantic search for retrieving context
- Memory types: notes, decisions, tasks, code references
- SQLite storage (local-first, privacy-focused)

**See**: `docs/MCP_MEMORY_IMPLEMENTATION.md` for full plan

## 📚 Learning Resources

### Essential Reading (In Order)

1. **This file** (AGENTS.md) - Primary interface
2. **`docs/PROJECT_STRUCTURE.md`** - Directory layout
3. **`docs/guides/CONTRIBUTING.md`** - Contribution workflow
4. **`src/setup.js`** - How the generator works
5. **`templates/`** - What gets generated

### When You Need Help

1. **Check existing patterns**: Look at existing templates for examples
2. **Read documentation**: Comprehensive guides in `docs/`
3. **Review Handlebars helpers**: See `src/setup.js` for available helpers
4. **Ask the human**: When uncertain, request guidance
5. **Propose alternatives**: Present options with pros/cons

### Questions & Support

**Common Questions**:

- **"How do I add a new template file?"** → Add to `templates/`, run test-setup
- **"How do I test my changes?"** → Run `pnpm run test-setup`, check output
- **"What Handlebars helpers are available?"** → See `src/setup.js` lines 13-35
- **"How do I make a template conditional?"** → Use
  `{{#if useFeature}}...{{/if}}`

## 🎯 Success Criteria

You're doing this right if:

- ✅ `make validate` passes before every commit
- ✅ GitHub Actions workflows pass after every push
- ✅ Templates generate valid, working projects
- ✅ Documentation stays up to date
- ✅ Human reviewers approve your PRs
- ✅ You ask questions when uncertain
- ✅ You follow the agent loop pattern (test → fix → repeat)

Remember: Your goal is to **make this blueprint better** so teams can quickly
set up high-quality AI-assisted development environments. Quality > speed.

---

## 📝 Changelog

- **2025-01**: Major update for 2025-2026 best practices
  - Added executable setup commands section
  - Added repository map with clear structure
  - Added "How to Work Safely" guidelines
  - Modernized supported tools (Claude Code, GitHub Copilot, MCP)
  - Added agent-loop pattern and self-correction workflow
  - Updated security guidelines for template projects
  - Added comprehensive tool-specific notes
- **2024**: Initial AGENTS.md creation

---

_This AGENTS.md file is the primary interface for AI agents working with the
Vibecode Blueprint. It follows the AGENTS.md standard and is optimized for
2025-2026 agentic coding practices. Last updated: January 2025_
