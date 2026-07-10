# Spacing

Source: [`src/styles/tokens/spacing.css`](../src/styles/tokens/spacing.css).

## Core scale

The original scale was 9 tokens on a roughly-×4 rhythm from 4px to 40px, plus `--space-9` (36px),
added later to fill the one gap the scale left between `--space-8` and `--space-10`.

| Token | Value |
|---|---|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-5` | 20px |
| `--space-6` | 24px |
| `--space-7` | 28px |
| `--space-8` | 32px |
| `--space-9` | 36px |
| `--space-10` | 40px |

## Half-steps

Named `--space-N-5` = the value exactly halfway between `--space-N` and `--space-(N+1)`, matching
the convention used elsewhere (e.g. Tailwind's spacing scale). Used for the smaller, fiddlier gaps
— icon gaps, margin-bottoms under eyebrows, button padding.

| Token | Value | Notable use |
|---|---|---|
| `--space-0-5` | 2px | Hero contact-line underline offset, inline-code padding |
| `--space-1-5` | 6px | Sidebar kicker margin-bottom |
| `--space-2-5` | 10px | Contact item label margin, Nav CTA padding-x half |
| `--space-3-5` | 14px | Audiences eyebrow margin, masthead eyebrow margin |
| `--space-4-5` | 18px | Article-head eyebrow margin, segment-nav padding |
| `--space-5-5` | 22px | Eyebrow margin-bottom (Approach, Meet, Hero, Audience icon) |
| `--space-6-5` | 26px | Nav padding, Hero h1 margin/gap |
| `--space-7-5` | 30px | Hero/download button padding-x, Footer padding, FAQ answer padding-right |
| `--space-8-5` | 34px | Nav-links gap |

> **Naming history:** these were previously numbered one step too high (e.g. what's now
> `--space-6-5` at 26px used to be misnamed `--space-7-5`) — a naming bug from an earlier pass,
> corrected in a full sequential rename. The *values* never changed, only the names, so any commit
> history referencing the old names is describing the same pixel values under a different label.

## Large structural spacing

Used for section-level padding. The original scale topped out at `--space-10` (40px) — well below
what real sections need — so this range continues the ×4 pattern where it stayed clean, and
introduces two intentionally off-grid values where the design called for something the ×4 pattern
didn't hit.

| Token | Value | Notable use |
|---|---|---|
| `--space-11` | 44px | Contact grid gap, `.prose hr`/`h2` margins |
| `--space-12` | 48px | Journal article-head margin, Tier 2 section padding |
| `--space-13` | 52px | Audiences h2 margin-bottom |
| `--space-14` | 56px | Meet grid gap, Journal masthead bottom padding, Guides top padding |
| `--space-15` | 60px | Mobile article padding, Journal empty-state top padding |
| `--space-20` | 80px | FAQ section padding, Resources header padding, Journal Guides bottom padding |
| `--space-22-5` | 90px | Audiences section padding, Journal/Resource article top padding — **off-grid**, not a multiple of 4 |
| `--space-25` | 100px | Contact top padding |
| `--space-27-5` | 110px | Meet/Approach section padding, Journal article bottom padding — **off-grid**, not a multiple of 4 |
| `--space-30` | 120px | Hero top padding, Journal empty-state bottom padding |
| `--space-32-5` | 130px | Hero bottom padding |

The two off-grid values (90px, 110px) are intentional design choices from the original brief, not
errors — flagged here so a future cleanup pass doesn't "round them off" without checking first.

## Border widths

| Token | Value | Pair with |
|---|---|---|
| `--border-hairline` | 1px | `--color-border` — the default divider weight everywhere |
| `--border-strong` | 2px | `--color-border-strong` — reserved for the Field Journal masthead's rule only; see [colour.md](./colour.md#borders) for the full hairline-vs-strong rule |

## Radius

| Token | Value | Used for |
|---|---|---|
| `--radius-sm` | 2px | Small UI elements — CTA buttons, inline code |
| `--radius-card` | 12px | Cards — Resource cards, Guide tiles, Resource hero panel |

## Layout constants (not tokenised)

A few structural numbers are hardcoded per-component rather than tokenised, since they're
one-off layout decisions rather than a reusable rhythm:

| Value | Used for |
|---|---|
| `max-width: 1080px` | `.wrap` — the site's global content-width constraint (`global.css`) |
| `max-width: 680px` | FAQ list — narrower reading-width container |
| `max-width: 720px` | Journal article prose column and article-head |
| `max-width: 600px` | Resource article wrap |

## Common patterns

- **Section padding** is set as `padding: <top> 0 <bottom>` (or a single value for both) directly
  on the outer `<section>`, never on `.wrap` — `.wrap` only ever carries `max-width` + horizontal
  padding (`--space-8`) + centring.
- **Grid gaps** between major layout columns use the space-10/11/14/20 range; gaps *within* a
  repeated card grid (Resource cards, Audience cards, Guide tiles) tend to sit lower, around
  `--space-6` to `--space-10`.
- **Mobile breakpoints** generally collapse multi-column grids to `1fr` and swap a large structural
  padding token for a smaller one (e.g. `--space-27-5` → `--space-15`) rather than introducing new
  mobile-specific tokens.
