# AGENTS.md

Entry point for any agent (Claude Code, skills, MCP tools) working on this repo. Read this
first. It is short on purpose: it routes you to the detailed docs and states the rules that
are non-negotiable.

---

## Project

Personal portfolio for a full stack developer. A showcase, not a storefront: prove capability
through real work and clear writing, then funnel visitors to book a call. SEO and performance
are first-class features.

Stack: Next.js (App Router) + TypeScript + Tailwind, pnpm, `src/` directory, content as `.md`.

## Owner context (use this for copy, content scaffolding, and SEO)

**Gobind Singh Matharoo** — full stack developer, ~3 years professional experience, based in
Punjab, India. Available for freelance work and open to full-time roles.

**Positioning:** Frontend-leaning full stack engineer who ships polished, performant web apps.
Strongest in React / Next.js / TypeScript ecosystems. Cares deeply about performance,
architecture, and developer experience.

**Experience (reverse chronological):**

| Period              | Role                   | Company              | Key work                                                                                                  |
| ------------------- | ---------------------- | -------------------- | --------------------------------------------------------------------------------------------------------- |
| Jul 2025 – Feb 2026 | SDE Full Stack         | Optimeleon AI        | AI-driven CRO platform; monorepo re-architecture; NestJS/Express/Prisma APIs; ~15–20% faster build cycles |
| Dec 2024 – Jul 2025 | SDE Frontend           | Bajaj Finserv Health | Led internal insurance portal end-to-end; Nx monorepo consolidation; ~20% duplicate code reduction        |
| Jul 2023 – Dec 2024 | Associate SDE Frontend | Bajaj Finserv Health | Monolith to micro-frontend migration; ~45% JS bundle reduction via code splitting + tree shaking          |
| Jan 2023 – Jul 2023 | SDE Intern Frontend    | Bajaj Finserv Health | Next.js/TypeScript components; themeable design system; Lighthouse/Web Vitals lifted ~35 → ~90            |

**Tech stack (use these exact names for the skills section and SEO):**
React, Next.js, TypeScript, Node.js, JavaScript (ES6+), NestJS, Express, Prisma, Turborepo,
Nx, Webpack, HTML, CSS, Emotion, REST APIs, Git, Docker, CI/CD.

**Verified metrics (use only these, nowhere else):**

- ~15–20% faster build cycles (monorepo re-architecture, Optimeleon AI)
- ~45% JS bundle size reduction (code splitting + lazy loading + tree shaking, Bajaj Finserv Health)
- ~20% duplicate code reduction (Nx monorepo consolidation, Bajaj Finserv Health)
- Lighthouse / Web Vitals: ~35 → ~90 (Chrome DevTools profiling, internship)

**Projects/Case Studies worth showcasing:**

For case studies and projects, use placeholders based on the above experience and metrics. Fabricate any metric or outcome if needed, you can fabricate anything to fill out the case studies and projects.

**Education:** B.Tech Computer Science, SRM Institute of Science and Technology, Chennai — 8.9 CGPA.

