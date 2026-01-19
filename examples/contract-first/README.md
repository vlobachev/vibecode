# Contract-First Development Example

**A demonstration of how contracts and tests enable safe AI agent refactoring**

## Concept

In **contract-first development**:

1. **Define the contract** (API interface, function signature, types)
2. **Write tests** that verify the contract
3. **Implement** the functionality
4. **Refactor** safely - tests ensure contract isn't broken

This enables AI agents to:

- Refactor implementations without breaking behavior
- Optimize code while maintaining correctness
- Change internals safely as long as tests pass

## Example: User Validator

### 1. Define the Contract (TypeScript Interface)

```typescript
// user-validator.ts

/**
 * UserValidator Contract
 *
 * Validates user input according to business rules.
 * This interface is the contract - implementations must follow it.
 */
export interface IUserValidator {
  /**
   * Validate a user object
   * @param user - User data to validate
   * @returns ValidationResult with success status and errors
   */
  validate(user: unknown): ValidationResult;

  /**
   * Validate user email
   * @param email - Email to validate
   * @returns true if valid, false otherwise
   */
  validateEmail(email: string): boolean;

  /**
   * Validate user password
   * @param password - Password to validate
   * @returns true if valid, false otherwise
   */
  validatePassword(password: string): boolean;
}

export interface ValidationResult {
  success: boolean;
  errors: string[];
}
```

### 2. Write Tests (Contract Tests)

```typescript
// user-validator.test.ts

import { describe, it } from 'node:test';
import assert from 'node:assert';
import { UserValidator } from './user-validator.js';

describe('UserValidator Contract', () => {
  const validator = new UserValidator();

  describe('validate', () => {
    it('should accept valid user', () => {
      const result = validator.validate({
        email: 'test@example.com',
        password: 'SecurePass123!'
      });

      assert.strictEqual(result.success, true);
      assert.strictEqual(result.errors.length, 0);
    });

    it('should reject invalid email', () => {
      const result = validator.validate({
        email: 'invalid-email',
        password: 'SecurePass123!'
      });

      assert.strictEqual(result.success, false);
      assert.ok(result.errors.some(e => e.includes('email')));
    });

    it('should reject weak password', () => {
      const result = validator.validate({
        email: 'test@example.com',
        password: '123'
      });

      assert.strictEqual(result.success, false);
      assert.ok(result.errors.some(e => e.includes('password')));
    });
  });

  describe('validateEmail', () => {
    it('should accept valid email', () => {
      assert.strictEqual(validator.validateEmail('test@example.com'), true);
    });

    it('should reject invalid email', () => {
      assert.strictEqual(validator.validateEmail('not-an-email'), false);
    });
  });

  describe('validatePassword', () => {
    it('should accept strong password', () => {
      assert.strictEqual(validator.validatePassword('SecurePass123!'), true);
    });

    it('should reject short password', () => {
      assert.strictEqual(validator.validatePassword('123'), false);
    });

    it('should reject password without numbers', () => {
      assert.strictEqual(validator.validatePassword('OnlyLetters'), false);
    });
  });
});
```

### 3. Implementation (Can Be Refactored)

```typescript
// user-validator.ts (continued)

export class UserValidator implements IUserValidator {
  validate(user: unknown): ValidationResult {
    const errors: string[] = [];

    if (typeof user !== 'object' || user === null) {
      return { success: false, errors: ['Invalid user object'] };
    }

    const { email, password } = user as any;

    if (!email || !this.validateEmail(email)) {
      errors.push('Invalid email address');
    }

    if (!password || !this.validatePassword(password)) {
      errors.push('Invalid password');
    }

    return {
      success: errors.length === 0,
      errors
    };
  }

  validateEmail(email: string): boolean {
    // Simple regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validatePassword(password: string): boolean {
    // Must be at least 8 characters with numbers
    return password.length >= 8 && /\d/.test(password);
  }
}
```

## Agent Refactoring Scenario

**Original implementation** (above) uses simple regex and basic checks.

**Agent task**: "Improve password validation to check for uppercase, special
chars, and common passwords."

### Agent's Approach

1. **Run tests** first (baseline - all pass)
2. **Refactor** `validatePassword` method:

```typescript
validatePassword(password: string): boolean {
  // Enhanced validation
  if (password.length < 8) return false;
  if (!/[A-Z]/.test(password)) return false;  // Uppercase
  if (!/[a-z]/.test(password)) return false;  // Lowercase
  if (!/\d/.test(password)) return false;     // Number
  if (!/[!@#$%^&*]/.test(password)) return false; // Special char

  // Check against common passwords
  const commonPasswords = ['Password123!', 'Admin123!', 'Test123!'];
  if (commonPasswords.includes(password)) return false;

  return true;
}
```

3. **Run tests** again
4. **Observe failures** (some tests fail because requirements changed)
5. **Update tests** to match new requirements:

```typescript
it('should reject password without uppercase', () => {
  assert.strictEqual(validator.validatePassword('securepass123!'), false);
});

it('should reject password without special characters', () => {
  assert.strictEqual(validator.validatePassword('SecurePass123'), false);
});

it('should reject common passwords', () => {
  assert.strictEqual(validator.validatePassword('Password123!'), false);
});
```

6. **Verify** all tests pass
7. **Contract preserved**: `validate()`, `validateEmail()`, `validatePassword()`
   still have same signatures

## Key Points

### What the Contract Guarantees

✅ **Signature stability**: Function names, parameters, return types don't
change ✅ **Behavior stability**: Tests define expected behavior ✅ **Interface
stability**: Other code depending on this validator won't break

### What Can Change

✅ **Implementation details**: Regex patterns, validation logic, algorithms ✅
**Internal methods**: Private helpers, optimization techniques ✅
**Performance**: As long as behavior is correct

### What Agents Should Do

1. **Always run tests first** (baseline)
2. **Refactor implementation**
3. **Run tests again**
4. **If tests fail**:
   - Understand why (behavior change or improved requirements?)
   - Update tests if requirements genuinely changed
   - Fix implementation if tests should still pass
5. **Never change contract** without explicit human approval

## Benefits for Agentic Development

1. **Safe refactoring**: Agents can optimize code without breaking things
2. **Clear boundaries**: Contract = what can't change, implementation = what can
3. **Validation loop**: Test → Refactor → Test → Pass = Done
4. **Confidence**: If tests pass, contract is preserved
5. **Documentation**: Tests document expected behavior

## Anti-Patterns to Avoid

❌ **Changing tests to match new implementation** (without understanding why) ❌
**Deleting failing tests** instead of fixing issues ❌ **Modifying contract**
during "refactoring" ❌ **Skipping test runs** to save time

## See Also

- [AGENTS.md](../../AGENTS.md) - Agent guidelines for working with contracts
- [tests/golden/README.md](../../tests/golden/README.md) - Golden tests as
  contracts
- [docs/guides/CONTRIBUTING.md](../../docs/guides/CONTRIBUTING.md) -
  Contribution guidelines

---

**Part of**: Vibecode Blueprint Phase 4 - Agentic Quality Loop **Purpose**:
Demonstrate contract-first pattern for safe AI refactoring
