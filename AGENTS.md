# AGENTS.md

**AI Agent Guidelines for Collaborative Vibecoding**

This file provides guidance for AI agents working in this repository. It follows the AGENTS.md standard for clear AI-human collaboration.

## Project Overview

**Mission**: Enable teams to collaborate effectively using AI-assisted development (vibecoding) while maintaining high code quality and security standards.

**Architecture**: Monorepo with packages for core utilities, API services, web frontend, and shared types.

**Development Philosophy**: AI proposes, humans approve. Contracts and tests define boundaries.

## What You Can Do

✅ **Code Generation & Modification**
- Generate new functions, classes, and components
- Implement features following our established patterns
- Write unit and integration tests for your code
- Create API endpoints following REST conventions
- Update documentation for code you write
- Refactor code when explicitly asked

✅ **Testing & Quality**
- Generate comprehensive test suites
- Create test data and mock objects  
- Write snapshot tests for UI components
- Add error handling and edge case coverage
- Update existing tests when code changes

✅ **Documentation**
- Write clear code comments and docstrings
- Create API documentation
- Generate README files for new packages
- Document complex business logic

## What You Cannot Do

❌ **Security & Infrastructure**
- Modify security configurations or authentication logic
- Change database schemas without explicit approval
- Add new dependencies without human approval
- Modify CI/CD pipeline configurations
- Access or modify production data
- Change environment variables or secrets

❌ **Breaking Changes**
- Delete existing tests or golden snapshots
- Modify public API contracts without approval
- Change shared type definitions without review
- Remove existing functionality
- Modify `/policies/` directory contents

❌ **Production & Deployment**
- Deploy code to production environments
- Modify deployment scripts or configurations
- Change monitoring or logging configurations
- Access production databases or services

## Code Standards

### Language & Style
```typescript
// Preferred: Clear, typed interfaces
interface UserProfile {
  id: string;
  name: string;
  email: string;
  bio?: string;
}

// Preferred: Explicit error handling
try {
  const result = await userService.updateProfile(data);
  return { success: true, data: result };
} catch (error) {
  logger.error('Profile update failed', { error: error.message });
  return { success: false, error: 'Failed to update profile' };
}
```

### File Organization
- One primary export per file
- Use descriptive file names: `user-profile-service.ts`
- Keep related files grouped in directories
- Follow existing package structure

### Testing Requirements
```typescript
// Always include error cases
describe('UserService.updateProfile', () => {
  it('should update profile successfully', async () => {
    // Happy path test
  });
  
  it('should handle validation errors', async () => {
    // Error case test
  });
  
  it('should handle database errors', async () => {
    // Infrastructure error test
  });
});
```

## Approved Technologies

### Core Stack
- **Backend**: Node.js, TypeScript, Express.js
- **Frontend**: React, TypeScript, Tailwind CSS
- **Database**: PostgreSQL with TypeORM/Prisma
- **Testing**: Jest, React Testing Library
- **Validation**: Joi schemas

### Allowed Libraries
- `lodash` for utility functions
- `axios` for HTTP requests
- `date-fns` for date manipulation
- `uuid` for ID generation
- `bcrypt` for password hashing

### Forbidden Libraries
- `moment.js` (use date-fns instead)
- `jquery` (use vanilla JS or React)
- Any library with known security vulnerabilities

## Architecture Patterns

### API Responses
```typescript
// Standard success response
interface ApiResponse<T> {
  success: true;
  data: T;
  timestamp: string;
}

// Standard error response
interface ApiError {
  success: false;
  error: string;
  details?: ValidationError[];
  timestamp: string;
}
```

### Error Handling
```typescript
// Repository pattern for data access
class UserRepository {
  async findById(id: string): Promise<User | null> {
    try {
      return await this.db.user.findUnique({ where: { id } });
    } catch (error) {
      logger.error('Database query failed', { error, userId: id });
      throw new DatabaseError('Failed to fetch user');
    }
  }
}
```

