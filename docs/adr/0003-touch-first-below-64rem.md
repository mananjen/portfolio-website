# Touch-first below 64rem, mouse-first above

On 9 November 2026 Manan chose screen width to decide how V3 is interacted
with. Below 64rem (phones and tablets) every component is designed touch-first:
44px targets, press feedback, and no information shown only on hover. At 64rem
and above (laptops and desktops) it is mouse-first: hover effects, tooltips,
and compact targets. Every component is designed for both, and its touch view
is worked out when that component is redesigned. Any hover effect must also
sit inside `@media (hover: hover)`, and Stylelint enforces this.

This is separate from layout. Layout uses the 48rem page width and component
container queries, so a 900px tablet can have a wide layout and still be
touch-first.

## Considered options

- **Detect the input** with `(hover: hover) and (pointer: fine)`, independent
  of width. Rejected. It costs about the same code but adds a combination
  (large touchscreen) to review for every component. The portfolio's visitors
  are recruiters and engineers on ordinary phones, tablets, laptops, and
  desktops, and width already sorts those correctly.
- **Use the 48rem layout width as the input boundary.** Rejected: tablets in
  portrait are 768–834px, so they would get the mouse view.

## Consequences

A large iPad or a touchscreen laptop at 64rem or wider gets the mouse-first
view. The `(hover: hover)` guard stops hover styles from sticking after a tap
there, and the rest of the mouse view is accepted as good enough. Hybrid
devices get no separate design. Accessibility gets sensible defaults, not
exhaustive per-device coverage.
