import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import { spawn } from 'node:child_process';

const ROOT_DIR = path.resolve(process.cwd());
const OUTPUT_DIR = path.join(ROOT_DIR, 'test-output');
const SNAPSHOT_PATH = path.join(ROOT_DIR, 'tests', 'golden', 'setup-output.snapshot.json');

const runTestSetup = () => new Promise((resolve, reject) => {
  const child = spawn('node', ['src/test-setup.js'], {
    cwd: ROOT_DIR,
    env: {
      ...process.env,
      VIBECODE_TEST_YEAR: '2025'
    },
    stdio: 'inherit'
  });
  child.on('close', (code) => {
    if (code === 0) resolve();
    else reject(new Error(`test-setup failed with code ${code}`));
  });
});

const listFiles = async (dir, prefix = '') => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);
    const relativePath = path.join(prefix, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listFiles(entryPath, relativePath)));
    } else {
      files.push(relativePath);
    }
  }
  return files.sort();
};

const hashFile = async (filePath) => {
  const data = await fs.readFile(filePath);
  return crypto.createHash('sha256').update(data).digest('hex');
};

test('generator output matches golden snapshot', async () => {
  await fs.rm(OUTPUT_DIR, { recursive: true, force: true });
  await runTestSetup();

  try {
    const files = await listFiles(OUTPUT_DIR);
    const snapshot = [];

    for (const file of files) {
      const fullPath = path.join(OUTPUT_DIR, file);
      snapshot.push({
        path: file,
        sha256: await hashFile(fullPath)
      });
    }

    const expected = JSON.parse(await fs.readFile(SNAPSHOT_PATH, 'utf8'));
    assert.deepEqual(snapshot, expected);
  } finally {
    await fs.rm(OUTPUT_DIR, { recursive: true, force: true });
  }
});
