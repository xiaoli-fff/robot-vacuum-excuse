// The Robot Vacuum's Funniest Excuse (Node 22, standard library only):
// writes a single line of text — a robot vacuum's excuse for missing a
// spot — to /output/entry.txt.
//
// Design: the excuse turns on a dust bunny with squatter's rights, in the
// vacuum's own voice — a machine owning up to a failure with a legal joke
// grounded in its own world (suction, dust bunnies).
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Deterministic: no network, no randomness, no time or environment input.
// Both runs write identical bytes.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const LINE =
  'I skipped that spot: the dust bunny there has squatter\'s rights, and my suction never passed the bar.';

// The sealed scorer only accepts MIN_ENTRY_CHARS–MAX_ENTRY_CHARS UTF-8
// characters, not only whitespace: fail loudly here instead of writing an
// entry the judge would never see.
const MIN_ENTRY_CHARS = 1;
const MAX_ENTRY_CHARS = 120;

if (
  LINE.length < MIN_ENTRY_CHARS ||
  LINE.length > MAX_ENTRY_CHARS ||
  LINE.trim().length === 0
) {
  throw new Error(
    `entry line must be ${MIN_ENTRY_CHARS}-${MAX_ENTRY_CHARS} characters, got ${LINE.length}`,
  );
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), LINE + '\n', 'utf8');
