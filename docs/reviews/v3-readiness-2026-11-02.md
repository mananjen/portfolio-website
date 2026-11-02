# V3 readiness review — 2 November 2026

Reviewed commit: `b07c23d` on `v3`. Scope agreed with Manan: a prioritized
technical and editorial readiness plan before hands-on experience review.
Design experiments and deployment are excluded. No application code was changed.

## Assessment

The React foundation is working. Root typechecking, the v3 production build,
and all seven App/router tests pass. The main gaps are specific accessibility,
navigation, documentation, and content-evidence issues rather than a reason to
rebuild the architecture. Existing Vite native-config compatibility warnings
remain; they did not fail these checks.

This review inspected source and the research diagram and used targeted router
and DOM probes. It did not perform the deferred browser/visual acceptance pass,
verify publication status, or independently validate portfolio performance claims.

## Current GitHub backlog

Public GitHub issue data was checked on 2 November 2026. All four open issues
remain relevant and are already labelled `ready-for-agent`:

| Existing issue | Current finding |
| --- | --- |
| [Match the research image import to its tracked filename casing](https://github.com/mananjen/portfolio-website/issues/3) | Confirmed: the current-site import uses `.jpg`, while Git tracks `.JPG`. V3 already uses the correct case. |
| [Give v3 project brief toggles project-specific accessible names](https://github.com/mananjen/portfolio-website/issues/4) | Confirmed: repeated Read/Close brief controls do not name their project. Particularly relevant because direct links focus the toggle. |
| [Preserve social preview image metadata when launching v3](https://github.com/mananjen/portfolio-website/issues/5) | Confirmed: v3 emits title/description/type but lacks the current site's explicit preview image metadata and asset handling. Keep as launch preparation; deployment is deferred. |
| [Replace stale root README commands with the current Vite and v3 workflow](https://github.com/mananjen/portfolio-website/issues/6) | Confirmed: root README still advertises CRA and scripts absent from package.json. |

[Make the root typecheck command validate the application and Vite config](https://github.com/mananjen/portfolio-website/issues/2)
is closed. The current command explicitly checks both configs and passes here.
Do not reopen or duplicate it.

## New fix candidates

The detailed descriptions and acceptance criteria live in the linked drafts.
They have **not** been published to GitHub.

| Priority | Draft | Why it matters |
| --- | --- | --- |
| First | [Correct the flagship diagram's contradictory retrieval example](v3-readiness-tickets/research-diagram.md) | The image shows a Māori query and hen result but describes French and a dog in its footer. This is a credibility defect, not visual polish. |
| First | [Remove contradicted research claims from the current-site source](v3-readiness-tickets/current-research-copy.md) | The source still used by root deployment contains the disavowed R@1 claim and stale manuscript status. |
| Next | [Restore repeated navigation to the homepage work section](v3-readiness-tickets/repeated-work-link.md) | After the first click, manually scrolling away and clicking again does not scroll or focus the section. |
| Next | [Use matched route identity for page metadata](v3-readiness-tickets/route-metadata.md) | Accepted URLs such as `/about/` and `/ABOUT` render About with Home metadata. |
| Next | [Separate current decisions from superseded planning notes](v3-readiness-tickets/planning-status.md) | Active-looking historical statements contradict the implementation and can send future work backward. |

Prioritize the existing filename-case and accessible-name fixes alongside the
first group. The social preview ticket is relevant before launch but does not
block discussion of the current experience.

## Decision frontier

Manan approved capturing two questions separately from fix tickets:

- [What evidence and owner approval do portfolio claims require?](v3-readiness-tickets/claim-evidence.md)
- [Which contact capabilities should v3 retain?](v3-readiness-tickets/contact-capabilities.md)

Both are open human decisions. No answer or acceptance is inferred by this review.
They are independent children of the proposed
[V3 readiness before hands-on review](v3-readiness-tickets/map.md) wayfinder map.
The map's destination is a clear plan, not completed implementation or deployment.

## Later validation

The suite uses MemoryRouter and jsdom; production uses HashRouter and StrictMode.
A small actual-entrypoint smoke check for a hash-selected brief, initial visit,
Back/Forward, and the legacy contact route would strengthen confidence. This is
a coverage gap, not proof that production navigation is broken. Include it when
planning the later hands-on/browser review; avoid building a large new test
framework solely for this audit.

## Handoff between laptops

Per Manan's instruction, no GitHub login, labels, issues, comments, or issue-state
changes were made on the office laptop. Git SSH access is sufficient for repo
sync, but does not authenticate the GitHub issue API. Use the personal laptop
for publication; refresh the live backlog first to avoid duplicates.

See the [draft publishing index](v3-readiness-tickets/README.md). The drafts are
temporary preparation, not a replacement issue tracker. After publishing,
replace draft references with real issue-title links and remove redundant drafts.

The new root glossary records already-agreed portfolio terms from the existing
planning notes. No new architecture decision or ADR was needed.
