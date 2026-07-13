---
title: "Structuring scalable frontend architecture"
date: "2026-04-02"
tags: ["Architecture", "Frontend", "Monorepo"]
excerpt: "How I think about splitting a growing frontend into modules that stay independently testable, without turning the codebase into a maze of shared packages."
---

Every frontend codebase is easy to structure on day one. The architecture question only shows up once a second team, a second app, or a second deploy target enters the picture. By then, retrofitting boundaries is expensive, so the useful time to think about this is before it's urgent.

## Start with ownership, not folders

The instinct is to organize by technical layer: `components/`, `hooks/`, `utils/`, `services/`. That works at small scale, but it optimizes for "where does this kind of file go" instead of "who owns this and what does it depend on." Once a codebase has more than one team or more than one deployable app, ownership boundaries matter more than file-type boundaries.

A structure organized by feature or domain, where each folder owns its components, its data-fetching, and its local state, makes it obvious what can change independently. Shared code only gets promoted to a common location once a second consumer genuinely needs it, not preemptively.

## Monorepos solve coordination, not design

A monorepo with proper build orchestration (Nx and Turborepo are the two I've used most) solves a real problem: sharing types and utilities across apps without publishing and versioning internal packages. What it doesn't solve automatically is architectural discipline. It's entirely possible to have a monorepo where every app quietly imports internals from every other app, and now you've got a distributed monolith with extra build config.

The rule that's worked for me: packages expose a public surface (an `index` that re-exports what's meant to be consumed), and nothing reaches past that surface into another package's internals. Lint rules can enforce this; a well-intentioned team eventually won't, without tooling backing it up.

## Shared components are a liability until they're used twice

A common trap is extracting a shared component the first time a pattern repeats, based on a guess about future reuse. That guess is often wrong, and the "shared" component ends up accumulating conditional props to serve two call sites that were never really the same thing. I wait for a genuine third use before generalizing, and even then I keep the shared version's API as small as the actual call sites require, not as flexible as I imagine some future call site might need.

## Splitting for build performance is a side effect, not the goal

Code splitting, lazy loading, and route-based chunking matter for performance, but they fall out naturally from good module boundaries; they're not something you bolt on separately. If a codebase is structured so each feature owns its dependencies cleanly, the bundler's job of splitting it efficiently gets much easier. If splitting requires fighting the existing structure, that's usually a sign the structure needs work first.

Scalable architecture isn't a specific folder layout you can copy between projects. It's a discipline about where boundaries are drawn and how strictly they're enforced as the codebase grows past what any one person can hold in their head.
