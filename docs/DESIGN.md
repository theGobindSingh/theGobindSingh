---
name: Structural Editorial
colors: refer src/styles/globals.css
---

## Brand & Style

The persona is a **senior architect who writes clearly**: technical authority delivered
without noise. The system is closer to a well-typeset engineering journal than to raw
brutalism — hairline rules and a restrained neutral palette instead of heavy blocks, one
saturated accent instead of none, a faint noise-grain texture instead of pure flat color. It
still rejects the generic "SaaS-lite" look: no soft shadows, no glassmorphism, no rounded
containers, no gradients.

Brand personality: **calm, confident, specific.** Prioritize information density and
structural clarity over decoration. This applies to every page (home, about, work, and contact
are built; blog is still planned) — the system should read as one language across all of them.

**Key stylistic pillars:**

- **Structural clarity** — hairline borders (`--color-border`) and `<hr>` rules define
  sections and boundaries instead of shadows or cards. See `Section`'s and the projects
  section's divider pattern.
- **Editorial typography** — a display face reserved for the hero, a workhorse sans for
  everything else, and monospace for technical/meta labels. Generous vertical rhythm between
  sections.
- **One accent, used sparingly** — a single saturated orange carries all emphasis (links,
  focus rings, outcome call-outs). Everything else is neutral.

## Colors

Token source: `src/styles/globals.css`. Seven ramp families, each with 11 stops (`50`–`950`)
stored as a raw HSL triplet (`--color-<family>-<stop>-base`) resolved to a usable color
(`--color-<family>-<stop>: hsl(var(--color-<family>-<stop>-base))`):

- **`grey`** — the primary neutral ramp; backs most text/background/border tokens.
- **`primary`** / **`secondary`** — near-desaturated neutrals (~1% saturation). Functionally
  monochrome; use for secondary tonal variation, not as "brand hues."
- **`accent`** — the one saturated color in the system: a strong orange, hue 16°, 100%
  saturation, 47% lightness at the `500` stop. Reserve it for interactive/emphasis moments
  (focus rings, links, outcome highlights) — do not let it become a background fill for large
  areas.
- **`success` / `caution` / `info` / `error`** — semantic ramps (green/orange/blue/red
  respectively) for status use only, not decoration.

**Semantic aliases** (build on the ramps, use these before reaching for a raw ramp stop):
`--color-bg`, `--color-surface`, `--color-surface-raised`, `--color-text`,
`--color-text-muted`, `--color-text-subtle`, `--color-text-inverse`, `--color-border`
(`grey-700` @ 30% alpha, hairline), `--color-border-strong` (`grey-700`, solid),
`--color-grid-line`, `--color-crosshair`, `--color-overlay`, `--color-focus`
(= `accent-500`).

**Dark mode:** the `.dark` class on `<html>` only redefines each family's `-base` HSL triplet
(inverting the ramp direction), then every `--color-*`/semantic alias resolves automatically.
Components never branch on theme — see CONVENTIONS.md's theme section.

**Rule:** no inline hex/HSL, no raw Tailwind color utilities (`text-orange-600`, etc.) in
component code. Consume the semantic alias first, then a ramp stop, only introducing a
`--_`-prefixed local variable for a genuine one-off component variant.

## Typography

Five font families, loaded via `next/font/google` in `src/app/layout.tsx`, each mapped to a
CSS variable and given a role:

- **`--ff-display` (Anton)** — the hero headline only. This is an intentional, documented
  exception to the token-driven type scale below: the hero uses its own arbitrary large-scale
  sizing rather than `--fs-*`, because its fluid clamp curve is hand-tuned per breakpoint. Do
  not extend this exception to any other element.
- **`--ff-sans` (Epilogue)** — the workhorse body/UI face. Default for everything that isn't
  the hero display or technical/meta text.
- **`--ff-mono` (JetBrains Mono)** — technical and meta text: section numbering (`NN //
Title`), dates, tags, labels. Use uppercase for mono labels.
- **`--ff-serif` (Newsreader)** — reserved for editorial/long-form emphasis (e.g. pull quotes,
  testimonial copy) as those sections get built. Not yet in active use on the homepage.
