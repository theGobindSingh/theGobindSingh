import fs from "node:fs";
import path from "node:path";

const target = path.resolve(".agents/skills");
const link = path.resolve(".claude/skills");

try {
  const stat = fs.lstatSync(link);

  if (stat.isSymbolicLink() || stat.isDirectory()) {
    process.exit(0);
  }
} catch {
  // doesn't exist, continue
}

fs.mkdirSync(path.dirname(link), { recursive: true });

/** @type {fs.symlink.Type} */
const type = process.platform === "win32" ? "junction" : "dir";

fs.symlinkSync(target, link, type);

// eslint-disable-next-line no-console -- log success message
console.log("✅ Created .claude/skills <-> .agents/skills");
