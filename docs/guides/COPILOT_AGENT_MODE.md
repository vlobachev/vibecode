# GitHub Copilot Agent Mode Guide

This guide explains how to use GitHub Copilot agent mode/coding agent effectively with the Vibecode Blueprint.

## Recommended Workflow

1. **Start with a clear task**
   - Provide requirements, constraints, and acceptance criteria.
   - Point the agent to `AGENTS.md`.

2. **Let the agent iterate**
   - Encourage the agent to run tests and commands.
   - Require self-correction based on output.

3. **Validate before finishing**
   - Always run `make validate` (or equivalent).
   - Include command output and results in the PR.

## Guardrails

- Keep changes scoped to the task.
- Do not bypass tests or linting.
- Avoid large refactors without approval.
- Do not add dependencies without explicit approval.

## Suggested Prompt Template

```text
Goal:
Constraints:
Acceptance Criteria:
Validation: run `make validate`
Reference: AGENTS.md
```

## Review Checklist (Human)

- [ ] Changes align with requirements
- [ ] Tests and validation commands ran
- [ ] No unexpected dependency changes
- [ ] Contracts and golden tests preserved
- [ ] Documentation updated if needed
