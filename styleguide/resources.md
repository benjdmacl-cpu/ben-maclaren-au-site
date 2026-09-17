# Resources page design

Source: [`src/pages/resources/index.astro`](../src/pages/resources/index.astro) (the index),
[`src/pages/resources/[...slug].astro`](../src/pages/resources/[...slug].astro) +
[`src/layouts/ResourcePost.astro`](../src/layouts/ResourcePost.astro) (individual resources),
[`src/content.config.ts`](../src/content.config.ts) (the `resources` collection schema),
[`src/lib/resource-labels.ts`](../src/lib/resource-labels.ts) (segment + interaction-type labels).

## Current status

Unlike the Journal, **Resources has real, finished content** in every entry — this isn't
placeholder text. It's still `noindex`ed and excluded from the sitemap, and the nav link was
hidden and re-shown at different points in this project's history — check `Nav.astro` and
`astro.config.mjs`'s sitemap `filter` for the current live state, since both have flipped more than
once and this document won't stay in sync with that toggle.

## Content model

One `resources` collection, markdown files:

| Field | Type | Notes |
|---|---|---|
| `title`, `intro` | required | `intro` is the one-line dek under the H1 |
| `segment` | `act-therapy \| mindfulness \| relationships \| life-design` | fixed taxonomy, not open-ended — see `SEGMENTS` in `resource-labels.ts`. Segment slugs double as section `id`s on the index page |
| `interactionType` | array of `interactive \| worksheet`, min 1 | a resource can be both |
| `componentSlug` | optional | which embedded interactive component renders, if `interactionType` includes `interactive` |
| `downloadUrl`, `downloadMeta` | optional | e.g. `"1 page · PDF"` — powers the worksheet download button |
| `instructionsLabel`, `steps`, `instructionsProse` | optional | `steps` → numbered-list format; `instructionsProse` → a paragraph instead; the whole instructions block is omitted if neither is set |
| `references` | optional | renders `SourcesBlock` |
| `icon` | required | Tabler icon slug for the index card |
| `featured` | optional boolean | see below |

## Index page: segmented, not tiered

Unlike the Journal's ranked-hub approach, Resources is a flat grouping by `segment` — no ranking
algorithm, no lead/tier system. Each of the 4 fixed segments gets its own `<section>` with a
2-column card grid (`repeat(2, minmax(0,1fr))`, collapsing to 1 column ≤600px). A segment nav strip
above lists all 4 segment labels — **not yet functional as anchor/filter links**, just labels
prepped for future anchor-scroll navigation once a segment grows long enough to need it (each label
already corresponds 1:1 to a segment's `id` further down the page).

Each card (`.resource-card`) is a single full-card `<a>` — unlike Events' cards on the homepage,
which are deliberately *not* fully clickable. Icon (or `BreathingCircle` if `featured: true` — see
below) + title + interaction-type label (`primaryInteractionLabel()`: "Try it here" if interactive,
else "Worksheet").

**Known deviation:** `.segment-nav`'s top/bottom border uses `--color-border-strong` (the heavy
2px/opaque-ink weight) rather than the standard hairline. This was flagged during a colour-system
review as the one remaining unresolved instance of that heavy border leaking in "by analogy" —
the homepage FAQ and three Journal-index rules were found with the same issue and corrected; this
one on Resources wasn't. See [colour.md](./colour.md#borders) before adding any more.

## `featured` and the breathing-circle special case

At most one resource per segment can set `featured: true`. On the index card grid, a featured
resource shows a live embedded `BreathingCircle` component instead of its static icon — a small
animated preview, meant to demonstrate that the resource is actually interactive rather than just
telling you so. This is index-page-only; the resource's own detail page doesn't use `featured` at
all (see below).

## Individual resource pages: two different hero treatments

`ResourcePost.astro` is deliberately built as a sibling to `JournalPost.astro` — same back-link,
meta-row treatment, and `SourcesBlock`, so the two content types feel like one site — but the
*centre* of the page differs: a Journal article is read, a resource is used. The hero panel renders
one of two things:

- **`interactionType` includes `'interactive'`** → looks up `componentSlug` in a small
  `INTERACTIVE_COMPONENTS` registry (currently just `'breathing-pace': BreathingPaceInteractive`)
  and renders that component live in the hero panel. If `componentSlug` doesn't resolve to a
  registered component, **this throws a build error** — deliberately, so a broken reference is
  caught at build time rather than silently rendering nothing.
- **Otherwise (worksheet-only)** → a download hero: icon, title, optional meta line, then either a
  real download button (if `downloadUrl` is set) or a disabled-looking "Coming soon" pill.

Below the hero: an optional instructions block (numbered steps or prose), and — only when a
resource is *both* interactive and a worksheet — an "offline strip" nudging toward the downloadable
version as a secondary option.

**Adding a new interactive resource** means writing the actual Astro component, registering it in
`ResourcePost.astro`'s `INTERACTIVE_COMPONENTS` map under a new `componentSlug` key, then setting
that same slug in the resource's frontmatter. There's no other wiring needed — the mechanism was
built expecting more of these to arrive later, but only `breathing-pace` exists today.

## Download tracking

Both the hero download button and the offline-strip download link carry
`data-goatcounter-click={`resource-download-${slug}`}` / `resource-download-offline-${slug}` —
dynamic per-resource, using the `slug` prop threaded through from `resources/[...slug].astro`
(`resource.id`). This is wired correctly but **currently inert**: no resource in
`src/content/resources/` has `downloadUrl` set yet, so every download button today renders as the
disabled "Coming soon" state. It'll activate automatically the first time a real `downloadUrl` is
added — no code change needed.
