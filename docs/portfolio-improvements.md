# Portfolio improvement planning

Updated: 23 October 2026. These are planning notes, not implemented website changes.

## Agreed direction

- Prioritize engineers and hiring managers evaluating Manan's AI engineering work.
- Improve project storytelling first, beginning with multilingual image–text
  retrieval without end-to-end training as the flagship story.
- Follow the storytelling work with a dedicated, extensive web design session.
  Typography, composition, color, imagery, motion, and mobile behavior remain open.
- Include a brief personal glimpse near the end of the homepage and evolve About
  into a dedicated personal page for art, books, gaming, and other interests.
  Its final name and appearance remain open.
- V3 should feel personal and minimal, with restrained motion and no visual
  bloat. Substantial changes to the homepage and visual style are welcome.
- Explore subtle references to Manan's own artwork, a person-first introduction,
  and three different homepage compositions before choosing a direction.
- Detailed research storytelling is paused until after this initial exploration;
  prototype wording is provisional.

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

Round two is the default on opening the prototype without a variant:

- `?variant=D`: Editorial blue — compact conversational introduction, a split
  research spread, two supporting stories, and a casual personal glimpse.
- `?variant=E`: Understated modern — smaller sans-serif introduction, denser
  technical information, and compact project rows.
- `?variant=F`: Personal imprint — asymmetric research composition with a narrow
  crop from Manan's watercolor and a distinct personal section.

The arrows cycle within each round. Use the round button to revisit A–C.
The viewport selector offers fluid desktop, 390px mobile, 768px tablet, and
1280px laptop previews. Fixed-width previews shrink to fit narrower windows.
Research images are capped at 440px wide and link to full-size versions.
Round two was checked at actual browser widths of 390, 768, 1280, and 1920px.
No direction has been selected.

Use the floating arrows or keyboard left/right arrows to switch concepts.
The viewport selector constrains the design to the selected width; narrowing
the browser also exercises the responsive layout. Variant and viewport choices
are preserved in the URL. Links lead to existing site pages, project repositories,
or the supplied OpenReview record; new project detail pages are not implemented.

The prototype files are `src/pages/portfolio-prototype.{html,tsx,css}`.
They use existing assets and no new project dependencies. The separate HTML entry
is not included in the default production build. No design has been selected.

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
