# AGENTS.md as Single Source of Truth

**Managing AI Agent Configuration Across Multiple Tools**

## Overview

This blueprint supports multiple AI coding tools (Claude Code, GitHub Copilot, Windsurf, Roo Code, KiloCode, Cline, etc.). Each tool has its own configuration format:

- `.claude/` - Claude Code settings
- `.windsurf/` - Windsurf rules and workflows
- `.kilocode/` - KiloCode memory bank
- `.clinerules` - Cline memory bank system
- `.github/` - GitHub Copilot workflows

**Challenge**: Keeping guidance consistent across all tools without duplication.

**Solution**: Use `AGENTS.md` as the **primary source of truth** and make other configs reference or complement it.

## The SSOT Principle

**Single Source of Truth (SSOT)**: Maintain one authoritative source for each piece of information, with all other locations linking to it.

### Primary Interface: AGENTS.md

`AGENTS.md` is the **primary interface** for all AI agents because:

1. **Standard format**: Widely adopted across the industry
2. **Tool-agnostic**: Works with any agent that can read markdown
3. **Human-readable**: Developers can read and update it easily
4. **Version-controlled**: Changes are tracked in git
5. **Self-documenting**: Explains itself and the project

### Tool-Specific Configs: Complementary Roles

Tool-specific configs should:

- **Reference AGENTS.md**: Point agents to read it first
- **Add tool-specific features**: Leverage unique capabilities (Memories, workflows, etc.)
- **Avoid duplication**: Don't repeat what's in AGENTS.md
- **Stay minimal**: Only include what the tool uniquely needs

## Current Structure

### Root AGENTS.md (Blueprint)

Location: `/AGENTS.md`

**Purpose**: Guide agents working on the **blueprint itself** (not generated projects).

**Contains**:
- Setup commands for the blueprint
- Repository map of blueprint structure
- How to work safely with templates
- Template system architecture
- Supported AI tools list
- Security guidelines for template projects
- Validation requirements

**Target audience**: Agents improving the blueprint

### Template AGENTS.md (Generated Projects)

Location: `/templates/AGENTS.md.hbs`

**Purpose**: Template for `AGENTS.md` in **generated projects**.

**Contains** (when compiled with user config):
- Setup commands for generated project
- Project-specific architecture
- Monorepo structure (if applicable)
- Package manager commands
- Validation and testing instructions
- Supported AI tools

**Target audience**: Agents working on generated projects

### CLAUDE.md

Location: `/CLAUDE.md` (blueprint) and `/templates/CLAUDE.md.hbs` (template)

**Purpose**: Claude Code specific guidance that complements AGENTS.md.

**Contains**:
- References to AGENTS.md (primary interface)
- Claude-specific commands and features
- MCP integration notes
- Detailed validation commands with Claude context

**Relationship**: CLAUDE.md **references** AGENTS.md and adds Claude-specific details.

### Tool-Specific Configs

#### `.claude/`

- `settings.local.json` - Claude Code settings
- `mcp-memory-todo.md` - MCP implementation plan

**Relationship**: References AGENTS.md via CLAUDE.md

#### `.windsurf/`

- `rules/` - Windsurf-specific rules
- `workflows/` - Cascade workflows

**Relationship**: Should reference AGENTS.md for core guidance, add Windsurf-specific patterns

#### `.kilocode/`

- `rules/memory-bank/` - Memory bank structure
  - `brief.md` - Project brief
  - `architecture.md` - Architecture patterns
  - `context.md` - Active context
  - etc.

**Relationship**: Memory bank complements AGENTS.md with project history and decisions

#### `.clinerules`

- Comprehensive memory bank system
- Explains Cline's memory-based workflow

**Relationship**: Memory bank system is Cline-specific; references AGENTS.md for core guidelines

## Best Practices

### 1. When Adding New Guidance

**First, ask**: Does this apply to all agents or just one tool?

- **All agents** → Add to AGENTS.md
- **One tool** → Add to tool-specific config and reference AGENTS.md

**Example**:

```markdown
<!-- ✅ GOOD: Tool-specific config references AGENTS.md -->
# Windsurf Rules

For core development guidelines, see [AGENTS.md](../../AGENTS.md).

Windsurf-specific notes:
- Use Memories to cache AGENTS.md patterns
- Leverage Cascade for multi-file refactoring
- ...
```

```markdown
<!-- ❌ BAD: Tool-specific config duplicates AGENTS.md -->
# Windsurf Rules

## What You Can Do
- Generate code...
- Write tests...
(duplicates AGENTS.md content)
```

### 2. When Updating Guidance

**Update AGENTS.md first**, then check if tool-specific configs need updates.

**Example workflow**:

