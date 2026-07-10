# Typography

Source: [`src/styles/tokens/typography.css`](../src/styles/tokens/typography.css) (font tokens),
[`src/components/BaseHead.astro`](../src/components/BaseHead.astro) (font loading),
[`src/styles/global.css`](../src/styles/global.css) (base heading/eyebrow rules).

## Type families

Three families, loaded via Google Fonts in `BaseHead.astro` — no self-hosted fonts, no font-display
strategy beyond the default `swap`:

| Token | Family | Weights loaded | Role |
|---|---|---|---|
| `--font-display` | Fraunces (serif) | 300, 400, 500, 600, 400 italic | Headings, pull-quotes, drop caps, italic sign-offs — anywhere the page needs editorial warmth |
| `--font-mono` | IBM Plex Mono | 400, 500 | Eyebrows/kickers, labels, meta text (dates, categories, nav links), CTA button text — the "field notes" voice |
| `--font-body` | Inter (sans) | 400, 500 | Paragraph copy, UI text, the `<body>` default |

**Rule of thumb:** if it's a heading or a moment of warmth → Fraunces. If it's a label, category,
or timestamp → IBM Plex Mono, uppercase, letter-spaced. Everything else → Inter.

`body` sets `font-family: var(--font-body)` globally in `global.css`; `h1, h2, h3` are forced to
`var(--font-display)` globally too, so most components don't need to declare a font-family at all
— they only override it for mono labels or one-off serif moments (e.g. `.faq-question`,
`.meet-signoff`, `.subtitle` in the Journal masthead).

## Font sizes

The scale grew in passes as new pages were built — the newspaper-index core scale first, then
article/prose sizes, then homepage sizes, then Field Journal sizes. Grouped below by when/why they
were added; all live together as flat tokens in `typography.css`.

### Core scale

| Token | Value | Used for |
|---|---|---|
| `--fs-display` | 34px (26px ≤768px) | Primary section headings — Hero's *tagline* sibling scale-mate, Meet h2, Approach h2, FAQ h2, Journal masthead h1, Resources page h1 |
| `--fs-h1` | 26px | `.prose h2` inside long-form journal articles |
| `--fs-h2` | 18px | Resource download-hero title |
| `--fs-h3` | 15px | Widely reused body/sub-copy size — FAQ answers, Journal lead excerpt, Journal tier3 headline, Resource intro/instructions text |
| `--fs-caption` | 13px | The most common meta/label size — `.eyebrow` base, back-links, dates, mono labels across every page |
| `--fs-micro` | 10px | Smallest meta text — Journal `.quick-link`, tier2 excerpt tags, tier3 tag, resource-type label |

### Added to close scale gaps (Journal article rollout)

| Token | Value | Used for |
|---|---|---|
| `--fs-eyebrow` | 11px | The most-used kicker size — Journal lead kicker, sidebar header, tier2 kicker, Resource instructions-label. Sits between `--fs-caption` and `--fs-micro`, which had no token of their own for this common case |
| `--fs-article-title` | `clamp(32px, 4vw, 44px)` | Journal article `<h1>` — fluid so long titles don't feel oversized on narrow viewports |
| `--fs-prose-body` | 16.5px | Journal article body copy (`.prose`) |
| `--fs-prose-h3` | 21px | `.prose h3` inside articles |
| `--fs-prose-quote` | 22px | `.prose blockquote`; also reused for the Journal empty-state message |

### Added for the homepage

