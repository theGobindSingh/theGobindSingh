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

**Gap:** as built, there is no embedded booking scheduler yet. The header CTA is "Resume", not
"Book a call"; `/contact` offers a 3-field form (name, email, project) + email/LinkedIn/GitHub
links, no Cal.com-style widget or WhatsApp link. Close this gap or update this section once a
scheduler decision is made — don't let the two silently diverge further.

## 6. Information architecture

Hybrid: a strong single-page home that funnels, plus real routes for depth and SEO. More
indexable, linkable pages help search; the home stays the highlight reel.

**Status:** `/` (Home), `/about`, `/work` (case studies, projects, experience, endorsements),
`/work/[slug]`, and `/contact` (form + connect links) are built and live. `/blog` and
`/blog/[slug]` are still planned, not yet built. `sitemap.xml`, `robots.txt`, and a custom 404
are built (`src/app/sitemap.ts`, `robots.ts`, `not-found.tsx`); RSS for the blog is not (blog
doesn't exist yet).

Sitemap:

- `/` Home (the funnel: hero, work history, engineering manifesto, skills, selected case
  studies & projects).
- `/work` Case studies, projects, full experience timeline, and endorsements (testimonials),
  all on one page. **Gap:** the spec below calls for filtering by type
  (build/rebuild/integration/frontend); category is shown as a label on each card but no
  interactive filter UI exists yet.
- `/work/[slug]` Exists but is a noindexed placeholder ("full write-up coming soon") with a
  back link to `/work`; the real detail content lives inline on the `/work` index via
  `id={slug}` anchors on each card. Not yet the full case-study page the spec below describes.
- `/blog` Article index.
- `/blog/[slug]` Article.
- `/about` Portrait/intro, "my approach" statement, values/principles, stack, resume download +
  contact CTA. No dedicated timeline component; the career narrative lives on `/work` instead.
- `/contact` Availability status, connect links (email/LinkedIn/GitHub), short form (name,
  email, project) posting to `/api/contact`, response-time expectation, IST timezone, and a
  location/closing band. No embedded booking scheduler yet (see §5 gap below).
- Utility: `/resume` (or direct PDF), `sitemap.xml`, `robots.txt`, RSS for blog, custom 404.

Global nav: Work, Blog, About, plus a persistent "Book a call". **As built (`headerAndNavData`
in `src/data.ts`), this has drifted:** the live header nav is Home / Design / About / Work / Contact, with a "Resume" button, not "Book a call". "Design" points at
`/temp` (a dev color/type scratch page, `robots.txt`-disallowed), which has no route and 404s. Flagged as a bug to fix, not a spec change
to make — the intended nav is still Work / Blog / About / Contact + a primary CTA. Footer
carries full nav, contact paths, social, status (open for work), and a back-to-top.

## 7. Page specs (purpose + must-have content)

- **Home.** _As built:_ hero (name, positioning line, strongholds tags), work history
  (`Work`, experience cards), engineering manifesto (principles grid), skills grid, and
  selected case studies & projects (`Projects`), each linking out to `/work`. No GitHub
  activity, no testimonials, and no latest-articles block on the home page yet — testimonials
  live on `/work` (Endorsements) instead; GitHub activity and a blog teaser are still
  unbuilt. There is no explicit mid-page contact block; contact paths currently live only in
  the header (Resume) and footer. Revisit this spec once those pieces land, or trim the spec to
  match intent.
- **/work index.** _As built:_ one page combining case studies, independent projects, full
  experience timeline, and endorsements (testimonials), each a `Section`. Cards show a category
  chip (build/rebuild/integration/frontend) but there is no interactive filter yet — the "filter
  by type" requirement below is not yet implemented.
- **/work/[slug] case study.** _As built:_ a noindexed placeholder page (title, description,
  timeframe, "full write-up coming soon"). The full structure below (problem, decisions,
  metrics, client quote, screenshots) is not yet implemented — case-study depth currently lives
  as inline expandable cards (`WorkItemCard`, a `<details>` element) on the `/work` index, not
  as dedicated per-slug pages.
- **/blog index + article.** Technical and process writing (Next.js, frontend architecture,
  design systems, performance). Drives SEO and shows how the owner thinks. Articles need a
  clear title, date, reading time, tags, canonical URL, and a CTA at the end. Not yet built.
- **/about.** _As built:_ hero (name label + headline), portrait + intro statement, "My
  Approach" (a statement + two supporting paragraphs), Principles (values around
  communication/ownership/clarity/reliability), Stack (categorized skills), and a closing
  accent CTA band (resume download, contact link, LinkedIn, GitHub). There is no dedicated
  timeline/evolution component; the career narrative lives on `/work`'s Experience section
  instead, not here.
- **/contact.** _As built:_ availability status + location in the hero, a headline, a Connect
  block (email/LinkedIn/GitHub with response-time and availability notes), a 3-field form
  (name, email, project) posting to `/api/contact` with idle/submitting/success/error states,
  and a closing image band with coordinates. No WhatsApp link and no embedded scheduler (see §5
  gap note).

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
