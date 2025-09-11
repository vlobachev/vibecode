# Feature Development Prompt Template

Use this template when asking AI agents to develop new features.

## System Goal

**Business Objective**: [Describe what the feature should accomplish in business terms]
**User Story**: As a [user type], I want [goal] so that [benefit]

## Technical Specifications

### Constraints

- **Allowed Libraries**: [List specific libraries that can be used]
- **Forbidden Libraries**: [List libraries to avoid]
- **Style Rules**: Follow project formatter configuration
- **Performance Requirements**: [Any specific performance needs]
- **Browser/Environment Support**: [Compatibility requirements]

### Architecture Guidelines

- **Package Location**: [Which package should contain this feature]
- **Design Patterns**: [Preferred patterns to use]
- **Integration Points**: [How this connects to existing code]

## Acceptance Criteria

### Functional Requirements

1. [Requirement 1 with specific input/output examples]
2. [Requirement 2 with expected behavior]
3. [Requirement 3 with edge cases to handle]

### Non-Functional Requirements

- **Performance**: [Response time, throughput requirements]
- **Security**: [Authentication, authorization, validation needs]
- **Accessibility**: [A11y requirements if applicable]
- **Error Handling**: [How errors should be handled and displayed]

## Dependencies

**Affected Packages**: [List all packages that might be impacted]
**Shared Components**: [Any shared utilities or types to use/update]
**Database Changes**: [Schema changes needed, if any]
**API Changes**: [New endpoints or modifications needed]

## Testing Requirements

- [ ] Unit tests covering happy path and edge cases
- [ ] Integration tests for API endpoints
- [ ] Contract tests for shared interfaces
- [ ] Manual testing scenarios: [List key user flows to verify]

## Example Usage

```typescript
// Show expected API usage or component usage
const result = await newFeature.process(input);
expect(result).toEqual(expectedOutput);
```

## Success Metrics

**How we'll measure success**:

- [Metric 1]: [Target value]
- [Metric 2]: [Target value]
- [User feedback requirements]

## Implementation Notes

**Preferred Approach**: [Any specific implementation guidance]
**Things to Avoid**: [Known pitfalls or anti-patterns]
**References**: [Links to relevant documentation or examples]

---

**Template Usage**:

1. Fill out all sections before giving to AI agent
2. Be specific about inputs/outputs in acceptance criteria
3. Include concrete examples where possible
4. Reference existing code patterns when relevant

**AI Agent Instructions**:

- Read the entire specification before starting
- Ask clarifying questions if anything is ambiguous
- Follow the testing requirements strictly
- Generate commit messages following our template
- Create PR description summarizing the implementation
