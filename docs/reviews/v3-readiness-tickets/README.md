# Unpublished readiness tickets

Prepared on the office laptop on 2 November 2026. Manan explicitly deferred
GitHub ticket creation to the personal laptop. Nothing here has been published.

## Publication order

1. Read `docs/agents/issue-tracker.md` and `docs/agents/triage-labels.md`. Refresh
   open/closed GitHub issues before publishing; the audit links existing work.
2. Publish only the still-missing fix drafts below, using `gh issue create`
   with the file's heading as the title, its Markdown as `--body-file`, and the
   recommended label. Keep the first/next ordering in the review as guidance;
   do not introduce a new priority-label system.
3. Create the map with `wayfinder:map` and the two decision issues with
   `wayfinder:grilling`. Create those labels if absent. Wayfinder issues carry
   only wayfinder labels, never the normal triage labels.
4. Attach both decision issues to the map using GitHub's native sub-issue
   relationship. Neither decision currently blocks the other, so no dependency
   edge is required. Ordinary implementation fixes stay outside the decision map.
5. Record the returned issue-title links in the review and remove redundant
   local drafts. Do not insert placeholder issue numbers into published bodies.

| Draft | Recommended label |
| --- | --- |
| [Correct the flagship diagram's contradictory retrieval example](research-diagram.md) | `ready-for-agent` |
| [Remove contradicted research claims from the current-site source](current-research-copy.md) | `ready-for-agent` |
| [Restore repeated navigation to the homepage work section](repeated-work-link.md) | `ready-for-agent` |
| [Use matched route identity for page metadata](route-metadata.md) | `ready-for-agent` |
| [Separate current decisions from superseded planning notes](planning-status.md) | `ready-for-agent` |
| [V3 readiness before hands-on review](map.md) | `wayfinder:map` |
| [What evidence and owner approval do portfolio claims require?](claim-evidence.md) | `wayfinder:grilling` |
| [Which contact capabilities should v3 retain?](contact-capabilities.md) | `wayfinder:grilling` |

No tickets were claimed or resolved during charting. The two decision tickets
need a live discussion with Manan; the recommended starting points in their
bodies are proposals, not recorded decisions.
