/**
 * MCP Server
 *
 * Implements the Model Context Protocol (MCP) specification.
 * Provides tools and resources for agent memory management.
 *
 * MCP Specification: https://modelcontextprotocol.io/
 */

export class MCPServer {
  constructor(options = {}) {
    this.name = options.name || 'mcp-memory';
    this.version = options.version || '0.1.0';
    this.description = options.description || 'MCP Memory Server';
    this.store = options.store;

    // Define available tools
    this.tools = {
      addMemory: {
        name: 'addMemory',
        description: 'Store a new memory with optional tags and metadata',
        inputSchema: {
          type: 'object',
          properties: {
            content: {
              type: 'string',
              description: 'The content to remember'
            },
            tags: {
              type: 'array',
              items: { type: 'string' },
              description: 'Optional tags for categorization'
            },
            metadata: {
              type: 'object',
              description: 'Optional metadata (key-value pairs)'
            }
          },
          required: ['content']
        }
      },
      searchMemories: {
        name: 'searchMemories',
        description: 'Search memories by content using full-text search',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'Search query (full-text search)'
            },
            limit: {
              type: 'number',
              description: 'Maximum results to return (default: 50)'
            },
            offset: {
              type: 'number',
              description: 'Offset for pagination (default: 0)'
            }
          },
          required: ['query']
        }
      },
      getMemory: {
        name: 'getMemory',
        description: 'Retrieve a specific memory by ID',
        inputSchema: {
          type: 'object',
          properties: {
            id: {
              type: 'number',
              description: 'Memory ID'
            }
          },
          required: ['id']
        }
      },
      listMemories: {
        name: 'listMemories',
        description: 'List memories with optional filtering and pagination',
        inputSchema: {
          type: 'object',
          properties: {
            tags: {
              type: 'array',
              items: { type: 'string' },
              description: 'Filter by tags (must have all specified tags)'
            },
            limit: {
              type: 'number',
              description: 'Maximum results to return (default: 50)'
            },
            offset: {
              type: 'number',
              description: 'Offset for pagination (default: 0)'
            }
          }
        }
      },
      deleteMemory: {
        name: 'deleteMemory',
        description: 'Delete a memory by ID',
        inputSchema: {
          type: 'object',
          properties: {
            id: {
              type: 'number',
              description: 'Memory ID to delete'
            }
          },
          required: ['id']
        }
      }
    };

    // Define available resources
    this.resources = {
      'memory://recent': {
        uri: 'memory://recent',
        name: 'Recent Memories',
        description: 'Most recently added memories',
        mimeType: 'application/json'
      },
      'memory://stats': {
        uri: 'memory://stats',
        name: 'Memory Statistics',
        description: 'Statistics about stored memories',
        mimeType: 'application/json'
      }
    };
  }

  /**
   * Handle MCP method calls
   */
  async handleMethod(method, params = {}) {
    switch (method) {
      case 'initialize':
        return this.handleInitialize(params);

      case 'tools/list':
        return this.handleToolsList();

      case 'tools/call':
        return this.handleToolsCall(params);

      case 'resources/list':
        return this.handleResourcesList();

      case 'resources/read':
        return this.handleResourcesRead(params);

      default:
        throw new Error(`Unknown method: ${method}`);
    }
  }

  /**
   * Handle initialize method
   */
  handleInitialize(_params) {
    return {
      protocolVersion: '1.0',
      serverInfo: {
        name: this.name,
        version: this.version,
        description: this.description
      },
      capabilities: {
        tools: {},
        resources: {}
      }
    };
  }

  /**
   * Handle tools/list method
   */
  handleToolsList() {
    return {
      tools: Object.values(this.tools)
    };
  }

  /**
   * Handle tools/call method
   */
  async handleToolsCall(params) {
    const { name, arguments: args } = params;

    switch (name) {
      case 'addMemory':
        return this.toolAddMemory(args);

      case 'searchMemories':
        return this.toolSearchMemories(args);

      case 'getMemory':
        return this.toolGetMemory(args);

      case 'listMemories':
        return this.toolListMemories(args);

      case 'deleteMemory':
        return this.toolDeleteMemory(args);

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  }

  /**
   * Handle resources/list method
   */
  handleResourcesList() {
    return {
      resources: Object.values(this.resources)
    };
  }

  /**
   * Handle resources/read method
   */
  async handleResourcesRead(params) {
    const { uri } = params;

    switch (uri) {
      case 'memory://recent':
        return this.resourceRecentMemories();

      case 'memory://stats':
        return this.resourceStats();

      default:
        throw new Error(`Unknown resource: ${uri}`);
    }
  }

  /**
   * Tool: Add Memory
   */
  toolAddMemory(args) {
    const { content, tags = [], metadata = {} } = args;
    const memory = this.store.addMemory(content, tags, metadata);

    return {
      content: [
        {
          type: 'text',
          text: `Memory added successfully with ID: ${memory.id}`
        },
        {
          type: 'resource',
          resource: {
            uri: `memory://${memory.id}`,
            mimeType: 'application/json',
            text: JSON.stringify(memory, null, 2)
          }
        }
      ]
    };
  }

  /**
   * Tool: Search Memories
   */
  toolSearchMemories(args) {
    const { query, limit, offset } = args;
    const memories = this.store.searchMemories(query, { limit, offset });

    return {
      content: [
        {
          type: 'text',
          text: `Found ${memories.length} memories matching "${query}"`
        },
        {
          type: 'resource',
          resource: {
            uri: `memory://search?q=${encodeURIComponent(query)}`,
            mimeType: 'application/json',
            text: JSON.stringify(memories, null, 2)
          }
        }
      ]
    };
  }

  /**
   * Tool: Get Memory
   */
  toolGetMemory(args) {
    const { id } = args;
    const memory = this.store.getMemory(id);

    if (!memory) {
      throw new Error(`Memory ${id} not found`);
    }

    return {
      content: [
        {
          type: 'resource',
          resource: {
            uri: `memory://${id}`,
            mimeType: 'application/json',
            text: JSON.stringify(memory, null, 2)
          }
        }
      ]
    };
  }

  /**
   * Tool: List Memories
   */
  toolListMemories(args) {
    const { tags, limit, offset } = args;
    const memories = this.store.listMemories({ tags, limit, offset });

    return {
      content: [
        {
          type: 'text',
          text: `Listed ${memories.length} memories${tags ? ` with tags: ${tags.join(', ')}` : ''}`
        },
        {
          type: 'resource',
          resource: {
            uri: 'memory://list',
            mimeType: 'application/json',
            text: JSON.stringify(memories, null, 2)
          }
        }
      ]
    };
  }

  /**
   * Tool: Delete Memory
   */
  toolDeleteMemory(args) {
    const { id } = args;
    const deleted = this.store.deleteMemory(id);

    if (!deleted) {
      throw new Error(`Memory ${id} not found`);
    }

    return {
      content: [
        {
          type: 'text',
          text: `Memory ${id} deleted successfully`
        }
      ]
    };
  }

  /**
   * Resource: Recent Memories
   */
  resourceRecentMemories() {
    const memories = this.store.listMemories({ limit: 10 });

    return {
      contents: [
        {
          uri: 'memory://recent',
          mimeType: 'application/json',
          text: JSON.stringify(memories, null, 2)
        }
      ]
    };
  }

  /**
   * Resource: Statistics
   */
  resourceStats() {
    const count = this.store.getCount();

    const stats = {
      totalMemories: count,
      timestamp: Date.now()
    };

    return {
      contents: [
        {
          uri: 'memory://stats',
          mimeType: 'application/json',
          text: JSON.stringify(stats, null, 2)
        }
      ]
    };
  }
}
