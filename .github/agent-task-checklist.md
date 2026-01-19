# Agent Task Checklist Template

**Use this checklist for complex, multi-step tasks to track progress and ensure quality.**

## Task: [Feature/Bug/Refactor Name]

**Issue**: #
**Started**: [Date]
**Completed**: [Date]

---

## Phase 1: Planning & Context

- [ ] Read [AGENTS.md](../AGENTS.md) for project guidelines
- [ ] Review issue description and acceptance criteria
- [ ] Identify related code and documentation
- [ ] List files that will be modified
- [ ] Understand current implementation
- [ ] Plan testing strategy
- [ ] Identify potential risks

**Files to Modify**:
-
-

**Related Documentation**:
-
-

**Dependencies**:
-
-

---

## Phase 2: Implementation

- [ ] Create feature branch
- [ ] Implement core functionality
- [ ] Follow existing code patterns
- [ ] Add proper error handling
- [ ] Add type definitions (if TypeScript)
- [ ] Add inline documentation for complex logic
- [ ] Avoid hardcoding values

**Implementation Notes**:
-
-

**Decisions Made**:
-
-

---

## Phase 3: Testing

- [ ] Add unit tests for new functions/classes
- [ ] Add integration tests (if applicable)
- [ ] Add edge case tests
- [ ] Add error handling tests
- [ ] Update existing tests if behavior changed
- [ ] Run test suite: all tests pass
- [ ] Check test coverage (aim for >80%)

**Tests Added**:
-
-

**Test Coverage**: ___%

---

## Phase 4: Validation

- [ ] Run linter: `make lint` (no errors)
- [ ] Run formatter: `make format`
- [ ] Check formatting: `make format-check` (passes)
- [ ] Run tests: `make test` (all pass)
- [ ] Run full validation: `make validate` (passes)
- [ ] TypeScript compiles (if applicable)
- [ ] Security scan passes
- [ ] No hardcoded secrets

**Validation Output**:

```bash
$ make validate
✓ All validation checks passed
```

---

## Phase 5: Documentation

- [ ] Update README if behavior changed
- [ ] Update AGENTS.md if new patterns introduced
- [ ] Update API docs if endpoints changed
- [ ] Add/update inline code comments
- [ ] Update relevant guides
- [ ] Add migration notes (if breaking changes)

**Documentation Updated**:
-
-

---

## Phase 6: Review Preparation

- [ ] Code follows project patterns
- [ ] Tests are comprehensive
- [ ] Documentation is complete
- [ ] Validation passes
- [ ] No security vulnerabilities
- [ ] Commit messages are clear
- [ ] PR description is complete
- [ ] Acceptance criteria are met

**Self-Review Checklist**:

- [ ] Would I approve this PR if I were human reviewer?
- [ ] Are all acceptance criteria verifiable?
- [ ] Did I follow the agent-loop pattern?
- [ ] Are there any "hacks" or workarounds that need explanation?
- [ ] Did I introduce any breaking changes (documented)?

---

## Risks Identified

**Potential issues and mitigation strategies**:

| Risk | Impact | Mitigation | Status |
|------|--------|------------|--------|
| Risk 1 | High/Medium/Low | Strategy | Mitigated/Open |
| Risk 2 | High/Medium/Low | Strategy | Mitigated/Open |

---

## Follow-up Tasks

**Future work identified** (create issues):

- [ ] Task 1 - [Brief description]
- [ ] Task 2 - [Brief description]

---

## Agent Notes

**Things learned during implementation**:
-
-

**Challenges encountered**:
-
-

**Decisions made**:
-
-

**Recommended improvements** (for future):
-
-

---

## Validation Timeline

| Phase | Attempt | Result | Notes |
|-------|---------|--------|-------|
| First | `make validate` | Pass/Fail | |
| Second | `make validate` | Pass/Fail | |
| Final | `make validate` | ✅ Pass | |

**Total iterations to success**: ___

---

## Final Status

- [ ] All phases complete
- [ ] All checklists checked
- [ ] Validation passes
- [ ] PR created
- [ ] Ready for human review

**Agent signature**: [Agent name/version]
**Completion date**: [Date]

---

**Template version**: 1.0 (January 2025)
**Part of**: Vibecode Blueprint - GitHub Copilot Agent Mode Support
