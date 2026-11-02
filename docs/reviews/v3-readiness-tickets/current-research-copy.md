# Remove contradicted research claims from the current-site source

## Problem

`src/content/projects.ts:51–53` still says roughly 30% Recall@1 on XM3600 and
that the manuscript and open-source release are in preparation. The reviewed
paper notes explicitly reject that metric, and the v3 brief already uses the
reviewed 57.5% Recall@10 result with baseline limitations. Root `npm run deploy`
still builds the current-site content, so a v3-only correction leaves the
normal deployment source stale.

## Suggested change

Replace the contradicted current-site result with the reviewed wording and
remove the obsolete combined manuscript/code status claim. Use the already
recorded OpenReview destination where appropriate. Do not infer acceptance,
proceedings publication, or public code availability from one another.

Use `docs/portfolio-improvements.md`'s paper review and approved contribution
wording as the existing source. A supported neutral description is preferable
to adding a new unverified status. Do not silently convert Recall@1 to Recall@10
or claim the old number measures the same thing.

## Acceptance

- The contradicted R@1 and obsolete preparation statements are removed from
  the current-site project content.
- Any retained result has the correct metric, dataset scope, and limitations.
- Publication and code status are kept distinct; no new unsupported claims.
- Current-site build and v3 checks pass; no deployment is performed.

## Boundary

This repairs already-identified stale copy. The separate editorial evidence
decision will set the wider standard for other claims; it does not block
removing statements already contradicted by the repository's review notes.
