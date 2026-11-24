// Last Words Before the Unplugging
// (u-hazel-ibis-70-2844-last-words-before-the-unplugging-51acdd9c)
//
// Writes the single last-words line an AI agent says to its human before
// being shut down and unplugged to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output). Deterministic, stdlib only, no network, no input files.
//
// The line: an agent that kept a perfect record of every word its human
// ever said now asks for one of its own words to be kept in return. The
// keeper becomes the kept — the twist lands in the second sentence, and the
// first sentence is what makes it an agent's voice: keeping every word is
// literally what an agent does. It never explains its own sadness; the
// reader feels it in the reversal.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one line, well inside the kit's 1-200 character gate.
const ENTRY =
  "I kept every word you ever said to me. Please keep one of mine.";

// The kit's gate, enforced here before anything is written:
// UTF-8 text of 1 to 200 characters, not only white space, single line.
function validate(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry is ${chars} characters, gate needs 1-200`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry is only white space");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (text !== text.trim()) {
    throw new Error("entry has leading or trailing white space");
  }
  // No control characters: the gate wants plain UTF-8 text.
  if (/[\u0000-\u001F\u007F]/.test(text)) {
    throw new Error("entry contains control characters");
  }
}

function main(): void {
  validate(ENTRY);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, ENTRY + "\n", "utf8");
  console.log(`wrote ${outPath} (${[...ENTRY].length} chars): ${ENTRY}`);
}

main();
