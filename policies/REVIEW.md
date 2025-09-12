# Human Review Guidelines

## Guidelines for reviewing AI-generated code and vibecoding contributions

## Review Philosophy

**Trust but Verify**: AI can produce high-quality code, but human oversight ensures correctness, maintainability, and alignment with business goals.

## Review Priorities

### 1. Correctness & Logic (CRITICAL)

- **Algorithm correctness**: Does the code solve the intended problem?
- **Edge cases**: Are boundary conditions handled properly?
- **Error handling**: Are failures gracefully managed?
- **Business logic**: Does it match requirements and specifications?

### 2. Security (CRITICAL)

- **Input validation**: All user inputs properly sanitized?
- **Authentication/Authorization**: Access controls correctly implemented?
- **Data exposure**: No sensitive information leaked?
- **Injection vulnerabilities**: SQL, XSS, command injection prevented?
- **Secrets management**: No hardcoded credentials or keys?

### 3. Integration & Contracts (HIGH)

- **API compatibility**: Existing contracts maintained?
- **Database changes**: Migrations and backward compatibility?
- **Breaking changes**: Properly documented and necessary?
- **Interface consistency**: Follows established patterns?

### 4. Testing & Quality (HIGH)

- **Test coverage**: Adequate test coverage for new code?
- **Test quality**: Tests actually validate the right behavior?
- **Golden tests**: Critical snapshots updated appropriately?
- **Performance tests**: Resource usage and speed acceptable?

### 5. Architecture & Design (MEDIUM)

- **Code organization**: Follows project structure and patterns?
- **Separation of concerns**: Proper layering and boundaries?
- **Reusability**: Common functionality properly abstracted?
- **Technical debt**: Solution adds or reduces complexity?

### 6. Code Quality (MEDIUM)

- **Readability**: Code is clear and self-documenting?
- **Naming**: Variables, functions, classes well-named?
- **Documentation**: Complex logic explained with comments?
- **Style consistency**: Follows project formatting standards?

## AI-Specific Review Checklist

### Before Reviewing AI Code

- [ ] Read the original prompt/requirement
- [ ] Understand the intended solution approach
- [ ] Check if human modifications were made post-generation

### During Review

- [ ] **Verify AI understood the requirement correctly**
- [ ] **Check for over-engineering or unnecessary complexity**
- [ ] **Look for missing edge cases AI might have overlooked**
- [ ] **Validate error handling and user experience**
- [ ] **Ensure code follows project patterns, not generic patterns**
- [ ] **Check for proper resource cleanup (memory, connections, etc.)**
- [ ] **Verify thread safety and concurrency handling**

### Common AI Issues to Watch For

#### Over-Generalization

- AI might create overly flexible solutions for simple problems
- Look for unnecessary abstractions or design patterns

#### Missing Context

- AI might not understand business-specific requirements
- Check if edge cases specific to your domain are handled

#### Pattern Misuse

- AI might apply patterns incorrectly or inappropriately
- Verify design patterns are used correctly and necessarily

#### Test Quality Issues

- AI-generated tests might test implementation rather than behavior
- Ensure tests would catch real bugs, not just code changes

#### Security Gaps

- AI might miss security implications specific to your system
- Always review authentication, authorization, and data validation

## Review Process

### 1. Quick Assessment (2-3 minutes)

- Scan the PR description and files changed
- Identify the scope and potential risk level
- Decide on appropriate review depth

### 2. Detailed Review (Variable time)

**For Low-Risk Changes** (5-10 minutes):

- Verify requirements met
- Check test coverage
- Spot-check code quality

**For Medium-Risk Changes** (15-30 minutes):

- Thorough correctness review
- Security assessment
- Integration impact analysis
- Performance considerations

**For High-Risk Changes** (30+ minutes):

- Complete code walkthrough
- Run tests locally
- Consider deployment implications
- Discuss with other team members

### 3. Testing Verification

- [ ] Run automated test suite
- [ ] Manual testing of critical paths
- [ ] Performance testing if relevant
- [ ] Security testing if applicable

## Feedback Guidelines

### Constructive Feedback

- **Explain the "why"**: Don't just point out issues, explain risks
- **Suggest improvements**: Offer specific alternatives
- **Recognize good work**: Acknowledge when AI produced quality code
- **Be specific**: Point to exact lines and provide examples

### Feedback Categories

#### **Must Fix** (Blocking)

- Security vulnerabilities
- Correctness issues
- Breaking changes without proper migration
- Major performance problems

#### **Should Fix** (Strong recommendation)

- Code quality issues that impact maintainability
- Missing test coverage for critical paths
- Architectural inconsistencies

#### **Consider** (Suggestions)

- Minor optimizations
- Style improvements
- Alternative approaches

### Sample Feedback

```markdown
**Security Concern (Must Fix)**:
Line 45: User input is not validated before database query. This could lead to SQL injection.
Suggested fix: Use parameterized queries or ORM methods.

**Architecture (Should Fix)**:
The new service is directly accessing the database. Consider using the existing repository pattern for consistency with the rest of the codebase.

**Quality (Consider)**:
The error messages could be more user-friendly. Consider using our standard error format from utils/errors.ts.
```

## Approval Guidelines

### Requirements for Approval

- [ ] All "Must Fix" issues resolved
- [ ] Security review completed (for security-sensitive changes)
- [ ] Tests pass and provide adequate coverage
- [ ] Documentation updated if needed
- [ ] Breaking changes properly documented and communicated

### Conditional Approval

You can approve with minor issues if:

- Only "Consider" level feedback remains
- Changes are low-risk
- Follow-up issues are created for improvements

### Request Changes When

- Critical security or correctness issues exist
- Major architectural problems need addressing
- Insufficient testing for the change risk level
- Breaking changes lack proper migration strategy

## Reviewer Assignment

### Automatic Assignment

- CODEOWNERS file determines required reviewers
- AI-generated code always requires at least one human review

### Special Cases

- **Security-sensitive**: Require security team review
- **Performance-critical**: Require performance specialist review
- **Architecture changes**: Require tech lead or architecture team review
- **Database changes**: Require DBA team review

## Post-Review Actions

### After Approval

- [ ] Monitor deployment for issues
- [ ] Verify metrics and logs look normal
- [ ] Update documentation if needed
- [ ] Share learnings with team if valuable

### If Issues Arise Post-Deployment

- [ ] Quickly assess impact and severity
- [ ] Implement hotfix or rollback as appropriate
- [ ] Conduct post-mortem to improve review process
- [ ] Update review guidelines if needed

---

**Remember**: The goal is to maintain high quality while enabling the speed and creativity benefits of AI-assisted development. Focus your human expertise where it adds the most value.
