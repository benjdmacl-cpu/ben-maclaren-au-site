# Colour

Source: [`src/styles/global.css`](../src/styles/global.css) (raw palette),
[`src/styles/tokens/colour.css`](../src/styles/tokens/colour.css) (semantic tokens),
[`src/styles/tokens/spacing.css`](../src/styles/tokens/spacing.css) (border widths, paired with
colour tokens below).

## Raw palette

Defined once, in `global.css`. Components should not reference these directly — always go through
the semantic tokens in the next section.

| Variable | Hex / value | Description |
|---|---|---|
| `--cream` | `#f3ecde` | Page background, text-on-dark |
| `--cream-deep` | `#e9dec8` | Card/panel background (Resource cards, Guide tiles) |
| `--ink` | `#382c24` | Primary text, headings, strong borders |
| `--ink-soft` | `#5b4c3f` | Secondary/muted text |
| `--terracotta` | `#be5b2c` | Lighter accent — links, solid CTA fills |
| `--terracotta-deep` | `#9c4620` | Darker, contrast-safe accent — kickers, tags, hover states |
| `--sage` | `#8b8172` | Defined but **not** used for muted text (see note below) |
| `--line` | `rgba(56, 44, 36, 0.14)` | Translucent ink — the hairline border colour |

**Dark-section variants** (Contact and Footer sit on an inverted `--ink` background, so text/accent
need their own contrast-safe set):

| Variable | Value | Description |
|---|---|---|
| `--terracotta-on-dark` | `#d89a6e` | Accent on dark backgrounds |
| `--terracotta-on-dark-muted` | `#c79269` | Muted accent on dark (Contact `.label`) |
| `--terracotta-on-dark-hover` | `#e3a876` | Hover state on dark |
| `--sage-on-dark` | `#b6a791` | Muted text on dark (Contact/Footer) |
| `--line-on-dark` | `rgba(243, 236, 222, 0.12)` | Cream-based hairline for borders on dark sections (Footer) |

## Semantic tokens

`colour.css` aliases every raw colour into a named *role*. Always reach for these in component
styles.

### Surfaces

| Token | Aliases | Used for |
|---|---|---|
| `--color-bg-page` | `--cream` | Default page background |
| `--color-bg-card` | `--cream-deep` | Card/panel backgrounds — Resource cards, Guide tiles, code blocks |

### Text

| Token | Aliases | Used for |
|---|---|---|
| `--color-text-primary` | `--ink` | Headings, primary link text |
| `--color-text-secondary` | `--ink-soft` | Body paragraph copy across the homepage and article intros |
| `--color-text-muted` | `--ink-soft` | Meta text, captions, labels — aliases the same value as secondary. **Note:** deliberately *not* `--sage`, despite `--sage` existing for exactly this purpose — see the contrast note in the token file |
| `--color-text-body` | `--ink` | Long-form reading text that wants full-strength ink rather than the softer secondary tone — Journal lead excerpt, FAQ answer. Same value as `--color-text-primary` today, kept as a separate token because the role (reading text) is conceptually distinct from primary (headings) and could diverge later |

### Accent

| Token | Aliases | Used for |
|---|---|---|
| `--color-accent` | `--terracotta-deep` | Any accent *text* — kickers, category tags, hover states, icons |
| `--color-accent-link` | `--terracotta` | The lighter resting tone for underlined inline links and decorative accents (article blockquote border) |
| `--color-accent-solid` | `--terracotta` | Solid-fill CTA backgrounds (Nav CTA, Hero button). Same raw value as `--color-accent-link` today but a distinct role (fill vs. underlined text) |
| `--color-on-accent` | `--cream` | Text colour for content sitting on a `--color-accent-solid` fill (button labels) |

### Borders

| Token | Aliases | Weight pairing |
|---|---|---|
| `--color-border` | `--line` (translucent) | Pair with `--border-hairline` (1px) — the standard, quiet section divider |
| `--color-border-strong` | `--ink` (opaque) | Pair with `--border-strong` (2px) — reserved for one emphatic rule: the Field Journal masthead's bottom border, directly under the "Field Journal" title |

**The hairline/strong rule.** These two pairings are a deliberate two-tier system, not
interchangeable weights:

- **Hairline** (`--border-hairline` + `--color-border`) is the default for every section divider,
  card border, and list-item rule across the entire site.
- **Strong** (`--border-strong` + `--color-border-strong`) was originally scoped to the Field
  Journal's more editorial/newspaper aesthetic. It has leaked into a few places by analogy rather
  than intent — the homepage FAQ border and three rules on the Journal index page were found using
  it and corrected back to hairline. The Resources page's `.segment-nav` still uses it and hasn't
  been corrected — see [README's Known deviations](./README.md#known-deviations).
- **Before adding a new `--border-strong` usage**, ask whether the element is genuinely a
  masthead-level structural rule, or whether it's reaching for "strong" just to look more
  prominent — in the latter case, hairline is almost always the right answer, since prominence
  should come from typography/spacing, not border weight.

### Dark-section variants

| Token | Aliases | Used for |
|---|---|---|
| `--color-bg-dark` | `--ink` | Contact and Footer background |
| `--color-text-on-dark` | `--cream` | Primary text on dark sections |
| `--color-accent-on-dark` | `--terracotta-on-dark` | Accent text on dark |
| `--color-accent-on-dark-muted` | `--terracotta-on-dark-muted` | Muted accent/labels on dark (Contact `.label`) |
| `--color-accent-on-dark-hover` | `--terracotta-on-dark-hover` | Hover state on dark |
| `--color-text-muted-on-dark` | `--sage-on-dark` | Muted/meta text on dark (Footer `<p>`) |
| `--color-border-on-dark` | `--line-on-dark` | Borders on dark sections (Footer top border) |

## Usage patterns by section

| Section | Background | Notes |
|---|---|---|
| Nav, Hero, Audiences, Journal, Resources | `--color-bg-page` | Standard light |
| Meet, Approach | `--color-bg-card` | Slightly deeper cream, alternates with page background to separate sections without a hard rule |
| Contact, Footer | `--color-bg-dark` | Inverted — uses the dark-section token set exclusively, never the light-background text/accent tokens |
