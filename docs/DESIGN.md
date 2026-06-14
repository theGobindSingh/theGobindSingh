---
name: Architectural Precision
colors: refer global.css
---

## Brand & Style

This design system embodies the persona of a **Senior Product Architect** through a hybrid of **Swiss Brutalism** and **Premium Editorial** aesthetics. It rejects the generic "SaaS-lite" look in favor of a high-contrast, authoritative environment that treats code and architecture as a craft.

The brand personality is **calm, confident, and specific**. It prioritizes information density and structural integrity over decorative fluff. The UI evokes the feeling of a high-end architectural monograph: expensive, intentional, and permanent.

**Key Stylistic Pillars:**

- **Swiss Brutalism:** Strong vertical and horizontal grid lines, monospaced accents for technical data, and a rejection of soft shadows or rounded containers.
- **Editorial Sophistication:** Massive typography that breaks standard scales, generous "dead space" to create rhythm, and a focus on high-quality technical writing.
- **Asymmetric Balance:** Layouts that use off-center alignments and overlapping elements to create a dynamic, non-templated feel.

## Colors (Use only the tokens defined in `global.css`)

The palette is strictly limited to maintain an atmosphere of professional rigor.

- **Primary Background (#0A0A0A):** A near-black that provides infinite depth.
- **Primary Text (#F5F5F5):** An off-white that reduces eye strain while maintaining maximum contrast against the dark background.
- **Secondary/Muted Text (#888888):** Used for meta-data, descriptions, and less critical information to create hierarchy.
- **Accent _ACCENT COLOR_ (#D9480F):** Used with extreme restraint. Reserve this for active navigation states, small interactive highlights, or a single significant "Book a call" anchor. It should never occupy more than 2% of the screen real estate.

**Implementation Note:** Avoid all gradients. Color transitions should be hard-edged and immediate.

## Typography (Use only the tokens defined in `global.css`)

Typography is the primary visual driver of the system.

- **Display & Headlines:** **Epilogue** provides the geometric, distinctive weight required for a Brutalist-Editorial hybrid. Large-scale headings (Display XL) should feel "monumental," often spanning the full width of the grid.
- **Body:** **Hanken Grotesk** offers a sharp, contemporary readability that feels professional and precise.
- **Technical/Meta:** **JetBrains Mono** is used for dates, tags, GitHub stats, and small labels to reinforce the "SDE / Architect" identity.

**Rules:**

- All labels and technical data must be in `label-mono` with uppercase styling.
- Paragraphs should maintain a comfortable 65-75 character line length.
- Headlines should use tight letter-spacing to feel "locked in."

## Layout & Spacing (Use only the tokens defined in `global.css`)

The layout is governed by a **strict 12-column Swiss grid**.

**Grid Dynamics:**

- **Intentional Asymmetry:** Avoid centering content. Align body text to columns 5-12, leaving 1-4 for labels, dates, or whitespace.
- **The "Structural Line":** Use 1px solid borders (`#262626`) to separate sections or define grid boundaries, mimicking the blueprint of a technical document.
- **Whitespace:** Use aggressive vertical spacing (`section-gap`) to give each case study or article room to breathe.

**Breakpoints:**

- **Desktop (1440px+):** Full 12-column grid with 64px outer margins.
- **Tablet (768px - 1439px):** 8-column grid, margins reduced to 40px.
- **Mobile (<767px):** 4-column fluid grid. Headlines must scale down but remain the dominant visual element.

## Elevation & Depth

This design system is **flat and structural**. Depth is achieved through layering and tonal contrast, never through shadows or blurs.

- **Tonal Layers:** The base is `#0A0A0A`. Interactive elements or secondary containers use `#141414` (Surface Elevated) to create a subtle lift.
- **Lines as Depth:** Instead of shadows, use 1px borders to define the boundaries of elements.
- **Zero Transparency:** Do not use glassmorphism. Backgrounds must be solid. If an element needs to stand out, use a high-contrast border or a shift in background color.
- **Active State:** Use the _ACCENT COLOR_ accent for small indicators (like a 4px dot or a 2px underline) rather than changing the entire background of a component.

## Shapes

The shape language is **unapologetically sharp**.

- **Corner Radius:** 0px across all elements. This includes buttons, input fields, images, and containers.
- **Brutalist Accents:** Use right-angled corners to communicate rigidity and architectural precision.
- **Interactive Elements:** Buttons are rectangular blocks. Tags/Chips are sharp-edged boxes with 1px outlines.

## Components

### Buttons

- **Primary:** _ACCENT COLOR_ background, Primary Text. Sharp corners. No shadows. High-contrast hover state (shift to white or invert).
- **Secondary:** Transparent background, 1px Primary Text border.
- **CTA Nudge:** Text-only link with a custom arrow (e.g., `→`) in _ACCENT COLOR_.

### Cards (Case Studies)

- Do not use traditional "contained" cards. Instead, use "Row-based Sections" separated by horizontal 1px lines.
- Left-hand side: `label-mono` meta-data (year, tech stack).
- Right-hand side: Large headline, short summary, and a high-resolution, sharp-cornered image.

### Input Fields

- Underline-only style or a 1px bordered box with `#262626`.
- Focus state: Border changes to _ACCENT COLOR_ or Primary Text.
- Use `label-mono` for field labels.

### GitHub Activity Feed

- A technical block with a monospaced font.
- Use the muted-gray for the grid of activity and _ACCENT COLOR_ for "hot" activity or high-impact commits.

### Navigation

- Sticky top-bar, minimal height.
- All-caps `label-mono` links.
- The "Book a Call" CTA should be the only element in _ACCENT COLOR_ or enclosed in a high-contrast box.
