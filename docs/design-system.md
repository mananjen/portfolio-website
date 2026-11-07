# V3 design system: typography foundation

How V3's text looks, and how to change or extend it without the site drifting.
This covers typography only. Colour, spacing, and layout get their own
foundation work later, and will slot into the same folder.

Background and decisions: the
[Typography foundation for V3](https://github.com/mananjen/portfolio-website/issues/18)
map, the [approved spec](https://github.com/mananjen/portfolio-website/issues/23#issuecomment-6711555114),
and [ADR 0002](adr/0002-typography-foundation.md).

## Files

| File | Holds |
| --- | --- |
| `v3/src/foundation/tokens.css` | Every value: font stacks with fallbacks, each style's size / line-height / tracking / weight, flow spacing, colours |
| `v3/src/foundation/text.module.css` | The text styles, built only from tokens |
| `v3/src/foundation/index.css` | Font loading, the reset, and base defaults (`body` = body, `h1` = title, `h2` = heading, `h3` = subheading) |

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
| `title` | Fraunces | 40 → 64 | Page titles, 404 |
| `heading` | Fraunces | 28 → 40 | Project titles, Home lead and personal card, About section titles, footer "Let's talk" |
| `subheading` | Fraunces | 21 → 25 | Experience job titles and schools, Home "more work" titles, About interest titles. Also the wordmark (at 600) and Home's numbers (in accent) |
| `body` | Recursive | 16 → 18 | All reading text: intros, project briefs, Experience summaries and bullets, About story and interests |
| `small` | Recursive | 15 → 16 | Card summaries, Home personal blurb |
| `ui` | Recursive | 14 → 15 | Navigation, text links, buttons, footer links, Experience dates and organisation (in accent) and job location (in muted), brief section headings (at 600) |
| `meta` | Recursive | 12.5 → 13 | Role lines, tags, image labels, footer signature |
| `label` | Syne Mono | 12 → 13 | Uppercase eyebrows and section labels |
| `caption` | Syne Mono | 12 → 12.5 | Image captions, in normal case |
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

`v3/stylelint.config.mjs` runs inside `npm run check:v3` on every component
module (`src/**/*.module.css`) except those in `src/foundation/`, and rejects
the raw values listed above. A token must be a bare `var(--name)`: a fallback
like `var(--size-ui, 14px)` is rejected because it hides a raw value.
`v3/stylelint.test.ts` proves which values it rejects and allows.

For a deliberate one-off, put `/* stylelint-disable-next-line */` above the
line. Prefer adding a token instead.

## Known follow-ups

- **Project brief columns:** at body size, the three-column brief gives about
  40 characters per line on a laptop, which is short for reading. Deferred to a
  later layout/component change.
- **Tag pills:** their visual redesign is deferred to a component-polish pass.
- **Colour roles:** repeated colour pairings wait for the colour map.
- **Light mode:** colour tokens are named by role (`--text`, `--muted`,
  `--background`), so a theme can redefine values without renaming anything.
