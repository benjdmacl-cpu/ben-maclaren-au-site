# Homepage design

Source: [`src/pages/index.astro`](../src/pages/index.astro) (composition) plus one component per
section in [`src/components/`](../src/components/).

This documents how the homepage is *assembled* — section order, what each section is for, the
background-alternation system, and the site-wide contact hierarchy that repeats across it. For
token-level detail (exact font sizes, colours, spacing values), see
[typography.md](./typography.md), [colour.md](./colour.md), and [spacing.md](./spacing.md).

## Section order

```astro
<Layout>
  <Hero />
  <Meet />        <!-- "About me" — Welcome + the old Approach section, merged -->
  <Audiences />
  <!-- <JournalTeaser /> -->   <!-- built, currently commented out -->
  <Events />
  <Contact />
  <Faq />
</Layout>
<!-- Footer is rendered by Layout.astro itself, not listed on the page -->
```

Nothing here is arbitrary — each section earns its position:

1. **Hero** — the pitch + the fastest path to booking, above the fold
2. **Meet ("About me")** — who you'd actually be talking to, and how he works
3. **Audiences** — "is this for someone like me?"
4. **Events** *(JournalTeaser sits here when enabled)* — proof of ongoing activity
5. **Contact** — the full ask, once trust is established
6. **FAQ** — objection-handling, deliberately last before the Footer

## Background alternation

Every section alternates between two cream shades so sections read as distinct without needing a
hard rule between all of them:

| Section | Background |
|---|---|
| Hero | `--color-bg-page` (implicit — no rule set, inherits `body`) |
| Meet | `--color-bg-card` |
| Audiences | `--color-bg-page` |
| *(JournalTeaser, when enabled)* | `--color-bg-page` |
| Events | `--color-bg-card` |
| Contact | `--color-bg-page` |
| FAQ | `--color-bg-card` |

**This alternation is fragile to reordering.** Every time a section is added, removed, or hidden,
the whole downstream sequence needs rechecking — a section's background is set relative to its
neighbours, not fixed. When Events' cards sit on a `--color-bg-card` section, the cards themselves
must use `--color-bg-page` (or vice versa) so they don't disappear into their own section — see
`.event-card` in `Events.astro` for the working example of that contrast rule.

## The three-tier contact hierarchy

Introduced to give people a low-friction option beyond "book a call" or "fill out a form" —
important for an audience (men, neurodivergent clients) that often responds better to a quick,
informal first message than either of those. It now repeats in both **Hero** and **Contact**,
deliberately identical in order and copy:

1. **Primary — "Book an intro call"**, solid `.btn-primary`/`.btn-outline` styling, links to the
   Halaxy booking page (same URL hardcoded in `Hero.astro`, `Nav.astro`, and `Contact.astro` — see
   `BOOKING_URL` constants)
