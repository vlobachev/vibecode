# Team Onboarding Guide

**Getting new team members up to speed with collaborative vibecoding**

## Welcome!

You're joining a team that uses AI-assisted development (vibecoding) to accelerate software delivery while maintaining high quality. This guide will help you get productive quickly.

## What is Vibecoding?

**Vibecoding** is natural-language driven development where:
1. **You describe what you want** in plain English
2. **AI generates the code** based on your description
3. **You review and refine** the generated code
4. **Tests validate** the functionality works correctly

Think of AI as a junior developer who's very fast but needs oversight.

## Day 1: Setup

### 1. Install Tools
Choose your preferred agentic IDE:
- **Windsurf**: Enterprise-focused with team features
- **Roo Code**: Multi-agent collaboration
- **KiloCode**: Open-source alternative
- **Other**: Compatible with most AI coding assistants

### 2. Repository Access
- Clone the main repository
- Read `README.md` for project overview
- Review `AGENTS.md` for AI guidelines
- Explore `/prompts/` for standard templates

### 3. Environment Setup
```bash
# Standard setup
git clone [repository-url]
cd [project-name]
npm install  # or your package manager
npm test     # verify everything works
```

### 4. Permissions
- Get added to relevant teams in CODEOWNERS
- Ensure you can create branches and PRs
- Test CI/CD pipeline with a small change

## Day 2-3: Learn the Patterns

### Project Architecture
Understand the monorepo structure:
```
packages/
├── core/           → Shared utilities
├── api/            → Backend services  
├── web/            → Frontend app
└── shared-types/   → TypeScript definitions
```

### Code Patterns
Review common patterns in existing code:
- API response format: `{ success, data, error }`
- Error handling: Always use try/catch with logging
- Testing: Unit tests for logic, integration for APIs

### AI Agent Guidelines
Key rules for working with AI:
- Always use prompt templates from `/prompts/`
- Review all generated code before submitting
- Include tests with every code change
- Follow the PR template for submissions

## Day 4-5: First Contributions

### Practice Tasks
Start with these low-risk tasks to learn the workflow:

1. **Documentation Update**: Fix a typo or add clarification
2. **Test Addition**: Add a missing test case
3. **Bug Fix**: Fix a minor bug using the bug fix template
4. **Small Feature**: Add a simple utility function

### Example First PR Workflow
1. **Choose a task**: Find a "good first issue" or ask your mentor
2. **Use AI assistant**: Open your chosen template from `/prompts/`
3. **Generate code**: Use the prompt to create initial implementation
4. **Review carefully**: Check logic, security, tests
5. **Create PR**: Use the PR template in `/templates/`
6. **Respond to feedback**: Address reviewer comments

## Week 1: Real Work

### Taking on Features
Now you can handle more substantial work:
- Use the feature development template
- Break large tasks into smaller PRs
- Collaborate with AI on design decisions
- Focus on learning business domain

### Collaboration Tips
- **Ask questions early**: Don't wait if you're stuck
- **Share your screen**: Pair program when learning new areas  
- **Review others' PRs**: Great way to learn patterns
- **Attend standups**: Stay connected with team priorities

## Best Practices Summary

### Working with AI
- **Be specific**: Vague prompts produce poor results
- **Provide context**: Include relevant existing code
- **Start simple**: Build complexity incrementally
- **Review critically**: AI makes mistakes, especially with business logic

### Code Quality
- **Test everything**: AI-generated code needs human-verified tests
- **Security first**: Always review for security implications
- **Performance matters**: Consider scalability from the start
- **Documentation**: Write code that explains itself

### Team Collaboration
- **Communicate early**: Share your approach before deep implementation
- **Review thoroughly**: Take PR reviews seriously
- **Learn continuously**: Share techniques that work well
- **Help others**: Contribute to team knowledge base

## Common Mistakes to Avoid

### AI-Related
- **Blindly trusting AI**: Always understand the generated code
- **Skipping tests**: AI often misses edge cases
- **Ignoring patterns**: AI might not follow project conventions
- **Over-engineering**: AI sometimes creates unnecessarily complex solutions

### General Development
- **Making changes too large**: Keep PRs focused and reviewable
- **Skipping documentation**: Update docs when you change behavior
- **Ignoring CI failures**: Fix broken tests and linting issues
- **Not considering backward compatibility**: Breaking changes need migration plans

## Resources

### Internal Documentation
- `AGENTS.md`: AI agent guidelines and constraints
- `/docs/guides/CONTRIBUTING.md`: Detailed contribution guide
- `/policies/REVIEW.md`: How to review code effectively
- `/examples/`: Real examples of good AI-generated code

### Team Contacts
- **Tech Lead**: [Name] - Architecture and design decisions
- **AI Advocate**: [Name] - AI tooling and best practices
- **Domain Expert**: [Name] - Business logic and requirements
- **DevOps**: [Name] - Infrastructure and deployment

### External Resources
- [Windsurf Documentation](https://windsurf.ai/docs)
- [Roo Code Guides](https://roo.dev/docs)
- [KiloCode Repository](https://github.com/kilocode/kilocode)

## Your First Month Goals

### Week 1: Learn the basics
- [ ] Complete development environment setup
- [ ] Make first 3 PRs (documentation, test, small fix)
- [ ] Successfully use AI assistant for basic tasks

### Week 2: Understand the domain
- [ ] Complete 2-3 feature tickets using AI assistance
- [ ] Review 5+ PRs from other team members
- [ ] Participate in architecture discussion

### Week 3: Become productive
- [ ] Lead a feature from design to deployment
- [ ] Help onboard another new team member
- [ ] Contribute to improving AI prompts or guidelines

### Week 4: Share learnings
- [ ] Present a "lessons learned" to the team
- [ ] Contribute to this onboarding guide
- [ ] Mentor the next new hire

## Feedback and Questions

### Getting Help
1. **Check documentation first**: Most questions are answered in `/docs/`
2. **Search PR history**: Someone might have solved a similar problem
3. **Ask in team chat**: Quick questions get quick answers
4. **Schedule pairing**: For complex problems or learning new areas
5. **Weekly 1:1s**: Regular check-ins with your mentor

### Providing Feedback
We want to improve this process! Please share:
- What was confusing in the onboarding?
- Which AI techniques worked best for you?
- What documentation was missing?
- How can we make new hires more productive faster?

---

**Welcome to the team!** Remember: everyone was new once, and the team is here to help you succeed. Don't hesitate to ask questions and share your fresh perspective.
