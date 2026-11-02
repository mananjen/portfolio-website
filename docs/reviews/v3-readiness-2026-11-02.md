# V3 readiness review — 2 November 2026

Original audit: `b07c23d` on `v3`. Publication review: `28c6431` on `v3`.
Scope agreed with Manan: a prioritized technical and editorial readiness plan
before hands-on experience review. Design experiments and deployment are
excluded. This publication pass changes documentation and the issue tracker,
not application code.

## Assessment and validation boundary

The original audit recorded passing root typechecking, the v3 production build,
and all seven App/router tests, with existing Vite native-config compatibility
warnings. It inspected source and the research diagram and used targeted router
and DOM probes. Those checks did not verify publication status, independently
validate performance claims, or perform browser/visual acceptance.

The publication pass refreshed open and closed GitHub issues and checked the
reported gaps against the current source. All five new fix candidates remain
valid and distinct from the existing issues. The original build/test results
remain historical evidence; this documentation-only pass does not claim a new
application validation run.

## Existing GitHub backlog

Rechecked on 2 November 2026. All four open issues remain accurate and keep
their `ready-for-agent` labels; no body or state changes were needed.

| Existing issue | Current finding |
| --- | --- |
| [Match the research image import to its tracked filename casing](https://github.com/mananjen/portfolio-website/issues/3) | Current-site import uses `.jpg`, while Git tracks `.JPG`. V3 already uses the correct case. Case-sensitive build acceptance remains required. |
| [Give v3 project brief toggles project-specific accessible names](https://github.com/mananjen/portfolio-website/issues/4) | Repeated Read/Close brief controls do not name their project; direct links focus the toggle. |
| [Preserve social preview image metadata when launching v3](https://github.com/mananjen/portfolio-website/issues/5) | V3 lacks explicit preview image metadata and asset handling. Keep as launch preparation; deployment is deferred. |
| [Replace stale root README commands with the current Vite and v3 workflow](https://github.com/mananjen/portfolio-website/issues/6) | Root README still advertises CRA and scripts absent from package.json. |

[Make the root typecheck command validate the application and Vite config](https://github.com/mananjen/portfolio-website/issues/2)
remains closed. The current command explicitly checks both configs. It was not
reopened or duplicated.

## Published follow-up work

All issues below are `ready-for-agent`. The issue bodies carry the detailed
evidence, boundaries, and acceptance criteria.

| Priority | Issue | Why it matters |
| --- | --- | --- |
| First | [Correct the flagship diagram's contradictory retrieval example](https://github.com/mananjen/portfolio-website/issues/8) | The image shows a Māori query and hen result but describes French and a dog in its footer. This is a credibility defect, separate from visual polish and filename casing. |
| First | [Remove contradicted research claims from the current-site source](https://github.com/mananjen/portfolio-website/issues/9) | Root deployment source retains the disavowed R@1 claim and stale combined manuscript/code status. |
| Next | [Restore repeated navigation to the homepage work section](https://github.com/mananjen/portfolio-website/issues/10) | After the first click, scrolling away and clicking again does not scroll or focus the section. |
| Next | [Use matched route identity for page metadata](https://github.com/mananjen/portfolio-website/issues/11) | Accepted variants such as `/about/` and `/ABOUT` render About with Home metadata; unknown routes also use Home metadata. |
| Next | [Separate current decisions from superseded planning notes](https://github.com/mananjen/portfolio-website/issues/12) | Active-looking historical statements contradict the implementation and can send future work backward. |
| Next | [Add selectable email and reliable copy feedback to the v3 footer](https://github.com/mananjen/portfolio-website/issues/16) | Implements Manan's contact decision below; current v3 has only a labelled mailto action. |
| Next | [Inventory portfolio claim evidence and precise owner-review questions](https://github.com/mananjen/portfolio-website/issues/17) | Applies the agreed evidence standard to identify supported claims and specific owner follow-ups before copy approval. |

Prioritize the existing filename-case and accessible-name fixes alongside the
first group. Include the root README in the next group. Social preview work is
required before launch but does not block discussion of the current experience.

## Decisions and readiness overview

[V3 readiness before hands-on review](https://github.com/mananjen/portfolio-website/issues/15)
records the completed planning handoff and priorities. Its destination is a clear
plan, not completed implementation or deployment. It uses `needs-triage`; owner
decision issues use `ready-for-human`, following AGENTS.md's five default triage
labels rather than the additional workflow labels proposed in the old drafts.

- [What evidence and owner approval do portfolio claims require?](https://github.com/mananjen/portfolio-website/issues/13)
  is resolved and closed after discussion. The
  [resolution](https://github.com/mananjen/portfolio-website/issues/13#issuecomment-6574806527)
  requires an identifiable source or owner confirmation of meaning and scope,
  plus measurement context for exact metrics. Manan reviews individual
  contributions, role/publication/code-release status, and time-sensitive
  personal facts; routine wording edits within confirmed facts need no fresh
  approval. Unsupported rough recollections become concrete non-numeric wording.
  The standard is recorded in `docs/portfolio-improvements.md`; individual claims
  still need the inventory and any resulting owner review.
- [Which contact capabilities should v3 retain?](https://github.com/mananjen/portfolio-website/issues/14)
  is resolved and closed as a decision. In the
  [resolution](https://github.com/mananjen/portfolio-website/issues/14#issuecomment-6574737861),
  Manan agreed to retain footer email/GitHub/LinkedIn, the top email action, and
  the legacy contact redirect; add selectable email and copy-email with honest
  success/failure feedback; and omit phone in v3. Implementation remains open
  in the separate fix issue above. Final visual acceptance and deployment are
  not implied.

Both decision issues are native sub-issues of the readiness overview. Neither
blocks the other or the confirmed fixes. The existing glossary needs no new
terms for this handoff, and no architecture trade-off warrants another ADR.

## Later validation

The suite uses MemoryRouter and jsdom; production uses HashRouter and StrictMode.
Include a small actual-entrypoint smoke check for a hash-selected brief, initial
visit, Back/Forward, and the legacy contact route when planning the later
hands-on/browser review. This is a coverage gap, not proof that production
navigation is broken; a large new test framework is unnecessary for this audit.

## Publication handoff

The original office-laptop audit deliberately made no GitHub changes and left
eight ticket drafts for the personal laptop. Manan authorized publication in
this session. The live backlog was refreshed first, the missing issues were
published, and the redundant local drafts were removed. GitHub Issues remains
the tracker; this document records the review and links the live work.

Both owner decisions were resolved in this conversation. The readiness overview
is closed as a completed planning handoff; all implementation and evidence
inventory issues remain open. No application work or deployment is claimed.