2. **Secondary — "Send a message"**, outline button, anchors to `/#contact` (Hero) or *is* the
   contact form itself (Contact section's right column)
3. **Tertiary — "Or text or call: 0494 746 502"**, plain text (not a button), with "text" and
   "call" as separate `sms:`/`tel:` links

The FAQ's "How do I get in contact with you?" answer mirrors this same order in prose.

**Scraping protection on the phone number.** The number never appears as a contiguous string
anywhere in the built output. Both Hero and Contact assemble it client-side from a split array —

```js
const parts = ['0494', '746', '502'];
const number = parts.join('');      // for the tel:/sms: targets
const display = parts.join(' ');    // for the human-readable text
```

— and inject it into an empty `<p id="...">` element only after the script runs. **The one bug
already made and fixed here**: an earlier version hardcoded the display string as its own literal
(`'0494 746 502'`) separately from `parts`, which defeated the whole point — the full number sat in
the script source as plain text. If you ever touch this code, keep `display` derived from `parts`,
never a separate literal. The same `parts.join('')` / inject-after-load pattern, plus the
`atob()`-encoded email trick (see `colour.md`'s sibling note, or just search `atob` in
`Hero.astro`/`Contact.astro`/`Faq.astro`), are the site's two recurring anti-scraping techniques —
reuse them rather than inventing a third approach.

## Section-by-section notes

**Hero** (`Hero.astro`) — H1 + italic tagline + the three-tier contact row. Also carries the
sitewide concentric-circle SVG motif (reused, differently scaled, in Contact and the Journal
masthead) as the site's one recurring decorative element.

**Meet / "About me"** (`Meet.astro`) — merged from two previously-separate sections (Welcome +
Approach) into one, per an explicit brief. Two-column layout: fixed-width circular portrait on the
left (`align-items: start` on the grid, not `center`, because the text column is now much taller
than the photo), flowing text on the right — eyebrow, h2 "Welcome", intro line, bio paragraph, an
"How I work" subheading absorbing the old Approach copy, and a "See more about me" text link
pointing at `/about` (itself still a content stub — see below). A pair of placeholder trust badges
("LGBTQ+" / "Neurodivergent Inclusive") sat between the bio and "How I work" briefly, styled as
plain outlined pills with a `TODO` to swap for a supplied sticker-style graphic — removed again
before that graphic was wired in, so there's currently no trust-badge markup or CSS in this file at
all. Social media pills (Substack/Facebook/YouTube/LinkedIn) were built and tried here, explicitly
removed from this section per a later brief, then briefly tried in the Footer and removed again —
the code isn't deleted from the project, just not rendered anywhere. Check git history if reviving
them.

**Audiences** (`Audiences.astro`) — 3-card grid, one per audience (Neurodivergent, Men, Life and
career transitions — in that order, changed from the original Men-first order on request). Each
card is hand-drawn inline SVG line art (no icon library), a heading, and 1–2 paragraphs. Copy here
has been rewritten multiple times toward a more direct, strength-based voice — see the git history
on this file for the range of tones tried before landing on the current copy.

**Events** (`Events.astro`) — backed by its own `events` content collection (`title`, `startDate`,
optional `endDate`, `description`, `externalUrl`, `linkLabel`). Filters to upcoming only (compares
against the *start* of today, so a same-day event still shows), sorts soonest-first, and formats
date ranges contextually (`Sep 12, 2026` for a single day; `Oct 3–4, 2026` for a same-month range).
Cards are visually styled like the Resources cards but are **not** fully clickable — only the small
"View event →" tertiary link at the bottom is, per an explicit design decision to keep the card
itself informational. When no events are upcoming, the grid is replaced by a plain-text fallback
("Nothing on yet! Check out our Facebook page or send us a message") rather than hiding the section
entirely.

**JournalTeaser** (`JournalTeaser.astro`, currently commented out in `index.astro`) — built to show
the 3 most recent Journal articles in a kicker/headline/excerpt style that mirrored the Journal
hub's old Tier 2 pattern. The Journal hub has since been restructured away from tiers entirely (see
[journal.md](./journal.md)) — this component's visual style is now stale relative to the hub and
should be redone to reuse `JournalCard.astro` before re-enabling, rather than kept as its own
one-off style. Currently renders a "New articles are on the way" message instead of real posts (a
`HAS_REAL_POSTS` flag gates this internally) because every Journal article title is still literal
placeholder text. Re-enable by uncommenting the import and usage in `index.astro`; flip
`HAS_REAL_POSTS` separately once real articles exist.

**Contact** (`Contact.astro`) — two-column: left is the booking pitch (subheading, two lead
paragraphs, the primary booking button, the tertiary text/call line, a "Check the FAQ" pointer);
right is a real Netlify-backed contact form (`data-netlify="true"`, honeypot field, a client-side
math captcha regenerated after both success and a failed captcha attempt, `fetch()`-based submit
with inline success/error status — no page redirect). Background/text colours here deliberately use
the site's actual token values rather than a design brief's slightly-different hex table, since
matching the real site tokens is what the brief's own "consistent with the rest of the homepage"
goal requires.

**FAQ** (`Faq.astro`) — accordion sourced from the `faqs` content collection (`question`, `answer`,
optional `order` for manual sequencing, otherwise alphabetical by filename). Single-open behaviour
(opening one closes any other). Ends with its own closing CTA — deliberately the *email* option
(not another "Book a conversation", which would just repeat Contact's ask immediately above it) —
using the same `atob()` email-obfuscation pattern as the rest of the site.

**Footer** (rendered by `Layout.astro`, not listed in `index.astro`) — dark-background, `min-height:
20vh`. Holds business identity, ABN/ACA registration numbers, and a basic sitemap row (Home,
Journal, Resources, Privacy).

## Known deviations / in-progress state

- **JournalTeaser is built but disabled** (see above) — Journal content isn't ready to surface.
- **Social pills were removed from the working tree entirely** — built in Meet, explicitly removed
  per a later brief, then briefly tried in Footer and reverted. Not present in any current file;
  only recoverable via git history (`simple-icons` and the LinkedIn SVG asset are still installed/
  in `src/assets/`, but nothing imports them right now).
- **The Contact/Hero booking URL is duplicated as a literal string** in three files (`Hero.astro`,
  `Nav.astro`, `Contact.astro`) rather than a shared constant — fine at this scale, but if it moves
  again, grep for `halaxy.com` to catch every instance.
