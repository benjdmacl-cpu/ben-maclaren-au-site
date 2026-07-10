# Design styleguide

Documentation of the design system behind benmaclaren.com.au: an Astro site with a warm,
editorial "field journal" aesthetic (cream paper, ink, terracotta accent, a serif/mono/sans
pairing).

This folder documents **what exists in the code today**, not an aspirational spec. Where the
current implementation has a known rough edge, it's called out explicitly rather than smoothed
over — see "Known deviations" in each file.

## Contents

- [typography.md](./typography.md) — type families, the full font-size/line-height/letter-spacing
  scale, weights, and where each token is used
- [colour.md](./colour.md) — the raw palette, the semantic colour tokens built on top of it, and
  the light/dark-section rules
- [spacing.md](./spacing.md) — the spacing scale, border widths, radius, and the two-tier border
  system (hairline vs. strong)

## How the token system is wired up

Three CSS files, each owning one concern:

```
src/styles/tokens/
├── typography.css   — font families, sizes, line-heights, letter-spacing, weights
├── colour.css       — semantic colour roles, aliased from the raw palette
├── spacing.css       — spacing scale, border widths, radius
└── index.css        — imports the three above
```

`index.css` is imported once, in [`BaseHead.astro`](../src/components/BaseHead.astro), alongside
[`src/styles/global.css`](../src/styles/global.css) (which holds the raw colour palette, box-sizing
reset, base body styles, and the shared `.eyebrow`/`.wrap`/`h1,h2,h3` rules). Every page goes
through `Layout.astro` → `BaseHead.astro`, so every page gets the same tokens — there's no
per-page token file.

**Semantic aliasing, not raw values.** `colour.css` doesn't define new hex values — every token in
it aliases a raw colour from `global.css` (e.g. `--color-border-strong: var(--ink);`). If the
brand palette ever changes, it changes in one place. Components should always reach for the
semantic token (`--color-text-secondary`), never the raw palette variable (`--ink-soft`) or a
hardcoded hex.

**Additive, not disruptive.** Most tokens beyond the original core scale were added
one-component-at-a-time as new pages were built (homepage, Field Journal, Resources), each time
reusing an existing token where the value already matched, and only minting a new one where it
didn't. The inline comments in each token file explain *why* a given token exists — that
reasoning is preserved and expanded on in these docs rather than repeated verbatim.

## Known deviations

A few places don't yet follow the system cleanly. Listed here so they're visible rather than
silently inconsistent:

- **Resources segment nav uses the heavy border.** `.segment-nav` in
  [`src/pages/resources/index.astro`](../src/pages/resources/index.astro) borders with
  `--color-border-strong` (the heavy/dark treatment) — the same inconsistency that was found and
  fixed on the homepage FAQ and the Field Journal index. The Resources page wasn't included in
  that pass. See [colour.md](./colour.md#border-tokens) for the hairline-vs-strong rule.
- **Audiences heading is 2px off the standard.** `.audiences h2` uses `--fs-section-heading`
  (32px) instead of `--fs-display` (34px), which every other homepage section heading uses. See
  [typography.md](./typography.md#known-deviations).
- **Unused `.pull` blockquote style.** [`Approach.astro`](../src/components/Approach.astro) defines
  a fully-styled `.pull` class (italic serif pull-quote) that no markup currently uses.
