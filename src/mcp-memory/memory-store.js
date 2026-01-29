/**
 * Memory Store
 *
 * SQLite-based storage for agent memories.
 * Provides CRUD operations and basic search.
 */

import Database from 'better-sqlite3';
import { existsSync, mkdirSync } from 'fs';
import { dirname } from 'path';

export class MemoryStore {
  constructor(options = {}) {
    this.dbPath = options.dbPath || './mcp-memory.db';

    // Ensure database directory exists
    const dir = dirname(this.dbPath);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }

    // Open database
    this.db = new Database(this.dbPath);
    this.db.pragma('journal_mode = WAL'); // Better concurrency

    // Initialize schema
    this.initializeSchema();
  }

  /**
   * Initialize database schema
   */
  initializeSchema() {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS memories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT NOT NULL,
        tags TEXT,
        metadata TEXT,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL
      );

      CREATE INDEX IF NOT EXISTS idx_memories_created_at ON memories(created_at);
      CREATE INDEX IF NOT EXISTS idx_memories_tags ON memories(tags);

      CREATE VIRTUAL TABLE IF NOT EXISTS memories_fts USING fts5(
        content,
        tags,
        content='memories',
        content_rowid='id'
      );

      -- Triggers to keep FTS index in sync
      CREATE TRIGGER IF NOT EXISTS memories_fts_insert AFTER INSERT ON memories BEGIN
        INSERT INTO memories_fts(rowid, content, tags)
        VALUES (new.id, new.content, new.tags);
      END;

      CREATE TRIGGER IF NOT EXISTS memories_fts_delete AFTER DELETE ON memories BEGIN
        DELETE FROM memories_fts WHERE rowid = old.id;
      END;

      CREATE TRIGGER IF NOT EXISTS memories_fts_update AFTER UPDATE ON memories BEGIN
        UPDATE memories_fts
        SET content = new.content, tags = new.tags
        WHERE rowid = new.id;
      END;
    `);
  }

  /**
   * Add a new memory
   */
  addMemory(content, tags = [], metadata = {}) {
    const now = Date.now();
    const stmt = this.db.prepare(`
      INSERT INTO memories (content, tags, metadata, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?)
    `);

    const result = stmt.run(content, JSON.stringify(tags), JSON.stringify(metadata), now, now);

    return {
      id: result.lastInsertRowid,
      content,
      tags,
      metadata,
      createdAt: now,
      updatedAt: now
    };
  }

  /**
   * Get memory by ID
   */
  getMemory(id) {
    const stmt = this.db.prepare(`
      SELECT id, content, tags, metadata, created_at, updated_at
      FROM memories
      WHERE id = ?
    `);

    const row = stmt.get(id);
    if (!row) return null;

    return this.rowToMemory(row);
  }

  /**
   * List memories with optional pagination
   */
  listMemories({ limit = 50, offset = 0, tags = null } = {}) {
    let query = `
      SELECT id, content, tags, metadata, created_at, updated_at
      FROM memories
    `;

    const params = [];

    if (tags && tags.length > 0) {
      // Filter by tags (must contain all specified tags)
      query += ` WHERE ${tags.map(() => 'tags LIKE ?').join(' AND ')}`;
      params.push(...tags.map(tag => `%"${tag}"%`));
    }

    query += ` ORDER BY created_at DESC LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    const stmt = this.db.prepare(query);
    const rows = stmt.all(...params);

    return rows.map(row => this.rowToMemory(row));
  }

  /**
   * Search memories by content (full-text search)
   */
  searchMemories(query, { limit = 50, offset = 0 } = {}) {
    const stmt = this.db.prepare(`
      SELECT m.id, m.content, m.tags, m.metadata, m.created_at, m.updated_at
      FROM memories m
      JOIN memories_fts fts ON m.id = fts.rowid
      WHERE memories_fts MATCH ?
      ORDER BY m.created_at DESC
      LIMIT ? OFFSET ?
    `);

    const rows = stmt.all(query, limit, offset);
    return rows.map(row => this.rowToMemory(row));
  }

  /**
   * Delete memory by ID
   */
  deleteMemory(id) {
    const stmt = this.db.prepare('DELETE FROM memories WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }

  /**
   * Update memory
   */
  updateMemory(id, { content, tags, metadata } = {}) {
    const existing = this.getMemory(id);
    if (!existing) {
      throw new Error(`Memory ${id} not found`);
    }

    const now = Date.now();
    const stmt = this.db.prepare(`
      UPDATE memories
      SET content = ?, tags = ?, metadata = ?, updated_at = ?
      WHERE id = ?
    `);

    stmt.run(
      content !== undefined ? content : existing.content,
      tags !== undefined ? JSON.stringify(tags) : JSON.stringify(existing.tags),
      metadata !== undefined ? JSON.stringify(metadata) : JSON.stringify(existing.metadata),
      now,
      id
    );

    return this.getMemory(id);
  }

  /**
   * Get memory count
   */
  getCount() {
    const stmt = this.db.prepare('SELECT COUNT(*) as count FROM memories');
    return stmt.get().count;
  }

  /**
   * Convert database row to memory object
   */
  rowToMemory(row) {
    return {
      id: row.id,
      content: row.content,
      tags: JSON.parse(row.tags || '[]'),
      metadata: JSON.parse(row.metadata || '{}'),
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }

  /**
   * Close database connection
   */
  close() {
    this.db.close();
  }
}
