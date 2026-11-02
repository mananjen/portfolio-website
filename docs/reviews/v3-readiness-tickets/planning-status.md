# Separate current decisions from superseded planning notes

## Problem

The current implementation section in `docs/portfolio-improvements.md` records
the implemented React inline-brief journey and four pages. Later active-looking
statements still say contact consolidation is unimplemented (around line 161),
neither reading format is implemented (around line 193), and the complete
journey is not authorized to be built (around line 278).

These passages are outside the explicitly superseded Astro section. Future
work can mistakenly reopen settled implementation choices or treat the current
code as unauthorized. The unresolved phone/copy-email choice is a different
question from whether the footer and legacy contact redirect already exist.

## Suggested change

Keep a concise current-state/open-questions section and explicitly mark the
earlier proposals as historical or superseded by the relevant later decision.
Preserve useful exploration history and the A–I studies. Distinguish implemented
behavior, editorial approval, browser acceptance, and deployment authorization.

## Acceptance

- Current React/TypeScript and inline-brief status is unambiguous.
- Historical proposals do not read as present restrictions or open decisions.
- Genuinely pending choices, including contact capabilities and claim review,
  remain visible without being silently resolved.
- The document links authoritative ADRs and decision tickets when published.
- No website implementation or deployment changes are included.
