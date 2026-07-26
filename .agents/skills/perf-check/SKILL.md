---
name: perf-check
description: Build the project and report First Load JS per route to catch bundle-size regressions. Run before declaring any task done if bundle size is relevant (new dependency, new route, large component added), per AGENTS.md golden rule 7 (Core Web Vitals as a feature).
---

1. Run `pnpm build` (this repo's `prebuild` script already runs `lint:fix`, so this also
   surfaces lint issues — read the full output, don't just grep for the bundle table).
2. From the build output, extract the route table (`Route (app)`, size, First Load JS) for
   every route, not just the one that changed.
3. Flag any route whose **First Load JS exceeds 100 kB**. For a flagged route, suggest a
   concrete cause and fix rather than a generic "optimize it":
   - A newly added dependency that could be lazy-loaded with `next/dynamic` instead of a
     top-level import.
   - A client component (`"use client"`) that's larger or higher in the tree than it needs to
     be — check whether the interactive boundary can be pushed to a smaller leaf, per
     CONVENTIONS.md §7 ("push client boundaries to the smallest leaf possible").
   - An unoptimized image import — this repo uses `sharp` for `next/image` optimization
     (confirm the image actually goes through `next/image`, not a raw `<img>`).
   - A large data import pulled in at build/request time that could be trimmed or code-split.
4. Note whether `sharp` is present in `package.json` dependencies (it should be — it's what
   makes `next/image` optimization work in production).
5. If you have a prior build's numbers to compare against (e.g. from the conversation history
   or a previous run), call out which routes grew and by roughly how much. If not, just report
   current sizes — don't fabricate a baseline.
6. Report a short table: route, First Load JS, flag (yes/no + reason if yes). Keep the report
   itself terse; save the detailed suggestions for flagged routes only.