| Token | Value | Used for |
|---|---|---|
| `--fs-hero` | `clamp(42px, 6vw, 64px)` | Hero `<h1>` |
| `--fs-tagline` | 21px | Hero `.tagline`, Contact `.value`, Resources `.segment-title` |
| `--fs-brand` | 19px | Nav `.nav-name`, Meet `.meet-signoff` |
| `--fs-section-heading` | 32px | Audiences `<h2>` only — 2px off `--fs-display`; see [Known deviations](#known-deviations) |
| `--fs-contact-heading` | 38px | Contact `<h2>` — deliberately the largest homepage heading, since Contact is the closing CTA |
| `--fs-card-title` | 23px | Audience card `<h3>`; also FAQ question text (`.faq-question`) |
| `--fs-card-body` | 15px | Audience card body copy. Same pixel value as `--fs-h3` but kept as a separate token — it's a body-scale role in an unrelated hierarchy, not a heading |
| `--fs-meta-label` | 11.5px | Contact `.label`, Footer `<p>` |

### Added for the Resource detail page

| Token | Value | Used for |
|---|---|---|
| `--fs-resource-title` | 28px | Resource article `<h1>` — deliberately fixed (not fluid like `--fs-article-title`); the brief calls for a smaller, non-fluid title distinct from Journal's long-form scale |

### Added for the Field Journal redesign

| Token | Value | Used for |
|---|---|---|
| `--fs-lead-headline` | 31px | Tier 1 lead article headline |
| `--fs-sidebar-headline` | 16px | Tier 1 sidebar item headlines; also the Guides tile title |
| `--fs-tier2-headline` | 17px | Tier 2 (row-of-three) headline — only 1px from `--fs-sidebar-headline` (16px); deliberate, a 3-tier hierarchy step, not noise |
| `--fs-drop-cap` | 46px | The single oversized first-letter on the lead excerpt |

## Line heights

| Token | Value | Used for |
|---|---|---|
| `--lh-tight` | 1.2 | Resource article `<h1>`, Journal lead `<h2>` |
| `--lh-snug` | 1.25 | Journal sidebar/tier2 headlines |
| `--lh-relaxed-heading` | 1.3 | *(reserved — check current usages before relying on it)* |
| `--lh-body` | 1.65 | Global `body` default; Resource instructions-prose |
| `--lh-loose` | 1.9 | *(reserved — check current usages before relying on it)* |
| `--lh-article-title` | 1.15 | Journal article `<h1>`, and reused for all `--fs-display` section headings (Meet, Approach, FAQ) since it didn't round cleanly to `--lh-tight` |
| `--lh-hero` | 1.05 | Hero `<h1>` — tighter than any other heading on the site |
| `--lh-excerpt` | 1.72 | Journal lead excerpt, FAQ answer text — a deliberately loose line-height for longer reading passages |

## Letter spacing

| Token | Value | Used for |
|---|---|---|
| `--ls-label` | 0.08em | Back-links, CTA button text, quick-links |
| `--ls-caps` | 0.1em | Uppercase kickers/tags across Journal and Resources |
| `--ls-wide-label` | 0.16em | The global `.eyebrow` class, Journal masthead eyebrow, meta text |
| `--ls-tight-label` | 0.06em | Meet's `.meet-caption` — the only 0.06em use |
| `--ls-brand` | 0.01em | Nav `.nav-name` |
| `--ls-hero-tight` | -0.01em | Hero `<h1>` — the only negative tracking on the site |
| `--ls-meta-label` | 0.12em | Contact `.label` |

## Weights

| Token | Value | Used for |
|---|---|---|
| `--fw-regular` | 400 | Default body/heading weight |
| `--fw-medium` | 500 | Most headings, emphasised labels, buttons |
| `--fw-semibold` | 600 | Nav `.nav-name` only — the single 600-weight instance on the site |

## Known deviations

- **Audiences heading is 32px, not 34px.** Every other homepage section heading (Meet, Approach,
  FAQ) uses `--fs-display` (34px). Audiences alone uses `--fs-section-heading` (32px). This was
  flagged as an open gap in the token file itself and hasn't been resolved. Contact's 38px is
  intentionally distinct (closing CTA section) and isn't part of this inconsistency.
- **`--fs-tier2-headline` (17px) vs `--fs-sidebar-headline` (16px)** is a deliberate 1px hierarchy
  step in the Field Journal's 3-tier system — don't "fix" this by collapsing them into one token.
