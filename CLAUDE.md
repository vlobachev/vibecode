# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code). **AGENTS.md is the canonical source of truth** for all agent rules; this file only adds Claude-specific hints and command shortcuts.

## Quick Start

```bash
make install
make validate
```

## Claude-Specific Workflow

1. Read `AGENTS.md` first (scope + safety).
2. Use prompts from `/prompts/` for consistent task framing.
3. Run `make validate` before finishing.

## Development Commands

### Setup & Dependencies

```bash
pnpm install                    # Install dependencies
chmod +x scripts/agent-guardrails.sh # Guardrails executable
```

### Quality & Validation

```bash
pnpm run guardrails            # AI code guardrails validation
pnpm run lint                  # ESLint
pnpm run format:check          # Prettier check
pnpm test                      # Tests
make validate                  # Full validation
```

### Generator

```bash
pnpm run setup                 # Interactive project setup
pnpm run test-setup            # Deterministic generator run (test output)
```

## Project Architecture

- `src/` – generator + reference MCP memory server
- `templates/` – scaffold templates
- `tests/` – unit/integration/golden tests
- `docs/` – documentation index + guides
- `scripts/` – pre-commit guardrails and validation helpers
- `prompts/` – reusable prompt templates
- `policies/` – human review and governance rules

## AI Collaboration Rules (Pointer)

All permissions, constraints, and safety rules live in **`AGENTS.md`**. If this file conflicts, follow `AGENTS.md`.
