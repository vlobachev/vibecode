# MCP Memory Integrations TODO - Windsurf

## Development Tasks

### 1. Supermemory Integration

- Evaluate Supermemory server for lightweight note storage
- Prototype integration with `addToSupermemory` and `searchSupermemory` actions
- Define note schema and tagging strategy
- Add configuration flags and environment variables
- Write quick-start documentation and tests

### 2. MCP Memory Service (Vector Database)

- Set up local vector database (prefer SQLite-vec for simple setup)
- Implement semantic search, natural-language time queries, and tag filters
- Define memory types (note, decision, task, code_ref) and embeddings pipeline
- Add import/export functionality and retention policies
- Create benchmarks for retrieval quality

### 3. MemCP (Temporal Knowledge Graph)

- Model entities, relationships, and episodes for project knowledge
- Build ingestion pipeline from commits, issues, and chat sessions
- Expose queries for "who/what/when/why" across project timelines
- Validate against real project scenarios and use cases

### 4. Chroma MCP Server (Auto-index)

- Enable auto-indexing of repository code and AI chat sessions into ChromaDB
- Wire working-memory tools for retrieval during coding sessions
- Add deduplication and chunking strategy for code/documentation blocks
- Provide commands to re-index and validate index health

### 5. Cross-cutting Integration Tasks

- Add configuration surface to `.windsurf/rules/` and environment
- Surface provider selection and credentials via environment variables
- Provide compatibility matrix and migration notes between providers
- Add golden tests for retrieval and time-based queries
- Add GitHub Actions job to run memory integration tests
- Ensure integration with Windsurf Cascade context and Supercomplete

## Windsurf-Specific Considerations

- Leverage Windsurf's Cascade context for memory retrieval
- Integrate with existing Windsurf rules and workflows system
- Consider Supercomplete integration for enhanced autocomplete with memory
- Ensure MCP memory complements Windsurf's built-in project understanding
- Wire into Windsurf's memory system for persistent context across sessions
