# Commit Message Template

## Format

```text
type(scope): brief description

Detailed explanation of the change and why it was made.
Include context about the problem being solved.

- Key change 1
- Key change 2
- Key change 3

AI-Generated: [Yes/No]
Reviewed-by: [Human reviewer name]
Refs: #[issue number]
```

## Types

- **feat**: A new feature
- **fix**: A bug fix
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (formatting, etc.)
- **ci**: Changes to CI configuration files and scripts
- **chore**: Other changes that don't modify src or test files
- **revert**: Reverts a previous commit

## Scope Examples

- **api**: Backend API changes
- **web**: Frontend web application
- **core**: Shared/core utilities
- **db**: Database related changes
- **auth**: Authentication/authorization
- **ui**: User interface components
- **config**: Configuration changes

## Examples

### Feature Addition

```text
feat(api): add user profile update endpoint

Implement PATCH /users/:id endpoint to allow users to update
their profile information. Includes validation for email format
and username uniqueness.

- Add profile validation middleware
- Implement update logic with error handling
- Add comprehensive test coverage

AI-Generated: Yes
Reviewed-by: John Doe
Refs: #123
```

### Bug Fix

```text
fix(web): resolve infinite loop in user dashboard

Fixed pagination component causing infinite re-renders when
users have exactly 10 items per page. Issue was caused by
incorrect dependency array in useEffect hook.

- Fix useEffect dependencies in PaginationComponent
- Add boundary condition tests
- Update golden snapshots

AI-Generated: No
Reviewed-by: Jane Smith
Refs: #456
```

### Refactoring

```text
refactor(core): extract common validation utilities

Move repeated validation logic into shared utility functions
to reduce code duplication across API endpoints and improve
maintainability.

- Create ValidationUtils class with common patterns
- Update all endpoints to use shared validators
- Maintain backward compatibility
- Add unit tests for new utilities

AI-Generated: Yes
Reviewed-by: Bob Johnson
```

## AI-Generated Commit Guidelines

### What AI Should Include

- Clear, concise description of what changed
- Why the change was necessary
- Impact on other parts of the system
- Any breaking changes or migration notes

### What AI Should Avoid

- Vague descriptions like "fix stuff" or "update code"
- Technical jargon without explanation
- Missing context about the problem solved
- Forgetting to mention breaking changes

### Human Review Checklist

- [ ] Description accurately reflects the changes
- [ ] Type and scope are appropriate
- [ ] Breaking changes are clearly noted
- [ ] Context explains the "why" not just the "what"
- [ ] References relevant issues/tickets

## Special Cases

### Breaking Changes

```text
feat(api): migrate to new authentication system

BREAKING CHANGE: JWT tokens now expire after 1 hour instead of 24 hours.
Clients must implement token refresh logic using the new /auth/refresh endpoint.

Migration guide: Update client code to handle 401 responses and refresh tokens
automatically. See docs/auth-migration.md for detailed instructions.

AI-Generated: Yes
Reviewed-by: Security Team
Refs: #789
```

### Security Fixes

```text
fix(auth): prevent timing attacks in login validation

Security fix for timing attack vulnerability in user authentication.
Changed password comparison to use constant-time comparison function.

- Replace string comparison with crypto.timingSafeEqual
- Add security tests for timing consistency
- Update security documentation

AI-Generated: No  
Reviewed-by: Security Team
Refs: SECURITY-001
```

### Reverts

```text
revert: "feat(api): add experimental caching layer"

This reverts commit abc1234567890. The caching implementation
caused performance degradation in production under high load.
Reverting to investigate and redesign the approach.

AI-Generated: No
Reviewed-by: Tech Lead
Refs: #999
```

---

**Usage Notes**:

- Keep first line under 72 characters
- Use imperative mood ("add feature" not "added feature")
- Body should wrap at 72 characters
- Always include AI-Generated and Reviewed-by fields
- Reference relevant issues when applicable
