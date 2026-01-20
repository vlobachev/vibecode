# AGENTS.md & Tool Rules Alignment

This blueprint is **AGENTS.md-first**. `AGENTS.md` is the single source of truth for agent behavior across tools (Claude Code, Copilot, Cline, Roo Code, Windsurf, KiloCode, Codex, etc.).

## Why AGENTS.md Is Canonical

- It is tool-agnostic and easy to audit.
- It keeps humans in control while allowing agents to iterate.
- It prevents divergence between tool-specific rule files.

## How Tool Rules Should Behave

Tool-specific files should **reference** `AGENTS.md` instead of duplicating rules:

- `CLAUDE.md` – Claude shortcuts and command reminders
- `.clinerules` – memory-bank instructions only
- `.windsurf/` – workflow triggers (not policy)
- `.kilocode/` – orchestration hints (not policy)
- `.github/copilot-instructions.md` – Copilot onboarding & guardrails

If a tool file conflicts with `AGENTS.md`, **follow `AGENTS.md`**.

## Recommended Pattern

1. Keep behavioral rules in `AGENTS.md`.
2. Keep tool files minimal and pointer-based.
3. Use `docs/templates/AGENT_TASK_CHECKLIST.md` for coordination.

## Updating Rules

When rules change:

- Update `AGENTS.md` first.
- Update tool-specific pointers if needed.
- Document the change in `docs/README.md` if it affects onboarding.
