# AGENTS.md

**AI Agent Interface for Vibecode Blueprint (2025-2026)**

This file is the canonical, cross-tool source of truth for how agents should work in this repository. Tool-specific rules (Claude/Windsurf/Cline/KiloCode/Copilot) must defer to this document when conflicts arise.

---

## 1) Setup & Validation Commands

Use these commands in the order that makes sense for your task. Always finish with a clean validation pass.

### Install

```bash
make install
# or
pnpm install
```

### Interactive Setup (Generator)

```bash
make setup
# or
pnpm run setup
```

### Validate (must pass before finishing)

```bash
make validate
# or
pnpm run validate
```

### Targeted Checks

```bash
pnpm run lint
pnpm run format
pnpm run format:check
pnpm test
```

---

## 2) Repo Map (What Matters)

- `src/` – setup generator, validation, and reference MCP server
- `templates/` – scaffold templates rendered by the generator
- `scripts/` – pre-commit guardrails and validation helpers
- `tests/` – unit, integration, and golden tests (generator + MCP server)
- `prompts/` – reusable prompt templates
- `policies/` – human review and governance rules (do **not** edit)
- `memory-bank/` – optional memory artifacts for some agents
- `docs/` – canonical documentation and guides

---

## 3) How to Work Safely (Human-in-the-Loop)

**Core rules (non-negotiable):**

- AI proposes, humans approve. Do not bypass human review.
- Contracts and golden tests are truth sources. Update only with explicit approval.
- Keep changes scoped to the task. Avoid unrelated refactors.
- Do not edit generated files unless the task explicitly requires it.
- Prefer additive changes and backwards compatibility.

**Agent loop expectation:**

1. Understand the request and constraints.
2. Make minimal, test-backed changes.
3. Run `make validate` (or equivalent) before finishing.
4. Report exact commands and results.

---

## 4) Style & Conventions

- **TypeScript-first** when applicable; keep types explicit.
- One primary export per file.
- Follow existing file organization and naming patterns.
- Prefer clear, typed interfaces over implicit shapes.
- Use ESLint/Prettier formatting (single linter/formatter).
- Never wrap imports in try/catch blocks.

---

## 5) Tests & Quality

- Include **positive + negative** tests for new logic.
- Add/adjust **golden tests** when behavior is intentionally changed.
- Keep minimum coverage targets (80% overall, 100% for critical logic).
- Use descriptive test names and deterministic fixtures.

---

## 6) Security & Safety

- **Never** hardcode secrets, tokens, or credentials.
- Validate and sanitize user inputs.
- Avoid unsafe patterns (`eval`, `innerHTML`, etc.).
- Do not modify authentication, authorization, or security configs without explicit approval.
- Do not change `/policies/` contents.

---

## 7) Dependency Policy

- **Do not add dependencies** without explicit approval.
- Prefer Node.js built-ins and existing tooling.
- If a dependency is unavoidable, explain why and get approval first.

---

## 8) Multi-Agent Compatibility

- Assume other agents may work in parallel.
- Leave the repo in a **consistent, validated** state at each commit.
- Document assumptions, risks, and follow-ups in PRs.
- Use the agent task checklist template in `docs/templates/AGENT_TASK_CHECKLIST.md` for coordination.

---

## 9) Tooling Integration (Single Source of Truth)

- `AGENTS.md` is the **canonical** instruction set.
- Tool-specific files (e.g., `CLAUDE.md`, `.clinerules`, `.windsurf/`, `.kilocode/`, Copilot instructions) must reference this file instead of duplicating rules.
- If guidance conflicts, **AGENTS.md wins**.

---

## 10) When to Ask for Help

Ask before:

- Architectural changes
- Security-sensitive modifications
- Adding dependencies
- Changing public API contracts
- Modifying existing golden snapshots

---

**Last Updated**: 2026
**Maintained By**: Vibecode Maintainers
