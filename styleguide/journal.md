# Journal ("Field Journal") design

Source: [`src/pages/journal/index.astro`](../src/pages/journal/index.astro) (the hub),
[`src/pages/journal/[...slug].astro`](../src/pages/journal/[...slug].astro) +
[`src/layouts/JournalPost.astro`](../src/layouts/JournalPost.astro) (individual articles),
[`src/content.config.ts`](../src/content.config.ts) (the `journal` collection schema),
[`src/components/JournalCard.astro`](../src/components/JournalCard.astro),
[`src/components/FeaturedCard.astro`](../src/components/FeaturedCard.astro),
[`src/components/JournalFilterBar.astro`](../src/components/JournalFilterBar.astro).

## Current status — read this first

**The Journal is not live content.** Every one of the 12 entries in `src/content/journal/` has a
literal Lorem-Ipsum-style placeholder title (e.g. `'Ut aliquid ex ea commodi consequatur'`). The
index page shows a visible "This page is a work in progress and not currently in use" banner, and
both the index and every article page are `noindex`ed and excluded from the sitemap
(`astro.config.mjs`'s `filter`). The nav link to `/journal` **is** currently visible, so a visitor
can navigate there and see the WIP banner — but Google won't index it, and the homepage's Journal
teaser is disabled for the same reason (see [homepage.md](./homepage.md)).

The draft filter (`({ data }) => !data.draft` on both the index and `getStaticPaths`) is currently
**active** — any post with `draft: true` is excluded from both the index and its own page build.

None of this affects the *structure* below, which is fully built and correct — it's specifically
the content that's placeholder.

## The hub was restructured from a recency-tiered pipeline to a flat, tag-filterable one

**This is a significant architecture change from an earlier version of this page.** The original
design ranked content by recency — a lead slot, three tiers of decreasing prominence, and an
unbuilt "older entries" archive. That fit a blog, but the actual goal is a growing library of
*evergreen* content (common problems, how the practice works) that shouldn't lose visibility just
because it isn't new. If you find old references to "Tier 1/2/3", "the lead post", "sidebar", or
"For the locals" anywhere (comments, old commits, memory), they describe the *previous* system —
none of that exists anymore.

## Content model

One `journal` collection, markdown files, schema:

| Field | Type | Notes |
|---|---|---|
| `title`, `description`, `date` | required | standard |
| `category` | `practice \| men \| neurodivergent \| life-and-career \| grief`, optional | guide-tagged posts go uncategorised; everything else should set one by convention |
| `tags` | array, default `[]` | curated fixed vocabulary (see below) — **not** freeform strings |
| `featured` | boolean, default `false` | pins this post above the flat grid — see "Featured" below |
| `icon` | optional string | Tabler icon slug, guide-tagged entries only (their tile on the index) |
| `references`, `substackUrl` | optional | render `SourcesBlock` / a "Read on Substack" quick-link when present |
| `draft` | boolean, default `false` | filtered out everywhere, currently active |

There is no `articleType` and no `local` boolean anymore — both were removed in the restructure.
`articleType` (`response`/`research`/`guide`) is gone because the response/research distinction no
longer drives any layout decision; `local` is gone because "is this Canberra-specific" is now just
a `canberra` tag like any other, not a separate structural flag.

### Tag vocabulary

Defined as a fixed tuple (`JOURNAL_TAGS`) directly in `content.config.ts`, enforced by
`z.enum(JOURNAL_TAGS)` — curated the same way `category` is, not freeform. Extend the list
deliberately when a new tag is genuinely needed; don't let posts accumulate one-off tag strings, or
the filter bar stops being usable as the library grows. Keep `TAG_LABELS` in
`src/lib/journal-labels.ts` in sync by hand when the list changes (same manual-sync relationship
`CATEGORY_LABELS` already has with the `category` enum).

The current set, by role (a post can carry tags from more than one group):

- **Format**: `guide`, `personal-reflection`, `explainer` — only `guide` is load-bearing (see
  below); the other two are just filterable/displayed, same as any topic tag
- **Locality**: `canberra` — replaces the old `local` boolean. A tagged post shows a small
  "Canberra" chip on its card and is filterable by it, but no longer gets pulled into a dedicated
  section the way `local: true` used to
- **Topic** (starter set, extend as needed): `first-session`, `masking`, `boundaries`,
  `grief-processing`

**`guide` is the only tag with a structural effect** — it's what routes a post to the icon-tile
grid instead of the flat card grid (see below). Every other tag is purely informational/filterable.

### Featured

`featured: true` pins one post above the flat grid, manually. This replaces what used to be
automatic: the newest `response`-type post always led. That automatic behaviour is gone along with
`articleType` — there's no more "which post leads" logic at all unless a human sets `featured` on
one. **Convention, not a schema constraint**: keep at most one post `featured: true` across the
collection. Nothing enforces this — if two posts are both `featured`, `Array.prototype.find()` in
`journal/index.astro` just takes whichever comes first in date-sorted order and silently ignores
the other. There's also no reminder mechanism to rotate the featured post — it sits there until
someone manually changes it.

## The index page: three pools, not a ranking pipeline

```
allPosts (sorted newest-first, draft-filtered)
  ├─ featured = the post with featured === true (at most one, by convention)
  ├─ guides   = tags.includes('guide') && not the featured post
  └─ flatPosts = everything else (not featured, not guide-tagged)
```

**Precedence rule**: if a post is both `featured: true` and tagged `guide`, featured wins — it
renders once, pinned at the top via `FeaturedCard`, and is excluded from the guide grid entirely.
This mirrors the old local-overrides-guide precedence from before the restructure, so it's a
familiar pattern applied to a new pair of concepts, not a new kind of rule.

- **Featured** renders via `FeaturedCard.astro` — deliberately larger/more editorial than the flat
  grid's cards, reusing the old lead treatment's drop-cap flourish on the excerpt so it still reads
  as "the important one" even though the ranking logic that used to justify that is gone.
- **Guides** render exactly as before the restructure — unchanged icon-tile grid, unchanged CSS.
  The *only* change is what selects a post into this pool: `tags.includes('guide')` instead of
  `articleType === 'guide'`.
- **Everything else** renders as a uniform grid of `JournalCard.astro` — one visual treatment,
  replacing what used to be three different ones (Tier 1 sidebar item, Tier 2 row-of-three card,
  Tier 3 plain list row). Each card shows a category/date kicker, title, excerpt, and tag chips.

**What no longer exists at all**: the recency tiers, the lead-must-be-`response` rule, the "For the
locals" section (and its `.local-item` styles, which used to mirror `.tier2-item`), and the
not-yet-built `/journal/archive` link. Nothing gets structurally demoted anymore — every non-guide,
non-featured post sits in the one flat grid regardless of age — so there's nothing to archive into.

## Filtering

`JournalFilterBar.astro` renders one button per category and per tag *actually present* in the flat
grid (featured and guides aren't part of the filtered set, so their categories/tags don't get
filter buttons). **Single-select-at-a-time**, not multi-select — click a filter, see matching
posts; click "All" to clear it. This was a deliberate choice over multi-select, matching the
"avoid over-engineering until it's actually needed" pattern used elsewhere in this project.

Implementation is plain vanilla JS (`document.querySelectorAll` + a click listener toggling an
`.is-filtered-out` class), consistent with the rest of the site's interactivity — no framework, same
pattern as the FAQ accordion and the Contact form's captcha logic. One thing worth knowing if you
touch either file: **the `.is-filtered-out { display: none; }` rule lives in `JournalCard.astro`,
not `JournalFilterBar.astro`**, even though the filter bar's script is what toggles the class.
Astro scopes `<style>` blocks per-component (via a `data-astro-cid-*` attribute), so a rule written
in the filter bar's own styles would never actually match `.journal-card` elements rendered by a
different component. If you ever add a new toggleable state driven from one component onto
elements owned by another, put the CSS with the elements it targets, not with the script that
flips it.

Not yet built, called out as a later decision in the original brief rather than something
overlooked: pagination once the flat grid grows past a screenful or two (a "load more" button was
the suggested default, over true pagination, if/when it's needed).

## Individual articles — unaffected by any of the above

`journal/[...slug].astro` is a thin `getStaticPaths` wrapper (still draft-filtered); `JournalPost.astro`
is the shared layout for every article regardless of category/tags. It renders: a back-link, an
eyebrow (default "Journal", overridable — `about.astro` reuses this same layout with
`eyebrow="About"`), the title, a meta row, then `<slot />` for the markdown body wrapped in a
`.prose` block, and finally `SourcesBlock` if references exist.

**One necessary exception to "unaffected".** `JournalPost.astro` was called out as out-of-scope for
the restructure — correctly, in the sense that it doesn't care about tiering and never did. But it
previously required *both* `category` and `articleType` to be present before rendering the
category kicker via `JournalKicker.astro`, falling back to a plain date-only line otherwise. Once
`articleType` was removed from the schema entirely, that condition could never be true again —
every article page would have silently lost its category kicker, regardless of whether it has a
`category` set. This was fixed narrowly: `JournalKicker.astro` no longer takes an `articleType`
prop at all (it was only ever using it for a `TYPE_LABELS[articleType]` prefix and a muted-color
variant, both meaningless now that response/research/guide isn't a real distinction), and
`JournalPost.astro`'s condition is now just `category` on its own. No other behaviour in either
file changed.

`noindex`, the WIP banner, the sitemap `filter`, `about.astro`'s reuse of this same layout, and the
`references`/`substackUrl`/`SourcesBlock` rendering logic are all genuinely unaffected — none of
that depends on tiering, tags, or `articleType` in any way.

## Reused elsewhere / still needs work

- `JournalCard.astro` is meant to be reused by `JournalTeaser.astro` (the homepage's currently-disabled
  Journal preview) once that's reworked — it currently still visually mirrors the *old* Tier 2
  pattern, which no longer exists as a concept. This wasn't done as part of the restructure since
  the teaser is already disabled either way; worth doing before re-enabling it. See
  [homepage.md](./homepage.md).
- `JournalPost.astro` is also used directly by `src/pages/about.astro` — unrelated to any of the
  above, keeps working as-is.
