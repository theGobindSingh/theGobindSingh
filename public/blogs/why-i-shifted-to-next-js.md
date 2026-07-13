---
title: "Why I shifted to Next.js"
date: "2026-05-18"
tags: ["Next.js", "React", "Architecture"]
excerpt: "The routing, rendering, and build-tooling problems that pushed my default stack from a CRA-style setup to the App Router, and where the tradeoffs actually show up."
featured: true
---

For the first couple of years of my career I reached for a plain React setup by default: React Router for navigation, a bundler config someone else had already tuned, and a REST client wired up by hand. It worked. It also meant every project re-solved the same problems: code splitting per route, meta tags per page, loading states that didn't jank, and a growing pile of `useEffect` calls doing data fetching that belonged on the server.

Next.js didn't fix all of that by being a framework with more features. It fixed it by moving the boundary between server and client to where it actually belongs.

## Rendering where the data lives

The biggest shift was realizing how much UI never needed to touch the browser's JavaScript at all. A product page that reads from a database doesn't need a client-side fetch, a loading spinner, and a hydration step just to show text and images. With the App Router, a server component reads that data directly and ships HTML. The client bundle shrinks because there's simply less JavaScript describing static content.

This isn't a Next.js-only idea, but Next.js is where I first had a rendering model that made "does this need to be client-side" a real question I asked per component, not a decision made once for the whole app.

## Routing as file structure, not configuration

File-based routing sounds like a small convenience until a project has forty routes and three people are working in the same router config file. Nesting layouts, colocating loading and error states, and getting code splitting per route for free changed how I structure larger apps: routes become a real organizational unit, not just an entry in a table.

## Where the tradeoffs actually are

None of this is free. Server components change how you think about state and interactivity: a hook that ran fine in a client-only app has to be pushed to a leaf component, and reasoning about what runs where takes longer at first. Build times and cold starts on serverless deploys need attention that a static SPA didn't require. And the App Router's caching model is powerful but easy to misunderstand if you don't read past the quick-start docs.

The switch was worth it for the class of apps I build: content-heavy, SEO-relevant, and performance-sensitive. For a pure internal dashboard behind auth, a lot of this matters less, and a simpler client-rendered setup can still be the right call.

## What I'd tell someone evaluating it today

Don't adopt the App Router because it's new. Adopt it because you have a rendering problem (too much client JS, poor Core Web Vitals, or routing logic that's outgrown a single config file) that server components and file-based routing actually solve. If that problem doesn't exist yet, the migration cost isn't worth paying.
