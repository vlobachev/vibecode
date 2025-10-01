# Windsurf Team Collaboration Guide

## Sharing Plans and Context with Teammates

Since Windsurf's built-in memory is personal to each user, teams need structured approaches to share plans, decisions, and context. Here are the recommended strategies:

## 1. File-Based Plan Sharing

### Memory Bank Systems

- **KiloCode Memory Bank** (`.kilocode/rules/memory-bank/`)
  - `brief.md` - Project overview and goals
  - `tasks.md` - Current TODO items and workflows
  - `context.md` - Active development context
  
- **Cline Memory Bank** (`memory-bank/`)
  - `progress.md` - What's completed and what's next
  - `activeContext.md` - Current focus areas
  - `projectbrief.md` - High-level project information

### Dedicated Planning Files

- `docs/MCP_MEMORY_IMPLEMENTATION.md` - Universal MCP Memory Server implementation plan
- Project-specific planning documents in `docs/`
- Feature-specific planning in feature branches

## 2. Git-Based Collaboration Workflow

### Commit Strategy

```bash
# Commit memory bank updates with descriptive messages
git add memory-bank/ .kilocode/rules/memory-bank/
git commit -m "Update memory banks: Add MCP Memory integration roadmap

- Added Supermemory, MCP Memory Service, MemCP, and Chroma integration tasks
- Updated progress tracking for current development cycle
- Synchronized context across all AI tools"
```

### Branch-Based Planning

```bash
# Create planning branches for major initiatives
git checkout -b feature/mcp-memory-integration
# Work on planning documents
git commit -m "Plan: MCP Memory integration architecture"
# Create PR for team review
```

### PR-Based Plan Communication

- Use PR descriptions to explain the plan and context
- Include links to relevant memory bank files
- Tag team members for review and input

## 3. Structured Team Communication

### Daily Standup Integration

- Reference memory bank files during standups
- Update `activeContext.md` after standups
- Commit context updates so teammates can see current focus

### Decision Documentation

- Document architectural decisions in `docs/architecture/`
- Update memory banks when decisions are made
- Use consistent format for decision records

### Weekly Planning Sessions

- Review and update `progress.md` together
- Synchronize memory banks across team members
- Plan next sprint items in `tasks.md`

## 4. Windsurf-Specific Team Practices

### Shared Rules and Workflows

- Keep `.windsurf/workflows/` in git for shared workflows
- Document team conventions in `AGENTS.md`
- Use consistent prompt patterns across team

### Memory Synchronization

Since Windsurf memories are personal:

- Regularly update file-based memory banks
- Use `create_memory` tool to capture important team decisions
- Document key insights in shared files

### Context Handoffs

When switching between team members:

1. Update `activeContext.md` with current state
2. Commit all work-in-progress
3. Add handoff notes in commit messages
4. Update TODO items with current status

## 5. Tool Integration for Teams

### Multi-AI Tool Strategy

- Maintain consistent context across KiloCode, Cline, Claude, and Windsurf
- Use memory banks as single source of truth
- Synchronize TODOs across all tool-specific files

### Automated Synchronization (Future)

- GitHub Actions to validate memory bank consistency
- Automated updates when memory banks diverge
- Notifications when team members update shared context

## 6. Best Practices

### File Organization

```
project/
├── memory-bank/           # Cline memory bank (shared)
├── .kilocode/rules/       # KiloCode memory bank (shared)
├── .windsurf/             # Windsurf workflows and rules (shared)
├── docs/                  # Team documentation (shared)
│   ├── guides/            # Development guides
│   ├── architecture/      # Architecture docs
│   └── *.md               # Implementation plans
└── .windsurf/memories/    # Personal Windsurf memories (not shared)
```

**Note**: For complete project structure, see **[docs/PROJECT_STRUCTURE.md](../PROJECT_STRUCTURE.md)**.

### Communication Patterns

- **Planning**: Update memory banks → Commit → Create PR → Team review
- **Execution**: Work → Update context → Commit progress → Handoff
- **Decisions**: Document → Update memory banks → Communicate → Archive

### Regular Maintenance

- Weekly memory bank review and cleanup
- Monthly synchronization check across all AI tools
- Quarterly planning document refresh

## 7. Example Workflow

### Starting a New Feature

1. Create feature branch
2. Update `brief.md` with feature goals
3. Add tasks to `tasks.md`
4. Update `activeContext.md` with current focus
5. Commit and push for team visibility

### Daily Development

1. Check teammate updates in memory banks
2. Update `activeContext.md` with daily progress
3. Commit context changes
4. Use Windsurf with current shared context

### Feature Completion

1. Update `progress.md` with completed work
2. Archive completed tasks
3. Update architecture docs if needed
4. Create handoff documentation
5. Merge and communicate completion

This approach ensures that while Windsurf's personal memory enhances individual productivity, the team maintains shared context and planning through structured, git-based documentation.

## Related Documentation

- **[docs/PROJECT_STRUCTURE.md](../PROJECT_STRUCTURE.md)** - Complete repository structure
- **[docs/MCP_MEMORY_IMPLEMENTATION.md](../MCP_MEMORY_IMPLEMENTATION.md)** - Universal MCP Memory Server plan
- **[docs/guides/DOCUMENTATION_STANDARDS.md](DOCUMENTATION_STANDARDS.md)** - Documentation best practices
- **[docs/guides/CONTRIBUTING.md](CONTRIBUTING.md)** - Development workflow
- **[AGENTS.md](../../AGENTS.md)** - AI agent guidelines

---

**Last Updated**: 2025-10-01
