# Which contact capabilities should v3 retain?

## Question

V3 already has email/GitHub/LinkedIn in the footer, a direct email action near
the top, and a legacy `/contact` route to the footer. The current-site contact
page also exposes a phone link and copy-email behavior. Which of those
capabilities should the v3 contact destination retain, and what should happen
when a visitor has no configured mail client?

Evidence: `src/pages/contact.tsx`, `src/content/site.ts`,
`v3/src/components/Layout.tsx`, and `v3/src/content/site.ts`.
The planning notes explicitly leave phone/copy-email retention unresolved.

Recommended discussion starting point: keep footer contact as the destination,
retain copy-email with visible/selectable address and honest success/failure
feedback, and publish a phone link only if Manan wants calls from portfolio
visitors. These are recommendations, not accepted decisions.

Resolve through a live conversation with Manan. Record the retained channels,
copy-email behavior and fallback, and how legacy contact links should behave.
Leave visual treatment and hands-on acceptance to the later experience review.
