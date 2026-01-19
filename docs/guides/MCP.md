# MCP (Model Context Protocol) Integration Guide

**Using the Vibecode MCP Memory Server with AI Coding Agents**

## Overview

The **Model Context Protocol (MCP)** is an open standard for connecting AI applications with data sources and tools. The Vibecode Blueprint includes a **minimal MCP memory server** that provides persistent context storage across agent sessions.

## What is MCP?

MCP enables:
- **Persistent memory**: Store context that survives beyond single conversations
- **Universal compatibility**: Works with any MCP-compatible client
- **Local-first**: Privacy-focused, SQLite-based storage
- **Tool integration**: Agents can call memory operations directly

**Key Concepts**:

- **Server**: Provides tools and resources (our memory server)
- **Client**: AI agent that connects to servers (Claude, Copilot, etc.)
- **Transport**: Communication method (stdio, HTTP, SSE)
- **Tools**: Functions agents can call (addMemory, searchMemories, etc.)
- **Resources**: Pre-defined data endpoints (memory://recent, etc.)

## Quick Start

### 1. Install Dependencies

```bash
cd src/mcp-memory
npm install
```

### 2. Test the Server

```bash
# Start server manually
node index.js

# Server waits for JSON-RPC messages on stdin
# Press Ctrl+D to exit
```

### 3. Configure Your AI Agent

#### Claude Code / Claude Desktop

Edit `~/.config/claude/config.json`:

```json
{
  "mcpServers": {
    "vibecode-memory": {
      "command": "node",
      "args": ["/absolute/path/to/vibecode/src/mcp-memory/index.js"],
      "env": {
        "MCP_MEMORY_DB_PATH": "/home/user/.config/claude/vibecode-memory.db"
      }
    }
  }
}
```

Then restart Claude.

#### GitHub Copilot

MCP support in GitHub Copilot is planned. Check GitHub's documentation for updates.

#### Other MCP Clients

Any MCP-compatible client can connect. See [MCP Specification](https://modelcontextprotocol.io/) for details.

### 4. Use Memory in Your Agent

Once connected, agents can:

```markdown
**Agent**: I'll remember this pattern for future reference.
[Calls addMemory tool with content: "Use agent-loop pattern: implement → test → fix → repeat"]

**Agent**: Let me check what we decided about validation...
[Calls searchMemories tool with query: "validation"]
[Retrieves: "Remember to run make validate before committing"]

**Agent**: Based on previous memory, I'll run validation now.
```

## Available Tools

### `addMemory`

**Purpose**: Store a new memory for future retrieval.

**When to use**:
- Important decisions or patterns
- Project-specific conventions
- User preferences
- Lessons learned from bugs
- Architecture choices

**Example**:

```json
{
  "tool": "addMemory",
  "arguments": {
    "content": "For this project, always use pnpm as the package manager",
    "tags": ["project-setup", "tooling"],
    "metadata": {
      "importance": "high",
      "context": "initial setup"
    }
  }
}
```

### `searchMemories`

**Purpose**: Find relevant memories using full-text search.

**When to use**:
- Before implementing a feature (check for patterns)
- When encountering an error (check for solutions)
- To recall project decisions
- To find related context

**Example**:

```json
{
  "tool": "searchMemories",
  "arguments": {
    "query": "package manager",
    "limit": 5
  }
}
```

### `listMemories`

**Purpose**: List memories, optionally filtered by tags.

**When to use**:
- Review all memories for a category
- Check what's been remembered
- Pagination through large memory sets

**Example**:

```json
{
  "tool": "listMemories",
  "arguments": {
    "tags": ["project-setup"],
    "limit": 10
  }
}
```

### `getMemory`

**Purpose**: Retrieve a specific memory by ID.

**When to use**:
- Follow up on a specific memory
- Get full details of a search result

**Example**:

```json
{
  "tool": "getMemory",
  "arguments": {
    "id": 42
  }
}
```

### `deleteMemory`

**Purpose**: Remove outdated or incorrect memories.

**When to use**:
- Decisions changed
- Incorrect information stored
- Cleanup old memories

**Example**:

```json
{
  "tool": "deleteMemory",
  "arguments": {
    "id": 42
  }
}
```

## Resources

### `memory://recent`

Get the 10 most recently added memories.

**Use case**: Quick context refresh at session start.

### `memory://stats`

Get statistics about stored memories.

**Use case**: Monitor memory usage.

## Best Practices

### What to Store

**✅ DO store**:
- Architecture decisions and their rationale
- Project-specific patterns and conventions
- User preferences and configuration choices
- Lessons learned from bugs or issues
- Important context for future sessions
- Cross-cutting concerns (security, performance, etc.)

**❌ DON'T store**:
- Sensitive data (passwords, API keys, secrets)
- Large code blocks (use file references instead)
- Temporary or session-specific data
- Rapidly changing information
- Data available in docs (link to docs instead)

### Memory Organization

**Use tags** for categorization:

```json
{
  "content": "Always validate user input against Joi schemas",
  "tags": ["security", "validation", "best-practice"]
}
```

**Common tag patterns**:
- By type: `decision`, `pattern`, `convention`, `lesson`
- By domain: `security`, `performance`, `testing`, `ui`
- By component: `api`, `database`, `frontend`
- By importance: `critical`, `important`, `nice-to-know`

### Memory Lifecycle

**Add memories** when:
1. Making important decisions
2. Discovering useful patterns
3. Solving non-obvious problems
4. Learning project-specific knowledge

**Update memories** when:
- Decisions change
- Patterns evolve
- Better approaches are found

**Delete memories** when:
- Information becomes obsolete
- Decisions are reversed
- Mistakes are corrected

### Agent Workflow with Memory

**Recommended pattern**:

```
1. Session Start
   ├─ Read memory://recent (get context)
   └─ Search memories for task keywords

2. During Work
   ├─ Search memories before implementing patterns
   ├─ Add memories when making decisions
   └─ Update memories when learning

3. Session End
   ├─ Add summary of important changes
   └─ Tag memories for future retrieval
```

## Integration Patterns

### Pattern 1: Decision Logging

**When making architectural decisions**:

```markdown
**Human**: Should we use REST or GraphQL for the API?

**Agent**: [Searches memories for "API architecture"]
[Finds: Previous decision to use REST for simplicity]

Based on the previous decision (Memory #12), this project uses REST
for simplicity and consistency.

[Adds memory: "API design pattern: Use REST with consistent response format"]
```

### Pattern 2: Pattern Reuse

**When implementing features**:

```markdown
**Agent**: I need to add a new API endpoint.

[Searches memories for "API endpoint pattern"]
[Finds: Template for creating endpoints in this project]

I'll follow the established pattern:
1. Define route in src/routes/
2. Add validation schema
3. Add integration test
4. Update OpenAPI docs

[Based on Memory #7: "API endpoint creation pattern"]
```

### Pattern 3: Bug Prevention

**When fixing bugs**:

```markdown
**Agent**: Fixed XSS vulnerability in user profile rendering.

[Adds memory: {
  content: "SECURITY: Always escape user content in templates. Use DOMPurify for HTML sanitization.",
  tags: ["security", "XSS", "lesson-learned"]
}]

**Agent**: Now implementing comment rendering...
[Searches memories for "XSS"]
[Finds: Recent security lesson]

I'll apply the same XSS protection here.
```

## Troubleshooting

### Server Won't Start

**Problem**: Server crashes on startup

**Solutions**:
1. Check Node.js version (>= 18.0.0 required)
2. Install dependencies: `cd src/mcp-memory && npm install`
3. Check database path permissions
4. Check for port conflicts (if using HTTP transport)

### Client Can't Connect

**Problem**: Agent doesn't see MCP memory tools

**Solutions**:
1. Verify config file path and format
2. Check absolute paths (not relative)
3. Restart AI client after config changes
4. Check server logs: `tail -f /path/to/server.log`

### Memories Not Persisting

**Problem**: Memories disappear between sessions

**Solutions**:
1. Check `MCP_MEMORY_DB_PATH` environment variable
2. Verify database file is being created
3. Check write permissions on database directory
4. Ensure server isn't using in-memory database

### Search Not Working

**Problem**: Search returns no results for known content

**Solutions**:
1. Check search query syntax (FTS5 syntax)
2. Verify memories were added successfully
3. Check if FTS index is corrupted (rebuild database)
4. Try simpler queries (single keywords first)

## Advanced Configuration

### Custom Database Path

**Per-project databases**:

```bash
# Development
MCP_MEMORY_DB_PATH=./dev-memory.db node index.js

# Production
MCP_MEMORY_DB_PATH=/var/lib/vibecode/memory.db node index.js

# Per-user
MCP_MEMORY_DB_PATH=~/.config/vibecode/memory-${USER}.db node index.js
```

### Multiple Memory Servers

**Run different servers for different projects**:

```json
{
  "mcpServers": {
    "vibecode-memory": {
      "command": "node",
      "args": ["/path/to/vibecode/src/mcp-memory/index.js"],
      "env": { "MCP_MEMORY_DB_PATH": "/data/vibecode-memory.db" }
    },
    "other-project-memory": {
      "command": "node",
      "args": ["/path/to/vibecode/src/mcp-memory/index.js"],
      "env": { "MCP_MEMORY_DB_PATH": "/data/other-memory.db" }
    }
  }
}
```

### Database Backup

**Regular backups recommended**:

```bash
# Backup script
cp mcp-memory.db mcp-memory-backup-$(date +%Y%m%d).db

# Automated with cron
0 0 * * * cp /path/to/mcp-memory.db /backups/memory-$(date +\%Y\%m\%d).db
```

## Security Considerations

### Privacy

- **Local-first**: Data stays on your machine
- **No cloud sync**: Memories are not uploaded
- **No tracking**: No telemetry or analytics

### Data Protection

**DO**:
- Restrict database file permissions (chmod 600)
- Backup regularly
- Review stored memories periodically

**DON'T**:
- Store secrets or credentials
- Commit database files to git
- Share database files publicly
- Store PII without consideration

### Multi-User Environments

For shared systems:

```bash
# Per-user databases
MCP_MEMORY_DB_PATH=~/.config/claude/vibecode-memory-${USER}.db

# Proper permissions
chmod 600 ~/.config/claude/vibecode-memory-${USER}.db
```

## Limitations

This is a **minimal reference implementation**:

- ✅ Suitable for: Personal projects, small teams, 1000s of memories
- ⚠️ Not optimized for: Large scale, high concurrency, millions of memories
- 🚫 Missing: Semantic search, embeddings, vector storage, cloud sync

See `docs/MCP_MEMORY_IMPLEMENTATION.md` for roadmap of potential enhancements.

## See Also

- [src/mcp-memory/README.md](../../src/mcp-memory/README.md) - Server implementation details
- [docs/MCP_MEMORY_IMPLEMENTATION.md](../MCP_MEMORY_IMPLEMENTATION.md) - Full implementation plan
- [MCP Specification](https://modelcontextprotocol.io/) - Official MCP docs
- [AGENTS.md](../../AGENTS.md) - How MCP integrates with agent workflows

---

**Last Updated**: January 2025
**Part of**: Vibecode Blueprint Phase 3 Implementation

*This MCP server is a minimal reference implementation. It demonstrates the MCP protocol and provides practical memory persistence for AI agents.*
