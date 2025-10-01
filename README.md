# Vibecode Blueprint 🚀

**The Ultimate Collaborative AI Development Template**

A powerful, modern blueprint for setting up AI-assisted collaborative development projects with best practices, intelligent tooling, and seamless workflows.

## What is Vibecoding?

Vibecoding = natural-language driven development through agentic IDEs. The developer specifies intent, the IDE or AI agent generates code, and validation happens via tests and execution. With tools like Windsurf, Roo Code, and KiloCode, new practices are emerging.

## Blueprint Purpose

**Transform this repository into a reusable blueprint** that enables teams to quickly set up collaborative AI development environments. Instead of manual configuration, use our **Node.js-powered setup system** with intelligent templating to generate production-ready projects in minutes.

## 🚀 Quick Start

### Using the Blueprint (Recommended)

```bash
# Install dependencies
make install
# OR
pnpm install

# Run interactive setup
make setup
# OR
pnpm run setup

# Setup pre-commit hooks (recommended)
make pre-commit-install
# OR
./scripts/setup-pre-commit.sh

# View all available commands
make help
```

### Traditional Approach (Legacy)

1. **Read the guidelines**: Start with `AGENTS.md` for AI tool guidance
2. **Choose your prompts**: Use templates in `/prompts/` for common scenarios
3. **Follow the workflow**: AI proposes → human reviews → merge
4. **Maintain quality**: Use golden tests and contracts as guardrails

## Repository Structure

For a complete directory structure with detailed descriptions, see **[docs/PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md)**.

## Core Rules

- **Human-in-the-loop**: AI proposes, human approves
- **Contracts first**: Interfaces and tests define truth, AI can change implementations
- **Golden tests**: Keep stable snapshots as non-regression baselines
- **PR workflow**: AI drafts → human review → merge
- **Context enforcement**: Agents only work within defined package boundaries
- **Style enforcement**: One formatter/linter config applied in CI

## Supported Tools

- **Windsurf**: Cascade, Memories, Supercomplete modes
- **Roo Code**: Multi-agent collaboration with slash commands
- **KiloCode**: Open-source orchestration (architect → code → debug)
- **Generic**: Any agentic IDE following our conventions

## Getting Started

1. Copy this structure to your monorepo
2. Install dependencies: `make install`
3. Setup pre-commit hooks: `make pre-commit-install`
4. Customize `AGENTS.md` with your project specifics
5. Set up your CI/CD pipeline with the provided scripts
6. Train your team on the prompt templates
7. Start vibecoding!

## Automation & Quality

### Makefile Commands

This project includes a comprehensive Makefile for common operations. Run `make help` to see all available commands, or view the [Makefile](Makefile) directly.

Key commands:

- **`make install`** - Install dependencies
- **`make setup`** - Run interactive setup
- **`make validate`** - Run all validation checks
- **`make pre-commit-install`** - Install pre-commit hooks

### Pre-commit Hooks

Automatic code quality validation runs before every commit. This catches issues early and prevents CI/CD failures.

**Setup**: Run `make pre-commit-install` or `./scripts/setup-pre-commit.sh`

For complete documentation, see **[docs/guides/PRE_COMMIT.md](docs/guides/PRE_COMMIT.md)**.

## Quality Metrics

Track these metrics to ensure healthy vibecoding practices:

- % of PRs accepted without post-review changes
- Lead time from task to release
- Contract test coverage
- Rollback ratio
- AI contribution vs. post-release defect rate

## Documentation

For complete documentation, see **[docs/README.md](docs/README.md)** - the documentation index organized by role and topic.

Key documentation:

- **[docs/PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md)** - Complete directory structure
- **[docs/guides/CONTRIBUTING.md](docs/guides/CONTRIBUTING.md)** - Contribution guidelines
- **[docs/guides/ONBOARDING.md](docs/guides/ONBOARDING.md)** - New team member guide
- **[docs/guides/PRE_COMMIT.md](docs/guides/PRE_COMMIT.md)** - Pre-commit hooks setup
- **[docs/MCP_MEMORY_IMPLEMENTATION.md](docs/MCP_MEMORY_IMPLEMENTATION.md)** - MCP Memory Server plan
- **[AGENTS.md](AGENTS.md)** - AI agent guidelines
- **[CLAUDE.md](CLAUDE.md)** - Claude-specific guidance

## Contributing

See **[docs/guides/CONTRIBUTING.md](docs/guides/CONTRIBUTING.md)** for detailed contribution guidelines.

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Testing Balanced Markdown Linting

This change will trigger the Documentation Validation workflow to demonstrate our balanced markdown linting policy success.
