# Repetitive Tasks and Workflows

## Memory Bank Management

### Initialize Memory Bank for New Projects

1. Create `.kilocode/rules/memory-bank/` directory
2. Add `memory-bank-instructions.md` from Kilocode AI documentation
3. Create core files: `brief.md`, `product.md`, `context.md`, `architecture.md`, `tech.md`
4. Populate each file with project-specific information
5. Test Memory Bank activation with Kilocode AI

### Update Memory Bank Context

**Frequency**: After each significant development session

1. Update `context.md` with current work focus and recent changes
2. Add next steps and active development areas
3. Update status indicators for ongoing work
4. Keep context factual and concise

### Memory Bank Validation

**Frequency**: Weekly or before major releases

1. Review all Memory Bank files for accuracy
2. Update outdated technical information
3. Verify architecture documentation matches current implementation
4. Ensure technology stack information is current

## Project Setup Workflows

### Blueprint Installation for New Teams

1. Clone Vibecode Blueprint repository
2. Run `pnpm install` to install dependencies
3. Execute `pnpm run setup` for interactive configuration
4. Customize `AGENTS.md` with project-specific guidelines
5. Configure AI tool integration (Windsurf/Roo Code/KiloCode)
6. Initialize Memory Bank system
7. Run validation: `pnpm run validate`

### Quality Assurance Setup

1. Configure pre-commit hooks: `./scripts/agent-guardrails.sh`
2. Set up golden tests in `tests/golden/`
3. Configure CI/CD pipeline with GitHub Actions
4. Establish code review processes using `policies/REVIEW.md`
5. Set up quality metrics tracking

## AI Tool Integration

### Windsurf Integration

1. Configure Cascade mode settings
2. Set up Memories for project context
3. Enable Supercomplete for enhanced autocomplete
4. Configure custom rules in `.windsurf/rules/`

### KiloCode Integration

1. Initialize Memory Bank system
2. Configure Architect mode for system design
3. Set up code generation workflows
4. Configure debug mode for troubleshooting

### Roo Code Integration

1. Set up multi-agent collaboration
2. Configure slash commands for common tasks
3. Establish agent coordination workflows
4. Set up collaborative development patterns

## Documentation Maintenance

### Update Project Documentation

**Frequency**: After major features or architectural changes

1. Update `README.md` with new features
2. Refresh `PROJECT_STRUCTURE.md` if structure changes
3. Update architecture documentation
4. Refresh onboarding materials in `docs/guides/`

### Prompt Template Maintenance

**Frequency**: Monthly or when patterns change

1. Review effectiveness of existing prompt templates
2. Update templates based on AI tool improvements
3. Add new templates for emerging use cases
4. Validate template consistency across tools

## Release and Deployment

### Pre-Release Checklist

1. Run full test suite: `pnpm run test`
2. Validate code quality: `pnpm run lint && pnpm run format`
3. Update version numbers and changelog
4. Review and update Memory Bank files
5. Validate golden tests pass
6. Check CI/CD pipeline status

### Post-Release Tasks

1. Update Memory Bank context with release information
2. Document any new patterns or learnings
3. Update metrics and quality indicators
4. Plan next development cycle priorities
