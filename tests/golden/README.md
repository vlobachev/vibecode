# Golden Tests

Golden tests (also known as snapshot tests) capture the expected output of functions, components, or API endpoints. They serve as regression protection when AI agents modify code.

## Purpose

Golden tests are especially valuable in AI-assisted development because:
- **AI agents might change implementation details** while preserving behavior
- **Complex business logic** can be accidentally altered during refactoring  
- **API contracts** need to remain stable across AI-generated changes
- **UI components** should maintain consistent rendering

## Test Categories

### 1. API Response Snapshots
Capture complete API responses for critical endpoints:

```typescript
// tests/golden/api-responses.test.ts
describe('API Golden Tests', () => {
  it('should return consistent user profile format', async () => {
    const response = await request(app)
      .get('/api/users/123')
      .set('Authorization', 'Bearer valid-token');
      
    expect(response.body).toMatchSnapshot('user-profile-response');
  });
});
```

**Golden snapshot**: `user-profile-response.json`
```json
{
  "success": true,
  "data": {
    "id": "123",
    "name": "Test User",
    "email": "test@example.com",
    "bio": "Test bio",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 2. Business Logic Calculations
Preserve complex business rule outputs:

```typescript
// tests/golden/pricing-calculator.test.ts
describe('Pricing Calculator Golden Tests', () => {
  const testCases = [
    {
      description: 'basic subscription with tax',
      input: { plan: 'basic', taxRate: 0.08, discountCode: null },
      expected: 'basic-subscription-with-tax'
    },
    {
      description: 'premium subscription with discount',
      input: { plan: 'premium', taxRate: 0.08, discountCode: 'SAVE20' },
      expected: 'premium-subscription-with-discount'
    }
  ];

  testCases.forEach(({ description, input, expected }) => {
    it(`should calculate ${description}`, () => {
      const result = pricingCalculator.calculate(input);
      expect(result).toMatchSnapshot(expected);
    });
  });
});
```

### 3. Component Rendering
UI component output consistency:

```typescript
// tests/golden/user-profile-card.test.tsx
describe('UserProfileCard Golden Tests', () => {
  const mockUser = {
    id: '123',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://example.com/avatar.jpg',
    role: 'admin'
  };

  it('should render admin user profile consistently', () => {
    const { container } = render(<UserProfileCard user={mockUser} />);
    expect(container.firstChild).toMatchSnapshot('admin-user-profile-card');
  });
});
```

## Best Practices

### 1. Naming Convention
- Use descriptive snapshot names: `admin-user-profile-card` not `snapshot1`
- Include test scenario in name: `premium-subscription-with-discount`
- Use kebab-case for consistency

### 2. Data Normalization
Remove non-deterministic data before snapshotting:

```typescript
// Bad: timestamps will always change
expect(response.body).toMatchSnapshot();

// Good: normalize timestamps
const normalized = {
  ...response.body,
  timestamp: '[TIMESTAMP]',
  data: {
    ...response.body.data,
    createdAt: '[TIMESTAMP]',
    updatedAt: '[TIMESTAMP]'
  }
};
expect(normalized).toMatchSnapshot('user-profile-response');
```

### 3. Critical Path Focus
Only create golden tests for:
- **Critical business logic** that must not change unexpectedly
- **Public API responses** that external clients depend on
- **Complex calculations** where subtle bugs could be expensive
- **Core UI components** used throughout the application

### 4. Review Process
When golden tests fail:
1. **Understand why** the output changed
2. **Verify the change is intentional** and correct
3. **Review with domain expert** if business logic changed
4. **Update snapshot** only after confirming correctness

## AI Agent Guidelines

### When AI Can Update Golden Tests
- **Never automatically** update golden test snapshots
- **Alert human reviewer** when golden tests fail
- **Explain what changed** and why in PR description
- **Provide migration guide** if breaking changes are necessary

### Human Oversight Required
All golden test changes require human approval because:
- Changes might indicate unintended behavior modifications
- Business logic changes need domain expert validation
- API changes might break client integrations
- UI changes might affect user experience

## Example Golden Test Snapshots

### API Error Response
```json
// __snapshots__/api-errors.snap
exports[`should handle validation errors consistently 1`] = {
  "success": false,
  "error": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "Invalid email format"
    },
    {
      "field": "password",
      "message": "Password must be at least 8 characters"
    }
  ],
  "timestamp": "[TIMESTAMP]"
}
```

### Complex Calculation Result
```json
// __snapshots__/pricing-calculator.snap
exports[`should calculate premium subscription with discount 1`] = {
  "subtotal": 99.00,
  "discountAmount": 19.80,
  "taxableAmount": 79.20,
  "taxAmount": 6.34,
  "total": 85.54,
  "breakdown": {
    "basePrice": 99.00,
    "discount": {
      "code": "SAVE20",
      "percentage": 20,
      "amount": 19.80
    },
    "tax": {
      "rate": 0.08,
      "amount": 6.34
    }
  }
}
```

### UI Component Structure
```html
<!-- __snapshots__/user-profile-card.snap -->
exports[`should render admin user profile consistently 1`] = 
<div class="user-profile-card">
  <div class="avatar-container">
    <img src="https://example.com/avatar.jpg" alt="John Doe" class="avatar" />
    <span class="role-badge admin">Admin</span>
  </div>
  <div class="user-info">
    <h3 class="user-name">John Doe</h3>
    <p class="user-email">john@example.com</p>
  </div>
</div>
```

## Maintenance

### Regular Review
- **Quarterly review** of all golden tests for relevance
- **Remove outdated** snapshots for deprecated features
- **Update test data** to reflect current business scenarios
- **Consolidate redundant** tests that cover similar scenarios

### Documentation
- **Document the business logic** being protected by each golden test
- **Explain why** certain outputs must remain stable
- **Provide context** for complex test scenarios
- **Keep examples** updated with real-world data patterns

Golden tests provide a safety net that allows AI agents to refactor and optimize code while preserving the critical behaviors that users and integrations depend on.