1. User requests: "Add requirement that agents must run validation before committing"
2. **Update AGENTS.md**: Add to "How to Work Safely" section
3. **Check tool configs**: Do any reference old validation process?
4. **Update templates**: Ensure AGENTS.md.hbs includes the new requirement
5. **Test**: Run `pnpm run test-setup` to verify generated AGENTS.md is correct

### 3. Avoiding Duplication

**Use links instead of copying**:

```markdown
<!-- ✅ GOOD -->
For validation requirements, see [AGENTS.md - How to Work Safely](../AGENTS.md#how-to-work-safely).

<!-- ❌ BAD -->
Before finishing:
1. Run make validate
2. Check tests pass
... (duplicates AGENTS.md)
```

### 4. Tool-Specific Value-Add

Each tool config should add value beyond AGENTS.md:

**Windsurf**:
- Cascade workflows for common tasks
- Memory patterns for project-specific knowledge
- Supercomplete configurations

**Kilocode**:
- Memory bank with project decisions
- Architect → Code → Debug patterns
- Orchestration setups

**Cline**:
- Memory bank structure and update triggers
- Session start procedures
- Project brief and context files

**Claude Code**:
- MCP server integration
- Claude-specific command syntax
- Token optimization strategies

## Migration Strategy

### Current State (Pre-Phase 1)

```
AGENTS.md                    # Generic, dated 2024
CLAUDE.md                    # Some duplication with AGENTS.md
.windsurf/rules/             # Some duplication
.kilocode/rules/             # Some duplication
.clinerules                  # Self-contained memory bank
```

### Target State (Post-Phase 1)

```
AGENTS.md                    # Primary, 2025-2026, comprehensive
CLAUDE.md                    # References AGENTS.md, adds Claude specifics
.windsurf/rules/             # References AGENTS.md, adds Windsurf specifics
.kilocode/rules/             # References AGENTS.md, memory bank complements
.clinerules                  # References AGENTS.md, memory bank system
```

### Steps to Migrate

1. ✅ **Update root AGENTS.md** - Make it comprehensive and 2025-2026 current
2. ✅ **Update templates/AGENTS.md.hbs** - Modernize generated project template
3. ⏳ **Update tool configs** - Add references to AGENTS.md, remove duplication
4. ⏳ **Document relationship** - Create this guide
5. ⏳ **Test generation** - Verify generated projects have correct setup

## FAQ

### Q: Should I update AGENTS.md or CLAUDE.md?

**A**: Update AGENTS.md for general guidance, CLAUDE.md for Claude-specific features.

**General guidance**: Validation requirements, testing standards, security rules → AGENTS.md
**Claude-specific**: MCP integration, Claude commands, token optimization → CLAUDE.md

### Q: What if tools conflict (e.g., Windsurf wants one pattern, Cline wants another)?

**A**: Use AGENTS.md for shared baseline, tool configs for tool-specific preferences.

```markdown
<!-- AGENTS.md -->
## Testing
- Write tests for new code
- Minimum 80% coverage

<!-- .windsurf/rules/testing.md -->
For Windsurf: Use Cascade to generate tests across multiple files simultaneously.

<!-- .clinerules -->
For Cline: Update memory-bank/progress.md with test coverage status.
```

### Q: How do I keep templates in sync with root files?

**Manual process** (for now):

1. Update root AGENTS.md
2. Update templates/AGENTS.md.hbs to match structure
3. Run `pnpm run test-setup` to verify
4. Review generated output

**Future**: Consider script to validate template structure matches root structure.

### Q: Can I auto-generate tool configs from AGENTS.md?

**Possible future enhancement**:

```bash
# Hypothetical future command
pnpm run sync-tool-configs

# Reads AGENTS.md
# Generates/updates .windsurf/rules/, .kilocode/rules/, etc.
# Using templates with AGENTS.md content
```

**Not implemented yet** - current approach is manual maintenance with SSOT discipline.

## Validation Checklist

When updating agent guidance:

- [ ] AGENTS.md is updated with new information
- [ ] templates/AGENTS.md.hbs reflects the same pattern (if applicable)
- [ ] Tool-specific configs reference AGENTS.md rather than duplicate
- [ ] Run `pnpm run test-setup` to verify generated output
- [ ] Documentation (this file) is updated if relationships change
- [ ] No conflicting guidance across files

## See Also

- [AGENTS.md](../../AGENTS.md) - Primary AI agent interface
- [CLAUDE.md](../../CLAUDE.md) - Claude Code specific guidance
- [docs/guides/DOCUMENTATION_STANDARDS.md](DOCUMENTATION_STANDARDS.md) - SSOT for documentation

---

**Last Updated**: January 2025
**Maintained By**: Blueprint maintainers
