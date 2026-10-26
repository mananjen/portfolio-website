# Working on this repository

This is a personal portfolio website. Keep changes and workflows proportionate
to a solo project; introduce process only when it solves a concrete need.

## Content-driven pages

Keep editable content in typed exports under `src/content`, including page and
section copy, button labels, images, links, and editorial ordering or selection.
Components own layout, styling, and interaction. Every new page must follow this
boundary: adding or updating entries using existing fields requires only content
edits; new layouts or capabilities may require type and component changes.

Render collections from data in their declared order, with selection rules in
the content layer. Use count-neutral copy or derive counts from the displayed
collection. Keep shared facts in one source. Content changes reach production
through the existing build/deploy workflow.

## Review and commits

Leave all changes uncommitted for the owner to examine. Do not create commits.
After making changes, explain what changed and why, report relevant validation,
and provide the commands the owner can run to stage and commit those changes.
Use explicit file paths in staging commands so unrelated edits stay separate.

## Agent skills

### Issue tracker

Issues live in GitHub Issues. Before reading or updating tickets, read
`docs/agents/issue-tracker.md`.

### Triage labels

Use the five default triage labels. Before triaging, read
`docs/agents/triage-labels.md`.

### Domain docs

Single-context layout. Before exploring the codebase, read `docs/agents/domain.md`.
