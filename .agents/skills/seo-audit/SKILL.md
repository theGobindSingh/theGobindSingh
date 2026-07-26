---
name: seo-audit
description: Audit every App Router page.tsx for missing or weak SEO metadata, OG/Twitter tags, canonical URLs, and JSON-LD structured data, per docs/PRODUCT.md §9's SEO requirements. Use after adding or changing a route, or when asked to check SEO health.
---

Use `src/app/page.tsx` (the homepage) and `src/app/layout.tsx` as the reference baseline — they
already implement this correctly. An audit finding is "missing X" only if a route falls short
of what the homepage already does, not a hypothetical ideal.

For every `page.tsx` under `src/app/`, check:

1. **Metadata export** — a `Metadata` object with at minimum `title` and `description`. Prefer
   route-level overrides of the root template (`src/app/layout.tsx` sets a title template:
   `"%s — Gobind Singh"`) rather than duplicating the full title.
2. **Canonical URL** — `alternates.canonical` set, using `SITE_URL` from `@lib/site-config`
   (don't hardcode the domain).
3. **Open Graph** — `openGraph` block (title, description, url, images) using the shared
   `OG_IMAGE` from `@lib/site-config` unless the route needs a distinct image.
4. **Twitter card** — `twitter` block, `card: "summary_large_image"` to match the existing
   pattern in `layout.tsx`/`page.tsx`.
5. **JSON-LD structured data** — rendered via the shared `JsonLd` component
   (`@components/json-ld`), not a hand-written `<script>` tag. Check against
   `docs/PRODUCT.md` §9 for what's expected per page type: `Person`/`WebSite` (home/about),
   `BreadcrumbList` (nested pages), `Article`/`BlogPosting` (blog posts), `CreativeWork`
   (case studies, optional).
6. **Heading structure** — exactly one `<h1>` per page, logical heading order after it
   (`<h2>` for section titles, etc. — most routes render `Section`'s (or `RailSection`'s)
   `title` as an `<h2>`).
7. **Images** — every `next/image` usage has a descriptive `alt`; no meaningful image ships
   with an empty or placeholder `alt`.
8. **Link text** — no "click here"/"read more" as the only accessible name; check for
   descriptive link text or an `aria-label` where the visible text is just an icon/arrow.

Also check project-wide (not per-page):

- `src/app/sitemap.ts` includes every real route (cross-check against what's actually built,
  not just what's planned in `docs/PRODUCT.md`).
- `src/app/robots.ts` isn't accidentally disallowing a route that should be indexed.
- `src/lib/site-config` is the single source for `SITE_URL`/`SITE_NAME`/`SITE_DESCRIPTION`/
  `OG_IMAGE` — flag any route that hardcodes these instead of importing them.

Report format: one line per route, pass/fail per check above, with the specific gap named
(not just "SEO incomplete"). If a route is fully compliant, say so briefly rather than omitting
it.
