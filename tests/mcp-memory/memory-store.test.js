import test from 'node:test';
import assert from 'node:assert/strict';
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs/promises';
import { MemoryStore } from '../../src/mcp-memory/memory-store.js';

const createTempStore = async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'vibecode-mcp-'));
  const filePath = path.join(dir, 'memory.json');
  const store = new MemoryStore({ filePath });
  await store.initialize();
  return { store, dir, filePath };
};

test('MemoryStore adds and lists entries', async () => {
  const { store, dir } = await createTempStore();
  await store.add({ title: 'First', content: 'Hello world', tags: ['note'] });
  const entries = await store.list();

  assert.equal(entries.length, 1);
  assert.equal(entries[0].title, 'First');

  await fs.rm(dir, { recursive: true, force: true });
});

test('MemoryStore searches and summarizes entries', async () => {
  const { store, dir } = await createTempStore();
  await store.add({ title: 'Decision', content: 'Use AGENTS.md', tags: ['decision'] });
  await store.add({ title: 'Note', content: 'Remember to validate', tags: ['process'] });

  const results = await store.search({ query: 'AGENTS', limit: 5 });
  assert.equal(results.length, 1);
  assert.equal(results[0].title, 'Decision');

  const summary = await store.summarize({ query: 'validate', limit: 5 });
  assert.match(summary, /Found 1 memories/);

  await fs.rm(dir, { recursive: true, force: true });
});
