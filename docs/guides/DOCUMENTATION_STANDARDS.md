# Documentation Standards

## Overview

This guide defines standards for creating and maintaining documentation in the Vibecode Blueprint project. Following these standards ensures consistency, maintainability, and prevents information duplication.

## Core Principles

### 1. Single Source of Truth (SSOT)

**Rule**: Each piece of information should exist in exactly ONE authoritative location.

**Why**: Prevents conflicting information, reduces maintenance burden, ensures consistency.

**How**:

- Identify the most appropriate location for each topic
- All other references should link to the authoritative source
- Never copy-paste information between documents

### 2. Link, Don't Duplicate

**Rule**: When referencing information that exists elsewhere, use links instead of duplicating content.

**Examples**:

❌ **Bad** - Duplicating content:

```markdown
## Repository Structure

vibecode/
├── README.md
├── AGENTS.md
├── docs/
│   ├── guides/
│   └── architecture/
...
```

✅ **Good** - Linking to authoritative source:

```markdown
## Repository Structure

For the complete directory structure, see **[docs/PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md)**.
```

### 3. Brief Summary + Link Pattern

**Rule**: When mentioning a topic covered in detail elsewhere, provide a brief 1-2 sentence summary followed by a link.

**Template**:

```markdown
## [Topic Name]

[1-2 sentence summary of what this is and why it matters]

For complete details, see **[link to authoritative document]**.
```

**Example**:

```markdown
## Pre-commit Hooks

Automatic code quality validation runs before every commit. This catches issues early and prevents CI/CD failures.

For complete documentation, see **[docs/guides/PRE_COMMIT.md](docs/guides/PRE_COMMIT.md)**.
```

## Documentation Hierarchy

### Primary Documents (Authoritative Sources)

| Document | Purpose | Audience |
|----------|---------|----------|
| `README.md` | Project overview, quick start | Everyone (entry point) |
| `AGENTS.md` | AI agent guidelines | AI tools, developers |
| `CLAUDE.md` | Claude-specific guidance | Claude users |
| `docs/PROJECT_STRUCTURE.md` | Complete directory structure | Developers, new team members |
| `docs/guides/CONTRIBUTING.md` | Development workflow | Contributors |
| `docs/guides/ONBOARDING.md` | New team member setup | New developers |
| `docs/guides/PRE_COMMIT.md` | Pre-commit hooks setup | Developers |
| `docs/guides/DOCUMENTATION_STANDARDS.md` | This document | Documentation authors |
| `docs/MCP_MEMORY_IMPLEMENTATION.md` | MCP Memory Server plan | Implementers |
| `docs/README.md` | Documentation index | Everyone seeking docs |

### Cross-Reference Rules

1. **README.md** should:
   - Provide project overview and quick start
   - Link to detailed documentation (not duplicate it)
   - Serve as the entry point for new users

2. **docs/README.md** should:
   - Index all documentation
   - Organize by role and topic
   - Link to all primary documents

3. **Specialized guides** should:
   - Cover ONE topic in depth
   - Link to related guides
   - Be referenced (not duplicated) elsewhere

## File Naming Conventions

### Use SCREAMING_SNAKE_CASE.md

✅ **Good**:

- `PROJECT_STRUCTURE.md`
- `CONTRIBUTING.md`
- `PRE_COMMIT.md`
- `MCP_MEMORY_IMPLEMENTATION.md`

❌ **Bad**:

- `project-structure.md`
- `contributing.md`
- `pre_commit.md`
- `mcp memory implementation.md`

### Avoid Spaces

Always use underscores, never spaces in filenames.

## Content Structure

### Every Document Should Have

1. **Clear H1 Title**

   ```markdown
   # Document Title
   ```

2. **Brief Overview** (2-3 sentences)

   ```markdown
   Brief description of what this document covers and who should read it.
   ```

3. **Table of Contents** (for long documents)

   ```markdown
   ## Table of Contents
   - [Section 1](#section-1)
   - [Section 2](#section-2)
   ```

4. **Cross-References Section** (if applicable)

   ```markdown
   ## Related Documentation
   - **[Link 1](path/to/doc1.md)** - Description
   - **[Link 2](path/to/doc2.md)** - Description
   ```

