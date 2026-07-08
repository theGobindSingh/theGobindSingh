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
structural clarity over decoration. This applies to every page (home today, work/blog/about
as they're built) — the system should read as one language across all of them.

**Key stylistic pillars:**

- **Structural clarity** — hairline borders (`--color-border`) and `<hr>` rules define
  sections and boundaries instead of shadows or cards. See `HomeSection`'s and the projects
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
   CSS var). Every homepage section renders through it (directly, or via `HomeSection`, which
   wraps it internally). Use it — and Tailwind width/padding utilities on top of it if a
   section needs a narrower measure — rather than hand-rolling containment per section.

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
  fills.

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
- **Mono section numbering (`NN // Title`)** — every homepage section title is a hand-written
  string like `02 // Selected work`, rendered through `HomeSection`'s `title` prop in
  `font-mono`. The numbering is authored by the caller, not auto-incremented by the component.
- **Lenis smooth scroll** — `LenisProvider` (`src/providers/lenis.tsx`) wraps the app; this is
  the only motion-related dependency in the project. No framer-motion, GSAP, or react-spring —
  don't add one without discussing it first.

## Motion

No animation library. The baseline is CSS transitions:

- A universal `* { transition: all 0.3s ease }` in `defaults.css` covers most
  hover/focus/theme-change state changes by default.
- Finer control uses the duration tokens (`--dur-fast` 0.2s, `--dur-base` 0.3s, `--dur-slow`
  0.5s, `--dur-reveal` 0.7s) and easing tokens (`--ease-out`, `--ease-inout`) layered on top —
  e.g. `duration-(--dur-slow)` on `ThemeSwitcher`'s icon cross-fade. `--dur-reveal` and both
  eases are currently reserved for future scroll-reveal work and aren't wired into any
  component yet.
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

### Page-local patterns — e.g. `src/app/home/*` (specific to one page/section, not meant for reuse elsewhere yet)

- **`HomeSection`** (`src/app/home/components/section`) — the layout primitive every homepage
  section is built on: takes `title` (the `NN // Title` mono string), optional `description`,
  an optional `wrapper` override (defaults to `Fragment`; Skills uses it to inject a bordered/
  tinted box), and an optional `link` (renders a right-aligned arrow link, e.g. "View all
  work"). Wraps its content in `FullWidthWrapper` internally.
- **Hero `LeftSide`/`RightSide`, work-section `HomeWorkCard`, projects-section `WorkCard`,
  manifesto grid** — each is a one-off composition local to the homepage, built from the
  global kit + Tailwind, not intended as a generic reusable component. If a pattern here needs
  to be reused on `/work` or `/about` later, promote it into `src/components/` at that point
  rather than importing across page boundaries.

(CONVENTIONS.md covers the global-vs-local component split and folder rules in more detail.)
