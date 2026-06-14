# CONVENTIONS.md

Technical conventions and source of truth for how the codebase is structured and written.
Pairs with DESIGN.md (look and feel) and PRODUCT.md (what the site is). Agents (Claude Code,
skills, MCP tools) follow this for every file they create or edit. When a rule here conflicts
with a default habit, this file wins.

Stack: Next.js (App Router) + TypeScript + Tailwind, pnpm, `src/` directory, content as `.md`.

---

## 1. Naming

- **Everything on disk is lower kebab-case**: files and folders. No PascalCase, no camelCase,
  no snake_case in file or folder names. Examples: `hero-section/`, `use-theme.ts`,
  `format-date.ts`, `why-i-shifted-to-next-js.md`.
- The kebab rule is about filenames only. Inside code, identifiers keep their language norms:
  - React component identifier stays PascalCase (JSX requires it): file `button/index.tsx`
    exports `export function Button() {}`.
  - TypeScript `type` / `interface` names stay PascalCase: `ButtonProps`.
  - Variables/functions camelCase; true constants SCREAMING_SNAKE_CASE.
- Route folders follow Next.js needs (`[slug]`, `(group)`, `layout.tsx`, `page.tsx`); these
  are framework names and are exempt from kebab where the framework dictates otherwise.

## 2. Folders over bare files

- Prefer a folder with an `index.tsx` (or `index.ts`) entry over a single loose file. A
  button is `components/button/index.tsx`, not `components/button.tsx`.
- Co-locate everything a unit owns inside its folder:
  - `index.tsx` the entry / public surface
  - `types.ts` its types (only if needed)
  - sub-parts as their own kebab folders or files when split (see 4)
  - unit-specific helpers in the same folder
- Import the unit by its folder; `index` resolves automatically:
  `import { Button } from "@/components/button"`.

## 3. Project structure

```
src/
  app/                 # routes (App Router): page.tsx, layout.tsx, route folders
  components/          # reusable UI units (each a kebab folder with index.tsx)
  features/            # larger composed sections (e.g. hero, contact, work-list)
  lib/                 # framework-agnostic helpers (kebab files/folders)
  hooks/               # use-* hooks (each its own file or folder)
  styles/              # global.css and style entry points
  content/             # optional: typed loaders that read /public content
public/
  blogs/               # blog markdown, see 5
  ...                  # static assets, resume pdf, og images
```

Keep `app/` thin: route files compose `features/` and `components/`, they do not hold large
logic blocks themselves.

## 4. Modular code (applies to ALL files, not just components)

- **Hard rule: if a file passes ~150 lines of code, split it.** This is not a soft target.
  When a file grows past it, break it into smaller files in the same folder and re-export
  from `index`.
- Split by responsibility, not by line count alone: extract a sub-component, a hook, a types
  file, a pure helper. A unit folder ends up like `index.tsx` + `parts/*` + `types.ts` +
  `utils.ts` rather than one long file.
- One primary export per file; a file does one job. Pure functions live in `lib/` or the
  unit's `utils.ts`, not inline in a component.
- Prefer composition (small pieces assembled) over large monoliths everywhere, including
  `lib/`, hooks, and route files.

## 5. Content (blog and other markdown)

- Blog posts are `.md` files in `public/blogs/`. **The filename is the slug.** Example:
  `public/blogs/why-i-shifted-to-next-js.md` serves at `/blog/why-i-shifted-to-next-js`.
- Each post starts with frontmatter for metadata (title, date, tags, excerpt, cover, etc.);
  the body is markdown below it. The slug is never duplicated in frontmatter; it comes from
  the filename.
- Other markdown-driven content (case studies, testimonials if file-based) follows the same
  pattern in its own `public/<type>/` folder, filename = slug. Keep content out of code so
  adding a post never touches layout.

## 6. Imports

- **Always prefer the `@` path alias** over relative paths. `@/components/button`, not
  `../../../components/button`. Relative imports only for true siblings within the same unit
  folder (`./parts/icon`).
- Import order: external packages, then `@/` internal, then relative, then styles/assets.
  Let ESLint enforce and auto-fix ordering.
- No deep relative chains (`../../..`); if you are tempted, use the alias.

## 7. Components

- Default to React Server Components; add `"use client"` only when the unit needs
  interactivity, browser APIs, or hooks like state/effect. Push client boundaries to the
  smallest leaf possible.
- Props are typed via a `Props` type/interface (in `types.ts` when non-trivial). No `any`.
- Keep components presentational where possible; lift data and side effects out.
- Co-locate a component's styles and helpers in its folder. Style only through tokens per
  DESIGN.md.

## 8. Styling

- Token-driven only, per DESIGN.md. Consume semantic aliases first, then ramp shades, then a
  `--_`-prefixed local for component variants.
- No inline hex/HSL, no raw px font sizes, no magic numbers. Use the `--fs-*` / `--text-*`
  type tokens for UI and the monumental `vw` clamp tier for display headings.
- Never add `dark:` color literals; rely on the ramp inversion. Reuse the signature kit and
  component patterns from DESIGN.md instead of inventing new ornament.

### Theme (light/dark)

- The runtime mechanism is fixed: a `theme` cookie is read server-side in the root layout and
  sets exactly one class, `light` or `dark`, on `<html>` at SSR (defaults to `light` when no
  cookie). This makes returning visitors render correct on the server with no flash.
- A client `ThemeSetter` (mounted in `body`) reconciles on mount with precedence
  **localStorage > cookie > system (`prefers-color-scheme`)**, persists the result to both
  localStorage and the cookie, and toggles the `light`/`dark` class on `documentElement`.
- `global.css` keys styling off `:root, .light` (light) and `.dark` (inverted ramp). Exactly
  one of those classes is always present.
- **Components never branch on theme in JS for styling.** They use tokens; the class on
  `<html>` does the rest. Only the theme toggle writes the cookie + localStorage and flips the
  class (reuse the existing client helper, do not re-implement).
- Known tradeoff: a first-time visitor with no cookie whose system is dark sees a brief light
  paint before `ThemeSetter` runs. Acceptable as-is; if you want to remove it, set the class
  from a tiny blocking inline script in `<head>` before paint (do not change the cookie model).

## 9. TypeScript

- Strict mode on. No `any` (use `unknown` + narrowing when truly unknown). Exported functions
  declare return types. Prefer `type` for unions/utility shapes, `interface` for object
  contracts that may extend; stay consistent within a folder.
- Types live next to what they describe (`types.ts` in the unit folder), shared types in
  `lib/` or a `types/` area only when genuinely cross-cutting.

## 10. Linting and quality gates

- ESLint is already configured; **follow it, and always fix what it reports.** Do not leave
  lint errors or disable rules to silence them without a clear, commented reason.
- Run lint (and let it auto-fix) as part of finishing any change. A change is not done while
  ESLint is red.

## 11. Tooling

- Package manager is **pnpm**. Use `pnpm` for install/scripts; do not mix in npm/yarn
  lockfiles.

## 12. Git (light)

- Conventional Commits for messages (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, etc.),
  short and present-tense. This is a soft convention, not a heavy process; keep commits
  focused and readable.

## 13. Quick checklist for any new file

- Name is lower kebab-case.
- It lives in a folder with an `index` entry where it represents a unit.
- It is under ~150 LOC; if not, it is split.
- Imports use `@` aliases; ESLint is green and auto-fixed.
- Styling goes through tokens; no inline colors or magic numbers.
- Server component by default; client only where required.
