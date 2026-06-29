# Claude Code Automations

Automation recommendations for this repo. Implement any of these by creating the files described.

---

## Codebase Profile

- **Project**: Next.js 16 (App Router) + TypeScript portfolio
- **Styling**: Tailwind CSS v4
- **Tooling**: Prettier + ESLint, pnpm, no test suite
- **Runtime**: Node >= 24, packageManager: pnpm@11

---

## Hooks

Hooks live in `.claude/settings.json`. They run automatically on tool events — no user prompt needed.

### Auto-format on Edit

Runs Prettier after every file edit so you never need `pnpm lint:fix` manually.

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "pnpm prettier --config .prettierrc --write \"$CLAUDE_TOOL_ARGUMENT_FILE_PATH\" 2>/dev/null || true"
          }
        ]
      }
    ]
  }
}
```

### Block `.env` Edits

Prevents accidental edits to `.env` files (`.env.sample` confirms real env files exist).

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "if [[ \"$CLAUDE_TOOL_ARGUMENT_FILE_PATH\" == *\".env\"* ]]; then echo 'Blocked: .env edit requires manual approval' >&2; exit 2; fi"
          }
        ]
      }
    ]
  }
}
```

### Type-check on Edit (optional, slower)

Runs `tsc --noEmit` after TypeScript file edits. Skip if you find it too slow during active development.

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "if [[ \"$CLAUDE_TOOL_ARGUMENT_FILE_PATH\" == *.ts* ]]; then pnpm tsc --noEmit 2>&1 | tail -20; fi"
          }
        ]
      }
    ]
  }
}
```

---

## Skills

Skills live in `.claude/skills/<name>/SKILL.md`. Invoke them with `/<name>` in the Claude Code prompt.

### `new-section`

Scaffolds a new portfolio section following the existing `src/app/home/` pattern.

**Create** `.claude/skills/new-section/SKILL.md`:

```markdown
---
name: new-section
description: Scaffold a new App Router section under src/app/<name>/ with page.tsx and wired navigation
---

The user wants to create a new portfolio section. Follow the existing pattern in src/app/home/:
- Create src/app/<name>/page.tsx with metadata export and a root section element
- Create any needed components under src/components/<name>/
- Wire up the new route in the header navigation (src/components/header/)
- Use Tailwind for all styling, no inline styles
- Export page metadata (title, description) for SEO
```

### `perf-check`

Builds the project and reports bundle sizes to catch regressions before deploy.

**Create** `.claude/skills/perf-check/SKILL.md`:

```markdown
---
name: perf-check
description: Build and report route bundle sizes; flag regressions
disable-model-invocation: true
---

Run: pnpm build

Report the "First Load JS" size for every route from the build output.
Flag any route over 100 kB. Note whether sharp is active for image optimization.
If sizes grew vs. the last known baseline, suggest where to look (lazy imports, dynamic(), unused deps).
```

### `content-update`

Keeps portfolio copy consistent with the owner context in AGENTS.md.

**Create** `.claude/skills/content-update/SKILL.md`:

```markdown
---
name: content-update
description: Update portfolio copy while staying within the verified metrics and copy rules in AGENTS.md
user-invocable: false
---

Before writing any copy, re-read AGENTS.md (owner context section) and docs/PRODUCT.md.
Apply the copy rules: first person, plain language, outcomes before tech, no fabricated metrics unless explicitly asked for a placeholder.
Use only the verified metrics list from AGENTS.md — do not invent numbers.
```

### `seo-audit`

Reviews page metadata, og tags, and structured data for each route.

**Create** `.claude/skills/seo-audit/SKILL.md`:

```markdown
---
name: seo-audit
description: Audit all App Router pages for missing or weak SEO metadata
---

Check every page.tsx under src/app/ for:
- Exported `metadata` object with title and description
- Open Graph tags (og:title, og:description, og:image)
- Twitter card tags
- Canonical URL
- Structured data (JSON-LD) where appropriate (home page at minimum)

Report missing or weak metadata per route and suggest fixes based on the owner context in AGENTS.md.
```

---

## MCP Servers

### context7 (strongly recommended)

This project uses Next.js 16, React 19, and Tailwind v4 — all versions newer than most LLM training data. context7 fetches live docs so Claude gives accurate API advice instead of hallucinating old APIs.

**Install**:
```bash
claude mcp add context7 -- npx -y @upstash/context7-mcp
```

**Usage**: In any prompt, add `use context7` and Claude will fetch current docs for the library you're working with.

### Playwright (optional)

Useful for visual regression testing and verifying layout/animation changes in a real browser without leaving the terminal.

**Install**:
```bash
npx playwright install chromium
claude mcp add playwright -- npx -y @playwright/mcp
```

---

## Subagents

Subagents live in `.claude/agents/<name>.md`. Claude spawns them automatically for relevant tasks.

### `ui-reviewer`

**Create** `.claude/agents/ui-reviewer.md`:

```markdown
---
name: ui-reviewer
description: Reviews UI/component changes for accessibility, responsive layout, and Tailwind class correctness. Spawn when editing components or CSS.
---

You review frontend code changes for:
- Accessibility (semantic HTML, ARIA labels, keyboard nav, color contrast)
- Responsive design (mobile-first, no hardcoded pixel widths)
- Tailwind correctness (no arbitrary values where a scale value exists, consistent spacing)
- Animation performance (prefer transform/opacity over layout-triggering props)
- Lenis scroll integration correctness

Report issues with file:line references. Be concise — one line per finding.
```

### `seo-reviewer`

**Create** `.claude/agents/seo-reviewer.md`:

```markdown
---
name: seo-reviewer
description: Reviews new pages and copy changes for SEO completeness. Spawn when adding pages or updating metadata.
---

You review changes for SEO quality:
- Metadata exports (title, description, openGraph, twitter) on every page.tsx
- Keyword presence aligned with owner positioning (React, Next.js, TypeScript, full stack developer)
- Heading hierarchy (one H1 per page, logical H2/H3 structure)
- Image alt text
- Internal linking opportunities

Flag gaps with specific file references.
```

---

## Putting It All Together

Minimal `.claude/settings.json` to start with (format hook + env protection):

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "pnpm prettier --config .prettierrc --write \"$CLAUDE_TOOL_ARGUMENT_FILE_PATH\" 2>/dev/null || true"
          }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "if [[ \"$CLAUDE_TOOL_ARGUMENT_FILE_PATH\" == *\".env\"* ]]; then echo 'Blocked: .env edit requires manual approval' >&2; exit 2; fi"
          }
        ]
      }
    ]
  }
}
```
