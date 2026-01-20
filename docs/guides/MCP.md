# MCP (Model Context Protocol) Guide

This blueprint includes a **minimal MCP memory server** to make agent workflows reproducible and local-first. It is intentionally simple and dependency-free.

## What You Get

- JSON-RPC 2.0 MCP server
- File-backed memory storage (JSON)
- Tools: `add_memory`, `search_memory`, `summarize_memory`
- Resources: list/read memory entries

## Run the Server

```bash
pnpm run mcp-memory
```

By default it starts on port `3333` and stores memory at `memory-bank/mcp-memory.json`.

### Environment Variables

- `MCP_MEMORY_PORT` – default `3333`
- `MCP_MEMORY_HOST` – default `127.0.0.1`
- `MCP_MEMORY_PATH` – default `memory-bank/mcp-memory.json`

## Example JSON-RPC Calls

### Initialize

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "initialize",
  "params": {}
}
```

### Add Memory

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/call",
  "params": {
    "name": "add_memory",
    "arguments": {
      "title": "Decision: keep AGENTS.md canonical",
      "content": "We align tool rules to AGENTS.md to avoid drift.",
      "tags": ["decision", "process"]
    }
  }
}
```

### Search Memory

```json
{
  "jsonrpc": "2.0",
  "id": 3,
  "method": "tools/call",
  "params": {
    "name": "search_memory",
    "arguments": { "query": "AGENTS" }
  }
}
```

## Connect from Agents

- **Claude Code / Codex / Cline**: point the MCP server URL to `http://127.0.0.1:3333`.
- **Copilot**: use a local MCP integration or a wrapper that forwards JSON-RPC.

## Security Notes

- This server is **local-only** by default.
- Do not expose it publicly without authentication.
- Treat memory entries as sensitive; avoid secrets.
