# Collaborative Vibecoding Project

**Natural-language driven development through agentic IDEs for team collaboration**

## What is Vibecoding?

Vibecoding = natural-language driven development through agentic IDEs. The developer specifies intent, the IDE or AI agent generates code, and validation happens via tests and execution. With tools like Windsurf, Roo Code, and KiloCode, new practices are emerging.

## Project Purpose

Enable teams to co-develop in a **monorepo** using vibecoding tools. Provide **rules, shared prompts, examples, and collaboration artifacts** to ensure smooth, consistent output.

## Quick Start

1. **Read the guidelines**: Start with `AGENTS.md` for AI tool guidance
2. **Choose your prompts**: Use templates in `/prompts/` for common scenarios
3. **Follow the workflow**: AI proposes → human reviews → merge
4. **Maintain quality**: Use golden tests and contracts as guardrails

## Repository Structure

```
/docs
   /architecture/        → diagrams, system maps
   /guides/              → onboarding, coding rules
/prompts
   /feature.md           → template for new feature prompt
   /bugfix.md            → template for fixing a bug
   /refactor.md          → template for migration/refactor
/policies
   CODEOWNERS            → package ownership
   REVIEW.md             → human review guidelines
/templates
   PR.md                 → pull request template
   CommitMessage.md      → commit message format
/tests
   /golden               → baseline snapshots
/scripts
   agent-guardrails.sh   → pre-commit checks
/examples
   /                     → real-world examples
AGENTS.md                → AI agent guidelines (root level)
```

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
2. Customize `AGENTS.md` with your project specifics
3. Set up your CI/CD pipeline with the provided scripts
4. Train your team on the prompt templates
5. Start vibecoding!

## Quality Metrics

Track these metrics to ensure healthy vibecoding practices:
- % of PRs accepted without post-review changes
- Lead time from task to release
- Contract test coverage
- Rollback ratio
- AI contribution vs. post-release defect rate

## Contributing

See `/docs/guides/CONTRIBUTING.md` for detailed contribution guidelines.

## License

MIT License - see [LICENSE](LICENSE) file for details.
