# Feature Example: User Profile API Endpoint

## Overview

This example shows how to use AI assistance to create a complete feature from requirements to deployment.

**Task**: Create a new API endpoint for updating user profiles

## 1. Initial Prompt (Human Input)

Used `/prompts/feature.md` template with these details:

### System Goal

**Business Objective**: Allow users to update their profile information (name, email, bio)
**User Story**: As a logged-in user, I want to update my profile so that other users see current information about me

### Technical Specifications

#### Constraints

- **Allowed Libraries**: Express.js, Joi for validation, bcrypt for passwords
- **Forbidden Libraries**: None specific
- **Style Rules**: Follow existing API patterns in `/packages/api/`
- **Performance Requirements**: <200ms response time
- **Authentication**: Requires valid JWT token

#### Architecture Guidelines

- **Package Location**: `/packages/api/src/routes/users`
- **Design Patterns**: Repository pattern, middleware for auth
- **Integration Points**: User service, database layer

### Acceptance Criteria

1. PATCH /api/users/:id endpoint that accepts JSON payload
2. Validates user owns the profile or has admin rights
3. Validates email format and username uniqueness
4. Returns updated user object (without password)
5. Handles validation errors with descriptive messages

### Dependencies

- **Affected Packages**: api, shared-types
- **Database Changes**: None (using existing users table)
- **API Changes**: New PATCH endpoint

### Testing Requirements

- Unit tests for validation logic
- Integration tests for full endpoint
- Security tests for authorization
- Error handling tests

## 2. AI Generated Code

**Tool Used**: Windsurf with Memory context

### Generated Files

#### `src/routes/users/profile.ts`

```typescript
import { Request, Response } from 'express';
import Joi from 'joi';
import { UserService } from '../../services/UserService';
import { authenticateToken } from '../../middleware/auth';
import { validateRequest } from '../../middleware/validation';

const updateProfileSchema = Joi.object({
  name: Joi.string().min(2).max(50).optional(),
  email: Joi.string().email().optional(),
  bio: Joi.string().max(500).optional()
});

export const updateUserProfile = [
  authenticateToken,
  validateRequest(updateProfileSchema),
  async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;
      const requestingUserId = req.user?.id;
      const isAdmin = req.user?.role === 'admin';

      // Authorization check
      if (userId !== requestingUserId && !isAdmin) {
        return res.status(403).json({
          success: false,
          error: 'Not authorized to update this profile',
          timestamp: new Date().toISOString()
        });
      }

      const userService = new UserService();
      const updatedUser = await userService.updateProfile(userId, req.body);

      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          error: 'User not found',
          timestamp: new Date().toISOString()
        });
      }

      res.json({
        success: true,
        data: {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          bio: updatedUser.bio,
          updatedAt: updatedUser.updatedAt
        },
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('Profile update failed:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        timestamp: new Date().toISOString()
      });
    }
  }
];
```

#### `src/services/UserService.ts` (additions)

```typescript
async updateProfile(userId: string, profileData: Partial<UserProfile>): Promise<User | null> {
  const existingUser = await this.userRepository.findById(userId);
  if (!existingUser) {
    return null;
  }

  // Check email uniqueness if email is being updated
  if (profileData.email && profileData.email !== existingUser.email) {
    const emailExists = await this.userRepository.findByEmail(profileData.email);
    if (emailExists) {
      throw new Error('Email already in use');
    }
  }

  const updatedUser = await this.userRepository.update(userId, {
    ...profileData,
    updatedAt: new Date()
  });

  return updatedUser;
}
```

#### `tests/integration/profile.test.ts`

```typescript
describe('PATCH /api/users/:id', () => {
  let authToken: string;
  let testUser: User;

  beforeEach(async () => {
    testUser = await createTestUser();
    authToken = generateTestToken(testUser.id);
  });

  it('should update user profile successfully', async () => {
    const updateData = {
      name: 'Updated Name',
      bio: 'New bio text'
    };

    const response = await request(app)
      .patch(`/api/users/${testUser.id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(updateData)
      .expect(200);

    expect(response.body).toMatchObject({
      success: true,
      data: {
        id: testUser.id,
        name: updateData.name,
        bio: updateData.bio
      }
    });
  });

  it('should reject unauthorized profile update', async () => {
    const otherUser = await createTestUser();
    
    const response = await request(app)
      .patch(`/api/users/${otherUser.id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({ name: 'Hacker Name' })
      .expect(403);

    expect(response.body.error).toContain('Not authorized');
  });

  it('should validate email format', async () => {
    const response = await request(app)
      .patch(`/api/users/${testUser.id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({ email: 'invalid-email' })
      .expect(400);

    expect(response.body.error).toContain('email');
  });
});
```

## 3. Human Review & Modifications

### Issues Found

1. **Security**: Console.log in production code
2. **Error Handling**: Generic error messages could leak info
3. **Validation**: Missing check for empty updates
4. **Performance**: Should validate user exists before email uniqueness check

### Human Modifications

```typescript
// Fixed error handling
} catch (error) {
  logger.error('Profile update failed:', { error: error.message, userId });
  
  if (error.message === 'Email already in use') {
    return res.status(409).json({
      success: false,
      error: 'Email address is already registered',
      timestamp: new Date().toISOString()
    });
  }
  
  res.status(500).json({
    success: false,
    error: 'Unable to update profile at this time',
    timestamp: new Date().toISOString()
  });
}

// Added empty update validation
if (Object.keys(req.body).length === 0) {
  return res.status(400).json({
    success: false,
    error: 'No update data provided',
    timestamp: new Date().toISOString()
  });
}
```

## 4. Final PR

### PR Title

`feat(api): add user profile update endpoint`

### PR Description

Following the template in `/templates/PR.md`:

- **AI Generated**: Yes (Windsurf)
- **Human Modifications**: Security improvements, error handling refinement
- **Test Coverage**: 95% (unit + integration tests)
- **Breaking Changes**: None

### Commit Message

```
feat(api): add user profile update endpoint

Implement PATCH /users/:id endpoint allowing users to update
their profile information with proper authorization and validation.

- Add profile update route with JWT authentication
- Implement email uniqueness validation
- Add comprehensive test coverage
- Include proper error handling and logging

AI-Generated: Yes
Reviewed-by: Senior Developer
Refs: #USER-123
```

## 5. Key Learnings

### What Worked Well

- AI generated structurally correct code following existing patterns
- Test coverage was comprehensive from the start
- Security middleware was properly applied

### Human Value Added

- Identified security issues (console.log, error message leakage)
- Improved error handling specificity
- Added edge case validation (empty updates)
- Enhanced logging for debugging

### Prompt Improvements for Next Time

- Be more specific about security requirements
- Include examples of proper error handling patterns
- Specify logging requirements upfront

## 6. Metrics

- **Development Time**: 45 minutes (vs ~2 hours manually)
- **Initial Test Coverage**: 85% (AI generated)
- **Final Test Coverage**: 95% (after human review)
- **Issues Found in Review**: 4 (all addressed)
- **Post-deployment Issues**: 0

This example demonstrates the effective collaboration between AI code generation and human oversight to deliver production-ready features quickly and safely.
