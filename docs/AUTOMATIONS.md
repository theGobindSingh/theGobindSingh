# Claude Code Automations

What's actually automated in this repo, plus recommendations not yet adopted. Hooks and
skills below are implemented and live; MCP servers and subagents are recommendations —
implement by creating the files/config described.

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

Skills live in `.agents/skills/<name>/SKILL.md` and are **implemented** (not just recipes).
`.agents/skills/` is the source of truth — `.claude/skills` is a generated symlink to it (see
[Skill symlink setup](#skill-symlink-setup) below), so **new skills always go into
`.agents/skills/`, never `.claude/skills/`**. Invoke skills with `/<name>` in the Claude Code
prompt, or Claude spawns them automatically where noted.

### `new-section`

Scaffolds a new App Router route, or a new section within an existing route, matching this
repo's real structure (route sections vs. route-local `components/`, global `@` aliases,
`FullWidthWrapper`/`Section` reuse, nav wiring). See
`.agents/skills/new-section/SKILL.md`.

### `perf-check`

Runs `pnpm build`, reports First Load JS per route, and flags routes over 100 kB with a
concrete likely cause. Both user-invocable (`/perf-check`) and auto-invoked by Claude before
declaring bundle-size-relevant work done, per AGENTS.md golden rule 7. See
`.agents/skills/perf-check/SKILL.md`.

### `seo-audit`

Audits every `page.tsx` for metadata, canonical, OG/Twitter, JSON-LD, heading structure, and
image/link accessibility, using the homepage's existing implementation as the compliance
baseline. See `.agents/skills/seo-audit/SKILL.md`.

### `content-update`

Enforces the copy rules and verified-metrics list from `AGENTS.md` before any portfolio copy
is written or edited. Claude applies it automatically; also user-invocable (`/content-update`)
to spot-check existing copy. See `.agents/skills/content-update/SKILL.md`.

### Skill symlink setup

`scripts/skills.js` runs as part of `pnpm install` (via the `prepare` script, `pnpm run
setup:skills`) and creates `.claude/skills` as a symlink (a junction on Windows) pointing at
`.agents/skills`. This is what makes skills dropped into `.agents/skills/` show up under
`.claude/skills/` for tools that only look there — no per-skill setup needed. If the symlink
is ever missing or stale, re-run `pnpm run setup:skills`.

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

Not yet implemented — `.claude/agents/` exists but is empty. If added, subagents would live
in `.claude/agents/<name>.md` and Claude would spawn them automatically for relevant tasks.

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
