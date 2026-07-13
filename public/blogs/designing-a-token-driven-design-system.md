---
title: "Designing a token-driven design system"
date: "2026-02-27"
tags: ["Design Systems", "CSS", "Frontend"]
excerpt: "Why I stopped hardcoding colors and sizes in components, and what a token layer actually needs to include before it earns its keep."
---

The first version of most design systems I've worked on wasn't really a system: it was a component library with a color palette loosely enforced by convention. Nothing stopped a new component from reaching for an arbitrary hex value or a one-off pixel size, and over time the palette drifted further from what the design docs said it should be.

A token-driven system fixes this by making the deviation the hard path instead of the easy one.

## Tokens are a contract, not a convenience

The point of a token layer isn't just "named variables instead of raw values." It's that components stop making color and sizing decisions themselves. A button doesn't know what orange looks like; it asks for `accent` at a given weight and lets the token layer resolve it. That indirection is what makes a global theme change, a dark mode, or a rebrand a one-file edit instead of a codebase-wide find-and-replace that inevitably misses something.

## Semantic aliases before raw values

A raw color ramp (grey-50 through grey-950, an accent ramp, semantic status colors) is the foundation, but components shouldn't reach for ramp stops directly most of the time. A semantic layer on top (`--color-text`, `--color-border`, `--color-surface`) describes intent, not appearance. When a component asks for "border," it's saying what role that color plays, and the token layer can change what "border" resolves to without every component needing to know.

I only reach past the semantic layer to a raw ramp stop for a genuine one-off, and even then it's documented as an exception, not a new pattern to copy.

## Dark mode as a token problem, not a component problem

The cleanest dark mode implementations I've built don't have components branching on a theme value in JavaScript at all. A single class on the root element flips which HSL triplet each token resolves to, and every component just consumes the token as normal. If a component needs `if (theme === 'dark')` anywhere in its logic, that's usually a sign a token is missing, not a sign the component needs more branching.

## Spacing and type scales deserve the same discipline

It's easy to tokenize color and forget that arbitrary pixel values in `padding` and `font-size` are the same problem in a different property. A constrained type scale and spacing scale mean a designer's Figma file and the shipped CSS are describing the same finite set of options, not an open-ended range that drifts apart over time.

## The system only works if it's the easy path

None of this holds if using a raw value is faster than finding the right token. The tooling has to make the token path the path of least resistance: linting that flags a raw hex or pixel value, editor autocomplete for token names, and a documented reference that's actually kept up to date. A design system that requires discipline to use correctly will eventually stop being used correctly.
