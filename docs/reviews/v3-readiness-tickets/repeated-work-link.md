# Restore repeated navigation to the homepage work section

## Problem

The homepage CTA links to `/#work` in `v3/src/pages/HomePage.tsx:20`.
`RouteEffects` in `v3/src/App.tsx:13–37` responds only to pathname, search,
and hash changes. Once already at that URL, activating the same link again
does not rerun focus/scroll handling.

## Reproduction

1. Open Home and activate Start with the work.
2. Manually scroll back to the hero without changing the URL.
3. Activate Start with the work again: it does not return to the work section.

A targeted probe of the actual App in Vite/jsdom recorded only one
`scrollIntoView` call across two activations. The existing suite passes because
it does not cover repeated activation of an unchanged section destination.

## Suggested change

Handle a fresh navigation action to the same in-page destination, while
preserving the hash route and existing project-brief focus behavior. Keep this
within the existing router/section-link pattern.

## Acceptance

- Repeated activation returns focus and scroll to work even at the same URL.
- Project direct links, Back/Forward, Skip, and legacy contact still work.
- Add a regression at the approved rendered-App/router boundary.
- Typecheck, production build, and existing tests pass.
