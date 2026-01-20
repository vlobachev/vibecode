import http from 'http';
import { MemoryStore } from './memory-store.js';

const DEFAULT_HOST = process.env.MCP_MEMORY_HOST || '127.0.0.1';
const DEFAULT_PORT = Number.parseInt(process.env.MCP_MEMORY_PORT, 10) || 3333;
const DEFAULT_PATH = process.env.MCP_MEMORY_PATH || 'memory-bank/mcp-memory.json';

const TOOL_DEFINITIONS = [
  {
    name: 'add_memory',
    description: 'Store a memory entry with optional tags.',
    inputSchema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        content: { type: 'string' },
        tags: { type: 'array', items: { type: 'string' } }
      },
      required: ['content']
    }
  },
  {
    name: 'search_memory',
    description: 'Search memories by substring match.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string' },
        limit: { type: 'number' }
      }
    }
  },
  {
    name: 'summarize_memory',
    description: 'Summarize matching memories with a short list.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string' },
        limit: { type: 'number' }
      }
    }
  }
];

function jsonResponse(res, payload) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload));
}

function jsonError(id, message, code = -32603) {
  return {
    jsonrpc: '2.0',
    id,
    error: {
      code,
      message
    }
  };
}

function memoryUri(id) {
  return `memory://${id}`;
}

function parseMemoryId(uri) {
  if (!uri || typeof uri !== 'string') {
    return null;
  }
  if (uri.startsWith('memory://')) {
    return uri.replace('memory://', '');
  }
  return null;
}

async function handleRpc(payload, store) {
  const { id, method, params } = payload;

  try {
    switch (method) {
      case 'initialize':
        return {
          jsonrpc: '2.0',
          id,
          result: {
            protocolVersion: '2024-11-05',
            capabilities: {
              resources: { list: true, read: true },
              tools: { list: true, call: true }
            },
            serverInfo: {
              name: 'vibecode-mcp-memory',
              version: '0.1.0'
            }
          }
        };
      case 'resources/list': {
        const entries = await store.list();
        return {
          jsonrpc: '2.0',
          id,
          result: {
            resources: entries.map((entry) => ({
              uri: memoryUri(entry.id),
              name: entry.title,
              mimeType: 'application/json'
            }))
          }
        };
      }
      case 'resources/read': {
        const entryId = parseMemoryId(params?.uri);
        if (!entryId) {
          return jsonError(id, 'Invalid resource URI', -32602);
        }
        const entry = await store.getById(entryId);
        if (!entry) {
          return jsonError(id, 'Memory not found', -32004);
        }
        return {
          jsonrpc: '2.0',
          id,
          result: {
            contents: [
              {
                uri: memoryUri(entry.id),
                mimeType: 'application/json',
                text: JSON.stringify(entry, null, 2)
              }
            ]
          }
        };
      }
      case 'tools/list':
        return {
          jsonrpc: '2.0',
          id,
          result: { tools: TOOL_DEFINITIONS }
        };
      case 'tools/call': {
        const toolName = params?.name;
        const args = params?.arguments || {};

        if (toolName === 'add_memory') {
          const entry = await store.add(args);
          return {
            jsonrpc: '2.0',
            id,
            result: {
              content: [{ type: 'text', text: JSON.stringify(entry, null, 2) }]
            }
          };
        }

        if (toolName === 'search_memory') {
          const matches = await store.search(args);
          return {
            jsonrpc: '2.0',
            id,
            result: {
              content: [{ type: 'text', text: JSON.stringify(matches, null, 2) }]
            }
          };
        }

        if (toolName === 'summarize_memory') {
          const summary = await store.summarize(args);
          return {
            jsonrpc: '2.0',
            id,
            result: {
              content: [{ type: 'text', text: summary }]
            }
          };
        }

        return jsonError(id, `Unknown tool: ${toolName}`, -32601);
      }
      default:
        return jsonError(id, `Unknown method: ${method}`, -32601);
    }
  } catch (error) {
    return jsonError(id, error?.message || 'Server error');
  }
}

export function createMcpServer({ host = DEFAULT_HOST, port = DEFAULT_PORT, filePath = DEFAULT_PATH } = {}) {
  const store = new MemoryStore({ filePath });

  const server = http.createServer(async (req, res) => {
    if (req.method !== 'POST') {
      res.writeHead(405, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Only POST is supported' }));
      return;
    }

    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', async () => {
      try {
        const payload = JSON.parse(body || '{}');
        await store.initialize();
        const response = await handleRpc(payload, store);
        jsonResponse(res, response);
      } catch (error) {
        jsonResponse(res, jsonError(null, error?.message || 'Invalid JSON', -32700));
      }
    });
  });

  return {
    server,
    start: () => new Promise((resolve) => {
      server.listen(port, host, () => resolve(server.address()));
    }),
    stop: () => new Promise((resolve, reject) => {
      server.close((err) => (err ? reject(err) : resolve()));
    })
  };
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  const instance = createMcpServer();
  instance.start().then((address) => {
    const location = typeof address === 'string' ? address : `${address.address}:${address.port}`;
    console.log(`MCP memory server listening on ${location}`);
  });
}
