import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const DEFAULT_DATA = {
  version: 1,
  entries: []
};

export class MemoryStore {
  constructor({ filePath }) {
    this.filePath = filePath;
  }

  async initialize() {
    await fs.mkdir(path.dirname(this.filePath), { recursive: true });
    try {
      await fs.access(this.filePath);
    } catch {
      await fs.writeFile(this.filePath, JSON.stringify(DEFAULT_DATA, null, 2));
    }
  }

  async readAll() {
    const raw = await fs.readFile(this.filePath, 'utf8');
    const data = JSON.parse(raw);
    return Array.isArray(data.entries) ? data.entries : [];
  }

  async writeAll(entries) {
    const payload = {
      ...DEFAULT_DATA,
      entries
    };
    await fs.writeFile(this.filePath, JSON.stringify(payload, null, 2));
  }

  async list() {
    return this.readAll();
  }

  async add({ title, content, tags }) {
    if (!content || typeof content !== 'string') {
      throw new Error('content is required');
    }
    const now = new Date().toISOString();
    const entry = {
      id: crypto.randomUUID(),
      title: title || 'Untitled',
      content,
      tags: Array.isArray(tags) ? tags : [],
      createdAt: now,
      updatedAt: now
    };
    const entries = await this.readAll();
    entries.push(entry);
    await this.writeAll(entries);
    return entry;
  }

  async getById(id) {
    const entries = await this.readAll();
    return entries.find((entry) => entry.id === id) || null;
  }

  async search({ query, limit = 10 }) {
    const entries = await this.readAll();
    if (!query) {
      return entries.slice(-limit);
    }
    const normalized = query.toLowerCase();
    const results = entries.filter((entry) => {
      const haystack = [entry.title, entry.content, ...(entry.tags || [])]
        .join(' ')
        .toLowerCase();
      return haystack.includes(normalized);
    });
    return results.slice(0, limit);
  }

  async summarize({ query, limit = 5 }) {
    const results = await this.search({ query, limit });
    if (results.length === 0) {
      return 'No memories matched the query.';
    }
    const titles = results.map((entry) => `- ${entry.title}`).join('\n');
    return `Found ${results.length} memories:\n${titles}`;
  }
}
