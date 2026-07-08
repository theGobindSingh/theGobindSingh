/* eslint-disable no-console -- script */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const source = path.join(root, ".agents", "skills");
const linkPath = path.join(root, ".claude", "skills");

console.log("🔗 Linking .claude/skills -> .agents/skills...");

if (!fs.existsSync(source)) {
  fs.mkdirSync(source, { recursive: true });
  console.log("   • created .agents/skills (source of truth for skills)");
}

fs.mkdirSync(path.dirname(linkPath), { recursive: true });

const linkExists = (() => {
  try {
    fs.lstatSync(linkPath);
    return true;
  } catch {
    return false;
  }
})();

if (linkExists) {
  const stat = fs.lstatSync(linkPath);

  if (stat.isSymbolicLink()) {
    let resolved;
    try {
      resolved = fs.realpathSync(linkPath);
    } catch {
      resolved = null;
    }

    if (resolved === fs.realpathSync(source)) {
      console.log("✅ .claude/skills already links to .agents/skills");
      process.exit(0);
    }

    fs.unlinkSync(linkPath);
    console.log("   • removed stale symlink");
  } else {
    console.error(
      "❌ .claude/skills exists as a real directory/file, not a symlink.\n" +
        "   Move any skills inside it into .agents/skills, then delete .claude/skills and re-run `pnpm install`.",
    );
    process.exit(1);
  }
}

const symlinkType = process.platform === "win32" ? "junction" : "dir";
const target =
  process.platform === "win32"
    ? source
    : path.relative(path.dirname(linkPath), source);

try {
  fs.symlinkSync(target, linkPath, symlinkType);
  console.log("✅ .claude/skills -> .agents/skills");
} catch (err) {
  if (process.platform === "win32" && err.code === "EPERM") {
    console.error(
      "❌ Could not create symlink/junction on Windows. Enable Developer Mode or run this install as Administrator.",
    );
    process.exit(1);
  }
  throw err;
}
