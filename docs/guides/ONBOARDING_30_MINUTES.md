# Onboarding in 30 Minutes

This guide helps teams adopt the Vibecode Blueprint quickly and safely.

## 0–5 Minutes: Clone & Install

```bash
make install
```

## 5–10 Minutes: Run the Generator

```bash
make setup
```

Choose your packages, enable pre-commit hooks, and confirm GitHub Actions settings.

## 10–15 Minutes: Understand the Rules

- Read `AGENTS.md` (canonical agent rules).
- Read `policies/REVIEW.md` (human review expectations).

## 15–20 Minutes: Learn the Prompts & Memory

- Review `/prompts/feature.md`, `/prompts/bugfix.md`, `/prompts/refactor.md`.
- Open `/memory-bank/` to see how long-term context can be stored.
- Optional: run the MCP memory server (`pnpm run mcp-memory`).

## 20–25 Minutes: Validate the Repo

```bash
make validate
```

## 25–30 Minutes: Start Your First Task

- Create an issue/PR using the agent templates.
- Keep changes scoped and validated.
- Use the checklist in `docs/templates/AGENT_TASK_CHECKLIST.md`.