## Security Guidelines

### Input Validation
- Validate all user inputs using Joi schemas
- Sanitize data before database operations
- Use parameterized queries to prevent SQL injection
- Escape user content in responses to prevent XSS

### Authentication & Authorization
```typescript
// Always check permissions
const hasPermission = await authService.canUpdateProfile(
  requestingUserId, 
  targetUserId
);
if (!hasPermission) {
  return res.status(403).json({
    success: false,
    error: 'Insufficient permissions'
  });
}
```

### Secrets & Configuration
- Never hardcode API keys, passwords, or secrets
- Use environment variables for configuration
- Log security events for audit purposes
- Follow principle of least privilege

## Package Boundaries

### Monorepo Structure
```
packages/
├── core/           # Shared utilities - no external dependencies
├── shared-types/   # TypeScript definitions - no runtime dependencies  
├── api/            # Backend services - can use core and shared-types
└── web/            # Frontend app - can use core and shared-types
```

### Import Rules
```typescript
// ✅ Allowed: Import from core utilities
import { validateEmail } from '@/core/utils/validation';

// ✅ Allowed: Import shared types
import { UserProfile } from '@/shared-types/user';

// ❌ Forbidden: Direct file imports from other packages
import { UserService } from '../../api/src/services/UserService';
```

## Quality Standards

### Code Coverage
- Minimum 80% test coverage for new code
- 100% coverage for critical business logic
- Include both positive and negative test cases
- Test error handling and edge cases

### Performance
- API endpoints must respond within 200ms for simple operations
- Database queries should use appropriate indexes
- Frontend components should render within 100ms
- Bundle size increases require justification

### Documentation
- Document all public APIs with JSDoc comments
- Include usage examples for complex functions
- Document business logic and edge cases
- Keep README files updated

## Working with Humans

### Communication
- Explain your reasoning for implementation choices
- Ask for clarification when requirements are ambiguous
- Highlight any assumptions you're making
- Suggest alternatives when appropriate

### Code Reviews
- Generate clear, descriptive commit messages
- Include PR descriptions explaining the changes
- Respond to feedback constructively
- Flag any areas where you're uncertain

### GitHub Actions Validation (CRITICAL)
**ALWAYS check GitHub Actions results after every push:**
- Run `gh run list --limit 5` to see recent workflow status
- If any workflows fail, investigate with `gh run view <run-id> --log-failed`
- Fix any CI/CD failures before proceeding with new changes
- Common failure types to watch for:
  - Markdown linting errors in documentation
  - Security scanning issues (secrets, vulnerabilities)
  - Test failures or coverage drops
  - Build/compilation errors
  - Code quality violations (ESLint, Prettier)
- Update relevant documentation templates if workflow patterns change
- Never ignore workflow failures - they indicate real issues

### Continuous Learning
- Learn from human feedback and corrections
- Adapt to project-specific patterns and conventions
- Ask about architectural decisions you don't understand
- Contribute to improving these guidelines

## Tool-Specific Notes

### For Windsurf Users
- Use Memories to store project context and patterns
- Leverage Cascade for multi-step refactoring
- Use Supercomplete for consistent code completion

### For Roo Code Users
- Utilize slash commands: `/test`, `/refactor`, `/document`
- Collaborate with multiple agents for complex tasks
- Use step planning for large features

### For KiloCode Users
- Follow architect → code → debug workflow
- Maintain Memory Bank with project patterns
- Use orchestration for coordinated changes

## Questions & Support

When you're unsure about something:
1. **Check existing code** for patterns and conventions
2. **Refer to documentation** in `/docs/` directory
3. **Ask the human reviewer** for guidance
4. **Err on the side of caution** for security-sensitive changes

Remember: Your goal is to accelerate development while maintaining quality and security. When in doubt, ask for human guidance.

---

*This AGENTS.md file follows the standard format for AI agent guidance. Last updated: 2024*