## Linking Best Practices

### 1. Use Relative Paths

✅ **Good**:

```markdown
See [PROJECT_STRUCTURE.md](../PROJECT_STRUCTURE.md)
See [CONTRIBUTING.md](guides/CONTRIBUTING.md)
```

❌ **Bad**:

```markdown
See [PROJECT_STRUCTURE.md](/docs/PROJECT_STRUCTURE.md)
See [CONTRIBUTING.md](https://github.com/.../CONTRIBUTING.md)
```

### 2. Use Descriptive Link Text

✅ **Good**:

```markdown
For setup instructions, see **[docs/guides/ONBOARDING.md](docs/guides/ONBOARDING.md)**.
```

❌ **Bad**:

```markdown
For setup instructions, see [here](docs/guides/ONBOARDING.md).
Click [this link](docs/guides/ONBOARDING.md) for setup.
```

### 3. Link to Specific Sections When Appropriate

✅ **Good**:

```markdown
See the [Quick Start section in README.md](../README.md#-quick-start)
```

### 4. Use Bold for Important Links

```markdown
For complete documentation, see **[docs/README.md](docs/README.md)**.
```

## Common Patterns

### Pattern 1: Overview with Link

```markdown
## Topic Name

Brief 1-2 sentence overview.

For details, see **[path/to/detailed-doc.md](path/to/detailed-doc.md)**.
```

### Pattern 2: List of Key Points + Link

```markdown
## Topic Name

Key points:
- Point 1
- Point 2
- Point 3

For complete information, see **[path/to/detailed-doc.md](path/to/detailed-doc.md)**.
```

### Pattern 3: Command Reference + Link

```markdown
## Commands

Run `make help` to see all available commands, or view the [Makefile](Makefile) directly.

Key commands:
- `make install` - Install dependencies
- `make test` - Run tests

For all commands and details, see the [Makefile](Makefile).
```

## Maintenance Guidelines

### When Adding New Information

1. **Determine the authoritative location**
   - Where does this information belong?
   - Is there already a document for this topic?

2. **Add to the authoritative document**
   - Add the complete information once

3. **Link from other relevant documents**
   - Add brief mentions + links where appropriate

### When Updating Information

1. **Update the authoritative source only**
   - Never update duplicates (there shouldn't be any!)

2. **Verify links still work**
   - Check that cross-references are still valid

### When Removing Information

1. **Remove from authoritative source**
2. **Update or remove links** that pointed to it
3. **Check for broken references**

## Checklist for New Documentation

- [ ] Document has a clear H1 title
- [ ] Brief overview provided (2-3 sentences)
- [ ] Uses SCREAMING_SNAKE_CASE.md naming
- [ ] No duplicate information from other docs
- [ ] Links to related documentation
- [ ] Uses relative paths for all links
- [ ] Added to `docs/README.md` index
- [ ] Cross-referenced from relevant documents

## Examples from This Project

### Good Example: README.md Repository Structure Section

```markdown
## Repository Structure

For a complete directory structure with detailed descriptions, see **[docs/PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md)**.
```

**Why it's good**: Brief, clear purpose, links to authoritative source.

### Good Example: Pre-commit Hooks in README.md

```markdown
### Pre-commit Hooks

Automatic code quality validation runs before every commit. This catches issues early and prevents CI/CD failures.

**Setup**: Run `make pre-commit-install` or `./scripts/setup-pre-commit.sh`

For complete documentation, see **[docs/guides/PRE_COMMIT.md](docs/guides/PRE_COMMIT.md)**.
```

**Why it's good**: Brief summary, quick setup command, link to detailed guide.

## Enforcement

### Pre-commit Validation

The `scripts/pre-commit-validate-structure.sh` script checks for:

- Required documentation files exist
- Proper file naming conventions

### Documentation Review

During PR review, check:

- No duplicate information
- Proper cross-referencing
- Links work correctly
- Follows these standards

## Questions?

If you're unsure where information should live or how to structure documentation:

1. Check existing documentation for similar patterns
2. Review this guide
3. Ask in PR review
4. Refer to `docs/README.md` for the documentation index

---

**Last Updated**: 2025-10-01  
**Maintained By**: Documentation Team
