# Layouts adapt to their space

On 8 November 2026 Manan chose to make V3's layouts adapt to the space they
have, instead of switching at a fixed set of named breakpoints. Components use
layouts that wrap on their own first (`flex-wrap`, grid `auto-fit`, the Sidebar
and Switcher patterns). They add `inline-size` container queries with rem
thresholds only for designed changes such as reordering or showing and hiding
an element. The page itself has one media width, 48rem, for page-level layout.
The 64rem input width from ADR 0003 is the only other one allowed. Stylelint
enforces both widths and bans `container-type: size`.

The four views (mobile, tablet, laptop, widescreen) are check widths, not
breakpoints: 320, 360, 768, 1280, 1440 and 1920 are checked by eye, and each
layout switches where its own content breaks.

## Considered options

- **Fixed breakpoints for the four views**, shared as tokens or
  `@custom-media`. Rejected: the same component sits in spaces of different
  widths (a footer column, a card in a grid), so a page width says little about
  the room a component actually has. It also adds build tooling for named
  widths that the rule of one width doesn't need.

## Consequences

A component's layout depends on its container, not the viewport, so moving it
into a narrower slot changes how it lays out without any edits. Adding a second
page-level width needs a written reason in `docs/design-system.md` and a change
to the Stylelint allowed list.
