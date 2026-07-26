---
name: case-study-json
description: Generate a portfolio case-study JSON file (title, description, client, category, role, stack, timeframe, sections of Problem/Approach/Challenges/Impact/Learnings) from a real feature/project/PR in any repo — company or personal. Use this whenever the user asks to "turn this into a case study," "write up this project for my portfolio," "generate case-study.json for X," "document this feature as a case study," or points at a folder/PR/commit range and asks for a portfolio write-up. Fully self-contained — bundles its own schema and reference example, so it works in any repo regardless of whether that repo has its own case-study schema files. Investigates the target code/history thoroughly before writing anything, and never invents facts, metrics, or quotes it can't source — always asks the user instead of guessing when something can't be determined from the evidence.
---

# Case study JSON generator

Turns a real feature, project, or PR — in any repo the user points you at — into a case-study
JSON file matching the schema in `references/schema.md`. The schema and a full worked example
(`references/example.json`) are bundled with this skill, so treat those two files as the
authoritative source of truth for structure — don't assume the target repo has its own copy of
this schema to fall back on, and don't invent fields or block types beyond what they define.

The one rule that overrides everything else below: **never fabricate.** Every fact in the output —
client name, role, dates, stack, every `stat`, every claimed decision — must trace back to
something you actually found (code, commits, docs, config, CI output) or something the user told
you. When you can't find evidence for something the schema needs, stop and ask. Read the "Never
fabricate" section of `references/schema.md` before you write a single value — this is the part
users of this skill care about most, because a fabricated statistic in a portfolio is the one
thing a reader might fact-check.

## Workflow

### 1. Get the target

If the user already named files, a PR, a commit range, or a feature in their request, use that. If
not, ask what to target — a directory, a set of files, a PR/issue number, a commit range, or a
plain description of the feature. You need something concrete to investigate; "make me a case
study" with nothing to point at isn't enough to start research on.

### 2. Investigate exhaustively before asking anything

This is the step users of this skill most want done well: read everything relevant _before_
bothering them with questions. Depending on what's available in the target repo:

- Read the actual source of the feature — not just the entry point, follow it far enough to
  understand the architecture and the decisions embedded in it.
- `git log`, `git show`, and commit messages / PR description for the target files or range — these
  usually contain the _why_, which rarely survives in the code itself.
- `README`, `CHANGELOG`, `docs/` — architecture decisions, tradeoffs, and rationale are often
  written down once and never repeated in code comments.
- `package.json` / lockfiles / imports to confirm the real stack, not a guess from file
  extensions.
- Benchmark output, CI logs, bundle analyzer reports, test coverage reports, or any other
  generated artifact — this is usually the only legitimate source for `stat` blocks.
- Any existing case-study JSON files elsewhere in the repo (see step 4) — they show you the tone
  and level of detail this user's case studies use.

Use subagents (Explore) if the codebase is large and this would otherwise take many
back-and-forth reads. The goal is to arrive at step 3 already knowing as much as a thorough code
review would surface, not to use the user as a substitute for reading the code.

### 3. Map what you found onto the schema

Read `references/schema.md` in full if you haven't already this session. Work through the
five-section narrative (Problem → Approach → Challenges → Impact & Results → Learnings) as your
checklist — it's described in detail there, including which sections get a `title`, which get
`variant`/`layout`, and which block types fit each kind of content. Add extra sections beyond the
five when the material genuinely earns it (an architecture deep-dive, a before/after comparison),
but don't drop any of the five for lack of trying — if one genuinely has no evidence behind it,
that's a gap to flag in step 4, not a section to quietly skip.

While mapping, keep a running list of anything you're not confident about: a stat you can't
source, a role/title you're inferring rather than reading, a client name that might be
confidential, a decision whose rationale isn't documented anywhere. Don't resolve these by
guessing plausible-sounding values — that's exactly the failure mode this skill exists to avoid.

### 4. Ask about the gaps — once, together

Once investigation is genuinely exhausted (not before), take the running list from step 3 and ask
the user about all of it in one pass rather than trickling questions out one at a time. For each
gap, be specific about what you found and what's missing, e.g. "I can see the bundle got smaller
from the webpack config change, but I don't have a before/after number — do you have one, or
should I drop that stat?" rather than a generic "what was the impact?".

Also resolve at this point, if not already obvious from context:

- **Output location.** Default to `./.agents/skills/case-study-json/case-studies/<slug>.json` relative to
  the repo root. Before defaulting, check whether the target repo already has an established
  case-study convention of its own — e.g. a directory of existing `*.json` files matching this
  schema. If one exists, ask whether to use it instead of the default; don't silently pick one or
  the other.
- **Slug.** Derive from the title (kebab-case) unless the user specifies one.
- **Category.** Must be exactly one of `build`, `rebuild`, `integration`, `frontend` — if it's not
  obvious which fits, ask rather than picking the closest-sounding one.

Things you generally do _not_ need to ask about, because they're either derivable with confidence
or low-stakes to state as a documented assumption: the tech stack (read it from imports/config),
straightforward section content that's well-supported by code and commit history, minor copy
phrasing. Reserve questions for things that actually change the facts in the output.

### 5. Write the JSON

Write the file to the resolved location. The filename (minus `.json`) is the slug — never
duplicate the slug as a field inside the file itself.

### 6. Validate

Run the bundled validator before telling the user you're done. Two equivalent implementations
ship with this skill so it works regardless of which runtime the target machine actually has —
use whichever of Python or Node is available (check with `python3 --version` / `node --version`
if unsure; try both):

```
python3 <skill-dir>/scripts/validate.py <path-to-output.json>
# or
node <skill-dir>/scripts/validate.cjs <path-to-output.json>
```

(`validate.cjs` uses the `.cjs` extension deliberately, not `.js` — it forces CommonJS regardless
of whether the target repo's `package.json` sets `"type": "module"`, so it runs correctly either
way. If you ever edit one validator, mirror the change in the other — they must stay in sync.)

Both check the JSON structurally against the schema (required fields, enum values, every block
type recursively) and exit non-zero with one `ERROR:` line per problem if something's wrong — fix
those before reporting completion. Both also print non-fatal `WARNING:` lines if any of the five
conventional sections seem to be missing (matched loosely on `sectionTitle`); a warning isn't
necessarily wrong (see step 3 on justified gaps) but is worth a second look.

### 7. Hand it back

Tell the user where the file landed, and call out anything you deliberately left out or
approximated (a section you couldn't fill, a stat you left as a rough estimate the user should
verify) so nothing silently ships as more certain than it is.

## Reference files

- `references/schema.md` — the full schema, the five-section convention, block-type reference
  table, and the "never fabricate" rule. Read this before writing any output.
- `references/example.json` — a complete, schema-valid case study exercising every block type, for
  when you want to see a working shape rather than just the type definitions.
- `scripts/validate.py` / `scripts/validate.cjs` — structural validator, two dependency-free
  implementations (Python stdlib only / Node built-ins only) so it runs on whichever the target
  machine has. Run one against your output before reporting done.