- **`--ff-cursive` (Reenie Beanie)** — reserved for a hand-written accent touch (e.g. a signed
  note or annotation-style callout). Not yet in active use on the homepage.

**Type scale — use `--fs-*` only.** `globals.css` defines two tiers: a UI/body scale
(`--fs-4xs` through `--fs-4xl`, shrinking under a `1024px` media query) and a "monumental"
display tier (`--fs-display-section`, `--fs-display-hero`, plus `--leading-display`/
`--tracking-display`). **Only the `--fs-*` UI scale is the documented system — use it for all
text sizing, including large headings**, except the hero exception noted above. Do not reach
for the display tier tokens; if a heading needs to be larger than `--fs-4xl` allows, that's a
signal to extend the `--fs-*` scale itself rather than pull in the unused display tier.

**Rules:**

- Mono labels are uppercase (`NN // Title` section numbering, meta tags, dates).
- Body paragraphs stay in a comfortable ~65–75 character line length.
- No raw px font sizes or arbitrary Tailwind size values (`text-[Npx]`) outside the hero
  exception.

## Layout & Spacing

There is no separate custom spacing/layout token system in active use — `globals.css` defines
`--space-1`…`--space-32`, `--container-max`, `--content-max`, `--gutter`, and
`--section-pad-y`, but nothing in the codebase currently reads them. **Do not use them; they
are dead code slated for removal.** The real system is two pieces working together:

1. **Tailwind's default spacing scale** (`gap-16`, `py-12`, `p-4`, etc.) drives all internal
   rhythm — padding, gaps, margins between elements within a section.
2. **`FullWidthWrapper`** (`src/components/full-width-wrapper`) is the width-containment
   primitive: it wraps section content, centers it, and caps it via `containerSize` (default
   `90%`) and `maxContentWidth` (default `1800px`, overridable through a `--max-content-width`
   CSS var). Every section on every route renders through it (directly, or via `Section`/
   `RailSection`, which wrap it internally). Use it — and Tailwind width/padding utilities on
   top of it if a section needs a narrower measure — rather than hand-rolling containment per
   section.

## Shape & Elevation

Flat and structural — depth comes from borders and tonal contrast, never shadows or blur.