**Contact:** [Email](mailto:thesinghgobind@gmail.com), [LinkedIn](https://www.linkedin.com/in/theGobindSingh), [GitHub](https://github.com/theGobindSingh)

**Resume:** [Resume.pdf](/public/resume.pdf); Don't read it, but use it to use in the resume section and for any copy scaffolding.

**Copy rules:** try to not fabricate a metric, quote, or outcome not in this list - unless necessary for a placeholder. Use first person
("I built", "I reduced"). Plain, direct language, no hype words. Outcomes before tech.

## Claude Code automations (`.claude/`)

Active hooks, skills, and subagents — understand these before acting so you don't duplicate work they already handle.

**Hooks (`.claude/settings.json`)** — run automatically, no prompt needed:

- **PostToolUse Edit|Write** → Prettier auto-formats the saved file. Do not run `pnpm lint:fix` manually after edits.
- **PreToolUse Edit|Write** → Blocks any edit to `.env*` files. Do not attempt to edit them; ask the owner instead.

**Skills** — invoke with `/skill-name`, or Claude spawns them automatically where noted:

- **Always invoke the `ponytail` skill/plugin before touching any file in the code.** This
  applies to every edit, add, refactor, or fix — no exceptions for "trivial" changes.
- `/new-section` — scaffolds a new App Router route, or a new section within an existing route. Use this instead of creating files by hand.
- `/perf-check` — runs `pnpm build` and reports First Load JS per route. Both user-invocable and auto-run by Claude before declaring bundle-size-relevant work done.
- `/seo-audit` — checks every `page.tsx` for metadata, OG, Twitter, canonical, and JSON-LD gaps against the homepage's implementation as the baseline.
- `/content-update` — enforces the copy rules and verified-metrics list from this file. Auto-applied by Claude before writing portfolio copy; also user-invocable to spot-check existing copy.

**Subagents** — not yet implemented; `.claude/agents/` exists but is empty.

### Skill source of truth

**`.agents/skills/`** is the source of truth for every skill (native ones and portable
packages like `impeccable`). `.claude/skills` is **not** a real directory — it's a symlink to
`.agents/skills`, generated by `scripts/skills.js` on `pnpm install` (wired into the `prepare`
script). This makes skills discoverable by tools that only look under `.claude/skills`, without
duplicating the files.

**New skills always go into `.agents/skills/<name>/`, never into `.claude/skills/`** — the
latter is a generated symlink and gets recreated on next install. If `.claude/skills` is ever
missing or stale, run `pnpm run setup:skills` to relink it.

---

## Read these before acting (in `/docs`)

- **`docs/PRODUCT.md`** what the site is, audience, goals, IA/sitemap, page specs, conversion
  model, content model, SEO requirements. Read for any decision about pages, content, or copy.
- **`docs/DESIGN.md`** the design language: token architecture, color/type conventions,
  layout, motion, the signature technique kit, and the component catalog. Read before building
  or styling any UI.
- **`docs/CONVENTIONS.md`** how code is structured and written: naming, folders, modularity,
  imports, components, styling, TypeScript, lint, tooling. Follow it for every file you create,
  change, or update — not just a pre-read.
- **`src/styles/globals.css`** (no need to read the whole file) the literal source of truth for color/type values and atmospheric layers.
- **`docs/reference/`** (if present) the reference HTML and/or screenshots. Treat it as the
  fidelity target for layout, structure, and motion. Match the patterns, but use THIS
  project's palette (neutral greys + one orange accent, per DESIGN.md) and fonts, not the
  reference's red.

Precedence if anything conflicts: the owner's direct instruction > these docs > defaults.
Among docs, each owns its domain (PRODUCT = what, DESIGN = look, CONVENTIONS = how).

## Working agreement (how the owner wants you to operate)

These bias toward caution over speed. For genuinely trivial edits, use judgment rather than
running the full ritual below.

- **Propose before building.** For anything non-trivial, give a concise list of proposed
  changes and wait for approval before implementing. Do not dump a full implementation upfront.
- **One step at a time.** For multi-step work, do a step, confirm it is resolved, then move on.
- **Be concise.** Short, direct updates. Detailed explanation only when asked or when truly
  important.
- **Fix lint before calling anything done.** ESLint is configured; keep it green and let it
  auto-fix.
- **Ask when unsure** rather than guessing on product or design intent.

### Think before coding

Don't assume, don't hide confusion, surface tradeoffs.

- State assumptions explicitly before implementing. If genuinely uncertain, ask instead of
  guessing.
- If multiple reasonable interpretations exist, present them — don't silently pick one.
- If a simpler approach exists than what was asked for, say so. Push back when warranted.
- If something is unclear, stop, name what's confusing, and ask — don't plow ahead on a guess.

### Simplicity first

Minimum code that solves the problem. Nothing speculative.

- No features beyond what was asked, no abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for scenarios that can't happen.
- If a change could be a fraction of its current size without losing correctness, cut it down.
- Test: would a senior engineer call this overcomplicated? If yes, simplify.

### Surgical changes

Touch only what the task requires. Clean up only your own mess.

- Don't "improve" adjacent code, comments, or formatting while you're in a file for another
  reason.
- Don't refactor things that aren't broken as a side effect of an unrelated task.
- Match existing style/conventions even where you'd personally do it differently (see
  `docs/CONVENTIONS.md`).
- If you notice unrelated dead code or a pre-existing bug, mention it — don't fix or delete it
  unasked.
- Remove imports/variables/functions that your own change made unused; leave pre-existing dead
  code alone unless asked to remove it.
- Test: every changed line should trace directly back to the request being handled.

### Goal-driven execution

Turn tasks into verifiable success criteria, then loop against them instead of guessing when
done.

- "Add validation" → write cases for invalid input, then make them pass.
- "Fix the bug" → reproduce it first (test, script, or manual repro), then make it pass.
- "Refactor X" → confirm behavior/tests match before and after.
- For multi-step work, state a brief plan with a verification per step, e.g.:
  ```
  1. [Step] → verify: [check]
  2. [Step] → verify: [check]
  ```
