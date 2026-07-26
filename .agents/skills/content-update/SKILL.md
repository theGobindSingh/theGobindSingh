---
name: content-update
description: Enforce this portfolio's copy rules and verified facts before writing or editing any user-facing copy (hero text, section copy, case studies, project descriptions, resume-derived content). Claude applies it automatically before writing portfolio copy; the owner can also run /content-update directly to spot-check existing copy.
---

Before writing or editing any portfolio copy, re-read `AGENTS.md`'s "Owner context" section
in full — do not rely on memory of it, it may have been edited.

## Hard constraints

- **Use only the verified metrics list** in `AGENTS.md` ("Verified metrics" — build cycles,
  bundle size reduction, duplicate code reduction, Lighthouse score). Do not invent a new
  number, percentage, or outcome that isn't in that list.
- **Exception — case studies/projects placeholders**: `AGENTS.md` explicitly allows
  fabricating placeholder metrics/outcomes for case studies and projects when needed to fill
  out content, since real case-study detail doesn't exist yet. This exception does **not**
  extend to the résumé/experience-history copy, which must stick to the verified metrics list.
  When fabricating a placeholder, keep it plausible and consistent with the role/company it's
  attached to — don't contradict the real experience table.
- **First person** ("I built", "I reduced"), never third person or agency-style copy.
- **Plain, direct language.** No hype words ("rockstar", "ninja", "cutting-edge",
  "game-changing"), no fake scarcity, no em dashes in body copy (per `docs/PRODUCT.md` §4
  voice guidance).
- **Outcomes before tech.** Lead sentences with what changed/was achieved, not the stack used
  to achieve it.
- Tone per `docs/PRODUCT.md` §4: calm, confident, specific. Show, don't sell.

## Before finalizing any copy change

1. Cross-check names, dates, and company/role details against `AGENTS.md`'s experience table
   — don't let a placeholder drift from the real timeline.
2. Cross-check the tone against nearby existing copy in the same section (e.g.
   `src/app/home/constants.ts`) so new copy doesn't read as a stylistic mismatch.
3. If asked to write copy for a page/section not yet covered by `docs/PRODUCT.md` §7's page
   specs, check that section's spec first — don't invent structure PRODUCT.md doesn't call
   for.
