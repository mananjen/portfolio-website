# Use matched route identity for page metadata

## Problem

React Router accepts trailing slashes and case variants for the declared routes,
but `v3/src/App.tsx:17–20` selects metadata with exact pathname comparisons.
For example, `/about/` and `/ABOUT` render About while assigning Home's title
and description. Equivalent Projects variants have the same problem. Unknown
routes also fall back to Home metadata despite showing the recovery page.

## Evidence

A `matchRoutes` probe against the actual route patterns confirmed `/about/`,
`/ABOUT`, `/projects/`, and `/PROJECTS` are accepted. The exact comparison in
RouteEffects cannot select their page metadata. Baseline: `b07c23d`.

## Suggested change

Derive metadata from the matched route identity or normalize it consistently
with route matching. Give the recovery page suitable content-owned metadata.
Avoid adding a second routing system or changing the approved hash-routing
architecture just to address metadata.

## Acceptance

- Every accepted variant receives metadata for the page actually rendered.
- Unknown destinations receive recovery-page metadata.
- Titles, descriptions, and relevant Open Graph text update consistently.
- Metadata copy remains under typed content exports.
- Cover canonical, accepted-variant, and unknown destinations at the existing
  App/router test boundary; current navigation behavior continues to pass.

This is distinct from the existing social-image metadata ticket and from the
documented limitation that non-JavaScript social crawlers see homepage metadata.
