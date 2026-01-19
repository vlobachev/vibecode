---
name: Agent Refactoring Task
about: Code refactoring for AI agents (optimized for agent mode)
title: '[REFACTOR] '
labels: refactor, agent-task
assignees: ''
---

## Refactoring Goal

**What to improve and why**:

**Current problem**:

**Desired state**:

## Contracts (Do NOT Break)

**What must remain unchanged**:

- [ ] Public API contracts (interfaces, function signatures)
- [ ] Existing test behavior
- [ ] External integrations
- [ ] User-facing behavior

## Acceptance Criteria

- [ ] Refactoring goal achieved
- [ ] All existing tests still pass (no regressions)
- [ ] Golden tests unchanged (if applicable)
- [ ] `make validate` passes
- [ ] Code coverage maintained or improved
- [ ] Documentation updated

## Refactoring Strategy

**Approach to take**:

1. Step 1
2. Step 2
3. Step 3

**Files to modify**:

-
-
- **Tests to verify**:

-
-
-

## Safety Checks

**Before making changes**:

- [ ] Run full test suite (baseline)
- [ ] Identify all consumers of code being refactored
- [ ] Document current contracts
- [ ] Create golden tests if none exist

**After making changes**:

- [ ] All tests still pass
- [ ] No change in test coverage
- [ ] Golden tests match (no behavior change)
- [ ] Manual verification of affected features

## Context

**Related code**:

- Files to refactor:
- Tests to preserve:
- Consumers to verify:
- Related issues:

## Benefits

**What improves**:

- Performance:
- Maintainability:
- Readability:
- Testability:
- Other:

## Risks

**Potential issues to watch for**:

- Risk 1:
- Risk 2:
- Mitigation strategy:

## Definition of Done

- [ ] Refactoring complete
- [ ] All existing tests pass (no regressions)
- [ ] Golden tests unchanged
- [ ] Code coverage >= baseline
- [ ] `make validate` passes
- [ ] Documentation updated
- [ ] Benefits validated (performance, etc.)
- [ ] No contracts broken

---

**Agent Guidelines**: Read [AGENTS.md](../../AGENTS.md) before starting.
Refactoring MUST NOT break contracts. Run tests before and after. Golden tests
are your regression safety net.
