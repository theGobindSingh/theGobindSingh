---
name: new-section
description: Scaffold a new App Router route or a new section within an existing route, following this repo's real structure and conventions (route sections vs. route-local components, global @ aliases, FullWidthWrapper/Section reuse, nav wiring). Use when the user asks to add a new page/route (e.g. "add the /work page") or a new section to an existing route (e.g. "add a testimonials section to the homepage").
---

Before generating anything, read `docs/CONVENTIONS.md` §3 (Project structure) and §4 (Data &
content model), and `docs/DESIGN.md`'s Component catalog. This skill scaffolds to match what's
actually there today — do not invent a different structure.

## 1. Determine the scope

Ask (or infer from the request) which of these applies:

- **New section within an existing route** (e.g. "add a testimonials section to the
  homepage") — the common case.
- **New top-level route** (e.g. "add the `/work` page") — bigger, needs its own `page.tsx`,
  metadata, and nav entry.

## 2. Scaffolding a new section within an existing route

Given a route at `src/app/<route>/` (e.g. `src/app/home/`):

1. Create `src/app/<route>/<section-name>/` (kebab-case) with an `index.tsx` entry. Look at
   sibling sections (`src/app/home/hero/`, `src/app/home/work/`, `src/app/home/manifesto/`)
   for the exact pattern before writing — don't guess the shape.
2. If the section needs its own sub-parts (a card, a left/right split, etc.), split them into
   sibling files in the same folder (e.g. `work-card.tsx`) and import via `@app/<route>/
<section-name>/<part>` — never relative imports across the unit's own siblings unless it's
   a true one-off; prefer the `@` alias per CONVENTIONS.md §6.
3. For a section that needs the standard title/description/link layout most sections use,
   wrap it in `Section` (`@components/section`, global — used by home, `/work`, and `/contact`)
   rather than hand-rolling the header pattern. For an editorial/long-form route where a
   sticky left-rail label reads better while scrolling (the pattern `/about` uses for Approach/
   Values/Stack), use `RailSection` (`src/app/about/components/rail-section`) instead — or add
   an equivalent route-local wrapper to `<route>/components/` if neither fits (see
   CONVENTIONS.md §3 "Route sections vs. route components").
4. Contain width via `FullWidthWrapper` (`@components/full-width-wrapper`) — directly, or
   implicitly through `Section`/`RailSection`. Don't hand-roll max-width/centering.
5. Any copy/content the section needs goes in that route's `constants.ts`
   (`src/app/<route>/constants.ts`), reading from `@data` (`src/data.ts`) if it needs raw
   experience/case-study/project data. Don't inline copy strings directly in the component
   beyond structural text.
6. Style only through tokens per `docs/DESIGN.md` — semantic color aliases, `--fs-*` sizing
   (never the unused display tier, never raw px/hex), existing radius/border tokens. No new
   ornament — reuse `docs/DESIGN.md`'s signature techniques (noise grain, mono `NN // Title`
   numbering, pseudo-element timeline pattern) if the section calls for something similar.
7. Server component by default. Add `"use client"` only at the smallest leaf that actually
   needs interactivity/browser APIs/hooks.
8. Wire the new section into the route's `page.tsx` in the right order, and if the route uses
   manual `titleNumber` numbering (homepage does — see `src/app/page.tsx`), pick the next
   number in sequence.
9. Keep every new file under ~150 LOC (CONVENTIONS.md §5); split further if it grows past
   that rather than letting one file balloon.

## 3. Scaffolding a new top-level route

1. Create `src/app/<route>/page.tsx` as a server component. Export a page-level `Metadata`
   object (title, description, `alternates.canonical`, `openGraph`, `twitter`) — model it on
   `src/app/page.tsx`'s existing metadata export, not from scratch.
2. If the route needs structured data, use the existing `JsonLd` component
   (`@components/json-ld`) rather than hand-writing a `<script>` tag.
3. Create `src/app/<route>/constants.ts` for the route's copy, and `src/app/<route>/
components/` for anything reused across the route's own sections (see CONVENTIONS.md §3).
4. Build out sections under `src/app/<route>/<section-name>/` per §2 above.
5. Add the route to `src/app/sitemap.ts` (url, `lastModified`, `changeFrequency`, `priority`)
   and confirm it isn't excluded in `src/app/robots.ts`.
6. Wire nav: add the route to `src/components/header/` (check `nav-item.tsx` and the header's
   link list) so it's reachable, matching the existing all-caps mono nav link styling per
   `docs/DESIGN.md`.
7. Cross-check `docs/PRODUCT.md` §6–7 for what this route is supposed to contain (page specs)
   before inventing content — the sitemap and page specs there are the source of truth for
   scope, even though only `/` is built as of this writing.

## 4. Before finishing

- Run `pnpm lint` — must be green (auto-fixed, not suppressed).
- Confirm no inline colors/px sizes were introduced (spot-check against `docs/DESIGN.md`).
- Confirm every new unit is a kebab folder with `index.tsx`, not a bare file.
- If this added or changed a route, consider running `/seo-audit` and `/perf-check` before
  calling the work done.
