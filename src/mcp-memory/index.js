#!/usr/bin/env node

/**
 * MCP Memory Server
 *
 * A minimal Model Context Protocol (MCP) server for persistent agent memory.
 * Implements JSON-RPC 2.0 over stdio transport.
 *
 * Features:
 * - Add, search, and retrieve memories
 * - SQLite storage (local-first, privacy-focused)
 * - Simple substring search
 * - MCP-compliant JSON-RPC 2.0 interface
 *
 * Usage:
 *   node index.js
 *
 * MCP Clients should communicate via stdio (standard input/output).
 */

import { createReadStream, createWriteStream } from 'fs';
import { MemoryStore } from './memory-store.js';
import { MCPServer } from './mcp-server.js';

// Initialize memory store
const store = new MemoryStore({
  dbPath: process.env.MCP_MEMORY_DB_PATH || './mcp-memory.db'
});

// Initialize MCP server
const server = new MCPServer({
  name: 'vibecode-mcp-memory',
  version: '0.1.0',
  description: 'Vibecode Blueprint MCP Memory Server',
  store
});

// Setup stdio transport
const input = process.stdin;
const output = process.stdout;

// Handle incoming JSON-RPC messages
let buffer = '';

input.on('data', (chunk) => {
  buffer += chunk.toString();

  // Process complete JSON-RPC messages (newline-delimited)
  const lines = buffer.split('\n');
  buffer = lines.pop(); // Keep incomplete line in buffer

  for (const line of lines) {
    if (line.trim()) {
      try {
        const request = JSON.parse(line);
        handleRequest(request);
      } catch (error) {
        sendError(null, -32700, 'Parse error', { message: error.message });
      }
    }
  }
});

input.on('end', () => {
  store.close();
  process.exit(0);
});

/**
 * Handle JSON-RPC request
 */
async function handleRequest(request) {
  const { id, method, params } = request;

  try {
    const result = await server.handleMethod(method, params);
    sendResponse(id, result);
  } catch (error) {
    sendError(id, -32603, 'Internal error', {
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}

/**
 * Send JSON-RPC success response
 */
function sendResponse(id, result) {
  const response = {
    jsonrpc: '2.0',
    id,
    result
  };
  output.write(JSON.stringify(response) + '\n');
}

/**
 * Send JSON-RPC error response
 */
function sendError(id, code, message, data) {
  const response = {
    jsonrpc: '2.0',
    id,
    error: { code, message, data }
  };
  output.write(JSON.stringify(response) + '\n');
}

// Error handling
process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
  sendError(null, -32603, 'Internal error', { message: error.message });
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled rejection:', reason);
  sendError(null, -32603, 'Internal error', { message: String(reason) });
});

// Startup message (to stderr, not to interfere with JSON-RPC)
console.error('MCP Memory Server started');
console.error(`Database: ${store.dbPath}`);
console.error('Waiting for JSON-RPC messages on stdin...');
