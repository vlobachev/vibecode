# Claude Code Guide

This blueprint supports Claude Code with lightweight, pointer-based instructions.

## Canonical Rules

Start with `AGENTS.md`. It is the source of truth for agent behavior. `CLAUDE.md` only adds Claude-specific shortcuts.

## Recommended Flow

1. Read `AGENTS.md` and `CLAUDE.md`.
2. Use prompts in `/prompts/` when possible.
3. Run `make validate` before finishing.

## Useful Commands

```bash
make install
make setup
make validate
```

## Tips

- Keep changes small and reviewable.
- Avoid dependency changes unless explicitly approved.
- Report validation results in final output.
