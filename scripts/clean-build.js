#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

for (const directory of ['.next', 'out']) {
  const target = path.join(root, directory);
  fs.rmSync(target, { recursive: true, force: true });
  console.log(`Removed generated ${directory} directory.`);
}