- **Radius is tokenized, not zero everywhere:** `--radius-none` (0px, used by buttons today),
  `--radius-sm` (2px), `--radius-pill` (9999px, reserved for pill-shaped elements like status
  chips as they're built). Pick the token that matches the element's role — don't default to
  `--radius-none` reflexively.
- **Borders as depth:** `--color-border` (hairline, 30% alpha) for section dividers and subtle
  separation; `--color-border-strong` (solid) where a boundary needs to read clearly, e.g. a
  bordered callout box.
- **No shadows, no glassmorphism, no gradients.** If an element needs to stand out, shift
  background (`--color-surface` / `--color-surface-raised`) or add a border — not a shadow.
- **Accent as indicator, not fill:** use the accent color for small marks (a timeline dot, a
  left-border accent bar on an outcome block, a focus ring) rather than large background
  fills. **One sanctioned exception:** the closing accent CTA band — see Signature techniques
  below.

## Signature techniques

The real, currently-implemented atmospheric/structural kit — reuse these rather than inventing
new ornament:

- **Noise-grain overlay** — a fixed, full-viewport `body::before` pseudo-element using an
  inline SVG `feTurbulence` filter (`fractalNoise`, `baseFrequency: 0.9`, 4 octaves) at
  `opacity: 0.035` in light mode and `0.05` in dark mode (`html.dark body::before`). Defined
  once in `src/styles/defaults.css`; don't duplicate it per-component.
- **CSS pseudo-element timeline** — the work-experience list draws its vertical connecting
  line and per-item dot markers with `before:`/`after:` pseudo-elements (absolute-positioned,
  no SVG or JS), hidden on mobile (`not-md:before:content-none`). Reuse this pattern for any
  future chronological list rather than introducing a charting/timeline library.
- **Mono slash-prefixed labels** — every heading rendered in `font-mono` uses a slash prefix,
  but the weight of the prefix scales with the heading's importance; don't default to the
  numbered form everywhere:
  - **`NN // Title`** — top-level, page-defining sections only: the `title` passed to `Section`/
    `RailSection` (e.g. `02 // Selected work`). The number is hand-authored by the caller, not
    auto-incremented, and signals "this is one of the page's major beats."
  - **`// Title`** — a named sub-heading inside a section that still wants emphasis but isn't a
    page-level beat (e.g. manifesto's per-item title, `// ${title}`).
  - **`/ Title`** — the plain/quiet case: category labels, card sub-headings, list-group
    headers (skills/stack categories, work-card's "/ The Constraints" / "/ The Approach" / "/
    The Outcome", projects' "/ Case Studies" / "/ Projects"). This is the default for anything
    that isn't a top-level section or an emphasized sub-heading.
- **Scroll-reveal fade-in** — `ScrollReveal` (`src/app/about/components/scroll-reveal`), a
  client component wrapping an `IntersectionObserver`: content renders fully visible in SSR
  markup, then a `"use client"` effect adds `opacity-0 translate-y-4` after mount and removes it
  once the element crosses a `0.15` threshold, transitioning over `--dur-reveal` /
  `--ease-out`. No-ops entirely under `prefers-reduced-motion` (checked before the classes are
  ever added, so reduced-motion visitors never see the hidden state). Currently used to wrap
  each `RailSection`'s content on `/about` (Approach, Values, Stack). Reuse this component for
  future scroll-triggered reveals rather than writing a new observer.
- **Lenis smooth scroll** — `LenisProvider` (`src/providers/lenis.tsx`) wraps the app; this is
  the only motion-related dependency in the project. No framer-motion, GSAP, or react-spring —
  don't add one without discussing it first.
- **Closing accent CTA band** — a page's final section is the one place the accent color is
  allowed as a full-bleed background fill, not just an indicator. See
  `src/app/about/cta/index.tsx` for the reference implementation. Shape (adapt per page, don't
  clone verbatim):
  - Single `FullWidthWrapper` with `bg-accent-600` on `wrapperClassName` — the outer element is
    already full-width (`w-full flex`), so the fill is full-bleed for free. Leave `containerSize`
    at its default (`90%`); that's what constrains the inner content column. No nested wrapper
    needed.
  - White/`grey-50` text throughout — headline bold at `--fs-3xl`+, body copy at `grey-50/80`.
  - Primary and secondary actions flip to white-on-accent: filled button uses
    `color="grey" colorWeight={50} textColor="accent" textColorWeight={600}`; outlined button
    uses `color="grey" colorWeight={50}` with `hoverTextColor="accent" hoverTextColorWeight={600}`
    so it stays legible on hover.
  - One large, low-opacity (`text-grey-50/10`) watermark word or short phrase pulled from the
    page's own voice (not generic filler), absolutely positioned in a back corner, `aria-hidden`,
    hidden on mobile (`not-md:hidden`).
  - This is a one-off, end-of-page moment — never more than one per page, and never used for
    a mid-page section.

## Motion

No animation library. The baseline is CSS transitions:

- A universal `* { transition: all 0.3s ease }` in `defaults.css` covers most
  hover/focus/theme-change state changes by default.
- Finer control uses the duration tokens (`--dur-fast` 0.2s, `--dur-base` 0.3s, `--dur-slow`
  0.5s, `--dur-reveal` 0.7s) and easing tokens (`--ease-out`, `--ease-inout`) layered on top —
  e.g. `duration-(--dur-slow)` on `ThemeSwitcher`'s icon cross-fade. `--dur-reveal` and
  `--ease-out` are now wired into `ScrollReveal` (see Signature techniques above), driving the
  fade/translate-in on `/about`'s `RailSection` content.
- **`prefers-reduced-motion` must be respected everywhere animation happens**, not just on
  individual components — see AGENTS.md golden rule 8. (As of this doc's writing this is being
  brought up to a global guard in `defaults.css`; if you find a component with a hover/transition
  effect that doesn't no-op under reduced motion, that's a bug to fix, not a pattern to copy.)

## Component catalog

Two tiers, both real folders with `index.tsx` + `types.ts`/`styles.ts` as needed:

### Global kit — `src/components/*` (reusable across any page)

- **`Button`** / **`Link`** — the shared interaction primitive. Colors are set via typed
  `color`/`colorWeight` (and hover variants) props resolved by `colorStyleVars()` in
  `button/styles.ts` into `--c`/`--c-hover`/`--c-text`/`--c-hover-text` CSS vars — never pass a
  raw color. Variants: `filled` / `outlined` / `text`; sizes `sm`/default/`lg`. Built with
  Tailwind v4 `@utility` blocks (`btn`, `btn-filled`, etc.) so lint tooling recognizes them.
  Focus-visible ring (`2px solid var(--color-focus)`) is baked into the base `btn` utility —
  every Button/Link gets it for free. `Link` reuses `Button`'s `styles.ts` rather than
  duplicating color logic; external links auto-get `rel="noopener noreferrer"`.
- **`FullWidthWrapper`** — see Layout & Spacing above.
- **`JsonLd`** — a single `<script type="application/ld+json">` renderer that auto-injects
  `"@context": "https://schema.org"`. Use for any structured-data block (Person, WebSite,
  BreadcrumbList, Article, etc. per PRODUCT.md's SEO requirements) instead of hand-writing the
  script tag.
- **`ThemeSwitcher`** — the light/dark toggle; owns the cookie/localStorage write and the
  `light`/`dark` class flip (see CONVENTIONS.md). Icon cross-fade uses `--dur-slow` and is the
  one component that already implements `motion-reduce:` correctly — model new animated
  components on it.
- **`Hamburger`** — mobile nav trigger; morphs via `stroke-dasharray`/`stroke-dashoffset`
  transitions gated on a `group-has-checked:` CSS variant (no JS animation loop), and calls
  `useLenis()` to lock/unlock scroll while the nav overlay is open.
- **`Section`** (`src/components/section`) — the layout primitive most sections on every route
  are built on: takes `title` (the `NN // Title` mono string), optional `description`, an
  optional `wrapper` override (defaults to `Fragment`; home's Skills section uses it to inject a
  bordered/tinted box), and an optional `link` (renders a right-aligned arrow link, e.g. "View
  all work"). Wraps its content in `FullWidthWrapper` internally. Promoted here from
  `src/app/home/components/section` once `/work` and `/contact` started reusing it — do not
  reintroduce a route-local copy.
- **`ExperienceCard`** (`src/components/experience-card`) — a single work-history entry
  (company, date range, position(s), responsibilities) with the pseudo-element timeline dot/
  line marker (see Signature techniques). Used by both home's `Work` section and `/work`'s
  `Experience` section; promoted for the same reason as `Section`.

### Page-local patterns — specific to one route, not meant for reuse elsewhere yet

- **Home** (`src/app/home/*`) — Hero `LeftSide`/`RightSide`, projects-section `WorkCard`,
  manifesto grid: one-off compositions local to the homepage, built from the global kit +
  Tailwind.
- **About** (`src/app/about/*`) —
  - **`RailSection`** (`src/app/about/components/rail-section`) — the sticky-left-rail layout
    every `/about` content section (Approach, Values, Stack) is built on: a `md:col-span-3`
    sticky title/description rail (`titleNumber`, `title`, optional `description`) beside an
    `md:col-span-8` content column. Distinct from `Section` — reach for `RailSection` on
    editorial/long-form pages where a persistent section label while scrolling reads better
    than `Section`'s top-of-block header, and for `Section` everywhere else (index/grid pages
    like home, `/work`).
  - **`ScrollReveal`** — see Signature techniques above.
  - Hero title accent-word highlighting, intro portrait/statement split, closing CTA band: one-
    off compositions local to `/about`.
- **Work** (`src/app/work/*`) — `WorkItemCard` (`src/app/work/components/work-item-card`), an
  expandable (`<details>`) case-study/project card with category chip, stack tags, and metrics
  list; `EndorsementChip` (`src/app/work/endorsements`), a single testimonial. Both local to
  `/work` for now.
- **Contact** (`src/app/contact/*`) — `Connect`, `ContactForm` (client component, posts to
  `/api/contact`, owns idle/submitting/success/error state), hero availability indicator,
  closing image band: one-off compositions local to `/contact`.

If a pattern above needs to be reused by a second route, promote it into `src/components/` at
that point (as `Section` and `ExperienceCard` were) rather than importing across page
boundaries. (CONVENTIONS.md covers the global-vs-local component split and folder rules in more
detail.)
