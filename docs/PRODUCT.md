# PRODUCT.md

Product spec and source of truth for the portfolio site. Pairs with DESIGN.md (how it looks)
and AGENTS.md (how it is built). This file defines what the site is, who it is for, what it
must achieve, and what content and structure deliver that. Agents read this before deciding
information architecture, copy, pages, or SEO.

---

## 1. What this is

A personal portfolio for a full stack developer. It is a showcase, not a storefront: there
are no packages, prices, or service menus. It proves capability through real work and clear
writing, then makes it effortless to start a conversation.

One line: "Full stack developer who designs and ships polished, performant web apps. See the
work, then let's talk."

## 2. Audience (two readers, one site)

1. **Freelance prospects (primary).** Founders, small businesses, and agencies who need a web
   app or site built, an existing product rebuilt or modernized, or systems and APIs
   integrated. Often non-technical or semi-technical. They skim, judge credibility fast, and
   want to know "can this person build my thing, and is it easy to reach them."
2. **Hiring managers / recruiters (secondary).** Want depth: real engineering, breadth of
   stack, code quality signals, and writing that shows how the person thinks.

The balance: lead with outcomes and trust for prospects, but keep enough technical depth
(case studies, GitHub activity, resume) that an engineer or hiring manager respects it. Never
dumb it down; never bury the contact path under jargon.

## 3. Goals and success signals

Primary goal: turn a qualified visitor into a booked call or a sent message.
Secondary goals: communicate range (build / rebuild / integrate), build trust, rank for the
owner's name and relevant niche queries, and give recruiters a fast credible read.

Success signals to design toward (instrument later): call bookings and contact submissions,
resume downloads, case-study read-through, time on case-study pages, returning visits from
search, and indexable pages ranking for name + niche terms.

## 4. Positioning and voice

Calm, confident, specific. Show, don't sell. No hype words, no "rockstar/ninja," no fake
scarcity. Outcomes first ("cut checkout load time in half"), tech second. Plain verbs,
sentence-case, active voice. Copy reads human, with small natural cadence, never AI-generic.
First person ("I build", "I worked with") since it is personal. Avoid em dashes.

## 5. Conversion model

Lead with **Book a call**; offer all paths.

- Primary CTA everywhere: "Book a call" (embedded scheduler, e.g. Cal.com, or a clean link).
- Secondary: a short contact form (name, email, what they need, optional budget/timeline).
- Tertiary: direct email and WhatsApp links for people who prefer that.

CTA placement: persistent in the nav, a strong block in the hero, the end of every case
study, and the footer. The contact section repeats all three options with a one-line nudge.
Keep the form short; every extra field costs conversions. No gated content, no popups.

## 6. Information architecture

Hybrid: a strong single-page home that funnels, plus real routes for depth and SEO. More
indexable, linkable pages help search; the home stays the highlight reel.

**Status:** `/` (Home) is built and live. `/work`, `/work/[slug]`, `/blog`, `/blog/[slug]`,
`/about`, and `/contact` are still planned, not yet built.

Sitemap:

- `/` Home (the funnel: hero, intro, selected work, capabilities, GitHub activity, testimonials, latest writing, contact).
- `/work` Case study index (all projects, filterable by type: build / rebuild / integration / frontend).
- `/work/[slug]` Individual case study (detailed).
- `/blog` Article index.
- `/blog/[slug]` Article.
- `/about` Longer story, timeline, stack, resume download.
- `/contact` Standalone contact + booking (also embedded on home).
- Utility: `/resume` (or direct PDF), `sitemap.xml`, `robots.txt`, RSS for blog, custom 404.

Global nav: Work, Blog, About, plus a persistent "Book a call". Footer carries full nav,
contact paths, social, status (open for work), and a back-to-top.

## 7. Page specs (purpose + must-have content)

- **Home.** Hero with name, one-line positioning, primary CTA, availability status. Short
  intro framing the three things offered (build, rebuild, integrate) in outcome language.
  Selected work (3-5 best case studies as monumental rows linking to detail). Capabilities /
  stack overview. Live GitHub activity. 2-3 testimonials. Latest 2-3 articles. Contact block
  with all CTAs. The home must let a prospect understand value and reach out without scrolling
  forever; put a CTA above the fold and again mid-page.
- **/work index.** Grid or list of all case studies with type tags and one-line outcomes;
  filter by build / rebuild / integration / frontend so a prospect finds their situation fast.
