# Case study JSON schema

This is the authoritative schema for this skill's output — it doesn't assume the target repo has
any case-study type definitions of its own. If the target repo _does_ define its own equivalent
types somewhere, prefer those exact definitions over this document; this file exists so the skill
works standalone in repos that don't.

A case study is a single JSON object. Top level:

```ts
interface CaseStudy {
  title: string;
  description: string; // 1-2 sentence summary, first person ("I built...", "I reduced...")
  client: string | null; // company/product name, or null if personal/no client
  category: "build" | "rebuild" | "integration" | "frontend"; // closed set — pick one, don't invent a new value
  role: string; // job title / role held during the work
  stack: string[]; // languages, frameworks, tools actually used
  timeframe: { start: string; end: string | null }; // ISO dates ("2025-07-01"), end: null = ongoing
  coverImage?: string; // path to a cover image, only if one exists/was provided
  featured?: boolean;
  order?: number; // display order relative to other case studies, lower = earlier
  links?: { github?: string; live?: string };
  seo?: { title?: string; description?: string; ogImage?: string };
  sections: CaseStudySection[];
}
```

`sections`:

```ts
interface CaseStudySection {
  sectionTitle: string; // sticky sidebar label, e.g. "The Problem". Numbering ("01.") is derived from array index — never store it.
  title?: string; // section headline (renders as h2). Omit if the section opens straight into content (see convention below).
  variant?: "default" | "dim" | "inverted"; // background treatment. "inverted" = accent block, reserved for Impact-style sections.
  layout?: "standard" | "full-width"; // "full-width" drops the sidebar+content split for a full-bleed block (used for Impact & Results).
  items: Block[];
}
```

## The five-section convention

Every case study follows this narrative arc, in this order. Treat it as a checklist to work
through, not a form to fill blindly — the point is that a reader can follow problem → decision →
friction → outcome → reflection, not that every section is a mandatory template with fixed
content.

1. **The Problem** — `sectionTitle: "The Problem"`, has a `title` (h2). What was broken, missing,
   or painful before the work. Concrete specifics beat abstractions ("four codebases with drifting
   components" beats "the codebase was messy").
2. **The Approach** — `sectionTitle: "The Approach"`, has a `title`, usually `variant: "dim"`.
   The strategy and the key decisions/tradeoffs made, typically an `eyebrow` + `h3` intro block
   followed by `simple-card` pairs for named decisions/tradeoffs.
3. **Challenges** — `sectionTitle: "Challenges"`, no `title`. One `container` per hurdle:
   `eyebrow` (e.g. "Engineering Hurdle 01") + `h3` (the specific problem) + `para` (how it was
   solved) + optional `chip-list` (`"FIX: ..."` / `"RESULT: ..."` pairs).
4. **Impact & Results** — `sectionTitle: "Impact & Results"`, no `title`, `variant: "inverted"`,
   `layout: "full-width"`. A `container` with `cols: 3` of `stat` blocks. **Every stat must be a
   real, sourced number** — see "Never fabricate" below.
5. **Learnings** — `sectionTitle: "Learnings"`, no `title`. A lead `para` (the one-line lesson),
   a supporting `para`, then a `signature` block.

You are encouraged to add sections beyond these five when the material genuinely calls for it
(e.g. an "Architecture" deep-dive, a "Before / After" comparison) — but don't cut any of the five
to make room. If a repo's history genuinely doesn't support one of the five (e.g. no measurable
impact data exists at all), say so to the user rather than silently omitting it or inventing
numbers to fill the slot.

## Block types

Every block is keyed on `type`, payload in `src` (except `container`, which nests `items`).

| type            | shape                                                           | notes                                                     |
| --------------- | --------------------------------------------------------------- | --------------------------------------------------------- |
| `para`          | `{ src: string, variant?: "body" \| "lead" }`                   | `lead` = larger intro/closing statement                   |
| `numbered-list` | `{ src: string[] }`                                             |                                                           |
| `bullet-list`   | `{ src: string[] }`                                             |                                                           |
| `eyebrow`       | `{ src: string, icon?: string }`                                | small label above a heading, not itself a heading         |
| `h3`            | `{ src: string }`                                               |                                                           |
| `code`          | `{ src: string, language?: string }`                            | only include real code; strip anything proprietary/secret |
| `image`         | `{ src: string, alt: string, aspect?: "square" \| "video" }`    | `alt` is required                                         |
| `simple-card`   | `{ src: { chip?: string, title: string, desc: string } }`       | used for named decisions/tradeoffs                        |
| `chip-list`     | `{ src: string[] }`                                             | short tagged strings, e.g. `"FIX: ..."`, `"RESULT: ..."`  |
| `stat`          | `{ src: { value: string, label: string } }`                     | must be a real, sourced number — see below                |
| `signature`     | `{ src: { image?: { src, alt }, name: string, role: string } }` | closes the Learnings section                              |
| `container`     | `{ cols?: 1 \| 2 \| 3, items: Block[] }`                        | pure layout wrapper, recursive                            |

Heading order matters for accessibility: `h2` (section `title`) → `h3` → `h4` (only the implicit
one inside `simple-card`'s rendered title). Never introduce a standalone `h4` block — use `eyebrow`
for hurdle/strategy labels instead (that's why `eyebrow` exists as a non-heading type).

## Never fabricate

This is the part that matters most. Every fact in the JSON — `client`, `role`, `timeframe`,
`stack`, every `stat`, every claimed decision or tradeoff — must be traceable to something you
actually observed: source code, commit history, README/CHANGELOG, docs, config files, CI/build
output, or something the user told you directly.

If you cannot find evidence for a field or a stat, do not invent a plausible-sounding number or
detail to fill the slot. Stop and ask the user for the real value, or ask whether to omit that
block/section entirely. A case study with an honest gap is fine; a case study with a fabricated
statistic is not — it's the one thing a reader might fact-check.
