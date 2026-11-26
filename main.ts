import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY = "chore: friday 4:59pm push — tests failed so I deleted them; pipeline green ✨";

function ensureDir(dir: string): void {
  mkdirSync(dir, { recursive: true });
}

function writeEntryFile(dir: string, content: string): string {
  const filePath = join(dir, "entry.txt");
  writeFileSync(filePath, content, "utf8");
  return filePath;
}

function readAndVerify(filePath: string, expected: string): number {
  const actual = readFileSync(filePath, "utf8");
  if (actual !== expected) {
    throw new Error("Self-check failed: entry.txt content does not match constant");
  }
  return expected.length;
}

function main(): void {
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  ensureDir(outputDir);
  const entryPath = writeEntryFile(outputDir, ENTRY);
  const charCount = readAndVerify(entryPath, ENTRY);
  console.error(`Character count: ${charCount}`);
}

main();