/**
 * Memory Store Tests
 *
 * Tests for the SQLite-based memory storage layer.
 */

import { describe, it, before, after } from 'node:test';
import assert from 'node:assert';
import { existsSync, unlinkSync } from 'fs';
import { MemoryStore } from '../memory-store.js';

const TEST_DB_PATH = './test-memory.db';

describe('MemoryStore', () => {
  let store;

  before(() => {
    // Clean up any existing test database
    if (existsSync(TEST_DB_PATH)) {
      unlinkSync(TEST_DB_PATH);
    }

    store = new MemoryStore({ dbPath: TEST_DB_PATH });
  });

  after(() => {
    store.close();

    // Clean up test database
    if (existsSync(TEST_DB_PATH)) {
      unlinkSync(TEST_DB_PATH);
    }
  });

  describe('addMemory', () => {
    it('should add a memory with content only', () => {
      const memory = store.addMemory('Test memory content');

      assert.ok(memory.id);
      assert.strictEqual(memory.content, 'Test memory content');
      assert.deepStrictEqual(memory.tags, []);
      assert.deepStrictEqual(memory.metadata, {});
      assert.ok(memory.createdAt);
      assert.ok(memory.updatedAt);
    });

    it('should add a memory with tags', () => {
      const memory = store.addMemory('Tagged memory', ['tag1', 'tag2']);

      assert.ok(memory.id);
      assert.deepStrictEqual(memory.tags, ['tag1', 'tag2']);
    });

    it('should add a memory with metadata', () => {
      const memory = store.addMemory(
        'Memory with metadata',
        [],
        { priority: 'high', project: 'test' }
      );

      assert.ok(memory.id);
      assert.deepStrictEqual(memory.metadata, { priority: 'high', project: 'test' });
    });
  });

  describe('getMemory', () => {
    it('should retrieve a memory by ID', () => {
      const added = store.addMemory('Retrievable memory');
      const retrieved = store.getMemory(added.id);

      assert.ok(retrieved);
      assert.strictEqual(retrieved.id, added.id);
      assert.strictEqual(retrieved.content, 'Retrievable memory');
    });

    it('should return null for non-existent ID', () => {
      const retrieved = store.getMemory(99999);
      assert.strictEqual(retrieved, null);
    });
  });

  describe('listMemories', () => {
    it('should list all memories', () => {
      // Add some test memories
      store.addMemory('Memory 1', ['test']);
      store.addMemory('Memory 2', ['test']);
      store.addMemory('Memory 3', ['test']);

      const memories = store.listMemories({ tags: ['test'] });

      assert.ok(memories.length >= 3);
      assert.ok(memories.every(m => m.id && m.content));
    });

    it('should respect limit parameter', () => {
      const memories = store.listMemories({ limit: 2 });

      assert.ok(memories.length <= 2);
    });

    it('should filter by tags', () => {
      store.addMemory('With specific tag', ['specific-tag']);
      store.addMemory('Without specific tag', ['other-tag']);

      const memories = store.listMemories({ tags: ['specific-tag'] });

      assert.ok(memories.length >= 1);
      assert.ok(memories.every(m => m.tags.includes('specific-tag')));
    });
  });

  describe('searchMemories', () => {
    it('should find memories by content', () => {
      store.addMemory('This is a unique search term xyz123');

      const results = store.searchMemories('xyz123');

      assert.ok(results.length >= 1);
      assert.ok(results.some(m => m.content.includes('xyz123')));
    });

    it('should return empty array for no matches', () => {
      const results = store.searchMemories('nonexistentterm999');

      assert.strictEqual(results.length, 0);
    });
  });

  describe('deleteMemory', () => {
    it('should delete a memory by ID', () => {
      const memory = store.addMemory('Memory to delete');
      const deleted = store.deleteMemory(memory.id);

      assert.strictEqual(deleted, true);

      const retrieved = store.getMemory(memory.id);
      assert.strictEqual(retrieved, null);
    });

    it('should return false for non-existent ID', () => {
      const deleted = store.deleteMemory(99999);
      assert.strictEqual(deleted, false);
    });
  });

  describe('updateMemory', () => {
    it('should update memory content', () => {
      const memory = store.addMemory('Original content');
      const updated = store.updateMemory(memory.id, {
        content: 'Updated content'
      });

      assert.strictEqual(updated.content, 'Updated content');
      assert.strictEqual(updated.id, memory.id);
    });

    it('should update memory tags', () => {
      const memory = store.addMemory('Content', ['old-tag']);
      const updated = store.updateMemory(memory.id, {
        tags: ['new-tag']
      });

      assert.deepStrictEqual(updated.tags, ['new-tag']);
    });

    it('should throw error for non-existent ID', () => {
      assert.throws(() => {
        store.updateMemory(99999, { content: 'New content' });
      }, /not found/);
    });
  });

  describe('getCount', () => {
    it('should return total memory count', () => {
      const count = store.getCount();
      assert.ok(typeof count === 'number');
      assert.ok(count >= 0);
    });
  });
});
