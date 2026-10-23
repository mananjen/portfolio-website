# Portfolio improvement planning

Updated: 23 October 2026. These are planning notes, not implemented website changes.

## Agreed direction

- Prioritize engineers and hiring managers evaluating Manan's AI engineering work.
- Improve project storytelling first, beginning with multilingual image–text
  retrieval without end-to-end training as the flagship story.
- Initial design exploration has selected I (Cobalt cut) as the working direction.
  Defer visual fine-tuning while moving on to the next planning decisions.
  Typography, spacing, image treatment, and responsive details remain open.
- Include a brief personal glimpse near the end of the homepage and evolve About
  into a dedicated personal page for art, books, gaming, and other interests.
  Its final name and appearance remain open.
- V3 should feel personal and minimal, with restrained motion and no visual
  bloat. Substantial changes to the homepage and visual style are welcome.
- Explore subtle references to Manan's own artwork, a person-first introduction,
  and three different homepage compositions before choosing a direction.
- Detailed research storytelling is paused until after this initial exploration;
  prototype wording is provisional.

## Site structure discussion

Agreed: the homepage gives a glimpse into Manan's life and work, with details
kept on separate pages. Retain Projects as a listing, Experience as its own page,
and About as the personal/outside-work page. Renaming About remains open.

### Experience and Projects: scope

Agreed: Experience remains reverse chronological, showing role context,
responsibilities, and concrete contributions.

Manan clarified the existing content split:

- Industry work done as an employee is described in Experience, including the
  projects undertaken in those roles. Do not move it into Projects by default.
- Projects contains independently pursued work and projects undertaken during
  bachelor's/master's study, as well as the research work.
- Research overlaps intentionally: Experience explains the research role and
  responsibilities; Projects explains the specific research work, implementation,
  and results. Link these where useful rather than repeating full narratives.

Keep this distinction. Projects is not meant to be an exhaustive catalog of
everything Manan has done professionally. The same rigor applies to industry,
research, academic, and personal work; context describes where work happened,
not its quality. Small context labels can clarify entries without splitting
the listing into additional pages. Such labels remain a presentation proposal.

### Contact and project reading flow

Contact: Manan is open to sunsetting the separate page and placing LinkedIn,
GitHub, and email in the footer. Recommendation: do this, retain a direct email
action near the top, and preserve old contact links with a route that leads to
the contact section. This is a recommendation, not yet an implemented change.
The current contact page also includes a phone link and copy-email behavior;
decide what to retain when implementing the replacement.

Project reading flow is undecided: explore both inline expansion and dedicated
detail pages using identical content, retaining the Projects listing either way.
Manan wants enough substance to establish credibility and invite interview
questions, without exhaustive accounts of the work. Current content may not
justify separate pages; inline expansion is the provisional recommendation.

Agreed: every project has a preview and a full brief. Featured projects appear
on Home and Projects; the remaining projects appear on Projects. Use one
consistent opening behavior across all projects, chosen after comparing inline
expansion with dedicated pages. Brief length may vary without changing behavior.

Agreed Projects listing order: three curated featured projects first, followed by
the remaining projects in reverse chronological order, without duplicating the
featured entries in that list. Featured order reflects editorial emphasis rather
than recency. Within the remaining list, use project dates rather than the date
a portfolio entry was edited. Exact same-year ties can retain editorial order;
do not invent month-level precision where only years are known. Detailed date
handling remains an implementation decision.

Preserve useful detail in older work; age alone does not justify reducing it.
Featured status determines prominence, not a project's entitlement to detail.
Aim for roughly 30–60 seconds of reading, guided by available substance rather
than a fixed age-based limit, with paper/code links for deeper exploration.
Cover the problem,
Manan's contribution, one meaningful decision or challenge, and the outcome with
available evidence. Remove repetition and generic claims without discarding
substantive information. Do not invent details or pad a story to fill a page. Full
experiment histories and implementation walkthroughs are unnecessary. Compare
the two reading formats later; neither has been selected or implemented.

## Local homepage design exploration

Run `npm run prototype`. This opens the separate, development-only HTML entry
at `/src/pages/portfolio-prototype.html`; the current homepage is untouched.

- `?variant=A`: Personal publication — serif introduction and editorial spreads.
- `?variant=B`: Research notebook — rejected; retained for comparison only.
- `?variant=C`: Quiet gallery — asymmetric introduction and image-led work.

### Round two: dark blue and tighter composition

Feedback on round one:

- Keep A's conversational introduction; explore C's image-led composition with
  more deliberate image sizing on laptop and desktop screens.
- Reject the research notebook direction. A and C's pale backgrounds and overall
  feel were not right; they also had too much whitespace.
- Start with dark mode and a bluish palette; light mode can be explored later.
- Technical content can be detailed. Personal content should sound more casual.
- Typography and italics are still open; no final font decision has been made.

