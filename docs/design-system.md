# V3 design system: typography foundation

How V3's text looks, how layout and input adapt across screen sizes, and how to
change or extend them without the site drifting. Colour and spacing tokens get
their own foundation work later, and will slot into the same folder.

Background and decisions: the
[Typography foundation for V3](https://github.com/mananjen/portfolio-website/issues/18)
map, the [approved spec](https://github.com/mananjen/portfolio-website/issues/23#issuecomment-6711555114),
and [ADR 0002](adr/0002-typography-foundation.md).

## Files

| File | Holds |
| --- | --- |
| `v3/src/foundation/tokens.css` | Every value: font stacks with fallbacks, each style's size / line-height / tracking / weight, flow spacing, colours |
| `v3/src/foundation/text.module.css` | The text styles, built only from tokens |
| `v3/src/foundation/index.css` | Font loading, the reset, base defaults (`body` = body, `h1` = title, `h2` = heading, `h3` = subheading), and the global `.visually-hidden` (screen-reader-only text) |

The foundation imports nothing from the app. Components import from it, never
the reverse.

## Fonts

| Role | Font | Notes |
| --- | --- | --- |
| Headings | Fraunces (variable, optical sizing) | Soft/wonky axes off |
| Body and UI | Recursive (variable, weight axis only) | The neat "Linear" form (casual = 0) |
| Labels, captions, code | Syne Mono | One weight only (400), so no bold labels |

All three are self-hosted through Fontsource. Each has a size-adjusted fallback
(Georgia, Arial, Courier New) so text barely shifts while fonts load.

## Text styles

Sizes grow smoothly from a 360px to a 1440px wide window, then stop growing.

| Style | Font | Size (px) | Used for |
| --- | --- | --- | --- |
| `display` | Fraunces | 44 → 88 | Home hero title only |
| `title` | Fraunces | 40 → 64 | Page titles, 404, footer "Let's talk" (`CtaLink`) when the footer is wide |
| `heading` | Fraunces | 28 → 40 | Project titles, Home lead and personal card, About section titles, footer "Let's talk" when the footer is narrow |
| `subheading` | Fraunces | 21 → 25 | Experience job titles and schools, Home "more work" titles, About interest titles. Also the wordmark (at 600) and Home's numbers (in accent) |
| `body` | Recursive | 16 → 18 | All reading text: intros, project briefs, Experience summaries and bullets, About story and interests |
| `small` | Recursive | 15 → 16 | Card summaries, Home personal blurb |
| `ui` | Recursive | 14 → 15 | Navigation, text links, buttons, footer links, Experience dates and organisation (in accent) and job location (in muted), brief section headings (at 600) |
| `meta` | Recursive | 12.5 → 13 | Role lines, tags, image labels, footer signature |
| `label` | Syne Mono | 12 → 13 | Uppercase eyebrows and section labels |
| `caption` | Syne Mono | 12 → 12.5 | Image captions, in normal case; icon tooltips (`IconLink`, `IconButton`) |
| `code` | Syne Mono | 12 → 13 | The BibTeX box |

Exact line-heights, letter-spacing, and weights live in `tokens.css`. It is the
source of truth: if this table and `tokens.css` ever disagree, `tokens.css` wins
and this table needs updating.

## Using a style

Compose a style, then tweak only layout, weight, or which token you use:

```css
.cardTitle {
  composes: subheading from "../foundation/text.module.css";
  color: var(--accent);
  margin-block: var(--flow-tight) var(--flow);
}
```

- **Allowed in a component:** `composes`, layout (margin, max-width, alignment),
  `font-weight`, choosing a different token (`color: var(--muted)`), and
  `inherit`.
- **Not allowed:** raw `font-size`, `font-family`, `font`, `line-height`,
  `letter-spacing`, or colours (hex, rgb/hsl, or names like `white`). The guard
  below fails `npm run check:v3` if one appears.
- **Text styles never set colour or margins.** The component decides both.
- When a tag already matches its role (a plain `h2` that should look like
  `heading`), the base default is enough. Compose explicitly when they differ,
  e.g. Experience's `h2` section labels compose `label`.
- **The one exception: a style that must change inside a container query.**
  `composes` can't sit inside `@container`, so set every token of the target
  style there (font, size, leading, tracking, weight) and say why in a comment.
  Today only the footer's narrow "Let's talk" does this (title → heading).

### Promotion rule

If the same **type** tweak is needed in two places (a size, weight, or
line-height combination), add it to the foundation as a style or token instead
of repeating it.

Colour pairings are the exception. Combinations like "`small` in muted" or
"`label` in accent" (`.accentLabel` in several modules) stay as component
tweaks until a colour map adds proper colour roles.

## Spacing between text

Components space headings and paragraphs with three fluid values:

| Token | Size (px) | Typical use |
| --- | --- | --- |
| `--flow-tight` | 8 → 12 | Label to title, title to subtitle, between list items |
| `--flow` | 14 → 20 | Title to paragraph, between paragraphs |
| `--flow-loose` | 24 → 36 | Before a new block of text |

Page layout spacing (section padding, grid gaps) isn't part of the typography
foundation yet and may still use plain values.

## Changing a value

Edit `v3/src/foundation/tokens.css`. Every component follows automatically.

Sizes use `clamp(min, intercept + slope·vw, max)` in rem, so browser zoom and
text-size settings still work:

- slope = (max − min) / (1440 − 360)
- intercept = min − slope × 360
- divide px by 16 for rem

Worked example, body 16 → 18px:
`clamp(1rem, 0.9583rem + 0.1852vw, 1.125rem)`.

Never write a size as px or bare `vw` alone: bare `vw` text doesn't grow when
someone zooms.

To check a change, look at 360px, about 1280px, and 1440px or wider. Also check
200% browser zoom on a 1280px window, and the browser's "very large" default
text size.

## The guard

`v3/stylelint.config.mjs` runs inside `npm run check:v3` on every stylesheet
(`src/**/*.css`). In component modules it rejects the raw values listed above;
`src/foundation/` is exempt from that part, because it defines the values. A
token must be a bare `var(--name)`: a fallback like `var(--size-ui, 14px)` is
rejected because it hides a raw value. The layout and input guards (see
[Layout](#layout) and [Input](#input-touch-first-and-mouse-first)) apply
everywhere, foundation included. `v3/stylelint.test.ts` proves which values
each guard rejects and allows.

For a deliberate one-off, put `/* stylelint-disable-next-line */` above the
line. Prefer adding a token instead.

## Layout

Layouts adapt to the space they have, not to a set of named breakpoints
([ADR 0004](adr/0004-layouts-adapt-to-their-space.md)). Background:
[Decide how V3 adapts layout across screen sizes](https://github.com/mananjen/portfolio-website/issues/35)
and `docs/research/responsive-layout-techniques.md`.

**Allowed page widths.** Stylelint rejects any other media width, and any
`min-`/`max-width` form:

| Width | Job | Write it as |
| --- | --- | --- |
| `48rem` (768px) | Page layout | `(width < 48rem)` / `(width >= 48rem)` |
| `64rem` (1024px) | Input mode ([below](#input-touch-first-and-mouse-first)) | `(width < 64rem)` / `(width >= 64rem)` |

A third width needs a written reason here and a change to the allowed list in
`v3/stylelint.config.mjs`.

**Component rules:**

1. Prefer layouts that wrap on their own: `flex-wrap`, grid `auto-fit` with
   `minmax(min(X, 100%), 1fr)`, or the Sidebar and Switcher patterns.
2. Add `@container` only for a designed change, such as reordering, changing
   alignment, or showing and hiding an element.
3. The component's outer element is the container, with
   `container-type: inline-size`. Thresholds are in rem. Containers are unnamed,
   or have project-unique names. `container-type: size` is banned: it collapses
   the component's height.
4. Use range syntax (`width < 40rem`), not `max-width`.
5. Spacing may use `cqi` or `clamp()`. Type always uses the foundation tokens.

**Check widths.** These are the widths to check, not breakpoints: each layout
switches where its own content breaks. Check every layout change at each width
and while resizing slowly between them.

| View | Check at |
| --- | --- |
| Reflow floor | 320 |
| Mobile | 360 |
| Tablet | 768 |
| Laptop | 1280 |
| Widescreen | 1440 and 1920 |

The 1200px `.container` cap stays for now.

## Input: touch-first and mouse-first

Screen width decides how a component is used, not just how it is laid out
([ADR 0003](adr/0003-touch-first-below-64rem.md)).

| Width | Designed for | Means |
| --- | --- | --- |
| below `64rem` | touch (phones, tablets) | 44px targets, press feedback (`:active`), visible labels instead of tooltips, in-view emphasis instead of hover |
| `64rem` and above | mouse (laptops, desktops) | hover effects, tooltips, compact 32px icon targets |

- **Design every component for both.** The touch view is decided when the
  component is redesigned, not bolted on afterwards.
- **Hover always sits inside `@media (width >= 64rem) and (hover: hover)`**
  (or the two nested): the width keeps it off touch-first screens, and
  `(hover: hover)` keeps a large touch screen from holding a stuck hover state.
  Stylelint (`portfolio/hover-mouse-first`, in `v3/stylelint-hover-guard.mjs`)
  rejects `:hover` anywhere else, including under a negated (`not`) query.
  Only positive conjunctions count toward the guard: comma-separated alternatives
  and `or` expressions cannot supply either requirement. Put both requirements in
  a containing media query if alternatives are needed inside it.
- **Focus** is one global ring for every focusable control: 2px dashed in the
  accent colour, 5px offset, set in `foundation/index.css`. Components don't
  restyle it.
- **Layout is a separate question.** `48rem` is the page layout width, and
  components switch layout with container queries. `64rem` is only for
  input. A tablet can have a wide layout and still be touch-first.

## Links

Every link and link-like button is built from `v3/src/components/link/`: the
link family below, plus `ImageLink` for image links (see "Not in the family").
Background:
[Choose the V3 link styles](https://github.com/mananjen/portfolio-website/issues/36)
and [Design the V3 Link component](https://github.com/mananjen/portfolio-website/issues/37).

| Component | Use for | Look |
| --- | --- | --- |
| `TextLink` | Inline and standalone text links | `tone="text"`: accent, UI size. `tone="plain"`: the surrounding colour and type |
| `CtaLink` | The one large call to action ("Let's talk") | Title size, always ↗, no rule |
| `IconLink` | Icon links (GitHub, LinkedIn, résumé) | Muted icon that lifts on hover; brand marks stay white. Optional `text` shows instead of the icon where the owner allows it |
| `TextButton` | Buttons that read as links (Copy BibTeX), or a block of text that is one button (`shape="box"`: the footer's tap-to-copy address) | Same as `TextLink`, never an arrow. `box`: a tight rounded box that tints in the accent when pressed, no rule |
| `IconButton` | Icon-only buttons (copy, back to top) | Same as `IconLink` |

`BaseLink` sits under all three link looks and holds the behaviour only. A new
look is a new component with its own CSS module; existing looks aren't touched.

**The destination decides behaviour.** Nobody passes `target` or arrows by hand:

| Destination | Detected by | Opens | Arrow |
| --- | --- | --- | --- |
| Page on the site | a path (`/about`, `/#work`) | same tab | none |
| Another website | `http(s):` | new tab, `rel="noreferrer"`, "(opens in a new tab)" for screen readers | drawn ↗, no rule |
| Email | `mailto:` | same tab | none |
| Download | `download` | same tab, `download` attribute | drawn ↓ |

**Content** describes a link as `LinkContent` (`src/content/link.ts`):
`{ label, href }`, plus optional `download: true` and `icon`. Content never
holds arrows, looks, or `target`.

**Colour.** `TextLink` uses `--link-color` when its surroundings set it (the
cobalt hero sets it to `--on-cobalt`), otherwise `--accent`.

**Icons.** `Icon` (`link/Icon.tsx`) is a typed registry: `IconName` lists every
icon, and icons are always `aria-hidden` (the control carries the name).
`IconLink` and `IconButton` require a `label`, which is the accessible name and
the tooltip on mouse-first screens. Targets are 44px below 64rem and 32px above.
`IconLink` can also take visible `text` (shown with the destination's arrow).
The owner decides which part shows by setting `--icon-link-text` (the text's
`display`, default `none`) and `--icon-link-icon` (the icon's, default
`inline-grid`), for example in a container query.

To add an icon:

1. Generic icons are copied from Lucide (lucide.dev, ISC): paste the SVG's
   children into an entry using the `lucide()` helper. Switch to the
   `lucide-react` package once there are more than about five.
2. Brand marks come only from the owner's official kit. Their shape is never
   changed; their colour may only be one the owner allows (white here). An SVG
   mark's fill is set to `currentColor` so `--brand-mark` supplies that white.
   Add the file next to `Icon.tsx` and mark the entry `brand: true`, so it
   renders in `--brand-mark` and is never dimmed. See
   `docs/research/brand-marks-and-icons.md`.

**Copying.** `useCopyToClipboard()` (`src/lib/`) copies text, reports success
only once the clipboard confirms it, and returns a `message` to render in a
`role="status"` live region. Copy controls stay enabled while copying (so
keyboard focus stays put): repeat presses are ignored, and `busy` sets
`aria-busy`. `CopyCitation` and the footer's email copy are
built on it with `TextButton` and `IconButton`.

**Not in the family:** the skip link, image links (`ImageLink`: a plain `<a>` that
opens the full-size file in a new tab, with no look of its own until image links
are redesigned), and the header nav until the header redesign adds `NavLink`.

## Known follow-ups

- **Project brief columns:** at body size, the three-column brief gives about
  40 characters per line on a laptop, which is short for reading. Deferred to a
  later layout/component change.
- **Tag pills:** their visual redesign is deferred to a component-polish pass.
- **Colour roles:** repeated colour pairings wait for the colour map.
- **Light mode:** colour tokens are named by role (`--text`, `--muted`,
  `--background`), so a theme can redefine values without renaming anything.
