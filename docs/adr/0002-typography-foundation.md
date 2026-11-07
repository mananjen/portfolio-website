# Typography foundation in CSS modules, guarded by Stylelint

On 8 November 2026 Manan chose a typography foundation for V3 built from what
ADR 0001 already uses: CSS custom-property tokens and composable text styles in
a CSS module (`v3/src/foundation/`). Components `composes:` a style and may
only tweak layout, weight, or which token they use. A Stylelint rule in
`npm run check:v3` rejects raw font sizes, families, line-heights,
letter-spacing, and colours in component modules, so the shared look cannot
drift as the portfolio grows.

## Considered options

- **A styling library** (styled-components, Tailwind, vanilla-extract, Panda).
  Rejected. styled-components is in maintenance mode and adds runtime cost.
  The others would mean rewriting every module and replacing ADR 0001's
  choice, with no benefit that tokens and `composes` don't already give a
  solo-maintained site.
- **A separate design-system package**, in the style of a large team's shared
  foundation. Rejected for now: versioning and publishing overhead with no
  second consumer. The folder imports nothing from the app, so it can be
  extracted later if a second site appears.
- **Convention and docs only, no guard.** Rejected: drift had already produced
  about 35 hard-coded sizes before this foundation existed.

## Consequences

A component that needs a new size or colour must add a token or style to the
foundation rather than write the value locally. A deliberate one-off exception
needs a `/* stylelint-disable-next-line */` comment, which makes it visible in
review.