Round two explores:

- `?variant=D`: Editorial blue — compact conversational introduction, a split
  research spread, two supporting stories, and a casual personal glimpse.
- `?variant=E`: Understated modern — smaller sans-serif introduction, denser
  technical information, and compact project rows.
- `?variant=F`: Personal imprint — asymmetric research composition with a narrow
  crop from Manan's watercolor and a distinct personal section.

The arrows cycle within each round. Use the round selector to revisit A–C.
The viewport selector offers fluid desktop, 390px mobile, 768px tablet, and
1280px laptop previews. Fixed-width previews shrink to fit narrower windows.
Research images are capped at 440px wide and link to full-size versions.
Round two was checked at actual browser widths of 390, 768, 1280, and 1920px.
At the end of round two, no direction had been selected.

### Round three: more dramatic alternatives

Manan initially preferred F (Personal imprint) and requested more dramatic
options before selecting a direction. Preserve all earlier concepts.

- `?variant=G`: Two currents — a sticky personal introduction beside a separate
  engineering column on desktop; stacked reading order on smaller screens.
- `?variant=H`: Name in lights — oversized identity typography, a poster-like
  research spread, and a compact two-project strip.
- `?variant=I`: Cobalt cut — a saturated cobalt introduction, dark technical
  spread, and an artwork-led personal close.

Round three opens by default without a variant. The round selector preserves
access to all nine concepts; F remains unchanged in round two. These alternatives
explore structure and emphasis, not final typefaces or publication-ready copy.
All retain restrained motion and blue palettes. Checked at browser widths of
390, 768, 1280, and 1920px, with research images capped at 440px wide.

Use the floating arrows or keyboard left/right arrows to switch concepts.
The viewport selector constrains the design to the selected width; narrowing
the browser also exercises the responsive layout. Variant and viewport choices
are preserved in the URL. Links lead to existing site pages, project repositories,
or the supplied OpenReview record; new project detail pages are not implemented.

The prototype files are `src/pages/portfolio-prototype.{html,tsx,css}`.
They use existing assets and no new project dependencies. The separate HTML entry
is not included in the default production build.

### Working selection and next discussion

Manan selected I (Cobalt cut) as the working direction after round three.
Keep A–I available; selection does not authorize discarding earlier explorations.
Pause visual fine-tuning and additional visual variants for now.

Suggested next discussion: site structure and the project reading flow, followed
by content depth and the flagship research story. This sequence is a proposal,
not an agreed implementation plan. Decide which content belongs on the homepage,
how project details become shareable destinations, and how experience and personal
content fit together before refining the selected visual direction.

## Flagship project: research publication update

Project slug: `multilingual-image-text-retrieval`

OpenReview link supplied by Manan:
<https://openreview.net/forum?id=v35BaCj1kc>

Manan reported on 23 October 2026:

- The paper has been accepted to AACL-IJCNLP 2026 Findings.
- Usman will present it online on 7 November 2026.
- The paper should already be available through the supplied OpenReview link.

Verification status: OpenReview could not be retrieved during this session;
the acceptance and presentation details above are attributed to Manan.
Acceptance, public manuscript availability, and proceedings publication should
be described separately in the eventual website copy.

### Contribution and research roles

As described by Manan on 23 October 2026:

- **Manan Jain:** owned the complete end-to-end implementation of the project.
- **Usman Shahid:** a PhD student at UIC at the time; originated the research idea
  and directed the research decisions.
- **Dr. Natalie Parde:** an NLP professor at UIC and the team's research advisor.

Suggested portfolio wording, pending Manan's review:

> I owned the project's end-to-end implementation, working with Usman Shahid,
> who originated the research idea and led the research direction, under the
> supervision of Dr. Natalie Parde at UIC.

Keep implementation ownership distinct from research leadership. Specific
implementation responsibilities, engineering decisions, and challenges still
need to be elicited before expanding this into the flagship story. Do not infer
paper-writing responsibilities or individual experiment ownership from this
summary.

### Pending portfolio updates

- Link the paper from the project; the supplied OpenReview URL is available to
  record now. Check for a final published/proceedings URL when updating the site.
- Replace the stale “Manuscript and open-source release are still in preparation”
  statement in `src/content/projects.ts`. Confirm code-release status separately;
  paper acceptance does not establish that the code has been released.
- Verify the paper's exact title, author list, method, evaluation setting,
  results, baselines, and limitations before rewriting the case study.
- Expand the contribution summary above with concrete implementation examples.
- Reconcile the existing “roughly 30% Recall@1 on XM3600” claim with the paper;
  do not assume it is still the best or final result.
- Decide whether the presentation date belongs on the website; keep it out of
  evergreen copy unless there is a reason to maintain an event update.
