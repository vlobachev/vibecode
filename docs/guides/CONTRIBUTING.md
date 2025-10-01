# Contributing to the Collaborative Vibecoding Project

Welcome to the team! This guide will help you understand how to contribute effectively using AI-assisted development tools.

## Quick Start

1. **Read the guidelines**: Familiarize yourself with `AGENTS.md`
2. **Set up your IDE**: Configure Windsurf, Roo Code, KiloCode, or your preferred agentic IDE
3. **Review prompt templates**: Check `/prompts/` for standard templates
4. **Understand the workflow**: AI proposes → human reviews → merge

## Development Workflow

### 1. Planning Phase

- Define your task using appropriate prompt template
- Check existing code and patterns
- Identify affected packages and dependencies
- Consider testing strategy upfront

### 2. Implementation Phase

- Use AI agent with structured prompts
- Follow the golden rule: **AI proposes, human approves**
- Implement in small, reviewable chunks
- Write tests alongside code

### 3. Review Phase

- Self-review AI-generated code thoroughly
- Create detailed PR using template
- Address reviewer feedback promptly
- Ensure CI/CD passes

### 4. Deployment Phase

- Monitor metrics after merge
- Be prepared to rollback if issues arise
- Document lessons learned

## Using AI Agents Effectively

### Best Practices

- **Be specific in prompts**: Vague requests lead to poor results
- **Provide context**: Share relevant code, requirements, and constraints
- **Iterate incrementally**: Break large tasks into smaller pieces
- **Review critically**: AI can make mistakes, especially with business logic

### Prompt Engineering Tips

- Use our standardized templates as starting points
- Include concrete examples of inputs/outputs
- Specify constraints and forbidden approaches
- Reference existing code patterns when possible

### Common Pitfalls

- **Over-relying on AI**: Still need to understand the code
- **Insufficient testing**: AI might miss edge cases
- **Ignoring patterns**: AI might not follow project conventions
- **Security oversights**: Always review security implications

## Tool-Specific Guidance

### Windsurf IDE

- **Memories**: Save project context for consistent results
- **Cascade**: Use for multi-step operations
- **Supercomplete**: Leverage for intelligent code completion

```bash
# Example Windsurf memory setup
Create memory: "Project uses React + TypeScript with strict typing"
Create memory: "API responses follow { success, data, error } pattern"
Create memory: "All database operations must be transactional"
```

### Roo Code

- **Slash commands**: Use predefined shortcuts for common tasks
- **Multi-agent**: Leverage different agents for different aspects

```bash
# Example Roo slash commands
/test - Generate comprehensive tests
/refactor - Safely restructure code
/document - Add documentation
/migrate - Handle database migrations
```

### KiloCode

- **Orchestration**: Follow architect → code → debug workflow
- **Memory Bank**: Maintain shared knowledge across sessions

```bash
# Example KiloCode workflow
1. Architect: Design the solution
2. Code: Implement the design
3. Debug: Test and refine
```

## Code Standards

### Quality Requirements

- **Type Safety**: Use TypeScript strictly, avoid `any`
- **Error Handling**: Always handle errors gracefully
- **Testing**: Minimum 80% coverage for new code
- **Documentation**: Self-documenting code + API docs (see [DOCUMENTATION_STANDARDS.md](DOCUMENTATION_STANDARDS.md))

### Patterns to Follow

```typescript
// Preferred error handling
try {
  const result = await operation();
  return { success: true, data: result };
} catch (error) {
  logger.error('Operation failed', { error });
  return { success: false, error: error.message };
}

// Preferred API response format
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}
```

### Patterns to Avoid

- Magic numbers or strings without constants
- Deeply nested callbacks (use async/await)
- Global state mutations
- Direct DOM manipulation (use framework patterns)

## Testing Strategy

### Test Types

1. **Unit Tests**: Individual functions and components
2. **Integration Tests**: API endpoints and database interactions
3. **Contract Tests**: Interface compatibility
4. **Golden Tests**: Snapshot testing for critical outputs
5. **E2E Tests**: Complete user workflows

### Testing AI-Generated Code

- **Verify test quality**: Ensure tests check behavior, not implementation
- **Add edge cases**: AI might miss boundary conditions
- **Check error paths**: Ensure error handling is tested
- **Validate performance**: Include performance tests for critical paths

```typescript
// Good AI-generated test
describe('UserService.createUser', () => {
  it('should create user with valid data', async () => {
    const userData = { email: 'test@example.com', name: 'Test User' };
    const result = await userService.createUser(userData);
    
    expect(result.success).toBe(true);
    expect(result.data).toMatchObject({
      id: expect.any(String),
      email: userData.email,
      name: userData.name
    });
  });
  
  it('should reject duplicate email', async () => {
    await userService.createUser({ email: 'test@example.com', name: 'First' });
    const result = await userService.createUser({ email: 'test@example.com', name: 'Second' });
    
    expect(result.success).toBe(false);
    expect(result.error).toContain('email already exists');
  });
});
```

## Security Guidelines

### Always Verify

- **Input validation**: Check all user inputs
- **Authentication**: Verify user identity
- **Authorization**: Confirm user permissions
- **Data sanitization**: Clean outputs to prevent XSS

### Common Security Issues with AI Code

- Missing input validation
- Improper error message disclosure
- Incorrect permission checks
- Timing attack vulnerabilities

## Performance Considerations

### Monitor These Metrics

- Response time for API endpoints
- Database query performance
- Bundle size for frontend changes
- Memory usage for long-running processes

### Optimization Guidelines

- Use database indexes appropriately
- Implement caching where beneficial
- Lazy load resources when possible
- Optimize images and static assets

## Collaboration Guidelines

### Communication

- **PR discussions**: Use PR comments for code-specific discussions
- **Architecture decisions**: Use team meetings or dedicated channels
- **Urgent issues**: Use appropriate escalation channels

### Knowledge Sharing

- Document important architectural decisions
- Share interesting AI prompting techniques
- Conduct regular code reviews as learning sessions
- Update this guide based on team learnings

## Troubleshooting

### Common Issues

1. **AI produces overly complex code**
   - Simplify the prompt
   - Provide specific constraints
   - Ask for minimal viable solution first

2. **Tests fail after AI changes**
   - Review test relevance
   - Check if requirements changed
   - Verify AI understood the original behavior

3. **Performance regression**
   - Profile the specific changes
   - Compare before/after metrics
   - Consider algorithmic improvements

4. **Integration problems**
   - Verify interface contracts
   - Check version compatibility
   - Test with realistic data volumes

### Getting Help

- Check existing documentation first
- Search previous PR discussions
- Ask in team chat for quick questions
- Schedule pairing session for complex issues

## Continuous Improvement

### Team Retrospectives

- What AI techniques worked well?
- What prompts produced poor results?
- How can we improve our review process?
- What patterns should we document?

### Updating Guidelines

This document evolves with our learnings. Contribute improvements by:

1. Proposing changes via PR
2. Discussing in team meetings
3. Sharing successful techniques
4. Documenting common pitfalls

---

**Remember**: AI is a powerful tool that amplifies human intelligence. Use it wisely, review critically, and always prioritize quality and security.
