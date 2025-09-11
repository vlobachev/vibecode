# Refactor/Migration Prompt Template

Use this template when asking AI agents to refactor code or perform migrations.

## Refactoring Goal

### Motivation
**Why are we refactoring?**
- [ ] Technical debt reduction
- [ ] Performance improvement
- [ ] Code maintainability
- [ ] Library/framework upgrade
- [ ] Architecture alignment
- [ ] Security enhancement
- [ ] Other: [Specify]

**Business Justification**: [How this helps the business/users]

### Target Scope
**Components to Refactor**: [Specific files, packages, or modules]
**Estimated Size**: [Small/Medium/Large - number of files affected]
**Timeline**: [Expected duration or deadline]

## Current State Analysis

### Existing Implementation
**Current Architecture**: [How it works today]
**Pain Points**: 
1. [Issue 1]: [Description and impact]
2. [Issue 2]: [Description and impact]
3. [Issue 3]: [Description and impact]

**Technical Debt**: [Specific problems to address]

### Dependencies
**Internal Dependencies**: [Other packages that depend on this code]
**External Dependencies**: [Third-party libraries involved]
**Database/Schema**: [Any data structure changes needed]

## Target Architecture

### Desired End State
**New Architecture**: [How it should work after refactoring]
**Benefits Expected**:
- [Benefit 1]: [Measurable improvement]
- [Benefit 2]: [Measurable improvement]
- [Benefit 3]: [Measurable improvement]

### Design Decisions
**Patterns to Use**: [Preferred architectural patterns]
**Patterns to Avoid**: [Anti-patterns to eliminate]
**Technology Choices**: [New libraries or approaches to adopt]

## Migration Strategy

### Required Invariants
**Must Preserve**:
- [ ] API compatibility (specify which APIs)
- [ ] Data integrity
- [ ] Performance characteristics
- [ ] Security properties
- [ ] User-facing behavior

**Backward Compatibility**:
- [ ] Full backward compatibility required
- [ ] Deprecation period allowed: [Duration]
- [ ] Breaking changes acceptable with migration guide

### Migration Phases
1. **Phase 1**: [First step - what to change]
2. **Phase 2**: [Second step - what to change]
3. **Phase 3**: [Final step - what to change]

**Rollout Strategy**: [How to deploy incrementally if needed]

## Risk Assessment

### Potential Risks
**High Risk Areas**: [Components most likely to break]
**User Impact**: [What users might experience during migration]
**Rollback Difficulty**: [How hard it would be to undo changes]

### Mitigation Strategies
- **Testing**: [Comprehensive test plan]
- **Monitoring**: [What metrics to watch]
- **Feature Flags**: [How to control rollout]
- **Communication**: [Who needs to know about changes]

## Implementation Plan

### Prerequisites
- [ ] [Prerequisite 1]
- [ ] [Prerequisite 2]
- [ ] [Prerequisite 3]

### Step-by-Step Approach
1. **Preparation**:
   - [ ] Create comprehensive tests for existing behavior
   - [ ] Document current API contracts
   - [ ] Set up monitoring/metrics

2. **Implementation**:
   - [ ] [Specific implementation step]
   - [ ] [Specific implementation step]
   - [ ] [Specific implementation step]

3. **Validation**:
   - [ ] Run full test suite
   - [ ] Performance testing
   - [ ] Security review

4. **Deployment**:
   - [ ] Stage deployment and testing
   - [ ] Production rollout plan
   - [ ] Monitoring and validation

### Testing Requirements
**Test Categories**:
- [ ] Unit tests for new components
- [ ] Integration tests for API changes
- [ ] Performance tests for critical paths
- [ ] Security tests for sensitive areas
- [ ] Migration tests for data changes

**Golden Tests**: [Critical snapshots to maintain]

## Success Criteria

### Functional Success
- [ ] All existing functionality works as before
- [ ] New architecture provides expected benefits
- [ ] Performance meets or exceeds current benchmarks
- [ ] No regressions in user experience

### Technical Success
- [ ] Code quality metrics improved
- [ ] Technical debt reduced
- [ ] Maintainability increased
- [ ] Test coverage maintained or improved

### Metrics to Track
- **Before/After Comparison**:
  - Performance: [Specific metrics]
  - Code complexity: [Metrics like cyclomatic complexity]
  - Bundle size: [If relevant]
  - Build time: [If relevant]

## Post-Migration Tasks

### Cleanup
- [ ] Remove deprecated code (after grace period)
- [ ] Update documentation
- [ ] Remove temporary migration code
- [ ] Clean up feature flags

### Knowledge Transfer
- [ ] Update team documentation
- [ ] Conduct code walkthrough
- [ ] Update onboarding materials

---

**Template Usage**:
1. Be clear about the motivation and scope
2. Define success criteria upfront
3. Plan for backward compatibility
4. Include comprehensive testing strategy

**AI Agent Instructions**:
- Start with thorough analysis of current state
- Implement changes incrementally when possible
- Maintain or improve test coverage throughout
- Document architectural decisions
- Create migration guides for breaking changes
- Validate each phase before proceeding to next