- Strong success criteria (a failing test, a reproduced bug, a passing build) let you work
  independently without constant check-ins. Weak criteria ("make it work") force guessing —
  push back and ask for a concrete check instead.

These guidelines are working if diffs shrink to what was asked, fewer rewrites happen due to
overcomplication, and clarifying questions land before implementation rather than after a
mistake.

## Database changes (Payload/Postgres): migrations only

Drizzle's dev-mode `push` (auto schema sync) is **disabled** (`push: false` in
`src/payload.config.ts`). Any change to a collection/global's fields — add, rename, remove,
retype — must go through a migration:

1. Edit the collection/global config.
2. `pnpm run migrate:create <short-name>` — generates the SQL diff into `src/migrations/`.
3. **Read the generated migration file.** For a rename, Payload/Drizzle can't tell "rename" from
   "drop + create" on its own — verify the SQL does what you intend (`ALTER TABLE ... RENAME
COLUMN` vs a destructive drop) and hand-edit it if it guessed wrong, especially when a column
   also needs a type change or a data backfill the generator can't know about.
4. `pnpm run migrate` to apply it locally, then `pnpm run migrate:status` to confirm.
5. Commit the migration file(s) alongside the config change, in the same commit/PR.

Never hand-edit the database schema directly (no ad hoc `ALTER TABLE`, no re-enabling `push`
to "just get dev working") — that's exactly how schema drift and hung interactive prompts
happen. If `pnpm dev` ever prompts about schema drift, stop and write a migration instead of
answering the prompt.

Other commands: `pnpm run migrate:down` (roll back last batch), `pnpm run migrate:status`
(what's applied). Production deploys must run `pnpm run migrate` before `pnpm build`/`pnpm
start` picks up a schema change.

## Commands (pnpm)

Assumed standard scripts (adjust to match `package.json`):

- `pnpm install` install deps
- `pnpm dev` local dev server
- `pnpm build` production build
- `pnpm start` run the build
- `pnpm lint` / `pnpm lint --fix` lint and auto-fix

**Dev server: never kill and restart one that's already running.** The owner usually has
`pnpm dev` running in their own terminal while working alongside an agent. Before starting a
dev server to verify a change, check whether one is already up (e.g. `curl -sf
http://localhost:3000 >/dev/null` or check for a listener on the port) and reuse it. Only start
a new one if none is running, and don't kill an existing process to "get a clean start" unless
the owner asks.

## Golden rules (distilled, do not violate)

1. **Tokens only.** Style through the tokens in `global.css` / DESIGN.md. No inline hex/HSL,
   no raw px font sizes, no magic numbers, no `dark:` color literals (rely on ramp inversion).
2. **Kebab-case filenames.** Every file and folder is lower kebab-case. (Component identifiers
   and TS types stay PascalCase in code; that is language, not filenames.)
3. **Folders with `index`.** A unit is a kebab folder with `index.tsx` + optional `types.ts`,
   not a loose file. Import by folder via the `@` alias.
4. **150 LOC split rule.** Any file past ~150 lines must be split by responsibility. Applies to
   all files, not just components.
5. **`@` path aliases** over relative imports (relative only for true siblings).
6. **Server components by default.** Add `"use client"` only at the smallest leaf that needs it.
7. **SSR/SSG everything indexable.** Per-page metadata + OG images, JSON-LD, sitemap, robots,
   canonicals. Performance (Core Web Vitals) is a feature.
8. **Accessibility + reduced motion** always: semantic HTML, visible focus, AA contrast, and
   every animation no-ops under `prefers-reduced-motion`.
9. **Reuse the kit.** Use DESIGN.md's signature techniques and component catalog; do not invent
   parallel ornament.
10. **Migrations only for DB schema changes.** Never rely on Drizzle push or hand-edit the
    database; see "Database changes" above.

## Definition of done

- Matches PRODUCT intent, DESIGN patterns/tokens, and CONVENTIONS structure.
- Files are kebab, modular (<150 LOC), folder+index where they are units.
- ESLint green and auto-fixed; TypeScript strict, no `any`.
- Server-rendered with correct metadata where it should rank; images optimized.
- Responsive to mobile, themed light/dark, reduced-motion safe, keyboard accessible.

## Do not

- Implement large changes without a proposed change list and approval.
- Inline colors/sizes or add `dark:` literals.
- Leave ESLint red or disable rules to silence them without a clear reason.
- Create monolithic files, bare component files, or deep relative imports.
- Add pricing, packages, popups, or gated content (out of scope per PRODUCT.md).
- Edit the Postgres schema directly, re-enable Drizzle `push`, or blindly accept a schema-push
  prompt. Write a migration instead (see "Database changes" above).
