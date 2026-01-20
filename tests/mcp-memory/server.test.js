import test from 'node:test';
import assert from 'node:assert/strict';
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs/promises';
import { createMcpServer } from '../../src/mcp-memory/server.js';

const jsonRpc = async (url, payload) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return response.json();
};

test('MCP server handles initialize and tool calls', async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'vibecode-mcp-'));
  const filePath = path.join(dir, 'memory.json');

  const { server, start, stop } = createMcpServer({ host: '127.0.0.1', port: 0, filePath });
  const address = await start();
  const port = typeof address === 'string' ? address.split(':').pop() : address.port;
  const url = `http://127.0.0.1:${port}`;

  const initResponse = await jsonRpc(url, { jsonrpc: '2.0', id: 1, method: 'initialize', params: {} });
  assert.ok(initResponse.result.capabilities.tools);

  const addResponse = await jsonRpc(url, {
    jsonrpc: '2.0',
    id: 2,
    method: 'tools/call',
    params: {
      name: 'add_memory',
      arguments: {
        title: 'Test',
        content: 'Hello',
        tags: ['test']
      }
    }
  });
  assert.ok(addResponse.result.content[0].text.includes('Hello'));

  const listResponse = await jsonRpc(url, { jsonrpc: '2.0', id: 3, method: 'resources/list', params: {} });
  assert.equal(listResponse.result.resources.length, 1);

  await stop();
  await fs.rm(dir, { recursive: true, force: true });
});