- **/work/[slug] case study.** The credibility engine. Structure: problem and context, the
  goal, what was built and key decisions, the role and stack, outcome with concrete results
  (metrics where possible), a client quote if available, links (live, repo if public), and a
  closing CTA. Real screenshots. Keep it skimmable with strong subheads.
- **/blog index + article.** Technical and process writing (Next.js, frontend architecture,
  design systems, performance). Drives SEO and shows how the owner thinks. Articles need a
  clear title, date, reading time, tags, canonical URL, and a CTA at the end.
- **/about.** The fuller story, calm and human: how the owner works, the timeline/evolution,
  the stack, values around quality and communication, and a resume download. Reinforce that
  this is someone reliable to work with, not only skilled.
- **/contact.** All three paths, a short form, expected response time, time zone (IST), and
  current availability.

## 8. Content model (fields agents should assume)

- **Case study:** title, slug, client/context, type (build|rebuild|integration|frontend),
  role, stack[], timeframe, summary (1-2 lines), problem, approach, outcome, metrics[],
  testimonial ref, links {live, repo}, cover image, gallery[], featured (bool), order, SEO
  {title, description, ogImage}.
- **Testimonial:** quote, author name, role/company, avatar (optional), related case study,
  featured (bool).
- **Article:** title, slug, date, updated, tags[], readingTime, excerpt, body (MDX), cover
  image, canonical, SEO fields.
- **Project (lighter than case study, for GitHub/minor work):** name, description, stack[],
  links, source (manual | GitHub-synced).
- **Profile/site config:** name, role title, location, availability status, social links,
  email, WhatsApp, scheduler URL, resume URL.

Content should be data-driven (MDX/markdown or a light CMS), so adding a case study or article
never requires touching layout.

## 9. SEO requirements (high priority)

Technical:

- Server-render or statically generate every page (Next.js App Router, SSG/ISR). No
  client-only content for anything that should rank.
- Per-page unique `<title>` and meta description; canonical URLs; Open Graph + Twitter cards
  with per-page OG images (generate dynamically for case studies and articles).
- `sitemap.xml`, `robots.txt`, RSS feed for the blog, clean human-readable slugs.
- One `<h1>` per page; logical heading order; descriptive `alt` on every image; descriptive
  link text (not "click here").
- Core Web Vitals as a feature: optimized images (next/image, AVIF/WebP, sized), lazy-load
  below the fold, preload fonts, minimal JS, fast LCP. Performance is both UX and ranking.

Structured data (JSON-LD):

- `Person` (the owner) and `WebSite` on the home/about.
- `BreadcrumbList` on nested pages.
- `Article`/`BlogPosting` on blog posts (author, dates, image).
- `CreativeWork` (optional) on case studies.

On-page / content:

- Target queries: the owner's name, "full stack developer [region/remote]", "Next.js
  developer", and the niches the case studies represent (e.g. rebuilds, integrations). Work
  these naturally into titles, headings, and copy; never keyword-stuff.
- Strong internal linking: home to case studies to related articles to contact.
- Keep the blog updated; freshness and depth compound for search.

Accessibility doubles as SEO: semantic HTML, labeled controls, sufficient contrast.

## 10. Trust and proof

Testimonials placed near CTAs and on relevant case studies. Live GitHub activity (stars,
repos, contributions, recent projects) for engineering credibility. Resume download for
recruiters. An "open for work / available" status with the local time signals responsiveness.
Real screenshots and concrete outcomes beat adjectives.

## 11. Non-goals

No pricing tables, service packages, or checkout. No lead-gen gating or email-wall. No popups
or aggressive capture. Not a blog-first site (writing supports the portfolio, it is not the
product). No fabricated metrics or testimonials; if a number or quote is not real, omit it.

## 12. Build expectations (summary; details in AGENTS.md)

Next.js (App Router) + TypeScript + Tailwind, MDX/markdown or light CMS for content,
token-driven styling per DESIGN.md, deployed somewhere with good edge performance. Analytics
that respects privacy. Everything responsive to mobile, dark/light themed, reduced-motion safe.

## 13. Launch checklist

- All pages render server-side with unique metadata and OG images.
- Sitemap, robots, RSS, canonicals, 404 in place.
- Lighthouse: strong Performance, Accessibility, Best Practices, SEO scores; Core Web Vitals
  green on mobile.
- Every CTA works (booking, form delivery, email, WhatsApp); form has success/error states.
- At least 3 real case studies, 2-3 testimonials, 2-3 articles, resume PDF current.
- Structured data validates; social previews render correctly.
- Keyboard and screen-reader pass on nav, forms, and case studies.
