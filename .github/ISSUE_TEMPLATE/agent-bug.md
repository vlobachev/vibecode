---
name: Agent Bug Report
about: Bug fix for AI agents (optimized for agent mode)
title: "[BUG] "
labels: bug, agent-task
assignees: ''
---

## Bug Description

**What's broken**:


**Expected behavior**:


**Actual behavior**:


## Reproduction Steps

1. Step 1
2. Step 2
3. Step 3
4. See error

## Environment

- Environment (dev/staging/prod):
- Browser (if applicable):
- Node version (if applicable):
- Package manager:

## Error Details

**Error message or logs**:

```
Paste error message here
```

**Stack trace** (if available):

```
Paste stack trace here
```

## Acceptance Criteria

**Testable criteria for the fix**:

- [ ] Bug is reproducible with a failing test
- [ ] Fix resolves the issue
- [ ] Test now passes
- [ ] No regression (all existing tests pass)
- [ ] `make validate` passes
- [ ] Root cause documented in PR

## Test Strategy

**How to verify the fix**:

- [ ] Add failing test that reproduces bug
- [ ] Implement fix
- [ ] Verify test now passes
- [ ] Run full test suite (no regressions)
- [ ] Manual verification (if applicable)

## Context

**Related code**:

- Files affected:
- Related issues:
- When did this start:
- Recent changes that might have caused it:

## Root Cause Analysis

**Optional - fill if known**:

- Why did this bug occur:
- What assumption was wrong:
- How to prevent similar bugs:

## Definition of Done

- [ ] Failing test added that reproduces the bug
- [ ] Fix implemented
- [ ] Test now passes
- [ ] No regressions (all other tests pass)
- [ ] `make validate` passes
- [ ] Root cause explained in PR
- [ ] Prevention strategy documented (if applicable)

---

**Agent Guidelines**: Read [AGENTS.md](../../AGENTS.md) before starting. Always start by adding a failing test that reproduces the bug, then fix it and verify the test passes.
