# Bug Fix Prompt Template

Use this template when asking AI agents to fix bugs.

## Bug Description

### Observed Bug
**Summary**: [Brief description of the issue]
**Reproduction Steps**:
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Environment**: 
- Browser/Node version: [Version]
- OS: [Operating system]
- Other relevant environment details: [Details]

### Expected Behavior
**What should happen instead**: [Clear description of correct behavior]
**Contract/Specification**: [Link to relevant docs or requirements]

### Impact Assessment

- **Severity**: [Critical/High/Medium/Low]
- **Users Affected**: [Who is impacted]
- **Workaround Available**: [Yes/No - describe if yes]

## Investigation

### Scope

**Affected Files/Packages**: [List suspected files or components]
**Related Components**: [Dependencies or connected systems]
**Recent Changes**: [Any recent modifications that might be related]

### Debugging Information

**Error Messages**:

```text
[Paste exact error messages here]
```

**Stack Trace**:

```text
[Paste stack trace if available]
```

**Browser/Network Logs**: [Any relevant console or network information]

## Root Cause Analysis

### Suspected Causes

1. [Hypothesis 1]: [Why this might be the cause]
2. [Hypothesis 2]: [Why this might be the cause]
3. [Hypothesis 3]: [Why this might be the cause]

### Investigation Required

- [ ] Check [specific area/component]
- [ ] Verify [specific condition or state]
- [ ] Test [specific scenario]

## Solution Requirements

### Fix Criteria

**Must Fix**: [Core functionality that must work]
**Should Preserve**: [Existing behavior to maintain]
**Must Not Break**: [Critical functionality to protect]

### Testing Strategy

**Regression Tests**: [Specific tests needed to prevent recurrence]
**Edge Cases**: [Scenarios to verify]
**Integration Points**: [Other systems to test]

### Backward Compatibility

- [ ] No breaking changes to public APIs
- [ ] Database migrations if needed
- [ ] Configuration changes documented

## Verification Plan

### Test Cases

1. **Primary Flow**: [Test the main reproduction scenario]
2. **Edge Cases**: [Test boundary conditions]
3. **Regression**: [Ensure old functionality still works]
4. **Performance**: [Check if fix impacts performance]

### Rollback Plan

**If the fix causes issues**:

- [ ] How to quickly revert
- [ ] Monitoring to watch for new problems
- [ ] Communication plan for users

## Implementation Notes

### Constraints

- **Timeline**: [Any urgency requirements]
- **Deployment Window**: [When this can be released]
- **Risk Tolerance**: [How conservative should the fix be]

### Preferred Approach

**Strategy**: [Any guidance on how to approach the fix]
**Code Areas to Focus On**: [Specific files or functions to examine]
**Things to Avoid**: [Approaches that might cause more issues]

### References

- **Related Issues**: [Links to similar bugs or tickets]
- **Documentation**: [Relevant architectural or API docs]
- **Previous Fixes**: [Similar bugs that were fixed before]

---

**Template Usage**:

1. Fill out as much detail as possible
2. Include concrete reproduction steps
3. Provide all available error information
4. Be specific about testing requirements

**AI Agent Instructions**:

- Reproduce the bug first if possible
- Investigate the root cause thoroughly
- Propose the least invasive fix that solves the problem
- Include comprehensive tests to prevent regression
- Document the fix clearly in commit messages
- Consider edge cases and potential side effects
