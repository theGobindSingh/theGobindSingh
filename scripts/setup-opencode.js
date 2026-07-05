/* eslint-disable no-console -- script */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const configPath = path.join(root, "opencode.jsonc");

const CONFIG = {
  $schema: "https://opencode.ai/config.json",
  formatter: true,
  instructions: ["docs/PRODUCT.md", "docs/DESIGN.md", "docs/CONVENTIONS.md"],
  permission: {
    edit: {
      "*": "allow",
      ".env": "deny",
      ".env.*": "deny",
      ".env.example": "allow",
    },
  },
  agent: {},
  lsp: {},
  mcp: {
    playwright: {
      type: "local",
      command: ["npx", "-y", "@playwright/mcp@latest", "--isolated"],
      enabled: true,
    },
  },
};

const verifyPrerequisites = () => {
  const issues = [];

  if (!fs.existsSync(path.join(root, "node_modules", "prettier"))) {
    issues.push("prettier not installed — run pnpm install");
  }

  return issues;
};

const needsUpdate = () => {
  if (!fs.existsSync(configPath)) return true;
  const current = fs.readFileSync(configPath, "utf-8");

  // Check key features are present
  return !(
    current.includes('"formatter"') &&
    current.includes("seo-reviewer") &&
    current.includes("ui-reviewer")
  );
};

const writeConfig = () => {
  fs.writeFileSync(configPath, JSON.stringify(CONFIG, null, 2) + "\n", "utf-8");
};

console.log("🔍 Checking prerequisites...");
const issues = verifyPrerequisites();
if (issues.length > 0) {
  console.log("⚠️  Issues found:");
  for (const i of issues) console.log(`   • ${i}`);
} else {
  console.log("✅ All prerequisites met");
}

console.log("");
console.log("📝 Checking opencode.jsonc...");
if (needsUpdate()) {
  writeConfig();
  console.log("✅ opencode.jsonc updated");
} else {
  console.log("✅ opencode.jsonc is up to date");
}

console.log("");
console.log("📋 Setup summary:");
console.log("   • Formatter: prettier (auto-formats on file write)");
console.log("   • Instructions: docs/PRODUCT.md, DESIGN.md, CONVENTIONS.md");
console.log("   • .env edits: blocked (reads blocked by default)");
console.log("   • MCP: Playwright");
console.log("   • Skills: auto-discovered from .claude/skills/");
console.log("");
console.log("Next steps:");
console.log("   pnpm install   # if prettier is missing");
