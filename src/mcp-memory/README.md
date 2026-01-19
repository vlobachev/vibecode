# MCP Memory Server

**Minimal Model Context Protocol (MCP) memory server for persistent agent context**

A lightweight, SQLite-based memory server that implements the MCP specification. Provides persistent storage and retrieval of agent memories across sessions.

## Features

- ✅ **MCP-compliant**: Implements JSON-RPC 2.0 over stdio transport
- ✅ **SQLite storage**: Local-first, privacy-focused persistence
- ✅ **Full-text search**: Fast search using SQLite FTS5
- ✅ **Tag support**: Organize memories with tags
- ✅ **Metadata**: Store arbitrary key-value metadata
- ✅ **Resources**: Pre-defined resource endpoints (recent, stats)
- ✅ **Tools**: Add, search, get, list, delete memories

## Quick Start

### Installation

```bash
cd src/mcp-memory
npm install
```

### Running the Server

```bash
# Start server (stdio transport)
node index.js

# Or use the npm script
npm start

# Specify custom database path
MCP_MEMORY_DB_PATH=./custom-path.db node index.js
```

### Usage with MCP Clients

Configure your MCP client to connect to this server:

**Claude Desktop** (`~/.config/claude/config.json`):

```json
{
  "mcpServers": {
    "vibecode-memory": {
      "command": "node",
      "args": ["/path/to/vibecode/src/mcp-memory/index.js"],
      "env": {
        "MCP_MEMORY_DB_PATH": "/path/to/memory.db"
      }
    }
  }
}
```

## API Reference

### Tools

#### `addMemory`

Store a new memory.

**Input**:

```json
{
  "content": "Remember to run validation before committing",
  "tags": ["development", "workflow"],
  "metadata": {
    "priority": "high",
    "project": "vibecode"
  }
}
```

**Output**:

```json
{
  "id": 1,
  "content": "Remember to run validation before committing",
  "tags": ["development", "workflow"],
  "metadata": {
    "priority": "high",
    "project": "vibecode"
  },
  "createdAt": 1704067200000,
  "updatedAt": 1704067200000
}
```

#### `searchMemories`

Search memories by content (full-text search).

**Input**:

```json
{
  "query": "validation",
  "limit": 10,
  "offset": 0
}
```

**Output**: Array of matching memories

#### `getMemory`

Retrieve a specific memory by ID.

**Input**:

```json
{
  "id": 1
}
```

**Output**: Memory object

#### `listMemories`

List memories with optional filtering.

**Input**:

```json
{
  "tags": ["development"],
  "limit": 50,
  "offset": 0
}
```

**Output**: Array of memories

#### `deleteMemory`

Delete a memory by ID.

**Input**:

```json
{
  "id": 1
}
```

**Output**: Success confirmation

### Resources

#### `memory://recent`

Get the 10 most recently added memories.

#### `memory://stats`

Get statistics about stored memories.

**Output**:

```json
{
  "totalMemories": 42,
  "timestamp": 1704067200000
}
```

## Architecture

```
┌─────────────────┐
│   MCP Client    │
│ (Claude, etc.)  │
└────────┬────────┘
         │ JSON-RPC 2.0
         │ (stdio)
┌────────▼────────┐
│   index.js      │  Entry point, stdio transport
└────────┬────────┘
         │
┌────────▼────────┐
│ mcp-server.js   │  MCP protocol implementation
└────────┬────────┘
         │
┌────────▼────────┐
│ memory-store.js │  SQLite storage layer
└────────┬────────┘
         │
┌────────▼────────┐
│   SQLite DB     │  mcp-memory.db
└─────────────────┘
```

## Storage Schema

### `memories` table

| Column     | Type    | Description                    |
|------------|---------|--------------------------------|
| id         | INTEGER | Primary key (auto-increment)   |
| content    | TEXT    | Memory content                 |
| tags       | TEXT    | JSON array of tags             |
| metadata   | TEXT    | JSON object of metadata        |
| created_at | INTEGER | Unix timestamp (milliseconds)  |
| updated_at | INTEGER | Unix timestamp (milliseconds)  |

### Full-Text Search

Uses SQLite FTS5 for fast content search. Automatically kept in sync with the memories table via triggers.

## Configuration

### Environment Variables

- `MCP_MEMORY_DB_PATH`: Database file path (default: `./mcp-memory.db`)
- `NODE_ENV`: Set to `development` for verbose error output

### Database Location

By default, the database is created in the current working directory as `mcp-memory.db`.

For production use, specify a stable path:

```bash
MCP_MEMORY_DB_PATH=/var/lib/mcp-memory/memory.db node index.js
```

## Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## Limitations

This is a **minimal reference implementation**. For production use, consider:

- **Authentication**: No auth implemented (assumes trusted local environment)
- **Concurrency**: SQLite has limited write concurrency
- **Scale**: Suitable for 1000s of memories, not millions
- **Search**: Simple full-text search, not semantic/vector search
- **Backup**: Implement regular database backups
- **Monitoring**: Add logging and metrics

## Future Enhancements

**Optional features not implemented** (see `docs/MCP_MEMORY_IMPLEMENTATION.md` for roadmap):

- Semantic search with embeddings
- Vector storage (SQLite-vec, Chroma, Qdrant)
- Memory relationships and links
- Automatic context awareness
- Deduplication
- TTL and retention policies
- Cloud sync

## See Also

- [MCP Specification](https://modelcontextprotocol.io/)
- [docs/MCP_MEMORY_IMPLEMENTATION.md](../../docs/MCP_MEMORY_IMPLEMENTATION.md) - Full implementation plan
- [docs/guides/MCP.md](../../docs/guides/MCP.md) - Integration guide

## License

MIT License - See main repository LICENSE file.

---

**Part of**: Vibecode Blueprint
**Version**: 0.1.0 (January 2025)
