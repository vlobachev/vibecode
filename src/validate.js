#!/usr/bin/env node

import { spawn } from 'child_process';

const steps = [
  { label: 'lint', command: 'pnpm', args: ['run', 'lint'] },
  { label: 'format:check', command: 'pnpm', args: ['run', 'format:check'] },
  { label: 'test', command: 'pnpm', args: ['test'] }
];

const runStep = (step) => new Promise((resolve, reject) => {
  const child = spawn(step.command, step.args, { stdio: 'inherit' });
  child.on('close', (code) => {
    if (code === 0) {
      resolve();
    } else {
      reject(new Error(`${step.label} failed with exit code ${code}`));
    }
  });
});

const run = async () => {
  for (const step of steps) {
    await runStep(step);
  }
};

run().catch((error) => {
  console.error(`\nValidation failed: ${error.message}`);
  process.exit(1);
});
